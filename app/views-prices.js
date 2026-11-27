// NusaStat v2 prices & poverty view — what prices did, how many people
// live below the poverty line, and how poverty splits between city and
// countryside.

import { barChart, lineChart } from './charts.js';
import { INFLATION, POVERTY, POVERTY_AREA } from './data-prices.js';
import { card, chartCard, kpiCard, pageHead } from './shared.js';

export function view() {
  return `
  ${pageHead(
    'Prices & poverty',
    'What prices did, and how many people live below the poverty line.',
  )}
  <div class="kpi-grid">
    ${kpiCard({ label: 'Inflation', value: '1.57%', detail: 'Yoy, Dec 2024 — inside target', route: '#/prices' })}
    ${kpiCard({ label: 'Poverty rate', value: '8.57%', detail: 'Sep 2024 — lowest on record', route: '#/prices' })}
    ${kpiCard({ label: 'Poverty line', value: 'Rp595,242', detail: 'Per capita per month, Sep 2024', route: '#/prices' })}
    ${kpiCard({ label: 'Gini ratio', value: '0.379', detail: 'Expenditure inequality, Sep 2024', route: '#/prices' })}
  </div>
  <div class="two-col">
    ${chartCard(
      'Inflation, December year on year, 2015–2024',
      lineChart(INFLATION, { unit: '%', decimals: 2, color: '#0e7490', area: true }),
      'Consumer Price Index, % change on the same month a year earlier. The 2022 spike (5.51%) followed the fuel-price adjustment; 2024 (1.57%) sat at the bottom of the 2.5% ± 1% target band. Source: BPS.',
    )}
    ${chartCard(
      'Poverty rate, September, 2015–2024',
      lineChart(POVERTY, { unit: '%', decimals: 2, color: '#b45309', area: true }),
      '% of population below the poverty line. The 2020 rise (10.19%) is the pandemic; September 2024 (8.57%) is the lowest BPS has recorded. Source: BPS Susenas.',
    )}
  </div>
  ${chartCard(
    'Poverty by area, September 2024',
    barChart(POVERTY_AREA, { unit: '%', color: '#0e7490' }),
    '% of the population below the poverty line. Rural poverty (11.34%) runs almost twice the urban rate (6.66%). Source: BPS, 15 Jan 2025.',
  )}
  ${card(
    'What the poverty numbers mean',
    `<ul class="bullets">
      <li><strong>24.06 million people</strong> were poor in September 2024 — 1.16 million fewer than in March 2024 and 1.84 million fewer than in March 2023.</li>
      <li><strong>Urban poverty 6.66%</strong>, down from 7.09% in March 2024; rural poverty was 11.34% — the gap between city and countryside is where most remaining poverty sits.</li>
      <li><strong>The poverty line was Rp595,242</strong> per capita per month — Rp443,433 food (74.50%) and Rp151,809 non-food (25.50%).</li>
      <li><strong>Depth of poverty fell too</strong>: the poverty gap index was 1.364 in September 2024, down from 1.461 in March 2024.</li>
      <li><strong>Inequality is flat</strong>: the Gini ratio was 0.379 in September 2024, barely moved from 0.379 a year earlier.</li>
    </ul>`,
    'Source: BPS Berita Resmi Statistik No. 07/01/Th. XXVIII, 15 January 2025.',
  )}`;
}

export function wire() {}
