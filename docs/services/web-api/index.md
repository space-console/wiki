---
title: web-api
---

# web-api

**web-api** — the **signaling service** for Space Console. It is the matchmaker
that lets a phone ([game-controller](../game-controller/index.md)) and a TV
([game-launcher-web](../game-launcher-web/index.md)) find each other by a short
**room code** and complete a **WebRTC** handshake. Once their DataChannel opens,
gameplay **intents flow phone→TV peer-to-peer** and never pass through this
service again.

It is the **only non-static piece** in the org — a small Node.js + `ws` process,
not a Pages site. No game state, no auth, no database; just an in-memory map of
rooms.

- [Getting started](getting-started.md) — run the relay locally.
- [Architecture](architecture.md) — the P2P transport design, the signaling
  protocol, and the current limitation.

> **Status:** the WebRTC P2P transport (backlog **P1**) is implemented and
> verified end-to-end. The relay runs on a laptop in dev; hosting it for
> non-LAN play is backlog **P5**.
