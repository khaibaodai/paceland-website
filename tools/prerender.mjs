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

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://paceland.vn";

/* ---------- 1. Nạp data.js + components.js ---------- */
const dataSrc = fs.readFileSync(path.join(ROOT, "assets/js/data.js"), "utf8");
const compSrc = fs.readFileSync(path.join(ROOT, "assets/js/components.js"), "utf8");
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(dataSrc + "\n" + compSrc, sandbox);
const W = sandbox.window;
const { SITE, NAV, PROJECTS, POSTS, FAQS, PARTNERS } = W;
const renderProjectCard = W.renderProjectCard;
const renderPostCard = W.renderPostCard;
const renderPartnerCard = W.renderPartnerCard;
const resolveImg = W.resolveImg;

/* ---------- Phiên bản script lấy từ index.html (tự đồng bộ) ---------- */
const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const ver = (re, fb) => (indexHtml.match(re) || [, fb])[1];
const V = {
  data: ver(/data\.js\?v=(\d+)/, "1"),
  comp: ver(/components\.js\?v=(\d+)/, "1"),
  main: ver(/main\.js\?v=(\d+)/, "1"),
  css: ver(/styles\.css\?v=(\d+)/, "1"),
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
  sameAs: [SITE.zalo].filter((x) => x && x !== "#"),
  priceRange: "$$$$",
};
const WEBSITE_LD = { "@context": "https://schema.org", "@type": "WebSite", "@id": SITE_URL + "/#website", url: SITE_URL + "/", name: "PaceLand", inLanguage: "vi-VN", publisher: { "@id": SITE_URL + "/#organization" } };

/* ---------- Khung trang con (bài viết / dự án) ---------- */
function pageShell({ title, desc, canonical, ogImage, ogType, ldTags, bodyMain }) {
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
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#C70018">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="PaceLand">
<meta property="og:locale" content="vi_VN">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${ogImage}">
${ldTags.join("\n")}
</head>
<body>
<div id="header-root"></div>
<main>
${bodyMain}
</main>
<div id="footer-root"></div>
<script src="/assets/js/data.js?v=${V.data}"></script>
<script src="/assets/js/components.js?v=${V.comp}"></script>
<script src="/assets/js/main.js?v=${V.main}"></script>
</body>
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
fs.mkdirSync(path.join(ROOT, "du-an"), { recursive: true });
let projectPages = 0;
for (const p of PROJECTS) {
  const url = `/du-an/${p.id}.html`;
  const canonical = SITE_URL + url;
  const cover = absUrl(resolveImg(p.cover, 1400));
  const crumbs = [{ label: "Trang chủ", href: "/index.html" }, { label: "Dự án", href: "/du-an.html" }, { label: p.name }];
  const related = PROJECTS.filter((x) => x.id !== p.id && x.area === p.area).slice(0, 3);
  const relatedFinal = related.length ? related : PROJECTS.filter((x) => x.id !== p.id).slice(0, 3);

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

    <h2 class="mt-4" style="font-size:1.3rem">Tiện ích nổi bật</h2>
    <ul class="mt-2" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.6rem 1.4rem;list-style:none">
      ${(p.amenities || []).map((a) => `<li style="display:flex;gap:.55rem;align-items:center"><span class="gem gem--sm"></span>${esc(a)}</li>`).join("")}
    </ul>

    ${(p.gallery || []).length > 1 ? `<div class="grid cols-3 mt-4">${p.gallery.slice(0, 3).map((g) => `<img src="/${esc(resolveImg(g, 900))}" alt="${esc(p.name)}" loading="lazy" style="border-radius:10px;aspect-ratio:4/3;object-fit:cover;width:100%">`).join("")}</div>` : ""}
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
    ldTags: [ldTag("pl-ld-org", ORG_LD), ldTag("pl-ld-product", productLd), ldTag("pl-ld-breadcrumb", breadcrumbLd(crumbs))],
    bodyMain,
  });
  fs.writeFileSync(path.join(ROOT, "du-an", `${p.id}.html`), html);
  projectPages++;
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
        worksFor: { "@id": SITE_URL + "/#organization" },
        ...(p.photo ? { image: absUrl(resolveImg(p.photo, 400)) } : {}),
        ...(p.bio ? { description: stripTags(p.bio) } : {}),
      },
    })),
  };
  h = upsertLd(h, "pl-ld-partners", ldTag("pl-ld-partners", peopleLd));
  h = inject(h, "partners", '<div class="partner-grid" id="partnerGrid"></div>',
    active.length ? absolutize(active.map(renderPartnerCard).join("")) : '<p style="color:var(--muted);grid-column:1/-1">Danh sách đối tác đang được cập nhật.</p>');
  return h;
});

/* Org schema cho các trang còn lại */
for (const page of ["gioi-thieu.html", "doi-tac.html", "tuyen-dung.html", "lien-he.html", "cong-cu.html", "gladia-heights.html", "bai-viet.html", "du-an-chi-tiet.html"]) {
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
  { loc: "/chung-nhan-doi-tac.html", pri: "0.8", mod: today },
  { loc: "/gioi-thieu.html", pri: "0.7", mod: today },
  { loc: "/doi-tac.html", pri: "0.7", mod: today },
  { loc: "/tuyen-dung.html", pri: "0.6", mod: today },
  { loc: "/lien-he.html", pri: "0.8", mod: today },
  ...PROJECTS.map((p) => ({ loc: `/du-an/${p.id}.html`, pri: "0.8", mod: today })),
  ...POSTS.map((p) => ({ loc: `/bai-viet/${p.id}.html`, pri: "0.7", mod: isoDate(p.date) })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${u.loc}</loc><lastmod>${u.mod}</lastmod><changefreq>weekly</changefreq><priority>${u.pri}</priority></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap);

console.log(`\nHoàn tất:
  • ${postPages} trang bài viết  -> /bai-viet/
  • ${projectPages} trang dự án    -> /du-an/
  • 4 trang danh sách đã có nội dung tĩnh + schema
  • sitemap.xml: ${urls.length} URL`);
