# Low Tide — Tidal Boathouse

A local, procedural Three.js walking scene. From the workshop doorway, follow the pier forward; the short ramp on its right leads down to the exposed shore and boat.

## Launch

Requires Node.js and npm. Dependencies are included in this workspace; if needed, run `npm install` first. From this folder run:

    npm run dev -- --host 127.0.0.1 --port 4189 --strictPort

Then open the suggested address http://127.0.0.1:4189/ in a WebGL-capable browser. The address was not started or browser-tested during this build.

## Controls

Click **Enter the boathouse** to capture the mouse. Move with **WASD** or the arrow keys, look with the mouse, and hold **Shift** to move faster. Press **R** or click **Reset** to return to the workshop. Press **Escape** to release the pointer; click the scene to capture it again.

## Checks and limitations

- `npm run build` completed successfully. Vite reported its standard warning for a JavaScript chunk larger than 500 kB.
- `node route-check.mjs` checked the workshop-to-pier-to-shore-to-boat circuit and return, plus selected collision boundaries, against the actual movement functions.
- `node scene-cpu-check.mjs` constructed the procedural scene without a renderer and checked that mesh vertex positions were finite.
- Browser rendering, visual appearance, interactive controls and frame timing were not tested, as required by the execution conditions. The water and tide are decorative and fixed; the scene has no boat physics. Invisible walkable limits keep the viewer on supported surfaces. Mouse and keyboard are required.

## Run record

- Model: GPT-6 as identified by the execution environment; exact variant and reasoning effort were not exposed to this run.
- First implementation action: 2026-10-26 20:08:34 UTC.
- Deadline: 2026-10-26 21:08:34 UTC.
- Stop timestamp: 2026-10-26 20:12:44 UTC.
- Interruption history: the initial sandboxed dependency install was stopped after it stalled with network access disabled; an authorized install retry completed. No other interruptions.
- Process cleanup: all installation, build, and CPU-check processes started for the entry have exited. No server, browser, watcher, or benchmark was started. Port 4189 had no TCP listener in a local check; availability may change.
