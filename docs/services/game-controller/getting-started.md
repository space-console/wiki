# Getting started — game-controller

## Prerequisites

- Node.js >= 18 (dev server only — no build/bundle step).

## Run locally

```sh
git clone git@github_xhevops:space-console/game-controller.git
cd game-controller
npm install      # installs the dev server only
npm run dev      # live-server on http://localhost:5174 (auto-reload)
```

It runs on **:5174** so it can sit alongside the launcher (`:5173`) during local
testing.

## Useful commands

| Command | Description |
| --- | --- |
| `npm run dev` | Live-reloading dev server on :5174. |
| `npm start` | Plain static serve on :5174 (no reload). |
| `npm run lint` | ESLint over `assets/js` and `scripts`. |
| `npm run build` | **CI-only** cache-bust stamp → `_dist/`. |

## Try it

Open the page, type any 4-character code, and tap **Connect** — the control pad
appears (the handshake is stubbed, so any code "connects"). Direction and action
buttons log the intent they would send. Wiring a real transport happens in
`assets/js/session.js`; see [Architecture](architecture.md).
