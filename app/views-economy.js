// NusaStat v2 economy view — how big the economy is, how fast it grows
// quarter by quarter, what Indonesia buys and sells abroad, and how
// tourism has recovered since the pandemic. The growth chart toggles
// between the growth rate and the GDP level; wired by wire() below.

import { barChart, groupedBars, lineChart } from './charts.js';
import { GDP_GROWTH, GDP_LEVEL, GDP_QUARTERLY, TOURISM, TRADE } from './data-economy.js';
import { card, chartCard, kpiCard, pageHead } from './shared.js';

export function view() {
  return `
  ${pageHead(
    'Economy',
    'How big the economy is, how fast it grows, and what Indonesia buys and sells abroad.',
  )}
  <div class="kpi-grid">
    ${kpiCard({ label: 'GDP, 2024', value: 'Rp22,139tn', detail: 'Current prices', route: '#/economy' })}
    ${kpiCard({ label: 'GDP per capita', value: 'Rp78.6m', detail: 'US$4,960.30, 2024', route: '#/economy' })}
    ${kpiCard({ label: 'Growth, 2024', value: '5.03%', detail: '2023: 5.05% · 2022: 5.31%', route: '#/economy' })}
    ${kpiCard({ label: 'Trade surplus', value: 'US$31.04bn', detail: '2024 — fifth straight surplus year', route: '#/economy' })}
  </div>
  ${chartCard(
    'Economic growth, 2015–2024',
    barChart(GDP_GROWTH, { unit: '%', negative: '#c2410c' }),
    'Real GDP growth, % year on year. Source: BPS Berita Resmi Statistik, 5 Feb 2025.',
    `<span class="toggle" role="group" aria-label="Growth chart view">
      <button type="button" class="toggle-btn active" data-chart="growth">Growth %</button>
      <button type="button" class="toggle-btn" data-chart="level">GDP level</button>
    </span>`,
  )}
  <div id="growth-alt" hidden>
    ${chartCard(
      'GDP at current prices, 2020–2024',
      barChart(GDP_LEVEL, { unit: ' tn', color: '#0e7490' }),
      'Rp trillion, current prices. Source: BPS.',
    )}
  </div>
  <div class="two-col">
    ${chartCard(
      'Growth by quarter, 2024–2025',
      barChart(GDP_QUARTERLY, { unit: '%', color: '#0e7490' }),
      '% year on year. 2025 has held at or above 5% except Q1 (4.87%). Source: BPS quarterly releases.',
    )}
    ${chartCard(
      'Foreign visitor arrivals, 2019–2024',
      lineChart(TOURISM, { unit: 'm', decimals: 2, color: '#15803d', area: true }),
      'Million arrivals. The 2020–2021 collapse is the pandemic border closure; 2024 (13.90m) is 86% of the 2019 peak. Source: BPS.',
    )}
  </div>
  ${chartCard(
    'Foreign trade, 2021–2024 (US$ billion)',
    groupedBars(
      TRADE,
      [
        { label: 'Exports', color: '#0b5fff', values: TRADE.map((t) => t.exports) },
        { label: 'Imports', color: '#f59e0b', values: TRADE.map((t) => t.imports) },
      ],
      { unit: 'bn' },
    ),
    'Blue: exports; amber: imports. Exports 2024 US$264.70bn (+2.29% yoy); imports US$233.66bn (+5.31%); surplus US$31.04bn. Source: BPS / Ministry of Trade, Jan 2025.',
  )}
  ${card(
    'Reading the numbers',
    `<ul class="bullets">
      <li><strong>Growth has held near 5% for a decade</strong> — every year since 2015 except the pandemic year 2020 (−2.07%) and the 2021 rebound (3.70%).</li>
      <li><strong>2024 slowed a touch</strong> to 5.03% from 5.05% in 2023; the strongest production sector was other services (+9.80%).</li>
      <li><strong>2025 is tracking the same pace</strong> — 4.87% in Q1, 5.12% in Q2 and 5.04% in Q3, all year on year.</li>
      <li><strong>GDP per capita passed US$4,900</strong> — Rp78.6 million per person in 2024, up from Rp75.0 million in 2023 (derived from BPS releases).</li>
      <li><strong>Trade stayed in surplus</strong> for a fifth straight year, though the surplus narrowed from US$36.89bn (2023) to US$31.04bn.</li>
      <li><strong>Tourism is nearly back</strong> — 13.90 million foreign arrivals in 2024, against 16.11 million in 2019 before the pandemic.</li>
    </ul>`,
  )}`;
}

export function wire(root) {
  const buttons = root.querySelectorAll('.toggle-btn');
  const alt = root.querySelector('#growth-alt');
  if (!buttons.length || !alt) return;
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      alt.hidden = btn.dataset.chart !== 'level';
    });
  });
}
