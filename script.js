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

  if (button) {
    button.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
      renderToggle();
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
