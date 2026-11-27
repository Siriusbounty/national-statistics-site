// NusaStat v2 labour view — who works, who is looking for work, and how
// unemployment has moved since 2015.

import { lineChart } from './charts.js';
import { LABOUR_COUNTS, UNEMPLOYMENT } from './data-labour.js';
import { card, chartCard, kpiCard, pageHead } from './shared.js';

export function view() {
  return `
  ${pageHead(
    'Labour',
    'Who works, who is looking for work, and how unemployment has moved.',
  )}
  <div class="kpi-grid">
    ${kpiCard({ label: 'Unemployment', value: '4.91%', detail: 'August 2024 — lowest since 2015', route: '#/labour' })}
    ${kpiCard({ label: 'Working', value: '144.64m', detail: 'People in work, Aug 2024', route: '#/labour' })}
    ${kpiCard({ label: 'Unemployed', value: '7.47m', detail: 'People looking for work, Aug 2024', route: '#/labour' })}
    ${kpiCard({ label: 'Labour force', value: '152.11m', detail: 'Working + unemployed, Aug 2024', route: '#/labour' })}
  </div>
  ${chartCard(
    'Open unemployment rate, August, 2015–2024',
    lineChart(UNEMPLOYMENT, { unit: '%', decimals: 2, color: '#0e7490', area: true }),
    '% of the labour force. The 2020 peak (7.07%) is the pandemic; August 2024 (4.91%) is the lowest August reading in the series. Source: BPS Sakernas.',
  )}
  ${card(
    'Reading the labour market',
    `<ul class="bullets">
      <li><strong>Unemployment fell every year after 2020</strong> — 7.07% (2020) → 6.49% (2021) → 5.86% (2022) → 5.32% (2023) → 4.91% (2024).</li>
      <li><strong>It kept falling into 2025</strong> — the February 2025 round put open unemployment at 4.76%, down from 4.82% in February 2024 (BPS, May 2025).</li>
      <li><strong>Men 4.90%, women 4.92%</strong> in August 2024 — effectively the same rate; urban 5.79%, rural 3.67%.</li>
      <li><strong>The labour force is 152.11 million</strong> (${LABOUR_COUNTS.working}m working + ${LABOUR_COUNTS.unemployed}m unemployed), from the August 2024 Sakernas booklet.</li>
      <li><strong>Unemployment differs sharply by place</strong>: the highest provincial open unemployment rate in the August 2024 round was 6.75%, against a lowest of 1.32%.</li>
    </ul>`,
    'Source: BPS Booklet Sakernas Agustus 2024, Vol. 7 No. 2. Youth and provincial detail as reported in the booklet.',
  )}`;
}

export function wire() {}
