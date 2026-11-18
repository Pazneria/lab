# Ashcombe Reading Room

A hillside library with a double-height reading room, a window alcove, and a timber stair to two connected gallery overlooks.

## Launch the production build

From the scene directory, run this command in PowerShell.

```powershell
python -m http.server 5186 --bind 127.0.0.1 --directory dist
```

Then open [http://127.0.0.1:5186/](http://127.0.0.1:5186/) in a desktop browser with WebGL 2. This is the suggested launch address. Stop the server with Ctrl+C when finished. The production build can run offline once served.

## Controls

| Control | Action |
| --- | --- |
| **Enter the library** | Capture the pointer and start exploring |
| **Mouse** | Look around |
| **WASD** or **arrow keys** | Walk |
| **Shift** | Walk faster |
| **Esc** | Pause and release the pointer |
| **R** | Reset to the starting position and view |

If pointer capture is unavailable, drag with the primary mouse button to look around. Keyboard walking still works.

From the entrance, the lower wall stacks are beneath the gallery. The alcove opens off the west wall. Approach the staircase from the central room, then turn onto either arm of the upper gallery at the landing. Return by the same staircase.

## Rebuild

```powershell
npm.cmd ci --ignore-scripts --no-audit --no-fund
npm.cmd run build -- --base ./
```

The scene uses procedural geometry and textures, fixed late-afternoon light, and collision around the main architectural elements and furniture. Exploration is indoors with a fixed eye height. The hillside is visible through the windows.

## Verification

The production bundle, JavaScript syntax, and a CPU-only audit of geometry data and route connectivity were checked locally. Visual inspection, interactive browser testing, and frame-time judging are reserved for the separate review session.
