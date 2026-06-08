# Architecture — game-launcher-web

A single static page (`index.html`) driven by a handful of plain ES modules in
`assets/js/`. No framework, no bundler. CSS uses `--safe-*` vars to survive TV
overscan; `manifest.json` makes it an installable fullscreen-landscape PWA.

## Modules

| Module | Responsibility |
| --- | --- |
| `app.js` | Entry point. Renders the game catalog, wires `input → spatial-nav → launch`, and shows the AirConsole-style player roster. |
| `games.js` | Static game catalog (`id`, `title`, players, `art`). Stands in for an API/CMS; `art` uses CSS gradients so there are no binary assets to ship. |
| `input.js` | Normalizes **keyboard / TV remote / gamepad** into one stream of intents. |
| `spatial-nav.js` | Geometry-based focus movement — picks the nearest focusable rectangle in the pressed direction. |
| `players.js` | `PlayerSession` — the room code + roster, and the transport seam. |

## The input-intent layer

TV remotes, keyboards, and gamepads all collapse into a single intent stream —
`up`, `down`, `left`, `right`, `enter`, `back` — so the rest of the app never
touches raw keycodes or gamepad buttons.

```
 keyboard / remote ┐
 gamepad           ┼─▶ input.js ─▶ intent (up/down/left/right/enter/back)
 (phone pad later) ┘                   │
                                       ▼
                         spatial-nav.js  ── moves focus to nearest tile
                                       │
                                       ▼ (enter)
                                  app.js launch(game)
```

`input.js` knows vendor Back-key codes (webOS `461`, Tizen `10009`, some Android
TV remotes `4`) and maps WASD for desktop testing.

## Spatial navigation

Rather than a hard-coded grid, `spatial-nav.js` reads the on-screen rectangles
of `[data-focusable]` elements and moves focus to the nearest one in the pressed
direction. This survives resizing, reflow, and dynamically added tiles, and
emits an `sn:focus` event the UI listens to (e.g. to render the hero panel).

## The transport seam (`players.js`)

`PlayerSession` (an `EventTarget`) owns the room code and the roster of connected
controllers, emitting `ready` and `change` events the UI renders from.
**`connect()` is a stub today** — drop a WebSocket / WebRTC / AirConsole
transport in there (which calls `_add()` / `_remove()` as controllers join and
leave) without touching the UI. The companion client is
[game-controller](../game-controller/index.md).

## Design intents to preserve

- **Keep it backend-free and build-free** unless a task explicitly changes that.
  The static catalog and stubbed transport are deliberate seams, not missing work.
- **All input flows through the intent layer** — never bind UI directly to
  keycodes or gamepad buttons.
- **The UI renders from `PlayerSession` events** — don't reach into its internals.

## Deploy

Deployed to GitHub Pages via the shared pipeline (see
[Way of working](../../way-of-working.md)). At deploy time a CI-only stamp
(`scripts/stamp.mjs`) appends a `?v=<guid>` to the entry `<script>` and to every
local ES-module import, so a fresh deploy is never served stale from cache. Local
dev never runs the stamp.
