// NusaStat v2 — sources and methods. The BPS release behind every dataset
// on this site, plus definitions of the terms the site uses.

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
    dataset: 'Quarterly GDP growth, 2024–2025',
    release: 'BPS Berita Resmi Statistik, 5 February, 5 May, 5 August and 5 November 2025',
    detail: '2024: Q1 5.11%, Q2 5.05%, Q3 4.95%, Q4 5.02%. 2025: Q1 4.87%, Q2 5.12%, Q3 5.04% (year on year).',
  },
  {
    dataset: 'Foreign trade',
    release: 'BPS / Ministry of Trade (PDSI), Perkembangan Ekspor-Impor, January 2025',
    detail: 'Exports 2024 US$264.70bn (+2.29% yoy); imports US$233.66bn (+5.31%); trade surplus US$31.04bn, fifth straight annual surplus.',
  },
  {
    dataset: 'Foreign visitor arrivals',
    release: 'BPS — Perkembangan Pariwisata, monthly releases 2019–2024',
    detail: 'Arrivals: 16.11m (2019), 4.05m (2020), 1.56m (2021), 5.47m (2022), 11.68m (2023), 13.90m (2024).',
  },
  {
    dataset: 'Inflation',
    release: 'BPS Berita Resmi Statistik, 2 January 2025; Laporan Bulanan Data Sosial Ekonomi, December 2024',
    detail: 'CPI inflation yoy December 2024 1.57%; month-to-month 0.44%; CPI index 106.80; core inflation 2.26%.',
  },
  {
    dataset: 'Poverty',
    release: 'BPS Berita Resmi Statistik No. 07/01/Th. XXVIII, 15 January 2025',
    detail: 'Poverty rate September 2024 8.57% (24.06m people), down 0.46 points on March 2024; urban 6.66%, rural 11.34%; poverty line Rp595,242 per capita per month.',
  },
  {
    dataset: 'Unemployment',
    release: 'BPS Booklet Sakernas Agustus 2024 (Vol. 7, No. 2, 2024); BRS May 2025',
    detail: 'Open unemployment rate (TPT) August 2024 4.91%; 144.64m working; 7.47m unemployed; TPT men 4.90%, women 4.92%. February 2025 TPT 4.76%.',
  },
  {
    dataset: 'Human Development Index',
    release: 'BPS Berita Resmi Statistik, 15 November 2024 (IPM 2024); 5 November 2025 (IPM 2025)',
    detail: 'IPM 2024 75.02 (+0.63 on 2023, 74.39); IPM 2025 75.90 (+0.88); life expectancy at birth 74.15 years (2024), 74.47 years (2025); adjusted real per-capita expenditure Rp12,341,000 per year (2024).',
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
    term: 'Foreign visitor arrivals',
    def: 'Foreign nationals entering Indonesia through its entry points, as recorded by immigration and compiled by BPS. Includes tourists and business visitors.',
  },
  {
    term: 'Gini ratio',
    def: 'Inequality of per-capita expenditure, 0 (perfect equality) to 1. September 2024: 0.379 (BPS).',
  },
];
