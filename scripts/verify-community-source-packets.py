"""Verify relayed community fields against pinned public data; no upstream execution."""
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "data" / "public-sources"
PACKETS = ROOT / "data" / "refresh-packets"
BB_COLUMNS = ["model", "reasoning", "rank", "avg_score", "green_rate", "red_rate", "refusal_rate", "score_2", "score_1", "score_0", "refusal_count", "answered_count", "nonsense_count", "error_count", "score_percent_all_attempts", "score_percent_excluding_candidate_refusals", "first_seen_utc", "usage_rows", "usage_rows_with_usage", "usage_rows_with_cost", "usage_rows_with_latency", "usage_cost_usd_total", "usage_latency_ms_total", "usage_avg_latency_ms", "mean_candidate_cost_usd_on_cost_covered_responses", "mean_candidate_latency_seconds"]
RUNE_COLUMNS = ["system_identifier", "skill", "peakXpRate", "durationSeconds", "sampleCount", "inputTokens", "cacheTokens", "outputTokens", "costUsd", "toolCalls", "firstStepAt", "containerStartedAt", "containerFinishedAt", "agentStartedAt", "jobName", "trialDir"]


def read(name):
    return json.loads((PUBLIC / name).read_text(encoding="utf-8"))


def write_packets(dataset, rows, lengths):
    assert sum(lengths) == len(rows)
    offset = 0
    for index, length in enumerate(lengths, 1):
        packet = {"dataset": dataset, "kind": "rows", "part": index, "parts": len(lengths), "expected_total_rows": len(rows), "rows": rows[offset:offset + length]}
        destination = PACKETS / (dataset + "-rows-" + str(index).zfill(2) + ".json")
        if destination.exists():
            assert json.loads(destination.read_text(encoding="utf-8")) == packet
        else:
            destination.write_text(json.dumps(packet, ensure_ascii=False, indent=2, allow_nan=False) + "\n", encoding="utf-8")
        offset += length


if __name__ == "__main__":
    csv_rows = list(csv.DictReader((PUBLIC / "bullshitbench-leaderboard-with-launch-3bbed044.csv").open(encoding="utf-8", newline="")))
    aggregate = {r["model"]: r for r in read("bullshitbench-aggregate-summary-3bbed044.json")["leaderboard"]}
    usage = {r["model"]: r for r in read("bullshitbench-collection-stats-3bbed044.json")["usage_summary"]["by_model"]}
    first_seen = read("bullshitbench-recent-additions-3bbed044.json")["model_first_seen_utc"]
    assert len(csv_rows) == len(aggregate) == len(usage) == len(first_seen) == 228
    bb_rows = []
    for raw in csv_rows:
        model = raw["model"]
        a, u = aggregate[model], usage[model]
        counts = [int(raw[k]) for k in ["score_2", "score_1", "score_0", "refusal_count", "answered_count", "nonsense_count", "error_count"]]
        assert all(a[k] == int(raw[k]) for k in ["score_2", "score_1", "score_0", "refusal_count", "answered_count", "nonsense_count", "error_count"])
        assert counts[5] == 100 and sum(counts[:4]) + counts[6] == 100
        all_attempts = 100 * counts[0] / counts[5]
        refusal_excluded = 100 * counts[0] / (counts[5] - counts[3])
        cost_mean = u["cost_usd_total"] / u["rows_with_cost"] if u["rows_with_cost"] else None
        row = [model, raw["reasoning"], int(raw["rank"]), float(raw["avg_score"]), float(raw["green_rate"]), float(raw["red_rate"]), float(raw["refusal_rate"]), *counts, all_attempts, refusal_excluded, first_seen[model], u["rows"], u["rows_with_usage"], u["rows_with_cost"], u["rows_with_latency"], u["cost_usd_total"], u["latency_ms_total"], u["avg_latency_ms"], cost_mean, u["avg_latency_ms"] / 1000]
        assert len(row) == len(BB_COLUMNS)
        bb_rows.append(row)
    # Parent supplied packet boundary lengths and source-value anchors.
    assert bb_rows[0] == ["anthropic/claude-opus-4.8@reasoning=none", "none", 1, 1.93, .95, .01, 0, 95, 4, 1, 0, 100, 100, 0, 95, 95, "2026-05-29T09:05:30Z", 100, 100, 100, 100, 1.83233, 1293231, 12932.31, .0183233, 12.93231]
    sol_max = next(r for r in bb_rows if r[0] == "openai/gpt-6.1-sol@reasoning=max")
    assert sol_max[14] == 59 and sol_max[21] == 2.743578 and sol_max[25] == 152.2139
    write_packets("bullshitbench", bb_rows, [24, 24, 25, 24, 24, 24, 24, 24, 24, 11])
    rune_rows = []
    for system in ["gpt61sol-low", "gpt61sol", "gpt61sol-high"]:
        original = read("runebench-" + system + "-5358a49f.json")
        assert len(original["skills"]) == 16
        for skill, r in original["skills"].items():
            token_usage = r["tokenUsage"]
            row = [system, skill, r["peakXpRate"], r["durationSeconds"], r["sampleCount"], token_usage["inputTokens"], token_usage["cacheTokens"], token_usage["outputTokens"], token_usage["costUsd"], r["toolCalls"], r["firstStepAt"], r["containerStartedAt"], r["containerFinishedAt"], r["agentStartedAt"], r["jobName"], r["trialDir"]]
            assert row[4] == 120
            rune_rows.append(row)
    assert len(rune_rows) == 48
    assert rune_rows[0] == ["gpt61sol-low", "cooking", 3675, 1785.057, 120, 7564824, 7432320, 16614, 1.17438, 80, "2026-09-29T20:01:39.787Z", "2026-09-29T20:01:15.516091Z", "2026-09-29T20:33:50.471197Z", "2026-09-29T20:01:33.554761Z", "skills-30m-gpt61sol-low-20260929-160113", "jobs/skills-30m-gpt61sol-low-20260929-160113/cooking-xp-30m__dmU3LYX"]
    write_packets("runebench", rune_rows, [15, 15, 15, 3])
    print(json.dumps({"passed": True, "bullshitbench": 228, "runebench": 48, "method": "Known literals parsed from pinned public CSV/JSON; no upstream scripts or harness executed", "packet_acquisition": "Pinned public-source verification of relayed packet fields; row arrays assembled without rounding"}))
