# Isobar 05

A first-person WebGL 2 scene set at Karstfjell Polar Field Station during blue twilight. Follow the tracks to the grated stairs and cross the vestibule into the laboratory. The rear workbench holds a binocular microscope, ice cores, a field book and a data logger. A berth and a small galley occupy the side walls.

## Launch

Use a desktop browser with WebGL 2 and hardware acceleration. All scene geometry, materials, labels and controls are local. The build requires no package installation.

From the folder containing index.html, run this command in PowerShell.

```powershell
python -m http.server 48185 --bind 127.0.0.1
```

Then open the suggested launch address `http://127.0.0.1:48185/`. Use Ctrl+C in the serving terminal to stop it.

## Controls

| Input | Action |
| --- | --- |
| Click **Explore station** or click the scene | Capture the mouse |
| W / A / S / D | Walk forward / left / backward / right |
| Mouse | Look around |
| Left / right arrows | Turn |
| Up / down arrows | Look up or down |
| Shift | Walk slowly |
| R or the reset button | Return to the starting position on the snow |
| H or the question-mark button | Show controls |
| Esc | Release the mouse |

Dragging the scene provides mouse-look when pointer capture is unavailable. The walking area includes the snow around the station, the entry stairs, the vestibule and the main room. Equipment, doors and ladders are fixed scenery.

## Build checks

CPU checks covered JavaScript syntax, local resource references, shader source and stage linking, texture-atlas bounds, mesh indices and terrain-culling bounds. Static clearance and floor-elevation checks sampled 1,491 positions along an exterior-to-interior return route. The largest upward step on that route was 0.195 m.

Visual inspection, browser interaction, GPU execution and frame-time measurements are reserved for the benchmark inspection.
