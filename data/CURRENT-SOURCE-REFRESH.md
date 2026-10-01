# Current-source benchmark refresh — October 1, 2026

This data branch prepares 22 separate source cohorts with 340 score rows,
plus broader community evidence. It preserves the original 20 discovery records,
18 observations, seven graph views, and all 30 earlier standard observations.
The three original JSON files are checked by SHA-256. New observations do not
overwrite those source files. No benchmark was independently executed.

## What became current

| Benchmark | Current source selection | Rows | What changed |
| --- | --- | ---: | --- |
| GPQA Diamond | Epoch task 1.0.11 | 157 | Replaces the March four-model default; exact runs and configurations retained |
| MMMU-Pro | Artificial Analysis default chart | 20 | Replaces March table; not the full 284-configuration archive |
| FrontierMath Tier 4 private | Epoch task 2.1.0 | 2 | Latest task cohort; older task 2.0.0 is separate history |
| SWE-Bench Pro | V2 Full / HARD-51 | 10 / 11 | New dataset cohorts; not a combined ranking with V1 |
| Terminal-Bench 4 | Vals common scaffold / creator native agents | 6 / 7 | Current version; evaluator and scaffold remain separate |
| Terminal-Bench Science | AA common scaffold / Snorkel native agents | 7 / 5 | Current scientific task cohorts; separate from Terminal-Bench 2 |
| HealthBench Professional | Corrected September 22 developer report | 7 | Adds length-adjusted scores; raw scores and response lengths retained |
| MedAgentBench V2 | Original tasks / memory held-out / new tasks | 1 / 1 / 1 | Later author evidence, three distinct GPT-4.1 agent conditions |

HLE-Diamond retains its already-current September creator comparison (nine
configurations). BullshitBench expands the existing September snapshot from six
selected configurations to 228. RuneBench expands the September 29 runs from two
skills to all 16, giving 48 rows across three efforts. These are broader coverage,
not new evaluations. Original MedAgentBench expands the historical author table
from six to 12 models; checking the table now does not make those runs current.
SWE-bench Verified bash-only and Terminal-Bench 2.1 add explicitly historical
evidence, not substitutes for current coding defaults.

The original March GPQA/MMMU reports, September cross-lab FrontierMath report,
FrontierMath task 2.0.0 (67 observations), SWE-Bench Pro V1, and Terminal-Bench 2
remain under clearly identified history cohorts. Same task version alone does
not establish equal effort, budgets or a controlled equal-compute comparison.

## Measurement rules

Epoch scores use `mean_score * 100`; fractional standard errors become percentage
points using `stderr * 100`. Latest FrontierMath reports `gpt-6.1-sol_max` at
100% and `claude-sonnet-5-5_max` at 80.48780487804879%. Sonnet's raw stderr
0.06265967111543964 becomes 6.265967111543964 percentage points, not a confidence
interval. Task 2.1.0 never shares a ranking with 2.0.0. The official protocol
permits Python. Full selected raw CSV fields remain in the source snapshot.

Evaluation dates use actual source start dates when established. MMMU-Pro's
release dates are separate; its evaluation dates stay null. Missing cost/time
values stay null. Token counts or token prices do not imply measured task costs.
Coding reported costs and times retain their exact units and bases in tagged
details: per-task cost is different from whole-evaluation cost, duration strings
are preserved, and decode time is different from wall-clock time. The shared
generic charts use scores only rather than mixing these measurements.

BullshitBench's primary percentage is clear pushback divided by all 100 attempts,
including errors and refusals. The secondary refusal-excluded percentage has a
different denominator. Judge-average scores on a 0–2 scale are not percentages.
Candidate costs exclude judging and infrastructure; missing or incomplete cost
coverage is explicit. Request latency includes processing and retries, not pure
inference. First-seen dates are metadata, not evaluation dates.

RuneBench keeps skills and effort configurations separate. Each has one trial;
120 tracking points are not 120 independent trials. Costs are API-equivalent
estimates for OAuth runs, not subscription cash spend. Tracker duration and
container wall time remain distinct. The inherited protocol selection describing
the earlier two-skill subset is preserved verbatim alongside a corrected expanded
selection note.

MedAgentBench V2's 98% memory condition has no established held-out sample count;
it is not an untouched 300-task evaluation. Original, revised-agent, memory and
new-task conditions cannot form one controlled cohort. HealthBench uses the
length-adjusted metric, with unadjusted values separately retained. These medical
scores do not establish clinical qualification or safe deployment.

## Sources and transport

Epoch's public CSV was independently downloaded: 3,851,880 bytes, SHA-256
`f68bb729c170a0321f0cda43f8ccb9e083e8fe3ff75a9ddef85778e86242933c`.
Public community CSV/JSON is pinned under `public-sources/` at BullshitBench
commit `3bbed0441665478de85ee99c33d2b939992ba263` and RuneBench commit
`5358a49f`. The verifier parses known data fields without executing source code
or harnesses. Medical values were independently checked against the author
homepage, PSB 2026 paper, and corrected HealthBench Table 29. Coding and MMMU
research was validated by the parent and relayed as public task input.

The supported Library materialization helper failed at `os.setxattr` on Windows;
the required bounded reasoning retry failed at the same step. No successful
transfer is claimed. Parent-relayed complete packets replaced earlier truncated
messages. All 29 packets and the final marker are now present and validated.
`refresh-packets/manifest.json` preserves Library/file/version identities and
acquisition details. Receipts and signed transfer URLs stay outside this repo.

Primary references are [Epoch CSV](https://epoch.ai/data/benchmarks.csv),
[FrontierMath protocol](https://epoch.ai/benchmarks/frontiermath-tier-4-v2),
[MMMU-Pro](https://artificialanalysis.ai/evaluations/mmmu-pro),
[MedAgentBench](https://stanfordmlgroup.github.io/projects/medagentbench/),
[V2 paper](https://psb.stanford.edu/psb-online/proceedings/psb26/chen_eric.pdf),
and [HealthBench Table 29](https://deploymentsafety.openai.com/gpt-6-astra/healthbench).
Per-row coding URLs and pinned public community identities remain in the JSON.

## Rebuild and verify

Run from the repository root with an explicitly local copy of the public CSV:

```powershell
python scripts/normalize-epoch.py PATH_TO_CSV data/current-reasoning-epoch.json --access-date 2026-10-01 --check
python scripts/validate-current-sources.py
python scripts/verify-community-source-packets.py
python scripts/normalize-refresh-packets.py --check
python scripts/assemble-current-gallery.py --check
node scripts/build-gallery.cjs --check
```

Without `--check`, the packet normalizer and assembler regenerate their derived
JSON. `python scripts/update-current-notes.py` refreshes source-card documentation;
`node scripts/build-gallery.cjs` regenerates the asset and validation evidence.
Counts are intentionally pinned to this snapshot; changed source membership
requires review. Original hashes, cohort membership, nulls, arithmetic and
generated JavaScript round-trip are checked offline.

## Integration and publication status

`gallery-renderer-contract-2026-10-01.json` specifies 42 cards, 22 source cohorts,
340 score rows and the added `window.LAB_GALLERY.expanded` evidence. Four new
generic percent cohorts use the medical category. Large cohorts default to 12
rows with search and access to all evidence; incompatible versions/harnesses
remain separate. History must use each card's actual date label.

The existing renderer still pins six source cards / 30 rows / 26 total cards.
Its owner must implement this contract before a main merge; otherwise it rejects
the new asset. This branch changes no renderer, navigation, HTML or `lab-space`
files. Publication and live chart verification remain pending coordinated UI
integration. No live deployment success is claimed by this data checkpoint.
