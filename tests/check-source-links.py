"""One lightweight GET per original public URL; preserve failures without changing research."""
import concurrent.futures
import json
import pathlib
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone

root = pathlib.Path(__file__).resolve().parents[1]
catalog = json.loads((root / "data/catalog.original.json").read_text(encoding="utf-8"))
sources = [(e["id"], s) for e in catalog["entries"] for s in e["sources"]]


def check(pair):
    entry, source = pair
    item = {"entry": entry, "source_id": source["id"], "url": source["url"]}
    start = time.monotonic()
    try:
        request = urllib.request.Request(source["url"], headers={"User-Agent": "Lab-Benchmark-Source-Link-Check/1.0"})
        with urllib.request.urlopen(request, timeout=8) as response:
            response.read(1024)
            item.update(status=response.status, final_url=response.url, content_type=response.headers.get("Content-Type"))
    except urllib.error.HTTPError as error:
        item.update(status=error.code, final_url=error.url, error=str(error))
    except (urllib.error.URLError, TimeoutError, OSError) as error:
        item.update(status=None, error=str(error))
    item["seconds"] = round(time.monotonic() - start, 2)
    return item


report = {
    "checked_at": datetime.now(timezone.utc).isoformat(),
    "scope": "URL response check only. No page-content, result, or methodology verification; research statuses remain unchanged.",
    "provenance": "Exact URLs from parent-supplied original catalog. No Library materialization.",
    "results": [],
}
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
    for index, result in enumerate(executor.map(check, sources), 1):
        report["results"].append(result)
        print(f'{index}/51 {result["source_id"]}: {result["status"]}', flush=True)
report["responses_200"] = sum(r["status"] == 200 for r in report["results"])
report["failures"] = [r for r in report["results"] if r["status"] != 200]
out = root / "evidence"
out.mkdir(exist_ok=True)
(out / "source-links.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
print(f'Complete: {report["responses_200"]}/51 HTTP 200; {len(report["failures"])} failures retained.', flush=True)
