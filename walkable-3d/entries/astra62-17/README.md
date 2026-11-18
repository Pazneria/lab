# The Thaw Room

Elin Vale's home above the Copper Ibex looks out over the Vesper Range. Her old field sledge now holds the teapot, the survey desk still sees use, and the retired travelling chest sits under the window with the darning basket on its lid.

## Launch

The browser build is complete in this directory. All scripts, images, geometry descriptions, typefaces used by the interface and the Three.js runtime are local or system-provided. No installation or network connection is needed.

From this directory, run the following command in PowerShell.

```powershell
python -m http.server 48173 --bind 127.0.0.1
```

The suggested launch address is `http://127.0.0.1:48173/`. The package ships with the server stopped. Press Ctrl+C in the terminal to stop a server you start.

## Controls

| Action | Input |
| --- | --- |
| Capture the mouse | Click the scene or **Click to explore** |
| Look around | Move the mouse |
| Walk and sidestep | W A S D |
| Walk faster | Hold Shift |
| Keyboard-only walking and turning | Up / Down and Left / Right arrows |
| Inspect a keepsake | Aim at it and press E when its label appears |
| Close an inspection | E or walk away |
| Release the mouse | Esc |
| Return to the entrance | R or the Reset button |

Click and drag to look if the browser declines pointer lock. The camera follows the system preference for reduced motion.

## Walk through the room

From the stair door, walk onto the patterned rug to examine the ash runners and survey stencil beneath the tea things. Pass the foot of the bed and go through the wide timber opening to the map desk. Take the narrow door on the right onto the gallery. Follow the carved railing to the far doorway, then turn back toward the reading chair, bed and hearth.

The balcony is enclosed by its rail and end walls or rails. The distant mountain scenery is outside the playable floor. The scene is designed for desktop WebGL with a keyboard and mouse.

## Build and verification

The original geometry, illustrations, fabric patterns, surface maps and sky were made for this entry. Static material batches, baked local occlusion and a fixed sun shadow map limit repeated rendering work. The frame loop caps its drawing buffer at approximately 2.07 million pixels.

In the source workspace, `node check.cjs` checks JavaScript syntax, referenced files, material image payloads, finite mesh attributes, valid indices, control element IDs, shading-data lengths and connected floor clearance. It checks each of the six inspection-route legs on a 9 cm grid using the player radius of 0.202 m. This checker constructs geometry on the CPU and supplies an inert drawing context for the illustration recipes.

These checks passed. Browser launch, visual inspection, input testing, GPU testing and frame-time measurements were reserved for the separate judging session. The original build's timestamps, execution conditions and checksum manifest accompany the source workspace.

The browser runtime is Three.js 0.160.1. Its MIT license is included in `package/LICENSE`.

