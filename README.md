# Nutria

Meal prep, planner, grocery, and consumption tracking (Expo / React Native). This repository includes a **static web build** under [`docs/`](./docs/) for GitHub Pages.

## Live site (GitHub Pages)

After enabling Pages (**Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/docs`), the app is available at:

**https://crispysaladmayo.github.io/nutria/**

The [`docs/.nojekyll`](./docs/.nojekyll) file ensures GitHub Pages does not strip the `_expo` asset folder.

## Develop (native or web dev server)

```bash
cd app
npm install
npm start
# Web: press w, or: npm run web
```

## Rebuild the published web bundle

From `app/`:

```bash
npm run export:web
```

This runs `expo export --platform web`, copies output into `docs/`, and refreshes `.nojekyll`.

## Repository layout

| Path | Purpose |
|------|---------|
| `app/` | Expo app source |
| `docs/` | Static web export served by GitHub Pages |
