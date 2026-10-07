# Starlite Arcade: explorable 3D night arcade

A small neighbourhood arcade at night, built with three.js (r169). The scene is one main room with an open token-counter alcove.
All artwork, game names and attract-screen graphics are original and generated procedurally at load time. There are no image files.

## Launch
`index.html` is a single self-contained file. It loads three.js from the jsDelivr CDN, so it needs an internet connection the first time.

- Easiest: double-click `index.html`. Chrome and Edge run it straight from disk.
- Or serve the folder and open http://localhost:8765:
  `python -m http.server 8765`

Click the panel to capture the mouse.

## Controls
| Input | Action |
|---|---|
| Mouse | Look around |
| W A S D / arrow keys | Walk |
| Shift | Walk faster |
| C or Left Ctrl | Toggle crouch (lower eye height for inspecting control panels) |
| R | Reset to the entrance |
| F | Frame-time overlay: average and p95/max ms, draw calls, render scale |
| Q | Render scale: auto, 0.75, 1.0, 1.5, 2.0 |
| Esc | Release the mouse and show the controls panel |

## Layout (suggested inspection route)
Start at the entrance doors and walk the central aisle:
1. Bank A (left wall), "Volt-Tek" classic uprights: angular cabinets, portrait screens, 1-player ball-top stick with 3 buttons. Games: CRATER CRAWLER and NEBULA NOMADS.
2. Feature cabinet at the far end: LUNAR LIGHTHOUSE. It sits on a lit dais and has swept-back side fins, an arched chase-light marquee, a striped lighthouse tower with a rotating beacon, and a 2-player spinner console. There is a clear walkway all the way around it, including the back service panel.
3. Bank B (right wall), "Wavecrest" uprights: curved hoods with downlights, landscape screens, a wide overhanging 2-player panel with bat-top sticks and 4 buttons per player. Games: TIDEPOOL TANGO and KITE KNIGHTS.
4. Counter alcove (right side, near the door): token counter, glass prize case, register, token dispenser, change machine, prize shelves and stools.
5. Return to the entrance and look back at the room, the doors and the street outside.

## Performance notes
- Static geometry is merged by material at load (about 40–130 draw calls depending on view).
- Screens are procedural GLSL shaders, so no textures are re-uploaded per frame. Scanlines and pixel quantisation fade out with distance to avoid shimmer.
- Large room surfaces use Lambert shading. Cabinets use PBR materials with a small custom reflection environment.
- Auto render scale is on by default. It starts at full sharpness (up to 1.5× device pixels) and steps resolution down only if frames run long, then never climbs back above a level that proved too slow. Press Q to pin a fixed scale for measurements.
- Measured on this machine's Intel integrated GPU at 1920×1080 output: about 4–7 ms per frame of GPU render time.

## Known limitations
- Needs the CDN for three.js. It will not load fully offline.
- Games are attract loops only (not playable). Doors and props are not interactive.
- No real-time shadows. Contact shadows are soft decals, and screen and neon glow is approximated with a few lights plus additive glow planes.
- The two cabinets in each bank share one screen-glow light to keep per-pixel lighting cheap.
- Pointer lock needs a click. If the browser refuses it, click-and-drag also turns the camera.
