/* TEMPORARY: wave editor. Delete with its <script> in index.astro once settled. */
(function () {
  var W = window.WavesWidget;
  if (!W) return;
  var KEY = 'wavesConfig';
  var cfg = JSON.parse(JSON.stringify(W.defaults));
  try { var s = localStorage.getItem(KEY); if (s) cfg = JSON.parse(s); } catch (e) {}
  function commit() { try { localStorage.setItem(KEY, JSON.stringify(cfg)); } catch (e) {} W.update(cfg); }

  var box = document.createElement('div');
  box.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:99999;background:#fff;color:#111;font:12px system-ui,sans-serif;padding:10px;border-radius:10px;box-shadow:0 4px 20px #0004;width:300px;max-height:90vh;overflow:auto';
  document.body.appendChild(box);
  var openCards = {};

  function el(tag, css, text) { var e = document.createElement(tag); if (css) e.style.cssText = css; if (text != null) e.textContent = text; return e; }

  function colour(label, value, onChange) {
    var row = el('div', 'display:flex;align-items:center;gap:6px;margin:4px 0');
    row.appendChild(el('span', 'width:74px', label));
    var pick = el('input'); pick.type = 'color'; pick.value = value; pick.style.cssText = 'width:36px;height:26px;padding:0;border:1px solid #ccc';
    var hex = el('input', 'width:76px;padding:3px;font:12px monospace'); hex.type = 'text'; hex.maxLength = 7; hex.value = value;
    pick.oninput = function () { hex.value = pick.value; onChange(pick.value); };
    hex.oninput = function () {
      var v = hex.value.trim(); if (v[0] !== '#') v = '#' + v;
      if (/^#[0-9a-f]{6}$/i.test(v)) { pick.value = v; hex.style.outline = ''; onChange(v); } else hex.style.outline = '2px solid #c33';
    };
    row.appendChild(pick); row.appendChild(hex); return row;
  }
  function slider(label, obj, key, min, max, step, fmt) {
    var d = el('div', 'margin:5px 0');
    var t = el('div');
    var r = el('input'); r.type = 'range'; r.min = min; r.max = max; r.step = step; r.value = obj[key]; r.style.width = '100%';
    function show() { t.textContent = label + ': ' + fmt(+r.value); }
    r.oninput = function () { obj[key] = +r.value; show(); commit(); };
    show(); d.appendChild(t); d.appendChild(r); return d;
  }
  function seg(label, options, get, set) {
    var row = el('div', 'display:flex;align-items:center;gap:6px;margin:5px 0');
    row.appendChild(el('span', 'width:74px', label));
    options.forEach(function (o) {
      var b = el('button', 'padding:3px 8px;cursor:pointer;border:1px solid #aaa;border-radius:5px;background:' + (get() === o[0] ? '#2c3bb3;color:#fff' : '#f3f3f3'), o[1]);
      b.onclick = function () { set(o[0]); commit(); build(); };
      row.appendChild(b);
    });
    return row;
  }

  var dragFrom = null;

  function waveCard(wv, i) {
    var card = el('div', 'border:1px solid #ccc;border-radius:8px;margin:6px 0;background:#fafafa');
    var head = el('div', 'display:flex;align-items:center;gap:6px;padding:5px 6px;cursor:default');
    var handle = el('span', 'cursor:grab;font-size:16px;padding:0 4px;user-select:none', '⠿');
    handle.title = 'Drag to reorder';
    handle.onmousedown = function () { card.draggable = true; };
    handle.onmouseup = function () { card.draggable = false; };
    var chip = el('span', 'width:14px;height:14px;border-radius:3px;border:1px solid #0003;background:' + wv.color);
    var name = el('span', 'flex:1;font-weight:600', 'Wave ' + (i + 1) + (i === 0 ? ' · front' : i === cfg.waves.length - 1 ? ' · back' : ''));
    var tog = el('button', 'cursor:pointer', openCards[wv._id] ? '▾' : '▸');
    var dup = el('button', 'cursor:pointer', '⧉'); dup.title = 'Duplicate';
    var del = el('button', 'cursor:pointer;color:#c33', '✕'); del.title = 'Delete';
    tog.onclick = function () { openCards[wv._id] = !openCards[wv._id]; build(); };
    dup.onclick = function () { var c = JSON.parse(JSON.stringify(wv)); c._id = Math.random(); cfg.waves.splice(i, 0, c); commit(); build(); };
    del.onclick = function () { cfg.waves.splice(i, 1); commit(); build(); };
    [handle, chip, name, tog, dup, del].forEach(function (n) { head.appendChild(n); });
    card.appendChild(head);

    card.ondragstart = function (e) { dragFrom = i; e.dataTransfer.effectAllowed = 'move'; card.style.opacity = '0.4'; };
    card.ondragend = function () { card.draggable = false; card.style.opacity = ''; dragFrom = null; };
    card.ondragover = function (e) { if (dragFrom !== null) { e.preventDefault(); card.style.outline = '2px dashed #2c3bb3'; } };
    card.ondragleave = function () { card.style.outline = ''; };
    card.ondrop = function (e) {
      e.preventDefault(); card.style.outline = '';
      if (dragFrom === null || dragFrom === i) return;
      var m = cfg.waves.splice(dragFrom, 1)[0];
      cfg.waves.splice(i, 0, m);
      dragFrom = null; commit(); build();
    };

    if (openCards[wv._id]) {
      var body = el('div', 'padding:4px 10px 8px');
      body.appendChild(colour('Fill', wv.color, function (v) { wv.color = v; chip.style.background = v; commit(); }));
      body.appendChild(seg('Direction', [[1, '→ L to R'], [-1, '← R to L']], function () { return wv.dir; }, function (v) { wv.dir = v; }));
      body.appendChild(seg('Function', [['sin', 'sin'], ['cos', 'cos']], function () { return wv.fn; }, function (v) { wv.fn = v; }));
      body.appendChild(slider('Speed', wv, 'speed', 0, 200, 1, function (v) { return v + ' px/s'; }));
      body.appendChild(slider('Magnitude (height)', wv, 'amp', 0, 60, 1, function (v) { return v + ' px'; }));
      body.appendChild(slider('Wavelength', wv, 'len', 20, 600, 5, function (v) { return v + ' px'; }));
      body.appendChild(slider('Baseline (from top)', wv, 'base', 0, 100, 1, function (v) { return v + '%'; }));
      body.appendChild(slider('Phase', wv, 'phase', 0, 6.28, 0.05, function (v) { return v.toFixed(2) + ' rad'; }));
      body.appendChild(slider('Opacity', wv, 'opacity', 0.05, 1, 0.05, function (v) { return Math.round(v * 100) + '%'; }));
      card.appendChild(body);
    }
    return card;
  }

  function build() {
    box.innerHTML = '';
    box.appendChild(el('b', '', 'Wave panel editor'));
    box.appendChild(el('div', 'color:#666;margin:2px 0 6px', 'Top of the list is drawn in front. Drag ⠿ to reorder.'));

    box.appendChild(colour('Bg (light)', cfg.bgLight, function (v) { cfg.bgLight = v; commit(); }));
    box.appendChild(colour('Bg (dark)', cfg.bgDark, function (v) { cfg.bgDark = v; commit(); }));
    box.appendChild(slider('Panel height', cfg, 'height', 80, 360, 5, function (v) { return v + ' px'; }));
    box.appendChild(slider('Corner radius', cfg, 'radius', 0, 24, 1, function (v) { return v + ' px'; }));

    cfg.waves.forEach(function (wv) { if (!wv._id) wv._id = Math.random(); });
    var list = el('div', 'margin-top:8px');
    cfg.waves.forEach(function (wv, i) { list.appendChild(waveCard(wv, i)); });
    box.appendChild(list);

    var add = el('button', 'width:100%;padding:6px;cursor:pointer;margin-top:4px', '+ Add wave');
    add.onclick = function () {
      var n = { _id: Math.random(), color: '#8a7a5a', opacity: 0.6, fn: 'sin', dir: 1, speed: 40, amp: 10, len: 150, base: 60, phase: 0 };
      cfg.waves.unshift(n); openCards[n._id] = true; commit(); build();
    };
    box.appendChild(add);

    var row = el('div', 'display:flex;gap:6px;margin-top:8px');
    var copy = el('button', 'flex:1;padding:6px;cursor:pointer', 'Copy settings');
    copy.onclick = function () {
      var clean = JSON.parse(JSON.stringify(cfg)); clean.waves.forEach(function (x) { delete x._id; });
      var txt = JSON.stringify(clean, null, 2);
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { copy.textContent = 'Copied ✓'; }, function () { window.prompt('Copy:', txt); });
      setTimeout(function () { copy.textContent = 'Copy settings'; }, 1500);
    };
    var reset = el('button', 'flex:1;padding:6px;cursor:pointer', 'Reset');
    reset.onclick = function () { cfg = JSON.parse(JSON.stringify(W.defaults)); openCards = {}; commit(); build(); };
    row.appendChild(copy); row.appendChild(reset); box.appendChild(row);
  }

  build();
  commit();
})();
