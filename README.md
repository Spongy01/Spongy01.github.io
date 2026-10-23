# Portfolio

Source for https://spongy01.github.io, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Develop

Needs Node 22.23.4 or newer.

```sh
npm install
npm run dev       # local dev server at http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
```

## Files

- `src/pages/index.astro`: home page
- `src/pages/projects/[slug].astro`: project pages, one per entry in `src/data/projects.ts`
- `src/layouts/Base.astro`: shared `<head>`, header and page grid
- `src/components/Header.astro`: site nav and theme toggle
- `public/styles.css`: all styling, light and dark themes
- `public/script.js`: theme toggle and the scroll reveal
- `public/assets/`: portrait and resume PDF

## Things to fill in

1. **Right rail note.** Edit the "Currently" paragraph in `src/pages/index.astro`. It is marked with an HTML comment.
2. **About paragraph.** Same file, just below the hero.

## Deploy

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site with `withastro/action` and publishes it with `actions/deploy-pages`. In the repository settings, Pages → Source must be set to **GitHub Actions**.
