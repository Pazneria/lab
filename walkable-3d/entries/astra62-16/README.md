# The Crooked Quince

A first-person witch’s cottage in WebGL 2. The kitchen opens into a stillroom with a copper alembic, a handwritten herbal and a quince suspended in a brass instrument. The glazed east wall has two doorways onto the greenhouse aisle.

## Launch

Run this command from PowerShell in the entry directory.

```powershell
python -m http.server 48116 --bind 127.0.0.1
```

Open **http://127.0.0.1:48116/** in a current desktop browser with WebGL 2 and gzip DecompressionStream support. This is a suggested launch address. No server was started during the build. If using the portable ZIP, extract it into a folder and run the same command there. The packed build, lettering and texture maps are local. No package installation or build step is needed to explore.

## Controls

| Action | Input |
| --- | --- |
| Start or resume | Click **Step inside**, **Resume exploring**, or the scene |
| Walk | W A S D |
| Look | Move the mouse. Drag on the scene when pointer lock is unavailable |
| Keyboard exploration | Up / Down moves, Left / Right turns, I / K tilts the view |
| Walk briskly | Hold Shift |
| Inspect a low shelf | C toggles between standing and lowered eye height |
| Reset position and view | R or the circular-arrow button |
| See controls | H or the keyboard button |
| Release the pointer | Escape |

On touch devices, the left pad moves and a swipe on the scene turns the view.

## Inspection route

From the entrance, turn left toward the wash basin and bread board. Follow the counter past the hearth, pass beneath the timber crossbeam, and approach the north workbench. The long shelves are on your left. Cross the stillroom to the opening in the glazed wall, walk along the planting bench to the dwarf quince, and return through the second doorway beside the breakfast nook.

## Build and checks

The entry workspace contains the original procedural geometry, material generators, renderer and the complete packed build. The runtime uses spatially batched indexed meshes, mipmapped procedural surface maps, a baked occupancy volume, two static lighting maps and a separate glazing pass. Foliage uses shaped opaque geometry. Rendering resolution adjusts during sustained camera movement.

The CPU-only integrity and navigation check passed for 234,887 triangles, 293,101 packed vertices, 64 spatial batches, 14 material classes and 47 collision footprints. A 31.04-metre, 22-segment route reached all three rooms and returned to the entrance. Both greenhouse thresholds passed circle-clearance checks for the 0.358-metre player diameter.

The full entry workspace provides two optional Node commands.

```powershell
node verify.cjs
node --max-old-space-size=3072 build.cjs
```

The first checks the existing bundle. The second regenerates the two packed asset files from source and writes them to this directory. The shipped build is ready to serve.

## Verification limits

The execution conditions reserved browser launch, visual inspection, GPU shader compilation, input testing and frame-time measurement for separate judging. Those checks remain pending. Transparent surfaces use spatially sorted batches, so intersecting glass can blend approximately. Movement stays on one floor. The exterior is scenery visible through the windows.

Run identity and UTC timing are recorded in the entry workspace’s `run.json`. A SHA-256 manifest accompanies the completed entry.
