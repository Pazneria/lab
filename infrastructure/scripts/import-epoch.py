"""Import only the reviewed scope from hash-pinned public CSV snapshots.

Raw snapshots remain in ignored evidence. This script never fetches or geocodes.
"""
import csv
import hashlib
import io
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SNAPSHOTS = ROOT.parent / "evidence/infrastructure/epoch-snapshots"
parts = [json.loads((ROOT / f"data/profiles/research-part-{i:02}.json").read_text(encoding="utf-8")) for i in range(1, 12)]
records = [r for p in parts for r in p["records"]]
recipe = next(r["value"] for r in records if r["kind"] == "fetch_recipe")
essential = {r["value"]["id"]: r["value"] for r in records if r["kind"] == "capacity_site"}
AS_OF = recipe["as_of"]
tables = {}
for source in recipe["inputs"]:
    data = (SNAPSHOTS / source["filename"]).read_bytes()
    digest = hashlib.sha256(data).hexdigest()
    if digest != source["sha256"] or len(data) != source["bytes"]:
        raise SystemExit(f"STOP: {source['filename']} does not match the reviewed snapshot")
    tables[source["filename"]] = list(csv.DictReader(io.StringIO(data.decode("utf-8-sig"), newline="")))

aliases = {
    "Anthropic-Amazon New Carlisle": "rainier-indiana", "New Carlisle": "rainier-indiana",
    "Colossus 1": "colossus-1", "Colossus 2": "colossus-2",
    "OpenAI Stargate Abilene": "stargate-abilene", "Meta Prometheus": "meta-prometheus",
    "Meta Hyperion": "meta-hyperion", "Microsoft Fairwater Wisconsin": "fairwater-wisconsin",
    "Microsoft Fairwater Atlanta": "fairwater-atlanta", "Google Pryor (North)": "google-pryor-north",
}
player_ids = {"Anthropic": "anthropic", "OpenAI": "openai", "Google DeepMind": "google", "Google": "google", "Meta": "meta", "SpaceXAI": "xai", "Microsoft": "microsoft", "Amazon": "amazon"}

def number(value):
    return None if value == "" or value is None else float(value)

def watts(value):
    return None if value is None else round(value * 1_000_000)

def people(value):
    result = []
    for item in value.split(","):
        if not item.strip():
            continue
        pair = re.split(r"\s+#", item.strip(), maxsplit=1)
        result.append({"name": pair[0], "player_id": player_ids.get(pair[0]), "confidence": pair[1] if len(pair) > 1 else "unspecified"})
    return result

def observation(row):
    it, facility = number(row["IT power (MW)"]), number(row["Power (MW)"])
    return {"date": row["Date"], "it_capacity_mw": it, "it_capacity_w": watts(it), "facility_capacity_mw": facility,
            "facility_capacity_w": watts(facility), "state": "future_scenario" if row["Date"] > AS_OF else "dated_estimate",
            "construction_note": row["Construction status"], "source_ids": ["epoch-dc-timelines"]}

sites = []
for row in tables["epoch-data_centers.csv"]:
    owners, users = people(row["Owner"]), people(row["Users"])
    if not set(recipe["filter_entities"]).intersection(p["name"] for p in owners + users):
        continue
    name = row["Name"]
    site_id = aliases.get(name, "epoch-" + re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-"))
    rows = sorted((r for r in tables["epoch-data_center_timelines.csv"] if r["Data center"] == name), key=lambda r: r["Date"])
    past = [r for r in rows if r["Date"] <= AS_OF]
    last = past[-1] if past else None
    it = number(last["IT power (MW)"]) if last else None
    facility = number(last["Power (MW)"]) if last else None
    quantities = {}
    for r in sorted(tables["epoch-data_centers_chip_quantities.csv"], key=lambda r: r["Date"]):
        if r["Data center"] == name and r["Date"] <= AS_OF:
            quantities[r["Chip type"]] = r
    warnings = []
    if any(u["confidence"] == "speculative" for u in users):
        warnings.append("One or more user assignments are speculative; not eligible for a lab-attributed capacity total.")
    if it != number(row["Current power (MW)"]):
        warnings.append("The directory current-power field differs from the dated timeline. This record uses the timeline; the original directory value is retained separately.")
    site = {"id": site_id, "name": name, "atlas_site_exists": site_id in {"rainier-indiana", "colossus-1", "stargate-abilene", "meta-hyperion", "fairwater-wisconsin"},
            "location_label": row["Address"], "country": row["Country"], "hardware_owners": owners, "users": users, "operator_name": None,
            "status": "unknown" if it is None else "operating_estimated" if it > 0 else "not_yet_operating_in_estimate",
            "snapshot_at": AS_OF, "source_updated_at": "2026-10-02", "evidence_at": last["Date"] if last else None,
            "it_capacity_w": watts(it), "it_capacity_mw": it, "facility_capacity_w": watts(facility), "facility_capacity_mw": facility,
            "capacity_basis": "installed_or_inferred_available_capacity_not_metered_consumption",
            "estimate_method": "Epoch AI reconstruction from dated construction evidence, permits and equipment models; see timeline and calculations",
            "source_url": "https://epoch.ai/data/ai-data-centers", "source_ids": ["epoch-dc", "epoch-dc-csv", "epoch-dc-timelines", "epoch-dc-chips"],
            "calculations_url": row["Calculations sheet"], "hardware_types": [v for v in row["Current chip types"].split(",") if v],
            "hardware_count_estimates": [{"chip_type": r["Chip type"], "count": number(r["Number of Units"]), "date": r["Date"],
                "kind": "Epoch estimate; read count source for exceptions", "count_source": r["Number of Units source"], "chip_source": r["Chip type source"]} for r in quantities.values()],
            "warnings": warnings, "future_timeline_available": any(r["Date"] > AS_OF for r in rows),
            "allocated_to_model_lab_capacity_w": None, "formal_uncertainty_interval_w": None, "review_level": "dataset_import_with_attribution"}
    if site_id in essential:
        reviewed = essential[site_id]
        for key in ["it_capacity_w", "facility_capacity_w", "evidence_at", "hardware_count_estimates"]:
            assert site[key] == reviewed[key], f"Essential record disagrees: {site_id} {key}"
        site.update(reviewed)
    site["observations"] = [observation(r) for r in rows]
    site["directory_it_capacity_mw"] = number(row["Current power (MW)"])
    sites.append(site)

assert len(sites) == recipe["expected_sites"], len(sites)
assert len({s["id"] for s in sites}) == len(sites)
assert set(essential).issubset(s["id"] for s in sites)
result = {"schema_version": "epoch-atlas-import-1", "as_of": AS_OF, "attribution": recipe["source_attribution"],
          "source_snapshots": recipe["inputs"], "site_count": len(sites), "sites": sites}
target = ROOT / "data/profiles/epoch-sites-2026-10-05.json"
text = json.dumps(result, ensure_ascii=False, indent=2) + "\n"
if "--check" in sys.argv:
    assert target.read_text(encoding="utf-8") == text, "Epoch projection is stale"
else:
    target.write_text(text, encoding="utf-8", newline="\n")
print(json.dumps({"hashes": "all three matched", "sites": len(sites), "essential_matches": len(essential), "output": str(target)}))
