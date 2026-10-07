# Karst Ridge — Upper Terminal

A standalone, first-person 3D mountain cable-car station in rain. The enclosed terminal contains a 4.36 m return wheel, spoked steel construction, a reduction gearbox, motor, rim brakes, support frames and guarded visitor aisle. Cable guides lead through the terminal portal to stationary cabin 04. Its loading side has framed glazing, rain marks, a sliding door, boarding step and a roof hanger/cable grip. Continue along the covered platform to the timber lookout, or use the apron to inspect the front of the cabin before returning.

All station geometry, signs, surface textures, rock and mountain backdrops are original procedural work. There are no remote runtime assets, fonts, accounts or services. Three.js and Vite are the only direct dependencies.

## Launch the production build

The production artifact is `dist/`. Dependencies are already installed in this workspace.

```powershell
Set-Location 'C:\Users\jmore\Documents\Codex\2026-10-07\task-9\ridge-terminal'
npm.cmd run preview
```

Then manually open **http://127.0.0.1:5187/**. This is a **suggested launch address**, not a running preview. No server was started during implementation. Port 5187 is strict: Vite will fail rather than silently choose another port if it is occupied. The command does not open or foreground a browser. Use Ctrl+C in that terminal to stop your later preview.

For a fresh copy without `node_modules`, run `npm.cmd ci` first. To rebuild, run `npm.cmd run build`. Opening `dist/index.html` directly using a `file:` URL is not supported; serve `dist` over localhost using the command above. The build was checked with Node 24.14.0 and npm 11.9.0. Scripts use Vite's native configuration loader to avoid ancestor-directory reads by the configuration bundler in the restricted environment.

## Controls

| Input | Action |
| --- | --- |
| Click **Enter station** | Capture mouse and begin walking |
| Mouse | Look around |
| WASD or arrow keys | Walk |
| Shift | Walk faster |
| R | Reset position and view to the entrance |
| Esc | Release mouse and show controls/resume menu |
| F | Toggle live frame-interval information |

The eye height is 1.68 m. Walking speed is 1.75 m/s; Shift increases it to 3.0 m/s. The flat route uses a 0.24 m player radius, floor boundaries, obstacle collision and movement substeps with wall sliding. There is no jumping. The cabin remains closed and stationary.

The optional F readout reports rolling requestAnimationFrame intervals, their mean and 95th percentile, rendered calls/triangles and canvas resolution. It is CPU-side frame interval information, **not GPU timing**, and no measurements were collected for this entry.

## Checks actually performed

- JavaScript syntax checks for all five scene modules.
- CPU-only scene assembly and geometry integrity, with stub texture canvases and **no WebGL renderer**. Checks include finite vertices, successful static mesh merging, conservative mesh/triangle budgets, and material presence.
- CPU collision checks along eleven inspection-route waypoints, including the front-of-cabin apron, lookout, return path and entrance porch. Checks also cover obstacle centres, unsafe positions and long movement deltas.
- CPU ray queries confirm a level opaque floor at those route waypoints. Camera projection checks put the wheel and cabin landmarks within the initial 16:9 view frustum; they do not establish rendered visibility or visual quality.
- Vite production build. Exact outputs are saved under `checks/`.

**Not performed:** browser launch, visual inspection, screenshots, interactive input testing, GPU testing, server launch, frame-rate testing or a performance benchmark. Visual verification and performance judging are left to the later separate session, as required.

## Rendering choices and limitations

Static opaque geometry is merged by material. Glass uses single-pass translucent panes with rain bump textures and no refraction render target. Shadows are generated once from fixed lighting. Pixel ratio is capped at 1.6. The scene uses an overcast static reflection environment, fog, simple original mountain geometry and fir silhouettes; it has no moving rain particles, cable physics, operating transport or audio.

Requires a desktop browser with WebGL 2 and mouse pointer lock. The walking route is level and deliberately bounded; you cannot enter the cabin, climb railings or descend into the landscape. The physical appearance, transparent sorting, browser compatibility and interactive feel remain unverified under this run's restrictions.

## Run record

- First implementation: **2026-10-07T04:48:08.2895818+00:00**.
- One-hour deadline: **2026-10-07T05:48:08.2895818+00:00**.
- Actual stop timestamp and process cleanup: see `run-record.json`.
- Host configuration read during this run reports **gpt-6.1-sol / low**. The task API did not expose the effective runtime model identifier or effort override, so these configured values cannot be certified as the actual runtime settings.
- No pauses or deadline extensions. The first dependency install encountered sandbox network/cache access restrictions; an authorized retry using this entry's own cache succeeded. Configuration bundling also encountered an ancestor-directory read restriction; native configuration loading resolved it. No other entrants' files or assets were read, and no subagents or model-backed tools were used.

The source, installed dependencies, built artifact, check logs and run record are all contained in this isolated folder. `karst-ridge-build.zip` contains the production `dist` folder for transfer to another static host. It is not publicly published. The Three.js licence is included in the build.

All tracked build/check/install commands exited. A path-based process check found no entry-local esbuild process; read-only netstat found no TCP endpoint on port 5187. A broad CIM process inventory was unavailable in the sandbox; no unrelated processes were stopped. No server, watcher, browser or test process is left running.
