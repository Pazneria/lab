# After-Rain Courtyard Night Market

An explorable, real-time 3D night market in an enclosed courtyard just after rain, built with three.js (r169). Everything is procedural: geometry is built in code and every texture (wet granite setts, puddle mask, ripple normals, fabric, wood, brick, tiles, facades, signs, lanterns) is painted onto canvases at load. There are no external assets and no network requests besides the local server.

## Launch

```bash
npm install
node server.js
```

Then open **http://127.0.0.1:5293/** in Chrome or Edge (WebGL2 required). Click the panel to capture the mouse.

(`PORT=xxxx node server.js` picks a different port.)

## Controls

| Input | Action |
|---|---|
| Mouse | Look (click the panel to capture the pointer) |
| W A S D / arrow keys | Walk |
| Shift | Walk faster |
| C (hold) | Crouch, to inspect goods up close |
| R | Reset to the courtyard entrance |
| F | Show/hide the frame-time overlay (avg, 99th percentile, max ms, draw calls, render resolution) |
| G | Switch between HIGH (bloom, larger pixel budget) and PERF (no bloom, smaller pixel budget) |
| Esc | Release the mouse / show the controls panel |

## Layout (the inspection route)

- **Courtyard entrance** (south): a covered brick vestibule with a wooden street gate. You start here, looking north into the courtyard under the "雨後夜市" sign.
- **Courtyard** (18 × 16 m, enclosed by 3–4 storey facades with lit windows, balconies, AC units, drainpipes, cables and string lights). Four stalls, each with its own silhouette, surround an open centre with a drain and puddles:
  - **NW: Noodle wok stall.** Sloped red awning with a scalloped valance, brushed-steel counter, carbon-steel wok over a blue flame, stockpot with steam, bowls, hanging ladles, gas bottle.
  - **NE: Fruit stall.** Green-striped gable tent you can walk under, with tilted tiers of crates (oranges, apples, limes, lemons, dragon fruit, eggplant), melons, price tags, a hanging scale and bare bulbs.
  - **SW: Charcoal skewer cart.** Large octagonal umbrella, wheeled cart with glowing coals and skewers, smoke, a folding table with stools, and red lanterns.
  - **SE: Dumpling & bao stall.** Blue barrel-vault canopy on hoops, stacked bamboo steamers (one open), a bao tray, steam, a vertical banner and a string of small lanterns.
- **Covered passage** (east wall, 2.4 m wide × 7.5 m long): tiled walls, beams, pipes, fluorescent fixtures, posters and a meter box. A green "茶 →" neon sign and a pair of lanterns mark its mouth.
- **Tea counter** (small back court): a timber counter under a corrugated eave with an indigo noren curtain, pendant lamps, shelves of tea tins and jars, a copper kettle, a hot-water urn, teapots and cups, stools, and a table for two. Walking back through the passage frames the courtyard and its neon signs.

## Rendering notes

- **Wet ground:** a custom-patched `MeshStandardMaterial`. A world-space puddle mask darkens the albedo, drops roughness and flattens normals inside puddles; slow ripple normals animate the water. A **planar reflection** at quarter resolution, mipmapped, gives sharp reflections in puddles and blurred, distorted streaks on the merely damp setts, weighted by Fresnel. The stone texture stays visible everywhere except in the deepest puddles.
- **Lighting:** 12 point lights (stall lanterns, neon spill, passage fluorescent, tea pendant and sconce, entrance, passage mouth, a soft string-light fill), with emissive lanterns, signs, windows and bulbs feeding bloom. A one-time cube capture of the market itself is used as the PMREM environment for metal, ceramic and glass.
- **Performance work:**
  - All static geometry is merged per material and per zone (entry, courtyard, passage, tea), and each merged mesh is centred so frustum culling and front-to-back sorting work. Fruit and bulbs are instanced.
  - A **depth pre-pass** means the expensive multi-light shading runs about once per pixel, even when the passage or tea court sits behind walls.
  - Large rough surfaces (facades, brick, fabric, timber, crates) use Lambert shading, while the ground, metal, ceramic, glass, fruit, tiles and signs keep full PBR.
  - Bloom runs at half the composer resolution, with 2× MSAA.
  - Resolution comes from a pixel budget (about 1.15 MP in HIGH, 0.7 MP in PERF) rather than the raw devicePixelRatio. If the frame time stays above about 18.5 ms while exploring, the render scale steps down. It never steps back up, so it can't oscillate.
  - Shaders are compiled before the start prompt appears, there are no runtime material or light-count changes (which would trigger recompiles), and nothing in the frame loop allocates.
- **Collision:** the player is a circle (radius 0.28 m) tested against axis-aligned rectangles for every wall, stall counter, pole, cart, table, stool and planter. Movement is sub-stepped so you slide along obstacles. Eye height is 1.62 m (1.0 m crouched). The floor is a single continuous plane, so you can't fall through it.

## Known limitations

- No shadow maps; grounding comes from soft contact-shadow decals plus light falloff. Lantern light passes through canopies and stall bodies.
- The environment cube is captured once from the courtyard centre, so metal reflections aren't position-correct (the ground's planar reflection is).
- Facade windows above the ground floor are painted textures with 3D sills, lintels and jambs, not recessed geometry.
- Steam and smoke are soft point sprites, so they are camera-facing and unlit.
- The CJK sign lettering uses system fonts (Microsoft YaHei / SimHei on Windows). Other systems substitute their own CJK font.
- Pointer lock requires a click, and browsers briefly block re-locking right after you press Esc.

## Build log

- Model: Claude Opus 5.5 (`claude-opus-5-5`) in Claude Code (desktop). The reasoning-effort setting is the session's configuration and isn't visible to the model.
- Start: 2026-10-05 23:28:03 -04:00. First implementation file written about 23:30.
- One-hour deadline: 2026-10-06 00:28:03 -04:00.
- Stop (last edit): 2026-10-06 00:05:06 -0400.
- Interruptions: none. No subagents, other models, paid services or external assets were used. three.js 0.169.0 was installed from npm.
- Testing was done in the Claude desktop app's built-in browser pane (Intel integrated GPU, ANGLE/D3D11, 1280×720).
  - Load: no console errors.
  - Synchronous GPU-flushed benchmark (`window.__market.bench(n)`, which includes about 7 ms of readPixels sync overhead): 18.9–22.3 ms per frame across entrance, courtyard centre (three yaw angles), beneath the noodle awning, passage, tea counter and passage-return views.
  - The scripted collision walk along the full inspection route (entrance → all four stalls → under the awning and tent → passage → between the tea stools → back) was never blocked, and walls, stalls and counters stopped the player at the expected distances.
  - A keyboard-driven movement test (real key events, with `move()` stepped at 60 Hz): walking, Shift run, wall stop, strafe direction, crouch eye height (1.0 m) and R reset all behaved as expected.
  - The pane's own requestAnimationFrame is throttled while hidden, so live fps was judged from the benchmark rather than the F overlay.
