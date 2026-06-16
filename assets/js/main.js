/* ============================================================
   main.js — поведение сайта:
   - подстановка контактов из VB_CONFIG
   - header scroll-state
   - мобильное меню
   - FAB (мессенджеры)
   - before/after слайдер
   - lightbox для портфолио
   - рендер портфолио (карточки + фильтры)
   - reveal-on-scroll
   - counter-up
   - год в футере
   ============================================================ */
(function () {
  'use strict';

  const cfg = window.VB_CONFIG || {};
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* -------- Подстановка контактов -------- */
  function applyConfig() {
    $$('[data-cfg]').forEach(el => {
      const key = el.getAttribute('data-cfg');
      const value = getNested(cfg, key);
      if (value == null) return;
      if (el.tagName === 'A') {
        if (key === 'phone')        el.href = 'tel:' + (cfg.phoneClean || '');
        else if (key === 'whatsapp')el.href = cfg.whatsapp || '#';
        else if (key === 'telegram')el.href = cfg.telegram || '#';
        else if (key === 'instagram')el.href = cfg.instagram || '#';
        else if (key === 'vk')      el.href = cfg.vk || '#';
        else if (key === 'email')   el.href = 'mailto:' + value;
        if (!el.textContent.trim()) el.textContent = value;
      } else {
        el.textContent = value;
      }
    });

    $$('[data-href]').forEach(el => {
      const key = el.getAttribute('data-href');
      if (key === 'phone')      el.href = 'tel:' + (cfg.phoneClean || '');
      else if (key === 'whatsapp') el.href = cfg.whatsapp;
      else if (key === 'telegram') el.href = cfg.telegram;
      else if (key === 'instagram')el.href = cfg.instagram;
      else if (key === 'vk')       el.href = cfg.vk;
      else if (key === 'email')    el.href = 'mailto:' + cfg.email;
    });

    // Map iframe
    const map = $('#map-frame');
    if (map && cfg.mapEmbed) map.src = cfg.mapEmbed;
  }
  function getNested(obj, path) {
    return path.split('.').reduce((a, k) => (a == null ? a : a[k]), obj);
  }

  /* -------- Header scroll-state -------- */
  function setupHeader() {
    const h = $('.header');
    if (!h) return;
    const onScroll = () => h.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -------- Mobile menu -------- */
  function setupMobileMenu() {
    const burger = $('.burger');
    const menu = $('.mobile-menu');
    if (!burger || !menu) return;
    const toggle = (open) => {
      const isOpen = open ?? !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    };
    burger.addEventListener('click', () => toggle());
    $$('.mobile-menu a', menu).forEach(a => a.addEventListener('click', () => toggle(false)));
  }

  /* -------- FAB + нижняя панель (sticky CTA) -------- */
  function setupFab() {
    const fab = $('.fab');
    const cta = $('.sticky-cta');           // нижняя панель Позвонить/Telegram (моб.)
    if (fab) {
      const toggle = fab.querySelector('.fab__toggle');
      toggle?.addEventListener('click', () => fab.classList.toggle('is-open'));
      document.addEventListener('click', (e) => {
        if (!fab.contains(e.target)) fab.classList.remove('is-open');
      });
    }
    // Прячем плавающие кнопки у футера — чтобы не перекрывать «Сделано в FutureFlow»
    const footer = $('.footer');
    if (!footer) return;
    const footerBottom = $('.footer__bottom') || footer;
    const checkHide = () => {
      if (fab) {
        const r = footer.getBoundingClientRect();
        fab.classList.toggle('fab--hidden', r.top < window.innerHeight - 40);
      }
      if (cta) {
        const rb = footerBottom.getBoundingClientRect();
        cta.classList.toggle('sticky-cta--hidden', rb.top < window.innerHeight - 70);
      }
    };
    checkHide();
    window.addEventListener('scroll', checkHide, { passive: true });
    window.addEventListener('resize', checkHide);
  }

  /* -------- Before/After слайдер -------- */
  /* Pointer Events + распознавание жеста: вертикальный свайп листает
     страницу (touch-action: pan-y), горизонтальный — двигает слайдер.
     setPointerCapture гарантирует, что палец/курсор не «теряется».
     Флаг __baReady защищает от повторной инициализации одного и того же
     элемента (иначе слушатели дублируются и слайдер дёргается). */
  function setupBA(root = document) {
    $$('.ba', root).forEach(ba => {
      if (ba.__baReady) return;
      ba.__baReady = true;

      const wrap = ba.querySelector('.ba__after-wrap');
      const handle = ba.querySelector('.ba__handle');
      const img = wrap && wrap.querySelector('img');
      if (!wrap || !handle) return;

      const set = (pct) => {
        pct = Math.max(0, Math.min(100, pct));
        wrap.style.width = pct + '%';
        handle.style.left = pct + '%';
        if (img) img.style.width = (10000 / Math.max(pct, 0.5)) + '%';
      };
      const pctFromX = (clientX) => {
        const rect = ba.getBoundingClientRect();
        return rect.width ? ((clientX - rect.left) / rect.width) * 100 : 50;
      };

      let active = false, engaged = false, pid = null, sx = 0, sy = 0;

      ba.addEventListener('pointerdown', (e) => {
        active = true; engaged = false; pid = e.pointerId;
        sx = e.clientX; sy = e.clientY;
        // Мышь и клик прямо по ручке — двигаем сразу.
        if (e.pointerType === 'mouse' || e.target === handle) {
          engaged = true;
          try { ba.setPointerCapture(pid); } catch (_) {}
          ba.classList.add('is-dragging');
          set(pctFromX(e.clientX));
          if (e.cancelable) e.preventDefault();
        }
      });

      ba.addEventListener('pointermove', (e) => {
        if (!active || e.pointerId !== pid) return;
        if (!engaged) {
          const dx = Math.abs(e.clientX - sx), dy = Math.abs(e.clientY - sy);
          if (dx < 6 && dy < 6) return;        // слишком мелкое движение — ждём
          if (dy > dx) { active = false; return; } // вертикаль — отдаём странице на скролл
          engaged = true;
          try { ba.setPointerCapture(pid); } catch (_) {}
          ba.classList.add('is-dragging');
        }
        set(pctFromX(e.clientX));
        if (e.cancelable) e.preventDefault();
      });

      const stop = (e) => {
        if (e.pointerId !== pid && pid !== null) return;
        active = false; engaged = false;
        ba.classList.remove('is-dragging');
        try { ba.releasePointerCapture(pid); } catch (_) {}
        pid = null;
      };
      ba.addEventListener('pointerup', stop);
      ba.addEventListener('pointercancel', stop);

      set(50);
    });
  }

  /* -------- Lightbox -------- */
  function setupLightbox() {
    const lb = $('#lightbox');
    if (!lb) return;
    const body = lb.querySelector('.lightbox__body');
    const open = (html) => {
      body.innerHTML = html;
      lb.classList.add('is-open');
      document.body.classList.add('no-scroll');
      setupBA(body);
      // Close button (re-find inside new content)
      const closeBtn = body.querySelector('[data-close]');
      if (closeBtn) closeBtn.addEventListener('click', close);
    };
    const close = () => {
      lb.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    };
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

    document.addEventListener('click', (e) => {
      // Клик внутри слайдера .ba НИКОГДА не открывает лайтбокс —
      // зона слайдера предназначена только для листания "до/после".
      // Чтобы открыть кейс — нужно кликнуть на тело карточки
      // (заголовок, описание или ссылку "Подробнее").
      if (e.target.closest('.ba')) return;
      const btn = e.target.closest('[data-case]');
      if (!btn) return;
      e.preventDefault();
      const slug = btn.getAttribute('data-case');
      const item = (window.VB_PORTFOLIO || []).find(x => x.slug === slug);
      if (!item) return;
      open(renderLightboxContent(item));
    });
  }

  function renderLightboxContent(item) {
    const d = item.details || {};
    return `
      <button class="lightbox__close" data-close aria-label="Закрыть">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="lightbox__media">
        <figure>
          <figcaption>До</figcaption>
          <img src="${esc(item.before)}" alt="${esc(item.title)} — до" loading="lazy">
        </figure>
        <figure>
          <figcaption class="after">После</figcaption>
          <img src="${esc(item.after)}" alt="${esc(item.title)} — после" loading="lazy">
        </figure>
      </div>
      <div class="lightbox__content">
        <span class="lightbox__tag">${esc(item.categoryLabel || '')}</span>
        <h3 class="lightbox__title">${esc(item.title)}</h3>
        <p class="lightbox__summary">${esc(item.summary || '')}</p>
        <dl class="lightbox__details">
          ${d.problem   ? `<div><dt>Проблема</dt><dd>${esc(d.problem)}</dd></div>` : ''}
          ${d.solution  ? `<div><dt>Решение</dt><dd>${esc(d.solution)}</dd></div>` : ''}
          ${d.materials ? `<div><dt>Препараты / оборудование</dt><dd>${esc(d.materials)}</dd></div>` : ''}
          ${d.result    ? `<div><dt>Результат</dt><dd>${esc(d.result)}</dd></div>` : ''}
          ${item.duration ? `<div><dt>Длительность</dt><dd>${esc(item.duration)}</dd></div>` : ''}
        </dl>
        <div class="lightbox__cta">
          <a class="btn btn--primary" data-href="phone">
            <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Записаться на консультацию
          </a>
          <a class="btn btn--ghost" data-href="telegram" target="_blank" rel="noopener">
            <svg class="btn__icon" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
            Написать в Telegram
          </a>
        </div>
      </div>
    `;
  }

  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }

  /* -------- Рендер портфолио -------- */
  function renderPortfolio() {
    const grid = $('#portfolio-grid');
    if (!grid) return;
    const items = window.VB_PORTFOLIO || [];
    const featuredOnly = grid.hasAttribute('data-featured');
    const list = featuredOnly ? items.filter(x => x.featured).slice(0, 6) : items.slice();
    grid.innerHTML = list.map(caseCardHTML).join('');
    setupBA(grid);

    // фильтры
    const filters = $('#portfolio-filters');
    if (filters) {
      filters.addEventListener('click', (e) => {
        const chip = e.target.closest('.filter-chip');
        if (!chip) return;
        $$('.filter-chip', filters).forEach(c => c.classList.toggle('is-active', c === chip));
        const cat = chip.getAttribute('data-filter');
        const filtered = cat === 'all' ? items : items.filter(x => x.category === cat);
        grid.innerHTML = filtered.map(caseCardHTML).join('');
        setupBA(grid);
        observeReveals(grid);
      });
    }
  }

  function caseCardHTML(item) {
    // data-case на самом <article> — клик в любом месте карточки откроет
    // лайтбокс (drag по слайдеру корректно отфильтрован).
    return `
      <article class="case-card reveal" data-case="${esc(item.slug)}" role="button" tabindex="0" aria-label="${esc(item.title)} — открыть подробности">
        <div class="ba" role="img" aria-label="${esc(item.title)} — до и после">
          <img class="ba__img" src="${esc(item.before)}" alt="" loading="lazy">
          <div class="ba__after-wrap">
            <img src="${esc(item.after)}" alt="" loading="lazy">
          </div>
          <div class="ba__handle"></div>
          <span class="ba__label ba__label--before">До</span>
          <span class="ba__label ba__label--after">После</span>
        </div>
        <div class="case-card__body">
          <span class="case-card__tag">${esc(item.categoryLabel || '')}</span>
          <h3 class="case-card__title">${esc(item.title)}</h3>
          <p class="case-card__text">${esc(item.summary || '')}</p>
          <div class="case-card__meta">
            <span>${esc(item.duration || '')}</span>
            <span class="case-card__more" aria-hidden="true">
              Подробнее
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
        </div>
      </article>
    `;
  }

  /* Enter/Space на сфокусированной карточке — тоже открывает лайтбокс */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('[data-case]');
    if (!card) return;
    e.preventDefault();
    card.click();
  });

  /* Reveal-on-scroll отключён: контент сразу видим, чтобы избежать прыжков
     и мерцания. Функция оставлена заглушкой, на случай если потом вернём. */
  function observeReveals() { /* no-op */ }

  /* -------- Счётчики trust-strip — count-up при появлении в viewport -------- */
  function setupCounters() {
    const counters = $$('[data-counter]');
    if (!counters.length) return;
    const fmt = (n) => Math.round(n).toLocaleString('ru-RU');
    const animate = (el) => {
      const target = parseFloat(el.getAttribute('data-counter')) || 0;
      const duration = 1400;
      const startTs = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - startTs) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(target * eased);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) {
      counters.forEach(c => { c.textContent = fmt(parseFloat(c.getAttribute('data-counter')) || 0); });
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        animate(e.target);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.45 });
    counters.forEach(c => obs.observe(c));
  }

  /* -------- Отзывы: карусель только на стрелках (без свайпа) -------- */
  function setupReviews() {
    const wrap = $('.reviews-wrap');
    if (!wrap) return;
    const track = wrap.querySelector('.reviews');
    const prev  = wrap.querySelector('.reviews-arrow--prev');
    const next  = wrap.querySelector('.reviews-arrow--next');
    if (!track || !prev || !next) return;

    let index = 0;

    const stepPx = () => {
      const first = track.firstElementChild;
      if (!first) return 0;
      const gap = parseFloat(getComputedStyle(track).gap || '22');
      return first.getBoundingClientRect().width + gap;
    };

    const maxIndex = () => {
      const visible = Math.max(1, Math.round(wrap.clientWidth / stepPx()));
      return Math.max(0, track.children.length - visible);
    };

    const update = () => {
      const max = maxIndex();
      if (index > max) index = max;
      if (index < 0) index = 0;
      track.style.transform = `translateX(-${index * stepPx()}px)`;
      prev.toggleAttribute('disabled', index <= 0);
      next.toggleAttribute('disabled', index >= max);
    };

    prev.addEventListener('click', () => { index--; update(); });
    next.addEventListener('click', () => { index++; update(); });
    window.addEventListener('resize', update);
    update();
  }

  /* -------- Год в футере -------- */
  function setupYear() {
    $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  }

  /* -------- Аккордеон услуг + быстрый переход -------- */
  function setupAccordion() {
    const items = $$('.acc-item');
    if (!items.length) return;

    const chips = $$('.svc-jump__chip');
    const chipById = {};
    chips.forEach(c => { chipById[decodeURIComponent((c.getAttribute('href') || '').slice(1))] = c; });

    // Подсвечиваем чипы только тех услуг, которые сейчас раскрыты.
    const syncChips = () => {
      items.forEach(item => {
        const chip = chipById[item.id];
        if (chip) chip.classList.toggle('is-active', item.classList.contains('is-open'));
      });
    };

    const setOpen = (item, open) => {
      item.classList.toggle('is-open', open);
      item.querySelector('.acc-head')?.setAttribute('aria-expanded', String(open));
      syncChips();
    };

    // Высота «липких» элементов сверху (шапка + панель быстрого перехода),
    // измеряется в момент прокрутки — чтобы заголовок раздела не уходил под них.
    const stickyOffset = () => {
      const header = document.querySelector('.header');
      const bar = document.querySelector('.svc-jump');
      const hH = (header && getComputedStyle(header).position === 'sticky') ? header.offsetHeight : 0;
      const bH = bar ? bar.offsetHeight : 0;
      return hH + bH + 14;
    };
    const scrollToItem = (item) => {
      requestAnimationFrame(() => {
        const y = item.getBoundingClientRect().top + window.scrollY - stickyOffset();
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      });
    };

    // Клик по заголовку — раскрыть/свернуть раздел.
    items.forEach(item => {
      const head = item.querySelector('.acc-head');
      if (!head) return;
      head.addEventListener('click', () => setOpen(item, !item.classList.contains('is-open')));
    });

    // Клик по чипу — переключатель: если закрыт → открыть и прокрутить;
    // если уже открыт → свернуть (повторный клик).
    chips.forEach(c => {
      c.addEventListener('click', (e) => {
        const id = decodeURIComponent((c.getAttribute('href') || '').slice(1));
        const item = document.getElementById(id);
        if (!item) return;
        e.preventDefault();
        const willOpen = !item.classList.contains('is-open');
        setOpen(item, willOpen);
        if (willOpen) {
          if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
          scrollToItem(item);
        } else if (location.hash === '#' + id) {
          history.replaceState(null, '', location.pathname + location.search);
        }
      });
    });

    // Открыть нужную услугу по якорю (#fillers, #botox …) — в т.ч. при переходе
    // со страницы «Главная».
    const openFromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const item = id && document.getElementById(id);
      if (item && item.classList.contains('acc-item')) {
        setOpen(item, true);
        scrollToItem(item);
      }
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);

    syncChips();
  }

  /* -------- Active nav link -------- */
  function setupActiveNav() {
    const path = location.pathname.split('/').pop() || 'index.html';
    $$('.nav__link, .mobile-menu__link').forEach(a => {
      const href = (a.getAttribute('href') || '').split('/').pop();
      if (href === path) a.classList.add('is-active');
    });
  }

  /* -------- INIT -------- */
  document.addEventListener('DOMContentLoaded', () => {
    applyConfig();
    setupHeader();
    setupMobileMenu();
    setupFab();
    renderPortfolio();
    setupLightbox();
    setupBA();
    setupCounters();
    setupYear();
    setupActiveNav();
    setupReviews();
    setupAccordion();
    observeReveals();
  });

  /* Утилита для скриншот-тестов: window.__revealAll() показывает всё мгновенно. */
  window.__revealAll = () => {
    $$('.reveal:not(.is-in)').forEach(el => {
      el.style.transition = 'none';
      el.classList.add('is-in');
    });
    $$('[data-counter]').forEach(c => {
      const n = parseFloat(c.getAttribute('data-counter')) || 0;
      c.textContent = Math.round(n).toLocaleString('ru-RU');
    });
  };
})();
