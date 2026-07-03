/* ============================================================
   PACELAND MCP SERVER
   Công cụ cho Claude thao tác website có cấu trúc.
   Đăng ký sẵn trong .mcp.json ở gốc dự án — Claude Code mở thư mục
   website là tự thấy các tool: paceland_tong_quan, paceland_prerender,
   paceland_danh_sach_bai.
   ============================================================ */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

function loadData() {
  const src = fs.readFileSync(path.join(ROOT, "assets/js/data.js"), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  return sandbox.window;
}

const server = new McpServer({ name: "paceland", version: "1.0.0" });

server.tool(
  "paceland_tong_quan",
  "Tổng quan website PaceLand: số bài viết, dự án, FAQ, trạng thái cấu hình tracking/lead",
  {},
  async () => {
    const W = loadData();
    const tr = (W.SITE && W.SITE.tracking) || {};
    const lines = [
      `Bài viết: ${(W.POSTS || []).length} (mới nhất: ${W.POSTS && W.POSTS[0] ? W.POSTS[0].title : "—"})`,
      `Dự án: ${(W.PROJECTS || []).length}`,
      `FAQ: ${(W.FAQS || []).reduce((a, g) => a + (g.items || []).length, 0)} câu / ${(W.FAQS || []).length} nhóm`,
      `— Cấu hình —`,
      `GA4: ${tr.ga4 ? tr.ga4 : "CHƯA cấu hình"}`,
      `Google Ads: ${tr.adsId ? tr.adsId : "chưa (chỉ cần khi chạy ads)"}`,
      `Meta Pixel: ${tr.metaPixel ? tr.metaPixel : "chưa (chỉ cần khi chạy ads)"}`,
      `Lead endpoint (Sheet): ${W.SITE && W.SITE.leadEndpoint ? "ĐÃ cấu hình" : "CHƯA — form đang chạy demo, xem docs/tich-hop-huong-dan.md mục 1"}`,
      `Formspree: ${W.SITE && W.SITE.formEndpoint && W.SITE.formEndpoint.indexOf("your-form-id") === -1 ? "đã cấu hình" : "chưa"}`,
    ];
    return { content: [{ type: "text", text: lines.join("\n") }] };
  }
);

server.tool(
  "paceland_prerender",
  "Chạy prerender: sinh lại trang tĩnh bài viết/dự án + sitemap (bắt buộc sau khi đổi nội dung, trước khi deploy)",
  {},
  async () => {
    try {
      const out = execFileSync("node", [path.join(ROOT, "tools", "prerender.mjs")], {
        cwd: ROOT, encoding: "utf8", timeout: 120000,
      });
      return { content: [{ type: "text", text: out }] };
    } catch (e) {
      return { content: [{ type: "text", text: "LỖI prerender: " + (e.stderr || e.message) }], isError: true };
    }
  }
);

server.tool(
  "paceland_danh_sach_bai",
  "Liệt kê bài viết trên site (id, tiêu đề, ngày, chuyên mục) — dùng để tránh viết trùng đề tài",
  { loc: z.string().optional().describe("Lọc theo từ khoá trong tiêu đề (tuỳ chọn)") },
  async ({ loc }) => {
    const W = loadData();
    let posts = W.POSTS || [];
    if (loc) {
      const q = loc.toLowerCase();
      posts = posts.filter((p) => (p.title + " " + p.id).toLowerCase().includes(q));
    }
    const text = posts.map((p) => `${p.date} · [${p.category}] ${p.title}  (id: ${p.id})`).join("\n") || "Không có bài khớp.";
    return { content: [{ type: "text", text }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
