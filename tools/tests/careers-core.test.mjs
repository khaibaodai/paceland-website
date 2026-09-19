/* Unit test logic phía trình duyệt (assets/js/careers.js — phần CORE, không cần DOM) */
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const core = require("../../assets/js/careers.js");

test("Chuẩn hoá SĐT di động Việt Nam", () => {
  assert.equal(core.normalizePhone("0903 983 737"), "0903983737");
  assert.equal(core.normalizePhone("+84 903.983.737"), "0903983737");
  assert.equal(core.normalizePhone("84903983737"), "0903983737");
  assert.equal(core.normalizePhone("+84 0903 983 737"), "0903983737", "+84 kèm số 0 thừa");
  assert.equal(core.normalizePhone("0084 903 983 737"), "0903983737", "tiền tố quốc tế 0084");
  assert.equal(core.normalizePhone("903983737"), "0903983737", "thiếu số 0 đầu");
  assert.equal(core.normalizePhone("0203983737"), "", "đầu số không phải di động");
  assert.equal(core.normalizePhone("203983737"), "", "9 số nhưng không phải di động");
  assert.equal(core.normalizePhone("12345"), "");
  assert.equal(core.normalizePhone(""), "");
});

test("Validate: thiếu trường bắt buộc", () => {
  const r = core.validate({});
  assert.equal(r.ok, false);
  assert.deepEqual(Object.keys(r.errors).sort(), ["full_name", "phone", "position"]);
  assert.equal(r.errors.phone, "required");
});

test("Validate: dữ liệu sai định dạng", () => {
  const r = core.validate({ full_name: "A", phone: "0901", position: "Agent", email: "abc@", profile_url: "khong co cham" });
  assert.equal(r.errors.full_name, "short");
  assert.equal(r.errors.phone, "invalid");
  assert.equal(r.errors.email, "invalid");
  assert.equal(r.errors.profile_url, "invalid");
});

test("Validate: hồ sơ hợp lệ tối thiểu (3 trường)", () => {
  const r = core.validate({ full_name: "Nguyễn Văn A", phone: "0903983737", position: "Agent" });
  assert.equal(r.ok, true);
  assert.deepEqual(r.errors, {});
});

test("Link hồ sơ: tự thêm https://", () => {
  assert.equal(core.normalizeUrl("linkedin.com/in/abc"), "https://linkedin.com/in/abc");
  assert.equal(core.normalizeUrl(""), "");
});

test("buildApplication: đủ trường của Application record + attribution", () => {
  const app = core.buildApplication(
    { full_name: "  Nguyễn  Văn A ", phone: "+84 903 983 737", position: "Agent", experience: "Dưới 2 năm", email: "a@b.vn", profile_url: "linkedin.com/in/a", message: "Xin chào" },
    { now: Date.UTC(2026, 8, 19), jobSlug: "agent-bat-dong-san", path: "/tuyen-dung/agent-bat-dong-san.html", url: "https://paceland.vn/tuyen-dung/agent-bat-dong-san.html", device: "mobile",
      attribution: { first: { utm_source: "facebook", landing: "/tuyen-dung.html", referrer: "https://m.facebook.com/" }, last: { utm_source: "tiktok", utm_campaign: "recruitment_q4", ttclid: "T1" } } }
  );
  for (const k of ["id", "created_at", "full_name", "phone", "email", "position", "experience", "profile_url", "message", "source_page", "source_url", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "referrer", "device_type", "status"]) {
    assert.ok(k in app, `thiếu ${k}`);
  }
  assert.equal(app.kind, "application");
  assert.equal(app.status, "NEW");
  assert.equal(app.full_name, "Nguyễn Văn A");
  assert.equal(app.phone, "0903983737");
  assert.equal(app.profile_url, "https://linkedin.com/in/a");
  assert.equal(app.utm_source, "tiktok", "ưu tiên last-touch");
  assert.equal(app.ttclid, "T1");
  assert.equal(app.landing_page, "/tuyen-dung.html", "trang đích đầu tiên từ first-touch");
  assert.equal(app.referrer, "https://m.facebook.com/");
  assert.equal(app.created_at, "2026-09-19T00:00:00.000Z");
  assert.match(app.id, /^APP-[0-9A-Z]{8}$/);
});

test("sanitizeParams: chặn PII khỏi analytics", () => {
  const p = core.sanitizeParams({ job_slug: "agent", full_name: "A", phone: "0903983737", email: "a@b.vn", cta_location: "hero", field_name: "phone", page: "/tuyen-dung.html", utm_campaign: "123456789", source_page: "0903 983 737", filter_value: "x@y.z" });
  assert.deepEqual(Object.keys(p).sort(), ["cta_location", "field_name", "job_slug", "page", "utm_campaign"].sort());
  assert.equal(p.field_name, "phone", "tên trường được phép, giá trị không");
});

test("Rate-limit: tối đa 3 lần / 10 phút", () => {
  const now = 1_000_000_000;
  const W = 600000;
  assert.equal(core.rateLimit([now - 1000, now - 2000], now, 3, W).ok, true);
  assert.equal(core.rateLimit([now - 1000, now - 2000, now - 3000], now, 3, W).ok, false);
  const r = core.rateLimit([now - W - 1, now - 1000], now, 3, W);
  assert.equal(r.ok, true);
  assert.equal(r.history.length, 1, "bỏ mốc cũ ngoài cửa sổ");
});

test("submit: thành công / bị từ chối / lỗi mạng / timeout / không có kênh gửi", async () => {
  assert.deepEqual(await core.submit({}, () => Promise.resolve(true)), { ok: true, reason: "" });
  assert.deepEqual(await core.submit({}, () => Promise.resolve(false)), { ok: false, reason: "rejected" });
  assert.deepEqual(await core.submit({}, () => Promise.reject(new Error("x"))), { ok: false, reason: "network" });
  assert.deepEqual(await core.submit({}, () => new Promise(() => {}), 30), { ok: false, reason: "timeout" });
  assert.deepEqual(await core.submit({}, null), { ok: false, reason: "no_sender" });
});

test("deviceType theo độ rộng + UA", () => {
  assert.equal(core.deviceType(375, "Mozilla/5.0 (iPhone)"), "mobile");
  assert.equal(core.deviceType(800, ""), "tablet");
  assert.equal(core.deviceType(1440, "Mozilla/5.0 (Windows NT 10.0)"), "desktop");
});
