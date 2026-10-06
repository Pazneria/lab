# Limestone Cavern — explorable 3D scene

A walkable limestone cave: an entrance recess with a daylight crawl, a domed pool chamber lit by a narrow skylight, a broad natural arch, and a raised landing reached by a stepped ramp.

## Launch

```bash
cd opus-limestone-cavern-entry
python -m http.server 5187 --bind 127.0.0.1
```

Then open http://127.0.0.1:5187/ and click the panel to start. `three` (0.170.0) is installed locally in `node_modules`, so the page does not need the network. If `node_modules` is missing, run `npm install` first.

## Controls

| Input | Action |
|---|---|
| Click | Capture the mouse (Esc releases it) |
| Mouse / arrow keys | Look |
| W A S D | Walk (2.1 m/s) |
| Shift | Walk faster (4.2 m/s) |
| F | Toggle a dim headlamp (off by default) |
| R | Reset to the entrance recess |
| 1–6 | Viewpoints: recess, west shore, north shore (sunlit), south shore, beneath the arch looking back, landing looking back |
| H | Toggle the HUD (fps, average / p95 / max frame time, position, triangles, draw calls) |

## How it is built

- **Rock:** a signed-distance field is sampled on a 0.2 m grid (about 2.1M samples, built in about 1.2 s) and meshed with surface nets into one mesh of about 140k triangles. The field has:
  - ellipsoid chambers and tapered tunnels, joined with smooth unions
  - layered low-frequency erosion noise
  - tilted bedding planes that make recessed soft beds and protruding ledges
  - a floor heightfield with the pool basin and ramp steps
  - formations: a column, stalagmites (one rising from the pool), large stalactites, flowstone drapes and two rock shelves
- **Materials:** vertex albedo covers strata tint bands, iron streaks, a sediment floor, a mud line, white calcite on formations, and a wetness mask. Wet rock is darker and glossier, near the pool, under the skylight drips and on flowstone. Triplanar detail uses one procedural normal-and-height texture at two scales.
- **Lighting:**
  - Baked per vertex: ambient occlusion from the distance field, plus soft-shadowed bounce light from four sources (skylight opening, warm floor bounce from the sun patch, the daylight crawl, an abandoned work lamp on the landing).
  - Real time: one sun spotlight down the shaft. Its shadow map is rendered once, since the scene is static, and the opening shapes the sun patch.
  - Also present: a faint light-shaft volume, dust motes, and caustics on the pool floor and ceiling.
- **Water:** one transparent quad. A small depth texture baked from the basin drives tint and opacity. It also has scrolling normal noise, three drip-ripple rings, a fake Fresnel reflection with the skylight highlight, and a soft shoreline. Rock under the water is tinted by depth in the rock shader. There is no reflection or refraction pass.
- **Detail and scale:** 320 instanced calcite straws, 90 instanced breakdown blocks, two rope handrails on iron stakes (north shore, ramp) plus a landing-edge rope, a survey tripod with instrument, a brass "SURVEY STN 7" benchmark disc, red painted station marks, flagging stakes, a work lamp, a rope coil, and a supply crate with a helmet.
- **Collision:** a capsule-style body tests clearance against the same distance grid the mesh came from, so it matches the visible rock. Steps up to 0.42 m are allowed, gravity applies, and the player slides along walls. The waterline is a hard boundary so you stay dry. The daylight crawl is blocked, and boulders and props have circle colliders.

## Test results (this machine: Intel integrated graphics, ANGLE / D3D11)

- **Automated walk** (scripted W-key movement through `updatePlayer`): recess → south shore → arch → ramp → landing → back through the arch → north shore → column → recess. All 16 waypoints were reached with no sticking.
  - Walking straight at the pool from the north shore stops at the shoreline.
  - Walking into the crawl stops before the opening.
- **Build time:** field about 1.1–1.4 s, meshing about 0.2 s, baking about 0.2–0.3 s. All of it happens once at load, behind the start panel.
- **Render cost:** with a forced GPU sync (readPixels) after each frame, render cost at 1280×720 for the six viewpoints was below the measurement noise. That is roughly 0–3 ms, against an 8 ms sync overhead.
  - The browser pane was hidden during testing, so requestAnimationFrame frame rates could not be measured. The HUD shows live frame times when you run it.
- **Draw calls:** about 20–80 per frame, depending on view.
- **Shaders:** all programs compile with no console errors after the final fix.

## Known limitations

- The rock mesh resolution is 0.2 m; finer relief comes from the detail normal map. Small formations below about 0.3 m are instanced meshes, not part of the cave mesh.
- Bounce light is baked per vertex, so very close inspection shows smooth gradients, not sharp contact shadows. Props get a single baked ambient value each.
- The water reflection is faked: it shows the skylight highlight and a dim cave tone, not the actual chamber.
- The pixel ratio is capped at 1.25 to keep frame times low on high-DPI displays.
- The landing is deliberately dim (warm work lamp only). Use F for the headlamp if needed.

## Run record

- Model: Claude Opus 5.5 (`claude-opus-5-5`) in Claude Code, at the session's default reasoning-effort setting (unchanged)
- Start: 2026-10-06 12:59:08 EDT; first implementation file written at about 13:01 EDT
- One-hour deadline: 13:59:08 EDT
- Stop timestamp: 2026-10-06 13:22:25 EDT (stopped about 35 minutes before the deadline)
- Interruptions: none. No subagents or other models; no external assets; port 5187 on 127.0.0.1.
