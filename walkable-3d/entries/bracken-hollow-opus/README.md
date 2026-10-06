# Bracken Hollow: abandoned railway station (benchmark entry)

An explorable 3D scene built with three.js r169 (the copy in `node_modules`). Every texture is
generated procedurally at load time: brick, slate, peeling paint, rust, corrugated iron,
flagstones, ballast, bark, leaf litter, foliage atlases, signs and the timetable. There are no
external assets and no network requests beyond the local server.

## Launch

```
node server.js
```

Then open http://localhost:5287/ in a desktop browser with WebGL2. Chrome or Edge is recommended.
Loading takes a few seconds while textures are generated and shaders are warmed up.

## Controls

| Input | Action |
|---|---|
| Click | Capture the mouse (pointer lock). Dragging with the button held also looks around. |
| Mouse | Look |
| W A S D / Arrow keys | Walk |
| Shift | Walk faster |
| R | Reset to the station entrance |
| 1–5 | Jump to viewpoints: entrance, waiting room, platform canopy, track crossing, woodland viewpoint |
| P | Frame-time overlay (fps, avg/max ms, draw calls, triangles, resolution) |
| [ / ] | Lower / raise render resolution |
| H | Hide the hint line |
| Esc | Release the mouse |

## Route

Entrance forecourt (gate piers) → north door → waiting room (fireplace, ticket hatch, benches,
collapsed ceiling under a hole in the roof, drifted leaves, stopped clock) → platform door → canopy
(cast-iron columns, dagger-board valance, missing roof sheets, broken timetable case with the 1966
closure notice, bench, fire buckets) → east ramp → boarded foot crossing ("STOP LOOK LISTEN") →
woodland loop path → knoll viewpoint with a rustic bench looking back at the station → back along the
trackside → crossing → the path north to the forecourt.

Other details: a sycamore growing out of the platform with roots heaving the slabs and coping
stones, red creeper on the sunlit west wall, a semaphore signal with a drooping arm, telegraph
poles with one broken wire, a luggage trolley, milk churns, a fallen log with fly agarics, and
falling leaves.

## Technical notes

- Static geometry is merged by material, about 55 draw calls in total.
- The 4096² sun shadow map is rendered once at startup, since nothing in the scene moves.
- Foliage uses alpha-tested cards with alpha-to-coverage, crown-shaped normals and back-lit
  translucency. Leaves sway in the vertex shader.
- Eye adaptation smoothly changes exposure when moving between the interior, the canopy and the
  open air.
- If frames run consistently slow, resolution steps down automatically. You can also set it by hand
  with `[` and `]`.
- Collision uses a capsule against wall and prop boxes and tree circles. The step height is 0.42 m,
  so the platform edge cannot be climbed from the track; use the ramp and crossing.

## Known limitations

- The ticket office is locked; you can only see it through the ticket hatch.
- Undergrowth (ferns, grass) and small props have no collision, so you walk through them.
- No global illumination. The interior's cool tone comes from occluded sky light, a dim fill light
  and a skylight under the roof hole.
- Foliage shadows don't follow the wind sway, because the shadow map is static.
- The world is bounded at roughly ±44 m by ±38 m. Distant forest beyond that is billboards
  with fog.
- Frame timing could not be measured in a visible window during development (the test browser pane
  was hidden), so check performance with the P overlay. A synchronous render benchmark at
  1600×900 measured 12–15 ms per frame on the busiest views. That figure includes GPU readback sync
  overhead and was taken while other heavy apps were running. Later runs under heavier background
  load ranged from 18 to 36 ms.
