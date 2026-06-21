#!/usr/bin/env bash
# ============================================================
# Деплой статического сайта на reg.ru по FTP/FTPS — одной командой.
#
# Сборки у сайта нет: деплой = заливка статики (HTML + assets +
# robots.txt + sitemap.xml). Служебные файлы (.git, scripts, *.py,
# *.md и т.п.) на хостинг не попадают.
#
# Настройка (один раз):
#   cp scripts/deploy.config.example scripts/deploy.config
#   # впишите FTP_HOST / FTP_USER / FTP_PASS / FTP_DIR
#   # (файл scripts/deploy.config в .gitignore — в репозиторий не попадёт)
#
# Запуск:
#   bash scripts/deploy.sh            # залить изменения на сайт
#   bash scripts/deploy.sh --dry-run  # показать, что изменится (ничего не заливая)
#   bash scripts/deploy.sh --prune    # + удалить на сервере файлы, которых нет локально
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG="$ROOT/scripts/deploy.config"

if [ ! -f "$CONFIG" ]; then
  echo "✗ Нет файла доступов: $CONFIG" >&2
  echo "  Создайте его:  cp scripts/deploy.config.example scripts/deploy.config" >&2
  echo "  и впишите FTP-доступы reg.ru." >&2
  exit 1
fi
# shellcheck disable=SC1090
source "$CONFIG"

: "${FTP_HOST:?Укажите FTP_HOST в scripts/deploy.config}"
: "${FTP_USER:?Укажите FTP_USER в scripts/deploy.config}"
: "${FTP_PASS:?Укажите FTP_PASS в scripts/deploy.config}"
REMOTE_DIR="${FTP_DIR:-/www/vladbobrov.ru}"
PROTO="${FTP_PROTOCOL:-ftp}"     # ftp | ftps
PORT="${FTP_PORT:-21}"

if ! command -v lftp >/dev/null 2>&1; then
  echo "✗ Нужен lftp. Установите:" >&2
  echo "    macOS:  brew install lftp" >&2
  echo "    Debian/Ubuntu:  sudo apt install lftp" >&2
  exit 1
fi

DRY=""; DELETE=""
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY="--dry-run" ;;
    --prune)   DELETE="--delete" ;;
    *) echo "Неизвестный аргумент: $arg" >&2; exit 2 ;;
  esac
done

echo "→ Деплой на ${FTP_HOST}:${REMOTE_DIR}  (${PROTO}:${PORT})${DRY:+  [dry-run]}${DELETE:+  [prune]}"

lftp -u "$FTP_USER","$FTP_PASS" "$PROTO://$FTP_HOST:$PORT" <<LFTP
set ftp:ssl-allow ${FTP_SSL:-true}
set ftp:ssl-protect-data true
set ssl:verify-certificate ${FTP_SSL_VERIFY:-no}
set net:max-retries 3
set net:timeout 20
set mirror:parallel-transfer-count 3
mirror -R --verbose $DRY $DELETE \
  -x '\.git/' -x '\.github/' -x 'scripts/' -x 'node_modules/' \
  -x '__pycache__/' -x '\.idea/' -x '\.vscode/' -x '_staging/' \
  -X '*.py' -X '*.pyc' -X '*.md' -X '.gitignore' -X '.env*' \
  -X 'deploy.config' -X '.DS_Store' -X 'Thumbs.db' \
  "$ROOT/" "$REMOTE_DIR/"
bye
LFTP

echo "✓ Готово. Проверьте: https://vladbobrov.ru/"
