# Getting started — web-api

## Prerequisites

- Node.js >= 18.

## Run locally

```sh
git clone git@github_xhevops:space-console/web-api.git
cd web-api
npm install
npm start        # ws://localhost:8080   (npm run dev for --watch reload)
```

Then run the TV and a phone and point them at the relay:

```sh
cd game-launcher-web && npm run dev   # http://localhost:5173 (the TV)
cd game-controller   && npm run dev   # http://localhost:5174 (the phone)
```

Open the launcher, read the room code, enter it on the controller — the
controller's d-pad now drives the launcher menu over the peer connection.

## Signaling URL

Both clients default their signaling target to `ws://<page-hostname>:8080`, so
serving the apps from your laptop's LAN IP lets phones reach the relay
automatically. Override per device with a query param:

```
http://<laptop-ip>:5174/?signal=ws://<laptop-ip>:8080
```

## Useful commands

| Command | Description |
| --- | --- |
| `npm start` | Run the relay on :8080. |
| `npm run dev` | Same, with `node --watch` auto-reload. |

## Testing the handshake on one machine

Two browser tabs/contexts on the same machine work, but Chrome hides host ICE
candidates behind mDNS by default, which can block the loopback connection.
Launch Chrome with `--disable-features=WebRtcHideLocalIpsWithMdns` for
single-machine testing. On a real LAN (phone + TV on the same Wi-Fi) this isn't
needed.
