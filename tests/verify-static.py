"""Validate checked-in asset/fragment references and current public navigation.

Source URL reachability is checked separately by check-source-links.py.
"""
import hashlib
import json
import pathlib
import urllib.error
import urllib.request
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "evidence"


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.refs = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        for name in ("href", "src"):
            if name in attrs:
                self.refs.append(attrs[name])


pages = {}
for page in ["index.html", "benchmarks.html", "results.html", "catalog.html", "results-technical.html"]:
    parser = References()
    parser.feed((ROOT / page).read_text(encoding="utf-8"))
    assert len(parser.ids) == len(set(parser.ids)), f"Duplicate static IDs in {page}"
    pages[page] = parser
report = {
    "checkedAt": datetime.now(timezone.utc).isoformat(),
    "assets": [],
    "fragments": [],
    "publicLinks": [],
    "catalogSourceURLs": "51 exact parent-supplied URLs; separate response results in source-links.json",
}
for page, parser in pages.items():
    for ref in parser.refs:
        parts = urlsplit(ref)
        if parts.scheme or parts.netloc:
            continue
        if parts.path == "/":
            continue  # Existing account-root homepage; checked below as a public URL.
        if parts.path == "/lab/lab-space/":
            assert (ROOT / "lab-space/index.html").is_file(), ref
            continue  # Existing room; checked below at its actual public destination.
        if parts.path:
            asset = (ROOT / parts.path).resolve()
            if asset.is_dir():
                asset = asset / "index.html"
            assert asset.is_relative_to(ROOT) and asset.is_file(), ref
            content = asset.read_bytes()
            assert content, ref
            report["assets"].append({"page": page, "path": parts.path, "bytes": len(content), "sha256": hashlib.sha256(content).hexdigest()})
        if parts.fragment:
            target = pages.get(parts.path or page)
            assert target and parts.fragment in target.ids, ref
            report["fragments"].append({"page": page, "ref": ref})
result_input = json.loads((ROOT / "data/results.original.json").read_text(encoding="utf-8"))
assert (ROOT / "data/results-researcher-readme.txt").read_text(encoding="utf-8") == result_input["readme"]
ET.parse(ROOT / "assets" / "mark.svg")
for url in ["https://pazneria.github.io/", "https://github.com/Pazneria/lab", "https://pazneria.github.io/lab/", "https://pazneria.github.io/lab/lab-space/"]:
    try:
        request = urllib.request.Request(url, headers={"User-Agent": "Lab-local-navigation-check/1.0"})
        with urllib.request.urlopen(request, timeout=15) as response:
            report["publicLinks"].append({"url": url, "status": response.status, "finalURL": response.url})
    except (urllib.error.URLError, TimeoutError) as error:
        report["publicLinks"].append({"url": url, "error": str(error)})
EVIDENCE.mkdir(exist_ok=True)
(EVIDENCE / "static-links.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
print(json.dumps(report, indent=2))
assert all(link.get("status") == 200 for link in report["publicLinks"]), "Some public navigation links failed"
