# -*- coding: utf-8 -*-
# Chuyen trang-du-an/*.json (VTK, giong "toi") -> assets/data/du-an-chi-tiet/*.json (PaceLand)
# + chon loc & nen 3 anh then chot/du an
import json, io, os, re, glob

SRC = r"C:/Users/admin/.gemini/antigravity/playground/vtk-portfolio/src/content/trang-du-an"
IMGSRC = r"C:/Users/admin/.gemini/antigravity/playground/vtk-portfolio/public"
DST = r"F:/VSCode for Claude/PaceLand-Website/assets/data/du-an-chi-tiet"
IMGDST = r"F:/VSCode for Claude/PaceLand-Website/assets/img/du-an"
os.makedirs(DST, exist_ok=True)
os.makedirs(IMGDST, exist_ok=True)

# id ben VTK -> id ben PaceLand
ID_MAP = {"palm-river": "palm-city"}

# Doi giong ca nhan -> thuong hieu (thu tu quan trong: cum dai truoc)
VOICE = [
    ("tôi đối chiếu", "PaceLand đối chiếu"),
    ("tôi ghi nhận", "PaceLand ghi nhận"),
    ("tôi kiểm chứng", "PaceLand kiểm chứng"),
    ("tôi tổng hợp", "PaceLand tổng hợp"),
    ("tôi cập nhật", "PaceLand cập nhật"),
    ("khách hỏi tôi", "khách hỏi chúng tôi"),
    ("hỏi tôi", "hỏi chúng tôi"),
    ("tôi hẹn lịch với phòng kinh doanh", "PaceLand hẹn lịch với phòng kinh doanh"),
    ("tôi hẹn lịch", "PaceLand hẹn lịch"),
    ("tôi gửi", "chúng tôi gửi"),
    ("tôi gọi lại", "chuyên viên PaceLand gọi lại"),
    ("tôi gọi", "chuyên viên PaceLand gọi"),
    ("tôi thấy", "chúng tôi thấy"),
    ("tôi khuyên", "chúng tôi khuyên"),
    ("tôi tư vấn", "chúng tôi tư vấn"),
    ("tôi đã", "chúng tôi đã"),
    ("tôi sẽ", "chúng tôi sẽ"),
    ("tôi có", "chúng tôi có"),
    ("tôi đang", "chúng tôi đang"),
    ("tôi không", "chúng tôi không"),
    ("tôi chuẩn bị", "chúng tôi chuẩn bị"),
    ("cùng tôi", "cùng PaceLand"),
    ("với tôi", "với PaceLand"),
    ("của tôi", "của PaceLand"),
    ("cho tôi", "cho PaceLand"),
    ("Tôi ", "PaceLand "),
    (" tôi ", " chúng tôi "),
    (" tôi,", " chúng tôi,"),
    (" tôi.", " chúng tôi."),
    ("anh chị", "anh/chị"),
    ("Anh chị", "Anh/chị"),
]

def voice(s):
    if not isinstance(s, str):
        return s
    for a, b in VOICE:
        s = s.replace(a, b)
    # nguon da co san "chúng tôi" -> luat "tôi X" bien thanh "chúng chúng tôi X"
    while "chúng chúng tôi" in s or "Chúng chúng tôi" in s:
        s = s.replace("chúng chúng tôi", "chúng tôi").replace("Chúng chúng tôi", "Chúng tôi")
    return s

def deep_voice(o):
    if isinstance(o, dict):
        return {k: deep_voice(v) for k, v in o.items()}
    if isinstance(o, list):
        return [deep_voice(x) for x in o]
    return voice(o)

def strip_img(o):
    """Bo field image/images khoi item (giu text)."""
    if isinstance(o, dict):
        return {k: strip_img(v) for k, v in o.items() if k not in ("image", "images")}
    if isinstance(o, list):
        return [strip_img(x) for x in o]
    return o

from PIL import Image
def save_img(vtk_src, out_name):
    """Nen 1 anh tu VTK public -> assets/img/du-an/<out_name>. Tra ve duong dan hoac None."""
    if not vtk_src:
        return None
    p = os.path.join(IMGSRC, vtk_src.lstrip("/"))
    if not os.path.exists(p):
        return None
    try:
        im = Image.open(p).convert("RGB")
    except Exception:
        return None
    if max(im.size) > 1280:
        r = 1280 / max(im.size)
        im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    out = os.path.join(IMGDST, out_name)
    im.save(out, "JPEG", quality=75, optimize=True, progressive=True)
    return "assets/img/du-an/" + out_name

total_kb = 0
report = []
for f in sorted(glob.glob(os.path.join(SRC, "*.json"))):
    slug = os.path.basename(f)[:-5]
    pid = ID_MAP.get(slug, slug)
    d = json.load(io.open(f, encoding="utf-8"))
    out = {"capNhat": d.get("capNhat", "")}

    tq = d.get("tongQuan") or {}
    out["tongQuan"] = {"intro": tq.get("intro", ""), "thongSo": tq.get("thongSo", []), "chiSo": tq.get("chiSo", [])}

    mb = d.get("dotMoBan") or {}
    if mb.get("title"):
        out["dotMoBan"] = {k: mb.get(k) for k in ("title", "subtitle", "capNhat", "gioHang", "lyDo", "chinhSach") if mb.get(k)}
        out["dotMoBan"] = strip_img(out["dotMoBan"])

    td = d.get("tienDo") or {}
    if td.get("moc") or td.get("intro"):
        img = None
        if td.get("images"):
            img = save_img((td["images"][-1] or {}).get("src"), pid + "-tien-do.jpg")
        out["tienDo"] = {"capNhat": td.get("capNhat", ""), "intro": td.get("intro", ""),
                         "moc": strip_img(td.get("moc", [])), "note": td.get("note", ""), "image": img}

    vt = d.get("viTri") or {}
    if vt:
        img = save_img((vt.get("image") or {}).get("src"), pid + "-vi-tri.jpg")
        out["viTri"] = {"intro": vt.get("intro", ""), "khoangCach": vt.get("khoangCach", []),
                        "diem": strip_img(vt.get("diem", [])), "image": img}

    ti = d.get("tienIch") or {}
    if ti.get("items"):
        out["tienIch"] = {"intro": ti.get("intro", ""), "items": [it.get("name", it) if isinstance(it, dict) else it for it in ti["items"]]}

    gb = d.get("giaBan") or {}
    if gb.get("loai"):
        out["giaBan"] = {"intro": gb.get("intro", ""), "capNhat": gb.get("capNhat", ""),
                         "loai": strip_img(gb.get("loai", [])), "note": gb.get("note", "")}

    mbg = d.get("matBang") or {}
    if mbg:
        img = None
        if mbg.get("images"):
            img = save_img((mbg["images"][0] or {}).get("src"), pid + "-mat-bang.jpg")
        out["matBang"] = {"intro": mbg.get("intro", ""), "diem": mbg.get("diem", []), "image": img}

    lc = d.get("loaiCan") or []
    if lc:
        out["loaiCan"] = strip_img(lc)

    for key in ("diemNoiBat", "songODay"):
        v = d.get(key) or {}
        if v.get("items"):
            out[key] = {"intro": v.get("intro", ""), "items": strip_img(v["items"])}

    pl = d.get("phapLy") or {}
    if pl.get("items"):
        out["phapLy"] = {"intro": pl.get("intro", ""), "items": pl.get("items", []), "note": pl.get("note", "")}

    cdt = d.get("chuDauTu") or {}
    if cdt.get("text") or cdt.get("ten"):
        dbg = [x.get("name", "") if isinstance(x, dict) else str(x) for x in (cdt.get("daBanGiao") or [])]
        out["chuDauTu"] = {"ten": cdt.get("ten", ""), "text": cdt.get("text", ""), "daBanGiao": [x for x in dbg if x]}

    if d.get("faq"):
        out["faq"] = d["faq"]

    out = deep_voice(out)
    op = os.path.join(DST, pid + ".json")
    io.open(op, "w", encoding="utf-8", newline="\n").write(json.dumps(out, ensure_ascii=False, indent=1))
    kb = os.path.getsize(op) // 1024
    total_kb += kb
    # Quet "toi" con sot
    txt = json.dumps(out, ensure_ascii=False)
    sot = re.findall(r"[^\n]{0,30}\btôi\b[^\n]{0,30}", txt)
    sot = [x for x in sot if "chúng tôi" not in x and "PaceLand" not in x]
    report.append((pid, kb, len(sot), sot[:3]))

print("=== KET QUA ===")
for pid, kb, n, mau in report:
    print(f"{pid}: {kb}KB, 'tôi' còn sót: {n}", ("| VD: " + " ;; ".join(mau)) if n else "")
print("Tong JSON:", total_kb, "KB")
imgs = glob.glob(os.path.join(IMGDST, "*.jpg"))
print("Anh da nen:", len(imgs), "| tong:", sum(os.path.getsize(x) for x in imgs) // 1024, "KB")
