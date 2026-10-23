# Portfolio

Source for https://spongy01.github.io, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Develop

Needs Node 22.23.4 or newer.

```sh
npm install
npm run dev       # local dev server at http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
npm run check     # type-check .astro and .ts files
```

`npm run dev` and `npm run preview` run in the background. Stop them with `npx astro dev stop` or `npx astro preview stop`.

## Writing a post

Add a Markdown file to `src/content/blog/`. The file name becomes the URL: `my-post.md` is served at `/blog/my-post/`.

````md
---
title: "My post"
date: 2026-10-22
description: "One sentence for the post list, RSS feed and search results."
tags: ["llm", "infra"]   # optional
draft: true              # optional; defaults to false
---

Write in Markdown. Fenced code blocks with a language (```python) are highlighted.
````

- **Drafts** (`draft: true`) show up in `npm run dev` with a "Draft" label, but are left out of the build, the RSS feed and the sitemap. Set `draft: false` or remove the line to publish.
- **Posts are sorted** by `date`, newest first.
- **The frontmatter is checked** at build time. A missing `title` or a wrong type fails the build with an error naming the file and the field.
- The feed is at `/rss.xml` and the sitemap at `/sitemap-index.xml`. Both use `site` in `astro.config.mjs`.

## Files

- `src/pages/index.astro`: home page
- `src/pages/projects/[slug].astro`: project pages, one per entry in `src/data/projects.ts`
- `src/layouts/Base.astro`: shared `<head>`, header and page grid
- `src/components/Header.astro`: site nav and theme toggle
- `src/content/blog/`: blog posts (Markdown); schema in `src/content.config.ts`
- `src/pages/blog/`: the post list and the post page
- `src/pages/rss.xml.ts`: RSS feed
- `src/utils/posts.ts`: shared post helpers (draft filter, sorting, dates)
- `public/styles.css`: all styling, light and dark themes
- `public/blog.css`: extra styling for the blog pages
- `public/script.js`: theme toggle and the scroll reveal
- `public/assets/`: portrait and resume PDF

## Things to fill in

1. **Right rail note.** Edit the "Currently" paragraph in `src/pages/index.astro`. It is marked with an HTML comment.
2. **About paragraph.** Same file, just below the hero.

## Deploy

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site with `withastro/action` and publishes it with `actions/deploy-pages`. In the repository settings, Pages → Source must be set to **GitHub Actions**.
