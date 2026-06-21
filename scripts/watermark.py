#!/usr/bin/env python3
"""Наложить маленький водяной знак (лого) на фото портфолио.

ПРАВИЛО: каждое фото «до/после», которое кладётся в портфолио, должно нести
небольшой полупрозрачный логотип. Запускается на этапе вставки фото — ОДИН раз
на файл (повторный запуск наложит знак ещё раз). Для свежесобранных before/after.

Использование:
    python3 scripts/watermark.py                      # все assets/img/portfolio/*/*.jpg
    python3 scripts/watermark.py path/to/a.jpg ...     # конкретные файлы

Знак: белый вордmark с лёгкой тенью, ~26% ширины кадра, правый нижний угол.
"""
from __future__ import annotations

import sys
from pathlib import Path
from PIL import Image

REPO = Path(__file__).resolve().parent.parent
LOGO = REPO / "assets" / "img" / "logo-wordmark.png"

WIDTH_FRAC = 0.26     # ширина знака относительно ширины фото
MARGIN_FRAC = 0.04    # отступ от краёв
LOGO_OPACITY = 0.55   # непрозрачность белого знака
SHADOW_OPACITY = 0.45 # непрозрачность тени
JPG_QUALITY = 86


def make_mark(logo: Image.Image, target_w: int):
    scale = target_w / logo.width
    lg = logo.resize((target_w, round(logo.height * scale)), Image.LANCZOS)
    a = lg.split()[3]
    white = Image.new("RGBA", lg.size, (255, 255, 255, 0))
    white.putalpha(a.point(lambda p: int(p * LOGO_OPACITY)))
    shadow = Image.new("RGBA", lg.size, (0, 0, 0, 0))
    shadow.putalpha(a.point(lambda p: int(p * SHADOW_OPACITY)))
    return white, shadow


def watermark(path: Path, logo: Image.Image) -> None:
    base = Image.open(path).convert("RGBA")
    W, H = base.size
    white, shadow = make_mark(logo, max(1, round(W * WIDTH_FRAC)))
    m = round(W * MARGIN_FRAC)
    x = W - white.width - m
    y = H - white.height - m
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    layer.paste(shadow, (x + 2, y + 2), shadow)
    layer.paste(white, (x, y), white)
    out = Image.alpha_composite(base, layer).convert("RGB")
    out.save(path, "JPEG", quality=JPG_QUALITY, optimize=True)
    print(f"  ✓ {path.relative_to(REPO)}")


def main(argv: list[str]) -> int:
    if not LOGO.exists():
        print(f"Лого не найдено: {LOGO}", file=sys.stderr)
        return 1
    logo = Image.open(LOGO).convert("RGBA")
    if argv:
        files = [Path(a) for a in argv]
    else:
        files = sorted((REPO / "assets" / "img" / "portfolio").glob("*/*.jpg"))
    for f in files:
        watermark(f, logo)
    print(f"— готово: {len(files)} фото —")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
