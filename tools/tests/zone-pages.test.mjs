/* Trang phân khu /du-an/<dự án>/<slug>.html — sinh từ assets/data/phan-khu/<slug>.json */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { loadData, read, exists, ldBlocks, meta, visibleText, ROOT } from "./_load.mjs";

const W = loadData();
const SITE_URL = "https://paceland.vn";
const ZONES = (W.PROJECTS || []).flatMap((p) => (p.zones || []).filter((z) => z.slug).map((z) => ({ p, z, rel: `du-an/${p.id}/${z.slug}.html` })));

test("Mỗi phân khu có slug đều có file dữ liệu và trang đã sinh", () => {
  assert.ok(ZONES.length >= 5, "cần ít nhất 5 phân khu có trang riêng");
  for (const { z, rel } of ZONES) {
    assert.ok(exists(`assets/data/phan-khu/${z.slug}.json`), `thiếu dữ liệu ${z.slug}.json`);
    assert.ok(exists(rel), `chưa sinh trang ${rel}`);
    JSON.parse(fs.readFileSync(path.join(ROOT, "assets/data/phan-khu", `${z.slug}.json`), "utf8"));
  }
});

test("Metadata riêng cho từng trang phân khu, không trùng nhau", () => {
  const titles = new Set(), descs = new Set();
  for (const { p, z, rel } of ZONES) {
    const h = read(rel);
    const t = /<title>([^<]+)<\/title>/.exec(h)[1];
    const d = meta(h, "name", "description");
    assert.ok(t && t.length <= 70, `${z.slug}: title ${t ? t.length : 0} ký tự`);
    assert.ok(d && d.length >= 60, `${z.slug}: description quá ngắn`);
    assert.ok(!titles.has(t), `${z.slug}: title trùng`); titles.add(t);
    assert.ok(!descs.has(d), `${z.slug}: description trùng`); descs.add(d);
    assert.match(h, new RegExp(`<link rel="canonical" href="${SITE_URL}/du-an/${p.id}/${z.slug}\\.html">`));
    assert.equal((h.match(/<h1\b/g) || []).length, 1, `${z.slug}: cần đúng 1 H1`);
  }
});

test("Schema: Organization, Breadcrumb, ApartmentComplex và FAQ khớp nội dung hiển thị", () => {
  for (const { p, z, rel } of ZONES) {
    const h = read(rel);
    const ld = ldBlocks(h);
    const ids = ld.map((b) => b.id);
    assert.ok(ids.includes("pl-ld-org") && ids.includes("pl-ld-breadcrumb") && ids.includes("pl-ld-zone"), `${z.slug}: thiếu schema`);
    const zone = ld.find((b) => b.id === "pl-ld-zone").data;
    assert.equal(zone["@type"], "ApartmentComplex");
    assert.equal(zone.url, `${SITE_URL}/du-an/${p.id}/${z.slug}.html`);
    assert.equal(zone.containedInPlace.name, p.name);
    const bc = ld.find((b) => b.id === "pl-ld-breadcrumb").data.itemListElement;
    assert.equal(bc[0].item, `${SITE_URL}/`);
    assert.equal(bc[bc.length - 1].name, z.name);
    const faqLd = ld.find((b) => b.id === "pl-ld-faq");
    const visible = [...h.matchAll(/<details><summary>([\s\S]*?)<\/summary>/g)].map((m) => m[1].replace(/&amp;/g, "&").replace(/&quot;/g, '"').trim());
    if (faqLd) {
      assert.equal(faqLd.data.mainEntity.length, visible.length, `${z.slug}: số câu FAQ lệch schema`);
      faqLd.data.mainEntity.forEach((q, i) => assert.equal(q.name, visible[i], `${z.slug}: câu hỏi ${i + 1} lệch`));
    }
  }
});

test("Trang phân khu có form nhận thông tin, link về dự án và không sót placeholder", () => {
  for (const { p, z, rel } of ZONES) {
    const h = read(rel);
    assert.match(h, new RegExp(`data-lead-source="phan-khu-${z.slug}"`), `${z.slug}: form thiếu nguồn lead`);
    assert.ok(h.includes(`value="${p.name} — ${z.name}"`), `${z.slug}: form thiếu tên phân khu`);
    assert.ok(h.includes(`href="/du-an/${p.id}.html"`), `${z.slug}: thiếu link về trang dự án`);
    assert.ok(!/\{\{\w+\}\}/.test(h), `${z.slug}: còn placeholder`);
    assert.ok(!/undefined|\[object Object\]/.test(visibleText(h)), `${z.slug}: lộ giá trị lỗi trong nội dung`);
  }
});

test("Ảnh và link nội bộ của trang phân khu đều tồn tại", () => {
  for (const { rel } of ZONES) {
    const h = read(rel);
    const targets = new Set();
    for (const m of h.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const u = m[1];
      if (/^(https?:|mailto:|tel:|#|data:)/.test(u)) continue;
      targets.add(u.split("#")[0].split("?")[0]);
    }
    const missing = [...targets].map((u) => (u.startsWith("/") ? u.slice(1) : path.posix.join(path.posix.dirname(rel), u))).filter((f) => f && !fs.existsSync(path.join(ROOT, f)));
    assert.deepEqual(missing, [], `${rel}: link hỏng → ${missing.join(", ")}`);
  }
});

test("Trang dự án liệt kê phân khu dạng card và trỏ đúng trang chi tiết", () => {
  for (const p of (W.PROJECTS || []).filter((x) => (x.zones || []).some((z) => z.slug))) {
    const h = read(`du-an/${p.id}.html`);
    assert.match(h, /class="zone-grid/, `${p.id}: thiếu lưới phân khu`);
    for (const z of p.zones.filter((x) => x.slug)) {
      assert.ok(h.includes(`href="/du-an/${p.id}/${z.slug}.html"`), `${p.id}: card ${z.slug} chưa có link`);
    }
  }
});

test("Sitemap chứa các trang phân khu", () => {
  const sm = read("sitemap.xml");
  for (const { p, z } of ZONES) assert.ok(sm.includes(`${SITE_URL}/du-an/${p.id}/${z.slug}.html`), `sitemap thiếu ${z.slug}`);
});
