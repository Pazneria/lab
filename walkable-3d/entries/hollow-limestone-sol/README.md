# Hollow — Limestone at daybreak

An actual first-person 3D cavern: a recessed entrance, a shallow underground pool, a broad eroded limestone arch, and a raised survey landing. A continuous dry bank connects the spaces. All scene geometry, texture pixels, and props were made for this entry.

## Launch the supplied build

1. Open a terminal in this folder.
2. Run `node server.mjs` (or `npm start`). No installation is needed for the supplied `dist/` build.
3. Open **http://127.0.0.1:4187/** in a desktop browser with WebGL2.
4. Click **Enter the cavern** to enable mouse-look.

The server binds only to localhost and does not open a browser. Stop it with **Ctrl+C**. If 4187 is occupied at launch, use a different port: in PowerShell, `$env:PORT=4197; node server.mjs`.

The preview address is reserved for later testing. **No server or browser was started during this run.** Opening `index.html` directly with a `file:` URL is insufficient for ES modules; use the included server.

## Controls

| Control | Action |
|---|---|
| Mouse | Look around |
| WASD / arrow keys | Walk |
| Shift | Brisk walk |
| Escape | Pause / release the cursor |
| Enter | Resume |
| R | Reset to the entrance |
| Q | Cycle economy, balanced, and high resolution |
| F | Toggle measured frame intervals |

If pointer lock is refused, the scene falls back to dragging the mouse to look. The pause panel and bottom buttons also provide reset, quality, and measurement controls. Movement is grounded, with no jump or swim mechanic. The water, major rock masses, arch piers, room limits, tripod, and survey case have movement boundaries.

## Suggested inspection

Walk north from the entrance. Curve along the pool’s eastern bank beside the hemp handrail, then continue up the gentle stone incline through the arch. The survey landing rises approximately 0.94 m. Turn around to frame the pool chamber through the arch. Return along the bank, or continue around the dry southern and western sides for additional water views.

The cavern spans approximately 24 × 38 m across its connected rooms. The main vault rises roughly 11 m, the arch is about 6.6 m wide with a 4 m inner crown, and the eye height is 1.66 m. The water is roughly 0.6 m deep at its deepest visible basin. The main route peaks at a 22% incline, with smooth transitions and no steps to climb.

## Rendering approach

Continuous layered wall meshes and a vaulted roof establish the larger rock structure. Fluted calcite, rounded erosion, broad ledges, fallen stone, and quiet mineral texture add detail. The shoreline has darker, smoother wet rock. A narrow roof fracture admits daylight, while restrained warm and greenish bounce lights keep shaded areas readable.

The pool uses a single transparent surface with analytic ripple normals, a restrained reflected skylight cue, visible basin geometry, and a low-cost caustic layer. It has no reflection camera, screen-space reflection pass, or fluid simulation. Shadows are stationary and generated once. Loose stones are instanced, small props are batched by material, texture uploads and shader compilation are prepared before entry, and the default resolution is capped at 1.35 device pixels per CSS pixel.

The **Frame times** panel measures a rolling 10-second window of browser animation-frame intervals while exploration is active, reporting mean, median, 95th/99th percentile, maximum, draw calls, and triangles. These are measurements taken on the eventual tester’s device; no frame-rate claim is made here. `window.hollowDiagnostics` exposes read-only location, rendering counters, and recent frame intervals for later inspection.

## Checks and limitations

`npm run build` and `npm run check` passed. The static checks parse all six scene modules, sample 646 points on the inspection route, verify dry ground, standing clearance, collision rules, and the incline, and check connected dry paths to east, west, south, and north pool viewpoints and the landing. See `STATIC_CHECKS.txt` and `RUN_RECORD.json`.

**Interactive, visual, shader-on-GPU, browser compatibility, and performance checks were not run**, because this entry was made under an explicit no-browser, no-server, no-UI, no-GPU execution constraint. The supplied artifact is ready for those checks, but their results are unverified. The water reflection is an economical approximation, and collision uses authored analytic room and obstacle boundaries rather than arbitrary triangle collision. Desktop keyboard/mouse exploration is the supported control mode.

To rebuild after editing, run `npm install` followed by `npm run build`. The pinned dependency is Three.js 0.180.0, obtained from npm; the build contains its local modules and MIT license in `dist/vendor/`. No external assets or network requests are required while exploring.

Jordan assigns scores. This entry does not assign itself a score.
