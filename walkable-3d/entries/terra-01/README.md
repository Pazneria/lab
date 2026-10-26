# Holloway Halt

An explorable, procedural 3D scene of a disused woodland station. The waiting room connects the entrance path to the platform; a boarded crossing near the right end of the platform leads to a winding path in the woods.

## Launch

Requires a recent Node.js installation (Node 20.19+ or 22.12+). From this folder:

```powershell
npm install
npm run start
```

Open the **suggested launch address** http://127.0.0.1:5187/ after starting the command. No server was started during creation or verification. The production build is also in `dist/`; `npm run build` regenerates it.

## Controls

- Click **Enter the station**, then move the mouse to look around.
- **W A S D** or arrow keys: walk. **Shift**: walk faster.
- **R**: return to the entrance. **Esc**: release the mouse and pause; click the button to resume.

The scene is designed for a desktop browser with WebGL and pointer lock. Movement uses simple collision against the building, canopy posts, trees, and the scene boundary. There is no jumping or mobile control scheme. The platform height transitions automatically.

## Verification and limits

`node --check src/main.js` and `npm run build` completed successfully. No browser, visual, interactive, GPU, or performance testing was performed under the execution conditions; appearance, navigation, frame time, and cross-browser behavior remain unverified. The production build emitted Vite's advisory about the main JavaScript chunk being just over 500 kB. All textures and geometry are generated locally; the only installed runtime library is Three.js.
