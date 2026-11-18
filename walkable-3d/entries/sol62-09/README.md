# Kestrel Station · Rotor Service Bay

SceneBench 2026-11-17, scene 09. A first-person, human-scale orbital maintenance bay built with local Three.js modules. The rotor has separate bearing and drive faces, exposed pipework and removable glass guards. Follow the marked floor aisle to the workbench alcove or take the 16-step stair to the inspection deck.

## Launch

Open PowerShell in this entry folder. With Node.js 18 or newer, run:

```powershell
node serve.mjs 41789
```

Open **http://127.0.0.1:41789/** in a desktop browser with WebGL 2. This is the suggested launch address. The server binds only to loopback. Three.js r180 is included under `vendor/`. Launch needs no install or network download. If this port is in use, supply a different port to `serve.mjs`. Stop the launcher with Ctrl+C.

## Controls

| Input | Action |
| --- | --- |
| Enter bay | Capture the mouse and start exploring |
| Mouse | Look around |
| W / A / S / D or arrow keys | Move forward, strafe left, move back, strafe right |
| Shift | Move faster |
| R or the Reset button | Return to the starting position and view |
| Esc | Release the mouse |
| Use drag-to-look | Explore with a mouse button held to look around if pointer lock is unavailable |

To follow the inspection route, circle the rotor, visit the service bench on the west side, then approach the amber rails at the front of the east aisle. Walk directly onto the treads and proceed to the rear lookout. Return by the same stairs.

## Verification and limitations

`node checks.mjs` runs bounded CPU-only syntax, import, geometry, ray and collision checks. The entry conditions reserved browser launch, visual review, interactive testing and frame-time measurement for a later session. The renderer requires desktop WebGL 2 and keyboard movement. The rotor, tools and shop controls are static props.

The procedural parts and textures are in the source modules. The vendored renderer and its license are in `vendor/`.
