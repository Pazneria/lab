# LUMEN — Open Lab

A standalone, human-scale 3D exhibition in Three.js: a six-head optical array, a perception bench and a mechanical motion rig, connected by a continuous walkable hall. Geometry, textures, signs, diagrams and fictional screen graphics were created for this entry. No external assets or network services are needed at runtime.

## Launch this build

Node.js 22.12 or newer is required. Dependencies are already installed in the supplied workspace, and the production build is in `dist/`.

```powershell
Set-Location 'C:\Users\jmore\Documents\Codex\2026-10-06\task-25\lumen-lab'
npm.cmd run preview
```

Then open **http://127.0.0.1:5187/** yourself in a desktop browser. This is a **suggested launch address, not a running preview**. No server or browser was started during implementation. Port 5187 had no active listener at the read-only check; the launch command uses `--strictPort` and will report an error rather than silently switch ports if it is occupied later. Stop the server with **Ctrl+C**.

Alternatively, run `launch.cmd` from this directory. It starts the same preview server and does not open a browser.

If using the portable ZIP in a fresh location, install the pinned dependencies before launching:

```powershell
npm.cmd ci --no-audit --no-fund
npm.cmd run preview
```

To rebuild from the included source: `npm.cmd run build`. To run the CPU-only checks: `npm.cmd run check`. `npm.cmd start` is an optional development launch on the same port. Do not open `dist/index.html` directly with `file://`; browser ES modules need HTTP serving.

## Controls

| Input | Action |
|---|---|
| Click **Enter the lab** | Capture the mouse and begin exploring |
| Mouse | Look around |
| W A S D / arrow keys | Walk, with normalized diagonal movement |
| Shift | Walk faster |
| Esc | Release mouse, pause and show the menu |
| R / **Reset position** | Return to the entrance |
| H | Show or hide help |
| F | Show or hide live frame-interval diagnostics |
| Menu **Render detail** | Balanced, High resolution or Economy |

The instrument is straight ahead. Walk around its circular floor mark, enter the left perception bay, cross to the right motion bay, and return through either side aisle. The eye height is 1.68 m. The player uses a 0.26 m collision radius, remains on the floor, and cannot pass through the principal walls or equipment. No jump is needed.

## Contents and implementation

- A circular, freestanding optical instrument with six individually constructed camera/lens assemblies, brushed support rings, three extrusion towers, a perforated breadboard, a glass guard, an illuminated silica reference sample, service panels and routed harnesses.
- A perception bench with a rail-mounted camera, ceramic and painted geometric samples, a physical calibration board, an original radial/colour/edge display, keyboard, trackball, caliper and reference storage.
- A motion bay with twin guide rails, screw drive, bearing blocks, a two-joint arm, passive gripper, cable carrier, low guard and a separate sloped control console.
- Neutral industrial finishes, two field-note diagrams, labelled cabinets, tool cases, diffused rear glazing, ceiling fixtures, ventilation and restrained signs of use.
- Locally generated canvas textures and labels. No downloaded exhibit assets, fonts, audio, images, AI services or other runtime requests.
- Static geometry merged into **34 meshes / 150,482 triangles**. These are CPU construction counts, not performance claims. A cached 2048² shadow map, a small environment map and two modest translucent guards avoid ongoing shadow updates and refractive rendering passes.
- Balanced caps device pixel ratio at 1.5; High caps it at 2; Economy uses 1 and disables shadows. No automatic quality switching.

The F display reports recent animation-frame intervals, including mean and P95 across up to 240 frames, and renderer draw counts. It is a visitor aid, not a controlled benchmark or GPU timer. No measurements were collected during this run.

## Checks performed

- JavaScript syntax checks passed for all four source modules.
- CPU layout checks passed: spawn, ten major colliders, 360 sample points around the array, both alcoves, console access, rear hall, return to entrance and large-step anti-tunnelling.
- The layout flood fill found **5,223 connected walkable cells** on a 0.2 m grid.
- CPU geometry construction passed with a no-op canvas stub: **1,731 source meshes**, **34 resulting meshes**, **150,482 triangles**, **38 atlas labels**, finite position/UV data and nonempty bounds. This did not use a browser, canvas renderer, GPU or screenshot tool.
- `npm.cmd run build` passed using Vite's native configuration loader and produced `dist/`.

**Not performed:** browser launch, visual inspection, interactive movement tests, screenshot rendering, GPU testing, frame-rate benchmarks or server checks. Actual visual quality and runtime performance remain for the separate judging session.

## Known limitations

Desktop keyboard/mouse and WebGL 2 are required. No touch, gamepad or VR mode is implemented. Pointer lock requires the visitor's click; if an embedded preview blocks it, use the local address in a normal browser tab. Exhibits, controls and screen graphics are scenic and static. Collision is deliberately conservative and two-dimensional, with a fixed floor height; it covers major equipment rather than every small handle or cable. There is no sound. Real-time reflection, refraction, scientific simulation and functioning AI are outside the scene's scope.

Timing, interruptions, model-metadata limitations and process cleanup are recorded in `RUN-RECORD.json`. The exact assigned model variant and effort were not exposed by the execution context; no alternate models, subagents or model-backed tools were used.

## Source map

`src/scene.js` builds the room and equipment; `src/surfaces.js` produces original procedural textures, signs and diagrams; `src/movement.js` defines the collision footprint and movement resolution; `src/main.js` connects rendering, controls and the minimal visitor interface. Dependencies are pinned in `package-lock.json`. Three.js's MIT notice is included in `THIRD-PARTY-NOTICES.txt`.
