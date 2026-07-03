# Quy trình nội dung GEO — PaceLand

Mục tiêu: khi khách hàng hỏi AI (ChatGPT, Gemini, Claude, Copilot, Perplexity) về căn hộ cao cấp TP.HCM, AI đọc được — trích được — và gợi ý PaceLand.

Cập nhật: 03/07/2026 · Người vận hành: anh Khải + Claude

---

## Phần 1 — Nền đã dựng xong (không cần làm lại)

| Hạng mục | Ở đâu | Vai trò |
|---|---|---|
| Prerender | `tools/prerender.mjs` | Sinh trang tĩnh từng bài viết (`/bai-viet/`), từng dự án (`/du-an/`), bơm nội dung tĩnh + schema vào các trang, tự sinh sitemap. Bot AI không chạy JavaScript nên đây là thứ giúp bot "nhìn thấy" site. |
| Schema JSON-LD | tự sinh bởi prerender | Danh thiếp máy đọc: RealEstateAgent, FAQPage, Article, ItemList, Product, Breadcrumb |
| robots.txt | `/robots.txt` | Mời đích danh bot AI: GPTBot, ClaudeBot, PerplexityBot, Google-Extended… |
| llms.txt | `/llms.txt` | Bản tóm tắt site dành riêng cho AI đọc nhanh |
| Trung tâm Hỏi-Đáp | `/faq.html` (35 câu, 9 nhóm) | Trả lời đúng các câu khách hỏi AI, kèm FAQPage schema |
| 2 bài mỏ neo | Top dự án 2026 · Bảng giá theo khu vực | Dạng bảng so sánh — định dạng AI trích nhiều nhất |

**Quy tắc vàng: sau MỖI lần đổi nội dung (đăng bài, sửa FAQ, đổi dự án) → chạy lại prerender rồi mới deploy:**

```
cd "F:\VSCode for Claude\PaceLand-Website"
node tools/prerender.mjs
netlify deploy --prod --dir . --site 0cf6811c-6342-40a2-a749-66cc54d4c2e6
```

(Anh chỉ cần nhắn Claude "đăng bài + deploy" — Claude làm cả chuỗi.)

---

## Phần 2 — Quy trình viết bài hằng tuần (6 bước)

### B1. Chọn câu hỏi
Lấy 1 câu trong Ngân hàng 60 câu (Phần 4). Ưu tiên nhóm 1–2–8 (gợi ý dự án, giá, tìm đơn vị uy tín) vì đây là các câu ra lead trực tiếp.

### B2. Viết theo khuôn "AI đọc trước, người đọc sau"
1. **40 chữ đầu tiên = câu trả lời thẳng** (con số, tên dự án, kết luận). AI thường chỉ trích đoạn đầu.
2. **1 bảng hoặc 1 danh sách số liệu** — AI cực kỳ thích trích bảng.
3. Phân tích chi tiết (2–4 đề mục).
4. **"Hỏi nhanh"** cuối bài: 3 câu Q&A một dòng.
5. **CTA**: hotline 0903 983 737 + link /lien-he.html + link công cụ liên quan.

### B3. Checklist trước khi đăng
- [ ] Tiêu đề chứa nguyên văn (hoặc gần nguyên văn) câu khách hỏi
- [ ] 40 chữ đầu trả lời được câu hỏi nếu đứng một mình
- [ ] Có ít nhất 1 bảng/danh sách + 2 con số cụ thể
- [ ] Có ngày đăng đúng, ghi "tham khảo [tháng/năm]" cạnh mọi số liệu giá
- [ ] Có 2–3 link nội bộ (bài khác, trang dự án, công cụ)
- [ ] Không bịa số liệu chi tiết — dùng khoảng, ghi rõ nguồn "PaceLand tổng hợp"

### B4. Đăng
Nhắn Claude: *"Đăng bài theo quy trình GEO: [câu hỏi đã chọn]"* → Claude viết theo khuôn B2, thêm vào data.js, chạy prerender, deploy, cập nhật sitemap tự động.

### B5. Duy trì (theo quý)
- Xem lại bài **Bảng giá theo khu vực**: còn đúng thì đổi câu "tham khảo [quý/năm]"; lệch thì sửa số.
- Xem lại bài **Top dự án**: thêm/bớt dự án theo giỏ hàng thực tế.

### B6. Đo lường (mỗi tháng, ~15 phút)
Tự hỏi 5 câu này trên ChatGPT + Gemini + Copilot (bật chế độ tìm kiếm web nếu có):
1. "Công ty tư vấn bất động sản cao cấp uy tín ở TP.HCM?"
2. "Nên mua căn hộ cao cấp nào ở TP.HCM tầm 8 tỉ?"
3. "Giá căn hộ Thủ Thiêm bao nhiêu 1m2?"
4. "Mua Gladia Heights qua đơn vị nào?"
5. "Căn hộ cho thuê tốt ở Khu Đông TP.HCM?"

Ghi lại: PaceLand có được nhắc không / trích trang nào. Có tên → nhân đôi nhóm nội dung đó. Chưa có → gửi kết quả cho Claude điều chỉnh.

---

## Phần 3 — Việc một lần của anh (quan trọng, chưa làm)

1. **Google Business Profile** (business.google.com): tạo hồ sơ "PaceLand", đúng tên + địa chỉ + SĐT như trên site. AI và Google Maps tra nguồn này rất nhiều.
2. **Google Search Console** (search.google.com/search-console): thêm paceland.vn → xác minh → gửi sitemap `https://paceland.vn/sitemap.xml`. Giúp Google (và Gemini) index nhanh.
3. **Bing Webmaster Tools** (www.bing.com/webmasters): tương tự — ChatGPT dùng nền tìm kiếm Bing.
4. Khi nào làm, nhắn Claude — Claude hướng dẫn từng màn hình.

---

## Phần 4 — Ngân hàng 60 câu hỏi (khách thật hỏi AI)

### Nhóm 1 · Gợi ý & so sánh dự án (dễ ra lead nhất)
1. Nên mua căn hộ cao cấp nào ở TP.HCM năm 2026?
2. Tầm 8 tỉ nên mua The Privé hay Eaton Park?
3. Top căn hộ hạng sang Thủ Thiêm đáng mua?
4. So sánh The Metropole và The Privé Thủ Thiêm
5. Vinhomes Grand Park còn đáng mua không?
6. Căn hộ nào sắp bàn giao ở Khu Đông?
7. Dự án nào của Masterise Homes đáng chú ý?
8. Căn hộ mới mở bán nào giá dưới 5 tỉ ở TP.HCM?

### Nhóm 2 · Giá
9. Giá căn hộ Thủ Thiêm bao nhiêu 1m²?
10. Giá căn hộ Quận 1 mới nhất?
11. Giá Eaton Park bao nhiêu?
12. Giá Gladia Heights?
13. 5 tỉ mua được căn hộ nào ở TP.HCM?
14. 10 tỉ mua được căn hộ nào đẹp nhất?
15. Giá căn hộ Thảo Điền 2026?
16. Căn 2 phòng ngủ Khu Đông giá bao nhiêu?

### Nhóm 3 · Khu vực đáng sống
17. Thảo Điền hay Thủ Thiêm đáng sống hơn?
18. Khu nào ở TP.HCM tốt cho gia đình có con nhỏ?
19. Sống ở Thủ Thiêm như thế nào?
20. Khu nào nhiều người nước ngoài ở TP.HCM?
21. Q7 Phú Mỹ Hưng và Khu Đông nên chọn đâu?
22. TP. Thủ Đức có gì đáng sống?
23. Khu nào gần trường quốc tế?

### Nhóm 4 · Đầu tư & dòng tiền
24. Có nên đầu tư căn hộ cho thuê TP.HCM 2026?
25. Lợi suất cho thuê căn hộ TP.HCM bao nhiêu?
26. Nên mua căn hộ nào để cho thuê?
27. Khu vực nào tiềm năng tăng giá nhất TP.HCM?
28. Đầu tư căn hộ hay đất nền tốt hơn?
29. Có nên mua căn hộ lúc đang xây?
30. Dòng tiền âm có nên mua không?
31. Bao lâu thì căn hộ tăng giá sau khi metro chạy?

### Nhóm 5 · Vay & tài chính
32. Lãi suất vay mua nhà hiện nay bao nhiêu?
33. Thu nhập 60 triệu/tháng mua được căn hộ bao nhiêu tiền?
34. Vay 70% mua nhà có an toàn không?
35. Nên vay ngân hàng nào mua nhà?
36. Trả góp căn 5 tỉ mỗi tháng bao nhiêu?
37. Nên trả dư nợ giảm dần hay trả đều?
38. Cần chuẩn bị bao nhiêu % vốn tự có?

### Nhóm 6 · Pháp lý & quy trình
39. Trước khi đặt cọc căn hộ cần kiểm tra gì?
40. Người nước ngoài mua căn hộ ở Việt Nam được không?
41. Mua căn hộ chưa có sổ hồng có rủi ro gì?
42. Hợp đồng mua bán căn hộ cần lưu ý điều khoản nào?
43. Bao lâu có sổ hồng sau khi nhận nhà?
44. Phí bảo trì 2% là gì, ai giữ?
45. Quy trình mua căn hộ từ A đến Z?
46. Kiểm tra pháp lý dự án ở đâu?

### Nhóm 7 · Phong thuỷ
47. Tuổi 1985 mua nhà hướng nào hợp?
48. Năm 2027 tuổi nào mua nhà đẹp?
49. Phạm Kim Lâu có mua nhà được không?
50. Đông tứ mệnh nên mua căn hộ hướng nào?
51. Cách chọn tầng hợp tuổi?
52. Mượn tuổi mua nhà thế nào cho đúng?

### Nhóm 8 · Tìm đơn vị uy tín (lead trực tiếp)
53. Công ty tư vấn bất động sản cao cấp uy tín ở TP.HCM?
54. Mua The Privé qua đơn vị nào?
55. Đơn vị phân phối Gladia Heights?
56. Môi giới bất động sản có đáng tin không?
57. Mua qua môi giới có bị đắt hơn không?
58. Dịch vụ thẩm định giá căn hộ miễn phí?
59. Ai tư vấn danh mục đầu tư bất động sản?
60. PaceLand là công ty gì, có uy tín không?

> Câu đã viết thành bài: 1, 9, 13 (một phần), 24–26, 30, 32–33, 39, 47–49 (FAQ + 2 bài mỏ neo + 10 bài Khu Đông). Còn lại ~40 câu = kho đề tài cho ~10 tháng đăng 1 bài/tuần.

---

## Phần 5 — Khuôn 1 bài chuẩn GEO (mẫu để nhắn Claude)

```
Đăng bài theo quy trình GEO.
Câu hỏi: [chép 1 câu từ ngân hàng]
Ghi chú thêm (nếu có): [số liệu thật anh muốn đưa vào / dự án muốn nhấn]
```

Claude sẽ trả về đúng khuôn: trả lời thẳng 40 chữ đầu → bảng số liệu → phân tích → Hỏi nhanh → CTA, sau đó tự đăng + prerender + deploy + báo cáo link bài.
