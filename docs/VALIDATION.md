# Local validation · 2026-09-30

**Result: the full source-grounded discovery interface passes local checks.**
It contains 19 catalog entries plus the separate VoxelBench watch, 51 exact
source URLs, and 30 metric definitions with all values null. The original input
is parent-supplied research, not successfully materialized Library content.

## Data and real interface checks

- Source builder validates 20 unique records, original area counts (5/4/5/6),
  status counts (11 live / 6 historical / 2 ongoing / 1 unverified), 51 sources,
  metric/source references, exact URL preservation, disabled aggregation, and
  null metric values/subjects/result dates. Original JSON SHA-256 is recorded in
  `evidence/catalog-validation.json`.
- Real-data browser tests compare every entry against the original JSON:
  name, summary, scope, lifecycle basis, verification note, result interpretation,
  may-infer and may-not-infer statements, next step, all metric protocols,
  and exact source links. Watch and showcase types remain distinct.
- Seven widths: 1440, 1024, 768, 720, 640, 390, 320px; no horizontal overflow.
  Expanded real medical detail, long URLs, and 200% text at 320px also reflow.
- All four category counts, all four lifecycle statuses, eight evidence settings,
  search, URL reload/reset, and source-entry permalinks pass. Filtering to
  prospective medical trials returns MASAI and Kenya; retrospective/simulated
  tasks are separate. Their original outcome limitations remain visible.
- Keyboard skip link, radio arrows, Enter reset/native details, focus styles,
  forced colors, and reduced motion pass with real records. With JavaScript off,
  the complete original JSON and native evidence guide remain accessible.
- Four real-data axe A/AA/best-practice scans (desktop/mobile, catalog/expanded
  medical detail): **zero violations**. Four fallback/synthetic regression scans
  also have zero violations. Decorative glyphs retain the reviewed 11.28:1
  contrast; control boundaries measure 3.40:1. Automated incomplete findings
  are retained in the raw reports and do not imply full assistive-tech coverage.
- The 13-group fallback/security regression suite also passes, covering
  unavailable/invalid data, malicious text/URLs, non-null scores, duplicate IDs,
  impossible dates, absent limits, URL history, and direct file preview.
- No browser errors, missing assets, or third-party runtime requests.
  Static fragments, local assets, SVG, original JSON link, and public navigation
  are checked. JavaScript syntax and Git whitespace checks pass.

Test environment: Edge `154.0.4258.48`, Playwright `1.63.0`, axe-core `4.13.0`.
One separate headless browser ran sequentially. No user app, Rocket League, or
existing browser session was controlled.

## Source URL responses

One lightweight GET was made per exact original URL, with two read-only requests
at most in flight. **50 of 51 returned HTTP 200.** Original URLs were retained,
including two observed redirects: Reddit added a trailing slash, and the MedHELM
DOI redirected to its Nature publication.

The BARN source
`https://people.cs.gmu.edu/~xiao/Research/BARN_Challenge/BARN_Challenge26.html`
failed this environment's TLS certificate verification:
`CERTIFICATE_VERIFY_FAILED: unable to get local issuer certificate`.
Its URL and research entry remain intact. TLS validation was not disabled and
the request was not retried through an alternate route.

An HTTP 200 verifies reachability, not benchmark claims, current numerical rows,
protocol correctness, scientific validity, paywall-free content, or clinical
readiness. VoxelBench's current standings remain unresolved despite a reachable
URL. Snapshot lifecycle/access labels are not rewritten from these checks.
Per-source statuses, final URLs, timing, and errors are in
`evidence/source-links.json`.

## Corrected failures and limits

Earlier scaffold checks caught a reset timing bug after URL reload and 548px
overflow at 320px with 200% text. Explicit reset defaults and flexible track/
heading wrapping fixed both; regressions pass. Test assertions were corrected
for visually uppercase labels. Full-page screenshot state was reset before
capture so fixed/sticky UI does not appear at an unrelated scroll position.

Library catalog transfer failed before installation because the Windows helper
could not apply xattrs. Parent-supplied JSON resolved content access without
retrying or modifying that helper. The original ZIP validator is not claimed to
have run. Current source verification remains the inherited research snapshot,
with separate response checks; no results or rankings were added.

Desktop, mobile, and medical detail screenshots were visually inspected.
The actual-source screenshots are `lab-catalog-*` and `lab-medical-detail-*`;
fallback regression images depict intentional empty/error states.
Reports/screenshots are in local ignored `evidence/` and packaged with the
handoff. These checks preceded publication. Deployment verification is recorded
separately; homepage files are outside this change.
