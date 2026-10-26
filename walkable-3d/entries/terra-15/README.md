# Mera's Rooms

A compact first-person scene about Mera, a coastal route-maker who keeps her charts, mending, and souvenirs close at hand. The bedroom connects through a walk-in wardrobe to a small study; the same route returns to the entrance.

## Launch

From this folder, run:

```powershell
npm start
```

Then open the suggested local address **http://127.0.0.1:4179/** in a WebGL-capable browser. The included `node_modules` contains Three.js; if dependencies are missing, run `npm install` first. Python 3 is required for the launch command.

Click **Enter the rooms** to capture the mouse. Use **W A S D** to move, the **mouse** to look, **Shift** to move faster, **R** to return to the entrance, and **Esc** to release the mouse. Click the scene or the entry button to capture it again.

## Verification and limits

This entry was built without launching a browser, renderer, server, or performance test, as required by the execution conditions. `node --check scene.js` checks JavaScript syntax. `node route-check.mjs` performs a coarse CPU-only reachability check of the collision layout; it is not interactive testing. The scene has procedural geometry and textures, fixed eye height, simplified collision, and no equipment interactions. Visual quality, live pointer-lock behavior, and frame time remain to be evaluated in a separate session.
