# Execution record

- Assigned model: GPT-6 / Codex as identified by the execution instructions. The exact runtime model identifier and reasoning-effort setting are not exposed to this task; they cannot be independently verified.
- First implementation action: 2026-10-07 04:49:42 UTC (created the new isolated `ceramics-workshop` directory).
- Deadline: 2026-10-07 05:49:42 UTC, exactly 60 minutes later.
- Actual stop timestamp: 2026-10-07 05:18:55 UTC
- Interruptions: none.
- No subagents, other models, model-backed asset tools, browser, screenshot renderer, GPU tests, server or external publication are used.

## Completed checks

- `node --check` passed for main, world, geometry, materials, navigation and the unstarted launch-server script.
- `npm.cmd run build` passed. Final bundle: HTML 2,495 bytes, CSS 4,030 bytes, JavaScript 563,305 bytes (149.81 kB gzip). Vite issued its nonfatal >500 kB chunk advisory.
- CPU structural verification passed: eight vessel profiles, three seeds per profile, finite positions / normals / UVs throughout the assembled scene, blocked major structures and eleven reachable inspection points with a 0.25m collision radius on a 0.1m grid.
- Final static assembly: 2,998 component objects merged into 41 material batches, 78 scene meshes including signs, 515,582 triangles, 48 horizontal colliders and 16,129,428 bytes of geometry buffers. These are structural counts, not measured rendering performance.
- Exact structural-check output is in `CHECKS.json`.

No browser, headless browser, UI test, screenshot renderer, GPU test, interactive test or performance benchmark was performed. No frame rate is claimed. The finished `dist` build is left for the later separate inspection session.

## Dependency / check history

The initial sandboxed npm install exited with a registry-access error. The permitted pinned registry dependencies were then installed successfully with automatic approval, using a cache inside this entry. Work continued during dependency resolution; the deadline was not paused or extended. The first build exposed an empty CSS data-URL import; it was removed, and subsequent builds passed. There were no outside interruptions or handoffs.

## Process cleanup

Every entry-owned install, syntax-check, build and structural-check command has exited. A final check found no esbuild helper whose executable path belonged to this workspace. No server, watcher, browser or test process remains running for this entry. No unrelated process was terminated.

## Artifact and future launch

- Source and build: `C:\Users\jmore\Documents\Codex\2026-10-07\task-12\ceramics-workshop`
- Static build: `dist/`
- Launch later: `node .\serve.mjs` from the artifact directory. Node is already installed; the compiled build does not require npm installation.
- Suggested launch address only, **not running**: `http://127.0.0.1:5187`
- Controls and limitations: `README.md`.

