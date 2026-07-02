# Thiết kế: Bộ công cụ tài sản + Landing page Gladia Heights

Ngày: 2026-07-03 · Trạng thái: Đã duyệt (user chốt qua chat)

## Mục tiêu

1. Trang **Công cụ** (`cong-cu.html`) gộp 5 công cụ tài chính BĐS, thêm vào menu chính — mỗi công cụ kết thúc bằng CTA thu lead.
2. **Landing page Gladia Heights** (`gladia-heights.html`) độc lập (không header/footer chung) tối ưu chạy quảng cáo.

## Quyết định đã chốt

- 1 trang công cụ chung với 5 tab (không tách 5 trang riêng).
- Landing page độc lập kiểu ads, không theo chrome chung của site.
- Toàn bộ client-side, không thư viện ngoài; biểu đồ bằng CSS/SVG thuần.

## Trang Công cụ

- Template chuẩn site: `#header-root` / `#footer-root`, page-hero + breadcrumb, thêm NAV item `{href:"cong-cu.html", label:"Công cụ"}` vào `data.js` (generateDataJs của admin dùng `window.NAV` nên NAV mới sống sót qua các lần export sau).
- Switcher 5 pill + hash routing (`#lai-vay`, `#phong-thuy`, `#phan-bo`, `#dong-tien`, `#dinh-gia`) để share deep-link.
- File mới: `assets/js/tools.js`, `assets/css/tools.css`.

### 1. Tính lãi vay
Inputs: số tiền vay (input định dạng nghìn + gợi ý chữ), thời hạn (năm), lãi ưu đãi %/năm + số tháng ưu đãi, lãi sau ưu đãi %/năm, phương thức (dư nợ giảm dần | niên kim cố định).
Outputs: trả tháng đầu, trả tháng sau ưu đãi, tổng lãi, tổng gốc+lãi, thanh trực quan gốc/lãi, bảng lịch trả nợ gộp theo năm.
Công thức: niên kim `P·r(1+r)^n/((1+r)^n−1)`, tính lại trên dư nợ còn lại khi hết ưu đãi; dư nợ giảm dần: gốc đều `P/n` + lãi trên dư nợ.

### 2. Phong thuỷ nhà
Inputs: năm sinh âm lịch (1940–2010), giới tính. Ghi chú sinh trước Tết âm thì chọn năm trước.
Thuật toán:
- Can chi: can=(y−4)%10, chi=(y−4)%12; nạp âm: bảng 30 cặp, idx=⌊((y−4)%60)/2⌋.
- Cung mệnh (Kua): S = tổng 2 số cuối năm sinh rút gọn; sinh 19xx: nam `10−S`, nữ `5+S`; sinh 20xx: nam `9−S`, nữ `6+S`; rút gọn >9; kết quả 5 → nam Khôn, nữ Cấn. Map 1 Khảm · 2 Khôn · 3 Chấn · 4 Tốn · 6 Càn · 7 Đoài · 8 Cấn · 9 Ly.
- Bát trạch: bảng 8 cung × 8 hướng (Sinh Khí/Thiên Y/Diên Niên/Phục Vị + Họa Hại/Ngũ Quỷ/Lục Sát/Tuyệt Mệnh), render lưới la bàn 8 hướng tô tốt/xấu.
- Năm đẹp (8 năm tới): Kim Lâu (tuổi mụ %9 ∈ {1,3,6,8}), Hoang Ốc (idx=(chục+đơn vị−1)%6, xấu: Tam Địa Sát/Ngũ Thọ Tử/Lục Hoang Ốc), Tam Tai theo tam hợp chi.

### 3. Phân bổ tài sản
Inputs: tổng tài sản, nhóm tuổi, khẩu vị (An toàn/Cân bằng/Tăng trưởng).
Danh mục mẫu (BĐS/cổ phiếu-quỹ/vàng/tiền gửi/dự phòng): An toàn 30/10/15/35/10 · Cân bằng 40/20/10/20/10 · Tăng trưởng 50/30/5/5/10. Tuổi ≥50 chuyển 10 điểm cổ phiếu→tiền gửi, 36–49 chuyển 5.
Output: donut conic-gradient + bảng số tiền từng lớp + disclaimer "chỉ mang tính tham khảo, không phải khuyến nghị đầu tư".

### 4. Dòng tiền cho thuê
Inputs: giá mua, vốn tự có, tiền thuê/tháng, tỷ lệ lấp đầy % (mặc định 90), chi phí vận hành % tiền thuê (mặc định 10), lãi vay %/năm, thời hạn vay.
Outputs: dòng tiền ròng/tháng (xanh/đỏ), lợi suất gộp & ròng, cash-on-cash, số năm hoàn vốn trên vốn tự có. Vay = giá mua − vốn tự có (niên kim).

### 5. Định giá BĐS
Bảng đơn giá tham chiếu (triệu/m², const `VAL_AREAS` trong tools.js — chỉnh sửa dễ): Thủ Thiêm 120–220 · Q1 150–350 · Thảo Điền/An Phú 85–140 · Khu Đông khác 55–90 · Khu Nam 60–110 · Trung tâm mở rộng 75–130 · Vùng ven 30–55.
Hệ số: loại hình (căn hộ ×1 / nhà phố ×1,15 / biệt thự ×1,25), tầng-vị trí đẹp +7%, nội thất +5%, pháp lý HĐMB −8%, đã sử dụng −7%.
Output: khoảng giá thấp–trung bình–cao + thanh khoảng giá + disclaimer + CTA thẩm định chuyên sâu.

## Landing Gladia Heights

Trang tĩnh độc lập, link `styles.css` (dùng token) + `landing.css`; KHÔNG có header-root/footer-root; có `data.js` + `main.js` cho form/reveal/lightbox.
Sections: topbar (logo + hotline) → hero ảnh lớn + chips số liệu + form ngắn (tên, SĐT) → strip 4 stats → tổng quan → vị trí & kết nối (vành đai, metro) → 6 tiện ích → gallery 3 ảnh → loại căn (1–3PN, 48–110m², từ 4,4 tỉ) → vì sao qua PaceLand (3 điểm) → form cuối + hotline → footer mini → sticky CTA bar mobile (Gọi/Zalo/Đăng ký).
Nội dung lấy từ PROJECTS['gladia-heights'] trong data.js, viết lại giọng marketing. SEO/OG riêng, ảnh OG = gladia-heights-1.jpg.
Form dùng cơ chế `data-pace-form` sẵn có (Formspree khi cấu hình endpoint; hiện demo-mode). Kênh lead chắc chắn: tel + Zalo.

## Việc hệ thống kèm theo

- Đồng bộ `?v=` của data.js/main.js/components.js trên **tất cả** trang HTML (hiện lệch: faq còn v=7) — bump data.js lên v12 vì NAV đổi.
- Thêm `cong-cu.html`, `gladia-heights.html` vào sitemap.xml.
- Deploy Netlify CLI + push GitHub (data.js, HTML mới/sửa).

## Ngoài phạm vi

- Không lưu kết quả công cụ, không backend, không tracking ads (gắn pixel sau khi anh có mã).
- Bảng đơn giá định giá là số tham khảo tĩnh — cập nhật qua sửa `VAL_AREAS`.
