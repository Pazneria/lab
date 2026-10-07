# Bay 03 — Orbital Service

A compact, first-person Three.js maintenance bay. The scene is built from procedural geometry and canvas-generated surface/label textures; it has no downloaded art assets. Three.js 0.170.0 is pinned in the import map.

## Launch

From this folder in PowerShell, start a local static file server:

```powershell
py -m http.server 4173 --bind 127.0.0.1
```

Then open **http://127.0.0.1:4173/** in a browser. This is a suggested launch address; no server is running as part of this handoff. The browser needs network access for the pinned Three.js module; the UI fonts use local system fallbacks.

## Controls

- Click **Enter Bay** to start and enable mouse look; press **Esc** to release the pointer.
- **W / A / S / D** move; arrow keys also work.
- Mouse looks around; **Shift** increases walking speed.
- **R** or **Reset Position** returns to the entrance; **H** opens/closes the controls panel.
- Follow the marked back-left stairs to the inspection deck. Walk back down the same stairs to return to the floor.

## Verification status

The browser, server, visual inspection, interactive route, GPU and frame-time checks were intentionally not run for this build. The entry rules reserve those checks for a separate session. No server, watcher, browser, or test process was started by this build.
