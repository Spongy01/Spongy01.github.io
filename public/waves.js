/* Animated wave panel in the right rail. Each wave is a filled sin/cos curve;
   waves are drawn back-to-front from the end of the list to the start. */
(function () {
  var host = document.querySelector('.waves');
  if (!host) return;
  var canvas = host.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var root = document.documentElement;
  var dark = window.matchMedia('(prefers-color-scheme: dark)');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Settings chosen in the editor. See docs/waves.md for what each field means
     and how to re-tune them. */
  var config = {
    bgLight: '#f8ecd3',
    bgDark: '#232830',
    height: 360,
    radius: 24,
    /* index 0 = front-most wave, last = back-most */
    waves: [
      { color: '#c2a366', opacity: 0.6, fn: 'sin', dir: -1, speed: 40,  amp: 13, len: 175, base: 59, phase: 0 },
      { color: '#776746', opacity: 0.6, fn: 'sin', dir: 1,  speed: 129, amp: 14, len: 225, base: 74, phase: 0 },
      { color: '#8a7a5a', opacity: 1,   fn: 'sin', dir: 1,  speed: 71,  amp: 9,  len: 260, base: 87, phase: 6.25 },
      { color: '#ddc28d', opacity: 0.6, fn: 'sin', dir: 1,  speed: 40,  amp: 9,  len: 120, base: 48, phase: 0 },
      { color: '#f5e0b3', opacity: 1,   fn: 'sin', dir: -1, speed: 40,  amp: 10, len: 150, base: 39, phase: 0 }
    ]
  };

  var w = 0, h = 0, dpr = 1, t0 = performance.now(), running = false;

  function size() {
    var r = host.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.max(1, Math.round(r.width));
    h = Math.max(1, Math.round(r.height));
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function isDark() {
    var t = root.getAttribute('data-theme');
    return t ? t === 'dark' : dark.matches;
  }

  function draw(now) {
    var t = reduce.matches ? 0 : (now - t0) / 1000;
    host.style.background = isDark() ? config.bgDark : config.bgLight;
    ctx.clearRect(0, 0, w, h);
    for (var i = config.waves.length - 1; i >= 0; i--) {
      var wv = config.waves[i];
      var f = wv.fn === 'cos' ? Math.cos : Math.sin;
      var shift = wv.dir * wv.speed * t;
      var k = (Math.PI * 2) / Math.max(10, wv.len);
      ctx.globalAlpha = wv.opacity;
      ctx.fillStyle = wv.color;
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (var x = 0; x <= w + 2; x += 2) {
        ctx.lineTo(x, (wv.base / 100) * h + wv.amp * f((x - shift) * k + wv.phase));
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function loop(now) {
    draw(now);
    if (running) requestAnimationFrame(loop);
  }
  function start() {
    if (running || reduce.matches) { draw(performance.now()); return; }
    running = true; requestAnimationFrame(loop);
  }

  function apply() {
    host.style.height = config.height + 'px';
    host.style.borderRadius = config.radius + 'px';
    size();
    draw(performance.now());
  }

  /* Pause when scrolled out of view or the tab is hidden. */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      var visible = es[0].isIntersecting;
      if (visible) start(); else running = false;
    }).observe(host);
  } else { start(); }

  window.addEventListener('resize', size);
  reduce.addEventListener && reduce.addEventListener('change', function () { running = false; start(); });

  /* Hook for the temporary editor (waves-editor.js). */
  window.WavesWidget = {
    config: config,
    update: function (next) { config = next; window.WavesWidget.config = next; apply(); },
    defaults: JSON.parse(JSON.stringify(config))
  };

  apply();
  start();
})();
