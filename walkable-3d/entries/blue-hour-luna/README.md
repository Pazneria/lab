# Blue Hour — Polar Field Shelter

A compact, first-person 3D scene for the browser: a wind-combed snow apron, insulated research shelter, open two-door vestibule, and a warm working/living room. Geometry and small interface textures are generated locally. The project includes Three.js 0.180.0 and its MIT license in `vendor/`; it makes no runtime asset or font downloads.

## Launch

From this folder in PowerShell, start a local static file server:

```powershell
py -m http.server 4178 --bind 127.0.0.1
```

Then open **http://127.0.0.1:4178/index.html**. This is the suggested launch address; no server is running now. If the Python launcher is unavailable, use `python -m http.server 4178 --bind 127.0.0.1` instead. Keep the server terminal open while exploring.

## Controls

- Click **Enter the Shelter**, then move the mouse to look.
- **W/A/S/D** to walk; hold **Shift** to walk slowly.
- **Escape** releases the mouse and pauses; click **Resume Walk** to continue.
- **R** or the ↺ button returns to the starting snow apron.

## Scope and verification

Lighting stays active on both sides of the doorway so the vestibule crossing has no light switch. Movement is standing-height, with wall, boundary, and large-furniture collision. There is no jumping, crouching, or interaction system. Static JavaScript syntax checks were run. Visual inspection, interactive browser testing, and frame-time measurement were not performed under this run's constraints.
