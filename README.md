# Lab · AI benchmark gallery

A source-backed gallery of **73 individual cards**, grouped into **51 benchmark families with real graphs** in the default view. Cards span standard tests, community projects, frontend development, games, medicine, physical systems, workplace agents, long context, audio, video and languages. Related versions and setups have selectors; older direct URLs remain usable. Nine guides without admitted graphs and 52 additional research candidates stay in compact directories.

The page preserves all **20 original discovery records**, their 51 URLs and 30 null metric definitions. The original **18 result rows and seven graph views**, 340 standard rows, frontend packet and expanded community source records remain unchanged. The new coverage input adds 319 primary rows, 81 selected first-wave observations and 1,392 RuneBench skill summaries for 87 configurations. No global score, cross-benchmark rank or missing-value zero is introduced. Selected cohorts are clearly incomplete, and source review dates remain separate from publication and evaluation dates.

This combined increment is an **unpublished draft in PR 17** for parent source review. The full public research input was supplied in 15 ordered JSON parts after Library materialization failed on Windows. It was reconstructed and validated successfully; no Library download success is claimed. See [the combined coverage draft and narrow security review](docs/COVERAGE-DRAFT-2026-10-05.md). The external homepage, room and infrastructure remain outside the change.

See [catalog audit and pending evidence](docs/CATALOG-AUDIT-2026-10-05.md),
[gallery integration and scoped security review](docs/GALLERY-INTEGRATION.md),
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
- `data/gallery-metadata-2026-10-05.json`: derived evidence availability, cohort history and date semantics.
- `data/gallery-renderer-contract-2026-10-05-audit.json`: earlier status/date contract.
- `data/coverage-renderer-contract-2026-10-05.json`: combined draft renderer contract.
- `data/coverage-research-2026-10-05/`: reconstructed parent research, pinned text/CSV sources and provenance.
- `assets/coverage-graphs.js`: local signed-score, typed-unit and cost/time chart renderer.
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
node scripts/build-coverage.cjs
node scripts/build-gallery-metadata.cjs
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
node tests/verify-coverage.cjs
node tests/verify-gallery-navigation.cjs
node tests/verify-gallery-selection.cjs
node tests/verify-deployment-routing.cjs
node tests/verify-real-catalog.cjs
node tests/verify-ui.cjs
node tests/verify-results.cjs
python tests/verify-static.py
```

The coverage command checks the expanded gallery, exact values, signed axes, cost/time bases, exclusions, version controls and mobile/accessibility behavior. The older gallery/current/audit scripts describe previous fixed-size renderer contracts; the combined coverage contract supersedes their old card-count expectations.
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
work. This combined draft must remain unpublished until parent source review. This change owns the benchmark UI/data; homepage and the separately owned
3D `lab-space` room remain outside its scope. The homepage’s Lab link opens
`lab-space/`; that room’s benchmark station opens the root gallery. Preserve
both destinations and the additional `benchmarks.html` route.

After deployment, run the same browser checks against the live site:

```powershell
$env:LAB_GALLERY_BASE='https://pazneria.github.io/lab/'
node tests/verify-gallery.cjs
node tests/verify-gallery-audit.cjs
```

Live mode also compares 15 served files to the exact checked-out Git commit.
Confirm the Pages build head and successful workflow separately; capture those
receipts with the merge and browser evidence. Library provenance remains
parent-supplied input, not successful Windows materialization. The failed transfer
helper has not been retried or modified.
