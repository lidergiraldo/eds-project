/**
 * tokens/overview.sample.js
 * @param {HTMLElement} container
 */
export default function render(container) {
  container.innerHTML = `
    <div class="ds-content">
      <div class="ds-page-eyebrow">
        <span class="ds-page-tag">Design System</span>
      </div>
      <h1 class="ds-page-title">EDS Design System</h1>
      <p class="ds-page-desc">
        Referencia completa de todos los componentes del proyecto AEM EDS. Cada átomo se crea una sola vez y se reutiliza en todos los bloques. Powered by Atomic Design + Universal Editor + Tailwind v4.
      </p>

      <!-- aquí metes todo el contenido del overview -->
    </div>
  `;
}
