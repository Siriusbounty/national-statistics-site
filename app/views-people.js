// NusaStat v2 people view — 281.6 million people across 38 provinces.
// Population and HDI charts, plus the ten largest provinces in a table
// you can search, sort, filter by island and download as CSV. Wired by
// wire() below.

import { hbarChart, lineChart } from './charts.js';
import { HDI, POPULATION, PROVINCES } from './data-people.js';
import { chartCard, downloadCSV, esc, kpiCard, pageHead } from './shared.js';

export function view() {
  const rows = PROVINCES.map(
    (p, i) => `<tr data-name="${esc(p.name.toLowerCase())}" data-pop="${p.pop}" data-density="${p.density}" data-island="${esc(p.island)}">
      <td>${i + 1}</td><td>${esc(p.name)}</td><td>${esc(p.island)}</td>
      <td class="num">${p.pop.toFixed(2)}</td><td class="num">${p.share.toFixed(2)}%</td>
      <td class="num">${p.density.toLocaleString('en-US')}</td></tr>`,
  ).join('');
  // The ten rows are only a slice of the country: show what they add up
  // to, so the table answers "how much of Indonesia is this?" at a glance.
  const topPop = PROVINCES.reduce((s, p) => s + p.pop, 0);
  const topShare = PROVINCES.reduce((s, p) => s + p.share, 0);
  const foot = `<tr class="total-row"><td></td><td><strong>Top 10 combined</strong></td><td></td>
      <td class="num"><strong>${topPop.toFixed(2)}</strong></td><td class="num"><strong>${topShare.toFixed(2)}%</strong></td>
      <td class="num">—</td></tr>`;
  return `
  ${pageHead(
    'People',
    '281.6 million people across 38 provinces — who they are, where they live, and how healthy and educated they are.',
  )}
  <div class="kpi-grid">
    ${kpiCard({ label: 'Population', value: '281.6m', detail: 'Mid-2024, +1.04% on 2023', route: '#/people' })}
    ${kpiCard({ label: 'Life expectancy', value: '74.47 yrs', detail: 'At birth, 2025', route: '#/people' })}
    ${kpiCard({ label: 'HDI', value: '75.90', detail: '"High" — up every year since 2020', route: '#/people' })}
    ${kpiCard({ label: 'On Java', value: '55.93%', detail: 'Share of the population', route: '#/people' })}
  </div>
  <div class="two-col">
    ${chartCard(
      'Population, 2010–2024',
      lineChart(POPULATION, { unit: 'm', decimals: 1, area: true }),
      'Million people. Censuses 2010 (237.64m) and 2020 (270.20m); mid-year estimates 2022–2024. Source: BPS.',
    )}
    ${chartCard(
      'Human Development Index, 2020–2025',
      lineChart(HDI, { unit: '', decimals: 2, color: '#15803d', area: true }),
      'BPS composite of health, education and living standards; 70–80 counts as "High". 2025: 75.90. Source: BPS, 5 Nov 2025.',
    )}
  </div>
  <section class="card">
    <div class="card-head"><h2>Ten largest provinces, 2024</h2>
      <span class="controls">
        <input id="prov-search" type="search" placeholder="Search a province…" aria-label="Search provinces">
        <select id="prov-sort" aria-label="Sort provinces">
          <option value="pop-desc">Population: high to low</option>
          <option value="pop-asc">Population: low to high</option>
          <option value="density-desc">Density: high to low</option>
          <option value="name">Name A–Z</option>
        </select>
      </span>
    </div>
    <div class="chip-row" role="group" aria-label="Filter by island">
      <button type="button" class="chip active" data-island="">All islands</button>
      <button type="button" class="chip" data-island="Jawa">Jawa</button>
      <button type="button" class="chip" data-island="Sumatera">Sumatera</button>
      <button type="button" class="chip" data-island="Sulawesi">Sulawesi</button>
    </div>
    <p class="table-hint" id="prov-count">Showing 10 of 10 provinces. Type to filter, or change the sort order.</p>
    <div class="table-wrap"><table id="prov-table">
      <thead><tr><th>#</th><th>Province</th><th>Island</th><th class="num">People (m)</th><th class="num">Share</th><th class="num">Density /km²</th></tr></thead>
      <tbody>${rows}</tbody>
      <tfoot>${foot}</tfoot>
    </table></div>
    <p class="source-note">Mid-2024 estimates, million people; density is people per km². Source: BPS, Jumlah Penduduk menurut Provinsi 2024.</p>
    <p><button type="button" class="btn" id="prov-csv">Download this table (CSV)</button></p>
  </section>
  ${chartCard(
    'Largest provinces by population',
    hbarChart(PROVINCES, {}),
    'Million people, mid-2024. Jawa Barat alone holds 17.88% of the country — more than any province outside Java by a factor of three. Source: BPS.',
  )}`;
}

export function wire(root) {
  const input = root.querySelector('#prov-search');
  const sort = root.querySelector('#prov-sort');
  const table = root.querySelector('#prov-table');
  const count = root.querySelector('#prov-count');
  const chips = root.querySelectorAll('.chip');
  const csvBtn = root.querySelector('#prov-csv');
  if (!input || !sort || !table) return;
  const tbody = table.querySelector('tbody');
  const rows = [...tbody.querySelectorAll('tr')];
  let island = '';

  function apply() {
    const q = input.value.trim().toLowerCase();
    const mode = sort.value;
    const visible = rows
      .filter((r) => r.dataset.name.includes(q) && (!island || r.dataset.island === island))
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
        ? `No province matches. Clear the search or pick another island to see all 10.`
        : `Showing ${visible.length} of ${rows.length} provinces. Type to filter, or change the sort order.`;
  }

  input.addEventListener('input', apply);
  sort.addEventListener('change', apply);
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      island = chip.dataset.island;
      apply();
    });
  });
  if (csvBtn) {
    csvBtn.addEventListener('click', () => {
      downloadCSV('nusastat-provinces-2024.csv', [
        ['Province', 'Island', 'Population (million)', 'Share of population (%)', 'Density (people per km2)'],
        ...PROVINCES.map((p) => [p.name, p.island, p.pop, p.share, p.density]),
      ]);
    });
  }
}
