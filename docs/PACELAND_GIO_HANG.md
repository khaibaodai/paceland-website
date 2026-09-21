# Giỏ hàng dự án (bảng hàng theo từng căn)

Hệ thống sinh trang `/gio-hang/<slug>.html`: bảng hàng lọc được theo khối, loại căn, hướng
view và ngân sách, so sánh tối đa 3 căn, và nút **"Check căn còn không?"** đổ lead về đúng
đường lead sẵn có của site. Tham chiếu tham khảo khi thiết kế: salepro.com (mục Quỹ căn).

Trang đầu tiên: **Beachtro Tower — Blanca City** (`/gio-hang/beachtro-blanca-city.html`).

## 1. Thành phần

| File | Vai trò |
|---|---|
| `assets/data/gio-hang/<slug>.json` | Toàn bộ nội dung một giỏ hàng. Chỉ prerender đọc (đã loại khỏi Docker qua `.dockerignore`) |
| `tools/gio-hang-render.mjs` | Hàm thuần sinh HTML: hero, thẻ khối, bảng hàng, dòng sản phẩm, chính sách, FAQ, hộp thoại |
| `tools/prerender.mjs` khối `3b-ter` | Duyệt mọi file JSON, ghi ra `/gio-hang/<slug>.html`, sinh schema và thêm vào sitemap |
| `assets/css/gio-hang.css` | Style, prefix `gh-` |
| `assets/js/gio-hang.js` | CORE (lọc / sắp xếp / định dạng, test được trong Node) + phần DOM |
| `tools/tests/gio-hang.test.mjs` | 29 test: dữ liệu, logic lọc, trang sinh ra, schema, llms.txt |

Rổ căn được **nhúng thẳng vào trang** trong `<script type="application/json" id="gh-data">`,
nên bộ lọc chạy ngay khi mở trang, không gọi thêm request nào.

## 2. Thêm một giỏ hàng mới

1. Tạo `assets/data/gio-hang/<slug>.json` theo khuôn của Beachtro. Trường bắt buộc:
   `ten, duAn, nguon, capNhat (YYYY-MM-DD), tomTat, luuY, khoi[], can[]`.
2. Mỗi phần tử `can[]` cần: `ma, khoi, loai, loaiMa, dt (số), huong, huongMa, ny (số, đơn vị tỉ), banGiao`.
   `tang` là tuỳ chọn. Mã `khoi` phải có trong mảng `khoi[]`, nếu không test sẽ chặn.
3. Ảnh: `anh` (thẻ trên SaleHub + OG), `anhKhoi` (sơ đồ khối), tuỳ chọn `ogImage`.
4. Chạy `node tools/prerender.mjs` rồi `node --test "tools/tests/*.test.mjs"`.
5. Gỡ dự án đó khỏi danh sách `GH_SOON` trong `tools/prerender.mjs` nếu đang để dạng "đang cập nhật".
6. Trang có ảnh căn hộ biển thì thêm đường dẫn vào `SITE.tracking.metaPixelScope` (`assets/js/data.js`).

Không cần khai báo gì thêm: SaleHub, sitemap và schema tự cập nhật theo file JSON.

## 3. Nạp bảng hàng thật từ chủ đầu tư

Khi có file bảng hàng (Excel/CSV) của CĐT, chỉ cần chuyển thành mảng `can[]`. Cột cần map:

| Cột trong bảng CĐT | Trường JSON |
|---|---|
| Mã căn | `ma` |
| Tòa / khối | `khoi` |
| Loại hình (Studio, 1BR+, 2BR+…) | `loai` + `loaiMa` (slug không dấu) |
| Diện tích tim tường | `dt` (số, m²) |
| Hướng view | `huong` + `huongMa` (slug) |
| Giá niêm yết | `ny` (số, đơn vị **tỉ đồng**) |
| Hình thức bàn giao | `banGiao` |
| Tầng | `tang` |

Bảng chịu được vài trăm dòng. Nếu vượt khoảng 1.000 dòng thì nên thêm phân trang trước
(SalePro phân trang 12/24/36/48 mỗi trang) — hiện `gio-hang.js` vẽ hết một lượt.

## 4. Quy tắc nội dung

- **Không đăng bảng giá nội bộ theo từng căn** nếu tài liệu ghi là nội bộ. Giỏ hàng Beachtro
  chỉ đăng 7 căn mẫu tầng 25 mà chủ đầu tư đã công bố công khai tại Kick-off 30/07/2026.
- **Không hiển thị "còn hàng"** khi PaceLand không đọc được tồn kho theo thời gian thực.
  Cột tình trạng trong bảng đã bỏ; thay vào đó mỗi dòng có nút "Check căn còn không?" để cố vấn
  tra hệ thống chủ đầu tư rồi báo lại. Nói "còn" mà thực tế đã có người giữ chỗ là mất uy tín.
- **Luôn ghi nguồn và ngày**: `nguon` + `capNhat` hiện ngay dưới tiêu đề bảng hàng.
- Cột "Đơn giá" là **tạm tính** = giá niêm yết ÷ diện tích tim tường, đã ghi rõ trên trang.
- Nhãn "giỏ hàng độc quyền" chỉ dùng khi PaceLand thực sự được CĐT giao quỹ căn độc quyền.
  Hiện trang dùng "Giỏ hàng PaceLand" và "rổ căn PaceLand đang theo dõi".

## 5. Lead và đo lường

- Form nằm trong hộp thoại, dùng `data-pace-form` + `data-lead-source="gio-hang-<slug>"` nên đi
  đúng đường `submitLead` của `main.js` (Formspree + Google Sheet nếu có `leadEndpoint`).
- Lead mang theo `du_an` (dự án — tòa) và `can` (nhãn đầy đủ: tòa · mã căn · loại · diện tích),
  nên đọc lead là biết khách hỏi căn nào.
- Sự kiện đẩy vào `dataLayer` qua `window.__plTrack`: `gio_hang_view`, `gio_hang_loc`,
  `gio_hang_check_can`, `gio_hang_so_sanh`. Không sự kiện nào mang tên hay số điện thoại.

## 6. Kiểm thử

```bash
node tools/prerender.mjs && node --test "tools/tests/*.test.mjs"
```

Khi QA form trên trang thật, **không gửi lead thật**: chặn bằng
`window.fetch = () => Promise.resolve(new Response('{"ok":true}'))` trước khi bấm gửi.
