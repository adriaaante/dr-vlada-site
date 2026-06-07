/* ============================================================
   КОНФИГ КОНТАКТОВ И БРЕНДА — единственный источник правды.
   Чтобы поменять телефон, мессенджер, адрес или соцсеть —
   правьте этот файл. Все CTA-кнопки, футер и шапка обновятся
   автоматически.

   Плейсхолдеры помечены как XXXXXXXXXX — замените на реальные
   значения перед публикацией.
   ============================================================ */
window.VB_CONFIG = {
  doctor: {
    name:        'Влада Боброва',
    nameShort:   'Влада Боброва',
    title:       'Врач-косметолог',
    titleLong:   'Врач-косметолог · эстетическая медицина',
    initials:    'ВБ'
  },

  // Телефон в человекочитаемом виде — для отображения
  phone:         '+7 (XXX) XXX-XX-XX',
  // Телефон без форматирования — для tel: и wa.me ссылок
  phoneClean:    '+7XXXXXXXXXX',

  // Мессенджеры (deeplinks)
  whatsapp:      'https://wa.me/7XXXXXXXXXX?text=Здравствуйте,%20Влада!%20Хочу%20записаться%20на%20консультацию.',
  telegram:      'https://t.me/USERNAME',
  instagram:     'https://instagram.com/dr.bobrova_',
  vk:            'https://vk.com/doctorbobrova',

  // Адрес и режим работы
  address:       'г. Чебоксары, ул. Адрес, д. XX',
  addressShort:  'г. Чебоксары',
  hours:         'Пн–Сб 10:00–20:00',
  hoursShort:    '10:00–20:00',

  // Карта (Яндекс embed) — Чебоксары. Для конкретной точки откройте
  // yandex.ru/maps → нужный адрес → «Поделиться» → «Скопировать ссылку»
  // и подставьте сюда (формат /map-widget/v1/?ll=lng,lat&z=zoom).
  mapEmbed:      'https://yandex.ru/map-widget/v1/?ll=47.249714%2C56.132431&z=13',

  // Email (опционально)
  email:         'hello@vladbobrov.ru',

  // Цены (стартовые, "от ..."). Источник — прайс из Taplink.
  prices: {
    consultation:   '800',
    lips:           '7 000',
    fillers:        '9 000',
    tearTrough:     '14 000',
    bioreva:        '6 000',
    mesotherapy:    '3 000',
    botox:          '300',
    blanching:      '13 000',
    lipolytics:     '2 500',
    cleaning:       '3 500',
    peels:          '2 900',
    care:           '2 900'
  }
};
