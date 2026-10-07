# Moss & Ember

A standalone, walkable Three.js cottage: interrupted breakfast in a warm kitchen, a crowded herbal workroom, and a little greenhouse that connects back to the kitchen. All geometry, canvas textures, labels, and botanical artwork were authored for this entry. No existing project assets were used.

## Launch

The production build is already in `dist/`, and its dependencies are installed.

```powershell
cd "C:\Users\jmore\Documents\Codex\2026-10-07\task-23\moss-and-ember"
npm.cmd run preview
```

Suggested launch address: **http://127.0.0.1:5187/**. This is not a running preview. No server or browser was started during this entry. Port 5187 had no listener when checked during implementation. `--strictPort` makes a later launch fail clearly if that port has since been occupied.

For source development, `npm.cmd run dev` uses the same suggested port. To rebuild, use `npm.cmd run build`. Node 24.14.0 and npm 11.9.0 were used. If transferring the source without `node_modules`, install with `npm.cmd ci --cache .npm-cache` first. Dependencies are pinned to Three.js 0.180.0 and Vite 7.1.7.

## Controls

- Click **Step inside** to capture the mouse.
- **Mouse:** look around. **WASD** or **arrow keys:** walk.
- **Shift:** brisk walk. **Esc:** release the mouse and pause.
- **R** or **Reset:** return to the entrance.
- **Quality:** change resolution between efficient, balanced, and fine. Balanced is the default.

A desktop browser with WebGL 2 and pointer lock is required. There are no touch controls. The movement uses a 19 cm collision radius, axis sliding, bounded substeps, a fixed 1.64 m eye height, and continuous flat floors. There is no jump or fall mechanic.

## Inspection route

From the entrance, approach the counter on your left. The range, bread board, basin, towel, crockery, and abandoned tea make the kitchen usable. Pass through the broad doorway ahead to the workroom. The workbench is on the far wall; the crowded shelves are on your left. The glasshouse opening is to your right. Its secured-open door, planted benches, hanging ferns, propagation tray, trellis, watering can, and varied herbs can be inspected from the clear central aisle. Walk toward the glasshouse's near end and take the second doorway back into the kitchen.

The cottage's horizontal footprint is approximately 6.08 × 9.42 m. The glasshouse is approximately 3.12 × 5.85 m. Counter and doorway heights remain human scale. The floating moonstones and unusual flowering plant are static, restrained magical details.

## Checks actually performed

`npm.cmd run check` passed:

- JavaScript syntax checks for the scene, controls, and layout.
- A bounded CPU flood-fill checked that all nine inspection stations connect to the entrance with the collision radius applied.
- Large movement steps stopped at major walls and furniture.
- CPU scene construction checked finite geometry and instance transforms, material presence, label atlas capacity, and bounded mesh/triangle counts. This uses stub canvas drawing methods and creates no renderer or pixels.

The final authored data contains 3,217 instances in 122 instance batches, 130 scene meshes, approximately 230,837 triangles, and nine lights. Those are static data counts, **not performance measurements**. Repeated props use instancing, labels share an atlas and mesh, plants use opaque curved leaf geometry, and only one directional light has a shadow map. Shadows are updated once; the paused view skips redundant renders.

`npm.cmd run build` passed and produced the production bundle. The application chunk is approximately 45 kB, and the Three.js chunk approximately 489 kB before compression. All runtime resources are local; there are no remote image, font, or service requests.

## Verification limits

Per the execution conditions, no browser, headless browser, UI test, screenshot renderer, GPU check, or performance benchmark was run. Visual correctness, pointer-lock operation, interactive exploration, transparency appearance, and actual frame times still require the separate judging session. Glass uses translucent geometry and an environment reflection approximation rather than physical refraction. Objects and doors are static. Collision covers walls and major furniture; small tabletop items and foliage do not have individual collision shapes.

## Run record

The authoritative timestamps and cleanup result are in `run-record.json`.

- First implementation action: **2026-10-07T09:03:23.9110681+00:00**.
- One-hour deadline: **2026-10-07T10:03:23.9110681+00:00**.
- Actual stop: recorded in `run-record.json` after final checks and process cleanup.
- No external interruption, clock reset, model change, subagent, or delegated worker was used.
- Technical delays counted within the original window: the first registry download failed under network restrictions, then succeeded with the authorized registry install; Vite's default config bundler encountered an ancestor-directory sandbox restriction, resolved by native config loading.
- The system identifies the model family as GPT-6. The exact live backend identifier and effort are not exposed by the runtime. The host configuration reads **gpt-6.1-sol / low**; these configured values are separately recorded and are not represented as independently verified live-run metadata.

No server, browser, watcher, or test process is left running. See the run record for the final process inspection.
