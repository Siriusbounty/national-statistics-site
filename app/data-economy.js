// NusaStat v2 — economy data. Every series is an official BPS release
// (Berita Resmi Statistik unless noted); the release behind each series is
// named on the Sources & methods page.

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

// Quarterly real GDP growth, % year on year. 2024 quarters from the BPS
// quarterly releases; 2025 quarters from the releases of 5 May, 5 August
// and 5 November 2025.
export const GDP_QUARTERLY = [
  { year: 'Q1 24', value: 5.11 },
  { year: 'Q2 24', value: 5.05 },
  { year: 'Q3 24', value: 4.95 },
  { year: 'Q4 24', value: 5.02 },
  { year: 'Q1 25', value: 4.87 },
  { year: 'Q2 25', value: 5.12 },
  { year: 'Q3 25', value: 5.04 },
];

// Foreign trade, US$ billion (BPS / Ministry of Trade, Jan 2025).
export const TRADE = [
  { year: 2021, exports: 231.61, imports: 196.27 },
  { year: 2022, exports: 291.9, imports: 237.44 },
  { year: 2023, exports: 258.82, imports: 221.93 },
  { year: 2024, exports: 264.7, imports: 233.66 },
];

// Foreign visitor arrivals, million people (BPS). The 2020–2021 collapse
// is the pandemic border closure; arrivals have recovered since 2022.
export const TOURISM = [
  { year: 2019, value: 16.11 },
  { year: 2020, value: 4.05 },
  { year: 2021, value: 1.56 },
  { year: 2022, value: 5.47 },
  { year: 2023, value: 11.68 },
  { year: 2024, value: 13.9 },
];
