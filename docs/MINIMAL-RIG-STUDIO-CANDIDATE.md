# Minimal rig studio candidate

Branch `rebuild-minimal-rig-studio`, based on live PR76 revision `cc4e8ada47cdd6ae34ca6697596bdb0bf63bde8d`. Candidate entry: `animation-studio/rebuild.html`. Serve the checkout over HTTP; direct `file:` loading is unsupported for module workers.

The live route, its existing CSP, Lab entry, old UI/source, Human01 study, owner records and approval data remain byte-identical. This candidate starts a separate UI/viewer lifecycle; it does not extend the old host, inspector, tabs or monolithic HTML bundle. Promotion into the default route and publication require separate approval. The candidate defines a self-origin-only module/worker policy for its own new entry; no browser security override or external runtime/CDN is used.

The 34-export inventory is copied exactly into `minimal/pinned-inventory.json`. Thirty-three original bundle records are extracted into individual hash-checked GLBs; the separate unaccepted Human01 skin candidate remains accessible through the preserved original studio. Twenty-six records with active binding allowed and no review opt-in are selectable. The existing six rig-only studies are labeled inspection inputs, not approved rigs or finished animations. No concurrently reviewed art revisions are integrated. Embedded diagnostic clips and static diagnostic poses are exposed; prior Human01 authored movement/study stays in the original entry.

Each selection terminates the obsolete worker and deletes the previous model's GPU buffers. A single model worker fetches and verifies one pinned asset, parses glTF, evaluates poses and deforms geometry. Rotation input coalesces to one pending latest revision; at most one pose calculation runs at a time. Late obsolete results cannot commit. Geometry constants upload once; pose frames transfer only positions, normals and joint markers. No bulk warmup, automatic bounds re-fit, GPU error query per frame, or diagnostic benchmark runs on interaction.

The page owns one low-power WebGL context, with bounded resolution and demand draws. Diagnostic playback uses elapsed wall time and a maximum 30 Hz request cadence, pauses on blur/hidden/offscreen state, and stops at the delivered clip endpoint. Idle pose/camera state has no RAF loop. Hidden work stops after at most the one already-running worker request. Pagehide terminates its worker and disposes buffers/programs and observers; BFCache restoration reloads the disposed entry.

Cancellation and bounded load/pose timeouts keep model selection and page navigation usable. Session health exposes a bounded long-task ring, heartbeat drift, worker lifetimes, live buffer count and bounded pose/load timings. These counters diagnose this session only. The owner supplied an actual Chrome “Page Unresponsive” dialog; its root cause remains unreproduced. No hardware cause or owner-browser success is inferred.

CPU validation: `node --experimental-vm-modules --test animation-studio/tests/minimal-studio.test.mjs tests/verify-public-rig-studio.test.mjs`. Hosted review: `.github/workflows/minimal-rig-studio.yml`, single isolated Chrome/Xvfb session with no security/GPU flags, three-minute browser budget. It checks real scroll and event inputs, all 26 model choices, diagnostic playback, reset, idle loops, missing assets, unavailable WebGL, delayed cancellation, worker CPU stalls/timeouts, mobile layout and navigation disposal/back. Navigation uses a lightweight Lab destination fixture to avoid rendering the unrelated 3D room; it does not certify Lab departure-position restoration. No owner browser/UI is manipulated and no local GPU is used.

Remaining scope limits: rotation-only local posing, no animation authoring/export, no proposal opt-in controls, no Human01 study inside the new UI, no gait/production certification. Use the preserved original entry for those existing workflows. A future default-route promotion must reconcile the candidate's new module/worker policy and Lab return contract explicitly; neither was silently changed here.

## Measured validation and limits

[Hosted run 38305821981](https://github.com/Pazneria/lab/actions/runs/38305821981) passed 44 CPU contracts and 14 browser scenarios at runtime revision `43eb5403c188285beba2088f0936f477829a6b26`. [Raw results](../evidence/minimal-studio/43eb540-hosted.json) retain failures/recovery counters, long tasks, environment and all measurements. Chrome was 154.0.8037.97 on Ubuntu/Xvfb. No owner browser was tested.

| Measurement | Observed |
| --- | --- |
| First navigation to model-data readiness | 2538 ms; first attempt lost WebGL |
| First model worker load | 265 ms |
| Largest first-attempt main long task | 1797 ms during viewer initialization |
| First-pass model selections (mixed cold/cached) | 27–214 ms, median 46 ms |
| Repeated chicken/skeleton selection | 30–50 ms |
| Injected 1800 ms worker stall | Real toggle and scroll responded; heartbeat maximum drift 0.2 ms |
| Idle/hidden/disposal | No idle draw loop; workers/buffers released on navigation |

The final aggregate includes a recorded first-load hosted WebGL context loss (37442), followed by a successful single explicit viewer reload. It is therefore **not a clean cold-viewer startup success**. The test reports that condition rather than hiding it or adding security/GPU flags. The candidate now offers a visible Reload viewer button and passes deliberate context-loss recovery, unavailable WebGL, missing model, cancellation and worker-timeout checks. Browser-driver initialization can still produce a main-thread long task and this candidate cannot promise to interrupt a synchronous browser WebGL initialization. That risk remains for review.

Navigation/back tests used the lightweight destination fixture, not the live 3D room. Model switch timing ends at worker/model readiness; it is not a measured GPU presentation timestamp. Diagnostic playback was sampled at elapsed wall time and paused correctly; no complete animation quality certification is claimed. The owner’s native Page Unresponsive hang is still unreproduced. No publication or default-route switch has occurred.

The runtime files tested at 43eb540 are unchanged by the later evidence-only commit.
