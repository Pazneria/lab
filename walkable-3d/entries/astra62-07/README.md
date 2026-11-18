# Kern Museum of Form

**Mass & Interval** is a walkable, two-room WebGL 2 museum. The lower gallery holds *Bore*, a carved limestone block, and *Meniscus*, three sea-green resin casts. A 7.5 m-wide ramp rises 0.84 m over 9.4 m to *Counterfold*, a folded weathering-steel band in the sculpture hall.

## Launch

Run these commands in PowerShell. The included Node.js launcher serves the packaged build on the loopback interface. All runtime assets are local and ready to use.

```powershell
Set-Location -LiteralPath 'C:\Users\jmore\Documents\Codex\2026-10-26\task\batch-20261117-gpt62\entrants\astra\scene-07'
node .\serve.mjs --port 48707
```

**Suggested launch address** — `http://127.0.0.1:48707/`. Open that address in a desktop browser with WebGL 2, then choose **Enter museum**. Press **Ctrl+C** in the terminal to stop the launcher.

## Controls

| Input | Action |
| --- | --- |
| W / S or ↑ / ↓ | Walk forward or backward |
| A / D | Step sideways |
| Mouse | Look around |
| ← / → and Page Up / Page Down | Turn and tilt with the keyboard |
| Shift | Walk faster |
| Esc | Pause and release the mouse |
| R or the Reset button | Return to the entrance view |
| H | Hide or show the interface while walking |

When mouse capture is unavailable, hold the primary mouse button and drag to look. The arrow keys can also start a keyboard-only walk from the opening view.

## Build and checks

The sculpture meshes, architecture, material fields, lettering and daylight atlas were made for this entry. The scene contains 24,740 indexed triangles in 44 material batches. Baked diffuse lighting includes two indirect bounces and a separate solar visibility channel. The resin samples the scene behind each cast as the visitor moves.

The CPU route check sampled 1,721 positions from the entrance past both gallery works, up the ramp, through a complete 5.25 m-radius circuit of the main sculpture and back. On this route the smallest gap between the visitor's collision body and an obstacle was 0.312 m. Ramp height agreed with the floor mesh to within 0.000001 m. Direct approaches to the gallery wall, ramp wall, rear wall and rotated limestone plinth also stopped at their collision boundaries.

Both GLSL ES 3.00 shader pairs passed offline compilation and linking. Asset dimensions, mesh indices, bounds, texture coordinates, inscription coverage and JavaScript syntax were checked. To repeat the packaged asset and route checks, run `node .\build\check.mjs`.

## Inspection notes

Visual inspection, browser interaction, GPU execution and frame-time measurement are reserved for the judging session. Daylight is fixed. Resin transmission uses screen-space samples, so details outside the viewport are approximated at its edges. The 3D drawing buffer is capped at 2.45 megapixels on high-resolution displays.

The launch entry is `index.html`. Original geometry and material sources are in `world.mjs`, `shaders.mjs` and `build\`. Timing and serving-metadata disclosure are in `identity.txt`. The SHA-256 manifest identifies the launchable files and assets at handoff.
