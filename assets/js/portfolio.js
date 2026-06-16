/* ============================================================
   ПОРТФОЛИО — работы врача-косметолога Влады Бобровой.

   Как добавить/заменить фото в кейсе:
   1. Папка кейса: assets/img/portfolio/<slug>/
   2. Положите туда before.jpg и after.jpg
      (рекомендуем 1200×900 — одинаковый ракурс и освещение).
      Имя файла можно оставить before.svg/after.svg или поменять
      путь в полях before/after ниже.
   3. Чтобы добавить новый кейс — скопируйте один из объектов и замените поля.
   4. Чтобы показать кейс на главной — поставьте featured: true.

   Категории (совпадают с фильтрами на странице «Работы»):
     injection — инъекции (ботокс, биорева, липолитики)
     contour   — контурная пластика (губы, лицо, слёзная борозда)
     peels     — пилинги
     skin      — чистка лица и уход
   Услуги и кейсы соответствуют актуальному прайс-листу.
   ============================================================ */
window.VB_PORTFOLIO = [
  {
    slug: 'lip-filler-natural',
    title: 'Контурная пластика губ — натуральный объём',
    category: 'contour',
    categoryLabel: 'Губы',
    summary: 'Гармоничное увеличение губ филлером на гиалуроновой кислоте с сохранением естественной формы.',
    duration: '1 визит · 40 мин',
    featured: true,
    before: 'assets/img/portfolio/lip-filler-natural/before.svg',
    after:  'assets/img/portfolio/lip-filler-natural/after.svg',
    details: {
      problem:   'Тонкие губы с потерей объёма верхней дуги Купидона, асимметрия.',
      solution:  'Проработка контура и центральной части верхней губы, объём 0,5–1 ml. Анестезия включена.',
      materials: 'Tesoro Deep, Stylage M, Belotero Intense (подбирается индивидуально)',
      result:    'Естественный объём, выраженная дуга Купидона, симметрия сохранена. Эффект до 12 месяцев.'
    }
  },
  {
    slug: 'lip-volume',
    title: 'Контурная пластика губ — увеличение объёма',
    category: 'contour',
    categoryLabel: 'Губы',
    summary: 'Увеличение губ и коррекция формы для более выразительного, но естественного результата.',
    duration: '1 визит · 40 мин',
    featured: false,
    before: 'assets/img/portfolio/lip-volume/before.svg',
    after:  'assets/img/portfolio/lip-volume/after.svg',
    details: {
      problem:   'Недостаточный объём губ, желание подчеркнуть форму и контур.',
      solution:  'Введение филлера 1 ml с учётом анатомии губ, мягкое моделирование объёма. Анестезия включена.',
      materials: 'Tesoro Deep, Belotero Lips Shape (подбирается индивидуально)',
      result:    'Аккуратный объём, ухоженные губы, естественный контур. Эффект до 12 месяцев.'
    }
  },
  {
    slug: 'cheekbones-sculpting',
    title: 'Контурная пластика лица — скулы',
    category: 'contour',
    categoryLabel: 'Лицо',
    summary: 'Создание выразительных скул и улучшение пропорций лица плотным филлером.',
    duration: '1 визит · 60 мин',
    featured: true,
    before: 'assets/img/portfolio/cheekbones-sculpting/before.svg',
    after:  'assets/img/portfolio/cheekbones-sculpting/after.svg',
    details: {
      problem:   'Плоские скулы, желание подчеркнуть овал лица.',
      solution:  'Расчёт точек по фронтальной и боковой проекции, введение филлера канюлей (2–3 ml).',
      materials: 'Tesoro, Radiesse',
      result:    'Выразительные скулы, скульптурный овал лица. Эффект 12–18 месяцев.'
    }
  },
  {
    slug: 'nasolabial-fillers',
    title: 'Контурная пластика лица — носогубные складки',
    category: 'contour',
    categoryLabel: 'Лицо',
    summary: 'Объёмное моделирование средней трети лица — носогубки уходят без перегруза.',
    duration: '1 визит · 60 мин',
    featured: true,
    before: 'assets/img/portfolio/nasolabial-fillers/before.svg',
    after:  'assets/img/portfolio/nasolabial-fillers/after.svg',
    details: {
      problem:   'Глубокие носогубные складки, опущение средней трети лица, «уставший» вид.',
      solution:  'Векторный лифтинг средней трети + точечная коррекция носогубных борозд канюлей.',
      materials: 'Tesoro, Radiesse',
      result:    'Лицо выглядит свежее и моложе, складки разглажены. Эффект 12–18 месяцев.'
    }
  },
  {
    slug: 'tear-trough-correction',
    title: 'Коррекция носослезной борозды',
    category: 'contour',
    categoryLabel: 'Глаза',
    summary: 'Заполнение слёзной борозды деликатным филлером канюльным методом — уходит «уставший» взгляд.',
    duration: '1 визит · 60 мин',
    featured: false,
    before: 'assets/img/portfolio/tear-trough-correction/before.svg',
    after:  'assets/img/portfolio/tear-trough-correction/after.svg',
    details: {
      problem:   'Выраженная слёзная борозда, тёмные круги, мешки под глазами.',
      solution:  'Введение филлера канюлей по технологии коррекции носослезной борозды.',
      materials: 'Teosyal Redensity 2',
      result:    'Заполненная слёзная борозда, свежий отдохнувший взгляд. Результат до 1,5 года.'
    }
  },
  {
    slug: 'botox-forehead-glabella',
    title: 'Ботулинотерапия лба и межбровья',
    category: 'injection',
    categoryLabel: 'Ботулинотерапия',
    summary: 'Коррекция мимических морщин лба, межбровья и «гусиных лапок» — отдохнувший взгляд без эффекта маски.',
    duration: '1 визит · 30 мин',
    featured: true,
    before: 'assets/img/portfolio/botox-forehead-glabella/before.svg',
    after:  'assets/img/portfolio/botox-forehead-glabella/after.svg',
    details: {
      problem:   'Горизонтальные морщины лба, вертикальная складка между бровями, морщинки у глаз.',
      solution:  'Комплекс «верхняя треть»: лоб + межбровье + глаза, индивидуальный расчёт единиц по типу мимики.',
      materials: 'Сертифицированный ботулотоксин типа А',
      result:    'Гладкая кожа, естественная подвижность лица сохранена. Эффект до 6 месяцев.'
    }
  },
  {
    slug: 'biorevitalization-face',
    title: 'Биоревитализация лица — сияние кожи',
    category: 'injection',
    categoryLabel: 'Биорева',
    summary: 'Восстановление гидробаланса кожи и стимуляция упругости курсом из 3 процедур.',
    duration: 'Курс 3 процедуры · 1 раз в 2–4 недели',
    featured: true,
    before: 'assets/img/portfolio/biorevitalization-face/before.svg',
    after:  'assets/img/portfolio/biorevitalization-face/after.svg',
    details: {
      problem:   'Обезвоженная тусклая кожа, мелкие морщинки, тёмные круги вокруг глаз.',
      solution:  'Курс биоревитализации препаратами на основе гиалуроновой кислоты. Работа с зоной вокруг глаз.',
      materials: 'BIOGEL, Meso-Wharton, Meso-Xanthin, Revi',
      result:    'Гладкая увлажнённая кожа, ровный тон, естественное сияние.'
    }
  },
  {
    slug: 'lipolytics-double-chin',
    title: 'Липолитики «Стройность» — второй подбородок',
    category: 'injection',
    categoryLabel: 'Липолитики',
    summary: 'Локальное уменьшение жирового пакета подбородочной области и щёчек без операции.',
    duration: 'Курс 1–2 процедуры',
    featured: false,
    before: 'assets/img/portfolio/lipolytics-double-chin/before.svg',
    after:  'assets/img/portfolio/lipolytics-double-chin/after.svg',
    details: {
      problem:   'Выраженный второй подбородок и щёчки, нечёткий шейно-подбородочный угол.',
      solution:  'Курс инъекций липолитика (2 ml) с сосудистым этапом по сетке в подбородочную область.',
      materials: 'Липолитический комплекс «Стройность» + сосудистый этап',
      result:    'Подбородочная область уменьшена, более чёткий профиль, эффект «худого лица».'
    }
  },
  {
    slug: 'lipolytics-body',
    title: 'Липолитики «Стройность» — коррекция тела',
    category: 'injection',
    categoryLabel: 'Липолитики',
    summary: 'Уменьшение локальных жировых отложений на теле инъекционным методом с сосудистым этапом.',
    duration: 'Курс 1–2 процедуры',
    featured: false,
    before: 'assets/img/portfolio/lipolytics-body/before.svg',
    after:  'assets/img/portfolio/lipolytics-body/after.svg',
    details: {
      problem:   'Локальные жировые отложения, не уходящие при диете и спорте.',
      solution:  'Курс инъекций липолитика (2–4 ml) в проблемную зону + сосудистый этап.',
      materials: 'Липолитический комплекс «Стройность» + сосудистый этап',
      result:    'Уменьшение объёма в зоне коррекции, более ровный контур.'
    }
  },
  {
    slug: 'face-cleaning',
    title: 'Чистка лица',
    category: 'skin',
    categoryLabel: 'Чистка',
    summary: 'Профессиональная чистка лица на премиальной израильской космоцевтике GIGI.',
    duration: '1 визит · до 1,5 часа',
    featured: true,
    before: 'assets/img/portfolio/face-cleaning/before.svg',
    after:  'assets/img/portfolio/face-cleaning/after.svg',
    details: {
      problem:   'Чёрные точки, расширенные поры, тусклый цвет лица, забитая кожа.',
      solution:  'Ультразвуковая и механическая чистка, маска по типу кожи, подбор домашнего ухода.',
      materials: 'Космоцевтика GIGI (Израиль)',
      result:    'Чистая, ухоженная кожа, сужение пор, ровный тон.'
    }
  },
  {
    slug: 'face-cleaning-complex',
    title: 'Чистка лица + пилинг BioRePeelCl3',
    category: 'skin',
    categoryLabel: 'Чистка',
    summary: 'Расширенная программа: чистка лица в сочетании с пилингом для максимального результата.',
    duration: '1 визит · до 1,5 часа',
    featured: false,
    before: 'assets/img/portfolio/face-cleaning-complex/before.svg',
    after:  'assets/img/portfolio/face-cleaning-complex/after.svg',
    details: {
      problem:   'Забитая кожа, неровный тон, тусклость, пигментация.',
      solution:  'Ультразвуковая и механическая чистка + пилинг BioRePeelCl3, маска, консультация по уходу.',
      materials: 'Космоцевтика GIGI, пилинг BioRePeelCl3',
      result:    'Глубоко очищенная, обновлённая кожа, ровный тон и сияние.'
    }
  },
  {
    slug: 'biorepeel-peel',
    title: 'Пилинг BioRePeelCl3',
    category: 'peels',
    categoryLabel: 'Пилинги',
    summary: 'Лифтинг-эффект уже за один сеанс: улучшение тонуса кожи и устранение пигментных пятен.',
    duration: '1 визит · 30 мин',
    featured: true,
    before: 'assets/img/portfolio/biorepeel-peel/before.svg',
    after:  'assets/img/portfolio/biorepeel-peel/after.svg',
    details: {
      problem:   'Неровный тон и рельеф кожи, пигментные пятна, потеря тонуса.',
      solution:  'Отшелушивание в сочетании со стимуляцией биосинтеза и обновлением клеток кожи.',
      materials: 'BioRePeelCl3',
      result:    'Лифтинг-эффект, ровный тон, гладкая кожа уже после первого сеанса.'
    }
  }
];
