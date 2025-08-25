(function onReady(fn){
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else { fn(); }
})(function initCountups() {
  const els = document.querySelectorAll('.countup');
  if (!els.length) return;

  // Easing: fast start, smooth landing
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  // Parse number from text or data-target; keep "+" suffix if present
  function parseFromElement(el) {
    const raw = (el.dataset.target ?? el.textContent ?? '').trim();
    const hasPlus = /\+$/.test(raw) || el.dataset.suffix === '+';
    const suffix = el.dataset.suffix ?? (hasPlus ? '+' : '');
    const numStr = String(raw).replace(/[^\d.]/g, ''); // keep digits/decimal
    const decimals = el.dataset.decimals !== undefined
      ? parseInt(el.dataset.decimals, 10)
      : (numStr.split('.')[1] || '').length;

    const target = parseFloat(el.dataset.target ?? (numStr || '0')) || 0;

    // Optional starting value
    const start = parseFloat(el.dataset.start ?? '0') || 0;

    // Duration (ms)
    const duration = parseInt(el.dataset.duration ?? '1200', 10);

    return { start, target, suffix, decimals, duration };
  }

  // Format with locale separators and fixed decimals
  function format(n, decimals) {
    return n.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function animate(el) {
    const { start, target, suffix, decimals, duration } = parseFromElement(el);

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = format(target, decimals) + (suffix || '');
      return;
    }

    let startTime = null;
    const pow = Math.pow(10, decimals || 0);

    function step(ts) {
      if (!startTime) startTime = ts;
      const t = Math.min((ts - startTime) / Math.max(duration, 1), 1);
      const eased = easeOutCubic(t);
      const current = start + (target - start) * eased;

      // Avoid showing 23, - then 24 with decimals: round down until final frame
      const shown = (t < 1) ? Math.floor(current * pow) / pow : target;

      el.textContent = format(shown, decimals) + (suffix || '');
      if (t < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // Start animation when element enters viewport
  const startWhenVisible = el => {
    if (!('IntersectionObserver' in window)) {
      // Fallback: no IO support -> start immediately
      animate(el);
      return;
    }

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target); // run once
        }
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -10%' });

    io.observe(el);
  };

  els.forEach(startWhenVisible);
});