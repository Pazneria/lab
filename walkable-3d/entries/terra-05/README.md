# North / Field Station 04

A compact, procedurally built browser scene: snowy exterior, entry vestibule, and a research/living room. Everything visible is generated locally; the application does not fetch art assets.

## Launch

From this directory, run:

```powershell
npm install
npm run dev
```

Open the suggested address http://127.0.0.1:5186/ in a desktop browser. This address was not started or verified during implementation. The included `node_modules` and lockfile may make `npm install` unnecessary; it is included for a fresh copy. A production build can be generated with `npm run build`.

## Controls

Click **Enter the shelter** to capture the pointer. Move with **W A S D** or the arrow keys; move the mouse to look. Hold **Shift** to move faster. Press **R** to return to the starting position. Press **Esc** to release the pointer; click the button to resume.

## Verification and limitations

`node --check src/main.js`, `node scripts/check-route.mjs`, and `npm run build` were run successfully. The route check samples a walkable path and tests representative wall collisions, but it is not interactive testing. Under the execution conditions no browser, visual inspection, GPU test, server, or performance measurement was used. Appearance, live controls, shadow quality, and actual performance remain unverified. The scene is designed for desktop mouse and keyboard; it has no touch controls. The terrain and objects are stylized procedural geometry, and collision is limited to walls and larger furnishings.
