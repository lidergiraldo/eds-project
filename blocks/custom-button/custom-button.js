// blocks/custom-button/custom-button.js
import { provider as UI } from '@dropins/tools/components.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { Button } from '../../design-system/atoms/button/button.js';

export default async function decorate(block) {
  const rows = [...block.children];

  // Cada fila corresponde a una prop en el modelo, en orden:
  const label = rows[0]?.querySelector('p')?.textContent?.trim() ?? 'Click me';
  const href = rows[1]?.querySelector('a')?.href ?? null;
  const variant = rows[2]?.querySelector('p')?.textContent?.trim() ?? 'primary';
  const size = rows[3]?.querySelector('p')?.textContent?.trim() ?? 'md';
  const target = rows[4]?.querySelector('p')?.textContent?.trim() ?? '_self';
  const icon = rows[5]?.querySelector('p')?.textContent?.trim() ?? null;
  const iconPosition = rows[6]?.querySelector('p')?.textContent?.trim() ?? 'left';

  // Mueve la instrumentación de AEM Author al bloque
  moveInstrumentation(block, block);

  block.innerHTML = '';
  await UI.render(Button, {
    label,
    href,
    variant,
    size,
    target,
    icon,
    iconPosition,
  })(block);
}
