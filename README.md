# RedBlackNode — MERN studio site

Premium marketing site for **RedBlackNode** (Vite + React client, Express API). Contact submissions are stored in MongoDB and emailed via SMTP (Nodemailer) when configured.

## Structure

```
RedBackNode/
  client/          # Vite + React + Tailwind
  server/          # Express API
```

## Prerequisites

- Node.js 20+
- MongoDB (local or Atlas) — for contact storage in Phase 6

## Client

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). API calls to `/api/*` proxy to port `5000` (see `client/vite.config.js`).

## Server

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Health check: `GET http://localhost:5000/api/health`

## Environment

**Server** — copy `server/.env.example` to `server/.env`:

- `MONGODB_URI` — required for saving inquiries (local or Atlas).
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — optional; if omitted, submissions are still saved but email is skipped.
- `MAIL_FROM` — From address Nodemailer uses.
- `MAIL_TO` — defaults to `redblacknode@gmail.com` if unset.
- `CLIENT_ORIGIN` — e.g. `http://localhost:5173` in dev; set to your deployed site origin in production.

**Client** — optional `client/.env`:

- `VITE_API_URL` — set when the API is hosted on another domain (no trailing slash). Leave empty for local dev with the Vite proxy or same-origin deploys.

### Contact API

- `POST /api/contact` — JSON body: `{ name, email, message, phone?, website? }` (`website` is a honeypot; must be empty).
- Rate limit: 12 requests per 15 minutes per IP.

## Updating projects

Edit `client/src/data/projects.json` — categories, project entries, URLs, tech badges, and optional `image` paths (place assets under `client/public/projects/` or `src/assets` and reference accordingly in Phase 4).

## Phases

| Phase | Scope |
|-------|--------|
| 1 | Scaffold, Tailwind theme, navbar, footer |
| 2 | Hero 3D + GSAP |
| 3 | About, Services, Ticker, Why |
| 4 | Projects grid + filters |
| 5 | Careers |
| 6 | Contact + Mongo + email |
| 7 | SEO, a11y, perf chunks, deploy checklist |

## Contact data model

MongoDB collection `contacts` (via Mongoose): `name`, `phone`, `email`, `message`, timestamps.

## Phase 7 — production checklist

**Client**

- Build: `cd client && npm run build` — output in `client/dist/`.
- Replace `https://redblacknode.com` in `index.html` (`canonical`, `og:url`, `sitemap.xml`, `robots.txt`) with your real domain, or generate these at deploy time.
- Optional: add `public/og-image.png` (e.g. 1200×630) and set `<meta property="og:image" content="https://yourdomain.com/og-image.png" />`.
- If the API is on another host, set `VITE_API_URL` for the static build.

**Server**

- Set `NODE_ENV=production`, `CLIENT_ORIGIN` to your site URL, `MONGODB_URI`, and SMTP variables.
- Behind a reverse proxy, `trust proxy` is enabled in production for correct rate-limit IP behavior.

**Accessibility & UX (implemented)**

- Skip link to `#main-content`, focusable `<main>`, mobile menu locks body scroll, modal focuses Close, contact form `aria-busy` / live regions, nav `aria-current` for active section.

---

Built for production deployment with separated `client` and `server` builds.
