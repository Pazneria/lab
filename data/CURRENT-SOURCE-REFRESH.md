# Current-source refresh data handoff

`current-reasoning-epoch.json` is a standalone public-source snapshot, not yet
wired into the gallery. It was independently acquired from
[Epoch's public CSV](https://epoch.ai/data/benchmarks.csv) on October 1, 2026.
The original catalog, results, standard data and generated gallery remain intact.
The snapshot retains 226 distinct source run IDs and all selected raw CSV columns.
It does not replace or discard the gallery's earlier observations.

## Available cohorts

| Benchmark | Exact CSV task version | Records | Recommended role |
| --- | --- | ---: | --- |
| GPQA Diamond | 1.0.11 | 157 | Current source cohort; retain exact effort/configuration |
| FrontierMath Tier 4 private v2 | 2.1.0 | 2 | Current default, separate from older task version |
| FrontierMath Tier 4 private v2 | 2.0.0 | 67 | History/version choice |

The latest FrontierMath rows are `gpt-6.1-sol_max` at 100% and
`claude-sonnet-5-5_max` at 80.48780487804879%. The latter's raw stderr is
0.06265967111543964, or 6.265967111543964 percentage points. It is a standard
error, not a confidence interval. No rounding is applied to source strings.
Version 2.1.0 and 2.0.0 must never be ranked as one controlled cohort.
The [official FrontierMath protocol](https://epoch.ai/benchmarks/frontiermath-tier-4-v2)
permits Python. The CSV alone does not establish equal effort, budgets,
identical per-run settings, or a controlled equal-compute comparison.

`value` uses `mean_score * 100`, and `stderr_percentage_points` uses
`stderr * 100`. `raw` preserves mean, best score, scorer summary, release date,
and start date as different source fields. Evaluation dates derive solely from
`started_at`; access dates and model release dates are not substituted.
All `cost_usd` and `latency_seconds` values are null. Source token counts do not
establish measured costs or elapsed times. Each exact run remains a distinct
observation, including multiple observations of a configuration.

## Rebuild and validation

Download the public CSV into an explicitly local input path, then run from the
repository root:

```powershell
python scripts/normalize-epoch.py PATH_TO_CSV data/current-reasoning-epoch.json --access-date 2026-10-01
python scripts/normalize-epoch.py PATH_TO_CSV data/current-reasoning-epoch.json --access-date 2026-10-01 --check
```

The importer validates successful observations, finite score/uncertainty
ranges, unique run IDs, exact cohort counts and task versions, latest-model
identifiers, timestamps, and deterministic output. It records the complete CSV's
SHA-256 and byte length. Counts are intentionally pinned to this research
snapshot; a later source change should fail for review rather than silently
rewrite cohort membership. The importer performs no network calls.

## Integration constraints

The current `assets/gallery.js` runtime validates exactly six standard cards,
30 standard rows, 18 original result rows, and seven graph views. The current
`scripts/build-gallery.cjs` also pins the old score arrays. A data-only replacement
would therefore disable the gallery. Integration requires the separately owned
UI/schema update. This handoff changes no renderer, navigation, HTML, generated
asset, or `lab-space` file and makes no publication claim.

The three supplied Library packages could not be installed using the supported
Windows helper: `os.setxattr` is unavailable. The reasoning transfer included
the requested bounded retry. This file does not claim to contain the inaccessible
Artificial Analysis, coding, medical, RuneBench, or BullshitBench packages.
They require validated compact data relayed by the parent or a supported local
transfer before ingestion. Preparation IDs and version metadata are retained
outside the public repository; no private transfer receipts or URLs are included.
