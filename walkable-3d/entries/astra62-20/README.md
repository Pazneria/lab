# The Gilded Hem

Iris Vale carries a haberdashery in a barrel-roofed wagon. The steps at the west end lead past her quilted berth and drop-leaf writing desk. Beyond the stove, the cutting bench faces a lower fold-out counter. The striped awning shelters customers on the ground.

## Launch

From the directory containing this README and `index.html`, run the following command with Python 3.

```powershell
python -m http.server 46220 --bind 127.0.0.1
```

The suggested launch address is **http://127.0.0.1:46220/**. Open it in a desktop browser with WebGL support. The release includes Three.js and all scene assets. Press Ctrl+C in the terminal to stop the server after inspection.

## Controls

| Input | Action |
| --- | --- |
| Click the scene | Capture the mouse |
| Move the mouse | Look around |
| W / A / S / D | Walk forward, left, back and right |
| Shift | Walk faster |
| Esc | Release the cursor |
| Drag with the primary mouse button | Look with the cursor free |
| Up / Down arrows | Walk forward or back |
| Left / Right arrows | Turn |
| Page Up / Page Down | Look up or down |
| R or Reset | Return to the starting position and view |
| H | Hide or show the title and controls |
| ? | Show the control guide |

## Inspection

Walk around the foot of the steps to approach their lowest tread from the west. Inside, the berth has trundle drawers, tied curtains and a wren sewn from shop scraps. The folding desk sits opposite the bed. The workroom has a hand-cranked machine, dyestuff jars, folded goods, upright bolts and a narrow packing shelf. From camp, look under the public counter to see its pinned stays and up at the front spar to see how the sign and valance hang.

The mechanisms, wares, camp and sunlight are static. Movement uses a circular player footprint, solid boundaries around the large fixtures, and stepped floor heights. Small props, fabric fringes and guy lines have simplified collision. The walkable boundary encloses the immediate camp.

## Build and checks

The browser loads precomputed indexed meshes, local texture images and a small scene manifest. Static geometry is grouped by material and area. Sun shadows refresh at load or graphics-context restoration. Camera movement and resizing trigger redraws.

The CPU asset build and JavaScript syntax checks passed. Static checks validated buffer ranges, attributes, texture files and local module references. A 17-waypoint route crossed five 18 cm rises, reached the bench and returned to the public counter. Eleven support samples checked the navigation heights against the actual baked triangles. Six obstruction checks covered walls, cabinetry and the counter.

Browser launch, visual inspection, interactive input testing, GPU testing and frame-time measurements are reserved for the separate judging session.

Three.js 0.160.1 is distributed with its license in the `package` directory. The scene geometry, lettering, printed patterns, textures and terrain were authored for this entry.