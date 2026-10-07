# ASTER — Captain Mara Venn's quarters

An original, explorable Three.js interior: a private sleeping berth, connected study, and an observation nook. The captain is a survey officer who keeps field plants, an old sailing model, a patched quilt, and paper charts alongside her work instruments.

## Launch the completed build

From PowerShell:

```powershell
cd 'C:\Users\jmore\Documents\Codex\2026-10-07\task-30\captains-quarters'
npm.cmd run preview
```

**Suggested launch address: http://127.0.0.1:4317/**

This is a suggested address, **not a running preview**. No server or browser was started during this run. The command binds only to localhost, and `--strictPort` prevents it from silently choosing another port. If 4317 is occupied in the later testing session, stop this command and deliberately choose an unused port.

The production files are already in `dist/`. Dependencies are installed in this workspace. On a different machine, run `npm ci` before `npm run preview`. Node.js 20.19+ or 22.12+ is required by the pinned build tool; this build was produced with Node.js 24.14.0. The scene itself requires a current desktop browser with WebGL 2.

`npm run start` is an optional development launch on the same localhost port. `npm run build` regenerates the production bundle. No network requests, remote models, remote imagery, CDN scripts, or remote fonts are needed when the completed build is served locally.

## Controls

| Input | Action |
| --- | --- |
| Click **Enter the quarters** | Start exploration and capture the mouse |
| W / A / S / D | Walk forward / left / backward / right |
| Mouse | Look around |
| Shift | Brisk walk |
| R | Reset position and view to the entrance |
| Esc | Release mouse capture and pause |
| Continue exploring | Resume mouse capture |
| Reset button | Return to the entrance |
| Balanced / Detail / Economy button | Change rendering quality |
| Arrow up / down | Move forward / backward |
| Arrow left / right | Turn without the mouse |

If the browser rejects mouse capture, exploration automatically falls back to **hold the left mouse button and drag to look**. Esc still pauses. Click Continue to try capture again.

## Inspection route

Enter beside the sleeping berth. Approach the bed's foot drawers, repaired quilt, nightstand, and starboard lockers. Pass through the broad opening into the study, then approach the right edge of the chart desk. Continue into the observation nook, walk up to the window ledge, and turn around to inspect the room layers back toward the entrance. Return along the same continuous passage. The library and nook seat also have reachable approaches.

The interior is approximately 7.22 m wide by 11.15 m long, with a 2.87 m ceiling. The camera eye height is 1.64 m and its collision radius is 0.23 m. Floors are continuous. There is no jumping, gravity, flight, or path that exits the hull.

## Construction and rendering

- Built-in storage has separate fronts, recessed pulls, hinges, shadow gaps, and a continuous plinth.
- The berth has drawers, a recessed base, layered bedding, curved quilt geometry, actual quilt seams, and a stitched repair.
- The study has a supported wood worktop, upholstered swivel chair, plotted paper chart, folio, stylus, instrument display, task lamp, archives, and books with separate covers and page blocks.
- The observation assembly has a chamfered extruded frame, nested gasket and metal rebate, fasteners, mullion, subtle glass, and a safe ledge. The seat, throw, low table, stone, and compass provide domestic detail.
- Composite, brushed metal, wood, textiles, paper, and glass use separate material responses. Their texture sources are locally generated canvas drawings.
- Space is static: a procedurally shaded ocean planet, a small moon, and sparse stars. There is no ship simulation.
- Static opaque meshes are merged by material and room. The final authored scene contains 100 static batches and approximately 140,157 static triangles. These counts are **not frame-rate measurements**.
- There are three rectangular lights, one point light, two spotlights, hemisphere fill, and ambient fill. The two shadow maps update once unless rendering quality changes. There is no bloom, SSAO, real-time screen effect, or live reflection capture.
- Balanced caps device pixel ratio at 1.5; Detail caps it at 2; Economy caps it at 1 and disables shadows. Paused views are not continuously redrawn.

## Checks actually performed

`npm run check` runs only bounded CPU checks:

1. JavaScript syntax checks for the four source modules.
2. Validation of 19 collider boxes and the entrance spawn.
3. 1,717 samples along the inspection route and 17 movement segments.
4. Four anti-tunnelling checks, including hull and furniture collision.
5. A floor-space flood fill: 6,385 reachable cells, with approaches to seven fittings.
6. Numeric scene assembly: finite geometry attributes, finite transforms and bounds, and bounded geometry/light/transparent-object counts. Canvas drawing is stubbed with no-op functions for this check; it produces no pixels.

`npm run build` produces the Vite production bundle. The build tool warns that the bundled application exceeds its default 500 kB chunk threshold. This is principally the Three.js renderer and its lighting lookup data; the complete JavaScript bundle is about 0.81 MB uncompressed and 0.25 MB gzipped.

**Not performed:** browser launch, browser automation, visual inspection, screenshots, screenshot rendering, WebGL/GPU execution, interactive testing, frame-time measurement, or performance benchmarking. Consequently visual correctness, pointer-lock behavior on the judging browser, shader execution, and actual frame rates remain unverified.

## Known limitations

- Desktop mouse and keyboard are the intended inputs. There are no touch controls, gamepad controls, or mobile performance claims.
- Doors, drawers, screens, and personal objects are static. They communicate use through their arrangement but have no interaction logic.
- Glazing is a restrained transparent surface with a highlight, not a ray-traced or screen-space reflection.
- Collision approximates furniture with boxes; it intentionally excludes tiny fittings. There is no crouching or sitting.
- No audio is included.
- No visual or interactive fixes could be based on a rendered view under the run's execution conditions.

## Benchmark record

The authoritative timing and process-cleanup record is `RUN-RECORD.json`.

- System-provided model identity: **GPT-6 / Codex**. The exact runtime model identifier and effort setting were **not exposed by this execution interface**; they are explicitly recorded as unavailable rather than guessed.
- First implementation action: **2026-10-07T09:04:59.6383833+00:00**.
- One-hour deadline: **2026-10-07T10:04:59.6383833+00:00**.
- Actual stop: recorded in `RUN-RECORD.json` after final checks and process cleanup.
- No other models, subagents, model-backed asset tools, existing project assets, or comparison entries were used.
- No user/system pause interrupted implementation. The first registry installation failed with an access error; a subsequent approved registry installation succeeded. The deadline continued throughout.
- No server, watcher, browser, UI test, renderer, or benchmark process was started. Dependency and CPU-check/build subprocesses were allowed to exit and checked for leftovers.

## Dependencies and provenance

Original scene code, geometry, material textures, charts, art, and UI were authored in this isolated workspace. Dependencies are Three.js 0.180.0 and Vite 7.1.7, installed from the npm registry, with exact transitive versions in `package-lock.json`. Their licenses are included in their installed packages; see `THIRD-PARTY-NOTICES.txt` for the shipped license notices.
