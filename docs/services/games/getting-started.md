# Getting started — games

## Prerequisites

- Node.js >= 18 (dev server only — no build/bundle step).

## Run locally

```sh
git clone git@github_xhevops:space-console/games.git
cd games
npm install      # installs the dev server only
npm run dev      # live-server on http://localhost:5175 (auto-reload)
```

It runs on **:5175** so it can sit alongside the launcher (`:5173`) and the
controller (`:5174`) during local testing. The hub (`index.html`) is the menu;
each game lives in its own folder and is reachable at `/<game-id>/`
(e.g. `/tetris/`, `/snake/`, `/chess/`).

## Useful commands

| Command | Description |
| --- | --- |
| `npm run dev` | Live-reloading dev server on :5175. |
| `npm start` | Plain static serve on :5175 (no reload). |
| `npm run lint` | ESLint over every game and the hub. |
| `npm run build` | **CI-only** cache-bust stamp → `_dist/`. |

## Controls

Every game routes through the shared intent layer, so any input source works the
same way across the collection:

| Intent | Keyboard | Typical action |
| --- | --- | --- |
| left / right | ← → (or A / D) | Move / navigate |
| up / down | ↑ ↓ (or W / S) | Move / navigate |
| enter | Enter / Space | Select · confirm · start |
| back | Esc / Back | Pause · return |

Per-game specifics (e.g. Tetris rotate vs. soft drop) are noted in each game's
own UI; see [Architecture](architecture.md) for how intents map per game.
