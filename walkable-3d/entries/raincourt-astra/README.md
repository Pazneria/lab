# Raincourt — After the rain

A small, walkable night market in an enclosed urban courtyard. Four stalls surround the open paving: Willow produce, Ember skewers, Moon dumplings, and Little Stem flowers. A timber-covered passage leads to One Last Cup, a tiny tea counter.

## Launch

The live local preview is **http://127.0.0.1:52743/**.

The portable build is in `dist/`. It contains the application, original procedural assets, the necessary Three.js modules, and their license. No network connection or package install is needed to run the portable build.

1. Open a terminal in `dist/` (or in the extracted portable ZIP).
2. Run `node serve.mjs` using Node.js 18 or newer.
3. Open **http://127.0.0.1:52743/** in a current desktop browser with WebGL 2 and hardware acceleration.

From the source workspace, `npm run preview` serves the same build. `npm run dev` serves the source files. `npm run build` refreshes `dist/`. If restoring the source without `node_modules`, run `npm ci` first. The browser does not need internet access after installation.

The server binds only to `127.0.0.1`. It does not open or foreground a browser. If 52743 is occupied, set the `PORT` environment variable to another available port before starting it. Stop the server with Ctrl+C.

## Controls

| Control | Action |
| --- | --- |
| Click **Explore the courtyard** or the scene | Capture the mouse |
| Mouse | Look around |
| W / A / S / D or arrow keys | Walk |
| Shift | Walk faster |
| Q / E | Turn using the keyboard |
| Esc | Release the mouse |
| R or **Reset** | Return to the courtyard entrance |
| H or **Controls** | Show controls |
| P | Toggle the live frame-time panel |
| **Quality** | Toggle high / balanced rendering resolution |

If pointer lock is unavailable, hold and drag on the scene to look. The camera remains at human eye height. Movement slides along major walls, counters, crates, signs and support posts.

The suggested route is entrance → four stalls → beneath the awnings → passage → tea counter → return. There are also routes around the sides and backs of the stalls. No interaction, scoring, characters or automatic tour is required.

## Measurement and implementation

Press **P** to see median, 95th and 99th percentile frame times, current draw calls, triangle count, and actual drawing-buffer size. Release the mouse with Esc to select **Save frame times as CSV**. The panel retains up to 3,600 recent visible-page animation frames. Initial loading frames are excluded. Values are browser animation-frame intervals, not GPU timer-query measurements.

Geometry is grouped into static batches by material and area. Shadows are rendered once for the stationary scene. The ground combines original color, bump and roughness textures with physically based point-light highlights and a prefiltered environment. Lantern haloes share one draw call; steam is a small GPU particle system. High quality caps the render buffer at roughly 2.07 million pixels, while balanced uses about 1.2 million pixels. UI text remains at browser resolution.

All artwork and scene geometry were authored procedurally for this entry. The only runtime library is Three.js 0.180.0, included under its MIT license. Playwright 1.55.1 is used only by the local headless test scripts.

## Verification and limits

Test evidence is in the workspace's `evidence/` directory. `route-test.json` records actual keyboard movement through the inspection route, mouse-look, reset, controls, quality, CSV export, resizing, and wall/counter collision checks. The accompanying CSV files contain raw frame intervals. Headless test samples are evidence from this shared host, not a promised frame rate or a benchmark score. Jordan assigns scores during independent exploration.

Known limits: desktop keyboard/mouse controls; no mobile movement UI; no audio; stationary props; fixed eye height with no jumping. Reflection lighting is approximate and does not reproduce the courtyard as a live planar mirror. The application requires HTTP serving rather than opening `index.html` as a `file://` URL.

The exact implementation start, deadline, stop time, environment limitations and tooling interruptions are recorded in `benchmark-log.json`. No other models, subagents, entrants' files, external asset services or public publication were used.
