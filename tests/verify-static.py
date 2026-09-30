"""Validate checked-in asset/fragment references and current public navigation.

This does not verify the missing catalog's reported source URLs.
"""
import hashlib
import json
import pathlib
import urllib.error
import urllib.request
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


parser = References()
parser.feed((ROOT / "index.html").read_text(encoding="utf-8"))
assert len(parser.ids) == len(set(parser.ids)), "Duplicate static IDs"
report = {
    "checkedAt": datetime.now(timezone.utc).isoformat(),
    "assets": [],
    "fragments": [],
    "publicLinks": [],
    "catalogSourceURLs": "Blocked: source ZIP not installed; 51 reported URLs not checked",
}
for ref in parser.refs:
    if ref.startswith("assets/"):
        asset = (ROOT / ref).resolve()
        assert asset.is_relative_to(ROOT) and asset.is_file(), ref
        content = asset.read_bytes()
        assert content, ref
        report["assets"].append({"path": ref, "bytes": len(content), "sha256": hashlib.sha256(content).hexdigest()})
    elif ref.startswith("#"):
        assert ref[1:] in parser.ids, ref
        report["fragments"].append(ref)
ET.parse(ROOT / "assets" / "mark.svg")
for url in ["https://pazneria.github.io/", "https://github.com/Pazneria/lab", "https://pazneria.github.io/lab/"]:
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
