// NusaStat v2 — core data: site meta, headline indicators and the latest
// official releases. Every figure is an official release of Badan Pusat
// Statistik (BPS, Statistics Indonesia); the release behind each number is
// named on the Sources & methods page. Nothing here is estimated by us.

export const META = {
  country: 'Indonesia',
  office: 'Badan Pusat Statistik (BPS) — Statistics Indonesia',
  officeUrl: 'https://www.bps.go.id',
  updated: 'November 2026',
  note: 'All figures are official BPS releases. See Sources & Methods for the release behind each number.',
};

// Headline indicators shown on the home page. Values are the latest
// published figure for each indicator at the time of writing.
export const HEADLINES = [
  {
    id: 'population',
    label: 'Population',
    value: '281.6m',
    detail: 'Mid-year 2024, up 1.04% on 2023',
    route: '#/people',
  },
  {
    id: 'gdp',
    label: 'GDP',
    value: 'Rp22,139tn',
    detail: 'Current prices, 2024 — US$1.40tn',
    route: '#/economy',
  },
  {
    id: 'growth',
    label: 'Economic growth',
    value: '5.03%',
    detail: 'Real GDP growth, 2024 (2023: 5.05%)',
    route: '#/economy',
  },
  {
    id: 'gdp-capita',
    label: 'GDP per capita',
    value: 'Rp78.6m',
    detail: '2024 — US$4,960.30 per person',
    route: '#/economy',
  },
  {
    id: 'inflation',
    label: 'Inflation',
    value: '1.57%',
    detail: 'Year on year, December 2024',
    route: '#/prices',
  },
  {
    id: 'unemployment',
    label: 'Unemployment',
    value: '4.91%',
    detail: 'Open unemployment rate, August 2024',
    route: '#/labour',
  },
  {
    id: 'poverty',
    label: 'Poverty rate',
    value: '8.57%',
    detail: 'September 2024 — 24.06 million people',
    route: '#/prices',
  },
  {
    id: 'hdi',
    label: 'Human Development Index',
    value: '75.90',
    detail: '2025, up 0.88 points on 2024 — "High"',
    route: '#/people',
  },
];

// Latest official releases, newest first (BPS Berita Resmi Statistik).
export const RELEASES = [
  {
    date: '5 Nov 2025',
    title: 'Human Development Index 2025 reaches 75.90',
    text: 'IPM 2025 up 0.88 points on 2024 (75.02); life expectancy 74.47 years.',
  },
  {
    date: '5 Nov 2025',
    title: 'Economy grew 5.04% in the third quarter of 2025',
    text: 'Q3 2025 growth 5.04% year on year; Q1 4.87% and Q2 5.12%.',
  },
  {
    date: '5 Feb 2025',
    title: 'Economy grew 5.03% in 2024',
    text: 'GDP at current prices Rp22,139.0 trillion; GDP per capita Rp78.6 million (US$4,960.30).',
  },
  {
    date: '15 Jan 2025',
    title: 'Poverty falls to 8.57% in September 2024',
    text: 'Lowest on record: 24.06 million poor people; poverty line Rp595,242 per capita per month.',
  },
  {
    date: '2 Jan 2025',
    title: 'Inflation 1.57% in December 2024',
    text: 'Year-on-year CPI inflation inside the 2.5% ± 1% target band; CPI index 106.80.',
  },
  {
    date: '5 Nov 2024',
    title: 'Unemployment 4.91% in August 2024',
    text: '144.64 million people working; 7.47 million unemployed (Sakernas, August 2024).',
  },
  {
    date: '15 Nov 2024',
    title: 'Human Development Index 2024 reaches 75.02',
    text: 'Up 0.63 points on 2023; life expectancy at birth 74.15 years.',
  },
];
