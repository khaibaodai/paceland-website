/* Kiểm tra trang đã sinh (chạy sau: node tools/prerender.mjs) + component với dữ liệu giả lập */
import test from "node:test";
import assert from "node:assert/strict";
import { loadData, read, exists, ldBlocks, meta, visibleText, ROOT } from "./_load.mjs";
import { buildContext, openJobs, renderJobPage, renderCareersHub, jobPostingLd, faqLd } from "../careers-render.mjs";

const W = loadData();
const SITE_URL = "https://paceland.vn";
const OPEN = openJobs(W.JOBS);
const ctx = buildContext({ SITE: W.SITE, PROJECTS: W.PROJECTS, POSTS: W.POSTS, PARTNERS: W.PARTNERS, JOBS: W.JOBS, CAREERS: W.CAREERS });
const pages = OPEN.map((j) => ({ j, rel: `tuyen-dung/${j.id}.html` }));

test("Trang tổng tồn tại, đủ metadata và không lẫn JobPosting", () => {
  const h = read("tuyen-dung.html");
  assert.equal((h.match(/<h1\b/g) || []).length, 1, "cần đúng 1 H1");
  assert.match(h, /<link rel="canonical" href="https:\/\/paceland\.vn\/tuyen-dung\.html">/);
  for (const [a, n] of [["property", "og:title"], ["property", "og:description"], ["property", "og:image"], ["name", "twitter:card"], ["name", "description"]]) {
    assert.ok(meta(h, a, n), `thiếu ${n}`);
  }
  const ld = ldBlocks(h);
  const ids = ld.map((b) => b.id);
  assert.equal(new Set(ids).size, ids.length, "JSON-LD trùng id");
  assert.ok(!ld.some((b) => b.data["@type"] === "JobPosting"), "JobPosting chỉ được đặt ở trang từng vị trí");
  assert.ok(ids.includes("pl-ld-breadcrumb") && ids.includes("pl-ld-jobs"));
  assert.match(h, /<body class="careers no-chat">/);
});

test("Trang tổng: mỗi vị trí đang mở có hàng tĩnh + bộ lọc đủ nhóm", () => {
  const h = read("tuyen-dung.html");
  for (const j of OPEN) assert.ok(h.includes(`href="/tuyen-dung/${j.id}.html" data-job-link="${j.id}"`), `thiếu hàng ${j.id}`);
  const cats = new Set(OPEN.map((j) => j.category));
  for (const c of cats) assert.ok(h.includes(`data-filter="${c}"`), `thiếu nút lọc ${c}`);
  const list = ldBlocks(h).find((b) => b.id === "pl-ld-jobs").data;
  assert.equal(list.itemListElement.length, OPEN.length);
});

test("FAQ schema khớp đúng FAQ hiển thị (trang tổng)", () => {
  const h = read("tuyen-dung.html");
  const faq = ldBlocks(h).find((b) => b.id === "pl-ld-faq").data;
  const visible = [...h.matchAll(/<details class="cr-qa"[^>]*><summary><h3>([\s\S]*?)<\/h3>/g)].map((m) => m[1].replace(/&amp;/g, "&").replace(/&quot;/g, '"'));
  assert.equal(faq.mainEntity.length, visible.length, "số câu FAQ lệch");
  faq.mainEntity.forEach((q, i) => assert.equal(q.name, visible[i], `câu ${i + 1} lệch`));
});

test("Trang từng vị trí: metadata duy nhất + JobPosting hợp lệ", () => {
  const titles = new Set(), descs = new Set();
  for (const { j, rel } of pages) {
    assert.ok(exists(rel), `thiếu ${rel}`);
    const h = read(rel);
    assert.equal((h.match(/<h1\b/g) || []).length, 1, `${j.id}: cần 1 H1`);
    const t = /<title>([^<]+)<\/title>/.exec(h)[1];
    const d = meta(h, "name", "description");
    assert.ok(!titles.has(t), `${j.id}: title trùng`); titles.add(t);
    assert.ok(!descs.has(d), `${j.id}: description trùng`); descs.add(d);
    assert.match(h, new RegExp(`<link rel="canonical" href="${SITE_URL}/tuyen-dung/${j.id}\\.html">`));
    assert.ok(meta(h, "property", "og:image").includes("/assets/img/tuyen-dung/"), `${j.id}: og:image chưa dùng ảnh tuyển dụng`);
    const ld = ldBlocks(h);
    const jp = ld.find((b) => b.data["@type"] === "JobPosting");
    assert.ok(jp, `${j.id}: thiếu JobPosting`);
    const p = jp.data;
    for (const k of ["title", "description", "datePosted", "hiringOrganization", "jobLocation", "identifier", "url"]) assert.ok(p[k], `${j.id}: JobPosting thiếu ${k}`);
    assert.equal(p.datePosted, j.datePosted, `${j.id}: datePosted phải lấy từ dữ liệu, không tự sinh`);
    assert.equal(!!p.validThrough, !!j.validThrough, `${j.id}: validThrough chỉ có khi dữ liệu có`);
    assert.equal(!!p.baseSalary, !!(j.baseSalary && j.baseSalary.value), `${j.id}: baseSalary chỉ có khi dữ liệu có`);
    assert.equal(p.hiringOrganization["@id"], `${SITE_URL}/#organization`);
    assert.equal(p.hiringOrganization.name, "PaceLand");
    assert.ok(["FULL_TIME", "PART_TIME", "CONTRACTOR", "INTERN", "TEMPORARY", undefined].includes(p.employmentType));
    assert.ok(ld.find((b) => b.id === "pl-ld-breadcrumb"), `${j.id}: thiếu BreadcrumbList`);
    assert.match(h, /data-career-form/, `${j.id}: thiếu form`);
    assert.match(h, /data-sticky/, `${j.id}: thiếu sticky CTA`);
    assert.ok(h.includes(`<option value="${j.title.replace(/&/g, "&amp;")}" data-slug="${j.id}" selected>`), `${j.id}: form chưa chọn sẵn vị trí`);
  }
});

const esc = (x) => String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

test("H1 chứa từ khoá tìm việc; khẩu hiệu thương hiệu không phải H1", () => {
  const hub = read("tuyen-dung.html");
  const h1 = /<h1[^>]*>([^<]+)<\/h1>/.exec(hub)[1];
  assert.match(h1, /Tuyển dụng/);
  assert.ok(h1.includes(String(ctx.openings)), "H1 trang tổng phải có số vị trí sống");
  assert.match(hub, /<p class="cr-hero__title">Xây sự nghiệp\./);
  for (const { j, rel } of pages) {
    const jh1 = /<h1[^>]*>([^<]+)<\/h1>/.exec(read(rel))[1];
    assert.ok(jh1.startsWith("Tuyển ") && jh1.includes(esc(j.title)) && /bất động sản/.test(jh1), `${j.id}: H1 thiếu từ khoá (${jh1})`);
  }
});

test("Form: POST được khi không có JS, honeypot _gotcha ẩn, CTA nhảy thẳng vào khung form", () => {
  for (const rel of ["tuyen-dung.html", ...pages.map((p) => p.rel)]) {
    const h = read(rel);
    assert.match(h, /<form class="cr-form" data-career-form method="post" action="https:\/\/formspree\.io\/f\/[a-z0-9]+"/i, `${rel}: form thiếu method/action`);
    assert.ok(!/data-career-form[^>]*novalidate/.test(h), `${rel}: novalidate phải đặt bằng JS, không đặt trong HTML`);
    assert.match(h, /name="_gotcha"/, `${rel}: thiếu honeypot _gotcha`);
    assert.match(h, /id="form-ung-tuyen"/, `${rel}: thiếu neo #form-ung-tuyen`);
    assert.ok(!/href="#ung-tuyen"/.test(h), `${rel}: còn CTA trỏ #ung-tuyen (phần chữ) thay vì khung form`);
    assert.match(h, /data-submit>[^<]{8,60}</);
  }
});

test("Hàng vị trí: link nằm trong h3 (HTML hợp lệ), bộ lọc đếm theo số vị trí", () => {
  const h = read("tuyen-dung.html");
  assert.ok(!/<span class="cr-job__main"><h3/.test(h) && !/<a class="cr-job__link"[^>]*>\s*<span/.test(h), "h3 không được nằm trong span/a");
  for (const j of OPEN) assert.ok(h.includes(`<h3 class="cr-job__title"><a class="cr-job__link" href="/tuyen-dung/${j.id}.html" data-job-link="${j.id}">`), `${j.id}: hàng vị trí sai cấu trúc`);
  assert.ok(h.includes(`data-filter="all" aria-pressed="true">Tất cả <span>${ctx.openings}<`), "nút Tất cả phải đếm số vị trí mở");
  assert.match(h, /data-filter-status aria-live="polite"/);
});

test("Người thật + bằng chứng: Ban lãnh đạo có link hồ sơ, link bằng chứng mở tab mới", () => {
  const h = read("tuyen-dung.html");
  assert.ok(ctx.leaders.length > 0, "không có Ban lãnh đạo active trong PARTNERS");
  for (const p of ctx.leaders) {
    assert.ok(h.includes(`href="/chuyen-vien/${p.id}.html" target="_blank" rel="noopener" data-proof="leader"`), `thiếu ${p.id}`);
    assert.ok(exists(`chuyen-vien/${p.id}.html`), `chưa có trang hồ sơ ${p.id}`);
  }
  assert.match(h, /data-proof="profile_sample"/);
  assert.match(h, /class="cr-mid"/, "thiếu CTA giữa trang");
});

test("Thứ tự trang tổng: danh sách vị trí đứng ngay sau câu chuyện", () => {
  const h = read("tuyen-dung.html");
  const order = ["cr-story", "cr-jobs", "cr-eco", "cr-path", "cr-brandsec", "cr-leaders", "cr-mid", "cr-income", "cr-products", "cr-process", "cr-faq", "cr-apply"].map((c) => h.indexOf(`class="cr-sec ${c}`) >= 0 ? h.indexOf(`class="cr-sec ${c}`) : h.indexOf(`class="cr-sec cr-soft ${c}`) >= 0 ? h.indexOf(`class="cr-sec cr-soft ${c}`) : h.indexOf(`class="cr-sec cr-dark ${c}`) >= 0 ? h.indexOf(`class="cr-sec cr-dark ${c}`) : h.indexOf(`class="${c}"`));
  order.forEach((v, i) => assert.ok(v > 0, `thiếu khối số ${i + 1}`));
  for (let i = 1; i < order.length; i++) assert.ok(order[i] > order[i - 1], `khối số ${i + 1} sai thứ tự`);
});

test("Trang vị trí: hiện mô tả + ngày đăng (khớp JobPosting), ảnh OG có kích thước, dải Agent chỉ ở vị trí kinh doanh", () => {
  for (const { j, rel } of pages) {
    const h = read(rel);
    assert.ok(visibleText(h).includes(j.desc.replace(/\{\{\w+\}\}/g, "")) || h.includes(esc(j.desc)), `${j.id}: mô tả (desc) chưa hiển thị`);
    assert.ok(h.includes(`<time datetime="${j.datePosted}">`), `${j.id}: chưa hiện ngày đăng`);
    assert.equal(meta(h, "property", "og:image:width"), "1200");
    const sales = j.pathStage === "sales" || j.pathStage === "leader";
    assert.equal(/class="cr-rail"/.test(h), sales, `${j.id}: dải "Agent" chỉ dành cho vị trí kinh doanh`);
    const salesExp = h.includes("Chưa có kinh nghiệm bán hàng");
    assert.equal(salesExp, ["kinh-doanh", "lanh-dao"].includes(j.category), `${j.id}: câu hỏi kinh nghiệm sai nhóm`);
    assert.match(h, /<picture><source media="\(max-width: 899px\)"/, `${j.id}: poster phải có nguồn 1px cho mobile`);
  }
});

test("Trang mồ côi / đã đóng: giữ tiêu đề, noindex-ready, không form", () => {
  const page = renderJobPage({ j: { id: "vi-tri-cu", title: "Chuyên viên cũ", shortTitle: "Chuyên viên cũ", status: "closed" }, C: W.CAREERS, ctx, JOBS: W.JOBS, PROJECTS: W.PROJECTS, SITE_URL, root: ROOT });
  assert.equal(page.closed, true);
  assert.match(page.title, /đã ngừng tuyển/);
  assert.match(page.body, /data-job-title="Chuyên viên cũ"/);
  assert.ok(!/data-career-form|data-sticky/.test(page.body));
});

test("Trang tổng khi không còn vị trí mở: không vỡ nội dung, không số 0", () => {
  const closedAll = W.JOBS.map((j) => Object.assign({}, j, { status: "closed" }));
  const c0 = buildContext({ SITE: W.SITE, PROJECTS: W.PROJECTS, POSTS: W.POSTS, PARTNERS: W.PARTNERS, JOBS: closedAll, CAREERS: W.CAREERS });
  const hub = renderCareersHub({ C: W.CAREERS, ctx: c0, JOBS: closedAll, PROJECTS: W.PROJECTS, root: ROOT });
  assert.ok(!/\{\{\w+\}\}/.test(hub.body + hub.title + hub.desc), "còn placeholder");
  assert.ok(!/ 0 vị trí/.test(hub.title) && !/>0<\/dd>/.test(hub.body), "hiện số 0 vị trí");
  assert.match(hub.body, /Chưa có vị trí mới/);
  assert.match(hub.body, /data-career-form/, "vẫn nhận hồ sơ tự do");
});

test("Footer tĩnh + asset băm nội dung trên trang tuyển dụng", () => {
  for (const rel of ["tuyen-dung.html", ...pages.map((p) => p.rel)]) {
    const h = read(rel);
    assert.match(h, /<div id="footer-root"><!--pr:footer--><footer class="site-footer">/, `${rel}: thiếu footer tĩnh`);
    for (const m of h.matchAll(/assets\/(?:js|css)\/[\w.-]+\?v=([^"]+)"/g)) assert.match(m[1], /^[0-9a-f]{8}$/, `${rel}: ?v= chưa phải mã băm`);
  }
  const bc = ldBlocks(read("tuyen-dung.html")).find((b) => b.id === "pl-ld-breadcrumb").data;
  assert.equal(bc.itemListElement[0].item, "https://paceland.vn/", "Trang chủ trong breadcrumb phải là URL chuẩn /");
});

test("Không còn placeholder {{…}} và không lộ cụm bị cấm trong HTML", () => {
  for (const rel of ["tuyen-dung.html", ...pages.map((p) => p.rel)]) {
    const h = read(rel);
    assert.ok(!/\{\{\w+\}\}/.test(h), `${rel}: còn placeholder chưa thay`);
    const t = visibleText(h).toLowerCase();
    for (const bad of ["thu nhập không giới hạn", "môi trường năng động", "work hard play hard", "chỉ cần đam mê"]) assert.ok(!t.includes(bad), `${rel}: có cụm "${bad}"`);
  }
});

test("Vị trí đã đóng: không JobPosting, có thông báo, trỏ về vị trí đang tuyển", () => {
  const j = Object.assign({}, W.JOBS[0], { status: "closed" });
  const page = renderJobPage({ j, C: W.CAREERS, ctx, JOBS: W.JOBS, PROJECTS: W.PROJECTS, SITE_URL, root: ROOT });
  assert.equal(page.closed, true);
  assert.match(page.body, /đã ngừng tuyển/);
  assert.ok(!/data-career-form/.test(page.body), "trang đã đóng không nhận hồ sơ");
});

test("JobPosting & FAQ schema sinh từ component thuần", () => {
  const j = OPEN[0];
  const ld = jobPostingLd(j, { SITE_URL, ORG_LD: { address: { "@type": "PostalAddress", streetAddress: "x", addressCountry: "VN" } }, ctx });
  assert.equal(ld["@type"], "JobPosting");
  assert.match(ld.description, /<ul>/);
  const fq = faqLd(j.faq, ctx);
  assert.equal(fq.mainEntity.length, j.faq.length);
  const hub = renderCareersHub({ C: W.CAREERS, ctx, JOBS: W.JOBS, PROJECTS: W.PROJECTS, root: ROOT });
  assert.ok(hub.title.includes(String(ctx.openings)), "title trang tổng phải có số vị trí sống");
});

test("Sitemap: có trang tổng + vị trí đang mở, không có vị trí đã đóng", () => {
  const sm = read("sitemap.xml");
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.ok(locs.every((u) => /^[!-~]+$/.test(u)), "URL trong sitemap phải được mã hoá (không dấu tiếng Việt thô)");
  assert.ok(sm.includes(`${SITE_URL}/tuyen-dung.html`));
  for (const j of W.JOBS) {
    const inSm = sm.includes(`${SITE_URL}/tuyen-dung/${j.id}.html`);
    assert.equal(inSm, j.status === "open", `${j.id}: trạng thái sitemap sai`);
  }
});
