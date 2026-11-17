(() => {
  // Mobile navigation
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  // Highlight the nav link for the section in view
  const links = new Map([...nav.querySelectorAll('a:not(.btn)')].map((a) => [a.hash.slice(1), a]));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.remove('is-active'));
      links.get(entry.target.id)?.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((_, id) => { const el = document.getElementById(id); if (el) observer.observe(el); });

  // Gallery lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox.querySelector('img');
  document.querySelectorAll('.gallery__item').forEach((item) => {
    item.addEventListener('click', (e) => {
      if (typeof lightbox.showModal !== 'function') return; // fall back to opening the image
      e.preventDefault();
      const img = item.querySelector('img');
      lbImg.src = item.href;
      lbImg.alt = img.alt;
      lightbox.showModal();
    });
  });
  lightbox.querySelector('.lightbox__close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.close(); });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
})();
