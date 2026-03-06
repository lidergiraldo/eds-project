import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];
  const [quoteRow, authorRow] = rows;

  // ✅ El div interno es quien tiene los atributos data-aue-*
  const quoteCell = quoteRow.querySelector(':scope > div');
  const authorCell = authorRow?.querySelector(':scope > div');

  // --- QUOTE ---
  const blockquote = document.createElement('blockquote');
  blockquote.innerHTML = quoteCell.innerHTML;

  // ✅ Mover desde el div interno (quoteCell) al blockquote
  moveInstrumentation(quoteCell, blockquote);

  // --- AUTHOR ---
  const cite = document.createElement('cite');
  cite.textContent = authorCell?.textContent.trim() ?? '';

  // ✅ Mover desde el div interno (authorCell) al cite
  moveInstrumentation(authorCell, cite);

  // --- Estructura final ---
  const figure = document.createElement('figure');
  figure.appendChild(blockquote);
  figure.appendChild(cite);

  block.textContent = '';
  block.appendChild(figure);
}
