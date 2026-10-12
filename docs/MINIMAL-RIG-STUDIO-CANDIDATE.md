# Minimal rig studio candidate

Branch `rebuild-minimal-rig-studio`, based on live PR76 `cc4e8ada47cdd6ae34ca6697596bdb0bf63bde8d`. Candidate entry: `animation-studio/rebuild.html`, served over HTTP. No PR, default-route replacement, publication or merge is authorized.

The original entry/CSP, Lab entry, rig source, Human01 study, owner edits and approval records remain byte-identical. The 34-export inventory is preserved; 33 records have separate hash-verified GLBs and the unaccepted Human01 skin candidate stays in the original studio. Twenty-six inputs already allowed for active binding are selectable. Existing clips/pose studies remain diagnostics, not approved finished animations. No concurrently reviewed art revisions are integrated.

## Latest idle-recovery correction and one diagnostic job (c9bc6ca)

The remaining idle recovery hole is closed. A recovering health signal arms a 12-second recovery deadline only when no deadline exists. Repeated recovery messages never extend an active draw deadline. Readiness without a new frame does not clear recovery coverage; any replay inherits the existing deadline. A valid presentation clears it. [Run 38310950857](https://github.com/Pazneria/lab/actions/runs/38310950857) passed 51 CPU contracts and the single focused [silent idle-recovery regression](minimal-studio-idle-recovery-c9bc6ca.json): the idle deadline armed, expired, terminated the worker, and a fresh Retry restored edits/camera without page reload. The full aggregate was not rerun.

The same workflow then ran exactly one diagnostic job, with sequential fresh-browser no-graphics, bare worker WebGL and exact candidate cases, one attempt each. It captured three short compressed Chrome traces, explicit trace/Node clock-sync markers, document/no-graphics-worker/Node heartbeats, native trusted input dispatch/handling, and runner CPU pressure. [Raw clocks and summaries](studio-clock-diagnostic-c9bc6ca/result.json), [correlation analysis](studio-clock-diagnostic-c9bc6ca/analysis.json), and the compressed traces in that directory are preserved. Clock-sync events fall within the corresponding Node monotonic before/after brackets (approximately 1–11 ms bounds). No-graphics-worker baselines started before application graphics; the candidate lead-in was only 18 ms, so there is limited pre-graphics cadence in that case. Sampling continued over one second after graphics completion.

| Case | Document max drift | No-graphics worker max drift | External Node max drift | Native key dispatch/ack |
| --- | --- | --- | --- | --- |
| No application graphics | 441.9 ms | 5.1 ms | 1.6 ms | 133 ms |
| Bare worker WebGL | 1.9 ms | 0.5 ms | 13.2 ms | 9 ms |
| Exact candidate | 114.7 ms | 0.2 ms | 1.4 ms | 122 ms |

Classification for the observed no-graphics gap: **browser/process waiting**, with direct trace support rather than inference from absent JavaScript tasks. The actual document renderer (PID 2332, confirmed by its control-document ParseHTML events) ran a GPU-channel establishment task for 420.155 ms wall time and only 1.226 ms thread CPU. That interval overlaps the 441.9 ms document heartbeat gap. A separate WebUI renderer shows the same wait. The worker and Node clocks continued, and runner CPU PSI was low (some avg10 around 0.09%, full 0); this does not support host-wide scheduling starvation. It does not implicate studio JavaScript, since the case loaded none.

The candidate case did not reproduce the prior 898.1 ms failed gap. Its longest reported document task was 62 ms. Trace GPU waits occurred on the graphics worker: shader-status wait about 117.5 ms and an implicit bitmap/readback wait about 467.1 ms, with very little thread CPU. Document/no-graphics-worker/Node clocks remained responsive through the worker wait. Graphics initialized in one attempt without loss. These measurements support the worker isolation for this attempt, not a clean aggregate or owner-browser certification.

**The exact cause of the earlier 898.1 ms candidate failure remains unresolved**, because that failing run had no trace and this one authorized diagnostic attempt did not reproduce it. The historical aggregate remains failed, the 250 ms bound is unchanged, and no further unchanged browser run was made. Current candidate runtime is c9bc6ca; later evidence-only commits change no runtime. The one-shot hosted jobs are pinned to c9bc6ca so later pushes cannot silently repeat the diagnostic or aggregate. Future validation must be configured explicitly. No PR, publication, owner local test or security override occurred.

## Current correction and validation (3f2847d)

Independent review confirmed missing graphics startup/draw deadlines, ineffective Retry after worker failure, unguarded document presentation failures and no-op Retry after constructor failure. These were source defects, not an established cause of the owner's hang.

The bridge now bounds initialization to 12 seconds, each draw to 8 seconds and explicit graphics probes to 1.5 seconds. Timeout, fatal error, message failure or presentation failure terminates the obsolete worker, releases pending state/probes and exposes unavailable status. Retry constructs a fresh worker and fresh OffscreenCanvas instead of messaging the failed worker. A retained full current model plus latest pose/camera restores the current inspection state. Bitmap presentation uses try/catch/finally so missing contexts and transfer/draw exceptions close the bitmap and reach a usable fallback. Constructor failure now retries actual creation and restores the latest CPU pose. Playback pauses on graphics failure; model/pose controls and scrolling remain usable.

[Current final run 38309697759](https://github.com/Pazneria/lab/actions/runs/38309697759) at runtime `3f2847d2cdbe10a3c538385c4a14aaf6026962eb` passed **49 CPU checks and 19 of 20 browser scenarios**. The aggregate is **failed**, because the unchanged strict cold-load heartbeat assertion failed. [Raw current results](minimal-studio-hosted-3f2847d.json) preserve this failure. No unchanged rerun was used to obtain a green status.

All new graphics regressions passed: real worker fatal error, worker script 404, missing module import, nonresponding initialization, nonresponding rendering, missing document bitmap/2d contexts, throwing bitmap presentation and initial constructor failure. Every recovery recreated graphics without page navigation, retained edits and presented a valid frame. The timeout checks used production deadlines, not shortened browser-test overrides. The [focused evidence](minimal-studio-graphics-recovery-e14d8d7.json) records these same passing cases and its separate harness-only final metadata error, corrected before the aggregate; no product assertion was removed.

| Current aggregate measurement | Observed |
| --- | --- |
| First viewer readiness through native input check | 2271 ms; two graphics attempts; automatic recovery; no page reload |
| Startup native toggle | 192 ms |
| Startup heartbeat drift | 898.1 ms — failed the retained 250 ms limit |
| Document tasks at startup | 169 ms and 61 ms |
| Model choices, mixed first-use/cached | 25–48 ms |
| Repeated chicken/skeleton choices | 28–50 ms |
| Deliberate context-loss scenario | 339 ms; no reload; edited pose preserved |

The cold hosting limitation remains unresolved. The independent control below already reproduces graphics unavailability and a multi-second heartbeat gap without any studio implementation, but this does not prove the owner's hang has that cause. The current aggregate's later bare graphics control also returned unavailable. The candidate remains isolated and is not ready for a universal responsiveness claim or default-route promotion. All original/live files and approval records remain unchanged. No PR or publication permission is given.

## Final architecture

A disposable data worker loads and verifies only the selected asset, parses glTF, evaluates joints and deforms poses. Inputs coalesce to one latest pending revision. Model switches terminate obsolete work, discard late results and release previous buffers. Cancellation, bounded timeouts and errors keep selection/navigation available.

A separate graphics worker owns WebGL creation, shader initialization and demand drawing. The document never creates WebGL. It creates its bitmap presentation context only after a valid worker frame, avoiding concurrent graphics connections during cold startup. The bridge allows one draw in flight and one latest queued draw, rejects obsolete presentations and closes transferred bitmaps. Resolution and resource retention are bounded to one model and one active graphics context.

Context loss releases/recreates the worker viewer with at most three initialization attempts. Retained geometry, camera, diagnostic time and joint edits survive recovery. Readiness requires a newly presented valid bitmap, not merely a successful constructor. Graphics recovery does not reload/navigate the document. Exhausted retries expose Retry viewer; model/pose controls and scrolling remain available. Unsupported worker graphics similarly reports unavailable rather than running document WebGL.

Diagnostic time follows elapsed wall time, stops at the delivered endpoint and requests at most 30 Hz. Idle, blur and hidden/offscreen state suspend rendering. Pagehide terminates both workers and observers. BFCache back navigation reconstructs the disposed document through a reload; that is separate from graphics recovery and first-load readiness.

Health records bounded long-task, heartbeat, worker/resource and load/pose metrics. `viewerReady` is distinct from model-data `ready`. No monolithic preload, bulk warmup, startup benchmark or per-frame document GPU query runs.

## Prior passing baseline (166bf54)

[Run 38307964773](https://github.com/Pazneria/lab/actions/runs/38307964773) passed **45 CPU contracts and 16 browser scenarios** at runtime revision `166bf54c472f17b06a0cf7729ffc6303b5142780`. [Raw final results](minimal-studio-hosted-166bf54.json). Chrome 154.0.8037.97 ran on GitHub Ubuntu 24.04/Xvfb with its default SwiftShader backend. No custom GPU/security flags, owner UI, local GPU or paid tools were used.

The strict first-load check requires one document navigation, an actual presented model, zero GL error, native button/scroll response, heartbeat drift below 250 ms and no document task of 500 ms or more. A manual reload cannot satisfy it. The final run used one graphics attempt with no first-load loss or recovery.

| Measurement | Prior passing observation |
| --- | --- |
| Navigation through first viewer readiness and native input check | 879 ms; one navigation; no reload/retry |
| First presented model from app-start clock | 388.2 ms |
| Native startup toggle response | 143 ms |
| Startup maximum heartbeat drift | 4.6 ms |
| Largest startup document task | 189 ms |
| Graphics-worker initialization | 152.4 ms |
| Model choices, mixed first-use/cached | 27–48 ms |
| Repeated chicken/skeleton choices | 30–49 ms |
| Deliberate context loss | 346 ms scenario; no navigation; edited pose retained; new frame presented |
| Injected 1800 ms graphics-worker stall | Toggle 44 ms; scroll responded; heartbeat drift 0.4 ms |

Other checks cover all 26 inputs, actual orbit/pan/zoom, joint edit/reset, diagnostic clock/pause, repeated cleanup, idle/hidden loops, missing models, unavailable WebGL with bounded retries, delayed cancellation, obsolete results, data-worker stalls/timeouts, mobile layout and disposal/back. Navigation uses a lightweight Lab destination fixture, not the unrelated live 3D room; it does not certify departure-position restoration. Switch measurements end at model-data readiness, not a GPU display timestamp. Graphics presentation is tested separately.

CPU command: `node --experimental-vm-modules --test animation-studio/tests/minimal-studio.test.mjs tests/verify-public-rig-studio.test.mjs`. Hosted review: `scripts/review-minimal-studio.mjs`, `.github/workflows/minimal-rig-studio.yml`; bounded runs with no owner-browser success claim.

## Preserved failures and hosting limit

The [earlier document-WebGL result](minimal-studio-hosted-43eb540.json) required a manual reload and contained a 1797 ms document initialization task. That aggregate was insufficient for this replacement's responsiveness requirement; the strict check now prohibits its reload workaround.

The [first worker-graphics experiment](minimal-studio-hosted-ef7b95e-failed.json) failed heartbeat bounds (969.4 ms). The [deferred-presentation experiment](minimal-studio-hosted-8e18b9c-failed.json) failed native input timing (726 ms), with 507.4 ms heartbeat drift despite document tasks of 158/64 ms. Both recovered automatically but are retained as failed cold responsiveness checks.

The [independent cold control](minimal-studio-cold-control-cfe4585.json), [run 38307770953](https://github.com/Pazneria/lab/actions/runs/38307770953), loaded **no studio code, shader, model, bridge or pose worker**. A bare worker `OffscreenCanvas.getContext('webgl')` took 4194.5 ms and returned unavailable. Document heartbeat drift reached 4189.9 ms and a native button response took 4562 ms, while its longest reported document task was 93 ms. This reproduces a hosted graphics initialization stall outside the studio implementation. Control-run success means measurement completed, not WebGL availability succeeded.

The final aggregate's later control was healthy (4.6 ms initialization), demonstrating hosting variability. Off-thread graphics and deferred bitmap connection remove document-owned GL/shader work and support no-reload recovery. They cannot guarantee responsiveness while the browser/graphics service itself stalls. This hosting limit remains explicit; no security flags were added to force graphics acceptance.

The owner's actual Page Unresponsive hang remains unreproduced. Hosted results do not establish its cause or certify the owner's normal browser. Production/default-route promotion needs separate approval and explicit reconciliation of the module/worker policy and Lab return contract. Rotation-only local posing is provided; animation authoring/export, proposal opt-in, Human01 study inside the new UI and gait/production certification remain out of scope.

The current tested runtime is 3f2847d. Later evidence-only commits do not change it. All original source/history, authored assets, owner edits and approvals remain preserved.
