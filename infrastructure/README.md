# AI infrastructure atlas

A standalone, source-backed first atlas for Jordan's Lab. Open `index.html`
directly, or serve the repository and visit `/infrastructure/`. The candidate
is not published. It changes only this directory.

The October 5, 2026 collection contains 25 sites, 18 featured players and seven
named partners, 14 products, 28 evidence-scoped relationships, nine investment
records, 49 public primary sources, and seven dated developments. It covers
logic fabs, manufacturing R&D, memory, packaging, assembly/test, compute, and
power. It is a representative collection, not a census.

The world map uses a local Natural Earth SVG, regional views and clickable
clusters. The complete site directory works without the basemap. `sources.html`
is a generated, readable fallback containing every site, company, product,
relationship, development and source. It works without JavaScript.

## Data and generation

`data/research-part-1.json` through `research-part-7.json` preserve the supplied
public research fields. `research-final-delta.json` preserves the final review
corrections. The builder joins them, validates references and invariants, and
generates three files:

- `data/atlas.json`: full merged source dataset, with original nulls and scopes.
- `assets/atlas-data.js`: presentation projection, loaded locally without fetch.
- `sources.html`: complete static record and source index.

```powershell
node infrastructure/scripts/build-atlas.cjs
node infrastructure/scripts/build-atlas.cjs --check
node infrastructure/scripts/build-map.cjs
```

Do not hand-edit the generated views. The builder changes display wording and
decodes the supplied `&amp;` strings in visible labels; the research fields remain
unchanged. Original source URLs and dates remain attached to each claim. The
review state remains `research_draft_not_published` until the parent coordinates
publication.

The renderer never adds capacities or spending. It distinguishes actual net
capex from planned project investment, planned facility capacity from energized
power, and power contracts from generation. Company relationships do not create
fab/customer assignments. Products and systems have separate IDs. Shared sites
have one record even when several players are connected.

## Verification

Use existing Playwright and axe-core installations. These are development-only
tools; the site has no runtime package dependencies.

```powershell
$env:LAB_PLAYWRIGHT_MODULE='path-to-playwright-module'
$env:LAB_AXE_SCRIPT='path-to-axe-core/axe.min.js'
$env:LAB_BROWSER_CHANNEL='msedge'
node infrastructure/tests/verify-atlas.cjs
```

The test opens its own headless browser and loopback server, and writes reports
and screenshots under ignored `evidence/infrastructure/`. It does not use the
user's browser sessions. Tested behavior includes combined filters, clusters,
keyboard selection, URL reloads, company/product links, status semantics, mobile
overflow, blocked-map fallback, missing-data fallback, JavaScript-disabled
records, local-file preview, safe links and text-safe rendering.

See `docs/INTEGRATION.md` for the integration boundary and verified limitations,
and `docs/ATTRIBUTION.md` for the bundled map source.
