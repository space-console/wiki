---
title: tetris
---

# tetris

**Tetris** — the first real, playable game in Space Console. It runs on the
launcher (the TV / screen) as its own deployed site, and is driven by the same
shared **intent vocabulary** (`up`/`down`/`left`/`right`/`enter`/`back`) the
[launcher](../game-launcher-web/index.md) and
[controller](../game-controller/index.md) already speak — so a keyboard, TV
remote, gamepad, or (later) a phone controller all drive it with no changes.

Like the rest of the org it's a **zero-build, zero-backend static site** — plain
ES modules, no framework. Open `index.html` and it runs.

- [Getting started](getting-started.md) — run it locally.
- [Architecture](architecture.md) — the engine, the intent mapping, rendering.

Production: <https://space-console.github.io/tetris/>
