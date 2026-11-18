# Marl Yard

An explorable stoneware workshop built in WebGL 2. The throwing room opens onto a covered glaze bench and a walled kiln yard. A second doorway leads from the kiln back to the throwing room.

## Launch

The scene is already built. In PowerShell, run the following command from the directory containing `index.html`.

```powershell
python -m http.server 49174 --bind 127.0.0.1
```

Suggested launch address after starting the server is **http://127.0.0.1:49174/**. Stop the server with **Ctrl+C**.

Use a current browser with WebGL 2, hardware acceleration and `DecompressionStream` support. The runtime uses local assets and requires no package installation.

## Controls

| Action | Control |
| --- | --- |
| Capture the mouse | Click the scene or **Click to explore** |
| Walk and strafe | **W A S D** |
| Walk faster | Hold **Shift** while moving |
| Look | Move the captured mouse, drag on the scene, or use the arrow keys |
| Release the mouse | **Esc** |
| Return to the entrance | **R** or the reset button |
| Show controls | **H** or **?** |
| Touch movement | Drag on the left to walk and on the right to look |

## Inspection route

Circle the central wedging bench and approach the form library on the rear wall. The right-hand opening leads to the glaze samples and preparation bench. Cross the open side of the shelter to inspect the kiln door, draw ports and chimney. Return through the sliding-door opening for the view toward the entrance.

## Build and verification

Geometry, material maps, painted motifs and lettering were authored for this entry. The runtime loads packed static geometry with baked ambient occlusion. It generates the sunlight depth map once, switches pottery detail with distance and redraws when the camera or viewport changes.

The CPU-only geometry build and material build both completed. `node verify.cjs` checked local runtime dependencies, JavaScript syntax, pack decompression, vertex and index ranges, winding, material and sign references, and a 31-segment inspection loop against 35 collision boxes. The loop included both doorways, every side of the bench, the sample board and the front and side of the kiln. Its smallest additional clearance beyond the 0.218 m player radius was 0.113 m.

The complete high-detail mesh has 563,665 triangles across 31 batches. Distance indices reduce the full scene to 274,796 triangles before visibility culling. These are asset counts. Visual verification, interactive input testing, shader compilation on a graphics device and frame-time measurement are pending the separate inspection session.

Navigation stays at standing height on the connected floors. Collision covers the workshop envelope, major fixtures, furniture and shelter posts. Small tools and foliage are decorative.

## Authoring files

`geometry.js`, `ceramics.js`, `workshop.js`, `studio.js`, `annex.js` and `courtyard.js` define the scene. `node build.cjs` regenerates `workshop.pack.js`. `python surfaces.py` regenerates `surfaces.pack.js` using NumPy. The supplied packs are ready to use.
