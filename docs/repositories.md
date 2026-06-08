# Services & repositories

The canonical index of Space Console repositories. Every repo lives in the
`space-console` org and publishes to GitHub Pages with the same deploy model
(`main` → site root, feature branches → `/preview/<slug>-<hash>/`). See
[Way of working](way-of-working.md) for how that pipeline works.

> **Add a row here whenever a new repo joins the org**, and add a docs folder
> under `docs/services/<repo>/`.

| Service | Role | Pages (production) | Docs |
| --- | --- | --- | --- |
| [game-launcher-web](https://github.com/space-console/game-launcher-web) | The **TV / screen** — AirConsole-style party-game launcher (10-foot UI). | <https://space-console.github.io/game-launcher-web/> | [docs](services/game-launcher-web/index.md) |
| [game-controller](https://github.com/space-console/game-controller) | The **phone / controller** — joins a launcher by room code and sends input. | <https://space-console.github.io/game-controller/> | [docs](services/game-controller/index.md) |
| [wiki](https://github.com/space-console/wiki) | This org-wide documentation hub (DocFX). | <https://space-console.github.io/wiki/> | You're reading it. |

## Build status

Live status of each repo's `pages.yml` pipeline on `main` (green = passing,
red = failing, yellow = a run is in progress). Click a badge for the run logs.

| Service | Pages pipeline (`main`) |
| --- | --- |
| game-launcher-web | [![game-launcher-web Pages](https://github.com/space-console/game-launcher-web/actions/workflows/pages.yml/badge.svg?branch=main)](https://github.com/space-console/game-launcher-web/actions/workflows/pages.yml) |
| game-controller | [![game-controller Pages](https://github.com/space-console/game-controller/actions/workflows/pages.yml/badge.svg?branch=main)](https://github.com/space-console/game-controller/actions/workflows/pages.yml) |
| wiki | [![wiki Pages](https://github.com/space-console/wiki/actions/workflows/pages.yml/badge.svg?branch=main)](https://github.com/space-console/wiki/actions/workflows/pages.yml) |

> Badges read "no status" until each repo's first `pages.yml` run lands on
> `main`. The badge SVGs are served by GitHub, so they render on the published
> Pages site and on GitHub.

## How the pieces fit

```
   ┌─────────────────────┐         room code          ┌────────────────────┐
   │  game-launcher-web  │  ◀── join + input intents ──│   game-controller  │
   │     (TV / screen)   │                             │   (phone / pad)    │
   └─────────────────────┘                             └────────────────────┘
            ▲
            │ both are zero-build static sites on GitHub Pages
            └──────────── documented here in  wiki  ──────────────
```

`game-launcher-web` is the screen; one or more `game-controller` clients join it
by room code. Both are zero-build, zero-backend static sites; their transport
seams (`players.js` / `session.js`) are stubs today.

## Preview URLs

Every feature branch gets a live preview before it merges:

```
https://space-console.github.io/<repo>/preview/<branch-slug>-<hash>/
```

e.g. branch `feature/new-page` on `game-launcher-web` →
`…/game-launcher-web/preview/feature-new-page-9c2a/`.
