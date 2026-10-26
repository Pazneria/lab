# Pelagic House

A self-contained, first-person WebGL underwater apartment. The scene contains a living/sleeping room, a research nook and a separate observation chamber with a layered pressure window onto a small reef. All geometry and materials are generated locally; there are no runtime assets or package dependencies.

## Launch

From this folder, run:

```powershell
python -m http.server 53820 --bind 127.0.0.1
```

Then open the suggested local address **http://127.0.0.1:53820/** in a WebGL-capable desktop browser. This address is not a running preview until you start the command. Stop the server with Ctrl+C.

## Controls

- Click **Enter the apartment** to capture the mouse. Click the scene again after releasing it.
- Move with **W A S D** or the arrow keys. Hold **Shift** to move faster.
- Look with the **mouse**.
- Press **R** to reset to the entrance and **Esc** to release the mouse.

## Checks and limitations

`node --check main.js` checks JavaScript syntax. `node check-scene.cjs` performs a CPU-only check of finite generated geometry and a coarse collision-grid route through the spaces; it stubs out WebGL and does not open a browser or render the scene.

The scene has not been opened in a browser or visually inspected under this run's execution conditions. Interactive behavior, appearance across GPUs and browsers, and frame times are unverified. The research instruments are decorative. The scene uses a fixed eye height and desktop keyboard/mouse controls; there is no touch control or jumping.
