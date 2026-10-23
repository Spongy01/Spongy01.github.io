// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://spongy01.github.io',
  build: {
    // Keep the old URLs: projects/conduit.html stays projects/conduit.html.
    format: 'preserve',
  },
  // Keep whitespace as written so inline spacing matches the hand-written site.
  compressHTML: false,
});
