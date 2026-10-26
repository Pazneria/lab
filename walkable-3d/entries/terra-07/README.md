# Still Forms

A compact first-person museum built with Three.js. The two galleries are linked by a 5 m ramp rising 0.4 m. Three original forms are constructed from bronze-like folded plates, pale stone, and translucent resin.

## Launch

From this directory, install the dependencies if needed and start the local development server:

```powershell
npm install
npm run dev
```

Suggested launch address: http://127.0.0.1:5188/ (the server is not running until you start it). The port is fixed and the command will report an error if it is already occupied.

## Controls

- Click **Enter the museum** to capture the pointer.
- Move with **W A S D** or arrow keys and look with the mouse.
- Hold **Shift** to move faster.
- Press **R** to reset to the entrance.
- Press **Esc** to release the pointer; click the scene to capture it again.

## Checks and limitations

The JavaScript syntax check and Vite production build passed. A CPU-only grid check found a connected path through both rooms and verified 360 sampled points on a 2.5 m circle around the central work. The ramp rises at 8%. No browser, server, screenshot renderer, GPU check, or performance benchmark was run during this entry, so appearance, interactive behavior, and frame times remain unverified. The translucent resin uses standard alpha blending rather than physical refraction and may show sorting artifacts from some views. A keyboard and mouse are required.
