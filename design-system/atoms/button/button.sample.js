// design-system/atoms/button/button.sample.js
import { h } from '@dropins/tools/preact.js';
import { useState } from '@dropins/tools/preact-hooks.js';
import { provider as UI } from '@dropins/tools/components.js';
import htm from '../../../scripts/htm.js';
import { Button } from './button.js';

const html = htm.bind(h);

function ButtonSample() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAsync = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return html`
    <div class="ds-content">

      <div class="sec-eyebrow"><span class="sec-eyebrow-tag">Atom</span></div>
      <h1 class="sec-title">Button</h1>
      <p class="sec-desc">
        El átomo más reutilizado del sistema. Se crea una vez en
        <code class="inline">design-system/atoms/button/button.js</code>
        y lo usan 9 bloques distintos.
      </p>

      <div class="uses-atoms-bar mb-16">
        <span class="uses-label">Usa tokens</span>
        <span class="atom-pill ap-token">--color-brand-primary</span>
        <span class="atom-pill ap-token">--color-brand-primary-hover</span>
        <span class="atom-pill ap-token">--color-brand-secondary</span>
        <span class="atom-pill ap-token">--color-brand-accent</span>
        <span class="atom-pill ap-token">--color-feedback-info</span>
        <span class="atom-pill ap-token">--color-border</span>
        <span class="atom-pill ap-token">--color-muted</span>
        <span class="atom-pill ap-token">--color-surface-2</span>
        <span class="atom-pill ap-token">--color-text</span>
        <span class="atom-pill ap-token">--color-bg</span>
        <span class="atom-pill ap-token">--r-xl</span>
        <span class="atom-pill ap-token">--spacing-*</span>
        <span class="atom-pill ap-token">--font-semibold</span>
        <span class="atom-pill ap-token">--transition-200</span>
      </div>

      <div class="preview mb-16">
        <div class="preview-bar">
          <span class="preview-label">Interactivo</span>
          <span class="preview-file">button.js</span>
        </div>
        <div class="preview-body">
          <div class="preview-row">
            <${Button}
              label=${count === 0 ? 'Clickéame' : `Clicks: ${count}`}
              variant="primary"
              onClick=${() => setCount(count + 1)}
            />
            <${Button}
              label=${loading ? 'Procesando...' : 'Simular async'}
              variant="secondary"
              loading=${loading}
              onClick=${handleAsync}
            />
            <${Button} label="Reset" variant="ghost" onClick=${() => setCount(0)} />
          </div>
        </div>
      </div>

      <div class="preview mb-16">
        <div class="preview-bar">
          <span class="preview-label">Variants</span>
          <span class="preview-file">button.js</span>
        </div>
        <div class="preview-body">
          <div class="preview-row">
            <${Button} label="Primary" variant="primary" />
            <${Button} label="Secondary" variant="secondary" />
            <${Button} label="Ghost" variant="ghost" />
            <${Button} label="Danger" variant="danger" />
            <${Button} label="Accent" variant="accent" />
            <${Button} label="Info" variant="info" />
            <${Button} label="Link" variant="link" />
          </div>
        </div>
      </div>

      <div class="preview mb-16">
        <div class="preview-bar">
          <span class="preview-label">Sizes</span>
        </div>
        <div class="preview-body">
          <div class="preview-row" style="align-items:flex-end">
            <${Button} label="X-Small" size="xs" />
            <${Button} label="Small" size="sm" />
            <${Button} label="Medium" size="md" />
            <${Button} label="Large" size="lg" />
            <${Button} label="X-Large" size="xl" />
          </div>
        </div>
      </div>

      <div class="preview mb-16">
        <div class="preview-bar">
          <span class="preview-label">States</span>
        </div>
        <div class="preview-body">
          <div class="preview-row">
            <${Button} label="Default" variant="primary" />
            <${Button} label="Disabled" variant="primary" disabled=${true} />
            <${Button} label="Disabled" variant="secondary" disabled=${true} />
            <${Button} label="Disabled" variant="ghost" disabled=${true} />
            <${Button} label="Loading" variant="primary" loading=${true} />
            <${Button} label="Loading" variant="secondary" loading=${true} />
          </div>
        </div>
      </div>

      <div class="preview mb-16">
        <div class="preview-bar">
          <span class="preview-label">With icon</span>
        </div>
        <div class="preview-body">
          <div class="preview-row">
            <${Button} label="Icon Left" variant="primary" icon="arrow-right" iconPosition="left" />
            <${Button} label="Icon Right" variant="secondary" icon="arrow-right" iconPosition="right" />
            <${Button} label="Ghost Icon" variant="ghost" icon="arrow-right" iconPosition="left" />
          </div>
        </div>
      </div>

      <div class="preview mb-16">
        <div class="preview-bar">
          <span class="preview-label">As link</span>
        </div>
        <div class="preview-body">
          <div class="preview-row">
            <${Button} label="Ir al inicio" href="/" variant="primary" />
            <${Button} label="Abrir en nueva tab" href="https://adobe.com" variant="secondary" target="_blank" />
            <${Button} label="Ver docs" href="/docs" variant="link" />
          </div>
        </div>
      </div>

      <div class="ds-card mb-16">
        <div class="ds-card-title">Props API</div>
        <table class="props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${[
    ['label', 'string', '—', 'yes', 'Texto visible del botón'],
    ['href', 'string', 'null', 'no', 'Renderiza <a> cuando se provee'],
    ['size', "'xs'|'sm'|'md'|'lg'|'xl'", "'md'", 'no', 'Tamaño del botón'],
    ['target', "'_self'|'_blank'", "'_self'", 'no', 'Atributo target (solo con href)'],
    ['icon', 'string', 'null', 'no', 'Nombre del SVG en /icons/'],
    ['iconPosition', "'left'|'right'", "'left'", 'no', 'Posición del icono'],
    ['disabled', 'boolean', 'false', 'no', 'Estado deshabilitado'],
    ['loading', 'boolean', 'false', 'no', 'Muestra spinner'],
    ['onClick', 'function', 'null', 'no', 'Handler del click'],
  ].map(([prop, type, def, req, desc]) => html`
              <tr>
                <td><span class="prop-name">${prop}</span></td>
                <td><span class="prop-type">${type}</span></td>
                <td><span class="prop-default">${def}</span></td>
                <td><span class="prop-required ${req === 'yes' ? 'req-yes' : 'req-no'}">${req}</span></td>
                <td class="text-muted">${desc}</td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>

    </div>
  `;
}

export default async function render(container) {
  await UI.render(ButtonSample, {})(container);
}
