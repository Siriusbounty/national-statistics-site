// NusaStat v2 charts — small dependency-free SVG charts drawn from the
// data modules. One job each: barChart draws vertical bars, lineChart draws
// a line with points (optionally shaded underneath), groupedBars draws two
// series side by side, hbarChart draws a horizontal ranking. All numbers
// come from the dataset passed in; nothing is hard-coded here.
//
// Theme-aware: axis text, gridlines and the zero line take their colours
// from CSS classes (.chart text, .chart .grid, .chart .zero), so the charts
// stay readable in light and dark mode. Bar and line colours are the
// site's brand colours and work on both themes.

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function niceMax(values) {
  const max = Math.max(...values.map((v) => Math.abs(v)));
  if (max <= 0) return 1;
  const step = 10 ** Math.floor(Math.log10(max));
  return Math.ceil(max / step) * step;
}

function chartFrame(width, height, pad) {
  return { w: width, h: height, pad, iw: width - pad.l * 2, ih: height - pad.t - pad.b };
}

// Vertical bar chart. points: [{year, value}], opts: {unit, color, negative}
// Negative bars (e.g. the 2020 contraction) grow downward from the zero line.
export function barChart(points, opts = {}) {
  const color = opts.color || '#0b5fff';
  const neg = opts.negative || '#c2410c';
  const unit = opts.unit || '';
  const { w, h, pad, iw, ih } = chartFrame(720, 300, { t: 14, b: 30, l: 44, r: 12 });
  const max = niceMax(points.map((p) => p.value));
  const min = Math.min(0, ...points.map((p) => p.value));
  const span = max - min;
  const y = (v) => pad.t + ((max - v) / span) * ih;
  const zeroY = y(0);
  const slot = iw / points.length;
  const bw = Math.min(46, slot * 0.62);
  let svg = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Bar chart" preserveAspectRatio="xMidYMid meet">`;
  svg += `<line class="zero" x1="${pad.l}" y1="${zeroY}" x2="${w - pad.r}" y2="${zeroY}"/>`;
  for (let g = 0; g <= 4; g += 1) {
    const v = min + (span * g) / 4;
    const gy = y(v);
    svg += `<line class="grid" x1="${pad.l}" y1="${gy}" x2="${w - pad.r}" y2="${gy}"/>`;
    // A gridline a hair below zero reads as "-0.1" — print it as 0.
    const label = Math.abs(v) < 0.1 ? '0' : v.toFixed(v % 1 ? 1 : 0);
    svg += `<text x="${pad.l - 8}" y="${gy + 4}" text-anchor="end">${esc(label)}</text>`;
  }
  points.forEach((p, i) => {
    const x = pad.l + slot * i + (slot - bw) / 2;
    const top = Math.min(y(p.value), zeroY);
    const height = Math.abs(y(p.value) - zeroY);
    const fill = p.value < 0 ? neg : color;
    svg += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(height, 2).toFixed(1)}" rx="3" fill="${fill}"><title>${p.year}: ${p.value}${unit}</title></rect>`;
    // A negative bar hangs below the zero line, so a label above the line
    // would sit detached from its bar: put it inside the bar instead, in
    // white, near the bar's lower end. A bar too short to hold its label
    // keeps the label just below its end, clear of the year labels.
    if (p.value < 0 && height >= 16) {
      svg += `<text class="val val-neg" x="${(x + bw / 2).toFixed(1)}" y="${(y(p.value) - 6).toFixed(1)}" text-anchor="middle">${esc(p.value)}${unit}</text>`;
    } else if (p.value < 0) {
      svg += `<text class="val" x="${(x + bw / 2).toFixed(1)}" y="${(y(p.value) + 15).toFixed(1)}" text-anchor="middle">${esc(p.value)}${unit}</text>`;
    } else {
      svg += `<text class="val" x="${(x + bw / 2).toFixed(1)}" y="${(top - 5).toFixed(1)}" text-anchor="middle">${esc(p.value)}${unit}</text>`;
    }
    svg += `<text x="${(x + bw / 2).toFixed(1)}" y="${h - 10}" text-anchor="middle">${p.year}</text>`;
  });
  return `${svg}</svg>`;
}

// Line chart with dots and value labels. points: [{year, value}].
// opts.area shades the area under the line.
export function lineChart(points, opts = {}) {
  const color = opts.color || '#0b5fff';
  const unit = opts.unit || '';
  const decimals = opts.decimals ?? 2;
  const { w, h, pad, iw, ih } = chartFrame(720, 300, { t: 22, b: 30, l: 48, r: 16 });
  const values = points.map((p) => p.value);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const padV = (rawMax - rawMin) * 0.15 || 1;
  const min = rawMin - padV;
  const max = rawMax + padV;
  const x = (i) => pad.l + (iw * i) / (points.length - 1);
  const y = (v) => pad.t + ((max - v) / (max - min)) * ih;
  let svg = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Line chart" preserveAspectRatio="xMidYMid meet">`;
  for (let g = 0; g <= 4; g += 1) {
    const v = min + ((max - min) * g) / 4;
    const gy = y(v);
    svg += `<line class="grid" x1="${pad.l}" y1="${gy}" x2="${w - pad.r}" y2="${gy}"/>`;
    svg += `<text x="${pad.l - 8}" y="${gy + 4}" text-anchor="end">${esc(v.toFixed(decimals))}</text>`;
  }
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  if (opts.area) {
    const base = pad.t + ih;
    svg += `<path d="${line} L${x(points.length - 1).toFixed(1)},${base} L${x(0).toFixed(1)},${base} Z" fill="${color}" fill-opacity="0.08"/>`;
  }
  svg += `<path d="${line}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    const cx = x(i);
    const cy = y(p.value);
    svg += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4" fill="#ffffff" stroke="${color}" stroke-width="2.5"><title>${p.year}: ${p.value}${unit}</title></circle>`;
    if (i % 2 === 0 || i === points.length - 1) {
      // Keep the first and last labels inside the canvas.
      const anchor = i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle';
      const lx = i === 0 ? cx + 6 : i === points.length - 1 ? cx - 6 : cx;
      svg += `<text class="val" x="${lx.toFixed(1)}" y="${(cy - 10).toFixed(1)}" text-anchor="${anchor}">${esc(p.value.toFixed(decimals))}${unit}</text>`;
    }
    svg += `<text x="${cx.toFixed(1)}" y="${h - 10}" text-anchor="middle">${p.year}</text>`;
  });
  return `${svg}</svg>`;
}

// Grouped bars for two series (exports vs imports). series: [{label, color, values}]
export function groupedBars(points, series, opts = {}) {
  const unit = opts.unit || '';
  const { w, h, pad, iw, ih } = chartFrame(720, 300, { t: 14, b: 30, l: 48, r: 12 });
  const all = series.flatMap((s) => s.values);
  const max = niceMax(all);
  const y = (v) => pad.t + ((max - v) / max) * ih;
  const slot = iw / points.length;
  const bw = Math.min(34, slot / 3.2);
  let svg = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Grouped bar chart" preserveAspectRatio="xMidYMid meet">`;
  for (let g = 0; g <= 4; g += 1) {
    const v = (max * g) / 4;
    const gy = y(v);
    svg += `<line class="grid" x1="${pad.l}" y1="${gy}" x2="${w - pad.r}" y2="${gy}"/>`;
    svg += `<text x="${pad.l - 8}" y="${gy + 4}" text-anchor="end">${esc(v.toFixed(0))}</text>`;
  }
  points.forEach((p, i) => {
    series.forEach((s, j) => {
      const v = s.values[i];
      const x = pad.l + slot * i + (slot - bw * series.length) / 2 + j * bw;
      svg += `<rect x="${x.toFixed(1)}" y="${y(v).toFixed(1)}" width="${(bw - 3).toFixed(1)}" height="${(pad.t + ih - y(v)).toFixed(1)}" rx="3" fill="${s.color}"><title>${p.year} ${s.label}: ${v}${unit}</title></rect>`;
      // A visible value on each bar, so the pair can be read without
      // hovering: the two bars in a group share one slot, so the labels
      // sit above their own bar, small and centred on it.
      svg += `<text class="val" x="${(x + (bw - 3) / 2).toFixed(1)}" y="${(y(v) - 4).toFixed(1)}" text-anchor="middle">${esc(v)}${unit}</text>`;
    });
    svg += `<text x="${(pad.l + slot * i + slot / 2).toFixed(1)}" y="${h - 10}" text-anchor="middle">${p.year}</text>`;
  });
  return `${svg}</svg>`;
}

// Horizontal bars for the province ranking. rows: [{name, pop}].
export function hbarChart(rows, opts = {}) {
  const color = opts.color || '#0b5fff';
  const max = Math.max(...rows.map((r) => r.pop));
  const rowH = 34;
  const w = 720;
  const h = rowH * rows.length + 8;
  let svg = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Province population chart" preserveAspectRatio="xMidYMid meet">`;
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const bw = ((w - 250) * r.pop) / max;
    svg += `<text class="val" x="0" y="${y + 15}">${esc(r.name)}</text>`;
    svg += `<rect x="150" y="${y + 2}" width="${bw.toFixed(1)}" height="18" rx="3" fill="${color}"><title>${esc(r.name)}: ${r.pop} million people</title></rect>`;
    svg += `<text class="val" x="${(155 + bw).toFixed(1)}" y="${y + 16}">${r.pop.toFixed(2)}m</text>`;
  });
  return `${svg}</svg>`;
}
