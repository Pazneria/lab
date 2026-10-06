# The Asterion

A small, walkable desert observatory made from procedural Three.js geometry and canvas textures. It includes a roofed south passage with four shallow steps, a circular instrument chamber with an open crown sector, and an east-facing terrace with a low stone safety wall. No remote assets or services are required.

## Launch

Node.js 18 or newer is required. From this folder, run:

```powershell
npm start
```

Open **http://127.0.0.1:4178**. The included `node_modules/three` copy is Three.js 0.185.1. If port 4178 is already in use, set another `PORT` before running `npm start`.

The local server started for this preview is bound to `127.0.0.1:4178`.

## Controls

- Click **Enter the observatory** to capture the mouse.
- **W/A/S/D** to walk, **mouse** to look, **Shift** to stride.
- **R** or **Reset view** to return to the entrance.
- **Esc** releases the mouse; click the entry card to resume.

The walking route runs from the south approach through the passage and chamber, then east through the second arch to the lookout. A simple collision map protects the chamber wall, passage sides, central instrument, terrace parapets, and plateau edge.

## Verification

`npm test` runs ten checks covering a sampled end-to-end route, both portals, room and terrace boundaries, circular instrument clearance, shallow steps and terrain following, pointer-lock/mouse-look and keyboard/reset wiring, and scene-graph construction. The scene-construction check uses the real Three.js objects with a renderer stub; it does not assert raster output or frame rate.

The HTTP smoke check returned **200** for the page, scene modules, and local Three.js module. JavaScript syntax checks passed.

## Build record

- Model family reported by the execution environment: **GPT-6**. It did not expose a more specific model identifier or reasoning-effort setting.
- First implementation: **2026-10-06 03:20:29 UTC**.
- One-hour deadline: **2026-10-06 04:20:29 UTC**.
- Actual stop time: 2026-10-06 04:10:38 UTC.

## Limitations

I could not verify the rendered image or in-browser frame behavior in this execution environment. The in-app preview browser was unavailable, and the installed headless Chrome 154 GPU process terminated with an illegal-instruction exit before producing a screenshot. I did not bring the user’s Chrome window to the foreground. The build is served locally for direct WebGL inspection; no FPS claim is made.
