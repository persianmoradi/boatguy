// Site motion, small on purpose: mobile menu, header shadow, scroll-spy, fade-in on view,
// in-page links and the hero quick card. CSS does the animating; nothing follows the mouse.
import Lenis from 'lenis';

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- smooth wheel scroll: desktop mouse only; touch, keyboard, find-in-page and #hash stay native ----------
const lenis =
  !reduced && matchMedia('(hover: hover) and (pointer: fine)').matches
    ? new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, syncTouch: false, anchors: false, autoRaf: true })
    : null;

// ---------- menu: inert while closed, focus trap, Escape, scroll lock, focus back to the toggle ----------
const header = $('[data-header]');
const toggle = $<HTMLButtonElement>('[data-menu-toggle]');
const menu = $('[data-menu]');
menu?.setAttribute('data-lenis-prevent', '');
if (menu) $$('[data-menu-link], .btn', menu).forEach((el, i) => el.style.setProperty('--i', String(i)));
let menuOpen = false;
function setMenu(open: boolean, returnFocus = true) {
  if (!menu || !toggle || open === menuOpen) return;
  menuOpen = open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', (open ? toggle.dataset.openLabel : toggle.dataset.label) ?? '');
  menu.toggleAttribute('inert', !open);
  menu.classList.toggle('is-open', open);
  document.documentElement.style.overflow = open ? 'hidden' : '';
  if (open) lenis?.stop();
  else lenis?.start();
  for (const el of $$('main, footer')) el.toggleAttribute('inert', open);
  if (open) $<HTMLElement>('a', menu)?.focus({ preventScroll: true });
  else if (returnFocus) toggle.focus({ preventScroll: true });
}
toggle?.addEventListener('click', () => setMenu(!menuOpen));
addEventListener('keydown', (e) => {
  if (!menuOpen) return;
  if (e.key === 'Escape') return setMenu(false);
  if (e.key !== 'Tab') return;
  // trap: the toggle and the panel's own controls
  const items = [toggle!, ...$$<HTMLElement>('a, button', menu!)];
  const i = items.indexOf(document.activeElement as HTMLElement);
  const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : i === items.length - 1 ? 0 : i + 1;
  e.preventDefault();
  items[next].focus();
});
// growing past the phone layout with the menu open: let go of the page
matchMedia('(min-width: 1100px)').addEventListener('change', (e) => {
  if (!e.matches) return;
  setMenu(false, false);
  lenis?.start();
});
addEventListener('pageshow', () => {
  setMenu(false, false);
  lenis?.start();
}); // a bfcache restore never shows an open menu

// ---------- in-page links: the target takes focus so keyboard users land there; the menu closes first ----------
const ease = (t: number) => 1 - Math.pow(1 - t, 4);
function scrollToEl(el: HTMLElement, id = '') {
  if (el === document.body) lenis ? lenis.scrollTo(0, { duration: 1.1, easing: ease }) : scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  else {
    // scroll-margin-top on the target keeps it below the header (Lenis reads it too, so no extra offset)
    if (lenis) lenis.scrollTo(el, { duration: 1.1, easing: ease });
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }
  if (id) history.replaceState(null, '', id);
}
$$<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href')!;
    const el = id === '#top' ? document.body : id.length > 1 ? $(id) : null;
    if (!el) return;
    e.preventDefault();
    setMenu(false, false);
    scrollToEl(el, id);
  }),
);

// ---------- header shadow after a few pixels of scroll ----------
const onScroll = () => header?.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- fade-in on view: once, then stop watching ----------
const reveal = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      reveal.unobserve(e.target);
    }),
  { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
);
$$('[data-reveal], [data-fade]').forEach((el) => (reduced ? el.classList.add('is-in') : reveal.observe(el)));

// ---------- current section in the desktop nav ----------
const navLinks = $$<HTMLAnchorElement>('nav .nav-link');
const spy = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((l) => l.classList.toggle('is-current', l.hash === `#${e.target.id}`));
    }),
  { rootMargin: '-45% 0px -50% 0px' },
);
navLinks.forEach((l) => {
  const s = $(l.hash);
  if (s) spy.observe(s);
});

// ---------- hero quick card: copy into the contact form, then go there. No backend. ----------
$<HTMLFormElement>('[data-quick]')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const q = new FormData(e.currentTarget as HTMLFormElement);
  const field = (name: string) => $<HTMLInputElement>(`[data-quote] [name="${name}"]`);
  const model = String(q.get('model') ?? '').trim();
  const length = String(q.get('length') ?? '').trim();
  const pc = String(q.get('postcode') ?? '').trim();
  if (model) field('model')!.value = model;
  if (length) field('length')!.value = length;
  // the postcode has no field of its own: it goes in front of the harbour/location
  const loc = field('location')!;
  if (pc && !loc.value.includes(pc)) loc.value = `${pc} ${loc.value}`.trim();
  scrollToEl($('#contact')!);
  setTimeout(() => field('name')?.focus({ preventScroll: true }), reduced ? 0 : 500);
});

// ---------- FAQ: browsers without ::details-content get a small height animation instead ----------
if (!reduced && !CSS.supports('selector(::details-content)')) {
  $$<HTMLDetailsElement>('.faq-item').forEach((d) =>
    $('summary', d)?.addEventListener('click', (e) => {
      e.preventDefault();
      const from = d.offsetHeight;
      d.open = !d.open;
      const to = d.offsetHeight;
      d.animate({ height: [`${from}px`, `${to}px`] }, { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' });
    }),
  );
}

// ---------- #hash on load: the browser's own jump can be cut short by smooth scrolling and late layout; settle it once ----------
if (location.hash.length > 1) {
  const settle = () => {
    let t: HTMLElement | null = null;
    try { t = $(decodeURIComponent(location.hash)); } catch { /* malformed hash: leave it */ }
    t?.scrollIntoView({ behavior: 'instant', block: 'start' }); // scroll-margin-top clears the header
  };
  const done = () => document.fonts.ready.then(() => { settle(); setTimeout(settle, 400); }); // twice: lazy images still nudge the layout right after load
  document.readyState === 'complete' ? done() : addEventListener('load', done, { once: true });
}
