# The Quiet Meridian

A compact private suite for Captain Sera Vale. The berth and fitted wardrobe lead into her watch and navigation study. A window bay opens onto Pelagic, a banded survey world. The walk deck connects all three rooms.

## Launch the packaged scene

Run this command in PowerShell from the scene folder. The local server is for your later viewing session.

```powershell
python -m http.server 48118 --bind 127.0.0.1 --directory dist
```

Suggested launch address: `http://127.0.0.1:48118/`. The packaged scene is in `dist` and includes Three.js plus the planet texture. It requires a desktop browser with WebGL 2.

## Walk the quarters

- Select **Explore quarters** or click the scene to capture the mouse. Move the mouse to look. Drag the scene to look when the cursor is free.
- **W A S D** walk and strafe. **Shift** quickens your pace.
- **Up / Down** walk forward and backward. **Left / Right** turn.
- **Esc** releases the mouse. **R** or **Reset** returns to the entrance. **H** shows or hides the controls.

The berth, task chair and settee are fixed furnishings. Displays and cabin controls are static scenery. Movement uses a standing eye line and keyboard input.

## Rebuild and check

```powershell
npm.cmd ci --ignore-scripts --no-audit --no-fund
npm.cmd run build
npm.cmd run check
```

The checker uses Node and CPU-side geometry only. It checks module syntax, packaged files, scene geometry, collision, and sightlines to the viewport, planet, study and bedroom. Browser rendering, interactive controls and frame timing are reserved for the separate judging session.
