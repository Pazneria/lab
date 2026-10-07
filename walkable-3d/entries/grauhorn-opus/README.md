# Grauhorn Bergstation — rainy cable-car station (benchmark entry)

An explorable first-person Three.js scene: an enclosed terminal hall with the haul-rope wheel and drive train, a connected loading platform with one stationary cabin, and a short covered timber lookout facing a misty mountain backdrop.

## Launch

From this folder, start any static file server. The `three` dependency is already in `node_modules`, so no network access is needed.

```bash
python -m http.server 5287 --bind 127.0.0.1
```

Then open **http://127.0.0.1:5287/** in a desktop browser with WebGL2 (Chrome, Edge or Firefox).

If `node_modules` is missing, run `npm install` once first (it installs three@0.169.0).

## Controls

| Input | Action |
|---|---|
| Click | Capture the mouse for mouse-look. If pointer lock is unavailable, drag with the mouse to look |
| W A S D / arrow keys | Walk |
| Shift | Walk faster |
| R | Reset to the entrance |
| 1 – 5 | Jump to a viewpoint: entrance · wheel · platform by the cabin · lookout · return view toward the terminal |
| F | Show or hide the frame-time overlay (average, p99 and max frame time, draw calls) |
| Q | Toggle render resolution between high (DPR up to 1.25, about 2.3 MP max, adaptive) and performance (about 1.0 MP max) |
| H / Esc | Show the help panel / release the mouse |

## Suggested route

Start at the entrance, just inside the doors. The wheel is on the left, and the red cabin is visible beyond it.

1. Walk through a turnstile lane and follow the yellow equipment railing past the wheel, its A-frames, the brake, the gearbox and motor, the counterweight cage, and the track-rope anchor drums.
2. Go through the platform door under the "GRAUHORN · BERGSTATION" sign.
3. Walk along the platform edge beside the cabin. The boarding gate is closed.
4. Continue out to the covered lookout at the north end.
5. Turn back for the return view of the terminal.

## What is in the scene

- **Wheel and cable equipment.** A 5 m spoked haul-rope wheel with:
  - a rope groove and liner, a double plane of I-beam spokes, a hub with bolt circles, and an axle;
  - pillow-block bearings on two I-beam A-frames standing on a concrete plinth;
  - a brake disc and caliper, a coupling, a ribbed gearbox and a finned motor on a concrete pier;
  - a counterweight hanging in a guide cage over a pit, with track-rope anchor drums and rope turns;
  - two saddle portals with guide sheaves, plus a control cabinet, cable trays and a maintenance corner.

  The ropes run continuously from the wheel and the anchors, through the station, past the carriage, and out over a lattice tower that fades into the mist.
- **Cabin.** It has:
  - a red-and-cream body with corner posts, mullions and rain-marked glazing;
  - closed sliding doors on the platform side, with windows, handles, a seal, a track and a threshold;
  - a lettered frieze, a roof with gutters and a maintenance rail, and marker lights;
  - an interior with benches, poles, grab rails, an operator console and a warm light strip;
  - a roof yoke, a two-arm hanger, a pivot, and a carriage with 8 track rollers on two track ropes and haul-rope sockets.
- **Materials.** All textures are generated procedurally at load time, with Sobel-derived normal maps. They include:
  - wet and dry concrete with puddle roughness, worn paths, cracks and joints;
  - board-marked concrete walls with rain streaks;
  - dry and wet timber planking and glulam beams;
  - painted steel with grime and rust streaks, galvanised steel and bare steel;
  - stranded rope, tactile paving, hazard stripes and chain-link infill;
  - glass with droplets and trails, which keeps its reflections at grazing angles.
- **Lighting and atmosphere.**
  - Overcast image-based lighting from a generated sky.
  - A cool key light with a shadow map that is computed once, because the scene is static.
  - Five warm or neutral interior lights: hall pendants, a high-bay over the machinery, platform pendants, the cabin interior and the lookout lamp.
  - Exponential fog, GPU-animated rain streaks that stay out of the roofed areas, drips falling from every eave, and drifting low cloud layers in the valley.
  - A painted mountain panorama in front of a sky dome.
- **Exploration.** Collision is 2D (the walker's footprint only). It keeps you within the walkable floors and blocks you at:
  - the walls, railings and platform edge;
  - the turnstiles, benches, control room, lookout posts, binocular viewer and orientation table.

  Every floor is at one level, so you cannot fall through.

## Performance notes

- Static geometry is merged by material into about 45 draw calls. Rocks and trees are instanced. The rain and drips are two line-segment draws animated in the vertex shader.
- The shadow map is rendered once, not every frame.
- Render size is capped at about 2.3 megapixels in high mode, and Q switches to performance mode at about 1.0 megapixel.
- Adaptive safeguard: if the average over the last ~2 seconds stays above 22 ms (below about 45 fps), the build steps the resolution down. It goes from 2.3 MP to 1.65 MP and then to 1.15 MP, and it never steps back up, so it cannot oscillate. The F overlay shows the current level (L0, L1 or L2) and the canvas size.
- Measured on the build machine, in the Claude desktop browser pane at a 1600×900 drawing buffer with MSAA. Each figure is synchronous: 30 renders, with `readPixels` forcing GPU completion.
  - Quiet runs: **3.0–6.6 ms per frame** across the five viewpoints. The lookout was cheapest at about 3 ms, and the entrance and wheel views were the most expensive.
  - Later runs: 4–10 ms per frame. Some outliers reached up to about 24 ms while the machine was busy, and A/B tests with normal maps on and off showed no consistent difference.
  - These are synchronous figures, not live rAF frame times. The Browser pane was hidden during testing, so rAF did not run. Use the F overlay for live frame times.

## Known limitations

- The cabin cannot be entered. The boarding gate is closed, and the platform edge collides.
- Rope topology is stylised. The haul rope wraps a quarter of the wheel to a hanging tension weight rather than forming a full engineered loop.
- The mountain backdrop is a painted panorama cylinder that follows the camera, so it has no parallax. The near terrain, rocks, tower and trees are real geometry.
- There are no puddle mirror reflections. Wetness comes from roughness, normal and IBL variation.
- Collision is footprint-only. There are no stairs or level changes, and you cannot jump or crouch.
- Pointer lock needs a normal top-level browser tab. In embedded frames, use drag-to-look.

## Build record

- Model: Claude Opus 5.5 (`claude-opus-5-5`) in Claude Code (desktop app). The effort setting was the session default; no named effort level was exposed to the model.
- Session and timer start: 2026-10-07 01:04:44 EDT. The first implementation file was written at about 01:15 EDT.
- One-hour deadline: 2026-10-07 02:04:44 EDT.
- Actual stop timestamp: see the final report. Editing stopped before the deadline.
- Libraries: three@0.169.0 from npm only. There are no external assets, and every texture is generated in code.
- Port: 5287 (localhost).
