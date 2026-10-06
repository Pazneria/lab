# Stillwater — a tidal workshop

A self-contained, walkable 3D boathouse in soft morning light. Built for the inspection route **workshop → pier end → shore ramp → boat circuit → return**.

## Launch

Requires Node.js 20 or newer and a desktop browser with WebGL 2. All browser dependencies are already included. **No installation or internet connection is needed.**

From this folder, run:

```powershell
npm start
```

Then manually open **http://127.0.0.1:4317**. The server binds only to localhost and never opens a browser automatically. Stop it with **Ctrl+C**.

Alternatively, run `node serve.mjs` or double-click `START-STILLWATER.cmd`. If the port has subsequently been taken, set a different port before launching:

```powershell
$env:PORT = '4318'
node serve.mjs
```

The finished browser artifact is in **dist/**. Do not open `index.html` through `file://`; native ES modules need a local HTTP server. The supplied `dist/` is already built. To rebuild after editing source, run `npm run build`.

## Controls

| Action | Control |
|---|---|
| Walk | W A S D or arrow keys |
| Look | Mouse, after clicking Enter; or hold left mouse and drag when unlocked |
| Brisk walk | Shift |
| Release mouse | Esc |
| Return to the workshop | R or Reset |
| Controls overlay | H or Controls |
| Frame-time display | F3 or Display → checkbox |
| Quality / look sensitivity | Display |

Use Esc before clicking the footer buttons. No jumping, swimming or balancing is required. The shore route is the railed ramp on the east side of the apron. Follow it down, then walk around the beached boat and return by the same ramp.

## What is included

- A 7.2 m timber workshop with separate siding and floorboards, open double doors, windows, rafters, weathered metal roofing and a stone foundation.
- A stocked repair bench with a vise, hand plane, saw, square, paint tins and mug; shelving, net, boathook, crates, sailcloth, lantern and stock timber.
- A 14 m pier with pilings, braces, handrails, toe boards, mooring cleats, rope coils and an end bench.
- A continuous shore ramp, tide-worn stone, shells, wrack, grasses and shallow inlet water.
- A beached lapstrake tender with an open interior, oak ribs, floorboards, thwarts, gunwales, oars, oarlocks, painted identification and supporting chocks.
- Human-scale walking, collision against structural walls and major objects, raised-edge protection and a fixed water boundary.

All scene geometry and material textures were authored for this workspace. The only third-party dependency is **Three.js 0.185.1**, vendored from a locally cached npm registry package. Its MIT license is in `public/vendor/THREE-LICENSE.txt` and `dist/vendor/THREE-LICENSE.txt`.

## Display and frame-time information

Balanced is the default: pixel density is capped at 1.5×. High caps it at 2×. Light uses 1× and a 1024 px shadow map. The other modes use 2048 px shadows. Static geometry is merged by material, the directional shadow map is cached, shaders are prepared before entry, and water uses one procedural pass without a reflection render or simulation.

The optional frame graph shows the most recent animation-frame intervals, mean frame time, p95 and current draw/triangle counts. These are browser frame intervals, not isolated GPU timings. No performance numbers are claimed for this run.

## Validation and limitations

**Performed:** JavaScript syntax checks, offline build, local module/asset checks and eleven CPU/static tests. The navigation tests check the shared route, structural collisions, ramp continuity, pier edge protection, water boundary and rotated boat footprint. They do not constitute an interactive playtest.

**Not performed, per this run's execution constraint:** preview serving, browser launch or control, visual inspection, pointer-lock/input testing in a browser, GPU scene execution, screenshots or performance benchmarks. The supplied address is a launch address; no server was left running.

The environment uses a fixed tide and a bounded walkable area. The boat and workshop props are decorative. Water has a procedural sky response rather than dynamic object reflections. There is no boat simulation, swimming, jumping, audio, mobile/touch control or persistence. Actual rendering, input behavior and frame times remain to be verified by the later inspection.

Run the permitted non-browser checks with:

```powershell
npm run check
npm test
npm run build
```

See **RUN_RECORD.json** for actual UTC timing, the model identity/effort availability disclosure, execution restrictions and process-exit verification. See **VALIDATION.md** for the recorded check results.
