# MORA — benchmark run record

- Work location: `C:\Users\jmore\Documents\Codex\2026-10-06\task-10` (new, initially empty workspace).
- Session work began: **2026-10-06 17:42:13 UTC**, from the clock tool.
- Actual first implementation write began: **2026-10-06 17:45:26 UTC** (clock immediately before the first file-write tool); first write completed by **17:45:33 UTC**.
- Hard deadline: **2026-10-06 18:42:13 UTC** (one hour from session start, stricter than one hour from first implementation).
- Actual stop: **2026-10-06 18:14:25 UTC** (filled during final artifact freeze).
- Model identity: session describes Codex as based on GPT-6. An exact backend model identifier and configured reasoning effort are not exposed to this agent; neither is independently verified. No model or effort override was requested in the delegated input or invoked during the run.
- No other models, subagents, threads, external assets, paid services, publication, or external communication used.
- Execution restriction: **No preview server, browser, Playwright, CUA, native UI, pointer lock operation, GPU scene execution, or performance benchmark may be run during implementation.** Interactive and performance verification is deferred to Jordan's later inspection.
- Permitted verification: lightweight source, build, and numeric navigation checks only.
- Preview address reserved for later launch: `http://127.0.0.1:5187/`. No listener was found on port 5187 at initial inspection. The server is not started during this run.
- Interruptions: no user interruptions or suspended work. Dependency installation initially encountered the sandbox's network/cache restrictions; the authorized public-registry install succeeded on retry with a workspace-local cache. This time is included in the run.

The implementation uses local source and registry-installed libraries. All architectural geometry, sculpture geometry, surface textures and labels are original procedural work created in this workspace.

## Delivered scene

- Entrance gallery: 13 × 12 m, 4.3 m ceiling.
- Sculpture hall: 16 × 15.8 m, 8.2 m ceiling above its elevated floor.
- Broad ramp: 5.4 × 7.2 m, 0.6 m rise, 1:12 grade, continuous floor-height function.
- Original works: Counterfold (thick folded copper with oxidized seams), Meniscus (three cast resin volumes with suspended copper filaments and bubbles), Held interval (twisting carved limestone loop).
- Deep splayed skylights, an eastern clerestory, thick offset portals, bevelled concrete casting panels, tie marks, saw-cut floor joints, sparse edge abrasion, timber benches and original exhibit labels.
- Mouse look, WASD/arrow movement, acceleration smoothing, wall and plinth collision, reset, pause, pointer-lock fallback, detail/sensitivity settings and optional raw frame-interval export.
- Opaque geometry consolidated by material; stationary matrices and sun shadows frozen after initial preparation. No performance result is asserted.

## Final permitted verification

- `npm run check`: **PASS**, 2026-10-06 18:11 UTC. All six source modules parsed successfully. Numerical checks passed for human-scale layout, exact 1:12 ramp, continuous elevation, entrance-to-hall route, return route, 720-sample full circle around the main work, room boundaries and obstacle collision, including a large-motion tunnelling probe.
- `npm run build`: **PASS**, 2026-10-06 18:11 UTC. Vite 7.1.7 transformed 15 modules and generated the production distribution.
- Final production sizes: HTML 3.59 kB; CSS 5.63 kB; JavaScript 807.49 kB (250.67 kB gzip), as reported by Vite.
- An initial empty CSS import and Vite's default config-bundling access to ancestor directories caused intermediate build failures. Both were resolved; the final build uses native config loading and passes.
- Runtime imports and registry versions are pinned: Three.js 0.180.0 and Vite 7.1.7. The lockfile is included.
- **NOT RUN:** browser launch, interactive route inspection, pointer-lock operation, shader/render verification, screenshots, GPU execution and frame-time/performance benchmarks. All are prohibited by the current execution constraint and deferred to Jordan.
- Known limits: desktop WebGL 2 required; no touch controls; the entrance glazing is closed; static daylight; screen-space resin refraction approximates overlapping translucent interiors; visual/runtime correctness remains unverified in a browser.

## Cleanup evidence

A successful, read-only process and port inspection at **2026-10-06 18:09:09 UTC** found:

```text
Owned-process match count: 0
Port-5187 listener count: 0
```

The process query matched this workspace's absolute path and excluded its own foreground inspection shell. No personal application or other entrant's process was stopped. Both dependency-install sessions terminated (first exit 1, retry exit 0); all static-check/build commands terminated. No preview, watcher, browser or GPU test process was started. An earlier sandbox-limited process query returned Access denied and was not treated as cleanup evidence; the successful read-only retry above is the evidence.

The portable artifact contains the production build, original source, pinned dependency manifests, check script and documentation. See `ARTIFACT_RECEIPT.json` for its frozen file hashes and final receipt. Later launch: `npm run preview` from this workspace, then manually open `http://127.0.0.1:5187/`; stop the server with Ctrl+C.

Final cleanup and freeze verification at **2026-10-06 18:14:25 UTC**: workspace command-line process matches **0**; localhost port 5187 listeners **0**. All implementation and validation source is frozen. The archive is packaged immediately after this timestamp; no further source edits are made.
