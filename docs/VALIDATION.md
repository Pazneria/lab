# Local validation · 2026-09-30

**Result: interface scaffold passes its checks. Actual catalog integration is
blocked.** The checked-in runtime catalog contains zero records; the VoxelBench
note is explicitly unverified. This is not yet the requested 20-entry discovery
catalog and should not be published or linked as completed content.

## Checks completed

One separate headless Edge browser ran the checks sequentially. Tested versions:
Edge `154.0.4258.48`, Playwright `1.63.0`, axe-core `4.13.0`.

- Seven viewport widths: 1440, 1024, 768, 720, 640, 390, 320px. Document and body
  width fit every viewport. Desktop and mobile screenshots were visually checked.
- 200% text at 320px reflows without horizontal overflow. Screenshot reviewed.
- Keyboard: skip link moves focus to main; visible 3px focus ring; arrow keys
  operate radio/select filters; Enter activates reset and native disclosures.
- Search, category/status/setting combinations, reset, reload, URL parameters,
  history events, no-match state, and entry deep links pass.
- Text is rendered safely, exact source strings remain exact, missing dates say
  "Not recorded", and null scores do not become zero or a ranking.
- Invalid projections fail visibly: non-null score, unsafe URL, duplicate ID,
  impossible date, missing limitations, unavailable data with entries, and absent
  catalog script all show zero records.
- Four axe A/AA/best-practice scans: actual empty mobile/desktop and expanded
  synthetic detail mobile/desktop. **Zero violations** in each. The single
  incomplete rule per scan is glyph color contrast for decorative arrow/reset
  symbols; their computed contrast is **11.28:1** and they were visually checked.
  Input/select boundaries measure **3.40:1** against the adjacent background.
- Forced colors retain visible focus/controls; reduced motion disables smooth
  scrolling. No-JavaScript preview preserves honest empty content, navigation,
  watch note, and native evidence-guide disclosure.
- Direct `file:` preview works. Served `/lab/` preview loads local relative
  assets. No browser errors, missing assets, or third-party runtime requests.
- Every static fragment target and linked asset exists. SVG parses; asset byte
  counts and SHA-256 hashes are recorded in `evidence/static-links.json`.
- Public homepage, Lab repository, and existing published Lab URL return HTTP
  200 without redirects. Existing Pages configuration is `main` at `/`, legacy
  branch deployment. This verifies navigation and deployment conventions, not
  publication of this branch.
- JavaScript syntax checks and Git whitespace checks pass.

The renderer/filter tests use four clearly named **TEST ONLY** records injected
in memory. These are not real benchmarks, are not in the runtime catalog, and
do not validate the source catalog. No real benchmark data or scores were
fabricated to make tests pass.

## Failures found and corrected

- Reset after a URL reload retained old query parameters because the browser's
  form reset default action ran after the queued render. Reset now sets controls
  to explicit defaults and updates the URL in one handler; regression passes.
- At 200% text and 320px, implicit grid minimums and long headings caused a
  548px document width. Flexible track minimums, wrapping, and heading reflow now
  keep the document at 320px; regression passes.
- Two test assertions initially used case-sensitive `innerText` comparisons on
  visually uppercase labels. Assertions were corrected to use text content or
  case-insensitive matching. Those were test harness failures.
- The formatter required an explicit HTML parser for SVG; formatting completed
  with that parser. No runtime failure resulted.
- Execution tools intermittently reported a disconnected transport. Later reads,
  writes, the full passing browser suite, and public link checks succeeded. Work
  remained on disk. No user apps or existing browser sessions were controlled.

## Remaining work

The supported Library transfer and one retry could not install the ZIP because
the unmodified metadata helper requires `os.setxattr`, unavailable in this Windows
runtime. There is no readable final catalog ZIP. See
[catalog integration](CATALOG-INTEGRATION.md) for source identity and next steps.

The source README/schema/validator, all 20 reported entries, and all 51 reported
source URLs remain unchecked. Real catalog parity, source grounding, date/status
mapping, and per-source failure recording must be completed after transfer.
Automated checks do not establish full screen-reader or assistive-technology
coverage. No merge, push, publication, or homepage change was performed.

Raw browser and static checks plus PNG evidence are in the local ignored
`evidence/` directory. They are preserved with the handoff, outside the proposed
site integration diff.
