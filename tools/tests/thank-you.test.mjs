/* Trang cảm ơn /cam-on.html và luồng chuyển hướng sau khi gửi form */
import test from "node:test";
import assert from "node:assert/strict";
import { loadData, read, exists } from "./_load.mjs";

const W = loadData();
const SITE = W.SITE || {};
const HTML = read("cam-on.html");

test("SITE.thankYouPage trỏ tới một trang có thật", () => {
  assert.equal(SITE.thankYouPage, "/cam-on.html");
  assert.ok(exists("cam-on.html"), "thiếu file cam-on.html");
});

test("Trang cảm ơn noindex và không nằm trong sitemap", () => {
  assert.match(HTML, /<meta name="robots" content="noindex, follow">/);
  assert.ok(HTML.includes('<link rel="canonical" href="https://paceland.vn/cam-on.html">'));
  assert.ok(!read("sitemap.xml").includes("/cam-on"), "trang cảm ơn không được vào sitemap");
});

test("Trang cảm ơn có đủ móc nối cho phần cá nhân hoá", () => {
  assert.match(HTML, /data-thank-you/, "thiếu gốc [data-thank-you]");
  for (const hook of ["data-ty-ten", "data-ty-ve", "data-ty-back"]) {
    assert.ok(HTML.includes(hook), `thiếu móc ${hook}`);
  }
  /* Ba móc đều phải ẩn sẵn, để khách vào thẳng không thấy ô trống */
  assert.match(HTML, /<span class="ty-name" data-ty-ten hidden>/);
  assert.match(HTML, /data-ty-back href="\/" hidden/);
});

test("Có lối liên hệ chủ động ngay trên trang", () => {
  assert.ok(HTML.includes('href="tel:0903983737"'), "thiếu nút gọi");
  assert.ok(HTML.includes("zalo.me/0903983737"), "thiếu nút Zalo");
});

/* PaceLand không trực tổng đài, hứa "gọi lại trong X phút" là hứa thứ không kiểm soát được */
test("Không cam kết thời gian phản hồi", () => {
  const txt = HTML.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
  for (const re of [/trong\s+\d+\s*(phút|giờ|tiếng)/i, /trong vòng\s+\d+/i, /\d+\s*phút\s+(sẽ|gọi)/i, /24\/7/]) {
    assert.ok(!re.test(txt), `trang đang hứa thời gian phản hồi: ${re}`);
  }
});

test("Mọi link nội bộ trên trang cảm ơn đều tồn tại", () => {
  const links = [...new Set([...HTML.matchAll(/href="(\/[^"#?]*\.html)"/g)].map((m) => m[1]))];
  assert.ok(links.length >= 3, "trang nên dẫn khách đi tiếp vài chỗ hữu ích");
  for (const l of links) assert.ok(exists(l.replace(/^\//, "")), `link hỏng: ${l}`);
});

/* ---------- Luồng chuyển hướng trong main.js ---------- */
const MAIN = read("assets/js/main.js");

test("Chỉ chuyển hướng khi gửi thành công, không chuyển khi lỗi mạng", () => {
  assert.match(MAIN, /if \(sent\) \{\s*\n\s*if \(goTy\) \{ rememberLead\(payload\); location\.replace\(goTy\); return; \}/);
});

test("Sự kiện lead được hoãn sang trang cảm ơn để không đếm hai lần", () => {
  assert.match(MAIN, /!\(opts && opts\.deferTrack\)\) trackLead/, "submitLead phải tôn trọng deferTrack");
  assert.match(MAIN, /deferTrack: !!goTy/, "initForms phải truyền deferTrack khi sắp chuyển trang");
  assert.match(MAIN, /if \(!d\.done\) \{[\s\S]{0,200}trackLead/, "trang cảm ơn chỉ bắn lead một lần");
});

test("Form không phải yêu cầu tư vấn thì ở lại tại chỗ", () => {
  assert.match(MAIN, /data-thankyou"\) === "off"/, "thiếu lối tắt thủ công");
  assert.match(MAIN, /getAttribute\("data-lead-kind"\)\) return ""/, "hồ sơ đối tác và ứng tuyển phải ở lại trang");
  assert.match(MAIN, /querySelector\("\[name=phone\]"\)\) return ""/, "form đăng ký nhận tin phải ở lại trang");
});

test("Điều kiện lọc khớp với form đang có trên site", () => {
  assert.match(read("doi-tac.html"), /data-pace-form data-lead-kind="partner"/, "form đối tác phải có data-lead-kind");
  const gn = read("goc-nhin.html");
  const form = gn.slice(gn.indexOf("<form"), gn.indexOf("</form>"));
  assert.ok(!form.includes('name="phone"'), "form nhận tin ở Góc nhìn không được có ô điện thoại");
  /* Form tư vấn thì ngược lại: phải có ô điện thoại để được chuyển sang trang cảm ơn */
  for (const f of ["lien-he.html", "beachtro-blanca-city.html", "gio-hang/beachtro-blanca-city.html", "du-an/blanca-city/casa-villa.html"]) {
    assert.ok(read(f).includes('name="phone"'), `${f}: form tư vấn thiếu ô điện thoại`);
  }
});

test("Chỉ lưu tên gọi để hiển thị, không lưu số điện thoại", () => {
  const block = MAIN.slice(MAIN.indexOf("function rememberLead"), MAIN.indexOf("function initThankYou"));
  assert.ok(block.includes("payload.name"), "cần tên để xưng hô");
  assert.ok(!/phone/.test(block), "không được lưu số điện thoại vào sessionStorage");
  assert.ok(!/email/.test(block), "không được lưu email vào sessionStorage");
});

test("Ngữ cảnh cũ thì bỏ qua, và chỉ nhận đường dẫn nội bộ cho nút quay lại", () => {
  assert.match(MAIN, /TY_TTL = 30 \* 60 \* 1000/);
  assert.match(MAIN, /\/\^\\\/\[\^\\\/\]\/\.test/, "nút quay lại phải chặn URL ngoài site");
});

test("Meta Pixel phủ trang cảm ơn để đo được chuyển đổi", () => {
  const scope = (SITE.tracking && SITE.tracking.metaPixelScope) || [];
  assert.ok(scope.includes("/cam-on"), "thiếu /cam-on trong metaPixelScope");
});

/* ---------- Zalo OA ---------- */
test("Zalo OA có trong cấu hình và tách bạch với Zalo chat của cố vấn", () => {
  assert.match(SITE.zaloOA || "", /^https:\/\/zalo\.me\/\d{6,}$/, "zaloOA phải là link OA dạng số");
  assert.notEqual(SITE.zaloOA, SITE.zalo, "OA và Zalo chat là hai kênh khác nhau");
  assert.match(SITE.zalo || "", /zalo\.me\/0\d{9}/, "Zalo chat vẫn là số cố vấn");
});

test("Icon Zalo ở chân trang trỏ về OA, nút Chat Zalo nổi vẫn là số cố vấn", () => {
  const comp = read("assets/js/components.js");
  assert.match(comp, /SITE\.zaloOA \|\| SITE\.zalo\) \+ '" target="_blank" rel="noopener" aria-label="Zalo OA PaceLand"/);
  assert.match(comp, /fc-zalo pulse" href="' \+ SITE\.zalo/, "nút nổi phải giữ Zalo chat");
  /* Trang đã sinh phải mang đúng link, không chỉ đúng ở mã nguồn */
  for (const f of ["index.html", "lien-he.html", "cam-on.html", "gio-hang/beachtro-blanca-city.html"]) {
    assert.ok(read(f).includes(`aria-label="Zalo OA PaceLand"`), `${f}: chân trang thiếu icon Zalo OA`);
  }
});

test("Trang Liên hệ và trang Cảm ơn đều có lối vào Zalo OA", () => {
  for (const f of ["lien-he.html", "cam-on.html"]) {
    const h = read(f);
    assert.ok(h.includes(SITE.zaloOA), `${f}: thiếu link Zalo OA`);
    /* Mở tab mới thì bắt buộc có rel="noopener" */
    const links = [...h.matchAll(/<a[^>]*href="[^"]*zalo\.me\/\d{6,}"[^>]*>/g)].map((m) => m[0]);
    for (const a of links) {
      if (a.includes('target="_blank"')) assert.ok(a.includes("noopener"), `${f}: link OA mở tab mới mà thiếu noopener`);
    }
  }
  assert.match(read("cam-on.html"), /class="btn btn--zalo"/, "nút OA phải dùng kiểu nút Zalo");
});

test("Zalo OA nằm trong schema sameAs và llms.txt", () => {
  const ld = JSON.parse(read("index.html").match(/id="pl-ld-org">([\s\S]*?)<\/script>/)[1]);
  assert.ok(ld.sameAs.includes(SITE.zaloOA), "schema sameAs thiếu Zalo OA");
  assert.ok(read("llms.txt").includes(SITE.zaloOA), "llms.txt thiếu Zalo OA");
});

test("Admin sửa được link OA", () => {
  const admin = read("assets/js/admin.js");
  assert.match(admin, /field\("Zalo OA \(kênh chính thức\)", "s_zaloOA"/, "thiếu ô nhập trong Cài đặt");
  assert.match(admin, /"zalo", "zaloOA",/, "không lưu zaloOA khi bấm Lưu cài đặt");
});
