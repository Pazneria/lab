# Lantern — neighborhood arcade

A standalone, walkable 3D arcade with five original fictional machines, an open token-counter alcove, and a route around the feature cabinet. All artwork, surface textures, signs and reflection maps are generated locally in JavaScript. The scene has no runtime asset downloads.

## Launch the completed build

Node.js is the only requirement for launching the included `dist` build. Dependencies are already installed in this workspace, but they are not needed by this static launcher.

```powershell
Set-Location 'C:\Users\jmore\Documents\Codex\2026-10-06\task-34\lantern-arcade'
node .\serve.mjs
```

**Suggested launch address: http://127.0.0.1:4317/**. This address is not running. No server or browser was started during implementation. Port 4317 had no listening connection when checked. The launcher binds only to localhost and reports an error if the port has since become occupied. Stop it with **Ctrl+C**.

The `lantern-arcade-build.zip` file contains `dist`, `serve.mjs`, and this README. Extract it, open a terminal in the extracted folder, and run `node .\serve.mjs`. Open the suggested address yourself. Opening `dist/index.html` directly with a `file://` address is not supported.

## Controls

| Action | Control |
| --- | --- |
| Begin / resume | Click **Step inside** / **Continue exploring** |
| Walk | **W A S D**, or arrow keys |
| Look around | Mouse, with pointer lock |
| Faster walk | Hold **Shift** |
| Pause / release mouse | **Esc** |
| Return to entrance | **R**, or **Reset view** button |
| Rendering resolution | **Quality** button while paused |
| Optional frame interval display | **F3** |

If the browser denies pointer lock, movement still works and **hold the left mouse button and drag** to look. In that mode Esc or H pauses. The player remains at a 1.67 m eye height. Collision uses a 0.21 m radius and blocks walls, cabinet bodies, the counter, stool and bench. No jumping is needed.

## Inspection route

The entrance faces **MOONWAKE**, a freestanding cabinet with a brass crescent crown, swept fins, twin rotary controls, an original moonlit river screen, side artwork and a rear service panel. Approach the left bank, pass to either side of Moonwake, walk behind it, then return along the right bank. The alcove opens on the right near the entrance.

- Left bank: **CINDER CIRCUIT** and **STACK SIGNAL**. Angular painted cabinets, warm geometric art, ball joysticks and three action buttons.
- Right bank: **TIDAL ARRAY** and **ORBIT POST**. Rounded cream marquee housings, curved wave artwork, rotary knobs and molded buttons.
- Counter: a token jar, loose tokens, bell, ledger, paper cup, small prize shelf and a stool tucked in the far corner.

The windows, entry doors, framed flyers, bench and wood dado provide detail when looking back toward the entrance. Each cabinet has T-molding, bezel construction, curved screen geometry, metal coin hardware, speaker perforations, fasteners, side art and localized contact wear. Screens are static attract images. Games are not playable.

## Checks actually performed

CPU checks and a non-serving production build completed successfully:

- JavaScript syntax checks, including the static launcher.
- Layout check: all five cabinet fronts accessible; solid object footprints and room boundaries; continuous counter opening; **1,125 collision-free samples** along the specified inspection route.
- CPU geometry construction using a stub drawing context: finite vertex coordinates, normals and UVs; **1,288 source meshes consolidated into 163 opaque batches**, **195 total meshes**, **51,948 triangles**, eight lights with one shadow caster.
- CPU raycasts: unobstructed geometry sightlines to all five screen centers from standing approach positions and to the feature marquee from the entrance.
- `npm run build`: Vite production bundle succeeded. The main JS bundle is approximately 563 kB / 150 kB gzip.

**Not performed:** browser launch, interactive testing, visual inspection, screenshots, screenshot rendering, GPU tests, shader compilation checks or performance benchmarks. Geometry budgets are not measured frame rates. The optional F3 display reports recent animation callback intervals during a later browser session; it is not a GPU benchmark.

## Implementation and limitations

The build uses Three.js 0.180.0 and Vite 7.1.7, pinned in the lockfile. Tooling used Node.js v24.14.0. Rendering has no post-processing, realtime screen redraws, or animated lighting. The single shadow map is static, and rendering resolution defaults to a 1.4 pixel-ratio cap. Reflections use a small procedural environment map and screen overlays. Floor shadows and color spill also use inexpensive static decals.

This targets a desktop browser with WebGL 2 and keyboard/mouse input. There are no touch controls, playable games, crowds, audio, additional rooms or exterior movement. Screen glass and window views are artistic approximations. Appearance, pointer-lock behavior and interactive performance require verification in the later inspection session.

## Rebuild from source

```powershell
npm.cmd install --no-audit --no-fund --cache .npm-cache
npm.cmd run check
npm.cmd run check:layout
npm.cmd run check:geometry
npm.cmd run build
```

These commands do not start a server. `npm.cmd run preview` starts the same static launcher as `node .\serve.mjs` when you choose to inspect it. Source files are in `src`.

## Execution record

- First implementation action: **2026-10-07T04:00:37.6365812+00:00**.
- Deadline exactly 60 minutes later: **2026-10-07T05:00:37.6365812+00:00**.
- Actual stop timestamp and cleanup result: see **execution-record.json** in the source workspace.
- Assigned model information available to this run: **Codex, based on GPT-6**. The exact runtime model identifier and reasoning-effort setting were not exposed in the supplied context or environment; they cannot be truthfully recorded more precisely. No other model, subagent or model-backed asset service was used.
- Interruption history: **none**. The clock was never paused or extended. The first dependency fetch hit a sandbox network restriction and was retried with approved registry access. The first build hit a config-loader filesystem restriction; switching to the native config loader resolved it. The first geometry budget check led to material consolidation before the successful final checks.
- No server, watcher, browser, screenshot tool or benchmark process was started. All bounded dependency/build/check sessions exited. A read-only process scan filtered to this workspace found no Node or esbuild process remaining; no unrelated process was terminated.
