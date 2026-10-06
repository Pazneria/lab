# The Old Palm House — explorable 3D greenhouse (benchmark entry)

An overgrown Victorian palm house you explore on foot in the browser. It is built with Three.js r186 and Vite. Every texture and model is generated in code at load time, and the project has no external asset files.

## Launch

```bash
npm install          # already done in this workspace
npm run dev          # serves http://127.0.0.1:5291/
```

Production build (same port):

```bash
npm run build
npm run preview      # http://127.0.0.1:5291/
```

Click the page to capture the mouse. Loading takes about 5–10 s because the textures and geometry are generated procedurally. Shaders, textures and the static shadow map are all prepared before the scene is shown, so they don't load in while you're walking.

## Controls

| Input | Action |
|---|---|
| Click | capture mouse / mouse-look |
| W A S D / arrow keys | walk |
| Shift | walk faster |
| C (hold) | crouch (eye 0.82 m) to look beneath the foliage. Ctrl is deliberately not used, because Ctrl+W would close the browser tab |
| Space (hold) | tiptoe (eye 1.86 m) |
| 1 / 2 / 3 / 4 | jump to threshold / aisle A start / potting alcove / aisle B start |
| R | reset to the threshold |
| F | frame-time overlay (avg, p95, render resolution, draw calls) |
| Esc | release mouse and show the controls panel |

Add `?adapt` to the URL to run adaptive resolution even when the mouse isn't captured.

## Scene layout (metres, human scale; eye height 1.62 m)

- **Threshold (x −18.5 … −12):** a gravel path between clipped hedges leads to a low garden wall with an iron gate. There is also a stone door step, a painted "PALM HOUSE" board, an open glazed door with a cracked light, a boot scraper, pots (one fallen over) and weeds.
- **Main house (24 × 8 m):** a 0.8 m brick knee wall with a stone sill. It has slender painted-iron framing that is flaking to rust: bays every 1.5 m, glazing bars every 0.5 m, purlins, a ridge with cresting and finials, quarter-circle spandrel brackets, eave tie rods with ring bosses, and three cast-iron columns. There are about 550 glass panes in four weathering variants: lightly grimed, dirty/algae-edged, cracked with a broken-out hole, and old whitewash shading. About 6 % of roof panes are missing, with shards on the floor beneath some of them.
- **Central bed (16 × 3.1 m):** a raised brick-curbed bed with mossy coping. It holds two Kentia palms with ringed trunks and arching pinnate fronds (yellowing and dead fronds included), a three-stem banana clump with torn paddle leaves and dead hanging leaves, and three Monstera on moss poles with split and fenestrated leaves and aerial roots. It also has Alocasia elephant ears, two tree ferns with fibrous trunks and skirts of dead fronds, plus a ground layer of ferns, strap-leaved Aspidistra, striped Calathea, a round-leaf ground cover spilling over the curb, moss and leaf litter.
- **Aisle A (south, sunnier):** brick paving with mossy joints, beside a long slatted potting bench (one sagging section, one missing slat). The bench holds pots of bromeliads, ferns, strap plants and trailing plants, with handwritten zinc and plastic labels. Stacked pots and compost sacks sit underneath.
- **Aisle B (north, shadier):** a wall bed with bronze Cordyline tufts, two more Monstera, Alocasia and ferns. Creeper runs over the knee wall and up the mullions into the roof, with strands hanging down. A green hose runs along the floor to a brass nozzle, and a watering can stands nearby.
- **Cross aisle and potting alcove (x 7 … 14.6):** the two aisles reconnect around large pots (a young palm and a Strelitzia-like plant) and stacks of pots. The alcove is a brick-walled lean-to with a whitewashed glass roof. Inside are a potting bench with a soil heap, seed trays with seedlings, stacked pots, a sieve, a trowel, twine and a bundle of labels, plus a shelf of pots, a wall-mounted hose reel, hanging tools, sacks, a bucket and watering cans.
- **Light:** a low-ish sun with a static 4096² PCF shadow map. Shadows come from the frame, the plants, and the whitewashed or grimy panes, which act as shade casters, so light falls in bright patches between sheltered shade. The scene also has sky image-based lighting, light humidity haze, fake sun shafts and drifting dust motes. Leaf shaders add a shadow-aware back-light term, so sunlit leaves glow when you look toward the sun.

## Performance design

- 96 draw calls in total. Static geometry is merged by material, and every leaf type is a single `InstancedMesh`. That covers 17 leaf, frond and moss batches.
- The scene is static, so the shadow map is rendered **once**. Matrices are frozen, and shaders and textures are warmed up before the scene is shown.
- Opaque objects are drawn front-to-back: leaves first, then the floor, and the sky last. Glass is a single merged transparent mesh with a fixed render order, so nothing pops when transparent objects re-sort.
- The render resolution is capped at about 0.95 MP (roughly 1300×730 internal at 16:9, with 4× MSAA). While the mouse is captured, an adaptive scaler with hysteresis lowers it to as little as 62 % if the average frame time goes above 17.8 ms, and raises it again below 12.5 ms. It changes at most every 2 s.
- Movement uses exponential velocity smoothing, sub-stepped collision against rectangles and circles (player radius 0.26 m), and a frame-rate-independent `dt` clamp.

## Test results (on this machine: Intel integrated GPU, ANGLE/D3D11)

- **Collision (scripted key-walk):**
  - Threshold → through the door → stops at the bed.
  - Aisle A runs its full length to the end wall.
  - Walking into the alcove stops at the potting bench.
  - Both aisles are blocked by the bed and by the bench / wall bed.
  - The hedges block the sides of the threshold.
  - No route passed through walls.
  - The floor is a constant-height plane, so there is no way to fall through.
- **GPU render cost** (synchronous `render` + `readPixels`, 30 frames per view, at 1.25 MP; measured while the preview pane was hidden, so indicative only):
  - Aisle views: about 20 ms
  - Threshold: about 13–15 ms
  - Looking up into the roof: about 9–11 ms
  - Renderer CPU time: about 0.8 ms/frame
- **GPU cost at 1.05 MP** (re-measured after optimisation):
  - Aisle A: about 16.0 ms
  - Aisle B: about 14.8 ms
  - Alcove: about 3.3 ms
  - Threshold: about 7.3 ms
  - 55 draw calls and about 0.66 M triangles in the heaviest view
- I then lowered the default cap to 0.95 MP for extra headroom. The adaptive scaler covers weaker GPUs.
- I could not run a real rAF frame-time capture with the pointer locked, because the preview pane was hidden (requestAnimationFrame was paused). Use the F overlay or your own tools to measure.

## Known limitations

- Foliage has no collision: you can walk through leaves, but not through trunks, beds, benches or walls. Leaves very close to the camera can clip at the 3 cm near plane.
- Plants and dust are static apart from the drifting motes. There is no wind sway, because the shadow map is baked once.
- Sun shafts are faked with additive soft planes. They are subtle, and you can see them clip if you stand inside one.
- The distant trees outside are simple displaced blobs softened by haze.
- On fill-rate-limited GPUs the adaptive scaler can lower the resolution, which makes the image softer.
- The bed and the wall bed are solid. To look beneath the plants, crouch at the curbs.

## Benchmark record

- Model: Claude Opus 5.5 (`claude-opus-5-5`) in Claude Code (desktop). Reasoning-effort setting: the session default; the exact value isn't exposed to me.
- Work start / first implementation: **2026-10-06 01:19:47 EDT**. The first source file was written at about 01:27 EDT.
- One-hour deadline: **2026-10-06 02:19:47 EDT**
- Actual stop timestamp (last edit and build): **2026-10-06 01:56:10 EDT**, about 20 minutes before the deadline.
- Interruptions: none. Performance measurements were limited because the built-in preview pane was hidden.
- Port: 5291 (127.0.0.1). No other entrants' files, existing assets, subagents, paid services or external publication were used.
