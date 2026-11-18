# Lantern Court · After the Rain

A first-person night market built with Three.js. The courtyard opens onto the Orchard fruit stall, Miso Ember charcoal grill, Blue Door noodle stall and Salt & Spice provisions cart. The stone arch on the north side leads through a covered passage to the Still Water tea counter.

## Launch locally

Run this command in PowerShell from the directory containing `index.html`.

```powershell
py -3 -m http.server 43182 --bind 127.0.0.1
```

Open `http://127.0.0.1:43182/` in a current desktop browser with WebGL 2 enabled. This is the suggested local address. A server must be running from this folder to load the JavaScript modules. Press **Ctrl+C** in the terminal when finished.

The entry includes the pinned Three.js dependency in `node_modules`. If that folder is absent from a copy, run `npm ci --ignore-scripts --no-audit --no-fund` before launch. Everything the page uses is served locally.

## Controls

| Input | Action |
| --- | --- |
| Enter the market | Start exploring |
| W / A / S / D | Walk |
| Mouse | Look around |
| Click and drag | Look if pointer lock is unavailable |
| Arrow keys | Look using the keyboard |
| Shift | Walk faster |
| R or Reset | Return to the entrance |
| Esc | Release the mouse and open controls |

The movement controls require a keyboard. The damp paving uses rough material reflections and scattered highlights. It has no mirror or water simulation.

## Checks

Run `npm run check` to parse the scene's JavaScript modules. The build session used only CPU-side checks. Visual inspection, browser interaction and frame-time measurement are reserved for the separate judging session.
