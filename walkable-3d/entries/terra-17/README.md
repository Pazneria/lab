# Above the Wayfarer's Rest

A compact first-person room above a tavern, with a working alcove and a covered balcony. An old helmet has become a planter on the mantel.

## Launch

From this directory, run:

```powershell
npm install
npm run dev
```

Then open the **suggested** address `http://127.0.0.1:5187/`. The address is not a running preview; the server was not started during construction. Dependencies were installed in this workspace and a production build is available in `dist/`.

## Controls

Click **Enter the room** to capture the mouse. Move with WASD or arrow keys, look with the mouse, hold Shift to move faster, and press R or use the Reset position button to return to the entrance. Esc releases the mouse; click the scene to capture it again. A mouse and keyboard are required.

## Verification and limitations

`node --check src/main.js` and `npm run build` passed. A CPU-only grid search of the scene's collision rules found the entrance, living area, study and balcony mutually reachable. No browser, server, screenshot, GPU check, interactive test or performance benchmark was run. Appearance, pointer-lock behavior, and actual performance are therefore unverified. The scene uses procedural materials and unshadowed lighting to keep the geometry and rendering costs modest; it does not include NPCs or interactive props.
