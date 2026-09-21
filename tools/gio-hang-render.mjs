/* ============================================================
   PACELAND — Giỏ hàng dự án · component library (server-side)
   Hàm thuần sinh HTML cho /gio-hang/<slug>.html và khối thẻ giỏ hàng
   trên salehub.html. prerender.mjs gọi các hàm này; tools/tests/
   kiểm thử trực tiếp.

   Nội dung lấy từ assets/data/gio-hang/<slug>.json. Dữ liệu căn được
   nhúng vào trang dưới dạng <script type="application/json"> để
   assets/js/gio-hang.js lọc phía trình duyệt, không cần gọi mạng.
   ============================================================ */
import fs from "node:fs";
import path from "node:path";

export const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = (s) => String(s == null ? "" : s).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

/* Nhúng JSON vào HTML: chặn </script> và các ký tự mở thẻ */
const jsonScript = (obj) => JSON.stringify(obj).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");

const ICON = {
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.7" y2="16.7"/></svg>',
  filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="17" x2="14" y2="17"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
};

/* Nhãn CTA do anh Khải chốt — dùng nguyên văn ở mọi điểm chạm */
export const CTA = "Check căn còn không?";

/* ---------- Đọc dữ liệu ---------- */
export function loadInventories(root) {
  const dir = path.join(root, "assets/data/gio-hang");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        const gh = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
        gh.slug = gh.slug || f.replace(/\.json$/, "");
        return gh;
      } catch (e) {
        console.warn("  ! JSON giỏ hàng lỗi:", f, e.message);
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => String(a.ten).localeCompare(String(b.ten), "vi"));
}

/* ---------- Tính toán dùng chung với gio-hang.js ---------- */
export const fmtTy = (n) => (typeof n === "number" && isFinite(n) ? n.toFixed(2).replace(/\.?0+$/, "").replace(".", ",") + " tỉ" : "—");
export const fmtM2 = (n) => (typeof n === "number" && isFinite(n) ? String(n).replace(".", ",") + " m²" : "—");

export function khoangGia(cans) {
  const gia = (cans || []).map((c) => c.ny).filter((n) => typeof n === "number");
  if (!gia.length) return null;
  return { min: Math.min(...gia), max: Math.max(...gia) };
}
export function khoangDt(cans) {
  const dt = (cans || []).map((c) => c.dt).filter((n) => typeof n === "number");
  if (!dt.length) return null;
  return { min: Math.min(...dt), max: Math.max(...dt) };
}
/* Danh sách giá trị duy nhất cho các ô lọc, giữ thứ tự xuất hiện */
export function tuyChon(cans, keyMa, keyTen) {
  const seen = new Map();
  for (const c of cans || []) {
    const ma = c[keyMa];
    if (ma && !seen.has(ma)) seen.set(ma, c[keyTen] || ma);
  }
  return [...seen].map(([ma, ten]) => ({ ma, ten }));
}

/* ---------- Các khối HTML ---------- */
function heroBlock(gh, { resolveImg, breadcrumbNav }) {
  const crumbs = breadcrumbNav([
    { label: "Trang chủ", href: "/" },
    { label: "SaleHub", href: "/salehub.html" },
    { label: "Giỏ hàng " + gh.ten },
  ]);
  const stats = (gh.thongSo || []).map((s) => `<div><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd></div>`).join("");
  return `<section class="page-hero section--ivory gh">
  <div class="container">
    ${crumbs}
    <span class="eyebrow reveal">Giỏ hàng PaceLand${gh.trangThai ? ` · ${esc(gh.trangThai)}` : ""}</span>
    <h1 class="reveal" data-d="1">Giỏ hàng <span class="display">${esc(gh.ten)}</span></h1>
    <p class="lead mt-2 reveal" data-d="2" style="max-width:68ch">${esc(gh.tomTat)}</p>
    <div class="flex mt-3 reveal" data-d="3" style="gap:.8rem;flex-wrap:wrap">
      <button type="button" class="btn btn--lg" data-gh-open>${ICON.chat}${esc(CTA)}</button>
      <a class="btn btn--ghost btn--lg" href="#bang-hang">Xem bảng hàng</a>
      ${gh.trangDuAn ? `<a class="btn btn--ghost btn--lg" href="${esc(gh.trangDuAn)}">Trang dự án</a>` : ""}
    </div>
    ${stats ? `<dl class="gh-stats mt-3 reveal" data-d="4">${stats}</dl>` : ""}
  </div>
</section>`;
}

function blocksBlock(gh, { resolveImg }) {
  if (!(gh.khoi || []).length) return "";
  const cards = gh.khoi.map((k) => {
    const raw = /thô|dyhome/i.test(k.banGiao || "");
    return `<article class="gh-block">
  <div class="gh-block__id"><small>Khối</small>${esc(k.ma)}</div>
  <div class="gh-block__nums"><span><b>${esc(String(k.soCan))}</b> căn</span><span><b>${esc(String(k.soTang))}</b> tầng</span></div>
  <span class="gh-tag ${raw ? "gh-tag--raw" : "gh-tag--full"}">${esc(k.banGiao)}</span>
  ${k.ghiChu ? `<p class="gh-block__note">${esc(k.ghiChu)}</p>` : ""}
</article>`;
  }).join("");
  const anh = gh.anhKhoi ? `<figure class="mt-3"><img src="/${esc(resolveImg(gh.anhKhoi, 1200))}" alt="Sơ đồ khối ${esc(gh.ten)}" loading="lazy" decoding="async" style="width:100%;border-radius:14px;display:block"></figure>` : "";
  return `<section class="section section--paper gh" id="cac-khoi">
  <div class="container">
    <span class="eyebrow">Cấu trúc rổ hàng</span>
    <h2 class="mt-1">${gh.khoi.length} khối của ${esc(gh.ten)}</h2>
    <p class="mt-2" style="color:var(--ink-soft);max-width:70ch">Hình thức bàn giao khác nhau giữa các khối, nên anh/chị chọn khối trước rồi mới so căn: khối bàn giao hoàn thiện nhận nhà là ở được, khối DyHome cần tính thêm chi phí và thời gian hoàn thiện.</p>
    <div class="gh-blocks mt-3">${cards}</div>
    ${anh}
  </div>
</section>`;
}

function tableBlock(gh) {
  const cans = gh.can || [];
  const khois = tuyChon(cans, "khoi", "khoi");
  const loais = tuyChon(cans, "loaiMa", "loai");
  const huongs = tuyChon(cans, "huongMa", "huong");
  const banGiaos = [...new Set(cans.map((c) => c.banGiao).filter(Boolean))];
  const gia = khoangGia(cans);
  const dt = khoangDt(cans);

  const chips = [{ ma: "", ten: "Tất cả" }, ...khois]
    .map((k) => `<button type="button" class="gh-chip" data-khoi="${esc(k.ma)}" aria-pressed="${k.ma === "" ? "true" : "false"}">${esc(k.ma ? "Khối " + k.ten : k.ten)}</button>`)
    .join("");

  const opt = (list, label) => `<option value="">${esc(label)}</option>` + list.map((o) => `<option value="${esc(o.ma)}">${esc(o.ten)}</option>`).join("");
  const nacGia = gia ? [3, 4, 5, 6, 8].filter((v) => v > gia.min && v < gia.max + 2) : [];
  const nacDt = dt ? [40, 55, 70, 80].filter((v) => v > dt.min && v < dt.max) : [];

  return `<section class="section section--ivory gh" id="bang-hang" data-gio-hang>
  <div class="container">
    <span class="eyebrow">Bảng hàng</span>
    <h2 class="mt-1">Rổ căn ${esc(gh.ten)} PaceLand đang theo dõi</h2>
    <p class="mt-2" style="color:var(--ink-soft);max-width:72ch">${esc(gh.nguon)}${gh.capNhat ? ` · cập nhật ${esc(gh.capNhat.split("-").reverse().join("/"))}` : ""}. Bấm <em>${esc(CTA)}</em> ở căn anh/chị quan tâm, cố vấn PaceLand tra tình trạng thật trên hệ thống chủ đầu tư rồi gọi lại.</p>

    <div class="gh-bar mt-3">
      <div class="gh-bar__top">
        <div class="gh-search">${ICON.search}<input id="gh-search" type="search" placeholder="Tìm mã căn, khối, hướng view…" aria-label="Tìm trong bảng hàng"></div>
        <label class="sr-only" for="gh-sort">Sắp xếp</label>
        <select class="gh-sel" id="gh-sort">
          <option value="gia-tang">Giá thấp đến cao</option>
          <option value="gia-giam">Giá cao đến thấp</option>
          <option value="dt-tang">Diện tích nhỏ đến lớn</option>
          <option value="dt-giam">Diện tích lớn đến nhỏ</option>
          <option value="don-gia">Đơn giá mỗi m²</option>
        </select>
        <button type="button" class="gh-toggle" id="gh-filter-toggle" aria-expanded="false" aria-controls="gh-panel">${ICON.filter}Bộ lọc<b hidden>0</b></button>
      </div>
      <div class="gh-chips">${chips}</div>
      <div class="gh-panel" id="gh-panel">
        <div class="gh-field"><label for="gh-f-loai">Loại căn</label><select class="gh-sel" id="gh-f-loai" data-key="loai">${opt(loais, "Tất cả loại căn")}</select></div>
        <div class="gh-field"><label for="gh-f-huong">Hướng view</label><select class="gh-sel" id="gh-f-huong" data-key="huong">${opt(huongs, "Tất cả hướng")}</select></div>
        <div class="gh-field"><label for="gh-f-bangiao">Bàn giao</label><select class="gh-sel" id="gh-f-bangiao" data-key="banGiao">${opt(banGiaos.map((b) => ({ ma: b, ten: b })), "Mọi hình thức")}</select></div>
        <div class="gh-field"><label for="gh-f-gia">Ngân sách tối đa</label><select class="gh-sel" id="gh-f-gia" data-key="giaMax"><option value="">Không giới hạn</option>${nacGia.map((v) => `<option value="${v}">Dưới ${v} tỉ</option>`).join("")}</select></div>
        <div class="gh-field"><label for="gh-f-dt">Diện tích từ</label><select class="gh-sel" id="gh-f-dt" data-key="dtMin"><option value="">Mọi diện tích</option>${nacDt.map((v) => `<option value="${v}">Từ ${v} m²</option>`).join("")}</select></div>
        <div class="gh-panel__act"><button type="button" class="btn btn--ghost" id="gh-reset">Xoá bộ lọc</button></div>
      </div>
      <p class="gh-count" id="gh-count">Đang hiển thị <b>${cans.length}</b> trên ${cans.length} căn đã công bố</p>
    </div>

    <div class="gh-tablewrap">
      <div class="gh-scroll">
        <table class="gh-table">
          <caption class="sr-only">Bảng hàng ${esc(gh.ten)} — ${cans.length} căn đã công bố, sắp xếp theo giá niêm yết</caption>
          <thead><tr>
            <th scope="col"><span class="sr-only">Chọn so sánh</span></th>
            <th scope="col">Mã căn</th><th scope="col">Khối</th><th scope="col">Loại</th>
            <th scope="col">Diện tích</th><th scope="col">Hướng view</th><th scope="col">Giá</th>
            <th scope="col">Bàn giao</th>
            <th scope="col" class="gh-sticky"><span class="sr-only">Hỏi tình trạng căn</span></th>
          </tr></thead>
          <tbody id="gh-rows"></tbody>
        </table>
      </div>
      <div class="gh-cards" id="gh-cards"></div>
      <div class="gh-empty" id="gh-empty" hidden>
        <h3>Không còn căn nào khớp bộ lọc</h3>
        <p>Rổ hàng công bố còn mỏng nên bộ lọc hẹp dễ trả về rỗng. Anh/chị nới điều kiện, hoặc bấm ${esc(CTA)} để PaceLand tìm căn sát nhu cầu nhất trong toàn bộ ${esc(((gh.khoi || []).reduce((s, k) => s + (k.soCan || 0), 0) || 0).toLocaleString("vi-VN"))} căn của tháp.</p>
        <button type="button" class="btn mt-2" data-gh-open>${esc(CTA)}</button>
      </div>
    </div>

    ${gh.luuY ? `<p class="gh-note"><b>Đọc kỹ trước khi so giá:</b> ${esc(gh.luuY)}</p>` : ""}
  </div>
  <script type="application/json" id="gh-data">${jsonScript({ ten: gh.ten, slug: gh.slug, can: gh.can || [] })}</script>
</section>`;
}

function linesBlock(gh) {
  const cans = gh.can || [];
  const lines = (gh.dongSanPham || []).map((d) => {
    const cua = cans.filter((c) => c.loaiMa === d.ma);
    const g = khoangGia(cua);
    const dt = d.dtMin ? `${String(d.dtMin).replace(".", ",")} – ${String(d.dtMax).replace(".", ",")} m²` : "Chưa công bố";
    return `<article class="gh-line">
  <h3>${esc(d.ten)}</h3>
  <p class="gh-line__dt">${esc(dt)}</p>
  <p class="mt-1" style="font-size:.88rem;color:var(--ink-soft)">${g ? `Đã công bố ${cua.length} căn, niêm yết ${esc(fmtTy(g.min))}${g.min !== g.max ? " – " + esc(fmtTy(g.max)) : ""}.` : "Chưa có căn nào được công bố giá ở dòng này."}</p>
  ${d.goiHoanThien ? `<p class="gh-line__fin">Gói hoàn thiện tuỳ chọn: <b>${esc(d.goiHoanThien.toLocaleString("vi-VN"))} đ/m²</b> thông thuỷ, đã gồm VAT.</p>` : ""}
</article>`;
  }).join("");

  const tiers = (gh.mucGia || []).map((m) => `<div class="gh-tier"><b>${esc(m.ma)}</b><span><em>${esc(m.ten)}</em> — ${esc(m.moTa)}</span></div>`).join("");

  if (!lines && !tiers) return "";
  return `<section class="section section--paper gh" id="dong-san-pham">
  <div class="container">
    <div class="sh-cols" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(20px,3vw,40px)">
      <div>
        <span class="eyebrow">Dòng sản phẩm</span>
        <h2 class="mt-1">Các loại căn trong tháp</h2>
        <div class="gh-lines mt-3">${lines}</div>
      </div>
      <div>
        <span class="eyebrow">Cách đọc giá</span>
        <h2 class="mt-1">Bốn định mức chủ đầu tư dùng</h2>
        <p class="mt-2" style="color:var(--ink-soft);font-size:.95rem">Cùng một căn sẽ có bốn con số khác nhau tuỳ phương án thanh toán. Cột giá trong bảng hàng là mức NY, tức mức cao nhất trong bốn mức.</p>
        <div class="gh-tiers">${tiers}</div>
      </div>
    </div>
  </div>
</section>`;
}

function policyBlock(gh) {
  const cs = gh.chinhSach;
  if (!cs) return "";
  const rows = (cs.items || []).map((i) => `<tr><th scope="row">${esc(i.label)}</th><td>${esc(i.value)}</td></tr>`).join("");
  return `<section class="section section--ivory gh" id="chinh-sach">
  <div class="container" style="max-width:820px">
    <span class="eyebrow">${esc(cs.ten || "Chính sách bán hàng")}</span>
    <h2 class="mt-1">Ưu đãi đang áp dụng</h2>
    ${cs.capNhat ? `<p class="mt-2" style="color:var(--muted);font-size:.9rem">${esc(cs.capNhat)}</p>` : ""}
    <table class="gh-policy mt-3"><tbody>${rows}</tbody></table>
    ${cs.note ? `<p class="gh-note">${esc(cs.note)}</p>` : ""}
  </div>
</section>`;
}

function faqBlock(gh) {
  if (!(gh.faq || []).length) return "";
  const items = gh.faq.map((f) => `<details class="pl-faq__item"><summary>${esc(f.q)}</summary><div class="pl-faq__a"><p>${esc(f.a)}</p></div></details>`).join("");
  return `<section class="section section--paper gh" id="hoi-dap">
  <div class="container" style="max-width:820px">
    <span class="eyebrow">Hỏi đáp</span>
    <h2 class="mt-1">Câu hỏi thường gặp về giỏ hàng ${esc(gh.ten)}</h2>
    <div class="pl-faq mt-3">${items}</div>
  </div>
</section>`;
}

/* Form nằm trong hộp thoại "Check căn còn không?" — main.js bắt submit qua [data-pace-form] */
function dialogs(gh) {
  const src = `gio-hang-${gh.slug}`;
  return `<div class="gh-cmp" id="gh-cmp" role="region" aria-label="So sánh căn đã chọn">
  <span class="gh-cmp__txt">Đã chọn <b>0/3</b> căn để so sánh</span>
  <button type="button" class="gh-cmp__go" disabled>So sánh</button>
  <button type="button" class="gh-cmp__clear">Bỏ chọn</button>
</div>

<div class="gh-dlg" id="gh-dlg" role="dialog" aria-modal="true" aria-labelledby="gh-dlg-title">
  <div class="gh-dlg__box">
    <button type="button" class="gh-dlg__x" data-close aria-label="Đóng">${ICON.x}</button>
    <span class="eyebrow">${esc(gh.ten)}</span>
    <h2 id="gh-dlg-title" class="mt-1">${esc(CTA)}</h2>
    <div class="gh-dlg__unit" id="gh-dlg-unit"></div>
    <p class="mt-2" style="font-size:.9rem;color:var(--ink-soft)">Cố vấn PaceLand tra tình trạng căn trên hệ thống chủ đầu tư và gọi lại. Nếu căn đã có người giữ chỗ, anh/chị nhận luôn danh sách căn tương đương cùng tầm giá và hướng view.</p>
    <form data-pace-form data-lead-source="${esc(src)}" class="mt-3">
      <input type="hidden" name="du_an" value="${esc(gh.duAn ? gh.duAn + " — " + gh.ten : gh.ten)}">
      <input type="hidden" name="can" id="gh-dlg-can" value="">
      <div class="field-row two">
        <div class="form-field"><label for="gh-dlg-name">Họ và tên *</label><input id="gh-dlg-name" name="name" required placeholder="Nguyễn Văn A"></div>
        <div class="form-field"><label for="gh-dlg-phone">Số điện thoại *</label><input id="gh-dlg-phone" name="phone" type="tel" required placeholder="09xx xxx xxx"></div>
      </div>
      <div class="form-field" style="margin-top:.9rem"><label for="gh-dlg-note">Ghi chú</label><input id="gh-dlg-note" name="ghi_chu" placeholder="Ngân sách, hướng view hoặc tầng anh/chị muốn"></div>
      <button class="btn btn--lg mt-3" type="submit" style="width:100%;justify-content:center">${esc(CTA)}</button>
      <p class="form-success mt-2">Đã nhận thông tin. Cố vấn PaceLand kiểm tra rổ căn rồi gọi lại. Cần gấp, anh/chị gọi 0903 983 737.</p>
    </form>
  </div>
</div>

<div class="gh-dlg" id="gh-cmp-dlg" role="dialog" aria-modal="true" aria-labelledby="gh-cmp-title">
  <div class="gh-dlg__box gh-dlg__box--wide">
    <button type="button" class="gh-dlg__x" data-close aria-label="Đóng">${ICON.x}</button>
    <span class="eyebrow">So sánh</span>
    <h2 id="gh-cmp-title" class="mt-1">Các căn anh/chị đang cân nhắc</h2>
    <div id="gh-cmp-body"></div>
    <button type="button" class="btn mt-3" data-gh-open>${esc(CTA)}</button>
  </div>
</div>`;
}

/* ---------- Trang giỏ hàng hoàn chỉnh ---------- */
export function renderInventoryBody(gh, helpers) {
  const h = helpers || {};
  const resolveImg = h.resolveImg || ((s) => s);
  const breadcrumbNav = h.breadcrumbNav || (() => "");
  const ctaBand = h.ctaBand || (() => "");
  return [
    heroBlock(gh, { resolveImg, breadcrumbNav }),
    blocksBlock(gh, { resolveImg }),
    tableBlock(gh),
    linesBlock(gh),
    policyBlock(gh),
    faqBlock(gh),
    ctaBand(`Chốt căn ${esc(gh.ten)} trước khi rổ hàng đổi`),
    dialogs(gh),
  ].filter(Boolean).join("\n");
}

/* ---------- Thẻ giỏ hàng trên SaleHub ---------- */
export function inventoryHubCards(list, helpers) {
  const h = helpers || {};
  const resolveImg = h.resolveImg || ((s) => s);
  const soon = h.soon || [];
  const cards = (list || []).map((gh) => {
    const gia = khoangGia(gh.can);
    const tongCan = (gh.khoi || []).reduce((s, k) => s + (k.soCan || 0), 0);
    const meta = [
      tongCan ? `<span><b>${tongCan.toLocaleString("vi-VN")}</b> căn</span>` : "",
      (gh.can || []).length ? `<span><b>${gh.can.length}</b> căn đã công bố giá</span>` : "",
      gia ? `<span>${fmtTy(gia.min)} – ${fmtTy(gia.max)}</span>` : "",
    ].filter(Boolean).join("");
    return `<article class="gh-hubcard">
  ${gh.anh ? `<div class="gh-hubcard__img"><img src="/${esc(resolveImg(gh.anh, 800))}" alt="${esc(gh.ten)}" loading="lazy" decoding="async"></div>` : ""}
  <div class="gh-hubcard__bd">
    <span class="eyebrow">${esc(gh.duAn || "")}${gh.trangThai ? ` · ${esc(gh.trangThai)}` : ""}</span>
    <h3><a href="/gio-hang/${esc(gh.slug)}.html">${esc(gh.ten)}</a></h3>
    <div class="gh-hubcard__meta">${meta}</div>
    <p>${esc(strip(gh.tomTat).slice(0, 150))}${strip(gh.tomTat).length > 150 ? "…" : ""}</p>
    <span class="gh-hubcard__cta">Mở bảng hàng \u2192</span>
  </div>
</article>`;
  });
  const soonCards = soon.map((s) => `<article class="gh-hubcard gh-hubcard--soon">
  <div class="gh-hubcard__bd">
    <span class="eyebrow">Đang cập nhật</span>
    <h3>${esc(s)}</h3>
    <p>Bảng hàng sẽ mở khi PaceLand nhận rổ căn và chính sách chính thức từ chủ đầu tư.</p>
  </div>
</article>`);
  return `<div class="gh-hub">${cards.concat(soonCards).join("")}</div>`;
}
