(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;
  let current = 0;
  let timer = null;

  function show(i) {
    const next = (i + total) % total;
    slides.forEach((s, idx) => {
      const active = idx === next;
      s.classList.toggle('is-active', active);
      const v = s.querySelector('video');
      if (!v) return;
      if (active) {
        v.currentTime = 0;
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } else {
        v.pause();
      }
    });
    current = next;
  }

  function scheduleAuto() {
    clearTimeout(timer);
    timer = setTimeout(() => show(current + 1), 7000);
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.arrow');
    if (!btn) return;
    const dir = btn.dataset.dir === 'next' ? 1 : -1;
    show(current + dir);
    scheduleAuto();
  });

  // keyboard nav
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { show(current + 1); scheduleAuto(); }
    if (e.key === 'ArrowLeft')  { show(current - 1); scheduleAuto(); }
  });

  // pause autoplay on hover
  const wrap = document.querySelector('.carousel-wrap');
  if (wrap) {
    wrap.addEventListener('mouseenter', () => clearTimeout(timer));
    wrap.addEventListener('mouseleave', scheduleAuto);
  }

  show(0);
  scheduleAuto();
})();
