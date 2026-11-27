// NusaStat v2 entrypoint (Node 22, standard library only). The site is the
// static app/ folder beside this file: plain HTML, CSS and ES modules, no
// build step, nothing fetched from the network. This program hands it in by
// copying app/ and screenshots/ to /output and writing /output/dossier.json
// with buildDossier from the vendored make.fun frontend library — the same
// hand-in the kit's starter performs. Outside the grader, MAKEFUN_OUTPUT_DIR
// stands in for /output:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The two grader runs must produce identical bytes: copying files and
// building the dossier from them is fully deterministic.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// Dossier caps from the competition gate: at most 4 screenshots of 256 KiB,
// app/ at most 993 files and 16 MiB, dossier text at most 160 KiB.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
