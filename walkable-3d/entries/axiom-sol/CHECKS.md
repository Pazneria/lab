# Checks actually performed

All checks used ordinary local CPU tools. No browser, headless browser, screenshot renderer, UI automation, GPU test, server, watcher, or performance benchmark was launched.

- `npm.cmd run check`: passed. This checks JavaScript syntax, valid entrance placement, blocking collision for the instrument and test furniture, the whole 3 m instrument orbit, a sampled inspection-and-return route, finite geometry vertices, geometry budgets, room extents, and human-scale bounds.
- Geometry construction uses a mocked canvas context whose drawing methods do nothing. It constructs real Three.js geometry on the CPU, without rendering any image or creating WebGL. It found a mixed indexed/non-indexed geometry issue during implementation; that was fixed before the final passing check.
- A route check initially found the interpretation stand blocking the selected orbit/approach. The stand was moved beyond the orbit and the route now passes.
- `npm.cmd run build`: passed. Vite created the production files in `dist/`.
- Port 5187: no listener returned from the read-only local port query at 2026-10-07 04:14:23 UTC. No attempt was made to start a server or verify HTTP access.

Final CPU construction counts: 50,682 total triangles, 92 scene meshes (including labels, screens, and shadow decals), 25 merged material batches, and six lights. These are geometry counts, not measured draw times or frame rates. One light casts static shadows.

Vite's only build advisory concerns a JavaScript bundle slightly above its default 500 kB uncompressed threshold. The bundle is about 544 kB uncompressed / 143 kB gzip. All dependencies are bundled; artwork and textures are generated locally at runtime.

Raw results are saved in `CHECKS-CPU.txt` and `BUILD.txt`. The final build hashes are in `BUILD-MANIFEST.json`.

Not verified under the run conditions: rendered appearance, actual pointer-lock behavior, browser compatibility, interactive exploration, visual collision clearance, or frame-time stability. The later judging session must establish these.

Process handling: installs and checks/builds were finite commands and completed. No background browser, server, watcher, or test process was started. A sandboxed process-inventory query was denied access; it was not used to terminate anything, and unrelated processes were not touched. Final cleanup information and actual stop time are in `RUN_RECORD.json`.
