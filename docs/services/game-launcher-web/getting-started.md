# Getting started — game-launcher-web

## Prerequisites

- Node.js >= 18 (only for the dev server — there is no build/bundle step).

## Run locally

```sh
git clone git@github_xhevops:space-console/game-launcher-web.git
cd game-launcher-web
npm install      # installs the dev server only
npm run dev      # live-server on http://localhost:5173 (auto-reload)
# or: npm start  # static serve, no reload
```

Editing a file and refreshing the browser is the whole loop — no compile.

## Useful commands

| Command | Description |
| --- | --- |
| `npm run dev` | Live-reloading dev server on :5173. |
| `npm start` | Plain static serve on :5173 (no reload). |
| `npm run lint` | ESLint over `assets/js` and `scripts`. |
| `npm run build` | **CI-only** cache-bust stamp → `_dist/` (you rarely run this by hand). |

## Testing on a TV

The launcher is an installable fullscreen-landscape PWA (`manifest.json`). On a
TV browser, load the dev server's LAN URL; WASD/arrow keys emulate a remote for
desktop testing. See [Architecture](architecture.md) for the input model.
