# Station 06 — Maintenance Bay 04

An explorable 3D orbital maintenance bay built with Three.js and procedural geometry. The local installation includes the Three.js dependency; no external assets are loaded by the scene.

## Launch

From this directory in PowerShell:

```powershell
python -m http.server 49371 --bind 127.0.0.1
```

Open the **suggested** address `http://127.0.0.1:49371/` in a WebGL-capable desktop browser. The server is not running as part of this handoff. If dependencies need to be restored, run `npm install` in this directory first.

## Controls

- Click **Enter the bay** to capture the pointer.
- Move with **W A S D** or the arrow keys; look with the mouse.
- Hold **Shift** to move faster.
- Press **R** to reset to the entrance.
- Press **Esc** to release the pointer; click to resume.

The service alcove is on the left of the main floor. The stair flight is on the right and leads to the inspection deck across the back of the bay. Return by the same stairs.

## Notes

The project uses simplified collision against the major room boundaries, the machine, workbench, and access routes. It has no jump or physics simulation; the stair elevation is continuous for comfortable movement. It is intended for desktop mouse and keyboard. Visual appearance, browser interaction, and performance have not been verified in this run because the execution conditions prohibit launching a browser, renderer, server, or benchmark.
