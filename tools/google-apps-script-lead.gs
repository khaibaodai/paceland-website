/**
 * PACELAND — Bộ nhận LEAD (Google Apps Script)
 * Lead từ website đổ vào Google Sheet + gửi email báo + (tuỳ chọn) Telegram.
 *
 * CÁCH CÀI (5 phút — làm 1 lần):
 * 1. Vào sheets.google.com → tạo Sheet mới, đặt tên "PaceLand Leads"
 * 2. Menu Tiện ích mở rộng (Extensions) → Apps Script
 * 3. Xoá code mẫu, dán TOÀN BỘ file này vào → Lưu (Ctrl+S)
 * 4. Sửa 2 dòng CONFIG bên dưới (email nhận báo; Telegram để trống nếu chưa dùng)
 * 5. Bấm "Triển khai" (Deploy) → "Tuỳ chọn triển khai mới" (New deployment)
 *    → loại "Ứng dụng web" (Web app)
 *    → Execute as: Me · Who has access: Anyone (Bất kỳ ai)
 *    → Deploy → copy đường link dạng https://script.google.com/macros/s/…/exec
 * 6. Mở paceland.vn/admin.html → Cài đặt → "Nhận Lead" → dán link đó → Lưu & Xuất bản
 */

var CONFIG = {
  EMAIL_TO: "contact@paceland.vn",   // email nhận thông báo lead mới (đổi thành email của anh)
  TELEGRAM_BOT_TOKEN: "",            // tuỳ chọn: token bot Telegram (tạo qua @BotFather)
  TELEGRAM_CHAT_ID: ""               // tuỳ chọn: chat id nhận tin (lấy qua @userinfobot)
};

var HEADERS = ["Thời gian", "Họ tên", "SĐT", "Email", "Quan tâm", "Dự án", "Nội dung", "Nguồn", "Trang", "UTM/QC", "Thiết bị"];

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents || "{}");
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheets()[0];

    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADERS);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#C70018").setFontColor("#fff");
      sh.setFrozenRows(1);
    }

    var utm = d.utm || {};
    var utmText = Object.keys(utm).filter(function (k) { return k !== "ts"; })
      .map(function (k) { return k + "=" + utm[k]; }).join(" | ");

    sh.appendRow([
      new Date(),
      d.name || "",
      "'" + (d.phone || ""),           // dấu ' giữ số 0 đầu
      d.email || "",
      d.loai_can || d.interest || "",
      d.du_an || "",
      d.message || d.need || "",
      d.source || "form",
      d.page || "",
      utmText,
      d.ua || ""
    ]);

    var subject = "[LEAD MỚI] " + (d.name || "Khách") + " — " + (d.phone || "chưa có SĐT");
    var body =
      "Họ tên:   " + (d.name || "—") + "\n" +
      "SĐT:      " + (d.phone || "—") + "\n" +
      "Email:    " + (d.email || "—") + "\n" +
      "Quan tâm: " + (d.loai_can || d.interest || "—") + "\n" +
      "Dự án:    " + (d.du_an || "—") + "\n" +
      "Nội dung: " + (d.message || d.need || "—") + "\n" +
      "Nguồn:    " + (d.source || "form") + " · trang " + (d.page || "—") + "\n" +
      (utmText ? "Quảng cáo: " + utmText + "\n" : "") +
      "\nGọi lại ngay khi lead còn nóng! Sheet: " + ss.getUrl();
    if (CONFIG.EMAIL_TO) MailApp.sendEmail(CONFIG.EMAIL_TO, subject, body);

    if (CONFIG.TELEGRAM_BOT_TOKEN && CONFIG.TELEGRAM_CHAT_ID) {
      UrlFetchApp.fetch("https://api.telegram.org/bot" + CONFIG.TELEGRAM_BOT_TOKEN + "/sendMessage", {
        method: "post",
        payload: { chat_id: CONFIG.TELEGRAM_CHAT_ID, text: subject + "\n\n" + body },
        muteHttpExceptions: true
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/* Mở link /exec trên trình duyệt sẽ thấy dòng này = đã cài đúng */
function doGet() {
  return ContentService.createTextOutput("PaceLand Lead Receiver đang hoạt động ✓");
}
