# Witch's Cottage — explorable 3D scene (benchmark entry Claude16)

A three.js scene, built from scratch, of a compact cottage: a flagstone kitchen, an arched opening into a crowded
plank-floored workroom, and a glazed door into a small timber-framed greenhouse.

## Launch
The build is self-contained: no network access, no server, and no module loading at runtime.

* **Simplest:** open `dist/index.html` directly in Chrome, Edge or Firefox (double-click it, or drag it into the browser).
* **Optional local server.** This is a suggested address only and was not started during the build:
  `python -m http.server 5178 --directory dist`, then open http://localhost:5178/
* **Rebuild from source:** `npm install`, then `npm run build`. This regenerates `dist/scene.js` and copies `index.html`.

## Controls
| Input | Action |
|---|---|
| Click | Capture the mouse for mouse-look (Esc releases it). If pointer lock is unavailable, drag to look |
| W A S D / ↑ ↓ | Walk (Shift to hurry) |
| ← → | Turn without the mouse |
| R | Reset to the entrance |
| 1–6 | Viewpoints: entrance, kitchen work surface, workbench, workroom shelves, greenhouse, return view |
| F | Frame-time readout (fps, average ms, p99 ms, draw calls, triangles) |
| P | Cycle render scale (1.0 / min(DPR, 1.5) [default] / min(DPR, 2)) |
| [ / ] | Exposure down / up |
| H | Hide or show the key hints |

## Route
Entrance door (west) → kitchen work surface (north wall: butcher-block counter, butler sink, chopped carrots and knife,
dough under a cloth, recipe book) → arched opening → workbench (open grimoire, hovering quill, brass scales,
mortar, alembic, a softly glowing orb) → bookcase and wall shelves → glazed door → greenhouse (staging benches,
about 40 potted plants of 11 types, hanging baskets, a vine, and a luminous "lantern plant" at the end of the path)
→ look back through the glazing to the warm workroom and kitchen → return through the open doorways.

## Technical notes
* All geometry and textures are generated procedurally at load time: canvas textures for aged wood, floor planks,
  limewash plaster, worn flagstones, rubble stone, brick, terracotta, glazed ceramic, slate, gravel, soil, fabric and
  glass grime.
* Static props are merged per material, which gives about 25 draw calls and about 120k triangles for the whole scene.
* One shadowed directional light supplies the cool overcast daylight. Its shadow map is rendered once, because the
  scene is static. The rest of the lighting is a hemisphere light, six warm or magical point lights without shadows,
  and additive halos drawn as Points.
* Shaders are precompiled with `compileAsync` behind the loading screen.
* Collision uses 2D boxes for walls and furniture with a 0.22 m player radius, sub-stepped movement and flat floors.
  The player cannot fall.

## Known limitations
* **Not checked visually.** Per the run rules, no browser, GPU, screenshot or benchmark was run. Lighting balance,
  material appearance and frame rate have not been verified on screen. Use `[`/`]` to adjust exposure if needed.
* Leaves are flat-shaded strip geometry, not alpha-textured cards. Plants are stylised up close.
* Glass is simple alpha-blended (no refraction). The bottles share one merged transparent mesh, so blend order inside
  it is fixed.
* The outside garden is a backdrop only. The entrance door and the greenhouse end are closed.
* Shadows are static and point lights cast no shadows, so warm light can reach some surfaces that would be occluded.
