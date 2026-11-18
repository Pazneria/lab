# The Lark & Latch

SceneBench 2026-11-17, scene 20. Visit Nell Finch’s roadside camp, climb the rear steps, and walk past the bunk to reach the workbench. Return down the steps and follow the canvas awning to the stall.

## Launch locally

From this folder in PowerShell, run:

```powershell
python -m http.server 18720 --bind 127.0.0.1
```

Open the suggested launch address `http://127.0.0.1:18720/` in a desktop browser with WebGL 2 hardware acceleration. The delivered folder includes the pinned Three.js dependency. If you copy the source without `node_modules`, use `npm.cmd ci --ignore-scripts` to restore it before serving the folder.

## Explore

- Click **Explore the wagon** to capture the mouse. If the browser declines pointer lock, drag the scene to look around.
- Use **WASD** or the **arrow keys** to walk. The rear steps are walkable at normal pace.
- Press **R** to return to the starting view or **Esc** to release the mouse.
- Press **Ctrl+C** in the terminal to stop the local server.

The furnishings, drawers, displayed goods, and fold-out mechanisms are static. The scene uses keyboard movement. Terrain around the inspection area ends at a walking boundary.
