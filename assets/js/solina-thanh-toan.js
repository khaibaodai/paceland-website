/* ============================================================
   solina-thanh-toan.js — máy tính dòng tiền Solina Signature by Wyndham
   Dùng chung cho /solina-signature.html (trang khách) và
   /salekit-solina-signature.html (trang nội bộ đội ngũ).

   Nguồn số: tài liệu thuyết trình bán hàng của chủ đầu tư ngày 27/11/2026.
   Mọi con số trang này tính ra là TẠM TÍNH; phiếu tính giá chính thức
   của chủ đầu tư là căn cứ cuối cùng.

   Màu thanh tỷ lệ: 5 hạng mục theo thứ tự cố định, đã chạy qua
   validate_palette.js (dark, surface #241B14, adjacent) — đạt toàn bộ
   gate ở cả 3 phương thức và ở chú giải 5 phần.
   ============================================================ */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };
  if (!$("scBar")) return; // trang không có máy tính

  /* ---------- 1. Dữ liệu ---------- */

  // Hạng mục dòng tiền — thứ tự cố định, màu gắn với hạng mục chứ không gắn với thứ hạng
  var BUCKETS = [
    { key: "pre",  label: "Khách trả trước bàn giao", color: "#3987e5" },
    { key: "bank", label: "Ngân hàng giải ngân",      color: "#199e70" },
    { key: "hand", label: "Khi bàn giao",             color: "#c98500" },
    { key: "post", label: "Sau bàn giao",             color: "#d55181" },
    { key: "gcn",  label: "Khi có thông báo GCN",     color: "#9085e9" }
  ];

  // Mỗi đợt: [tên đợt, mô tả thời điểm, % giá, mốc, ghi chú, số đợt con]
  // mốc: số = tháng thứ n sau đặt chỗ · "H" = khi bàn giao · "P" = sau bàn giao · "G" = khi có GCN
  var PLANS = {
    std: {
      name: "Chuẩn",
      tag: "Sở hữu với 10%",
      rows: [
        ["1", "≤10 ngày sau đặt chỗ", 10, 0, "Ký văn bản thỏa thuận"],
        ["2", "+30 ngày", 5, 1, ""],
        ["3", "+30 ngày", 5, 2, "Ký hợp đồng mua bán"],
        ["4–5", "30 ngày/đợt", 10, 3, "5%/đợt × 2 đợt", 2],
        ["6–20", "30 ngày/đợt", 7.5, 5, "0,5%/đợt × 15 đợt", 15],
        ["21", "+30 ngày", 5, 20, ""],
        ["22–36", "30 ngày/đợt", 7.5, 21, "0,5%/đợt × 15 đợt", 15],
        ["37", "Bàn giao dự kiến 12/2029", 45, "H", "Nhận nhà"],
        ["38", "7 ngày sau thông báo", 5, "G", "Thông báo cấp giấy chứng nhận"]
      ]
    },
    loan: {
      name: "Vay",
      tag: "Hỗ trợ lãi suất 0% trong 30 tháng",
      rows: [
        ["1", "≤10 ngày sau đặt chỗ", 10, 0, "Ký văn bản thỏa thuận"],
        ["2", "+30 ngày", 5, 1, "Ký hợp đồng mua bán"],
        ["3", "Theo tiến độ xây dựng", 50, "B", "Ngân hàng giải ngân"],
        ["4a", "Bàn giao dự kiến 12/2029", 20, "H", "Khách thanh toán"],
        ["4b", "Bàn giao dự kiến 12/2029", 10, "B", "Ngân hàng giải ngân"],
        ["5", "7 ngày sau thông báo", 5, "G", "Thông báo cấp giấy chứng nhận"]
      ]
    },
    ext: {
      name: "Giãn 2 năm",
      tag: "Nhận nhà và khai thác với 50%",
      rows: [
        ["1", "≤10 ngày sau đặt chỗ", 10, 0, "Ký văn bản thỏa thuận"],
        ["2", "+30 ngày", 5, 1, ""],
        ["3", "+30 ngày", 5, 2, "Ký hợp đồng mua bán"],
        ["4–5", "30 ngày/đợt", 10, 3, "5%/đợt × 2 đợt", 2],
        ["6–35", "30 ngày/đợt", 15, 5, "0,5%/đợt × 30 đợt", 30],
        ["36", "Bàn giao dự kiến 12/2029", 5, "H", "Nhận nhà"],
        ["37–43", "90 ngày/đợt sau bàn giao", 35, "P", "5%/đợt × 7 đợt", 7],
        ["44", "+90 ngày", 10, "P", "Đợt cuối sau bàn giao"],
        ["45", "7 ngày sau thông báo", 5, "G", "Thông báo cấp giấy chứng nhận"]
      ]
    }
  };

  var BOOKING = 50e6;      // đặt chỗ 50 triệu, ký bằng biên nhận riêng
  var method = "std";

  /* ---------- 2. Định dạng ---------- */
  var nf = function (n, d) { return n.toLocaleString("vi-VN", { maximumFractionDigits: d }); };
  var vnd = function (n) { return nf(Math.round(n), 0) + " đ"; };
  var short = function (n) {
    return n >= 1e9 ? nf(n / 1e9, 2) + " tỷ" : nf(n / 1e6, 1) + " triệu";
  };
  var pct = function (p) { return nf(p, 2) + "%"; };
  var monthOf = function (startISO, offset) {
    var d = new Date(startISO);
    if (isNaN(d)) d = new Date();
    d.setDate(d.getDate() + 10 + offset * 30);
    return ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
  };

  /* ---------- 3. Tính ---------- */
  function compute() {
    var listed = Math.max(0, parseFloat($("scPrice").value) || 0) * 1e9;
    var discount = $("scCk").checked ? listed * 0.05 : 0;
    var voucher = (parseFloat($("scVoucher").value) || 0) * 1e6;
    var net = Math.max(0, listed - discount - voucher);
    var plan = PLANS[method];
    var start = $("scStart").value || new Date().toISOString().slice(0, 10);

    var sums = { pre: 0, bank: 0, hand: 0, post: 0, gcn: 0 };
    var rows = [];
    var lines = [];

    plan.rows.forEach(function (r) {
      var amount = net * r[2] / 100;
      var mark = r[3];
      var bucket = mark === "G" ? "gcn" : mark === "B" ? "bank" : mark === "H" ? "hand" : mark === "P" ? "post" : "pre";
      sums[bucket] += amount;

      var when = r[1];
      if (typeof mark === "number") {
        when = r[5] ? monthOf(start, mark) + " → " + monthOf(start, mark + r[5] - 1) : monthOf(start, mark);
      }
      var each = r[5] ? short(amount / r[5]) : "";
      rows.push(
        '<tr' + (mark === "H" ? ' class="hl"' : "") + ">" +
        "<td>" + r[0] + "</td><td>" + when + '</td><td class="n">' + pct(r[2]) +
        '</td><td class="n">' + vnd(amount) + (each ? "<br><small>" + each + "/đợt</small>" : "") +
        "</td><td>" + (r[4] || "—") + "</td></tr>"
      );
      lines.push("Đợt " + r[0] + " · " + when + " · " + pct(r[2]) + " · " + vnd(amount) +
        (each ? " (mỗi đợt " + each + ")" : "") + (r[4] ? " · " + r[4] : ""));
    });

    return { listed: listed, discount: discount, voucher: voucher, net: net, plan: plan, sums: sums, rows: rows, lines: lines };
  }

  /* ---------- 4. Vẽ ---------- */
  function render() {
    var r = compute();

    $("scRows").innerHTML =
      '<tr><td>Đặt chỗ</td><td>Khi chọn căn</td><td class="n">—</td><td class="n">' + vnd(BOOKING) +
      "</td><td>Ký biên nhận đặt chỗ</td></tr>" + r.rows.join("");

    $("scNet").textContent = r.net > 0 ? short(r.net) : "—";
    // Chỉ tính phần khách trả TRƯỚC thời điểm nhận nhà — khoản khi bàn giao
    // nằm riêng ở thanh tỷ lệ, để không lẫn hai cách gộp số
    $("scPre").textContent = r.net > 0 ? short(r.sums.pre) : "—";
    $("scPreCap").textContent = method === "loan"
      ? "Khách tự trả trước khi nhận nhà, phần còn lại ngân hàng giải ngân"
      : "Khách trả trước thời điểm nhận nhà";

    var monthly = method === "loan" ? 0 : r.net * 0.005;
    $("scMo").textContent = monthly ? short(monthly) : "0%";
    $("scMoCap").textContent = monthly
      ? "Mỗi đợt 30 ngày trong giai đoạn xây dựng (0,5%)"
      : "Lãi suất ngân hàng được hỗ trợ trong 30 tháng";

    // Thanh một tổng chia phần — bỏ hạng mục bằng 0
    var parts = BUCKETS.filter(function (b) { return r.sums[b.key] > 0; });
    $("scBar").innerHTML = parts.map(function (b) {
      var amount = r.sums[b.key];
      var share = amount / r.net * 100;
      var name = b.label + ": " + short(amount) + ", " + nf(share, 0) + "% giá căn";
      // Khối quá hẹp thì bỏ chữ, số vẫn nằm ở chú giải và bảng lịch bên dưới
      var inner = share >= 8 ? nf(share, 0) + "%" : "";
      return '<span tabindex="0" style="flex-basis:' + share + "%;background:" + b.color +
        '" title="' + name + '" aria-label="' + name + '">' + inner + "</span>";
    }).join("");
    $("scBar").setAttribute("aria-label", "Cơ cấu dòng tiền phương thức " + r.plan.name +
      ", tổng " + short(r.net) + ": " + parts.map(function (b) {
        return b.label + " " + short(r.sums[b.key]);
      }).join("; "));

    // Chú giải theo đúng thứ tự khối, nêu số tiền (phần trăm đã in trong khối)
    $("scLegend").innerHTML = parts.map(function (b) {
      return '<span><i style="background:' + b.color + '"></i><b>' + b.label + "</b> · " + short(r.sums[b.key]) + "</span>";
    }).join("");

    // Văn bản gửi khách
    var towerEl = $("scTower");
    var towerName = towerEl && towerEl.options[towerEl.selectedIndex]
      ? towerEl.options[towerEl.selectedIndex].text : "";
    window.SOLINA_TEXT = [
      "SOLINA SIGNATURE BY WYNDHAM — lịch thanh toán tạm tính",
      towerName ? "Căn tham chiếu: " + towerName : null,
      "Phương thức: " + r.plan.name + " (" + r.plan.tag + ")",
      "Giá niêm yết: " + vnd(r.listed) + " (chưa VAT và phí bảo trì)",
      r.discount ? "Chiết khấu khách C-Holdings 5%: −" + vnd(r.discount) : null,
      r.voucher ? "Voucher booking: −" + vnd(r.voucher) : null,
      "Giá tạm tính sau ưu đãi: " + vnd(r.net),
      "Đặt chỗ: " + vnd(BOOKING) + " (ký biên nhận riêng)",
      ""
    ].filter(Boolean).concat(r.lines).concat([
      "",
      "Bàn giao dự kiến 12/2029. Số liệu tạm tính theo tài liệu chủ đầu tư ngày 27/11/2026,",
      "căn cứ cuối cùng là phiếu tính giá và hợp đồng chính thức của chủ đầu tư."
    ]).join("\n");
  }

  /* ---------- 5. Nối sự kiện ---------- */
  var tower = $("scTower");
  if (tower) {
    tower.addEventListener("change", function () {
      var opt = tower.options[tower.selectedIndex];
      var p = opt && opt.dataset.price;
      if (p) $("scPrice").value = p;
      render();
    });
  }
  ["scPrice", "scVoucher", "scCk", "scStart"].forEach(function (id) {
    var el = $(id);
    if (el) el.addEventListener("input", render);
  });
  var seg = $("scMethod");
  if (seg) {
    seg.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-method]");
      if (!b) return;
      method = b.dataset.method;
      Array.prototype.forEach.call(seg.querySelectorAll("button[data-method]"), function (x) {
        x.setAttribute("aria-pressed", String(x === b));
      });
      render();
    });
  }
  var form = $("scForm");
  if (form) form.addEventListener("submit", function (e) { e.preventDefault(); });

  var copy = $("scCopy");
  if (copy) {
    copy.addEventListener("click", function () {
      var flash = $("scCopied");
      var done = function (msg) { if (flash) { flash.textContent = msg; setTimeout(function () { flash.textContent = ""; }, 4000); } };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.SOLINA_TEXT).then(
          function () { done("Đã sao chép lịch thanh toán."); },
          function () { done("Trình duyệt chặn sao chép — bôi đen bảng để copy."); }
        );
      } else {
        done("Trình duyệt chặn sao chép — bôi đen bảng để copy.");
      }
    });
  }

  /* ---------- 6. Khởi tạo ---------- */
  var startEl = $("scStart");
  if (startEl && !startEl.value) startEl.value = new Date().toISOString().slice(0, 10);
  render();
})();
