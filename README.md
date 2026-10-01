# Lab · Benchmark discovery

A static discovery interface containing **20 source-grounded records**: 19 catalog
entries and the separate, unverified VoxelBench watch item. Search and filter by
category, research-snapshot status, and evidence setting. Expand a record for
scope, source basis, metric definitions, inference limits, exact sources, and its
next verification step.

All 30 metric values remain null. No results, rankings, or aggregate scores are
invented. The snapshot is dated **2026-09-30**, not a live methodology or standings
check. See [catalog provenance and mapping](docs/CATALOG-INTEGRATION.md) and
[actual validation](docs/VALIDATION.md).

`results.html` adds **18 primary reported observations and seven graph views**
for RuneBench, BullshitBench V2, and historical MedAgentBench. The original
discovery records and their null metric definitions are preserved. New numeric
observations stay in a separate result dataset with their own protocols, source
dates, cost/time meanings, and exclusions. There is no overall model ranking.
See [results validation and security review](docs/RESULTS-INTEGRATION.md).

## Static structure

- `data/catalog.original.json`: exact JSON values supplied directly by the parent.
- `scripts/build-catalog.cjs`: validates counts, IDs, dates, metric references,
  null results, and exact URLs; creates the reviewed display projection.
- `assets/catalog.js`: generated local script. Do not hand-edit.
- `assets/lab.js`: validated text rendering, filters, URL state, and native details.
- `index.html`, `assets/lab.css`, `assets/mark.svg`: responsive page and J² mark.
- `tests/`: real-data checks, fallback/security regressions, static checks, and
  one-pass source URL response checks.
- `data/results.original.json`: original researcher rows, graph specifications,
  and README supplied by the parent; all numeric values and source metadata retained.
- `data/results-rune-evidence.json`: numeric-only supplemental checks of the same
  pinned RuneBench samples and container/agent clocks; no trajectory text.
- `scripts/build-results.cjs`: validates record arithmetic, exact membership and
  all 720 tracker points; generates `assets/results-data.js`.
- `assets/results.js`, `assets/results.css`, `results.html`: local interactive
  charts, complete table alternatives, and observation/protocol details.

No build, package installation, backend, account, paid API, or third-party request
is needed to use the website. System fonts and project-relative assets work on
GitHub Pages and direct file previews. With JavaScript off, the original JSON and
native evidence guide remain available.

## Preview and regeneration

Open `index.html`, or serve this folder:

```powershell
python -m http.server 5188 --bind 127.0.0.1
```

Visit `http://127.0.0.1:5188/`. To regenerate after an authorized catalog change:

```powershell
node scripts/build-catalog.cjs
node scripts/build-catalog.cjs --check
node scripts/build-results.cjs
node scripts/build-results.cjs --check
```

## Checks

Developer checks require Playwright and axe-core; the website itself does not:

```powershell
npm install --no-save --package-lock=false --ignore-scripts playwright axe-core
npx playwright install chromium
node tests/verify-real-catalog.cjs
node tests/verify-ui.cjs
node tests/verify-results.cjs
python tests/verify-static.py
python tests/check-source-links.py
```

Existing installations can be selected with `LAB_PLAYWRIGHT_MODULE`,
`LAB_AXE_SCRIPT`, and optional `LAB_BROWSER_CHANNEL=msedge`. Tests use one
separate headless browser sequentially and close only their own contexts. They
do not control desktop apps, Rocket League, or existing browser sessions.
Reports and screenshots are saved to ignored `evidence/`.

## Deployment and integration

Existing Pages settings were read: `main`, repository root, legacy branch
deployment at `https://pazneria.github.io/lab/`. Home links use `/` on the shared
domain. Merging reviewed commits to main publishes through this existing
workflow. Coordinate homepage linking separately after deployment verification.
This repository change leaves homepage files untouched.

After publication, `node tests/verify-deployment.cjs` checks the live Pages files
against the current Git commit and exercises catalog details, exact sources,
filters, keyboard controls, mobile reflow, and accessibility. It uses the same
developer test dependencies and writes `evidence/deployment-validation.json`.

Library catalog materialization failed on Windows; it was not retried or
modified after the parent supplied JSON. The ZIP schema/validator are not claimed
to have run. The local checks validate the provided JSON and its display mapping.
