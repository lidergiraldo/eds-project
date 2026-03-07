import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [quoteWrapper] = block.children;

  const blockquote = document.createElement('blockquote');
  moveInstrumentation(quoteWrapper, blockquote);
  blockquote.innerHTML = quoteWrapper.innerHTML;

  quoteWrapper.replaceWith(blockquote);
}
