# Alder Halt

An explorable abandoned woodland station built for SceneBench 2026-11-17, scene 01. The approach runs through the open waiting room to the platform. Follow the platform to the boarded crossing, then take the dirt path around the eastern end of the railway and back toward the entrance.

## Launch

Run the following in PowerShell with Python 3 installed.

~~~powershell
Set-Location -LiteralPath 'C:\Users\jmore\Documents\Codex\2026-10-26\task\batch-20261117-gpt62\entrants\sol\scene-01'
python -m http.server 48161 --bind 127.0.0.1
~~~

After starting that command, use this suggested launch address. [http://127.0.0.1:48161/](http://127.0.0.1:48161/). Open it in a desktop browser with WebGL 2 and select **Enter the station**. Three.js r180 and its license are included in `vendor`. Scene assets are generated locally, so the page needs no internet connection.

## Controls

| Input | Action |
| --- | --- |
| Mouse | Look around |
| W, A, S, D or arrow keys | Walk |
| Shift | Walk faster |
| Esc | Pause and release the mouse |
| R | Reset camera and position to the entrance |
| Click and drag within the scene | Look around if pointer capture is unavailable |

The pause screen also has a reset button. Press **Ctrl+C** in the serving terminal when finished.

## Checks and limitations

Run `node verify.js` for CPU-only checks of asset assembly, geometry, walls, stairs, crossing ramps and the full walking route. The closed ticket office can be seen through its counter opening. Movement uses a desktop keyboard, and lighting is fixed at late afternoon.

Browser exploration, visual verification, GPU checks and frame-time measurement are reserved for the separate judging session. The suggested launch address was documented without starting a server.
