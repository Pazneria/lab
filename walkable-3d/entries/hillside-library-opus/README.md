# The Hillside Library: explorable 3D entry

A small hillside library built as a real-time 3D scene with three.js. It has a tall central reading room (10.5 m ceiling), an L-shaped upper gallery at 4.2 m, a broad 2.8 m staircase with a landing, and a window-side reading alcove. Late-day sun comes in through the tall west windows.

## Launch

```bash
npm install
npm run dev        # http://127.0.0.1:5287
```

To run the production build instead (stop the dev server first, because both use port 5287):

```bash
npm run build
npm run preview    # http://127.0.0.1:5287
```

The built output is in `dist/`. It is a static site that any static server can host.

## Controls

| Input | Action |
|---|---|
| Click | Enter / capture the mouse (Esc releases it; click-drag also works as a fallback) |
| Mouse | Look |
| W A S D / arrow keys | Walk |
| Shift | Walk faster |
| C | Crouch on/off (for the low shelves) |
| 1â€“5 | Viewpoints: hearth entrance, lower stacks, alcove, stair foot, gallery overlook |
| R | Reset to the entrance view |
| F | Frame-time overlay (fps, average ms, p99 ms, draw calls, triangles, position) |
| P | Change render scale (100 % â†’ 75 % â†’ 60 % â†’ back) |
| H | Hide the hint bar |

## What's in the scene

- **Lower shelves:** wall cases run 3.45 m high on the north, west and east walls. Two double-sided freestanding stacks run eastâ€“west, so the late light falls down the aisles. Cases also stand between the windows, on either side of the fireplace, and under the alcove's side windows.
- **Books:** about 9,800 books, all in one instanced draw call. Shelves are filled procedurally with matching sets, mixed runs, leaning books, flat stacks, gaps, iron bookends and small objects. Shelf heights vary from case to case and bay to bay. There are 8 spine styles (gilt bands, raised bands, labels, paperback-style), sun-faded colours, and cream page edges.
- **Materials:** all textures are generated procedurally at load:
  - walnut shelving, honey-oak trim and stair treads, dark-stained structure
  - plank floor with staggered joints
  - painted ivory plaster, plus sage plaster in the alcove
  - worn oxblood and tan leather with creases and rubbed patches
  - stone fireplace, faded rug, dark iron and brass fittings
- **Furniture and objects:**
  - leather Chesterfield sofa and wingback armchairs (tufted)
  - a long reading table with green banker lamps
  - a fireplace with a flickering fire, plus clock, candlesticks and a painting on the mantel
  - a globe on a stand, a card catalogue with brass pulls, and library ladders on iron rails at both levels
  - iron ring chandeliers, a gallery writing desk and an overlook armchair
  - paintings, teacups and plants
- **Light:** a low warm sun throws a static shadow map (4096Â²), so the window mullion patterns land on the floor, stacks, stair and alcove. Additive light shafts and drifting dust follow the sun direction. Five warm lamps light the shaded corners: table, fireplace, alcove floor lamp, nook pendant and gallery desk. A soft warm bounce light and a sky/ground hemisphere light keep the gallery readable.
- **Hillside backdrop:** the land outside falls away into a hazy valley with trees and distant ridges under a sunset sky.
- **Movement and collision:** you collide with walls, cases, furniture, railings and the stair balustrade. Steps are 0.175 m high with 0.30 m treads, and the climb is smoothed. You can't walk off the gallery or stair edges, and there is a fall-safety reset.

## Performance notes

- All static architecture and furniture is merged into one mesh per material (about 30 draw calls in total). The books are a single `InstancedMesh` using a Lambert material, with the hidden fore-edge faces removed.
- The shadow map is rendered **once**, because the scene is static. The camera height is smoothed on stairs.
- All shaders are compiled and all textures uploaded before the first frame, so turning toward a new area doesn't cause a first-use stall.
- Pixel ratio is capped at 1.0 with MSAA. If frames stay above 26 ms for 2 s, the render scale drops automatically, at most two steps.
- **Measured on this machine** (Intel integrated graphics, ANGLE/D3D11, 1920Ã—1080, scale 100 %). These are synchronous GPU benchmarks per view; the numbers are noisy because the preview pane was hidden:
  - toward the windows: ~12 ms
  - between the stacks: ~16â€“21 ms
  - looking down from the gallery: ~15â€“21 ms
  - entrance view and stair: ~18â€“24 ms

  A discrete GPU should be well under 16 ms.

## Known limitations

- The windows have no glass panes (this was deliberate, to avoid overdraw). The light shafts and dust are stylised.
- Point lamps don't cast shadows, so lamp light can bleed slightly through shelving.
- The outdoor hillside is an unlit backdrop with simple cone trees. It is meant to be seen through the windows, not explored.
- The text on book spines is abstract gilt marks, not readable titles (as allowed by the brief).
- Frame-rate numbers were taken with the preview pane hidden. Real windowed numbers will vary with display resolution and GPU.

## Benchmark record

- Model: Claude Opus 5.5 (`claude-opus-5-5`), Claude Code desktop, effort: default session setting (not changed).
- Session start: 2026-10-06 19:57:41 âˆ’04:00. First implementation file written: about 20:05.
- One-hour deadline: 20:57:41 âˆ’04:00.
- Stop timestamp (last edit): 2026-10-06 20:30:15 -04:00.
- Interruptions: none.
- Libraries: three@0.170.0 and vite@5 from npm. No external assets were used; everything is procedural.
- Port: 5287 (dev / preview).
