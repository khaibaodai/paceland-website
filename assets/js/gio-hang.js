/* ============================================================
   PACELAND — Giỏ hàng dự án (gio-hang.js)
   Chỉ nạp trên /gio-hang/*.html, sau main.js.

   Phần 1 — CORE (hàm thuần, không đụng DOM; chạy được trong Node
            cho tools/tests): chuẩn hoá chuỗi tìm kiếm, tính đơn giá,
            lọc và sắp xếp rổ căn, dựng nhãn hiển thị.
   Phần 2 — DOM: bảng hàng, bộ lọc, so sánh căn, hộp thoại
            "Check căn còn không?" và sự kiện analytics.

   Nguyên tắc: KHÔNG gửi tên / SĐT vào GA4, Meta, TikTok.
   ============================================================ */
(function (root) {
  "use strict";
  var core = {};

  /* ---------- Chuỗi ---------- */
  var DAU = { a: "àáạảãâầấậẩẫăằắặẳẵ", e: "èéẹẻẽêềếệểễ", i: "ìíịỉĩ", o: "òóọỏõôồốộổỗơờớợởỡ", u: "ùúụủũưừứựửữ", y: "ỳýỵỷỹ", d: "đ" };
  core.norm = function (v) {
    var s = String(v == null ? "" : v).toLowerCase();
    for (var k in DAU) if (Object.prototype.hasOwnProperty.call(DAU, k)) s = s.replace(new RegExp("[" + DAU[k] + "]", "g"), k);
    return s.replace(/\s+/g, " ").trim();
  };

  /* ---------- Số & nhãn ---------- */
  core.fmtTy = function (n) {
    if (typeof n !== "number" || !isFinite(n)) return "—";
    return n.toFixed(2).replace(/\.?0+$/, "").replace(".", ",") + " tỉ";
  };
  core.fmtM2 = function (n) {
    if (typeof n !== "number" || !isFinite(n)) return "—";
    return String(n).replace(".", ",") + " m²";
  };
  /* Đơn giá tạm tính = giá niêm yết ÷ diện tích tim tường (triệu/m²) */
  core.donGia = function (can) {
    if (!can || typeof can.ny !== "number" || typeof can.dt !== "number" || !can.dt) return null;
    return (can.ny * 1000) / can.dt;
  };
  core.fmtDonGia = function (n) {
    if (typeof n !== "number" || !isFinite(n)) return "—";
    return n.toFixed(1).replace(/\.0$/, "").replace(".", ",") + " tr/m²";
  };

  /* ---------- Lọc ---------- */
  /* q: { tim, khoi, loai, huong, banGiao, giaMax, dtMin } — trường rỗng nghĩa là bỏ qua */
  core.loc = function (list, q) {
    var f = q || {};
    var tim = core.norm(f.tim);
    return (list || []).filter(function (c) {
      if (tim) {
        var hay = core.norm([c.ma, c.khoi, c.loai, c.huong].join(" "));
        if (hay.indexOf(tim) === -1) return false;
      }
      if (f.khoi && c.khoi !== f.khoi) return false;
      if (f.loai && c.loaiMa !== f.loai) return false;
      if (f.huong && c.huongMa !== f.huong) return false;
      if (f.banGiao && c.banGiao !== f.banGiao) return false;
      if (f.giaMax && !(typeof c.ny === "number" && c.ny <= Number(f.giaMax))) return false;
      if (f.dtMin && !(typeof c.dt === "number" && c.dt >= Number(f.dtMin))) return false;
      return true;
    });
  };

  /* ---------- Sắp xếp ---------- */
  var SORTS = {
    "gia-tang": function (a, b) { return (a.ny || 0) - (b.ny || 0); },
    "gia-giam": function (a, b) { return (b.ny || 0) - (a.ny || 0); },
    "dt-tang": function (a, b) { return (a.dt || 0) - (b.dt || 0); },
    "dt-giam": function (a, b) { return (b.dt || 0) - (a.dt || 0); },
    "don-gia": function (a, b) { return (core.donGia(a) || 0) - (core.donGia(b) || 0); },
  };
  core.sapXep = function (list, key) {
    var fn = SORTS[key] || SORTS["gia-tang"];
    return (list || []).slice().sort(fn);
  };
  core.cacKieuSapXep = function () { return Object.keys(SORTS); };

  /* ---------- Số bộ lọc đang bật ---------- */
  core.demLoc = function (q) {
    var f = q || {}, n = 0, keys = ["khoi", "loai", "huong", "banGiao", "giaMax", "dtMin"];
    for (var i = 0; i < keys.length; i++) if (f[keys[i]]) n++;
    return n;
  };

  /* ---------- Nhãn tóm tắt một căn (dùng cho form & so sánh) ---------- */
  core.nhan = function (can, tenToa) {
    if (!can) return "";
    var p = [];
    if (tenToa) p.push(tenToa);
    p.push("căn " + can.ma);
    if (can.loai) p.push(can.loai);
    if (typeof can.dt === "number") p.push(core.fmtM2(can.dt));
    return p.join(" · ");
  };

  if (typeof module !== "undefined" && module.exports) module.exports = core;
  root.PLGioHang = core;

  /* ==========================================================
     Phần 2 — DOM
     ========================================================== */
  if (typeof document === "undefined") return;

  var ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.7" y2="16.7"/></svg>',
    filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="17" x2="14" y2="17"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  };
  var MAX_PICK = 3;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function el(id) { return document.getElementById(id); }
  function track(evt, params) { if (root.__plTrack) root.__plTrack(evt, params); }

  function init() {
    var wrap = document.querySelector("[data-gio-hang]");
    var raw = el("gh-data");
    if (!wrap || !raw) return;

    var data;
    try { data = JSON.parse(raw.textContent); } catch (e) { return; }
    var cans = data.can || [];
    if (!cans.length) return;

    var tbody = el("gh-rows");
    var cards = el("gh-cards");
    var count = el("gh-count");
    var empty = el("gh-empty");
    var panel = el("gh-panel");
    var toggle = el("gh-filter-toggle");
    var cmpBar = el("gh-cmp");
    var q = { tim: "", khoi: "", loai: "", huong: "", banGiao: "", giaMax: "", dtMin: "" };
    var sortKey = "gia-tang";
    var picked = [];

    /* ---------- Vẽ ---------- */
    function rowHtml(c) {
      var dg = core.fmtDonGia(core.donGia(c));
      var on = picked.indexOf(c.ma) > -1;
      return '<tr class="' + (on ? "is-picked" : "") + '" data-ma="' + esc(c.ma) + '">' +
        '<td><input type="checkbox" class="gh-pick" data-pick="' + esc(c.ma) + '"' + (on ? " checked" : "") + ' aria-label="Chọn căn ' + esc(c.ma) + ' để so sánh"></td>' +
        '<td><span class="gh-code">' + esc(c.ma) + "</span>" + (c.tang ? '<span class="gh-sub">Tầng ' + esc(c.tang) + "</span>" : "") + "</td>" +
        "<td>" + esc(c.khoi) + "</td>" +
        "<td>" + esc(c.loai) + "</td>" +
        '<td class="gh-num">' + core.fmtM2(c.dt) + '<span class="gh-sub">tim tường</span></td>' +
        '<td class="gh-view">' + esc(c.huong) + "</td>" +
        '<td class="gh-num">' + core.fmtTy(c.ny) + '<span class="gh-sub">' + dg + " · trước VAT</span></td>" +
        "<td>" + esc(c.banGiao) + "</td>" +
        '<td class="gh-sticky"><button type="button" class="gh-ask" data-ask="' + esc(c.ma) + '">' + ICON.check + "Check căn còn không?</button></td>" +
        "</tr>";
    }

    function cardHtml(c) {
      var on = picked.indexOf(c.ma) > -1;
      return '<article class="gh-unit ' + (on ? "is-picked" : "") + '" data-ma="' + esc(c.ma) + '">' +
        '<div class="gh-unit__hd"><div class="gh-unit__id">' +
        '<label class="gh-unit__box"><input type="checkbox" class="gh-pick" data-pick="' + esc(c.ma) + '"' + (on ? " checked" : "") + ' aria-label="Chọn căn ' + esc(c.ma) + ' để so sánh"><span class="gh-sr">So sánh</span></label>' +
        '<div><span class="gh-code">' + esc(c.ma) + "</span>" +
        '<span class="gh-sub">Khối ' + esc(c.khoi) + (c.tang ? " · tầng " + esc(c.tang) : "") + "</span></div></div>" +
        '<div class="gh-unit__price"><b>' + core.fmtTy(c.ny) + '</b><span class="gh-sub">niêm yết, trước VAT</span></div></div>' +
        '<dl class="gh-unit__rows">' +
        "<dt>Loại căn</dt><dd>" + esc(c.loai) + "</dd>" +
        "<dt>Diện tích</dt><dd>" + core.fmtM2(c.dt) + " tim tường</dd>" +
        "<dt>Đơn giá</dt><dd>" + core.fmtDonGia(core.donGia(c)) + "</dd>" +
        "<dt>Hướng view</dt><dd>" + esc(c.huong) + "</dd>" +
        "<dt>Bàn giao</dt><dd>" + esc(c.banGiao) + "</dd>" +
        "<dt>Tình trạng</dt><dd><span class=\"gh-pill\">Cần xác nhận</span></dd>" +
        "</dl>" +
        '<div class="gh-unit__act"><button type="button" class="gh-ask" data-ask="' + esc(c.ma) + '">' + ICON.check + "Check căn còn không?</button></div>" +
        "</article>";
    }

    function ve() {
      var list = core.sapXep(core.loc(cans, q), sortKey);
      if (tbody) tbody.innerHTML = list.map(rowHtml).join("");
      if (cards) cards.innerHTML = list.map(cardHtml).join("");
      if (count) count.innerHTML = "Đang hiển thị <b>" + list.length + "</b> trên " + cans.length + " căn đã công bố";
      if (empty) empty.hidden = list.length > 0;
      var n = core.demLoc(q);
      var badge = toggle ? toggle.querySelector("b") : null;
      if (badge) { badge.hidden = n === 0; badge.textContent = String(n); }
      veThanhSoSanh();
    }

    /* Đồng bộ trạng thái chọn giữa bảng và thẻ cho cùng một mã căn */
    function danhDauHang(ma, on) {
      wrap.querySelectorAll('[data-ma="' + (root.CSS && CSS.escape ? CSS.escape(ma) : ma) + '"]').forEach(function (n) {
        n.classList.toggle("is-picked", on);
        var box = n.querySelector("[data-pick]");
        if (box) box.checked = on;
      });
    }

    /* Chạm trần 3 căn: báo ngay trên thanh so sánh thay vì im lặng bỏ qua cú tick */
    var hetCho = null;
    function baoDayGioHang() {
      if (!cmpBar) return;
      var txt = cmpBar.querySelector(".gh-cmp__txt");
      if (!txt) return;
      txt.innerHTML = "Mỗi lần so sánh tối đa <b>" + MAX_PICK + "</b> căn. Bỏ bớt một căn rồi chọn căn mới.";
      clearTimeout(hetCho);
      hetCho = setTimeout(veThanhSoSanh, 2600);
    }

    function veThanhSoSanh() {
      if (!cmpBar) return;
      var txt = cmpBar.querySelector(".gh-cmp__txt");
      if (txt) txt.innerHTML = "Đã chọn <b>" + picked.length + "/" + MAX_PICK + "</b> căn để so sánh";
      cmpBar.classList.toggle("is-on", picked.length > 0);
      /* Nút liên hệ nổi của site nằm sát đáy phải — đẩy lên đúng bằng chiều cao thanh
         so sánh (thanh cao thấp khác nhau tuỳ độ dài chữ và bề ngang màn hình) */
      document.body.classList.toggle("gh-cmp-on", picked.length > 0);
      document.body.style.setProperty("--gh-cmp-h", cmpBar.offsetHeight + "px");
      var go = cmpBar.querySelector(".gh-cmp__go");
      if (go) go.disabled = picked.length < 2;
    }

    /* ---------- Bộ lọc ---------- */
    var search = el("gh-search");
    if (search) {
      var t = null;
      search.addEventListener("input", function () {
        clearTimeout(t);
        t = setTimeout(function () { q.tim = search.value; ve(); }, 180);
      });
    }

    wrap.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-khoi]");
      if (chip) {
        q.khoi = chip.getAttribute("data-khoi");
        wrap.querySelectorAll("[data-khoi]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === chip)); });
        ve();
        track("gio_hang_loc", { kieu: "khoi", gia_tri: q.khoi || "tat-ca" });
        return;
      }
      if (e.target.closest("#gh-filter-toggle")) {
        var open = panel.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
        return;
      }
      if (e.target.closest("#gh-reset")) {
        q = { tim: "", khoi: "", loai: "", huong: "", banGiao: "", giaMax: "", dtMin: "" };
        if (search) search.value = "";
        wrap.querySelectorAll("#gh-panel select").forEach(function (s) { s.value = ""; });
        wrap.querySelectorAll("[data-khoi]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-khoi") === "")); });
        ve();
        return;
      }
      var ask = e.target.closest("[data-ask]");
      if (ask) { moHoiCan(ask.getAttribute("data-ask")); return; }
    });

    wrap.addEventListener("change", function (e) {
      var s = e.target.closest("#gh-panel select, #gh-sort");
      if (s) {
        if (s.id === "gh-sort") sortKey = s.value;
        else q[s.getAttribute("data-key")] = s.value;
        ve();
        return;
      }
      var pick = e.target.closest("[data-pick]");
      if (pick) {
        var ma = pick.getAttribute("data-pick");
        var i = picked.indexOf(ma);
        if (pick.checked && i === -1) {
          if (picked.length >= MAX_PICK) { pick.checked = false; baoDayGioHang(); return; }
          picked.push(ma);
        } else if (!pick.checked && i > -1) picked.splice(i, 1);
        /* Không vẽ lại cả bảng: ô tick sẽ bị thay node ngay dưới tay người dùng */
        danhDauHang(ma, pick.checked);
        veThanhSoSanh();
      }
    });

    /* ---------- Hộp thoại "Check căn còn không?" ---------- */
    var dlg = el("gh-dlg");
    var dlgUnit = el("gh-dlg-unit");
    var dlgField = el("gh-dlg-can");
    var lastFocus = null;

    function moDialog(box) {
      lastFocus = document.activeElement;
      box.classList.add("is-on");
      document.body.style.overflow = "hidden";
      var f = box.querySelector("input:not([type=hidden]), button");
      if (f) f.focus();
    }
    function dongDialog(box) {
      box.classList.remove("is-on");
      document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function moHoiCan(ma) {
      if (!dlg) return;
      var c = null;
      for (var i = 0; i < cans.length; i++) if (cans[i].ma === ma) { c = cans[i]; break; }
      var nhan = c ? core.nhan(c, data.ten) : data.ten;
      if (dlgUnit) {
        dlgUnit.innerHTML = c
          ? "Căn <b>" + esc(c.ma) + "</b> · khối " + esc(c.khoi) + " · " + esc(c.loai) + " · " + core.fmtM2(c.dt) + " · " + esc(c.huong) + "<br>Niêm yết " + core.fmtTy(c.ny) + ", trước VAT và trước chiết khấu."
          : "Anh/chị để lại số điện thoại, PaceLand gửi rổ căn đang còn của " + esc(data.ten) + ".";
      }
      if (dlgField) dlgField.value = nhan;
      moDialog(dlg);
      track("gio_hang_check_can", { toa: data.ten, ma_can: ma || "", khoi: c ? c.khoi : "", loai: c ? c.loai : "" });
    }

    /* ---------- So sánh ---------- */
    var cmpDlg = el("gh-cmp-dlg");
    var cmpBody = el("gh-cmp-body");

    function veSoSanh() {
      if (!cmpBody) return;
      var list = picked.map(function (ma) {
        for (var i = 0; i < cans.length; i++) if (cans[i].ma === ma) return cans[i];
        return null;
      }).filter(Boolean);
      if (list.length < 2) return;
      var hang = [
        ["Khối", function (c) { return esc(c.khoi); }],
        ["Tầng", function (c) { return c.tang ? esc(c.tang) : "—"; }],
        ["Loại căn", function (c) { return esc(c.loai); }],
        ["Diện tích tim tường", function (c) { return core.fmtM2(c.dt); }],
        ["Hướng view", function (c) { return esc(c.huong); }],
        ["Giá niêm yết", function (c) { return core.fmtTy(c.ny); }],
        ["Đơn giá tạm tính", function (c) { return core.fmtDonGia(core.donGia(c)); }],
        ["Hình thức bàn giao", function (c) { return esc(c.banGiao); }],
      ];
      cmpBody.innerHTML =
        '<table class="gh-cmptable"><thead><tr><th scope="col">Tiêu chí</th>' +
        list.map(function (c) { return '<th scope="col">' + esc(c.ma) + "</th>"; }).join("") +
        "</tr></thead><tbody>" +
        hang.map(function (h) {
          return '<tr><th scope="row">' + h[0] + "</th>" + list.map(function (c) { return "<td>" + h[1](c) + "</td>"; }).join("") + "</tr>";
        }).join("") +
        "</tbody></table>";
      track("gio_hang_so_sanh", { toa: data.ten, so_can: list.length });
    }

    if (cmpBar) {
      cmpBar.addEventListener("click", function (e) {
        if (e.target.closest(".gh-cmp__go")) { veSoSanh(); if (cmpDlg) moDialog(cmpDlg); return; }
        if (e.target.closest(".gh-cmp__clear")) { picked = []; ve(); }
      });
    }

    document.addEventListener("click", function (e) {
      var box = e.target.closest(".gh-dlg");
      if (!box) return;
      if (e.target.closest("[data-close]") || e.target === box) dongDialog(box);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var open = document.querySelector(".gh-dlg.is-on");
      if (open) dongDialog(open);
    });

    /* Mở hộp thoại từ nút CTA ngoài bảng (hero, sticky, cuối trang) */
    document.querySelectorAll("[data-gh-open]").forEach(function (b) {
      b.addEventListener("click", function (e) { e.preventDefault(); moHoiCan(""); });
    });

    ve();
    track("gio_hang_view", { toa: data.ten, so_can: cans.length });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})(typeof window !== "undefined" ? window : globalThis);
