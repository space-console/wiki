# Space Console — workspace guide

Orientation for working in `c:\src\github\space-console`. This folder is a **container**, not a git repo — it holds independent sibling repos that are versioned and pushed separately:

| Path | Repo | What it is |
| --- | --- | --- |
| `game-launcher-web/` | `space-console/game-launcher-web` | The **TV / screen** — AirConsole-style party-game launcher (10-foot UI + desktop). |
| `game-controller/` | `space-console/game-controller` | The **phone / controller** — joins a launcher by room code and sends input. |
| `wiki/` | `space-console/wiki` | Org-wide DocFX docs hub **and the single home for all documentation**. |

> There is **no** git repo at the workspace root. `cd` into the specific repo before running git/CI/build commands.

**Docs policy:** documentation is **centralized in `wiki`**, not in each repo. The app repos keep only a short README that links to `wiki/docs/services/<repo>/`. The canonical process reference (for humans and AI agents) is **`wiki/docs/way-of-working.md`**; outstanding setup lives in **`wiki/docs/todo.md`**.

---

## The two app repos (game-launcher-web, game-controller)

Both are **zero-build, zero-backend static sites** — plain ES modules, no bundler, no framework. Open `index.html` and it runs. They share one intent vocabulary (`up/down/left/right/enter/back`): the launcher *receives* intents, the controller *sends* them.

**Run them** (Node >= 18, dev server only):
```sh
cd game-launcher-web && npm install && npm run dev   # http://localhost:5173
cd game-controller   && npm install && npm run dev   # http://localhost:5174
```

**game-launcher-web** (`assets/js/`): `app.js` (entry — catalog, `input → spatial-nav → launch`, roster), `games.js` (static catalog standing in for an API), `input.js` (normalizes keyboard/TV-remote/gamepad into intents; vendor Back keys webOS 461 / Tizen 10009 / Android TV 4), `spatial-nav.js` (geometry-based nearest-rect focus), `players.js` (`PlayerSession` — room code + roster; **`connect()` is a stub**, the transport seam).

**game-controller** (`assets/js/`): `app.js` (join screen → control pad, routes taps through one `emit()`), `session.js` (`ControllerSession` — mirrors `PlayerSession`; **`connect()/send()` are stubs**). Early placeholder UX.

**Design intents to preserve:** keep them backend-free and build-free unless a task says otherwise (static catalog + stubbed transports are deliberate seams); route all input through the intent layer (never bind UI to raw keycodes or the transport); the UI renders from session events — don't reach into internals.

**Build/lint scripts:** `npm run lint` (ESLint) and `npm run build` (CI-only cache-bust stamp → `_dist/`). `npm run dev`/`start` stay build-free. Don't run `build` by hand expecting it to change local behavior — it only produces the deploy artifact.

---

## wiki

Org-wide docs hub built with **DocFX**. Holds cross-project guides, onboarding, the services index (`docs/repositories.md`), per-service docs (`docs/services/<repo>/`), and the agent process docs.

```sh
cd wiki
dotnet tool install -g docfx   # once
docfx docfx.json --serve       # preview on http://localhost:8080
```

- **Add a row to `docs/repositories.md` and a `docs/services/<repo>/` folder whenever a new repo joins the org.**
- DocFX content glob is `**/*.md`, so any markdown you drop in **gets published publicly**. `CLAUDE.md` is excluded in `docfx.json`; lint config (`.markdownlint-cli2.jsonc`) gates structure.

---

## CI/CD — same model in every repo (see `wiki/docs/way-of-working.md`)

Each repo deploys to a **`gh-pages` branch** (not the "GitHub Actions" Pages source — that can't host root + previews together), via `.github/workflows/pages.yml`:

- **push to a feature branch** → build + lint (+ apps: stamp) → deploy a live preview to `preview/<slug>-<hash>/`. Every commit deploys.
- **open/update a PR** → build + lint are the required checks; a bot comments the preview URL.
- **push to `main`** (a merge) → deploy to the site **root**, preserving `preview/`.
- **PR closed** → that preview folder is removed; if **merged**, the feature branch is deleted too.

**Flow for any change:** branch off `main` → push (preview deploys) → open a PR → merge **squash, only after checks pass** (cleanup is automatic). Auto-merge / branch-protection / squash-only / auto-delete-branch are repo-admin settings tracked in `wiki/docs/todo.md`.

**Cache-busting (apps):** `scripts/stamp.mjs` runs at deploy time only — appends `?v=<guid>` to the entry `<script>` and every local ES-module import (so TV browsers never serve a stale module). Local dev is untouched.

---

## Conventions / gotchas

- Shell here is **PowerShell on Windows** — use PowerShell syntax (`$env:VAR`, `$null`), and `cd` into a repo before git/dotnet/npm.
- Multiple repos, multiple histories — never assume a change in one is committed with another.
- The app repos intentionally **do not commit `package-lock.json`** (dev-tooling deps only); CI uses `npm install`, not `npm ci`.
- A bad markdown link or stray `.md` in `wiki` ships to a live public site — mind what you add.
