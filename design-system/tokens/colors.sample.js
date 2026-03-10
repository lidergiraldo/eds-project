/**
 * tokens/colors.sample.js
 * Página de Color Tokens del Design System.
 * @param {HTMLElement} container
 */

const COLOR_GROUPS = [
  {
    title: 'Brand & Accent',
    colors: [
      {
        name: 'Brand Primary',
        var: '--color-brand-primary',
      },
      {
        name: 'Brand Primary Hover',
        var: '--color-brand-primary-hover',
      },
      {
        name: 'Brand Secondary',
        var: '--color-brand-secondary',
      },
      {
        name: 'Brand Accent',
        var: '--color-brand-accent',
      },
    ],
  },
  {
    title: 'Feedback',
    colors: [
      {
        name: 'Warning',
        var: '--color-feedback-warn',
      },
      {
        name: 'Info',
        var: '--color-feedback-info',
      },
    ],
  },
  {
    title: 'Backgrounds & Surfaces',
    colors: [
      {
        name: 'Background',
        var: '--color-bg',
        border: true,
      },
      {
        name: 'Surface',
        var: '--color-surface',
        border: true,
      },
      {
        name: 'Surface 2',
        var: '--color-surface-2',
        border: true,
      },
      {
        name: 'Surface 3',
        var: '--color-surface-3',
        border: true,
      },
    ],
  },
  {
    title: 'Borders',
    colors: [
      {
        name: 'Border',
        var: '--color-border',
        border: true,
      },
      {
        name: 'Border 2',
        var: '--color-border-2',
        border: true,
      },
    ],
  },
  {
    title: 'Text',
    colors: [
      {
        name: 'Text',
        var: '--color-text',
      },
      {
        name: 'Muted',
        var: '--color-muted',
      },
      {
        name: 'Muted 2',
        var: '--color-muted-2',
      },
    ],
  },
];

function getTokenValue(cssVar) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(cssVar)
    .trim();
}

function buildSwatch({ name, var: cssVar, border }) {
  const hex = getTokenValue(cssVar);
  return `
    <div class="ds-color-swatch">
      <div class="ds-color-bar" style="background:${hex};${border ? 'border:1px solid var(--color-border-2)' : ''}"></div>
      <div class="ds-color-info">
        <div class="ds-color-name">${name}</div>
        <div class="ds-color-var">${cssVar}</div>
        <div class="ds-color-hex">${hex}</div>
      </div>
    </div>
  `;
}

function buildGroup({ title, colors }) {
  return `
    <div class="ds-color-group">
      <div class="ds-color-group-title">${title}</div>
      <div class="ds-color-grid">
        ${colors.map(buildSwatch).join('')}
      </div>
    </div>
  `;
}

export default function render(container) {
  container.innerHTML = `
    <style>
      .ds-color-group {
        margin-bottom: 32px;
      }
      .ds-color-group-title {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--color-muted);
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .ds-color-group-title::after {
        content: '';
        flex: 1;
        height: 1px;
        background: var(--color-border);
      }
      .ds-color-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 12px;
      }
      .ds-color-swatch {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.15s, border-color 0.15s;
      }
      .ds-color-swatch:hover {
        transform: translateY(-2px);
        border-color: var(--color-border-2);
      }
      .ds-color-bar {
        height: 72px;
      }
      .ds-color-info {
        padding: 10px 12px;
      }
      .ds-color-name {
        font-size: 12px;
        font-weight: 600;
        color: var(--color-text);
        margin-bottom: 2px;
      }
      .ds-color-var {
        font-size: 10px;
        color: var(--color-muted);
        font-family: var(--font-code);
        margin-bottom: 2px;
      }
      .ds-color-hex {
        font-size: 10px;
        color: var(--color-muted-2);
        font-family: var(--font-code);
      }
      .ds-color-copied {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--color-brand-primary);
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        padding: 8px 16px;
        border-radius: 9999px;
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;
        z-index: 999;
      }
      .ds-color-copied.show {
        opacity: 1;
      }
    </style>

    <div class="ds-content">
      <div class="ds-page-eyebrow">
        <span class="ds-page-tag">Foundation · Tokens</span>
      </div>
      <h1 class="ds-page-title">Color Tokens</h1>
      <p class="ds-page-desc">
        All the system color variables. Defined in tailwind.css and available throughout the project as var(--color-*) and as Tailwind utilities. Click on any swatch to copy the value.
      </p>
      ${COLOR_GROUPS.map(buildGroup).join('')}
    </div>

    <div class="ds-color-copied" id="ds-copied-toast">¡Copiado!</div>
  `;

  container.querySelectorAll('.ds-color-swatch').forEach((swatch) => {
    swatch.addEventListener('click', () => {
      const hex = swatch.querySelector('.ds-color-hex').textContent;
      navigator.clipboard.writeText(hex);

      const toast = container.querySelector('#ds-copied-toast');
      toast.textContent = `${hex} copiado`;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 1800);
    });
  });
}
