# Benchmark record

- Model identity provided by the system: GPT-6. Exact API model identifier / variant and configured reasoning effort are not exposed to this execution environment; no more specific value is claimed.
- First implementation timestamp: 2026-10-06 05:35:45 UTC (clock captured immediately before workspace/package creation).
- Editing deadline: 2026-10-06 06:35:45 UTC.
- Actual stop timestamp: 2026-10-06 06:08:57 UTC (final work record, immediately before archive creation; no further scene edits).
- Workspace: C:\Users\jmore\Documents\Codex\2026-10-06\task-6\boreal-station
- Local port: 4367, checked available before launch.
- No other entrants' files or assets used. No other models or subagents used.
- All scene geometry and textures are created within this project. Libraries: Three.js 0.180.0, Vite 7.1.9 (initial setup only; final server/build use Node.js built-ins), Playwright 1.55.1 for hidden-browser verification.
- External interruptions: none. Setup delays, included in the elapsed time: initial npm fetch denied by the network sandbox; approved npm registry install succeeded on retry. Vite dependency optimization hit a filesystem traversal restriction; replaced it with the included standalone local server and vendored registry modules.

## Delivered validation

- Hidden Chrome 154.0.8037.93; Intel Graphics through ANGLE / D3D11; 1440 × 900 at device pixel ratio 1.
- 15 / 15 keyboard movement, repeated entry/exit, collision, pointer-lock, reset, live-timing and pause checks passed. Three full entry/exit cycles plus workbench access. No browser errors.
- 5 / 5 denied-capture fallback, drag-look, keyboard walking, JSON export and pause checks passed. No browser errors.
- Screenshots inspected from nine distinct views, including both directions through the vestibule and an exterior return view.
- Final movement test retained 2,533 actual frame intervals. Its final rolling ten-second window: median 16.4 ms, p95 29.3 ms, p99 38.1 ms. These are headless QA measurements on the shared build host, not a performance score or an isolated-machine claim. Raw values and segment states are in `evidence/walk-test.json`.
- Static opaque geometry is merged; fasteners are instanced; static shadows are cached; textures and shaders are warmed before entry. Render work varies with view: approximately 10–125 draw calls in the measured route.
- Launch: `node server.mjs`, then http://127.0.0.1:4367/.
- Build: `node build.mjs`; standalone files are in `dist/`.
- Known limitations: decorative props and parked-open doors, distant ridge backdrop outside the walking area, desktop controls, approximate reflections, no audio. No blocker to exploring the shelter.

Scene editing, verification, packaging and final bookkeeping all occurred before the deadline. The timestamp below is captured when the final benchmark record is written; no scene edits follow it.

