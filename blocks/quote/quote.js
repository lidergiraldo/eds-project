import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [quoteWrapper, authorWrapper] = block.children;

  const blockquote = document.createElement('blockquote');
  const cite = document.createElement('cite');

  // Move quote content preserving instrumentation
  if (quoteWrapper) {
    const quoteDiv = quoteWrapper.querySelector('div');
    if (quoteDiv) {
      // Move all children from the div to blockquote
      while (quoteDiv.firstChild) {
        blockquote.append(quoteDiv.firstChild);
      }
      moveInstrumentation(quoteDiv, blockquote);
    }
  }

  // Move author content preserving instrumentation
  if (authorWrapper) {
    const authorDiv = authorWrapper.querySelector('div');
    if (authorDiv) {
      cite.textContent = authorDiv.textContent.trim();
      moveInstrumentation(authorDiv, cite);
    }
  }

  // Clear and rebuild the block
  block.textContent = '';
  block.append(blockquote);
  if (cite.textContent) {
    block.append(cite);
  }
}
