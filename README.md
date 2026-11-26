# NusaStat — Indonesia in numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Siriusbounty/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Siriusbounty/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

A national statistics site for Indonesia, built from the official releases
of Badan Pusat Statistik (BPS, Statistics Indonesia). Population, economy,
prices, jobs and wellbeing — every figure traced to the BPS release that
published it, with sources and definitions on the Sources & methods page.

## What it is

- **Home** — headline indicators, growth and population charts, latest releases.
- **Economy** — GDP level and growth 2015–2024, GDP per capita, foreign trade 2021–2024.
- **People** — population, Human Development Index, and a searchable, sortable
  table of the ten largest provinces.
- **Prices & poverty** — inflation 2015–2024, poverty rate 2015–2024, poverty line, Gini.
- **Labour** — open unemployment rate 2015–2024, working and unemployed counts.
- **Sources & methods** — the BPS release behind every dataset, plus definitions.

## Running it

The site is static files under `app/` — no build step, no network requests:

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

Or open `app/index.html` in a browser (ES modules need HTTP; `file://` will
not load them).

## Hand-in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to `/output` and writes `/output/dossier.json`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Data

All figures are official BPS releases (see `app/data.js` and the Sources &
methods page). Nothing is estimated by this site; derived numbers (shares,
changes, the labour-force total) are computed from BPS releases and labelled
as such. NusaStat is independent and not affiliated with BPS.
