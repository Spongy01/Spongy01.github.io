(function () {
  var root = document.documentElement;
  var button = document.querySelector('.theme-toggle');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.getAttribute('data-theme') || (systemDark.matches ? 'dark' : 'light');
  }

  function renderToggle() {
    if (!button) return;
    var theme = currentTheme();
    button.setAttribute('data-mode', theme);
    button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  /* Theme wave: the new theme spreads from the toggle as an organic blob.
     The edge distortion peaks mid-way and settles into a clean circle. */
  var WAVE_MS = 1500;
  var WAVE_EASE = 2.0; /* 1 = constant speed; higher = slower start, faster finish */
  var waveStyle = document.createElement('style');
  document.head.appendChild(waveStyle);

  function runWave(x, y, radius, transition) {
    var maxR = radius * 1.35, start = performance.now(), N = 160;

    function frame(now) {
      var t = Math.min(1, (now - start) / WAVE_MS);
      var p = Math.pow(t, WAVE_EASE);
      var R = p * maxR;
      var amp = 0.13 * Math.sin(Math.PI * Math.min(1, p * 1.15));
      var pts = [];
      for (var i = 0; i < N; i++) {
        var a = (i / N) * Math.PI * 2;
        var k = 1 + amp * (Math.sin(3 * a + t * 5) + Math.sin(7 * a - t * 8)) / 2;
        pts.push((x + Math.cos(a) * R * k).toFixed(1) + 'px ' + (y + Math.sin(a) * R * k).toFixed(1) + 'px');
      }
      waveStyle.textContent = '::view-transition-new(root){clip-path:polygon(' + pts.join(',') + ');}';
      if (t < 1) requestAnimationFrame(frame);
      else transition.skipTransition(); /* wave done: end the transition ourselves */
    }
    frame(performance.now()); /* apply the t=0 shape immediately, no full-page flash */
    transition.finished.then(function () { waveStyle.textContent = ''; });
  }

  if (button) {
    button.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      function apply() {
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
        renderToggle();
      }

      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!document.startViewTransition || reduce) { apply(); return; }

      /* Wave: the new theme expands as a circle from the button. */
      var r = button.getBoundingClientRect();
      var x = r.left + r.width / 2;
      var y = r.top + r.height / 2;
      var radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

      var transition = document.startViewTransition(apply);
      transition.ready.then(function () {
        runWave(x, y, radius, transition);
      });
    });
  }

  if (systemDark.addEventListener) {
    systemDark.addEventListener('change', renderToggle);
  }
  renderToggle();

  /* Soft reveal on scroll. CSS only hides .reveal when motion is allowed
     and the html.js class is present, so nothing stays hidden without JS. */
  var blocks = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !blocks.length) {
    Array.prototype.forEach.call(blocks, function (el) { el.classList.add('is-visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  Array.prototype.forEach.call(blocks, function (el) { observer.observe(el); });
})();
