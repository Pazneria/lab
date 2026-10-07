# The Quiet Meridian

A standalone, explorable 3D home aboard a vessel: Captain Ilyra Venn's bedroom, connected private study and observation nook. All geometry, paintings, botanical folios, fabrics, charts and celestial textures were authored specifically for this entry. Three.js and Vite are the only dependencies. No external assets or network services are required by the scene.

## Launch

From PowerShell:

```powershell
Set-Location 'C:\Users\jmore\Documents\Codex\2026-10-07\task-29\captain-ilyra-quarters'
npm.cmd run dev
```

Suggested launch address: **http://127.0.0.1:4387/**. This is not a running preview. No server or browser was started during implementation. The port had no active listener when checked; `--strictPort` makes Vite fail clearly if it is occupied later.

Dependencies are already installed in this workspace. For a fresh copy, run `npm.cmd ci --no-audit --no-fund` first. Node 22.12 or newer is recommended; this build used Node 24.14.0 and npm 11.9.0.

The compiled production artifact is **dist/**. To serve that build locally:

```powershell
npm.cmd run preview
```

Use one launch command at a time. Stop the local server with **Ctrl+C** when finished.

## Controls

Click **Enter the quarters** to capture the mouse. This requires a normal desktop browser tab with WebGL 2 and pointer-lock support.

| Input | Action |
| --- | --- |
| Mouse | Look freely |
| W A S D / arrow keys | Move |
| Shift | Walk faster |
| R | Reset position and orientation to the entrance |
| Esc | Release the mouse and pause |
| H | Toggle the small interface |
| Controls button | Pause and show controls |

Movement stays on the level deck at an eye height of 1.66 metres. A 0.24-metre collision radius blocks the hull, bulkheads, window ledge and major furniture. Diagonal movement is normalized, movement is frame-time based and collision uses small substeps. There is no jumping, crouching, furniture interaction or automatic tour.

## Inspection route

The broad passage runs past the recessed berth and fitted wardrobe, through a framed opening alongside the study desk, then through a wider opening to the observation seat and layered window collar. Return along the same passage. Approach the bed from its open side, and the desk from the center of the study. At the window, the resting ledge provides a physical stop.

Ilyra keeps pressed botanical samples, a family silhouette and a painting of the tidal coast she calls home. Her study contains a paper approach chart, a watch log, a mechanical sextant, sample jars and correspondence to Mara. An orrery and an open book sit within reach of the observation chaise. The view shows the invented world Aster, a small moon and a fixed star field.

## Checks and limits

Actually performed:

- Node syntax checks of all application modules.
- CPU-only scene construction with a no-op canvas context, verifying static geometry consolidation and finite vertex coordinates.
- CPU collision checks covering the full inspection and return routes and hull, berth, portal and window barriers.
- CPU ray checks of the entrance-to-window sightline and exposed dressing-niche and archival-book geometry; shader include names resolve.
- A non-serving Vite production build.
- Read-only listener check for suggested port 4387.

**Not performed:** browser launch, screenshot or rendering, visual review, interactive input checks, WebGL shader compilation, GPU tests, performance benchmarks, frame-time or FPS measurement. Visual appearance, browser behavior and performance require the later separate inspection session. CPU geometry counts are construction evidence, not a measured frame-rate claim.

Performance measures in the implementation include static mesh consolidation, one shadow map updated once, a baked planet color texture, modest unshadowed practical lighting, no postprocessing, no animated simulation and a render resolution cap of four million pixels with device pixel ratio capped at 1.65. The static environment reflection texture is filtered by Three.js at first render.

Known limitations: desktop keyboard/mouse controls; no touch navigation; approximate horizontal furniture collision boxes; static lighting and scenery; no sound. Shaders and lighting have not been visually verified under the execution rules. Vite reports a bundle-size warning for the single Three.js application chunk; the build still succeeds.

## Execution record

See **execution-record.json** for the first implementation timestamp, exact 60-minute deadline, stop timestamp, interruption history, dependency and check results, and process cleanup. The system identifies the assigned model as GPT-6. The exact runtime model slug and effort setting were not exposed to this session; these are recorded as unavailable rather than inferred from the task title or app defaults. No other model, subagent or model-backed tool was used.
