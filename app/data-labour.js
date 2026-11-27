// NusaStat v2 — labour data. Every series is an official BPS release
// (Sakernas); the release behind each series is named on the Sources &
// methods page.

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

// Working and unemployed counts, August 2024, million people
// (BPS Booklet Sakernas Agustus 2024). Labour force = working + unemployed.
export const LABOUR_COUNTS = { working: 144.64, unemployed: 7.47 };
