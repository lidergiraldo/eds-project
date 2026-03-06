import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];
  const [quoteRow, authorRow] = rows;

  // ✅ Navegar hasta donde realmente están los data-aue-*
  const quoteInstrumented = quoteRow.querySelector('[data-aue-prop="quote"]');
  const authorInstrumented = authorRow.querySelector('[data-aue-prop="author"]');

  // --- QUOTE ---
  const blockquote = document.createElement('blockquote');
  blockquote.innerHTML = quoteInstrumented.innerHTML; // copia el <p> interno
  moveInstrumentation(quoteInstrumented, blockquote);

  // --- AUTHOR ---
  const cite = document.createElement('cite');
  cite.textContent = authorInstrumented?.textContent.trim() ?? '';
  moveInstrumentation(authorInstrumented, cite);

  // --- Estructura final ---
  const figure = document.createElement('figure');
  figure.appendChild(blockquote);
  figure.appendChild(cite);

  block.textContent = '';
  block.appendChild(figure);
}
