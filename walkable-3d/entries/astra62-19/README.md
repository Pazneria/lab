# Nacre House

A first-person WebGL 2 scene set in a researcher's apartment on the Pelagia Shelf, 186 metres below the surface.

The entrance opens onto a berth, a reading chair and a galley. Pass through the first bulkhead to reach the specimen bench. The next bulkhead leads to the observation room. The glazing sits roughly 59 centimetres behind the forward face of the retaining flange. Turn back through the two openings to return to the entrance.

## Launch

All runtime assets are included. From this directory, run the following command in PowerShell.

```powershell
python -m http.server 57119 --bind 127.0.0.1
```

**Suggested launch address** · `http://127.0.0.1:57119/`

Open the address in a desktop browser with WebGL 2 and gzip DecompressionStream support. Select **Explore the habitat**, or click the scene. Stop the local server with **Ctrl+C** in its terminal.

## Controls

| Input | Action |
| --- | --- |
| W / A / S / D | Walk forward, left, backward and right |
| Mouse | Look around after clicking the scene |
| Hold and drag | Look when the browser does not grant mouse capture |
| Arrow keys | Turn left or right and look up or down |
| Hold Shift | Walk slowly for close inspection |
| R or ↺ | Return to the entrance and restore the opening view |
| H or ? | Show or hide the controls |
| Esc | Release the mouse |

Movement uses a 45-centimetre-diameter footprint, a fixed eye height of 1.61 metres and sliding collision against the hull, partitions and major furnishings.

## Build and verification

The apartment, instruments, reef, illustrations and material textures were made for this entry. The runtime uses native WebGL 2. Practical-light shading and contact occlusion are baked into the mesh. The renderer clips more distant rooms to their openings and draws the window and specimen glass in a separate pass.

The included CPU check runs with Node.js.

```powershell
node check.mjs
```

It checks JavaScript syntax, local asset references, packed buffer lengths, vertex and index validity, material and illustration coverage, route connectivity and selected collision boundaries. The completed bake contains 290,540 vertices and 335,022 triangles in eight draw batches.

The run conditions reserved browser launch, visual verification, interactive movement checks and frame-time measurement for the separate judging session. Desktop keyboard and mouse are the intended input devices.

The editable scene generators are included. To regenerate the packed assets while preserving the original entry, run `node --max-old-space-size=3072 bake.mjs` in a separate copy of the directory.

