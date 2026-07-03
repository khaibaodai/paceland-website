/* ============================================================
   PACELAND — Tương tác (interactions & page modules)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Reveal on scroll ---------- */
  var revealObserver = null;
  function initReveal() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
      return;
    }
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    scanReveal();
  }
  function scanReveal() {
    if (!revealObserver) return;
    document.querySelectorAll(".reveal:not([data-seen])").forEach(function (el) {
      el.setAttribute("data-seen", "1"); revealObserver.observe(el);
    });
  }

  /* ---------- Hero Slider ---------- */
  function initHeroSlider() {
    var slider = document.getElementById("heroSlider");
    if (!slider) return;

    function run() {
      /* Build slides from HERO_SLIDES data if available */
      if (window.HERO_SLIDES && window.HERO_SLIDES.length) {
        var slidesDiv = slider.querySelector(".hs-slides");
        var capsDiv   = slider.querySelector(".hs-captions");
        var progsDiv  = slider.querySelector(".hs-progress");
        if (slidesDiv) slidesDiv.innerHTML = window.HERO_SLIDES.map(function (s) {
          return '<div class="hs-slide" style="background-image:url(\'' + s.img.replace(/'/g, "%27") + '\')"></div>';
        }).join("");
        if (capsDiv) {
          capsDiv.innerHTML = window.HERO_SLIDES.map(function () { return '<span class="hs-cap"></span>'; }).join("");
          var capEls = capsDiv.querySelectorAll(".hs-cap");
          window.HERO_SLIDES.forEach(function (s, i) { if (capEls[i]) capEls[i].textContent = s.caption || ""; });
        }
        if (progsDiv) progsDiv.innerHTML = window.HERO_SLIDES.map(function (_, i) {
          return '<button class="hs-prog" role="tab" aria-label="Slide ' + (i + 1) + '"></button>';
        }).join("");
      }

      var slides = slider.querySelectorAll(".hs-slide");
      var progs  = slider.querySelectorAll(".hs-prog");
      var caps   = slider.querySelectorAll(".hs-cap");
      if (!slides.length) return;

      var current = 0;
      var total   = slides.length;
      var timer   = null;
      var DURATION = 5000;

      function activate(idx) {
        slides[idx].classList.add("active");
        caps[idx].classList.add("active");
        requestAnimationFrame(function () { progs[idx].classList.add("active"); });
      }
      function deactivate(idx) {
        slides[idx].classList.remove("active");
        progs[idx].classList.remove("active");
        caps[idx].classList.remove("active");
      }
      function goTo(idx) {
        deactivate(current);
        current = (idx + total) % total;
        activate(current);
        clearTimeout(timer);
        timer = setTimeout(function () { goTo(current + 1); }, DURATION);
      }

      slides.forEach(function (s) { s.classList.remove("active"); });
      progs.forEach(function (p)  { p.classList.remove("active"); });
      caps.forEach(function (c)   { c.classList.remove("active"); });
      activate(0);
      timer = setTimeout(function () { goTo(1); }, DURATION);

      progs.forEach(function (p, i) {
        p.addEventListener("click", function () {
          if (i === current) return;
          clearTimeout(timer);
          deactivate(current);
          current = i;
          activate(current);
          timer = setTimeout(function () { goTo(current + 1); }, DURATION);
        });
      });

      slider.addEventListener("mouseenter", function () { clearTimeout(timer); });
      slider.addEventListener("mouseleave", function () {
        timer = setTimeout(function () { goTo(current + 1); }, DURATION);
      });
    }

    /* Fetch fresh slides from GitHub if repo is configured in data.js */
    var repo = window.HERO_SLIDES_REPO;
    var branch = window.HERO_SLIDES_BRANCH || "main";
    if (repo) {
      var url = "https://raw.githubusercontent.com/" + repo + "/" + branch + "/assets/data/hero-slides.json?t=" + Date.now();
      fetch(url, { cache: "no-cache" })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (data) { if (data && Array.isArray(data) && data.length) window.HERO_SLIDES = data; run(); })
        .catch(function () { run(); });
      return;
    }

    run();
  }

  /* ---------- Header scroll + auto-hide ---------- */
  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    if (!header) return;
    var last = window.scrollY;
    var onScroll = function () {
      var y = window.scrollY;
      header.classList.toggle("scrolled", y > 24);
      header.classList.toggle("header--hidden", y > 120 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Image fade on load ---------- */
  function initImageFade() {
    var sel = ".hero-visual img, .pcard__media img, .icard__media img, .ifeature__media img, .gallery img, .article img, .media-shot img";
    document.querySelectorAll(sel).forEach(function (img) {
      img.classList.add("img-fade");
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add("loaded");
      } else {
        img.addEventListener("load", function () { img.classList.add("loaded"); });
      }
    });
  }

  /* ---------- Hero parallax ---------- */
  function initParallax() {
    if (window.innerWidth < 920) return;
    var img = document.querySelector(".hero-visual .frame img");
    if (!img) return;
    img.style.height = "110%";
    img.style.marginTop = "-5%";
    img.classList.add("parallax-img");
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var pct = Math.min(window.scrollY / window.innerHeight, 1);
          img.style.transform = "translateY(" + (pct * 8) + "%)";
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    var burger = document.getElementById("burger");
    var nav = document.getElementById("mobileNav");
    if (!burger || !nav) return;
    var toggle = function (open) {
      burger.classList.toggle("open", open);
      nav.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("no-scroll", open);
    };
    burger.addEventListener("click", function () { toggle(!nav.classList.contains("open")); });
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { toggle(false); }); });
  }

  /* ---------- Favorites ---------- */
  function getFavs() { try { return JSON.parse(localStorage.getItem("pl_favs") || "[]"); } catch (e) { return []; } }
  function initFavorites() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-fav]");
      if (!btn) return;
      e.preventDefault();
      btn.classList.toggle("on");
    });
  }

  /* ---------- Count up ---------- */
  function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseFloat(el.getAttribute("data-count")), dec = (target % 1 !== 0) ? 1 : 0;
        var start = null, dur = 1400;
        function step(ts) {
          if (!start) start = ts;
          var pr = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - pr, 3);
          el.textContent = (target * eased).toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          if (pr < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Forms (Formspree-ready) ---------- */
  function initForms() {
    document.querySelectorAll("form[data-pace-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var btn = form.querySelector("[type=submit]");
        var ok = form.querySelector(".form-success");
        var endpoint = SITE.formEndpoint || "";
        var done = function () {
          if (ok) { ok.classList.add("show"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
          form.reset();
          if (btn) { btn.disabled = false; btn.innerHTML = btn.getAttribute("data-label") || "Gửi"; }
        };
        if (btn) { btn.setAttribute("data-label", btn.innerHTML); btn.disabled = true; btn.textContent = "Đang gửi…"; }
        // Demo mode nếu chưa cấu hình Formspree
        if (!endpoint || endpoint.indexOf("your-form-id") !== -1) { setTimeout(done, 700); return; }
        fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
          .then(function () { done(); })
          .catch(function () { done(); });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  var lb = { items: [], idx: 0, el: null };
  function initLightbox() {
    var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
    if (!triggers.length) return;
    lb.items = triggers.map(function (t) { return t.getAttribute("href") || t.getAttribute("data-src"); });
    var el = document.createElement("div");
    el.className = "lightbox";
    el.innerHTML =
      '<button class="lb-close" aria-label="Đóng">' + ICONS.x + "</button>" +
      '<button class="lb-nav lb-prev" aria-label="Trước">' + ICONS.chevronLeft + "</button>" +
      '<img src="data:," alt="">' +
      '<button class="lb-nav lb-next" aria-label="Sau">' + ICONS.chevronRight + "</button>";
    document.body.appendChild(el);
    lb.el = el;
    var img = el.querySelector("img");
    var show = function (i) { lb.idx = (i + lb.items.length) % lb.items.length; img.src = lb.items[lb.idx]; };
    triggers.forEach(function (t, i) {
      t.addEventListener("click", function (e) { e.preventDefault(); show(i); el.classList.add("open"); document.body.classList.add("no-scroll"); });
    });
    var close = function () { el.classList.remove("open"); document.body.classList.remove("no-scroll"); };
    el.querySelector(".lb-close").addEventListener("click", close);
    el.querySelector(".lb-prev").addEventListener("click", function () { show(lb.idx - 1); });
    el.querySelector(".lb-next").addEventListener("click", function () { show(lb.idx + 1); });
    el.addEventListener("click", function (e) { if (e.target === el) close(); });
    document.addEventListener("keydown", function (e) {
      if (!el.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(lb.idx + 1);
      if (e.key === "ArrowLeft") show(lb.idx - 1);
    });
  }

  /* ---------- Helpers ---------- */
  function qs(name) { return new URLSearchParams(location.search).get(name); }
  function fill(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; }

  /* ---------- HOME: featured projects + latest posts + search ---------- */
  function renderFeatured() {
    var grid = document.getElementById("featuredProjects");
    if (!grid) return;
    var feat = PROJECTS.filter(function (p) { return p.offmarket || p.badge === "Biên lợi nhuận cao"; }).slice(0, 6);
    if (feat.length < 6) feat = PROJECTS.slice(0, 6);
    grid.innerHTML = feat.map(renderProjectCard).join("");
  }
  function renderLatestPosts() {
    var grid = document.getElementById("latestPosts");
    if (!grid) return;
    grid.innerHTML = POSTS.slice(0, 3).map(function (p) { return renderPostCard(p, false); }).join("");
  }
  function initHomeSearch() {
    var form = document.getElementById("homeSearch");
    if (!form) return;
    populateSelect(form.querySelector("[name=area]"), FILTERS.area);
    populateSelect(form.querySelector("[name=type]"), FILTERS.type);
    populateSelect(form.querySelector("[name=price]"), FILTERS.price);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var p = new URLSearchParams();
      ["area", "type", "price"].forEach(function (k) {
        var v = form.querySelector("[name=" + k + "]").value;
        if (v && v.indexOf("Tất cả") === -1 && v.indexOf("Mọi") === -1) p.set(k, v);
      });
      location.href = "du-an.html" + (p.toString() ? "?" + p.toString() : "");
    });
  }
  function populateSelect(sel, arr, val) {
    if (!sel) return;
    sel.innerHTML = arr.map(function (o) { return '<option' + (o === val ? " selected" : "") + ">" + o + "</option>"; }).join("");
  }

  /* ---------- PROJECT LISTING ---------- */
  function priceBucket(v) {
    if (v < 10) return "Dưới 10 tỉ";
    if (v < 30) return "10 – 30 tỉ";
    if (v < 60) return "30 – 60 tỉ";
    return "Trên 60 tỉ";
  }
  function initProjectListing() {
    var root = document.getElementById("projectListing");
    if (!root) return;
    var grid = document.getElementById("projectGrid");
    var fArea = root.querySelector("[name=area]"), fSeg = root.querySelector("[name=segment]"),
        fType = root.querySelector("[name=type]"), fPrice = root.querySelector("[name=price]"),
        fSearch = root.querySelector("[name=q]"), countEl = document.getElementById("resultCount"),
        resetBtn = document.getElementById("resetFilters");
    populateSelect(fArea, FILTERS.area, qs("area") || undefined);
    populateSelect(fSeg, FILTERS.segment, qs("segment") || undefined);
    populateSelect(fType, FILTERS.type, qs("type") || undefined);
    populateSelect(fPrice, FILTERS.price, qs("price") || undefined);
    if (qs("q") && fSearch) fSearch.value = qs("q");

    function apply() {
      var a = fArea.value, s = fSeg.value, t = fType.value, pr = fPrice.value,
          q = (fSearch.value || "").trim().toLowerCase();
      var list = PROJECTS.filter(function (p) {
        if (a.indexOf("Tất cả") === -1 && p.area !== a) return false;
        if (s.indexOf("Mọi") === -1 && p.segment !== s) return false;
        if (t.indexOf("Mọi") === -1 && p.type !== t) return false;
        if (pr.indexOf("Mọi") === -1 && priceBucket(p.priceValue) !== pr) return false;
        if (q && (p.name + " " + p.location + " " + p.developer).toLowerCase().indexOf(q) === -1) return false;
        return true;
      });
      grid.innerHTML = list.length ? list.map(renderProjectCard).join("")
        : '<div class="empty"><div class="gem"></div><h3>Không tìm thấy dự án phù hợp</h3><p>Hãy thử nới lỏng bộ lọc hoặc liên hệ để chúng tôi tư vấn riêng từ quỹ hàng giao dịch kín.</p></div>';
      if (countEl) countEl.innerHTML = "<em>" + list.length + "</em> dự án phù hợp";
      scanReveal();
    }
    [fArea, fSeg, fType, fPrice].forEach(function (el) { el && el.addEventListener("change", apply); });
    if (fSearch) fSearch.addEventListener("input", apply);
    if (resetBtn) resetBtn.addEventListener("click", function () {
      [fArea, fSeg, fType, fPrice].forEach(function (el) { if (el) el.selectedIndex = 0; });
      if (fSearch) fSearch.value = ""; apply();
    });
    apply();
  }

  /* ---------- PROJECT DETAIL ---------- */
  function initProjectDetail() {
    var root = document.getElementById("projectDetail");
    if (!root) return;
    var p = PROJECTS.filter(function (x) { return x.id === qs("id"); })[0] || PROJECTS[0];
    document.title = p.name + " — PaceLand";

    var g = p.gallery && p.gallery.length ? p.gallery : [p.cover];
    var R = window.resolveImg || ph;
    var galleryHtml =
      '<a class="main" href="' + R(g[0], 1600) + '" data-lightbox>' + unsplashImg(g[0], 1200, p.name) + "</a>" +
      '<a href="' + R(g[1] || g[0], 1600) + '" data-lightbox>' + unsplashImg(g[1] || g[0], 700, p.name) + "</a>" +
      '<a href="' + R(g[2] || g[0], 1600) + '" data-lightbox>' + unsplashImg(g[2] || g[0], 700, p.name) +
        (g.length > 3 ? '<span class="more">+' + (g.length - 2) + " ảnh</span>" : "") + "</a>";
    for (var i = 3; i < g.length; i++) {
      galleryHtml += '<a href="' + R(g[i], 1600) + '" data-lightbox hidden></a>';
    }
    fill("pdGallery", galleryHtml);

    fill("pdBreadcrumb", p.name);
    fill("pdTitle", p.name);
    fill("pdLoc", ICONS.pin + " " + p.location);
    fill("pdTags", statusPillEl(p) + (p.badge ? '<span class="pill pill--gold">' + p.badge + "</span>" : ""));
    fill("pdShort", p.short);
    fill("pdDesc", p.description.map(function (t) { return "<p>" + t + "</p>"; }).join(""));
    fill("pdSpecs",
      specCell("Mức giá", p.priceText) + specCell("Loại hình", p.type) +
      specCell("Quy mô", p.beds) + specCell("Diện tích", p.size) +
      specCell("Phân khúc", p.segment) + specCell("Bàn giao", p.handover) +
      specCell("Khu vực", p.area) + specCell("Chủ đầu tư", p.developer));
    fill("pdAmenities", p.amenities.map(function (a) { return "<li>" + ICONS.check + "<span>" + a + "</span></li>"; }).join(""));
    fill("pdPrice", p.priceText + "<small>" + p.size + " · " + p.beds + "</small>");
    var pf = document.getElementById("pdProjectField"); if (pf) pf.value = p.name;

    var related = PROJECTS.filter(function (x) { return x.id !== p.id && x.area === p.area; });
    if (related.length < 3) related = PROJECTS.filter(function (x) { return x.id !== p.id; });
    fill("pdRelated", related.slice(0, 3).map(renderProjectCard).join(""));
    scanReveal();
  }
  function specCell(k, v) { return '<div class="c"><div class="k">' + k + '</div><div class="val">' + v + "</div></div>"; }
  function statusPillEl(p) {
    if (p.status === "Giao dịch kín") return '<span class="pill pill--red">' + ICONS.lock + " Giao dịch kín</span>";
    if (p.status === "Sắp ra mắt") return '<span class="pill pill--gold">Sắp ra mắt</span>';
    return '<span class="pill">' + p.status + "</span>";
  }

  /* ---------- POST LISTING ---------- */
  function initPostListing() {
    var root = document.getElementById("postListing");
    if (!root) return;
    var feat = document.getElementById("postFeatured");
    var grid = document.getElementById("postGrid");
    var cats = ["Tất cả"].concat(POSTS.map(function (p) { return p.category; }).filter(function (v, i, a) { return a.indexOf(v) === i; }));
    var chipWrap = document.getElementById("postChips");
    var active = "Tất cả";
    if (chipWrap) chipWrap.innerHTML = cats.map(function (c) { return '<button class="chip' + (c === active ? " active" : "") + '" data-cat="' + c + '">' + c + "</button>"; }).join("");

    function draw() {
      var list = POSTS.filter(function (p) { return active === "Tất cả" || p.category === active; });
      if (feat) feat.innerHTML = (active === "Tất cả" && list[0]) ? renderPostCard(list[0], true) : "";
      var rest = (active === "Tất cả") ? list.slice(1) : list;
      if (grid) grid.innerHTML = rest.map(function (p) { return renderPostCard(p, false); }).join("");
      scanReveal();
    }
    if (chipWrap) chipWrap.addEventListener("click", function (e) {
      var c = e.target.closest("[data-cat]"); if (!c) return;
      active = c.getAttribute("data-cat");
      chipWrap.querySelectorAll(".chip").forEach(function (x) { x.classList.toggle("active", x === c); });
      draw();
    });
    draw();
  }

  /* ---------- POST DETAIL ---------- */
  function initPostDetail() {
    var root = document.getElementById("postDetail");
    if (!root) return;
    var post = POSTS.filter(function (x) { return x.id === qs("id"); })[0] || POSTS[0];
    document.title = post.title + " — PaceLand";
    fill("psBreadcrumb", post.title);
    fill("psCat", post.category);
    fill("psTitle", post.title);
    fill("psMeta", "<span>" + post.date + '</span><span class="dot"></span><span>' + post.readtime + "</span>");
    fill("psCover", unsplashImg(post.cover, 1400, post.title));
    fill("psBody", post.body.map(renderBlock).join(""));
    var rel = POSTS.filter(function (x) { return x.id !== post.id; }).slice(0, 3);
    fill("psRelated", rel.map(function (p) { return renderPostCard(p, false); }).join(""));
    scanReveal();
  }
  function renderBlock(b) {
    if (b.t === "p") return "<p>" + b.c + "</p>";
    if (b.t === "h") return "<h2>" + b.c + "</h2>";
    if (b.t === "q") return "<blockquote>" + b.c + "</blockquote>";
    if (b.t === "ul") return '<ul class="bullets">' + b.c.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>";
    if (b.t === "table" && b.c && b.c.rows) {
      var thead = (b.c.head || []).map(function (h) { return "<th>" + h + "</th>"; }).join("");
      var trows = b.c.rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("");
      return '<div class="post-table-wrap"><table class="post-table">' + (thead ? "<thead><tr>" + thead + "</tr></thead>" : "") + "<tbody>" + trows + "</tbody></table></div>";
    }
    return "";
  }
  if (typeof window !== "undefined") window.__plRenderBlock = renderBlock;

  /* ---------- CAREERS ---------- */
  function initCareers() {
    var grid = document.getElementById("jobList");
    if (!grid || typeof JOBS === "undefined") return;
    grid.innerHTML = JOBS.map(function (j) {
      return '<article class="job-card reveal">' +
        "<div><h3>" + j.title + "</h3>" +
        '<div class="job-meta">' +
          "<span>" + ICONS.building + j.dept + "</span>" +
          "<span>" + ICONS.pin + j.location + "</span>" +
          "<span>" + ICONS.clock + j.type + "</span>" +
          "<span>" + ICONS.chart + j.salary + "</span>" +
        "</div></div>" +
        '<a class="btn" href="lien-he.html?vitri=' + encodeURIComponent(j.title) + '">Ứng tuyển ' + ICONS.arrow + "</a>" +
      "</article>";
    }).join("");
    scanReveal();
  }

  /* ---------- FAQ accordion ---------- */
  function initFAQ() {
    var root = document.getElementById("faqList");
    if (!root || typeof FAQS === "undefined") return;
    root.innerHTML = FAQS.map(function (g) {
      return '<div class="faq-group-title">' + g.group + "</div>" +
        g.items.map(function (it) {
          return '<div class="faq-item">' +
            '<button class="faq-q" type="button"><span>' + it.q + '</span><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>' +
            '<div class="faq-a"><div class="faq-a-inner">' + it.a + "</div></div>" +
          "</div>";
        }).join("");
    }).join("");
    root.addEventListener("click", function (e) {
      var q = e.target.closest(".faq-q");
      if (!q) return;
      var item = q.parentElement;
      var ans = item.querySelector(".faq-a");
      item.classList.toggle("open");
    });
    scanReveal();
  }

  /* ---------- Float back-to-top ---------- */
  function initFloatTop() {
    var btn = document.getElementById("fcTop");
    if (!btn) return;
    var onScroll = function () { btn.classList.toggle("show", window.scrollY > 600); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* ---------- Apply editable page content (from CMS "Trang" tab) ---------- */
  function applyPageContent() {
    if (typeof PAGES === "undefined") return;
    var map = { "index.html": "home", "gioi-thieu.html": "about", "doi-tac.html": "partner", "tuyen-dung.html": "careers", "faq.html": "faq", "lien-he.html": "contact" };
    var file = location.pathname.split("/").pop() || "index.html";
    var pg = map[file]; if (!pg || !PAGES[pg]) return;
    var vals = {}; PAGES[pg].fields.forEach(function (f) { vals[f.k] = f.value; });
    document.querySelectorAll("[data-edit]").forEach(function (el) {
      var k = el.getAttribute("data-edit");
      if (vals[k] != null) el.textContent = vals[k];
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof mountChrome === "function") mountChrome();
    applyPageContent();
    initHeroSlider();
    initHeaderScroll();
    initMobileMenu();
    initReveal();
    initImageFade();
    initParallax();
    initFavorites();
    initForms();
    initCounters();
    renderFeatured();
    renderLatestPosts();
    initHomeSearch();
    initProjectListing();
    initProjectDetail();
    initPostListing();
    initPostDetail();
    initCareers();
    initFAQ();
    initFloatTop();
    initLightbox();
    scanReveal();
  });
})();
