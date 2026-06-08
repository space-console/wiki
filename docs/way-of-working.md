---
title: Way of Working
---

# Way of working

The source of truth for **how we build, preview, review, and ship** across every
Space Console repo. Written for both humans and AI agents — if you're an agent
making a change in any repo, follow this.

## The repos

Space Console is a set of sibling repos (cloned next to each other in a
`space-console/` container that is **not** itself a git repo — `cd` into a repo
before any git/build command). See [Services & repositories](repositories.md).

| Repo | Kind | Pages serves | Build | Lint |
| --- | --- | --- | --- | --- |
| `game-launcher-web` | zero-build static app | the launcher app | `npm run build` (stamp → `_dist/`) | `npm run lint` (ESLint) |
| `game-controller` | zero-build static app | the controller app | `npm run build` (stamp → `_dist/`) | `npm run lint` (ESLint) |
| `wiki` | DocFX docs hub | this documentation site | `docfx docfx.json` (→ `_site/`) | `markdownlint-cli2` |

## Documentation policy

**All documentation lives in this `wiki` repo — not in the individual repos.**
Each app repo keeps only a short `README.md` that points here. Service docs live
under `docs/services/<repo>/`. When a repo joins the org, add a row to
[repositories.md](repositories.md) and a folder under `docs/services/`.

## Deploy model (same for every repo)

GitHub's official "GitHub Actions" Pages deploy replaces the *entire* site each
run, so it can't host `main` at the root and branch previews in subfolders at the
same time. Every repo therefore deploys to a **`gh-pages` branch** instead, using
[`JamesIves/github-pages-deploy-action`](https://github.com/JamesIves/github-pages-deploy-action)
with `clean-exclude` to protect previews.

```
gh-pages  →  https://space-console.github.io/<repo>/
├── index.html, assets/ …            ← production root  (deployed from main)
└── preview/
    ├── feature-new-page-9c2a/       ← one folder per ACTIVE feature branch
    └── fix-roster-bug-1f7d/         ← removed when its PR merges/closes
```

### Triggers

| Event | What happens |
| --- | --- |
| **push to a feature branch** | build → lint → (apps: stamp) → deploy to `preview/<slug>-<hash>/`. Every commit deploys. |
| **open / update a PR** | build → lint run as the **required status checks**; a bot comments the preview URL. |
| **push to `main`** (i.e. a merge) | build → lint → deploy to the **root**, preserving `preview/`. |
| **PR closed** | the branch's `preview/<slug>-<hash>/` folder is deleted; if the PR was **merged**, the **feature branch is deleted** too. |

### Preview URL

Stable per branch (doesn't churn on every push):

```
slug = branch lowercased, non-alphanumerics → "-"
hash = first 4 hex chars of sha1(branch)
url  = https://space-console.github.io/<repo>/preview/<slug>-<hash>/
```

e.g. `feature/new-page` → `…/preview/feature-new-page-9c2a/`.

## The change flow (follow this for every change)

1. **Branch** off `main` (e.g. `feature/<thing>`). Never commit straight to `main`.
2. **Push** — this deploys a live preview at the URL above. Iterate; every push
   redeploys the preview.
3. **Open a PR** before merging. The build + lint checks must run.
4. **Merge only after the checks pass** — and merge with **squash** (one tidy
   commit on `main`). Merging deploys to the production root.
5. **Cleanup is automatic** — on merge, the preview folder is removed and the
   feature branch is deleted.

> Auto-merge (merge automatically once checks go green) is the intended behavior;
> enabling it is a one-time repo setting tracked in [todo.md](todo.md). Until
> then, merge the PR yourself once it's green (`gh pr merge --squash`).

## Cache-busting (apps only)

Browsers — and especially TV browsers — cache aggressively. At **deploy time**
only, `scripts/stamp.mjs` copies the site to `_dist/` and appends a per-build
`?v=<guid>` to the entry `<script src>` **and to every local ES-module import**
(stamping only the entry script would leave the modules cached). This is a
CI-only step: `npm run dev` serves the source untouched, so the zero-build
property is preserved locally.

## Why the constraints exist

- **Zero-build / zero-backend apps** — the static catalog and stubbed transports
  (`players.js`, `session.js`) are deliberate seams. Don't add a bundler or
  backend unless a task explicitly calls for it.
- **One intent vocabulary** (`up/down/left/right/enter/back`) is shared by the
  launcher (receives) and controller (sends). Route input through the intent
  layer, never bind UI to raw keycodes or the transport.
- **Markdown is the single source of truth** for docs; the HTML site is
  generated in CI and never committed.
