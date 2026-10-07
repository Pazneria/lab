# The Reedway Rooms

A compact, first-person 3D character study of Mara Quill, a marshland ferry courier and pathfinder. The entrance opens onto her bedroom; a broad opening leads through a step-in wardrobe to a map study. The maps, route tokens, work clothes, parcels, breakfast things and keepsakes all belong to the same home.

## Launch

From this folder, run:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173/` in a WebGL-capable browser. This is a suggested launch address; the server is not running. The project includes Three.js 0.180.0 locally, so it does not fetch runtime assets from a CDN. If you use npm, `package.json` pins the same version.

## Controls

- Click **Walk the rooms** to enter and capture the mouse.
- **W A S D** or arrow keys move; **mouse** looks around.
- Hold **Shift** for slower steps.
- **R** returns to the entrance and resets the view.
- **Esc** releases the mouse and shows the entry panel again.

## Checks and limits

The inline JavaScript passed `node --check`, and the referenced Three.js module is present. No browser, server, screenshot, interactive walk-through, GPU check or performance benchmark was run. Visual correctness, movement feel and frame time remain for the separate inspection session. The scene uses an open ceiling, stylized low-poly furniture and simplified collision proxies; small keepsakes are decorative rather than interactive.
