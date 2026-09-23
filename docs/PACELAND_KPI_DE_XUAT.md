# Ngưỡng KPI đề xuất — bản nháp chờ anh Khải chốt

**Tài liệu nội bộ.** Thư mục `docs/` nằm trong `.dockerignore` nên file này không lên website.

Trang tuyển dụng hiện chỉ đăng **chỉ số được theo dõi** (đo cái gì), **không đăng ngưỡng** (bao nhiêu thì
đạt), vì PaceLand chưa ban hành định mức chính thức. Đăng một con số chưa có thật lên tin tuyển dụng là
cam kết sai với ứng viên, và người vào làm sẽ thấy khác ngay tháng đầu.

Dưới đây là ngưỡng **đề xuất** để anh chốt. Anh sửa số rồi báo em, em đưa lên trang trong một lần build.
Có một test tự động chặn việc đăng ngưỡng khi chưa chốt (`tools/tests/jd-chi-tiet.test.mjs`).

Cơ sở tham chiếu: khung KPI phổ biến cho nhân viên kinh doanh bất động sản tại Việt Nam (số khách mới,
số buổi dẫn xem, tỷ lệ chuyển đổi từng bước, số hồ sơ đặt cọc, doanh số, tỷ lệ khách giới thiệu) và
khung đo marketing theo chi phí trên mỗi khách hàng tiềm năng (CPL). Ngưỡng dưới đây là **giả định của
em**, chưa phải số liệu vận hành thật của PaceLand.

---

## 1. Chuyên viên kinh doanh (Agent)

| Chỉ số | Ngưỡng đề xuất | Ghi chú khi chốt |
|---|---|---|
| Khách mới tiếp cận | ? / tuần | Gồm khách công ty phân và khách tự tìm |
| Tỷ lệ lead → hẹn gặp trực tiếp | ? % | Đo trên lead công ty phân, không tính khách tự có |
| Buổi dẫn khách đi xem | ? / tháng | Tính cả nhà mẫu và công trường |
| Tỷ lệ đi xem → đặt chỗ | ? % | |
| Giao dịch thành công | ? / tháng hoặc quý | Nên đặt theo quý cho người mới, chu kỳ chốt BĐS dài |
| Doanh số ký hợp đồng | ? tỉ / quý | |
| Khách cũ mua tiếp hoặc giới thiệu | ? / quý | Chỉ số này phản ánh chất lượng tư vấn rõ nhất |

**Ba câu cần anh quyết trước khi đặt số:**
1. Người mới có thời gian ân hạn bao lâu trước khi tính chỉ tiêu? (thường 2–3 tháng)
2. Lương cứng 5 triệu có gắn điều kiện tối thiểu nào không, hay trả vô điều kiện?
3. Không đạt chỉ tiêu thì hệ quả là gì: giảm nguồn khách được phân, kèm cặp thêm, hay dừng hợp tác?

Câu 2 quan trọng nhất. Hiện trang ghi "Lương cứng 5 triệu mỗi tháng" không kèm điều kiện. Nếu thực tế có
điều kiện, em phải sửa câu đó ngay để không thành hứa sai.

## 2. Giám đốc Kinh doanh

| Chỉ số | Ngưỡng đề xuất | Ghi chú khi chốt |
|---|---|---|
| Doanh số đội | ? tỉ / quý | Gắn với định biên đội và danh mục dự án được giao |
| Tỷ lệ Agent đạt mục tiêu cá nhân | ? % | |
| Agent tuyển mới | ? / quý | |
| Tỷ lệ Agent trụ lại sau giai đoạn đầu | ? % | Mốc đo nên là 3 hoặc 6 tháng |
| Thời gian từ nhận việc đến giao dịch đầu tiên | ? ngày | Chỉ số đo chất lượng đào tạo của Leader |
| Agent được đề bạt lên bậc cao hơn | ? / năm | |

**Cần anh quyết:** định biên tối đa mỗi đội, tỷ lệ chia sẻ doanh thu đội nhóm theo bậc, và điều kiện cụ
thể để một Agent lên Leader. Trang đang ghi "điều kiện từng bậc trao đổi minh bạch khi phỏng vấn" — đúng
với hiện trạng, nhưng có bảng rõ thì tuyển dễ hơn nhiều.

## 3. Digital Marketing

| Chỉ số | Ngưỡng đề xuất | Ghi chú khi chốt |
|---|---|---|
| Lead hợp lệ | ? / tuần | Định nghĩa "hợp lệ": có số điện thoại thật và đúng nhu cầu BĐS |
| Chi phí trên mỗi lead (CPL) | ≤ ? đ | Nên đặt riêng theo phân khúc: căn hộ biển khác căn hộ nội đô |
| Tỷ lệ lead được đội kinh doanh xác nhận đúng nhu cầu | ≥ ? % | Chỉ số chống chạy theo lead rác |
| Tỷ lệ điền form trên landing page | ≥ ? % | |
| Chi phí trên mỗi giao dịch thành công | ≤ ? đ | Chỉ đo được khi CRM ghi đủ nguồn lead tới lúc chốt |

**Cần anh quyết:** ngân sách quảng cáo hằng tháng và mức CPL trần chấp nhận được. Chưa có hai số này thì
KPI của vị trí này không đặt được. Em gợi ý chạy một tháng để lấy số nền rồi mới chốt ngưỡng.

## 4. Media Marketing

| Chỉ số | Ngưỡng đề xuất | Ghi chú khi chốt |
|---|---|---|
| Video dài | ? / tháng | |
| Reels hoặc short | ? / tuần | |
| Bộ ảnh dự án | ? / tháng | |
| Thời gian từ nhận yêu cầu đến giao nội dung | ≤ ? ngày | Nên tách mức gấp và mức thường |
| Tỷ lệ nội dung được Agent dùng lại gửi khách | ≥ ? % | Chỉ số đáng tin hơn lượt xem |

**Cần anh quyết:** lịch đăng cố định trên từng kênh và ai là người duyệt nội dung trước khi đăng.

## 5. Admin Kinh doanh

| Chỉ số | Ngưỡng đề xuất | Ghi chú khi chốt |
|---|---|---|
| Sai lệch dữ liệu giỏ hàng khi đối chiếu CĐT | = 0 | Đây là chỉ số nên đặt tuyệt đối |
| Thời gian xử lý một yêu cầu booking | ≤ ? giờ | Trong giờ làm việc |
| Hồ sơ đủ và đúng ngay lần trình đầu | ≥ ? % | |
| Báo cáo định kỳ nộp đúng hạn | 100 % | |
| Mốc thanh toán của khách được nhắc trước hạn | 100 % | Trễ một mốc là khách chịu phạt, nên để tuyệt đối |

**Cần anh quyết:** chu kỳ báo cáo (tuần hay hai tuần) và ai nhận báo cáo.

---

## Sau khi anh chốt

1. Em thêm ngưỡng vào `kpis[]` của từng vị trí trong `assets/js/data.js`.
2. Nới test `Chỉ số chỉ nêu cái được đo, không tự đặt ngưỡng con số` — đổi thành kiểm tra ngưỡng khớp
   với bảng anh đã duyệt, thay vì cấm hẳn.
3. Sửa `kpiNote` cho khớp: bỏ câu "ngưỡng được thống nhất khi nhận việc" nếu đã công bố ngưỡng.
4. Build, test, deploy.

## Nguồn tham khảo khi dựng khung

- [Mẫu KPI cho nhân viên kinh doanh bất động sản](https://timviecbatdongsan.com/blog/kpi-cho-nhan-vien-kinh-doanh/)
- [KPI cho nhân viên kinh doanh — MISA AMIS](https://amis.misa.vn/46094/kpi-cho-nhan-vien-kinh-doanh/)
- [KPI cho vị trí Giám đốc kinh doanh — HRchannels](https://hrchannels.com/uptalent/kpi-cho-vi-tri-giam-doc-kinh-doanh.html)
- [CPL là gì, cách tối ưu Cost Per Lead](https://gobranding.com.vn/cpl-cost-per-lead-la-gi/)
- [Mô tả công việc Sale Admin — MISA AMIS](https://amis.misa.vn/130395/mo-ta-cong-viec-cua-sale-admin/)
