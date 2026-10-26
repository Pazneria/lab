# Clay & Kiln

A standalone first-person ceramics workshop with a studio, sheltered glazing bay, and kiln courtyard. The scene and textures are generated in code; the local Three.js package is its only runtime dependency.

## Launch

From this directory, with Node.js installed:

```powershell
node server.mjs
```

Then open the **suggested** address `http://127.0.0.1:4177/` in a WebGL-capable desktop browser. The server binds to localhost. To choose another port, set `PORT` before launching. The installed `node_modules` directory is included in the workspace; if it is absent, run `npm install` first.

Click **Enter the workshop** to capture the mouse. Use **W A S D** or the arrow keys to move, the **mouse** to look, **Shift** to move faster, and **R** to return to the entrance. Press **Esc** to release the mouse and pause; click the button to resume.

## Checks and limitations

`node check-scene.mjs` samples a collision-free loop and checks several obstructions and movement axes. `node check-build.mjs` constructs the scene with real Three.js geometry classes and a mocked canvas/renderer, checking for finite coordinates. `node --check src/main.js` and `node --check server.mjs` check syntax. These checks do not render the scene or measure performance.

The scene has not been opened in a browser or visually inspected in this run. Mouse capture, actual graphics output, lighting, visual finish, and frame times remain unverified. Collision uses simple axis-aligned boundaries rather than exact object shapes, and there are no crafting or firing interactions. The scene is designed for desktop keyboard and mouse rather than touch.
