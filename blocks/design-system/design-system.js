/**
 * design-system.js
 *
 * Bloque SPA del Design System.
 * - Maneja navegación sin recarga via history.pushState
 * - Importa dinámicamente los *.sample.js según la ruta
 * - El cascarón (sidebar + layout) se construye una sola vez
 *
 * Rutas → archivos:
 *   /design-system                  → tokens/overview.sample.js
 *   /design-system/tokens/colors    → tokens/colors.sample.js
 *   /design-system/atoms/button     → atoms/button.sample.js
 *   /design-system/molecules/card   → molecules/card.sample.js
 *   /design-system/blocks/hero      → blocks/hero.sample.js
 */

const BASE_PATH = '/design-system';

const NAV_ITEMS = [
  {
    section: 'Foundation',
    items: [
      { label: 'Overview', path: '' },
      { label: 'Color Tokens', path: '/tokens/colors' },
      { label: 'Typography', path: '/tokens/typography' },
      { label: 'Spacing', path: '/tokens/spacing' },
      { label: 'Border Radius', path: '/tokens/radius' },
      { label: 'Shadows', path: '/tokens/shadows' },
    ],
  },
  {
    section: 'Atoms',
    items: [
      { label: 'Button', path: '/atoms/button', badge: 'atom' },
      { label: 'Badge', path: '/atoms/badge', badge: 'atom' },
      { label: 'Tag', path: '/atoms/tag', badge: 'atom' },
      { label: 'Input', path: '/atoms/input', badge: 'atom' },
      { label: 'Avatar', path: '/atoms/avatar', badge: 'atom' },
      { label: 'Icon', path: '/atoms/icon', badge: 'atom' },
      { label: 'Divider', path: '/atoms/divider', badge: 'atom' },
      { label: 'Alert', path: '/atoms/alert', badge: 'atom' },
    ],
  },
  {
    section: 'Molecules',
    items: [
      { label: 'Card', path: '/molecules/card', badge: 'mol' },
      { label: 'Search Bar', path: '/molecules/search-bar', badge: 'mol' },
      { label: 'Nav Item', path: '/molecules/nav-item', badge: 'mol' },
      { label: 'Testimonial', path: '/molecules/testimonial', badge: 'mol' },
      { label: 'Form Field', path: '/molecules/form-field', badge: 'mol' },
    ],
  },
  {
    section: 'Blocks',
    items: [
      { label: 'Header', path: '/blocks/header', badge: 'block' },
      { label: 'Hero', path: '/blocks/hero', badge: 'block' },
      { label: 'Teaser', path: '/blocks/teaser', badge: 'block' },
      { label: 'Cards', path: '/blocks/cards', badge: 'block' },
      { label: 'Accordion', path: '/blocks/accordion', badge: 'block' },
      { label: 'Tabs', path: '/blocks/tabs', badge: 'block' },
      { label: 'Form', path: '/blocks/form', badge: 'block' },
      { label: 'CTA', path: '/blocks/cta', badge: 'block' },
      { label: 'Footer', path: '/blocks/footer', badge: 'block' },
    ],
  },
];

/* ─── Router ───────────────────────────────────────────────── */

function pathToModule(pathname) {
  const relative = pathname.replace(BASE_PATH, '') || '';
  if (!relative || relative === '/') return 'tokens/overview';
  return relative.replace(/^\//, '');
}

async function loadSection(contentArea, pathname) {
  const modulePath = pathToModule(pathname);
  contentArea.innerHTML = '<div class="ds-loading">Loading...</div>';

  try {
    const segment = modulePath.split('/').pop();
    const module = await import(`/design-system/${modulePath}/${segment}.sample.js`);
    contentArea.innerHTML = '';
    module.default(contentArea);
  } catch {
    const name = modulePath.split('/').pop();
    contentArea.innerHTML = `
      <div class="ds-content">
        <div class="ds-page-eyebrow">
          <span class="ds-page-tag">Coming Soon</span>
        </div>
        <h1 class="ds-page-title">${name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        <p class="ds-page-desc">Esta sección aún no tiene contenido de ejemplo.</p>
      </div>
    `;
  }
}

/* ─── Sidebar ──────────────────────────────────────────────── */

function buildSidebar() {
  const sidebar = document.createElement('aside');
  sidebar.className = 'ds-sidebar';
  sidebar.innerHTML = `
    <div class="ds-sidebar-logo">
      <div class="ds-sidebar-logo-row">
        <div class="ds-sidebar-mark">DS</div>
        <div>
          <div class="ds-sidebar-title">Design System</div>
          <div class="ds-sidebar-sub">AEM Edge Delivery Service</div>
        </div>
      </div>
      <div class="ds-sidebar-version">adobe/aem-boilerplate</div>
    </div>
  `;

  NAV_ITEMS.forEach(({ section, items }) => {
    const sectionEl = document.createElement('div');
    sectionEl.className = 'ds-nav-section';
    sectionEl.textContent = section;
    sidebar.appendChild(sectionEl);

    items.forEach(({ label, path, badge }) => {
      const a = document.createElement('a');
      a.className = 'ds-nav-item';
      a.href = `${BASE_PATH}${path}`;
      a.dataset.path = path;
      a.innerHTML = `
        <span class="ds-nav-dot"></span>
        ${label}
        ${badge ? `<span class="ds-nav-badge ${badge}">${badge}</span>` : ''}
      `;
      sidebar.appendChild(a);
    });
  });

  return sidebar;
}

function updateActiveNav(sidebar, pathname) {
  const currentPath = pathname.replace(BASE_PATH, '') || '';
  sidebar.querySelectorAll('.ds-nav-item').forEach((a) => {
    const isActive = currentPath === a.dataset.path
      || (a.dataset.path === '' && currentPath === '');
    a.classList.toggle('active', isActive);
  });
}

/* ─── Mobile ───────────────────────────────────────────────── */

function buildMobileBar(sidebar, overlay) {
  const bar = document.createElement('div');
  bar.className = 'ds-mobile-bar';
  bar.innerHTML = `
    <div class="ds-mobile-title">
      <div class="ds-sidebar-mark" style="width:26px;height:26px;font-size:11px">DS</div>
      Design System
    </div>
    <button class="ds-toggle-btn" aria-label="Toggle navigation">
      <span></span><span></span><span></span>
    </button>
  `;

  const toggle = () => {
    const isOpen = sidebar.classList.toggle('open');
    overlay.classList.toggle('open', isOpen);
  };

  bar.querySelector('.ds-toggle-btn').addEventListener('click', toggle);
  overlay.addEventListener('click', toggle);

  return bar;
}

/* ─── Decorate ─────────────────────────────────────────────── */

export default function decorate(block) {
  block.innerHTML = '';
  /* block.classList.add('design-system-wrapper'); */

  const overlay = document.createElement('div');
  overlay.className = 'ds-overlay';

  const sidebar = buildSidebar();
  const mobileBar = buildMobileBar(sidebar, overlay);

  const main = document.createElement('div');
  main.className = 'ds-main';

  const contentArea = document.createElement('div');
  contentArea.className = 'ds-content-area';
  main.appendChild(contentArea);

  block.appendChild(mobileBar);
  block.appendChild(overlay);
  block.appendChild(sidebar);
  block.appendChild(main);

  // Navegación SPA
  sidebar.addEventListener('click', (e) => {
    const link = e.target.closest('.ds-nav-item');
    if (!link) return;
    e.preventDefault();

    sidebar.classList.remove('open');
    overlay.classList.remove('open');

    const href = link.getAttribute('href');
    window.history.pushState({}, '', href);
    updateActiveNav(sidebar, href);
    loadSection(contentArea, href);
  });

  // Botón atrás/adelante
  window.addEventListener('popstate', () => {
    updateActiveNav(sidebar, window.location.pathname);
    loadSection(contentArea, window.location.pathname);
  });

  // Carga inicial
  updateActiveNav(sidebar, window.location.pathname);
  loadSection(contentArea, window.location.pathname);
}
