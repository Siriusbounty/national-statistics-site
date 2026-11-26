// NusaStat views — one function per page. Each returns HTML for #app.
// Charts come from charts.js, figures from data.js. Controls are wired in
// main.js after the HTML lands; every button and input here does something.

import { barChart, groupedBars, hbarChart, lineChart } from './charts.js';
import {
  GDP_GROWTH,
  GDP_LEVEL,
  HDI,
  HEADLINES,
  INFLATION,
  META,
  METHODS,
  POPULATION,
  POVERTY,
  PROVINCES,
  RELEASES,
  SOURCES,
  TRADE,
  UNEMPLOYMENT,
} from './data.js';

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function kpiCard(h) {
  return `<a class="kpi" href="${h.route}">
    <span class="kpi-label">${esc(h.label)}</span>
    <span class="kpi-value">${esc(h.value)}</span>
    <span class="kpi-detail">${esc(h.detail)}</span>
  </a>`;
}

function card(title, body, note = '') {
  return `<section class="card"><h2>${esc(title)}</h2>${body}${
    note ? `<p class="source-note">${esc(note)}</p>` : ''
  }</section>`;
}

function chartCard(title, chartHtml, note, toggle = '') {
  return `<section class="card"><div class="card-head"><h2>${esc(title)}</h2>${toggle}</div>
    <div class="chart">${chartHtml}</div>
    <p class="source-note">${esc(note)}</p></section>`;
}

function pageHead(title, intro) {
  return `<div class="page-head"><h1>${esc(title)}</h1><p class="lede">${esc(intro)}</p></div>`;
}

export function homeView() {
  const cards = HEADLINES.map(kpiCard).join('');
  return `
  <div class="hero">
    <p class="eyebrow">Official statistics · ${esc(META.country)}</p>
    <h1>Indonesia in numbers</h1>
    <p class="lede">Population, economy, prices, jobs and wellbeing — the latest official
    figures from ${esc(META.office)}, explained in plain language and updated
    with each BPS release.</p>
    <div class="hero-actions">
      <a class="btn primary" href="#/economy">Explore the economy</a>
      <a class="btn" href="#/people">See the provinces</a>
    </div>
  </div>
  <div class="kpi-grid">${cards}</div>
  ${chartCard(
    'Economic growth, 2015–2024',
    barChart(GDP_GROWTH, { unit: '%', negative: '#c2410c' }),
    'Real GDP growth, year on year. The 2020 bar is the pandemic contraction (−2.07%). Source: BPS, 5 Feb 2025.',
  )}
  <div class="two-col">
    ${chartCard(
      'Population, 2010–2024',
      lineChart(POPULATION, { unit: 'm', decimals: 1 }),
      'Million people. Censuses 2010 and 2020; mid-year estimates after. Source: BPS.',
    )}
    ${card(
      'Latest releases',
      `<ul class="releases">${RELEASES.slice(0, 4)
        .map(
          (r) =>
            `<li><span class="rel-date">${esc(r.date)}</span><strong>${esc(r.title)}</strong><span>${esc(r.text)}</span></li>`,
        )
        .join('')}</ul><p><a href="#/sources">All sources &amp; methods →</a></p>`,
    )}
  </div>
  ${card(
    'Where Indonesians live',
    `<p class="big-stat"><strong>55.93%</strong> of the population lives on Java — an island
    of about 132,600 km² holding 157.4 million people. The three most populous provinces
    (Jawa Barat, Jawa Timur, Jawa Tengah) alone hold <strong>130.2 million</strong> people,
    46% of the country.</p>
    <p><a href="#/people">Compare all ten largest provinces →</a></p>`,
    'Sources: BPS mid-2024 estimates; Ditjen Dukcapil Semester I 2024.',
  )}`;
}

export function economyView() {
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
    'Exports 2024 US$264.70bn (+2.29% yoy); imports US$233.66bn (+5.31%); surplus US$31.04bn. Source: BPS / Ministry of Trade, Jan 2025.',
  )}
  ${card(
    'Reading the numbers',
    `<ul class="bullets">
      <li><strong>Growth has held near 5% for a decade</strong> — every year since 2015 except the pandemic year 2020 (−2.07%) and the 2021 rebound (3.70%).</li>
      <li><strong>2024 slowed a touch</strong> to 5.03% from 5.05% in 2023; the strongest production sector was other services (+9.80%).</li>
      <li><strong>GDP per capita passed US$4,900</strong> — Rp78.6 million per person in 2024, up from Rp75.0 million in 2023 (derived from BPS releases).</li>
      <li><strong>Trade stayed in surplus</strong> for a fifth straight year, though the surplus narrowed from US$36.89bn (2023) to US$31.04bn.</li>
    </ul>`,
  )}`;
}

export function peopleView() {
  const rows = PROVINCES.map(
    (p, i) => `<tr data-name="${esc(p.name.toLowerCase())}" data-pop="${p.pop}" data-density="${p.density}">
      <td>${i + 1}</td><td>${esc(p.name)}</td><td>${esc(p.island)}</td>
      <td class="num">${p.pop.toFixed(2)}</td><td class="num">${p.share.toFixed(2)}%</td>
      <td class="num">${p.density.toLocaleString('en-US')}</td></tr>`,
  ).join('');
  return `
  ${pageHead(
    'People',
    '281.6 million people across 38 provinces — who they are, where they live, and how healthy and educated they are.',
  )}
  <div class="kpi-grid">
    ${kpiCard({ label: 'Population', value: '281.6m', detail: 'Mid-2024, +1.04% on 2023', route: '#/people' })}
    ${kpiCard({ label: 'Life expectancy', value: '74.15 yrs', detail: 'At birth, 2024', route: '#/people' })}
    ${kpiCard({ label: 'HDI', value: '75.02', detail: '"High" — up every year since 2020', route: '#/people' })}
    ${kpiCard({ label: 'On Java', value: '55.93%', detail: 'Share of the population', route: '#/people' })}
  </div>
  ${chartCard(
    'Population, 2010–2024',
    lineChart(POPULATION, { unit: 'm', decimals: 1 }),
    'Million people. Censuses 2010 (237.64m) and 2020 (270.20m); mid-year estimates 2022–2024. Source: BPS.',
  )}
  ${chartCard(
    'Human Development Index, 2020–2024',
    lineChart(HDI, { unit: '', decimals: 2 }),
    'BPS composite of health, education and living standards; 70–80 counts as "High". Source: BPS, 15 Nov 2024.',
  )}
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
    <p class="table-hint" id="prov-count">Showing 10 of 10 provinces. Type to filter, or change the sort order.</p>
    <div class="table-wrap"><table id="prov-table">
      <thead><tr><th>#</th><th>Province</th><th>Island</th><th class="num">People (m)</th><th class="num">Share</th><th class="num">Density /km²</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
    <p class="source-note">Mid-2024 estimates, million people; density is people per km². Source: BPS, Jumlah Penduduk menurut Provinsi 2024.</p>
  </section>
  ${chartCard(
    'Largest provinces by population',
    hbarChart(PROVINCES, {}),
    'Million people, mid-2024. Jawa Barat alone holds 17.88% of the country — more than any province outside Java by a factor of three. Source: BPS.',
  )}`;
}

export function pricesView() {
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
  ${chartCard(
    'Inflation, December year on year, 2015–2024',
    lineChart(INFLATION, { unit: '%', decimals: 2 }),
    'Consumer Price Index, % change on the same month a year earlier. The 2022 spike (5.51%) followed the fuel-price adjustment; 2024 (1.57%) sat at the bottom of the 2.5% ± 1% target band. Source: BPS.',
  )}
  ${chartCard(
    'Poverty rate, September, 2015–2024',
    lineChart(POVERTY, { unit: '%', decimals: 2 }),
    '% of population below the poverty line. The 2020 rise (10.19%) is the pandemic; September 2024 (8.57%) is the lowest BPS has recorded. Source: BPS Susenas.',
  )}
  ${card(
    'What the poverty numbers mean',
    `<ul class="bullets">
      <li><strong>24.06 million people</strong> were poor in September 2024 — 1.16 million fewer than in March 2024 and 1.84 million fewer than in March 2023.</li>
      <li><strong>Urban poverty 6.66%</strong>, down from 7.09% in March 2024; rural poverty remains higher (source release, BPS Jan 2025).</li>
      <li><strong>The poverty line was Rp595,242</strong> per capita per month — Rp443,433 food (74.50%) and Rp151,809 non-food (25.50%).</li>
      <li><strong>Depth of poverty fell too</strong>: the poverty gap index was 1.364 in September 2024, down from 1.461 in March 2024.</li>
    </ul>`,
    'Source: BPS Berita Resmi Statistik No. 07/01/Th. XXVIII, 15 January 2025.',
  )}`;
}

export function labourView() {
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
    lineChart(UNEMPLOYMENT, { unit: '%', decimals: 2 }),
    '% of the labour force. The 2020 peak (7.07%) is the pandemic; August 2024 (4.91%) is the lowest August reading in the series. Source: BPS Sakernas.',
  )}
  ${card(
    'Reading the labour market',
    `<ul class="bullets">
      <li><strong>Unemployment fell every year after 2020</strong> — 7.07% (2020) → 6.49% (2021) → 5.86% (2022) → 5.32% (2023) → 4.91% (2024).</li>
      <li><strong>Men 4.90%, women 4.92%</strong> in August 2024 — effectively the same rate; urban 5.79%, rural 3.67%.</li>
      <li><strong>The labour force is 152.11 million</strong> (144.64m working + 7.47m unemployed), from the August 2024 Sakernas booklet.</li>
      <li><strong>Unemployment differs sharply by place</strong>: the highest provincial open unemployment rate in the August 2024 round was 6.75%, against a lowest of 1.32%.</li>
    </ul>`,
    'Source: BPS Booklet Sakernas Agustus 2024, Vol. 7 No. 2. Youth and provincial detail as reported in the booklet.',
  )}`;
}

export function sourcesView() {
  const srcRows = SOURCES.map(
    (s) => `<tr><td><strong>${esc(s.dataset)}</strong></td><td>${esc(s.release)}</td><td>${esc(s.detail)}</td></tr>`,
  ).join('');
  const methodRows = METHODS.map(
    (m) => `<tr><td><strong>${esc(m.term)}</strong></td><td>${esc(m.def)}</td></tr>`,
  ).join('');
  return `
  ${pageHead(
    'Sources & methods',
    'Every number on this site traces to one official BPS release. No figure is estimated by us.',
  )}
  <section class="card">
    <h2>Where each figure comes from</h2>
    <div class="table-wrap"><table class="sources">
      <thead><tr><th>Dataset</th><th>Release</th><th>What it says</th></tr></thead>
      <tbody>${srcRows}</tbody>
    </table></div>
    <p class="source-note">BPS — Badan Pusat Statistik, Statistics Indonesia, bps.go.id. Releases are cited by number and date so any figure can be checked.</p>
  </section>
  <section class="card">
    <h2>Definitions</h2>
    <div class="table-wrap"><table class="sources">
      <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
      <tbody>${methodRows}</tbody>
    </table></div>
  </section>
  ${card(
    'About this site',
    `<p>NusaStat is an independent presentation of Indonesia’s official statistics. It is not
    affiliated with BPS and does not copy BPS branding, text or images. All figures are
    reproduced from public BPS releases with their release named; derived numbers (shares,
    changes, the labour-force total) are computed from those releases and labelled as such.
    Where a release rounds a figure, this site rounds the same way. If BPS revises a figure,
    the revised release replaces it here.</p>
    <p>Site built November 2026. Data as released by BPS up to November 2025 (IPM 2025);
    the 2024 reference year is used throughout for comparability.</p>`,
  )}`;
}

export const ROUTES = {
  '': homeView,
  economy: economyView,
  people: peopleView,
  prices: pricesView,
  labour: labourView,
  sources: sourcesView,
};

export const NAV = [
  { route: '', label: 'Home' },
  { route: 'economy', label: 'Economy' },
  { route: 'people', label: 'People' },
  { route: 'prices', label: 'Prices & poverty' },
  { route: 'labour', label: 'Labour' },
  { route: 'sources', label: 'Sources & methods' },
];
