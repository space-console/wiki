# Getting Started

This wiki is a [DocFX](https://dotnet.github.io/docfx/) site. Markdown is the single source of truth; the HTML site is generated in CI and published to GitHub Pages.

## Preview locally

```sh
dotnet tool install -g docfx
docfx docfx.json --serve
```

Open http://localhost:8080.

## Add a page

1. Create a Markdown file under `docs/`.
2. Add an entry for it in `docs/toc.yml`.
3. Commit and push to `main` — the **Publish docs** workflow rebuilds and deploys the site.

## How it deploys

`.github/workflows/docs.yml` builds the site with DocFX and publishes the `_site` artifact to GitHub Pages (Pages source: **GitHub Actions**). The first run enables Pages automatically.
