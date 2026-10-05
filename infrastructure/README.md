# AI infrastructure atlas

Static atlas for Jordan's Lab at `/lab/infrastructure/`. Independent source/semantics
review passed and publication was authorized after the final evidence corrections
and checks. The first edition remains in Git history (PR #18); this revision is PR #19.

The October 5, 2026 snapshot has 94 canonical facilities, 32 companies (18 featured),
14 products, seven lab profiles, 30 relationships and 126 public sources. The atlas
provides 140 dedicated entity pages, a searchable directory and a geographic map.
Twenty-five facilities have reviewed map locations: 22 sourced reference points and
three explicitly approximate areas. The other 69 have address/locality records and
no invented coordinates. Seventy-five facilities have attributed Epoch AI estimates.
Coverage is representative, not a census.

## Read and explore

- `/infrastructure/`: pan/zoom map, combined facility filters and compact preview.
- `companies/<id>/`: power evidence, model/training records, facilities and partners.
- `facilities/<id>/`: identity, role distinctions, power estimates, history and location.
- `products/<id>/`: designer, process, public facility assignments and supply links.
- `directory/`: search by name, locality and type; every record is native HTML.
- `sources.html`: source index and links to complete static entity records.
- `data/atlas.json`: merged public dataset, including unknowns and archived scopes.

Entity pages and the directory remain readable without JavaScript. The main atlas
uses local script data and has a static fallback. Opening `index.html` directly also
works; optional external street tiles are disabled for file URLs.

## Data and generation

Preserved inputs: seven original research packets and final delta; eleven profile
packets in `data/profiles/`; five location packets in `data/locations/`; final citation corrections in
`data/profiles/review-corrections.json`. The normalized
Epoch selection is `data/profiles/epoch-sites-2026-10-05.json`. Raw, unfiltered CSV
snapshots remain in ignored evidence and are not published.

```powershell
node infrastructure/scripts/build-atlas.cjs
node infrastructure/scripts/build-atlas.cjs --check
node infrastructure/scripts/build-geography.cjs --check
```

The builder validates source/entity references, model scopes, location counts,
source hashes and the Narvik identity before generating JSON, browser data, the
source index, entity pages and directory. Do not hand-edit generated outputs.
`render-evidence.cjs` escapes public text and renders typed evidence; it never accepts
raw HTML from a research packet. Original records and superseded source versions
remain in the merged dataset.

To reproduce the Epoch selection, first place the three exact CSV snapshots named
in `data/profiles/research-part-04.json` under
`evidence/infrastructure/epoch-snapshots/`, then run:

```powershell
python infrastructure/scripts/import-epoch.py --check
```

The importer verifies reviewed byte lengths and SHA-256 hashes before parsing. It
never downloads, geocodes, or silently substitutes a changed upstream snapshot.
Its selection is the seven labs and their named hardware-owner/user relationships.
It joins exact facility names, applies the 2026-10-05 cutoff and keeps future scenarios
separate. Each chip type uses its latest dated count; historical counts are not added.

## Interpretation

All seven lab-wide operating-power totals remain unknown. Site capacity is distinct
from metered consumption, IT power from total facility power, and chip ownership
from building ownership or customer access. Owner-sample subtotals are incomplete,
can include external customers, and are neither model-lab allocations nor hard lower
bounds. Estimates have immediate labels, dates and methods. Model FLOPs count
accumulated operations; FLOP/s, watts and energy are different quantities. Microsoft
MAI-Thinking-1's partial pre/mid-training estimate is not a total-training estimate.
Future agreements and shared projects are never added into a global GW sum.

## Verification

Use the repository's documented axe-core 4.13 and an existing Playwright installation:

```powershell
$env:LAB_PLAYWRIGHT_MODULE='path-to-playwright-module'
$env:LAB_AXE_SCRIPT='path-to-axe-core/axe.min.js'
$env:LAB_BROWSER_CHANNEL='msedge'
node infrastructure/tests/verify-atlas.cjs
```

The test uses its own loopback server and headless browser. It checks all entity
routes, sources, semantic invariants, keyboard interactions, filter URL/reset behavior,
cluster selection, mobile widths, map/data failure, no-JavaScript pages and local-file
preview. It intercepts every street-tile request; it never crawls the OSM service.
Reports/screenshots go to ignored `evidence/infrastructure/`.

After the Pages build succeeds, set `LAB_ATLAS_COMMIT` to its exact 40-character
commit and run `node infrastructure/tests/verify-publication.cjs`. It compares every
native atlas entity page and runtime asset with committed Git bytes, verifies the
shared Lab/benchmark routes, and checks live map behavior and corrected citations.
OSM tile requests remain blocked in browser verification. Release receipts are
written to ignored evidence; a source approval alone is not a deployment receipt.
See `docs/INTEGRATION.md` for the review boundary and `docs/ATTRIBUTION.md` for credits.
