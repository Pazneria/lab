# Lark Glacier Field Station

P–04 is a walkable polar field shelter at blue twilight. Follow the boot tracks across the snow, circle the entrance, and take the ramp through the vestibule into the lab and quarters. The shelter's east side and rear service wall are accessible after you return to the snow.

## Launch

Use a WebGL 2 browser and Node.js 18 or later. Run this command from the folder containing this README.

```powershell
node serve.mjs --port 41805
```

Open the suggested launch address [http://127.0.0.1:41805/](http://127.0.0.1:41805/) after running the command. Click **Enter scene**. The server binds to the loopback interface, and the scene uses the bundled Three.js modules. Press Ctrl+C in the terminal when finished.

| Control | Action |
| --- | --- |
| W, A, S, D or arrow keys | Walk and strafe |
| Mouse | Look around |
| Shift | Walk faster |
| R | Reset to the starting viewpoint |
| Esc | Pause and release the pointer |

If pointer lock is unavailable, hold the primary mouse button and drag to look. On touch devices, use the left stick to walk, drag the scene to look, and use the Pause and Reset buttons.

## Checks and limits

`node checks.mjs` runs syntax checks, CPU-side navigation checks, and mesh and floor-clearance checks. It requires no server or browser.

The doors are fixed open and the walking area ends in the snowfield surrounding the shelter. Scene geometry, textures, signage, and lettering are generated locally. Three.js 0.180.0 is included under its license in `vendor/LICENSE`.
