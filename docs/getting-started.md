# Getting Started

This wiki is a [DocFX](https://dotnet.github.io/docfx/) site. Markdown is the single source of truth; the HTML site is generated in CI and published to GitHub Pages.

## Preview locally

```sh
dotnet tool install -g docfx
docfx docfx.json --serve
```

Open <http://localhost:8080>.

## Add a page

1. Create a Markdown file under `docs/` (for a service, under `docs/services/<repo>/`).
2. Add an entry for it in the nearest `toc.yml`.
3. Open a branch + PR — a **docs preview** is published before you merge.
4. Merge once checks pass — the site at the root is rebuilt and deployed.

## How it deploys

`.github/workflows/pages.yml` lints the markdown, builds the site with DocFX
(`_site`), and publishes to the **`gh-pages` branch**: `main` → the site root,
feature branches → `/preview/<slug>-<hash>/`. This is the same model every repo
uses; the full pipeline (previews, PR-before-merge, merge-after-green, cleanup)
is documented in [Way of working](way-of-working.md).

> One-time repo setup (Pages source, branch protection, auto-merge) is tracked
> in the [TODO / Backlog](todo.md).
