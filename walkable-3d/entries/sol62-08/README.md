# Low Water

A first-person 3D scene at Tideway Boatworks, a timber repair shop beside a tidal inlet. The shore steps link the working pier and workshop apron to the exposed beach. A clinker dinghy named Wren rests on wooden chocks beside the steps.

## Launch

Run these commands in PowerShell.

```powershell
Set-Location -LiteralPath 'C:\Users\jmore\Documents\Codex\2026-10-26\task\batch-20261117-gpt62\entrants\sol\scene-08'
py -3 -m http.server 43808 --bind 127.0.0.1
```

Once the server starts, open [the suggested local address](http://127.0.0.1:43808/) in a desktop browser with WebGL 2. The scene uses the included Three.js modules and generates its own textures, so it can run offline. Press Ctrl+C in PowerShell to stop the server after exploring.

## Controls

| Action | Input |
| --- | --- |
| Start or resume | Click **Explore** |
| Walk or sidestep | W, A, S, D or the arrow keys |
| Look around | Mouse, with click-and-drag as a fallback |
| Turn using the keyboard | Q or E |
| Walk faster | Hold Shift |
| Release the mouse or open the menu | Esc |
| Return to the opening view | R or **Reset** |

## Inspection route

Start at the outer landing and follow the pier toward the workshop. Enter through the open double doors. After inspecting the room and pier end, return to the apron and follow the shore sign to the handrailed steps. The exposed shore provides a route around the dinghy, with the widest clearance on its landward side. Return up the same steps.

## Limits and checks

The tide stays fixed. Water ripples and reflected silhouettes are procedural. The dinghy is a stationary inspection prop, and walking requires a keyboard. Deck edges, stairs, major furniture, walls, the hull, and larger rocks affect walking. The service ladder is scenery.

CPU-only checks covered JavaScript syntax, assembly of mesh data, and sampled collision routes through the workshop, pier, stairs, and beach. Browser rendering, shader compilation, interactive controls, and frame times remain to be checked in the separate inspection session.
