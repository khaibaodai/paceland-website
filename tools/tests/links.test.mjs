/* Link nội bộ trên các trang tuyển dụng phải trỏ tới file có thật.
   (Hosting trả soft-404 cho URL sai, nên phải kiểm tra ở tầng file.) */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ROOT, read } from "./_load.mjs";

function targets(html) {
  const out = new Set();
  for (const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|#|data:|javascript:)/.test(u)) continue;
    out.add(u.split("#")[0].split("?")[0]);
  }
  for (const m of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    /* Ứng viên srcset cách nhau bằng dấu phẩy + khoảng trắng; data: URI (có dấu phẩy bên trong) bỏ qua */
    for (const part of m[1].split(/,\s+/)) {
      const u = part.trim().split(/\s+/)[0];
      if (u && !u.startsWith("data:")) out.add(u.split("?")[0]);
    }
  }
  out.delete("");
  return [...out];
}
const toFile = (u, fromRel) => {
  const abs = u.startsWith("/") ? u.slice(1) : path.posix.join(path.posix.dirname(fromRel), u);
  return abs === "" ? "index.html" : abs;
};

const PAGES = ["tuyen-dung.html", ...fs.readdirSync(path.join(ROOT, "tuyen-dung")).filter((f) => f.endsWith(".html")).map((f) => "tuyen-dung/" + f)];

for (const rel of PAGES) {
  test(`Link nội bộ hợp lệ: ${rel}`, () => {
    const missing = targets(read(rel)).map((u) => toFile(u, rel)).filter((f) => !fs.existsSync(path.join(ROOT, f)));
    assert.deepEqual(missing, [], `${rel}: link hỏng → ${missing.join(", ")}`);
  });
}
