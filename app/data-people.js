// NusaStat v2 — people data. Every figure is an official BPS release; the
// release behind each series is named on the Sources & methods page.

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

// Human Development Index (BPS). 2025 from the release of 5 November 2025;
// earlier years from the release of 15 November 2024.
export const HDI = [
  { year: 2020, value: 71.94 },
  { year: 2021, value: 72.29 },
  { year: 2022, value: 73.77 },
  { year: 2023, value: 74.39 },
  { year: 2024, value: 75.02 },
  { year: 2025, value: 75.9 },
];
