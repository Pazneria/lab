# Walkable 3D — Jordan's personal benchmark

Static entry previews, one explicitly opened scene at a time, pairwise browser-local preferences, and a separate personal grading notebook. Prompt 01 is an abandoned railway station in autumn woodland. Visuals / performance / fulfillment carry 45 / 35 / 20 points; the build cap is one hour. Jordan judges. No scores or votes have been supplied or prefilled.

The original common prompt is preserved in `prompt-01.txt` and the entry index, retrieved from the completed Astra task's initial instruction. Requested model/effort labels come from the parent task, while the producers could verify only their GPT-6 family identity. Both facts remain visible in inspectors. Producer timing diagnostics have different runs/settings and are not directly ranked.

## Preview and checks

Run `node scripts/serve-walkable.cjs` from the repository root and open `http://127.0.0.1:5191/lab/walkable-3d/`. This Pages-shaped server includes the CORS header that opaque-origin module loading needs. A plain server without CORS cannot run these sandboxed ES-module entries.

With an existing Playwright installation and Chromium executable:

```powershell
$env:LAB_PLAYWRIGHT_MODULE='absolute/path/to/playwright'
$env:CHROME_PATH='absolute/path/to/chrome.exe'
node tests/verify-walkable.cjs
python tests/verify-walkable-integrity.py
```

`LAB_WALKABLE_BASE` can point the same browser checks at the deployed `/lab/walkable-3d/` route. Tests use their own headless browser, sequentially; they do not control the user's browser. Hosting tests are separate from entrant quality grading.

## Frozen submission integrity

Each `entries/<id>/original.zip` is an exact copy of the supplied finished archive. `provenance.json` records its SHA-256, original source, per-file hashes and all hosting adjustments. `.gitattributes` disables Git text conversion under `entries/`.

Only the frozen runtime and source evidence are served separately. Original runtime HTML is stored as `frozen/index.html.txt`, with identical bytes. The host fetches and SHA-256 verifies it only after a click, then creates an in-memory sandbox document. There is no raw entrant HTML launch link on the Lab origin. Scene JS and CSS are copied unchanged; no source is rebuilt and no entrant visuals, controls, quality settings, collisions or behavior are fixed.

The in-memory document receives a base URL, a restrictive Content Security Policy and a small readiness/error/pointer-release bridge. Bracken Hollow additionally needs exactly two hosting path replacements: `src="/assets/` → `src="./assets/` and `href="/assets/` → `href="./assets/`. These affect the script and CSS URLs only. The original HTML and archive are preserved unchanged. Alder Halt needs no path replacements.

Alder Halt's still comes from the frozen archive's `evidence/02-approach.png`. Bracken Hollow's still is captured from the frozen production build in a separate headless browser at its original starting viewpoint, with its existing UI-hiding inspection hook. Preview images are resized and JPEG-compressed; no colors or scene content are altered. They are evidence previews, not a standardized visual score.

## Scoped hosting security review

Reviewed the delivered HTML, first-party source, imports, distribution dependency surfaces and network-sensitive API usage. Both entries create procedural geometry/materials locally. No first-party external requests, telemetry, secrets, credential access, browser storage, workers, parent-page access or navigation code was found. Three.js contains ordinary optional loaders; these entries do not call remote loaders. The Bracken Hollow bundle also has Vite's module-preload fetch shim; its HTML has no preload links, and CSP forbids fetch connections. Bracken Hollow synthesizes audio after the user's entry click.

The iframe has `sandbox="allow-scripts allow-pointer-lock"` and deliberately omits `allow-same-origin`, top navigation, popups, forms and downloads. The scene cannot read Lab DOM or browser storage. CSP limits scripts/styles/images to that entry's frozen directory (plus inline scripts/styles and local data/blob images); fetch/XHR/WebSocket/beacons, frames, objects, workers and forms are blocked. Sensitive device permissions are disabled. Referrers are suppressed and credentialless loading is requested where supported. See the platform behavior in [MDN's iframe reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) and [CSP reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy).

Parent messages are accepted only from the current iframe window, its opaque origin, the expected channel and the current random token. Entrant content is never inserted in the Lab DOM or evaluated by the Lab page. A source/integrity error, load timeout, runtime/asset error, close, Back/Forward, page navigation or hidden tab aborts pending loads and destroys the child browsing context. This ends its rendering loop and audio; there is no hidden scene cache. Scene links and restored history always require another explicit click. Esc releases pointer lock; a parent-owned close control stays outside the scene. These are scoped controls and tests, not a claim that arbitrary future submissions are safe.

## Adding completed entries

1. Receive an explicit frozen handoff. Do not inspect unfinished entrants, give implementation hints or modify their submissions.
2. Audit the completed runtime before executing it. Reject unsafe/malicious submissions; do not silently repair them.
3. Copy the archive unchanged, hash it, and copy only its required runtime/evidence. Preserve HTML as `.txt`; document any minimal hosting path substitutions separately. Preserve original licenses.
4. Capture a still from the completed build, record its origin, and compress it for static browsing. Do not use generated art or a mockup as evidence.
5. Add an entry to `entries.json` with disclosures, controls, limitations, source links, original archive and HTML hashes, and a DOM readiness selector. Give every entry a unique stable ID. Never add invented grades, elapsed times or backend identifiers.
6. Regenerate its provenance hashes and run integrity, security, lifecycle and layout checks. Publish through the existing main/root Pages PR workflow. One finished entry shows a waiting card; two unlock a pair; additional entries create selectable pairs. No backend or external service is needed.

## Personal records

The only persistence key is `lab.walkable3d.judgments.v1`. A saved preference records stable entry IDs, not screen order. Grades are independent; an incomplete grade has a null total. Empty fields are never treated as zero. Records remain in the current browser, can be cleared individually, and can be exported as JSON. Storage failure is explicitly disclosed and falls back to the current page session. There is no authentication, verified judge identity, global ranking, aggregate tally or data upload.
