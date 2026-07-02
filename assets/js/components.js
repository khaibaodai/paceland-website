/* ============================================================
   PACELAND — Components dùng chung (header, footer, cards, icons)
   ============================================================ */

const ICONS = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  arrowUpRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>',
  ruler: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>',
  gem: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.8a4.3 4.3 0 0 1-1-2.8h-3.3v13.4a2.4 2.4 0 1 1-2.4-2.4c.25 0 .5.04.73.11V8.7a5.7 5.7 0 1 0 4.97 5.65V8.9a7.6 7.6 0 0 0 4.4 1.4V7a4.3 4.3 0 0 1-3.4-1.2z"/></svg>',
  zalo: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.78 1.46 5.25 3.74 6.86-.13.94-.5 2.2-1.32 3.06-.2.21-.06.55.23.5 1.74-.27 3.2-1.02 4.04-1.56.74.16 1.52.24 2.31.24 5.52 0 10-3.94 10-8.8S17.52 2 12 2z"/></svg>',
};

/* Nhận diện giá trị ảnh: data URL / http(s) / đường dẫn nội bộ / mã Unsplash */
function resolveImg(v, w) {
  if (!v) return "";
  v = String(v);
  if (/^(data:|https?:|\/\/)/.test(v)) return v;
  if (v.indexOf("/") !== -1 || /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(v)) return v;
  return ph(v, w || 1200);
}
function unsplashImg(id, w, alt, cls) {
  var url = resolveImg(id, w || 1200);
  var fb = "https://picsum.photos/seed/pl" + String(id || "x").replace(/[^0-9a-z]/gi, "") + "/" + (w || 1200) + "/800";
  return '<img src="' + url + '" alt="' + (alt || "") + '" loading="lazy"' + (cls ? ' class="' + cls + '"' : "") +
    ' onerror="this.onerror=null;this.src=\'' + fb + '\'">';
}

function statusPill(p) {
  if (p.status === "Giao dịch kín") return '<span class="pill pill--red">' + ICONS.lock + ' Giao dịch kín</span>';
  if (p.status === "Sắp ra mắt") return '<span class="pill pill--gold">Sắp ra mắt</span>';
  return '<span class="pill pill--ghost">' + p.status + "</span>";
}

function renderProjectCard(p) {
  return '' +
  '<article class="pcard reveal">' +
    '<a class="pcard__media" href="du-an-chi-tiet.html?id=' + p.id + '" aria-label="' + p.name + '">' +
      unsplashImg(p.cover, 800, p.name) +
      '<div class="pcard__tags">' + statusPill(p) + (p.badge ? '<span class="pill pill--ghost">' + p.badge + "</span>" : "") + "</div>" +
      '<button class="pcard__fav" aria-label="Lưu dự án" data-fav>' + ICONS.heart + "</button>" +
      '<div class="pcard__price"><b>' + p.priceText + "</b><span>" + p.size + "</span></div>" +
    "</a>" +
    '<div class="pcard__body">' +
      '<div class="pcard__loc">' + ICONS.pin + "<span>" + p.location + "</span></div>" +
      '<h3><a href="du-an-chi-tiet.html?id=' + p.id + '">' + p.name + "</a></h3>" +
      '<div class="pcard__dev">Chủ đầu tư · ' + p.developer + "</div>" +
      '<div class="pcard__specs">' +
        '<span class="s">' + ICONS.bed + p.beds + "</span>" +
        '<span class="s">' + ICONS.ruler + p.size + "</span>" +
        '<span class="s">' + ICONS.building + p.type + "</span>" +
      "</div>" +
    "</div>" +
  "</article>";
}

function renderPostCard(post, big) {
  if (big) {
    return '' +
    '<a class="ifeature reveal" href="bai-viet.html?id=' + post.id + '">' +
      '<div class="ifeature__media">' + unsplashImg(post.cover, 1000, post.title) + "</div>" +
      '<div class="ifeature__body">' +
        '<span class="cat" style="color:var(--red);font-family:var(--head);font-weight:700;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase">' + post.category + "</span>" +
        '<h3 style="font-size:clamp(1.4rem,2.6vw,2rem);margin:.7rem 0 .8rem;line-height:1.18">' + post.title + "</h3>" +
        '<p style="color:var(--ink-soft);margin-bottom:1rem">' + post.excerpt + "</p>" +
        '<div class="meta" style="font-size:.78rem;color:var(--muted);display:flex;gap:.7rem;align-items:center"><span>' + post.date + '</span><span class="dot" style="width:3px;height:3px;border-radius:50%;background:var(--muted-2)"></span><span>' + post.readtime + "</span></div>" +
      "</div>" +
    "</a>";
  }
  return '' +
  '<a class="icard reveal" href="bai-viet.html?id=' + post.id + '">' +
    '<div class="icard__media">' + unsplashImg(post.cover, 700, post.title) + "</div>" +
    '<span class="cat">' + post.category + "</span>" +
    "<h3>" + post.title + "</h3>" +
    '<div class="meta"><span>' + post.date + '</span><span class="dot"></span><span>' + post.readtime + "</span></div>" +
  "</a>";
}

/* ---------- Header / Footer ---------- */
function currentPage() {
  var p = location.pathname.split("/").pop();
  return p && p.length ? p : "index.html";
}

function buildHeader() {
  var cur = currentPage();
  var links = NAV.map(function (n) {
    var active = n.href === cur ? " active" : "";
    return '<a class="' + active.trim() + '" href="' + n.href + '">' + n.label + "</a>";
  }).join("");
  var mlinks = NAV.map(function (n) {
    return '<a href="' + n.href + '">' + n.label + " <span>" + ICONS.arrowUpRight + "</span></a>";
  }).join("");

  return '' +
  '<header class="site-header" id="siteHeader">' +
    '<div class="container">' +
      '<a class="brand" href="index.html"><img src="assets/img/logo.png" alt="PaceLand — Kiến tạo giá trị thịnh vượng"></a>' +
      '<nav class="nav" aria-label="Điều hướng chính">' + links + "</nav>" +
      '<div class="header-cta">' +
        '<a class="header-phone" href="tel:' + SITE.hotlineRaw + '">' + ICONS.phone + SITE.hotline + "</a>" +
        '<a class="btn" href="lien-he.html">Tư vấn riêng ' + ICONS.arrow + "</a>" +
      "</div>" +
      '<button class="burger" id="burger" aria-label="Mở menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
    "</div>" +
  "</header>" +
  '<div class="mobile-nav" id="mobileNav">' + mlinks +
    '<div class="m-foot"><a href="tel:' + SITE.hotlineRaw + '" style="color:var(--red);font-weight:700">' + SITE.hotline + "</a><br>" + SITE.email + "</div>" +
  "</div>";
}

function buildFooter() {
  var nav = NAV.map(function (n) { return '<li><a href="' + n.href + '">' + n.label + "</a></li>"; }).join("");
  return '' +
  '<footer class="site-footer">' +
    '<div class="container">' +
      '<div class="footer-top">' +
        '<div class="footer-brand">' +
          '<img src="assets/img/logo-white.png" alt="PaceLand">' +
          "<p>" + SITE.legalName + " — mạng lưới bất động sản kín, kết nối khách hàng tinh hoa với những cơ hội tài sản tốt nhất bằng dữ liệu và tốc độ.</p>" +
          '<div class="footer-soc">' +
            '<a href="' + SITE.facebook + '" aria-label="Facebook">' + ICONS.facebook + "</a>" +
            '<a href="' + SITE.youtube + '" aria-label="YouTube">' + ICONS.youtube + "</a>" +
            '<a href="' + SITE.tiktok + '" aria-label="TikTok">' + ICONS.tiktok + "</a>" +
            '<a href="' + SITE.zalo + '" aria-label="Zalo">' + ICONS.zalo + "</a>" +
          "</div>" +
        "</div>" +
        '<div class="footer-col"><h4>Khám phá</h4><ul>' + nav + '<li><a href="faq.html">Câu hỏi thường gặp</a></li></ul></div>' +
        '<div class="footer-col"><h4>Phân khúc</h4><ul>' +
          '<li><a href="du-an.html">Căn hộ hạng sang</a></li>' +
          '<li><a href="du-an.html">Biệt thự &amp; nhà phố</a></li>' +
          '<li><a href="du-an.html">Bất động sản nghỉ dưỡng</a></li>' +
          '<li><a href="du-an.html">Sản phẩm giao dịch kín</a></li>' +
        "</ul></div>" +
        '<div class="footer-col footer-contact"><h4>Liên hệ</h4><ul>' +
          "<li>" + ICONS.pin + "<span>" + SITE.address + "</span></li>" +
          '<li>' + ICONS.phone + '<a href="tel:' + SITE.hotlineRaw + '">' + SITE.hotline + "</a></li>" +
          '<li>' + ICONS.mail + '<a href="mailto:' + SITE.email + '">' + SITE.email + "</a></li>" +
        "</ul></div>" +
      "</div>" +
      '<div class="footer-bottom">' +
        "<span>© " + new Date().getFullYear() + " " + SITE.legalName + ". Bảo lưu mọi quyền.</span>" +
        '<span>Kiến tạo giá trị thịnh vượng · <a href="admin.html" style="opacity:.65">Quản trị</a></span>' +
      "</div>" +
    "</div>" +
  "</footer>";
}

function buildFloatContact() {
  return '' +
    '<a class="fc-zalo pulse" href="' + SITE.zalo + '" target="_blank" rel="noopener" aria-label="Chat Zalo"><span class="float-label">Chat Zalo</span>' + ICONS.zalo + "</a>" +
    '<a class="fc-phone" href="tel:' + SITE.hotlineRaw + '" aria-label="Gọi điện thoại"><span class="float-label">Gọi ' + SITE.hotline + "</span>" + ICONS.phone + "</a>" +
    '<button class="fc-top" id="fcTop" aria-label="Lên đầu trang"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg></button>';
}

function mountChrome() {
  var h = document.getElementById("header-root");
  var f = document.getElementById("footer-root");
  if (h) h.innerHTML = buildHeader();
  if (f) f.innerHTML = buildFooter();
  if (!document.querySelector(".float-contact")) {
    var fc = document.createElement("div");
    fc.className = "float-contact";
    fc.innerHTML = buildFloatContact();
    document.body.appendChild(fc);
  }
}

if (typeof window !== "undefined") {
  window.ICONS = ICONS; window.unsplashImg = unsplashImg; window.resolveImg = resolveImg;
  window.renderProjectCard = renderProjectCard; window.renderPostCard = renderPostCard;
  window.mountChrome = mountChrome;
}
