# Rainfall Terminal

A compact, explorable mountain cable-car station in wet weather, built with Three.js. All geometry and surface artwork were created procedurally for this entry. No external images, fonts, models or project assets are requested at runtime.

## Launch the delivered build

Requires Node.js 20.19+ or 22.12+ and a desktop browser with WebGL 2 and pointer-lock support.

In PowerShell:

```powershell
cd 'C:\Users\jmore\Documents\Codex\2026-10-07\task-10\rainfall-terminal'
node launch.mjs
```

Then open **http://127.0.0.1:5187** yourself. This is a **suggested launch address, not a running preview**. The launcher serves only the included `dist` folder on loopback and does not open a browser. Use Ctrl+C in its terminal to stop it. If you unpacked the portable archive elsewhere, run `node launch.mjs` from that extracted folder instead; no dependency installation is needed for the production build.

If 5187 is occupied at launch time:

```powershell
$env:PORT = '5188'
node launch.mjs
```

Open http://127.0.0.1:5188 in that case.

## Controls

- **Enter the station / click the scene:** capture the mouse.
- **Mouse:** look around.
- **W A S D** or **arrow keys:** walk.
- **Shift:** faster walk.
- **Esc:** release the mouse and show controls.
- **R** or **Reset:** return to the entrance.
- **Quality:** switch between High (pixel ratio capped at 1.5) and Balanced (capped at 1).

The camera stays at 1.68 metres, with stable eye height and no head bob. There is no jumping, climbing, operating machinery or entering the closed cabin. The scene is designed for desktop keyboard and mouse.

## Inspection route

Start just inside the entrance. The yellow return bullwheel sits to your left; its motor, brake, support bed, bearings and cable paths are modelled. Follow the guarded aisle through the large opening to Platform 04. The cabin's split doors face the platform. Continue past it into the lower timber lookout, then turn back toward the cabin and drive hall. The route is level, with collision against the major walls, machinery guard, cabin, posts, benches and platform edges.

## Source and rebuild

```powershell
npm.cmd ci --no-audit --no-fund
npm.cmd run check
npm.cmd run build
```

`npm.cmd run preview` is an alternative local launcher for the built files. `npm.cmd run dev` starts the source development server. Neither was started during this entry.

- `src/station.js`: shell, machinery, cabin, platform, lookout, fixtures and geometry batching.
- `src/materials.js`: locally generated concrete, timber, metal, rain-marked glass and signage textures.
- `src/landscape.js`: static alpine backdrop, vegetation, environmental reflections and lighting.
- `src/walk.js`: pointer lock, movement, collision and reset.
- `scripts/check-route.mjs`: bounded, CPU-only geometry and route checks; no rendering.
- `run-record.json`: implementation timing and execution disclosure.
- `CHECKS.md`: checks performed and known limitations.

## Performance design

Opaque station geometry is merged by material. Glass uses individual, thin sheets with a single transparency pass. The static shadow maps are generated once; there are no real-time reflection passes, animated cable physics, rain particles, postprocessing passes or remote asset loads. The render resolution has an explicit cap. `window.stationInfo` exposes geometry counts and a read-only renderer-counter function for a later inspection session. These design choices are not frame-rate measurements.

## Execution restrictions

No browser, headless browser, screenshot renderer, GPU test, interactive test, performance benchmark, HTTP server, development server or preview server was launched during implementation. Visual correctness, pointer-lock behavior on the judging browser and actual frame times remain unverified. The first implementation timestamp, one-hour deadline and final stop timestamp are recorded separately. No other model, agent or model-backed asset tool was used.

The session identified the model as GPT-6, but did not expose an exact model variant or the configured reasoning-effort setting. Those unavailable values are explicitly recorded rather than inferred.
