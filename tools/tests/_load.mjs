/* Helper chung cho test: nạp data.js như prerender, đọc file trang đã sinh */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

export function loadData() {
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js/data.js"), "utf8"), sandbox);
  return sandbox.window;
}

export const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
export const exists = (rel) => fs.existsSync(path.join(ROOT, rel));

/* Các khối JSON-LD trong trang: [{id, data}] */
export function ldBlocks(html) {
  const out = [];
  const re = /<script type="application\/ld\+json" id="([^"]+)">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) out.push({ id: m[1], data: JSON.parse(m[2]) });
  return out;
}
export const meta = (html, attr, name) => {
  const m = new RegExp(`<meta ${attr}="${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}" content="([^"]*)"`).exec(html);
  return m ? m[1] : null;
};
export const visibleText = (html) => html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/\s+/g, " ");
