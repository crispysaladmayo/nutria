# Nutria

Meal prep, planner, grocery, and consumption tracking (Expo / React Native). This repository includes a **static web build** under [`docs/`](./docs/) for GitHub Pages.

### Git: which branch for the web app?

- **Production + GitHub Pages** use the **`main`** branch only (Pages: **`main`** + **`/docs`**).  
- **Day-to-day work:** create **`feature/…`** branches from `main` and merge via PR.  
- Full details: [`CONTRIBUTING.md`](./CONTRIBUTING.md).

**Important:** this folder (`crispysaladmayo/nutria`) is its **own** git repository. A parent “workspace” may have other branches; they do not apply here.

## Live site (GitHub Pages)

After enabling Pages (**Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/docs`), the app is available at:

**https://crispysaladmayo.github.io/nutria/**

The [`docs/.nojekyll`](./docs/.nojekyll) file ensures GitHub Pages does not strip the `_expo` asset folder.

### Troubleshooting

- **You only see this README as a webpage (no app UI):** Pages is almost certainly set to **`/(root)`** instead of **`/docs`**. Jekyll then turns `README.md` into the homepage. Fix the folder to **`/docs`**, wait a minute, and hard-refresh. A root [`index.html`](./index.html) also redirects to `docs/` if you must publish from the repo root (cleaner URL: use `/docs` as the source).
- **Blank page:** Ensure JavaScript is allowed for `github.io`, then check the browser console for blocked script errors.

## Develop (native or web dev server)

```bash
cd app
npm install
npm start
# Web: press w, or: npm run web
```

## Rebuild the published site (hi-fi web app for GitHub Pages)

The live UI matches **`nutria-web-platform/app/web`** (Indonesian 4-tab hi-fi), not the legacy Expo `app/`.

From `nutria-web-platform/`:

```bash
npm install
npm run export:gh-pages
```

This runs `npm run build -w @nutria/web` (Vite, `base: /nutria/`), copies `app/web/dist` into `../docs/`, and refreshes `docs/.nojekyll`. Push `main` with an updated `docs/` folder to publish.

**API on `github.io`:** the static app calls `/api/…` on the same host unless you set `VITE_API_BASE` (see `app/web/src/api/client.ts`). For a working login and data, host the Hono server somewhere and rebuild with e.g. `VITE_API_BASE=https://your-api.example.com` in a `.env.production` file before `export:gh-pages`, or use `npm run dev` locally with server + web.

**Legacy only:** Expo web export is still `cd app && npm run export:web` if you need the old 5-tab English bundle; do not use that for the product design.

## Repository layout

| Path | Purpose |
|------|---------|
| `app/` | Expo / React Native (legacy until migrated) |
| `nutria-web-platform/app/web` | **Hi-fi web** (Vite) — 4 tabs, Bahasa Indonesia; this is what `export:gh-pages` publishes to `docs/`. |
| `docs/` | Static build of the Vite app for GitHub Pages |
| `product/` | **Canonical product IA** — `SOURCE_OF_TRUTH.md` and `design-preview.html` (Hari ini · Rencana · Belanja · Prep). |

Open `product/design-preview.html` locally before UI work. Cursor loads `.cursor/rules/nutria-hifi-design.mdc` for `Nutria/**`.
