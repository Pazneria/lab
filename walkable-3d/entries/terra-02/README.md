# Rain Court

A small first-person night market built with Three.js. Four stalls face an open courtyard; the covered opening on the far wall leads to the tea counter.

## Launch

Requires Node.js 20.19+ or 22.12+ and a desktop browser with WebGL 2. From this directory in PowerShell:

```powershell
cd 'C:\Users\jmore\Documents\Codex\2026-10-26\task-3'
npm run start
```

Then open the **suggested launch address** http://127.0.0.1:5187/ in a browser. The port is strict: if it is occupied, Vite will report an error instead of silently choosing another one. If dependencies have been removed, run `npm ci` first. No server was started during this build.

## Controls

- Click the scene to capture the mouse; move the mouse to look.
- W/A/S/D or arrow keys walk. Hold Shift to move faster.
- R or **Return to entrance** resets the view and position.
- Escape releases the mouse; click the scene again to resume mouse-look.

## Implementation and checks

The scene generates its geometry and textures locally, and batches static meshes by material. Lighting pools and subtle highlights suggest wet paving; they are not dynamic reflections. Collision uses simple horizontal bounding boxes around the major structures. The experience is designed for desktop mouse and keyboard; there are no touch controls.

`npm run build` and `node --check src/main.js` passed. `node scripts/check-scene.mjs` constructed the scene and merged its geometry with a CPU-only DOM/canvas stub. `node scripts/check-route.mjs` checked grid connectivity between the entrance, each awning, the passage, the tea counter, and the return. These checks do not verify what a browser renders or how movement feels. No browser, visual, interactive, GPU or performance test was performed under this run's execution conditions.
