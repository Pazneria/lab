# FIELD / Demonstration Lab

A self-contained, procedural Three.js exhibition scene with a central sensor array, an optical perception bench and a mechanical motion test rig. Scene geometry, signs and screen graphics are generated in the browser; there are no external artwork or font requests.

## Launch

Requires Node.js and npm. From this directory:

```powershell
npm install
npm run start
```

Then open the **suggested launch address** http://127.0.0.1:5197/ in a browser. No server is running as part of this delivery. `npm run build` creates a static production build in `dist/`.

## Controls

Click **Enter the lab** to capture the mouse. Move with **W A S D** or the arrow keys, look with the mouse, hold **Shift** to move faster, press **R** to reset to the entrance, and **Esc** to release the pointer. Click the scene or the entry button to capture it again.

The scene uses simple horizontal collision around the room, central instrument and main furniture. It is designed for desktop mouse and keyboard. Exhibits and displays are scenic and do not operate as scientific tools.

## Verification limits

The execution conditions for this entry prohibit launching a browser, server, visual renderer or GPU/performance test. Visual appearance, interaction and frame times therefore require separate inspection. See the final report for checks performed and timing.

## Static checks performed

- `node --check src/main.js` passed.
- `node check-layout.mjs` sampled the collision map and found connected routes from the entrance to all four sides of the array, both alcove approaches and the back wall.
- `npm run build` completed. Vite reported its advisory about the single minified JavaScript chunk exceeding 500 kB.
