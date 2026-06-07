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
     injection — инъекции (ботокс, биорева, мезо, липолитики, бланширование)
     contour   — контурная пластика (губы, скулы, лицо, слёзная борозда)
     peels     — пилинги
     skin      — чистка лица и уходовые процедуры
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
      solution:  'Проработка контура и центральной части верхней губы, 1 мл филлера. Анестезия включена.',
      materials: 'Neuramis, Stylage M, Juvederm, Belotero (подбирается индивидуально)',
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
      solution:  'Введение филлера с учётом анатомии губ, мягкое моделирование объёма. Анестезия включена.',
      materials: 'Art Filler, Juvederm Ultra 3, Neauvia (подбирается индивидуально)',
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
      solution:  'Расчёт точек по фронтальной и боковой проекции, введение филлера канюлей.',
      materials: 'Tesoro, Neauvia',
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
      solution:  'Векторная поддержка средней трети + точечная коррекция носогубных борозд канюлей.',
      materials: 'Tesoro deep, Neuramis deep, Stylage M',
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
      solution:  'Точечная коррекция мышц, индивидуальный расчёт единиц по типу мимики. Комплекс «верхняя треть».',
      materials: 'Релатокс, Ксеомин',
      result:    'Гладкая кожа, естественная подвижность лица сохранена. Эффект до 6 месяцев.'
    }
  },
  {
    slug: 'blanching-wrinkles',
    title: 'Бланширование мимических морщин',
    category: 'injection',
    categoryLabel: 'Бланширование',
    summary: 'Заполнение мелких мимических морщин препаратом на основе гиалуроновой кислоты.',
    duration: '1 визит · 60 мин',
    featured: false,
    before: 'assets/img/portfolio/blanching-wrinkles/before.svg',
    after:  'assets/img/portfolio/blanching-wrinkles/after.svg',
    details: {
      problem:   'Мимические морщины лба и межбровья, «гусиные лапки», кисетные морщины над губой.',
      solution:  'Поверхностное введение препарата в зону морщин. Анестезия включена.',
      materials: 'Belotero Soft, Belotero Balance',
      result:    'Сглаживание мелких морщин, ровная кожа. Эффект до 12 месяцев.'
    }
  },
  {
    slug: 'biorevitalization-face',
    title: 'Биоревитализация лица — сияние кожи',
    category: 'injection',
    categoryLabel: 'Биорева',
    summary: 'Восстановление гидробаланса кожи и стимуляция упругости курсом из 2–3 процедур.',
    duration: '2–3 визита · 1 раз в 2–4 недели',
    featured: true,
    before: 'assets/img/portfolio/biorevitalization-face/before.svg',
    after:  'assets/img/portfolio/biorevitalization-face/after.svg',
    details: {
      problem:   'Обезвоженная тусклая кожа, мелкие морщинки, тёмные круги вокруг глаз.',
      solution:  'Курс биоревитализации препаратами на основе гиалуроновой кислоты. Анестезия включена.',
      materials: 'BELLARTI, Neauvia Hydro Deluxe, Hyalrepair, Revi',
      result:    'Гладкая увлажнённая кожа, ровный тон, естественное сияние.'
    }
  },
  {
    slug: 'mesotherapy-face',
    title: 'Мезотерапия лица и шеи',
    category: 'injection',
    categoryLabel: 'Мезотерапия',
    summary: 'Инъекции мезококтейлей для улучшения качества кожи лица и шеи.',
    duration: 'Курс 4–8 визитов',
    featured: false,
    before: 'assets/img/portfolio/mesotherapy-face/before.svg',
    after:  'assets/img/portfolio/mesotherapy-face/after.svg',
    details: {
      problem:   'Тусклая кожа, потеря тонуса, мелкие морщинки, зона вокруг глаз.',
      solution:  'Курс мезотерапии с подбором коктейля под задачу. Анестезия включена.',
      materials: 'Индивидуальный подбор мезопрепаратов',
      result:    'Улучшение качества и плотности кожи, ровный тон, увлажнение.'
    }
  },
  {
    slug: 'hair-mesotherapy',
    title: 'Мезотерапия для волос против выпадения',
    category: 'injection',
    categoryLabel: 'Мезотерапия',
    summary: 'Курс инъекций в кожу головы — остановка выпадения и стимуляция роста волос.',
    duration: 'Курс 4–8 визитов',
    featured: false,
    before: 'assets/img/portfolio/hair-mesotherapy/before.svg',
    after:  'assets/img/portfolio/hair-mesotherapy/after.svg',
    details: {
      problem:   'Диффузное выпадение волос, истончение, отсутствие подшёрстка.',
      solution:  'Курс мезотерапии кожи головы по протоколу.',
      materials: 'Индивидуальный подбор мезопрепаратов для волос',
      result:    'Прекращение выпадения, появление новых волос в зонах поредения, утолщение волос.'
    }
  },
  {
    slug: 'lipolytics-double-chin',
    title: 'Коррекция второго подбородка липолитиками',
    category: 'injection',
    categoryLabel: 'Липолитики',
    summary: 'Локальное уменьшение жирового пакета подбородочной области без операции.',
    duration: 'Курс 3–5 визитов · 1 раз в 2–3 недели',
    featured: false,
    before: 'assets/img/portfolio/lipolytics-double-chin/before.svg',
    after:  'assets/img/portfolio/lipolytics-double-chin/after.svg',
    details: {
      problem:   'Выраженный второй подбородок, нечёткий шейно-подбородочный угол.',
      solution:  'Курс инъекций липолитика по сетке в подбородочную область.',
      materials: 'LIGHT FIT/P.I, DR.LIPO',
      result:    'Подбородочная область уменьшена, более чёткий профиль шеи.'
    }
  },
  {
    slug: 'lipolytics-body',
    title: 'Липолитики — коррекция зоны тела',
    category: 'injection',
    categoryLabel: 'Липолитики',
    summary: 'Уменьшение локальных жировых отложений на теле инъекционным методом.',
    duration: 'Курс 3–5 визитов · 1 раз в 2–3 недели',
    featured: false,
    before: 'assets/img/portfolio/lipolytics-body/before.svg',
    after:  'assets/img/portfolio/lipolytics-body/after.svg',
    details: {
      problem:   'Локальные жировые отложения, не уходящие при диете и спорте.',
      solution:  'Курс инъекций липолитика в проблемную зону по сетке.',
      materials: 'LIGHT FIT/P.I, DR.LIPO',
      result:    'Уменьшение объёма в зоне коррекции, более ровный контур.'
    }
  },
  {
    slug: 'face-cleaning',
    title: 'Чистка лица',
    category: 'skin',
    categoryLabel: 'Чистка',
    summary: 'Профессиональная чистка лица на премиальной израильской косметике GIGI.',
    duration: '1 визит · до 1,5 часа',
    featured: true,
    before: 'assets/img/portfolio/face-cleaning/before.svg',
    after:  'assets/img/portfolio/face-cleaning/after.svg',
    details: {
      problem:   'Чёрные точки, расширенные поры, тусклый цвет лица, забитая кожа.',
      solution:  'Ультразвуковая и механическая чистка, маска по типу кожи, подбор домашнего ухода.',
      materials: 'Профессиональная косметика GIGI (Израиль)',
      result:    'Чистая, ухоженная кожа, сужение пор, ровный тон. Пробники проф. средств в подарок.'
    }
  },
  {
    slug: 'face-cleaning-complex',
    title: 'Комплексная чистка лица «чистка + пилинг»',
    category: 'skin',
    categoryLabel: 'Чистка',
    summary: 'Расширенная программа: чистка лица в сочетании с пилингом для максимального результата.',
    duration: '1 визит · до 1,5 часа',
    featured: false,
    before: 'assets/img/portfolio/face-cleaning-complex/before.svg',
    after:  'assets/img/portfolio/face-cleaning-complex/after.svg',
    details: {
      problem:   'Забитая кожа, неровный тон, тусклость, пигментация.',
      solution:  'Ультразвуковая и механическая чистка + пилинг, маска, консультация по уходу.',
      materials: 'Косметика GIGI, пилинг BioRePeelCl3',
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
  },
  {
    slug: 'care-carboxytherapy',
    title: 'Карбокситерапия «Машина времени»',
    category: 'skin',
    categoryLabel: 'Уход',
    summary: 'Уходовая процедура для активного омоложения и оздоровления кожи.',
    duration: '1 визит · 1 час',
    featured: false,
    before: 'assets/img/portfolio/care-carboxytherapy/before.svg',
    after:  'assets/img/portfolio/care-carboxytherapy/after.svg',
    details: {
      problem:   'Тусклая, уставшая кожа, снижение эластичности, фотостарение.',
      solution:  'Уходовая процедура карбокситерапии для насыщения кожи и стимуляции обновления.',
      materials: 'Профессиональный уходовый протокол',
      result:    'Свежая, отдохнувшая кожа, ровный цвет лица, эффект сияния.'
    }
  },
  {
    slug: 'care-bioplasma',
    title: 'Биоплазма «Увлажнение и лифтинг»',
    category: 'skin',
    categoryLabel: 'Уход',
    summary: 'Уходовая процедура для глубокого увлажнения и лифтинг-эффекта.',
    duration: '1 визит · 1 час',
    featured: false,
    before: 'assets/img/portfolio/care-bioplasma/before.svg',
    after:  'assets/img/portfolio/care-bioplasma/after.svg',
    details: {
      problem:   'Обезвоженная кожа, снижение тонуса, мелкие морщинки.',
      solution:  'Уходовая процедура «биоплазма» для увлажнения и лифтинга кожи.',
      materials: 'Профессиональный уходовый протокол',
      result:    'Увлажнённая, подтянутая кожа, ровный рельеф, свежий вид.'
    }
  }
];
