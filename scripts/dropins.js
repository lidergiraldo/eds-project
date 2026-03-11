/* eslint-disable */
import { cp, copyFile } from 'fs/promises';

await cp(
  './node_modules/@dropins/tools',
  './scripts/__dropins__/tools',
  { recursive: true }
);
console.log('@dropins/tools copiado');

await copyFile(
  './node_modules/htm/dist/htm.module.js',
  './scripts/htm.js'
);
console.log('htm.js copiado');