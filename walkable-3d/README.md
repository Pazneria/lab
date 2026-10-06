# Walkable 3D — Jordan's personal benchmark

Static entry previews, one explicitly opened scene at a time, pairwise browser-local preferences, and a separate personal grading notebook. Prompt 01 is an abandoned railway station in autumn woodland. Visuals / performance / fulfillment carry 45 / 35 / 20 points; the build cap is one hour. Jordan judges. No scores or votes have been supplied or prefilled.

The full prompt is available through **View full prompt** in the standalone page and the room's Inspect / Compare worlds controls. Prompt selectors keep comparisons within one brief. Exact UTF-8 task text for railway Sol/Astra and Night Market Luna/Astra/Sol is preserved in `prompt-01.txt` and `prompt-02.txt`, verified against each completed run's initial instruction. Version IDs and SHA-256 hashes appear in the prompt viewer and each build inspector; a TXT download retains the original text. The Opus supplied prompt record is a separate version: it omits the additional frame-time judging paragraph and retains its original whitespace. Manual delivery of that record was not independently observed. The prior railway prompt content already matched the source; its extra final file newline was removed so the downloaded record matches the submitted message bytes. No entrant file changed.

Requested model/effort labels come from the parent task, while the producers could verify only their GPT-6 family identity. Both facts remain visible in inspectors. Producer timing diagnostics have different runs/settings and are not directly ranked.

## Preview and checks

Run `node scripts/serve-walkable.cjs` from the repository root and open `http://127.0.0.1:5191/lab/walkable-3d/`. This Pages-shaped server includes the CORS header that opaque-origin module loading needs. A plain server without CORS cannot run these sandboxed ES-module entries.

With an existing Playwright installation and Chromium executable:

```powershell
$env:LAB_PLAYWRIGHT_MODULE='absolute/path/to/playwright'
$env:CHROME_PATH='absolute/path/to/chrome.exe'
node tests/verify-walkable.cjs
node tests/verify-walkable-room.cjs
node tests/verify-walkable-prompts.cjs
node tests/verify-walkable-observatories.cjs
python tests/verify-walkable-integrity.py
python tests/verify-walkable-publication.py
```

`LAB_WALKABLE_BASE` can point the same browser checks at the deployed `/lab/walkable-3d/` route. Tests use their own headless browser, sequentially; they do not control the user's browser. Hosting tests are separate from entrant quality grading.

## Frozen submission integrity

For railway Sol and Astra, each repository file `entries/<id>/original.zip` is an exact copy of the supplied finished archive. For the manually completed Opus folder, it is explicitly a host-created preservation snapshot of the exact required files and launch records; no producer ZIP was supplied. These ZIPs and the raw `evidence/` folders are retained locally and in recoverable Git history, and explicitly excluded from Pages output. `provenance.json` records their SHA-256 values, original source, per-file hashes and all hosting adjustments, and distinguishes published files from retained records. `.gitattributes` disables Git text conversion under `entries/`.

The site serves the frozen runtime, small JPEG previews, prompt, provenance, licenses and concise producer records. Full-resolution captures, raw test samples, portable ZIPs and the benchmark's development helpers are excluded by `_config.yml`. Unrelated Lab helpers and tests are outside this exclusion scope. Original runtime HTML is stored as `frozen/index.html.txt`, with identical bytes. The host fetches and SHA-256 verifies it only after a click, then creates an in-memory sandbox document. There is no raw entrant HTML launch link on the Lab origin. Scene JS and CSS are copied unchanged; no source is rebuilt and no entrant visuals, controls, quality settings, collisions or behavior are fixed.

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
6. Regenerate its provenance hashes, update `tests/walkable-publication-allowlist.json`, and run integrity, publication, security, lifecycle and layout checks. ZIP and evidence exclusions apply to every entry ID. Inspect the actual Pages artifact with `python tests/verify-walkable-publication.py --artifact path/to/artifact.tar` before recording the publication receipt. Publish through the existing main/root Pages PR workflow. One finished entry shows a waiting card; two unlock a pair; additional entries create selectable pairs. No backend or external service is needed.

## Personal records

The only persistence key is `lab.walkable3d.judgments.v1`. A saved preference records stable entry IDs, not screen order. Grades are independent; an incomplete grade has a null total. Empty fields are never treated as zero. Records remain in the current browser, can be cleared individually, and can be exported as JSON. Storage failure is explicitly disclosed and falls back to the current page session. There is no authentication, verified judge identity, global ranking, aggregate tally or data upload.


## Completed manual Opus handoff and room access

The third railway entry, **Bracken Hollow Station**, came from Jordan's completed manual Claude Opus folder. Its version, effort, actual implementation start, deadline compliance and elapsed time are unverified. Earlier unsuccessful CLI launch time is not used as a start. The supplied README and prompt are retained. Performance figures are explicitly producer claims, not a final grade. The earlier railway Luna submission remains unadmitted.

Only the required Three.js 0.169.0 module, BufferGeometryUtils and MIT license were copied from the supplied dependency directory to `frozen/vendor/three/`, byte for byte. The original HTML is preserved; its in-memory import map receives the single documented `./node_modules/three/` → `./vendor/three/` substitution. No scene changes or rebuild. The completed first-party modules use local procedural geometry/textures; no network, credential, telemetry, storage or parent-navigation surface was found. Its server is retained only in the excluded snapshot and never hosted as executable code.

The [3D Lab](../lab-space/) now has an actual north-wall A/B comparison screen plus accessible native controls. It shares the same isolated viewer as this page. The host bridge explicitly calls `document.exitPointerLock()` on Escape; this is host boundary/input release handling, with frozen scene code unchanged. The Lab's render/input loop is suspended before launching and resumes only after the child has been destroyed. All three pairs are data-driven; one-entry waiting and two-entry single-pair boundaries remain supported.

## Prompt 02 / Night Market

**After Rain** (requested Luna / xhigh), **Raincourt** (requested Astra / xhigh), and **Lantern Court** (requested GPT-6.1 Sol / xhigh) are completed, frozen submissions. After Rain's two-file handoff is preserved in a clearly labeled local host snapshot. The original Raincourt and Lantern Court ZIPs remain untouched in producer workspaces; a Raincourt preservation copy is retained in the local queue. New Night Market entry folders contain no ZIPs or raw evidence, as requested. All three use local procedural assets. The scoped read-only audit found no external runtime requests, secrets, tracking, parent navigation or storage access. Raincourt's bundled Three.js core/module bytes match the already admitted dependency; its geometry helper was reviewed separately.

After Rain needs no path substitutions and uses WebGL 1. Raincourt uses WebGL 2; only its in-memory HTML paths change: `/style.css` to `./style.css`, `/src/` to `./src/`, and `/node_modules/three/` to `./vendor/three/`. Dependencies are copied byte-for-byte into the latter folder. All original runtime bytes remain frozen. Raincourt's own CSV download remains blocked by the existing sandbox restriction; the portable original retains that feature. All three builds' limitations and producer measurements remain visible, with no assigned grades.

The three new stills were captured sequentially from their completed sandboxed builds at the original reset view, then resized with aspect ratio preserved and JPEG compression. Raw captures, producer validation records and ZIPs remain outside Pages. `LAB_SITE_BASE` runs `verify-walkable-prompts.cjs` against a deployed site root; optional `AXE_PATH` enables WCAG A/AA checks. This test covers prompt text/download equality, hash failure, same-prompt pairing, real screen launches, isolated input, suspension, unloading and history. Existing stored railway judgments are preserved.

Lantern Court uses WebGL 2 and needs no path substitutions. Its frozen runtime is copied directly from the ZIP's `dist/` tree; the original archive and raw evidence were not copied. Source hashes and archive-member mapping provide provenance. As with Raincourt, the original JSON measurement download stays blocked inside the hosted sandbox.

## Prompt 03 / Desert observatory

**Saffron Observatory** (parent-selected Astra), **The Asterion** (parent-selected Luna), and **Meridian Observatory** (requested GPT-6.1 Sol / xhigh) are completed, frozen submissions. The parent supplied their exact shared submitted prompt, including all grading and execution rules, in `prompt-03.txt`; version `03-shared` records its source and SHA-256. The parent confirms identical text for all three entrants. Exact backend identities and reasoning effort were not exposed. No scores are assigned.

Sixteen runtime files plus Meridian's separate license notice match their frozen source files or original archive members byte for byte. Host preservation snapshots, raw producer route evidence and full-size host captures remain outside the repository and Pages. Only runtime, three small JPEGs, provenance, licenses and concise producer/host records are hosted. Saffron's original `BUILD_RECORD.json` retains the disclosure that an npm diagnostic exposed another task's package metadata; the producer states that it opened or reused no referenced project files or assets. This disclosure is also visible in its inspector.

The Asterion producer could not inspect actual raster output or frame behavior: its headless GPU failed and the in-app browser was unavailable. Its construction test used a renderer stub. The separate host verification used real WebGL 2 / ANGLE Intel Graphics, captured the unchanged reset view, and checked movement, mouse look, reset, pointer release and context destruction. It is not a performance score. The supplied Three.js deprecated-shadow warning and native fallback remain unchanged; its internal clamped frame estimate is unsuitable for judging long frames.

Saffron's in-memory HTML import map changes only `./node_modules/three/` to `./vendor/three/`. The Asterion's in-memory HTML receives a local import-map mapping for its original absolute Three.js module import, and its module script URL becomes relative. The original HTML and all authored JavaScript remain unchanged. The scoped review found no authored external requests, telemetry, credentials, storage or parent navigation. The existing opaque sandbox and entry-scoped CSP remain in force; Saffron's JSON measurement download stays blocked. Both entries require desktop keyboard/mouse and WebGL 2.

`verify-walkable-observatories.cjs` checks the actual room screen, static initial loads, one active scene, suspended Lab rendering, repeat opens/returns, pointer release, separate saved preferences/grades, prompt isolation, 320–700 px controls, history and a forced missing module. Optional `LAB_CANDIDATE_MANIFEST` supports local staging only and is forbidden for live checks. `LAB_SITE_BASE` runs the admitted pair checks against the deployed site.

Meridian's production HTML, bundled JavaScript and CSS are copied directly from the original ZIP; the producer's bundle hash is verified. Its only in-memory adjustments make `/assets/` script/CSS paths relative. Its bundle's Vite preload shim is unused by the supplied HTML; the host CSP still forbids connections. The full route, 12 producer control/collision checks, and the 1080p headless diagnostics remain separate from host validation. The reported 12 frames above 50 ms and 283.3 ms maximum are disclosed. Its in-scene HUD excludes intervals of 300 ms or more, so it is not the sole basis for long-frame assessment. No scene or measurement behavior was changed.

## Completed manual Opus Night Market

**After-Rain Courtyard Night Market** is the fourth completed Prompt 02 entry, creating six possible night-market pairs. The parent confirms that its manually supplied task was identical to `02-shared`; manual delivery was not independently observed. Its README reports Claude Opus 5.5 in Claude Code desktop, with unavailable effort, start 03:28:03 UTC, approximate first implementation 03:30 UTC, deadline 04:28:03 UTC and last edit 04:05:06 UTC. These remain producer-reported records, not independently verified backend identity or timestamps.

The scoped read-only audit found no authored external network, credentials, storage, tracking, dynamic evaluation or parent navigation. Seventeen required runtime/license files are copied exactly, including only the imported Three.js 0.169.0 module closure. Core, geometry helper and license bytes match the earlier supplied Opus dependency. Only the in-memory import-map prefix changes from `./node_modules/three/` to `./vendor/three/`. A host preservation snapshot remains outside the repository and Pages; no raw evidence or ZIP is published.

The host verifies actual WebGL2 rendering and ordinary controls separately. The supplied synchronous GPU-flushed benchmark includes readPixels overhead and hidden-pane throttling, so it is not treated as live frame-time evidence or a grade. The original planar reflection, bloom, adaptive downward-only resolution, system-font CJK lettering and no-shadow-map limitations remain unchanged. Its small still is captured at the original reset view and default adaptive quality. `verify-walkable-prompts.cjs` now launches all four frozen night-market builds through the actual Lab screen and checks that saved grades and preferences remain separate.

## Prompt 04 / Old greenhouse

**The Fern House** (requested Astra / xhigh) and **The Old Glasshouse** (requested Luna / xhigh) form the first completed greenhouse pair. The parent supplied the identical complete prompt, including grading, inspection route and execution rules; `04-shared` records its provenance and SHA-256. Requested configuration and producer timing remain distinct from verified backend identity. No grades are assigned.

Thirteen runtime/license files match their frozen sources byte for byte. Both builds already use relative local assets and need no hosting path substitutions. Original archives, raw producer evidence and full-size host captures remain outside the repository and Pages. Only runtimes, licenses, small reset-view JPEGs, provenance and concise producer/host records are published. The scoped read-only audit found no authored external requests, telemetry, credentials, storage or parent navigation. The existing opaque iframe and entry-scoped CSP apply unchanged.

The Fern House producer reports 13 functional checks and short local timing sweeps; these are supporting diagnostics, not controlled judging. The Old Glasshouse producer reports nine path/collision checks and syntax/HTTP checks, but no reliable raster capture or performance result. Separate host verification confirmed real WebGL 2 rendering, ordinary walking and mouse input, reset, pointer release and destruction on return. Old Glasshouse's original deprecated-shadow warning and library fallback remain unchanged. Both entries use static foliage/lighting and require desktop keyboard/mouse; mobile comparison stays static. Preferences remain browser-local and separate from personal grades, with no shared tally or new backend.

`verify-walkable-greenhouses.cjs` covers the exact prompt display/download, all six greenhouse pairings, static load budget, actual Lab-screen launches, suspended parent rendering, input/reset/release, repeated unloading, history, missing assets, mobile layout and separate saved judgments. Host checks assign no visual or performance score.


### Completed Fernery submission

**Fernery** is the third greenhouse entry, yielding three same-prompt pairs. The parent identifies the requested model as GPT-6.1 Sol; exact backend identity and effort were not exposed in this handoff. The producer records implementation start at 04:36:47 UTC, final authored freeze at 05:32:20 UTC, and deadline at 05:35:43 UTC. Its interrupted tool call and approximately 21-minute execution gap remain visible; the deadline was not extended. The same complete `04-shared` prompt applies. Personal grades remain blank.

The original ZIP remains outside the repository and Pages. Its production HTML and bundled JavaScript match the archive and producer files byte for byte; the original authored source hash also matches the producer record. The only hosting adjustment makes the script's `/assets/` prefix relative in viewer memory. The separate unchanged Three.js MIT license is documented independently. The scoped source/bundle audit found no authored external requests, storage, credentials, telemetry or parent navigation. No scene fixes or rebuild were performed.

Producer route evidence reports seven walking stops, control/collision checks, and frame diagnostics. The walking sample contains 1,416 frames, a 28.3 ms p95, one frame above 50 ms and a 51.9 ms maximum; its nominal 1920 × 1080 viewport rendered at 1686 × 948. These are producer measurements, not a score or controlled comparison. Fixed pixel caps, static foliage/shadows, approximate glass and sparse animated dust remain unchanged. Separate host checks verify actual WebGL 2, walking, mouse look, reset pose, pointer release, isolation, destruction, missing-bundle failure and history. The compressed preview comes from the frozen build's ordinary reset view.


### Completed manual Opus greenhouse

**The Old Palm House** is the fourth completed greenhouse, providing six pairs. The parent confirms it received the same complete `04-shared` prompt; no separate prompt-variant record was present in the delivered project files. Its README reports Claude Opus 5.5, with unavailable session-default effort, work start at 05:19:47 UTC, approximate first source file at 05:27 UTC, deadline at 06:19:47 UTC and last edit/build at 05:56:10 UTC. These manual-run claims remain distinct from independently verified identity and timing.

The production HTML and bundle, plus the original Three.js license, are preserved byte for byte. The sole hosting adjustment makes `/assets/` relative in viewer memory. A local preservation snapshot retains authored source and package records outside Git and Pages. The scoped source/bundle audit found no authored external requests, credentials, storage, tracking, dynamic evaluation or parent navigation. The existing viewer, CSP, room and navigation remain unchanged.

Host checks confirmed actual WebGL 2 rendering, normal walking and mouse input, original reset pose, pointer release, opaque isolation and destruction. Its native drifting dust and adaptive resolution remain active. The producer's hidden-pane synchronous render/readPixels measurements are synthetic GPU-cost diagnostics; no pointer-locked frame-time capture was available, and no grade is assigned. The compressed preview was captured from the unchanged reset view at native adaptive settings. Static shadows, non-solid leaves, approximate sun shafts and simplified distant trees remain as submitted.
