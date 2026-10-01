# Lab · AI benchmark gallery

A source-backed gallery of **42 benchmark cards** spanning standard tests, community
projects, games, medicine and physical systems. Twenty-five cards show real graphs;
17 are clearly labeled evidence guides without ingested model scores. A card
opens an interactive graph with plain-English explanations. Sources, settings,
exact tables and full records remain in expandable disclosures.

The page preserves all **20 original discovery records**, their 51 URLs and
30 null metric definitions. The original **18 result rows and seven graph
views** cover RuneBench, BullshitBench V2 and historical MedAgentBench. A separate
dated dataset contains **340 supplied primary rows** across 22 separate source cohorts.
There is no aggregate score or global model ranking. Historical and cross-lab
reported results are explicitly labeled; missing values remain null.

The Results selector separates current evidence and historical versions. Large
cohorts have configuration search and a Show all option. Community views expose
228 BullshitBench rows and 48 Rune runs across 16 skills; a separate historical
medical view contains 12 author-homepage results. The existing seven verified
charts remain available with their exact cost/time meanings.

See [gallery integration and scoped security review](docs/GALLERY-INTEGRATION.md),
[current refresh and renderer review](docs/CURRENT-GALLERY-INTEGRATION.md),
[original result validation](docs/RESULTS-INTEGRATION.md), and
[catalog provenance](docs/CATALOG-INTEGRATION.md).

## Pages and data

- `benchmarks.html`: stable visual gallery, category/search filters and score-graph filter.
- `index.html`: stable root gallery, used by the 3D room’s benchmark station.
- `results.html?benchmark=hle-diamond`: interactive detail page for any card.
- `catalog.html`: retained full research index with status/setting filters.
- `results-technical.html`: retained original three-benchmark result explorer.
- `data/catalog.original.json`: parent-supplied original discovery input.
- `data/results.original.json`: original 18 rows, protocols, sources and graph configurations.
- `data/results-rune-evidence.json`: numeric-only validation evidence for 720 samples and clocks.
- `data/standard-benchmarks.original.json`: archived first 30-row standard cohort input.
- `data/gallery-current-2026-10-01.json`: 22 current and historical source cohorts.
- `data/community-expanded-2026-10-01.json`: complete expanded community records.
- `data/gallery-renderer-contract-2026-10-01.json`: reviewed dated renderer contract.
- `data/gallery-notes.json`: separate editorial explanations; no research values.
- `assets/gallery.js`, `assets/gallery.css`: text-safe gallery/detail implementation.
- `assets/results.js`, `assets/results.css`: shared validated original chart renderer.
- `assets/catalog.js`, `assets/results-data.js`, `assets/gallery-data.js`: generated projections.

The site uses local scripts, SVG/DOM graphs and system fonts. It needs no package
installation, backend, account or external runtime resource. No evaluations or
paid API runs are performed. Direct file previews work; with JavaScript disabled,
original JSON and source interpretation remain available.

## Preview and generation

Open `index.html` directly or serve the repository on loopback:

```powershell
python -m http.server 5188 --bind 127.0.0.1
```

Visit `http://127.0.0.1:5188/`. Regenerate and validate the static data:

```powershell
node scripts/build-catalog.cjs --check
node scripts/build-results.cjs --check
node scripts/build-gallery.cjs
```

The gallery builder asserts archival checksums, exact cohort counts and source
relationships, including HLE partition/tool membership and null generic cost/time.

## Validation

Playwright and axe-core are developer-only tools, not frontend dependencies.
Use existing installations through `LAB_PLAYWRIGHT_MODULE`, `LAB_AXE_SCRIPT` and
optional `LAB_BROWSER_CHANNEL=msedge`. If needed, install them separately from the
site with lifecycle scripts disabled. Tests launch and close their own headless
browser; they do not interact with existing desktop sessions or apps.

```powershell
node tests/verify-gallery.cjs
node tests/verify-current-gallery.cjs
node tests/verify-gallery-navigation.cjs
node tests/verify-gallery-selection.cjs
node tests/verify-deployment-routing.cjs
node tests/verify-real-catalog.cjs
node tests/verify-ui.cjs
node tests/verify-results.cjs
python tests/verify-static.py
```

The first command checks the current gallery and detail pages. The current-gallery
command checks large cohorts, expanded evidence, uncertainty labels and history.
The navigation
command checks Back/Forward, repeated view switches, filter/scroll restoration,
reload, direct links, keyboard, touch and the storage-disabled fallback. The selection
command checks that filters and Show all clear hidden result details, preserve visible
selections, and reset details when changing cohorts or graph settings. The deployment
routing command checks the retained catalog and results pages and verifies that
the gallery and detail pages are rejected as substitutes. The next three commands
retain regression coverage for the original research renderers. Reports and
screenshots go to ignored `evidence/`. The existing source-response report retains
the BARN certificate failure; no warning is bypassed. Functional and scoped
security checks are not a security certification.

## Publication

The selected repository is `Pazneria/lab`, with its existing `main`/root legacy
GitHub Pages workflow at **https://pazneria.github.io/lab/**. Publish tested,
reversible commits through a pull request after fetching and preserving remote
work. This change owns the benchmark UI/data; homepage and the separately owned
3D `lab-space` room remain outside its scope. The homepage’s Lab link opens
`lab-space/`; that room’s benchmark station opens the root gallery. Preserve
both destinations and the additional `benchmarks.html` route.

After deployment, run the same browser checks against the live site:

```powershell
$env:LAB_GALLERY_BASE='https://pazneria.github.io/lab/'
node tests/verify-gallery.cjs
```

Live mode also compares 15 served files to the exact checked-out Git commit.
Confirm the Pages build head and successful workflow separately; capture those
receipts with the merge and browser evidence. Library provenance remains
parent-supplied input, not successful Windows materialization. The failed transfer
helper has not been retried or modified.
