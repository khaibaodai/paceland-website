/* JD chi tiết: mô tả công việc, chỉ số theo dõi (KPI), quyền lợi và nghĩa vụ của từng vị trí */
import test from "node:test";
import assert from "node:assert/strict";
import { loadData, read } from "./_load.mjs";

const W = loadData();
const OPEN = (W.JOBS || []).filter((j) => j.status === "open");
const page = (j) => read(`tuyen-dung/${j.id}.html`);

test("Có vị trí đang tuyển để kiểm", () => {
  assert.ok(OPEN.length >= 5, `chỉ thấy ${OPEN.length} vị trí đang mở`);
});

/* ---------- Dữ liệu ---------- */
test("Mỗi vị trí có JD đủ bốn phần: việc, chỉ số, quyền lợi, nghĩa vụ", () => {
  for (const j of OPEN) {
    assert.ok((j.duties || []).length >= 6, `${j.id}: mô tả công việc còn sơ sài (${(j.duties || []).length} mục)`);
    assert.ok((j.kpis || []).length >= 4, `${j.id}: thiếu chỉ số theo dõi`);
    assert.ok((j.obligations || []).length >= 4, `${j.id}: thiếu phần nghĩa vụ`);
    assert.ok((j.benefits || []).length >= 4, `${j.id}: thiếu phần quyền lợi`);
    assert.ok(j.kpiNote, `${j.id}: thiếu ghi chú cho phần chỉ số`);
    assert.ok(j.obligationNote, `${j.id}: thiếu ghi chú cho phần nghĩa vụ`);
  }
});

test("Mỗi đầu việc có tiêu đề dẫn rồi mới tới phần giải thích", () => {
  for (const j of OPEN) {
    for (const d of j.duties) {
      assert.match(d, /^\*\*[^*]{6,60}\*\* — .{30,}/, `${j.id}: đầu việc chưa đúng khuôn "**Tiêu đề** — chi tiết": ${d.slice(0, 60)}`);
    }
    for (const o of j.obligations) {
      assert.match(o, /^\*\*[^*]{6,70}\*\*/, `${j.id}: nghĩa vụ chưa có tiêu đề dẫn: ${o.slice(0, 60)}`);
    }
  }
});

/* PaceLand chưa ban hành định mức chính thức. Chỉ số là thứ ĐƯỢC ĐO, không phải ngưỡng phải đạt —
   đăng một con số chưa có thật lên tin tuyển dụng là cam kết sai với ứng viên. */
test("Chỉ số chỉ nêu cái được đo, không tự đặt ngưỡng con số", () => {
  const nguong = [
    /\d+\s*(cuộc gọi|khách|giao dịch|hợp đồng|video|bài|tin)\s*\/\s*(ngày|tuần|tháng)/i,
    /tối thiểu\s+\d/i,
    /ít nhất\s+\d+\s*(cuộc|khách|giao dịch|hợp đồng|bài|video)/i,
    /đạt\s+\d+\s*%/i,
    /\d+\s*triệu\s*(doanh số|doanh thu)/i,
  ];
  for (const j of OPEN) {
    for (const k of j.kpis) {
      for (const re of nguong) {
        assert.ok(!re.test(k), `${j.id}: chỉ số đang tự đặt ngưỡng ("${k}") — ngưỡng phải do anh Khải chốt trước`);
      }
    }
    assert.match(j.kpiNote, /ngưỡng|thống nhất|chốt/i, `${j.id}: ghi chú chỉ số phải nói rõ ngưỡng được thống nhất khi nhận việc`);
  }
});

/* Ngành bất động sản: dữ liệu khách và bảng giá là tài sản nhạy cảm nhất */
test("Mọi vị trí đều có nghĩa vụ bảo mật và nghĩa vụ bàn giao", () => {
  for (const j of OPEN) {
    const all = j.obligations.join(" ").toLowerCase();
    assert.match(all, /bảo mật|bảo vệ dữ liệu/, `${j.id}: thiếu nghĩa vụ bảo mật`);
    assert.match(all, /bàn giao/, `${j.id}: thiếu nghĩa vụ bàn giao khi nghỉ việc`);
  }
});

test("Vị trí tiếp xúc khách phải có nghĩa vụ nói đúng dữ liệu công bố", () => {
  for (const id of ["agent-bat-dong-san", "giam-doc-kinh-doanh", "digital-marketing", "media-marketing"]) {
    const j = OPEN.find((x) => x.id === id);
    if (!j) continue;
    assert.match(j.obligations.join(" ").toLowerCase(), /đã công bố|phát hành/, `${id}: thiếu ràng buộc nói đúng dữ liệu chủ đầu tư đã phát hành`);
  }
});

test("Quyền lợi không hứa điều PaceLand chưa có chính sách", () => {
  const camKetChuaCo = [/bảo hiểm/i, /thưởng tháng 13/i, /du lịch hằng năm/i, /nghỉ phép \d+ ngày/i, /cổ phần/i];
  for (const j of OPEN) {
    for (const b of j.benefits) {
      for (const re of camKetChuaCo) {
        assert.ok(!re.test(b), `${j.id}: quyền lợi "${b}" chưa có trong chính sách đã xác nhận`);
      }
    }
  }
});

/* Kiểm trên trang đã sinh vì lương cứng viết bằng placeholder {{agentBase}} trong dữ liệu —
   thứ ứng viên đọc được mới là thứ phải đúng. */
test("Mức chia sẻ doanh thu 75% và lương cứng hiện đúng trên trang Agent", () => {
  const h = read("tuyen-dung/agent-bat-dong-san.html");
  const sec = h.slice(h.indexOf("Quyền lợi của bạn"), h.indexOf("Nghĩa vụ của bạn"));
  assert.match(sec, /75\s*%/, "quyền lợi Agent phải nêu mức 75%");
  assert.match(sec, /5 triệu/, "quyền lợi Agent phải nêu lương cứng 5 triệu");
});

/* ---------- Trang đã sinh ---------- */
test("Ba mục mới hiện trên cả năm trang vị trí", () => {
  for (const j of OPEN) {
    const h = page(j);
    for (const m of ["Chỉ số theo dõi kết quả", "Quyền lợi của bạn", "Nghĩa vụ của bạn"]) {
      assert.ok(h.includes(m), `${j.id}: trang thiếu mục "${m}"`);
    }
    assert.ok(h.includes('class="cr-duty-list"'), `${j.id}: danh sách nghĩa vụ chưa render`);
    assert.ok(h.includes('class="cr-kpinote"'), `${j.id}: ghi chú chỉ số chưa render`);
  }
});

test("Dấu ** đã thành chữ in đậm, không lọt ra trang", () => {
  for (const j of OPEN) {
    const h = page(j);
    assert.ok(!h.includes("**"), `${j.id}: còn dấu ** thô trên trang`);
    assert.match(h, /<li><strong>[^<]+<\/strong>/, `${j.id}: đầu việc chưa in đậm được tiêu đề`);
  }
});

test("JobPosting mang đủ JD cho Google Jobs", () => {
  for (const j of OPEN) {
    const h = page(j);
    const m = h.match(/id="pl-ld-job"[^>]*>([\s\S]*?)<\/script>/);
    assert.ok(m, `${j.id}: thiếu JobPosting`);
    const ld = JSON.parse(m[1]);
    assert.ok(!ld.description.includes("**"), `${j.id}: mô tả trong schema còn dấu ** thô`);
    for (const m2 of ["Mô tả công việc", "Yêu cầu", "Chỉ số theo dõi kết quả", "Quyền lợi", "Nghĩa vụ"]) {
      assert.ok(ld.description.includes(m2), `${j.id}: schema thiếu mục "${m2}"`);
    }
    assert.ok(ld.responsibilities && ld.responsibilities.length > 100, `${j.id}: thiếu trường responsibilities`);
    assert.ok(ld.jobBenefits && ld.jobBenefits.length > 40, `${j.id}: thiếu trường jobBenefits`);
    assert.ok(!/\{\{[a-zA-Z]+\}\}/.test(ld.description), `${j.id}: schema còn placeholder chưa thay`);
  }
});
