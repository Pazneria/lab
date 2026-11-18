# Kestrel Orbital Works · Bay 09

A walkable helium-recirculator maintenance bay on Deck C. The central machine has five exposed compressor stages, an intake impeller and a partial curved guard. Its removed upper casing rests on a wheeled cradle. The open tool crib has a vise, hand tools, a hose reel, loose bearings and a printed section drawing. The rear inspection gallery overlooks the assembly and a cratered satellite beyond the pressure windows.

## Launch

Use a desktop browser with WebGL 2 and a mouse and keyboard. The archive includes the runtime, geometry, textures and library files. Extract it into a folder before launching. From that folder, run this command in PowerShell.

```powershell
py -3 -m http.server 49109 --bind 127.0.0.1
```

Suggested launch address: **http://127.0.0.1:49109/**. The build session left the server stopped. Press Ctrl+C in the server terminal when finished.

To serve the original workspace from any directory, use the following command.

```powershell
py -3 -m http.server 49109 --bind 127.0.0.1 --directory "C:\Users\jmore\Documents\Codex\2026-10-26\task\batch-20261117-gpt62\entrants\astra\scene-09"
```

## Controls

| Action | Input |
| --- | --- |
| Enter mouse-look | Click **Explore bay** or the 3D view |
| Walk and strafe | W, A, S, D |
| Look around | Move the mouse |
| Walk faster | Hold Shift |
| Release the mouse | Esc |
| Reset to the opening view | R or **Reset** |
| Open or close controls | H or **Controls** |
| Keyboard navigation | Up / Down move, Left / Right turn, Page Up / Page Down look vertically |

Dragging the view also turns the camera when pointer lock is unavailable. Walk normally onto the stairs to change levels.

## Inspection route

Circle the machine on the main deck, enter the tool crib on the east side, then cross to the straight staircase on the west side. Its 16 treads lead to the rear gallery. The landing has a level return path to the same stairs. The upper eye height is 4.155 metres above the main floor.

## Construction and checks

The browser loads prebuilt indexed geometry, a baked lighting volume, an HDR reflection map and original surface textures. Static meshes share material batches. The renderer caps the pixel budget, builds the directional shadow map once and redraws when the camera or viewport changes. The machinery is parked for inspection.

The final geometry pack contains 220,520 triangles and 289,413 vertices in 49 batches. The star field, satellite sphere, printed markings and contact-shadow planes are additional scene objects. These are asset counts.

The CPU-only checks covered JavaScript syntax, the runtime import graph, HTML control references, packed geometry and index bounds, normal lengths, texture dimensions, shader includes and collision math. The route check followed a full circuit, entered the service alcove, traversed each 0.32-metre tread and 0.1575-metre rise, crossed the gallery and descended to the floor. Additional checks covered the lower passage, gallery rail, machine base, closed wall, workbench and reset pose.

Four representative custom material pairs also passed standalone GLSL ES 3.00 compilation and stage linking with glslang 11.7.0. The checker used a macro alias for Three.js's unused `average` helper because that validator treats the name as reserved. The shipped shaders use the original Three.js chunk.

Browser launch, visual review, interactive walking and GPU/frame-time measurements are deferred to the separate judging session. Collision uses a walking capsule footprint and simplified boxes for major obstructions. Individual tools and cables do not have individual collision meshes. The controls are designed for desktop input.

## Source and integrity

The portable archive includes the authored geometry and material sources. With Node.js installed, `node verify.mjs` repeats the static integrity and route checks. The optional rebuild commands are `node surface-assets.mjs` and `node build.mjs`. Use a copy for rebuilding if retaining the original entry bytes.

`MANIFEST.sha256` identifies the archived files. The adjacent completion receipt in the original workspace records the archive digest, timing, serving-metadata availability and process cleanup. `run-start.json` records the implementation start and deadline.

Three.js 0.180.0 and the fflate 0.8.2 compatibility fallback are bundled in `vendor` with their MIT licenses. The station geometry, equipment, markings, lighting data, floor wear and satellite surface were authored for this entry.

