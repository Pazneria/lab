# October 1 benchmark gallery refresh

The gallery now accepts the data owner's reviewed 42-card contract: 20 original
discovery records and 22 separate source cohorts containing 340 score rows.
Current GPQA, MMMU, FrontierMath, software and terminal-task results appear beside
medical and community tests. Each graph retains its own version and system
settings; no overall model ranking or combined efficiency frontier is created.

The Results selector distinguishes current evidence from historical comparisons.
Every historical detail page shows its actual source date or version before the
graph. Large cohorts initially show 12 configurations, ordered by evaluation date
where the source specifies it. Search and Show all expose every row, while the
table retains the exact full source values. These presentation limits do not
discard observations or select a claimed winner.

FrontierMath task 2.1.0 contains two observations and stays separate from 67 older
task 2.0.0 records and the September cross-lab report. SWE-Bench Pro Full and HARD
use different cards, as do common-scaffold and native-agent terminal results.
HealthBench shows its corrected length-adjusted rubric score rather than calling
it accuracy. Each MedAgentBench V2 card describes one task and memory condition;
the three conditions are not a model leaderboard.

The community controls add 228 all-attempt BullshitBench rows and three efforts
across all 16 Rune skills. Partial candidate-cost coverage remains in details and
is excluded from the existing matched cost graph. Additional Rune cost graphs
use the paired skill-run API-equivalent estimate and peak normalized XP/min;
they never claim actual cash expenditure or inference speed. Progress curves
remain limited to the original two verified skills. One trial and 120 tracking
samples are distinct counts. The historical medical homepage has a separate
12-model view, retaining the original six paper observations and chart.

## Sources and uncertainty

The input is the exact data-owner PR10 commit
`f8d50139f7f38c2c8d3396f7b01753dd76c35526`. Its dated JSON, source packets and
generated projection are preserved. Source links come from each cohort's
`source_id`, and source-input links use the supplied provenance files. Evaluation
dates, model-release dates and access dates remain separately labeled. Unknown
dates remain unknown.

Point disclosures expose exact effort, agent, fallback, reported cost/time basis,
coverage, source row and raw record where supplied. Generic `cost_usd` and
`latency_seconds` remain null across the 340 rows because different bases cannot
share a generic axis. Standard error is labeled as standard error in percentage
points, rather than a confidence interval. Other published uncertainty retains
its captured kind; missing uncertainty produces no significance claim.

The three archival input hashes, 18 original observations, seven configurations,
720 verified Rune tracker points and 51 discovery URLs are unchanged. The BARN
certificate failure remains documented and unbypassed. No model evaluation or
paid API call was made.

## Validation and security scope

The data owner's offline checks validate packet arithmetic, cohort membership,
missing values and archival hashes. Browser checks cover every one of the 340
cohort scores, representative source settings, search/reload, all expanded
community and medical views, Back/Forward, section links, keyboard interaction
and 320px layouts. Existing original-renderer checks remain separate from the
new gallery tests.

The UI handles public research metadata and public query/history state. Names,
prose, hashes and source records are rendered through DOM/SVG text nodes; source
data never becomes HTML or executable code. HTTPS outbound links exclude embedded
credentials and use `noopener noreferrer`. Source-input links require bounded
relative data paths, and graph coordinates require finite numbers. No dependency,
external runtime resource, iframe, postMessage channel, credential or permission
change was added. Tests use isolated headless contexts, without personal browser
history, tabs or profiles. This is a scoped rendering and navigation review,
not a security certification or whole-repository audit.

The reader check is a self-check: a new reader can distinguish current GPQA from
the March report, explain why Full and HARD software results use separate graphs,
and find why Rune dollars differ from cash spend. Required explanations stay in
connected paragraphs; exact technical records remain secondary disclosures.

## Remaining data-owner text correction

The expanded Rune metadata repeats the original two-skill selection description
and the older `&amp;gt;` strings in its protocol formula and CLI-version note.
The renderer preserves this source input and uses the corrected original protocol
for the seven archival charts. The data owner should update that duplicated
metadata to describe the 16-skill expansion and restore the exact `&gt;` wording.
The stale data-only publication checkpoint also needs an eventual status update;
this UI document records the coordinated integration instead.
