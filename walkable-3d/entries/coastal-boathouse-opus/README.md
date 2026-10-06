# Tidal Boathouse — benchmark entry

An explorable three.js scene: a timber boathouse workshop, a stone quay with steps and a slipway, a short timber pier, and an exposed low-tide foreshore with one small clinker dinghy (*Kittiwake*) resting on the sand. The tide is fixed at low water, and the high-water mark is drawn on every surface that reaches below it.

## Entry record

- **Model:** Claude Opus 5.5 (`claude-opus-5-5`) in Claude Code (desktop app). Reasoning effort was the session default; no subagents or other models were used.
- **Started:** 2026-10-06 13:41:41 −04:00 (first implementation work: workspace set-up and `npm install three`)
- **One-hour deadline:** 2026-10-06 14:41:41 −04:00
- **Stopped editing:** 2026-10-06 14:13:14 −04:00. There were no interruptions; this README was finalised right after.
- **Workspace:** this folder only, with no outside assets. The only library is three.js 0.169.0 from npm.

## Launch

Requires Node.js (tested with v24). three.js 0.169 is installed locally in `node_modules`.

```bash
npm install
node server.js
```

Then open **http://localhost:5287/** in a desktop browser (Chrome or Edge recommended) and click to explore.

## Controls

| Input | Action |
|---|---|
| Mouse | Look (click the page to capture the pointer, Esc to release) |
| W A S D / Arrow keys | Walk |
| Shift | Walk faster |
| C | Crouch, for inspecting low surfaces |
| R | Reset to the start position |
| 1 – 5 | Viewpoints: 1 Workshop, 2 Pier end, 3 Foot of the shore steps, 4 Boat, 5 Start |
| P | Toggle the frame-time readout (average ms, fps, 99th-percentile ms, draw calls, triangles) |
| Q | Toggle render resolution between full and reduced |

## Route

- **Start:** the quay apron between the workshop and the pier.
- **Workshop:** go through the open double doors. Inside are a bench with a vise and tools, a tool board, shelves of paint tins, sawhorses holding a new plank with shavings underneath, oars in the corner, a rope coil on a peg and a hanging lamp.
- **Pier:** step up from the apron onto the deck. It has handrails on both sides, kerb timbers and a closed end, so you can't walk off it.
- **Shore:** take the stone steps down (they have a handrail and cheek walls), or walk down the slipway in front of the workshop doors. Near the bottom of the slipway you can step off sideways onto the sand.
- **Boat:** walk all the way around the dinghy on the sand. Its painter rope runs up to a ring in the seawall.
- The water's edge stops you at about ankle depth. You can't wade or swim.

## Notes

- Everything is procedural, generated in the browser at load: wood grain, clapboard, stone, flags, sand ripples, corrugated roof, rope and hull textures, with normal maps. There are no external assets.
- A tide shader reads world height. Below the high-water line (y = −0.32) surfaces are wet-darkened and glossier, with algae and barnacles and a stain band at the line itself. Above the line there is a salt bloom. This applies to the seawall, the steps, the slipway, the piles, the ladder and the rocks. On the beach, a strand line of wrack follows the high-water contour.
- The water is a single shader plane. It samples a terrain-depth texture, so it fades to clear over the shallows and shows a soft lapping line at the edge. Its reflections come from an analytic sky, so it costs no extra render passes.
- Lighting is a low morning sun with a 4096 shadow map, rendered once because the scene is static. A PMREM sky environment lights the outside at full strength; interior materials take less of it. A warm hanging lamp and a fill light keep the workshop from going flat.
- Static geometry is merged by material, about 20–50 draw calls per view. Pebbles, seaweed, mussels, grass, rocks and shavings are instanced.

## Measured performance (in development)

Measured on an Intel integrated GPU (ANGLE / D3D11) at 1920×1080, pixel ratio 1, on the final build. Each figure is one synchronous render followed by a `readPixels` stall, so these are upper bounds:

| View | Median frame time | Worst of 40 frames | Draw calls |
|---|---|---|---|
| Start (apron) | 11.6 ms | 16.2 ms | 53 |
| Workshop interior | 11.6 ms | 16.4 ms | 29 |
| Pier end, looking back at the shore | 13.3 ms | 17.1 ms | 54 |
| Boat | 12.3 ms | 14.7 ms | 54 |
| Pier end, looking out to sea | 9.1 ms | 15.4 ms | 23 |
| Shore, looking back at the workshop | 10.7 ms | 14.9 ms | 38 |
| Doorway (interior and exterior together) | 11.8 ms | 14.6 ms | 30 |

One mid-session run came in at roughly twice these times (24–32 ms) while other processes were heavily using the same GPU. The final run above was on a quieter GPU. The scene builds in under 1 s and does no streaming or loading after start-up.

The default pixel ratio is capped at 1.25. If the median frame time stays above 24 ms for 3 s while you are exploring, the render scale drops one step (to no lower than 0.75) and a notice appears. Press **Q** to toggle the resolution manually; this also turns the automatic adjustment off.

## Scripted walk test (passed)

Movement was driven through the game's own update loop at 60 Hz. The player can reach the workshop doors, the inside of the workshop and the workbench, the pier head and the pier end, the top and foot of the shore steps, all four sides of the boat, and the slipway from the beach and up to the workshop. The player is correctly stopped at: the back wall of the workshop, both sides and the end of the pier, the quay edge, the boat hull, wading into the inlet (you stop at about ankle depth), and the side of the slipway.

## Known limitations

- Collision uses simple invisible boxes. They are tight around walls, the pier, the steps and slipway sides, the bench, the crates and the boat, but small props such as handrail posts and tins have no collision.
- The terrain is a heightfield. The beach can't be walked under the pier because a barrier stops you between the pile rows.
- The water is a calm animated surface with no real geometry waves and no screen-space reflections. The boat and pier aren't mirrored in it; it reflects only the sky.
- Seaweed, mussels and pebbles are simple instanced shapes. Up close they read as stylised.
- The distant land is a simple low-poly backdrop that fades into the haze.
- The workshop's lit interior uses unshadowed point lights, so the lamp light does not cast shadows.
- The frame-time readout (P) measures `requestAnimationFrame` intervals, so it is capped by the display refresh rate.
