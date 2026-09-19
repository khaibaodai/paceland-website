/* Kiểm tra mô hình dữ liệu tuyển dụng: JOBS + CAREERS (assets/js/data.js) */
import test from "node:test";
import assert from "node:assert/strict";
import { loadData, exists } from "./_load.mjs";

const W = loadData();
const JOBS = W.JOBS, C = W.CAREERS;
const CATS = ["kinh-doanh", "marketing", "van-hanh", "lanh-dao"];
const BANNED = [/thu nhập không giới hạn/i, /môi trường năng động/i, /work hard play hard/i, /chỉ cần đam mê/i, /cơ hội thăng tiến rộng mở/i];

test("JOBS & CAREERS được xuất ra window", () => {
  assert.ok(Array.isArray(JOBS) && JOBS.length > 0, "JOBS rỗng");
  assert.ok(C && typeof C === "object", "CAREERS chưa có");
});

test("Mỗi vị trí đủ trường bắt buộc, slug hợp lệ và duy nhất", () => {
  const ids = new Set();
  for (const j of JOBS) {
    for (const k of ["id", "title", "count", "category", "dept", "type", "location", "salary", "status", "desc", "summary", "datePosted"]) {
      assert.ok(j[k] !== undefined && String(j[k]).trim() !== "", `${j.id || "?"}: thiếu ${k}`);
    }
    assert.match(j.id, /^[a-z0-9]+(-[a-z0-9]+)*$/, `${j.id}: slug không hợp lệ`);
    assert.ok(!ids.has(j.id), `${j.id}: slug trùng`);
    ids.add(j.id);
    assert.ok(["open", "closed"].includes(j.status), `${j.id}: status phải open|closed`);
    assert.ok(CATS.includes(j.category), `${j.id}: category không hợp lệ`);
    assert.match(j.datePosted, /^\d{4}-\d{2}-\d{2}$/, `${j.id}: datePosted phải YYYY-MM-DD`);
    if (j.validThrough) assert.match(j.validThrough, /^\d{4}-\d{2}-\d{2}$/, `${j.id}: validThrough phải YYYY-MM-DD`);
    assert.ok(parseInt(j.count, 10) > 0, `${j.id}: count phải là số > 0`);
    assert.ok(Array.isArray(j.duties) && j.duties.length >= 3, `${j.id}: cần ít nhất 3 đầu việc`);
    assert.ok(Array.isArray(j.faq) && j.faq.every((f) => f.q && f.a), `${j.id}: FAQ thiếu câu hỏi/trả lời`);
    if (j.baseSalary) assert.ok(Number.isFinite(j.baseSalary.value) && j.baseSalary.value > 0, `${j.id}: baseSalary.value phải là số`);
    if (j.poster) assert.ok(exists(j.poster), `${j.id}: không thấy poster ${j.poster}`);
  }
});

test("Các vị trí đang mở dẫn tới trang lộ trình / module có thật", () => {
  const stageIds = C.path.stages.map((s) => s.id);
  const modIds = C.ecosystem.modules.map((m) => m.id);
  for (const j of JOBS) {
    if (j.pathStage) assert.ok(stageIds.includes(j.pathStage), `${j.id}: pathStage ${j.pathStage} không có trong CAREERS.path`);
    for (const m of j.system || []) assert.ok(modIds.includes(m), `${j.id}: module ${m} không có trong CAREERS.ecosystem`);
  }
  for (const st of C.path.stages) if (st.job) assert.ok(JOBS.some((j) => j.id === st.job), `path ${st.id} trỏ tới vị trí không tồn tại`);
});

test("CAREERS đủ các khối cho trang tổng", () => {
  for (const k of ["hero", "facts", "story", "ecosystem", "path", "brand", "income", "products", "process", "form", "faq", "finalCta", "seo"]) {
    assert.ok(C[k], `CAREERS thiếu ${k}`);
  }
  assert.equal(C.story.steps.length, 5, "story cần 5 bước");
  assert.ok(C.faq.length >= 6, "FAQ trang tổng cần ≥ 6 câu");
  const projIds = W.PROJECTS.map((p) => p.id);
  for (const id of C.products.focus) assert.ok(projIds.includes(id), `products.focus: ${id} không có trong PROJECTS`);
});

test("Không dùng cụm sáo rỗng bị cấm trong nội dung tuyển dụng", () => {
  const blob = JSON.stringify({ JOBS, C });
  for (const re of BANNED) assert.ok(!re.test(blob), `Cụm bị cấm: ${re}`);
});

test("Placeholder chỉ dùng biến đã hỗ trợ", () => {
  const ok = new Set(["projects", "posts", "partners", "openings", "roles", "agentCount", "agentSalary", "agentBase", "hotline", "email", "address", "locShort", "jobsList", "rolesList", "focusList"]);
  const blob = JSON.stringify({ JOBS, C });
  for (const m of blob.matchAll(/\{\{(\w+)\}\}/g)) assert.ok(ok.has(m[1]), `Placeholder lạ: {{${m[1]}}}`);
});

test("SEO từng vị trí: title ≤ 62, description ≤ 160 ký tự, không trùng", () => {
  const t = new Set(), d = new Set();
  for (const j of JOBS.filter((x) => x.status === "open")) {
    assert.ok(j.seoTitle && j.seoTitle.length <= 62, `${j.id}: seoTitle ${j.seoTitle ? j.seoTitle.length : 0} ký tự`);
    assert.ok(j.seoDescription && j.seoDescription.length <= 160, `${j.id}: seoDescription ${j.seoDescription ? j.seoDescription.length : 0} ký tự`);
    assert.ok(!t.has(j.seoTitle) && !d.has(j.seoDescription), `${j.id}: SEO trùng`);
    t.add(j.seoTitle); d.add(j.seoDescription);
  }
});

test("Form: có bộ câu kinh nghiệm cho nhóm kinh doanh và nhóm còn lại; có careersEndpoint", () => {
  assert.ok(Array.isArray(C.form.experienceOptionsSales) && C.form.experienceOptionsSales.length >= 3);
  assert.ok(Array.isArray(C.form.experienceOptions) && C.form.experienceOptions.length >= 3);
  assert.equal(typeof W.SITE.careersEndpoint, "string", "SITE.careersEndpoint phải có (chuỗi rỗng = dùng formEndpoint)");
});

test("Chính sách chia sẻ doanh thu nhất quán giữa Tuyển dụng, Hỏi đáp và trang Đối tác", async () => {
  const fs = await import("node:fs");
  const path = await import("node:path");
  const { ROOT } = await import("./_load.mjs");
  const faqBlob = JSON.stringify(W.FAQS);
  assert.ok(!/55[–-]70%/.test(faqBlob), "FAQ chung còn mức 55–70% cũ");
  const doiTac = fs.readFileSync(path.join(ROOT, "doi-tac.html"), "utf8");
  assert.ok(!/55[–-]65%/.test(doiTac), "doi-tac.html còn mức 55–65% cũ");
  assert.ok(/Đến 75%/.test(doiTac), "doi-tac.html chưa có mức 'Đến 75%'");
  const agent = JOBS.find((j) => j.pathStage === "sales");
  assert.ok(/75%/.test(agent.salary), "thu nhập Agent phải ghi mức 75%");
});
