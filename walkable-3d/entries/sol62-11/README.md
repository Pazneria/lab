# Parallax Field Lab

SceneBench 2026-11-17 · Scene 11

A first-person instrumentation gallery with a central Spectral Array, the Perception Bench in the west alcove, and the Motion Test Cell in the east alcove. The marked floor is open on all sides of the Array. The signs above the alcove openings point back into the gallery.

## Launch

Use Node.js 18 or later and a desktop browser with WebGL 2. Three.js r180 is included under its MIT license in `vendor/`. The scene uses local files and needs no package installation after delivery.

Run this in PowerShell:

```powershell
Set-Location -LiteralPath 'C:\Users\jmore\Documents\Codex\2026-10-26\task\batch-20261117-gpt62\entrants\sol\scene-11'
node .\tools\serve.mjs 38641
```

After you start it, open the suggested launch address `http://127.0.0.1:38641/` and select **Enter lab**. The server binds to the local loopback interface. Press **Ctrl+C** in PowerShell to stop it.

## Controls

| Input | Action |
| --- | --- |
| Mouse | Look around after selecting **Enter lab** |
| WASD | Move forward, left, backward, and right |
| Shift | Walk faster |
| Up and Down arrows | Move forward and backward |
| Left and Right arrows | Turn |
| Page Up and Page Down | Look up and down |
| Esc | Pause and release the pointer |
| R or **Reset** | Return to the entrance and face the Array |

When pointer lock is unavailable, drag on the 3D view to look. The controls, displays, and mechanisms inside the exhibits are scenic. The walk uses a fixed standing eye height.

## Checks

```powershell
npm.cmd run check
```

The CPU-only check assembles the scene mesh data, checks mesh indices and coordinates, and exercises the full collision route from the entrance around the Array, through both alcoves, and back. It also checks geometric sight lines to the central sample and both station displays. Browser startup, rendered appearance, input behavior, and frame times remain for the separate inspection session.
