# The Last Waystation

Mara Vale lives over the Kestrel Inn. Follow the hearth and its shield tea table, cross to the map alcove, and take the south doorway onto the covered balcony. Turn back from just right of the balcony doorway for a view of the bed and sitting area together.

## Launch

From this directory, run:

```powershell
python -m http.server 43117 --bind 127.0.0.1
```

Open **http://127.0.0.1:43117/** in a desktop browser with WebGL 2. This is the suggested launch address. The scene is self-contained, including the pinned Three.js runtime and its license in `vendor`.

## Controls

| Input | Action |
| --- | --- |
| Enter the room | Start walking |
| Mouse | Look around |
| WASD or arrow keys | Move |
| Shift | Walk faster |
| R or Return to entrance | Reset position and view |
| Esc | Pause and release the mouse |

If pointer lock is unavailable, hold the left mouse button and drag to look. The room is designed for a keyboard and mouse. Props are for visual inspection.

## Local source check

`npm.cmd run check` checks the syntax of the authored JavaScript. No install is needed. The browser build is served directly from these files.

