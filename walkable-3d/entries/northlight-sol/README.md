# Northlight — a ceramics workshop

A standalone, explorable Three.js environment with a working pottery studio, a sheltered glaze shed and a brick kiln yard. The two studio portals form a walking loop. Everything is generated locally from geometry and procedural material maps; there are no remote assets, services, accounts or crafting mechanics.

## Launch the finished build

Node.js is already installed in the execution environment. From PowerShell:

```powershell
Set-Location 'C:\Users\jmore\Documents\Codex\2026-10-07\task-12\ceramics-workshop'
node .\serve.mjs
```

**Suggested launch address:** http://127.0.0.1:5187

This is not a running preview. No server or browser was started during this entry. Open that address yourself after launching the server. The server binds only to localhost and does not open a browser. Ctrl+C stops it. If the suggested port is occupied, use `node .\serve.mjs --port 5189` and visit the corresponding address.

`dist/` contains the finished static build. The included server requires no npm installation. To rebuild or change the source, use `npm.cmd ci --no-audit --no-fund` followed by `npm.cmd run build`. The pinned dependencies are Three.js 0.180.0 and Vite 7.1.9.

## Controls

| Input | Action |
|---|---|
| Enter the workshop / click scene | Capture the mouse and explore |
| WASD or arrow keys | Walk |
| Mouse | Look |
| Shift | Walk faster |
| Esc | Release the mouse / pause |
| R or Reset | Return to the entrance |
| H or Controls | Show control help |
| F or Frame times | Show rolling frame intervals |
| Drag on scene | Look fallback when pointer lock is unavailable |

The camera is 1.66m above the level floor. A 0.25m collision radius and bounded movement substeps prevent crossing major walls, tables, shelves, roof posts and the kiln. Small tools and foliage do not have individual collision. There is no jumping, crouching or crafting.

## Inspection route

Start inside the closed entrance doors. The central workbench holds wet clay, leather-hard ware, a trimmed inverted bowl, fitted lids, a finished teapot, trimming ribbons and hand tools. Walk either side of the bench to the north and west pottery shelves. The upper doorway in the east wall opens into the glaze shed, where containers, test tiles, brushes, a sieve, a wash sink and a drying rack support the preparation bench. Continue under the open lean-to edge into the kiln yard. The kiln has bonded bricks, an arch, an iron door, hinges, a latch, draft and cleanout fittings, tension bands, a thermometer, a corbel roof and a capped chimney. Return through the lower studio doorway for a different view of the bench and entrance.

Vessels have hollow interiors, uneven rims, asymmetry, several thrown profiles, handles, varied sizes and unglazed feet. Raw clay and seven glaze families use separate color, roughness and normal maps. Timber grain follows the length of boards. Courtyard masonry and interior limewash are distinct surfaces. Sun shadows are cached because the architecture and props are static. Static geometry is merged by material, with indexed buffers, a capped pixel ratio and no continuous asset loading, particles or postprocessing chain.

## Checks actually performed

- JavaScript syntax checks.
- A non-serving Vite production build.
- A CPU-only structural check of all eight vessel profiles across three seeds.
- Checks for finite positions, normals and UVs in the assembled scene.
- A 10cm grid reachability check with the actual horizontal collision model: entrance, all four bench sides, pottery shelves, glazing bench, kiln front / sides / back and return portal.
- Collision checks that the workbench, kiln and studio wall are blocked.

`node .\verify-scene.mjs` repeats the structural checks without a browser or WebGL context. Its canvas stub supports geometry assembly only; it does not verify texture appearance. Exact final check output is included in `CHECKS.json`.

## Limits and unperformed checks

No browser, headless browser, UI test, screenshot renderer, GPU test, interactive playtest or performance benchmark was used. Visual correctness, pointer-lock behavior and actual frame rates are therefore unverified. The later inspection session should check those directly. WebGL2 and a desktop keyboard/mouse are required. Collision is horizontal against static rectangles, with a fixed floor and eye height. Lighting is static; contact shadows are soft decals and reflections use a small studio-light environment generated at launch.

The F panel reports the mean and 95th percentile of the last 240 rendered frame intervals, plus draw calls and rendered triangle count. These values are collected only when the scene runs. They are not pre-recorded results or a claimed frame rate. For later inspection, `window.workshopDiagnostics()` also exposes raw interval samples, renderer counts and camera position.

Timing, model-identification limits, interruptions and process cleanup are documented in `RUN-RECORD.md`.
