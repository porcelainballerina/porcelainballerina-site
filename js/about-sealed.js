// About letters stay sealed in the entrance-letter style. No code entry, no open.
const LATER = 'The letter stays sealed. Come back later to open it.';

function hold(env) {
  if (!env || !env.hasAttribute('data-sealed-later')) return;
  env.classList.add('is-later-told');
  env.classList.remove('is-asking', 'is-warned', 'is-breaking', 'is-open');
  const status = env.querySelector('.pk-later');
  if (status) status.textContent = LATER;
  const packet = env.querySelector('.wg-env');
  if (packet) packet.setAttribute('aria-expanded', 'false');
}

document.addEventListener('click', (e) => {
  const t = e.target;
  if (!(t && t.closest)) return;
  const env = t.closest('[data-envelope][data-sealed-later]');
  if (!env) return;
  if (t.closest('.wg-env, .ms-env-stage')) {
    e.preventDefault();
    e.stopImmediatePropagation();
    hold(env);
  }
}, true);

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const t = e.target;
  const env = t && t.closest && t.closest('[data-envelope][data-sealed-later]');
  if (!env) return;
  if (t.closest('.wg-env')) {
    e.preventDefault();
    e.stopImmediatePropagation();
    hold(env);
  }
}, true);

const leaves = document.querySelector('.ms-leaves');
if (leaves && 'IntersectionObserver' in window) {
  new IntersectionObserver((entries) => {
    document.body.classList.toggle('ms-letters-near', entries.some((en) => en.isIntersecting));
  }, { rootMargin: '0px 0px 0px 0px', threshold: 0 }).observe(leaves);
}
