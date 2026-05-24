#!/usr/bin/env python3
"""Скачать фото врача с Google Drive и положить в assets/img/doctor/.

ЗАПУСКАЕТСЯ ЛОКАЛЬНО НА ВАШЕМ КОМПЬЮТЕРЕ (не в облачном окружении).
В песочнице Claude Code в облаке доступ к drive.google.com заблокирован,
поэтому фото нужно скачать у себя.

Использование:
    1. Убедитесь, что обе ссылки на фото на Drive открыты для всех
       (по ссылке "Anyone with the link can view").
    2. Из корня репозитория:
           python3 scripts/download-drive-photos.py
    3. После скачивания:
           python3 scripts/use-photos.py    # обновит ссылки в HTML

Скрипт умеет обходить страницу "virus scan" для больших файлов.
Не требует никаких сторонних библиотек, только стандартный Python 3.
"""
from __future__ import annotations

import re
import sys
import json
import urllib.request
import urllib.parse
from http.cookiejar import CookieJar
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = REPO_ROOT / "assets" / "img" / "doctor"

# === Здесь — ID файлов из ссылок https://drive.google.com/file/d/<ID>/view ===
PHOTOS = [
    # ("файл-id", "куда сохранить под этим именем — .jpg / .png")
    ("1mY6eXh9PT3XHoovk5YhXCeZDp86trcU3", "hero.jpg"),   # большое фото для главной
    ("1twHs0YsAhPek1AtaqGzadeQyWnLkQqTI", "about.jpg"),  # фото для страницы «Обо мне»
]


def make_opener():
    cj = CookieJar()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    opener.addheaders = [
        ("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) "
                       "Gecko/20100101 Firefox/121.0"),
        ("Accept", "*/*"),
    ]
    return opener


def download_one(opener, file_id: str, dest: Path) -> None:
    """Скачивает один файл с Drive, обрабатывая 'virus scan' интерстишал."""
    url = f"https://drive.google.com/uc?export=download&id={file_id}"
    print(f"\n→ {file_id} → {dest.name}")
    print(f"  GET {url}")
    resp = opener.open(url, timeout=60)
    ct = resp.headers.get("Content-Type", "")
    cd = resp.headers.get("Content-Disposition", "")

    if "text/html" in ct and "attachment" not in cd:
        # Большой файл — Drive показывает страницу подтверждения.
        html = resp.read().decode("utf-8", errors="ignore")

        # Новый формат (HTML-форма с action="https://drive.usercontent.google.com/download")
        form_action = re.search(
            r'action="(https://drive\.usercontent\.google\.com/download[^"]*)"',
            html,
        )
        if form_action:
            action = form_action.group(1).replace("&amp;", "&")
            fields = dict(re.findall(r'name="([^"]+)"\s+value="([^"]+)"', html))
            qs = urllib.parse.urlencode(fields)
            final_url = f"{action}&{qs}" if "?" in action else f"{action}?{qs}"
            print(f"  → подтверждение, переход на {final_url[:80]}…")
            resp = opener.open(final_url, timeout=120)
        else:
            # Старый формат (confirm token в URL)
            m = re.search(r'confirm=([0-9A-Za-z_-]+)', html)
            if m:
                token = m.group(1)
                resp = opener.open(
                    f"{url}&confirm={token}",
                    timeout=120,
                )
            else:
                raise RuntimeError(
                    "Не удалось разобрать страницу подтверждения Drive. "
                    "Проверьте, что файл доступен 'Anyone with the link'."
                )

    dest.parent.mkdir(parents=True, exist_ok=True)
    total = 0
    with open(dest, "wb") as f:
        while True:
            chunk = resp.read(64 * 1024)
            if not chunk:
                break
            f.write(chunk)
            total += len(chunk)
    print(f"  ✓ сохранено {total/1024:.0f} KB → {dest}")


def main() -> int:
    opener = make_opener()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    errors = []
    for file_id, name in PHOTOS:
        try:
            download_one(opener, file_id, OUT_DIR / name)
        except Exception as e:
            print(f"  ✗ ошибка: {e}", file=sys.stderr)
            errors.append((file_id, name, str(e)))
    print("\n— готово —")
    if errors:
        print(f"  Ошибок: {len(errors)}")
        for fid, nm, err in errors:
            print(f"    · {nm} ({fid}): {err}")
        return 1
    print(f"\nФото лежат в {OUT_DIR}/")
    print("Дальше запустите:  python3 scripts/use-photos.py")
    return 0


if __name__ == "__main__":
    sys.exit(main())
