# The Meridian Atelier

Explore the royal fitting room, the cloth archive and the workroom. The Winter Meridian, a ceremonial state coat for the court’s winter audience, is on its form for a second fitting. The lining, basting and provisional sleeve show which parts are still being made.

## Launch

Run this command from the scene folder with Python 3.

~~~powershell
python -m http.server 43222 --bind 127.0.0.1
~~~

Open http://127.0.0.1:43222/ in a desktop browser with WebGL 2 enabled. This is the suggested local address. The build was delivered with the server stopped.

Three.js 0.179.1 is already installed in the entry folder. For a fresh copy without node_modules, run the following command before serving.

~~~powershell
npm ci --ignore-scripts --no-audit --no-fund
~~~

## Controls

| Input | Action |
| --- | --- |
| Click Enter the atelier | Start exploring |
| Mouse | Look around |
| WASD or arrow keys | Walk and strafe |
| Shift | Walk faster |
| Q / E | Turn left or right with the keyboard |
| Esc | Release the mouse |
| R or ↺ | Return to the entrance |
| ? | Show the entry panel and controls |

If the browser declines pointer lock, drag on the scene to look around. The scene has a fixed eye height with automatic stepping onto the low fitting dais.

## Inspection route

1. Step onto the dais on the left and turn toward the freestanding mirror.
2. Cross into the archive. Inspect the loose swatches on the dye table and browse the cool and warm shelves on either side.
3. Enter the workroom. Walk around the coat to see the pinned front, short provisional sleeve and embroidered back.
4. Cross to the cutting bench. Walk around either end to inspect the tools and paper patterns from the other side.
5. Follow the signs over the arches back to the fitting room and entrance.

The mirror uses a static material. All cloth and tools are fixed in place.

## Validation

Node syntax checks passed for all JavaScript modules. A CPU-only scene assembly check verified finite geometry, index bounds, representative sightlines and collision along the inspection route. Browser rendering, interactive input and performance measurements are reserved for the separate review session.

