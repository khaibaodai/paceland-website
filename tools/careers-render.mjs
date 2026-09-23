/* ============================================================
   PACELAND — Recruitment System · component library (server-side)
   Hàm thuần sinh HTML cho /tuyen-dung.html và /tuyen-dung/<slug>.html.
   prerender.mjs gọi các hàm này; tools/tests/ kiểm thử trực tiếp.
   Nội dung lấy từ JOBS + CAREERS (assets/js/data.js). Placeholder
   {{projects}} {{posts}} {{partners}} {{openings}} {{roles}} {{agentCount}}
   {{agentSalary}} {{agentBase}} {{hotline}} {{email}} {{address}} {{locShort}}
   {{jobsList}} {{rolesList}} {{focusList}} được thay bằng số liệu sống lúc prerender —
   không hardcode con số.
   ============================================================ */
import fs from "node:fs";
import path from "node:path";

export const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = (s) => String(s == null ? "" : s).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

export const CATEGORY_LABELS = { "kinh-doanh": "Kinh doanh", marketing: "Marketing", "van-hanh": "Vận hành", "lanh-dao": "Lãnh đạo" };
const CATEGORY_ORDER = ["kinh-doanh", "lanh-dao", "marketing", "van-hanh"];
/* Nhóm dùng bộ câu hỏi kinh nghiệm "bán hàng" trong form */
const SALES_CATEGORIES = ["kinh-doanh", "lanh-dao"];
const EMPLOYMENT = { "toàn thời gian": "FULL_TIME", "bán thời gian": "PART_TIME", "cộng tác viên": "CONTRACTOR", "thực tập": "INTERN", "thời vụ": "TEMPORARY" };

/* Mọi nút "Ứng tuyển" trỏ thẳng vào khung form (không phải phần chữ phía trên) */
export const APPLY_HREF = "#form-ung-tuyen";
/* GIF 1×1 trong suốt — nguồn ảnh cho màn nhỏ khi poster bị ẩn, để trình duyệt không tải poster thật */
const PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const NEW_TAB = '<span class="cr-sr"> (mở tab mới)</span>';

const ICON_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

/* ---------- Dữ liệu & ngữ cảnh ---------- */
export function openJobs(jobs) {
  return (jobs || []).filter((j) => (j.status || "open") === "open").slice().sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));
}
const isLeader = (p) => p && p.status === "active" && String(p.level || "").trim().toLowerCase() === "ban lãnh đạo";
/* 5000000 -> "5 triệu" */
const moneyShort = (v) => {
  const n = Number(v) || 0;
  if (n >= 1e6) return `${String(Math.round((n / 1e6) * 10) / 10).replace(".", ",")} triệu`;
  return n ? `${n} đồng` : "";
};
const lowerFirst = (s) => String(s || "").replace(/^./, (c) => c.toLowerCase());
/* 2026-09-19 -> 19/09/2026 */
const dmy = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || ""); return m ? `${m[3]}/${m[2]}/${m[1]}` : ""; };

export function buildContext({ SITE, PROJECTS, POSTS, PARTNERS, JOBS, CAREERS }) {
  const open = openJobs(JOBS);
  const agent = open.find((j) => j.pathStage === "sales") || open[0] || {};
  const byId = Object.fromEntries((PROJECTS || []).map((p) => [p.id, p]));
  const labels = (CAREERS && CAREERS.products && CAREERS.products.labels) || {};
  const focus = ((CAREERS && CAREERS.products && CAREERS.products.focus) || []).filter((id) => byId[id]);
  const active = (PARTNERS || []).filter((p) => p.status === "active");
  return {
    SITE,
    projects: (PROJECTS || []).length,
    posts: (POSTS || []).length,
    partners: active.length,
    openings: open.reduce((n, j) => n + (parseInt(j.count, 10) || 0), 0),
    roles: open.length,
    agentCount: parseInt(agent.count, 10) || 0,
    agentSalary: lowerFirst(agent.salary),
    agentBase: agent.baseSalary && agent.baseSalary.value ? moneyShort(agent.baseSalary.value) : "",
    hotline: SITE.hotline,
    email: SITE.email,
    address: SITE.address,
    locShort: (CAREERS && CAREERS.locationShort) || "TP.HCM",
    jobsList: open.map((j) => `${j.count} ${j.shortTitle || j.title}`).join(", "),
    rolesList: open.map((j) => j.shortTitle || j.title).join(", "),
    focusList: focus.map((id) => labels[id] || byId[id].name).join(", "),
    partnerIds: active.map((p) => p.id),
    leaders: active.filter(isLeader),
  };
}
export function fill(str, ctx) {
  return String(str == null ? "" : str).replace(/\{\{(\w+)\}\}/g, (m, k) => (ctx && ctx[k] != null && typeof ctx[k] !== "object" ? String(ctx[k]) : m));
}
const F = (s, ctx) => esc(fill(s, ctx));
/* Như F nhưng cho phép **in đậm** — dùng cho danh sách dài cần tiêu đề dẫn ở đầu dòng.
   Escape trước rồi mới đổi dấu **, nên nội dung vẫn an toàn. */
const FB = (s, ctx) => F(s, ctx).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

/* Ảnh: dùng biến thể -540 nếu đã sinh (tools/og_jobs.py) cho màn nhỏ.
   hideBelow: khi CSS ẩn ảnh dưới bề rộng này, <picture> trả GIF 1px để không tải ảnh thật. */
export function imgTag(root, src, alt, { width, height, sizes, eager, cls, hideBelow } = {}) {
  if (!src) return "";
  const small = src.replace(/\.jpg$/i, "-540.jpg");
  const hasSmall = root && fs.existsSync(path.join(root, small));
  const srcset = hasSmall ? ` srcset="/${esc(small)} 540w, /${esc(src)} 1080w" sizes="${esc(sizes || "(max-width: 900px) 92vw, 420px")}"` : "";
  const img = `<img src="/${esc(src)}"${srcset} alt="${esc(alt)}"${width ? ` width="${width}" height="${height}"` : ""}${cls ? ` class="${cls}"` : ""} ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}>`;
  return hideBelow ? `<picture><source media="(max-width: ${hideBelow}px)" srcset="${PIXEL}">${img}</picture>` : img;
}

/* ---------- Components dùng chung ---------- */
export function Breadcrumb(items) {
  return `<nav class="breadcrumb cr-crumb" aria-label="breadcrumb">` +
    items.map((it, i) => (it.href ? `<a href="${esc(it.href)}">${esc(it.label)}</a>` : `<span aria-current="page">${esc(it.label)}</span>`) +
      (i < items.length - 1 ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>' : "")).join("") +
    `</nav>`;
}
function head(eyebrow, title, sub, ctx, id) {
  return `<header class="cr-head">${eyebrow ? `<p class="cr-eyebrow">${F(eyebrow, ctx)}</p>` : ""}<h2${id ? ` id="${id}"` : ""}>${F(title, ctx)}</h2>${sub ? `<p>${F(sub, ctx)}</p>` : ""}</header>`;
}
/* Tách tiêu đề 2 câu: câu đầu mực đen, phần sau đỏ thương hiệu */
function splitTitle(t) {
  const i = String(t).indexOf(". ");
  return i > 0 ? [t.slice(0, i + 1), t.slice(i + 2)] : [t, ""];
}

export function CareerStats(C, ctx) {
  const facts = (C.facts || []).filter((f) => { const v = fill(f.value, ctx).trim(); return v && v !== "0" && !/\{\{/.test(v); });
  if (!facts.length) return "";
  return `<dl class="cr-stats">` + facts.map((f) =>
    `<div class="cr-stat"><dt>${F(f.label, ctx)}</dt><dd class="cr-stat__v">${F(f.value, ctx)}</dd>${f.note ? `<dd class="cr-stat__n">${F(f.note, ctx)}</dd>` : ""}</div>`).join("") + `</dl>`;
}

/* Hero trang tổng: H1 chứa từ khoá tìm việc; khẩu hiệu thương hiệu là chữ lớn (p) */
export function CareerHero(C, ctx) {
  const h = C.hero || {};
  const hasJobs = ctx.roles > 0;
  const h1 = hasJobs ? fill(h.h1 || "Tuyển dụng PaceLand: {{openings}} vị trí bất động sản tại {{locShort}}", ctx) : fill("Tuyển dụng PaceLand: việc làm bất động sản tại {{locShort}}", ctx);
  const sub = hasJobs ? h.sub : "PaceLand hiện chưa mở vị trí mới. Bạn vẫn có thể để lại thông tin, bộ phận tuyển dụng sẽ liên hệ khi có vị trí phù hợp.";
  return `<section class="cr-hero" aria-labelledby="crHeroTitle"><div class="container">
${Breadcrumb([{ label: "Trang chủ", href: "/" }, { label: "Tuyển dụng" }])}
<h1 id="crHeroTitle" class="cr-h1">${esc(h1)}</h1>
<p class="cr-hero__title">${F(h.title, ctx)} <span>${F(h.titleAccent, ctx)}</span></p>
<p class="cr-hero__sub">${F(sub, ctx)}</p>
<div class="cr-actions">
  <a class="cr-btn cr-btn--red" href="${APPLY_HREF}" data-cta="hero_apply" data-apply>${F(h.primaryCta || "Ứng tuyển ngay", ctx)} ${ICON_ARROW}</a>
  ${hasJobs ? `<a class="cr-btn cr-btn--line" href="#vi-tri" data-cta="hero_jobs">${F(h.secondaryCta || "Xem vị trí đang tuyển", ctx)}</a>` : ""}
</div>
${CareerStats(C, ctx)}
</div></section>`;
}

export function CareerStory(C, ctx) {
  const s = C.story || {};
  return `<section class="cr-sec cr-story" aria-labelledby="crStoryTitle"><div class="container">
${head("", s.title, s.sub, ctx, "crStoryTitle")}
<ol class="cr-steps">${(s.steps || []).map((st) =>
    `<li class="cr-step"><span class="cr-step__kicker" lang="en">${F(st.kicker, ctx)}</span><h3>${F(st.title, ctx)}</h3><p>${F(st.text, ctx)}</p></li>`).join("")}</ol>
</div></section>`;
}

/* Hệ sinh thái hỗ trợ — ids: chỉ hiển thị các module được chọn (trang vị trí);
   rail: dải "Hệ thống → Agent → khách hàng" chỉ hợp với trang tổng và vị trí kinh doanh */
export function CareerEcosystem(C, ctx, { ids, eyebrow, title, sub, rail = true } = {}) {
  const e = C.ecosystem || {};
  const mods = (e.modules || []).filter((m) => !ids || ids.includes(m.id));
  if (!mods.length) return "";
  const cols = mods.length >= 5 ? 3 : mods.length === 4 ? 2 : mods.length;
  return `<section class="cr-sec cr-dark cr-eco" id="he-thong" aria-labelledby="crEcoTitle"><div class="container">
${head(eyebrow || "Hệ thống phía sau bạn", title || e.title, sub || e.sub, ctx, "crEcoTitle")}
<ul class="cr-mods cr-mods--${cols}">${mods.map((m) =>
    `<li class="cr-mod"><h3>${F(m.title, ctx)}</h3><p>${F(m.text, ctx)}</p>${m.href ? `<a href="${esc(m.href)}">${F(m.link, ctx)} ${ICON_ARROW}</a>` : ""}</li>`).join("")}</ul>
${rail ? `<ol class="cr-rail" aria-label="Luồng làm việc"><li>Hệ thống PaceLand</li><li class="is-agent">Agent</li>${(e.flow || []).map((x) => `<li>${F(x, ctx)}</li>`).join("")}</ol>` : ""}
</div></section>`;
}

export function CareerPath(C, ctx, { current } = {}) {
  const p = C.path || {};
  return `<section class="cr-sec cr-path" id="lo-trinh" aria-labelledby="crPathTitle"><div class="container">
${head("Lộ trình nghề nghiệp", p.title, p.sub, ctx, "crPathTitle")}
<ol class="cr-track">${(p.stages || []).map((st, i) =>
    `<li class="cr-stage${st.id === current ? " is-current" : ""}"><span class="cr-stage__idx">Bậc ${i + 1}${st.id === current ? ' · <b>Vị trí này</b>' : ""}</span><h3>${F(st.title, ctx)}</h3><ul>${(st.points || []).map((x) => `<li>${F(x, ctx)}</li>`).join("")}</ul>` +
    (st.job && st.id !== current ? `<a href="/tuyen-dung/${esc(st.job)}.html" data-path-step="${esc(st.id)}">Xem vị trí liên quan ${ICON_ARROW}</a>` : "") + `</li>`).join("")}</ol>
</div></section>`;
}

export function CareerBrand(C, ctx) {
  const b = C.brand || {};
  const sample = b.sampleProfile && (ctx.partnerIds || []).includes(b.sampleProfile) ? b.sampleProfile : "";
  return `<section class="cr-sec cr-brandsec" aria-labelledby="crBrandTitle"><div class="container"><div class="cr-brand">
<figure class="cr-idcard-wrap"><div class="cr-idcard" role="img" aria-label="Minh họa thẻ hồ sơ chuyên viên PaceLand có mã chứng nhận">
  <div class="cr-idcard__top"><span>PaceLand</span><span>Chuyên viên chứng nhận</span></div>
  <div><div class="cr-idcard__name">[Tên của bạn]</div><div class="cr-idcard__code">PL-xxxx</div></div>
  <div class="cr-idcard__foot"><span>paceland.vn/chuyen-vien/ten-cua-ban</span><span class="cr-idcard__ok">✓ Tra cứu công khai</span></div>
</div><figcaption>Minh họa cấu trúc hồ sơ. Mã và trang hồ sơ thật được cấp khi nhận việc.</figcaption></figure>
<div><p class="cr-eyebrow">Tài sản nghề nghiệp</p><h2 id="crBrandTitle">${F(b.title, ctx)}</h2><p class="cr-brand__text">${F(b.text, ctx)}</p>
<div class="cr-brand__links">${sample ? `<a class="cr-textlink" href="/chuyen-vien/${esc(sample)}.html" target="_blank" rel="noopener" data-proof="profile_sample">${F(b.sampleLink || "Xem một trang hồ sơ thật", ctx)} ${ICON_ARROW}${NEW_TAB}</a>` : ""}
<a class="cr-textlink" href="/chung-nhan-doi-tac.html" target="_blank" rel="noopener" data-proof="partners">${F(b.link, ctx)} ${ICON_ARROW}${NEW_TAB}</a></div></div>
</div></div></section>`;
}

/* Ban lãnh đạo — người thật, lấy từ PARTNERS (level "Ban lãnh đạo"), có trang hồ sơ + mã tra cứu */
export function CareerLeaders(ctx, { title = "Đội ngũ điều hành PaceLand", sub = "Mỗi người đều có mã chứng nhận và trang hồ sơ tra cứu công khai trên paceland.vn." } = {}) {
  const L = ctx.leaders || [];
  if (!L.length) return "";
  const initials = (n) => String(n || "").split(/\s+/).filter(Boolean).slice(-2).map((w) => w[0]).join("").toUpperCase();
  return `<section class="cr-sec cr-leaders" aria-labelledby="crLeadTitle"><div class="container">
${head("Ban lãnh đạo", title, sub, ctx, "crLeadTitle")}
<ul class="cr-leaders__list">${L.map((p) =>
    `<li><a href="/chuyen-vien/${esc(p.id)}.html" target="_blank" rel="noopener" data-proof="leader"><span class="cr-mono" aria-hidden="true">${esc(initials(p.name))}</span><span class="cr-leader"><b>${esc(p.name)}</b><span>${esc(p.role)}</span><span class="cr-leader__code">${esc(p.code)}</span></span>${NEW_TAB}</a></li>`).join("")}</ul>
</div></section>`;
}

/* CTA giữa trang — cho người đã đủ tin, không bắt họ cuộn tới cuối */
export function MidCta(ctx, { title, sub, cta = "Ứng tuyển ngay", loc = "mid" } = {}) {
  if (!title) return "";
  return `<aside class="cr-mid" aria-label="Ứng tuyển nhanh"><div class="container cr-mid__in">
<div><p class="cr-mid__t">${F(title, ctx)}</p>${sub ? `<p class="cr-mid__s">${F(sub, ctx)}</p>` : ""}</div>
<div class="cr-mid__a"><a class="cr-btn cr-btn--red" href="${APPLY_HREF}" data-apply data-cta="${esc(loc)}">${esc(cta)} ${ICON_ARROW}</a><a class="cr-btn cr-btn--line" href="${esc(ctx.SITE.zalo)}" target="_blank" rel="noopener" data-cta="${esc(loc)}_zalo">Nhắn Zalo</a></div>
</div></aside>`;
}

export function CareerIncome(C, ctx, jobs, root) {
  const inc = C.income || {};
  const poster = C.posters && C.posters.income;
  return `<section class="cr-sec cr-income" id="thu-nhap" aria-labelledby="crIncomeTitle"><div class="container cr-split">
<div>
${head("Thu nhập & quyền lợi", inc.title, inc.sub, ctx, "crIncomeTitle")}
${jobs.length ? `<table class="cr-comp"><caption class="cr-sr">Thu nhập theo vị trí</caption><thead><tr><th scope="col">Vị trí</th><th scope="col">Thu nhập</th></tr></thead><tbody>${jobs.map((j) =>
    `<tr><th scope="row"><a href="/tuyen-dung/${esc(j.id)}.html">${esc(j.shortTitle || j.title)}</a></th><td>${esc(j.salary)}</td></tr>`).join("")}</tbody></table>` : ""}
<ul class="cr-bullets cr-bullets--2">${(inc.benefits || []).map((x) => `<li>${F(x, ctx)}</li>`).join("")}</ul>
</div>
${poster ? `<figure class="cr-poster cr-poster--sticky">${imgTag(root, poster, "Poster PaceLand: gia nhập PaceLand không chỉ là hoa hồng — chia sẻ doanh thu lên đến 75%", { width: 1080, height: 1080 })}</figure>` : ""}
</div></section>`;
}

/* Một hàng vị trí: link nằm trong h3, phủ cả hàng bằng ::after (HTML hợp lệ, click được toàn hàng) */
export function JobRow(j, { compact } = {}) {
  const cat = CATEGORY_LABELS[j.category] || j.dept;
  return `<li class="cr-job" data-category="${esc(j.category || "")}">
<div class="cr-job__count">${esc(j.count || "")}<small>vị trí</small></div>
<div class="cr-job__main"><h3 class="cr-job__title"><a class="cr-job__link" href="/tuyen-dung/${esc(j.id)}.html" data-job-link="${esc(j.id)}">${esc(j.title)}</a></h3><p class="cr-job__meta">${esc(cat)} · ${esc(j.location)} · ${esc(j.type)}</p>${compact ? "" : `<p class="cr-job__vp">${esc(j.summary || j.desc || "")}</p>`}</div>
<div class="cr-job__side"><p class="cr-job__pay">${esc(j.salary)}</p><span class="cr-job__cta" aria-hidden="true">Xem vị trí ${ICON_ARROW}</span></div>
</li>`;
}

/* Bộ lọc: số trên nút = số vị trí mở (khớp tiêu đề "N vị trí cho M vai trò") */
export function JobFilter(jobs) {
  const n = (j) => parseInt(j.count, 10) || 0;
  const counts = {};
  jobs.forEach((j) => { counts[j.category] = (counts[j.category] || 0) + n(j); });
  const cats = CATEGORY_ORDER.filter((c) => counts[c] != null);
  if (cats.length < 2) return "";
  const total = jobs.reduce((s, j) => s + n(j), 0);
  const num = (v) => `<span>${v}<span class="cr-sr"> vị trí</span></span>`;
  return `<div class="cr-filter" role="group" aria-label="Lọc vị trí theo nhóm">
<button type="button" data-filter="all" aria-pressed="true">Tất cả ${num(total)}</button>${cats.map((c) =>
    `<button type="button" data-filter="${c}" aria-pressed="false">${esc(CATEGORY_LABELS[c])} ${num(counts[c])}</button>`).join("")}
</div>`;
}

export function JobList(C, ctx, jobs, root) {
  if (!jobs.length) {
    return `<section class="cr-sec cr-soft cr-jobs" id="vi-tri" aria-labelledby="crJobsTitle"><div class="container">
<header class="cr-head"><p class="cr-eyebrow">Vị trí đang tuyển</p><h2 id="crJobsTitle">Chưa có vị trí mới</h2><p>PaceLand hiện chưa mở vị trí tuyển dụng. Bạn vẫn có thể để lại thông tin, bộ phận tuyển dụng sẽ liên hệ khi có vị trí phù hợp.</p></header>
<a class="cr-btn cr-btn--red" href="${APPLY_HREF}" data-apply data-cta="jobs_empty">Để lại thông tin ${ICON_ARROW}</a>
</div></section>`;
  }
  const poster = C.posters && C.posters.hub;
  return `<section class="cr-sec cr-soft cr-jobs" id="vi-tri" aria-labelledby="crJobsTitle"><div class="container">
<header class="cr-head cr-head--row"><div><p class="cr-eyebrow">Vị trí đang tuyển</p><h2 id="crJobsTitle">${esc(ctx.openings)} vị trí cho ${esc(ctx.roles)} vai trò</h2></div>${JobFilter(jobs)}</header>
<p class="cr-sr" data-filter-status aria-live="polite"></p>
<div class="cr-jobs__grid">
<div><ul class="cr-joblist" id="jobList">${jobs.map((j) => JobRow(j)).join("")}</ul>
<p class="cr-empty" data-filter-empty hidden>Chưa có vị trí trong nhóm này. <a href="${APPLY_HREF}" data-apply data-cta="filter_empty">Gửi hồ sơ tự do</a></p></div>
${poster ? `<figure class="cr-poster cr-poster--sticky cr-jobs__poster">${imgTag(root, poster, `PaceLand tuyển đồng đội: ${ctx.jobsList} — văn phòng Quận 2`, { width: 1080, height: 1080, hideBelow: 767 })}</figure>` : ""}
</div>
</div></section>`;
}

export function ProductFocus(C, ctx, PROJECTS, root, { withPoster = true } = {}) {
  const pr = C.products || {};
  const byId = Object.fromEntries((PROJECTS || []).map((p) => [p.id, p]));
  const labels = pr.labels || {};
  const items = (pr.focus || []).map((id) => byId[id]).filter(Boolean);
  if (!items.length) return "";
  const poster = withPoster && C.posters && C.posters.products;
  const thumb = (p) => {
    const t = `assets/img/tuyen-dung/du-an-${p.id}.jpg`;
    const src = root && fs.existsSync(path.join(root, t)) ? t : String(p.cover || "").replace(/^\//, "");
    return `<img src="/${esc(src)}" alt="" width="192" height="128" loading="lazy" decoding="async">`;
  };
  return `<section class="cr-sec cr-products" aria-labelledby="crProdTitle"><div class="container${poster ? " cr-split" : ""}">
<div>
${head("Danh mục sản phẩm", pr.title, pr.sub, ctx, "crProdTitle")}
<ul class="cr-prodlist">${items.map((p) =>
    `<li><a href="/du-an/${esc(p.id)}.html">${thumb(p)}<span><b>${esc(labels[p.id] || p.name)}</b><span>${esc(p.developer)} · ${esc(p.area)}</span></span>${ICON_ARROW}</a></li>`).join("")}</ul>
<a class="cr-textlink" href="/du-an.html">Xem toàn bộ ${esc(ctx.projects)} dự án ${ICON_ARROW}</a>
</div>
${poster ? `<figure class="cr-poster cr-poster--sticky">${imgTag(root, poster, `Danh mục sản phẩm tinh tuyển PaceLand: ${ctx.focusList}`, { width: 1080, height: 1080 })}</figure>` : ""}
</div></section>`;
}

export function RecruitmentProcess(C, ctx) {
  const p = C.process || {};
  return `<section class="cr-sec cr-process" id="quy-trinh" aria-labelledby="crProcTitle"><div class="container">
${head("Quy trình", p.title, p.sub, ctx, "crProcTitle")}
<ol class="cr-proc">${(p.steps || []).map((s) => `<li><h3>${F(s.title, ctx)}</h3><p>${F(s.text, ctx)}</p></li>`).join("")}</ol>
</div></section>`;
}

export function CareerFAQ(items, ctx, { title = "Câu hỏi thường gặp", sub = "", id = "hoi-dap" } = {}) {
  if (!(items || []).length) return "";
  return `<section class="cr-sec cr-faq" id="${id}" aria-labelledby="crFaqTitle"><div class="container cr-narrow">
${head("Hỏi nhanh", title, sub, ctx, "crFaqTitle")}
<div class="cr-faqlist">${items.map((f, i) =>
    `<details class="cr-qa" data-faq="${i + 1}"><summary><h3>${F(f.q, ctx)}</h3></summary><div><p>${F(f.a, ctx)}</p></div></details>`).join("")}</div>
</div></section>`;
}

/* Form ứng tuyển — careers.js (data-career-form) xử lý khi có JS; không có JS thì
   form vẫn POST thẳng tới Formspree với kiểm tra bắt buộc gốc của trình duyệt.
   group: "sales" | "general" | "" (trang tổng: hiện cả hai nhóm câu kinh nghiệm) */
export function ApplicationForm(C, ctx, jobs, { selected = "", group = "" } = {}) {
  const f = C.form || {};
  const S = ctx.SITE || {};
  const action = S.careersEndpoint || S.formEndpoint || "";
  const sel = jobs.find((j) => j.id === selected);
  const opt = (v, label, isSel, extra = "") => `<option value="${esc(v)}"${extra}${isSel ? " selected" : ""}>${esc(label)}</option>`;
  const list = (arr) => (arr || []).map((x) => opt(x, x, false)).join("");
  const sales = f.experienceOptionsSales || f.experienceOptions || [];
  const general = f.experienceOptions || [];
  const exp = group === "sales" ? list(sales) : group === "general" ? list(general)
    : `<optgroup label="Vị trí kinh doanh">${list(sales)}</optgroup><optgroup label="Marketing / vận hành">${list(general)}</optgroup>`;
  return `<form class="cr-form" data-career-form method="post"${action ? ` action="${esc(action)}"` : ""} accept-charset="UTF-8">
<div class="cr-field"><label for="cfName">Họ và tên <span class="req" aria-hidden="true">*</span></label><input id="cfName" name="full_name" autocomplete="name" required maxlength="80" aria-describedby="cfNameErr"><p class="cr-err" id="cfNameErr" hidden></p></div>
<div class="cr-field"><label for="cfPhone">Số điện thoại <span class="req" aria-hidden="true">*</span></label><input id="cfPhone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20" placeholder="VD: 0903 983 737" aria-describedby="cfPhoneErr"><p class="cr-err" id="cfPhoneErr" hidden></p></div>
<div class="cr-field"><label for="cfPos">Vị trí ứng tuyển <span class="req" aria-hidden="true">*</span></label><select id="cfPos" name="position" required aria-describedby="cfPosErr">${opt("", "Chọn vị trí", !sel)}${jobs.map((j) => opt(j.title, `${j.title} · ${j.count} vị trí`, j.id === selected, ` data-slug="${esc(j.id)}"`)).join("")}${opt("Vị trí khác", "Vị trí khác / chưa rõ", false, ' data-slug=""')}</select><p class="cr-err" id="cfPosErr" hidden></p></div>
<div class="cr-field"><label for="cfExp">Kinh nghiệm <span class="cr-opt">(không bắt buộc)</span></label><select id="cfExp" name="experience">${opt("", "Chọn mức gần nhất", true)}${exp}</select></div>
<details class="cr-more"><summary>Thêm email, link CV hoặc lời nhắn <span>(không bắt buộc)</span></summary><div class="cr-more__body">
<div class="cr-field"><label for="cfEmail">Email</label><input id="cfEmail" name="email" type="email" inputmode="email" autocomplete="email" maxlength="120" aria-describedby="cfEmailErr"><p class="cr-err" id="cfEmailErr" hidden></p></div>
<div class="cr-field"><label for="cfLink">Link CV, LinkedIn hoặc portfolio</label><input id="cfLink" name="profile_url" type="url" inputmode="url" maxlength="300" placeholder="https://" aria-describedby="cfLinkErr"><p class="cr-err" id="cfLinkErr" hidden></p></div>
<div class="cr-field"><label for="cfMsg">Lời nhắn</label><textarea id="cfMsg" name="message" rows="3" maxlength="1000"></textarea></div>
</div></details>
<div class="cr-hp" aria-hidden="true"><label for="cfHp">Để trống ô này</label><input id="cfHp" name="_gotcha" type="text" tabindex="-1" autocomplete="off"></div>
<input type="hidden" name="_subject" value="${esc(`Ứng tuyển PaceLand${sel ? ` · ${sel.title}` : ""}`)}"><input type="hidden" name="kind" value="application"><input type="hidden" name="job_slug" value="${esc(selected)}">
<button class="cr-btn cr-btn--red cr-btn--block" type="submit" data-submit>Gửi thông tin ứng tuyển</button>
<p class="cr-form__note">${F(f.privacy, ctx)}</p>
<p class="cr-form__status" role="alert" data-status hidden></p>
</form>
<div class="cr-done" data-done hidden tabindex="-1">
<p class="cr-eyebrow">Đã gửi hồ sơ</p><p class="cr-done__title">${F(f.successTitle, ctx)}</p><p>${F(f.successText, ctx)}</p>
<p class="cr-done__id">Mã hồ sơ của bạn: <b data-app-id></b></p>
<div class="cr-done__next"><a class="cr-btn cr-btn--red" href="${esc(S.zalo)}" target="_blank" rel="noopener" data-cta="done_zalo">Nhắn Zalo PaceLand</a><a class="cr-btn cr-btn--line" href="/du-an.html">Xem dự án</a><a class="cr-btn cr-btn--line" href="${esc(S.facebook)}" target="_blank" rel="noopener">Theo dõi fanpage</a></div>
</div>`;
}

/* Khối ứng tuyển cuối trang (nền đen) — khung form có id="form-ung-tuyen" để mọi CTA nhảy thẳng vào form */
export function ApplySection(C, ctx, jobs, { title, sub, selected = "", eyebrow = "Ứng tuyển", group = "" } = {}) {
  const S = ctx.SITE;
  return `<section class="cr-sec cr-dark cr-apply" id="ung-tuyen" aria-labelledby="crApplyTitle"><div class="container cr-apply__grid">
<div class="cr-apply__copy">
<p class="cr-eyebrow">${F(eyebrow, ctx)}</p><h2 id="crApplyTitle">${F(title, ctx)}</h2><p class="cr-apply__sub">${F(sub, ctx)}</p>
<p class="cr-apply__hint">${F((C.form || {}).sub, ctx)}</p>
<ul class="cr-apply__alt">
<li><span>Zalo</span><a href="${esc(S.zalo)}" target="_blank" rel="noopener" data-cta="apply_alt_zalo">${esc(S.hotline)}</a></li>
<li><span>Email</span><a href="mailto:${esc(S.email)}">${esc(S.email)}</a></li>
<li><span>Fanpage</span><a href="${esc(S.facebook)}" target="_blank" rel="noopener">facebook.com/paceland.vn</a></li>
</ul>
</div>
<div class="cr-apply__panel" id="form-ung-tuyen">${ApplicationForm(C, ctx, jobs, { selected, group })}</div>
</div></section>`;
}

export function StickyApplyBar(ctx, { label = "Ứng tuyển ngay" } = {}) {
  return `<div class="cr-sticky" data-sticky aria-hidden="true"><a class="cr-btn cr-btn--red" href="${APPLY_HREF}" data-apply data-cta="sticky_bar" tabindex="-1">${esc(label)}</a><a class="cr-btn cr-btn--line" href="${esc(ctx.SITE.zalo)}" target="_blank" rel="noopener" data-cta="sticky_zalo" tabindex="-1">Zalo</a></div>`;
}

/* Link chia sẻ gắn UTM theo kênh để đo được lượt ứng tuyển đến từ chia sẻ */
export function SocialShare(url, title) {
  const tagged = (src) => encodeURIComponent(`${url}?utm_source=${src}&utm_medium=social_share&utm_campaign=recruitment`);
  return `<div class="cr-share" data-share-root data-share-url="${esc(url)}" data-share-title="${esc(title)}"><span class="cr-share__label">Chia sẻ vị trí này</span>
<button type="button" data-share="native" hidden>Chia sẻ…</button>
<a href="https://www.facebook.com/sharer/sharer.php?u=${tagged("facebook")}" target="_blank" rel="noopener" data-share="facebook">Facebook</a>
<a href="https://www.linkedin.com/sharing/share-offsite/?url=${tagged("linkedin")}" target="_blank" rel="noopener" data-share="linkedin">LinkedIn</a>
<button type="button" data-share="copy">Sao chép link</button></div>`;
}

/* ---------- Structured data ---------- */
export function jobPostingLd(j, { SITE_URL, ORG_LD, ctx }) {
  const url = `${SITE_URL}/tuyen-dung/${j.id}.html`;
  /* Dấu ** trong dữ liệu là in đậm — đổi sang <strong> để Google Jobs hiển thị đúng,
     không để lọt hai dấu sao thô vào mô tả tin tuyển dụng. */
  const md = (x) => esc(fill(x, ctx)).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const li = (arr) => (arr || []).map((x) => `<li>${md(x)}</li>`).join("");
  const plain = (arr) => (arr || []).map((x) => fill(x, ctx).replace(/\*\*/g, "")).join(" ");
  const description = `<p>${esc(fill(j.desc, ctx))}</p>` +
    ((j.duties || []).length ? `<p><strong>Mô tả công việc</strong></p><ul>${li(j.duties)}</ul>` : "") +
    ((j.reqs || []).length ? `<p><strong>Yêu cầu</strong></p><ul>${li(j.reqs)}</ul>` : "") +
    ((j.kpis || []).length ? `<p><strong>Chỉ số theo dõi kết quả</strong></p><ul>${li(j.kpis)}</ul>${j.kpiNote ? `<p>${esc(fill(j.kpiNote, ctx))}</p>` : ""}` : "") +
    ((j.benefits || []).length ? `<p><strong>Quyền lợi</strong></p><ul>${li(j.benefits)}</ul>` : "") +
    ((j.obligations || []).length ? `<p><strong>Nghĩa vụ</strong></p><ul>${li(j.obligations)}</ul>` : "");
  const ld = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: j.title,
    description,
    identifier: { "@type": "PropertyValue", name: "PaceLand", value: j.id },
    ...(j.datePosted ? { datePosted: j.datePosted } : {}),
    ...(j.validThrough ? { validThrough: j.validThrough } : {}),
    ...(EMPLOYMENT[String(j.type || "").toLowerCase()] ? { employmentType: EMPLOYMENT[String(j.type).toLowerCase()] } : {}),
    hiringOrganization: { "@type": "Organization", "@id": SITE_URL + "/#organization", name: "PaceLand", sameAs: SITE_URL + "/", logo: SITE_URL + "/assets/img/logo.png" },
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", ...ORG_LD.address } },
    ...(parseInt(j.count, 10) ? { totalJobOpenings: parseInt(j.count, 10) } : {}),
    ...(j.baseSalary && j.baseSalary.value ? { baseSalary: { "@type": "MonetaryAmount", currency: j.baseSalary.currency || "VND", value: { "@type": "QuantitativeValue", value: j.baseSalary.value, unitText: j.baseSalary.unit || "MONTH" } } } : {}),
    ...(j.experienceRequirements ? { experienceRequirements: j.experienceRequirements } : {}),
    ...(j.educationRequirements ? { educationRequirements: j.educationRequirements } : {}),
    ...((j.duties || []).length ? { responsibilities: plain(j.duties) } : {}),
    ...((j.benefits || []).length ? { jobBenefits: plain(j.benefits) } : {}),
    industry: "Bất động sản",
    directApply: true,
    url,
  };
  return ld;
}
export function faqLd(items, ctx) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: (items || []).map((f) => ({ "@type": "Question", name: strip(fill(f.q, ctx)), acceptedAnswer: { "@type": "Answer", text: strip(fill(f.a, ctx)) } })) };
}
export function itemListLd(jobs, SITE_URL) {
  return { "@context": "https://schema.org", "@type": "ItemList", name: "Vị trí đang tuyển tại PaceLand", itemListElement: jobs.map((j, i) => ({ "@type": "ListItem", position: i + 1, name: j.title, url: `${SITE_URL}/tuyen-dung/${j.id}.html` })) };
}

/* ---------- Trang: Careers Hub ---------- */
export function renderCareersHub({ C, ctx, JOBS, PROJECTS, root }) {
  const jobs = openJobs(JOBS);
  const fc = C.finalCta || {};
  const mid = C.midCta || {};
  const body = `<div class="cr" data-careers="hub">
${CareerHero(C, ctx)}
${CareerStory(C, ctx)}
${JobList(C, ctx, jobs, root)}
${CareerEcosystem(C, ctx)}
${CareerPath(C, ctx)}
${CareerBrand(C, ctx)}
${CareerLeaders(ctx)}
${MidCta(ctx, { title: mid.title, sub: mid.sub, cta: mid.button || "Ứng tuyển ngay", loc: "hub_mid" })}
${CareerIncome(C, ctx, jobs, root)}
${ProductFocus(C, ctx, PROJECTS, root)}
${RecruitmentProcess(C, ctx)}
${CareerFAQ(C.faq, ctx)}
${ApplySection(C, ctx, jobs, { title: fc.title, sub: fc.sub })}
${StickyApplyBar(ctx)}
</div>`;
  const seo = C.seo || {};
  return {
    body, jobs,
    title: jobs.length ? fill(seo.title, ctx) : fill(seo.titleEmpty || "Tuyển dụng bất động sản {{locShort}} | PaceLand", ctx),
    desc: jobs.length ? fill(seo.description, ctx) : fill(seo.descriptionEmpty || "Tuyển dụng PaceLand: việc làm bất động sản tại {{locShort}}. Để lại thông tin để được liên hệ khi có vị trí phù hợp.", ctx),
  };
}

/* ---------- Trang: từng vị trí ---------- */
/* H1 = từ khoá tìm việc ("Tuyển 20 … tại Quận 2, TP.HCM"); tiêu đề thương hiệu là chữ lớn (p) */
export function jobH1(j, ctx) {
  const t = String(j.title || "");
  return `Tuyển ${j.count ? `${j.count} ` : ""}${t}${/bất động sản|BĐS/i.test(t) ? "" : " bất động sản"} tại ${ctx.locShort}`;
}

export function JobHero(j, ctx, root) {
  const [a, b] = splitTitle(fill((j.hero || {}).title || j.title, ctx));
  const facts = [["Tuyển", `${j.count} vị trí`], ["Thu nhập", j.salary], ["Địa điểm", j.location], ["Hình thức", j.type]];
  const posted = dmy(j.datePosted);
  const updated = j.updated && j.updated !== j.datePosted ? dmy(j.updated) : "";
  return `<section class="cr-hero cr-hero--job" aria-labelledby="crJobTitle"><div class="container">
${Breadcrumb([{ label: "Trang chủ", href: "/" }, { label: "Tuyển dụng", href: "/tuyen-dung.html" }, { label: j.shortTitle || j.title }])}
<div class="cr-jobhero"><div class="cr-jobhero__copy">
<h1 id="crJobTitle" class="cr-h1">${esc(jobH1(j, ctx))}</h1>
<p class="cr-hero__title">${esc(a)}${b ? ` <span>${esc(b)}</span>` : ""}</p>
<p class="cr-hero__sub">${F((j.hero || {}).sub || j.desc, ctx)}</p>
<div class="cr-actions"><a class="cr-btn cr-btn--red" href="${APPLY_HREF}" data-apply data-cta="job_hero">Ứng tuyển vị trí này ${ICON_ARROW}</a><a class="cr-btn cr-btn--line" href="${esc(ctx.SITE.zalo)}" target="_blank" rel="noopener" data-cta="job_hero_zalo">Nhắn Zalo</a></div>
<dl class="cr-facts">${facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
${posted ? `<p class="cr-posted">Đăng ngày <time datetime="${esc(j.datePosted)}">${posted}</time>${updated ? ` · Cập nhật <time datetime="${esc(j.updated)}">${updated}</time>` : ""}</p>` : ""}
</div>
${j.poster ? `<figure class="cr-poster cr-jobhero__poster">${imgTag(root, j.poster, `Poster tuyển dụng ${j.title} — PaceLand`, { width: 1080, height: 1080, eager: true, sizes: "420px", hideBelow: 899 })}</figure>` : ""}
</div></div></section>`;
}

function JobWhy(j, ctx) {
  const w = j.why || {};
  if (!w.title && !w.text) return "";
  return `<section class="cr-sec cr-why" aria-labelledby="crWhyTitle"><div class="container">
${head("Vì sao vị trí này", w.title, w.text, ctx, "crWhyTitle")}
${(w.points || []).length ? `<ul class="cr-points cr-points--${Math.min((w.points || []).length, 3)}">${w.points.map((p) => `<li><h3>${F(p.title, ctx)}</h3><p>${F(p.text, ctx)}</p></li>`).join("")}</ul>` : ""}
</div></section>`;
}

/* Mô tả (desc) hiển thị làm đoạn mở đầu — khớp nội dung JobPosting description */
function JobWork(j, ctx) {
  const profiles = j.profiles || [];
  return `<section class="cr-sec cr-work" aria-labelledby="crWorkTitle"><div class="container cr-split cr-split--even">
<div>${head("Công việc", "Bạn sẽ làm gì", j.desc, ctx, "crWorkTitle")}<ol class="cr-duties">${(j.duties || []).map((d) => `<li><div>${FB(d, ctx)}</div></li>`).join("")}</ol></div>
<div>${head("Chân dung ứng viên", profiles.length ? "Bạn là ai cũng có chỗ bắt đầu" : "PaceLand tìm ở bạn", "", ctx, "")}
${profiles.length ? `<div class="cr-profiles">${profiles.map((p) => `<article class="cr-profile"><h3>${F(p.title, ctx)}</h3><p>${F(p.text, ctx)}</p></article>`).join("")}</div>` : ""}
${(j.reqs || []).length ? `${profiles.length ? '<h3 class="cr-subhead">Điều PaceLand cần ở bạn</h3>' : ""}<ul class="cr-checks">${j.reqs.map((r) => `<li>${F(r, ctx)}</li>`).join("")}</ul>` : ""}
${(j.kpis || []).length ? `<h3 class="cr-subhead">Chỉ số theo dõi kết quả</h3><ul class="cr-checks">${j.kpis.map((r) => `<li>${FB(r, ctx)}</li>`).join("")}</ul>${j.kpiNote ? `<p class="cr-kpinote">${F(j.kpiNote, ctx)}</p>` : ""}` : ""}
</div></div></section>`;
}

function JobIncome(j, ctx) {
  const comp = j.compensation || [];
  return `<section class="cr-sec cr-soft cr-jobincome" id="thu-nhap" aria-labelledby="crJIncTitle"><div class="container">
${head("Thu nhập & quyền lợi", "Rõ ràng từ đầu", "Chỉ những gì đã có trong chính sách tuyển dụng của PaceLand. Chi tiết được trao đổi minh bạch khi phỏng vấn.", ctx, "crJIncTitle")}
${comp.length ? `<dl class="cr-compcards">${comp.map((c) => `<div><dt>${F(c.label, ctx)}</dt><dd class="v">${F(c.value, ctx)}</dd>${c.note ? `<dd class="n">${F(c.note, ctx)}</dd>` : ""}</div>`).join("")}</dl>` : ""}
${(j.benefits || []).length || (j.obligations || []).length ? `<div class="cr-duo">
${(j.benefits || []).length ? `<div><h3 class="cr-subhead cr-subhead--top">Quyền lợi của bạn</h3><ul class="cr-checks">${j.benefits.map((x) => `<li>${FB(x, ctx)}</li>`).join("")}</ul></div>` : ""}
${(j.obligations || []).length ? `<div><h3 class="cr-subhead cr-subhead--top">Nghĩa vụ của bạn</h3><ul class="cr-duty-list">${j.obligations.map((x) => `<li>${FB(x, ctx)}</li>`).join("")}</ul>${j.obligationNote ? `<p class="cr-kpinote">${F(j.obligationNote, ctx)}</p>` : ""}</div>` : ""}
</div>` : ""}
</div></section>`;
}

function JobEnvironment(j, ctx) {
  if (!(j.environment || []).length) return "";
  return `<section class="cr-sec cr-env" aria-labelledby="crEnvTitle"><div class="container cr-split cr-split--even">
${head("Môi trường làm việc", "Làm việc ở đâu, cùng ai", "", ctx, "crEnvTitle")}
<ul class="cr-checks cr-checks--lg">${j.environment.map((x) => `<li>${F(x, ctx)}</li>`).join("")}</ul>
</div></section>`;
}

function OtherJobs(j, jobs, url) {
  const others = jobs.filter((x) => x.id !== j.id);
  return `<section class="cr-sec cr-more-jobs" aria-labelledby="crMoreTitle"><div class="container">
${SocialShare(url, j.title)}
<header class="cr-head"><p class="cr-eyebrow">PaceLand Careers</p><h2 id="crMoreTitle">Vị trí khác đang tuyển</h2></header>
${others.length ? `<ul class="cr-joblist cr-joblist--compact">${others.map((o) => JobRow(o, { compact: true })).join("")}</ul>` : ""}
<a class="cr-textlink" href="/tuyen-dung.html">Về trang tuyển dụng PaceLand ${ICON_ARROW}</a>
</div></section>`;
}

/* Trang vị trí đã đóng (hoặc trang mồ côi không còn trong JOBS): còn URL, noindex, không form */
export function ClosedJobBody(j, jobs) {
  const t = j.title || "Vị trí này";
  return `<div class="cr" data-careers="job-closed" data-job-slug="${esc(j.id)}" data-job-title="${esc(t)}">
<section class="cr-hero cr-hero--job" aria-labelledby="crJobTitle"><div class="container">
${Breadcrumb([{ label: "Trang chủ", href: "/" }, { label: "Tuyển dụng", href: "/tuyen-dung.html" }, { label: j.shortTitle || t }])}
<p class="cr-eyebrow">PaceLand Careers</p><h1 id="crJobTitle" class="cr-hero__title">${esc(t)} <span>đã ngừng tuyển.</span></h1>
<p class="cr-hero__sub">Vị trí này hiện không còn nhận hồ sơ. ${jobs.length ? "Anh/chị xem các vị trí PaceLand đang tuyển bên dưới." : "PaceLand sẽ cập nhật vị trí mới trên trang tuyển dụng."}</p>
<div class="cr-actions"><a class="cr-btn cr-btn--red" href="/tuyen-dung.html${jobs.length ? "#vi-tri" : ""}">${jobs.length ? "Xem vị trí đang tuyển" : "Về trang tuyển dụng"} ${ICON_ARROW}</a></div>
</div></section>
${jobs.length ? `<section class="cr-sec"><div class="container"><ul class="cr-joblist cr-joblist--compact">${jobs.map((o) => JobRow(o, { compact: true })).join("")}</ul></div></section>` : ""}
</div>`;
}

export function renderJobPage({ j, C, ctx, JOBS, PROJECTS, SITE_URL, root }) {
  const jobs = openJobs(JOBS);
  const url = `${SITE_URL}/tuyen-dung/${j.id}.html`;
  const closed = (j.status || "open") !== "open";
  const fc = j.finalCta || {};
  const name = j.shortTitle || j.title;
  let body;
  if (closed) {
    body = ClosedJobBody(j, jobs);
  } else {
    const sales = j.pathStage === "sales" || j.pathStage === "leader";
    body = `<div class="cr" data-careers="job" data-job-slug="${esc(j.id)}" data-job-title="${esc(j.title)}" data-department="${esc(j.dept)}" data-job-category="${esc(j.category)}">
${JobHero(j, ctx, root)}
${JobWhy(j, ctx)}
${CareerEcosystem(C, ctx, { ids: j.system, eyebrow: "Hệ thống hỗ trợ", title: j.pathStage === "sales" ? "Hệ thống phía sau bạn." : "Bạn làm việc cùng hệ thống nào", sub: j.pathStage === "sales" ? (C.ecosystem || {}).sub : "Hạ tầng đã có sẵn, bạn không bắt đầu từ trang giấy trắng.", rail: sales })}
${JobWork(j, ctx)}
${JobIncome(j, ctx)}
${MidCta(ctx, { title: (C.midCta || {}).jobTitle || "Vị trí này hợp với bạn?", sub: (C.midCta || {}).sub, cta: "Ứng tuyển vị trí này", loc: "job_mid" })}
${j.pathStage ? CareerPath(C, ctx, { current: j.pathStage }) : ""}
${j.showProducts ? ProductFocus(C, ctx, PROJECTS, root, { withPoster: false }) : ""}
${JobEnvironment(j, ctx)}
${CareerLeaders(ctx)}
${RecruitmentProcess(C, ctx)}
${CareerFAQ(j.faq, ctx, { title: `Hỏi nhanh về vị trí ${name}` })}
${ApplySection(C, ctx, jobs, { title: fc.title || "Bắt đầu bằng một cuộc trao đổi.", sub: fc.sub || "", selected: j.id, eyebrow: `Ứng tuyển · ${name}`, group: SALES_CATEGORIES.includes(j.category) ? "sales" : "general" })}
${OtherJobs(j, jobs, url)}
${StickyApplyBar(ctx, { label: "Ứng tuyển vị trí này" })}
</div>`;
  }
  return {
    body, closed, url,
    title: closed ? `${j.title} — đã ngừng tuyển | PaceLand` : (j.seoTitle || `Tuyển ${j.count || ""} ${j.title} — Quận 2 | PaceLand`),
    desc: closed ? `Vị trí ${j.title} tại PaceLand đã ngừng nhận hồ sơ. Xem các vị trí bất động sản PaceLand đang tuyển tại ${ctx.locShort}.` : (j.seoDescription || strip(fill(j.desc, ctx))),
  };
}
