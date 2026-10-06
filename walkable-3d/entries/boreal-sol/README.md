# Boreal · Polar field shelter 07

A compact, freely explorable Three.js environment. Walk over wind-shaped snow, cross a shallow grippy ramp and short vestibule, inspect the research workbench and living equipment, then return outside. All geometry, textures, signage and screen imagery were generated in this project. No downloaded scene assets or runtime network requests.

## Launch

The current preview is **http://127.0.0.1:4367/**.

From this directory, with Node.js installed:

```powershell
node server.mjs
```

No installation is needed to run the scene: the licensed Three.js modules are included in `vendor/`.

To recreate and serve the standalone build:

```powershell
node build.mjs
node server.mjs dist
```

Only one server may use port 4367 at a time. The server listens on the local loopback interface. Open the preview yourself; no user browser window is foregrounded by the project.

## Controls

| Control | Action |
|---|---|
| Click **Explore the shelter** | Capture mouse and begin walking |
| Mouse | Look around |
| W A S D / arrow keys | Walk / strafe |
| Shift | Walk faster |
| R / Reset button | Return to the opening snow position |
| Esc | Pause and release mouse |
| P / Frame timing button | Show live frame intervals, median, p95 and draw counts |
| Drag on the scene | Look when cursor capture is unavailable |
| Export frame samples | Download actual render-loop intervals as JSON |

The player eye is 1.64 m above the current surface. The main room is approximately 6.4 × 7.2 m, the vestibule 2.1 × 2.5 m, and the clear entrance 1.7 m wide. Thresholds connect to a continuous shallow ramp. Major walls, windows, the parked door and large furniture have collision; the player cannot leave the compact snow area.

## Validation and evidence

`evidence/walk-test.json` records repeated real keyboard walks into and out of the room, close workbench access, wall and furniture collision, captured mouse-look, reset, timing controls and Escape. `evidence/fallback-test.json` records denied pointer capture, drag-look, keyboard walking and JSON timing export. `evidence/initial-qa.json` records browser errors, the centre-line floor profile and timing. Screenshots cover the entrance, vestibule, workspace, bench, berth, galley and outside return view.

The timing records are QA evidence from headless Chrome on this shared host, not a performance score or an isolated-machine guarantee. The optional live panel shows a rolling ten seconds of requestAnimationFrame intervals. JSON export includes every positive interval after initialization, including long intervals, up to the first 60,000 samples. The scene warms textures and shaders before entry, merges opaque static geometry, instances fasteners, caches static shadow maps, and caps pixel density at 1.6.

## Limitations

- Desktop keyboard and mouse exploration; no touch movement interface.
- Doors stay parked open and props are decorative.
- Distant ridges are scenery outside the walkable area.
- Uses approximate environment reflections, rather than ray-traced glass or reflections.
- Requires a browser with WebGL 2. No sound.
- Exact model variant and reasoning effort were not exposed by the execution environment; this is explicitly recorded in `BENCHMARK.md`.

## Source and license

The scene is in `src/main.js`; the local server and build scripts use only Node.js built-ins. Three.js 0.180.0 and its two utilities are vendored with the MIT license in `vendor/THREE-LICENSE.txt`. Vite was installed during initial setup but the final build uses the simpler standalone server. Playwright 1.55.1 is used only for QA.

```powershell
npm.cmd install
node qa.mjs
node walk-test.mjs
node fallback-test.mjs
```

The browser checks run headlessly and close their browser instances after completion. Benchmark timing and interruptions are recorded in `BENCHMARK.md`.
