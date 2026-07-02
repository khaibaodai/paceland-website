# Website PaceLand

Website giới thiệu & quỹ dự án cho **Công Ty Cổ Phần Đầu Tư Pace Land** — *Kiến tạo giá trị thịnh vượng*.

Đây là website **tĩnh** (HTML + CSS + JavaScript thuần), không cần cài đặt, không cần database. Mở là chạy, đăng host ở đâu cũng được.

---

## 1. Cách xem website

**Cách nhanh nhất:** nhấp đúp vào file `index.html` → mở bằng trình duyệt (Chrome/Edge).

**Cách chuẩn hơn** (để mọi tính năng chạy mượt), mở Terminal/PowerShell tại thư mục này và chạy 1 trong 2 lệnh:

```bash
# Nếu có Python
python -m http.server 8000

# Nếu có Node.js
npx serve
```

Rồi mở trình duyệt vào `http://localhost:8000`.

---

## 2. Các trang

| File | Trang |
|------|-------|
| `index.html` | Trang chủ |
| `du-an.html` | Danh sách dự án (có bộ lọc) |
| `du-an-chi-tiet.html` | Chi tiết dự án (mở qua `?id=...`) |
| `gioi-thieu.html` | Giới thiệu |
| `doi-tac.html` | Đối tác |
| `goc-nhin.html` | Góc nhìn (blog) |
| `bai-viet.html` | Trang đọc bài (mở qua `?id=...`) |
| `lien-he.html` | Liên hệ |
| `tuyen-dung.html` | Tuyển dụng |
| `faq.html` | Câu hỏi thường gặp |
| `admin.html` | 🔐 Trang quản trị nội dung (CMS) |

Bố cục dùng chung (menu trên + chân trang + nút Zalo nổi) nằm trong `assets/js/components.js` — **sửa 1 lần, áp dụng mọi trang**.

---

## 🔐 Trang quản trị nội dung (Admin CMS)

Mở **`admin.html`** (ví dụ `http://localhost:8000/admin.html`) để quản lý nội dung mà **không cần đụng tới code**.

- **Truy cập:** mở `admin.html` trực tiếp, hoặc bấm link **“Quản trị”** ở chân trang.
- **Mật khẩu mặc định:** `paceland2026` (gợi ý ngay trên màn đăng nhập) — đổi trong tab **Cài đặt**.
- Quản lý: **Dự án · Bài viết · Tuyển dụng · Câu hỏi (FAQ) · Thư viện ảnh · Trang (Nội dung) · Cài đặt**.
- ✏️ **Trang (Nội dung):** sửa các đoạn chữ chính của từng trang (tiêu đề hero, mô tả, CTA, nhà sáng lập…) — không cần đụng code.
- 🖼️ **Cài đặt → Ảnh chia sẻ (OG):** tải ảnh lên → tự cắt 1200×630 (tuỳ chọn phủ logo + slogan) → bấm tải `og-image.jpg` → chép đè vào `assets/img/`.
- 📸 **Thư viện ảnh / video:** tải ảnh/video của bạn lên (tự nén, xem trước ngay trong admin). Trong form Dự án/Bài viết bấm **⬆ Tải ảnh** để dùng ảnh thật. **Đăng lên web thật:** ở tab Thư viện bấm **Tải** từng tệp → bỏ vào thư mục `assets/img/media/` → **Xuất file data.js**. (Web tĩnh không tự lưu ảnh lên máy chủ, nên cần bước chép file này.)
- Mọi thay đổi **tự lưu vào trình duyệt** và hiển thị ngay khi bạn xem website trên cùng máy.
- **Để đăng lên website thật:** bấm **“Xuất file data.js”** → nhận file `data.js` → chép đè vào `assets/js/data.js` rồi đăng lại (hoặc kéo–thả lại thư mục lên Netlify).
- **Sao lưu / Khôi phục:** xuất hoặc nhập file `.json` để giữ bản dự phòng nội dung.

> Đây là CMS chạy phía trình duyệt (không cần máy chủ/database) — phù hợp một người quản trị. Nếu sau này cần nhiều người dùng và tự động đăng, có thể nâng cấp lên CMS có máy chủ.

---

## 3. Việc bạn cần làm (quan trọng)

### 🔴 a. Kích hoạt form liên hệ để nhận khách
Mặc định form đang chạy ở "chế độ demo" (bấm gửi báo thành công nhưng chưa gửi đi đâu).
Để nhận lead về email, làm 2 bước miễn phí:
1. Vào **https://formspree.io** → đăng ký → tạo 1 form → copy mã endpoint (dạng `https://formspree.io/f/abcxyz`).
2. Mở `assets/js/data.js`, tìm dòng `formEndpoint:` và dán mã của bạn vào thay cho `https://formspree.io/f/your-form-id` — **hoặc** dán vào ô **“Form endpoint”** trong tab **Cài đặt** của trang quản trị (`admin.html`).

Xong! Mọi form trên website sẽ tự gửi lead về email của bạn.

### 🟡 b. Thay ảnh thật
- **Ảnh dự án** hiện đang dùng ảnh mẫu miễn phí bản quyền (Unsplash). Để thay: xem mục 4 bên dưới.
- **Logo** đã dùng logo thật của bạn trong `assets/img/` (`logo.png`, `logo-white.png`, `icon.png`).
- **Ảnh nhà sáng lập:** lưu ảnh chân dung vào đúng đường dẫn `assets/img/founder.jpg` → tự hiện ở mục “Nhà sáng lập” trang Giới thiệu (nếu chưa có sẽ hiện ô nhắc).
- Những chỗ cần ảnh riêng của công ty, mình đã chú thích trong nội dung — bạn gửi mình ảnh, mình chèn vào.

### 🟡 c. Cập nhật thông tin & số liệu
Mở `assets/js/data.js` để sửa:
- `SITE`: tên, hotline, email, địa chỉ, Zalo, mạng xã hội.
- `PROJECTS`: danh sách dự án (giá, diện tích… hiện là **số liệu mẫu**, hãy thay bằng số liệu chính thức).
- `POSTS`: bài viết góc nhìn.

---

## 4. Thêm / sửa một dự án

Mở `assets/js/data.js`, copy một khối trong `PROJECTS` rồi sửa. Các trường:

```js
{
  id: "ten-khong-dau",          // dùng cho link, không dấu, không cách
  name: "Tên dự án",
  developer: "Chủ đầu tư",
  location: "Phường, Quận/TP",
  area: "Khu Đông",             // phải khớp 1 mục trong FILTERS.area
  segment: "Hạng sang",          // khớp FILTERS.segment
  type: "Căn hộ",                // khớp FILTERS.type
  status: "Off-market",          // "Off-market" | "Đang mở bán" | "Sắp ra mắt"
  offmarket: true,
  badge: "Biên lợi nhuận cao",   // nhãn nhỏ
  priceText: "Từ 8,5 tỉ",
  priceValue: 8.5,               // số tỉ — dùng cho bộ lọc giá
  beds: "1–3 PN",
  size: "50 – 121 m²",
  handover: "2027",
  cover: "1545324418-cc1a3fa10c00",        // mã ảnh Unsplash (phần sau "photo-")
  gallery: ["id1","id2","id3","id4"],      // các mã ảnh
  short: "Mô tả ngắn 1 câu.",
  description: ["Đoạn 1.", "Đoạn 2."],
  amenities: ["Tiện ích 1", "Tiện ích 2"]
}
```

**Lấy mã ảnh Unsplash:** mở ảnh trên unsplash.com, URL có dạng `unsplash.com/photos/abc-1545324418-cc1a3fa10c00` → lấy phần `1545324418-cc1a3fa10c00`.
**Dùng ảnh của bạn:** bỏ ảnh vào `assets/img/`, rồi báo mình đổi cách nạp ảnh sang ảnh nội bộ (hoặc tự sửa hàm `ph()` trong `data.js`).

---

## 5. Đăng website lên mạng (miễn phí)

**Cách dễ nhất — Netlify Drop:**
1. Vào **https://app.netlify.com/drop**
2. Kéo–thả **cả thư mục** `PaceLand-Website` vào trang.
3. Vài giây sau bạn có 1 đường link chạy thật. Có thể gắn tên miền `paceland.vn` sau.

Ngoài ra có thể dùng **Vercel**, **GitHub Pages**, hoặc upload lên hosting thường (chỉ cần đẩy toàn bộ file lên thư mục `public_html`).

---

## 6. Cấu trúc thư mục

```
PaceLand-Website/
├── index.html, du-an.html, ...      (các trang)
├── assets/
│   ├── css/styles.css               (toàn bộ giao diện)
│   ├── js/
│   │   ├── data.js                  (NỘI DUNG: dự án, bài viết, thông tin)
│   │   ├── components.js            (menu, chân trang, thẻ dự án)
│   │   └── main.js                  (tương tác: lọc, lightbox, form…)
│   └── img/                         (logo + ảnh của bạn)
└── README.md
```

---

## 📣 Chia sẻ mạng xã hội & SEO

Website đã được tối ưu sẵn:
- **Ảnh khi chia sẻ** (Facebook/Zalo/Twitter…): `assets/img/og-image.jpg` (1200×630, có logo + slogan). Muốn đổi: thay file này.
- **Nội dung khi chia sẻ:** mỗi trang có thẻ Open Graph + Twitter Card (tiêu đề, mô tả, ảnh) riêng.
- **SEO:** thẻ `keywords`, `canonical`, dữ liệu có cấu trúc (JSON-LD `RealEstateAgent`), `sitemap.xml` và `robots.txt`.

> ⚠️ **Quan trọng về tên miền:** các thẻ chia sẻ/SEO đang dùng `https://paceland.vn`. Nếu bạn đăng tạm ở tên miền khác (VD Netlify), hãy tìm–thay `paceland.vn` thành tên miền thật, hoặc trỏ `paceland.vn` về site. Sau khi đăng, kiểm tra preview tại **opengraph.xyz** hoặc **Facebook Sharing Debugger**, và khai báo `sitemap.xml` trong **Google Search Console**.

---

## 7. Ghi chú

- **Font:** Playfair Display (tiêu đề lớn, sang trọng) · Be Vietnam Pro (nội dung, tối ưu tiếng Việt) — tải từ Google Fonts, cần Internet khi xem.
- **Màu thương hiệu:** đỏ `#C70018`, vàng gold `#B0894A`, nền ngà `#F6F2EA` (đổi trong `assets/css/styles.css`, phần `:root`).
- **Tối ưu ảnh logo:** 3 file logo hiện khá nặng — nên nén lại (tinypng.com) để web tải nhanh hơn.
- **Ảnh dự án** là ảnh minh hoạ miễn phí bản quyền; hãy thay bằng ảnh chính thức của dự án trước khi chạy quảng cáo.
```
