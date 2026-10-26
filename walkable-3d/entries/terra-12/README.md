# Afterglow Arcade

A compact, first-person neighborhood arcade built with Three.js. The cabinets, attract screens, signs, carpet and other materials are generated locally from original procedural artwork. No game is playable.

## Run locally

Requires Node.js 20.19+ or 22.12+ (Node 24 was used for the build). From this directory:

```powershell
npm install
npm run dev
```

Open the **suggested** address http://127.0.0.1:5179/ in a browser. The server is not running as delivered. If the port is in use, stop the other service or change the port in `package.json`.

## Controls

Click the opening panel to capture the mouse. Move with WASD or arrow keys; look with the mouse. Hold Shift to move faster. Press R to reset to the entrance, and Esc to release the mouse. Click the panel again to resume.

## Verification and limitations

`node --check src/main.js` and `npm run build` passed. A CPU-only grid traversal of the collision rectangles found routes from the entrance to each cabinet front, both sides and the rear of the feature cabinet, and the counter. This is a geometric check, not interactive testing.

Per the execution conditions, no browser, server, screenshot renderer, GPU test, or frame-time benchmark was run. Appearance, pointer-lock behavior, interactive collision feel and performance remain unverified. Screens are static. Lighting is deliberately shadow-free and contact shading is approximated to limit rendering cost.
