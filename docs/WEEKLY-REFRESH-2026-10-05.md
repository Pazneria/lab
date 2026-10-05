# October 5 frontend benchmark refresh

The weekly refresh uses the existing `Pazneria/lab` repository and its `main`/root
GitHub Pages workflow at <https://pazneria.github.io/lab/>. The preparation branch
starts from `7d385b8df5796090bbee70cadd5d0fdf894f23c0`, the deployed PR15 validator
fix. The checkout was clean and no Lab pull requests were open when inspected.
The draft adds a separate frontend section. No new numeric observations have been published to GitHub Pages.

The independent house task, homepage and separately owned `lab-space` room remain
outside this refresh. No existing user edits were moved, stashed or discarded.

## Published data and schemas

Eight public gallery, script, source and contract files were checked against the
current checkout on October 5. They match the published October 1 snapshot. The
original discovery catalog uses schema `1.0.0`; the original result records also
use `1.0.0`, their graph views use `1.0`, and the dated gallery cohorts use schema
version `1`.

| Input                                            | Published contents                                                         |
| ------------------------------------------------ | -------------------------------------------------------------------------- |
| `data/catalog.original.json`                     | 20 discovery entries, 51 URLs and 30 null metric definitions               |
| `data/results.original.json`                     | 18 original result rows, three protocols, 27 sources and seven graph views |
| `data/gallery-current-2026-10-01.json`           | 22 separate source cohorts containing 340 score rows                       |
| `data/community-expanded-2026-10-01.json`        | 228 all-attempt BullshitBench rows and 48 Rune runs across 16 skills       |
| `data/current-medical.original.json`             | 12 historical author-homepage rows and separate later medical conditions   |
| `data/gallery-renderer-contract-2026-10-01.json` | Reviewed snapshot counts, cohort membership and rendering requirements     |

Together these produce 42 cards: 25 have score graphs and 17 are evidence guides.
The original 18 rows and seven graphs remain distinct from the expanded datasets.
There are no dedicated frontend cards yet. Robotics and driving currently retain
discovery guides, rather than invented numeric comparisons.

## Existing source cohorts

| Cohort ID                                  | Rows | Presentation                                  |
| ------------------------------------------ | ---: | --------------------------------------------- |
| `hle-diamond`                              |    9 | Current source cohort                         |
| `gpqa-diamond`                             |  157 | Current source cohort                         |
| `mmmu-pro`                                 |   20 | Current source cohort                         |
| `swe-bench-pro-public-v1`                  |    4 | History                                       |
| `terminal-bench-2`                         |    4 | History                                       |
| `frontiermath-tier4-v2`                    |    2 | Current task 2.1.0                            |
| `gpqa-diamond-march-reported`              |    4 | History                                       |
| `mmmu-pro-march-reported`                  |    4 | History                                       |
| `frontiermath-tier4-v2-september-reported` |    5 | Cross-lab reported history                    |
| `frontiermath-tier4-v2-task-2-0-0`         |   67 | Historical task 2.0.0                         |
| `healthbench-professional`                 |    7 | Corrected developer report; run dates unknown |
| `medagentbench-v2-revised-original-tasks`  |    1 | Separate author condition                     |
| `medagentbench-v2-memory-heldout`          |    1 | Separate author condition                     |
| `medagentbench-v2-new-tasks`               |    1 | Separate author condition                     |
| `swe-bench-pro-public-v2`                  |   10 | Full subset                                   |
| `swe-bench-pro-public-v2-hard`             |   11 | HARD-51 subset                                |
| `terminal-bench-4`                         |    6 | Vals common scaffold                          |
| `terminal-bench-science`                   |    7 | AA common scaffold                            |
| `terminal-bench-4-native-agents`           |    7 | Native agents                                 |
| `terminal-bench-science-native-agents`     |    5 | Native agents                                 |
| `swe-bench-verified-bash-history`          |    5 | Historical bash-only                          |
| `terminal-bench-2-1-history`               |    3 | History                                       |

“Current” here describes the existing presentation. It does not establish a new
October 5 evaluation. Model-release, evaluation, publication, dataset-release and
source-access dates must remain separately labeled. A missing run date stays
unknown even when its source is reopened.

## Bounded source-change checks

The latest commit touching RuneBench's `results/skills-30m` is still
`5358a49f212e238cd093154bc3e93999d345ab97`, committed September 29. The current
BullshitBench V2 manifest is byte-for-byte identical to its archived public source:
74,128 bytes, SHA-256
`8185f90ceb7bd1756fc9d15a68f19782693702fea4ff507e5a382a429e67e381`.
That file's latest change is commit `c1d4ab6e824f4ddfdcc2b2f37448be25d8bc4236`,
also September 29; the site's existing broader snapshot remains pinned to
`3bbed0441665478de85ee99c33d2b939992ba263`.

Bench2Drive's README last changed at the August 11 release of 0.0.4, commit
`7ec25d1c9f7522d923ce5f3420986cef1cb2d956`. This is a check of that specific path,
not a claim that every result artifact or driving source is unchanged. No new
numbers were extracted by these checks, and frontend research was supplied by its separate owner. BARN's recorded certificate warning has not been retried or bypassed.

## Safe update path

Incoming candidates must first arrive with reviewed primary-source provenance.
Each numeric observation needs its source URL and locator, access date, exact
model label or alias, effort, tools, harness, dataset/task version, metric and
unit. Evaluation dates, sample counts and uncertainty should be supplied where
established; missing fields remain explicit. Cost and time require their exact
units, covered denominator and measurement basis. A public token price alone
does not establish benchmark cost.

Preserve all archival inputs, public source snapshots and historical cohorts.
Add dated source packets and a dated renderer contract for the reviewed increment,
then regenerate the projection through the existing build pipeline. The current
assembler, builder, renderer and browser tests explicitly pin October 1's counts
and versions. Any new snapshot requires coordinated changes to those assertions;
do not remove validation just to accept a larger dataset. Repeated observations
need explicit identity even when they share a model alias and effort.

The existing generic cohort charts accept percentages on a 0–100 scale. A design
preference rating needs its own honest units and axis; screenshot-to-code fidelity
and functional browser completion also remain separate tasks. WebDev Arena frontend, Design Arena and Design2Code are handled by the separate frontend projection described below. Do not convert an Elo-style rating into accuracy or treat human
preference as proof that a browser workflow functions correctly.

Keep benchmark versions, Full/HARD subsets, common/native scaffolds, medical
conditions and real-world systems separate. Rune cost remains API-equivalent,
partial BullshitBench costs remain excluded from matched cost graphs, and missing
medical cost/time values remain null. Robotics simulator scores and observational
driving crash rates do not share a combined scale.

## Validation and publication gate

The following existing commands prepare the unchanged baseline without importing
new research. Run them again as appropriate after the reviewed data and renderer
changes are integrated:

```powershell
node scripts/build-catalog.cjs --check
node scripts/build-results.cjs --check
node scripts/build-gallery.cjs --check
python scripts/validate-current-sources.py
python scripts/normalize-refresh-packets.py --check
python scripts/assemble-current-gallery.py --check
python scripts/verify-community-source-packets.py
node tests/verify-gallery.cjs
node tests/verify-current-gallery.cjs
node tests/verify-gallery-navigation.cjs
node tests/verify-gallery-selection.cjs
node tests/verify-results.cjs
node tests/verify-deployment-routing.cjs
```

After integration, checks must cover admitted rows and source arithmetic, chart
membership and units, cost exclusions, exact tables, keyboard/touch inspection,
320px layouts and the retained original renderers. Publish through the existing
draft pull request only after provenance review and affected checks pass. Fetch
remote changes before merging, preserve rollback with ordinary commits, and
verify the deployed Pages head plus exact served bytes and live interactions.
The preparation draft itself does not authorize or trigger a numeric release.

Security review stays within the refresh: public names, source text, URLs, hashes
and query state are untrusted input. Preserve text-node/SVG rendering, validated
HTTPS links and bounded source-input paths. No paid evaluation, dependency,
credential, account, permission, iframe or postMessage change is needed. Checks
use isolated headless browsers; no personal profiles or foreground windows are
used. Functional and scoped checks are not a security certification.

## Frontend candidate and original-packet gate

The draft has 46 cards, including 27 graph cards and 19 source guides. The new
Frontend filter contains four cards. Arena and Design2Code use their own units;
they do not enter the existing percentage-cohort validator or a global ranking.

| New card                | Observations | Graph behavior                                                                                                        |
| ----------------------- | -----------: | --------------------------------------------------------------------------------------------------------------------- |
| WebDev Arena · Frontend |           12 | Preference-rating dots with exact source interval bounds on a visibly cropped 1600–1900 axis                          |
| Design2Code             |            6 | Four Direct configurations by default; separate three-method GPT-4o view; five individual 0–100 similarity dimensions |
| Design Arena            |   0 admitted | Source guide; current browser rating labels observed, configuration packet pending                                    |
| WebCraftBench           |   0 admitted | Source guide; mixed agents and model-pool normalization need a complete review                                        |

The Arena snapshot is dated October 1. Source intervals retain a null confidence
level, Qwen's name is not interpreted as an effort setting, and preliminary labels,
votes and rank spreads remain visible in details. Neither vote counts nor token
list prices become measured task costs. Design2Code stays a historical 484-page
cohort from paper revision February 9, 2025. The separate HARD cohort is not
imported. Missing cost, time and uncertainty remain null; fidelity dimensions
are never averaged.

The complete supplemental JSON is archived in
`data/frontend-research-supplement-2026-10-05.original.json`. BEHAVIOR's subset
self-reports, Waymo's unresolved serious-injury severity, StationeryBench's
fixed setups and RoboChallenge's unresolved standings appear in secondary
source disclosures. Those updates create no new robotics or driving graphs.

The compaction retained the main packet's frontend values and settings but did
not retain its complete audit text. A resend has been requested. Until then,
`data/frontend-research-2026-10-05.working.json` is explicitly labeled as a
provisional renderer input, not a verbatim original archive. Arena's 12 rating
and vote rows and all 30 supplied Design2Code dimensions were independently
cross-checked against the primary table and paper. This verification does not
replace the instruction to preserve the complete parent-supplied original.

`node scripts/build-gallery.cjs --publish-check` deliberately rejects the
working packet. Before release, archive the full original at
`data/frontend-research-2026-10-05.original.json`, reconcile its row field names
without changing values, regenerate the projection and obtain the parent's
requested semantic review. The ordinary build/check path supports reviewing
this local draft; it does not clear the publication gate.

## Browser source check

An isolated headless Edge read of Design Arena returned HTTP 200 and exposed
rating labels. The earlier text retrieval had only headings. The capture is
recorded in `data/frontend-browser-check-2026-10-05.json` and ignored evidence
files. No new Design Arena numeric rows were admitted. No warning, account,
privileged endpoint or credential change was used.

## Candidate validation and reader check

The new frontend browser suite verifies 18 observations, all interval bounds
and votes, all 30 fidelity dimensions, graph membership, exact tables, sources,
metric/comparison URL state, keyboard/tap inspectors and six viewport widths
from 320 to 1440px. Nine axe scans report zero violations; color-contrast checks
remain incomplete, so this is not a full accessibility certification. Existing
full-gallery, current-cohort, navigation, selection, original-results and
routing checks passed. Existing builder/source checks also passed with original
input hashes unchanged. The publication-input gate remains intentionally closed.

A reader can answer three practical questions from the visible explanations:

1. Does an Arena rating of 1858 mean 1858 correct answers? No: it is an evolving
   pairwise preference rating, with interval and rank-spread limitations.
2. Can I average Design2Code's five dimensions or compare every GPT-4o method
   as the same setup? No: the selector compares one dimension at a time and
   separates Direct configurations from different prompting inputs/budgets.
3. Why do two frontend cards lack graphs, and where can I learn more? Their
   guides explain the missing configuration review and link primary sources.

These checks use the page's connected paragraphs rather than assumed research
context. Repeated section headings provide consistent navigation, while each
benchmark's paragraphs explain its own tasks and limitations. No wiki, room or
external homepage content was edited.

## Scoped security review

The new inputs are public research JSON, model names/suffixes, source URLs,
intervals, votes and query state. Names and prose render through text nodes;
source JSON is escaped before insertion into a local script. Runtime validators
reject unsafe and credential-bearing URLs, malformed intervals, unexpected
membership and missing numeric dimensions. Source links use HTTPS with
`noopener noreferrer`, and dataset paths are bounded to local data files.

Browser probes tested malicious HTML in a model name, unsafe link schemes,
credential-bearing URLs and malformed metric/comparison/hash state. No injected
HTML executed, no third-party runtime request was observed and no iframe,
postMessage, dependency, secret, account or permission change was introduced.
The review covers these changes and their tests; it is not a whole-repository
security audit or a security certification.
