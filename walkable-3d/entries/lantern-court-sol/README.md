# After Rain — Lantern Court

A small, freely explorable 3D night market. Four stalls face an open courtyard: Moon Dumplings, Green Basket, Blue Hour Noodles, and Earth & Fire. The covered passage at the rear leads to The Late Cup tea counter. The entrance vestibule provides a different view on the return walk.

## Launch

The finished static build is in `dist/`. Node.js is sufficient to run it; no package installation or network connection is required.

From this workspace:

```powershell
npm run preview
```

Or from inside `dist/`:

```powershell
node server.mjs
```

Open **http://127.0.0.1:5187/** in a hardware-accelerated WebGL 2 browser. The server binds only to localhost. If this port is occupied, stop the existing market server or set `$env:MARKET_PORT = '5188'` before launching.

To rebuild from source, install the declared packages with `npm ci`, then run `npm run build`. All geometry and texture art was made procedurally in this workspace. Three.js 0.180.0 is the rendering library; its license is included in `vendor/` and `dist/vendor/`.

## Controls

| Input | Action |
| --- | --- |
| Enter the courtyard | Start exploring and capture the mouse |
| W / A / S / D | Walk forward / left / backward / right |
| Mouse | Look freely while captured |
| Shift | Walk faster |
| Esc | Release the mouse for the interface |
| Click the scene | Recapture the mouse |
| Drag the scene | Look without mouse capture |
| Arrow keys | Turn and look up/down |
| R / Reset view | Return to the entrance |
| P / Frame timings | Show measured frame intervals |
| Download measurements | Save frame times and positions as JSON |

There is no automatic tour. Eye height is 1.68 metres, movement is horizontal, and the player has a 0.23-metre collision radius. Walls, counters, posts, crates, benches, stools, pots and the gate have collision. The walking surface is continuous through the passage and tea room.

## Suggested inspection

Start at the entrance, approach the red dumpling stall, cross to the blue noodle stall, move to the ceramics and produce stalls, then follow the central opening through the covered passage. Approach the tea counter, turn around, and walk back into the courtyard. Space beneath each canopy is accessible in front of the counter. Paths behind and beside the stalls offer additional views.

## Performance and verification

Static pieces are merged by material. Lighting uses ten bounded point lights, two cached shadow maps and a static reflection probe. There are no runtime asset requests, screen-space reflections, heavy postprocessing, or ongoing shadow-map renders. Sparse steam and a single instanced lantern glow draw are the only animated visual effects.

The renderer caps its framebuffer at 1.8 million pixels and a 1.25 device-pixel ratio to keep large displays responsive. The frame-timing panel shows the actual render dimensions. At 1440 × 900 and device-pixel ratio 1, it renders at native resolution.

`evidence/route-test.json` contains the final local keyboard walking test, collision checks, connectivity results, reset/drag-look checks and frame-time summaries. `evidence/walking-frame-times.json` contains raw samples with positions. Screenshots in `evidence/` are supplementary inspection records; the deliverable is the interactive browser scene.

Measurements come from animation-frame intervals in headless Chrome using the Intel GPU. They include scheduling and presentation effects; they are not GPU-only timings or an independent benchmark score. Jordan's later interactive inspection is the performance judgment.

To rerun local verification with Playwright installed:

```powershell
node route-test.mjs
node test-scene.mjs
```

Tests launch Chrome headlessly. They do not foreground the user's browser. The route harness uses keyboard walking with headings set between checkpoints; the build itself has no automated movement.

## Limits and execution record

This is a bounded desktop scene with keyboard and mouse controls. There are no touch controls, jump/climb actions, vendors, customers or surrounding city. Reflections use an approximate static environment capture and surface highlights, rather than planar mirror reflections. Small countertop decorations do not have individual collision.

`benchmark-record.json` records first implementation, the one-hour deadline, actual stop time and environment detours. The session identifies the model only as GPT-6 / Codex; the exact serving variant and effort setting were not exposed, and are recorded as unavailable rather than guessed. No models, subagents, existing project art, paid services, credentials, public publication or external communication were used.
