// a file that will configure the vitest package.

import { defineConfig } from 'vitest/config';

export default defineConfig({
  // we're going to specify a test environment
  test: {
    environment: 'jsdom', // you can also make this happy-dom.
  },
});
// we need to make node.js understand how to parse
// js and html because we're going to be testing
// in the terminal.
