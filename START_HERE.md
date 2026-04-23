# Make Nutria work on the internet (for your wife — not your laptop)

You only do **two** things: (1) start the API, (2) connect the website to it.

---

## 1) Start the API (Render — one project: database + server)

**Option A — purple button (easiest)**  

Click: **[Deploy to Render](https://render.com/deploy?repo=https://github.com/crispysaladmayo/nutria)**

- Sign in with **GitHub** if asked.  
- Create the **Blueprint** (it reads `render.yaml` in this repo: Postgres + `nutria-api`).

**Option B**  

[render.com](https://render.com) → **New** → **Blueprint** → connect repository **`crispysaladmayo/nutria`**.

**Then**

1. Wait until the **database** and **nutria-api** are **green / Live** (a few minutes the first time).  
2. Open the **`nutria-api`** service → copy its **https URL** (example: `https://nutria-api-xxxxx.onrender.com`). **No** trailing slash.  
3. In a new tab, open: `https://YOUR-URL/health` → you should see `{"ok":true}`.  
4. Open: `https://YOUR-URL/health/db` → if it errors, wait 1 minute and try again (first boot runs DB migrations).

Keep that API URL for step 2.

> Render may ask for a payment method even on small/free tiers. That is normal. If you do not want Render, you must use another host; see `nutria-web-platform/DEPLOY.md` (same app, more manual).

---

## 2) Connect **GitHub Pages** to the API (one file — no new JavaScript build)

1. In GitHub open: **`crispysaladmayo/nutria`** → file **`docs/api-config.json`**.  
2. Click **Edit** (pencil) and set **exactly** (paste your API URL, **no** trailing slash):

```json
{ "apiBase": "https://nutria-api-xxxxx.onrender.com" }
```

3. **Commit to `main`**. Wait ~1 minute, then open: **https://crispysaladmayo.github.io/nutria/**

You should get **Login / Register** with a real backend. **Daftar** to create an account (e.g. for your wife).

**From your laptop (optional):** at repo root, `chmod +x scripts/set-pages-api.sh` then  
`./scripts/set-pages-api.sh 'https://YOUR-API.onrender.com'`  
→ commit and push the updated `docs/api-config.json` as the script suggests.

**Alternative (rebuilds the whole JS):** **Actions** → *Nutria — build GitHub Pages* → *Run workflow* and paste the API URL — use only if you need that flow.

---

## If something breaks

- **CORS / login** — `render.yaml` already sets CORS to `https://crispysaladmayo.github.io` and `SESSION_SAMESITE=None` for you. If you use a **fork** with a different GitHub Pages URL, you must add that exact `https://…` origin in the **nutria-api** service on Render (Environment) as `CORS_ORIGIN` (comma-separated list).  
- **Stuck on “Bentar ya…”** — **`docs/api-config.json`** is missing `apiBase` or has the wrong URL, or the API is not Live on Render.  
- **Build failed on GitHub** — make sure the workflow ran on the repo that has the latest `main` and that you typed the API URL with **https** and **no** trailing `/`.

For deeper detail: `nutria-web-platform/DEPLOY.md` and `README.md`.
