 // Mark the page as ready, triggering animations
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('is-loaded');

    // Optional: auto-stagger items inside any [data-reveal-group]
    document.querySelectorAll('[data-reveal-group]').forEach(group => {
      group.querySelectorAll('.reveal').forEach((el, i) => {
        el.style.setProperty('--reveal-delay', `${i * 120}ms`);
      });
    });
  });


  document.addEventListener('DOMContentLoaded', () => {
  const els = document.querySelectorAll('.reveal-on-scroll');

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // reveal once; remove next line to allow re-animating on re-entry
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,           // 15% visible triggers
    rootMargin: '0px 0px -10%' // start a bit before full visibility
  });

  els.forEach(el => io.observe(el));
});


(() => {
  const triggers = document.querySelectorAll('nav .has-dropdown > a');

  const closeAll = () => {
    document.querySelectorAll('nav .has-dropdown.open').forEach(li => {
      li.classList.remove('open');
      const a = li.querySelector(':scope > a');
      a && a.setAttribute('aria-expanded', 'false');
    });
  };

  // click/tap to toggle
  triggers.forEach(a => {
    a.addEventListener('click', (e) => {
      const li = a.parentElement;
      const isOpen = li.classList.contains('open');
      const href = a.getAttribute('href') || '';
      const isTouch = window.matchMedia('(hover: none)').matches || window.innerWidth <= 1024;

      // First tap on touch screens (or if href is "#") just opens the menu
      if (!isOpen && (isTouch || href === '#' )) {
        e.preventDefault();
        closeAll();
        li.classList.add('open');
        a.setAttribute('aria-expanded', 'true');
        return;
      }

      // If already open and href is a real URL, let it navigate
      if (isOpen && href && href !== '#') {
        // allow navigation
        return;
      }

      // Toggle close on second tap if no real href
      if (href === '#') {
        e.preventDefault();
        li.classList.toggle('open');
        a.setAttribute('aria-expanded', li.classList.contains('open') ? 'true' : 'false');
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) closeAll();
  });

  // Prevent outside-click handler from firing when clicking inside the dropdown
  document.querySelectorAll('nav .dropdown').forEach(ul => {
    ul.addEventListener('click', (e) => e.stopPropagation());
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
})();


// count up animation //

