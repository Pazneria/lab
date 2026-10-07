# The Pathwarden's Rooms

An explorable first-person 3D scene (three.js r169, WebGL2). These are the private rooms of
**Ilse Varrow**, a mountain guide and route-cartographer who leads caravans over the Thornreach passes.

The rooms carry the same few motifs throughout:
- **Passes:** a feather and a pebble from every crossing (feather jar at the bed, pebble cairns, feathers pinned on the board and the map, one tucked in her hat band).
- **Knitting:** indigo, rust and ochre knitwear, a basket with yarn and a half-finished piece, slippers, scarves, a blanket roll.
- **Tea:** chipped blue mugs at the bedside, on the tea table and on the desk, plus a tea-ring stain drawn on the map.
- **Her mentor's brass compass:** it weighs down the working map. A compass rose is also carved into the headboard.
- **Guiding gear:** an ice axe and rope on the wall, well-worn boots, snowshoes, a walking-staff barrel and a caravan bell.

## Layout (route)
- **Bedroom (centre):** entrance door with coat pegs, cloak, satchel and boots. The bed against the north wall is the focal point, with a patchwork quilt, a woven pass-map tapestry above and low sun coming in from the east window. Also: two bedsides, a trunk at the foot of the bed, and a reading corner with an armchair, knitting basket, tea table and keepsake shelf.
- **Walk-in wardrobe (west, through the doorway left of the bed):** a hanging rail of coats, cloaks, tunics, shirts and trousers on hangers, folded stacks on open shelving, a dresser with a mirror, a boot bench with snowshoes and a ceiling lantern. The walkway inside is about 1.1 m wide.
- **Map study (east, up a step past the bed):** a trestle desk with a route map, pins and string, the compass, dividers, a lens, an open journal, ink and a lantern. Around it: a pinboard, a bookshelf, map cubbies with rolled charts, and a ladder-back chair.

## Launch
No server is required. The build is one classic script (`dist/bundle.js`) and every texture is generated procedurally at load, so nothing is fetched.

1. Open `index.html` directly in a desktop browser (Chrome, Edge or Firefox), e.g. by double-clicking it.
2. Click **Click to explore**. The pointer is captured; press Esc to release it.

If you prefer serving it: run `npx http-server -p 8715 .` (or `python -m http.server 8715`) in this folder and open the
*suggested* address `http://localhost:8715/`. This server was **not** started or verified during the build session.

Rebuild after editing the source: `npm install` then `npm run build` (esbuild).

## Controls
| Input | Action |
|---|---|
| Mouse | Look (pointer lock; click-drag also works if pointer lock is unavailable) |
| W A S D / ↑ ↓ | Walk; **Shift** walks faster; ← → turn |
| C | Crouch / stand (for bedside and shelf details) |
| R | Reset to the entrance |
| 1 2 3 4 5 | Viewpoints: entrance, bedside, inside the wardrobe, map desk, look-back from the study |
| F | Frame-time overlay (fps, avg / p95 / worst ms, draw calls, triangles, pixel ratio) |
| H | Hide/show the hint line |
| [ ] | Exposure down / up |

## Technical notes
- About 200k triangles in roughly 54 draw calls. All static geometry is pre-transformed, tinted with vertex colours, and merged per material per room, so frustum culling still drops whole rooms.
- The sun is a directional light with a 2048 PCF-soft shadow map. The map is rendered **once**, because nothing in the scene moves.
- Four practical point lights have no shadows: the bedside oil lamp, the desk lantern, the wardrobe lantern and a floor-bounce fill. There is also a hemisphere fill and low-intensity room IBL.
- Every shader is compiled before the first frame to avoid hitches the first time a room comes into view.
- The cloth is real geometry: garments are deformed tubes with folds and a flared hem, the quilt drapes over the mattress edge, and the pillows are shaped and dented.
- The procedural textures include plank flooring, wood grain, lime plaster, a woven fabric weave, knit stitches, leather, a patchwork quilt, a parchment map, note sheets, a tapestry, a rug with fringe, feathers and a mountain sky backdrop. Each comes with a normal map where it matters.
- Sun shafts are additive light volumes, plus about 300 drifting dust motes.
- If frames stay slow (average above 24 ms for 2 s), the pixel ratio steps down automatically (start: min(devicePixelRatio, 1.5); floor: 0.75).
- Collision: the player is a 0.24 m radius circle against axis-aligned wall and furniture boxes. The floor height follows the study step (0 → 0.17 → 0.34 m) with smoothing.

## Checks performed (CPU-only)
- `node tools/check-geometry.mjs`: builds and merges the whole scene in Node. Result: 54 merged meshes, ~200k triangles, 31 colliders, 2 sun windows, no non-finite vertices, every material used.
- `node tools/check-textures.mjs`: runs every texture generator against a stub canvas. Result: 24 textures, no exceptions, ~0.7 s.
- `npm run build`: esbuild bundles without errors.

## Not performed (by the rules of this run)
- No browser, headless browser, screenshot, GPU, interactive or performance test, and no server.
- Visual correctness, lighting balance, collision feel and frame rates are **unverified**. No frame-rate claims are made.

## Known limitations
- Never seen rendered. Exposure or light balance may need the `[ ]` keys, and small prop intersections or misplacements are possible.
- The mirror reflects only the generic environment map, not the room itself.
- Shadows exist only for the sun. The practical lights cast none, so contact darkening comes from vertex AO and blob decals.
- Garment tubes may show a faint shading seam at the back. The cloth is static (no simulation).
- The entrance door is closed and the rooms are sealed; there is nothing outside to explore.

## Run record
- Model: Claude Opus 5.5 (`claude-opus-5-5`), harness reasoning-effort setting 40. No subagents or other models were used.
- First implementation action: 2026-10-07 16:44:21 EDT (UTC-0400)
- One-hour deadline: 2026-10-07 17:44:21 EDT (UTC-0400)
- Actual stop (last edit): 2026-10-07 17:14:14 EDT (UTC-0400)
- Interruptions: none from the user. One of my own commands hung (a stray `cat` waiting on stdin) for about 60 s and was stopped. The deadline was not reset or extended.
- Processes: no server, watcher, browser or test process was started; the hung command was terminated. A pre-existing unrelated `node server.mjs 8743` process (started Oct 6, not from this entry) was left untouched.
