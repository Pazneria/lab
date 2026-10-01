# Benchmark gallery

The primary Lab pages now introduce each benchmark with a real graph and a clear
question. A card opens `results.html?benchmark=…`, where the graph comes first,
followed by connected explanations of the test, its purpose and its limits.
Sources, settings, exact tables and complete result records remain available in
native disclosures. The original discovery renderer is retained at `catalog.html`
and the original result explorer at `results-technical.html`.

The separately owned room’s benchmark station opens the stable root gallery at
**https://pazneria.github.io/lab/**. Internal gallery navigation also supports
**https://pazneria.github.io/lab/benchmarks.html**. The homepage’s Lab link opens
**https://pazneria.github.io/lab/lab-space/** directly. Preserve these routes:
the root and `benchmarks.html` both serve the gallery, and `results.html` serves
details. The remote room commit `2443b2e` was preserved without editing its files.
No 3D room implementation or homepage routing is owned by this change.

The gallery contains 26 benchmarks: all 20 original discovery records plus six
supplied standard benchmark cohorts. Nine cards contain graphs. The remaining 17
say explicitly that no model scores were ingested; no illustrative score curves
or invented values fill those cards. The order is editorial, not a model ranking.

## Data and source verification

`data/standard-benchmarks.original.json` preserves the values and metadata of the
parent-supplied research handoff: 30 rows across HLE-Diamond, four March 2026
OpenAI release cohorts, and the September FrontierMath Tier 4 v2 reported
comparison. `data/gallery-notes.json` supplies separate plain-English editorial
explanations. `scripts/build-gallery.cjs` validates exact score arrays, model
counts, source relationships, missing values and HLE partition arithmetic before
generating `assets/gallery-data.js`.

The HLE-Diamond primary page, OpenAI March release table, Astra FrontierMath row,
and Epoch v2 benchmark definition were reopened on October 1, 2026. All 30 main
scores and the HLE partition/tool values agree with those primary pages. Other
definition URLs retain the supplied provenance; they are not represented as
fresh numeric verification. No evaluations or paid API runs were performed.

Primary result sources:

- [HLE-Diamond creator results](https://lastexam.ai/blog/hle-diamond)
- [OpenAI March release comparison](https://openai.com/index/introducing-gpt-5-4-mini-and-nano/)
- [Astra reported comparison](https://openai.com/index/gpt-6-astra/)
- [Epoch FrontierMath Tier 4 v2 definition](https://epoch.ai/benchmarks/frontiermath-tier-4-v2)

HLE’s main view has nine high-effort, no-tools results. Reasoning and knowledge
each contain 500 questions. The separate web-and-code view contains six reported
results and three explicit missing values. Its comparison group is separate
from no-tools and partition views. Individual run dates, immutable snapshots,
cost/time results and uncertainty are not supplied. Provider-specific high
effort does not establish matched compute.

Four March cohorts are explicitly historical, preserving the publication,
effort exception and incomplete harness information. SWE-Bench Pro is the
original public split, not September V2 or SWE-bench Verified; test and
contamination limits remain visible in its explanation. FrontierMath uses dots
and an upfront cross-lab warning because its best-reported effort scores do not
come from an established common harness. It retains the v2 and funding caveats.
All 30 standard cost and time values remain null. Token chart values and API
list prices are not converted into benchmark costs.

The original discovery and result source files retain their SHA-256 values:

- Catalog: `261e704c6076c5c85b698fefd9a4135d61049e56377d01d42c14aae28800ce85`
- Results: `dd9164301b95d503eda9f467fa6411e375b25e5ba0c9a3d9ec475e58ba3c68d3`

All 18 earlier result rows, seven configurations, 720 Rune tracker points,
51 discovery URLs and null discovery metrics remain unchanged. Rune costs are
API-equivalent whole-run estimates, not cash spend. Opus partial costs remain
excluded from cost plots; all six rows remain on the request-time plot. Medical
cost/time values stay null and the paper slice remains historical. The BARN
certificate issue is documented beside its retained original source link;
no request bypasses its warning.

## Interaction and accessibility

Filters cover category, text search and graph availability. Query parameters
preserve these choices and detail view/skill state through reload and browser
back. Original result permalinks open both the record and its enclosing
disclosure. Chart points, model rows, matched circle/square/diamond legends and
all 120 samples per Rune series remain accessible by keyboard, focus and tap.
A persistent readout keeps values available below the graph. Table alternatives
retain exact supplied numeric strings, including values rounded for display.

`tests/verify-gallery.cjs` checks card membership, all 30 standard scores,
all original 18 rows/seven views, HLE tools/partitions, source links, missing-data
rules, URL state, keyboard interaction and mobile reflow. It also performs axe
audits and adversarial rendering checks. In live mode, it compares 15 served
files with the exact checked-out Git commit. Original renderer regression tests
now exercise the retained research pages; they do not stand in for new gallery
tests.

A tools-disabled Claude Opus 5.5 aesthetic consultation completed using the
existing trusted checkout and Pro OAuth setup. API credential environment
variables were removed, MCP/tools/skills/hooks disabled, no session persisted,
and no files or account settings changed. It advised spacing, typography,
hierarchy and mobile readouts. Suggestions to replace meaningful axes with dates
were not adopted. Its list-price usage estimate is not treated as cash spend or
proof of billing settings. No Claude-generated research numbers were used.

## Scoped security review

The interface handles public benchmark names, scores, effort settings, dates,
public URLs and original research metadata. It contains no patient records,
credentials, private files, account state or user-saved/imported content. New
data projections contain only the supplied public research and editorial notes.
Private transfer receipts and CLI account/session metadata stay outside the
repository and screenshot/archive artifacts.

Untrusted boundaries are source metadata, names, prose, URL queries and hashes.
Rendering uses explicit DOM/SVG construction and `textContent`; it never inserts
supplied HTML, evaluates supplied code or uses supplied style strings. Numeric
coordinates must be finite, and standard cost/time fields must remain null.
Unknown view/benchmark IDs fall back to known choices. Hashes are decoded
defensively and only identify existing detail elements.

Outbound source URLs require HTTPS without embedded credentials. Links opened
in a new tab carry `noopener noreferrer`; original strings are retained.
Local paths are fixed. No runtime fetch, iframe, postMessage, storage, backend,
tracking, new dependency, CDN, image service or web-font resource was introduced.
Existing developer-only Playwright and axe-core installations run a separate
headless Edge process and close only their own contexts.

Adversarial checks insert script-like model labels and prose, malformed hashes,
unknown queries and a `javascript:` source URL. Text remains literal, no injected
SVG/HTML executes, unsafe source data disables the gallery, and no third-party
runtime requests occur. Testing is limited to this static UI and owned data
path. It is not a hosting, browser, supply-chain or whole-repository audit;
functional tests and this review are not a security certification.

## Reader check and publication scope

A fresh reader can find what HLE tests, why Rune cost is an estimate rather than
cash spend, and why the medical success bars do not establish clinical safety
using the visible explanations alone. The exact source and full settings are
one disclosure away. Necessary relationships remain in complete paragraphs,
while mechanics terms such as normalized XP/min and mean request time stay
consistent with the source data.

Publication uses `Pazneria/lab` and its existing main/root GitHub Pages workflow.
Changes are reversible commits. Remote work is fetched and preserved before
merge. Homepage and the separate 3D `lab-space` prototype are outside this change.
No Library transfer is retried or claimed successful; the data is parent-supplied.
