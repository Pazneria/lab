# Meridian House

SceneBench 2026-11-17, scene 03

A first-person desert observatory with a shaded barrel-vaulted entrance, a round telescope chamber, and a viewing terrace overlooking a sandstone basin.

## Launch

From this directory, run the following with Node.js 18 or newer.

```powershell
node launch.mjs --port 41739
```

Open `http://127.0.0.1:41739/` in a desktop browser with WebGL 2 and hardware acceleration. This is the suggested local launch address. The runtime and assets are bundled here, so launch requires no package installation or external requests.

## Controls

- Select **Enter observatory** to capture the mouse.
- Move the mouse to look. If mouse capture is unavailable, drag the view.
- Walk with **WASD** or the arrow keys. Hold **Shift** for a quicker walk.
- Press **Esc** to release the mouse. Press **R** or select **Reset** to return to the approach.

Follow the passage to the telescope, circle its pedestal, then take the east arch to the terrace. The parapet bounds the walkable edge overlooking the basin.

## Checks and limitations

Run `npm.cmd run check` on Windows for syntax and CPU-only checks. The checks cover walking and collision geometry, steps and floors, arch sightlines, the dome aperture, mesh attributes, and local browser imports.

The build is designed for desktop keyboard and mouse. The telescope is a stationary exhibit. Browser rendering, interactive exploration, and frame-time measurement are reserved for the separate evaluation session.

Three.js r180 is bundled under its MIT license in `vendor/LICENSE`.
