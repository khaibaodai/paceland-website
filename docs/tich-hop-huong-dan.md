# Hướng dẫn tích hợp — Tracking, Lead, Chatbot, Bảo mật

Dành cho anh Khải. Mỗi mục là 1 việc độc lập, làm lúc nào cũng được. Xong mục nào thì dán ID vào **Admin → Cài đặt → 📈 Tracking & Nhận Lead** rồi bấm Lưu + Xuất bản.

---

## 1. Nhận Lead về Google Sheet + email (QUAN TRỌNG NHẤT — ~5 phút)

Hiện form trên web chưa nối đi đâu. Làm mục này xong: mọi form + chatbot đổ lead vào Google Sheet của anh, kèm email báo ngay từng lead.

1. Vào **sheets.google.com** → tạo bảng tính mới, đặt tên `PaceLand Leads`
2. Menu **Tiện ích mở rộng → Apps Script**
3. Xoá hết code mẫu, mở file `tools/google-apps-script-lead.gs` trong thư mục website, **copy toàn bộ dán vào** → sửa dòng `EMAIL_TO` thành email của anh → Lưu (Ctrl+S)
4. Bấm **Triển khai → Tuỳ chọn triển khai mới** → chọn loại **Ứng dụng web**
   - *Thực thi bằng*: **Tôi**
   - *Ai có quyền truy cập*: **Bất kỳ ai**
   - Bấm Triển khai → cấp quyền (Google hỏi thì chọn Cho phép)
5. Copy đường link dạng `https://script.google.com/macros/s/AKfy.../exec`
6. Mở **Admin → Cài đặt → Tracking & Nhận Lead** → dán vào ô **Link nhận Lead** → Lưu → Xuất bản
7. Thử: mở link `/exec` trên trình duyệt thấy chữ "PaceLand Lead Receiver đang hoạt động ✓" là chuẩn

Mỗi lead sẽ có: thời gian, tên, SĐT, nhu cầu, ngân sách, nguồn (form hay chatbot), trang khách đang xem, và **quảng cáo nào dẫn khách tới** (UTM) — đủ dữ liệu chấm điểm kênh nào ra tiền.

**Nâng cấp (tuỳ chọn) — báo lead qua Telegram:** chat với @BotFather trên Telegram → `/newbot` → lấy token; chat với @userinfobot lấy chat id → điền 2 dòng `TELEGRAM_...` trong Apps Script → Triển khai lại.

## 2. Google Analytics 4 (đo ai vào web — miễn phí)

1. **analytics.google.com** → Bắt đầu đo lường → tạo tài khoản "PaceLand" → tạo Thuộc tính "paceland.vn" (múi giờ VN, tiền VND)
2. Chọn nền tảng **Web** → nhập `https://paceland.vn` → tạo Luồng dữ liệu
3. Copy **Measurement ID** dạng `G-ABC123XYZ`
4. Dán vào Admin → ô **Google Analytics 4** → Lưu → Xuất bản

Web tự gắn sự kiện sẵn: `generate_lead` (gửi form/chat), `tel_click` (bấm gọi), `zalo_click` — vào GA4 xem mục Sự kiện là thấy.

## 3. Google Ads (khi chạy quảng cáo Google)

1. Trong tài khoản Google Ads → **Công cụ → Đo lường → Lượt chuyển đổi** → tạo chuyển đổi loại "Trang web" → chọn "Khách hàng tiềm năng"
2. Lấy **Conversion ID** dạng `AW-123456789` và **Label** dạng `AbCdEfGh`
3. Dán cả 2 vào Admin → Lưu → Xuất bản
→ Từ đó mỗi lead trên web được tính là 1 chuyển đổi trong Google Ads (đấu giá thông minh hoạt động đúng).

## 4. Meta Pixel (khi chạy quảng cáo Facebook)

1. **business.facebook.com** → Trình quản lý sự kiện → Kết nối nguồn dữ liệu → Web → tạo Pixel "PaceLand"
2. Copy **Pixel ID** (dãy số)
3. Dán vào Admin → Lưu → Xuất bản
→ Web tự bắn sự kiện `PageView` + `Lead` — dùng để tối ưu và tạo tệp đối tượng giống khách đã để lại SĐT.

## 5. Chatbot (đã chạy sẵn — không cần cài gì)

Nút **"Hỏi PaceLand"** góc trái dưới mọi trang: trả lời từ kho 35 câu Hỏi-Đáp, dẫn khách 3 bước (nhu cầu → ngân sách → SĐT) rồi đổ lead về Sheet như form. Muốn sửa câu trả lời nhanh: sửa FAQ trong Admin (chatbot đọc chung kho); các câu trả lời "lối tắt" nằm trong `assets/js/components.js` mục `CHAT_SHORTCUTS` — nhắn Claude sửa hộ.

## 6. Bảo mật — đã siết những gì & anh cần biết

**Đã làm:**
- Header bảo mật toàn site (chặn nhúng iframe trang mình vào web khác, chặn đoán kiểu file, ẩn referrer nhạy cảm, HSTS ép HTTPS)
- Trang admin: chặn máy tìm kiếm (noindex) + robots.txt cấm bot vào /admin.html
- Form + chatbot: bẫy honeypot chống bot spam + chặn gửi quá nhanh (<3 giây)
- Không có API key nào nằm trong code public; tracking ID (GA4/Pixel) là ID công khai, không phải bí mật

**Anh cần nhớ 3 điều:**
1. Mật khẩu Admin chỉ là **rèm che, không phải két sắt** (site tĩnh không có server kiểm tra thật). An toàn nằm ở chỗ: đừng chia sẻ link /admin.html, và quan trọng nhất là **GitHub token**.
2. GitHub token dán trong Admin: hãy dùng loại **Fine-grained token** — github.com → Settings → Developer settings → Fine-grained tokens → chỉ chọn repo `paceland-website`, quyền duy nhất **Contents: Read & Write**, hạn 90 ngày. Nếu lộ token: vào GitHub xoá token là xong (tạo cái mới dán lại).
3. Lead nằm trong Google Sheet của anh — đừng chia sẻ Sheet công khai; chia sẻ theo email cụ thể cho nhân viên.

## 7. Việc còn chờ

- **Netlify hết credit** → thêm credit rồi báo Claude deploy (mọi thứ ở trên đã sẵn trong code, chỉ chờ lên sóng)
- Khuyến nghị: sau khi có credit, vào Netlify → Site settings → **Build & deploy → Link to Git repository** → chọn `khaibaodai/paceland-website`. Từ đó: Admin bấm Xuất bản → GitHub tự prerender → Netlify tự deploy — **không cần Claude cũng đăng được bài**.
