# Infrastructure atlas integration

Base: `132cb8dce5a2b120a4390ce8e8066ba88fa6bcd9` on `Pazneria/lab` main.
Local branch: `codex/infrastructure-atlas`.

## Boundary

Every added file lives under `infrastructure/`. The one agreed shared change is
an `AI infrastructure` link in `lab-space/index.html` inside `nav#tools`, pointing
to `/lab/infrastructure/`. No benchmark data, benchmark UI, root page, 3D station
or hosting configuration is changed.
The atlas's own return links point to the existing `../lab-space/` route.

The room regression test also reloads before its keyboard-cancellation and
bench-arrival scenarios. This restores a known starting distance; the previous
sequence could reach the bench before its pre-arrival assertions. Every original
assertion remains. No room JavaScript or geometry changed.

The public route is `https://pazneria.github.io/lab/infrastructure/`.
Existing GitHub Pages main/root hosting can serve the directory without a new
service or build pipeline. Local preview also works by opening
`infrastructure/index.html` directly.

## Parent review and integration

1. Parent source/semantics review passed, including 13 primary sources and the
   screenshots. The final delta records the requested Intel URL repair and three
   literal ampersand corrections. The builder's checksum and reference checks
   are in `data-validation.json`.
2. Parent approved the single shared-navigation link described above. The
   benchmark owner remains responsible for separate benchmark changes.
3. Fetch current main and integrate it safely before release. The atlas and
   agreed navigation entry remain separate from benchmark PR #17.
4. Repeat `build-atlas.cjs --check` and the atlas browser check, plus the shared
   navigation owner's relevant checks if navigation is changed.
5. Publish through PR #18 using the existing GitHub Pages workflow. Confirm the
   Pages build commit, exact served dataset/assets and both navigation routes
   after deployment. Save release receipts in ignored evidence.

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
- axe-core 4.13 reports zero automated violations in desktop, mobile and
  supply-chain views for the selected WCAG/best-practice rules.

The aggregate release checks and initial failures are recorded in
`aggregate-validation.json`. Three catalog checks initially used axe 4.11 and
passed when rerun with the repository's documented 4.13. The room test exposed
the scenario-state issue described above; a separate run with isolated starting
states established the fix before applying it to the canonical test.

The machine report and screenshots are under ignored
`evidence/infrastructure/`. Screenshot names include `desktop.png`,
`supply-chain.png`, `mobile.png`, `mobile-detail.png` and `power-detail.png`.

## Limits

Sources were independently researched by the parent research worker; this
implementation verifies preservation and display, not a second independent
factual audit of all 49 URLs. Deployment results are recorded separately. Browser
coverage is headless Edge, not physical mobile hardware, Safari or Firefox.
Automated accessibility checks are not a screen-reader user test; axe also
flags incomplete ARIA and color-contrast checks for manual review. Screenshots
were visually inspected for desktop and mobile detail layout.

Region controls provide fixed views rather than free-form pan/zoom. The data is
a curated sample with gaps listed in the source index, and dates are the last
publicly reported observations. There is no automatic refresh or status upgrade
when a target date passes.
