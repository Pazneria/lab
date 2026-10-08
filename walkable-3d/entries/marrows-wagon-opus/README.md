# Marrow's Wagon: a traveling merchant's tiny home

This is a standalone, explorable 3D browser scene built with three.js r186. The prebuilt bundle is in `dist/app.js`. The scene has three spaces:

1. **Tiny-home living area** (door end). You climb two ordinary steps (0.20 m rise, 0.30 m going) onto a covered porch at floor height (0.60 m).
2. **Storage/work area and shopfront.** This is one continuous space: an interior workbench, and a side hatch that folds open into the shopfront.
3. **A small camp** beside the wagon, with a fire ring, a log bench, a stool, a crate table, a firewood stack, a water barrel and a harness post.

## Launch

The build is a single classic script (an IIFE bundle). It makes no network requests and has no module or CORS requirements.

- **Simplest:** open `index.html` directly in Chrome, Edge or Firefox by double-clicking it (`file://`).
- **Or serve it statically** from this folder. Suggested launch address only; nothing was started during this build:
  ```bash
  npx http-server -p 8745 -c-1
  ```
  then browse to `http://localhost:8745/` (suggested address, not a running preview).
- **Rebuild from source** (optional):
  ```bash
  npm install
  npx esbuild src/main.js --bundle --format=iife --minify --target=es2020 --outfile=dist/app.js
  ```

## Controls

| Input | Action |
|---|---|
| Click "Click to explore" | Capture the mouse (pointer lock). Esc releases it and shows the menu. |
| Mouse | Look |
| W A S D / Arrow keys | Walk (1.7 m/s) |
| Shift | Walk faster (3.4 m/s) |
| Q / E | Turn without the mouse |
| R | Reset to the starting spot in the camp |
| F | Toggle the on-screen frame-time readout (average/worst ms, fps, draw calls, triangles) |
| P | Cycle the render-scale cap (1.5 → 1.0 → 0.75) |
| "Drag-to-look mode" button | Fallback if pointer lock is unavailable: hold the mouse button and drag to look |

**Suggested route:** start in the camp. Go round the fire to the steps at the back of the wagon (the +X end, with the door standing open). Go up onto the porch, then inside the living area. Go through the curtained arch to the storage/work area. Then go back out and down the steps, walk round to the front of the striped awning, and stand at the counter to look back into the wagon.

## What's in it

- **Living area:** a box-bed with three drawers underneath, a patchwork quilt and bolster, and a sleeping ginger cat. There is a book shelf over the bed with a brass retaining rail. Other fittings:
  - a cast-iron stove on a tiled hearth with a heat shield and a flue through the roof
  - nested copper pans on a rail
  - a fold-down wall table with a swing-out gate leg, plus a folding stool tucked under it
  - a spare folding stool, folded flat and strapped to the pantry side
  - a plate rack where the plates ride on edge behind a rail, and cup hooks
  - a pantry with cubbies and jars held in by rails
  - coat hooks with a satchel and hat, a rug, and herbs drying overhead
- **Personal corner:** a writing ledge on a bracket with letters, an ink pot and quill, a candle, a framed painting, a round mirror, a keepsake box, and dried flowers hanging upside down.
- **Storage/work area:**
  - a 6×4 apothecary drawer bank with labels and brass pulls (two drawers pulled open with contents)
  - open shelves with brass retaining rails and dividers, holding instanced jars and bottles, bolts of cloth, tins and coiled rope
  - a workbench under the hatch with a vise, a lantern being mended, a leather tool roll, an oil can, a magnifier and a brass balance scale
  - under-bench storage: a tool chest, baskets and tin sheet
  - a tool wall with a hand saw and a leather apron
  - strapped crates, a barrel and a loft shelf with trunks
  - a floor trapdoor for under-floor storage with a ring pull
  - a ceiling rail of hanging goods
- **Shopfront:**
  - The lower flap folds down into a counter with scrubbed boards on top. Two chains run to the head of the opening, and two folding knee braces sit under it, with strap hinges.
  - The upper shutter swings up as an awning. It is held by iron stays, and its painted underside has a sunburst and the trades it offers.
  - A striped canvas extension sags slightly to two poles, which are held by guy ropes and pegs. A scalloped valance and a signboard ("Marrow's – Tinker & Sundries") hang from it.
  - A side curtain on the sun side keeps the counter in shade.
  - A lantern and a few wares hang from a rail. There are wares on the counter, a chalk price slate, and a crate stand with baskets and rolled rugs.
- **Wagon body:**
  - painted and worn timber panels with gold lining, red framing and corner posts
  - an arched roof of canvas over boards, with battens, and painted bows inside
  - a fascia with a scalloped drip and eave brackets, and arched gables with battens and a sunburst
  - spoked wheels with iron tyres, axles, leaf springs, and shafts resting on the ground
  - open blue shutters, a window box with flowers, roof cargo strapped down with leather inside a brass gallery rail, a chimney with a cap and drifting smoke, and a hanging bucket
- **Lighting:**
  - A single low, warm sun (about 17° elevation) rakes across the door end and the shopfront side. Its shadow map is rendered once (the scene is static), using a 4096² map.
  - Sky gradient image-based lighting (IBL) comes from a one-off PMREM bake, plus a hemisphere fill.
  - Three warm lanterns (living area, work area, awning) and a flickering campfire are point lights without shadows.
  - Low sun comes in through the open door, with dust motes in the beam.

## Performance design

- All static geometry is merged into one mesh per material (38 meshes in total). Per-part colour is carried in vertex colours, and all textures are procedural canvas textures generated at load. Nothing is fetched.
- Repeated wares (jars, corks, bottles, fire stones), grass tufts, flowers and pebbles are drawn with `InstancedMesh`.
- About 92k triangles in total, as counted by the CPU-only smoke test.
- The sun shadow map is rendered once (`shadowMap.autoUpdate = false`). Per frame, only the camera, flame and lantern/fire intensities, smoke sprites and dust are updated.
- Shaders are precompiled with `renderer.compile` before the first frame, to avoid a hitch the first time something comes into view.
- The pixel ratio is capped at 1.5 by default. Press P to lower it.

## Collision and scale

- The player is a 0.24 m-radius, 1.75 m-tall cylinder with the eye at 1.60 m. It can step up 0.27 m, and the eye height is smoothed on steps. There is gravity when walking off a step.
- Colliders are axis-aligned boxes for the walls (with the door gap), furniture, steps, porch, wheels, counter, awning poles and side curtain, and the camp props. Walking stops at a 12 m radius round the camp.
- Interior headroom is about 1.95 m at the walls and about 2.45 m at the roof centre. The doorway is 0.84 m wide and about 1.85 m clear.

## Checks actually performed

- `esbuild` bundling, which also checks syntax: succeeded.
- **CPU-only Node smoke test** (scratch script, with DOM/WebGL calls stubbed out). It ran the real scene-construction code (scene built, 38 meshes, about 92k triangles, 43 colliders) and the real `update()`/collision code. Holding W at 60 Hz, it walked the full inspection route: camp → round the fire → foot of the steps → tread 1 (feet 0.20) → tread 2 (0.40) → porch (0.60) → through the door → living area → through the arch → work bench → front end → back out → down to the ground (0.00) → front of the awning → the counter. Every waypoint was reached.
- In the same test, walking into the side curtain from the side and walking through the counter were both blocked, as intended.

## Not performed (per the run's conditions)

No browser, GPU or headless rendering, screenshots or servers were used. Visual appearance, lighting balance, shadow quality and frame rate have **not** been checked. Frame-time figures are only available through the in-scene F readout during later judging.

## Known limitations

- It was built without any visual check, so there may be small placement issues (props touching or floating by a few millimetres, minor z-fighting on thin decorations).
- Collision uses axis-aligned boxes, so curved or thin items (chains, guy ropes, hanging wares above head height) have no colliders. The angled open door's collider is approximate.
- All mechanisms are static in their open positions, as allowed. There are no interactions.
- Point lights do not cast shadows: only the sun does.
- Glass is shown as opaque glossy jars/bottles plus faint transparent window panes. There is no refraction.

## Run record

- Model: Claude Opus 5.5 (`claude-opus-5-5`); effort setting: reasoning effort 40 (as configured by the harness)
- First implementation action: 2026-10-07 18:52:32 −04:00
- Deadline (60 min): 2026-10-07 19:52:32 −04:00
- Stop timestamp (last edit): 2026-10-07 19:20:14 −04:00, about 28 minutes after starting and well before the deadline.
- Interruptions: none.
- No servers, watchers, browsers or background processes were started. The only commands run were `npm install`, `esbuild` and the Node smoke test, and each ran to completion.
