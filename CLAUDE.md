# CLAUDE.md — память проекта

Память ведётся под этот репозиторий. Коротко и по делу: ориентиры, грабли,
неочевидное. Перед созданием файла — сверяйся с картой ниже.

## Рабочие правила сессии
- Ищи лучший вариант, а не первый: для нетривиальных задач сначала исследуй
  кодбазу/best practice, потом код. Сравнивай 2–3 подхода и давай рекомендацию.
- Код только под задачу. Без drive-by рефакторинга и «обёрток на всякий случай».
  Не плодить лишние файлы — переиспользуй существующее место (см. карту).
- Чини только воспроизводимые баги (вход→ожидание→факт). Работающее не трогай.
- Перед мержем/деплоем — анализ влияния: не сломаны ли контракты (config.js,
  структура portfolio.js, имена картинок, ссылки в HTML).
- Не выдавай незавершённое за готовое — прямо говори, что осталось.

## Что это
Премиум сайт-визитка врача-косметолога Влады Бобровой. **Статический сайт без
сборки**: чистый HTML5 + CSS (custom properties) + Vanilla JS. Нет npm, нет
бандлера, нет бэкенда, нет форм/cookies/аналитики. Открывается двойным кликом.
Прод-домен: **vladbobrov.ru** (см. sitemap.xml / robots.txt).

## Структура проекта
- Страницы в корне: `index.html`, `about.html`, `services.html`,
  `portfolio.html`, `contacts.html`, `404.html`.
- `assets/css/styles.css` — единая дизайн-система. Палитра в `:root`
  (`--c-primary` тил, `--c-accent` золото, `--c-bg` крем) — менять цвет один раз там.
- `assets/js/config.js` — **единственный источник правды по контактам/бренду**
  (`window.VB_CONFIG`: телефон, мессенджеры, адрес, карта). Меняешь контакты — здесь.
- `assets/js/portfolio.js` — массив кейсов портфолио (slug, category, before/after,
  details). Добавление кейса — сюда + папка с фото.
- `assets/js/main.js` — логика: FAB, before/after слайдер, lightbox, reveal-анимации
  (IntersectionObserver), рендер карточек портфолио.
- `assets/img/doctor/` — фото врача (`hero.*`, `about.*`, `thumb.*`; есть `.svg`-плейсхолдеры).
- `assets/img/portfolio/<slug>/` — по папке на кейс, файлы `before.*` / `after.*`.
- `scripts/` — вспомогательные Python-утилиты (см. ниже). Не часть сайта.
- `.github/workflows/` — GitHub Actions для дотягивания внешних медиа (см. Грабли).
- Генерируемое/служебное: SVG-плейсхолдеры из `generate-placeholders.py`,
  `logo-mark.png` и фото врача подтягиваются автоматикой — но в репо лежат как обычные файлы.

## Деплой / что выкатывается
- Сборки нет — деплоится репозиторий как есть (статика из корня).
- **reg.ru, обновление на хостинге (основное):** `scripts/update.sh` — тянет
  `main` из GitHub и раскладывает статику в веб-корень (`WEB_ROOT`). На сервере
  один раз: `git clone` репо + `cp scripts/deploy.config.example
  scripts/deploy.config` (вписать `WEB_ROOT`). Обновление одной командой по SSH:
  `bash ~/dr-vlada-site/scripts/update.sh`. Служебное (`.git`, `scripts`, `*.py`,
  `*.md`, `_staging`) и серверные `.htaccess`/`.well-known` на сайт не попадают.
- **Деплой с локальной машины по FTP (альтернатива):** `scripts/deploy.sh`
  (через `lftp`, доступы в `scripts/deploy.config`). `--dry-run` / `--prune`.
- Доступы лежат в `scripts/deploy.config` (gitignored). Шаблон —
  `scripts/deploy.config.example`.
- Цель по README: GitHub Pages / Netlify / Vercel / Cloudflare Pages / FTP-хостинг.
  CNAME-файла в репо нет — домен vladbobrov.ru настроен на стороне хостинга/DNS,
  не в репо (проверь настройки Pages/хостинга, прежде чем менять домен).
- Прод-домен в sitemap.xml и robots.txt — при смене домена правь оба.

## Скрипты (scripts/)
- `generate-placeholders.py` — генерит SVG-заглушки для всех кейсов из
  portfolio.js, фото врача, favicon, og-cover. Запускать после нового кейса.
- `download-drive-photos.py` — качает фото врача из Google Drive (используется в Action).
- `use-photos.py` — переключает ссылки в index.html/about.html со
  `*.svg`-плейсхолдеров на реальные `hero.*`/`about.*`, если файлы появились.
- `fetch-portfolio-staging.py` — качает фото работ из Drive, ужимает в JPG,
  кладёт в `assets/img/_staging/` (через Action `fetch-portfolio-photos.yml`).
  См. раздел «Портфолио: фото и источник в Google Drive».
- `watermark.py` — накладывает водяной знак-лого на фото портфолио (обязательный
  шаг при вставке; см. правило в разделе про портфолио).

## Портфолио: фото и источник в Google Drive
Источник фото «до/после» — Google Drive (3 папки по типу работы). Песочница в
Drive не ходит → фото тянет Action `fetch-portfolio-photos.yml` (скрипт
`scripts/fetch-portfolio-staging.py`): качает, ужимает в JPG, кладёт в
`assets/img/_staging/<face|lipo|lips>/`. Дальше локально: совмещённый кадр
кладётся ЦЕЛИКОМ как `assets/img/portfolio/<slug>/result.jpg` (один файл на
кейс) + водяной знак. **Саму фотографию НЕ обрезаем** — режется только чёрный
фон (letterbox iPhone-скриншота, напр. face-fresh). После — `_staging` удаляется.

На сайте фото показывается целиком (`.ba__photo { object-fit: contain }`,
без слайдера). Поле кейса `layout`: `lr` (до слева/после справа) или `tb`
(до сверху/после снизу) — задаёт положение подписей «До»/«После».
Половинки before.jpg/after.jpg больше НЕ используются.

**ПРАВИЛО (всегда):** каждое фото портфолио при вставке получает маленький
полупрозрачный водяной знак-лого — `python3 scripts/watermark.py [files...]`
(белый вордmark `logo-wordmark.png`, правый нижний угол). Наложение — один раз
на файл (повторный запуск задвоит знак).

Папки Drive (родитель `1qx3kbxYnUEpJkowiaEyXfiA1OqHGm30p`):
- Лицо `1PK9Nr76ZrJxsdD_p5JhfIV17OzxqpyeD` → категория `face`
- Липолитики `1LBvB07K0P62KQgsDisgKr-cg37arPcqt` → категория `lipo`
- Губы `1wpJsKl8rEnyWrprvjS7mLNtN4ZM8Y_g6` → категория `lips`
ВАЖНО: имя папки = тип работы, но проверяй содержимое — фото могли положить не в
ту папку (так было с губами в «Липолитики»). Кейс должен соответствовать фото.

Манифест «slug ← файл Drive» (для добавления новых по запросу):
- lips-natural      ← lips/IMG_8767  `1-n7jXQ02lCNe3WQOUY-1ITWSa0wER-B5`
- lips-volume       ← lips/IMG_8780  `1HL8I6bTF0yN27VgJoAItvfzsJoz3nZRv`
- lips-cupid-bow    ← lips/IMG_8766  `1_hj0UgrgJ2yDgccQaJhNoYiJlFUMcya4`
- lips-hydro-volume ← lips/IMG_8775  `1XKLwW-R_A-kBYEBXnxCgVIWRUWv_fDYj`
- lips-shape        ← lips/IMG_8771  `17tUcJ3mdfGkY6sRmceaDykV8jemGCOdx`
- lips-soft-volume  ← lips/IMG_8769  `1WuUhOCFmOcT5GgLKfQK2B5bKnThFNnz1`
- lips-glossy       ← lips/IMG_8781  `1nbTa1n07Nt0Bl7r9AKmp6U9fIWMOwZIt`
- cheekbones        ← face/IMG_8776  `1XxzLMbCdYOQQq3xSMQ3Uflgfle7cWa6N`
- nasolabial        ← face/IMG_8791  `1oYCpFVLGc8SNPyQTnmjmOU7NeEg2MS3A`
- tear-trough       ← face/IMG_8779  `1iCTZzk0tX2LyQpB3qMEGmxsjIbuL4KxN`
- face-harmony      ← face/IMG_8778  `1jB0mtAtYP0qkB7Dk79_BDSaw0OQ8zwE4`
- face-fresh        ← face/IMG_8782  `1o0NZ96C9-I3CQeE0rR51FE6zHEalxzN_` (нужна обрезка чёрного)
- lipo-jawline      ← lipo/IMG_8764  `1BF5AdAyGNKmJqwMaM4UbUq4HigisNSuE`
- lipo-double-chin  ← lipo/IMG_8789  `1ThU3zItn0UXf4Z_4Tzk313Z_ZyoCIY0B`
- lipo-submental    ← lipo/IMG_8792  `1MxWeQWTGU3QcTosQY55P0byFvl4FvI1J`

Ещё лежат в Drive, но НЕ использованы (можно добавить позже):
face/IMG_8777 `1TnoF4g6rIgP1aYqtWZYCLjhhmpnOfa4t`, face/IMG_8774
`1MYO3ZRK8Eij7hlozeZ-Aq3SPTT0oUnbJ`; lips/IMG_8773 `1zxHfzlw-prO5UJpHZT0QTYTs7Gv41lLM`,
lips/IMG_8772 `1_ngWJgOLO-eYvElUvzDxd3hospvjEj98`, lips/IMG_8770
`1Kb--bHPUNoz3SZv86Kfr5QFh5lyJbI6A`, lips/IMG_8768 `1us5uVwTPW15L6tZNRqTx9V116_w8ZcbB`,
lips/IMG_8765 `1mG6oVNO0TxfYP6SZkjjMfGJIubVzrsut`.
Ссылка на файл: `https://drive.google.com/file/d/<ID>/view`.
Переименовать/удалить файлы в Drive из сессии нельзя (в MCP только copy_file) —
поэтому источник истины по соответствию «фото↔работа» здесь, а не в именах Drive.

## Грабли / неочевидное
- **Песочница Claude не имеет внешнего доступа** к `drive.google.com` и
  CloudFront → скачать фото/логотип напрямую отсюда нельзя (`host_not_allowed`).
  Решение в репо: GitHub Actions-раннер (полный интернет) качает файл и коммитит
  его. Workflows: `fetch-drive-photos.yml` (фото врача + use-photos.py),
  `fetch-logo.yml` (логотип с CDN). Триггер — `workflow_dispatch` вручную или push
  изменения самого workflow/скрипта. Если нужно дотянуть внешний медиа-ресурс —
  не пытайся curl-ить из сессии, добавь/запусти Action.
- Контакты-плейсхолдеры помечены `XXXXXXXXXX` — реальные значения уже
  проставлены в config.js, но проверяй перед публикацией.
- Категории фильтров портфолио заданы **в HTML** (`portfolio.html`, секция
  `.filters`, `data-filter=...`), а не в JS. Новая категория = и кнопка в HTML,
  и значение `category` в кейсе.
- Локальный запуск: `python3 -m http.server 8080` (просто открыть файл тоже
  работает, но относительные пути надёжнее через сервер).
