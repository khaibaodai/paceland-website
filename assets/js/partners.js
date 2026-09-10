/* ============================================================
   PACELAND — Chứng nhận Đối tác (chung-nhan-doi-tac.html)
   Tra cứu mã chứng nhận + danh bạ 2 nhóm:
   Ban Lãnh Đạo (grid) · Đối tác được chứng nhận (slider ngang).
   ============================================================ */

(function () {
  if (typeof window === "undefined") return;
  if (!document.getElementById("partnerGridBod") && !document.getElementById("partnerGrid") && !document.getElementById("partnerLookupForm")) return;

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function norm(s) { return String(s || "").toLowerCase().trim(); }
  function isBod(p) { return norm(p.level) === "ban lãnh đạo"; }

  var EMPTY = '<p style="color:var(--muted);grid-column:1/-1">Danh sách đối tác đang được cập nhật.</p>';

  function renderGrid() {
    var all = (window.PARTNERS || []).filter(function (p) { return p.status === "active"; });
    var bodEl = document.getElementById("partnerGridBod");
    var agEl = document.getElementById("partnerSlider");
    if (bodEl) {
      var bod = all.filter(isBod);
      bodEl.innerHTML = bod.length ? bod.map(window.renderPartnerCard).join("") : EMPTY;
    }
    if (agEl) {
      var ag = all.filter(function (p) { return !isBod(p); });
      agEl.innerHTML = ag.length ? ag.map(window.renderPartnerCard).join("") : EMPTY;
    }
    /* HTML cũ còn cache (một grid duy nhất) */
    var legacy = document.getElementById("partnerGrid");
    if (legacy && !bodEl) {
      legacy.innerHTML = all.length ? all.map(window.renderPartnerCard).join("") : EMPTY;
    }
  }

  function initSlider() {
    var track = document.getElementById("partnerSlider");
    var prev = document.getElementById("partnerPrev");
    var next = document.getElementById("partnerNext");
    if (!track || !prev || !next) return;
    function step() {
      var card = track.querySelector(".partner-card");
      var gap = parseFloat(getComputedStyle(track).columnGap) || 20;
      return (card ? card.getBoundingClientRect().width : 300) + gap;
    }
    function sync() {
      var max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= max - 4;
      var nav = prev.parentElement;
      if (nav) nav.style.visibility = max > 4 ? "" : "hidden";
    }
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    var raf = null;
    track.addEventListener("scroll", function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = null; sync(); });
    });
    window.addEventListener("resize", sync);
    sync();
  }

  var ICO_OK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  var ICO_WARN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
  var ICO_ERR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';

  function showResult(kind, icon, title, html) {
    var box = document.getElementById("lookupResult");
    if (!box) return;
    box.className = "lookup-result show " + kind;
    box.innerHTML = '<div class="ic">' + icon + '</div><div class="body"><b>' + title + "</b><p>" + html + "</p></div>";
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function findPartner(query) {
    var q = norm(query);
    if (!q) return null;
    var list = window.PARTNERS || [];
    var byCode = list.filter(function (p) { return norm(p.code) === q; })[0];
    if (byCode) return byCode;
    return list.filter(function (p) { return norm(p.name).indexOf(q) !== -1; })[0] || null;
  }

  function doLookup(query) {
    var hotline = (window.SITE && window.SITE.hotline) || "0903 983 737";
    var p = findPartner(query);
    if (!p) {
      showResult("err", ICO_ERR, "Không tìm thấy trong hệ thống",
        'Mã hoặc tên "<b>' + esc(query) + '</b>" không có trong danh sách chứng nhận của PaceLand. Vui lòng liên hệ hotline <b>' + hotline + "</b> để được xác minh trực tiếp.");
      return;
    }
    if (p.status === "active") {
      showResult("ok", ICO_OK, "✓ Đối tác chính thức của PaceLand",
        "<b>" + esc(p.name) + "</b> — " + esc(p.role) + " (" + esc(p.level) + "), mã chứng nhận <b>" + esc(p.code) + "</b>" +
        (p.since ? ", hợp tác từ " + esc(p.since) : "") + ". Đây là người đại diện hợp lệ, đang hoạt động của PaceLand.");
    } else {
      showResult("warn", ICO_WARN, "⚠ Đã ngừng hợp tác với PaceLand",
        "<b>" + esc(p.name) + "</b> (mã " + esc(p.code) + ") hiện <b>không còn</b> là đối tác/nhân sự của PaceLand. Vui lòng không giao dịch hoặc chuyển tiền qua cá nhân này — mọi giao dịch chính thức xin liên hệ hotline <b>" + hotline + "</b>.");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderGrid();
    initSlider();
    if (typeof window.__plScanReveal === "function") window.__plScanReveal();

    var form = document.getElementById("partnerLookupForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = document.getElementById("partnerLookupInput");
        doLookup(input ? input.value : "");
      });
    }
    ["partnerGridBod", "partnerSlider", "partnerGrid"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("click", function (e) {
        var card = e.target.closest("[data-code]");
        if (!card) return;
        var code = card.getAttribute("data-code");
        var input = document.getElementById("partnerLookupInput");
        if (input) input.value = code;
        doLookup(code);
        var box = document.getElementById("partnerLookup");
        if (box) box.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  });
})();
