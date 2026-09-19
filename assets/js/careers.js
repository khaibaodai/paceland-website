/* ============================================================
   PACELAND — Recruitment System (careers.js)
   Chỉ nạp trên /tuyen-dung.html và /tuyen-dung/*.html, sau main.js.

   Phần 1 — CORE (hàm thuần, không đụng DOM; chạy được trong Node
            cho tools/tests): validate, chuẩn hoá SĐT, dựng hồ sơ ứng
            tuyển, lọc tham số analytics (chặn PII), rate-limit.
   Phần 2 — DOM: lọc vị trí, form ứng tuyển (loading / success / error),
            sticky CTA mobile, sự kiện analytics, chia sẻ.

   Nguyên tắc: KHÔNG gửi tên / SĐT / email vào GA4, Meta, TikTok.
   ============================================================ */
(function (root) {
  "use strict";
  var core = {};

  /* ---------- Chuỗi & chuẩn hoá ---------- */
  core.clean = function (v, max) {
    var s = String(v == null ? "" : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").replace(/[ \t]+/g, " ").trim();
    return max ? s.slice(0, max) : s;
  };
  /* Trả SĐT di động VN dạng 0xxxxxxxxx, hoặc "" nếu không hợp lệ */
  core.normalizePhone = function (v) {
    var d = String(v == null ? "" : v).replace(/[^\d+]/g, "");
    if (d.indexOf("+84") === 0) d = d.slice(3);
    else if (d.indexOf("0084") === 0) d = d.slice(4);
    else if (d.indexOf("84") === 0 && d.length === 11) d = d.slice(2);
    d = d.replace(/\D/g, "");
    if (d.length === 9) d = "0" + d;
    return /^0(3|5|7|8|9)\d{8}$/.test(d) ? d : "";
  };
  core.normalizeUrl = function (v) {
    var s = core.clean(v, 300);
    if (!s) return "";
    if (!/^https?:\/\//i.test(s)) s = "https://" + s.replace(/^\/+/, "");
    return /^https?:\/\/[^\s/$.?#][^\s]*\.[^\s]{2,}/i.test(s) ? s : null;
  };
  core.EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  core.MESSAGES = {
    full_name: { required: "Vui lòng nhập họ và tên.", short: "Họ tên cần ít nhất 2 ký tự." },
    phone: { required: "Vui lòng nhập số điện thoại.", invalid: "Số điện thoại chưa đúng. Ví dụ: 0903 983 737." },
    position: { required: "Vui lòng chọn vị trí ứng tuyển." },
    email: { invalid: "Email chưa đúng định dạng." },
    profile_url: { invalid: "Link chưa đúng. Ví dụ: https://linkedin.com/in/ten-ban" }
  };

  /* values: {full_name, phone, position, email, profile_url} -> {ok, errors:{field: code}} */
  core.validate = function (v) {
    var e = {};
    var name = core.clean(v.full_name, 80);
    if (!name) e.full_name = "required"; else if (name.length < 2) e.full_name = "short";
    if (!core.clean(v.phone)) e.phone = "required"; else if (!core.normalizePhone(v.phone)) e.phone = "invalid";
    if (!core.clean(v.position)) e.position = "required";
    var email = core.clean(v.email, 120);
    if (email && !core.EMAIL_RE.test(email)) e.email = "invalid";
    if (core.clean(v.profile_url) && core.normalizeUrl(v.profile_url) === null) e.profile_url = "invalid";
    return { ok: Object.keys(e).length === 0, errors: e };
  };

  core.deviceType = function (width, ua) {
    ua = String(ua || "");
    if (/iPad|Tablet/i.test(ua) || (width >= 768 && width < 1024)) return "tablet";
    if (/Mobi|Android|iPhone/i.test(ua) || width < 768) return "mobile";
    return "desktop";
  };

  core.makeId = function (now, rnd) {
    var t = (now || Date.now()).toString(36).toUpperCase();
    var r = Math.floor((rnd == null ? Math.random() : rnd) * 1296).toString(36).toUpperCase();
    return "APP-" + t.slice(-6) + (r.length < 2 ? "0" + r : r);
  };

  /* Ghép attribution: ưu tiên last-touch (phiên này), fallback first-touch */
  core.flatAttribution = function (attr) {
    attr = attr || {};
    var first = attr.first || {}, last = attr.last || {};
    var pick = function (k) { return last[k] || first[k] || ""; };
    return {
      utm_source: pick("utm_source"), utm_medium: pick("utm_medium"), utm_campaign: pick("utm_campaign"),
      utm_content: pick("utm_content"), utm_term: pick("utm_term"),
      gclid: pick("gclid"), fbclid: pick("fbclid"), ttclid: pick("ttclid"),
      landing_page: first.landing || last.landing || "",
      referrer: first.referrer || last.referrer || ""
    };
  };

  /* Hồ sơ ứng tuyển — khớp docs/PACELAND_RECRUITMENT_SYSTEM.md (Application record) */
  core.buildApplication = function (v, ctx) {
    ctx = ctx || {};
    var a = core.flatAttribution(ctx.attribution);
    var name = core.clean(v.full_name, 80);
    var position = core.clean(v.position, 120);
    var url = core.normalizeUrl(v.profile_url);
    return {
      kind: "application",
      source: "tuyen-dung",
      id: ctx.id || core.makeId(ctx.now),
      created_at: new Date(ctx.now || Date.now()).toISOString(),
      status: "NEW",
      full_name: name,
      phone: core.normalizePhone(v.phone),
      email: core.clean(v.email, 120),
      position: position,
      experience: core.clean(v.experience, 80),
      profile_url: url || "",
      message: core.clean(v.message, 1000),
      job_slug: ctx.jobSlug || "",
      source_page: ctx.path || "",
      source_url: ctx.url || "",
      utm_source: a.utm_source, utm_medium: a.utm_medium, utm_campaign: a.utm_campaign,
      utm_content: a.utm_content, utm_term: a.utm_term,
      gclid: a.gclid, fbclid: a.fbclid, ttclid: a.ttclid,
      landing_page: a.landing_page,
      referrer: a.referrer,
      device_type: ctx.device || "",
      _subject: "Ứng tuyển " + position + " — " + name
    };
  };

  /* Chỉ giữ tham số an toàn cho analytics; loại mọi thứ giống PII */
  core.SAFE_PARAMS = ["job_title", "job_slug", "department", "job_category", "source_page", "page_type", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "device_category", "cta_location", "filter_value", "result_count", "field_name", "error_type", "path_step", "faq_index", "method", "page", "value"];
  core.sanitizeParams = function (p) {
    var out = {};
    Object.keys(p || {}).forEach(function (k) {
      if (core.SAFE_PARAMS.indexOf(k) === -1) return;
      var val = p[k];
      if (val == null || val === "") return;
      if (typeof val === "string") {
        if (/@/.test(val)) return;                                     // email
        if (k.indexOf("utm_") !== 0 && /(\d[\s.-]?){8,}/.test(val)) return; // chuỗi giống SĐT
        val = val.slice(0, 100);
      }
      out[k] = val;
    });
    return out;
  };

  /* Rate-limit phía trình duyệt: tối đa `max` lần gửi trong `windowMs` */
  core.rateLimit = function (history, now, max, windowMs) {
    var recent = (history || []).filter(function (t) { return now - t < windowMs; });
    return { ok: recent.length < max, history: recent };
  };

  /* Gửi với timeout — sender(payload) trả Promise<boolean> */
  core.submit = function (payload, sender, timeoutMs) {
    if (typeof sender !== "function") return Promise.resolve({ ok: false, reason: "no_sender" });
    var timer;
    var timeout = new Promise(function (res) { timer = setTimeout(function () { res({ ok: false, reason: "timeout" }); }, timeoutMs || 15000); });
    var send = Promise.resolve().then(function () { return sender(payload); })
      .then(function (ok) { return { ok: !!ok, reason: ok ? "" : "rejected" }; }, function () { return { ok: false, reason: "network" }; });
    return Promise.race([send, timeout]).then(function (r) { clearTimeout(timer); return r; });
  };

  if (typeof module !== "undefined" && module.exports) module.exports = core;
  root.PLCareersCore = core;
  if (typeof document === "undefined") return;

  /* ================================================================
     PHẦN 2 — DOM
     ================================================================ */
  /* Chạy sau main.js (DOMContentLoaded của main.js đăng ký trước) để GA4 / Pixel
     và attribution đã sẵn sàng khi bắn sự kiện đầu tiên. */
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();

  function start() {
  var page = document.querySelector(".cr[data-careers]");
  if (!page) return;
  var PAGE_TYPE = page.getAttribute("data-careers");
  var JOB = {
    job_slug: page.getAttribute("data-job-slug") || "",
    job_title: page.getAttribute("data-job-title") || "",
    department: page.getAttribute("data-department") || "",
    job_category: page.getAttribute("data-job-category") || ""
  };
  var LOADED_AT = Date.now();
  function device() { return core.deviceType(window.innerWidth || 1024, navigator.userAgent); }
  function attribution() { try { return window.__plAttribution ? window.__plAttribution() : {}; } catch (e) { return {}; } }

  /* Ngữ cảnh gắn vào MỌI sự kiện (kể cả zalo_click / phone_click của main.js) */
  var fa = core.flatAttribution(attribution());
  window.__plTrackContext = core.sanitizeParams({
    page_type: PAGE_TYPE === "hub" ? "careers_hub" : "job_page",
    job_slug: JOB.job_slug, job_title: JOB.job_title, department: JOB.department, job_category: JOB.job_category,
    utm_source: fa.utm_source, utm_campaign: fa.utm_campaign, device_category: device()
  });

  function track(evt, params) {
    var p = core.sanitizeParams(Object.assign({ source_page: location.pathname }, window.__plTrackContext || {}, params || {}));
    try { if (window.__plTrack) window.__plTrack(evt, p); else { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: evt }, p)); } } catch (e) {}
    /* Sự kiện chuẩn của Meta / TikTok cho quảng cáo tuyển dụng (không kèm PII) */
    try {
      if (window.fbq) {
        if (evt === "job_view") fbq("track", "ViewContent", { content_name: p.job_title || "", content_category: "job" });
        if (evt === "apply_form_success") fbq("track", "SubmitApplication", { content_name: p.job_title || p.job_slug || "tuyen-dung" });
      }
      if (window.ttq) {
        if (evt === "job_view") ttq.track("ViewContent", { content_name: p.job_title || "" });
        if (evt === "apply_form_success") ttq.track("SubmitForm");
      }
    } catch (e) {}
  }

  if (PAGE_TYPE === "hub") track("career_page_view");
  else if (PAGE_TYPE === "job") track("job_view");
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SCROLL = REDUCED ? "auto" : "smooth";

  /* ---------- Story: vạch tiến trình chạy theo cuộn ---------- */
  var steps = page.querySelectorAll(".cr-step");
  if (steps.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Array.prototype.forEach.call(steps, function (s, i) { setTimeout(function () { s.classList.add("is-in"); }, i * 140); });
        io.disconnect();
      });
    }, { threshold: 0.35 });
    io.observe(steps[0].parentNode);
  } else {
    Array.prototype.forEach.call(steps, function (s) { s.classList.add("is-in"); });
  }

  /* ---------- Lọc vị trí (hub) ---------- */
  var filterBtns = page.querySelectorAll("[data-filter]");
  var jobItems = page.querySelectorAll("#jobList .cr-job");
  function applyFilter(val, fromUser) {
    var shown = 0;
    Array.prototype.forEach.call(jobItems, function (li) {
      var hit = val === "all" || li.getAttribute("data-category") === val;
      li.hidden = !hit;
      if (hit) shown++;
    });
    Array.prototype.forEach.call(filterBtns, function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-filter") === val ? "true" : "false"); });
    var empty = page.querySelector("[data-filter-empty]");
    if (empty) empty.hidden = shown > 0;
    var live = page.querySelector("[data-filter-status]");
    if (live) live.textContent = "Đang hiển thị " + shown + " vai trò" + (val === "all" ? "" : " trong nhóm đã chọn") + ".";
    if (fromUser) track("job_filter", { filter_value: val, result_count: shown });
  }
  Array.prototype.forEach.call(filterBtns, function (b) {
    b.addEventListener("click", function () { applyFilter(b.getAttribute("data-filter"), true); });
  });
  if (filterBtns.length) {
    var q = (new URLSearchParams(location.search).get("nhom") || "").replace(/[^a-z-]/g, "");
    if (q && page.querySelector('[data-filter="' + q + '"]')) {
      applyFilter(q, false);
      var list = document.getElementById("vi-tri");
      if (list) setTimeout(function () { list.scrollIntoView({ behavior: SCROLL, block: "start" }); }, 60);
    }
  }

  /* ---------- Click tracking (CTA, vị trí, lộ trình, FAQ, chia sẻ) ----------
     Nghe trên document để bắt cả nút "Ứng tuyển" trên header (nằm ngoài .cr) */
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target : null;
    if (!t) return;
    var a = t.closest("[data-apply]");
    if (a) track("job_apply_click", { cta_location: a.getAttribute("data-cta") || "" });
    var c = t.closest("[data-cta]");
    if (c && !a) track("career_cta_click", { cta_location: c.getAttribute("data-cta") || "" });
    var jl = t.closest("[data-job-link]");
    if (jl) track("career_cta_click", { cta_location: "job_list", job_slug: jl.getAttribute("data-job-link") });
    var ps = t.closest("[data-path-step]");
    if (ps) track("career_path_interaction", { path_step: ps.getAttribute("data-path-step") });
    var pf = t.closest("[data-proof]");
    if (pf) track("career_proof_click", { cta_location: pf.getAttribute("data-proof") });
    var z = t.closest('a[href*="zalo.me"]');
    if (z) { try { if (window.fbq) fbq("track", "Contact"); if (window.ttq) ttq.track("Contact"); } catch (x) {} }
  });
  Array.prototype.forEach.call(page.querySelectorAll(".cr-qa"), function (d) {
    d.addEventListener("toggle", function () { if (d.open) track("faq_open", { faq_index: d.getAttribute("data-faq") }); });
  });

  /* ---------- Chia sẻ ---------- */
  var share = page.querySelector("[data-share-root]");
  if (share) {
    var sUrl = share.getAttribute("data-share-url") + "?utm_source=share&utm_medium=referral&utm_campaign=recruitment";
    var sTitle = share.getAttribute("data-share-title");
    var nativeBtn = share.querySelector('[data-share="native"]');
    if (nativeBtn && navigator.share) nativeBtn.hidden = false;
    share.addEventListener("click", function (e) {
      var el = e.target.closest("[data-share]");
      if (!el) return;
      var method = el.getAttribute("data-share");
      track("job_share", { method: method });
      if (method === "native") { e.preventDefault(); navigator.share({ title: sTitle, url: sUrl }).catch(function () {}); }
      if (method === "copy") {
        e.preventDefault();
        var done = function () { el.textContent = "Đã sao chép ✓"; setTimeout(function () { el.textContent = "Sao chép link"; }, 2200); };
        var manual = function () {
          var ta = document.createElement("textarea");
          ta.value = sUrl; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
          document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, sUrl.length);
          var okCopy = false;
          try { okCopy = document.execCommand("copy"); } catch (x) {}
          ta.parentNode.removeChild(ta);
          if (okCopy) done(); else window.prompt("Sao chép link vị trí:", sUrl);
        };
        if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(sUrl).then(done, manual);
        else manual();
      }
    });
  }

  /* ---------- Sticky CTA mobile: hiện sau hero, ẩn khi tới form ---------- */
  var bar = page.querySelector("[data-sticky]");
  var hero = page.querySelector(".cr-hero .cr-actions") || page.querySelector(".cr-hero");
  var submitted = false;
  var applySec = document.getElementById("ung-tuyen");
  if (bar && hero && applySec && "IntersectionObserver" in window) {
    var heroVisible = true, applyVisible = false;
    var sync = function () {
      var show = !heroVisible && !applyVisible && !submitted;
      bar.classList.toggle("is-visible", show);
      bar.setAttribute("aria-hidden", show ? "false" : "true");
      Array.prototype.forEach.call(bar.querySelectorAll("a"), function (x) { x.tabIndex = show ? 0 : -1; });
    };
    new IntersectionObserver(function (en) { heroVisible = en[0].isIntersecting; sync(); }, { threshold: 0 }).observe(hero);
    new IntersectionObserver(function (en) { applyVisible = en[0].isIntersecting; sync(); }, { threshold: 0.05 }).observe(applySec);
  }

  /* ---------- Form ứng tuyển ---------- */
  var form = page.querySelector("[data-career-form]");
  if (!form) return;
  form.noValidate = true;
  var done = page.querySelector("[data-done]");
  var statusEl = form.querySelector("[data-status]");
  var btn = form.querySelector("[data-submit]");
  var BTN_LABEL = btn ? btn.textContent : "";
  var started = false;
  var FIELDS = ["full_name", "phone", "position", "email", "profile_url"];
  var RL_KEY = "pl_apply_hist";

  function field(name) { return form.querySelector('[name="' + name + '"]'); }
  function errEl(input) { var id = input && input.getAttribute("aria-describedby"); return id ? document.getElementById(id) : null; }
  function setError(name, code) {
    var input = field(name); if (!input) return;
    var box = errEl(input);
    if (code) {
      input.setAttribute("aria-invalid", "true");
      if (box) { box.textContent = (core.MESSAGES[name] || {})[code] || "Thông tin chưa hợp lệ."; box.hidden = false; }
      if (name === "email" || name === "profile_url") { var more = form.querySelector(".cr-more"); if (more) more.open = true; }
    } else {
      input.removeAttribute("aria-invalid");
      if (box) { box.textContent = ""; box.hidden = true; }
    }
  }
  function values() {
    var v = {};
    ["full_name", "phone", "position", "experience", "email", "profile_url", "message"].forEach(function (k) { var el = field(k); v[k] = el ? el.value : ""; });
    return v;
  }
  function showStatus(html) { if (!statusEl) return; statusEl.innerHTML = html; statusEl.hidden = !html; }
  function setBusy(on) {
    if (!btn) return;
    btn.disabled = on;
    btn.setAttribute("aria-busy", on ? "true" : "false");
    btn.textContent = on ? "Đang gửi hồ sơ…" : BTN_LABEL;
  }

  form.addEventListener("focusin", function () {
    if (started) return;
    started = true;
    track("apply_form_start");
  });
  /* Kiểm tra lại từng ô khi rời ô (sau lần sửa đầu) */
  FIELDS.forEach(function (name) {
    var el = field(name); if (!el) return;
    el.addEventListener("blur", function () {
      if (!el.hasAttribute("aria-invalid") && !el.value) return;
      var r = core.validate(values());
      setError(name, r.errors[name]);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    showStatus("");
    var v = values();
    var r = core.validate(v);
    FIELDS.forEach(function (k) { setError(k, r.errors[k]); });
    if (!r.ok) {
      Object.keys(r.errors).forEach(function (k) { track("apply_form_field_error", { field_name: k, error_type: r.errors[k] }); });
      var first = FIELDS.filter(function (k) { return r.errors[k]; })[0];
      if (first && field(first)) field(first).focus();
      return;
    }
    /* Chống bot: honeypot bị điền -> giả thành công, không gửi.
       Gửi quá nhanh (autofill trên mobile vẫn có thể nhanh) -> VẪN gửi, gắn cờ để kiểm tra tay. */
    var hp = field("_gotcha");
    if (hp && hp.value) { track("apply_form_blocked", { error_type: "honeypot" }); finish("BOT"); return; }
    var tooFast = Date.now() - LOADED_AT < 2500;
    if (tooFast) track("apply_form_blocked", { error_type: "too_fast" });
    var hist = [];
    try { hist = JSON.parse(localStorage.getItem(RL_KEY) || "[]"); } catch (x) {}
    var rl = core.rateLimit(hist, Date.now(), 3, 10 * 60 * 1000);
    if (!rl.ok) {
      var S0 = window.SITE || {};
      showStatus("Anh/chị vừa gửi vài hồ sơ liên tiếp. Vui lòng đợi ít phút, hoặc nhắn Zalo <a href=\"" + (S0.zalo || "https://zalo.me/0903983737") + "\" target=\"_blank\" rel=\"noopener\">" + (S0.hotline || "0903 983 737") + "</a> để được hỗ trợ ngay.");
      track("apply_form_error", { error_type: "rate_limited" });
      return;
    }
    var posEl = field("position");
    var posOpt = posEl && posEl.options ? posEl.options[posEl.selectedIndex] : null;
    var selSlug = (posOpt && posOpt.getAttribute("data-slug")) || JOB.job_slug;
    var payload = core.buildApplication(v, {
      attribution: attribution(), jobSlug: selSlug,
      path: location.pathname, url: location.origin + location.pathname + location.search,
      device: device()
    });
    if (tooFast) { payload.spam_suspect = "too_fast"; payload._subject = "[Cần kiểm tra] " + payload._subject; }
    var evPos = { job_slug: selSlug, job_title: v.position };
    track("apply_form_submit", evPos);
    setBusy(true);
    core.submit(payload, function (p) { return window.__plSubmitLead ? window.__plSubmitLead(p, { kind: "application" }) : Promise.resolve(false); }, 15000)
      .then(function (res) {
        setBusy(false);
        if (res.ok) {
          rl.history.push(Date.now());
          try { localStorage.setItem(RL_KEY, JSON.stringify(rl.history)); } catch (x) {}
          track("apply_form_success", evPos);
          finish(payload.id);
        } else {
          track("apply_form_error", Object.assign({ error_type: res.reason || "unknown" }, evPos));
          var S = window.SITE || {};
          showStatus("Chưa gửi được hồ sơ. Anh/chị thử lại, hoặc gửi trực tiếp qua Zalo <a href=\"" + (S.zalo || "https://zalo.me/0903983737") + "\" target=\"_blank\" rel=\"noopener\">" + (S.hotline || "0903 983 737") + "</a> hay email <a href=\"mailto:" + (S.email || "contact@paceland.vn") + "\">" + (S.email || "contact@paceland.vn") + "</a>.");
        }
      });
  });

  function finish(appId) {
    submitted = true;
    if (bar) { bar.classList.remove("is-visible"); bar.setAttribute("aria-hidden", "true"); }
    form.hidden = true;
    if (!done) return;
    var idEl = done.querySelector("[data-app-id]");
    if (idEl) idEl.textContent = appId === "BOT" ? core.makeId() : appId;
    done.hidden = false;
    try { done.focus({ preventScroll: true }); } catch (x) { done.focus(); }
    done.scrollIntoView({ behavior: SCROLL, block: "center" });
  }
  }
})(typeof window !== "undefined" ? window : globalThis);
