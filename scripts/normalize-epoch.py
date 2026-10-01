"""Normalize an explicitly supplied public Epoch CSV; never fetch or rank across versions."""
import argparse
import csv
import hashlib
import io
import json
import math
from collections import Counter
from datetime import datetime
from pathlib import Path

COHORTS = {
    ("GPQA diamond", "1.0.11"): ("gpqa-diamond", "epoch-gpqa-diamond-1-0-11", 157),
    ("FrontierMath-Tier-4-v2-Private", "2.0.0"): ("frontiermath-tier4-v2", "epoch-frontiermath-tier4-private-2-0-0", 67),
    ("FrontierMath-Tier-4-v2-Private", "2.1.0"): ("frontiermath-tier4-v2", "epoch-frontiermath-tier4-private-2-1-0", 2),
}


def number(raw):
    if raw == "":
        return None
    value = float(raw)
    assert math.isfinite(value), raw
    return value


def normalize(source, access_date):
    datetime.strptime(access_date, "%Y-%m-%d")
    contents = source.read_bytes()
    selected = [row for row in csv.DictReader(io.StringIO(contents.decode("utf-8-sig")))
                if (row["task"], row["task version"]) in COHORTS]
    records = []
    for row in selected:
        assert row["Status"] == "Success"
        benchmark_id, cohort_id, _ = COHORTS[(row["task"], row["task version"])]
        mean = number(row["mean_score"])
        stderr = number(row["stderr"])
        assert mean is not None and 0 <= mean <= 1
        assert stderr is None or 0 <= stderr <= 1
        started_at = row["started_at"] or None
        if started_at:
            datetime.fromisoformat(started_at.replace("Z", "+00:00"))
        records.append({
            "result_id": "epoch-" + row["id_runs"],
            "benchmark_id": benchmark_id,
            "cohort_id": cohort_id,
            "benchmark_task": row["task"],
            "task_version": row["task version"],
            "model_identifier": row["model"],
            "model_version_identifier": row["id_model_version"] or None,
            "model_variant": row["Unique display name"] or row["Display name"] or row["model"],
            "evaluation_started_at": started_at,
            "evaluation_date": started_at[:10] if started_at else None,
            "model_release_date": row["Version release date"] or None,
            "access_date": access_date,
            "value": mean * 100,
            "unit": "percent",
            "stderr_percentage_points": stderr * 100 if stderr is not None else None,
            "uncertainty_kind": "source-reported standard error; not a confidence interval",
            "cost_usd": None,
            "latency_seconds": None,
            "source_url": "https://epoch.ai/data/benchmarks.csv",
            "source_locator": "id_runs=" + row["id_runs"],
            "independently_rerun": False,
            "raw": row,
        })
    assert len({r["result_id"] for r in records}) == len(records)
    counts = Counter(r["cohort_id"] for r in records)
    assert counts == Counter({v[1]: v[2] for v in COHORTS.values()}), counts
    fm_latest = [r for r in records if r["task_version"] == "2.1.0"]
    assert {r["model_identifier"] for r in fm_latest} == {"gpt-6.1-sol_max", "claude-sonnet-5-5_max"}
    assert next(r["value"] for r in fm_latest if r["model_identifier"] == "gpt-6.1-sol_max") == 100
    return {
        "schema_version": 1,
        "source": {
            "url": "https://epoch.ai/data/benchmarks.csv",
            "publisher": "Epoch AI",
            "access_date": access_date,
            "csv_sha256": hashlib.sha256(contents).hexdigest(),
            "csv_bytes": len(contents),
            "acquisition": "Independent public-source download; not Library materialization",
        },
        "scope": "226 exact run observations: GPQA task 1.0.11 and FrontierMath Tier 4 private tasks 2.0.0/2.1.0. No cross-version ranking.",
        "recommended_default_cohorts": {
            "gpqa-diamond": "epoch-gpqa-diamond-1-0-11",
            "frontiermath-tier4-v2": "epoch-frontiermath-tier4-private-2-1-0",
        },
        "cohorts": [{
            "id": cohort_id,
            "benchmark_id": benchmark_id,
            "task": task,
            "task_version": version,
            "record_count": count,
            "tools": "Python permitted by benchmark protocol" if task.startswith("FrontierMath") else "Per-run tools not established by CSV alone",
            "effort": "Exact configuration retained in model_identifier and model_variant; unequal effort is not matched compute",
            "comparability": "Same task version only; configuration and per-run settings still vary. Not a controlled equal-compute comparison.",
            "history": version == "2.0.0",
        } for (task, version), (benchmark_id, cohort_id, count) in COHORTS.items()],
        "limitations": [
            "All selected raw CSV columns and numeric strings are retained without rounding.",
            "Scores use mean_score; best_score and scorer summaries remain separate raw source fields.",
            "Standard errors are fractions in the source; percentage-point values multiply them by 100.",
            "evaluation_date derives only from started_at, never model release or access dates.",
            "Version 2.0.0 is historical coverage; do not combine it with the two latest 2.1.0 runs.",
            "Costs and elapsed times remain missing; billable tokens are not measured task costs.",
            "Repeated configurations and runs remain distinct observations; no best-run selection is applied.",
            "CSV settings alone do not establish an identical harness, tools, token budget, or trials for every run.",
        ],
        "records": records,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("csv", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--access-date", required=True)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    result = normalize(args.csv, args.access_date)
    serialized = json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False) + "\n"
    if args.check:
        assert args.output.read_text(encoding="utf-8") == serialized, "Normalized data is out of date"
    else:
        args.output.write_text(serialized, encoding="utf-8")
    print(json.dumps({"passed": True, "records": len(result["records"]), "cohorts": {c["id"]: c["record_count"] for c in result["cohorts"]}}))
