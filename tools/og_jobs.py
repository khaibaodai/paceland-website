# -*- coding: utf-8 -*-
"""
PACELAND — Sinh ảnh cho Recruitment System (chạy lại an toàn, idempotent)
  python tools/og_jobs.py

1. OG 1200x630 cho từng vị trí đang tuyển  -> assets/img/tuyen-dung/og-<slug>.jpg
   và cho trang tuyển dụng tổng             -> assets/img/tuyen-dung/og-tuyen-dung.jpg
   (bố cục: khối chữ trắng/đen/đỏ bên trái + poster vị trí bên phải)
2. Biến thể 540px cho poster (srcset mobile) -> <poster>-540.jpg
3. Thumbnail 192x128 cho dự án trọng tâm      -> assets/img/tuyen-dung/du-an-<id>.jpg

Dữ liệu đọc từ assets/js/data.js (JOBS, CAREERS, PROJECTS) qua Node.
Font: Segoe UI (Windows) — có đủ dấu tiếng Việt. Máy khác: đặt biến PL_FONT_DIR.
"""
import json, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
IMG = os.path.join(ROOT, "assets", "img", "tuyen-dung")
FONT_DIR = os.environ.get("PL_FONT_DIR", r"C:\Windows\Fonts")
RED, INK, MUTED = (199, 0, 24), (14, 12, 10), (95, 88, 80)

def font(name, size):
    return ImageFont.truetype(os.path.join(FONT_DIR, name), size)

def load_data():
    js = (
        "const fs=require('fs'),vm=require('vm');const W={};vm.createContext(W);"
        "vm.runInContext(fs.readFileSync('assets/js/data.js','utf8')+';this.D={JOBS,CAREERS,PROJECTS,SITE};',W);"
        "process.stdout.write(JSON.stringify(W.D));"
    )
    out = subprocess.run(["node", "-e", js], cwd=ROOT, capture_output=True, check=True)
    return json.loads(out.stdout.decode("utf-8"))

def wrap(draw, text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=fnt) <= max_w:
            cur = t
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    # Chống từ lẻ cuối dòng: kéo bớt một từ từ dòng trên xuống nếu còn vừa
    if len(lines) >= 2 and len(lines[-1].split()) == 1 and len(lines[-2].split()) >= 2:
        head, moved = lines[-2].rsplit(" ", 1)
        cand = moved + " " + lines[-1]
        if draw.textlength(cand, font=fnt) <= max_w:
            lines[-2], lines[-1] = head, cand
    return lines

def poster_square(path, size):
    im = Image.open(path).convert("RGB")
    s = min(im.size)
    im = im.crop(((im.width - s) // 2, (im.height - s) // 2, (im.width + s) // 2, (im.height + s) // 2))
    return im.resize((size, size), Image.LANCZOS)

def og_card(out, poster, eyebrow, big, title_lines_spec, foot):
    W, H, PW = 1200, 630, 630
    im = Image.new("RGB", (W, H), "white")
    if poster and os.path.exists(poster):
        im.paste(poster_square(poster, PW), (W - PW, 0))
    d = ImageDraw.Draw(im)
    x, maxw = 64, W - PW - 64 - 48
    d.rectangle([0, 0, W - PW, 8], fill=RED)
    d.rectangle([x, 70, x + 14, 84], fill=RED)
    d.text((x + 26, 64), eyebrow, font=font("segoeuib.ttf", 22), fill=RED, spacing=4)
    y = 128
    if big:
        f = font("segoeuib.ttf", 118)
        d.text((x - 4, y - 18), big, font=f, fill=RED)
        y += 120
    for text, size, color in title_lines_spec:
        f = font("segoeuib.ttf", size)
        for line in wrap(d, text, f, maxw):
            d.text((x, y), line, font=f, fill=color)
            y += int(size * 1.12)
        y += 6
    fr = font("segoeui.ttf", 22)
    fy = H - 64 - 26 * (len(foot) - 1)
    for i, line in enumerate(foot):
        d.text((x, fy + i * 30), line, font=fr, fill=MUTED if i else INK)
    im.save(out, "JPEG", quality=84, optimize=True, progressive=True)
    return os.path.getsize(out) // 1024

def variant_540(src):
    out = src[:-4] + "-540.jpg"
    im = Image.open(src).convert("RGB")
    im.thumbnail((540, 540), Image.LANCZOS)
    im.save(out, "JPEG", quality=78, optimize=True, progressive=True)
    return os.path.getsize(out) // 1024

def thumb(src, out):
    im = Image.open(src).convert("RGB")
    tw, th = 192, 128
    r = max(tw / im.width, th / im.height)
    im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    l, t = (im.width - tw) // 2, (im.height - th) // 2
    im.crop((l, t, l + tw, t + th)).save(out, "JPEG", quality=76, optimize=True, progressive=True)
    return os.path.getsize(out) // 1024

def main():
    D = load_data()
    jobs = sorted([j for j in D["JOBS"] if (j.get("status") or "open") == "open"], key=lambda j: j.get("sortOrder", 999))
    openings = sum(int(j.get("count") or 0) for j in jobs)
    total = 0
    # 1) OG từng vị trí
    for j in jobs:
        poster = os.path.join(ROOT, j.get("poster", "")) if j.get("poster") else None
        hero = (j.get("hero") or {}).get("title") or j["title"]
        kb = og_card(os.path.join(IMG, "og-%s.jpg" % j["id"]), poster, "PACE LAND CAREERS",
                     j.get("count", ""), [(j.get("shortTitle") or j["title"], 54, INK), (hero.split(". ")[0].rstrip(".") + ".", 26, MUTED)],
                     ["Tuyển dụng · Văn phòng Quận 2, TP.HCM", "paceland.vn/tuyen-dung"])
        total += kb; print("og-%s.jpg %dKB" % (j["id"], kb))
    # OG trang tổng
    C = D["CAREERS"]; h = C.get("hero", {})
    kb = og_card(os.path.join(IMG, "og-tuyen-dung.jpg"), os.path.join(ROOT, (C.get("posters") or {}).get("hub", "")), "PACE LAND CAREERS", "",
                 [(h.get("title", ""), 64, INK), (h.get("titleAccent", ""), 64, RED)],
                 ["%d vị trí · Chia sẻ doanh thu đến 75%%" % openings, "Văn phòng Quận 2 · paceland.vn/tuyen-dung"])
    total += kb; print("og-tuyen-dung.jpg %dKB" % kb)
    # 2) Biến thể 540 cho poster
    for f in sorted(os.listdir(IMG)):
        if f.endswith(".jpg") and not (f.startswith("og-") or f.startswith("du-an-") or f.endswith("-540.jpg")):
            kb = variant_540(os.path.join(IMG, f)); total += kb
    print("poster -540: xong")
    # 3) Thumbnail dự án trọng tâm
    byid = {p["id"]: p for p in D["PROJECTS"]}
    for pid in (C.get("products") or {}).get("focus", []):
        p = byid.get(pid)
        if not p: continue
        src = os.path.join(ROOT, str(p.get("cover", "")).lstrip("/"))
        if os.path.exists(src):
            kb = thumb(src, os.path.join(IMG, "du-an-%s.jpg" % pid)); total += kb
    print("thumbnail du an: xong")
    print("TONG anh sinh ra: %d KB" % total)

if __name__ == "__main__":
    sys.exit(main())
