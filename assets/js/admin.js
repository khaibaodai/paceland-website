/* ============================================================
   PACELAND — Admin CMS (client-side, lưu localStorage + xuất data.js)
   ============================================================ */
(function () {
  "use strict";

  var PW_KEY = "pl_admin_pw", DEFAULT_PW = "paceland2026", STORE = "pl_cms";
  var STATUS = ["Giao dịch kín", "Đang mở bán", "Sắp ra mắt"];
  var MEDIA_REG_KEY = "pl_media_reg";
  var CL_NAME_KEY = "pl_cl_name", CL_PRESET_KEY = "pl_cl_preset";
  var GH_REPO_KEY = "pl_gh_repo", GH_TOKEN_KEY = "pl_gh_token", GH_BRANCH_KEY = "pl_gh_branch";
  var $ = function (id) { return document.getElementById(id); };

  function clone(o) { try { return JSON.parse(JSON.stringify(o)); } catch (e) { return Array.isArray(o) ? [] : {}; } }
  function esc(s) { return (s == null ? "" : String(s)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function slug(s) {
    return (s || "").toString().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  function toast(msg) { var t = $("toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove("show"); }, 2400); }
  function download(name, text, type) {
    var blob = new Blob([text], { type: type || "text/plain;charset=utf-8" });
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
  }

  /* ---------- State ---------- */
  var state = {
    site: clone(window.SITE || {}),
    heroSlides: clone(window.HERO_SLIDES || []),
    projects: clone(window.PROJECTS || []),
    posts: clone(window.POSTS || []),
    jobs: clone(window.JOBS || []),
    faqs: [],
  };
  (window.FAQS || []).forEach(function (g) { (g.items || []).forEach(function (it) { state.faqs.push({ group: g.group, q: it.q, a: it.a }); }); });
  state.pages = clone(window.PAGES || {});
  (function () {
    try {
      var sc = JSON.parse(localStorage.getItem(STORE) || "null");
      if (!sc) return;
      if (sc.pages) Object.keys(sc.pages).forEach(function (pg) {
        if (state.pages[pg]) state.pages[pg].fields.forEach(function (f) { if (sc.pages[pg][f.k] != null) f.value = sc.pages[pg][f.k]; });
      });
      if (sc.heroSlides) state.heroSlides = clone(sc.heroSlides);
    } catch (e) {}
  })();
  var current = "projects";

  function groupFaqs(flat) {
    var out = [], map = {};
    flat.forEach(function (it) {
      if (!map[it.group]) { map[it.group] = { group: it.group, items: [] }; out.push(map[it.group]); }
      map[it.group].items.push({ q: it.q, a: it.a });
    });
    return out;
  }
  function persist() {
    var pagesObj = {};
    Object.keys(state.pages || {}).forEach(function (pg) {
      pagesObj[pg] = {}; state.pages[pg].fields.forEach(function (f) { pagesObj[pg][f.k] = f.value; });
    });
    localStorage.setItem(STORE, JSON.stringify({
      site: state.site, heroSlides: state.heroSlides, projects: state.projects, posts: state.posts, jobs: state.jobs, faqs: groupFaqs(state.faqs), pages: pagesObj,
    }));
  }

  /* ---------- Media library (IndexedDB) ---------- */
  var DB_NAME = "pl_media_db", DB_STORE = "media", MEDIA_PREFIX = "assets/img/media/", MEDIA = {};
  function openDB() {
    return new Promise(function (res, rej) {
      var r = indexedDB.open(DB_NAME, 1);
      r.onupgradeneeded = function () { if (!r.result.objectStoreNames.contains(DB_STORE)) r.result.createObjectStore(DB_STORE, { keyPath: "name" }); };
      r.onsuccess = function () { res(r.result); };
      r.onerror = function () { rej(r.error); };
    });
  }
  function dbAll() { return openDB().then(function (db) { return new Promise(function (res) { var q = db.transaction(DB_STORE, "readonly").objectStore(DB_STORE).getAll(); q.onsuccess = function () { res(q.result || []); }; q.onerror = function () { res([]); }; }); }); }
  function dbPut(it) { return openDB().then(function (db) { return new Promise(function (res, rej) { var q = db.transaction(DB_STORE, "readwrite").objectStore(DB_STORE).put(it); q.onsuccess = function () { res(); }; q.onerror = function () { rej(q.error); }; }); }); }
  function dbDel(name) { return openDB().then(function (db) { return new Promise(function (res) { var q = db.transaction(DB_STORE, "readwrite").objectStore(DB_STORE).delete(name); q.onsuccess = function () { res(); }; q.onerror = function () { res(); }; }); }); }
  function loadMedia() {
    return dbAll().then(function (items) {
      MEDIA = {};
      try { var reg = JSON.parse(localStorage.getItem(MEDIA_REG_KEY) || "{}"); Object.keys(reg).forEach(function (k) { MEDIA[k] = reg[k]; }); } catch (e) {}
      items.forEach(function (it) { it.url = URL.createObjectURL(it.blob); MEDIA[it.name] = it; });
    }).catch(function () {});
  }
  function mediaName(ref) { if (!ref) return null; ref = String(ref); var i = ref.indexOf(MEDIA_PREFIX); if (i !== -1) return ref.slice(i + MEDIA_PREFIX.length); if (MEDIA[ref]) return ref; return null; }
  function adminImg(ref, w) { var n = mediaName(ref); if (n && MEDIA[n]) return MEDIA[n].url; return (window.resolveImg ? window.resolveImg(ref, w) : ref); }
  function kb(n) { return n ? (n >= 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.round(n / 1024) + " KB") : ""; }
  function uniqueName(orig, isVideo) {
    var base = (orig || "media").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "media";
    var ext = isVideo ? "." + ((String(orig).split(".").pop() || "mp4").toLowerCase().replace(/[^a-z0-9]/g, "")) : ".jpg";
    var name = base + ext, n = 1;
    while (MEDIA[name]) name = base + "-" + (++n) + ext;
    return name;
  }
  function storeMedia(name, blob, mime, w, h) { var it = { name: name, type: mime.indexOf("video") === 0 ? "video" : "image", mime: mime, w: w, h: h, size: blob.size, created: Date.now(), blob: blob }; return dbPut(it).then(function () { it.url = URL.createObjectURL(blob); MEDIA[name] = it; return it; }); }
  function addMediaFile(file) {
    return new Promise(function (resolve) {
      if (/^video\//.test(file.type)) { storeMedia(uniqueName(file.name, true), file, file.type || "video/mp4", 0, 0).then(resolve); return; }
      var cl = cloudinaryConfig();
      if (cl.name && cl.preset) {
        toast("Đang tải lên Cloudinary…");
        uploadToCloudinary(file, cl).then(function (data) {
          if (data && data.secure_url) {
            var base = (data.public_id || "").split("/").pop() || "img";
            var name = base + ".jpg"; var n = 1;
            while (MEDIA[name]) name = base + "-" + (++n) + ".jpg";
            var m = { name: name, type: "image", url: data.secure_url, w: data.width || 0, h: data.height || 0, size: data.bytes || 0, created: Date.now(), cloudinary: true };
            MEDIA[name] = m; persistMediaReg(); resolve(m);
          } else { toast("Lỗi Cloudinary: " + (data && data.error && data.error.message || "thử lại")); resolve(null); }
        }).catch(function () { toast("Không kết nối được Cloudinary"); resolve(null); });
      } else {
        var img = new Image();
        img.onload = function () {
          var max = 1600, w = img.width, h = img.height;
          if (Math.max(w, h) > max) { var s = max / Math.max(w, h); w = Math.round(w * s); h = Math.round(h * s); }
          var c = document.createElement("canvas"); c.width = w; c.height = h; c.getContext("2d").drawImage(img, 0, 0, w, h);
          c.toBlob(function (b) { storeMedia(uniqueName(file.name, false), b || file, "image/jpeg", w, h).then(resolve); }, "image/jpeg", 0.85);
        };
        img.onerror = function () { resolve(null); };
        img.src = URL.createObjectURL(file);
      }
    });
  }
  function dlMedia(name) { var m = MEDIA[name]; if (!m) return; var a = document.createElement("a"); a.href = m.url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); }

  /* ---------- Cloudinary CDN ---------- */
  function cloudinaryConfig() { return { name: localStorage.getItem(CL_NAME_KEY) || "", preset: localStorage.getItem(CL_PRESET_KEY) || "" }; }
  function persistMediaReg() {
    var reg = {};
    Object.keys(MEDIA).forEach(function (k) {
      if (MEDIA[k].cloudinary) reg[k] = { name: MEDIA[k].name, type: MEDIA[k].type, url: MEDIA[k].url, w: MEDIA[k].w, h: MEDIA[k].h, size: MEDIA[k].size, created: MEDIA[k].created, cloudinary: true };
    });
    localStorage.setItem(MEDIA_REG_KEY, JSON.stringify(reg));
  }
  function uploadToCloudinary(file, cl) {
    var fd = new FormData(); fd.append("file", file); fd.append("upload_preset", cl.preset);
    return fetch("https://api.cloudinary.com/v1_1/" + cl.name + "/image/upload", { method: "POST", body: fd }).then(function (r) { return r.json(); });
  }

  /* ---------- Auth ---------- */
  function getPw() { return localStorage.getItem(PW_KEY) || DEFAULT_PW; }
  function initAuth() {
    if (sessionStorage.getItem("pl_authed") === "1") return showApp();
    $("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();
      if ($("pw").value === getPw()) { sessionStorage.setItem("pl_authed", "1"); showApp(); }
      else $("loginErr").textContent = "Mật khẩu không đúng.";
    });
  }
  function showApp() { $("login").hidden = true; $("app").hidden = false; bindShell(); loadMedia().then(render); }

  /* ---------- Render list ---------- */
  var TITLES = { projects: "Dự án", posts: "Bài viết", jobs: "Tuyển dụng", faqs: "Câu hỏi thường gặp", media: "Thư viện ảnh / video", pages: "Trang (Nội dung)", settings: "Cài đặt" };
  function render() {
    document.querySelectorAll("#adminNav button").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-tab") === current); });
    $("tabTitle").textContent = TITLES[current];
    $("btnAdd").style.display = (current === "settings" || current === "pages" || current === "media") ? "none" : "";
    var v = $("view");
    if (current === "settings") { $("tabSub").textContent = "Thông tin chung & mật khẩu quản trị"; v.innerHTML = settingsView(); bindSettings(); return; }
    if (current === "pages") { $("tabSub").textContent = "Chỉnh các đoạn chữ chính của từng trang"; v.innerHTML = pagesView(); return; }
    if (current === "media") { $("tabSub").textContent = Object.keys(MEDIA).length + " tệp"; v.innerHTML = mediaView(); bindMedia(); return; }
    var arr = state[current];
    $("tabSub").textContent = arr.length + " mục";
    if (!arr.length) { v.innerHTML = '<div class="admin-empty">Chưa có mục nào. Bấm "Thêm mới" để tạo.</div>'; return; }
    v.innerHTML = '<div class="admin-help">Mọi thay đổi tự lưu vào trình duyệt này (xem ngay trên website). Khi xong, bấm <b>"Xuất file data.js"</b> rồi thay file <b>assets/js/data.js</b> để đăng lên website thật.</div>' +
      '<div class="admin-list">' + arr.map(function (it, i) { return rowHTML(current, it, i); }).join("") + "</div>";
  }
  function thumb(id) { return id ? '<img class="thumb" src="' + esc(adminImg(id, 200)) + '" alt="" onerror="this.style.visibility=\'hidden\'">' : '<div class="thumb"></div>'; }
  function ops(i) {
    return '<div class="ops"><button class="icon-btn" data-op="edit" data-idx="' + i + '" title="Sửa"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
      '<button class="icon-btn del" data-op="del" data-idx="' + i + '" title="Xoá"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div>';
  }
  function rowHTML(tab, it, i) {
    if (tab === "projects") return '<div class="admin-row">' + thumb(it.cover) + '<div class="info"><b>' + esc(it.name) + "</b><span>" + esc(it.location) + " · " + esc(it.priceText) + "</span></div><span class=\"tag\">" + esc(it.status) + "</span>" + ops(i) + "</div>";
    if (tab === "posts") return '<div class="admin-row">' + thumb(it.cover) + '<div class="info"><b>' + esc(it.title) + "</b><span>" + esc(it.category) + " · " + esc(it.date) + "</span></div>" + ops(i) + "</div>";
    if (tab === "jobs") return '<div class="admin-row"><div class="info"><b>' + esc(it.title) + "</b><span>" + esc(it.dept) + " · " + esc(it.location) + "</span></div>" + ops(i) + "</div>";
    if (tab === "faqs") return '<div class="admin-row"><div class="info"><b>' + esc(it.q) + '</b><span>' + esc((it.a || "").slice(0, 70)) + "…</span></div><span class=\"tag\">" + esc(it.group) + "</span>" + ops(i) + "</div>";
    return "";
  }

  /* ---------- Pages (nội dung trang) ---------- */
  function pagesView() {
    var html = '<div class="admin-help">Sửa tiêu đề, mô tả, CTA… của từng trang. Lưu là hiện ngay trên website. (Dự án &amp; bài viết quản lý ở tab riêng.)</div><div class="admin-list">';
    Object.keys(state.pages).forEach(function (pg) {
      var p = state.pages[pg];
      html += '<div class="admin-row"><div class="info"><b>' + esc(p.name) + '</b><span>' + p.fields.length + ' đoạn chữ có thể sửa</span></div>' +
        '<button class="icon-btn" data-pageedit="' + pg + '" title="Sửa"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button></div>';
    });
    return html + "</div>";
  }
  function openPageForm(pg) {
    var p = state.pages[pg]; if (!p) return;
    var body = p.fields.map(function (f) {
      var isLong = f.type === "textarea";
      return field(f.label, "pf_" + f.k, f.value, { full: true, type: isLong ? "textarea" : "text", rows: isLong ? 90 : undefined });
    }).join("");
    var modal = $("modal");
    modal.innerHTML = '<div class="panel"><div class="panel-head"><h3>Nội dung trang — ' + esc(p.name) + '</h3><button class="icon-btn" id="mClose"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>' +
      '<div class="panel-body"><div class="fgrid">' + body + '</div></div>' +
      '<div class="panel-foot"><button class="btn btn--ghost" id="mCancel">Huỷ</button><button class="btn" id="mSave">Lưu nội dung</button></div></div>';
    modal.hidden = false;
    var close = function () { modal.hidden = true; modal.innerHTML = ""; };
    $("mClose").onclick = close; $("mCancel").onclick = close;
    modal.onclick = function (e) { if (e.target === modal) close(); };
    $("mSave").onclick = function () {
      p.fields.forEach(function (f) { var el = $("pf_" + f.k); if (el) f.value = el.value; });
      persist(); close(); render(); toast("Đã lưu nội dung trang " + p.name);
    };
  }

  /* ---------- Media library view ---------- */
  function mediaView() {
    var cl = cloudinaryConfig();
    var hasCloud = cl.name && cl.preset;
    var items = Object.keys(MEDIA).map(function (k) { return MEDIA[k]; }).sort(function (a, b) { return b.created - a.created; });
    var grid = items.length ? items.map(function (m) {
      var th = m.type === "video" ? '<video src="' + esc(m.url) + '" muted playsinline></video>' : '<img src="' + esc(m.url) + '" alt="">';
      var badge = m.cloudinary ? ' <span class="mc-badge">☁ CDN</span>' : "";
      return '<div class="media-card"><div class="mc-thumb">' + th + '</div>' +
        '<div class="mc-name">' + esc(m.name) + badge + '</div>' +
        '<div class="mc-meta">' + (m.w ? m.w + "×" + m.h + " · " : "") + kb(m.size) + "</div>" +
        '<div class="mc-ops"><button data-mcopy="' + esc(m.name) + '">Chép link</button>' +
        '<button data-mdl="' + esc(m.name) + '">' + (m.cloudinary ? "Mở" : "Tải") + '</button>' +
        '<button class="del" data-mdel="' + esc(m.name) + '">Xoá</button></div></div>';
    }).join("") : '<div class="admin-empty">Chưa có ảnh/video. Bấm "Tải ảnh lên" để thêm.</div>';
    var helpText = hasCloud
      ? 'Ảnh tải lên đi thẳng lên <b>Cloudinary CDN</b> (cloud: <b>' + esc(cl.name) + '</b>) — hiển thị ngay trên website đã deploy. Chép link để dán vào ảnh gallery.'
      : 'Ảnh tự nén &amp; lưu trong trình duyệt. <b>Để dùng trên web thật:</b> bấm <b>Tải</b> → bỏ vào <b>assets/img/media/</b> → bấm <b>Xuất data.js</b>. Hoặc <a href="#" id="goCloudLink" style="color:var(--red);font-weight:600">cấu hình Cloudinary</a> để tải tự động.';
    return '<div class="admin-help">' + helpText + '</div>' +
      '<input type="file" id="mediaUpload" accept="image/*,video/*" multiple hidden>' +
      '<button class="btn" id="mediaUploadBtn" style="margin-bottom:1.2rem"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Tải ảnh/video lên</button>' +
      '<div class="media-grid">' + grid + "</div>";
  }
  function bindMedia() {
    var up = $("mediaUpload"), btn = $("mediaUploadBtn");
    if (btn) btn.onclick = function () { up.click(); };
    if (up) up.onchange = function (e) {
      var files = Array.prototype.slice.call(e.target.files); up.value = "";
      if (!files.length) return;
      toast("Đang xử lý " + files.length + " tệp…");
      Promise.all(files.map(addMediaFile)).then(function () { render(); toast("Đã thêm vào thư viện" + (cloudinaryConfig().name ? " (Cloudinary CDN ✓)" : "")); });
    };
    var gl = $("goCloudLink");
    if (gl) gl.onclick = function (e) { e.preventDefault(); current = "settings"; render(); };
  }

  /* ---------- Image field (upload + preview) ---------- */
  function imgField(label, id, val) {
    var prev = val ? '<img src="' + adminImg(val, 200) + '" alt="">' : "";
    return '<div class="afield full"><label>' + label + "</label>" +
      '<div class="imgfield"><div class="imgfield-prev" id="' + id + '_prev">' + prev + "</div>" +
      '<input id="' + id + '" type="text" value="' + esc(val) + '" placeholder="Mã Unsplash hoặc assets/img/media/…">' +
      '<button type="button" class="btn btn--ghost imgfield-up" data-imgup="' + id + '">⬆ Tải ảnh</button></div>' +
      '<span class="hint">Tải ảnh lên (tự vào Thư viện) hoặc nhập mã Unsplash / đường dẫn ảnh.</span></div>';
  }
  function bindImgFields(root) {
    root.querySelectorAll("[data-imgup]").forEach(function (btn) {
      btn.onclick = function () {
        var id = btn.getAttribute("data-imgup");
        var fi = document.createElement("input"); fi.type = "file"; fi.accept = "image/*";
        fi.onchange = function (e) {
          var f = e.target.files[0]; if (!f) return; toast("Đang tải ảnh…");
          addMediaFile(f).then(function (m) {
            if (!m) { toast("Không đọc được ảnh"); return; }
            var inp = $(id); if (inp) inp.value = m.cloudinary ? m.url : (MEDIA_PREFIX + m.name);
            var pv = $(id + "_prev"); if (pv) pv.innerHTML = '<img src="' + esc(m.url) + '" alt="">';
            toast("Đã thêm ảnh" + (m.cloudinary ? " lên Cloudinary ✓" : " vào thư viện"));
          });
        };
        fi.click();
      };
    });
  }

  /* ---------- Forms ---------- */
  function opts(arr, sel) { return arr.map(function (o) { return '<option' + (o === sel ? " selected" : "") + ">" + esc(o) + "</option>"; }).join(""); }
  function field(label, id, val, opt) {
    opt = opt || {};
    var cls = opt.full ? "afield full" : "afield";
    var inner;
    if (opt.type === "textarea") inner = '<textarea id="' + id + '"' + (opt.rows ? ' style="min-height:' + opt.rows + 'px"' : "") + '>' + esc(val) + "</textarea>";
    else if (opt.type === "select") inner = '<select id="' + id + '">' + opts(opt.options, val) + "</select>";
    else inner = '<input id="' + id + '" type="' + (opt.type || "text") + '" value="' + esc(val) + '"' + (opt.ph ? ' placeholder="' + esc(opt.ph) + '"' : "") + ">";
    return '<div class="' + cls + '"><label>' + label + "</label>" + inner + (opt.hint ? '<span class="hint">' + opt.hint + "</span>" : "") + "</div>";
  }
  function blocksToText(blocks) {
    return (blocks || []).map(function (b) {
      if (b.t === "h") return "## " + b.c;
      if (b.t === "q") return "> " + b.c;
      if (b.t === "ul") return (b.c || []).map(function (i) { return "- " + i; }).join("\n");
      return b.c;
    }).join("\n\n");
  }
  function textToBlocks(text) {
    var blocks = [], ul = null;
    (text || "").split(/\r?\n/).forEach(function (ln) {
      var t = ln.trim();
      if (t.indexOf("- ") === 0) { if (!ul) { ul = { t: "ul", c: [] }; blocks.push(ul); } ul.c.push(t.slice(2).trim()); return; }
      ul = null;
      if (t === "") return;
      if (t.indexOf("## ") === 0) blocks.push({ t: "h", c: t.slice(3).trim() });
      else if (t.indexOf("> ") === 0) blocks.push({ t: "q", c: t.slice(2).trim() });
      else blocks.push({ t: "p", c: t });
    });
    return blocks;
  }
  function lines(s) { return (s || "").split(/\r?\n/).map(function (x) { return x.trim(); }).filter(Boolean); }

  function formHTML(tab, it) {
    var areas = (window.FILTERS.area || []).slice(1), segs = (window.FILTERS.segment || []).slice(1), types = (window.FILTERS.type || []).slice(1);
    if (tab === "projects") return '<div class="fgrid">' +
      field("Tên dự án", "f_name", it.name, { full: true, ph: "VD: The Privé" }) +
      field("Chủ đầu tư", "f_developer", it.developer) +
      field("Vị trí", "f_location", it.location) +
      field("Khu vực", "f_area", it.area, { type: "select", options: areas }) +
      field("Phân khúc", "f_segment", it.segment, { type: "select", options: segs }) +
      field("Loại hình", "f_type", it.type, { type: "select", options: types }) +
      field("Trạng thái", "f_status", it.status || STATUS[0], { type: "select", options: STATUS }) +
      field("Nhãn (badge)", "f_badge", it.badge, { ph: "VD: Biên lợi nhuận cao" }) +
      field("Giá hiển thị", "f_priceText", it.priceText, { ph: "VD: Từ 8,5 tỉ" }) +
      field("Giá trị (tỉ) — lọc giá", "f_priceValue", it.priceValue, { type: "number", hint: "Chỉ nhập số, VD: 8.5" }) +
      field("Quy mô", "f_beds", it.beds, { ph: "VD: 1–3 PN" }) +
      field("Diện tích", "f_size", it.size, { ph: "VD: 50 – 121 m²" }) +
      field("Bàn giao", "f_handover", it.handover, { ph: "VD: 2027" }) +
      imgField("Ảnh bìa", "f_cover", it.cover) +
      field("Ảnh gallery", "f_gallery", (it.gallery || []).join(", "), { full: true, hint: "Nhiều ảnh cách nhau bằng dấu phẩy. Mỗi ảnh là mã Unsplash hoặc đường dẫn assets/img/media/… (chép từ tab Thư viện)" }) +
      field("Mô tả ngắn", "f_short", it.short, { full: true, type: "textarea", rows: 70 }) +
      field("Mô tả chi tiết", "f_description", (it.description || []).join("\n\n"), { full: true, type: "textarea", rows: 120, hint: "Mỗi đoạn cách nhau 1 dòng trống" }) +
      field("Tiện ích", "f_amenities", (it.amenities || []).join("\n"), { full: true, type: "textarea", rows: 110, hint: "Mỗi tiện ích 1 dòng" }) +
      "</div>";
    if (tab === "posts") return '<div class="fgrid">' +
      field("Tiêu đề", "f_title", it.title, { full: true }) +
      field("Chuyên mục", "f_category", it.category, { ph: "VD: Thị trường" }) +
      field("Ngày", "f_date", it.date, { ph: "VD: 12/06/2026" }) +
      field("Thời gian đọc", "f_readtime", it.readtime, { ph: "VD: 6 phút đọc" }) +
      imgField("Ảnh bìa", "f_cover", it.cover) +
      field("Tóm tắt", "f_excerpt", it.excerpt, { full: true, type: "textarea", rows: 70 }) +
      field("Nội dung", "f_body", blocksToText(it.body), { full: true, type: "textarea", rows: 240, hint: 'Dòng thường = đoạn văn · "## " = tiêu đề · "> " = trích dẫn · "- " = gạch đầu dòng' }) +
      "</div>";
    if (tab === "jobs") return '<div class="fgrid">' +
      field("Tên vị trí", "f_title", it.title, { full: true }) +
      field("Phòng ban", "f_dept", it.dept) +
      field("Hình thức", "f_type", it.type, { ph: "VD: Toàn thời gian" }) +
      field("Địa điểm", "f_location", it.location) +
      field("Thu nhập", "f_salary", it.salary) +
      field("Mô tả", "f_desc", it.desc, { full: true, type: "textarea", rows: 80 }) +
      field("Yêu cầu", "f_reqs", (it.reqs || []).join("\n"), { full: true, type: "textarea", rows: 90, hint: "Mỗi ý 1 dòng" }) +
      field("Quyền lợi", "f_benefits", (it.benefits || []).join("\n"), { full: true, type: "textarea", rows: 90, hint: "Mỗi ý 1 dòng" }) +
      "</div>";
    if (tab === "faqs") return '<div class="fgrid">' +
      field("Nhóm", "f_group", it.group, { full: true, ph: "VD: Dành cho khách hàng" }) +
      field("Câu hỏi", "f_q", it.q, { full: true }) +
      field("Trả lời", "f_a", it.a, { full: true, type: "textarea", rows: 110 }) +
      "</div>";
    return "";
  }
  function collect(tab) {
    var g = function (id) { var el = $(id); return el ? el.value.trim() : ""; };
    if (tab === "projects") {
      var st = g("f_status");
      return {
        id: slug(g("f_name")), name: g("f_name"), developer: g("f_developer"), location: g("f_location"),
        area: g("f_area"), segment: g("f_segment"), type: g("f_type"), status: st, offmarket: st === "Giao dịch kín",
        badge: g("f_badge"), priceText: g("f_priceText"), priceValue: parseFloat(g("f_priceValue")) || 0,
        beds: g("f_beds"), size: g("f_size"), handover: g("f_handover"), cover: g("f_cover"),
        gallery: g("f_gallery").split(",").map(function (x) { return x.trim(); }).filter(Boolean),
        short: g("f_short"), description: g("f_description").split(/\n\s*\n/).map(function (x) { return x.trim(); }).filter(Boolean),
        amenities: lines(g("f_amenities")),
      };
    }
    if (tab === "posts") return { id: slug(g("f_title")), title: g("f_title"), category: g("f_category"), date: g("f_date"), readtime: g("f_readtime"), cover: g("f_cover"), excerpt: g("f_excerpt"), body: textToBlocks(g("f_body")) };
    if (tab === "jobs") return { id: slug(g("f_title")), title: g("f_title"), dept: g("f_dept"), type: g("f_type"), location: g("f_location"), salary: g("f_salary"), desc: g("f_desc"), reqs: lines(g("f_reqs")), benefits: lines(g("f_benefits")) };
    if (tab === "faqs") return { group: g("f_group") || "Khác", q: g("f_q"), a: g("f_a") };
    return {};
  }
  function nameField(tab) { return tab === "projects" ? "name" : tab === "faqs" ? "q" : "title"; }

  function openForm(tab, idx) {
    var editing = idx != null;
    var it = editing ? state[tab][idx] : {};
    var label = TITLES[tab];
    var modal = $("modal");
    modal.innerHTML = '<div class="panel"><div class="panel-head"><h3>' + (editing ? "Sửa" : "Thêm") + " " + label.toLowerCase() + '</h3><button class="icon-btn" id="mClose"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>' +
      '<div class="panel-body">' + formHTML(tab, it) + "</div>" +
      '<div class="panel-foot"><button class="btn btn--ghost" id="mCancel">Huỷ</button><button class="btn" id="mSave">Lưu</button></div></div>';
    modal.hidden = false;
    var close = function () { modal.hidden = true; modal.innerHTML = ""; };
    $("mClose").onclick = close; $("mCancel").onclick = close;
    modal.onclick = function (e) { if (e.target === modal) close(); };
    bindImgFields(modal);
    $("mSave").onclick = function () {
      var obj = collect(tab);
      if (!obj[nameField(tab)]) { toast("Vui lòng nhập " + (tab === "faqs" ? "câu hỏi" : "tên/tiêu đề")); return; }
      if (editing) state[tab][idx] = obj; else state[tab].unshift(obj);
      persist(); close(); render(); toast("Đã lưu “" + (obj[nameField(tab)] || "").slice(0, 30) + "”");
    };
  }

  /* ---------- Hero Slides helpers ---------- */
  function renderHeroSlidesList() {
    if (!state.heroSlides || !state.heroSlides.length) {
      return '<p style="color:var(--muted);font-size:.85rem;padding:.4rem 0">Chưa có slide nào. Bấm "+ Thêm slide".</p>';
    }
    return state.heroSlides.map(function (s, i) {
      var prev = s.img ? '<img src="' + adminImg(s.img, 80) + '" alt="" style="width:100%;height:100%;object-fit:cover">' : "";
      return '<div data-row style="display:grid;grid-template-columns:64px 1fr auto;align-items:center;gap:.75rem;padding:.6rem 0;border-bottom:1px solid var(--line-soft)">' +
        '<div style="width:64px;height:44px;border-radius:6px;overflow:hidden;background:var(--line-soft)">' + prev + '</div>' +
        '<div style="display:flex;flex-direction:column;gap:.35rem;min-width:0">' +
          '<input class="hsl-caption" type="text" value="' + esc(s.caption || "") + '" placeholder="Chú thích (VD: The Privé · Thủ Thiêm)" style="font-size:.85rem;padding:.3rem .5rem;border:1px solid var(--line);border-radius:6px;width:100%;box-sizing:border-box">' +
          '<div style="display:flex;gap:.35rem;min-width:0">' +
            '<input class="hsl-img" type="text" value="' + esc(s.img || "") + '" placeholder="assets/img/media/…" style="flex:1;font-size:.78rem;padding:.3rem .5rem;border:1px solid var(--line);border-radius:6px;min-width:0;color:var(--muted)">' +
            '<button type="button" class="btn btn--ghost hsl-upbtn" data-hsi="' + i + '" style="font-size:.76rem;padding:.28rem .55rem;white-space:nowrap;flex-shrink:0">⬆ Ảnh</button>' +
          '</div>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:.22rem;flex-shrink:0">' +
          '<button type="button" class="hsl-mv-up" data-hsi="' + i + '" style="padding:.15rem .45rem;border:1px solid var(--line);border-radius:4px;background:none;cursor:pointer;font-size:.85rem;line-height:1" title="Lên">↑</button>' +
          '<button type="button" class="hsl-mv-dn" data-hsi="' + i + '" style="padding:.15rem .45rem;border:1px solid var(--line);border-radius:4px;background:none;cursor:pointer;font-size:.85rem;line-height:1" title="Xuống">↓</button>' +
          '<button type="button" class="hsl-del" data-hsi="' + i + '" style="padding:.15rem .45rem;border:1px solid var(--line);border-radius:4px;background:none;cursor:pointer;font-size:.85rem;line-height:1;color:var(--red)" title="Xóa">×</button>' +
        '</div>' +
      '</div>';
    }).join("");
  }
  function bindHeroSlides() {
    var listEl = $("heroSlidesList");
    if (!listEl) return;
    function readSlides() {
      var rows = listEl.querySelectorAll("[data-row]");
      return Array.prototype.slice.call(rows).map(function (row) {
        var cap = row.querySelector(".hsl-caption");
        var img = row.querySelector(".hsl-img");
        return { img: img ? img.value.trim() : "", caption: cap ? cap.value.trim() : "" };
      });
    }
    function rerender() { listEl.innerHTML = renderHeroSlidesList(); bindSlideEvents(); }
    function bindSlideEvents() {
      listEl.querySelectorAll(".hsl-mv-up").forEach(function (btn) {
        btn.onclick = function () {
          var i = parseInt(btn.getAttribute("data-hsi"), 10);
          state.heroSlides = readSlides();
          if (i <= 0) return;
          var tmp = state.heroSlides[i - 1]; state.heroSlides[i - 1] = state.heroSlides[i]; state.heroSlides[i] = tmp;
          rerender();
        };
      });
      listEl.querySelectorAll(".hsl-mv-dn").forEach(function (btn) {
        btn.onclick = function () {
          var i = parseInt(btn.getAttribute("data-hsi"), 10);
          state.heroSlides = readSlides();
          if (i >= state.heroSlides.length - 1) return;
          var tmp = state.heroSlides[i + 1]; state.heroSlides[i + 1] = state.heroSlides[i]; state.heroSlides[i] = tmp;
          rerender();
        };
      });
      listEl.querySelectorAll(".hsl-del").forEach(function (btn) {
        btn.onclick = function () {
          var i = parseInt(btn.getAttribute("data-hsi"), 10);
          state.heroSlides = readSlides();
          state.heroSlides.splice(i, 1);
          rerender();
        };
      });
      listEl.querySelectorAll(".hsl-upbtn").forEach(function (btn) {
        btn.onclick = function () {
          var i = parseInt(btn.getAttribute("data-hsi"), 10);
          var fi = document.createElement("input"); fi.type = "file"; fi.accept = "image/*";
          fi.onchange = function (e) {
            var f = e.target.files[0]; if (!f) return; toast("Đang tải ảnh…");
            addMediaFile(f).then(function (m) {
              if (!m) { toast("Không đọc được ảnh"); return; }
              state.heroSlides = readSlides();
              if (!state.heroSlides[i]) state.heroSlides[i] = { img: "", caption: "" };
              state.heroSlides[i].img = m.cloudinary ? m.url : (MEDIA_PREFIX + m.name);
              rerender();
              toast("Đã thêm ảnh" + (m.cloudinary ? " lên Cloudinary ✓" : ""));
            });
          };
          fi.click();
        };
      });
    }
    bindSlideEvents();
    var addBtn = $("addHeroSlide");
    if (addBtn) addBtn.onclick = function () {
      state.heroSlides = readSlides();
      state.heroSlides.push({ img: "", caption: "" });
      rerender();
    };
    var saveBtn = $("saveHeroSlides");
    if (saveBtn) saveBtn.onclick = function () {
      state.heroSlides = readSlides();
      persist();
      var hasGh = localStorage.getItem(GH_REPO_KEY) && localStorage.getItem(GH_TOKEN_KEY);
      if (hasGh) {
        toast("Đang lưu & đăng lên web…");
        pushSlidesJson().then(function () { publishToGitHub(); });
      } else {
        toast("Đã lưu — chưa có GitHub, nhớ bấm \"🚀 Đăng lên web\" để cập nhật website");
      }
    };
  }

  /* ---------- Settings ---------- */
  function settingsView() {
    var s = state.site;
    return '<div class="admin-help">Thông tin dưới đây dùng chung cho toàn website (chân trang, liên hệ, nút Zalo…). 🔑 Đặc biệt: dán mã <b>Formspree</b> vào ô "Form endpoint" để nhận khách qua form.</div>' +
      '<div style="background:var(--white);border:1px solid var(--line-soft);border-radius:12px;padding:1.4rem 1.5rem;max-width:760px"><div class="fgrid">' +
      field("Tên thương hiệu", "s_name", s.name) +
      field("Tên pháp lý", "s_legalName", s.legalName, { full: true }) +
      field("Slogan", "s_tagline", s.tagline, { full: true }) +
      field("Hotline (hiển thị)", "s_hotline", s.hotline) +
      field("Hotline (số gọi)", "s_hotlineRaw", s.hotlineRaw, { hint: "Không khoảng trắng, VD: 0903983737" }) +
      field("Email", "s_email", s.email) +
      field("Zalo", "s_zalo", s.zalo) +
      field("Địa chỉ", "s_address", s.address, { full: true }) +
      field("Facebook", "s_facebook", s.facebook) +
      field("YouTube", "s_youtube", s.youtube) +
      field("TikTok", "s_tiktok", s.tiktok) +
      field("Form endpoint (Formspree)", "s_formEndpoint", s.formEndpoint, { full: true, hint: "VD: https://formspree.io/f/abcxyz" }) +
      field("Mã nhúng bản đồ (src)", "s_mapEmbed", s.mapEmbed, { full: true }) +
      '</div><button class="btn mt-2" id="saveSettings" style="margin-top:1.2rem">Lưu cài đặt</button></div>' +
      '<div style="background:var(--white);border:1px solid var(--line-soft);border-radius:12px;padding:1.4rem 1.5rem;max-width:760px;margin-top:1.2rem">' +
        '<h3 style="font-family:var(--head);font-size:1.1rem;margin-bottom:.3rem">🖼 Hero Slideshow</h3>' +
        '<p style="color:var(--muted);font-size:.84rem;margin-bottom:.9rem">Ảnh nền trang chủ. Mỗi slide cần ảnh + chú thích ngắn. Thứ tự từ trên → xuống = thứ tự hiển thị. Sau khi lưu, nhớ <b>Xuất data.js</b> để cập nhật website.</p>' +
        '<div id="heroSlidesList">' + renderHeroSlidesList() + '</div>' +
        '<div style="display:flex;gap:.6rem;margin-top:.8rem">' +
          '<button class="btn btn--ghost" id="addHeroSlide">+ Thêm slide</button>' +
          '<button class="btn" id="saveHeroSlides">Lưu slides</button>' +
        '</div>' +
      '</div>' +
      '<div style="background:var(--white);border:1px solid var(--line-soft);border-radius:12px;padding:1.4rem 1.5rem;max-width:760px;margin-top:1.2rem">' +
        '<h3 style="font-family:var(--head);font-size:1.1rem;margin-bottom:.4rem">Ảnh chia sẻ mạng xã hội (OG)</h3>' +
        '<p style="color:var(--muted);font-size:.84rem;margin-bottom:1rem">Ảnh hiện khi chia sẻ link lên Facebook/Zalo (chuẩn 1200×630). Chọn ảnh mới → xem trước → tải về → chép đè vào <b>assets/img/og-image.jpg</b>.</p>' +
        '<div style="display:flex;gap:1.2rem;flex-wrap:wrap;align-items:flex-start">' +
          '<div><div style="font-size:.72rem;color:var(--muted);margin-bottom:4px">Đang dùng</div><img src="assets/img/og-image.jpg?t=' + Date.now() + '" style="width:220px;border-radius:8px;border:1px solid var(--line)" onerror="this.style.display=\'none\'"></div>' +
          '<div style="flex:1;min-width:240px">' +
            '<input type="file" id="ogFile" accept="image/*" style="font-size:.86rem">' +
            '<label style="display:flex;align-items:center;gap:.5rem;margin:.8rem 0;font-size:.9rem"><input type="checkbox" id="ogBrand" checked> Phủ logo + slogan PaceLand</label>' +
            '<div id="ogPreviewWrap" style="display:none;margin-bottom:.8rem"><div style="font-size:.72rem;color:var(--muted);margin-bottom:4px">Xem trước</div><img id="ogPreview" style="width:100%;max-width:360px;border-radius:8px;border:1px solid var(--line)"></div>' +
            '<button class="btn" id="ogDownload" disabled>Tải og-image.jpg</button>' +
            '<canvas id="ogCanvas" width="1200" height="630" style="display:none"></canvas>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div style="background:var(--white);border:1px solid var(--line-soft);border-radius:12px;padding:1.4rem 1.5rem;max-width:760px;margin-top:1.2rem">' +
        '<h3 style="font-family:var(--head);font-size:1.1rem;margin-bottom:.4rem">☁ Lưu ảnh tự động (Cloudinary miễn phí)</h3>' +
        '<p style="color:var(--muted);font-size:.84rem;margin-bottom:.8rem">Sau khi cấu hình, ảnh tải lên Admin đi thẳng lên <b>Cloudinary CDN</b> — hiển thị ngay trên website đã deploy. Không cần copy file thủ công. Miễn phí 25 GB/tháng.</p>' +
        '<details style="margin-bottom:.9rem;font-size:.84rem">' +
          '<summary style="cursor:pointer;font-weight:600;color:var(--red);user-select:none">▶ Hướng dẫn tạo tài khoản Cloudinary (5 phút)</summary>' +
          '<ol style="margin:.6rem 0 0 1.2rem;line-height:2">' +
            '<li>Vào <a href="https://cloudinary.com" target="_blank" rel="noopener" style="color:var(--red)">cloudinary.com</a> → <b>Sign Up Free</b></li>' +
            '<li>Trong Dashboard → <b>Settings (bánh răng) → Upload → Upload presets → Add upload preset</b></li>' +
            '<li>Đặt <b>Signing mode = Unsigned</b> → Save → Copy <b>Preset name</b></li>' +
            '<li>Copy <b>Cloud name</b> ở góc trên-trái trang Dashboard (dạng: <code>abc123</code>)</li>' +
            '<li>Dán vào 2 ô bên dưới → Lưu</li>' +
          '</ol>' +
        '</details>' +
        '<div class="fgrid">' +
        field("Cloud name", "cl_name", localStorage.getItem(CL_NAME_KEY) || "", { ph: "VD: my-cloud-name" }) +
        field("Upload preset (Unsigned)", "cl_preset", localStorage.getItem(CL_PRESET_KEY) || "", { ph: "VD: paceland_unsigned" }) +
        '</div><button class="btn" id="saveCl" style="margin-top:1rem">Lưu cài đặt Cloudinary</button>' +
        (cloudinaryConfig().name ? '<span style="margin-left:.8rem;font-size:.82rem;color:green">✓ Đang dùng: ' + esc(cloudinaryConfig().name) + '</span>' : "") +
      '</div>' +
      '<div style="background:var(--white);border:1px solid var(--line-soft);border-radius:12px;padding:1.4rem 1.5rem;max-width:760px;margin-top:1.2rem">' +
        '<h3 style="font-family:var(--head);font-size:1.1rem;margin-bottom:.4rem">🚀 Đăng web tự động (GitHub + Netlify miễn phí)</h3>' +
        '<p style="color:var(--muted);font-size:.84rem;margin-bottom:.8rem">Sau khi cấu hình, bấm <b>"🚀 Đăng lên web"</b> trong thanh bên → tự commit lên GitHub → Netlify tự build → website live trong <b>~1 phút</b>.</p>' +
        '<details style="margin-bottom:.9rem;font-size:.84rem">' +
          '<summary style="cursor:pointer;font-weight:600;color:var(--red);user-select:none">▶ Hướng dẫn thiết lập lần đầu (10 phút)</summary>' +
          '<ol style="margin:.6rem 0 0 1.2rem;line-height:2">' +
            '<li>Tạo tài khoản <a href="https://github.com" target="_blank" rel="noopener" style="color:var(--red)">github.com</a> → <b>New repository</b> → tên <b>paceland-website</b> → Public → Create</li>' +
            '<li>Kéo thả toàn bộ thư mục website vào trang repo để upload lên GitHub</li>' +
            '<li>Vào <a href="https://github.com/settings/tokens" target="_blank" rel="noopener" style="color:var(--red)">github.com/settings/tokens</a> → <b>Tokens (classic) → Generate new token</b></li>' +
            '<li>Đặt tên → Chọn scope <b>repo</b> → Generate → <b>Copy token ngay</b> (chỉ thấy 1 lần!)</li>' +
            '<li>Vào <a href="https://netlify.com" target="_blank" rel="noopener" style="color:var(--red)">netlify.com</a> → <b>Add new site → Import from GitHub</b> → chọn repo → Deploy site</li>' +
            '<li>Điền thông tin bên dưới → Lưu → Thử bấm "🚀 Đăng lên web"</li>' +
          '</ol>' +
        '</details>' +
        '<div class="fgrid">' +
        field("GitHub Repo", "gh_repo", localStorage.getItem(GH_REPO_KEY) || "", { ph: "username/paceland-website", hint: "Format: tên-tài-khoản/tên-repo" }) +
        field("Personal Access Token", "gh_token", localStorage.getItem(GH_TOKEN_KEY) || "", { type: "password", ph: "ghp_xxxxxxxxxxxx" }) +
        field("Branch", "gh_branch", localStorage.getItem(GH_BRANCH_KEY) || "main", { ph: "main" }) +
        '</div><button class="btn" id="saveGh" style="margin-top:1rem">Lưu cài đặt GitHub</button>' +
        (localStorage.getItem(GH_REPO_KEY) ? '<span style="margin-left:.8rem;font-size:.82rem;color:green">✓ Repo: ' + esc(localStorage.getItem(GH_REPO_KEY)) + '</span>' : "") +
      '</div>' +
      '<div style="background:var(--white);border:1px solid var(--line-soft);border-radius:12px;padding:1.4rem 1.5rem;max-width:760px;margin-top:1.2rem"><h3 style="font-family:var(--head);font-size:1.1rem;margin-bottom:.8rem">Đổi mật khẩu quản trị</h3><div class="fgrid">' +
      field("Mật khẩu mới", "s_pw", "", { type: "password", ph: "Để trống nếu không đổi" }) +
      '</div><button class="btn btn--ghost" id="savePw" style="margin-top:1rem">Đổi mật khẩu</button><p class="hint" style="margin-top:.6rem;font-size:.78rem;color:var(--muted)">Lưu ý: đây là lớp bảo vệ nhẹ phía trình duyệt, phù hợp dùng nội bộ.</p></div>';
  }
  function bindSettings() {
    $("saveSettings").onclick = function () {
      ["name", "legalName", "tagline", "hotline", "hotlineRaw", "email", "zalo", "address", "facebook", "youtube", "tiktok", "formEndpoint", "mapEmbed"].forEach(function (k) {
        var el = $("s_" + k); if (el) state.site[k] = el.value.trim();
      });
      persist(); toast("Đã lưu cài đặt");
    };
    $("savePw").onclick = function () {
      var v = $("s_pw").value.trim();
      if (!v) { toast("Chưa nhập mật khẩu mới"); return; }
      localStorage.setItem(PW_KEY, v); $("s_pw").value = ""; toast("Đã đổi mật khẩu");
    };
    $("saveCl").onclick = function () {
      var n = ($("cl_name") || {}).value && $("cl_name").value.trim();
      var p = ($("cl_preset") || {}).value && $("cl_preset").value.trim();
      if (!n || !p) { toast("Vui lòng nhập cả Cloud name và Upload preset"); return; }
      localStorage.setItem(CL_NAME_KEY, n); localStorage.setItem(CL_PRESET_KEY, p);
      toast("✅ Đã lưu Cloudinary! Thử tải ảnh lên từ tab Thư viện ảnh.");
    };
    $("saveGh").onclick = function () {
      var r = ($("gh_repo") || {}).value && $("gh_repo").value.trim();
      var t = ($("gh_token") || {}).value && $("gh_token").value.trim();
      var b = ($("gh_branch") && $("gh_branch").value.trim()) || "main";
      if (!r || !t) { toast("Vui lòng nhập Repo và Token"); return; }
      localStorage.setItem(GH_REPO_KEY, r); localStorage.setItem(GH_TOKEN_KEY, t); localStorage.setItem(GH_BRANCH_KEY, b);
      toast("✅ Đã lưu GitHub! Bấm \"🚀 Đăng lên web\" để thử.");
    };
    bindOgUploader();
    bindHeroSlides();
  }

  /* ---------- OG image uploader ---------- */
  function bindOgUploader() {
    var ogFile = $("ogFile"); if (!ogFile) return;
    var ogCanvas = $("ogCanvas"), ogPreview = $("ogPreview"), ogDownload = $("ogDownload"), ogBrand = $("ogBrand");
    var ogImg = null, ogLogo = new Image();
    ogLogo.src = "assets/img/logo-white.png";
    function drawOg() {
      if (!ogImg) return;
      var ctx = ogCanvas.getContext("2d"), W = 1200, H = 630;
      ctx.clearRect(0, 0, W, H); ctx.fillStyle = "#14110d"; ctx.fillRect(0, 0, W, H);
      var sc = Math.max(W / ogImg.width, H / ogImg.height), iw = ogImg.width * sc, ih = ogImg.height * sc;
      ctx.drawImage(ogImg, (W - iw) / 2, (H - ih) / 2, iw, ih);
      if (ogBrand.checked) {
        var g = ctx.createLinearGradient(0, H * 0.4, 0, H); g.addColorStop(0, "rgba(15,11,8,0)"); g.addColorStop(1, "rgba(15,11,8,0.9)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#C70018"; ctx.fillRect(0, 0, W, 10);
        if (ogLogo.complete && ogLogo.naturalWidth) { var lw = 290, lh = ogLogo.naturalHeight * lw / ogLogo.naturalWidth; ctx.drawImage(ogLogo, 60, H - lh - 92, lw, lh); }
        ctx.fillStyle = "#f0e9dd"; ctx.font = "italic 600 42px 'Playfair Display', Georgia, serif"; ctx.fillText("Kiến tạo giá trị thịnh vượng", 62, H - 52);
      }
      ogPreview.src = ogCanvas.toDataURL("image/jpeg", 0.9);
      $("ogPreviewWrap").style.display = "block"; ogDownload.disabled = false;
    }
    ogFile.onchange = function (e) { var f = e.target.files[0]; if (!f) return; var im = new Image(); im.onload = function () { ogImg = im; drawOg(); }; im.src = URL.createObjectURL(f); };
    ogBrand.onchange = drawOg;
    ogLogo.onload = function () { if (ogImg) drawOg(); };
    ogDownload.onclick = function () {
      ogCanvas.toBlob(function (b) {
        var a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "og-image.jpg";
        document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
        toast("Đã tải og-image.jpg — chép đè vào assets/img/");
      }, "image/jpeg", 0.9);
    };
  }

  /* ---------- Export / backup ---------- */
  function jslit(o) { return JSON.stringify(o, null, 2); }
  function generateDataJs() {
    var s = state, NL = "\n";
    var out = "/* PaceLand — assets/js/data.js (xuất từ trang quản trị " + new Date().toLocaleString("vi-VN") + ") */" + NL + NL;
    out += "const SITE = " + jslit(s.site) + ";" + NL + NL;
    out += "const NAV = " + jslit(window.NAV) + ";" + NL + NL;
    out += 'function ph(id, w) { return "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=" + (w || 1200) + "&q=80"; }' + NL + NL;
    out += "const FILTERS = " + jslit(window.FILTERS) + ";" + NL + NL;
    out += "const PROJECTS = " + jslit(s.projects) + ";" + NL + NL;
    out += "const POSTS = " + jslit(s.posts) + ";" + NL + NL;
    out += "const VALUES = " + jslit(window.VALUES) + ";" + NL + NL;
    out += "const JOBS = " + jslit(s.jobs) + ";" + NL + NL;
    out += "const FAQS = " + jslit(groupFaqs(s.faqs)) + ";" + NL + NL;
    out += "const PAGES = " + jslit(s.pages) + ";" + NL + NL;
    out += "const HERO_SLIDES = " + jslit(s.heroSlides) + ";" + NL + NL;
    out += 'const HERO_SLIDES_REPO = "' + (localStorage.getItem(GH_REPO_KEY) || "") + '";\n';
    out += 'const HERO_SLIDES_BRANCH = "' + (localStorage.getItem(GH_BRANCH_KEY) || "main") + '";\n\n';
    out += 'if (typeof window !== "undefined") {' + NL + "  window.SITE = SITE; window.NAV = NAV; window.PROJECTS = PROJECTS; window.POSTS = POSTS; window.FILTERS = FILTERS; window.VALUES = VALUES; window.JOBS = JOBS; window.FAQS = FAQS; window.PAGES = PAGES; window.HERO_SLIDES = HERO_SLIDES; window.HERO_SLIDES_REPO = HERO_SLIDES_REPO; window.HERO_SLIDES_BRANCH = HERO_SLIDES_BRANCH; window.ph = ph;" + NL + "}" + NL + NL;
    out += "/* CMS override */" + NL +
"(function () {" + NL +
"  if (typeof window === 'undefined') return;" + NL +
"  try {" + NL +
"    var cms = JSON.parse(localStorage.getItem('pl_cms') || 'null');" + NL +
"    if (!cms) return;" + NL +
"    if (cms.site) Object.assign(SITE, cms.site);" + NL +
"    function r(a, d) { if (Array.isArray(d)) { a.length = 0; d.forEach(function (x) { a.push(x); }); } }" + NL +
"    var hasOldCovers = Array.isArray(cms.projects) && cms.projects.some(function (p) {" + NL +
"      return p.cover && /^\\d{8,}-[0-9a-f]{8,}$/i.test(p.cover);" + NL +
"    });" + NL +
"    if (!hasOldCovers) { r(PROJECTS, cms.projects); r(POSTS, cms.posts); }" + NL +
"    r(JOBS, cms.jobs); r(FAQS, cms.faqs);" + NL +
"    if (cms.pages) { for (var pg in cms.pages) { if (PAGES[pg]) PAGES[pg].fields.forEach(function (f) { if (cms.pages[pg][f.k] != null) f.value = cms.pages[pg][f.k]; }); } }" + NL +
"    if (cms.heroSlides) r(HERO_SLIDES, cms.heroSlides);" + NL +
"    window.SITE = SITE; window.PROJECTS = PROJECTS; window.POSTS = POSTS; window.JOBS = JOBS; window.FAQS = FAQS; window.PAGES = PAGES; window.HERO_SLIDES = HERO_SLIDES;" + NL +
"  } catch (e) {}" + NL +
"})();" + NL;
    return out;
  }
  function exportDataJs() {
    download("data.js", generateDataJs(), "text/javascript;charset=utf-8");
    toast("Đã tải data.js — thay vào thư mục assets/js/");
  }
  function publishToGitHub() {
    var repo = localStorage.getItem(GH_REPO_KEY) || "";
    var token = localStorage.getItem(GH_TOKEN_KEY) || "";
    var branch = localStorage.getItem(GH_BRANCH_KEY) || "main";
    if (!repo || !token) { toast("Chưa cấu hình GitHub. Vào Cài đặt → Đăng web tự động."); current = "settings"; render(); return; }
    if (location.protocol === "file:") { toast("⚠️ Phải mở admin qua URL Netlify (https://...) để dùng tính năng này, không mở trực tiếp từ máy tính."); return; }
    var btn = $("btnPublish"); if (btn) { btn.disabled = true; btn.textContent = "Đang đăng…"; }
    var content = generateDataJs();
    var b64; try { b64 = btoa(unescape(encodeURIComponent(content))); } catch (e) { b64 = btoa(content); }
    var apiUrl = "https://api.github.com/repos/" + repo + "/contents/assets/js/data.js";
    var headers = { "Authorization": "Bearer " + token, "Content-Type": "application/json", "Accept": "application/vnd.github+json" };
    function resetBtn() { if (btn) { btn.disabled = false; btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Đăng lên web'; } }
    fetch(apiUrl + "?ref=" + branch, { headers: headers })
      .then(function (r) { return r.json(); })
      .then(function (file) {
        var isFileMissing = file.message === "Not Found" || (file.message || "").toLowerCase().includes("empty");
        if (file.message && !isFileMissing) throw new Error(file.message);
        var body = { message: "Update PaceLand " + new Date().toLocaleDateString("vi-VN"), content: b64, branch: branch };
        if (file.sha) body.sha = file.sha;
        return fetch(apiUrl, { method: "PUT", headers: headers, body: JSON.stringify(body) });
      })
      .then(function (r) {
        resetBtn();
        if (r.ok) { toast("✅ Đã đăng! Website cập nhật trong ~1 phút."); }
        else return r.json().then(function (e) { toast("Lỗi GitHub: " + (e.message || "không rõ")); });
      })
      .catch(function (err) { resetBtn(); toast("Lỗi: " + (err.message || "Kiểm tra token và repo")); });
  }
  function pushSlidesJson() {
    var repo = localStorage.getItem(GH_REPO_KEY) || "";
    var token = localStorage.getItem(GH_TOKEN_KEY) || "";
    var branch = localStorage.getItem(GH_BRANCH_KEY) || "main";
    if (!repo || !token) return Promise.resolve(false);
    var content = JSON.stringify(state.heroSlides, null, 2);
    var b64; try { b64 = btoa(unescape(encodeURIComponent(content))); } catch (e) { b64 = btoa(content); }
    var apiUrl = "https://api.github.com/repos/" + repo + "/contents/assets/data/hero-slides.json";
    var headers = { "Authorization": "Bearer " + token, "Content-Type": "application/json", "Accept": "application/vnd.github+json" };
    return fetch(apiUrl + "?ref=" + branch, { headers: headers })
      .then(function (r) { return r.json(); })
      .then(function (file) {
        var body = { message: "Update hero slides", content: b64, branch: branch };
        if (file.sha) body.sha = file.sha;
        return fetch(apiUrl, { method: "PUT", headers: headers, body: JSON.stringify(body) });
      })
      .then(function (r) { return r.ok; })
      .catch(function () { return false; });
  }
  function backup() {
    var bpages = {}; Object.keys(state.pages || {}).forEach(function (pg) { bpages[pg] = {}; state.pages[pg].fields.forEach(function (f) { bpages[pg][f.k] = f.value; }); });
    download("paceland-noi-dung-" + new Date().toISOString().slice(0, 10) + ".json",
      JSON.stringify({ site: state.site, projects: state.projects, posts: state.posts, jobs: state.jobs, faqs: groupFaqs(state.faqs), pages: bpages }, null, 2),
      "application/json");
    toast("Đã tải bản sao lưu");
  }
  function restore(file) {
    var fr = new FileReader();
    fr.onload = function () {
      try {
        var d = JSON.parse(fr.result);
        if (d.site) state.site = d.site;
        if (d.projects) state.projects = d.projects;
        if (d.posts) state.posts = d.posts;
        if (d.jobs) state.jobs = d.jobs;
        if (d.pages) Object.keys(d.pages).forEach(function (pg) { if (state.pages[pg]) state.pages[pg].fields.forEach(function (f) { if (d.pages[pg][f.k] != null) f.value = d.pages[pg][f.k]; }); });
        state.faqs = []; (d.faqs || []).forEach(function (g) { (g.items || []).forEach(function (it) { state.faqs.push({ group: g.group, q: it.q, a: it.a }); }); });
        persist(); render(); toast("Đã khôi phục nội dung");
      } catch (e) { toast("File không hợp lệ"); }
    };
    fr.readAsText(file);
  }

  /* ---------- Bind shell ---------- */
  function bindShell() {
    document.querySelectorAll("#adminNav button").forEach(function (b) {
      b.onclick = function () { current = b.getAttribute("data-tab"); render(); };
    });
    $("view").addEventListener("click", function (e) {
      var pe = e.target.closest("[data-pageedit]");
      if (pe) { openPageForm(pe.getAttribute("data-pageedit")); return; }
      var mc = e.target.closest("[data-mcopy],[data-mdl],[data-mdel]");
      if (mc) {
        if (mc.hasAttribute("data-mcopy")) {
          var copyN = mc.getAttribute("data-mcopy");
          var pth = (MEDIA[copyN] && MEDIA[copyN].cloudinary) ? MEDIA[copyN].url : MEDIA_PREFIX + copyN;
          if (navigator.clipboard) navigator.clipboard.writeText(pth);
          toast("Đã chép: " + pth.slice(0, 60) + (pth.length > 60 ? "…" : ""));
        }
        else if (mc.hasAttribute("data-mdl")) {
          var dlN = mc.getAttribute("data-mdl");
          if (MEDIA[dlN] && MEDIA[dlN].cloudinary) window.open(MEDIA[dlN].url, "_blank");
          else dlMedia(dlN);
        }
        else if (mc.hasAttribute("data-mdel")) {
          var nm = mc.getAttribute("data-mdel");
          if (confirm('Xoá "' + nm + '" khỏi thư viện?')) {
            if (MEDIA[nm] && MEDIA[nm].cloudinary) { delete MEDIA[nm]; persistMediaReg(); render(); toast("Đã xoá khỏi danh sách"); }
            else dbDel(nm).then(function () { if (MEDIA[nm]) { try { URL.revokeObjectURL(MEDIA[nm].url); } catch (e2) {} delete MEDIA[nm]; } render(); toast("Đã xoá"); });
          }
        }
        return;
      }
      var btn = e.target.closest("[data-op]"); if (!btn) return;
      var idx = +btn.getAttribute("data-idx"), op = btn.getAttribute("data-op");
      if (op === "edit") openForm(current, idx);
      else if (op === "del") {
        var label = state[current][idx][nameField(current)] || "mục này";
        if (confirm('Xoá "' + label + '"?')) { state[current].splice(idx, 1); persist(); render(); toast("Đã xoá"); }
      }
    });
    $("btnAdd").onclick = function () { openForm(current, null); };
    $("btnSave").onclick = function () { persist(); $("btnSave").classList.remove("dirty"); toast("Đã lưu vào trình duyệt"); };
    $("btnExport").onclick = exportDataJs;
    if ($("btnPublish")) $("btnPublish").onclick = publishToGitHub;
    $("btnBackup").onclick = backup;
    $("btnRestore").onclick = function () { $("restoreFile").click(); };
    $("restoreFile").onchange = function (e) { if (e.target.files[0]) restore(e.target.files[0]); e.target.value = ""; };
    $("btnLogout").onclick = function () { sessionStorage.removeItem("pl_authed"); location.reload(); };
  }

  document.addEventListener("DOMContentLoaded", initAuth);
})();
