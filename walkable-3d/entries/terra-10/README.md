# The Hillside Library

A self-contained Three.js scene generated from local geometry, textures, and materials. The room includes a lower collection, a window alcove, a broad stair, and a partial upper gallery.

## Launch

From this directory, run:

```powershell
npm run dev -- --host 127.0.0.1 --port 43117 --strictPort
```

Then open the suggested address http://127.0.0.1:43117/ in a desktop browser. The server was not started during this build. Dependencies are installed in this workspace; if they need to be restored, run `npm ci` first.

Click **Enter the library** to capture the mouse. Move with **W/A/S/D**, look with the mouse, hold **Shift** to move faster, and press **R** or the onscreen reset button to return to the start. Press **Escape** to release the mouse; click the scene to capture it again.

## Checks and limitations

`npm run build` and `node --check src/main.js` pass. `npm run check-route` runs a CPU-only movement simulation using the scene's movement code and a separately enumerated set of matching obstacles; it checks a route through the alcove, up the stair and across the overlook, the return, and selected edge/wall boundaries. This is not an interactive browser test.

No browser, rendering, visual, GPU, or performance test was run. Appearance, frame times, and the complete interactive collision behavior remain unverified. Lighting uses unshadowed lights and simple translucent floor patches; the landscape and textures are procedural. Desktop mouse and keyboard are required.

## Timing and provenance

- First implementation action: 2026-10-26 16:09:07 UTC-04:00.
- One-hour deadline: 2026-10-26 17:09:07 UTC-04:00.
- Exact assigned model identifier and reasoning effort: not exposed to this runtime. The system identifies the assistant as GPT-6, but does not provide a more precise identifier or effort setting.
- Interruptions: no work interruption. The first npm registry request failed in the restricted environment; the dependency install succeeded on a permitted retry. An installed-library filename search returned paths in unrelated projects; those files were not opened or reused.
- Actual stop: 2026-10-26 16:14:21 -04:00. All entry commands had completed; no server, watcher, browser, or test process was left running.
