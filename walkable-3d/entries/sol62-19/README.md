# Nereid · Berth 04

A walkable research berth on the East Sable Shelf. Start at the sealed entry hatch, pass the sleeping berth and settee, then follow the bulkhead signs through the wet lab to the observation bay. The return route uses the same two doorways.

## Launch

From this directory, run:

    npm.cmd run preview

Then open **http://127.0.0.1:43197/** in a desktop browser with WebGL 2. This is the suggested local address. The build has no remote asset requests.

The production bundle is in **dist/**. If dependencies need to be restored or the source has been edited, run **npm.cmd ci** and **npm.cmd run build** before previewing. Any local static file server can also serve **dist/**.

## Controls

| Input | Action |
|---|---|
| Enter the berth | Start exploring and capture the mouse |
| Mouse | Look around |
| W, A, S, D or arrow keys | Walk and strafe |
| Shift | Walk faster |
| R | Reset to the entrance |
| Esc | Release the mouse and pause |

If the browser blocks pointer lock, click and drag on the scene to look. The pause panel also has a reset button.

## Scope

The instruments, hatch and furnishings are set dressing. The reef uses procedural geometry and gentle scripted drift. Movement follows the deck with collision around the walls, bulkheads, viewport and major furniture.

This build was checked with JavaScript syntax validation, a production bundle build and CPU-only scene assembly, aperture ray and collision checks. Browser rendering, interactive controls and frame times are for the separate evaluation session.
