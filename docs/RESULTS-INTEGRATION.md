# Result slices and graphs

The increment adds 18 primary reported observations and seven graph views at
`results.html`. The 20 discovery records, 51 discovery source URLs, search,
filters, evidence details, and original null metric definitions remain intact.
Three discovery records link to their separate result slices. There is no
cross-benchmark leaderboard, aggregate, inferred uncertainty, or new evaluation run.

## Input and meanings

`data/results.original.json` preserves the supplied original researcher records,
protocols, graph configurations, exclusions, source metadata, and README. Shared
fields were expanded from a literal transcription; numeric curve pairs were
reconstructed and checked against the same pinned primary source samples using
the supplied formula. No curve was smoothed, downsampled, extended, or averaged.
The original research README is retained verbatim in
`data/results-researcher-readme.md`, with an identical `.txt` copy for static
download through the existing GitHub Pages workflow. Its file names and original archive checksum
refer to that research deliverable, not files created by this UI increment.
This input was supplied directly; no Library materialization was attempted.
Scoped Git attributes preserve these exact input/projection bytes across Windows
and Pages checkouts. The supplied README's intentional trailing blank line is
retained; the whitespace check exempts blank-at-EOF while checking other whitespace.

The RuneBench verification also reads the same three pinned result artifacts.
`data/results-rune-evidence.json` retains only 720 elapsed-time/XP samples,
reported token totals, peaks, and clock fields. It contains no copied trajectories
or response text. The discovery source JSON and generated catalog are unchanged.

- RuneBench keeps woodcutting and mining separate. Each effort/skill has one
  selected trial; the exact executed SDK/image digest and CLI version remain
  unknown. Cost is a whole-run **API-equivalent estimate**, not OAuth cash spend.
  It excludes compute/subscription costs, long-context surcharges, and unknown
  cache-write counts. Score samples stop around 29.75 minutes inside a nominal
  30-minute window; token costs may include later work. Time curves show running
  best normalized XP/min, not total XP, instantaneous XP rate, or pure inference.
- BullshitBench graphs use **all 100 attempts**, including refusals. Refusal-excluded
  secondary outcomes remain separately labeled in details. Four complete
  candidate-response cost totals are plotted; both partial Opus totals are
  explicitly excluded and remain visible as partial values in the six-row table.
  Six mean-request-time points have complete latency coverage. Costs exclude
  judging/infrastructure and potentially separate retries; time includes the
  instrumented request construction/API/network/retry/processing scope, not queue
  wait before invocation, judging, pure inference, or evaluation completion.
- MedAgentBench shows six **historical author-baseline** score bars from original
  paper v2, dated 2025-02-12. That paper version is not the separately named 2026
  v2 benchmark. Evaluation dates, immutable model snapshots, cost, and time are
  unknown; nulls are not converted to zero. Query/action subsets stay attached.
  POST actions were simulated; no clinical safety or deployment claim is made.

No repeated-run intervals are reported in any slice. That limitation appears
beside every graph and in observation details. Effort differences are descriptive,
not causal or statistically established. Exact aliases remain distinguished from
immutable snapshots. The charts retain source order rather than assigning ranks.
BullshitBench defaults to the supplied 0–100% score domain; its explicitly labeled
optional 50–75% zoom is permitted by the supplied README. Other numeric axes start
at zero and show their bounds; RuneBench tracker time remains exactly 0–30 minutes.

## Clock clarification

The supplied RuneBench `evaluation_start` equals each primary artifact's
`agentStartedAt`. Its `evaluation_end` equals `containerFinishedAt`.
`container_elapsed_seconds` correctly uses the earlier `containerStartedAt`,
including setup before the agent starts. These are different intervals, not
contradictory durations. All original fields are retained; the detail view labels
agent start and container start/finish separately. Container duration is not
plotted. The supplemental check resolves this without changing researcher data.

## Checks and evidence

`node scripts/build-results.cjs --check` verifies 18 unique rows, six per benchmark,
three protocols, 27 source metadata items, exact references, seven chart memberships,
Opus exclusions, missing medical values, full/refusal-excluded arithmetic,
covered-cost means, summed/mean request time, collection spans, judge coverage,
RuneBench token-price arithmetic and peak formula, container clocks, and all 720
curve points against the same pinned samples. The source data's IEEE floating
values are retained, including `57.99999999999999`; readable labels round display
only. Exact values appear in the table alternatives and raw JSON.

`node tests/verify-results.cjs` checks the original data/projection, all seven
graphs, exact table values, all 120 points per series, all 720 keyboard sample
positions, source links, cost exclusions, full/zoomed score domains, historical
labels, null preservation, URL reload/back/permalinks, discovery links, desktop
and mobile layouts at 320/390/640/768/1024/1440px, table reflow, 200% text, keyboard
controls, Escape dismissal, line-point taps, forced colors, reduced motion,
no-JavaScript data access, and direct-file preview/filtering. Six axe scans cover
desktop/mobile views of all three benchmarks; automated incomplete findings are
retained in the report, not treated as proof of complete assistive-tech coverage.

The existing real-catalog and fallback/security regressions pass after adding
navigation and the three result links. Asset/fragment checks cover both pages.
Results are in ignored `evidence/results-data-validation.json`,
`results-ui-validation.json`, and `results-source-links.json`; screenshots are
`results-*.png`. Source-response checks are reachability only and do not rerun
models or certify benchmark claims. The discovery BARN certificate failure
remains documented in `docs/VALIDATION.md`; its URL was not retried or bypassed.
All 28 new source/alternate URLs returned HTTP 200 in one read-only pass. Across
the result, real-catalog, and fallback regressions, 14 automated axe scans report
zero violations. Both pages' local assets/fragments and public navigation pass.

Testing caught a full-width chart readiness assertion that incorrectly assumed
every chart was under 1000px; the harness now waits for actual responsive width.
It also caught duplicate landmark names and keyboard sample selection being
overwritten by a stationary pointer during layout changes. Unique chart labels
and protection of active keyboard sample exploration fix both. Screenshot capture
clears focus/scroll state and gives tall cards a real viewport of sufficient height.
This avoids headless Edge capturing an offscreen fixed skip link in a tall clip;
the normal 844px mobile viewport checks remain separate and unchanged.

## Focused security review

Data handled: public model labels/aliases, benchmark measurements, protocol
settings, timing/token counts, and exact public source URLs. No patient records,
private messages, credentials, account state, or secret values are handled by this
page. Supplemental source files were read from pinned public URLs; only numeric
samples and necessary clock fields enter the repository/frontend.

Untrusted boundaries: supplied data labels and metadata, generated JSON, source
URLs, and browser query/hash state. The UI uses `textContent`, text nodes, and
explicit HTML/SVG element construction; it does not use HTML insertion, eval,
script construction from user text, arbitrary CSS colors, iframe, or postMessage.
IDs and chart shapes are validated; plotted coordinates must be finite and match
their source rows, partial cost points are rejected, and unknown medical values
must stay null. Query state selects only three known benchmark IDs and two skills;
hashes are decoded defensively and only existing result-content targets are used.
No URL-selected code or source fetching occurs in the browser.

Outbound URLs must be HTTPS without embedded credentials. Exact original strings
are retained; links use ordinary same-tab navigation and introduce no opener or
iframe privileges. Local raw-data links have fixed paths. No backend, imports,
save storage, account flow, runtime dependency, CDN, font service, tracking,
credential change, or network permission change was added. Existing Playwright
and axe-core are developer-only checks outside the site's runtime.
A scoped credential-pattern check of 11 owned new files found no matches; this
heuristic does not establish absence of every possible secret. Private Library
receipts and the full supplemental source downloads are excluded from the site
and handoff archive.

Browser adversarial checks cover literal malicious markup labels, JavaScript and
credential-bearing URLs, duplicate IDs, missing coordinates, prohibited partial
cost points, missing medical cost converted to zero, and malformed query/hash
input. They pass without injection or third-party requests. The review is limited
to this new static result interface and its data path; it is not a broad repository,
hosting, browser-engine, dependency supply-chain, or clinical-security audit.
Functional/accessibility checks and this focused review are not a security
certification.

## Integration scope

Independent parent semantic review approved the 18 rows, axes, units, protocols,
memberships, and exclusions. The three requested literal `&gt;` metadata strings
were already present exactly in the local source and regenerated projection;
explicit builder assertions now guard their fidelity. Numeric data is unchanged.
Scatter legends share the plotted circle/square/diamond geometry and color,
including effort pairs that share a model color. Line-series dash styles remain
visible, and markers retain their shapes in forced colors.

The authorized publication uses `Pazneria/lab` and its existing main/root GitHub
Pages workflow at `https://pazneria.github.io/lab/`. It preserves the 20-entry
catalog, homepage files, and the separately coordinated 3D room. The new read-only
`tests/verify-results-deployment.cjs` verifies twelve deployed asset/data files
against the local Git commit, all 18 observations/seven views, exact tables,
sources/opening details, scatter markers, caveats, exclusions, and mobile layout.
Deployment evidence is captured in ignored `evidence/results-deployment-validation.json`.
