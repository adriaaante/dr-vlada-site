#!/usr/bin/env bash
# ============================================================
# Обновление сайта ПРЯМО НА ХОСТИНГЕ reg.ru — одной командой.
#
# Скрипт лежит в репозитории, поэтому он же оказывается на хостинге.
# Тянет последнюю версию из GitHub (ветка main) и раскладывает статику
# в веб-корень сайта. Сборки нет — просто публикация файлов.
#
# --- Настройка на хостинге (один раз, по SSH) ---
#   git clone https://github.com/adriaaante/dr-vlada-site.git ~/dr-vlada-site
#   cd ~/dr-vlada-site
#   cp scripts/deploy.config.example scripts/deploy.config
#   # впишите WEB_ROOT — папку сайта на reg.ru (напр. ~/www/vladbobrov.ru)
#
# --- Обновление сайта (одна команда) ---
#   bash ~/dr-vlada-site/scripts/update.sh
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# доступы/настройки (необязательный файл, в .gitignore)
# shellcheck disable=SC1091
[ -f scripts/deploy.config ] && source scripts/deploy.config || true

BRANCH="${DEPLOY_BRANCH:-main}"
WEB_ROOT="${WEB_ROOT:-$HOME/www/vladbobrov.ru}"

command -v git >/dev/null 2>&1 || { echo "✗ На хостинге нет git." >&2; exit 1; }

echo "→ Тяну последнюю версию из origin/${BRANCH} ..."
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

mkdir -p "$WEB_ROOT"
echo "→ Раскладываю статику в ${WEB_ROOT} ..."

# Исключаем служебное; .htaccess / .well-known на сервере НЕ трогаем.
if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete \
    --exclude '.git' --exclude '.github' --exclude 'scripts' \
    --exclude '__pycache__' --exclude 'assets/img/_staging' \
    --exclude '*.py' --exclude '*.md' --exclude '.gitignore' \
    --exclude 'deploy.config' --exclude '.htaccess' --exclude '.well-known' \
    ./ "$WEB_ROOT/"
else
  echo "  (rsync не найден — копирую через cp)"
  cp -a ./*.html "$WEB_ROOT/" 2>/dev/null || true
  cp -a robots.txt sitemap.xml "$WEB_ROOT/" 2>/dev/null || true
  rm -rf "$WEB_ROOT/assets"
  cp -a assets "$WEB_ROOT/"
  rm -rf "$WEB_ROOT/assets/img/_staging" 2>/dev/null || true
fi

echo "✓ Готово. Проверьте: https://vladbobrov.ru/"
