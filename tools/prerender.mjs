/* ============================================================
   PACELAND — Prerender cho SEO/GEO
   Chạy:  node tools/prerender.mjs   (từ thư mục gốc website)

   Việc script làm:
   1. Sinh trang tĩnh cho TỪNG bài viết  -> /bai-viet/<id>.html
   2. Sinh trang tĩnh cho TỪNG dự án    -> /du-an/<id>.html
   3. Bơm nội dung tĩnh (bot đọc được, không cần JavaScript) vào
      index.html, du-an.html, goc-nhin.html, faq.html
   4. Chèn JSON-LD schema (doanh nghiệp, FAQ, danh sách dự án)
   5. Sinh lại sitemap.xml đầy đủ mọi URL

   Chạy lại bao nhiêu lần cũng an toàn (idempotent).
   ============================================================ */

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { buildContext, openJobs, renderCareersHub, renderJobPage, jobPostingLd, faqLd, itemListLd } from "./careers-render.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://paceland.vn";

/* ---------- 1. Nạp data.js + components.js ---------- */
const dataSrc = fs.readFileSync(path.join(ROOT, "assets/js/data.js"), "utf8");
const compSrc = fs.readFileSync(path.join(ROOT, "assets/js/components.js"), "utf8");
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(dataSrc + "\n" + compSrc, sandbox);
const W = sandbox.window;
const { SITE, NAV, PROJECTS, POSTS, FAQS, PARTNERS, JOBS, CAREERS } = W;
const renderProjectCard = W.renderProjectCard;
const renderPostCard = W.renderPostCard;
const renderPartnerCard = W.renderPartnerCard;
const resolveImg = W.resolveImg;

/* ---------- Phiên bản asset = băm nội dung (8 ký tự md5) ----------
   Đổi nội dung file là đổi ?v= trên MỌI trang (bước cuối của script) — không còn phải tăng tay,
   kể cả khi Admin xuất bản data.js qua GitHub (CI chạy lại prerender). */
const assetHash = (rel) => createHash("md5").update(fs.readFileSync(path.join(ROOT, rel))).digest("hex").slice(0, 8);
const V = {
  data: assetHash("assets/js/data.js"),
  comp: assetHash("assets/js/components.js"),
  main: assetHash("assets/js/main.js"),
  css: assetHash("assets/css/styles.css"),
};

/* ---------- Tiện ích ---------- */
const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const stripTags = (s) => String(s == null ? "" : s).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const absUrl = (u) => {
  u = String(u || "");
  if (/^(data:|https?:|\/\/)/.test(u)) return u;
  return SITE_URL + "/" + u.replace(/^\//, "");
};
/* Chuyển các đường dẫn tương đối trong HTML card thành tuyệt đối */
const absolutize = (html) =>
  html
    .replace(/href="(?!https?:|\/|#|tel:|mailto:)/g, 'href="/')
    .replace(/src="(?!https?:|\/|data:)/g, 'src="/');

const isoDate = (dmy) => {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dmy || "");
  return m ? `${m[3]}-${m[2]}-${m[1]}` : new Date().toISOString().slice(0, 10);
};
const today = new Date().toISOString().slice(0, 10);

const ldTag = (id, obj) => `<script type="application/ld+json" id="${id}">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

/* Chèn/thay JSON-LD trong <head> — idempotent */
function upsertLd(html, id, tag) {
  const re = new RegExp(`<script type="application/ld\\+json" id="${id}">[\\s\\S]*?</script>\\n?`);
  if (re.test(html)) return html.replace(re, tag + "\n");
  return html.replace("</head>", tag + "\n</head>");
}

/* Bơm nội dung vào container theo sentinel — idempotent */
function inject(html, key, anchorOpen, content) {
  const start = `<!--pr:${key}-->`, end = `<!--/pr:${key}-->`;
  const block = start + content + end;
  if (html.includes(start)) {
    const re = new RegExp(`<!--pr:${key}-->[\\s\\S]*?<!--/pr:${key}-->`);
    return html.replace(re, block);
  }
  if (!html.includes(anchorOpen)) {
    console.warn(`  ! Không tìm thấy anchor cho "${key}" — bỏ qua`);
    return html;
  }
  return html.replace(anchorOpen, anchorOpen.replace(/<\/div>$/, "") + block + "</div>");
}

/* ---------- Khối render dùng chung ---------- */
function renderBlock(b) {
  if (b.t === "p") return "<p>" + b.c + "</p>";
  if (b.t === "h") return "<h2>" + b.c + "</h2>";
  if (b.t === "q") return "<blockquote>" + b.c + "</blockquote>";
  if (b.t === "ul") return '<ul class="bullets">' + b.c.map((i) => "<li>" + i + "</li>").join("") + "</ul>";
  if (b.t === "table" && b.c && b.c.rows) {
    const thead = (b.c.head || []).map((h) => "<th>" + h + "</th>").join("");
    const rows = b.c.rows.map((r) => "<tr>" + r.map((c) => "<td>" + c + "</td>").join("") + "</tr>").join("");
    return '<div class="post-table-wrap"><table class="post-table">' + (thead ? "<thead><tr>" + thead + "</tr></thead>" : "") + "<tbody>" + rows + "</tbody></table></div>";
  }
  return "";
}

const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": SITE_URL + "/#organization",
  name: SITE.name,
  alternateName: "Pace Land",
  legalName: SITE.legalName,
  slogan: SITE.tagline,
  description: "Mạng lưới bất động sản kín tại TP.HCM — tư vấn căn hộ hạng sang, siêu sang tại Thủ Thiêm, Khu Đông, Quận 1 dựa trên dữ liệu. Tư vấn miễn phí cho người mua.",
  url: SITE_URL + "/",
  logo: SITE_URL + "/assets/img/logo.png",
  image: SITE_URL + "/assets/img/og-image.jpg",
  telephone: "+84" + SITE.hotlineRaw.replace(/^0/, ""),
  email: SITE.email,
  address: { "@type": "PostalAddress", streetAddress: "35 Đường số 36, Khu phố 2, P. Bình Trưng", addressLocality: "TP. Thủ Đức", addressRegion: "TP. Hồ Chí Minh", addressCountry: "VN" },
  areaServed: ["TP. Hồ Chí Minh", "Thủ Thiêm", "TP. Thủ Đức", "Quận 1"],
  sameAs: [SITE.zalo, SITE.facebook, SITE.youtube, SITE.tiktok].filter((x) => x && x !== "#"),
  priceRange: "$$$$",
};
const WEBSITE_LD = { "@context": "https://schema.org", "@type": "WebSite", "@id": SITE_URL + "/#website", url: SITE_URL + "/", name: "PaceLand", inLanguage: "vi-VN", publisher: { "@id": SITE_URL + "/#organization" } };

/* ---------- Khung trang con (bài viết / dự án) ---------- */
/* Footer tĩnh: bot đọc được liên kết điều hướng mà không cần chạy JS; components.js vẫn dựng lại khi tải trang */
const FOOTER_HTML = typeof sandbox.buildFooter === "function" ? sandbox.buildFooter() : "";
const footerRoot = () => `<div id="footer-root"><!--pr:footer-->${FOOTER_HTML}<!--/pr:footer--></div>`;

function pageShell({ title, desc, canonical, ogImage, ogType, ldTags, bodyMain, bodyClass = "", extraHead = "", extraScripts = "", robots = "index, follow", ogImageAlt = "", ogImageSize = null }) {
  return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="icon" href="/assets/img/icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700;1,800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/styles.css?v=${V.css}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${robots}">
<meta name="theme-color" content="#C70018">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="PaceLand">
<meta property="og:locale" content="vi_VN">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
${ogImageSize ? `<meta property="og:image:width" content="${ogImageSize[0]}">
<meta property="og:image:height" content="${ogImageSize[1]}">
` : ""}${ogImageAlt ? `<meta property="og:image:alt" content="${esc(ogImageAlt)}">
` : ""}<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${ogImage}">
${ldTags.join("\n")}
${extraHead}</head>
<body${bodyClass ? ` class="${bodyClass}"` : ""}>
<div id="header-root"></div>
<main>
${bodyMain}
</main>
${footerRoot()}
<script src="/assets/js/data.js?v=${V.data}"></script>
<script src="/assets/js/components.js?v=${V.comp}"></script>
<script src="/assets/js/main.js?v=${V.main}"></script>
${extraScripts}</body>
</html>
`;
}

const breadcrumbNav = (items) =>
  `<nav class="breadcrumb" aria-label="breadcrumb">` +
  items.map((it, i) => (it.href ? `<a href="${it.href}">${esc(it.label)}</a>` : `<span>${esc(it.label)}</span>`) + (i < items.length - 1 ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px;opacity:.6"><polyline points="9 18 15 12 9 6"/></svg>' : "")).join("") +
  `</nav>`;

const breadcrumbLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: stripTags(it.label), ...(it.href ? { item: SITE_URL + it.href } : {}) })),
});

const ctaBand = (msg) => `
<section class="section section--paper" style="padding-block:clamp(40px,6vw,72px)">
  <div class="container">
    <div class="cta-band"><div class="inner">
      <div><span class="eyebrow gold">PaceLand đồng hành</span><h2 class="mt-1">${msg}</h2>
      <p>Tư vấn miễn phí, bảo mật, dựa trên dữ liệu — không áp lực.</p></div>
      <div class="flex" style="flex-direction:column;gap:.8rem">
        <a class="btn btn--light btn--lg" href="/lien-he.html">Nhận tư vấn riêng <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
        <a class="btn btn--gold btn--lg" href="tel:${SITE.hotlineRaw}">Gọi ${SITE.hotline}</a>
      </div>
    </div></div>
  </div>
</section>`;

/* ---------- 2. Trang tĩnh từng BÀI VIẾT ---------- */
fs.mkdirSync(path.join(ROOT, "bai-viet"), { recursive: true });
let postPages = 0;
for (const post of POSTS) {
  const url = `/bai-viet/${post.id}.html`;
  const canonical = SITE_URL + url;
  const cover = absUrl(resolveImg(post.cover, 1400));
  const related = POSTS.filter((x) => x.id !== post.id).slice(0, 3);
  const crumbs = [{ label: "Trang chủ", href: "/index.html" }, { label: "Góc nhìn", href: "/goc-nhin.html" }, { label: post.title }];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: stripTags(post.title),
    description: stripTags(post.excerpt),
    image: cover,
    datePublished: isoDate(post.date),
    dateModified: isoDate(post.date),
    inLanguage: "vi-VN",
    author: { "@type": "Organization", name: "PaceLand", url: SITE_URL + "/" },
    publisher: { "@type": "Organization", name: "PaceLand", logo: { "@type": "ImageObject", url: SITE_URL + "/assets/img/logo.png" } },
    mainEntityOfPage: canonical,
  };

  const bodyMain = `
<article class="section section--ivory" style="padding-top:calc(var(--header-h) + clamp(24px,4vw,48px))">
  <div class="container" style="max-width:860px">
    ${breadcrumbNav(crumbs)}
    <span class="eyebrow">${esc(post.category)}</span>
    <h1 class="mt-1" style="font-size:clamp(1.8rem,4vw,2.8rem);line-height:1.15;text-wrap:balance">${esc(post.title)}</h1>
    <div class="mt-2" style="font-size:.85rem;color:var(--muted)">${esc(post.date)} · ${esc(post.readtime)} · PaceLand</div>
    <figure class="mt-3" style="border-radius:12px;overflow:hidden;box-shadow:var(--shadow)"><img src="${esc(resolveImg(post.cover, 1400)).startsWith("http") ? esc(resolveImg(post.cover, 1400)) : "/" + esc(resolveImg(post.cover, 1400))}" alt="${esc(post.title)}" style="width:100%"></figure>
    <div class="post-body mt-3" style="font-size:1.02rem;line-height:1.85">
      ${absolutize(post.body.map(renderBlock).join("\n"))}
    </div>
  </div>
</article>
<section class="section section--tight section--ivory" style="padding-top:0">
  <div class="container">
    <div class="facet-rule" style="margin-bottom:clamp(20px,3vw,32px)">Bài viết liên quan</div>
    <div class="grid cols-3">${absolutize(related.map((p) => renderPostCard(p, false)).join(""))}</div>
  </div>
</section>
${ctaBand("Muốn đi trước thị trường một bước?")}`;

  const html = pageShell({
    title: `${post.title} — PaceLand`,
    desc: stripTags(post.excerpt),
    canonical,
    ogImage: cover,
    ogType: "article",
    ldTags: [ldTag("pl-ld-org", ORG_LD), ldTag("pl-ld-article", articleLd), ldTag("pl-ld-breadcrumb", breadcrumbLd(crumbs))],
    bodyMain,
  });
  fs.writeFileSync(path.join(ROOT, "bai-viet", `${post.id}.html`), html);
  postPages++;
}

/* ---------- 3. Trang tĩnh từng DỰ ÁN ---------- */
/* Trang thông tin FULL: đọc assets/data/du-an-chi-tiet/<id>.json (nếu có) và
   render ~12 section chuyên sâu (thông số, đợt mở bán, tiến độ, vị trí, giá,
   mặt bằng, loại căn, pháp lý, CĐT, FAQ). Dữ liệu chuyển từ kho dự án của
   anh Khải (vutrongkhai-website), đã đổi sang giọng PaceLand. */
function loadDetail(id) {
  const f = path.join(ROOT, "assets", "data", "du-an-chi-tiet", `${id}.json`);
  if (!fs.existsSync(f)) return null;
  try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return null; }
}
const mdB = (s) => esc(s).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
const dSec = (title, cap) => `<h2 class="mt-4" style="font-size:1.35rem">${esc(title)}${cap ? ` <span class="pill" style="margin-left:.5rem;vertical-align:middle;font-size:.68rem">${esc(cap)}</span>` : ""}</h2>`;
const dIntro = (s) => s ? `<p class="mt-2" style="max-width:78ch;line-height:1.8;color:var(--ink-soft)">${mdB(s)}</p>` : "";
const dNote = (s) => s ? `<p class="mt-2" style="font-size:.88rem;color:var(--muted);max-width:78ch">${mdB(s)}</p>` : "";
const dImg = (src, alt) => src ? `<figure class="mt-3" style="border-radius:12px;overflow:hidden;border:1px solid var(--line-soft)"><img src="/${esc(src)}" alt="${esc(alt)}" loading="lazy" style="width:100%"></figure>` : "";
/* Bảng label/value(/note) — dùng cho thông số, khoảng cách, mốc tiến độ, chính sách */
function dTable(rows) {
  if (!(rows || []).length) return "";
  return `<div class="mt-3" style="border:1px solid var(--line);border-radius:10px;overflow:hidden">${rows.map((r, i) =>
    `<div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:space-between;padding:.7rem 1rem;background:${i % 2 ? "var(--paper)" : "var(--white)"}">` +
    `<div style="font-weight:600;font-family:var(--head);font-size:.92rem">${esc(r.label || "")}</div>` +
    `<div style="text-align:right;font-size:.92rem">${mdB(r.value || "")}${r.note ? `<div style="font-size:.78rem;color:var(--muted)">${esc(r.note)}</div>` : ""}</div></div>`
  ).join("")}</div>`;
}
const dCards = (items) => `<div class="mt-3" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:.8rem">${(items || []).map((it) =>
  `<div style="background:var(--white);border:1px solid var(--line-soft);border-radius:12px;padding:1rem 1.1rem"><b style="font-family:var(--head)">${esc(it.title || "")}</b><p style="margin-top:.4rem;font-size:.9rem;line-height:1.7;color:var(--ink-soft)">${mdB(it.text || "")}</p></div>`).join("")}</div>`;
const dGems = (items) => `<ul class="mt-3" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:.55rem 1.4rem;list-style:none">${(items || []).map((a) => `<li style="display:flex;gap:.55rem;align-items:baseline"><span class="gem gem--sm" style="flex:none"></span><span>${mdB(String(a))}</span></li>`).join("")}</ul>`;

function renderProjectDetail(p, d) {
  let h = "";
  const tq = d.tongQuan || {};
  if ((tq.thongSo || []).length || tq.intro) {
    h += dSec("Thông số " + p.name, d.capNhat ? "Cập nhật " + d.capNhat.split("-").reverse().join("/") : "");
    h += dIntro(tq.intro);
    if ((tq.chiSo || []).length) h += `<div class="grid mt-3" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:10px;overflow:hidden">${tq.chiSo.map((c) => `<div style="background:var(--white);padding:1rem 1.15rem"><div style="font-size:.72rem;color:var(--muted)">${esc(c.label)}</div><div style="font-family:var(--head);font-weight:800;font-size:1.15rem;margin-top:2px">${esc(c.value)}</div>${c.note ? `<div style="font-size:.74rem;color:var(--muted);margin-top:2px">${esc(c.note)}</div>` : ""}</div>`).join("")}</div>`;
    h += dTable(tq.thongSo);
  }
  const mb = d.dotMoBan;
  if (mb && mb.title) {
    h += dSec("Đợt mở bán hiện tại", mb.capNhat);
    h += `<h3 class="mt-2" style="font-size:1.1rem">${esc(mb.title)}</h3>`;
    h += dIntro(mb.subtitle);
    if ((mb.gioHang || []).length) h += dGems(mb.gioHang);
    if ((mb.lyDo || []).length) h += dCards(mb.lyDo);
    if ((mb.chinhSach || []).length) h += dTable(mb.chinhSach);
  }
  const td = d.tienDo;
  if (td && ((td.moc || []).length || td.intro)) {
    h += dSec("Tiến độ xây dựng", td.capNhat);
    h += dIntro(td.intro);
    h += dTable(td.moc);
    h += dImg(td.image, `Tiến độ ${p.name}`);
    h += dNote(td.note);
  }
  const vt = d.viTri;
  if (vt && (vt.intro || (vt.khoangCach || []).length)) {
    h += dSec("Vị trí & kết nối");
    h += dIntro(vt.intro);
    h += dImg(vt.image, `Bản đồ vị trí ${p.name}`);
    h += dTable(vt.khoangCach);
    if ((vt.diem || []).length) h += dCards(vt.diem);
  }
  const ti = d.tienIch;
  if (ti && (ti.items || []).length) {
    h += dSec("Tiện ích theo công bố của chủ đầu tư");
    h += dIntro(ti.intro);
    h += dGems(ti.items);
  }
  const gb = d.giaBan;
  if (gb && (gb.loai || []).length) {
    h += dSec("Giá bán tham khảo", gb.capNhat);
    h += dIntro(gb.intro);
    h += `<div class="mt-3" style="overflow-x:auto;border:1px solid var(--line);border-radius:10px"><table style="width:100%;border-collapse:collapse;min-width:560px"><thead><tr>${["Loại căn", "Diện tích", "Giá tham khảo", "Thanh toán"].map((x) => `<th style="text-align:left;padding:.7rem 1rem;background:var(--paper);font-family:var(--head);font-size:.85rem">${x}</th>`).join("")}</tr></thead><tbody>${gb.loai.map((l) => `<tr>${[l.name, l.dienTich, l.gia, l.thanhToan].map((x) => `<td style="padding:.65rem 1rem;border-top:1px solid var(--line-soft);font-size:.92rem">${mdB(x || "—")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    h += dNote(gb.note);
  }
  const mbg = d.matBang;
  if (mbg && (mbg.intro || mbg.image)) {
    h += dSec("Mặt bằng dự án");
    h += dIntro(mbg.intro);
    h += dImg(mbg.image, `Mặt bằng ${p.name}`);
    if ((mbg.diem || []).length) h += dGems(mbg.diem);
  }
  if ((d.loaiCan || []).length) {
    h += dSec("Các loại căn");
    h += `<div class="mt-3" style="display:grid;gap:.8rem">${d.loaiCan.map((l) => `<div style="background:var(--white);border:1px solid var(--line-soft);border-radius:12px;padding:1rem 1.15rem"><div style="display:flex;gap:.6rem;align-items:center;flex-wrap:wrap"><b style="font-family:var(--head)">${esc(l.name || "")}</b>${l.dienTich ? `<span class="pill">${esc(l.dienTich)}</span>` : ""}</div>${l.text ? `<p style="margin-top:.45rem;font-size:.92rem;line-height:1.7;color:var(--ink-soft)">${mdB(l.text)}</p>` : ""}</div>`).join("")}</div>`;
  }
  if (d.diemNoiBat && (d.diemNoiBat.items || []).length) {
    h += dSec("Điểm đáng cân nhắc");
    h += dIntro(d.diemNoiBat.intro);
    h += dCards(d.diemNoiBat.items);
  }
  if (d.songODay && (d.songODay.items || []).length) {
    h += dSec("Sống ở đây thế nào?");
    h += dIntro(d.songODay.intro);
    h += dCards(d.songODay.items);
  }
  const pl = d.phapLy;
  if (pl && (pl.items || []).length) {
    h += dSec("Pháp lý dự án");
    h += dIntro(pl.intro);
    h += `<ul class="mt-3" style="list-style:none;display:grid;gap:.5rem">${pl.items.map((x) => `<li style="display:flex;gap:.55rem;align-items:baseline"><span style="color:#1E7A3C;font-weight:800;flex:none">✓</span><span style="font-size:.94rem">${mdB(String(x))}</span></li>`).join("")}</ul>`;
    h += pl.note ? `<div class="mt-3" style="border:1px solid rgba(199,0,24,.2);background:rgba(199,0,24,.04);border-radius:10px;padding:.85rem 1.05rem;font-size:.9rem;max-width:78ch">${mdB(pl.note)}</div>` : "";
  }
  const cdt = d.chuDauTu;
  if (cdt && (cdt.text || cdt.ten)) {
    h += dSec("Về chủ đầu tư");
    if (cdt.ten) h += `<h3 class="mt-2" style="font-size:1.05rem">${esc(cdt.ten)}</h3>`;
    h += dIntro(cdt.text);
    if ((cdt.daBanGiao || []).length) h += `<div class="mt-2" style="display:flex;gap:.45rem;flex-wrap:wrap">${cdt.daBanGiao.map((x) => `<span class="pill">Đã bàn giao: ${esc(x)}</span>`).join("")}</div>`;
  }
  if ((d.faq || []).length) {
    h += dSec("Hỏi nhanh về " + p.name);
    h += `<div class="mt-3" style="display:grid;gap:.6rem;max-width:82ch">${d.faq.map((f) => `<details style="background:var(--white);border:1px solid var(--line-soft);border-radius:12px;padding:.85rem 1.1rem"><summary style="font-family:var(--head);font-weight:700;cursor:pointer">${esc(f.q)}</summary><p style="margin-top:.55rem;line-height:1.75;color:var(--ink-soft);font-size:.94rem">${mdB(f.a)}</p></details>`).join("")}</div>`;
  }
  return h;
}
fs.mkdirSync(path.join(ROOT, "du-an"), { recursive: true });
let projectPages = 0;
for (const p of PROJECTS) {
  const url = `/du-an/${p.id}.html`;
  const canonical = SITE_URL + url;
  const cover = absUrl(resolveImg(p.cover, 1400));
  const crumbs = [{ label: "Trang chủ", href: "/index.html" }, { label: "Dự án", href: "/du-an.html" }, { label: p.name }];
  const related = PROJECTS.filter((x) => x.id !== p.id && x.area === p.area).slice(0, 3);
  const relatedFinal = related.length ? related : PROJECTS.filter((x) => x.id !== p.id).slice(0, 3);
  const detail = loadDetail(p.id);
  const detailHtml = detail ? renderProjectDetail(p, detail) : "";
  const faqLd = detail && (detail.faq || []).length ? {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: detail.faq.map((f) => ({ "@type": "Question", name: stripTags(f.q), acceptedAnswer: { "@type": "Answer", text: stripTags(String(f.a).replace(/\*\*/g, "")) } })),
  } : null;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: stripTags(p.short),
    image: (p.gallery || [p.cover]).map((g) => absUrl(resolveImg(g, 1200))),
    brand: { "@type": "Organization", name: p.developer },
    category: `Căn hộ ${p.segment} · ${p.location}`,
    url: canonical,
    ...(p.priceValue
      ? { offers: { "@type": "AggregateOffer", priceCurrency: "VND", lowPrice: Math.round(p.priceValue * 1e9), availability: "https://schema.org/InStock", seller: { "@id": SITE_URL + "/#organization" } } }
      : {}),
  };

  const specs = [
    ["Vị trí", p.location], ["Chủ đầu tư", p.developer], ["Loại hình", p.type + " · " + p.segment],
    ["Giá", p.priceText], ["Diện tích", p.size], ["Phòng ngủ", p.beds], ["Bàn giao", p.handover], ["Trạng thái", p.status],
  ];

  const bodyMain = `
<article class="section section--ivory" style="padding-top:calc(var(--header-h) + clamp(24px,4vw,48px))">
  <div class="container">
    ${breadcrumbNav(crumbs)}
    <span class="eyebrow">${esc(p.status)}${p.badge ? " · " + esc(p.badge) : ""}</span>
    <h1 class="mt-1" style="font-size:clamp(2rem,4.5vw,3.2rem);line-height:1.1">${esc(p.name)}</h1>
    <p class="lead mt-2" style="max-width:64ch">${esc(p.short)}</p>
    <figure class="mt-3" style="border-radius:12px;overflow:hidden;box-shadow:var(--shadow)"><img src="/${esc(resolveImg(p.cover, 1600))}" alt="${esc(p.name)}" style="width:100%"></figure>

    <div class="grid mt-4" style="grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:10px;overflow:hidden">
      ${specs.map(([l, v]) => `<div style="background:var(--paper);padding:1rem 1.15rem"><div style="font-size:.72rem;color:var(--muted)">${esc(l)}</div><div style="font-family:var(--head);font-weight:700;margin-top:2px">${esc(v)}</div></div>`).join("")}
    </div>

    <div class="mt-4" style="max-width:78ch;font-size:1.02rem;line-height:1.85">
      ${(p.description || []).map((d) => `<p style="margin-bottom:1rem">${esc(d)}</p>`).join("")}
    </div>

    ${!(detail && detail.tienIch) ? `<h2 class="mt-4" style="font-size:1.3rem">Tiện ích nổi bật</h2>
    <ul class="mt-2" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.6rem 1.4rem;list-style:none">
      ${(p.amenities || []).map((a) => `<li style="display:flex;gap:.55rem;align-items:center"><span class="gem gem--sm"></span>${esc(a)}</li>`).join("")}
    </ul>` : ""}

    ${(p.zones || []).length ? `<h2 class="mt-4" style="font-size:1.3rem">Các phân khu ${esc(p.name)}</h2>
    <div class="mt-2" style="display:grid;gap:.7rem">
      ${p.zones.map((z) => `<div style="border:1px solid var(--line-soft);border-radius:10px;padding:.85rem 1rem;background:var(--white)">
        <div><strong style="font-family:var(--head)">${esc(z.name)}</strong>${z.status ? ` <span class="pill" style="margin-left:.4rem">${esc(z.status)}</span>` : ""}</div>
        ${z.type || z.note || z.link ? `<div style="margin-top:.3rem;color:var(--ink-soft);font-size:.92rem">${esc(z.type || "")}${z.note ? `${z.type ? " — " : ""}${esc(z.note)}` : ""}${z.link ? ` <a href="${esc(z.link)}"${z.link.startsWith("http") ? ' target="_blank" rel="noopener"' : ""} style="color:var(--red);font-weight:600;white-space:nowrap">Xem chi tiết →</a>` : ""}</div>` : ""}
      </div>`).join("")}
    </div>` : ""}

    ${(p.gallery || []).length > 1 ? `<div class="grid cols-3 mt-4">${p.gallery.slice(0, 3).map((g) => `<img src="/${esc(resolveImg(g, 900))}" alt="${esc(p.name)}" loading="lazy" style="border-radius:10px;aspect-ratio:4/3;object-fit:cover;width:100%">`).join("")}</div>` : ""}
    ${detailHtml}
  </div>
</article>
${ctaBand(`Quan tâm ${esc(p.name)}? Nhận giỏ hàng & chính sách hôm nay`)}
<section class="section section--tight section--paper">
  <div class="container">
    <div class="facet-rule" style="margin-bottom:clamp(20px,3vw,32px)">Dự án cùng khu vực</div>
    <div class="card-grid">${absolutize(relatedFinal.map(renderProjectCard).join(""))}</div>
  </div>
</section>`;

  const html = pageShell({
    title: `${p.name} — ${p.location} | ${p.priceText} | PaceLand`,
    desc: stripTags(p.short) + ` ${p.type} ${p.segment.toLowerCase()}, ${p.size}, ${p.beds}, bàn giao ${p.handover}. Giá ${p.priceText.toLowerCase()}.`,
    canonical,
    ogImage: cover,
    ogType: "website",
    ldTags: [ldTag("pl-ld-org", ORG_LD), ldTag("pl-ld-product", productLd), ldTag("pl-ld-breadcrumb", breadcrumbLd(crumbs)), ...(faqLd ? [ldTag("pl-ld-faq", faqLd)] : [])],
    bodyMain,
  });
  fs.writeFileSync(path.join(ROOT, "du-an", `${p.id}.html`), html);
  projectPages++;
}

/* ---------- 3b. Trang thương hiệu cá nhân CHUYÊN VIÊN ---------- */
fs.mkdirSync(path.join(ROOT, "chuyen-vien"), { recursive: true });
const activePartners = (PARTNERS || []).filter((p) => p.status === "active" && p.id);
let profilePages = 0;
for (const cv of activePartners) {
  const url = `/chuyen-vien/${cv.id}.html`;
  const canonical = SITE_URL + url;
  const photoSrc = cv.photo || "assets/img/media/avatar-chuyen-vien.svg";
  const photoIsVector = /\.svg$/i.test(photoSrc);
  const photo = photoIsVector ? absUrl("assets/img/og-image.jpg") : absUrl(resolveImg(photoSrc, 800));
  const crumbs = [{ label: "Trang chủ", href: "/index.html" }, { label: "Chứng nhận Đối tác", href: "/chung-nhan-doi-tac.html" }, { label: cv.name }];
  const sameAs = [cv.website, cv.facebook, cv.linkedin].filter(Boolean);
  const tel = cv.phone || SITE.hotline;
  const telRaw = String(tel).replace(/[^0-9+]/g, "");

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: cv.name,
    jobTitle: cv.role,
    identifier: cv.code,
    url: canonical,
    worksFor: { "@type": "RealEstateAgent", name: "PaceLand", "@id": SITE_URL + "/#organization" },
    ...(cv.photo && !photoIsVector ? { image: photo } : {}),
    ...(cv.bio ? { description: stripTags(cv.bio) } : {}),
    ...(cv.phone ? { telephone: cv.phone } : {}),
    ...(cv.area ? { areaServed: cv.area } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };

  const featured = PROJECTS.slice(0, 3);
  const bodyMain = `
<article class="section section--ivory" style="padding-top:calc(var(--header-h) + clamp(24px,4vw,48px))">
  <div class="container">
    ${breadcrumbNav(crumbs)}
    <div class="mt-2" style="display:grid;grid-template-columns:minmax(180px,260px) 1fr;gap:clamp(1.2rem,3vw,2.4rem);align-items:start">
      <figure style="border-radius:14px;overflow:hidden;box-shadow:var(--shadow);aspect-ratio:3/4"><img src="/${esc(resolveImg(photoSrc, 700))}" alt="${esc(cv.name)} — ${esc(cv.role)} PaceLand" style="width:100%;height:100%;object-fit:cover"></figure>
      <div>
        <span class="eyebrow">${esc(cv.level || "Chuyên viên PaceLand")}</span>
        <h1 class="mt-1" style="font-size:clamp(1.9rem,4vw,2.8rem);line-height:1.12">${esc(cv.name)}</h1>
        <p class="lead" style="margin-top:.35rem">${esc(cv.role || "")}</p>
        <div class="mt-2" style="display:flex;flex-wrap:wrap;gap:.5rem">
          <a class="pill" href="/chung-nhan-doi-tac.html" title="Tra cứu chứng nhận">✓ Chứng nhận ${esc(cv.code)}</a>
          ${cv.since ? `<span class="pill">Đồng hành từ ${esc(cv.since)}</span>` : ""}
          ${cv.area ? `<span class="pill pill--gold">${esc(cv.area)}</span>` : ""}
        </div>
        ${cv.bio ? `<p class="mt-3" style="max-width:62ch;line-height:1.85">${esc(cv.bio)}</p>` : ""}
        ${(cv.achievements || []).length ? `<ul class="mt-2" style="list-style:none;display:grid;gap:.45rem">${cv.achievements.map((a) => `<li style="display:flex;gap:.5rem;align-items:baseline"><span class="gem gem--sm"></span>${esc(a)}</li>`).join("")}</ul>` : ""}
        <div class="mt-3" style="display:flex;flex-wrap:wrap;gap:.7rem">
          <a class="btn" href="tel:${esc(telRaw)}">Gọi ${esc(tel)}</a>
          <a class="btn btn--ghost" href="${esc(cv.zalo || SITE.zalo)}" target="_blank" rel="noopener">Nhắn Zalo</a>
          ${cv.website ? `<a class="btn btn--ghost" href="${esc(cv.website)}" target="_blank" rel="noopener">Website cá nhân ↗</a>` : ""}
          <a class="btn btn--ghost" href="/lien-he.html">Đặt lịch tư vấn</a>
        </div>
        <p class="mt-2" style="font-size:.82rem;color:var(--muted)">Xác minh người thật: nhập mã <b>${esc(cv.code)}</b> tại trang <a href="/chung-nhan-doi-tac.html" style="color:var(--red)">Chứng nhận Đối tác</a> — cơ chế chống mạo danh của PaceLand.</p>
        <p class="mt-1" style="font-size:.82rem;color:var(--muted)">Muốn trở thành chuyên viên được chứng nhận? <a href="/tuyen-dung.html" style="color:var(--red)">Xem vị trí PaceLand đang tuyển</a>.</p>
      </div>
    </div>
  </div>
</article>
${ctaBand(`Cần ${esc(cv.name)} tư vấn danh mục phù hợp? Kết nối ngay hôm nay`)}
<section class="section section--tight section--paper">
  <div class="container">
    <div class="facet-rule" style="margin-bottom:clamp(20px,3vw,32px)">Giỏ hàng PaceLand đang phân phối</div>
    <div class="card-grid">${absolutize(featured.map(renderProjectCard).join(""))}</div>
  </div>
</section>`;

  const html = pageShell({
    title: `${cv.name} — ${cv.role} | Chuyên viên PaceLand`,
    desc: (cv.bio ? stripTags(cv.bio) + " " : "") + `${cv.name} — ${cv.role} tại PaceLand, mã chứng nhận ${cv.code}. Tư vấn bất động sản cao cấp TP.HCM.`,
    canonical,
    ogImage: photo,
    ogType: "profile",
    ldTags: [ldTag("pl-ld-org", ORG_LD), ldTag("pl-ld-person", personLd), ldTag("pl-ld-breadcrumb", breadcrumbLd(crumbs))],
    bodyMain,
  });
  fs.writeFileSync(path.join(ROOT, "chuyen-vien", `${cv.id}.html`), html);
  profilePages++;
}

/* ---------- 4. Bơm nội dung tĩnh vào các trang danh sách ---------- */
function patchFile(rel, fn) {
  const f = path.join(ROOT, rel);
  let html = fs.readFileSync(f, "utf8");
  html = fn(html);
  fs.writeFileSync(f, html);
  console.log(`  ✓ ${rel}`);
}

console.log("Bơm nội dung tĩnh:");

patchFile("index.html", (h) => {
  let feat = PROJECTS.filter((p) => p.offmarket || p.badge === "Biên lợi nhuận cao").slice(0, 6);
  if (feat.length < 6) feat = PROJECTS.slice(0, 6);

  /* Hero: đồng bộ slide tĩnh với HERO_SLIDES thật — tránh nháy ảnh cũ trước khi JS thay slide */
  const HS = W.HERO_SLIDES || [];
  if (HS.length) {
    const su = (u) => esc(String(u).replace(/'/g, "%27"));
    h = h.replace(/<!-- Background slides -->[\s\S]*?<!-- Content overlay -->/,
      `<!-- Background slides -->\n    <div class="hs-slides" aria-hidden="true">\n` +
      HS.map((s, i) => `      <div class="hs-slide${i === 0 ? " active" : ""}" style="background-image:url('${su(s.img)}')"></div>`).join("\n") +
      `\n    </div>\n\n    <!-- Content overlay -->`);
    h = h.replace(/(<div class="hs-captions"[^>]*>)[\s\S]*?(<\/div>)/,
      `$1\n` + HS.map((s, i) => `          <span class="hs-cap${i === 0 ? " active" : ""}">${esc(s.caption || "")}</span>`).join("\n") + `\n        $2`);
    h = h.replace(/(<div class="hs-progress"[^>]*>)[\s\S]*?(<\/div>)/,
      `$1\n` + HS.map((_, i) => `          <button class="hs-prog${i === 0 ? " active" : ""}" role="tab" aria-label="Slide ${i + 1}"></button>`).join("\n") + `\n        $2`);
    /* Preload slide đầu — hero hiện tức thì */
    const preloadTag = `<link rel="preload" as="image" href="${su(HS[0].img)}" id="pl-hero-preload">`;
    h = h.includes('id="pl-hero-preload"')
      ? h.replace(/<link rel="preload" as="image"[^>]*id="pl-hero-preload">/, preloadTag)
      : h.replace("</head>", `${preloadTag}\n</head>`);
    /* Xuất hero-slides.json — runtime fetch có dữ liệu thật thay vì 404 */
    fs.mkdirSync(path.join(ROOT, "assets", "data"), { recursive: true });
    fs.writeFileSync(path.join(ROOT, "assets", "data", "hero-slides.json"), JSON.stringify(HS, null, 2));
  }

  h = upsertLd(h, "pl-ld-org", ldTag("pl-ld-org", ORG_LD));
  h = upsertLd(h, "pl-ld-website", ldTag("pl-ld-website", WEBSITE_LD));
  h = inject(h, "featured", '<div class="card-grid" id="featuredProjects"></div>', absolutize(feat.map(renderProjectCard).join("")));
  h = inject(h, "latest", '<div class="grid cols-3" id="latestPosts"></div>', absolutize(POSTS.slice(0, 3).map((p) => renderPostCard(p, false)).join("")));
  return h;
});

patchFile("du-an.html", (h) => {
  h = upsertLd(h, "pl-ld-org", ldTag("pl-ld-org", ORG_LD));
  const listLd = { "@context": "https://schema.org", "@type": "ItemList", name: "Dự án căn hộ cao cấp TP.HCM — PaceLand", itemListElement: PROJECTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE_URL}/du-an/${p.id}.html` })) };
  h = upsertLd(h, "pl-ld-projects", ldTag("pl-ld-projects", listLd));
  h = inject(h, "projects", '<div class="card-grid" id="projectGrid"></div>', absolutize(PROJECTS.map(renderProjectCard).join("")));
  return h;
});

patchFile("goc-nhin.html", (h) => {
  h = upsertLd(h, "pl-ld-org", ldTag("pl-ld-org", ORG_LD));
  h = inject(h, "postfeat", '<div id="postFeatured" class="reveal" style="margin-bottom:clamp(28px,4vw,48px)"></div>', absolutize(renderPostCard(POSTS[0], true)));
  h = inject(h, "postgrid", '<div class="grid cols-3" id="postGrid"></div>', absolutize(POSTS.slice(1).map((p) => renderPostCard(p, false)).join("")));
  return h;
});

patchFile("faq.html", (h) => {
  h = upsertLd(h, "pl-ld-org", ldTag("pl-ld-org", ORG_LD));
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.flatMap((g) => g.items.map((it) => ({ "@type": "Question", name: stripTags(it.q), acceptedAnswer: { "@type": "Answer", text: stripTags(it.a) } }))),
  };
  h = upsertLd(h, "pl-ld-faq", ldTag("pl-ld-faq", faqLd));
  const faqHtml = FAQS.map((g) =>
    `<div class="faq-group-title">${g.group}</div>` +
    g.items.map((it) =>
      `<div class="faq-item"><button class="faq-q" type="button"><span>${it.q}</span><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button><div class="faq-a"><div class="faq-a-inner">${it.a}</div></div></div>`
    ).join("")
  ).join("");
  h = inject(h, "faq", '<div class="faq-list reveal" id="faqList"></div>', faqHtml);
  return h;
});

patchFile("chung-nhan-doi-tac.html", (h) => {
  const active = (PARTNERS || []).filter((p) => p.status === "active");
  h = upsertLd(h, "pl-ld-org", ldTag("pl-ld-org", ORG_LD));
  const peopleLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Đối tác & Cố vấn được chứng nhận — PaceLand",
    itemListElement: active.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: p.name,
        jobTitle: p.role,
        identifier: p.code,
        ...(p.id ? { url: `${SITE_URL}/chuyen-vien/${p.id}.html` } : {}),
        worksFor: { "@id": SITE_URL + "/#organization" },
        ...(p.photo && !/.svg$/i.test(p.photo) ? { image: absUrl(resolveImg(p.photo, 400)) } : {}),
        ...(p.bio ? { description: stripTags(p.bio) } : {}),
      },
    })),
  };
  h = upsertLd(h, "pl-ld-partners", ldTag("pl-ld-partners", peopleLd));
  /* 2 nhóm: Ban lãnh đạo (grid) · còn lại (slider) — phải khớp logic partners.js */
  const isBod = (p) => String(p.level || "").trim().toLowerCase() === "ban lãnh đạo";
  const bod = active.filter(isBod);
  const agents = active.filter((p) => !isBod(p));
  const emptyMsg = '<p style="color:var(--muted);grid-column:1/-1">Danh sách đối tác đang được cập nhật.</p>';
  h = inject(h, "partners-bod", '<div class="partner-grid" id="partnerGridBod"></div>',
    bod.length ? absolutize(bod.map(renderPartnerCard).join("")) : emptyMsg);
  h = inject(h, "partners-agents", '<div class="partner-slider" id="partnerSlider"></div>',
    agents.length ? absolutize(agents.map(renderPartnerCard).join("")) : emptyMsg);
  return h;
});

/* ---------- 3c. RECRUITMENT SYSTEM: /tuyen-dung.html + /tuyen-dung/<slug>.html ----------
   Nội dung: JOBS + CAREERS (data.js) · Component: tools/careers-render.mjs
   Vị trí status "closed": vẫn sinh trang (tránh soft-404) nhưng noindex, bỏ JobPosting, rời sitemap. */
fs.mkdirSync(path.join(ROOT, "tuyen-dung"), { recursive: true });
const CR_HEAD = `<link rel="stylesheet" href="/assets/css/careers.css?v=${assetHash("assets/css/careers.css")}">\n`;
const CR_JS = `<script src="/assets/js/careers.js?v=${assetHash("assets/js/careers.js")}"></script>\n`;
const crCtx = buildContext({ SITE, PROJECTS, POSTS, PARTNERS, JOBS, CAREERS });
const crOpen = openJobs(JOBS);
let jobPages = 0;
/* Trang mồ côi: file còn trong /tuyen-dung/ nhưng vị trí đã bị xoá khỏi JOBS -> sinh lại dạng "đã ngừng tuyển"
   (giữ URL, noindex, bỏ JobPosting) thay vì để nguyên bản cũ còn schema tuyển dụng */
const crIds = new Set(JOBS.map((j) => j.id));
const crOrphans = fs.readdirSync(path.join(ROOT, "tuyen-dung"))
  .filter((f) => f.endsWith(".html") && f !== "index.html" && !crIds.has(f.slice(0, -5)))
  .map((f) => {
    const old = fs.readFileSync(path.join(ROOT, "tuyen-dung", f), "utf8");
    const t = (/data-job-title="([^"]+)"/.exec(old) || [])[1] || f.slice(0, -5).replace(/-/g, " ");
    const title = t.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    return { id: f.slice(0, -5), title, shortTitle: title, status: "closed" };
  });
for (const j of [...JOBS, ...crOrphans]) {
  const page = renderJobPage({ j, C: CAREERS, ctx: crCtx, JOBS, PROJECTS, SITE_URL, root: ROOT });
  const crumbs = [{ label: "Trang chủ", href: "/" }, { label: "Tuyển dụng", href: "/tuyen-dung.html" }, { label: j.shortTitle || j.title }];
  const ld = [ldTag("pl-ld-org", ORG_LD), ldTag("pl-ld-breadcrumb", breadcrumbLd(crumbs))];
  if (!page.closed) {
    ld.push(ldTag("pl-ld-job", jobPostingLd(j, { SITE_URL, ORG_LD, ctx: crCtx })));
    if ((j.faq || []).length) ld.push(ldTag("pl-ld-faq", faqLd(j.faq, crCtx)));
  }
  const hasOg = !!(j.ogImage && fs.existsSync(path.join(ROOT, j.ogImage)));
  const html = pageShell({
    title: page.title, desc: page.desc, canonical: page.url,
    ogImage: absUrl(hasOg ? j.ogImage : (j.poster || "assets/img/og-image.jpg")),
    ogImageSize: hasOg ? [1200, 630] : null,
    ogImageAlt: page.closed ? `PaceLand Careers — ${j.title}` : `PaceLand Careers — tuyển ${j.count} ${j.title}, ${j.location}`,
    ogType: "website", ldTags: ld, bodyMain: page.body,
    bodyClass: "careers no-chat", extraHead: CR_HEAD, extraScripts: CR_JS,
    robots: page.closed ? "noindex, follow" : "index, follow",
  });
  fs.writeFileSync(path.join(ROOT, "tuyen-dung", `${j.id}.html`), html);
  jobPages++;
}
{
  const hub = renderCareersHub({ C: CAREERS, ctx: crCtx, JOBS, PROJECTS, root: ROOT });
  const crumbs = [{ label: "Trang chủ", href: "/" }, { label: "Tuyển dụng" }];
  const ld = [ldTag("pl-ld-org", ORG_LD), ldTag("pl-ld-breadcrumb", breadcrumbLd(crumbs))];
  if (crOpen.length) ld.push(ldTag("pl-ld-jobs", itemListLd(crOpen, SITE_URL)));
  if ((CAREERS.faq || []).length) ld.push(ldTag("pl-ld-faq", faqLd(CAREERS.faq, crCtx)));
  const hubOg = !!(CAREERS.ogImage && fs.existsSync(path.join(ROOT, CAREERS.ogImage)));
  const og = hubOg ? CAREERS.ogImage : "assets/img/tuyen-dung/tong-hop.jpg";
  fs.writeFileSync(path.join(ROOT, "tuyen-dung.html"), pageShell({
    title: hub.title, desc: hub.desc, canonical: SITE_URL + "/tuyen-dung.html",
    ogImage: absUrl(og), ogImageSize: hubOg ? [1200, 630] : null, ogImageAlt: "PaceLand Careers — Xây sự nghiệp. Không chỉ tìm việc.",
    ogType: "website", ldTags: ld, bodyMain: hub.body,
    bodyClass: "careers no-chat", extraHead: CR_HEAD, extraScripts: CR_JS,
  }));
  console.log(`  ✓ tuyen-dung.html (hub) + ${jobPages} trang vị trí${crOrphans.length ? ` (${crOrphans.length} trang mồ côi -> "đã ngừng tuyển")` : ""}`);
}
/* llms.txt: khối "Tuyển dụng" sinh từ JOBS để AI luôn đọc đúng số liệu tuyển dụng hiện hành */
{
  const f = path.join(ROOT, "llms.txt");
  const txt = fs.readFileSync(f, "utf8");
  const a = txt.indexOf("## Tuyển dụng (PaceLand Careers)");
  const b = a >= 0 ? txt.indexOf("\n## ", a + 5) : -1;
  if (a >= 0 && b > a) {
    const agent = crOpen.find((j) => j.pathStage === "sales");
    const others = crOpen.filter((j) => j !== agent).map((j) => `${j.shortTitle || j.title}: ${j.salary}`).join("; ");
    const block = [
      "## Tuyển dụng (PaceLand Careers)",
      "",
      `- PaceLand tuyển ${crCtx.openings} vị trí cho ${crCtx.roles} vai trò, làm việc tại văn phòng Quận 2 cũ (P. Bình Trưng, TP.HCM): ${crOpen.map((j) => `${j.count} ${j.title}`).join(", ")}`,
      agent ? `- Thu nhập ${agent.shortTitle}: ${agent.salary}; ${others}` : `- Thu nhập: ${others}`,
      `- Lộ trình nghề nghiệp ${(CAREERS.path.stages || []).length} bậc: ${(CAREERS.path.stages || []).map((s) => s.title).join(" → ")}, lũy tiến theo năng lực và kết quả`,
      `- Hệ thống hỗ trợ: ${(CAREERS.ecosystem.modules || []).map((m) => m.title).join(", ")}; mỗi thành viên có mã chứng nhận PL-xxxx tra cứu công khai và trang hồ sơ riêng`,
      "- Người chưa có kinh nghiệm bất động sản vẫn ứng tuyển Agent được (ưu tiên người từng làm sales)",
      `- Quy trình: ${(CAREERS.process.steps || []).map((s) => s.title.toLowerCase()).join(" → ")}`,
      `- Ứng tuyển: form trên trang (họ tên, số điện thoại, vị trí), email ${SITE.email}, Zalo ${SITE.hotline} hoặc inbox fanpage PaceLand`,
      `- Trang từng vị trí: ${crOpen.map((j) => `[${j.shortTitle || j.title}](${SITE_URL}/tuyen-dung/${j.id}.html)`).join(" · ")}`,
      "",
    ].join("\n");
    fs.writeFileSync(f, txt.slice(0, a) + block + txt.slice(b));
    console.log("  ✓ llms.txt (khối Tuyển dụng đồng bộ JOBS)");
  }
}

patchFile("salehub.html", (h) => {
  h = upsertLd(h, "pl-ld-org", ldTag("pl-ld-org", ORG_LD));
  h = inject(h, "salehub", '<div class="card-grid" id="salehubGrid"></div>', absolutize(PROJECTS.map(renderProjectCard).join("")));
  return h;
});

/* Org schema cho các trang còn lại */
for (const page of ["gioi-thieu.html", "doi-tac.html", "lien-he.html", "cong-cu.html", "gladia-heights.html", "beachtro-blanca-city.html", "bai-viet.html", "du-an-chi-tiet.html"]) {
  patchFile(page, (h) => upsertLd(h, "pl-ld-org", ldTag("pl-ld-org", ORG_LD)));
}

/* ---------- 5. sitemap.xml ---------- */
const urls = [
  { loc: "/", pri: "1.0", mod: today },
  { loc: "/du-an.html", pri: "0.9", mod: today },
  { loc: "/goc-nhin.html", pri: "0.9", mod: today },
  { loc: "/faq.html", pri: "0.9", mod: today },
  { loc: "/cong-cu.html", pri: "0.9", mod: today },
  { loc: "/gladia-heights.html", pri: "0.9", mod: today },
  { loc: "/beachtro-blanca-city.html", pri: "0.9", mod: today },
  { loc: "/chung-nhan-doi-tac.html", pri: "0.8", mod: today },
  { loc: "/gioi-thieu.html", pri: "0.7", mod: today },
  { loc: "/doi-tac.html", pri: "0.7", mod: today },
  { loc: "/tuyen-dung.html", pri: "0.6", mod: crOpen.map((j) => j.updated || j.datePosted || "").sort().pop() || today },
  { loc: "/lien-he.html", pri: "0.8", mod: today },
  { loc: "/salehub.html", pri: "0.6", mod: today },
  ...PROJECTS.map((p) => ({ loc: `/du-an/${p.id}.html`, pri: "0.8", mod: today })),
  ...POSTS.map((p) => ({ loc: `/bai-viet/${p.id}.html`, pri: "0.7", mod: isoDate(p.date) })),
  ...activePartners.map((cv) => ({ loc: `/chuyen-vien/${cv.id}.html`, pri: "0.6", mod: today })),
  ...crOpen.map((j) => ({ loc: `/tuyen-dung/${j.id}.html`, pri: "0.7", mod: j.updated || j.datePosted || today })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${encodeURI(u.loc)}</loc><lastmod>${u.mod}</lastmod><changefreq>weekly</changefreq><priority>${u.pri}</priority></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap);

/* ---------- 6. Footer tĩnh + ?v= theo băm nội dung trên MỌI trang HTML ---------- */
{
  const hashCache = {};
  const hashOf = (rel) => (hashCache[rel] = hashCache[rel] || (fs.existsSync(path.join(ROOT, rel)) ? assetHash(rel) : null));
  const reAsset = /((?:src|href)=")(\/?)(assets\/(?:js|css)\/[A-Za-z0-9_.-]+\.(?:js|css))\?v=[^"]*"/g;
  const dirs = ["", "bai-viet", "du-an", "chuyen-vien", "tuyen-dung"];
  let touched = 0;
  for (const d of dirs) {
    const dir = path.join(ROOT, d);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith(".html")) continue;
      const file = path.join(dir, f);
      const before = fs.readFileSync(file, "utf8");
      let h = before.replace(reAsset, (m, attr, slash, rel) => { const v = hashOf(rel); return v ? `${attr}${slash}${rel}?v=${v}"` : m; });
      if (d === "" && f !== "admin.html" && FOOTER_HTML && h.includes('id="footer-root"')) h = inject(h, "footer", '<div id="footer-root"></div>', FOOTER_HTML);
      if (h !== before) { fs.writeFileSync(file, h); touched++; }
    }
  }
  console.log(`  ✓ footer tĩnh + băm asset (${touched} file cập nhật)`);
}

console.log(`\nHoàn tất:
  • ${postPages} trang bài viết  -> /bai-viet/
  • ${projectPages} trang dự án    -> /du-an/
  • ${profilePages} trang chuyên viên -> /chuyen-vien/
  • 4 trang danh sách đã có nội dung tĩnh + schema
  • sitemap.xml: ${urls.length} URL`);
