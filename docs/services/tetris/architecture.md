# Architecture — tetris

A single static page (`index.html`) with two `<canvas>` surfaces — the playfield
and the "next" preview — driven by plain ES modules in `assets/js/`. The code
splits cleanly into a **pure game core** and a thin **input + render** shell, so
the rules are testable without a DOM.

## Modules

| Module | Responsibility |
| --- | --- |
| `engine.js` | `Engine` — the pure game core. Owns the board, the 7-bag piece sequence, rotation (with simple wall kicks), gravity by level, line clears, and guideline scoring. No DOM, no input, no rendering. |
| `input.js` | The shared intent layer (keyboard / TV remote / gamepad), with game-specific auto-repeat (DAS) so a held ← / → / ↓ glides the piece. |
| `app.js` | Entry point. Wires the intent stream to the engine, runs the gravity loop, renders board / ghost / next / scoreboard, and manages the game states. |

## The intent mapping

The launcher *receives* intents and the controller *sends* them; this game is a
*consumer* of the same six-word vocabulary, so nothing here is bound to raw
keycodes or to a transport:

| Intent | In Tetris |
| --- | --- |
| `left` / `right` | Move the piece (auto-repeats while held) |
| `up` | Rotate clockwise |
| `down` | Soft drop (auto-repeats while held) |
| `enter` | Hard drop · start · resume |
| `back` | Pause · return |

```
 key / remote / pad ─▶ input.js (intent) ─▶ app.js ─▶ Engine.move / rotate / drop
                                                          │
                                                          ▼
                                              canvas render (board + next)
```

Because input arrives as intents, a phone `game-controller` relaying the same
vocabulary over a real transport could drive the game later with no change here.

## The engine

- **Pieces** — the seven tetrominoes, each authored once in spawn orientation;
  the other three rotations are derived by rotating the 4×4 cell box clockwise.
- **Randomiser** — a 7-bag: every piece appears once per bag before any repeats.
- **Rotation** — tries in place, then nudges ±1 / ±2 cells (a lightweight wall
  kick) so rotations near a wall still succeed.
- **Gravity** — a per-level drop interval; `app.js` accumulates elapsed time and
  steps the piece down each interval. Soft drop and hard drop award points.
- **Line clears & levelling** — full rows are removed and scored
  (100 / 300 / 500 / 800 × level); the level rises every 10 lines and gravity
  speeds up with it.

The core emits `change`, `lines`, and `gameover` events; the shell re-renders on
`change` and shows the overlay on `gameover`.

## Design intents to preserve

- **Zero-build, zero-backend** — same ethos as the launcher and controller.
- **Pure engine** — keep game rules in `engine.js`, free of DOM/input, so they
  stay headless-testable.
- **One intent vocabulary** shared across the org; route all controls through
  the intent layer, never bind the game to raw keycodes or a transport.

## Deploy

Same shared pipeline and CI-only cache-bust stamp as the other apps — see
[Way of working](../../way-of-working.md).
