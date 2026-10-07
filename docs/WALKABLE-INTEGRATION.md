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

## Publication footprint correction

The Pages exclusion list retains standard Jekyll defaults and narrowly excludes this benchmark's original ZIPs, raw evidence folders, local preview/test helpers and this development record. Public links now lead to retained provenance and concise records; per-file hashes still identify all excluded originals. Frozen entrant runtime bytes are unchanged. `verify-walkable-publication.py` checks an explicit publication allowlist, link targets, the actual Pages artifact and optional live hashes/404s. Existing unrelated Lab scripts/tests remain in their prior scope.

## In-world comparison and completed manual entry

The room now has a north-cabinet screen that draws only static JPEGs. Its ray-picked stills and bounded arrows operate the same three pairings as accessible native controls. The old catalog monitor, exits, furniture/navigation and standalone benchmark remain. The host viewer was extracted without weakening its opaque sandbox/CSP/integrity checks; the room suspends rendering and input before launch and resumes after child destruction. History preserves the room position and pair while restored scene URLs remain static. The host bridge explicitly releases pointer lock on Escape.

Bracken Hollow Station is the completed manual Opus folder, preserved as a clearly labeled host snapshot (no producer archive supplied). Its source runtime and local Three.js 0.169.0 dependency files were copied exactly. The sole additional in-memory substitution relocates the import map from node_modules/three to vendor/three. Exact backend/version/effort, implementation start, deadline compliance and elapsed time are unknown. No failed CLI launch time is attributed to implementation. All 41 recorded file hashes pass; the preview is 100,186 bytes. First-party source contains no external runtime requests, tracking, credential/storage access, workers or parent navigation. The launch server is not published.

The separate Luna assessment found only index.html (42,862 bytes), package.json (296) and README.md (1,305). Read-only isolated loading through its original jsDelivr import reached ready, captured pointer, moved with W and reset with R. Synthetic Esc release was not confirmed within the test timeout. No repair, packaging or admission occurred.

PR24's footprint deployment succeeded at e51bb0278ea4f1d39d6255aee80025a05d13fef1, run 37405392453. The actual Pages artifact contained 31,381,337 bytes across 408 files; walkable-3d contained 3,079,009 bytes across 31 files. All 26 admitted source files matched live bytes after Git's normal host-text newline normalization, and all 17 excluded URLs returned 404. The automated PR24 code review did not run due to a code-review usage limit; empty threads were not treated as a clean review. This is distinct from the completed PR23 review and from test evidence.

The final room lifecycle harness uses one dedicated headless Chromium and fresh failure contexts. It ray-picks real screen arrows and the Opus still, counts parent WebGL draw calls (zero while a child runs), checks real walking/reset/Escape and same-position/pair return, repeats openings, tests Back/Forward and hidden-tab teardown, injects a missing module, and checks 320–700px and flat/reduced-motion controls. Browser reuse of an already compiled module is avoided by a fresh context for failure injection. No entrant failure was repaired. A history-state bug found during this work was fixed in the host: hiding a scene now clears only its scene marker, preserving Lab position/pair. Normal-flow page errors and external requests are empty.

The existing room regression suite passes all 23 checks, including six collision-aware routes, actual catalog monitor/floor hits, Home, touch controls, context-loss/unavailable-WebGL/JS-off fallbacks, and both desktop/mobile WCAG A/AA audits using test-only axe-core 4.10.3. This library is outside the repository and publication. Screenshots of the actual in-world screen and mobile native comparison dialog were reviewed. No benchmark grades were assigned.

An additional static-controls check passes the open mobile comparison dialog's WCAG A/AA audit, cross-page notebook-grade preservation when room preferences are written, and the one-entry waiting/two-entry single-pair arrow boundaries. The standalone viewer suite passes all 11 groups after sharing the host viewer. Its initial static decoded payload remains below 350 kB. All scene tests ran sequentially in separate headless browser contexts; the user's browser was not controlled.

`git diff --check` is clean for host-authored changes. Two inherited whitespace notices in the untouched Opus dependency/prompt are intentionally retained: a space before a tab in Three.js and the supplied task prompt's trailing whitespace. Frozen byte integrity takes precedence over formatting those originals.

## Precise exhibit activation

The comparison texture now shares its drawn rectangles with pointer hit-testing. Only an actual still image (excluding letterboxing), an explicit missing-preview placeholder, or a rendered enabled button activates its action. Captions, headings, margins and gaps have no action. The room ray uses the canvas CSS bounds and the nearest visible surface; nearby furniture and broad spatial regions no longer inherit exhibit destinations. A press and release must identify the same action without a drag or intervening camera movement. Keyboard and native-button activation remain available.

`node --experimental-vm-modules --test tests/verify-walkable-hit-targets.test.mjs tests/verify-walkable-public-judgments.test.mjs` passes nine CPU-only checks. These use input math, synthetic Three.js ray geometry and a mocked canvas/DOM; they do not create a renderer, run an entrant, or launch a browser. They cover hit boundaries, gaps, occlusion, canvas offsets, drag cancellation, missing/failed thumbnails, native controls and voting gates. All 351 recorded file hashes across 33 entries match. No frozen submission was changed. Browser/GPU validation and 15 missing screenshot captures remain pending separate capture authorization; a cloud browser's missing WebGL capability is not an entrant failure.

## Post-freeze preview capture

After explicit approval at 2026-10-06 23:49 UTC, all 15 missing previews were captured from the actual hosted scene canvas at the original starting viewpoint. The JPEGs are 960 by 600 pixels, individually below 180 kB, and total 1,355,764 bytes. Each has a public `preview-capture.json` with source URL, capture timestamp, frozen HTML hash, start control, canvas dimensions, crop/resize details and image hash. Canvas-only extraction excludes separate DOM model labels without changing the scene. Partial status and runtime-verification limits remain; K17's previously failed entry has no fabricated screenshot.

Capture used one headless browser and one scene at a time. The first automation context injected a service-worker blocker that read an API unavailable in opaque sandboxed frames; five attempts were interrupted. That browser was closed and its process cleanup verified before retrying those five with normal context defaults. All five then captured successfully. The existing host sandbox/CSP and frozen sources were unchanged. Both sessions were closed, with no recorded owned browser/test processes or descendants remaining. No navigation/performance QA, grades or votes were submitted. Existing automatic entrant behavior was preserved.

CPU validation checks all 381 recorded file hashes, the 427-file publication allowlist, actual JPEG dimensions and budgets, capture metadata, and availability/completion labels. All 351 previously recorded files remain byte-identical. The integrity/publication checks now also understand the later imports' explicit external-archive retention descriptions and descriptive retained-source categories.
