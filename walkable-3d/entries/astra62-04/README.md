# The Palm House

An explorable tropical conservatory for SceneBench scene 04. The glazed iron house measures 8.30 m across and 18.40 m long. From the open entrance, either aisle follows the raised planting bed to the sheltered potting bench. The return aisle leads back to the stone threshold.

## Launch

Run this command in PowerShell on the inspection machine.

```powershell
py -3 -m http.server 41864 --bind 127.0.0.1 --directory "C:\Users\jmore\Documents\Codex\2026-10-26\task\batch-20261117-gpt62\entrants\astra\scene-04"
```

Suggested launch address after starting the command: **http://127.0.0.1:41864/**. Stop the server with Ctrl+C in its terminal. The application and its assets are local. The build needs a modern browser with WebGL 2 and gzip DecompressionStream support.

## Controls

| Action | Input |
| --- | --- |
| Capture mouse-look | Select **Explore** or click the scene |
| Walk and strafe | W, A, S, D |
| Look | Mouse or arrow keys |
| Walk faster | Hold Shift |
| Inspect low foliage | Hold C to crouch |
| Release the pointer | Esc |
| Show the floor plan | M or **Plan** |
| Return to the threshold | R or **Reset** |

If pointer capture is unavailable, drag on the scene to look. Touch controls provide a directional pad and drag-look.

## The scene

Split Monstera blades, bird-of-paradise fans and two tree-fern crowns rise above bird’s-nest ferns, small aroids, sorrel and moss. Look beneath the crowns for fibrous trunks, drying fronds, aerial roots, litter and accession labels. The western columns carry a hand-operated roof vent mechanism. A wall tap and loose hose occupy the opposite aisle.

At the potting bay, a glazed hood shelters propagation trays, nested pots, a watering can, a trowel and twine. Outside exploration ends on the immediate entrance apron. The distant garden is a panorama.

## Implementation and checks

The application loads a packed static mesh and material arrays. Frustum culling uses 45 spatial groups. The sun shadow map is generated once on entry, and the solid foliage uses geometric silhouettes with cutouts for splits and perforations. Glass is drawn in a separate sorted pass. Scene rendering pauses when the view is stationary.

- The final mesh contains 350,402 opaque triangles and 552 glass triangles.
- JavaScript syntax checks passed. Khronos glslang statically compiled and linked the opaque, glass, shadow and sky programs.
- Both compressed assets passed structural checks for sizes, indices, material IDs, UV values and coverage of draw groups. Shadow-volume and camera-matrix checks passed.
- A static clearance check sampled a 43.07 m inspection loop at 1,089 positions using a 0.20 m walking radius. It also checked representative walls, the bench, bed and threshold boundary.
- Browser rendering, interactive use, GPU compatibility and frame times await the separate inspection session. Foliage is static. Collision represents major objects and boundaries, and allows close inspection through fine leaves.

To repeat the CPU-only asset and floor-plan checks, run `node check-build.cjs` from this folder. The geometry and material authoring sources accompany the prebuilt assets. Local Baskervville and Instrument Sans font subsets have their licenses in the entry folder.

Run identity, timing and interruption information are recorded in `run.json`. The completed entry was left with no server, browser, watcher or test process running.