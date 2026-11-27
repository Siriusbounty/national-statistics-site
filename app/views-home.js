// NusaStat v2 home view — the front door. Eight headline indicators, a
// growth chart with a 10-year / 5-year range switch, a 2×2 grid of the
// other key series, the latest releases and the Java concentration fact.
// The range switch is wired by wire() below.

import { barChart, lineChart } from './charts.js';
import { GDP_GROWTH } from './data-economy.js';
import { HDI, POPULATION } from './data-people.js';
import { INFLATION, POVERTY } from './data-prices.js';
import { HEADLINES, META, RELEASES } from './data-core.js';
import { card, chartCard, esc, kpiCard } from './shared.js';

function growthChart(points) {
  return barChart(points, { unit: '%', negative: '#c2410c' });
}

export function view() {
  const cards = HEADLINES.map(kpiCard).join('');
  return `
  <div class="hero">
    <p class="eyebrow">Official statistics · ${esc(META.country)} · Updated ${esc(META.updated)}</p>
    <h1>Indonesia in numbers</h1>
    <p class="lede">Population, economy, prices, jobs and wellbeing — the latest official
    figures from ${esc(META.office)}, explained in plain language and updated
    with each BPS release.</p>
    <div class="hero-stats">
      <span><strong>281.6m</strong> people</span>
      <span><strong>38</strong> provinces</span>
      <span><strong>17,000+</strong> islands</span>
      <span><strong>Rp22,139tn</strong> GDP</span>
    </div>
    <div class="hero-actions">
      <a class="btn primary" href="#/economy">Explore the economy</a>
      <a class="btn" href="#/explore">Search all indicators</a>
      <a class="btn" href="#/people">See the provinces</a>
    </div>
  </div>
  <div class="kpi-grid">${cards}</div>
  ${chartCard(
    'Economic growth, 2015–2024',
    `<div id="home-growth-chart">${growthChart(GDP_GROWTH)}</div>`,
    'Real GDP growth, year on year. The 2020 bar is the pandemic contraction (−2.07%). Source: BPS, 5 Feb 2025.',
    `<span class="toggle" role="group" aria-label="Growth chart range">
      <button type="button" class="toggle-btn active" data-range="10">10 years</button>
      <button type="button" class="toggle-btn" data-range="5">5 years</button>
    </span>`,
  )}
  <div class="two-col">
    ${chartCard(
      'Population, 2010–2024',
      lineChart(POPULATION, { unit: 'm', decimals: 1, area: true }),
      'Million people. Censuses 2010 and 2020; mid-year estimates after. Source: BPS.',
    )}
    ${chartCard(
      'Inflation, 2015–2024',
      lineChart(INFLATION, { unit: '%', decimals: 2, color: '#0e7490' }),
      'December year on year, %. The 2022 spike (5.51%) followed the fuel-price adjustment. Source: BPS.',
    )}
    ${chartCard(
      'Poverty rate, 2015–2024',
      lineChart(POVERTY, { unit: '%', decimals: 2, color: '#b45309' }),
      '% of population, September. 2024 (8.57%) is the lowest BPS has recorded. Source: BPS Susenas.',
    )}
    ${chartCard(
      'Human Development Index, 2020–2025',
      lineChart(HDI, { unit: '', decimals: 2, color: '#15803d', area: true }),
      'BPS composite of health, education and living standards; 70–80 counts as "High". Source: BPS, 5 Nov 2025.',
    )}
  </div>
  <div class="two-col">
    ${card(
      'Latest releases',
      `<ul class="releases">${RELEASES.slice(0, 4)
        .map(
          (r) =>
            `<li><span class="rel-date">${esc(r.date)}</span><strong>${esc(r.title)}</strong><span>${esc(r.text)}</span></li>`,
        )
        .join('')}</ul><p><a href="#/sources">All sources &amp; methods →</a></p>`,
    )}
    ${card(
      'Where Indonesians live',
      `<p class="big-stat"><strong>55.93%</strong> of the population lives on Java — an island
      of about 132,600 km² holding 157.4 million people. The three most populous provinces
      (Jawa Barat, Jawa Timur, Jawa Tengah) alone hold <strong>130.2 million</strong> people,
      46% of the country.</p>
      <p><a href="#/people">Compare all ten largest provinces →</a></p>`,
      'Sources: BPS mid-2024 estimates; Ditjen Dukcapil Semester I 2024.',
    )}
  </div>`;
}

export function wire(root) {
  const buttons = root.querySelectorAll('[data-range]');
  const box = root.querySelector('#home-growth-chart');
  if (!buttons.length || !box) return;
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const points = btn.dataset.range === '5' ? GDP_GROWTH.slice(-5) : GDP_GROWTH;
      box.innerHTML = growthChart(points);
    });
  });
}
