# Getting started — tetris

## Prerequisites

- Node.js >= 18 (dev server only — no build/bundle step).

## Run locally

```sh
git clone git@github_xhevops:space-console/tetris.git
cd tetris
npm install      # installs the dev server only
npm run dev      # live-server on http://localhost:5175 (auto-reload)
```

It runs on **:5175** so it can sit alongside the launcher (`:5173`) and the
controller (`:5174`) during local testing.

## Useful commands

| Command | Description |
| --- | --- |
| `npm run dev` | Live-reloading dev server on :5175. |
| `npm start` | Plain static serve on :5175 (no reload). |
| `npm run lint` | ESLint over `assets/js` and `scripts`. |
| `npm run build` | **CI-only** cache-bust stamp → `_dist/`. |

## Controls

Everything routes through the shared intent layer, so any input source works:

| Intent | Keyboard | Action |
| --- | --- | --- |
| left / right | ← → (or A / D) | Move piece |
| up | ↑ (or W) | Rotate |
| down | ↓ (or S) | Soft drop |
| enter | Enter / Space | Hard drop · start · resume |
| back | Esc / Back | Pause · return |
