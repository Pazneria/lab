# The Old Glasshouse

A small, self-contained first-person greenhouse walk. The scene is built from procedural Three.js geometry and canvas textures. Runtime assets are local; the browser does not fetch remote fonts, scripts, models, or images.

## Run

Node.js 20 or newer is required. The preview is currently running at **http://127.0.0.1:4178**. If it stops, start it from this folder with:

```powershell
npm start -- --port 4178
```

Open **http://127.0.0.1:4178** in a desktop browser. Keep the command running while exploring. Port 4178 is the reserved preview port for this build. No `npm install` or network access is needed.

## Controls

- **W A S D** or arrow keys: walk
- **Mouse:** look around (select **Enter the glasshouse** first)
- **Shift:** slower walking pace
- **Hold C:** lower the camera to look beneath leaves and inspect stems
- **R:** reset to the entry threshold and original view
- **Esc:** pause and release the mouse; click **Resume walk** to continue

The entry and rear cross-aisles let you pass around the central bed. The potting bay opens off the rear right side. Movement slides along the bed edge and stops at walls, the raised bed, the worktable, and the small threshold apron.

See [BUILD-NOTES.md](BUILD-NOTES.md) for the timed benchmark record and verification notes.

## Scope and limitations

The sunlight and plant/steel shadows are static for this walking scene. Leaves do not sway or act as physical colliders; the bed, walls, annex boundary, workbench, and threshold edge do block movement. The live frame-time readout reflects the active browser tab while it is running.
