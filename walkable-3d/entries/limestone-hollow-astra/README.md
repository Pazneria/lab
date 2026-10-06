# Limestone Hollow

An explorable limestone cavern built with Three.js. A dry route curves around a shallow pool, passes beneath a broad natural arch, and rises to a survey landing with a view back into the chamber. All geometry, surface textures, water shading, and props were created procedurally for this build.

## Launch the finished build

Requires a desktop browser with WebGL2 and Node.js 20 or later for the small local server.

1. Open a terminal in this folder.
2. Run `npm start`, or double-click `launch.cmd` on Windows.
3. Open **http://127.0.0.1:43187** yourself.
4. Click **Enter the hollow** to capture the mouse.

The finished `dist/` is already bundled. **No dependency installation or Internet connection is required to launch it.** The server binds only to `127.0.0.1`, does not open a browser, and stops with **Ctrl+C**. If the port is occupied, set `PORT` to an unused port before starting.

For example, in PowerShell:

```powershell
$env:PORT = '43187'
npm.cmd start
```

An ordinary static server can also serve `dist/`. Opening `index.html` directly with a `file:` URL is not supported.

## Controls

| Input | Action |
| --- | --- |
| Mouse | Look around |
| W A S D / arrow keys | Walk |
| Shift | Walk faster |
| R | Reset position and view to the entrance |
| Esc | Release mouse and open pause menu |
| H | Show or hide the small controls guide |
| Q | Cycle Light / Balanced / Fine rendering quality |
| F3 | Toggle rolling frame-interval mean, p95, and graph |

If mouse capture is unavailable, hold the left mouse button while moving the mouse to look. Jumping and swimming are unnecessary. Water, main formations, the arch opening, and the surrounding walls constrain movement. The landing is reached along a continuous slope.

Suggested inspection: **entrance recess → eastern pool-side path → arch → raised landing → look back → return**. The south and west shores are also accessible. The striped survey rod is 1.2 metres tall; the camera stands 1.68 metres above the ground.

## Build and permitted checks

```powershell
npm.cmd ci --no-audit --no-fund
npm.cmd run build
npm.cmd run check
```

The check script validates JavaScript syntax, the pure route/collision calculations, reachable pool viewpoints, slope/roof clearance, and packaged files. It does not construct or render the scene. `TEST_RESULTS.txt` contains the final check output.

Rendering uses a capped pixel ratio, a cached stationary sunlight shadow, merged cave geometry, procedural local textures, and one transparent water surface. There are no reflection render targets, postprocessing chains, remote assets, physics engine, or fluid simulation. The initial quality is Balanced; use Q if a later test calls for a different resolution.

## Testing status and limitations

- **No browser, preview server, WebGL/shader execution, interactive playtest, GPU benchmark, or performance measurement was run during implementation.** This was an explicit execution constraint. The preview address is for later launch; it is not currently serving.
- The build and static mathematical checks passed. These do not establish visual correctness, runtime shader compatibility, collision feel, or a measured frame rate.
- Water reflection is an inexpensive approximation of the overhead opening and shaded rock. There is no real scene reflection or refraction pass.
- Collision uses a terrain height field, the actual wall-radius function, an arch clearance envelope, and conservative formation footprints. Small gravel and survey pins do not have individual rigid-body collisions.
- The frame display measures browser animation-frame intervals over the last five seconds of active exploration, not GPU query times. Measurements are made only when the user later runs and explores the build.
- Desktop keyboard/mouse controls are the target; touch navigation and audio are not included.

Exact timing, execution restrictions, model-identification limits, and interruption disclosure are recorded separately in `RUN_RECORD.md`, alongside the delivered artifact. Jordan assigns all benchmark scores; this build claims no score or measured performance result.

Three.js is pinned to 0.180.0; its MIT license is included in `dist/THREE-LICENSE.txt`. Build tooling is pinned in `package-lock.json`.
