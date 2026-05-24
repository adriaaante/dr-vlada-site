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

  /* -------- FAB -------- */
  function setupFab() {
    const fab = $('.fab');
    if (!fab) return;
    const toggle = fab.querySelector('.fab__toggle');
    toggle.addEventListener('click', () => fab.classList.toggle('is-open'));
    document.addEventListener('click', (e) => {
      if (!fab.contains(e.target)) fab.classList.remove('is-open');
    });
  }

  /* -------- Before/After слайдер -------- */
  function setupBA(root = document) {
    $$('.ba', root).forEach(ba => {
      const wrap = ba.querySelector('.ba__after-wrap');
      const handle = ba.querySelector('.ba__handle');
      const img = wrap && wrap.querySelector('img');
      if (!wrap || !handle) return;

      const set = (pct) => {
        pct = Math.max(0, Math.min(100, pct));
        wrap.style.width = pct + '%';
        handle.style.left = pct + '%';
        if (img) img.style.width = (10000 / pct) + '%';
      };

      const onMove = (clientX) => {
        const rect = ba.getBoundingClientRect();
        const pct = ((clientX - rect.left) / rect.width) * 100;
        set(pct);
      };

      let dragging = false;
      const start = (e) => { dragging = true; ba.style.cursor = 'grabbing'; e.preventDefault(); };
      const move  = (e) => {
        if (!dragging) return;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        onMove(x);
      };
      const end   = () => { dragging = false; ba.style.cursor = ''; };

      ba.addEventListener('mousedown',  start);
      ba.addEventListener('touchstart', start, { passive: false });
      window.addEventListener('mousemove',  move);
      window.addEventListener('touchmove',  move, { passive: true });
      window.addEventListener('mouseup',   end);
      window.addEventListener('touchend',  end);

      // Клик по картинке — переместить слайдер
      ba.addEventListener('click', (e) => {
        if (e.target.closest('a, button')) return;
        onMove(e.clientX);
      });

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
    return `
      <article class="case-card reveal">
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
            <a href="#" class="case-card__more" data-case="${esc(item.slug)}">
              Подробнее
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </div>
      </article>
    `;
  }

  /* -------- Reveal-on-scroll -------- */
  let revealObserver;
  function observeReveals(root = document) {
    if (!('IntersectionObserver' in window)) {
      $$('.reveal', root).forEach(el => el.classList.add('is-in'));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            revealObserver.unobserve(e.target);
          }
        });
      }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });
    }
    const vh = window.innerHeight || 800;
    $$('.reveal', root).forEach(el => {
      if (el.classList.contains('is-in')) return;
      // Элементы выше "1.5 экрана" от верха страницы показываем сразу
      // (без ожидания скролла) — иначе при загрузке выше-фолд контент
      // мелькает невидимым, и фуллпейдж-скрин рендерится пустым.
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 1.5) {
        el.classList.add('is-in');
      } else {
        revealObserver.observe(el);
      }
    });
  }

  /* -------- Counter-up -------- */
  function setupCounters() {
    const counters = $$('[data-counter]');
    if (!counters.length || !('IntersectionObserver' in window)) {
      counters.forEach(c => { c.textContent = c.getAttribute('data-counter'); });
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        animateCounter(e.target);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    counters.forEach(c => obs.observe(c));
  }
  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-counter')) || 0;
    const duration = 1400;
    const startTs = performance.now();
    const fmt = (n) => Math.round(n).toLocaleString('ru-RU');
    function step(now) {
      const t = Math.min(1, (now - startTs) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt(target * eased);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* -------- Год в футере -------- */
  function setupYear() {
    $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
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
    observeReveals();

    // Страховка: если через 1.5 с после загрузки какие-то .reveal так и не
    // оказались видны (например, пользователь не скроллил или браузер
    // не сработал с IntersectionObserver) — показываем их безусловно.
    window.addEventListener('load', () => {
      setTimeout(() => {
        $$('.reveal:not(.is-in)').forEach(el => el.classList.add('is-in'));
      }, 1500);
    });
  });

  /* Утилита для скриншот-тестов: window.__revealAll() показывает всё. */
  window.__revealAll = () => $$('.reveal:not(.is-in)').forEach(el => el.classList.add('is-in'));
})();
