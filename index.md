---
_layout: landing
_disableToc: true
_disableAffix: true
_disableContribution: true
title: Mission Control
---

<div class="mc" aria-label="Space Console mission control">

<header class="mc-hero">
  <div class="mc-hero__glow" aria-hidden="true"></div>
  <p class="mc-kicker"><span class="led led--cyan"></span> SYSTEM ONLINE · ORBITAL DOC RELAY</p>
  <h1 class="mc-title">SPACE&nbsp;CONSOLE</h1>
  <p class="mc-sub">MISSION&nbsp;CONTROL · the launch deck for every service, doc, and signal in the constellation.</p>
  <div class="mc-readout">
    <span class="mc-stat"><b id="mc-clock">--:--:--</b><i>UTC MISSION TIME</i></span>
    <span class="mc-stat"><b>03</b><i>SERVICES TRACKED</i></span>
    <span class="mc-stat"><b class="ok">NOMINAL</b><i>FLEET STATUS</i></span>
  </div>
</header>

<section class="mc-section" aria-label="Services">
  <h2 class="mc-h2"><span class="mc-h2__idx">01</span> FLEET / SERVICES</h2>
  <div class="mc-grid">

  <article class="hud hud--svc">
    <div class="hud__bar"><span class="led led--cyan"></span> SC-01 · SCREEN</div>
    <h3 class="hud__name">game-launcher-web</h3>
    <p class="hud__role">The <b>TV / screen</b> — AirConsole-style party-game launcher for the 10-foot UI.</p>
    <img class="hud__badge" alt="build status" src="https://github.com/space-console/game-launcher-web/actions/workflows/pages.yml/badge.svg?branch=main" />
    <div class="hud__act">
      <a class="btn btn--go" href="https://space-console.github.io/game-launcher-web/" target="_blank" rel="noopener">▶ LAUNCH</a>
      <a class="btn" href="docs/services/game-launcher-web/index.md">DOCS</a>
      <a class="btn btn--ghost" href="https://github.com/space-console/game-launcher-web" target="_blank" rel="noopener">REPO</a>
    </div>
  </article>

  <article class="hud hud--svc">
    <div class="hud__bar"><span class="led led--magenta"></span> SC-02 · CONTROLLER</div>
    <h3 class="hud__name">game-controller</h3>
    <p class="hud__role">The <b>phone / controller</b> — joins a launcher by room code and sends input intents.</p>
    <img class="hud__badge" alt="build status" src="https://github.com/space-console/game-controller/actions/workflows/pages.yml/badge.svg?branch=main" />
    <div class="hud__act">
      <a class="btn btn--go" href="https://space-console.github.io/game-controller/" target="_blank" rel="noopener">▶ LAUNCH</a>
      <a class="btn" href="docs/services/game-controller/index.md">DOCS</a>
      <a class="btn btn--ghost" href="https://github.com/space-console/game-controller" target="_blank" rel="noopener">REPO</a>
    </div>
  </article>

  <article class="hud hud--svc">
    <div class="hud__bar"><span class="led led--amber"></span> SC-03 · RELAY</div>
    <h3 class="hud__name">wiki</h3>
    <p class="hud__role">This <b>documentation hub</b> — DocFX site + the way-of-working reference for AI agents.</p>
    <img class="hud__badge" alt="build status" src="https://github.com/space-console/wiki/actions/workflows/pages.yml/badge.svg?branch=main" />
    <div class="hud__act">
      <a class="btn btn--go" href="https://space-console.github.io/wiki/" target="_blank" rel="noopener">▶ LIVE</a>
      <a class="btn" href="docs/repositories.md">INDEX</a>
      <a class="btn btn--ghost" href="https://github.com/space-console/wiki" target="_blank" rel="noopener">REPO</a>
    </div>
  </article>

  </div>
</section>

<section class="mc-section" aria-label="Documentation">
  <h2 class="mc-h2"><span class="mc-h2__idx">02</span> NAV / DOCUMENTATION</h2>
  <div class="mc-grid mc-grid--docs">
    <a class="hud hud--link" href="docs/way-of-working.md">
      <div class="hud__bar"><span class="led led--cyan"></span> PRIME DIRECTIVE</div>
      <h3 class="hud__name">Way of Working</h3>
      <p class="hud__role">CI/CD, branch previews, PR-before-merge, merge-after-green. Read this first.</p>
      <span class="hud__chev">→</span>
    </a>
    <a class="hud hud--link" href="docs/getting-started.md">
      <div class="hud__bar"><span class="led led--cyan"></span> ONBOARD</div>
      <h3 class="hud__name">Getting Started</h3>
      <p class="hud__role">Build the wiki locally, add a page, preview, ship.</p>
      <span class="hud__chev">→</span>
    </a>
    <a class="hud hud--link" href="docs/repositories.md">
      <div class="hud__bar"><span class="led led--cyan"></span> STAR CHART</div>
      <h3 class="hud__name">Services &amp; Repositories</h3>
      <p class="hud__role">The index of every repo, Pages URL, and preview pattern.</p>
      <span class="hud__chev">→</span>
    </a>
    <a class="hud hud--link" href="docs/todo.md">
      <div class="hud__bar"><span class="led led--amber"></span> MISSION LOG</div>
      <h3 class="hud__name">TODO / Backlog</h3>
      <p class="hud__role">Outstanding setup + product backlog across the fleet.</p>
      <span class="hud__chev">→</span>
    </a>
  </div>
</section>

<footer class="mc-foot">
  <span class="led led--cyan"></span> ALL SYSTEMS NOMINAL · gh-pages relay · <a href="https://github.com/space-console" target="_blank" rel="noopener">space-console</a>
</footer>

</div>
