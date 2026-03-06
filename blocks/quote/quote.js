import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [quoteWrapper, authorWrapper] = block.children;

  const blockquote = document.createElement('blockquote');
  const cite = document.createElement('cite');

  // Process quote - find the inner div with data-aue-prop="quote"
  if (quoteWrapper) {
    const quoteDiv = quoteWrapper.querySelector('div[data-aue-prop="quote"]');
    if (quoteDiv) {
      // Move all children to blockquote preserving HTML structure
      while (quoteDiv.firstChild) {
        blockquote.append(quoteDiv.firstChild);
      }
      // Move instrumentation from the div to blockquote
      moveInstrumentation(quoteDiv, blockquote);
    }
  }

  // Process author - find the element with data-aue-prop="author"
  if (authorWrapper) {
    const authorElement = authorWrapper.querySelector('[data-aue-prop="author"]');
    if (authorElement) {
      // Move all children to cite preserving HTML structure
      while (authorElement.firstChild) {
        cite.append(authorElement.firstChild);
      }
      // Move instrumentation from the element to cite
      moveInstrumentation(authorElement, cite);
    }
  }

  // Clear and rebuild the block
  block.textContent = '';
  block.append(blockquote);
  if (cite.hasChildNodes()) {
    block.append(cite);
  }
}
