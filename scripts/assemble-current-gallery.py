"""Assemble validated source data into percent-only gallery cards; no source execution."""
import copy
import json
import sys
from collections import Counter
from pathlib import Path
import importlib.util

ROOT = Path(__file__).resolve().parents[1]
validation_spec = importlib.util.spec_from_file_location("source_validation", ROOT / "scripts" / "validate-current-sources.py")
validation = importlib.util.module_from_spec(validation_spec)
validation_spec.loader.exec_module(validation)
validate_mmmu, validate_medical = validation.validate_mmmu, validation.validate_medical


def read(name):
    return json.loads((ROOT / "data" / name).read_text(encoding="utf-8"))


def make_card(identifier, name, source_id, group, rows, description, date_label, settings, limitations, category="standard", history=False):
    return {"id": identifier, "name": name, "category": category,
            "description": description, "metric": "accuracy" if category == "standard" else "reported benchmark score",
            "unit": "percent", "direction": "higher_is_better", "scale": [0, 100],
            "display_status": "historical_source_cohort" if history else "ready",
            "date_label": date_label, "source_id": source_id, "comparison_group": group,
            "settings": settings, "limitations": limitations, "rows": rows,
            "cost_time_status": "No paired cost or elapsed-time results supplied; values remain null",
            "recommended_chart": "horizontal percent-score bars with exact-configuration labels",
            "history": history}


def assemble():
    base = read("standard-benchmarks.original.json")
    epoch = read("current-reasoning-epoch.json")
    mmmu = read("current-mmmu-pro.original.json")
    medical = read("current-medical.original.json")
    validate_mmmu(mmmu)
    validate_medical(medical)
    sources = copy.deepcopy(base["sources"])
    sources.update({
        "epoch_current": {"url": "https://epoch.ai/data/benchmarks.csv", "publisher": "Epoch AI", "published_date": None, "type": "independent_evaluation"},
        "aa_mmmu_current": {"url": "https://artificialanalysis.ai/evaluations/mmmu-pro", "publisher": "Artificial Analysis", "published_date": None, "type": "independent_evaluation"},
        "medagent_v2": {"url": medical["medagentbench_v2"]["source_url"], "publisher": "MedAgentBench V2 authors", "published_date": None, "type": "author_paper"},
        "healthbench_professional": {"url": medical["healthbench_professional"]["source_url"], "publisher": "OpenAI", "published_date": "2026-09-03", "type": "developer_report"},
    })
    archives = []
    for old in base["cards"]:
        if old["id"] in ("gpqa-diamond", "mmmu-pro", "frontiermath-tier4-v2"):
            archive = copy.deepcopy(old)
            archive["id"] += "-march-reported" if old["id"] != "frontiermath-tier4-v2" else "-september-reported"
            archive["name"] += " — " + ("March 2026 report" if old["id"] != "frontiermath-tier4-v2" else "September 2026 report")
            archive["display_status"] = "historical_source_cohort"
            archive["history"] = True
            archives.append(archive)
    def epoch_rows(cohort):
        chosen = [r for r in epoch["records"] if r["cohort_id"] == cohort]
        labels = Counter(r["model_variant"] for r in chosen)
        output = []
        for r in chosen:
            row = {k: copy.deepcopy(v) for k, v in r.items() if k != "raw"}
            row["exact_source_model_variant"] = r["model_variant"]
            if labels[r["model_variant"]] > 1:
                row["model_variant"] += " — run " + r["result_id"].removeprefix("epoch-")
            row["model_id"] = r["model_identifier"]
            # Exact configuration is retained, rather than guessing effort from an alias.
            row["effort"] = "See exact model configuration"
            row["source_input"] = "data/current-reasoning-epoch.json"
            output.append(row)
        return output
    replacements = {}
    gpqa_group = "epoch-gpqa-diamond-1-0-11"
    replacements["gpqa-diamond"] = make_card(
        "gpqa-diamond", "GPQA Diamond", "epoch_current", gpqa_group, epoch_rows(gpqa_group),
        "Can it reason through difficult graduate-level science questions?",
        "Epoch runs through September 29, 2026; task 1.0.11; source checked October 1",
        {"effort": "Exact configurations vary; provider effort is not matched compute", "tools": "Per-run tools not established by CSV alone", "dataset": "GPQA Diamond task 1.0.11", "trials": None},
        ["Same task version does not establish equal compute or identical per-run settings.", "Distinct observations, including repeated configurations, are retained.", "Standard errors are percentage points, not confidence intervals."])
    replacements["gpqa-diamond"]["display_defaults"] = {"row_limit": 12, "sort": "evaluation_date_desc", "show_all_available": True, "search_configurations": True}
    replacements["mmmu-pro"] = make_card(
        "mmmu-pro", "MMMU-Pro", "aa_mmmu_current", mmmu["default_cohort"],
        [{"model_variant": r["model"], "model_id": r["model_id"], "effort": r["effort"], "value": r["score"],
          "cost_usd": None, "latency_seconds": None, "source_url": r["source"],
          "result_id": "aa-" + r["id"], "fallback": r["fallback"], "model_release_date": r["release_date"],
          "evaluation_date": None, "dataset_version": None, "raw_score": r["raw_score"],
          "source_input": "data/current-mmmu-pro.original.json"} for r in mmmu["rows"]],
        "Can it solve academic questions that require reading images as well as text?",
        "Artificial Analysis default chart checked October 1, 2026; individual run dates unavailable",
        {"effort": "Exact effort and fallback configurations retained; not matched compute", "tools": "No tools", "harness": "Zero-shot; 1,730 questions; one repeat; regex extraction", "dataset": "MMMU-Pro; exact revision not reported"},
        [mmmu["selection"], "Model release dates are not evaluation dates.", "Exact dataset revision and uncertainty are unavailable."])
    replacements["mmmu-pro"]["display_defaults"] = {"row_limit": 12, "sort": "source_order", "show_all_available": True, "search_configurations": True}
    fm_group = "epoch-frontiermath-tier4-private-2-1-0"
    fm_settings = {"effort": "Exact configurations retained; effort is not matched compute", "tools": "Python permitted by benchmark protocol", "dataset": "FrontierMath Tier 4 private, task version 2.1.0", "trials": None}
    replacements["frontiermath-tier4-v2"] = make_card(
        "frontiermath-tier4-v2", "FrontierMath Tier 4 (task 2.1.0)", "epoch_current", fm_group, epoch_rows(fm_group),
        "Can it solve research-level math problems while experimenting with Python?",
        "Epoch runs: September 29, 2026; task 2.1.0; source checked October 1", fm_settings,
        ["Only two source observations are available for task 2.1.0.", "Never combine task versions 2.1.0 and 2.0.0 in one ranking.", "OpenAI funded FrontierMath; the creator discloses access to a subset.", "Standard errors are not confidence intervals."])
    replacements["frontiermath-tier4-v2"]["definition_source_id"] = "frontiermath"
    old_fm_group = "epoch-frontiermath-tier4-private-2-0-0"
    historical_fm = make_card(
        "frontiermath-tier4-v2-task-2-0-0", "FrontierMath Tier 4 (task 2.0.0 history)", "epoch_current", old_fm_group, epoch_rows(old_fm_group),
        "Earlier runs on the previous private Tier 4 task version.", "Historical task 2.0.0 observations; source checked October 1, 2026",
        {**fm_settings, "dataset": "FrontierMath Tier 4 private, task version 2.0.0"},
        ["Separate history cohort; do not rank against task 2.1.0.", "Effort, budgets and per-run settings vary."], history=True)
    historical_fm["display_defaults"] = {"row_limit": 12, "sort": "evaluation_date_desc", "show_all_available": True, "search_configurations": True}
    health = medical["healthbench_professional"]
    health_card = make_card(
        "healthbench-professional", "HealthBench Professional", "healthbench_professional", "healthbench-professional-length-adjusted-corrected-20260922",
        [{"model_variant": r["model"], "effort": None, "value": r["score_length_adjusted"], "cost_usd": None,
          "latency_seconds": None, "source_url": health["source_url"], "unadjusted_value": r["score_unadjusted"],
          "mean_response_length_characters": r["mean_response_length_characters"], "evaluation_date": None,
          "source_input": "data/current-medical.original.json"} for r in health["rows"]],
        "How well does an AI answer professional medical questions under a detailed rubric?",
        "Developer report: September 3, 2026; corrected September 22; run dates unavailable",
        {"effort": "Not specified in this table", "tools": "Not specified", "harness": health["scaffold"], "dataset": health["version"]},
        [health["evidence_type"], health["adjustment"], health["freshness_note"], health["safety_note"]], category="medical")
    health_card["metric"] = "length-adjusted rubric score"
    v2 = medical["medagentbench_v2"]
    v2_cards = []
    for identifier, label, row in zip(
        ["medagentbench-v2-revised-original-tasks", "medagentbench-v2-memory-heldout", "medagentbench-v2-new-tasks"],
        ["MedAgentBench V2 — revised agent, original tasks", "MedAgentBench V2 — memory held-out condition", "MedAgentBench V2 — new tasks"], v2["rows"]):
        v2_cards.append(make_card(identifier, label, "medagent_v2", identifier + "-gpt41-author-condition",
            [{"model_variant": "GPT-4.1 + revised V2 agent", "effort": None, "value": row["score"], "cost_usd": None,
              "latency_seconds": None, "source_url": v2["source_url"], "task_set": row["task_set"], "memory": row["memory"],
              "sample_size": row.get("sample_size", 300 if row["memory"] is False else None), "evaluation_date": None,
              "source_input": "data/current-medical.original.json"}],
            "Can a revised agent complete tasks in a simulated electronic health record?", "PSB 2026 author paper; precise run dates unavailable",
            {"effort": "Not specified", "tools": v2["tools_scaffold"], "dataset": row["task_set"]},
            ["One reported model-agent condition, not a model leaderboard.", "Original, held-out memory, and new-task conditions are separate.", row.get("note", "Do not merge with the original baseline-agent comparison."), v2["cost_time_note"], medical["medagentbench_original"]["safety_note"]], category="medical"))
    cards = [replacements.get(c["id"], copy.deepcopy(c)) for c in base["cards"]] + archives + [historical_fm, health_card] + v2_cards
    for card in cards:
        card.setdefault("history", card["display_status"] == "historical_source_cohort")
    assert len(cards) == 14
    assert sum(len(c["rows"]) for c in cards) == 286
    coding = read("current-coding.original.json")["rows"]
    assert len(coding) == 54
    series_cards = {
        "scale_swepro_v2_full": ("swe-bench-pro-public-v2", "SWE-Bench Pro V2 — Full", 10, False),
        "scale_swepro_v2_hard-51": ("swe-bench-pro-public-v2-hard", "SWE-Bench Pro V2 — HARD-51", 11, False),
        "vals_tb4_common_harness": ("terminal-bench-4", "Terminal-Bench 4 — Vals mini-swe-agent", 6, False),
        "aa_tbscience_common_harness": ("terminal-bench-science", "Terminal-Bench Science — AA mini-swe-agent", 7, False),
        "creator_tb4_native_agents": ("terminal-bench-4-native-agents", "Terminal-Bench 4 — native agents", 7, False),
        "snorkel_tbscience_native_agents": ("terminal-bench-science-native-agents", "Terminal-Bench Science — native agents", 5, False),
        "creator_verified_bash_only_historical": ("swe-bench-verified-bash-history", "SWE-bench Verified — historical bash-only", 5, True),
        "aa_tb21_legacy": ("terminal-bench-2-1-history", "Terminal-Bench 2.1 — history", 3, True),
    }
    for series, (identifier, label, count, history) in series_cards.items():
        selected = [r for r in coding if r["series_id"] == series]
        assert len(selected) == count
        sources[series] = {"url": selected[0]["source_url"], "publisher": selected[0]["provenance"], "published_date": None, "type": "reported_evaluation"}
        rows = []
        for r in selected:
            assert 0 <= r["score_percent"] <= 100
            assert r["cost_usd"] is None or (r["cost_usd"] >= 0 and r["cost_basis"])
            assert r["time_value"] is None or r["time_basis"]
            rows.append({"model_variant": r["model"] + " + " + r["agent"] + (" (" + r["effort"] + ")" if r["effort"] else ""),
                         "effort": r["effort"], "agent": r["agent"], "agent_version": r["agent_version"],
                         "value": r["score_percent"], "source_url": r["source_url"],
                         "cost_usd": None, "latency_seconds": None,
                         "reported_cost": {"value": r["cost_usd"], "unit": "USD", "basis": r["cost_basis"]},
                         "reported_time": {"value": r["time_value"], "unit": r["time_unit"], "basis": r["time_basis"]},
                         "evaluation_date": r["evaluation_date"], "model_release_date": r["model_release_date"],
                         "uncertainty_percentage_points": r.get("uncertainty_pp"), "uncertainty_kind": r.get("uncertainty_type"),
                         "default_fallback": r.get("default_fallback"), "fallback_models": r.get("fallback_models"),
                         "source_input": "data/current-coding.original.json", "raw_record": copy.deepcopy(r)})
        assert len({r["model_variant"] for r in rows}) == len(rows)
        card = make_card(identifier, label, series, series, rows,
                         "Can an AI agent complete real coding and terminal tasks?",
                         ("Historical source cohort" if history else "Current source cohort") + "; checked October 1, 2026; exact run dates generally unavailable",
                         {"effort": "Exact model + agent + effort + fallback configurations retained", "tools": selected[0]["tools"] or "Not specified in captured table", "dataset": selected[0]["benchmark"] + " " + selected[0]["dataset_version"] + " / " + selected[0]["subset"], "task_count": selected[0]["task_count"], "metric": selected[0]["metric"]},
                         ["Read within this dataset version, subset, evaluator and scaffold only.", "Model plus agent systems may differ; exact agent versions are often missing.", "Reported cost/time values retain original units and bases in details; the graph displays scores only.", "Per-task cost is separate from whole-evaluation cost. Decode time is not wall-clock time.", "Fallback configurations and alternative failure-scoring values remain in raw records."], history=history)
        card["metric"] = selected[0]["metric"]
        card["cost_time_status"] = "Score-only chart. Known reported cost/time values preserved in reported_cost/reported_time and raw_record; missing values remain null."
        cards.append(card)
    assert len(cards) == 22
    assert sum(len(c["rows"]) for c in cards) == 340
    assert len({c["id"] for c in cards}) == 22
    return {"schema_version": 1, "researched_at": "2026-10-01", "scope": "Current source cohorts plus separately identified original reports and task-version history; no cross-benchmark ranking", "sources": sources, "cards": cards}


if __name__ == "__main__":
    # Import validation helper by a fixed owned local path; never load source scripts.
    data = assemble()
    output = ROOT / "data" / "gallery-current-2026-10-01.json"
    serialized = json.dumps(data, ensure_ascii=False, indent=2, allow_nan=False) + "\n"
    if "--check" in sys.argv:
        assert output.read_text(encoding="utf-8") == serialized, "Gallery projection differs from validated inputs"
    else:
        output.write_text(serialized, encoding="utf-8")
    print(json.dumps({"cards": len(data["cards"]), "rows": sum(len(c["rows"]) for c in data["cards"])}))
