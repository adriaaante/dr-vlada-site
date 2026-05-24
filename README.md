# Сайт Влады Бобровой — врача-косметолога

Премиум сайт-визитка врача-косметолога. Статический HTML/CSS/JS без сборки —
открывается двойным кликом, деплоится на любой хостинг.

**Технологии:** чистый HTML5 + CSS (CSS custom properties) + Vanilla JS.
**Шрифты:** Cormorant Garamond + Inter (Google Fonts CDN).
**Без форм** сбора данных — только клик-в-телефон и переходы в мессенджеры
(сайт не требует регистрации в Роскомнадзоре как оператор персональных данных).

---

## Структура

```
dr-vlada-site/
├─ index.html        — главная
├─ about.html        — обо мне
├─ services.html     — услуги и цены
├─ portfolio.html    — все работы с фильтрами
├─ contacts.html     — контакты и карта
├─ 404.html          — кастомная 404
├─ robots.txt
├─ sitemap.xml
├─ assets/
│  ├─ css/styles.css        — единая дизайн-система (цвета, шрифты, компоненты)
│  ├─ js/
│  │  ├─ config.js          ← КОНТАКТЫ (телефон, мессенджеры, адрес) — менять здесь
│  │  ├─ portfolio.js       ← КЕЙСЫ ПОРТФОЛИО — менять / добавлять здесь
│  │  └─ main.js            — логика сайта (FAB, before/after, lightbox, анимации)
│  └─ img/
│     ├─ doctor/            — фото врача (hero.svg, about.svg, thumb.svg)
│     ├─ portfolio/<slug>/  — по папке на каждый кейс с before.* и after.*
│     ├─ favicon.svg
│     └─ og-cover.svg
└─ scripts/
   └─ generate-placeholders.py  — генератор SVG-заглушек (запускать после нового кейса)
```

---

## Как поменять контакты

Все контакты живут в одном файле — **`assets/js/config.js`**:

```js
window.VB_CONFIG = {
  phone:       '+7 (XXX) XXX-XX-XX',     // как будет показано
  phoneClean:  '+7XXXXXXXXXX',           // для tel: и wa.me — без скобок и тире
  whatsapp:    'https://wa.me/7XXXXXXXXXX?text=Здравствуйте',
  telegram:    'https://t.me/USERNAME',
  instagram:   'https://instagram.com/USERNAME',
  address:     'г. Чебоксары, ул. Адрес, д. XX',
  hours:       'Пн–Сб 10:00–20:00',
  mapEmbed:    'https://yandex.ru/map-widget/v1/?...',
  ...
};
```

После сохранения — обновятся **все** кнопки телефона, мессенджеров, адрес и
карта на всех страницах. Перезагружать вёрстку не нужно.

---

## Как добавить новый кейс в портфолио

1. **Положите фото.** Создайте папку `assets/img/portfolio/<новый-slug>/`
   и положите туда `before.jpg` и `after.jpg` (рекомендуем 1200×900,
   одинаковый ракурс и освещение).

2. **Допишите объект в `assets/js/portfolio.js`:**

   ```js
   {
     slug: 'my-new-case',
     title: 'Название процедуры',
     category: 'contour',          // injection | contour | hardware | peels | threads | skin
     categoryLabel: 'Контурная пластика',
     summary: 'Краткое описание для карточки.',
     duration: '1 визит · 45 мин',
     featured: true,               // true — показывать на главной; false — только в портфолио
     before: 'assets/img/portfolio/my-new-case/before.jpg',
     after:  'assets/img/portfolio/my-new-case/after.jpg',
     details: {
       problem:   'Что было.',
       solution:  'Что сделали.',
       materials: 'Какие препараты использовали.',
       result:    'Финальный результат.'
     }
   }
   ```

3. **Готово.** Сайт автоматически отрендерит карточку с before/after слайдером
   и подробной модалкой по клику.

Категории, по которым работают фильтры на странице портфолио, заданы в
самом HTML (`portfolio.html`, секция `.filters`). Если нужна новая категория —
допишите кнопку с `data-filter="новая-категория"` и используйте это значение
в `category` объекта кейса.

---

## Как заменить фото доктора

Положите свой файл (jpg/png) в `assets/img/doctor/`:
- `hero.jpg` (или `.png`) — большое фото для главной (портретное 960×1200)
- `about.jpg` — фото для страницы «Обо мне» (800×1000)
- `thumb.jpg` — миниатюра (400×400)

Затем в `index.html` и `about.html` замените `hero.svg` / `about.svg` на ваше
расширение (поиск `src="assets/img/doctor/hero.svg"` → `src="assets/img/doctor/hero.jpg"`).

---

## Цвета и дизайн

Палитра задана в `:root` файла `assets/css/styles.css`:

- `--c-primary: #0e3d4d` — глубокий тёмный тил (основной)
- `--c-accent: #c5a572` — шампанское золото (CTA, акценты)
- `--c-bg: #fdfaf3` — кремовый фон

Поменять цвет везде сразу — отредактировать переменную в `:root`.

---

## Локальный запуск

Просто откройте `index.html` в браузере. Или запустите простой HTTP-сервер:

```bash
python3 -m http.server 8080
# http://localhost:8080/
```

---

## Деплой

Сайт — статический. Подойдут:

- **GitHub Pages** — push в branch, включить Pages в Settings → Pages → Source
- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop или connect-to-git
- **Reg.ru / Beget / любой хостинг** — загрузить файлы по FTP в корень

Никакой сборки не требуется.

---

## Скрипты

- `scripts/generate-placeholders.py` — генерирует SVG-заглушки для всех
  кейсов из `portfolio.js`, фото врача, favicon, OG-cover. Запускайте
  после добавления нового кейса.

  ```bash
  python3 scripts/generate-placeholders.py
  ```

---

## Что используется и что не используется

**Используется:**
- Vanilla JS (без jQuery, React, Vue)
- CSS custom properties (без препроцессоров)
- IntersectionObserver для анимаций reveal-on-scroll
- Google Fonts CDN
- SVG-иконки inline (без иконных шрифтов)

**НЕ используется:**
- Никаких форм сбора данных (`<form>` — 0 штук)
- Нет cookie-баннеров (нет cookies)
- Нет аналитики по умолчанию (добавьте свой счётчик, если нужно)
- Нет сборки (Webpack, Vite, etc.)
- Нет npm-зависимостей

---

Сделано в [FutureFlow](https://futureflow.ru)
