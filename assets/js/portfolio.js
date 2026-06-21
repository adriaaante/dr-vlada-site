/* ============================================================
   ПОРТФОЛИО — работы врача-косметолога Влады Бобровой.

   Все кейсы построены на реальных фото «до/после». Каждая папка
   assets/img/portfolio/<slug>/ содержит before.jpg и after.jpg —
   это две половины исходного совмещённого кадра «до/после»
   (см. scripts/fetch-portfolio-staging.py — откуда берутся фото).

   Как добавить новый кейс:
   1. Папка кейса: assets/img/portfolio/<slug>/ с before.jpg и after.jpg.
   2. Скопируйте объект ниже и замените поля.
   3. featured: true — показать кейс на главной (максимум 6).

   Категории (совпадают с фильтрами на странице «Работы», portfolio.html):
     lips — контурная пластика губ
     face — контурная пластика лица (скулы, средняя треть, слёзная борозда)
     lipo — липолитики (коррекция второго подбородка и овала)
   ============================================================ */
window.VB_PORTFOLIO = [
  /* -------------------- Губы -------------------- */
  {
    slug: 'lips-natural',
    title: 'Контурная пластика губ — натуральный объём',
    category: 'lips',
    categoryLabel: 'Губы',
    summary: 'Деликатное увеличение губ с сохранением естественной формы и чёткого контура.',
    duration: '1 визит · 40 мин',
    featured: true,
    before: 'assets/img/portfolio/lips-natural/before.jpg',
    after:  'assets/img/portfolio/lips-natural/after.jpg',
    details: {
      problem:   'Недостаточный объём губ, размытый контур, лёгкая сухость.',
      solution:  'Введение филлера 0,5–1 ml по технике мягкого моделирования, проработка контура. Анестезия включена.',
      materials: 'Филлер на гиалуроновой кислоте (подбирается индивидуально)',
      result:    'Естественный объём и аккуратный контур, губы выглядят ухоженно. Эффект до 12 месяцев.'
    }
  },
  {
    slug: 'lips-volume',
    title: 'Контурная пластика губ — выразительный объём',
    category: 'lips',
    categoryLabel: 'Губы',
    summary: 'Увеличение объёма и коррекция формы для более выразительного, но гармоничного результата.',
    duration: '1 визит · 40 мин',
    featured: true,
    before: 'assets/img/portfolio/lips-volume/before.jpg',
    after:  'assets/img/portfolio/lips-volume/after.jpg',
    details: {
      problem:   'Тонкие губы, желание подчеркнуть объём и форму.',
      solution:  'Введение филлера 1 ml с учётом анатомии губ, равномерное распределение объёма. Анестезия включена.',
      materials: 'Филлер на гиалуроновой кислоте (подбирается индивидуально)',
      result:    'Выразительный естественный объём, ровный контур. Эффект до 12 месяцев.'
    }
  },
  {
    slug: 'lips-cupid-bow',
    title: 'Контурная пластика губ — чёткий контур',
    category: 'lips',
    categoryLabel: 'Губы',
    summary: 'Прорисовка дуги Купидона и контура — губы становятся более очерченными и симметричными.',
    duration: '1 визит · 40 мин',
    featured: false,
    before: 'assets/img/portfolio/lips-cupid-bow/before.jpg',
    after:  'assets/img/portfolio/lips-cupid-bow/after.jpg',
    details: {
      problem:   'Нечёткая дуга Купидона, лёгкая асимметрия, размытый край губ.',
      solution:  'Акцент на контур и центральную часть верхней губы, аккуратное моделирование. Анестезия включена.',
      materials: 'Филлер на гиалуроновой кислоте (подбирается индивидуально)',
      result:    'Выраженная дуга Купидона, чёткий контур, сохранённая симметрия. Эффект до 12 месяцев.'
    }
  },
  {
    slug: 'lips-hydro-volume',
    title: 'Контурная пластика губ — объём и увлажнение',
    category: 'lips',
    categoryLabel: 'Губы',
    summary: 'Возвращение объёма и свежести сухим, обезвоженным губам.',
    duration: '1 визит · 40 мин',
    featured: false,
    before: 'assets/img/portfolio/lips-hydro-volume/before.jpg',
    after:  'assets/img/portfolio/lips-hydro-volume/after.jpg',
    details: {
      problem:   'Сухие губы с потерей объёма, тусклый цвет.',
      solution:  'Введение филлера с акцентом на увлажнение и мягкий объём. Анестезия включена.',
      materials: 'Филлер на гиалуроновой кислоте (подбирается индивидуально)',
      result:    'Увлажнённые, наполненные губы, естественный блеск. Эффект до 12 месяцев.'
    }
  },
  {
    slug: 'lips-shape',
    title: 'Контурная пластика губ — коррекция формы',
    category: 'lips',
    categoryLabel: 'Губы',
    summary: 'Коррекция формы и асимметрии губ для сбалансированного результата.',
    duration: '1 визит · 40 мин',
    featured: false,
    before: 'assets/img/portfolio/lips-shape/before.jpg',
    after:  'assets/img/portfolio/lips-shape/after.jpg',
    details: {
      problem:   'Асимметрия губ, неравномерный объём верхней и нижней губы.',
      solution:  'Точечное моделирование для выравнивания формы и пропорций. Анестезия включена.',
      materials: 'Филлер на гиалуроновой кислоте (подбирается индивидуально)',
      result:    'Сбалансированная форма, ровный контур, естественный объём. Эффект до 12 месяцев.'
    }
  },
  {
    slug: 'lips-soft-volume',
    title: 'Контурная пластика губ — мягкий объём',
    category: 'lips',
    categoryLabel: 'Губы',
    summary: 'Лёгкое увеличение с акцентом на естественность — объём «как свой».',
    duration: '1 визит · 40 мин',
    featured: false,
    before: 'assets/img/portfolio/lips-soft-volume/before.jpg',
    after:  'assets/img/portfolio/lips-soft-volume/after.jpg',
    details: {
      problem:   'Желание добавить объём без эффекта «перекаченных» губ.',
      solution:  'Минимальный объём филлера, мягкая техника распределения. Анестезия включена.',
      materials: 'Филлер на гиалуроновой кислоте (подбирается индивидуально)',
      result:    'Естественный мягкий объём, ухоженный вид. Эффект до 12 месяцев.'
    }
  },
  {
    slug: 'lips-glossy',
    title: 'Контурная пластика губ — объём и сияние',
    category: 'lips',
    categoryLabel: 'Губы',
    summary: 'Объём и насыщенный, здоровый вид губ за одну процедуру.',
    duration: '1 визит · 40 мин',
    featured: false,
    before: 'assets/img/portfolio/lips-glossy/before.jpg',
    after:  'assets/img/portfolio/lips-glossy/after.jpg',
    details: {
      problem:   'Плоские губы, размытый контур, тусклый цвет.',
      solution:  'Моделирование объёма и контура с акцентом на «сочный» естественный вид. Анестезия включена.',
      materials: 'Филлер на гиалуроновой кислоте (подбирается индивидуально)',
      result:    'Наполненные сияющие губы, чёткий контур. Эффект до 12 месяцев.'
    }
  },

  /* -------------------- Лицо -------------------- */
  {
    slug: 'cheekbones',
    title: 'Контурная пластика лица — скулы и овал',
    category: 'face',
    categoryLabel: 'Лицо',
    summary: 'Создание выразительных скул и более чёткого овала лица.',
    duration: '1 визит · 60 мин',
    featured: true,
    before: 'assets/img/portfolio/cheekbones/before.jpg',
    after:  'assets/img/portfolio/cheekbones/after.jpg',
    details: {
      problem:   'Недостаточно выраженные скулы, желание подчеркнуть овал лица.',
      solution:  'Расчёт точек по фронтальной и боковой проекции, введение филлера канюлей.',
      materials: 'Филлер на гиалуроновой кислоте / Radiesse (подбирается индивидуально)',
      result:    'Выразительные скулы, скульптурный овал, свежий вид. Эффект 12–18 месяцев.'
    }
  },
  {
    slug: 'nasolabial',
    title: 'Контурная пластика лица — средняя треть',
    category: 'face',
    categoryLabel: 'Лицо',
    summary: 'Объёмное моделирование средней трети — лицо выглядит отдохнувшим и свежим.',
    duration: '1 визит · 60 мин',
    featured: true,
    before: 'assets/img/portfolio/nasolabial/before.jpg',
    after:  'assets/img/portfolio/nasolabial/after.jpg',
    details: {
      problem:   'Опущение средней трети лица, носогубные складки, «уставший» вид.',
      solution:  'Векторная поддержка средней трети + деликатная коррекция носогубных борозд канюлей.',
      materials: 'Филлер на гиалуроновой кислоте / Radiesse (подбирается индивидуально)',
      result:    'Лицо выглядит свежее и моложе, складки смягчены. Эффект 12–18 месяцев.'
    }
  },
  {
    slug: 'tear-trough',
    title: 'Коррекция носослёзной борозды',
    category: 'face',
    categoryLabel: 'Глаза',
    summary: 'Заполнение слёзной борозды канюльным методом — уходит «уставший» взгляд.',
    duration: '1 визит · 60 мин',
    featured: true,
    before: 'assets/img/portfolio/tear-trough/before.jpg',
    after:  'assets/img/portfolio/tear-trough/after.jpg',
    details: {
      problem:   'Выраженная слёзная борозда, тёмные круги, «тени» под глазами.',
      solution:  'Введение деликатного филлера канюлей по технологии коррекции носослёзной борозды.',
      materials: 'Филлер для зоны вокруг глаз (подбирается индивидуально)',
      result:    'Заполненная слёзная борозда, свежий отдохнувший взгляд. Результат до 1,5 года.'
    }
  },
  {
    slug: 'face-harmony',
    title: 'Гармонизация лица',
    category: 'face',
    categoryLabel: 'Лицо',
    summary: 'Комплексная работа с пропорциями лица — естественный, но заметный результат.',
    duration: '1–2 визита · 60 мин',
    featured: false,
    before: 'assets/img/portfolio/face-harmony/before.jpg',
    after:  'assets/img/portfolio/face-harmony/after.jpg',
    details: {
      problem:   'Дисбаланс пропорций, асимметрия, «уставший» вид лица.',
      solution:  'Поэтапная коррекция нескольких зон с учётом анатомии и индивидуальных пропорций.',
      materials: 'Филлеры на гиалуроновой кислоте (подбираются индивидуально)',
      result:    'Сбалансированные черты, ухоженный и свежий вид. Эффект 12–18 месяцев.'
    }
  },
  {
    slug: 'face-fresh',
    title: 'Контурная пластика лица — свежесть и тонус',
    category: 'face',
    categoryLabel: 'Лицо',
    summary: 'Восстановление тонуса и свежести кожи лица.',
    duration: '1 визит · 60 мин',
    featured: false,
    before: 'assets/img/portfolio/face-fresh/before.jpg',
    after:  'assets/img/portfolio/face-fresh/after.jpg',
    details: {
      problem:   'Потеря тонуса, тусклый и «уставший» вид кожи.',
      solution:  'Деликатная контурная коррекция и поддержка тканей для более свежего вида.',
      materials: 'Филлер на гиалуроновой кислоте (подбирается индивидуально)',
      result:    'Свежее, отдохнувшее лицо, ровный тон. Эффект 12–18 месяцев.'
    }
  },

  /* -------------------- Липолитики -------------------- */
  {
    slug: 'lipo-jawline',
    title: 'Липолитики — чёткий овал лица',
    category: 'lipo',
    categoryLabel: 'Липолитики',
    summary: 'Уменьшение жирового пакета нижней трети лица и более чёткий овал без операции.',
    duration: 'Курс 1–2 процедуры',
    featured: true,
    before: 'assets/img/portfolio/lipo-jawline/before.jpg',
    after:  'assets/img/portfolio/lipo-jawline/after.jpg',
    details: {
      problem:   'Нечёткий овал лица, лишний объём в нижней трети.',
      solution:  'Курс инъекций липолитика по сетке + сосудистый этап.',
      materials: 'Липолитический комплекс',
      result:    'Более чёткий овал и линия челюсти, «худое» свежее лицо.'
    }
  },
  {
    slug: 'lipo-double-chin',
    title: 'Липолитики — второй подбородок',
    category: 'lipo',
    categoryLabel: 'Липолитики',
    summary: 'Коррекция второго подбородка инъекционным методом — чёткий шейно-подбородочный угол.',
    duration: 'Курс 1–2 процедуры',
    featured: false,
    before: 'assets/img/portfolio/lipo-double-chin/before.jpg',
    after:  'assets/img/portfolio/lipo-double-chin/after.jpg',
    details: {
      problem:   'Выраженный второй подбородок, нечёткий шейно-подбородочный угол.',
      solution:  'Курс инъекций липолитика в подбородочную область + сосудистый этап.',
      materials: 'Липолитический комплекс',
      result:    'Подбородочная область уменьшена, более чёткий профиль.'
    }
  },
  {
    slug: 'lipo-submental',
    title: 'Липолитики — подбородочная зона',
    category: 'lipo',
    categoryLabel: 'Липолитики',
    summary: 'Уменьшение объёма подбородочной зоны и более выразительная линия челюсти.',
    duration: 'Курс 1–2 процедуры',
    featured: false,
    before: 'assets/img/portfolio/lipo-submental/before.jpg',
    after:  'assets/img/portfolio/lipo-submental/after.jpg',
    details: {
      problem:   'Лишний объём в подбородочной зоне, сглаженная линия челюсти.',
      solution:  'Курс инъекций липолитика по сетке + сосудистый этап.',
      materials: 'Липолитический комплекс',
      result:    'Более выразительная линия челюсти, аккуратный профиль.'
    }
  }
];
