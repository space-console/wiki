# Architecture — game-controller

A single static page (`index.html`) with two screens, driven by plain ES modules
in `assets/js/`. Phone-first: portrait PWA, locked zoom, `touch-action` tuned for
snappy taps.

## Screens

1. **Join** — enter the 4-character room code shown on the TV and connect.
2. **Control pad** — a D-pad plus A/B action buttons, revealed once connected.

## Modules

| Module | Responsibility |
| --- | --- |
| `app.js` | Entry point. Drives the join form, swaps to the pad on `ready`, and routes every button through one intent emitter. |
| `session.js` | `ControllerSession` — the transport seam; joins a room and *sends* intents. |

## The intent model (mirror of the launcher)

The launcher *receives* intents; the controller *sends* them. Same vocabulary —
`up`, `down`, `left`, `right`, `enter`, `back` — so the two halves speak one
language. The UI never talks to the transport directly; it calls one `emit()`
that hands the intent to the session.

```
 tap D-pad / A / B ─▶ app.js emit(intent) ─▶ ControllerSession.send(intent)
                                                     │  (stub today)
                                                     ▼
                                          transport ─▶ launcher (TV)
```

## The transport seam (`session.js`)

`ControllerSession` (an `EventTarget`) mirrors the launcher's `PlayerSession`.
`connect(roomCode)` and `send(intent)` are **stubs today** (so the controller
runs with no backend): `connect()` optimistically fires `ready`, and `send()`
fires a local `sent` event. Drop a real WebSocket / WebRTC / AirConsole client in
there — matched to the launcher's transport — without touching the UI.

## Design intents to preserve

- **Zero-build, zero-backend** — same ethos as the launcher.
- **One intent vocabulary** shared with `game-launcher-web`; route all controls
  through `emit()` / `session.send()`, never bind UI straight to the transport.

## Deploy

Same shared pipeline and CI-only cache-bust stamp as the launcher — see
[Way of working](../../way-of-working.md).
