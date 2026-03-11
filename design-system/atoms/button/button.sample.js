// design-system/atoms/button/button.sample.js
import { h } from '@dropins/tools/preact.js';
import { useState } from '@dropins/tools/preact-hooks.js';
import { provider as UI } from '@dropins/tools/components.js';
import htm from '../../../scripts/htm.js';
import { Button } from './button.js';

const html = htm.bind(h);

// ─── Sección wrapper ──────────────────────────────────────
function ButtonSection({ title, description, children }) {
  return html`
    <div class="ds-section">
      <h3 class="ds-section-title">${title}</h3>
      ${description && html`<p class="ds-section-desc">${description}</p>`}
      <div class="ds-preview">${children}</div>
    </div>
  `;
}

// ─── Página principal ─────────────────────────────────────
function ButtonSample() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAsync = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return html`
    <div class="ds-content">

      <div class="ds-page-eyebrow">
        <span class="ds-page-tag">Atom</span>
      </div>
      <h1 class="ds-page-title">Button</h1>
      <p class="ds-page-desc">
        Átomo base para todas las acciones del sistema. Soporta variantes,
        tamaños, iconos, estados de carga y renderiza como <code>&lt;a&gt;</code>
        cuando recibe <code>href</code>.
      </p>

      <!-- Interactivo -->
      <${ButtonSection}
        title="Interactivo"
        description="Prueba el estado y el onClick en acción."
      >
        <div class="ds-row" style="align-items:center;gap:1rem">
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
          <${Button}
            label="Reset"
            variant="ghost"
            onClick=${() => setCount(0)}
          />
        </div>
      <//>

      <!-- Variantes -->
      <${ButtonSection}
        title="Variantes"
        description="Cada variante comunica un nivel de énfasis diferente."
      >
        <div class="ds-row">
          <${Button} label="Primary"   variant="primary"   />
          <${Button} label="Secondary" variant="secondary" />
          <${Button} label="Ghost"     variant="ghost"     />
          <${Button} label="Danger"    variant="danger"    />
          <${Button} label="Accent"    variant="accent"    />
          <${Button} label="Info"      variant="info"      />
          <${Button} label="Link"      variant="link"      />
        </div>
      <//>

      <!-- Tamaños -->
      <${ButtonSection}
        title="Tamaños"
        description="Cinco tamaños disponibles para cada contexto de UI."
      >
        <div class="ds-row ds-row--align-center">
          <${Button} label="XSmall" size="xs" />
          <${Button} label="Small"  size="sm" />
          <${Button} label="Medium" size="md" />
          <${Button} label="Large"  size="lg" />
          <${Button} label="XLarge" size="xl" />
        </div>
      <//>

      <!-- Disabled -->
      <${ButtonSection}
        title="Estado Disabled"
        description="Todas las variantes soportan el estado deshabilitado."
      >
        <div class="ds-row">
          <${Button} label="Primary"   variant="primary"   disabled=${true} />
          <${Button} label="Secondary" variant="secondary" disabled=${true} />
          <${Button} label="Ghost"     variant="ghost"     disabled=${true} />
          <${Button} label="Danger"    variant="danger"    disabled=${true} />
        </div>
      <//>

      <!-- Loading -->
      <${ButtonSection}
        title="Estado Loading"
        description="Spinner integrado para operaciones asíncronas."
      >
        <div class="ds-row">
          <${Button} label="Guardando..."  variant="primary"   loading=${true} />
          <${Button} label="Procesando..." variant="secondary" loading=${true} />
          <${Button} label="Cargando..."   variant="ghost"     loading=${true} />
        </div>
      <//>

      <!-- Como enlace -->
      <${ButtonSection}
        title="Como enlace"
        description="Renderiza un <a> cuando recibe href."
      >
        <div class="ds-row">
          <${Button} label="Ir al inicio"       href="/"                 variant="primary"   />
          <${Button} label="Abrir en nueva tab" href="https://adobe.com" variant="secondary" target="_blank" />
          <${Button} label="Ver docs"           href="/docs"             variant="link"      />
        </div>
      <//>

      <!-- Con icono -->
      <${ButtonSection}
        title="Con icono"
        description="Icono a la izquierda o derecha del label."
      >
        <div class="ds-row">
          <${Button} label="Icon Left"  variant="primary"   icon="arrow-right" iconPosition="left"  />
          <${Button} label="Icon Right" variant="secondary" icon="arrow-right" iconPosition="right" />
          <${Button} label="Ghost Icon" variant="ghost"     icon="arrow-right" iconPosition="left"  />
        </div>
      <//>

      <!-- Props table -->
      <h2 class="ds-section-title" style="margin-top:3rem">Props</h2>
      <table class="ds-props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Tipo</th>
            <th>Default</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          ${[
            ['label', 'string', '—',       'Texto visible del botón'],
            ['href', 'string',                                                       'null',    'Renderiza <a> cuando se provee'],
            ['variant', 'primary | secondary | ghost | danger | accent | info | link', 'primary', 'Estilo visual'],
            ['size', 'xs | sm | md | lg | xl',                                      'md',      'Tamaño del botón'],
            ['target', '_self | _blank',                                              '_self',   'Atributo target (solo con href)'],
            ['icon', 'string',                                                       'null',    'Nombre del SVG en /icons/'],
            ['iconPosition', 'left | right',                                                'left',    'Posición del icono'],
            ['disabled', 'boolean',                                                      'false',   'Estado deshabilitado'],
            ['loading', 'boolean',                                                      'false',   'Muestra spinner'],
            ['onClick', 'function',                                                     'null',    'Handler del click'],
          ].map(([prop, type, def, desc]) => html`
            <tr>
              <td><code>${prop}</code></td>
              <td><code>${type}</code></td>
              <td><code>${def}</code></td>
              <td>${desc}</td>
            </tr>
          `)}
        </tbody>
      </table>

    </div>
  `;
}

// ─── Entry point ──────────────────────────────────────────
export default async function render(container) {
  await UI.render(ButtonSample, {})(container);
}
