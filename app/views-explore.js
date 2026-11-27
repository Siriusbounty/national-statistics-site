// NusaStat v2 explore view — a searchable index of every indicator on
// the site, with its latest value, period and section, and a button that
// downloads the whole dataset as one CSV. Wired by wire() below.

import { GDP_GROWTH, GDP_LEVEL, GDP_QUARTERLY, TOURISM, TRADE } from './data-economy.js';
import { HDI, POPULATION, PROVINCES } from './data-people.js';
import { INFLATION, POVERTY } from './data-prices.js';
import { UNEMPLOYMENT } from './data-labour.js';
import { downloadCSV, esc, pageHead } from './shared.js';

// One row per indicator: name, latest value, period, where it lives.
const INDICATORS = [
  { name: 'Population', value: '281.6 million', period: 'Mid-2024', route: '#/people', series: POPULATION, unit: 'million people' },
  { name: 'GDP at current prices', value: 'Rp22,139 trillion', period: '2024', route: '#/economy', series: GDP_LEVEL, unit: 'Rp trillion' },
  { name: 'Real GDP growth', value: '5.03%', period: '2024', route: '#/economy', series: GDP_GROWTH, unit: '% yoy' },
  { name: 'Quarterly GDP growth', value: '5.04%', period: 'Q3 2025', route: '#/economy', series: GDP_QUARTERLY, unit: '% yoy' },
  { name: 'GDP per capita', value: 'Rp78.6 million (US$4,960.30)', period: '2024', route: '#/economy', series: null, unit: '' },
  { name: 'Exports', value: 'US$264.70 billion', period: '2024', route: '#/economy', series: TRADE.map((t) => ({ year: t.year, value: t.exports })), unit: 'US$ billion' },
  { name: 'Imports', value: 'US$233.66 billion', period: '2024', route: '#/economy', series: TRADE.map((t) => ({ year: t.year, value: t.imports })), unit: 'US$ billion' },
  { name: 'Trade surplus', value: 'US$31.04 billion', period: '2024', route: '#/economy', series: null, unit: '' },
  { name: 'Foreign visitor arrivals', value: '13.90 million', period: '2024', route: '#/economy', series: TOURISM, unit: 'million arrivals' },
  { name: 'Inflation (CPI, December yoy)', value: '1.57%', period: 'Dec 2024', route: '#/prices', series: INFLATION, unit: '% yoy' },
  { name: 'Poverty rate', value: '8.57%', period: 'Sep 2024', route: '#/prices', series: POVERTY, unit: '% of population' },
  { name: 'Poverty rate, urban', value: '6.66%', period: 'Sep 2024', route: '#/prices', series: null, unit: '' },
  { name: 'Poverty rate, rural', value: '11.34%', period: 'Sep 2024', route: '#/prices', series: null, unit: '' },
  { name: 'Poverty line', value: 'Rp595,242 per capita/month', period: 'Sep 2024', route: '#/prices', series: null, unit: '' },
  { name: 'Gini ratio', value: '0.379', period: 'Sep 2024', route: '#/prices', series: null, unit: '' },
  { name: 'Open unemployment rate', value: '4.91%', period: 'Aug 2024', route: '#/labour', series: UNEMPLOYMENT, unit: '% of labour force' },
  { name: 'People working', value: '144.64 million', period: 'Aug 2024', route: '#/labour', series: null, unit: '' },
  { name: 'People unemployed', value: '7.47 million', period: 'Aug 2024', route: '#/labour', series: null, unit: '' },
  { name: 'Human Development Index', value: '75.90', period: '2025', route: '#/people', series: HDI, unit: 'index' },
  { name: 'Life expectancy at birth', value: '74.47 years', period: '2025', route: '#/people', series: null, unit: '' },
  { name: 'Largest province (Jawa Barat)', value: '50.35 million', period: 'Mid-2024', route: '#/people', series: PROVINCES.map((p) => ({ year: p.name, value: p.pop })), unit: 'million people' },
];

export function view() {
  const rows = INDICATORS.map(
    (d) => `<tr data-name="${esc(d.name.toLowerCase())}">
      <td><a href="${d.route}">${esc(d.name)}</a></td>
      <td class="num"><strong>${esc(d.value)}</strong></td>
      <td>${esc(d.period)}</td></tr>`,
  ).join('');
  return `
  ${pageHead(
    'Explore the data',
    'Every indicator on this site in one searchable list — the latest value, the period it covers, and the section that explains it.',
  )}
  <section class="card">
    <div class="card-head"><h2>All indicators</h2>
      <span class="controls">
        <input id="explore-search" type="search" placeholder="Search indicators… e.g. poverty" aria-label="Search indicators">
      </span>
    </div>
    <p class="table-hint" id="explore-count">Showing ${INDICATORS.length} of ${INDICATORS.length} indicators.</p>
    <div class="table-wrap"><table id="explore-table">
      <thead><tr><th>Indicator</th><th class="num">Latest value</th><th>Period</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
    <p class="source-note">All figures are official BPS releases. Open an indicator to see its chart, history and source.</p>
    <p><button type="button" class="btn primary" id="explore-csv">Download all data (CSV)</button></p>
  </section>`;
}

export function wire(root) {
  const input = root.querySelector('#explore-search');
  const table = root.querySelector('#explore-table');
  const count = root.querySelector('#explore-count');
  const csvBtn = root.querySelector('#explore-csv');
  if (!input || !table) return;
  const tbody = table.querySelector('tbody');
  const rows = [...tbody.querySelectorAll('tr')];

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    const visible = rows.filter((r) => r.dataset.name.includes(q));
    tbody.replaceChildren(...visible);
    count.textContent =
      visible.length === 0
        ? `No indicator matches “${input.value.trim()}”. Try another word.`
        : `Showing ${visible.length} of ${rows.length} indicators.`;
  });

  if (csvBtn) {
    csvBtn.addEventListener('click', () => {
      const out = [['Indicator', 'Period', 'Value', 'Unit']];
      INDICATORS.forEach((d) => {
        if (d.series) {
          d.series.forEach((p) => out.push([d.name, String(p.year), String(p.value), d.unit]));
        } else {
          out.push([d.name, d.period, d.value, d.unit]);
        }
      });
      downloadCSV('nusastat-all-data.csv', out);
    });
  }
}
