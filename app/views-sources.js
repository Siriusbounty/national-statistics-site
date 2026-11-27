// NusaStat v2 sources view — the BPS release behind every dataset, the
// definitions of the terms the site uses, and what the site is.

import { METHODS, SOURCES } from './data-sources.js';
import { card, esc, pageHead } from './shared.js';

export function view() {
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
    <p>Site built November 2026. Data as released by BPS up to November 2025 (IPM 2025 and
    Q3 2025 growth); the 2024 reference year is used throughout for comparability. The full
    dataset can be downloaded as CSV from the Explore page.</p>`,
  )}`;
}

export function wire() {}
