/* TEMPORARY: caption style editor for .waves__text. Delete with its <script> in index.astro once settled. */
(function () {
  var node = document.querySelector('.waves__text');
  if (!node) return;
  var KEY = 'wavesTextCfg';

  var FONTS = {
    'Fraunces (site serif)': '"Fraunces", Georgia, serif',
    'Hanken Grotesk (site sans)': '"Hanken Grotesk", Helvetica, sans-serif',
    'Instrument Serif': '"Instrument Serif", Georgia, serif',
    'Playfair Display': '"Playfair Display", Georgia, serif',
    'DM Serif Display': '"DM Serif Display", Georgia, serif',
    'Cormorant Garamond': '"Cormorant Garamond", Georgia, serif',
    'Caveat (handwritten)': '"Caveat", cursive',
    'Space Mono': '"Space Mono", monospace',
    'Syne (bold geometric)': '"Syne", sans-serif'
  };
  var link = document.createElement('link'); link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=DM+Serif+Display:ital@0;1&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Caveat:wght@400;600&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700&display=swap';
  document.head.appendChild(link);

  var DEF = { text: 'Something coming here soon!', font: 'Caveat (handwritten)', size: 30, weight: 600, italic: false, tcase: 'none', tracking: 0, align: 'center', colorMode: 'auto', color: '#3a3226', opacity: 0.65, top: 30, pad: 24, lh: 0.9, anim: 'none' };
  var PRESETS = {
    'Quiet note (earlier)': { font: 'Fraunces (site serif)', size: 20, weight: 400, italic: true, align: 'left', opacity: 1, top: 24, lh: 1.3 },
    'Chosen (current)': {},
    'Editorial headline': { font: 'Instrument Serif', size: 44, weight: 400, italic: false, lh: 1.02, tracking: -0.01, top: 22 },
    'Small label': { font: 'Hanken Grotesk (site sans)', size: 12, weight: 600, italic: false, tcase: 'uppercase', tracking: 0.22, opacity: 0.8 },
    'Handwritten': { font: 'Caveat (handwritten)', size: 34, weight: 600, italic: false, align: 'center', lh: 1.1, top: 28 },
    'Terminal': { font: 'Space Mono', size: 13, weight: 400, italic: false, tcase: 'lowercase', anim: 'pulse', tracking: 0.02 },
    'Poster': { font: 'DM Serif Display', size: 36, weight: 400, italic: false, align: 'center', lh: 1.05, top: 26 },
    'Whisper': { font: 'Cormorant Garamond', size: 28, weight: 400, italic: true, align: 'center', opacity: 0.7, anim: 'fade-up', top: 30 },
    'Bold geometric': { font: 'Syne (bold geometric)', size: 26, weight: 700, italic: false, tcase: 'uppercase', tracking: 0.04, lh: 1.05 }
  };

  var cfg = Object.assign({}, DEF);
  try { var sv = JSON.parse(localStorage.getItem(KEY)); if (sv) cfg = Object.assign({}, DEF, sv); } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cfg)); } catch (e) {} render(); }

  var style = document.createElement('style'); document.head.appendChild(style);
  style.textContent =
    '@keyframes wt-fade{from{opacity:0;transform:translateY(10px)}to{opacity:var(--wt-o)}}' +
    '@keyframes wt-letter{from{opacity:0;transform:translateY(0.5em)}to{opacity:1;transform:none}}' +
    '@keyframes wt-pulse{0%,100%{opacity:var(--wt-o)}50%{opacity:calc(var(--wt-o)*0.35)}}' +
    '@keyframes wt-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}' +
    '@keyframes wt-shimmer{from{background-position:120% 0}to{background-position:-120% 0}}';

  function render() {
    var c = cfg;
    node.style.cssText = '';
    node.style.setProperty('--wt-o', c.opacity);
    node.style.fontFamily = FONTS[c.font] || FONTS['Fraunces (site serif)'];
    node.style.fontSize = c.size + 'px';
    node.style.fontWeight = c.weight;
    node.style.fontStyle = c.italic ? 'italic' : 'normal';
    node.style.textTransform = c.tcase;
    node.style.letterSpacing = c.tracking + 'em';
    node.style.textAlign = c.align;
    node.style.lineHeight = c.lh;
    node.style.top = c.top + 'px';
    node.style.left = node.style.right = c.pad + 'px';
    node.style.opacity = c.opacity;
    if (c.colorMode === 'custom') node.style.color = c.color;
    // text
    node.textContent = '';
    if (c.anim === 'letters') {
      var i = 0;
      c.text.split('').forEach(function (ch) {
        var s = document.createElement('span'); s.textContent = ch === ' ' ? ' ' : ch;
        s.style.cssText = 'display:inline-block;opacity:0;animation:wt-letter .7s cubic-bezier(.2,.7,.2,1) ' + (i++ * 0.045) + 's both';
        node.appendChild(s);
      });
    } else node.textContent = c.text;
    var anims = { 'fade-up': 'wt-fade 1.4s ease-out both', pulse: 'wt-pulse 3s ease-in-out infinite', float: 'wt-float 4s ease-in-out infinite' };
    if (anims[c.anim]) node.style.animation = anims[c.anim];
    if (c.anim === 'shimmer') {
      var base = c.colorMode === 'custom' ? c.color : 'currentColor';
      node.style.backgroundImage = 'linear-gradient(100deg,' + (c.colorMode === 'custom' ? c.color : 'var(--text)') + ' 40%,var(--accent) 50%,' + (c.colorMode === 'custom' ? c.color : 'var(--text)') + ' 60%)';
      node.style.backgroundSize = '250% 100%';
      node.style.webkitBackgroundClip = node.style.backgroundClip = 'text';
      node.style.webkitTextFillColor = 'transparent';
      node.style.animation = 'wt-shimmer 3.5s linear infinite';
    }
  }

  var box = document.createElement('div');
  box.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:99999;background:#fff;color:#111;font:12px system-ui,sans-serif;padding:10px;border-radius:10px;box-shadow:0 4px 20px #0004;width:300px;max-height:90vh;overflow:auto';
  document.body.appendChild(box);
  function el(tag, css, text) { var e = document.createElement(tag); if (css) e.style.cssText = css; if (text != null) e.textContent = text; return e; }
  function head(t) { box.appendChild(el('div', 'font-weight:700;margin:10px 0 4px', t)); }
  function seg(label, opts, key) {
    var row = el('div', 'display:flex;align-items:center;gap:4px;margin:5px 0;flex-wrap:wrap');
    row.appendChild(el('span', 'width:64px', label));
    opts.forEach(function (o) {
      var b = el('button', 'padding:3px 7px;cursor:pointer;border:1px solid #aaa;border-radius:5px;background:' + (cfg[key] === o[0] ? '#2c3bb3;color:#fff' : '#f3f3f3'), o[1]);
      b.onclick = function () { cfg[key] = o[0]; save(); build(); }; row.appendChild(b);
    }); return row;
  }
  function slider(label, key, min, max, step, fmt) {
    var d = el('div', 'margin:5px 0'), t = el('div');
    var r = el('input'); r.type = 'range'; r.min = min; r.max = max; r.step = step; r.value = cfg[key]; r.style.width = '100%';
    function show() { t.textContent = label + ': ' + fmt(+r.value); }
    r.oninput = function () { cfg[key] = +r.value; show(); save(); };
    show(); d.appendChild(t); d.appendChild(r); return d;
  }

  function build() {
    box.innerHTML = '';
    box.appendChild(el('b', '', 'Caption editor'));

    head('Text');
    var ta = el('textarea', 'width:100%;box-sizing:border-box;padding:5px;font:13px system-ui'); ta.rows = 2; ta.value = cfg.text;
    ta.oninput = function () { cfg.text = ta.value; save(); };
    box.appendChild(ta);

    head('Presets');
    var pr = el('div', 'display:flex;flex-wrap:wrap;gap:4px');
    Object.keys(PRESETS).forEach(function (n) {
      var b = el('button', 'padding:4px 7px;cursor:pointer;border:1px solid #aaa;border-radius:5px;background:#f3f3f3', n);
      b.onclick = function () { cfg = Object.assign({}, DEF, { text: cfg.text }, PRESETS[n]); save(); build(); };
      pr.appendChild(b);
    }); box.appendChild(pr);

    head('Font');
    var sel = el('select', 'width:100%;padding:4px');
    Object.keys(FONTS).forEach(function (f) { var o = el('option', '', f); o.value = f; if (f === cfg.font) o.selected = true; sel.appendChild(o); });
    sel.onchange = function () { cfg.font = sel.value; save(); }; box.appendChild(sel);
    box.appendChild(slider('Size', 'size', 10, 64, 1, function (v) { return v + ' px'; }));
    box.appendChild(slider('Weight', 'weight', 300, 800, 100, function (v) { return v; }));
    box.appendChild(seg('Style', [[true, 'Italic'], [false, 'Upright']], 'italic'));
    box.appendChild(seg('Case', [['none', 'Aa'], ['uppercase', 'AA'], ['lowercase', 'aa']], 'tcase'));
    box.appendChild(slider('Letter spacing', 'tracking', -0.05, 0.4, 0.01, function (v) { return v.toFixed(2) + ' em'; }));
    box.appendChild(slider('Line height', 'lh', 0.9, 1.8, 0.05, function (v) { return v.toFixed(2); }));

    head('Colour');
    box.appendChild(seg('Mode', [['auto', 'Theme text'], ['custom', 'Custom']], 'colorMode'));
    if (cfg.colorMode === 'custom') {
      var row = el('div', 'display:flex;gap:6px;align-items:center');
      var pick = el('input'); pick.type = 'color'; pick.value = cfg.color; pick.style.cssText = 'width:44px;height:28px;padding:0';
      var hex = el('input', 'width:84px;padding:4px;font:12px monospace'); hex.maxLength = 7; hex.value = cfg.color;
      pick.oninput = function () { hex.value = pick.value; cfg.color = pick.value; save(); };
      hex.oninput = function () { var v = hex.value.trim(); if (v[0] !== '#') v = '#' + v; if (/^#[0-9a-f]{6}$/i.test(v)) { pick.value = v; cfg.color = v; hex.style.outline = ''; save(); } else hex.style.outline = '2px solid #c33'; };
      row.appendChild(pick); row.appendChild(hex); box.appendChild(row);
      box.appendChild(el('div', 'color:#666;margin-top:3px', 'Custom colour is used in both themes.'));
    }
    box.appendChild(slider('Opacity', 'opacity', 0.1, 1, 0.05, function (v) { return Math.round(v * 100) + '%'; }));

    head('Layout');
    box.appendChild(seg('Align', [['left', 'Left'], ['center', 'Center'], ['right', 'Right']], 'align'));
    box.appendChild(slider('From top', 'top', 6, 140, 1, function (v) { return v + ' px'; }));
    box.appendChild(slider('Side padding', 'pad', 6, 80, 1, function (v) { return v + ' px'; }));

    head('Animation');
    box.appendChild(seg('Effect', [['none', 'None'], ['fade-up', 'Fade up'], ['letters', 'Letters'], ['pulse', 'Pulse'], ['float', 'Float'], ['shimmer', 'Shimmer']], 'anim'));
    var rp = el('button', 'margin-top:4px;padding:4px 8px;cursor:pointer', 'Replay'); rp.onclick = render; box.appendChild(rp);

    var row2 = el('div', 'display:flex;gap:6px;margin-top:12px');
    var copy = el('button', 'flex:1;padding:6px;cursor:pointer', 'Copy settings');
    copy.onclick = function () {
      var txt = JSON.stringify(cfg, null, 2);
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { copy.textContent = 'Copied ✓'; }, function () { window.prompt('Copy:', txt); });
      setTimeout(function () { copy.textContent = 'Copy settings'; }, 1500);
    };
    var reset = el('button', 'flex:1;padding:6px;cursor:pointer', 'Reset');
    reset.onclick = function () { cfg = Object.assign({}, DEF); save(); build(); };
    row2.appendChild(copy); row2.appendChild(reset); box.appendChild(row2);
  }
  build(); render();
})();
