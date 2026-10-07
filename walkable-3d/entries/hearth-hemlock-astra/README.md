# Hearth & Hemlock

A standalone, original 3D witch's cottage built with Three.js: a warm working kitchen, a crowded apothecary workroom, and a cool glazed greenhouse. All geometry, surface textures, botanical artwork and arrangement were created in this workspace. The only runtime library is Three.js 0.180.0, vendored in the build.

## Launch the finished build

Requires Node.js 20.11 or newer. Node.js 24.14.0 was available during implementation.

In PowerShell:

```powershell
cd "C:\Users\jmore\Documents\Codex\2026-10-07\task-24\hearth-and-hemlock"
node scripts/serve.mjs --port 4387
```

Then manually open **http://127.0.0.1:4387** in a desktop browser with WebGL 2.

**That is a suggested launch address, not a running preview.** No server or browser was started during implementation. Port 4387 was checked for an existing listener without binding or serving it. The server binds only to `127.0.0.1`. Stop it with **Ctrl+C**.

`dist/` contains the complete browser build, including the library. Launching it does not require an npm install or any internet request. Serve the folder over HTTP; directly opening `index.html` using a `file:` URL is not supported by browser ES-module security.

## Controls

| Input | Action |
| --- | --- |
| Click **Step inside** | Enter and capture the mouse |
| Mouse | Look around |
| WASD / arrow keys | Walk |
| Shift | Walk faster |
| R / **Reset** | Return to the entrance |
| Esc | Release the mouse and stop movement |
| Click the scene | Resume |
| H / **Controls** | Show or hide help |
| Q / **Quality** | Switch High / Light rendering |

If mouse capture is unavailable, hold the left mouse button and drag to look; the movement keys still work. There is no automatic tour or camera movement. Movement uses a fixed eye height, a 22 cm collision radius, axis sliding and substeps to prevent crossing a wall after a long frame.

## Inspection route

Start inside the oak entrance door. The breakfast table is to the left; the kitchen counter and sink follow the left wall. The range sits beside the broad timber passage. Through that passage, approach the workbench along the right wall. The tall apothecary hutch is behind you. The open doorway ahead leads into the greenhouse; walk between the planting benches, turn back toward the workroom, and return through the same wide passage to the kitchen.

The small details include scored bread and a knife, tea on a folded towel, a botanical folio, hanging herbs and garlic, labelled jars, book bindings, a balance, an armillary, an improbable stone stack, a climbing bean, seed trays, a watering can and quietly luminous moonwort. Props are static.

## Checks actually performed

- JavaScript syntax checks on the application and scripts.
- CPU-only scene construction using a no-op canvas stub. This creates geometry and metadata but does not draw or render textures or images.
- Finite geometry attributes and valid batch bounds.
- A 10 cm navigation grid flood-filled from the entrance, confirming that all eight inspection targets are reachable.
- Large-step movement tests against the workbench and entrance wall.
- A non-serving build and local artifact/import checks.

See `CHECK-RESULTS.json` for the final numerical scene and navigation results and `BUILD-CHECK.json` for the artifact checks. Geometry counts and CPU construction time are **not frame-rate measurements**.

**Not performed:** browser launch, WebGL rendering, screenshots, visual inspection, interactive control testing, GPU testing, or frame-time benchmarking. Visual correctness and performance remain unverified, as required by this run's execution conditions.

## Rendering choices and limitations

Static props are merged by material. Leaf silhouettes use opaque geometry instead of overlapping transparent texture cards. Lighting combines a cool directional light and hemisphere fill with warm kitchen lighting and two small magical accents. The directional shadow map is computed once; there are no animated shadows, particles, postprocessing passes or live simulations. Rendering pauses when exploration is inactive. High mode caps pixel ratio at 1.5; Light mode caps it at 1.0 and reduces shadow resolution.

Glass uses inexpensive tinted transparency and a procedural reflection environment, without physical refraction. Objects cannot be picked up or operated. Navigation is designed for desktop keyboard and mouse; there are no touch movement controls. The entrance door is the boundary of the scene and remains closed.

For later inspection only, `window.cottage` exposes scene counts, position, reset and the current render call count. Launching with `?timing=1` records the last 600 raw animation-frame intervals in `window.cottage.frameTimes`. These are browser callback intervals, not GPU timing, and no such measurements were collected during this build.

## Rebuild and CPU checks

```powershell
npm.cmd ci --ignore-scripts --no-audit --no-fund
npm.cmd run check
npm.cmd run build
```

These commands do not start a server. `npm ci` downloads the pinned public registry dependency if it is not already installed.

## Run record

- First implementation action: **2026-10-07 09:03:32.6909098 +00:00**.
- Hard deadline: **2026-10-07 10:03:32.6909098 +00:00**.
- Actual stop: recorded in `RUN-RECORD.json` as the final implementation write.
- Runtime instructions identify the model family as **GPT-6**. The exact deployment identifier and reasoning-effort setting were **not exposed** to this session; they are recorded as unavailable rather than guessed.
- No other models, subagents, model-backed asset tools, existing project assets or comparison entries were used.
- No interruptions or deadline extensions. An initial registry download failed under the sandbox and succeeded on the permitted retry; that elapsed time remained within the original deadline.
- All entry-owned command processes completed. No server, browser, watcher, UI test or background test process was started or left running.

Three.js license: `dist/vendor/THREE-LICENSE.txt`.
