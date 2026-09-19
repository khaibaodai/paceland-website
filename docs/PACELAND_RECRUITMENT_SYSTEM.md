# PACE LAND RECRUITMENT SYSTEM

> Thu hút → Thuyết phục → Phân loại → Chuyển đổi → Đo lường → Tối ưu ứng viên.
> Cập nhật: 19/09/2026 (bản sau audit UX · SEO/GEO · CRO · QA) · Áp dụng cho `paceland.vn/tuyen-dung.html` và `paceland.vn/tuyen-dung/<slug>.html`

## 1. Kiến trúc

Site tĩnh (HTML/CSS/JS). Không backend, không database — giữ đúng kiến trúc hiện có:

```
assets/js/data.js ──┐  JOBS (vị trí) + CAREERS (nội dung trang tổng) + PROJECTS/POSTS/PARTNERS (số liệu sống)
                    ▼
tools/careers-render.mjs   component thuần sinh HTML + JSON-LD (dùng chung cho prerender và test)
                    ▼
tools/prerender.mjs  (khối 3c) → tuyen-dung.html + tuyen-dung/<slug>.html + sitemap.xml + khối Tuyển dụng trong llms.txt
                     (bước 6)  → footer tĩnh + ?v=<mã băm nội dung> cho mọi JS/CSS trên mọi trang
                    ▼
git push → Tinh Gọn auto-deploy (nginx) → paceland.vn
```

Phía trình duyệt, chỉ trên trang tuyển dụng:

- `assets/css/careers.css`: design system tuyển dụng. Mọi class có tiền tố `cr-` để không rò sang trang khác.
- `assets/js/careers.js`:
  - CORE thuần: validate, SĐT, dựng hồ sơ, lọc PII, rate-limit, gửi có timeout.
  - DOM: lọc vị trí, form, sticky CTA, analytics, chia sẻ.
- `assets/js/main.js` (dùng chung toàn site):
  - **Alias router** chống soft-404: hosting trả nội dung `index.html` cho mọi URL sai. Nếu trang chủ hiện ở đường dẫn không đuôi (vd `/tuyen-dung`, `/tuyen-dung/agent-bat-dong-san`), script chuyển sang bản `.html` (giữ query + hash, không đo, không ghi UTM ở lượt chuyển). Bản chính là script inline đầu `<head>` của `index.html` (tài nguyên trang chủ dùng đường dẫn tuyệt đối `/assets/…` để vẫn tải đúng ở đường dẫn lồng); `main.js` giữ bản dự phòng.
  - Attribution: `pl_first`, `pl_last`, `pl_utm` (đọc/ghi storage trong `try` — Safari chặn cookie không làm hỏng trang).
  - `track()` đẩy sự kiện vào dataLayer, và gửi GA4/Meta khi đã có ID.
  - `submitLead(payload, {kind})` gửi tới Formspree và Google Sheet. `kind: "application"` dùng `SITE.careersEndpoint` nếu có; `kind: "partner"` (form trang Đối tác) không bị tính là lead mua nhà.
- `assets/js/components.js`: trên `body.careers`, nút header đổi từ "Tư vấn riêng" thành **"Ứng tuyển"** (nhảy thẳng vào form). Mục menu "Tuyển dụng" sáng cả trên trang vị trí.

Trang tuyển dụng dùng `body.careers.no-chat`:

- Tắt chat "Hỏi PaceLand", vốn là luồng lead khách mua nhà.
- Trên mobile, ẩn nút nổi Zalo/Gọi vì thanh ứng tuyển dính đáy đã có Zalo.

## 2. Routes (giữ nguyên URL đã index)

| URL | Nội dung | Schema |
|---|---|---|
| `/tuyen-dung.html` | Careers Hub | Organization, BreadcrumbList, ItemList (vị trí), FAQPage |
| `/tuyen-dung/agent-bat-dong-san.html` | Chuyên viên kinh doanh bất động sản (Agent) — landing ưu tiên #1 | JobPosting (+ baseSalary 5 triệu, experienceRequirements), BreadcrumbList, FAQPage |
| `/tuyen-dung/giam-doc-kinh-doanh.html` | Giám đốc Kinh doanh | JobPosting, BreadcrumbList, FAQPage |
| `/tuyen-dung/digital-marketing.html` | Digital Marketing | JobPosting, BreadcrumbList, FAQPage |
| `/tuyen-dung/media-marketing.html` | Media Marketing | JobPosting, BreadcrumbList, FAQPage |
| `/tuyen-dung/admin-kinh-doanh.html` | Admin Kinh doanh | JobPosting, BreadcrumbList, FAQPage |

- Deep link lọc sẵn cho quảng cáo, bài social: `/tuyen-dung.html?nhom=kinh-doanh` hoặc `marketing`, `van-hanh`, `lanh-dao` — trang tự lọc và cuộn tới danh sách.
- `/tuyen-dung` và `/tuyen-dung/<slug>` (không đuôi) được alias router chuyển sang bản `.html`.
- **Trang mồ côi**: file còn trong `tuyen-dung/` nhưng vị trí đã bị xoá khỏi JOBS → prerender tự sinh lại thành trang "đã ngừng tuyển" (noindex, không JobPosting, giữ tên vị trí cũ).

Cho phép mở rộng về sau (chưa tạo vì chưa có nội dung thật): `/tuyen-dung/cau-chuyen/`, `/tuyen-dung/doi-ngu/`, `/tuyen-dung/van-hoa/`, `/tuyen-dung/dao-tao/`. Trường `stories: []` (trong JOBS và CAREERS) đã sẵn để thêm câu chuyện nhân viên thật.

## 3. Components (`tools/careers-render.mjs`)

Thứ tự trang tổng: Hero → Story → **Vị trí đang tuyển** → Hệ sinh thái → Lộ trình → Tài sản nghề nghiệp → Ban lãnh đạo → CTA giữa trang → Thu nhập → Sản phẩm → Quy trình → FAQ → Ứng tuyển.

| Component | Vai trò |
|---|---|
| `CareerHero` + `CareerStats` | H1 từ khoá ("Tuyển dụng PaceLand: N vị trí bất động sản tại Quận 2, TP.HCM") + khẩu hiệu lớn "Xây sự nghiệp. Không chỉ tìm việc." (thẻ `p`) + mô tả cụ thể vị trí/thu nhập + 2 CTA + proof bar. Fact có giá trị rỗng/0 tự ẩn. |
| `CareerStory` | "Đừng chỉ tìm một sàn để bán hàng" — 5 bước Build (vạch tiến trình theo cuộn) |
| `JobFilter` + `JobRow` + `JobList` | Danh sách vị trí ngay sau Story. Hàng vị trí: `h3 > a` phủ cả hàng bằng `::after` (HTML hợp lệ). Bộ lọc đếm **số vị trí mở**, có vùng `aria-live` báo kết quả. 0 vị trí → khối "Chưa có vị trí mới" + CTA gửi thông tin. |
| `CareerEcosystem` | "Bạn không phải tự bơi" — module hệ thống thật. Dải "Hệ thống → Agent → Khách hàng" (`rail`) chỉ hiện ở trang tổng và vị trí kinh doanh/lãnh đạo. |
| `CareerPath` | Lộ trình 3 bậc Sales → Leader → Đối tác sở hữu (trang vị trí đánh dấu bậc hiện tại) |
| `CareerBrand` | Tài sản nghề nghiệp: thẻ minh họa PL-xxxx + link "Xem một trang hồ sơ thật" (`CAREERS.brand.sampleProfile`) + link danh sách hồ sơ. Link bằng chứng mở tab mới, có `data-proof`. |
| `CareerLeaders` | Ban lãnh đạo thật lấy từ `PARTNERS` (level "Ban lãnh đạo", active): tên, chức danh, mã PL, link hồ sơ. Không dùng ảnh minh họa giả. |
| `MidCta` | Dải CTA giữa trang (đỏ): "Ứng tuyển ngay" + "Nhắn Zalo" |
| `CareerIncome` | Bảng thu nhập theo vị trí + quyền lợi chung |
| `ProductFocus` | 5 dự án trọng tâm (từ `CAREERS.products.focus`) |
| `RecruitmentProcess` | 4 bước tuyển dụng thật (bước 4 trung tính cho mọi vị trí) |
| `CareerFAQ` | FAQ hiển thị = FAQ schema (test tự động đối chiếu) |
| `ApplicationForm` + `ApplySection` | Form 3 trường bắt buộc + phần mở rộng tùy chọn. Khung form có `id="form-ung-tuyen"` — **mọi CTA ứng tuyển trỏ vào đây**. |
| `StickyApplyBar` | Thanh "Ứng tuyển + Zalo" trên mobile (hiện khi nút ở hero khuất, ẩn khi tới form và sau khi gửi thành công) |
| `SocialShare` | Chia sẻ Facebook / LinkedIn (gắn UTM theo kênh) / sao chép link / native share |
| `JobHero`, `jobH1`, `renderJobPage` | Trang vị trí: H1 "Tuyển {count} {title} [bất động sản] tại Quận 2, TP.HCM", tiêu đề thương hiệu lớn, CTA **trước** khối thông tin nhanh, ngày đăng; mô tả (`desc`) hiện làm đoạn mở đầu phần "Bạn sẽ làm gì" (khớp JobPosting) |
| `ClosedJobBody` | Trang vị trí đã đóng / mồ côi |
| `jobPostingLd`, `faqLd`, `itemListLd` | JSON-LD |

## 4. Recruitment Design System (`assets/css/careers.css`)

- **Tinh thần** (theo `PRODUCT.md`): Insider · Authoritative · Restrained. Trắng / đen `#0E0C0A` / đỏ `#C70018`, không gradient, không glassmorphism. Motion dứt khoát, tôn trọng `prefers-reduced-motion` (cả cuộn trang bằng JS). Không dùng hiệu ứng fade-in chậm.
- **Token**:

  | Token | Giá trị | Dùng cho |
  |---|---|---|
  | `--cr-ink` | `#0E0C0A` | Chữ chính |
  | `--cr-ink-2` | `#34302B` | Chữ phụ |
  | `--cr-muted` | `#5F5850` | Chữ nhạt (contrast ≥ 5:1 trên nền trắng) |
  | `--cr-soft` | `#F4F2EE` | Nền section phụ |
  | `--cr-red-on-dark` | `#FF5A6B` | Chữ đỏ trên nền đen |
  | `--cr-err` | `#B00016` | Lỗi form |
  | viền ô nhập | `#8A847C` | ≥ 3:1 trên nền trắng (WCAG 1.4.11) |

- **Typography**: Plus Jakarta Sans 800 cho tiêu đề. `.cr-h1` (H1 từ khoá) 1–1.1rem đậm, có ô vuông đỏ; `.cr-hero__title` (khẩu hiệu) `clamp(2.5rem, 7.4vw, 6.3rem)`. Nhãn nhỏ viết hoa có letter-spacing 0.18em.
- **Section**:
  - `.cr-sec`, padding `clamp(72px, 9vw, 128px)`.
  - `.cr-dark` (nền đen) cho "Không tự bơi" và khối ứng tuyển. `.cr-soft` cho danh sách vị trí và thu nhập. `.cr-mid` (nền đỏ) cho CTA giữa trang.
  - Các section trắng liền nhau ngăn bằng hairline. Mọi `[id]` trong `.cr` có `scroll-margin-top` = chiều cao header + 16px.
- **Nút**:
  - Biến thể: `.cr-btn--red` (chính), `.cr-btn--line` (phụ), `.cr-btn--block`.
  - Cao tối thiểu 52px (thanh dính 48px), góc 2px.
  - Có trạng thái `aria-busy`.
- **Form**: ô nhập cao 52px, font 16px (iOS không tự zoom). Lỗi hiển thị qua `aria-invalid` + `aria-describedby`. Trạng thái gửi nằm trong `role="alert"`. Honeypot `.cr-hp` ẩn hẳn (`display:none`).
- **Breakpoint**:

  | Điểm cắt | Thay đổi |
  |---|---|
  | 1023px | Bố cục một cột |
  | 899px | Hiện thanh ứng tuyển dính đáy (có `safe-area-inset-bottom`), ẩn poster ở hero (không tải ảnh: `<picture>` trả GIF 1px) |
  | 767px | Lưới 2 cột chuyển 1 cột, ẩn poster cạnh danh sách vị trí (không tải ảnh) |
  | 599px | Timeline chuyển sang dọc |

  Đã QA ở 1440, 1280, 1024, 768, 430, 375, 360, 320px: không tràn ngang, không chữ bị cắt.
- **Header toàn site** (`styles.css`, sửa kèm đợt này): menu 8 mục luôn 1 dòng (`nowrap`, thu khoảng đệm ≤1500px), ẩn số hotline ở header ≤1260px (vẫn có ở nút gọi nổi + footer), menu burger ≤1120px; trên điện thoại logo và nút CTA thu gọn để nút mở menu không bị đẩy ra ngoài màn hình.

## 5. Job model (`JOBS` trong `assets/js/data.js`)

| Trường | Bắt buộc | Ghi chú |
|---|---|---|
| `id` | ✓ | slug URL — **không đổi khi đã index**. Admin chặn lưu khi trùng slug với vị trí khác. |
| `status` | ✓ | `open` \| `closed` |
| `title`, `shortTitle` | ✓ | `title` là tên đầy đủ có từ khoá (vd "Chuyên viên kinh doanh bất động sản (Agent)"); `shortTitle` cho badge / OG / danh sách |
| `count` | ✓ | số lượng tuyển (chuỗi, vd "02") |
| `category` | ✓ | `kinh-doanh` \| `marketing` \| `van-hanh` \| `lanh-dao` (bộ lọc; `kinh-doanh`/`lanh-dao` dùng câu hỏi kinh nghiệm bán hàng) |
| `dept`, `type`, `location` | ✓ | type "Toàn thời gian" → `FULL_TIME` trong schema |
| `salary` | ✓ | nhãn thu nhập hiển thị |
| `baseSalary` |  | `{value, currency, unit}` — chỉ khi có lương cứng thật (hiện: Agent 5.000.000 VND/tháng) |
| `experienceRequirements`, `educationRequirements` |  | chỉ khi đúng thật; Agent: `"no requirements"` (người mới vẫn được xem xét) |
| `datePosted` | ✓ | YYYY-MM-DD — ngày đăng thật, KHÔNG tự sinh (hiện trên trang: "Đăng ngày …") |
| `updated` |  | YYYY-MM-DD — ngày cập nhật (sitemap lastmod) |
| `validThrough` |  | YYYY-MM-DD — chỉ khi có hạn thật |
| `sortOrder`, `featured` |  | thứ tự hiển thị |
| `summary`, `desc` | ✓ | 1 câu cho hàng vị trí; mô tả cho meta + JobPosting (hiển thị trên trang) |
| `hero {title, sub}` |  | tiêu đề 2 câu (câu sau tô đỏ) |
| `why {title, text, points[]}` |  | "Vì sao vị trí này tồn tại" |
| `duties[]`, `reqs[]`, `profiles[]`, `kpis[]` |  | kpis chỉ điền khi có KPI thật |
| `compensation[] {label, value, note}`, `benefits[]` |  | chỉ chính sách thật |
| `system[]` |  | id module trong `CAREERS.ecosystem.modules` |
| `pathStage` |  | `sales` \| `leader` \| rỗng |
| `showProducts` |  | hiện khối dự án trọng tâm |
| `environment[]`, `faq[] {q, a}`, `finalCta {title, sub, button}` |  | FAQ phải khớp chính sách |
| `poster`, `ogImage` |  | poster 1080×1080; OG 1200×630 sinh bởi `tools/og_jobs.py` |
| `seoTitle`, `seoDescription` |  | duy nhất; title ≤ 62, description ≤ 160 ký tự (test kiểm tra) |
| `stories[]` |  | dành cho câu chuyện nhân viên THẬT (chưa có) |

Placeholder trong mọi chuỗi (thay bằng số liệu sống lúc prerender):

| Nhóm | Placeholder |
|---|---|
| Số liệu site | `{{projects}}`, `{{posts}}`, `{{partners}}` |
| Số liệu tuyển dụng | `{{openings}}`, `{{roles}}`, `{{agentCount}}`, `{{agentSalary}}` (nhãn thu nhập Agent, chữ thường đầu câu), `{{agentBase}}` (vd "5 triệu") |
| Liên hệ & nơi làm | `{{hotline}}`, `{{email}}`, `{{address}}`, `{{locShort}}` ("Quận 2, TP.HCM") |
| Danh sách | `{{jobsList}}` ("20 Agent, 02 Giám đốc…"), `{{rolesList}}` ("Agent, Giám đốc Kinh doanh…"), `{{focusList}}` |

`CAREERS` chứa nội dung trang tổng: `locationShort`, `hero` (có `h1`), `facts`, `midCta`, `story`, `ecosystem`, `path`, `brand` (có `sampleProfile`, `sampleLink`), `income`, `products`, `process`, `form` (`experienceOptionsSales` cho nhóm kinh doanh, `experienceOptions` cho nhóm còn lại), `faq`, `finalCta`, `seo`, `posters`, `ogImage`, `stories`.

## 6. Thao tác thường gặp

Sau mỗi thao tác, xuất bản là trang tự sinh lại. Admin xuất bản lên GitHub, GitHub Action chạy prerender (kèm cập nhật mã băm `?v=`) và test. Nếu sửa tay trong `data.js`, chạy `npm run build` rồi push.

- **Thêm vị trí mới**: Admin → Tuyển dụng → Thêm.
  - Điền tối thiểu: tên, slug, nhóm, số lượng, thu nhập, ngày đăng, tóm tắt, mô tả, công việc, yêu cầu, quyền lợi, FAQ.
  - Thêm poster vào `assets/img/tuyen-dung/`, rồi chạy `python tools/og_jobs.py` để sinh ảnh OG và bản 540px.
  - Có thể dùng skill `paceland-recruitment-page`: nhắn Claude *"Tạo landing tuyển dụng cho vị trí X"*.
- **Đóng vị trí**: đổi Trạng thái thành "Đã đóng". Trang vẫn tồn tại để không bị soft-404, nhưng:
  - gắn `noindex`, bỏ JobPosting, hiện thông báo "đã ngừng tuyển" kèm link vị trí đang mở;
  - rời trang tổng, sitemap và llms.txt.

  Nên đóng thay vì xoá. Nếu lỡ xoá, prerender tự biến trang cũ thành trang "đã ngừng tuyển".
- **Đổi thu nhập**: sửa "Thu nhập (nhãn hiển thị)" và "Thu nhập — thẻ". Nếu đổi lương cứng thì sửa thêm "Lương cứng/tháng" (dùng cho schema và proof bar `{{agentBase}}`).
- **Đổi số lượng**: sửa "Số lượng". H1, proof bar, title, FAQ và llms.txt tự cập nhật theo.
- **Đổi CTA**:
  - Trang vị trí: "CTA cuối — tiêu đề / dòng phụ".
  - Trang tổng: `CAREERS.hero.primaryCta` / `secondaryCta` / `midCta` / `finalCta` trong `data.js`.
- **Sửa nội dung trang tổng** (EVP, lộ trình, quy trình, FAQ): sửa `CAREERS` trong `data.js`, chạy `npm run build`. CMS chưa có form riêng cho CAREERS, nhưng Admin xuất bản vẫn giữ nguyên khối này.
- **Tách hạn mức form**: tạo một form Formspree riêng cho tuyển dụng, dán vào Admin → Cài đặt → "Form endpoint cho hồ sơ ứng tuyển".

## 7. Form flow & Data flow

1. Ứng viên điền 3 trường bắt buộc: họ tên, SĐT di động VN, vị trí. Kinh nghiệm (theo nhóm vị trí), email, link CV/LinkedIn và lời nhắn là tùy chọn, nằm trong phần mở rộng. Không bắt upload CV, vì Formspree bản miễn phí không hỗ trợ file.
2. Không có JavaScript: form vẫn `POST` thẳng tới Formspree (`action` = `SITE.careersEndpoint` hoặc `SITE.formEndpoint`) với kiểm tra bắt buộc gốc của trình duyệt. Có JavaScript: `careers.js` đặt `noValidate` và tự xử lý:
   - validate kèm báo lỗi từng ô; SĐT nhận `0903…`, `+84 903…`, `+84 0903…`, `0084…`, `84…`, hoặc 9 số thiếu số 0 đầu;
   - chống bot: honeypot `_gotcha` (tên Formspree hiểu sẵn) bị điền → giả thành công, không gửi. Gửi dưới 2,5 giây sau khi mở trang (autofill trên mobile) → **vẫn gửi**, gắn `spam_suspect: "too_fast"` và tiêu đề email "[Cần kiểm tra] …";
   - rate-limit 3 lần mỗi 10 phút mỗi trình duyệt.
3. `buildApplication()` dựng **Application record** (27 trường; `job_slug` lấy theo vị trí **đang chọn** trong form, kể cả khi gửi từ trang tổng):

   | Nhóm | Trường |
   |---|---|
   | Hệ thống | `id` (APP-xxxxxxxx), `created_at`, `status: NEW`, `kind: application`, `source`, `_subject` |
   | Ứng viên | `full_name`, `phone`, `email`, `position`, `experience`, `profile_url`, `message` |
   | Nguồn | `job_slug`, `source_page`, `source_url`, `landing_page`, `referrer`, `device_type` |
   | UTM & click ID | `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `fbclid`, `ttclid` |

4. `window.__plSubmitLead(payload, {kind: "application"})` (main.js) gửi tới:
   - **Formspree** (`SITE.careersEndpoint`, để trống thì dùng `SITE.formEndpoint`): email về `paceland.vn@gmail.com`, tiêu đề "Ứng tuyển {vị trí} — {tên}";
   - **Google Sheet** (`SITE.leadEndpoint`) nếu đã cài `tools/google-apps-script-lead.gs`. Hồ sơ vào sheet "Ứng viên", có cột Trạng thái dạng dropdown: `NEW → CONTACTED → SCREENING → INTERVIEW → OFFER → HIRED / REJECTED / ARCHIVED`. Server chặn trùng: cùng SĐT trong 10 phút chỉ nhận một lần (đánh dấu **sau** khi đã ghi được). Mọi ô do người dùng nhập bắt đầu bằng `= + - @` được thêm `'` để Sheet không hiểu thành công thức. Apps Script trả `{ok:false}` thì trình duyệt coi là thất bại.
5. Kết quả gửi:
   - thành công: màn "Cảm ơn bạn. PaceLand đã nhận hồ sơ." kèm mã hồ sơ, nút **Nhắn Zalo PaceLand** đứng đầu, thanh dính đáy tự ẩn;
   - lỗi hoặc timeout 15 giây: báo lỗi, giữ nguyên dữ liệu đã nhập, gợi ý gửi qua Zalo hoặc email.

   Không cam kết thời gian phản hồi.
6. Hồ sơ ứng tuyển **không** kích hoạt `generate_lead`, Meta `Lead` hay Google Ads conversion của khách mua nhà. Chỉ bắn `apply_form_success` và Meta `SubmitApplication`. Form trang Đối tác (`data-lead-kind="partner"`) cũng không tính là lead mua nhà — bắn `partner_apply_submit`.
7. Form lead mua nhà (toàn site) chỉ báo "thành công" khi gửi được thật; lỗi thì giữ dữ liệu và hiện hotline/Zalo.

## 8. UTM attribution

`main.js › captureUtm()` chạy trên mọi trang và lưu ba khoá:

| Khoá | Nơi lưu | Nội dung |
|---|---|---|
| `pl_utm` | localStorage | Lần đầu có UTM — **chỉ cho lead mua nhà**, không ghi khi vào từ trang `/tuyen-dung*` (chiến dịch tuyển dụng không bị tính nhầm cho lead mua nhà) |
| `pl_first` | localStorage | Lần đầu vào site, kể cả truy cập trực tiếp: landing, referrer ngoài, ts |
| `pl_last` | sessionStorage | Nguồn của phiên hiện tại (last-touch) |

Tham số được bắt: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `fbclid`, `ttclid`, `msclkid`.

Khi dựng hồ sơ, UTM lấy theo last-touch và rơi về first-touch nếu phiên này không có UTM. `landing_page` và `referrer` luôn lấy từ first-touch.

Quy ước UTM cho bài tuyển dụng, **không hardcode năm vào hệ thống**:

```
?utm_source=facebook&utm_medium=organic&utm_campaign=recruitment_2026&utm_content=agent_post
```

- `utm_source`: `facebook`, `tiktok`, `zalo`, `linkedin`, `youtube`, `job_site`, `referral`, `share`.
- `utm_medium`: `organic`, `paid`, `referral`, `social`, `social_share`.
- `utm_campaign`: `recruitment_<đợt>`.

Nút chia sẻ tự gắn UTM: Facebook/LinkedIn `utm_source=<kênh>&utm_medium=social_share&utm_campaign=recruitment`; sao chép link / chia sẻ gốc `utm_source=share&utm_medium=referral&utm_campaign=recruitment`.

## 9. Analytics events

Luồng đi: `careers.js › track()` → `window.__plTrack` → `dataLayer.push({event, ...})` + GA4 `gtag` + Meta `trackCustom`, nếu đã có ID trong Admin → Cài đặt → Tracking.

| Event | Khi nào | Tham số (không PII) |
|---|---|---|
| `career_page_view` | Mở trang tổng | page_type, source_page, utm_source, utm_campaign, device_category |
| `job_view` | Mở trang vị trí đang tuyển (+ Meta `ViewContent`, TikTok `ViewContent`). Trang đã đóng không bắn. | job_slug, job_title, department, job_category |
| `job_filter` | Bấm lọc | filter_value, result_count |
| `career_cta_click` | CTA / hàng vị trí / Zalo trong trang | cta_location, job_slug |
| `job_apply_click` | Nút dẫn tới form (kể cả nút "Ứng tuyển" trên header) | cta_location |
| `career_proof_click` | Link bằng chứng (hồ sơ mẫu, Ban lãnh đạo, danh sách chứng nhận) | cta_location |
| `apply_form_start` | Focus ô đầu tiên | — |
| `apply_form_field_error` | Lỗi từng ô | field_name, error_type |
| `apply_form_blocked` | Honeypot bị điền / gửi quá nhanh | error_type (`honeypot` \| `too_fast`) |
| `apply_form_submit` | Gửi hợp lệ | job_slug, job_title (vị trí đang chọn) |
| `apply_form_success` | Gửi thành công (+ Meta `SubmitApplication`, TikTok `SubmitForm`) | job_slug, job_title |
| `apply_form_error` | Gửi lỗi / timeout / rate-limit | error_type, job_slug |
| `zalo_click`, `phone_click` | Bấm Zalo / gọi (toàn site, kèm ngữ cảnh vị trí). Trên trang tuyển dụng, bấm Zalo còn bắn Meta/TikTok `Contact`. | page, job_slug… |
| `job_share` | Chia sẻ | method |
| `career_path_interaction` | Bấm "Xem vị trí liên quan" trong lộ trình | path_step |
| `faq_open` | Mở câu hỏi | faq_index |
| `partner_apply_submit` | Gửi form trang Đối tác | page |

**Chặn PII**: `core.sanitizeParams` hoạt động theo whitelist tên tham số. Hàm này loại mọi giá trị chứa `@` hoặc chuỗi giống SĐT. Có test tự động kiểm tra; QA trên trình duyệt xác nhận không có tên/SĐT/email trong dataLayer.

**Funnel để dựng dashboard**: page view → job_view → job_apply_click → apply_form_start → apply_form_submit → apply_form_success.

Các bước sau đó (qualified → interview → hire) cập nhật ở cột Trạng thái của Google Sheet. Chỉ số cost per application / hire tính bằng chi phí ads chia cho số dòng tương ứng.

**Sẵn sàng quảng cáo**: điền GA4, Google Ads, Meta Pixel, TikTok Pixel trong Admin là chạy ngay. Hệ thống không cài pixel trùng, loader chỉ nạp khi có ID. Khi bật Meta Pixel, nên tắt "Automatic Advanced Matching" để pixel không tự đọc SĐT/email trong form.

## 10. SEO & JobPosting

- Mỗi trang có title, description, H1, canonical, OG (có `og:image:width/height` 1200×630), Twitter riêng và duy nhất. Test tự động kiểm tra trùng lặp và độ dài.
- **H1 là câu tìm việc**, khẩu hiệu thương hiệu là chữ lớn (không phải heading):
  - trang tổng: "Tuyển dụng PaceLand: 26 vị trí bất động sản tại Quận 2, TP.HCM";
  - trang vị trí: "Tuyển 20 Chuyên viên kinh doanh bất động sản (Agent) tại Quận 2, TP.HCM" (tự thêm "bất động sản" nếu tên vị trí chưa có).
- OG image 1200×630 cho từng vị trí, sinh bằng `tools/og_jobs.py`. Bố cục: khối chữ PACE LAND CAREERS bên trái, poster vị trí bên phải.
- `JobPosting` có: title, description (HTML — cùng nội dung `desc` hiển thị trên trang), identifier, datePosted (dữ liệu thật, hiển thị "Đăng ngày"), employmentType, hiringOrganization (`@id` Organization), jobLocation, totalJobOpenings, industry, directApply, url.
  - Chỉ Agent có `baseSalary` (lương cứng thật) và `experienceRequirements: "no requirements"`.
  - `validThrough` chỉ xuất hiện khi dữ liệu có. Không tự gia hạn 90 ngày như bản cũ.
- JobPosting chỉ có ở trang chi tiết. Trang tổng dùng `ItemList` (không xuất khi 0 vị trí).
- FAQPage: nội dung trong schema khớp đúng FAQ hiển thị, có test tự động đối chiếu.
- Breadcrumb: "Trang chủ" trỏ `https://paceland.vn/` (URL chuẩn), không phải `/index.html`.
- Organization schema có `alternateName: "Pace Land"`.
- Internal link:
  - Header và **footer tĩnh** (có sẵn trong HTML, bot đọc được không cần JS) → trang tuyển dụng.
  - SaleHub, trang chứng nhận, trang Đối tác (tầng "Kinh doanh trực tiếp" + khối đăng ký) → tuyển dụng.
  - 16 trang hồ sơ `/chuyen-vien/` → tuyển dụng; trang tuyển dụng → hồ sơ Ban lãnh đạo + một hồ sơ chuyên viên mẫu.
  - Blog "Tư duy đối tác", "Cố vấn tài sản khác môi giới truyền thống" → tuyển dụng.
  - Lộ trình → vị trí liên quan; trang vị trí ↔ vị trí khác.
- `llms.txt`: khối "Tuyển dụng (PaceLand Careers)" tự sinh từ JOBS mỗi lần prerender.
- Sitemap chỉ chứa trang tổng và các vị trí đang mở; URL được mã hoá (`encodeURI`). `lastmod` vị trí = `updated`, nếu không có thì `datePosted`; trang tổng = ngày mới nhất của các vị trí đang mở (ổn định, không đổi mỗi lần build).

## 11. Bảo mật & quyền riêng tư

- Validate phía trình duyệt (careers.js) và phía server (Apps Script: kiểm tra tên, SĐT, giới hạn độ dài từng cột, chặn formula injection).
- Làm sạch ký tự điều khiển, cắt độ dài, chuẩn hoá SĐT.
- Chống spam: honeypot `_gotcha`, gắn cờ gửi quá nhanh, rate-limit ở trình duyệt, chống gửi trùng ở server.
- Không log PII ra console, không đưa PII vào analytics. Không có secret trong code; endpoint Formspree là công khai theo thiết kế.
- Câu quyền riêng tư đặt ngay dưới nút gửi: "Thông tin chỉ được sử dụng cho mục đích tuyển dụng của PaceLand."

## 12. Kiểm thử

```bash
npm run check    # cú pháp JS
npm run build    # prerender
npm test         # node --test "tools/tests/*.test.mjs"
npm run verify   # cả ba
```

| File test | Nội dung |
|---|---|
| `recruitment-data.test.mjs` | Schema JOBS/CAREERS, slug, ngày, placeholder, cụm sáo rỗng bị cấm, độ dài SEO, bộ câu kinh nghiệm, `careersEndpoint`, chính sách 75% nhất quán giữa Tuyển dụng / Hỏi đáp / trang Đối tác |
| `recruitment-pages.test.mjs` | Metadata duy nhất, JobPosting hợp lệ, FAQ hiển thị = schema, H1 từ khoá, form POST + honeypot + neo `#form-ung-tuyen`, cấu trúc hàng vị trí, Ban lãnh đạo, thứ tự trang tổng, desc + ngày đăng, dải Agent đúng nhóm, poster không tải trên mobile, trang mồ côi, 0 vị trí, footer tĩnh + `?v=` là mã băm, breadcrumb, sitemap mã hoá |
| `careers-core.test.mjs` | SĐT (mọi định dạng), validate, Application record + attribution, chặn PII, rate-limit, gửi thành công / lỗi / timeout |
| `links.test.mjs` | Mọi link và ảnh nội bộ trên trang tuyển dụng trỏ tới file có thật |

Hiện: **42/42 pass**. GitHub Action `prerender.yml` (chạy khi đổi bất kỳ file trong `assets/js`, `assets/css`, prerender, test) chạy test sau prerender. Bước test đặt sau commit, nên không chặn nội dung xuất bản từ Admin.

## 13. Deployment checklist

1. `npm run verify`: check + build + test đều pass.
2. Có vị trí mới → `python tools/og_jobs.py` để sinh OG và bản 540px.
3. **Không cần tăng `?v=` bằng tay nữa**: prerender gắn `?v=<md5 8 ký tự>` theo nội dung file cho mọi JS/CSS trên mọi trang (kể cả `careers.css/js`).
4. Đồng bộ vào clone (`robocopy /MIR`, loại `.git .claude node_modules` và **`/XF package.json`**), commit, push. Tinh Gọn tự deploy trong 20–40 giây. Nếu webhook bỏ lỡ lần push, đẩy một commit rỗng để kích lại.
   - ⚠️ **KHÔNG đưa `package.json` lên repo**: Tinh Gọn không dùng Dockerfile mà tự nhận diện loại dự án — thấy `package.json` ở gốc repo sẽ build kiểu Node và lỗi (19/09: 4 lần build trượt cho tới khi gỡ file này). `package.json` chỉ để chạy `npm run verify` trên máy; CI gọi thẳng `node`.
   - Giữ gói deploy (không tính phần `.dockerignore` loại) dưới ~21MB; ảnh mới nên nén trước (≤ 1280px, q80).
5. Kiểm tra live **bằng `<title>`**, không bằng status code, vì hosting trả soft-404.
6. Google Search Console:
   - Request Indexing cho trang tổng và các trang vị trí mới.
   - Theo dõi báo cáo "Job postings" trong mục Enhancements.

## 14. Giới hạn hiện tại (phụ thuộc bên ngoài)

- **Formspree bản miễn phí** giới hạn khoảng 50 lần gửi mỗi tháng, đang dùng chung cho cả lead mua nhà. Trước khi chạy quảng cáo tuyển dụng: tạo form Formspree riêng và dán vào "Form endpoint cho hồ sơ ứng tuyển", hoặc cài Google Sheet (`SITE.leadEndpoint`).
- **Chưa có ID** GA4, Meta, TikTok, Google Ads, nên sự kiện hiện chỉ vào `dataLayer`. Điền ID trong Admin là đo được ngay.
- **Soft-404 của hosting**: alias router xử lý phía trình duyệt. Sửa gốc cần cấu hình nginx `try_files $uri $uri.html $uri/ =404;` và trang 404 thật (việc của nhà cung cấp hosting).
- **Chưa có** testimonial, câu chuyện nhân viên hay KPI thật. Hệ thống để trống có chủ đích (`stories: []`, `kpis: []`), không bịa.
- Chính sách cần anh xác nhận để ghi rõ hơn trên trang: 75% tính trên cơ sở nào; tỷ lệ đại lý (đang giữ 50–70%); loại hợp đồng, BHXH, thử việc; điều kiện nhận lương cứng; tiêu chí lên từng bậc lộ trình.
