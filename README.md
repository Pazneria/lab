# Lab · Benchmark discovery

A static benchmark discovery interface for Jordan's Lab. Search and filter by
category, source status, and evidence setting; read source links, evidence type,
limitations, and next verification steps. Entries are alphabetical. There is no
model performance comparison, score table, or ranking.

**Current branch is an empty-data preview.** The supported Library transfer failed
on Windows before installing the source ZIP. Zero catalog records are loaded;
VoxelBench is a separate unverified watch note. The 20 source entries and 51
reported links have not been integrated or checked. See
[catalog integration](docs/CATALOG-INTEGRATION.md) for the exact blocker and next
steps. Do not publish or add a homepage link before that work is completed.

## Static layout and deployment

- `index.html`: accessible page, empty state, watch note, and evidence guide.
- `assets/lab.css`: responsive editorial layout, focus styles, reduced motion,
  forced colors, and print styles. System fonts; no remote font requests.
- `assets/catalog.js`: display projection. Currently empty, deliberately.
- `assets/lab.js`: validated text rendering, filtering, exact source links,
  shareable filter parameters, and native expandable evidence details.
- `assets/mark.svg`: J² favicon.
- `tests/verify-ui.cjs`: sequential headless browser checks.
- `tests/verify-static.py`: static asset/fragment and public navigation checks.

Existing GitHub Pages configuration was read on 2026-09-30: `main`, repository
root, legacy branch deployment at `https://pazneria.github.io/lab/`. Keep assets
relative to this project path. Home links use `/` on the shared domain.
No build step, backend, accounts, paid APIs, or runtime dependencies are added.
Merging to `main` publishes through existing Pages settings, so integration must
be coordinated. The homepage repository and its active branch are untouched.

## Preview

Open `index.html` directly, or run an existing static server:

```powershell
python -m http.server 5188 --bind 127.0.0.1
```

Visit `http://127.0.0.1:5188/`. The Home link resolves to the preview server root
locally; its actual destination is `https://pazneria.github.io/`.

## Browser checks

The website needs no installation. To run developer checks, make `playwright`
and `axe-core` available to Node, and install Playwright Chromium if needed:

```powershell
npm install --no-save --package-lock=false --ignore-scripts playwright axe-core
npx playwright install chromium
node tests/verify-ui.cjs
python tests/verify-static.py
```

Alternatively set `LAB_PLAYWRIGHT_MODULE` to an existing Playwright module and
`LAB_AXE_SCRIPT` to the existing `axe.min.js`, then run the same script. Optional
`LAB_BROWSER_CHANNEL=msedge` uses an already installed Edge binary. Tests launch
one separate headless browser sequentially and close only their own contexts.
They do not control desktop apps, Rocket League, or existing browser sessions.

The checks cover empty data, invalid data, search/filter/reset and URL state,
details and exact links using in-memory TEST ONLY fixtures, keyboard navigation,
multiple viewport widths, 200% text, reduced motion, forced colors, no JavaScript,
file preview, subpath assets, and axe WCAG A/AA checks. Reports and screenshots
go to ignored `evidence/`. Automated checks do not replace assistive-technology
review or actual catalog verification.

See [the recorded validation](docs/VALIDATION.md) for actual results and corrected
failures in this environment.
