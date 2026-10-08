# Captain's Private Quarters — explorable 3D scene

A compact starship captain's suite: a **bedroom** with a built-in bed, headboard wall unit and wardrobe, a connected **private study** with a command desk, and an **observation nook** with a deep-framed window onto a ringed ice giant, a distant sun and a star field. Built with three.js. Every texture is generated procedurally at startup, so there are no external assets or network requests.

## Launch

The build is a single static page with one classic script, so it runs straight from disk:

- **Simplest:** open `dist/index.html` in Chrome, Edge or Firefox (double-click it, or drag it into a browser window).
- **Suggested local server (optional, not started or verified in this session):**
  ```bash
  python -m http.server 8618 --directory dist
  ```
  Then browse to `http://localhost:8618/` (a suggested launch address, not a running preview).

Rebuild from source (optional): `npm install`, then `npm run build`. The source files are `src/main.js`, `src/builder.js` and `src/textures.js`.

## Controls

| Input | Action |
|---|---|
| Click the view | Capture the mouse for mouse-look (Esc releases it). Without capture you can drag to look. |
| W A S D / ↑ ↓ | Walk forward and back, strafe |
| Shift | Walk faster |
| Q / E or ← / → | Turn with the keyboard |
| C | Toggle crouch, for inspecting low fittings (bed drawers, nightstands, grille) |
| R | Reset to the entrance |
| 1 – 5 | Jump to a viewpoint: entrance, sleeping area, study desk, observation window, return view |
| [ / ] | Lower or raise exposure |
| F | Show frame time, FPS, render scale and draw calls |
| H | Hide or show the hint bar |

## Route

Entrance (sealed sliding door, south) → past the bed on your left and the wardrobe on your right → through the framed arch into the study → past the captain's desk, with bookshelves on the right → under the bulkhead into the observation nook → up to the window ledge and grab handles → turn round with key 5 or the mouse for the view back through the quarters → return to the entrance (or press R).

## What's in it

- **Construction:** the walls are separate painted-composite panels with real 7 mm gaps over a dark backing, plus a brushed-metal kick plate and chair rail. There are ceiling panel grids, structural ceiling ribs with chamfered knees, chamfered door and window corners, a threshold plate, ceiling vents and bolted bezels.
- **Materials:** painted composite (orange-peel normal map), brushed metal (anisotropic-looking streak maps with reflections), walnut wood grain, woven bedding and upholstery, a knitted throw, a leather-grain chair and ledge pad, a wool rug, fresnel double glazing with faint smudges, and dark display glass.
- **Bedroom:** a built-in platform bed with storage drawers and an amber night strip. It has a tufted headboard, nightstands with drawers, reading lamps, overhead cabinets with an under-light, and a reading shelf. Also: a wardrobe with an open lit niche (folded clothes, dress cap, keepsakes), a dress uniform on a hook rail, boots, slippers, a photo trio, an ocean-sunset painting with a picture light, and a comm panel.
- **Study (command context):** the desk faces the room so the captain sits facing visitors. On it are a pedestal with drawers, an inset dim work surface, a console strip with indicator lights, stacked data slates, colour-coded folders, a course chart, a stamp, a mug and a brass desk lamp. Behind the desk: a credenza with a duty-roster board of colour-coded cards, a recessed status display, a command insignia, a binder shelf, a bonsai, a ship model and a data-crystal tray. Visitor chair, bookshelves with a globe, a photo and a plant, and soffit downlights. Screens show abstract, unreadable graphics only.
- **Observation nook:** a 3.1 m × 1.45 m window with a deep reveal, three panes split by mullions, gaskets, double glazing, bolts and a shutter housing. A padded resting ledge sits over a grille apron with a cool toe-light. Also: a bench with cushions and a knitting basket, a side table with a chess game in progress and a teapot, a telescope aimed at the planet, and a corner plant.
- **Lighting:** warm downlights, lamps and strips in the bedroom and study; cool cove strips, a window spot and the planet view in the nook. There are 7 dynamic lights with no shadow maps, plus soft contact-shadow decals and additive light-wash cards near the strips.

## Performance design

- All interior geometry is baked into world space and merged per material: **41 meshes, about 69k triangles, 49 drawables in total** (counted by the Node smoke test).
- There is no post-processing, no shadow maps, no transmission/refraction passes and no per-frame allocations beyond trivial objects.
- Shaders are compiled before the first frame (`renderer.compile`) to avoid a first-look hitch.
- Render scale is capped at 1.25× device pixels. If frames average over 20 ms for 1.5 s, the scale steps down automatically (minimum 0.75×).
- Movement uses exponential velocity smoothing. Collision is circle-vs-box in the floor plane (24 boxes), with a hard clamp that keeps you inside the quarters.

## Checks performed (and not performed)

**Performed (CPU only, no browser and no GPU):**
- `esbuild` bundle builds without errors, and `node --check dist/app.js` passes.
- A Node smoke test (`npm run smoke`) runs the real scene construction with the WebGL renderer and canvas stubbed out. Every texture, geometry merge and material assignment completes, and 120 frame-loop iterations run without throwing. Walking along the full route (entrance → bedroom → arch → desk → nook → window → return view → entrance) with the player radius against all colliders finds no blocked segment.

**Not performed (by the rules of this run):** no browser, headless browser, screenshot, GPU or frame-rate measurement was run. Visual correctness, light balance, shader compilation on a real GPU and actual frame times are **unverified**.

## Known limitations

- Brightness and light balance were tuned by calculation, not by eye. If the scene reads too dark or too bright, use `[` / `]`.
- The custom GLSL shaders (glass, planet, atmosphere, rings, stars) have not been compiled on a GPU in this session.
- Dynamic lights have no shadow maps, so lights pass through walls inside their short range. Contact-shadow decals stand in for grounding.
- Collision is 2D (floor plane only). There are no stairs or jumping, and the eye height is fixed apart from crouching.
- The entrance door is decorative and sealed. The route returns through the quarters.
- Pointer lock needs a click on the view. Some browsers refuse it for file pages inside certain embedded viewers; drag-to-look still works then.

## Run record

- Model: Claude Opus 5.5 (`claude-opus-5-5`), reasoning effort setting: 40 (as configured for this session)
- First implementation action: 2026-10-07 18:49:55 EDT (-0400)
- Deadline (60 min): 2026-10-07 19:49:55 EDT (-0400)
- Actual stop (last edit): 2026-10-07 19:22 EDT (-0400), about 27.5 minutes before the deadline
- Interruptions: none
