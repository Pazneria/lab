"""Project card documentation into the existing notes map without changing discovery."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/gallery-notes.json"
notes = json.loads(path.read_text(encoding="utf-8"))
cards = json.loads((ROOT / "data/gallery-current-2026-10-01.json").read_text(encoding="utf-8"))["cards"]
for card in cards:
    if card["id"] in {"hle-diamond", "swe-bench-pro-public-v1", "terminal-bench-2"}:
        continue
    if card["category"] == "medical":
        matters = "Medical tasks test careful use of information and workflow tools. This controlled benchmark result does not establish that a system is safe for clinical use."
    elif "swe" in card["id"] or "terminal" in card["id"]:
        matters = "Finishing a software task requires an agent to inspect a problem, use tools and check its work. The result describes the complete model and agent setup."
    elif "frontiermath" in card["id"]:
        matters = "Research-level math tests whether a model can build a sustained argument and use computation to explore a difficult problem."
    elif "mmmu" in card["id"]:
        matters = "Questions with images require a model to connect what it sees with subject knowledge and reasoning."
    else:
        matters = "Difficult science questions test whether a model can reason beyond familiar facts. Exact configurations help explain the range of reported results."
    read = "Higher means a higher " + card["metric"] + " within this source cohort. " + " ".join(card["limitations"])
    if card["history"]:
        read = "Historical evidence retained for comparison over time. " + read
    notes[card["id"]] = {"question": card["description"], "matters": matters, "read": read,
                          "notice": card.get("cost_time_status", "No paired cost or elapsed-time measurements supplied."), "date": card["date_label"]}
path.write_text(json.dumps(notes, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"note_entries": len(notes)}))
