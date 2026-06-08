---
title: game-controller
---

# game-controller

The **phone / controller** of Space Console: turns a phone into a game
controller that joins a launcher (the TV) by entering a short room code,
AirConsole-style. It pairs with
[game-launcher-web](../game-launcher-web/index.md) (the screen).

Like the launcher, it's a **zero-build, zero-backend static site** — plain ES
modules, no framework. Open `index.html` and it runs.

> **Status: early placeholder.** A join screen plus a stubbed control pad. The
> transport (`session.js`) is a seam waiting for a real client.

- [Getting started](getting-started.md) — run it locally.
- [Architecture](architecture.md) — screens, the intent model, and the seam.

Production: <https://space-console.github.io/game-controller/>
