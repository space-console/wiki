# Architecture — games

The repo is a **collection of independent static games** plus a **hub** that
lists them. There is no shared runtime tying the games together — each game is a
self-contained folder you could open on its own — but they all share one input
contract (the intent vocabulary) and one deploy pipeline.

## Layout

```
games/
├── index.html        # the hub — a grid of game tiles
├── assets/
│   ├── css/          # hub + base styles
│   └── js/
│       ├── hub.js    # hub menu: intent-driven focus nav → launch a game folder
│       └── shared/   # shared modules (e.g. input.js — the intent layer)
├── tetris/           # one self-contained game (index.html + its own js/css)
├── snake/
├── chess/
└── …                 # 30 games in all, one folder each
```

| Piece | Responsibility |
| --- | --- |
| `index.html` + `assets/js/hub.js` | The landing menu. Tiles are authored in HTML; `hub.js` wires the shared intent layer to geometry-based focus navigation and, on `enter`, navigates to the focused game's folder. |
| `assets/js/shared/` | Modules shared across the hub (and available to games), notably the `Input` intent layer — the same keyboard / TV remote / gamepad normalization the launcher uses. |
| `<game>/` | Each game is its own page: an `index.html` plus its own ES modules and styles. Games keep their rules independent of the hub. |

## The intent vocabulary

Every game and the hub consume the same six-word vocabulary, so nothing is bound
to raw keycodes or to a transport:

| Intent | In the hub | In a game (typical) |
| --- | --- | --- |
| `left` / `right` / `up` / `down` | Move focus between tiles | Move / navigate |
| `enter` | Launch the focused game | Select · confirm · start |
| `back` | (no-op at the hub root) | Pause · return |

```
 key / remote / pad ─▶ shared/input.js (intent) ─▶ hub.js  ─▶ open  /<game>/
                                                 └▶ <game>  ─▶ game logic
```

Because input arrives as intents, a phone `game-controller` relaying the same
vocabulary over a real transport could drive the hub and the games later with no
change here.

## How the launcher consumes the collection

The [game-launcher-web](../game-launcher-web/index.md) catalog
(`assets/js/games.js`) lists these games and points each `url` at the game's
**sibling Pages path** — `../games/<id>/`. On GitHub Pages the launcher and this
repo deploy as siblings under the org:

```
launcher : https://space-console.github.io/game-launcher-web/
games    : https://space-console.github.io/games/<id>/
```

so `../games/<id>/` resolves correctly from the deployed launcher. The hub here
(`games/index.html`) and the launcher catalog are two front doors to the same
games; the hub menu mirrors the launcher catalog's titles, art, and categories.

## Design intents to preserve

- **Zero-build, zero-backend** — same ethos as the launcher and controller.
- **Self-contained games** — each game folder stands alone; keep game rules out
  of the hub so a game can be opened, tested, or deployed on its own.
- **One intent vocabulary** shared across the org; route all controls through
  the shared intent layer, never bind a game to raw keycodes or a transport.
- **Hub mirrors the launcher catalog** — when games are added or renamed, keep
  `games/index.html` and the launcher's `games.js` in sync.

## Deploy

Same shared pipeline and CI-only cache-bust stamp as the other apps — see
[Way of working](../../way-of-working.md).
