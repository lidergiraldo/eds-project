import { moveInstrumentation } from '../../scripts/scripts.js';
// o según tu proyecto:
// import { moveInstrumentation } from '../../scripts/aem.js';

export default function decorate(block) {
  // El bloque renderiza así en el DOM:
  // <div class="quote">          <- block (tiene data-aue-resource del bloque)
  //   <div>                      <- row 0: quote (richtext)
  //     <div><p>texto...</p></div>
  //   </div>
  //   <div>                      <- row 1: author (text)
  //     <div>Nombre autor</div>
  //   </div>
  // </div>

  const rows = [...block.children];
  const [quoteRow, authorRow] = rows;

  // --- 1. QUOTE ---
  const quoteCell = quoteRow?.querySelector('div') ?? quoteRow;
  const blockquote = document.createElement('blockquote');

  // Mover el contenido richtext (conserva los <p> internos)
  blockquote.innerHTML = quoteCell.innerHTML;

  // ✅ Transferir instrumentación del wrapper original al nuevo elemento
  moveInstrumentation(quoteRow, blockquote);

  // --- 2. AUTHOR ---
  const authorCell = authorRow?.querySelector('div') ?? authorRow;
  const cite = document.createElement('cite');
  cite.textContent = authorCell?.textContent.trim() ?? '';

  // ✅ Transferir instrumentación del wrapper original al nuevo elemento
  moveInstrumentation(authorRow, cite);

  // --- 3. Construir la nueva estructura ---
  const figure = document.createElement('figure');
  figure.appendChild(blockquote);
  figure.appendChild(cite);

  // ✅ Transferir instrumentación del bloque completo a la figura
  // (opcional, útil si reemplazas el bloque entero)
  // moveInstrumentation(block, figure);

  // Limpiar y reemplazar contenido del bloque
  block.textContent = '';
  block.appendChild(figure);
}
