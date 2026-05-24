/* ============================================================
   ПОРТФОЛИО — работы врача-косметолога Влада Боброва.

   Как добавить новый кейс:
   1. Создайте папку: assets/img/portfolio/<slug>/
   2. Положите туда before.jpg и after.jpg
      (рекомендуем 1200×900 — одинаковый ракурс и освещение).
   3. Скопируйте один из объектов ниже, замените поля.
   4. Чтобы показать кейс на главной — поставьте featured: true.

   Категории:
     injection   — инъекционная косметология (ботокс, филлеры, биорева, мезо)
     contour     — контурная пластика (губы, скулы, овал)
     hardware    — аппаратная косметология (лазер, RF, SMAS, IPL)
     peels       — пилинги
     threads     — нитевой лифтинг
     skin        — лечение кожи (акне, постакне, пигментация)
     anti-age    — комплексные anti-age программы
   ============================================================ */
window.VB_PORTFOLIO = [
  {
    slug: 'lip-filler-natural',
    title: 'Контурная пластика губ — натуральный объём',
    category: 'contour',
    categoryLabel: 'Губы',
    summary: 'Гармоничное увеличение губ филлером на гиалуроновой кислоте с сохранением естественной формы.',
    duration: '1 визит · 45 мин',
    featured: true,
    before: 'assets/img/portfolio/lip-filler-natural/before.svg',
    after:  'assets/img/portfolio/lip-filler-natural/after.svg',
    details: {
      problem:   'Тонкие губы с потерей объёма верхней дуги Купидона, асимметрия.',
      solution:  'Техника Russian Lips, 1 мл филлера, проработка контура и центральной части верхней губы.',
      materials: 'Juvederm Volift / Belotero Balance (на выбор)',
      result:    'Естественный объём, выраженная дуга Купидона, симметрия сохранена. Эффект 12–14 месяцев.'
    }
  },
  {
    slug: 'botox-forehead-glabella',
    title: 'Ботулинотерапия лба и межбровья',
    category: 'injection',
    categoryLabel: 'Ботулинотерапия',
    summary: 'Расслабление мимических морщин лба, межбровья и «гусиных лапок» — отдохнувший взгляд без эффекта маски.',
    duration: '1 визит · 30 мин',
    featured: true,
    before: 'assets/img/portfolio/botox-forehead-glabella/before.svg',
    after:  'assets/img/portfolio/botox-forehead-glabella/after.svg',
    details: {
      problem:   'Выраженные горизонтальные морщины лба, вертикальная складка между бровями, морщинки у глаз.',
      solution:  'Точечная коррекция мышц-депрессоров, индивидуальный расчёт единиц по типу мимики.',
      materials: 'Dysport / Botox / Xeomin (на выбор пациента)',
      result:    'Гладкая кожа, естественная подвижность лица сохранена. Эффект до 4–6 месяцев.'
    }
  },
  {
    slug: 'nasolabial-fillers',
    title: 'Коррекция носогубных складок',
    category: 'contour',
    categoryLabel: 'Лицо',
    summary: 'Объёмное моделирование средней трети лица — носогубки уходят без перегруза скул.',
    duration: '1 визит · 60 мин',
    featured: true,
    before: 'assets/img/portfolio/nasolabial-fillers/before.svg',
    after:  'assets/img/portfolio/nasolabial-fillers/after.svg',
    details: {
      problem:   'Глубокие носогубные складки, опущение средней трети лица, эффект «уставшего» взгляда.',
      solution:  'Векторный лифтинг скул + точечная коррекция носогубных борозд канюлей.',
      materials: 'Juvederm Voluma XC, Stylage XL',
      result:    'Лицо выглядит свежее и моложе, скулы приподняты, складки разглажены. Эффект 12–18 месяцев.'
    }
  },
  {
    slug: 'biorevitalization-face',
    title: 'Биоревитализация лица — сияние кожи',
    category: 'injection',
    categoryLabel: 'Биорева',
    summary: 'Восстановление гидробаланса кожи и стимуляция выработки коллагена курсом из 3 процедур.',
    duration: '3 визита · 1 раз в 3 недели',
    featured: true,
    before: 'assets/img/portfolio/biorevitalization-face/before.svg',
    after:  'assets/img/portfolio/biorevitalization-face/after.svg',
    details: {
      problem:   'Обезвоженная тусклая кожа, мелкие морщинки, тусклый цвет лица после зимы.',
      solution:  'Курс из 3 процедур биоревитализации с препаратом на основе нестабилизированной гиалуроновой кислоты.',
      materials: 'IAL System / Restylane Vital / Profhilo',
      result:    'Гладкая увлажнённая кожа, ровный тон, естественное сияние. Эффект 6–9 месяцев.'
    }
  },
  {
    slug: 'plasmolifting-prp',
    title: 'Плазмолифтинг (PRP-терапия) лица',
    category: 'injection',
    categoryLabel: 'PRP',
    summary: 'Стимуляция регенерации кожи собственной плазмой — естественное омоложение без чужеродных компонентов.',
    duration: '3 визита · 1 раз в 4 недели',
    featured: false,
    before: 'assets/img/portfolio/plasmolifting-prp/before.svg',
    after:  'assets/img/portfolio/plasmolifting-prp/after.svg',
    details: {
      problem:   'Снижение тургора кожи, расширенные поры, тусклый цвет лица.',
      solution:  'Забор крови, центрифугирование, введение плазмы микропапульной техникой по всему лицу.',
      materials: 'Plasmolifting Tubes (сертифицированные пробирки)',
      result:    'Подтянутая упругая кожа, поры сужены, выровненный микрорельеф. Эффект до 12 месяцев.'
    }
  },
  {
    slug: 'tca-peel-medium',
    title: 'Срединный пилинг TCA 25%',
    category: 'peels',
    categoryLabel: 'Пилинги',
    summary: 'Глубокое обновление кожи трихлоруксусной кислотой — против постакне, пигментации и мелких морщин.',
    duration: '1 визит · 60 мин + реабилитация 7 дней',
    featured: true,
    before: 'assets/img/portfolio/tca-peel-medium/before.svg',
    after:  'assets/img/portfolio/tca-peel-medium/after.svg',
    details: {
      problem:   'Постакне, неровный микрорельеф, гиперпигментация на щеках.',
      solution:  'Подготовка кожи 2 недели, TCA 25% в 2 слоя, постпилинговый уход с пептидами.',
      materials: 'Mediderma Mesopeel TCA, постпилинговая косметика SkinCeuticals',
      result:    'Ровный тон, гладкая поверхность, заметное сглаживание рубцов постакне.'
    }
  },
  {
    slug: 'laser-resurfacing-co2',
    title: 'Лазерное омоложение CO₂ фракционным лазером',
    category: 'hardware',
    categoryLabel: 'Лазер',
    summary: 'Глубокая шлифовка кожи фракционным CO₂ лазером — лифтинг, выравнивание рельефа, борьба с морщинами.',
    duration: '1 визит · 90 мин + реабилитация 10 дней',
    featured: true,
    before: 'assets/img/portfolio/laser-resurfacing-co2/before.svg',
    after:  'assets/img/portfolio/laser-resurfacing-co2/after.svg',
    details: {
      problem:   'Глубокие морщины щёк и периоральной зоны, потеря тургора, расширенные поры.',
      solution:  'Аппликационная анестезия, фракционная обработка всего лица, постпроцедурный уход.',
      materials: 'Lumenis AcuPulse CO₂',
      result:    'Подтянутая кожа, сглаженные морщины, эффект сравним с лифтингом. Финальный результат через 3 месяца.'
    }
  },
  {
    slug: 'hair-mesotherapy',
    title: 'Мезотерапия для волос против выпадения',
    category: 'injection',
    categoryLabel: 'Мезотерапия',
    summary: 'Курс инъекций пептидов и витаминов в кожу головы — остановка выпадения, рост новых волос.',
    duration: '6–8 визитов · 1 раз в неделю',
    featured: false,
    before: 'assets/img/portfolio/hair-mesotherapy/before.svg',
    after:  'assets/img/portfolio/hair-mesotherapy/after.svg',
    details: {
      problem:   'Диффузное выпадение волос, истончение, отсутствие подшёрстка.',
      solution:  'Курс из 8 процедур мезотерапии с препаратом DR.CYJ Hair Filler по протоколу.',
      materials: 'DR.CYJ Hair Filler, XLash Mesotech',
      result:    'Прекращение выпадения, появление новых волос в зонах поредения, утолщение волос.'
    }
  },
  {
    slug: 'vascular-laser-removal',
    title: 'Удаление сосудистых звёздочек лазером',
    category: 'hardware',
    categoryLabel: 'Лазер',
    summary: 'Точная неинвазивная коагуляция расширенных сосудов на лице за один сеанс.',
    duration: '1 визит · 30 мин',
    featured: false,
    before: 'assets/img/portfolio/vascular-laser-removal/before.svg',
    after:  'assets/img/portfolio/vascular-laser-removal/after.svg',
    details: {
      problem:   'Купероз на крыльях носа и щеках, телеангиэктазии, диффузная эритема.',
      solution:  'Селективная коагуляция Nd:YAG лазером с системой охлаждения кожи.',
      materials: 'Fotona Dynamis Pro (Nd:YAG)',
      result:    'Сосуды устранены сразу, заживление 3–5 дней, эффект стойкий.'
    }
  },
  {
    slug: 'thread-lift-face',
    title: 'Армирование лица мезонитями',
    category: 'threads',
    categoryLabel: 'Нити',
    summary: 'Безоперационный лифтинг овала лица рассасывающимися нитями с насечками.',
    duration: '1 визит · 60 мин',
    featured: false,
    before: 'assets/img/portfolio/thread-lift-face/before.svg',
    after:  'assets/img/portfolio/thread-lift-face/after.svg',
    details: {
      problem:   'Птоз овала лица, начальные «брыли», опущение уголков рта.',
      solution:  'Установка нитей APTOS с насечками для подтяжки тканей по векторам лифтинга.',
      materials: 'APTOS Excellence Visage',
      result:    'Чёткий овал лица, подтянутая нижняя треть. Эффект до 24 месяцев.'
    }
  },
  {
    slug: 'lipolytics-double-chin',
    title: 'Коррекция второго подбородка липолитиками',
    category: 'injection',
    categoryLabel: 'Липолитики',
    summary: 'Локальное удаление жирового пакета подбородочной области без операции.',
    duration: '3–4 визита · 1 раз в 3 недели',
    featured: false,
    before: 'assets/img/portfolio/lipolytics-double-chin/before.svg',
    after:  'assets/img/portfolio/lipolytics-double-chin/after.svg',
    details: {
      problem:   'Выраженный второй подбородок, нечёткий шейно-подбородочный угол.',
      solution:  'Курс из 4 инъекций липолитика с дезоксихолевой кислотой по сетке.',
      materials: 'Aqualyx / Belkyra',
      result:    'Подбородочная область уменьшена, чёткий профиль шеи. Эффект перманентный.'
    }
  },
  {
    slug: 'cheekbones-sculpting',
    title: 'Скульптурирование скул филлером',
    category: 'contour',
    categoryLabel: 'Скулы',
    summary: 'Создание выразительных скул и улучшение пропорций лица плотным филлером.',
    duration: '1 визит · 60 мин',
    featured: true,
    before: 'assets/img/portfolio/cheekbones-sculpting/before.svg',
    after:  'assets/img/portfolio/cheekbones-sculpting/after.svg',
    details: {
      problem:   'Плоские скулы, желание подчеркнуть овал лица.',
      solution:  'Расчёт точек по фронтальной и боковой проекции, введение филлера на надкостницу канюлей.',
      materials: 'Juvederm Voluma XC, Restylane Lyft',
      result:    'Выразительные скулы, скульптурный овал лица. Эффект 18–24 месяца.'
    }
  },
  {
    slug: 'smas-lifting-hifu',
    title: 'SMAS-лифтинг (HIFU / Альтера)',
    category: 'hardware',
    categoryLabel: 'SMAS',
    summary: 'Безоперационная подтяжка SMAS-слоя ультразвуком высокой интенсивности — лифтинг лица и шеи.',
    duration: '1 визит · 90 мин',
    featured: false,
    before: 'assets/img/portfolio/smas-lifting-hifu/before.svg',
    after:  'assets/img/portfolio/smas-lifting-hifu/after.svg',
    details: {
      problem:   'Гравитационный птоз тканей лица и шеи, нечёткий овал.',
      solution:  'Обработка нижней трети лица и шеи насадками 4.5 и 3.0 мм по протоколу.',
      materials: 'Ulthera System (оригинал)',
      result:    'Видимая подтяжка через 6–8 недель, эффект развивается до 6 месяцев. Длительность 12–18 месяцев.'
    }
  },
  {
    slug: 'acne-postacne-treatment',
    title: 'Комплексное лечение акне и постакне',
    category: 'skin',
    categoryLabel: 'Акне',
    summary: 'Курсовое лечение активного акне и рубцов постакне комбинацией пилингов и аппаратных методик.',
    duration: 'Курс 4–6 месяцев',
    featured: false,
    before: 'assets/img/portfolio/acne-postacne-treatment/before.svg',
    after:  'assets/img/portfolio/acne-postacne-treatment/after.svg',
    details: {
      problem:   'Папуло-пустулёзная форма акне средней степени, постакне, рубцы.',
      solution:  'Программа: салициловые пилинги, IPL, фракционный лазер, домашний уход.',
      materials: 'Mediderma, BBL Sciton, Lumenis ResurFX',
      result:    'Чистая кожа, ровный микрорельеф, отсутствие рецидивов при поддерживающем уходе.'
    }
  },
  {
    slug: 'hydrafacial-glow',
    title: 'HydraFacial — экспресс-сияние кожи',
    category: 'skin',
    categoryLabel: 'Уход',
    summary: 'Глубокая аппаратная чистка с гидрабразией, кислотами и сывороткой — мгновенный эффект свежести.',
    duration: '1 визит · 60 мин',
    featured: false,
    before: 'assets/img/portfolio/hydrafacial-glow/before.svg',
    after:  'assets/img/portfolio/hydrafacial-glow/after.svg',
    details: {
      problem:   'Тусклый цвет лица, чёрные точки, обезвоженность, неровный тон.',
      solution:  'Протокол HydraFacial MD: очищение, кислотный пилинг, экстракция, ввод сывороток.',
      materials: 'HydraFacial MD Elite, ампулы CTGF',
      result:    'Мгновенное сияние, гладкая увлажнённая кожа, ровный тон без реабилитации.'
    }
  },
  {
    slug: 'tear-trough-correction',
    title: 'Коррекция тёмных кругов под глазами',
    category: 'contour',
    categoryLabel: 'Глаза',
    summary: 'Заполнение слёзной борозды деликатным филлером — уходит «уставший» взгляд.',
    duration: '1 визит · 45 мин',
    featured: false,
    before: 'assets/img/portfolio/tear-trough-correction/before.svg',
    after:  'assets/img/portfolio/tear-trough-correction/after.svg',
    details: {
      problem:   'Выраженная слёзная борозда, тёмные круги, эффект «уставшего» взгляда.',
      solution:  'Введение филлера канюлей в надкостницу по технологии Tear Trough.',
      materials: 'Juvederm Volbella XC, Belotero Balance',
      result:    'Заполненная слёзная борозда, свежий отдохнувший взгляд. Эффект 9–12 месяцев.'
    }
  },
  {
    slug: 'microneedling-rf',
    title: 'RF-микронидлинг (Morpheus 8 / Vivace)',
    category: 'hardware',
    categoryLabel: 'RF',
    summary: 'Комбинированная процедура микронидлинга с радиочастотой — лифтинг, сужение пор, борьба с рубцами.',
    duration: '1 визит · 75 мин · реабилитация 3 дня',
    featured: false,
    before: 'assets/img/portfolio/microneedling-rf/before.svg',
    after:  'assets/img/portfolio/microneedling-rf/after.svg',
    details: {
      problem:   'Расширенные поры, потеря упругости кожи, рубцы постакне.',
      solution:  'Прокол кожи микроиглами + RF-энергия на глубину 1–3 мм по всему лицу.',
      materials: 'Morpheus 8 (InMode)',
      result:    'Подтянутая кожа, сужение пор, выровненный рельеф. Эффект развивается 2–3 месяца.'
    }
  }
];
