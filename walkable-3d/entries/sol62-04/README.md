# The Fern House

Explore an overgrown iron glasshouse on a loop from the entrance, down either aisle, past the potting bench, and back up the other side. The central bed contains split-leaf monstera, elephant ears, taller bananas, a fan palm, and tree ferns. Both aisles offer approaches to inspect the plants at eye level and from below.

## Launch

From this directory, or from the root of the extracted archive, run:

```powershell
node serve.mjs 46174
```

The suggested address is [http://127.0.0.1:46174/](http://127.0.0.1:46174/). Open it in a current desktop browser with WebGL 2 and click **Enter the greenhouse**. The launcher binds only to this computer. Node.js and the browser are the only runtime requirements. The archive includes the pinned Three.js browser modules for offline launch.

## Controls

| Input | Action |
| --- | --- |
| W, A, S, D or arrow keys | Walk |
| Mouse | Look |
| Hold C | Crouch to inspect foliage and labels |
| R | Reset position and view to the entrance |
| Esc | Release the mouse and show the controls |

If the browser declines pointer lock, click and drag to look. Keyboard movement and reset still work.

## Verification

`npm.cmd run check` runs JavaScript syntax checks, checks authored mesh data and local module paths, and exercises the collision loop in both directions. It also checks foliage clearance at standing and crouched height along both aisle centerlines. Texture construction is checked against a stub. Browser rendering, hands-on controls, and frame times are reserved for the inspection session.
