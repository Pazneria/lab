# Tern Inlet Boatworks

A self-contained WebGL 2 walking scene. All geometry, painted lettering and surface materials are local to the supplied `index.html`.

## Launch

Open `index.html` directly in a current browser with WebGL 2 and DecompressionStream support. For a localhost launch, run the following command in PowerShell and then open the suggested address.

```powershell
python -m http.server 48308 --bind 127.0.0.1 --directory "C:\Users\jmore\Documents\Codex\2026-10-26\task\batch-20261117-gpt62\entrants\astra\scene-08"
```

Suggested launch address is `http://127.0.0.1:48308/`. The build session left this port idle.

## Walk

Select **Enter the inlet**. The starting point is on the shingle beside Wren. Walk around the bow to the foot of the railed gangway, then uphill to the open workshop door. The loading apron connects the workshop and the mooring pier. The same gangway returns to the exposed beach on either side of the boat.

| Input | Action |
| --- | --- |
| W, A, S, D | Walk forward, sidestep or back up |
| Mouse | Look around |
| Drag the view | Look when pointer capture is unavailable |
| ↑ and ↓ | Walk forward and back |
| ← and → | Turn |
| Shift | Walk faster |
| Esc | Release the mouse |
| H | Show controls |
| R or Reset | Return to the starting view |

On touchscreens, drag the movement pad to walk and drag the scene to look.

## Build and checks

The geometry and the sixteen material layers were generated for this entry. Surface wear, hull planking, tide staff, tool fittings and beach details are included in the packaged asset data. The renderer uses mipmapped material layers, static sun shadows, spatial culling and a simplified mesh for low-resolution water reflections.

The CPU checks parsed the source and packaged JavaScript, validated compressed geometry and material data, and checked the full shore–workshop–pier circuit. The navigation checks covered 27 waypoints and 10 collision cases. All six GLSL ES shader pairs passed offline parsing and linking with Khronos glslang 11.7.0. Run `node verify.cjs` in this directory to repeat the source, asset and navigation checks.

Visual inspection, live input testing and frame-time measurement are pending the separate judging session. The boat and tide are fixed. Collision covers the route, building, furnishings and hull. Small tools, shells and loose lines are decorative.

Run identity, timestamps and the verified SHA-256 of the original HTML are recorded in `RUN.json`.
