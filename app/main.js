// NusaStat router — hash routes, one page per section. After each render it
// wires the controls that page offers: the economy chart toggle and the
// province search + sort. Nothing here fetches anything: the whole site is
// its own files.

import { NAV, ROUTES } from './views.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav');
const year = document.getElementById('year');

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

function wireEconomy() {
  const buttons = app.querySelectorAll('.toggle-btn');
  const alt = app.querySelector('#growth-alt');
  if (!buttons.length || !alt) return;
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      alt.hidden = btn.dataset.chart !== 'level';
    });
  });
}

function wireProvinces() {
  const input = app.querySelector('#prov-search');
  const sort = app.querySelector('#prov-sort');
  const table = app.querySelector('#prov-table');
  const count = app.querySelector('#prov-count');
  if (!input || !sort || !table) return;
  const tbody = table.querySelector('tbody');
  const rows = [...tbody.querySelectorAll('tr')];

  function apply() {
    const q = input.value.trim().toLowerCase();
    const mode = sort.value;
    const visible = rows
      .filter((r) => r.dataset.name.includes(q))
      .sort((a, b) => {
        if (mode === 'pop-asc') return Number(a.dataset.pop) - Number(b.dataset.pop);
        if (mode === 'density-desc') return Number(b.dataset.density) - Number(a.dataset.density);
        if (mode === 'name') return a.dataset.name.localeCompare(b.dataset.name);
        return Number(b.dataset.pop) - Number(a.dataset.pop);
      });
    // Renumber the rank column to match the current order.
    visible.forEach((r, i) => {
      r.cells[0].textContent = String(i + 1);
    });
    tbody.replaceChildren(...visible);
    count.textContent =
      visible.length === 0
        ? `No province matches “${input.value.trim()}”. Clear the search to see all 10.`
        : `Showing ${visible.length} of ${rows.length} provinces. Type to filter, or change the sort order.`;
  }

  input.addEventListener('input', apply);
  sort.addEventListener('change', apply);
}

function render() {
  const route = currentRoute();
  const view = ROUTES[route] || ROUTES[''];
  app.innerHTML = view();
  renderNav(ROUTES[route] ? route : '');
  document.title = `NusaStat — ${NAV.find((n) => n.route === route)?.label || 'Home'} · Indonesia in numbers`;
  wireEconomy();
  wireProvinces();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
if (year) year.textContent = new Date().getFullYear();
render();
