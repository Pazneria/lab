# Verified benchmark result slices

Prepared September 30, 2026 (UTC). This is a research increment: 18 primary-result rows and seven graph-ready views across three benchmarks. It is not an overall model ranking. No benchmark was executed, no paid API run was started, and no website or source repository was changed.

## Start here

- `results.json`: 18 normalized rows, three protocols, official sources, dates and limitations
- `graph-points.json`: explicit x/y meanings, units, eligibility, exclusions and points for seven plots
- `results.csv`: basic numeric index; use JSON for budget, cost, time and provenance details
- `evidence-facts.json`: compact source facts, 720 RuneBench samples and 600 matched BullshitBench prompt-level numerical/provenance records; no copied response text
- `validation.json`: passed checks and claims not established
- `community-slices.json` and `medical-slice.json`: intermediate source-specific records

Four rendered, visually inspected previews are included as PNG and SVG:

1. `bullshitbench-score-cost-time`: candidate-response cost and mean request time versus clear-pushback score
2. `runebench-score-cost`: separate woodcutting and mining plots with estimated API-equivalent cost
3. `runebench-score-time`: running best XP rate found, from every published sample, separately by skill
4. `medagentbench-historical-scores`: historical task-success comparison, explicitly dated as paper v2

The BullshitBench preview deliberately zooms its y-axis to 50–75%, as labeled. The graph-ready specification also permits a 0–100% full-scale view. Costs and elapsed times have different meanings across benchmarks and must not be combined onto a cross-benchmark frontier.

## Results and interpretation

### RuneBench: six September 29 trial records

Exact runner model is `openai/gpt-6.1-sol`, through Codex OAuth, with low/medium/high reasoning explicitly pinned. This slice uses two skills and one selected trial per effort/skill.

| Skill | Effort | Peak normalized XP/min | API-equivalent USD per whole run |
|---|---|---:|---:|
| Woodcutting | low | 945 | 1.316361 |
| Woodcutting | medium | 875 | 1.880444 |
| Woodcutting | high | 979 | 1.533863 |
| Mining | low | 402 | 1.332367 |
| Mining | medium | 438 | 1.231457 |
| Mining | high | 385 | 1.585352 |

Source: [pinned results and harness](https://github.com/MaxBittker/runebench/tree/5358a49f212e238cd093154bc3e93999d345ab97). Exact leaf URLs and trial timestamps are attached to each record.

All six peaks were recomputed from the 720 source samples. Score is a rounded maximum normalized XP/min over fixed roughly 15-second sample windows. Raw XP is divided by 8×25=200. It is not total XP. The in-window samples run to about 29.75 minutes; the nominal window is 30 minutes.

The running-best graphs show discovery of better rates over tracker elapsed time. They do not show model-inference speed. The rate curve can change because of leveling, available game actions, agent strategy and scheduling.

Cost exactly matches the source's token-rate arithmetic ($2/million uncached input, $0.10/million cached input and $10/million output at the pinned source). These OAuth runs do not establish actual cash expenditure. Rate-card effective date is unknown; the source snapshot is dated September 29. The source comments say long-context surcharges are not modeled. Costs cover the entire agent run and may extend beyond score trimming.

Important missing provenance: exact executed rs-sdk SHA, image digest, CLI version, initial inventory/location and seed. The recipe references image v71 and writes SDK SHA inside its image, but the published result JSON does not include that SHA. Do not promote these graphs to a fully controlled or statistically stable effort comparison. No repeated-trial uncertainty is reported. The source selects a latest valid trial rather than averaging all attempts.

### BullshitBench V2: six model/effort rows

All rows use the same pinned 100-question invalid-premise snapshot. Exact request IDs and reasoning settings remain in the machine records. These results were collected September 25–29; the manifest was generated September 29 at 20:42:04Z. Neither source access nor repository commit date is used as the evaluation date.

| Model/effort | Clear / all 100 | Candidate-response USD | Cost coverage | Mean request seconds |
|---|---:|---:|---:|---:|
| GPT-6.1 Sol low | 65% | 0.433468 | 100/100 | 106.94944 |
| GPT-6.1 Sol max | 59% | 2.743578 | 100/100 | 152.21390 |
| Sonnet 5.5 low | 60% | 0.974192 | 100/100 | 9.90204 |
| Sonnet 5.5 max | 58% | 7.651092 | 100/100 | 62.13230 |
| Opus 5.5 low | 63% | 2.008224 partial | 91/100 | 12.89713 |
| Opus 5.5 max | 62% | 28.270792 partial | 90/100 | 139.83129 |

Source: [pinned manifest](https://github.com/petergpt/bullshit-benchmark/blob/3bbed0441665478de85ee99c33d2b939992ba263/data/v2/latest/manifest.json). The manifest-pinned CSV, response shards and aggregate shards were read; every selected score, cost sum and latency mean was recomputed from per-prompt facts.

The canonical CSV denominator is all 100 attempts, including refusals. The dashboard headline instead excludes refusals. Opus low is 63/100 here but 63/91 = 69.2308% under the dashboard denominator; Opus max is 62/100 here but 62/90 = 68.8889%. Both variants are retained explicitly; the graphs use all attempts throughout.

Opus refusal costs are missing, not zero. Its cost total is partial and its cost points are excluded. All six rows have request latency for all 100 prompts and can appear on the time plot.

Cost is provider-reported candidate-response telemetry, not a complete benchmark bill: judges and infrastructure are excluded, and separate retry charges may not be represented. No fabricated API-price estimate is substituted. The effective rate-card date and invoice reconciliation are unknown.

Request time is the collector timer around request construction, API call/retries and response processing. It includes network/provider waiting and any retries inside that invocation; it excludes judging and queue wait before the invocation. It is not pure model inference, summed compute or end-to-end evaluation duration. `collection_span_seconds` is separately labeled because requests overlap.

Judges are `anthropic/claude-sonnet-4.6`, `openai/gpt-5.2`, `google/gemini-3.1-pro-preview`. Selected rows include two-judge fallback: 3, 2, 3, 3, 4, 3 responses respectively in source-order Opus low/max, GPT max/low, Sonnet low/max. Refusals are deliberately ungraded. One pass, no reported repeat intervals. Differences are descriptive, not evidence of statistical significance or a causal effect of more reasoning. This benchmark does not measure false rejection of valid questions.

### MedAgentBench: six historical baseline rows

Source: [arXiv paper v2, Table 3](https://arxiv.org/html/2501.14654v2), version date February 12, 2025. The evaluation date and immutable provider snapshots are not reported. Exact table labels are preserved.

Overall task success: Claude 3.5 Sonnet v2 69.67%; GPT-4o 64.00%; DeepSeek-V3 62.67%; Gemini-1.5 Pro 62.00%; GPT-4o-mini 56.33%; o3-mini 51.67%.

Original benchmark, 300 tasks, pass@1, up to eight interaction rounds. Query/action subsets are 150 tasks each and are available as secondary outcomes. All but o3-mini use temperature 0; its exception value is unknown. POST actions are simulated and checked by payload, not executed as live clinical care. Cost, wall time, reasoning budget and uncertainty are unknown. Current repository configs are supplemental only and do not establish historical run settings. No medical cost/time points are invented.

## Provenance and integration rules

Inherited metadata is limited to the catalog's benchmark IDs and discovery URLs. Every numerical value and protocol detail used here came from fresh official primary-source reads. The original `benchmark-tracker-v1/catalog.json` has not been overwritten; its current SHA-256 is `e1f3a7dc17d88eb2fd9c83bae068ae0989ef619fe6ec1508a697859c66f86d96`.

- Keep `protocol_id`, `comparability_group`, source URLs and date fields attached to plotted points
- Keep RuneBench skills separate, and label its cost axis “estimated API-equivalent”
- Keep reported costs, partial costs and missing costs distinct; missing values stay null
- Do not mix all-attempt and refusal-excluded scores
- Display MedAgentBench as a historical author-reported slice, not current standings
- Exact model labels/aliases are not proof of immutable weight snapshots
- No cross-benchmark aggregate, global rank, statistical interval or synthetic score was created
- Source excerpts are short; model response text and agent trajectories were not reproduced

## Reproduce local validation and rendering

```sh
python build_validate.py
MPLCONFIGDIR=/tmp/benchmark-mpl python render_graphs.py
```

Validation checks arithmetic and source-record consistency; it does not rerun models. Every plot was rendered and visually inspected for readable labels. All work stayed in this separate local deliverable folder.

## Next evidence worth collecting

1. RuneBench: obtain the exact executed SDK SHA/image digest and CLI version from each selected job receipt; add repeated trials before statistical claims
2. BullshitBench: resolve missing cost telemetry for refusal responses before adding Opus cost points; include judge cost separately only if the graph explicitly wants full benchmark expense
3. MedAgentBench: find version-linked run receipts with exact model snapshots, candidate/agent token costs, timestamps and wall-time definitions; existing table alone cannot support cost/time comparisons

