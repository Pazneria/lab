# Rig studio responsiveness fix

Ordinary wheel input over the viewport previously intercepted page scrolling, and every orbit redraw rebuilt deformation, triangle-area screening, and expanded triangle buffers. Callback-per-byte base64 decoding also blocked cold startup and uncached model loads. The page keeps its existing offline bundle and CSP.

The fix lets ordinary wheel input scroll; Zoom + / - and Ctrl-wheel handle zoom. It uses scalar skinning, memoized poses/deformation, area screening on request, reusable indexed GPU buffers, and 10 Hz detail updates during 30 Hz playback. Camera-only changes reuse geometry. Obsolete model loads are checked before decoding/preparation. Loading controls remain inert with aria-busy until their event handlers and renderer are ready; Back to Lab remains available.

Validation: 168 CPU tests; 13 native installed-Chrome/headless checks covering 32 eligible models, all six incoming exports, clips/editing/comparison, sustained capture outside the viewport, focus recovery, Human readiness retry/draft retention, real captured Lab walking/E and skeleton mouse entry, exact return position/camera, and mobile touch. Lab renderer disposal on departure was observed. All owned browsers/servers and shared graphics leases were closed.

An independent comparison of 34 model sources, 499 poses and 2,570,816 sampled vertices found bit-identical Float32 positions/normals against the prior evaluator. Bundle JSON, Human authoring child and CSP remain identical. No asset acceptance, Tidewarden, Lab, SceneBench, save, benchmark, backend, or voting changes.

Bounded 1280 x 900 DPR1 profile results (4x CDP CPU throttling is an artificial slow-device test):

| Measurement | Exact deployed baseline | Final candidate |
| --- | ---: | ---: |
| Cold local readiness | 2264 ms | 1823 ms |
| Largest main-thread task in scripted session | 484 ms | 175 ms |
| Native skeleton selection | 528 ms | 277 ms |
| Native dwarf selection | 386 ms | 230 ms |
| Native minotaur selection | 381 ms | 238 ms |
| Paused skeleton orbit, approximately 1.24 seconds | 12 draws | 37 draws |
| Scroll over canvas | 0 -> 0 -> 0 px | 0 -> 470 -> 0 px |

These are individual runs with scheduling/network variability, not statistical guarantees. A matched intermediate before/after run also reduced the maximum task from 484 to 222 ms and increased drag draws from 12 to 27. Baseline live cold startup recorded a 506 ms block. Normal-speed final maximum was 73 ms. Paused camera drag performs zero mesh uploads. Idle was quiet in both baseline and candidate; no runaway idle loop was established.

The exact owner's page-unresponsive dialog was not reproduced. Do not claim universal smoothness, 60 FPS, elimination of every owner-browser trigger, or long-session memory stability. Initial 16.8 MB HTML parsing remains synchronous. Wire/area overlays and large imports add CPU work. Actual owner's browser with the game running still needs confirmation after release. A worker/lazy-network loader was not applied: automatic approval review rejected its CSP change under the no-security-changes instruction. No browser security flags or policy modifications were used.

Private receipts and reproducible harnesses are in task-35/deliverables: rig-responsiveness-baseline.json, rig-responsiveness-comparison.json, rig-performance-final-profile.json, rig-performance-browser-verification.json, rig-performance-preservation.json, rig-performance-cpu-tests.tap, compare-rig-responsiveness.mjs, profile-final-rig-performance.mjs, review-rig-performance.mjs, verify-rig-performance-preservation.mjs. These receipts describe local candidate testing, not deployment.
