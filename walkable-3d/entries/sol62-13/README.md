# Rainline

Falken Pass is an explorable mountain tramway station. The walking route runs from the terminal and enclosed drive machinery past Cabin 01 to a covered lookout. The loading platform also wraps around the rear of the cabin.

## Launch

Use Node.js 18 or newer and run this command from the scene folder.

```powershell
node .\launch.mjs 49163
```

The suggested launch address is http://127.0.0.1:49163/. Open it in a desktop browser with WebGL 2 after starting the launcher, then choose **Enter station**. The build requires no installation, external assets or internet access. Stop the launcher with Ctrl+C.

## Walk

| Input | Action |
| --- | --- |
| Mouse | Look around after entering |
| WASD or arrow keys | Walk |
| Shift | Walk faster |
| Q / E | Turn left / right |
| R | Reset to the entrance |
| Esc | Pause and release the pointer |

If pointer lock is unavailable, drag the scene to look around. The cabin is stationary with its doors closed. Rain is represented by wet surfaces, streaked glazing and valley mist. The experience uses a keyboard and mouse.

## Checks for this entry

Node syntax checks and CPU-only geometry, route, collision and sightline checks were run. The browser, launch server, interactive controls and frame performance were left for the later judging session.
