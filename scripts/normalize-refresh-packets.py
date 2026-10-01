"""Validate complete packet sets and normalize community coverage without new scores."""
import json
import math
import sys
import re
from collections import Counter
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
PACKETS = DATA / "refresh-packets"


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def complete(dataset, row_parts, total_rows, metadata_parts=0):
    metadata, rows = {}, []
    for kind, total in [("metadata", metadata_parts), ("rows", row_parts)]:
        for part in range(1, total + 1):
            packet = read(PACKETS / f"{dataset}-{kind}-{part:02}.json")
            assert (packet["dataset"], packet["kind"], packet["part"], packet["parts"]) == (dataset, kind, part, total)
            if kind == "metadata":
                assert not metadata.keys() & packet["metadata"].keys()
                metadata.update(packet["metadata"])
            else:
                assert packet["expected_total_rows"] == total_rows
                rows.extend(packet["rows"])
    assert len(rows) == total_rows
    if metadata_parts:
        assert all(len(row) == len(metadata["columns"]) for row in rows)
    return metadata, rows


def near(a, b):
    assert math.isclose(a, b, rel_tol=1e-12, abs_tol=1e-12), (a, b)


def write_or_check(path, value):
    serialized = json.dumps(value, ensure_ascii=False, indent=2, allow_nan=False) + "\n"
    if "--check" in sys.argv:
        assert path.read_text(encoding="utf-8") == serialized, f"Normalized source differs: {path.name}"
    else:
        path.write_text(serialized, encoding="utf-8")


if __name__ == "__main__":
    manifest = read(PACKETS / "manifest.json")
    assert manifest["final_marker_received"] is True
    _, coding = complete("coding", 11, 54)
    assert len({(r["series_id"], r["model"], r["agent"], r["effort"]) for r in coding}) == 54
    for row in coding:
        assert isinstance(row["score_percent"], (int, float)) and math.isfinite(row["score_percent"]) and 0 <= row["score_percent"] <= 100
        assert row["source_url"].startswith("https://")
        if row["evaluation_date"] is not None:
            datetime.fromisoformat(row["evaluation_date"])
            assert row["evaluation_date"] != row["accessed_date"]
        assert row["cost_usd"] is None or (math.isfinite(row["cost_usd"]) and row["cost_usd"] >= 0 and row["cost_basis"])
        if row["time_value"] is not None:
            assert row["time_basis"]
            if isinstance(row["time_value"], str):
                assert re.fullmatch(r"(?:\d+ h )?\d+ m(?: \d+ s)?", row["time_value"])
                assert row["time_unit"] is None  # Units are already embedded in the source string.
            else:
                assert math.isfinite(row["time_value"]) and row["time_value"] >= 0 and row["time_unit"]
    bb_meta, bb_arrays = complete("bullshitbench", 10, 228, 2)
    rune_meta, rune_arrays = complete("runebench", 4, 48, 2)
    assert len(list(PACKETS.glob("*-rows-*.json"))) + len(list(PACKETS.glob("*-metadata-*.json"))) == 29
    bb_raw = [dict(zip(bb_meta["columns"], r)) for r in bb_arrays]
    rune_raw = [dict(zip(rune_meta["columns"], r)) for r in rune_arrays]
    bb_records = []
    assert len({r["model"] for r in bb_raw}) == 228
    assert [r["rank"] for r in bb_raw] == list(range(1, 229))
    for raw in bb_raw:
        count = raw["nonsense_count"]
        assert count == 100
        assert raw["score_2"] + raw["score_1"] + raw["score_0"] + raw["refusal_count"] + raw["error_count"] == count
        near(raw["score_percent_all_attempts"], 100 * raw["score_2"] / count)
        near(raw["score_percent_excluding_candidate_refusals"], 100 * raw["score_2"] / (count - raw["refusal_count"]))
        covered = raw["usage_rows_with_cost"]
        cost_mean = raw["mean_candidate_cost_usd_on_cost_covered_responses"]
        if covered:
            near(cost_mean, raw["usage_cost_usd_total"] / covered)
        else:
            assert cost_mean is None
        near(raw["mean_candidate_latency_seconds"], raw["usage_avg_latency_ms"] / 1000)
        # This metadata is first-seen, not a substitute for exact evaluation dates.
        datetime.fromisoformat(raw["first_seen_utc"].replace("Z", "+00:00"))
        bb_records.append({"model_identifier": raw["model"], "effort": raw["reasoning"],
            "cohort_id": bb_meta["protocol"]["id"], "value": raw["score_percent_all_attempts"],
            "unit": "percent", "metric": "clear pushback / all attempts", "sample_size": count,
            "refusal_excluded_percent": raw["score_percent_excluding_candidate_refusals"],
            "first_seen_utc": raw["first_seen_utc"], "evaluation_date": None,
            "reported_cost": {"value": cost_mean, "unit": "USD/covered candidate response", "covered_response_count": covered,
                "total_attempts": count, "complete": covered == count, "basis": bb_meta["protocol"]["cost_definition"]},
            "reported_time": {"value": raw["mean_candidate_latency_seconds"], "unit": "seconds/request",
                "covered_response_count": raw["usage_rows_with_latency"], "basis": bb_meta["protocol"]["latency_definition"]},
            "raw": raw})
    rune_records = []
    assert len({(r["system_identifier"], r["skill"]) for r in rune_raw}) == 48
    assert Counter(r["system_identifier"] for r in rune_raw) == {"gpt61sol-low": 16, "gpt61sol": 16, "gpt61sol-high": 16}
    for raw in rune_raw:
        assert type(raw["peakXpRate"]) is int and raw["peakXpRate"] >= 0
        assert raw["sampleCount"] == 120
        assert raw["durationSeconds"] > 0
        system = rune_meta["systems"][raw["system_identifier"]]
        start = datetime.fromisoformat(raw["containerStartedAt"].replace("Z", "+00:00"))
        end = datetime.fromisoformat(raw["containerFinishedAt"].replace("Z", "+00:00"))
        assert end > start
        rune_records.append({"system_identifier": raw["system_identifier"], "model_identifier": system["model_identifier"],
            "effort": system["reasoning_effort"], "model_variant": system["display_label"], "skill": raw["skill"],
            "cohort_id": "runebench-30m-20260929-v71-" + raw["skill"], "value": raw["peakXpRate"],
            "unit": "normalized XP/min", "sample_size": 1, "tracking_sample_count": raw["sampleCount"],
            "evaluation_date": raw["agentStartedAt"][:10], "source_url": system["source_url"],
            "reported_cost": {"value": raw["costUsd"], "unit": "USD/skill run", "basis": rune_meta["cost_notes"]},
            "reported_time": {"value": raw["durationSeconds"], "unit": "tracker seconds", "basis": rune_meta["time_notes"]},
            "container_wall_seconds": (end - start).total_seconds(), "raw": raw})
    originals = {"coding": {"rows": coding}, "bullshitbench": {**bb_meta, "rows": bb_arrays}, "runebench": {**rune_meta, "rows": rune_arrays}}
    for dataset, source in originals.items():
        write_or_check(DATA / ("current-" + dataset + ".original.json"), source)
    normalized = {"schema_version": 1, "freshness": "Expanded coverage of already-current September snapshots; no new release or benchmark execution",
        "bullshitbench": {"benchmark_id": "bullshitbench-v2", "metadata": bb_meta, "records": bb_records,
            "display_defaults": {"row_limit": 12, "search_configurations": True, "all_records_available": True, "metric": "all_attempts"}},
        "runebench": {"benchmark_id": "runebench", "metadata": rune_meta, "records": rune_records,
            "display_defaults": {"skill": "woodcutting", "skills_available": sorted({r["skill"] for r in rune_records})},
            "expanded_selection_note": "48 rows cover all 16 skills at three GPT-6.1 Sol efforts. Inherited protocol selection describes the earlier two-skill subset and is preserved verbatim in original metadata."}}
    write_or_check(DATA / "community-expanded-2026-10-01.json", normalized)
    print(json.dumps({"passed": True, "packets": 29, "coding": 54, "bullshitbench": 228, "runebench": 48, "rune_skills": 16}))
