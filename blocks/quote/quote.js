import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  console.log('decorate quote', block);
  const isAuthorEnv = window.xwalk?.isAuthorEnv;
  console.log('isAuthorEnv', isAuthorEnv);
}
