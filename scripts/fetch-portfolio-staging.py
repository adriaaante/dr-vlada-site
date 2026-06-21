#!/usr/bin/env python3
"""Скачать фото работ (до/после) из Google Drive в staging для разбора.

Зачем staging: облачная песочница Claude не ходит в drive.google.com
(host_not_allowed), поэтому скачивание выполняет GitHub Actions-раннер.
Оригиналы — тяжёлые PNG (3–10 МБ), поэтому здесь они сразу ужимаются до
веб-размера (≤ 1600px, JPG) — это и удобно смотреть, и не раздувает git.

После того как файлы попадут в assets/img/_staging/<папка>/, дальнейшая
разметка (что «до», что «после», обрезка чёрного фона, раскладка по
кейсам portfolio.js) делается локально.

Запуск — только в GitHub Actions (см. .github/workflows/fetch-portfolio-photos.yml).
"""
from __future__ import annotations

import io
import re
import sys
import urllib.request
import urllib.parse
from http.cookiejar import CookieJar
from pathlib import Path

from PIL import Image, ImageOps

try:  # один из файлов на самом деле HEIF (несмотря на .PNG в имени)
    import pillow_heif
    pillow_heif.register_heif_opener()
except Exception:
    pass

REPO_ROOT = Path(__file__).resolve().parent.parent
STAGING = REPO_ROOT / "assets" / "img" / "_staging"
MAX_SIDE = 1600
JPG_QUALITY = 88

# Папка staging -> [(drive_file_id, исходное_имя)]
# Партия: Ботулинотерапия (новая папка Drive).
FOLDERS: dict[str, list[tuple[str, str]]] = {
    "botox": [  # Ботулинотерапия
        ("1hGHWecdz8ng5U3xwY7LNjZ-J-KYisnt-", "IMG_9028"),
        ("15Nzwr3dgxDVYBbB4HxGYTt5-TJ_S-xWH", "IMG_9029"),
        ("18WZtmyTOqs2nMF5DxwIO4S3f7ojoThfJ", "IMG_9030"),
        ("1R58-vkyMfxmZw0IB1gGdmFK7W-LSL9qo", "IMG_9034"),
    ],
}


def make_opener():
    cj = CookieJar()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    opener.addheaders = [
        ("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) "
                       "Gecko/20100101 Firefox/121.0"),
        ("Accept", "*/*"),
    ]
    return opener


def fetch_bytes(opener, file_id: str) -> bytes:
    url = f"https://drive.google.com/uc?export=download&confirm=t&id={file_id}"
    resp = opener.open(url, timeout=120)
    ct = resp.headers.get("Content-Type", "")
    cd = resp.headers.get("Content-Disposition", "")
    if "text/html" in ct and "attachment" not in cd:
        html = resp.read().decode("utf-8", errors="ignore")
        form_action = re.search(
            r'action="(https://drive\.usercontent\.google\.com/download[^"]*)"', html)
        if form_action:
            action = form_action.group(1).replace("&amp;", "&")
            fields = dict(re.findall(r'name="([^"]+)"\s+value="([^"]+)"', html))
            qs = urllib.parse.urlencode(fields)
            final_url = f"{action}&{qs}" if "?" in action else f"{action}?{qs}"
            resp = opener.open(final_url, timeout=180)
        else:
            m = re.search(r'confirm=([0-9A-Za-z_-]+)', html)
            if not m:
                raise RuntimeError("Не разобрал страницу подтверждения Drive")
            resp = opener.open(f"{url}&confirm={m.group(1)}", timeout=180)
    return resp.read()


def to_web_jpg(raw: bytes, dest: Path) -> None:
    img = Image.open(io.BytesIO(raw))
    img = ImageOps.exif_transpose(img)  # учесть ориентацию из EXIF
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")
    w, h = img.size
    scale = min(1.0, MAX_SIDE / max(w, h))
    if scale < 1.0:
        img = img.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "JPEG", quality=JPG_QUALITY, optimize=True)


def main() -> int:
    opener = make_opener()
    errors = []
    for folder, items in FOLDERS.items():
        for file_id, stem in items:
            dest = STAGING / folder / f"{stem}.jpg"
            try:
                raw = fetch_bytes(opener, file_id)
                to_web_jpg(raw, dest)
                print(f"  ✓ {folder}/{stem}.jpg  ({len(raw)//1024} KB → {dest.stat().st_size//1024} KB)")
            except Exception as e:
                print(f"  ✗ {folder}/{stem}: {e}", file=sys.stderr)
                errors.append((folder, stem, str(e)))
    if errors:
        print(f"\nОшибок: {len(errors)}", file=sys.stderr)
        return 1
    print("\n— staging готов —")
    return 0


if __name__ == "__main__":
    sys.exit(main())
