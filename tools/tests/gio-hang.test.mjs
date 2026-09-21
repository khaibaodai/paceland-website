/* Giỏ hàng dự án: dữ liệu, logic lọc/sắp xếp (CORE) và trang sinh ra */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { loadInventories, khoangGia, khoangDt, tuyChon, fmtTy, CTA } from "../gio-hang-render.mjs";
import { ROOT, read } from "./_load.mjs";

const require = createRequire(import.meta.url);
const core = require("../../assets/js/gio-hang.js");
const INV = loadInventories(ROOT);

/* ---------- 1. Dữ liệu ---------- */
test("Có ít nhất một giỏ hàng và Beachtro nằm trong đó", () => {
  assert.ok(INV.length >= 1, "chưa có file nào trong assets/data/gio-hang");
  assert.ok(INV.some((g) => g.slug === "beachtro-blanca-city"));
});

test("Mỗi giỏ hàng đủ trường bắt buộc", () => {
  for (const gh of INV) {
    for (const k of ["ten", "duAn", "nguon", "capNhat", "tomTat", "luuY"]) {
      assert.ok(gh[k], `${gh.slug}: thiếu "${k}"`);
    }
    assert.match(gh.capNhat, /^\d{4}-\d{2}-\d{2}$/, `${gh.slug}: capNhat phải dạng YYYY-MM-DD`);
    assert.ok((gh.can || []).length, `${gh.slug}: rổ căn rỗng`);
  }
});

test("Mỗi căn có mã, khối, loại, diện tích và giá là số", () => {
  for (const gh of INV) {
    const ma = new Set();
    for (const c of gh.can) {
      assert.ok(c.ma && !ma.has(c.ma), `${gh.slug}: mã căn trùng hoặc rỗng (${c.ma})`);
      ma.add(c.ma);
      assert.ok(c.khoi && c.loai && c.loaiMa && c.huong && c.banGiao, `${gh.slug}/${c.ma}: thiếu thuộc tính`);
      assert.equal(typeof c.dt, "number", `${gh.slug}/${c.ma}: dt phải là số`);
      assert.equal(typeof c.ny, "number", `${gh.slug}/${c.ma}: ny phải là số`);
      assert.ok(c.dt > 0 && c.ny > 0, `${gh.slug}/${c.ma}: dt và ny phải dương`);
    }
  }
});

test("Khối trong rổ căn phải khai báo ở phần khoi", () => {
  for (const gh of INV) {
    const khoi = new Set((gh.khoi || []).map((k) => k.ma));
    for (const c of gh.can) assert.ok(khoi.has(c.khoi), `${gh.slug}/${c.ma}: khối ${c.khoi} chưa khai báo`);
  }
});

/* Cẩm nang là tài liệu nội bộ, giá là mức rumor — trang phải nói rõ nguồn và mức độ chắc chắn */
test("Ghi chú nêu rõ đây là căn mẫu công bố, không phải toàn bộ rổ hàng", () => {
  const gh = INV.find((g) => g.slug === "beachtro-blanca-city");
  assert.match(gh.luuY, /không phải toàn bộ rổ hàng/i);
  assert.match(gh.luuY, /tham khảo|trước VAT|niêm yết/i);
  assert.match(gh.nguon, /Kick-off|công bố/i);
});

/* ---------- 2. CORE: lọc, sắp xếp, tính toán ---------- */
const MAU = [
  { ma: "A1", khoi: "E8", loai: "Studio", loaiMa: "studio", dt: 35.7, huong: "Sunworld", huongMa: "dong-nam", ny: 3.42, banGiao: "DyHome (thô)" },
  { ma: "A2", khoi: "E9", loai: "2BR+", loaiMa: "2br", dt: 82.3, huong: "Nội khu", huongMa: "tay-bac", ny: 7.16, banGiao: "DyHome (thô)" },
  { ma: "A3", khoi: "E8", loai: "1BR+", loaiMa: "1br", dt: 55, huong: "Sunworld", huongMa: "dong-nam", ny: 3.95, banGiao: "Hoàn thiện" },
];

test("Chuẩn hoá chuỗi bỏ dấu tiếng Việt", () => {
  assert.equal(core.norm("Nội khu – biển bãi trước"), "noi khu – bien bai truoc");
  assert.equal(core.norm("ĐÔNG NAM"), "dong nam");
  assert.equal(core.norm(null), "");
});

test("Tìm kiếm không phân biệt dấu và chữ hoa", () => {
  assert.deepEqual(core.loc(MAU, { tim: "noi khu" }).map((c) => c.ma), ["A2"]);
  assert.deepEqual(core.loc(MAU, { tim: "NỘI KHU" }).map((c) => c.ma), ["A2"]);
  assert.deepEqual(core.loc(MAU, { tim: "studio" }).map((c) => c.ma), ["A1"]);
  assert.equal(core.loc(MAU, { tim: "khong-co-gi" }).length, 0);
});

test("Lọc theo khối, loại, hướng, bàn giao", () => {
  assert.deepEqual(core.loc(MAU, { khoi: "E8" }).map((c) => c.ma), ["A1", "A3"]);
  assert.deepEqual(core.loc(MAU, { loai: "2br" }).map((c) => c.ma), ["A2"]);
  assert.deepEqual(core.loc(MAU, { huong: "dong-nam" }).map((c) => c.ma), ["A1", "A3"]);
  assert.deepEqual(core.loc(MAU, { banGiao: "Hoàn thiện" }).map((c) => c.ma), ["A3"]);
});

test("Lọc theo ngân sách và diện tích tối thiểu", () => {
  assert.deepEqual(core.loc(MAU, { giaMax: 4 }).map((c) => c.ma), ["A1", "A3"]);
  assert.deepEqual(core.loc(MAU, { dtMin: 55 }).map((c) => c.ma), ["A2", "A3"]);
  assert.equal(core.loc(MAU, { giaMax: 4, dtMin: 80 }).length, 0, "hai điều kiện phải cộng dồn");
});

test("Trường lọc rỗng thì bỏ qua, không loại căn nào", () => {
  assert.equal(core.loc(MAU, {}).length, 3);
  assert.equal(core.loc(MAU, { khoi: "", loai: "", tim: "" }).length, 3);
});

test("Sắp xếp theo giá và diện tích", () => {
  assert.deepEqual(core.sapXep(MAU, "gia-tang").map((c) => c.ma), ["A1", "A3", "A2"]);
  assert.deepEqual(core.sapXep(MAU, "gia-giam").map((c) => c.ma), ["A2", "A3", "A1"]);
  assert.deepEqual(core.sapXep(MAU, "dt-giam").map((c) => c.ma), ["A2", "A3", "A1"]);
  assert.deepEqual(core.sapXep(MAU, "khong-ton-tai").map((c) => c.ma), ["A1", "A3", "A2"], "kiểu lạ thì về mặc định");
  assert.deepEqual(MAU.map((c) => c.ma), ["A1", "A2", "A3"], "không được sửa mảng gốc");
});

test("Đơn giá tính từ giá niêm yết chia diện tích tim tường", () => {
  assert.equal(Math.round(core.donGia(MAU[1])), 87, "7,16 tỉ / 82,3 m²");
  assert.equal(core.donGia({ ma: "X", ny: 3, dt: 0 }), null);
  assert.equal(core.donGia(null), null);
});

test("Định dạng số theo kiểu Việt Nam", () => {
  assert.equal(core.fmtTy(2.53), "2,53 tỉ");
  assert.equal(core.fmtTy(7), "7 tỉ");
  assert.equal(core.fmtTy(null), "—");
  assert.equal(core.fmtM2(35.7), "35,7 m²");
  assert.equal(core.fmtDonGia(87.04), "87 tr/m²");
});

test("Đếm số bộ lọc đang bật (không tính ô tìm kiếm)", () => {
  assert.equal(core.demLoc({}), 0);
  assert.equal(core.demLoc({ tim: "abc" }), 0);
  assert.equal(core.demLoc({ khoi: "E8", loai: "2br" }), 2);
});

test("Nhãn căn gửi kèm lead có đủ mã, loại và diện tích", () => {
  const n = core.nhan(MAU[1], "Beachtro Tower");
  assert.match(n, /Beachtro Tower/);
  assert.match(n, /căn A2/);
  assert.match(n, /2BR\+/);
  assert.match(n, /82,3 m²/);
});

/* ---------- 3. Helper phía server ---------- */
test("Khoảng giá và khoảng diện tích lấy đúng biên", () => {
  assert.deepEqual(khoangGia(MAU), { min: 3.42, max: 7.16 });
  assert.deepEqual(khoangDt(MAU), { min: 35.7, max: 82.3 });
  assert.equal(khoangGia([]), null);
});

test("Danh sách tuỳ chọn lọc không trùng lặp", () => {
  assert.deepEqual(tuyChon(MAU, "loaiMa", "loai"), [
    { ma: "studio", ten: "Studio" }, { ma: "2br", ten: "2BR+" }, { ma: "1br", ten: "1BR+" },
  ]);
  assert.equal(tuyChon(MAU, "khoi", "khoi").length, 2);
});

test("fmtTy của server khớp fmtTy của trình duyệt", () => {
  for (const n of [2.53, 3, 7.16, 12.5]) assert.equal(fmtTy(n), core.fmtTy(n));
});

/* ---------- 4. Trang sinh ra ---------- */
test("Mỗi giỏ hàng có file HTML, title và canonical đúng", () => {
  for (const gh of INV) {
    const rel = `gio-hang/${gh.slug}.html`;
    assert.ok(fs.existsSync(path.join(ROOT, rel)), `thiếu ${rel}`);
    const h = read(rel);
    assert.match(h, /<title>[^<]{20,70}<\/title>/, `${rel}: title thiếu hoặc quá dài`);
    assert.ok(h.includes(`<link rel="canonical" href="https://paceland.vn/gio-hang/${gh.slug}.html">`), `${rel}: canonical sai`);
    const desc = h.match(/<meta name="description" content="([^"]*)"/);
    assert.ok(desc && desc[1].length <= 185, `${rel}: description quá dài`);
  }
});

test("CTA dùng đúng nhãn anh Khải chốt ở mọi điểm chạm", () => {
  const h = read("gio-hang/beachtro-blanca-city.html");
  const js = read("assets/js/gio-hang.js");
  assert.equal(CTA, "Check căn còn không?");
  assert.ok(h.split(CTA).length - 1 >= 3, "trang phải có nút CTA ở hero, hộp thoại và nút gửi");
  assert.ok(js.includes(CTA), "nút trong bảng hàng cũng dùng đúng nhãn");
});

test("Trang nhúng đủ rổ căn cho bộ lọc chạy phía trình duyệt", () => {
  for (const gh of INV) {
    const h = read(`gio-hang/${gh.slug}.html`);
    const m = h.match(/<script type="application\/json" id="gh-data">([\s\S]*?)<\/script>/);
    assert.ok(m, `${gh.slug}: thiếu khối gh-data`);
    const data = JSON.parse(m[1].replace(/\\u003c/g, "<").replace(/\\u003e/g, ">").replace(/\\u0026/g, "&"));
    assert.equal(data.can.length, gh.can.length);
    assert.equal(data.can[0].ma, gh.can[0].ma);
  }
});

test("Nạp CSS và JS riêng của giỏ hàng, có cache-bust theo băm", () => {
  const h = read("gio-hang/beachtro-blanca-city.html");
  assert.match(h, /assets\/css\/gio-hang\.css\?v=[a-f0-9]{8}/);
  assert.match(h, /assets\/js\/gio-hang\.js\?v=[a-f0-9]{8}/);
});

test("Schema: breadcrumb, danh sách căn, khoảng giá và FAQ", () => {
  const h = read("gio-hang/beachtro-blanca-city.html");
  const gh = INV.find((g) => g.slug === "beachtro-blanca-city");
  for (const id of ["pl-ld-org", "pl-ld-breadcrumb", "pl-ld-units", "pl-ld-offer", "pl-ld-faq"]) {
    assert.ok(h.includes(`id="${id}"`), `thiếu schema ${id}`);
  }
  const units = JSON.parse(h.match(/id="pl-ld-units"[^>]*>([\s\S]*?)<\/script>/)[1]);
  assert.equal(units.numberOfItems, gh.can.length);
  const offer = JSON.parse(h.match(/id="pl-ld-offer"[^>]*>([\s\S]*?)<\/script>/)[1]);
  assert.equal(offer.lowPrice, Math.round(khoangGia(gh.can).min * 1e9));
  assert.equal(offer.priceCurrency, "VND");
  const faq = JSON.parse(h.match(/id="pl-ld-faq"[^>]*>([\s\S]*?)<\/script>/)[1]);
  assert.equal(faq.mainEntity.length, gh.faq.length, "số câu hỏi trong schema phải khớp trang");
  for (const q of gh.faq) assert.ok(h.includes(q.q.replace(/"/g, "&quot;")), `FAQ "${q.q}" không có trên trang`);
});

test("Form hỏi tình trạng căn gửi qua đúng đường lead của site", () => {
  const h = read("gio-hang/beachtro-blanca-city.html");
  assert.match(h, /data-pace-form/);
  assert.match(h, /data-lead-source="gio-hang-beachtro-blanca-city"/);
  assert.ok(h.includes('name="can"'), "phải gửi kèm mã căn khách hỏi");
  assert.ok(h.includes('name="phone"') && h.includes('name="name"'));
});

test("SaleHub có mục giỏ hàng trỏ sang từng bảng hàng", () => {
  const h = read("salehub.html");
  assert.ok(h.includes('id="gio-hang"'), "thiếu mục giỏ hàng");
  assert.ok(h.includes("gio-hang.css"), "chưa nạp CSS giỏ hàng");
  for (const gh of INV) assert.ok(h.includes(`/gio-hang/${gh.slug}.html`), `SaleHub thiếu link tới ${gh.slug}`);
});

test("Trang giỏ hàng nằm trong sitemap", () => {
  const sm = read("sitemap.xml");
  for (const gh of INV) assert.ok(sm.includes(`/gio-hang/${gh.slug}.html`), `sitemap thiếu ${gh.slug}`);
});

test("Ảnh dùng trong giỏ hàng đều tồn tại", () => {
  for (const gh of INV) {
    for (const img of [gh.anh, gh.anhKhoi, gh.ogImage].filter(Boolean)) {
      assert.ok(fs.existsSync(path.join(ROOT, img)), `${gh.slug}: thiếu ảnh ${img}`);
    }
  }
});

test("Meta Pixel phủ trang giỏ hàng căn hộ biển", () => {
  const data = read("assets/js/data.js");
  const scope = data.match(/"metaPixelScope":\s*\[([\s\S]*?)\]/);
  assert.ok(scope, "thiếu metaPixelScope");
  assert.ok(scope[1].includes("/gio-hang/beachtro-blanca-city"), "giỏ hàng Beachtro chưa nằm trong phạm vi pixel");
});

/* llms.txt là nguồn AI search đọc — số liệu ở đó phải khớp dữ liệu, không để trôi */
test("llms.txt nêu giỏ hàng Beachtro với số liệu khớp dữ liệu", () => {
  const txt = read("llms.txt");
  const gh = INV.find((g) => g.slug === "beachtro-blanca-city");
  const dong = txt.split("\n").filter((l) => l.includes("/gio-hang/beachtro-blanca-city.html"));
  assert.equal(dong.length, 1, "phải có đúng một dòng giỏ hàng Beachtro");
  const g = khoangGia(gh.can);
  assert.ok(dong[0].includes(fmtTy(g.min).replace(" tỉ", "")), "khoảng giá thấp nhất không khớp");
  assert.ok(dong[0].includes(fmtTy(g.max).replace(" tỉ", "")), "khoảng giá cao nhất không khớp");
  assert.ok(dong[0].includes(`${gh.can.length} căn mẫu`), "số căn đã công bố không khớp");
  for (const k of gh.khoi) assert.ok(dong[0].includes(`${k.ma} (${k.soCan.toLocaleString("vi-VN")} căn`), `thiếu khối ${k.ma}`);
});
