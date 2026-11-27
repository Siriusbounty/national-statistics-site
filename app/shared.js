// NusaStat v2 shared helpers — the small pieces every page reuses: HTML
// escaping, the KPI card, the content card, the chart card, the page header,
// the site navigation and the CSV download used by the tables. One job each,
// no data of their own.

export function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function kpiCard(h) {
  return `<a class="kpi" href="${h.route}">
    <span class="kpi-label">${esc(h.label)}</span>
    <span class="kpi-value">${esc(h.value)}</span>
    <span class="kpi-detail">${esc(h.detail)}</span>
  </a>`;
}

export function card(title, body, note = '') {
  return `<section class="card"><h2>${esc(title)}</h2>${body}${
    note ? `<p class="source-note">${esc(note)}</p>` : ''
  }</section>`;
}

export function chartCard(title, chartHtml, note, toggle = '') {
  return `<section class="card"><div class="card-head"><h2>${esc(title)}</h2>${toggle}</div>
    <div class="chart">${chartHtml}</div>
    <p class="source-note">${esc(note)}</p></section>`;
}

export function pageHead(title, intro) {
  return `<div class="page-head"><p class="eyebrow">Indonesia · Official BPS data</p><h1>${esc(title)}</h1><p class="lede">${esc(intro)}</p></div>`;
}

export const NAV = [
  { route: '', label: 'Home' },
  { route: 'economy', label: 'Economy' },
  { route: 'people', label: 'People' },
  { route: 'prices', label: 'Prices & poverty' },
  { route: 'labour', label: 'Labour' },
  { route: 'explore', label: 'Explore data' },
  { route: 'sources', label: 'Sources & methods' },
];

// Download a CSV file in the browser: builds the file from rows in memory,
// so the site stays fully offline. rows: array of arrays of cell strings.
export function downloadCSV(filename, rows) {
  const csv = rows
    .map((row) =>
      row
        .map((cell) => {
          const text = String(cell);
          return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
        })
        .join(','),
    )
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
