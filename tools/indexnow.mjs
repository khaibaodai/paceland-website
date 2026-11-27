#!/usr/bin/env node
/* IndexNow — bao cho Bing (va Yandex, Seznam, Naver) biet trang nao vua doi.
 *
 * Vi sao can: ChatGPT tim kiem tren nen chi muc cua Bing. Bai hay toi dau ma
 * Bing chua lay ve kho thi AI khong trich dan duoc. IndexNow day URL thang
 * vao hang doi cua Bing, KHONG CAN tai khoan Bing Webmaster.
 *
 * Cach dung:
 *   node tools/indexnow.mjs            -> day cac URL moi/vua doi (mac dinh)
 *   node tools/indexnow.mjs --all      -> day toan bo URL trong sitemap.xml
 *   node tools/indexnow.mjs --dry      -> chi in ra, khong gui
 *   node tools/indexnow.mjs <url> ...  -> day dung may URL tu chi dinh
 *
 * Chay SAU khi deploy xong va trang da live — Bing se vao lay that, URL chua
 * song thi phi mot lan bao.
 */
import { readFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const HOST = "paceland.vn";
const ENDPOINT = "https://api.indexnow.org/indexnow";

/* Khoa nam o file <khoa>.txt ngay goc site; tu tim de khoi phai sua 2 cho khi doi khoa */
function layKhoa() {
  const f = readdirSync(ROOT).find((n) => /^[0-9a-f]{8,128}\.txt$/i.test(n));
  if (!f) throw new Error("Khong thay file khoa IndexNow (<khoa>.txt) o goc du an");
  const key = readFileSync(resolve(ROOT, f), "utf8").trim();
  if (key !== f.replace(/\.txt$/i, "")) throw new Error(`Noi dung ${f} phai dung bang ten file, khong co gi khac`);
  return key;
}

function urlTuSitemap() {
  const xml = readFileSync(resolve(ROOT, "sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const all = args.includes("--all");
const truyen = args.filter((a) => a.startsWith("http"));

let urls;
if (truyen.length) urls = truyen;
else if (all) urls = urlTuSitemap();
else {
  /* Mac dinh: cac trang doi gan day theo <lastmod> moi nhat trong sitemap */
  const xml = readFileSync(resolve(ROOT, "sitemap.xml"), "utf8");
  const items = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    loc: (m[1].match(/<loc>\s*([^<\s]+)/) || [])[1],
    mod: (m[1].match(/<lastmod>\s*([^<\s]+)/) || [])[1] || "",
  }));
  const moiNhat = items.reduce((a, b) => (b.mod > a ? b.mod : a), "");
  urls = items.filter((i) => i.mod === moiNhat && i.loc).map((i) => i.loc);
}

urls = [...new Set(urls)].filter((u) => {
  try {
    return new URL(u).hostname === HOST;
  } catch {
    return false;
  }
});

if (!urls.length) {
  console.error("Khong co URL nao hop le de gui");
  process.exit(1);
}
if (urls.length > 10000) throw new Error("IndexNow nhan toi da 10.000 URL moi lan");

const key = layKhoa();
const body = { host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList: urls };

console.log(`IndexNow -> ${urls.length} URL (khoa ${key.slice(0, 6)}…)`);
urls.forEach((u) => console.log("  ", u));

if (dry) {
  console.log("\n--dry: chua gui gi ca.");
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});
const text = await res.text();

/* 200 = da nhan, 202 = da nhan va dang cho kiem tra khoa */
console.log(`\nHTTP ${res.status} ${res.statusText}${text ? " — " + text.slice(0, 300) : ""}`);
if (res.status === 403) console.error("403 = Bing khong doc duoc file khoa. Kiem tra https://" + HOST + "/" + key + ".txt da live chua.");
if (res.status === 422) console.error("422 = co URL khong thuoc host " + HOST);
process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
