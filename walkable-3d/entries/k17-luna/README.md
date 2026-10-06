# K—17 · Polar Field Shelter

A compact, first-person Three.js scene: a lee-side snow court, a two-door vestibule and one insulated research and living room. All scene geometry, snow, signs, instruments and wall graphics are generated locally in the browser. The pinned Three.js r185 build and its MIT license are included under `vendor/`; the preview does not load external assets.

## Run

From this folder, run:

```powershell
npm run dev
```

Open [http://127.0.0.1:53187/](http://127.0.0.1:53187/). Stop the server with **Ctrl+C**. The included Node.js server serves this folder on loopback only; no package installation is required. Use a current desktop browser with WebGL 2 enabled.

## Controls and route

- Click **Enter the shelter** to capture the mouse and begin outside on the compacted track.
- **W / A / S / D** move; **mouse** looks around; **Shift** walks faster.
- **Esc** releases the mouse; click the scene to recapture it.
- Press **R** or the **Reset** button to return to the starting view.
- Follow the ramp into the vestibule and through the open inner door. The narrow walking spine stays clear between the bench and berth; either lee-side snow path leads around the cabin for another outside view.

The small HUD reports rolling 95th-percentile request-animation-frame pacing in milliseconds. It measures browser frame timing, not GPU-only rendering time.

## Checks and limits

- `node --check src/main.js` and `node --check server.mjs` pass.
- The local HTTP server returned **200** for the page, stylesheet, scene script, Three.js module, and license. Three.js r185 and its instancing module import successfully under Node 24.
- An interactive visual walk was not completed in the executor. Its installed headless Chrome process exited when Windows denied its GPU process (`ACCESS_DENIED`); the in-app browser surface was unavailable. The scene's mouse-look and collision route have therefore not been measured here. Use the live preview to inspect them on the grading browser/device.
- Performance depends on the grading device and browser GPU. The HUD shows a live frame-pacing sample during your walk; no frame-rate claim is made here.

## Build record

- Timed task start: **2026-10-06 05:08:49 UTC**
- First implementation file written: **2026-10-06 05:11:16 UTC** (`package.json`)
- One-hour deadline: **2026-10-06 06:08:49 UTC**
- Actual stop timestamp: recorded at the end of `BUILD-RECORD.md`.
- Execution model: **GPT-6**; this executor did not expose a more specific model ID or reasoning-effort setting.
- Interruptions: none.
