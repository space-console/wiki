# wiki

[![game-launcher-web](https://github.com/space-console/game-launcher-web/actions/workflows/pages.yml/badge.svg?branch=main)](https://github.com/space-console/game-launcher-web/actions/workflows/pages.yml)
[![game-controller](https://github.com/space-console/game-controller/actions/workflows/pages.yml/badge.svg?branch=main)](https://github.com/space-console/game-controller/actions/workflows/pages.yml)
[![wiki](https://github.com/space-console/wiki/actions/workflows/pages.yml/badge.svg?branch=main)](https://github.com/space-console/wiki/actions/workflows/pages.yml)

Central documentation hub for **Space Console** — built with [DocFX](https://dotnet.github.io/docfx/) and published to GitHub Pages.

This repo is the org-wide wiki and the **single home for all documentation** —
cross-project guides, onboarding, and each service's docs all live here (under
`docs/services/<repo>/`). Individual repos keep only a short README that links
back here. It's also the process reference for AI agents: start at
`docs/way-of-working.md`.

## Local preview

```sh
dotnet tool install -g docfx
docfx docfx.json --serve
```

Then open <http://localhost:8080>.

The published site is built and deployed on every push to `main` via
`.github/workflows/pages.yml` (same `gh-pages` root/preview model every repo
uses; see `docs/way-of-working.md`).
