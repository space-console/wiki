---
title: games
---

# games

**games** — the Space Console game collection. A single repo holding **30
playable games** (Tetris, Snake, Chess, Sudoku, Poker, Solitaire, Uno, and
more), each a self-contained static site under its own folder, plus a **hub**
menu (`index.html`) that lists them all.

Every game is driven by the same shared **intent vocabulary**
(`up`/`down`/`left`/`right`/`enter`/`back`) the
[launcher](../game-launcher-web/index.md) and
[controller](../game-controller/index.md) already speak — so a keyboard, TV
remote, gamepad, or (later) a phone controller all drive them with no changes.

Like the rest of the org it's a **zero-build, zero-backend static site** — plain
ES modules, no framework. Open `index.html` and it runs.

- [Getting started](getting-started.md) — run the collection locally.
- [Architecture](architecture.md) — the hub, the per-game folders, the shared
  intent layer, and how the launcher consumes the catalog.

Production: <https://space-console.github.io/games/> (each game lives at
`…/games/<id>/`).

> **Relationship to the launcher.** The
> [game-launcher-web](../game-launcher-web/index.md) catalog points at these
> games by their sibling Pages path (`../games/<id>/`), so selecting a game on
> the TV opens its deployed site. Tetris — documented separately under
> [tetris](../tetris/index.md) — is one of the games bundled in this collection.
