# Limestone Hollow

A first-person walk through an underground limestone pool chamber. Everything needed for the scene, including Three.js, is local to this folder. No package installation is required.

## Launch later

From this directory, run:

```powershell
python -m http.server 8297 --bind 127.0.0.1
```

Then visit the **suggested** address `http://127.0.0.1:8297/`. The server was not started during this build. Use Ctrl+C in the terminal to stop it. Any comparable static HTTP server can serve this folder; opening `index.html` directly as a file may be blocked by browser module security.

## Controls

- Click the scene or the controls panel to capture the mouse; move the mouse to look around.
- W, A, S, D or the arrow keys move; hold Shift for a faster walk.
- R returns to the entrance. Escape releases the mouse. The Reset and Controls buttons are also available.

The dry route runs to the right of the pool, beneath the arch, and up to the landing. Water, enclosure walls and major flowstone formations block movement.

## Checks and limitations

`node --check src/main.js` checks JavaScript syntax. `node check-route.mjs` checks the actual movement predicates along a sampled route, tests several barriers, and checks the arch geometry on the CPU. These checks are not a substitute for browser testing.

The scene was not opened in a browser, rendered, interactively tested, or benchmarked during this build, as required by the execution conditions. Visual quality, controls in a real browser, and performance remain unverified. The water uses a simple translucent shader; it is not a fluid simulation. Mouse-look requires browser pointer-lock support, and there are no touch controls.

Three.js r165 is included under the MIT license; see `vendor/THREE-LICENSE.txt`.
