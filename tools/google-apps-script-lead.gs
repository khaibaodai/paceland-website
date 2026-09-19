/**
 * PACELAND — Bộ nhận LEAD + HỒ SƠ ỨNG TUYỂN (Google Apps Script)
 * Lead khách mua đổ vào sheet đầu tiên; hồ sơ ứng tuyển (kind=application) vào sheet "Ứng viên"
 * có cột Trạng thái (NEW → HIRED/REJECTED) làm pipeline tuyển dụng. Kèm email báo + (tuỳ chọn) Telegram.
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

/* ---------- HỒ SƠ ỨNG TUYỂN (kind = "application") — ATS nhẹ trên Google Sheet ---------- */
var APP_SHEET = "Ứng viên";
var APP_STATUS = ["NEW", "CONTACTED", "SCREENING", "INTERVIEW", "OFFER", "HIRED", "REJECTED", "ARCHIVED"];
var APP_HEADERS = ["Thời gian", "Mã hồ sơ", "Trạng thái", "Họ tên", "SĐT", "Email", "Vị trí", "Kinh nghiệm", "Link hồ sơ", "Lời nhắn",
  "Trang nguồn", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid", "ttclid",
  "Trang đích đầu", "Referrer", "Thiết bị", "Ghi chú tuyển dụng"];

function cut(v, n) { return String(v == null ? "" : v).slice(0, n || 300); }
/* Ô nhập từ người dùng: chặn "formula injection" — chuỗi bắt đầu bằng = + - @ sẽ được Sheet
   hiểu là công thức, nên thêm dấu ' để luôn hiển thị như văn bản */
function cell(v, n) { var s = cut(v, n); return /^[=+\-@\t\r]/.test(s) ? "'" + s : s; }

function handleApplication(d, ss) {
  var phone = String(d.phone || "").replace(/\D/g, "");
  if (!d.full_name || !/^0\d{9}$/.test(phone)) return { ok: false, error: "invalid" };
  /* Chống gửi trùng: cùng SĐT trong 10 phút chỉ nhận 1 lần (đánh dấu SAU khi đã ghi được vào Sheet) */
  var cache = CacheService.getScriptCache();
  if (cache.get("app_" + phone)) return { ok: true, duplicate: true };

  var sh = ss.getSheetByName(APP_SHEET) || ss.insertSheet(APP_SHEET);
  if (sh.getLastRow() === 0) {
    sh.appendRow(APP_HEADERS);
    sh.getRange(1, 1, 1, APP_HEADERS.length).setFontWeight("bold").setBackground("#0E0C0A").setFontColor("#fff");
    sh.setFrozenRows(1);
  }
  sh.appendRow([
    new Date(), cell(d.id, 40), "NEW", cell(d.full_name, 80), "'" + phone, cell(d.email, 120), cell(d.position, 120),
    cell(d.experience, 80), cell(d.profile_url, 300), cell(d.message, 1000), cell(d.source_page, 200),
    cell(d.utm_source, 150), cell(d.utm_medium, 150), cell(d.utm_campaign, 150), cell(d.utm_content, 150), cell(d.utm_term, 150),
    cell(d.gclid, 150), cell(d.fbclid, 150), cell(d.ttclid, 150), cell(d.landing_page, 200), cell(d.referrer, 200), cell(d.device_type, 20),
    d.spam_suspect ? "Gửi rất nhanh sau khi mở trang — kiểm tra trước khi gọi" : ""
  ]);
  cache.put("app_" + phone, "1", 600);
  /* Cột Trạng thái: dropdown theo pipeline tuyển dụng */
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(APP_STATUS, true).build();
  sh.getRange(sh.getLastRow(), 3).setDataValidation(rule);

  var subject = "[ỨNG TUYỂN] " + cut(d.position, 80) + " — " + cut(d.full_name, 60);
  var body =
    "Mã hồ sơ:   " + (d.id || "—") + "\n" +
    "Họ tên:     " + (d.full_name || "—") + "\n" +
    "SĐT:        " + phone + "\n" +
    "Email:      " + (d.email || "—") + "\n" +
    "Vị trí:     " + (d.position || "—") + "\n" +
    "Kinh nghiệm:" + " " + (d.experience || "—") + "\n" +
    "Link hồ sơ: " + (d.profile_url || "—") + "\n" +
    "Lời nhắn:   " + (d.message || "—") + "\n" +
    "Nguồn:      " + (d.utm_source || "trực tiếp") + (d.utm_campaign ? " / " + d.utm_campaign : "") + " · trang " + (d.source_page || "—") + "\n" +
    "\nCập nhật cột Trạng thái trong sheet: " + ss.getUrl();
  if (CONFIG.EMAIL_TO) MailApp.sendEmail(CONFIG.EMAIL_TO, subject, body);
  return { ok: true };
}

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents || "{}");
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (d.kind === "application") {
      return ContentService.createTextOutput(JSON.stringify(handleApplication(d, ss))).setMimeType(ContentService.MimeType.JSON);
    }
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
      cell(d.name, 120),
      "'" + cut(d.phone, 30),          // dấu ' giữ số 0 đầu
      cell(d.email, 120),
      cell(d.loai_can || d.interest, 200),
      cell(d.du_an, 200),
      cell(d.message || d.need, 1500),
      cell(d.source || "form", 80),
      cell(d.page, 300),
      cell(utmText, 500),
      cell(d.ua, 300)
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
