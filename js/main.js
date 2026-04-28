/* ── Nav scroll effect ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Scroll reveal ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* Trigger hero reveals immediately (above fold) */
document.querySelectorAll('.hero .reveal').forEach(el => {
  el.classList.add('visible');
});

/* ── Animated counters ── */
function animateCounter(el, target, duration = 1200) {
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        el.classList.add('animated');
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

/* ── Smooth active nav link highlight ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--accent-2)'
            : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -40% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));

/* ── Feature card glow on hover ── */
document.querySelectorAll('.feature-card, .result-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

/* ── Typewriter effect on hero subtitle ── */
(function typewriter() {
  const sub = document.querySelector('.hero-sub');
  if (!sub) return;
  const text = sub.textContent;
  sub.textContent = '';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      sub.textContent += text[i++];
      setTimeout(type, i < 60 ? 18 : 8);
    }
  };
  setTimeout(type, 600);
})();

/* ── Parallax on hero glows ── */
window.addEventListener('mousemove', (e) => {
  const { innerWidth: W, innerHeight: H } = window;
  const dx = (e.clientX / W - 0.5) * 30;
  const dy = (e.clientY / H - 0.5) * 20;
  const g1 = document.querySelector('.glow-1');
  const g2 = document.querySelector('.glow-2');
  if (g1) g1.style.transform = `translateX(calc(-50% + ${dx}px)) translateY(${dy}px)`;
  if (g2) g2.style.transform = `translate(${-dx}px, ${-dy}px)`;
}, { passive: true });
