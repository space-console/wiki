// SPACE CONSOLE // SPACEDECK — landing-only flourishes for the DocFX theme.
// Loaded after docfx.min.js. Everything here is additive and guarded so it
// never interferes with doc pages or DocFX's own scripts.

(function () {
  "use strict";

  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onReady(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  // ---- Live UTC mission clock ------------------------------------------------
  function startClock() {
    var el = document.getElementById("mc-clock");
    if (!el) return;
    function tick() {
      var d = new Date();
      function p(n) { return String(n).padStart(2, "0"); }
      el.textContent = p(d.getUTCHours()) + ":" + p(d.getUTCMinutes()) + ":" + p(d.getUTCSeconds());
    }
    tick();
    setInterval(tick, 1000);
  }

  // ---- Starfield (landing page only) ----------------------------------------
  function startStarfield() {
    if (reduce) return;
    if (!document.querySelector(".mc")) return; // landing only

    var canvas = document.createElement("canvas");
    canvas.id = "mc-stars";
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    var w, h, stars, dpr;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = Math.floor(window.innerWidth * dpr);
      h = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      var count = Math.min(180, Math.floor((window.innerWidth * window.innerHeight) / 9000));
      stars = [];
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * 0.8 + 0.2,        // depth → size/speed
          tw: Math.random() * Math.PI * 2,      // twinkle phase
          hue: Math.random() < 0.18 ? 300 : 190 // mostly cyan, some violet
        });
      }
    }

    var t = 0;
    function frame() {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.y += s.z * 0.12 * dpr;               // slow drift down
        if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
        var a = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.6 + s.tw));
        var r = s.z * 1.5 * dpr;
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(" + s.hue + ", 100%, " + (70 + s.z * 15) + "%, " + a * s.z + ")";
        ctx.shadowBlur = 6 * dpr;
        ctx.shadowColor = "hsla(" + s.hue + ", 100%, 70%, " + a + ")";
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    requestAnimationFrame(frame);
  }

  onReady(function () {
    startClock();
    startStarfield();
  });
})();
