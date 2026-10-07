# The Clay Yard Workshop

An explorable 3D ceramics workshop (Three.js r170, WebGL2). It has three connected spaces: a pottery studio, a sheltered glazing area and a sunlit kiln courtyard.

## Launch

From this folder:

```
python -m http.server 8437 --bind 127.0.0.1
```

Then open http://127.0.0.1:8437/ in a browser. You can also run `start.bat`.

There is no build step. `three` is installed in `node_modules` by npm and loaded through an import map. A web server is required, because ES modules do not load from `file://`.

## Controls

| Input | Action |
|---|---|
| Click | Capture the mouse (pointer lock). If pointer lock is unavailable, drag with the mouse instead. |
| Mouse | Look around |
| W A S D / Up and Down arrows | Walk |
| Left and Right arrows | Turn |
| Shift | Walk faster |
| C (hold) | Crouch, for inspecting low shelves |
| R | Reset to the entrance |
| 1 to 5 | Jump to a viewpoint: entrance, workbench, pottery shelves, glazing bench, kiln |
| F | Show or hide the frame-time readout (fps, average and worst ms, draw calls, triangles) |
| Q | Switch render resolution between quality (up to 1.5x DPR) and speed (0.75x) |
| Esc | Release the mouse and show the help panel |

## What is in the scene

- **Studio.** A central timber workbench with a dusty, slip-ringed top. It holds work at every stage: wedged clay, a rolled slab with guide sticks and rolling pin, wet freshly thrown pieces on bats, a leather-hard bowl upside down on a banding wheel with trimmings, a mug waiting for its handle, bone-dry and bisque pieces, and finished glazed pieces. Tools include ribs, a sponge, a needle tool, a wire cutter, loop tools in a tin and a slop bowl.
  - Three tall shelf units of finished glazed ware run along the west wall. Bisque and greenware shelves sit on the north wall.
  - Also in the studio: a canvas wedging table, stacked clay bags, a potter's wheel with a stool and a wet vase, and a ware-board drying rack.
- **Glazing shelter.** A lean-to with a corrugated roof, open to the courtyard. It has a zinc-topped prep bench with a scale, a sieve, a jug, freshly dipped (chalky, unfired) pots and a banding wheel. Wall shelves hold jars of raw materials. There are glaze buckets (some open), dipping tongs, a recipe sheet, a test-tile board with about 100 tiles, a spray booth and sacks of material.
- **Kiln courtyard.** A brick-paved yard around a catenary-style arched brick kiln:
  - The kiln has a steel angle-iron frame, buckstays and tie rods with nuts.
  - The door stands open on its hinges, with a firebrick lining. Inside, kiln shelves and posts are loaded with ware.
  - Fittings: spy-hole plugs, gas burners with valves and manifold, a hose to the gas cylinders, a pyrometer and thermocouple, and soot staining.
  - A tall banded chimney carries a damper.
  - Around the yard: kiln furniture on a pallet, a ware cart loaded for firing, a wood stack under a lean-to, glazed planters, a water butt, a bench and a crate of seconds.
- **Pottery.** Every vessel is generated individually, around 400 pieces:
  - Lathe profiles with real wall thickness, foot rings and several rim types (rounded, rolled, flared, cut, wavy).
  - Uneven walls, lean and ovality, throwing rings, and series of similar pots that still differ from each other.
  - Glaze lines with drips and pooling, rim breaks, double dips and liner glazes. Raw clay feet show below the glaze.
  - Speckled clays, wet, leather-hard and bone-dry clay, bisque, and unfired glaze.

## Performance notes

- All static geometry is merged by material.
- The vertex-coloured ceramics and props are split into about 14 spatial chunks so that frustum culling works. A typical view uses 15 to 30 draw calls.
- Shadow maps are static: the sun uses a 4096 map, and two interior spot lights use 1024 maps. All of them are rendered once, so the per-frame cost is shading only. Lighting is one sun, a hemisphere light, two spot lights and three point fills.
- All textures are procedural canvases generated at load. There are no network assets.
- At load, every texture is uploaded and every shader compiled, and each viewpoint is pre-rendered once. This avoids hitches the first time you turn toward a new area.
- In-browser measurement on the development machine at 1280×720 and DPR 1: 40 to 60 renders forced to finish with `readPixels`, after GPU warm-up.

  | Viewpoint | Time per frame |
  |---|---|
  | Dense pottery shelves | 4.8 to 5.2 ms |
  | Entrance | 5.1 to 5.2 ms |
  | Workbench | 4.6 ms |
  | Glazing area | 3.8 to 4.0 ms |
  | Kiln | 3.3 to 3.4 ms |
  | Courtyard return view | 3.8 to 4.0 ms |

  Views draw 14 to 33 draw calls and up to about 560k triangles.

  The scene totals about 600k triangles. The very first measurement after an idle period was 2 to 3 times higher, which suggests GPU clock ramp-up, so treat these figures as indicative.
- The F key shows live fps, average and worst frame time. The Q key halves the resolution for weak GPUs or very large or high-DPI windows.

## Known limitations

- There is no physical glass refraction, no real-time GI or SSAO. The interior uses hemisphere plus point and spot fill lights, so corners are not occluded.
- Collision is 2D, with boxes on the floor plane. The floor is flat everywhere: no stairs, no jumping. Small props on benches are not individually collidable.
- The entrance doors stand open, but the exterior beyond the threshold is view-only.
- Trees beyond the walls are simple low-poly backdrops.
- The first load spends roughly 1 to 2 s generating textures and geometry.

## Build record

- Model: Claude Opus 5.5 (`claude-opus-5-5`) in Claude Code (desktop). The session effort setting was not exposed to me.
- Session start: 2026-10-07 01:05:37 -04:00. First implementation file written at about 01:15.
- One-hour deadline: 02:05:37 -04:00.
- No subagents or other models were used. The only dependency is three@0.170.0 from npm. All assets are procedural.
