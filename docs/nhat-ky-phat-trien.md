# Nhật ký phát triển — Website PaceLand

> Ghi lại toàn bộ hành trình xây dựng website từ nhật ký chat (Claude Code).
> **Nguồn:** phiên "PaceLand website redesign" (`session-export-1783704804194`), Claude Sonnet 5, 46 lượt/66 tin nhắn.
> **Khoảng thời gian:** 21/06/2026 → 07/07/2026. Tổng hợp ngày 13/07/2026.

---

## Tổng quan

Website giới thiệu & quỹ dự án cho **Công Ty CP Đầu Tư Pace Land** — mạng lưới bất động sản kín, căn hộ hạng sang TP.HCM. Mục tiêu lớn nhất: **thu hút khách hàng tiềm năng để lại Lead qua kênh tự nhiên — đặc biệt khi khách hỏi AI (ChatGPT/Gemini/Claude/Perplexity) và được AI gợi ý PaceLand** (GEO — Generative Engine Optimization).

**Quyết định kiến trúc quan trọng:** ban đầu có project Next.js + Prisma + NextAuth (`F:\VSCode for Claude\Website PaceLand`), nhưng đã **chuyển sang site tĩnh thuần** (HTML/CSS/JS + `data.js`) tại `F:\VSCode for Claude\PaceLand-Website` — lý do: anh Khải dùng low-code, muốn deploy hosting miễn phí, một người quản trị. CMS chạy hoàn toàn phía trình duyệt.

---

## Dòng thời gian theo giai đoạn

### Giai đoạn 1 — Khởi tạo & thương hiệu (21/06)
- Review project cũ, tham khảo UX/UI real estate (Dribbble), đọc dữ liệu NotebookLM PaceLand. Dùng skill *brainstorming*.
- Dựng bộ khung site tĩnh, hệ thống thương hiệu: đỏ `#C70018`, nền ngà `#F6F2EA`, gold `#B0894A`.
- Nén logo (3 file logo nặng), chỉnh kích thước logo, **đổi font** cho sang hơn (chốt hướng PP Neue Montreal cho headline).
- Ẩn số % cổ phần đối tác (0.5–2%) → thay bằng CTA "liên hệ để biết chi tiết".
- Sửa lỗi đè chữ ở lộ trình sự nghiệp (01–02–03).
- Dựng **Admin CMS** (mật khẩu mặc định `paceland2026`), sửa lỗi trang admin bị mờ/không đăng nhập được.

### Giai đoạn 2 — Nội dung & thư viện ảnh (22/06)
- Thêm **Thư viện ảnh/video** (IndexedDB) + upload ảnh ngay trong form CMS, xem trước trong admin.
- Thêm chức năng sửa nội dung từng trang (tab "Trang") + ảnh chia sẻ OG trong Cài đặt.
- **Tra cứu thông tin thật từng dự án** (chủ đầu tư, vị trí, quy mô, giá) → cập nhật chính xác vào `data.js` (mô tả tự viết, không sao chép nội dung có bản quyền).
- Anh Khải tự upload ảnh dự án thật vào `assets/img/media/` (đặt tên chi tiết) → chuyển toàn bộ `cover`/`gallery` từ mã Unsplash sang ảnh local.

### Giai đoạn 3 — Deploy & đồng bộ ảnh (22–23/06)
- Chuyển hướng: anh muốn **upload ảnh trực tiếp trên admin → tự cập nhật lên web**. Chọn hosting miễn phí.
- Thiết lập chuỗi: **GitHub (`khaibaodai/paceland-website`) + Cloudinary + Netlify (`paceland.vn`)**.
- Xử lý loạt lỗi deploy: "Failed to fetch", "bad credentials", "this repository is empty" — do token/repo chưa đúng.
- Cơ chế phá cache bằng version query (`data.js?v=N`, `styles.css?v=N`) — nguồn gốc lỗi "đổi nội dung nhưng trình duyệt khác không cập nhật".

### Giai đoạn 4 — Motion & Hero (24–25/06)
- Thêm **animation/motion** toàn site (dứt khoát, tôn trọng `prefers-reduced-motion`).
- **Hero full ảnh slideshow** ở section đầu trang chủ + tab Cài đặt CMS chọn ảnh chạy Hero (lưu `hero-slides.json`).
- Tư vấn kích thước/màu Hero tối ưu + 3 prompt tạo ảnh Hero cho ChatGPT.

### Giai đoạn 5 — Nâng cấp lớn: Công cụ + Landing + Blog (01–03/07)
- Sửa dứt điểm lỗi cache ảnh bìa (theo file `data.js` anh gửi).
- **Công cụ tài sản** (`cong-cu.html`): tính lãi vay ngân hàng, xem phong thuỷ theo tuổi, phân bổ tài sản, dòng tiền cho thuê, định giá bất động sản.
- **Landing page dự án Gladia Heights** (`gladia-heights.html`).
- **Chiến lược GEO** — brainstorm quy trình nội dung để khách hỏi AI được gợi ý PaceLand → viết `docs/quy-trinh-noi-dung-GEO.md` (ngân hàng 60 câu hỏi, khuôn bài "AI đọc trước, người đọc sau").
- Viết **10 bài blog thị trường Khu Đông TP.HCM** (tổng cộng site đạt 18 bài).
- Dựng nền GEO: `robots.txt` (mời đích danh bot AI), `llms.txt`, prerender (`tools/prerender.mjs`), schema JSON-LD, sitemap tự sinh.
- Thiết lập **CMS chuẩn**: tracking (GA4/Google Ads/Meta Pixel), nhận Lead (Google Apps Script → Sheet + email), chatbot "Hỏi PaceLand" (kho 35 FAQ), header bảo mật, xuất bản qua GitHub API. Viết `docs/tich-hop-huong-dan.md`.
- **MCP server** (`tools/mcp/server.mjs`): tool `paceland_tong_quan`, `paceland_prerender`, `paceland_danh_sach_bai`.

### Giai đoạn 6 — Liên hệ thật & Chứng nhận Đối tác (03 & 07/07)
- Cập nhật **Google Maps / Facebook / YouTube** bằng link thật.
- **Chứng nhận Đối tác** (`chung-nhan-doi-tac.html`) — chống mạo danh: khách nhập mã (VD `PL-0001`) hoặc tên → 3 kết quả: ✓ đang hợp tác / ⚠ đã ngừng hợp tác (cảnh báo đỏ) / ✗ không tìm thấy. Kèm tab CMS quản lý (thêm/sửa/xoá, mã tự sinh).
- Ban đầu chỉ đưa **1 người thật** — nhà sáng lập **Võ Văn Phước (PL-0001)** — không bịa nhân viên/thành tích (trang xây uy tín).
- Chuyển `renderCard`/`photoHtml`... sang `components.js` dùng chung client + prerender.
- Sửa lỗi ngầm nút "Xuất file data.js" (thiếu cơ chế chống mất bài/FAQ, phát sinh từ đợt GEO).
- Prerender: **38 URL** trong sitemap. Push GitHub. Test kỹ qua trình duyệt.

---

## Trạng thái chốt (07/07/2026)

**Nội dung:** 9 dự án · 18 bài blog · 35 FAQ (9 nhóm) · 1 đối tác (founder).

**Đã hoàn tất & test:** site tĩnh đầy đủ trang, Admin CMS (Dự án/Bài viết/Tuyển dụng/FAQ/Thư viện/Trang/Đối tác/Cài đặt), Hero slideshow, công cụ tài chính, landing Gladia Heights, chứng nhận đối tác, prerender + sitemap + schema, chatbot, header bảo mật, MCP server, chuỗi xuất bản GitHub → Action prerender → Netlify.

**Kiến trúc xuất bản:** Admin (trình duyệt) → GitHub API ghi `assets/js/data.js` → GitHub Action `prerender.yml` tự sinh trang tĩnh + sitemap, commit ngược → Netlify (nếu link repo) auto-deploy.

---

## ⏳ Việc đang chờ / TODO (theo ưu tiên)

1. 🔴 **Netlify hết credit** → site chưa auto-deploy được. Cần nạp credit *hoặc* cân nhắc chuyển sang Cloudflare Pages / GitHub Pages (site tĩnh, chuyển rất dễ).
2. 🔴 **Nối Lead thật** — `formEndpoint` còn là placeholder `your-form-id`, `leadEndpoint` rỗng ⇒ form đang **chạy demo, chưa nhận lead nào**. Làm mục 1 trong `docs/tich-hop-huong-dan.md` (Formspree + Google Apps Script) rồi dán vào Admin → Xuất bản.
3. 🔴 **Đo lường & index** — GA4, Google Search Console, Google Business Profile, Bing Webmaster chưa thiết lập (Phần 3 `docs/quy-trinh-noi-dung-GEO.md`).
4. 🟡 Cập nhật **số liệu dự án chính thức** (giá hiện là số mẫu) trước khi chạy quảng cáo; thêm nhân viên thật vào Chứng nhận Đối tác.
5. 🟡 Đăng bài GEO đều đặn (1 bài/tuần từ ngân hàng ~40 câu còn lại).

---

## Ghi chú kỹ thuật & vị trí quan trọng

- **Nội dung:** `assets/js/data.js` (SITE, PROJECTS, POSTS, FAQS, PARTNERS, NAV, FILTERS). Sửa xong phải chạy prerender rồi mới deploy.
- **Bố cục dùng chung:** `assets/js/components.js` (menu, footer, thẻ, chatbot). Logic tương tác/form/tracking: `assets/js/main.js`. CMS: `assets/js/admin.js`. Công cụ tài chính: `assets/js/tools.js`. Đối tác: `assets/js/partners.js`.
- **Admin:** `admin.html`, mật khẩu `paceland2026` (đổi trong tab Cài đặt) — chỉ là "rèm che" phía client.
- **GitHub token** (để Admin xuất bản): dán trong Admin, lưu `localStorage`. Dùng fine-grained token, chỉ repo `paceland-website`, quyền Contents: Read & Write.
- **Repo:** `khaibaodai/paceland-website` · **Netlify site ID:** `0cf6811c-6342-40a2-a749-66cc54d4c2e6` · **Domain:** paceland.vn.
- **Tài liệu:** `docs/tich-hop-huong-dan.md` (tracking/lead/bảo mật), `docs/quy-trinh-noi-dung-GEO.md` (quy trình viết bài + 60 câu hỏi).
