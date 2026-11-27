// NusaStat v2 router — hash routes, one page module per section. Each
// section is loaded only when the visitor opens it (dynamic import), so
// the first load is just the home page: index.html, style.css, this file
// and the home module with its data. After each render it calls the
// page's wire() to switch on that page's controls. Nothing here fetches
// anything: the whole site is its own files.

import { NAV } from './shared.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav');
const year = document.getElementById('year');
const themeBtn = document.getElementById('theme-toggle');

// One loader per route; the module path is a plain string, so the gate's
// dossier scan follows it into "Loaded later by import()".
const LOADERS = {
  '': () => import('./views-home.js'),
  economy: () => import('./views-economy.js'),
  people: () => import('./views-people.js'),
  prices: () => import('./views-prices.js'),
  labour: () => import('./views-labour.js'),
  explore: () => import('./views-explore.js'),
  sources: () => import('./views-sources.js'),
};

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return hash.split('?')[0].split('/')[0];
}

function renderNav(route) {
  nav.innerHTML = NAV.map(
    (n) =>
      `<a href="#/${n.route}" class="${n.route === route ? 'active' : ''}" ${
        n.route === route ? 'aria-current="page"' : ''
      }>${n.label}</a>`,
  ).join('');
}

async function render() {
  const route = currentRoute();
  const known = Object.prototype.hasOwnProperty.call(LOADERS, route);
  const key = known ? route : '';
  renderNav(key);
  try {
    const mod = await LOADERS[key]();
    app.innerHTML = mod.view();
    if (typeof mod.wire === 'function') mod.wire(app);
  } catch {
    app.innerHTML =
      '<div class="page-head"><h1>Page not available</h1>' +
      '<p class="lede">That section could not be loaded. ' +
      '<a href="#/">Back to Home</a>.</p></div>';
  }
  document.title = `NusaStat — ${NAV.find((n) => n.route === key)?.label || 'Home'} · Indonesia in numbers`;
  window.scrollTo(0, 0);
}

// Dark mode: a plain class on <html>, remembered in localStorage when the
// browser allows it. The site defaults to light so screenshots match.
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (themeBtn) themeBtn.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
}

let storedTheme = 'light';
try {
  storedTheme = window.localStorage.getItem('nusastat-theme') || 'light';
} catch {
  storedTheme = 'light';
}
applyTheme(storedTheme === 'dark' ? 'dark' : 'light');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      window.localStorage.setItem('nusastat-theme', next);
    } catch {
      // Private mode or blocked storage: the theme still switches for now.
    }
  });
}

window.addEventListener('hashchange', render);
if (year) year.textContent = new Date().getFullYear();
render();
