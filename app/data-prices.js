// NusaStat v2 — prices and poverty data. Every series is an official BPS
// release; the release behind each series is named on the Sources & methods
// page.

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

// Poverty rate by area, September 2024 (BPS Berita Resmi Statistik,
// 15 January 2025). Rural poverty runs almost twice the urban rate.
export const POVERTY_AREA = [
  { year: 'Urban', value: 6.66 },
  { year: 'Rural', value: 11.34 },
];
