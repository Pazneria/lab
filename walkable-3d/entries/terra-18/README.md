# The Meridian — Captain's Quarters

A self-contained first-person 3D cabin. The route runs from the entrance alongside the sleeping berth, past the private study and on to the observation nook. All geometry and materials are generated locally; Three.js r183 is included in `vendor/` under its MIT license.

## Launch

From this folder, run:

```powershell
python -m http.server 43219 --bind 127.0.0.1
```

Then open the suggested address **http://127.0.0.1:43219/** in a WebGL-capable desktop browser. The address was not served or opened during this build. Stop the server with Ctrl+C when finished. No package installation is required.

## Controls

- Click **Enter quarters**, then move the mouse to look.
- **W/A/S/D** or arrow keys move; hold **Shift** to move faster.
- **R** resets position and view; **Esc** releases the mouse.

## Verification and limitations

`node --check src/main.js` validates JavaScript syntax. `node checks/route.mjs` samples the collision map and checks that representative points near the bed, desk, window, nook seat, and entrance are connected. These are CPU-only checks, not a browser test.

The scene has not been opened in a browser or visually verified, and no frame-time or GPU measurements were taken. Movement is desktop keyboard and pointer-lock based; touch controls are not implemented. The space vista and cabin lighting are static, and the collision model uses simplified horizontal boxes.
