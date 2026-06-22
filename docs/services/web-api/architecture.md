# Architecture — web-api & the TV↔phone transport

This page documents how a phone drives the TV: the **WebRTC peer-to-peer**
transport (backlog **P1**) and the thin signaling service that sets it up.

## Why WebRTC (the decision)

The messages are tiny — the six-word intent vocabulary plus join/roster events,
not media. We chose **WebRTC DataChannel** for a true peer-to-peer path: once two
peers connect, intents go phone→TV directly with no server in the hot path.

The trade-off, stated plainly: **there is no zero-backend WebRTC.** Two browsers
that have never met can't connect without a rendezvous point, so a *signaling*
service is unavoidable — but it is small, stateless-ish, and out of the gameplay
path. (A plain WebSocket relay was the alternative; it would have put a server in
the hot path for every keypress.)

## Topology — TV is the hub (star)

Each phone forms its **own** peer connection to the TV. The TV holds N
connections; phones never talk to each other. This mirrors AirConsole.

```
   phone A ─┐  (WebRTC DataChannel, direct)
   phone B ─┼──────────────▶  game-launcher-web (TV)
   phone C ─┘                       holds N peer connections

        ▲ only during connect: SDP + ICE through ▲
        └──────────────  web-api (signaling)  ─────┘
                         room code = rendezvous key
```

## The handshake (per phone)

```
TV boots ─▶ web-api {create, code}  ─▶ {created, code}  ─▶ shows the code
phone ─▶ {join, code}  ─▶ web-api  ─▶ {joined,id} to phone, {join,from} to TV
phone (offerer) ─▶ SDP offer ─▶ web-api ─▶ TV
TV   (answerer) ─▶ SDP answer ─▶ web-api ─▶ phone
both ─▶ ICE candidates trickle through web-api ─▶ each other  (STUN finds routes)
  ✅ DataChannel opens → phone.send(intent) lands on the TV directly
                        → web-api connection goes idle
```

The phone is the **offerer** (it creates the DataChannel and the offer); the TV
is the **answerer/hub**. STUN (a public server) discovers public routes; on
networks where direct P2P fails, an optional **TURN** relay is the fallback
(not yet configured — see P5).

## The signaling protocol

JSON frames, one WebSocket per client. The server holds only an in-memory
`code → { host, guests }` map.

| From | Message | Meaning |
| --- | --- | --- |
| TV → | `{type:"create", code}` | Register a room (server confirms or re-mints the code). |
| → TV | `{type:"created", code}` | Authoritative room code. |
| phone → | `{type:"join", code, name?}` | Join a room. |
| → phone | `{type:"joined", id, code}` / `{type:"error", reason}` | Paired, or no such room. |
| → TV | `{type:"join", from, name}` / `{type:"leave", from}` | A controller joined / left. |
| ↔ | `{type:"signal", to?, data}` | Relay one SDP/ICE blob to the other peer. |
| → phone | `{type:"host-gone"}` | The TV closed the room. |

## How it maps onto the app seams

The transport lives entirely behind the existing session seams — the UIs were
not restructured:

| Repo | File | Role |
| --- | --- | --- |
| game-controller | `assets/js/session.js` | `ControllerSession` — the **offerer**. `connect(code)` signals in, opens the DataChannel, makes the offer; `send(intent)` writes to the channel. Emits `ready` / `closed` / `error`. |
| game-launcher-web | `assets/js/players.js` | `PlayerSession` — the **hub/answerer**. Accepts one `RTCPeerConnection` per phone, answers offers, adds each to the roster on channel-open, and re-emits received intents as `intent` events. |
| game-launcher-web | `assets/js/app.js` | Routes session `intent` events through the **same `handleIntent()`** the keyboard uses — a phone is just another intent source. |

## Current limitation (backlog P2)

The launcher launches a game by **full navigation**
(`location.href = ../games/<id>/`), which unloads the launcher page and **drops
the peer connection**. So today a phone drives the launcher **menu**, but not a
**running game**. Closing this needs a **persistent shell** — the launcher
hosting games in an iframe / in-page swap so the connection (and the
`PlayerSession`) survives launch, with games subscribing to controller intents.

## Design intents to preserve

- **Keep the relay out of the hot path** — it brokers the handshake only;
  gameplay stays peer-to-peer.
- **No game state / auth / DB in web-api** — it stays a thin matchmaker.
- **One intent vocabulary** end to end; a phone is just another source feeding
  the same `handleIntent()`.

## Deploy

Currently run by hand (`npm start`) on a laptop. Hosting it with `wss://` and a
public origin (plus optional TURN) is backlog **P5**; unlike the other repos it
is **not** a GitHub Pages site.
