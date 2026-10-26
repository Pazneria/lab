# Rainline Station

A compact, walkable mountain cable-car terminal with a stationary gondola, loading platform, and covered lookout. Geometry and surface textures are generated locally; the Three.js runtime is bundled in `vendor/`.

## Launch

From this directory, run:

```powershell
python -m http.server 8769 --bind 127.0.0.1
```

Then open the **suggested launch address** <http://127.0.0.1:8769/> in a WebGL-capable desktop browser. The server is not running as part of delivery. No installation or internet connection is needed. Stop your server with Ctrl+C.

## Controls

- Click **Enter the station** to capture the mouse; move the mouse to look around.
- W/A/S/D or arrow keys move; hold Shift to move faster.
- R resets the viewpoint; Esc releases the mouse. Click the scene to capture it again.

## Scope and limitations

The cabin and cables are stationary, the mountain view is a simple modeled backdrop, and rain is suggested by surface marks and atmosphere. Collision covers the perimeter, machinery, cabin and lookout bench; it is not a full physics simulation. The scene has no touch controls. Browser interaction, visual appearance, and performance have not been tested in this execution because the supplied conditions prohibit browser and GPU testing.

The bundled Three.js distribution is licensed under the MIT license; see `vendor/THREE-LICENSE.txt`.
