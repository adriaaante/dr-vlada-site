#!/usr/bin/env python3
"""Сгенерировать SVG-плейсхолдеры для портфолио и фото доктора.

Запускается один раз для создания заглушек, когда настоящих фото ещё нет.
Когда у вас появятся реальные before.jpg / after.jpg — просто положите их
в нужные папки (assets/img/portfolio/<slug>/) и они перекроют SVG.

Использование:
    python3 scripts/generate-placeholders.py
"""
import json
import re
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PORT_JS = ROOT / "assets" / "js" / "portfolio.js"
PORT_DIR = ROOT / "assets" / "img" / "portfolio"
DOCTOR_DIR = ROOT / "assets" / "img" / "doctor"

# Премиум палитра, синхронизирована со styles.css
PRIMARY = "#0e3d4d"
PRIMARY_SOFT = "#1e6478"
ACCENT = "#c5a572"
ACCENT_SOFT = "#e8d9b8"
CREAM = "#fdfaf3"


def parse_portfolio():
    """Тонкий парсер: ищем slug/title/categoryLabel — без полноценного JS-парсера."""
    text = PORT_JS.read_text(encoding="utf-8")
    blocks = re.findall(r"\{\s*slug:\s*'([^']+)',\s*title:\s*'([^']+)',\s*category:\s*'([^']+)',\s*categoryLabel:\s*'([^']+)'",
                        text)
    return [{"slug": s, "title": t, "category": c, "label": cl} for s, t, c, cl in blocks]


def make_portfolio_svg(item, kind):
    """SVG-плейсхолдер 'до'/'после' с заголовком и иконкой."""
    is_after = (kind == "after")
    bg1, bg2 = (CREAM, ACCENT_SOFT) if is_after else ("#eef3f5", "#d6e8ec")
    accent = ACCENT if is_after else PRIMARY_SOFT
    label = "После" if is_after else "До"
    label_bg = ACCENT if is_after else PRIMARY
    label_color = PRIMARY if is_after else "#ffffff"
    title = item["title"]
    if len(title) > 42:
        title = title[:40] + "…"
    grad_id = f"g_{item['slug']}_{kind}"
    pat_id  = f"p_{item['slug']}_{kind}"
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="{label}: {title}">
  <defs>
    <linearGradient id="{grad_id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{bg1}"/>
      <stop offset="1" stop-color="{bg2}"/>
    </linearGradient>
    <pattern id="{pat_id}" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <circle cx="30" cy="30" r="1" fill="{accent}" opacity=".35"/>
    </pattern>
  </defs>
  <rect width="1200" height="900" fill="url(#{grad_id})"/>
  <rect width="1200" height="900" fill="url(#{pat_id})"/>

  <!-- Декоративный медицинский символ (стилизованная капля / лицо) -->
  <g transform="translate(600 380)" opacity=".55">
    <circle cx="0" cy="0" r="170" fill="none" stroke="{accent}" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="120" fill="none" stroke="{accent}" stroke-width="1"/>
    <circle cx="0" cy="0" r="70" fill="{accent}" opacity=".25"/>
    <path d="M-50 -40 Q0 -120 50 -40 Q0 30 -50 -40 Z" fill="{accent}" opacity=".7"/>
  </g>

  <!-- Тег категории -->
  <g transform="translate(60 60)">
    <rect width="180" height="42" rx="6" fill="{accent}" opacity=".9"/>
    <text x="90" y="28" text-anchor="middle" font-family="Inter, system-ui, sans-serif"
          font-size="13" font-weight="700" letter-spacing="2" fill="{PRIMARY}">{item['label'].upper()}</text>
  </g>

  <!-- Метка До/После -->
  <g transform="translate(1010 60)">
    <rect width="130" height="42" rx="6" fill="{label_bg}"/>
    <text x="65" y="28" text-anchor="middle" font-family="Inter, system-ui, sans-serif"
          font-size="14" font-weight="700" letter-spacing="2" fill="{label_color}">{label.upper()}</text>
  </g>

  <!-- Заголовок -->
  <g transform="translate(600 700)">
    <text text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif"
          font-size="38" font-weight="500" fill="{PRIMARY}">{escape_xml(title)}</text>
    <text y="50" text-anchor="middle" font-family="Inter, system-ui, sans-serif"
          font-size="14" font-weight="500" letter-spacing="3" fill="{PRIMARY_SOFT}" opacity=".7">
      ПЛЕЙСХОЛДЕР · ЗАМЕНИТЕ {kind.upper()}.JPG В ПАПКЕ КЕЙСА
    </text>
  </g>
</svg>
'''


def make_doctor_svg(kind):
    """SVG-плейсхолдер портрета врача."""
    sizes = {
        "hero":  (960, 1200),
        "about": (800, 1000),
        "thumb": (400, 400),
    }
    w, h = sizes[kind]
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="Фото врача (плейсхолдер)">
  <defs>
    <linearGradient id="bg_{kind}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{ACCENT_SOFT}"/>
      <stop offset="0.6" stop-color="#d6e8ec"/>
      <stop offset="1" stop-color="{PRIMARY_SOFT}"/>
    </linearGradient>
    <radialGradient id="glow_{kind}" cx=".5" cy=".35" r=".6">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".5"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="{w}" height="{h}" fill="url(#bg_{kind})"/>
  <rect width="{w}" height="{h}" fill="url(#glow_{kind})"/>

  <!-- Силуэт врача -->
  <g transform="translate({w/2} {h*0.42})" opacity=".55">
    <circle cx="0" cy="0" r="{min(w,h)*0.18}" fill="{PRIMARY}" opacity=".7"/>
    <path d="M {-min(w,h)*0.32} {min(w,h)*0.55}
             Q 0 {min(w,h)*0.18} {min(w,h)*0.32} {min(w,h)*0.55}
             L {min(w,h)*0.32} {h*0.55}
             L {-min(w,h)*0.32} {h*0.55} Z"
          fill="{PRIMARY}" opacity=".7"/>
  </g>

  <!-- Подпись -->
  <g transform="translate({w/2} {h-110})">
    <text text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif"
          font-size="{int(min(w,h)*0.06)}" font-weight="500" fill="{PRIMARY}">Влад Бобров</text>
    <text y="{int(min(w,h)*0.05)}" text-anchor="middle" font-family="Inter, system-ui, sans-serif"
          font-size="{int(min(w,h)*0.025)}" font-weight="600" letter-spacing="4" fill="{ACCENT}">ВРАЧ-КОСМЕТОЛОГ</text>
    <text y="{int(min(w,h)*0.10)}" text-anchor="middle" font-family="Inter, system-ui, sans-serif"
          font-size="{int(min(w,h)*0.018)}" letter-spacing="2" fill="{PRIMARY_SOFT}" opacity=".75">
      ПЛЕЙСХОЛДЕР · ЗАМЕНИТЕ {kind.upper()}.JPG/.PNG
    </text>
  </g>
</svg>
'''


def make_favicon_svg():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="fav" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{PRIMARY}"/>
      <stop offset="1" stop-color="{PRIMARY_SOFT}"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#fav)"/>
  <circle cx="32" cy="32" r="22" fill="none" stroke="{ACCENT}" stroke-width="1.5" opacity=".4"/>
  <text x="32" y="42" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif"
        font-size="30" font-weight="600" fill="{ACCENT}">ВБ</text>
</svg>
'''


def make_og_cover():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="ogbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{PRIMARY}"/>
      <stop offset="1" stop-color="{PRIMARY_SOFT}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#ogbg)"/>
  <circle cx="950" cy="315" r="220" fill="{ACCENT}" opacity=".25"/>
  <circle cx="950" cy="315" r="140" fill="{ACCENT}" opacity=".35"/>
  <text x="80" y="290" font-family="Cormorant Garamond, Georgia, serif" font-size="78" font-weight="500" fill="#ffffff">Влад Бобров</text>
  <text x="80" y="350" font-family="Inter, sans-serif" font-size="26" font-weight="600" letter-spacing="6" fill="{ACCENT}">ВРАЧ-КОСМЕТОЛОГ</text>
  <text x="80" y="420" font-family="Inter, sans-serif" font-size="22" font-weight="400" fill="rgba(255,255,255,.78)">Эстетическая медицина · Москва</text>
</svg>
'''


def escape_xml(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def main():
    items = parse_portfolio()
    print(f"Найдено кейсов: {len(items)}")
    PORT_DIR.mkdir(parents=True, exist_ok=True)
    DOCTOR_DIR.mkdir(parents=True, exist_ok=True)
    (ROOT / "assets" / "img").mkdir(parents=True, exist_ok=True)

    # Портфолио
    for item in items:
        case_dir = PORT_DIR / item["slug"]
        case_dir.mkdir(parents=True, exist_ok=True)
        for kind in ("before", "after"):
            path = case_dir / f"{kind}.svg"
            path.write_text(make_portfolio_svg(item, kind), encoding="utf-8")
        print(f"  ✓ {item['slug']}")

    # Доктор
    for kind in ("hero", "about", "thumb"):
        path = DOCTOR_DIR / f"{kind}.svg"
        path.write_text(make_doctor_svg(kind), encoding="utf-8")
        print(f"  ✓ doctor/{kind}.svg")

    # Favicon + OG
    (ROOT / "assets" / "img" / "favicon.svg").write_text(make_favicon_svg(), encoding="utf-8")
    (ROOT / "assets" / "img" / "og-cover.svg").write_text(make_og_cover(), encoding="utf-8")
    print("  ✓ favicon.svg + og-cover.svg")

    print("\nГотово. Все плейсхолдеры созданы.")


if __name__ == "__main__":
    main()
