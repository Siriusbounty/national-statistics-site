// NusaStat data layer — every figure is an official release of Badan Pusat
// Statistik (BPS, Statistics Indonesia). Nothing here is estimated by us:
// values, years and release dates are copied from the BPS releases named in
// SOURCES. Figures are shown exactly as published; derived numbers (shares,
// changes) are computed from them and labelled as such.

export const META = {
  country: 'Indonesia',
  office: 'Badan Pusat Statistik (BPS) — Statistics Indonesia',
  officeUrl: 'https://www.bps.go.id',
  updated: 'November 2026',
  note: 'All figures are official BPS releases. See Sources & Methods for the release behind each number.',
};

// Headline indicators shown on the home page.
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
    value: '75.02',
    detail: '2024, up 0.63 points on 2023 — "High"',
    route: '#/people',
  },
];

// Real GDP growth, % year on year (BPS, Berita Resmi Statistik, 5 Feb 2025).
export const GDP_GROWTH = [
  { year: 2015, value: 4.88 },
  { year: 2016, value: 5.03 },
  { year: 2017, value: 5.07 },
  { year: 2018, value: 5.17 },
  { year: 2019, value: 5.02 },
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.7 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

// GDP at current prices, Rp trillion (BPS).
export const GDP_LEVEL = [
  { year: 2020, value: 15443.4 },
  { year: 2021, value: 16976.7 },
  { year: 2022, value: 19588.4 },
  { year: 2023, value: 20892.4 },
  { year: 2024, value: 22139.0 },
];

// Foreign trade, US$ billion (BPS / Ministry of Trade, Jan 2025).
export const TRADE = [
  { year: 2021, exports: 231.61, imports: 196.27 },
  { year: 2022, exports: 291.9, imports: 237.44 },
  { year: 2023, exports: 258.82, imports: 221.93 },
  { year: 2024, exports: 264.7, imports: 233.66 },
];

// Population: censuses and mid-year estimates (BPS).
export const POPULATION = [
  { year: 2010, value: 237.64, note: 'Census (SP2010)' },
  { year: 2020, value: 270.2, note: 'Census (SP2020)' },
  { year: 2022, value: 275.77, note: 'Mid-year estimate' },
  { year: 2023, value: 278.7, note: 'Mid-year estimate' },
  { year: 2024, value: 281.6, note: 'Mid-year estimate' },
];

// Ten most populous provinces, mid-2024, million people (BPS).
export const PROVINCES = [
  { name: 'Jawa Barat', pop: 50.35, share: 17.88, density: 1359, island: 'Jawa' },
  { name: 'Jawa Timur', pop: 41.92, share: 14.89, density: 870, island: 'Jawa' },
  { name: 'Jawa Tengah', pop: 37.89, share: 13.45, density: 1104, island: 'Jawa' },
  { name: 'Sumatera Utara', pop: 15.59, share: 5.53, density: 214, island: 'Sumatera' },
  { name: 'Banten', pop: 12.43, share: 4.41, density: 1329, island: 'Jawa' },
  { name: 'DKI Jakarta', pop: 10.68, share: 3.79, density: 16165, island: 'Jawa' },
  { name: 'Sulawesi Selatan', pop: 9.46, share: 3.36, density: 202, island: 'Sulawesi' },
  { name: 'Lampung', pop: 9.42, share: 3.34, density: 272, island: 'Sumatera' },
  { name: 'Sumatera Selatan', pop: 8.84, share: 3.14, density: 96, island: 'Sumatera' },
  { name: 'Riau', pop: 6.73, share: 2.39, density: 77, island: 'Sumatera' },
];

// Consumer-price inflation, % year on year in December (BPS).
export const INFLATION = [
  { year: 2015, value: 3.35 },
  { year: 2016, value: 3.02 },
  { year: 2017, value: 3.61 },
  { year: 2018, value: 3.13 },
  { year: 2019, value: 2.72 },
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// Poverty rate, % of population, September (BPS, Susenas).
export const POVERTY = [
  { year: 2015, value: 11.13 },
  { year: 2016, value: 10.7 },
  { year: 2017, value: 10.12 },
  { year: 2018, value: 9.66 },
  { year: 2019, value: 9.22 },
  { year: 2020, value: 10.19 },
  { year: 2021, value: 9.71 },
  { year: 2022, value: 9.57 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 8.57 },
];

// Open unemployment rate (TPT), % of labour force, August (BPS, Sakernas).
export const UNEMPLOYMENT = [
  { year: 2015, value: 6.18 },
  { year: 2016, value: 5.61 },
  { year: 2017, value: 5.5 },
  { year: 2018, value: 5.34 },
  { year: 2019, value: 5.28 },
  { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
];

// Human Development Index (BPS).
export const HDI = [
  { year: 2020, value: 71.94 },
  { year: 2021, value: 72.29 },
  { year: 2022, value: 73.77 },
  { year: 2023, value: 74.39 },
  { year: 2024, value: 75.02 },
];

// Latest official releases, newest first (BPS Berita Resmi Statistik).
export const RELEASES = [
  {
    date: '5 Nov 2025',
    title: 'Human Development Index 2025 reaches 75.90',
    text: 'IPM 2025 up 0.88 points on 2024 (75.02); life expectancy 74.47 years.',
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

// Sources: the BPS release behind each dataset.
export const SOURCES = [
  {
    dataset: 'Population, mid-year 2024',
    release: 'BPS — Jumlah Penduduk menurut Provinsi, 2024; Statistik Indonesia 2025',
    detail: '281,603,800 people (mid-2024); 278,696,200 (2023); 275,773,800 (2022). Censuses: SP2010 237,641,326; SP2020 270,203,917.',
  },
  {
    dataset: 'GDP and economic growth',
    release: 'BPS Berita Resmi Statistik No. 17/02/Th. XXVIII, 5 February 2025',
    detail: 'GDP current prices 2024 Rp22,139.0 trillion; constant 2010 prices Rp12,920.3 trillion; growth 5.03% (2023: 5.05%); GDP per capita Rp78.6 million / US$4,960.30.',
  },
  {
    dataset: 'Foreign trade',
    release: 'BPS / Ministry of Trade (PDSI), Perkembangan Ekspor-Impor, January 2025',
    detail: 'Exports 2024 US$264.70bn (+2.29% yoy); imports US$233.66bn (+5.31%); trade surplus US$31.04bn, fifth straight annual surplus.',
  },
  {
    dataset: 'Inflation',
    release: 'BPS Berita Resmi Statistik, 2 January 2025; Laporan Bulanan Data Sosial Ekonomi, December 2024',
    detail: 'CPI inflation yoy December 2024 1.57%; month-to-month 0.44%; CPI index 106.80; core inflation 2.26%.',
  },
  {
    dataset: 'Poverty',
    release: 'BPS Berita Resmi Statistik No. 07/01/Th. XXVIII, 15 January 2025',
    detail: 'Poverty rate September 2024 8.57% (24.06m people), down 0.46 points on March 2024; urban 6.66%; poverty line Rp595,242 per capita per month.',
  },
  {
    dataset: 'Unemployment',
    release: 'BPS Booklet Sakernas Agustus 2024 (Vol. 7, No. 2, 2024)',
    detail: 'Open unemployment rate (TPT) August 2024 4.91%; 144.64m working; 7.47m unemployed; TPT men 4.90%, women 4.92%.',
  },
  {
    dataset: 'Human Development Index',
    release: 'BPS Berita Resmi Statistik, 15 November 2024 (IPM 2024); 5 November 2025 (IPM 2025)',
    detail: 'IPM 2024 75.02 (+0.63 on 2023, 74.39); life expectancy at birth 74.15 years; adjusted real per-capita expenditure Rp12,341,000 per year.',
  },
  {
    dataset: 'Provincial population',
    release: 'BPS — Jumlah Penduduk menurut Provinsi, 2024; BPS infographic, mid-2024',
    detail: 'Top 10 provinces by population, mid-2024. Java holds 55.93% of the national population (Ditjen Dukcapil, Semester I 2024).',
  },
];

export const METHODS = [
  {
    term: 'GDP growth',
    def: 'Change in gross domestic product at constant 2010 prices on the same period a year earlier (year on year, c-to-c for a full year).',
  },
  {
    term: 'Inflation (yoy)',
    def: 'Change in the Consumer Price Index (IHK) on the same month a year earlier. BPS surveys prices in 90 cities.',
  },
  {
    term: 'Poverty rate',
    def: 'Share of the population below the poverty line — the rupiah cost of a minimum food basket (2,100 kcal per capita per day) plus essential non-food needs. From Susenas.',
  },
  {
    term: 'Open unemployment rate (TPT)',
    def: 'Unemployed people as a share of the labour force (working + unemployed). From Sakernas, held every February and August.',
  },
  {
    term: 'Human Development Index (IPM)',
    def: 'BPS composite of life expectancy, expected and mean years of schooling, and adjusted real per-capita expenditure. 70–80 is "High".',
  },
  {
    term: 'Gini ratio',
    def: 'Inequality of per-capita expenditure, 0 (perfect equality) to 1. September 2024: 0.379 (BPS).',
  },
];
