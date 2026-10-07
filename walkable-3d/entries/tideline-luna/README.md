# Tideline — Boathouse at Low Water

An explorable, first-person 3D scene built with Three.js. The scene uses local procedural textures and geometry; it does not load remote assets. Three.js r186.1 and its MIT license are included under `vendor/`.

## Launch

From this folder in PowerShell:

```powershell
npm run build
npm run serve:build
```

Then open **http://127.0.0.1:5179** in a browser. That is the suggested launch address; no server is running as part of this handoff. To serve the source tree directly, use `npm run dev` instead. The server binds only to loopback. Stop it with **Ctrl+C** in its terminal.

No `npm install` or external network access is needed. The static build copies `index.html`, `src/`, and the local Three.js modules into `dist/`.

## Controls

- Click **Step Inside** to capture the mouse and begin.
- **W A S D** or arrow keys to walk; hold **Shift** for a brisk walk.
- Move the mouse to look around.
- Press **Esc** to release the mouse. Click the scene to resume looking.
- Press **R** or select **Reset** to return to the workshop starting point.

The route begins in the workshop, passes through its open front to the pier, then branches down a gently sloped railed ramp to the exposed beach. The shoreline and pier corridor constrain walking so the viewer cannot enter the inlet or step off the dock.

## Checks and limits

`npm run check` performs a JavaScript syntax check. `npm run build` creates the static `dist/` copy. Browser rendering, mouse-look, route traversal, visual inspection, and frame-time/performance measurements were not run in this build session.

The tide and boat are static; there is no boat physics, large coastline simulation, sound, or game progression. Lighting and reflections are intentionally lightweight, and the scene has not been visually calibrated on a target display or GPU.
