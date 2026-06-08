# wiki

Central documentation hub for **Space Console** — built with [DocFX](https://dotnet.github.io/docfx/) and published to GitHub Pages.

This repo is the org-wide wiki: cross-project guides, architecture notes, and onboarding live here, while project-specific docs stay in each repo's own `docs/`.

## Local preview

```sh
dotnet tool install -g docfx
docfx docfx.json --serve
```

Then open http://localhost:8080.

The published site is built and deployed automatically on every push to `main` (see `.github/workflows/docs.yml`).
