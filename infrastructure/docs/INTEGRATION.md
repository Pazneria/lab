# Infrastructure atlas candidate

Base: `132cb8dce5a2b120a4390ce8e8066ba88fa6bcd9` on `Pazneria/lab` main.
Local branch: `codex/infrastructure-atlas`.

## Boundary

Every added file lives under `infrastructure/`. No benchmark data, benchmark UI,
root page, shared navigation, 3D Lab station or hosting configuration is changed.
The atlas's own return links point to the existing `../lab-space/` route.

The future public route is `https://pazneria.github.io/lab/infrastructure/`.
Existing GitHub Pages main/root hosting can serve the directory without a new
service or build pipeline. Local preview also works by opening
`infrastructure/index.html` directly.

## Parent review and integration

1. Review `data/atlas.json` and the visible site/profile panels against the
   supplied seven research packets plus final delta. The builder's canonical
   checksum and reference checks are in `data-validation.json`.
2. Coordinate the exact shared-navigation entry with the owner of those files.
   Link to `/lab/infrastructure/`; do not repurpose the benchmark entry or route.
3. Fetch current main and integrate this isolated commit onto the coordinated
   branch. No files outside `infrastructure/` should conflict.
4. Repeat `build-atlas.cjs --check` and the atlas browser check, plus the shared
   navigation owner's relevant checks if navigation is changed.
5. Publish through the existing GitHub workflow only after source/semantics
   review and navigation coordination. Confirm the Pages build commit and served
   files after deployment. No push, PR, merge or publication is part of this
   local candidate.

## Verified

- Parent-corrected counts: 25 sites, 25 players (18 featured), 14 products,
  28 relationships, 49 sources, nine investment records and seven developments.
- IDs, source/entity references, original null capacities, typed measurements,
  M15X uncertainty, Rainier program/site boundary, corrected GB200/Blackwell
  separation, and packaging throughput invariants.
- Headless Microsoft Edge 154: combined map filters, company roles, product and
  evidence filters, all site deep links, keyboard activation, clustered
  Singapore records, URL reload, and reset/empty states.
- 1440, 768, 390 and 320 pixel widths without horizontal overflow.
- Basemap failure, data-script failure, JavaScript disabled, direct local-file
  preview, HTTPS source links with opener protection, and text-safe rendering.
- No external runtime requests and no browser page errors in the completed run.
- axe-core 4.11 reports zero automated violations in desktop, mobile and
  supply-chain views for the selected WCAG/best-practice rules.

The machine report and screenshots are under ignored
`evidence/infrastructure/`. Screenshot names include `desktop.png`,
`supply-chain.png`, `mobile.png`, `mobile-detail.png` and `power-detail.png`.

## Limits

Sources were independently researched by the parent research worker; this
implementation verifies preservation and display, not a second independent
factual audit of all 49 URLs. No live Pages deployment has been tested. Browser
coverage is headless Edge, not physical mobile hardware, Safari or Firefox.
Automated accessibility checks are not a screen-reader user test; axe also
flags incomplete ARIA and color-contrast checks for manual review. Screenshots
were visually inspected for desktop and mobile detail layout.

Region controls provide fixed views rather than free-form pan/zoom. The data is
a curated sample with gaps listed in the source index, and dates are the last
publicly reported observations. There is no automatic refresh or status upgrade
when a target date passes.
