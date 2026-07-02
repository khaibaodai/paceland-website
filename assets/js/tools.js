/* ============================================================
   PACELAND — Bộ công cụ tài sản (cong-cu.html)
   5 công cụ: lãi vay · phong thuỷ · phân bổ · dòng tiền · định giá
   ============================================================ */

(function () {
  if (typeof window === "undefined" || !document.getElementById("toolsPage")) return;

  /* ================= Tiện ích chung ================= */

  function $(id) { return document.getElementById(id); }

  function fmtVN(n) { return Math.round(n).toLocaleString("vi-VN"); }

  /* Rút gọn: 2.500.000.000 → "2,5 tỉ" */
  function fmtShort(n) {
    n = Math.abs(n);
    if (n >= 1e9) {
      var t = n / 1e9;
      return (Math.round(t * 100) / 100).toLocaleString("vi-VN") + " tỉ";
    }
    if (n >= 1e6) return Math.round(n / 1e6).toLocaleString("vi-VN") + " triệu";
    return fmtVN(n) + " đ";
  }

  /* Đọc thành chữ: 2.500.000.000 → "2 tỉ 500 triệu" */
  function moneyWords(n) {
    if (!n || n < 1e6) return "";
    var ti = Math.floor(n / 1e9);
    var tr = Math.round((n - ti * 1e9) / 1e6);
    if (tr === 1000) { ti += 1; tr = 0; }
    var s = [];
    if (ti) s.push(ti.toLocaleString("vi-VN") + " tỉ");
    if (tr) s.push(tr + " triệu");
    return "= " + s.join(" ");
  }

  function parseMoney(el) {
    return parseInt(String(el.value).replace(/\D/g, "") || "0", 10);
  }

  /* Input tiền: tự thêm dấu chấm nghìn + hint chữ */
  function bindMoney(inputId, hintId) {
    var el = $(inputId), hint = hintId ? $(hintId) : null;
    if (!el) return;
    function sync() {
      var digits = String(el.value).replace(/\D/g, "").slice(0, 15);
      el.value = digits ? parseInt(digits, 10).toLocaleString("vi-VN") : "";
      if (hint) hint.textContent = moneyWords(parseInt(digits || "0", 10));
    }
    el.addEventListener("input", sync);
    sync();
  }

  /* Nút chọn dạng segment */
  function bindSeg(id) {
    var wrap = $(id);
    if (!wrap) return;
    wrap.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      wrap.querySelectorAll("button").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
    });
  }
  function segVal(id) {
    var a = $(id) && $(id).querySelector("button.active");
    return a ? a.getAttribute("data-v") : "";
  }

  function num(id, fallback) {
    var v = parseFloat($(id).value);
    return isFinite(v) ? v : (fallback || 0);
  }

  function kq(label, value, unit, cls, hi) {
    return '<div class="kq' + (hi ? " hi" : "") + '">' +
      '<div class="l">' + label + '</div>' +
      '<div class="v' + (cls ? " " + cls : "") + '">' + value + (unit ? '<span class="u">' + unit + "</span>" : "") + "</div></div>";
  }

  function leadCta(msg) {
    return '<div class="tool-cta">' +
      "<p>" + msg + "</p>" +
      '<div class="acts">' +
      '<a class="btn btn--light" href="lien-he.html">Nhận tư vấn riêng</a>' +
      '<a class="btn btn--gold" href="tel:' + (window.SITE ? SITE.hotlineRaw : "0903983737") + '">Gọi ' + (window.SITE ? SITE.hotline : "0903 983 737") + "</a>" +
      "</div></div>";
  }

  /* ================= Chuyển tab công cụ ================= */

  var TOOLS = [
    { id: "lai-vay", label: "Tính lãi vay", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>' },
    { id: "phong-thuy", label: "Phong thuỷ nhà", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>' },
    { id: "phan-bo", label: "Phân bổ tài sản", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>' },
    { id: "dong-tien", label: "Dòng tiền cho thuê", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
    { id: "dinh-gia", label: "Định giá BĐS", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' }
  ];
  var firstRun = {};

  function activateTool(id, updateHash) {
    if (!$("panel-" + id)) id = TOOLS[0].id;
    TOOLS.forEach(function (t) {
      var on = t.id === id;
      var btn = $("tab-" + t.id), panel = $("panel-" + t.id);
      if (btn) { btn.classList.toggle("active", on); btn.setAttribute("aria-selected", on ? "true" : "false"); }
      if (panel) panel.classList.toggle("active", on);
    });
    if (updateHash && history.replaceState) history.replaceState(null, "", "#" + id);
    if (!firstRun[id]) {
      firstRun[id] = true;
      /* Tự chạy lần đầu với số liệu mẫu để thấy ngay kết quả */
      if (id === "lai-vay") calcLoan();
      if (id === "phong-thuy") calcFengshui();
      if (id === "phan-bo") calcAlloc();
      if (id === "dong-tien") calcCashflow();
      if (id === "dinh-gia") calcValuation();
    }
    if (typeof window.__plObserveReveals === "function") window.__plObserveReveals();
  }

  function buildSwitcher() {
    var wrap = $("toolSwitch");
    wrap.innerHTML = TOOLS.map(function (t) {
      return '<button type="button" role="tab" id="tab-' + t.id + '" aria-controls="panel-' + t.id + '" aria-selected="false">' + t.icon + t.label + "</button>";
    }).join("");
    wrap.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (btn) activateTool(btn.id.replace("tab-", ""), true);
    });
    window.addEventListener("hashchange", function () {
      activateTool(location.hash.replace("#", ""), false);
    });
  }

  /* ================= 1. TÍNH LÃI VAY ================= */

  function annuityPay(P, r, n) {
    if (n <= 0) return 0;
    if (r <= 0) return P / n;
    var k = Math.pow(1 + r, n);
    return P * r * k / (k - 1);
  }

  function calcLoan() {
    var P = parseMoney($("lvAmount"));
    var years = Math.min(35, Math.max(1, num("lvYears", 20)));
    var n = Math.round(years * 12);
    var promo = Math.min(n, Math.max(0, Math.round(num("lvPromoMonths", 0))));
    var r1 = num("lvRate1", 0) / 100 / 12;
    var r2 = num("lvRate2", 0) / 100 / 12;
    var method = segVal("lvMethod");
    var out = $("lvResult");

    if (P < 1e7) {
      out.innerHTML = '<div class="placeholder">Vui lòng nhập số tiền vay từ 10 triệu trở lên.</div>';
      return;
    }

    var balance = P, totalInterest = 0, totalPaid = 0;
    var firstPay = 0, afterPromoPay = 0;
    var yearly = [];
    var pay1 = 0, pay2 = 0;

    if (method === "annuity") {
      pay1 = annuityPay(P, r1, n);
    }

    for (var m = 1; m <= n; m++) {
      var r = m <= promo ? r1 : r2;
      var interest = balance * r;
      var principal, payment;

      if (method === "annuity") {
        if (m === promo + 1 && promo < n) pay2 = annuityPay(balance, r2, n - promo);
        payment = m <= promo ? pay1 : (promo < n ? pay2 : pay1);
        principal = payment - interest;
        if (principal > balance) { principal = balance; payment = principal + interest; }
      } else {
        principal = P / n;
        if (principal > balance) principal = balance;
        payment = principal + interest;
      }

      balance -= principal;
      totalInterest += interest;
      totalPaid += payment;
      if (m === 1) firstPay = payment;
      if (m === promo + 1) afterPromoPay = payment;

      var yi = Math.ceil(m / 12) - 1;
      if (!yearly[yi]) yearly[yi] = { pay: 0, goc: 0, lai: 0, du: 0 };
      yearly[yi].pay += payment; yearly[yi].goc += principal; yearly[yi].lai += interest; yearly[yi].du = balance;
    }
    if (!afterPromoPay) afterPromoPay = firstPay;

    var pctLai = Math.round(totalInterest / P * 100);
    var pGoc = Math.round(P / totalPaid * 100);

    var rows = yearly.map(function (y, i) {
      return "<tr><td>Năm " + (i + 1) + "</td><td>" + fmtVN(y.pay / 1e6) + " tr</td><td>" + fmtVN(y.goc / 1e6) + " tr</td><td>" + fmtVN(y.lai / 1e6) + " tr</td><td>" + fmtVN(y.du / 1e6) + " tr</td></tr>";
    }).join("");

    out.innerHTML =
      '<div class="kq-cards">' +
      kq("Trả tháng đầu", fmtShort(firstPay), "/tháng", "", true) +
      kq("Trả tháng sau ưu đãi", fmtShort(afterPromoPay), "/tháng") +
      kq("Tổng lãi phải trả", fmtShort(totalInterest), "", "neg") +
      kq("Tổng gốc + lãi", fmtShort(totalPaid)) +
      "</div>" +
      '<div class="split-bar">' +
      '<div class="bar"><i class="b-goc" style="width:' + pGoc + '%"></i><i class="b-lai" style="width:' + (100 - pGoc) + '%"></i></div>' +
      '<div class="legend">' +
      '<span><span class="dot" style="background:var(--ink)"></span>Gốc <b>' + fmtShort(P) + "</b></span>" +
      '<span><span class="dot" style="background:var(--red)"></span>Lãi <b>' + fmtShort(totalInterest) + "</b> (" + pctLai + "% khoản vay)</span>" +
      "</div></div>" +
      '<div class="tool-table-wrap"><div class="tt-head"><span>Lịch trả nợ theo năm</span><span style="color:var(--muted);font-weight:500;font-size:.76rem">Đơn vị: triệu đồng</span></div>' +
      '<div class="tool-table-scroll"><table class="tool-table"><thead><tr><th>Năm</th><th>Tổng trả</th><th>Gốc</th><th>Lãi</th><th>Dư nợ cuối</th></tr></thead><tbody>' + rows + "</tbody></table></div></div>" +
      leadCta("PaceLand làm việc với nhiều ngân hàng — <b>gói lãi suất thực tế có thể tốt hơn</b> con số bạn vừa nhập. Để lại thông tin để nhận gói vay phù hợp nhất.");
  }

  /* ================= 2. PHONG THUỶ ================= */

  var CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  var CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  var NAP_AM = [
    ["Hải Trung Kim", "Kim"], ["Lư Trung Hỏa", "Hỏa"], ["Đại Lâm Mộc", "Mộc"], ["Lộ Bàng Thổ", "Thổ"], ["Kiếm Phong Kim", "Kim"],
    ["Sơn Đầu Hỏa", "Hỏa"], ["Giản Hạ Thủy", "Thủy"], ["Thành Đầu Thổ", "Thổ"], ["Bạch Lạp Kim", "Kim"], ["Dương Liễu Mộc", "Mộc"],
    ["Tuyền Trung Thủy", "Thủy"], ["Ốc Thượng Thổ", "Thổ"], ["Tích Lịch Hỏa", "Hỏa"], ["Tùng Bách Mộc", "Mộc"], ["Trường Lưu Thủy", "Thủy"],
    ["Sa Trung Kim", "Kim"], ["Sơn Hạ Hỏa", "Hỏa"], ["Bình Địa Mộc", "Mộc"], ["Bích Thượng Thổ", "Thổ"], ["Kim Bạch Kim", "Kim"],
    ["Phú Đăng Hỏa", "Hỏa"], ["Thiên Hà Thủy", "Thủy"], ["Đại Trạch Thổ", "Thổ"], ["Thoa Xuyến Kim", "Kim"], ["Tang Đố Mộc", "Mộc"],
    ["Đại Khê Thủy", "Thủy"], ["Sa Trung Thổ", "Thổ"], ["Thiên Thượng Hỏa", "Hỏa"], ["Thạch Lựu Mộc", "Mộc"], ["Đại Hải Thủy", "Thủy"]
  ];
  var CUNG = {
    1: ["Khảm", "Thủy", "dong"], 2: ["Khôn", "Thổ", "tay"], 3: ["Chấn", "Mộc", "dong"], 4: ["Tốn", "Mộc", "dong"],
    6: ["Càn", "Kim", "tay"], 7: ["Đoài", "Kim", "tay"], 8: ["Cấn", "Thổ", "tay"], 9: ["Ly", "Hỏa", "dong"]
  };
  /* Bát trạch: hướng → cát/hung theo cung mệnh */
  var BAT_TRACH = {
    "Khảm": { "Đông Nam": "Sinh Khí", "Đông": "Thiên Y", "Nam": "Diên Niên", "Bắc": "Phục Vị", "Tây": "Họa Hại", "Đông Bắc": "Ngũ Quỷ", "Tây Bắc": "Lục Sát", "Tây Nam": "Tuyệt Mệnh" },
    "Ly":   { "Đông": "Sinh Khí", "Đông Nam": "Thiên Y", "Bắc": "Diên Niên", "Nam": "Phục Vị", "Đông Bắc": "Họa Hại", "Tây": "Ngũ Quỷ", "Tây Nam": "Lục Sát", "Tây Bắc": "Tuyệt Mệnh" },
    "Chấn": { "Nam": "Sinh Khí", "Bắc": "Thiên Y", "Đông Nam": "Diên Niên", "Đông": "Phục Vị", "Tây Nam": "Họa Hại", "Tây Bắc": "Ngũ Quỷ", "Đông Bắc": "Lục Sát", "Tây": "Tuyệt Mệnh" },
    "Tốn":  { "Bắc": "Sinh Khí", "Nam": "Thiên Y", "Đông": "Diên Niên", "Đông Nam": "Phục Vị", "Tây Bắc": "Họa Hại", "Tây Nam": "Ngũ Quỷ", "Tây": "Lục Sát", "Đông Bắc": "Tuyệt Mệnh" },
    "Càn":  { "Tây": "Sinh Khí", "Đông Bắc": "Thiên Y", "Tây Nam": "Diên Niên", "Tây Bắc": "Phục Vị", "Đông Nam": "Họa Hại", "Đông": "Ngũ Quỷ", "Bắc": "Lục Sát", "Nam": "Tuyệt Mệnh" },
    "Khôn": { "Đông Bắc": "Sinh Khí", "Tây": "Thiên Y", "Tây Bắc": "Diên Niên", "Tây Nam": "Phục Vị", "Đông": "Họa Hại", "Đông Nam": "Ngũ Quỷ", "Nam": "Lục Sát", "Bắc": "Tuyệt Mệnh" },
    "Cấn":  { "Tây Nam": "Sinh Khí", "Tây Bắc": "Thiên Y", "Tây": "Diên Niên", "Đông Bắc": "Phục Vị", "Nam": "Họa Hại", "Bắc": "Ngũ Quỷ", "Đông": "Lục Sát", "Đông Nam": "Tuyệt Mệnh" },
    "Đoài": { "Tây Bắc": "Sinh Khí", "Tây Nam": "Thiên Y", "Đông Bắc": "Diên Niên", "Tây": "Phục Vị", "Bắc": "Họa Hại", "Nam": "Ngũ Quỷ", "Đông Nam": "Lục Sát", "Đông": "Tuyệt Mệnh" }
  };
  var HUONG_MEAN = {
    "Sinh Khí": "Tài lộc, thăng tiến", "Thiên Y": "Sức khoẻ, quý nhân", "Diên Niên": "Gia đạo hoà thuận", "Phục Vị": "Bình ổn, vững vàng",
    "Họa Hại": "Thị phi, hao tài", "Ngũ Quỷ": "Bất ổn, tranh chấp", "Lục Sát": "Kiện tụng, tai tiếng", "Tuyệt Mệnh": "Xấu nhất, nên tránh"
  };
  var GOOD_H = { "Sinh Khí": 1, "Thiên Y": 1, "Diên Niên": 1, "Phục Vị": 1 };
  /* Tam tai theo tam hợp chi */
  var TAM_TAI = {};
  [[[8, 0, 4], [2, 3, 4]], [[2, 6, 10], [8, 9, 10]], [[5, 9, 1], [11, 0, 1]], [[11, 3, 7], [5, 6, 7]]].forEach(function (g) {
    g[0].forEach(function (chi) { TAM_TAI[chi] = g[1]; });
  });

  function reduce9(v) { while (v > 9) v = String(v).split("").reduce(function (a, b) { return a + +b; }, 0); return v; }

  function kuaNumber(year, gender) {
    var s = reduce9((year % 10) + Math.floor(year / 10) % 10);
    var v;
    if (year < 2000) v = gender === "nam" ? 10 - s : 5 + s;
    else v = gender === "nam" ? 9 - s : 6 + s;
    v = reduce9(v);
    if (v === 0) v = 9;
    if (v === 5) v = gender === "nam" ? 2 : 8;
    return v;
  }

  function canChi(year) { return CAN[(year - 4) % 10] + " " + CHI[(year - 4) % 12]; }

  function calcFengshui() {
    var year = Math.round(num("fsYear", 1985));
    var gender = segVal("fsGender");
    var out = $("fsResult");
    if (year < 1930 || year > 2015) {
      out.innerHTML = '<div class="placeholder">Vui lòng nhập năm sinh từ 1930 đến 2015.</div>';
      return;
    }

    var napam = NAP_AM[Math.floor(((year - 4) % 60) / 2)];
    var kua = kuaNumber(year, gender);
    var cung = CUNG[kua];
    var nhom = cung[2] === "dong" ? "Đông tứ mệnh" : "Tây tứ mệnh";
    var nhomHuong = cung[2] === "dong" ? "Bắc · Nam · Đông · Đông Nam" : "Tây · Tây Bắc · Tây Nam · Đông Bắc";
    var bt = BAT_TRACH[cung[0]];

    /* La bàn 3×3: hàng trên TB-B-ĐB, giữa T-tâm-Đ, dưới TN-N-ĐN */
    var GRID = ["Tây Bắc", "Bắc", "Đông Bắc", "Tây", null, "Đông", "Tây Nam", "Nam", "Đông Nam"];
    var cells = GRID.map(function (d) {
      if (!d) return '<div class="c-cell c-center"><span class="d">' + cung[0] + '</span><span class="t">' + nhom + "</span></div>";
      var h = bt[d];
      var good = GOOD_H[h] ? "good" : "bad";
      return '<div class="c-cell ' + good + '"><span class="d">' + d + '</span><span class="t">' + h + "<br>" + HUONG_MEAN[h] + "</span></div>";
    }).join("");

    /* Năm đẹp mua / xây nhà trong 8 năm tới */
    var nowY = new Date().getFullYear();
    var rows = "";
    for (var y = nowY; y < nowY + 8; y++) {
      var tuoi = y - year + 1;
      var kimlau = [1, 3, 6, 8].indexOf(tuoi % 9) !== -1;
      var hoIdx = (Math.floor(tuoi / 10) + tuoi % 10 - 1) % 6;
      var hoangoc = hoIdx === 2 || hoIdx === 4 || hoIdx === 5;
      var tamtai = TAM_TAI[(year - 4) % 12].indexOf((y - 4) % 12) !== -1;
      var issues = [];
      if (kimlau) issues.push("Kim Lâu");
      if (hoangoc) issues.push("Hoang Ốc");
      if (tamtai) issues.push("Tam Tai");
      var ok = issues.length === 0;
      rows += '<tr class="' + (ok ? "good" : "bad") + '"><td>' + y + " (" + canChi(y) + ')</td><td>' + tuoi + "</td><td style=\"text-align:left\">" + (ok ? "—" : issues.join(" · ")) + "</td><td>" + (ok ? '<span class="badge-ok">✓ Năm đẹp</span>' : '<span class="badge-no">Nên tránh</span>') + "</td></tr>";
    }

    out.innerHTML =
      '<div class="fs-summary">' +
      '<div class="cell"><div class="l">Năm sinh</div><div class="v">' + year + " · " + canChi(year) + "</div></div>" +
      '<div class="cell"><div class="l">Mệnh</div><div class="v"><em>' + napam[1] + "</em> — " + napam[0] + "</div></div>" +
      '<div class="cell"><div class="l">Cung mệnh</div><div class="v">' + cung[0] + " (" + cung[1] + ")</div></div>" +
      '<div class="cell"><div class="l">' + nhom + '</div><div class="v" style="font-size:.86rem">' + nhomHuong + "</div></div>" +
      "</div>" +
      '<div class="fs-layout">' +
      '<div class="compass">' + cells + "</div>" +
      '<div class="tool-table-wrap" style="margin-top:0"><div class="tt-head"><span>Năm đẹp mua / xây nhà</span><span style="color:var(--muted);font-weight:500;font-size:.76rem">8 năm tới</span></div>' +
      '<div class="tool-table-scroll"><table class="tool-table"><thead><tr><th>Năm</th><th>Tuổi mụ</th><th style="text-align:left">Phạm</th><th>Đánh giá</th></tr></thead><tbody>' + rows + "</tbody></table></div></div>" +
      "</div>" +
      '<div class="tool-disclaimer">Kết quả theo phái Bát trạch và cách tính dân gian (Kim Lâu – Hoang Ốc – Tam Tai), chỉ mang tính tham khảo văn hoá truyền thống. Nếu phạm năm, dân gian có cách "mượn tuổi" người hợp để tiến hành.</div>' +
      leadCta("Bạn đã biết hướng hợp tuổi — PaceLand sẽ <b>lọc sẵn những căn đúng hướng, đúng tầng</b> trong quỹ hàng đang có cho bạn.");
  }

  /* ================= 3. PHÂN BỔ TÀI SẢN ================= */

  var ALLOC_BASE = {
    safe:     { bds: 30, ck: 10, vang: 15, tg: 35, dp: 10 },
    balanced: { bds: 40, ck: 20, vang: 10, tg: 20, dp: 10 },
    growth:   { bds: 50, ck: 30, vang: 5,  tg: 5,  dp: 10 }
  };
  var ALLOC_META = [
    ["bds", "Bất động sản", "#C70018"],
    ["ck", "Cổ phiếu / quỹ", "#B0894A"],
    ["vang", "Vàng", "#D9A441"],
    ["tg", "Tiền gửi / trái phiếu", "#4B4138"],
    ["dp", "Dự phòng thanh khoản", "#A99E8E"]
  ];
  var RISK_LABEL = { safe: "An toàn", balanced: "Cân bằng", growth: "Tăng trưởng" };

  function calcAlloc() {
    var total = parseMoney($("alTotal"));
    var age = segVal("alAge");
    var risk = segVal("alRisk");
    var out = $("alResult");
    if (total < 1e8) {
      out.innerHTML = '<div class="placeholder">Vui lòng nhập tổng tài sản từ 100 triệu trở lên.</div>';
      return;
    }

    var a = JSON.parse(JSON.stringify(ALLOC_BASE[risk] || ALLOC_BASE.balanced));
    var shift = age === "senior" ? 10 : age === "mid" ? 5 : 0;
    shift = Math.min(shift, a.ck);
    a.ck -= shift; a.tg += shift;

    var deg = 0, segs = [];
    ALLOC_META.forEach(function (m) {
      var pct = a[m[0]];
      if (!pct) return;
      segs.push(m[2] + " " + deg + "deg " + (deg + pct * 3.6) + "deg");
      deg += pct * 3.6;
    });

    var legend = ALLOC_META.map(function (m) {
      var pct = a[m[0]];
      return '<div class="row"><span class="sw" style="background:' + m[2] + '"></span><span class="nm">' + m[1] + '</span><span class="pc">' + pct + '%</span><span class="amt">' + fmtShort(total * pct / 100) + "</span></div>";
    }).join("");

    out.innerHTML =
      '<div class="alloc-wrap">' +
      '<div class="donut" style="background:conic-gradient(' + segs.join(",") + ')"><div class="center"><b>' + fmtShort(total) + '</b><span>' + RISK_LABEL[risk] + "</span></div></div>" +
      '<div class="alloc-legend">' + legend + "</div>" +
      "</div>" +
      '<div class="tool-disclaimer">Cơ cấu trên là <b>danh mục mẫu mang tính tham khảo giáo dục</b>, không phải khuyến nghị đầu tư cá nhân. Tỷ lệ phù hợp còn phụ thuộc thu nhập, nợ vay, mục tiêu và thời điểm của riêng bạn.</div>' +
      leadCta("Phần <b>bất động sản</b> trong danh mục nên đặt vào đâu? PaceLand giúp bạn chọn đúng sản phẩm có dữ liệu — đúng chu kỳ.");
  }

  /* ================= 4. DÒNG TIỀN CHO THUÊ ================= */

  function calcCashflow() {
    var price = parseMoney($("cfPrice"));
    var equity = parseMoney($("cfEquity"));
    var rent = parseMoney($("cfRent"));
    var occ = Math.min(100, Math.max(10, num("cfOcc", 90))) / 100;
    var opex = Math.min(60, Math.max(0, num("cfOpex", 10))) / 100;
    var rate = num("cfRate", 10) / 100 / 12;
    var years = Math.min(35, Math.max(1, num("cfYears", 20)));
    var out = $("cfResult");

    if (price < 1e8 || rent < 1e5) {
      out.innerHTML = '<div class="placeholder">Vui lòng nhập giá mua (từ 100 triệu) và tiền thuê hằng tháng.</div>';
      return;
    }

    var loan = Math.max(0, price - equity);
    var pay = loan > 0 ? annuityPay(loan, rate, years * 12) : 0;
    var effRent = rent * occ;
    var opexAmt = effRent * opex;
    var noi = effRent - opexAmt;              /* thu ròng trước nợ vay */
    var netCF = noi - pay;
    var grossYield = rent * 12 / price * 100;
    var netYield = noi * 12 / price * 100;
    var coc = equity > 0 ? netCF * 12 / equity * 100 : 0;
    var payback = netCF > 0 && equity > 0 ? equity / (netCF * 12) : null;

    var verdict;
    if (netCF >= 0) {
      verdict = "Dòng tiền <b style='color:#1E7A3C'>dương " + fmtShort(netCF) + "/tháng</b> — tài sản tự nuôi chính nó sau khi trả ngân hàng.";
    } else {
      verdict = "Dòng tiền <b style='color:var(--red)'>âm " + fmtShort(Math.abs(netCF)) + "/tháng</b> — bạn cần bù thêm mỗi tháng; chỉ phù hợp khi kỳ vọng tăng giá đủ lớn.";
    }

    out.innerHTML =
      '<div class="kq-cards">' +
      kq("Dòng tiền ròng", (netCF >= 0 ? "+" : "−") + fmtShort(Math.abs(netCF)), "/tháng", netCF >= 0 ? "pos" : "neg", true) +
      kq("Trả ngân hàng", loan > 0 ? fmtShort(pay) : "Không vay", loan > 0 ? "/tháng" : "") +
      kq("Thu thuê thực nhận", fmtShort(noi), "/tháng") +
      kq("Lợi suất gộp", grossYield.toFixed(1).replace(".", ","), "%/năm") +
      kq("Lợi suất ròng", netYield.toFixed(1).replace(".", ","), "%/năm") +
      kq("Trên vốn tự có", (coc >= 0 ? "" : "−") + Math.abs(coc).toFixed(1).replace(".", ","), "%/năm", coc >= 0 ? "" : "neg") +
      "</div>" +
      '<p style="margin-top:1.1rem;font-size:.93rem;color:var(--ink-soft)">' + verdict +
      (payback ? " Hoàn vốn tự có ước tính sau <b>" + payback.toFixed(1).replace(".", ",") + " năm</b> (chưa tính tăng giá tài sản)." : "") + "</p>" +
      (equity > price ? '<p style="font-size:.8rem;color:var(--muted)">Vốn tự có lớn hơn giá mua nên không cần vay; phần dư chưa tính vào bài toán.</p>' : "") +
      leadCta("Muốn tìm sản phẩm <b>dòng tiền dương ngay từ ngày nhận nhà</b>? PaceLand đang giữ một số căn có hợp đồng thuê sẵn.");
  }

  /* ================= 5. ĐỊNH GIÁ BĐS ================= */

  /* Đơn giá tham chiếu (triệu đồng / m²) — cập nhật bằng cách sửa bảng này */
  var VAL_AREAS = [
    { id: "thuthiem", name: "Thủ Thiêm (TP. Thủ Đức)", lo: 120, hi: 220 },
    { id: "q1", name: "Quận 1", lo: 150, hi: 350 },
    { id: "thaodien", name: "Thảo Điền – An Phú", lo: 85, hi: 140 },
    { id: "khudong", name: "Khu Đông khác (TP. Thủ Đức)", lo: 55, hi: 90 },
    { id: "ttmr", name: "Trung tâm mở rộng (Bình Thạnh, Q3, Q10)", lo: 75, hi: 130 },
    { id: "khunam", name: "Khu Nam (Q7, Nhà Bè)", lo: 60, hi: 110 },
    { id: "vungven", name: "Vùng ven & tỉnh lân cận", lo: 30, hi: 55 }
  ];
  var VAL_TYPE = { canho: 1, nhapho: 1.15, bietthu: 1.25 };

  function calcValuation() {
    var area = VAL_AREAS.filter(function (a) { return a.id === $("vaArea").value; })[0] || VAL_AREAS[0];
    var size = Math.min(1000, Math.max(20, num("vaSize", 75)));
    var f = VAL_TYPE[$("vaType").value] || 1;
    if (segVal("vaView") === "yes") f *= 1.07;
    if (segVal("vaFurn") === "yes") f *= 1.05;
    if (segVal("vaLegal") === "hdmb") f *= 0.92;
    if (segVal("vaCond") === "used") f *= 0.93;

    var lo = area.lo * 1e6 * size * f;
    var hi = area.hi * 1e6 * size * f;
    var mid = (lo + hi) / 2;
    var unitLo = Math.round(area.lo * f), unitHi = Math.round(area.hi * f);

    $("vaResult").innerHTML =
      '<div class="kq-cards">' +
      kq("Thấp", fmtShort(lo)) +
      kq("Hợp lý (trung bình)", fmtShort(mid), "", "", true) +
      kq("Cao", fmtShort(hi)) +
      kq("Đơn giá sau điều chỉnh", unitLo + " – " + unitHi, "tr/m²") +
      "</div>" +
      '<div class="val-range"><div class="track"><span class="mark" style="left:50%"></span></div>' +
      '<div class="labels"><span>Thấp<b>' + fmtShort(lo) + '</b></span><span class="mid">Hợp lý<b>' + fmtShort(mid) + '</b></span><span class="hi">Cao<b>' + fmtShort(hi) + "</b></span></div></div>" +
      '<div class="tool-disclaimer">Khoảng giá dựa trên <b>đơn giá tham chiếu thị trường theo khu vực</b> và các hệ số điều chỉnh chung — chưa thay thế được thẩm định thực tế (vị trí chính xác, tầng, view, pháp lý chi tiết, thời điểm giao dịch).</div>' +
      leadCta("Cần con số chính xác để <b>mua, bán hay thế chấp</b>? Chuyên gia PaceLand thẩm định miễn phí dựa trên giao dịch thực tế cùng khu vực.");
  }

  /* ================= Khởi động ================= */

  document.addEventListener("DOMContentLoaded", function () {
    buildSwitcher();

    /* Nạp danh sách khu vực định giá */
    $("vaArea").innerHTML = VAL_AREAS.map(function (a) {
      return '<option value="' + a.id + '">' + a.name + "</option>";
    }).join("");

    ["lvMethod", "fsGender", "alAge", "alRisk", "vaLegal", "vaCond", "vaView", "vaFurn"].forEach(bindSeg);

    bindMoney("lvAmount", "lvAmountHint");
    bindMoney("alTotal", "alTotalHint");
    bindMoney("cfPrice", "cfPriceHint");
    bindMoney("cfEquity", "cfEquityHint");
    bindMoney("cfRent", "cfRentHint");

    $("lvCalc").addEventListener("click", calcLoan);
    $("fsCalc").addEventListener("click", calcFengshui);
    $("alCalc").addEventListener("click", calcAlloc);
    $("cfCalc").addEventListener("click", calcCashflow);
    $("vaCalc").addEventListener("click", calcValuation);

    /* Enter trong form = tính luôn */
    [["panel-lai-vay", calcLoan], ["panel-phong-thuy", calcFengshui], ["panel-phan-bo", calcAlloc], ["panel-dong-tien", calcCashflow], ["panel-dinh-gia", calcValuation]].forEach(function (p) {
      $(p[0]).addEventListener("keydown", function (e) {
        if (e.key === "Enter" && e.target.tagName === "INPUT") { e.preventDefault(); p[1](); }
      });
    });

    activateTool((location.hash || "#").replace("#", "") || TOOLS[0].id, false);
  });
})();
