#!/usr/bin/env python3
"""Переключить сайт со SVG-плейсхолдеров доктора на реальные фото.

Запускайте после того, как `download-drive-photos.py` (или вы вручную)
положил файлы в assets/img/doctor/.

Что делает:
  - Находит реальные фото врача (hero.jpg/png/webp, about.jpg/png/webp).
  - Обновляет ссылки в index.html и about.html: hero.svg → hero.<ext>,
    about.svg → about.<ext>.
  - Если фото нет — оставляет SVG-плейсхолдер без изменений.

Использование:
    python3 scripts/use-photos.py
"""
from __future__ import annotations

import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DOCTOR_DIR = REPO_ROOT / "assets" / "img" / "doctor"

# (стем имени файла без расширения, какие страницы обновлять)
SLOTS = [
    ("hero",  ["index.html"]),
    ("about", ["about.html"]),
]
EXTS = [".jpg", ".jpeg", ".png", ".webp"]


def find_photo(stem: str) -> Path | None:
    for ext in EXTS:
        p = DOCTOR_DIR / (stem + ext)
        if p.exists() and p.stat().st_size > 1000:
            return p
    return None


def update_html(html_path: Path, stem: str, new_ext: str) -> bool:
    text = html_path.read_text(encoding="utf-8")
    # Заменяем любые варианты ссылок на этот стем (svg/jpg/png/webp → new_ext)
    changed = False
    for old_ext in [".svg"] + EXTS:
        old = f"assets/img/doctor/{stem}{old_ext}"
        new = f"assets/img/doctor/{stem}{new_ext}"
        if old != new and old in text:
            text = text.replace(old, new)
            changed = True
    if changed:
        html_path.write_text(text, encoding="utf-8")
    return changed


def main() -> int:
    if not DOCTOR_DIR.exists():
        print(f"Папка не найдена: {DOCTOR_DIR}", file=sys.stderr)
        return 1
    any_updated = False
    for stem, pages in SLOTS:
        photo = find_photo(stem)
        if not photo:
            print(f"  · {stem}: фото не найдено (нет {stem}.jpg/png/webp), пропускаю")
            continue
        print(f"  ✓ {stem}: {photo.name}")
        for page in pages:
            html_path = REPO_ROOT / page
            if not html_path.exists():
                continue
            if update_html(html_path, stem, photo.suffix):
                print(f"      обновлено {page} → {photo.name}")
                any_updated = True
            else:
                print(f"      {page} уже использует правильное расширение")
    if not any_updated:
        print("\nНичего не обновлено. Если положили фото — проверьте имена файлов.")
        return 0
    print("\n— готово —  закоммитьте изменения:")
    print('  git add assets/img/doctor index.html about.html')
    print('  git commit -m "Добавлены настоящие фото врача"')
    print('  git push')
    return 0


if __name__ == "__main__":
    sys.exit(main())
