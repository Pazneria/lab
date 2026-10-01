"""Validate relayed public research inputs as data, without executing source code."""
import hashlib
import json
import math
from datetime import datetime
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]


def read(name):
    return json.loads((ROOT / "data" / name).read_text(encoding="utf-8"))


def percentage(value):
    assert type(value) in (int, float) and math.isfinite(value) and 0 <= value <= 100, value


def url(value):
    parsed = urlsplit(value)
    assert parsed.scheme == "https" and parsed.netloc and not parsed.username and not parsed.password, value


def date(value):
    if value is not None:
        datetime.strptime(value, "%Y-%m-%d")


def validate_mmmu(data):
    assert data["id"] == "mmmu-pro"
    assert data["default_cohort"] == "aa-mmmu-pro-2026-10-01"
    assert len(data["rows"]) == 20
    assert len({r["id"] for r in data["rows"]}) == 20
    assert len({r["model"] for r in data["rows"]}) == 20
    for row in data["rows"]:
        percentage(row["score"])
        assert type(row["raw_score"]) in (int, float)
        assert math.isclose(row["raw_score"] * 100, row["score"], abs_tol=1e-12)
        assert row["unit"] == "percent"
        assert row["metric"] == "pass@1 accuracy"
        assert row["evaluator"] == "Artificial Analysis"
        assert row["cohort_id"] == data["default_cohort"]
        assert row["harness"] == "Artificial Analysis zero-shot; 1,730 questions; one repeat; regex extraction"
        assert row["tools"] == []
        for field in ("dataset_version", "evaluation_date", "publication_date", "cost_usd", "time_seconds"):
            assert row[field] is None, (row["id"], field)
        date(row["release_date"])
        assert row["access_date"] == "2026-10-01"
        url(row["source"])
        assert row["source"] == row["source_page"] == "https://artificialanalysis.ai/evaluations/mmmu-pro"
        assert row["fallback"] in (None, "Default Fallback")
        assert row["effort"] in (None, "max", "xhigh", "high", "medium")
    assert sum(r["model_id"] == "gpt-6-1-sol" for r in data["rows"]) == 1


def validate_medical(data):
    original = data["medagentbench_original"]
    v2 = data["medagentbench_v2"]
    health = data["healthbench_professional"]
    assert len(original["rows"]) == 12
    assert len(v2["rows"]) == 3
    assert len(health["rows"]) == 7
    for series in (original, health):
        assert series["evaluation_date"] is None
        assert len({r["model"] for r in series["rows"]}) == len(series["rows"])
        for row in series["rows"]:
            assert row["cost_usd"] is None and row["latency_seconds"] is None
    for row in original["rows"]:
        percentage(row["score"])
        assert row["reasoning_effort"] is None
    assert [r["score"] for r in v2["rows"]] == [91, 98, 88.67]
    assert [r["memory"] for r in v2["rows"]] == [False, True, "v2 approach; paper section 3.3"]
    assert v2["rows"][1]["sample_size"] is None
    assert v2["rows"][2]["sample_size"] == 300
    assert v2["rows"][2]["successes"] == 266
    assert round(100 * 266 / 300, 2) == v2["rows"][2]["score"]
    assert health["reasoning_effort"] is None and health["tools"] is None
    assert health["revision_date"] == "2026-09-22"
    astra = next(r for r in health["rows"] if r["model"] == "GPT-6 Astra")
    assert (astra["score_length_adjusted"], astra["score_unadjusted"]) == (64.7, 68.2)
    for row in health["rows"]:
        percentage(row["score_length_adjusted"])
        percentage(row["score_unadjusted"])
        assert type(row["mean_response_length_characters"]) is int
        # Published one-decimal scores/lengths cannot reproduce adjustment exactly.
        calculated = row["score_unadjusted"] - (row["mean_response_length_characters"] - 2000) * 1.47 / 500
        assert abs(calculated - row["score_length_adjusted"]) < 0.1
    for series in (original, v2, health):
        url(series["source_url"])


if __name__ == "__main__":
    validate_mmmu(read("current-mmmu-pro.original.json"))
    validate_medical(read("current-medical.original.json"))
    report = {"passed": True, "mmmu_default_chart_configurations": 20,
              "medical_historical": 12, "medical_v2_conditions_separate": 3,
              "healthbench_corrected": 7, "independently_executed": False}
    print(json.dumps(report))
