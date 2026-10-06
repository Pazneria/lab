# Walkable benchmark integration — 2026-10-06

Added `/walkable-3d/` from main `6797ad8932b76d53c36ed02564460192095c9c0d`, on an isolated checkout and branch. Existing gallery changes are limited to an additive navigation link in `index.html` and `benchmarks.html`. Existing benchmark data/renderers, infrastructure, room and external homepage are unchanged. The static-link test now understands directory index routes.

The first real pair is Alder Halt and Bracken Hollow. Both portable archives and hosted runtime files retain their exact original bytes, checked against the ZIP members. Producer evidence is preserved, model/effort configuration is explicitly labeled requested rather than verified backend identity, and diagnostics are separate from Jordan's empty-by-default personal grades. The original common prompt is recovered from the completed Astra task and preserved verbatim. Luna is not admitted by this change.

Original archive SHA-256:

- Alder Halt: `26bf3c4617b4a24a33410d18c42b524752e438bcc160bf7f21b0a8b5d46da785`.
- Bracken Hollow: `6c8832c25dc73678f93b0b709195964a2337c709f29c446a0eed014ce1a73d6e`.

See [the host design, scoped security audit and admission rules](../walkable-3d/README.md) and each entry's `provenance.json` for source mappings and hosting-only substitutions. No entrant code was rebuilt, repaired or optimized.

## Validation

- `tests/verify-walkable-integrity.py`: 28 recorded file hashes, original ZIP hashes, exact archived runtime/evidence comparisons, and both preview size budgets pass.
- `tests/verify-walkable.cjs`: desktop/mobile reflow at 1440, 1024, 768, 700, 390 and 320 pixels; no iframe/canvas or scene/ZIP downloads on the gallery; under 350 kB of decoded static resources; mouse lock, real keyboard walking/reset and release for each actual entry; opaque-origin DOM/storage isolation; frame removal on close, Back, repeated opens, entry replacement, navigation and the hidden-tab lifecycle handler; static Forward/reload/deep links; independent local grades/preferences, JSON export, storage denial and a one-entry waiting state; missing HTML, missing module and bad integrity fail without a retained frame. No normal-flow page errors or external runtime requests.
- `tests/verify-gallery-navigation.cjs`: existing desktop/keyboard/touch gallery Back/Forward, cohort changes, source anchors, filters, scroll/focus restoration and storage-disabled fallbacks pass.
- `tests/verify-static.py`: local file/fragment references and public homepage/repository/Lab/3D-room destinations pass.
- `scripts/build-catalog.cjs --check`, `scripts/build-results.cjs --check`, JavaScript syntax and Git whitespace checks pass. No source data regenerated.

Local browser: dedicated headless Chromium 147.0.7727.15, driven by the available Playwright installation. Screenshots of the desktop gallery, mobile gallery and expanded mobile inspector were reviewed. Test reports and screenshots are retained under ignored `evidence/`. Readiness and failed-asset tests explicitly activate their own headless test tab before execution. Producer performance numbers come from their original records; host checks do not assign new performance grades. Native touch movement is unsupported by both entrants and labeled accordingly.

The site uses the existing main/root legacy GitHub Pages workflow; no deployment settings, backend, credentials or paid services are introduced. Publication and exact served-file checks are recorded separately in the task's deployment receipt.
