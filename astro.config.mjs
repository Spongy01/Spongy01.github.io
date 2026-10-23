// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://spongy01.github.io',
  integrations: [
    sitemap({
      // With build.format 'preserve' the plugin drops the real file endings.
      // Put them back so the sitemap lists the URLs pages are served at:
      // project pages are .html files, everything else is a folder index.
      serialize(item) {
        const url = new URL(item.url);
        if (url.pathname.startsWith('/projects/')) {
          if (!url.pathname.endsWith('.html')) url.pathname += '.html';
        } else if (!url.pathname.endsWith('/')) {
          url.pathname += '/';
        }
        item.url = url.href;
        return item;
      },
    }),
  ],
  build: {
    // Keep the old URLs: projects/conduit.html stays projects/conduit.html.
    format: 'preserve',
  },
  // Keep whitespace as written so inline spacing matches the hand-written site.
  compressHTML: false,
  markdown: {
    shikiConfig: {
      // Both themes are emitted as CSS variables; public/blog.css picks one
      // based on the site's light/dark setting.
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
});
