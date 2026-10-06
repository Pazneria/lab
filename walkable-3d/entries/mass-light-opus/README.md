# MASS / LIGHT: brutalist museum (explorable 3D)

A compact two-room concrete museum you can walk through in the browser. It has an entrance gallery (4.2 m ceiling), a broad 1:13 ramp, and a sculpture hall (9.5 m clear height). Everything is built with three.js r169. All textures and geometry are generated procedurally at load time. There are no external assets.

## Launch

```
cd opus-brutalist-museum-entry
python -m http.server 5197 --bind 127.0.0.1
```
Open http://localhost:5197/ and click the panel to enter. Any static server works. `node_modules/three` is vendored, so no install is needed. If it is missing, run `npm install`.

## Controls

| Input | Action |
|---|---|
| Mouse | Look (pointer lock; click the panel to capture). If pointer lock is unavailable, drag to look. |
| W A S D / arrow keys | Walk (2.4 m/s) |
| Shift | Walk faster (4.6 m/s) |
| R | Reset to the entrance |
| 1 / 2 / 3 / 4 | Viewpoints: entrance, ramp top, hall, hall looking back toward the gallery |
| F | Frame-time overlay (fps, avg, p99, max, draw calls, DPR) |
| Q | Toggle render resolution (high / performance) |
| Esc | Release the mouse and show the controls panel |

## What's in it

- **Architecture**: walls are 0.8 m thick. The plywood-formed panels are 1.8 × 0.9 m, with tie holes and rust streaks below them, air voids, and panel joints aligned to the floor. Soffits, beams and skylight shafts are board-formed. The polished floor has saw-cut joints on a 3 m grid and exposed aggregate. Edges are chamfered, and a shader adds wear and chipping to those chamfers. A shader also adds world-space macro variation, so the texture tiling isn't visible. Wall bases get a cheap contact darkening.
- **Spatial moves**: the low gallery has three deep (1.9 m) skylight shafts aimed at the exhibits, plus downstand beams. The entry is offset west and the ramp door is offset east. A viewing slot in the shared wall looks across into the hall. The hall has a deep light well aimed at the main sculpture, a linear skylight raking the ramp wall, a south clerestory, a full-height light slit, and a low north window.
- **Ramp**: 5.6 m wide. It drops 0.9 m over 12 m, with level landings at both ends. It has a guarded concrete parapet with a precast cap and a handrail on the wall side.
- **Sculptures**:
  1. *Fold Sequence IV*: a twisted, zig-zag folded plate in weathering steel (gallery).
  2. *Hollow Weight*: a pierced, softly carved pale limestone monolith with a reclining ovoid (gallery).
  3. *Glacial Index*: a twisted stack of fifteen cast aqua resin layers, with real transmission and refraction (main piece in the hall, on a round plinth with 3 m+ of walking clearance).
- **Light**: one sun with a static 4096² soft shadow map, rendered once. The beams through the skylights are real shadowed sunlight. Soft fill comes from spotlights inside the shafts, an environment map captured from inside the building, and a weak hemisphere light.
- **Props**: oak-and-concrete benches, angled label stands, a wall plaque, an intro wall text, contact shadows, glazed entrance doors, and screen walls in the entry court.

## Performance notes

- About 11–35 draw calls and ~100k triangles. The shadow map is static, and the architecture is merged per material.
- Pixel ratio is capped at 1.25. After warm-up, if more than 40% of the frames over ~4 s are slower than 22 ms, it drops once to performance resolution. Q toggles this manually.
- The resin's physical transmission pass only runs when the resin is in view. It renders at half resolution without MSAA, which is patched in `main.js`. This cut the cost of circling the sculpture by ~30% in testing.
- Shader programs, textures and the transmission target are warmed up from every viewpoint during loading, so the first look at each room doesn't hitch.
- Measured in the Claude desktop in-app browser at 1280×760, DPR 1, timing 60 batched frames with a GPU sync at the end: ~6.5–7.5 ms per frame in the gallery, ramp and hall views, and ~9–10 ms circling 3 m from the resin sculpture. These numbers are indicative only. Use the F overlay on your own hardware.

## Known limitations

- There is no global illumination. Bounce light is approximated with fill lights, an environment capture and shader darkening, so corner occlusion is approximate.
- The environment reflections come from one capture point per room, so reflections on metal or glass don't shift exactly with parallax.
- Collision uses a circle against boxes. You can't jump or crouch. The exterior can be seen but not walked.
- The sky is a simple gradient, and the exterior beyond the entry court is a flat plane.

## Build record

- Model: Claude Opus 5.5 (`claude-opus-5-5`) in Claude Code (desktop app). The reasoning-effort setting is not visible to the model in this session.
- Session start: 2026-10-06 13:01:03 EDT (empty workspace). First implementation file (`index.html`) written at 13:11 EDT.
- One-hour deadline: 14:01:03 EDT.
- Libraries: `three@0.169.0` from the npm registry. Nothing else.
- Preview port: 5197 (`.claude/launch.json`).
- Stop timestamp (last edit): 2026-10-06 13:36:18 EDT. No interruptions. Testing ran in the Claude desktop in-app browser pane, which was hidden, so live rAF frame rates there were throttled and not representative.
