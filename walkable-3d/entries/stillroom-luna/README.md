# The Stillroom

A compact, first-person brutalist museum built with Three.js. Geometry and surface textures are generated locally; no image or font downloads are needed at runtime.

## Launch

From this folder, run:

```powershell
npm install
npm run dev -- --port 5179
```

Suggested launch address: `http://127.0.0.1:5179` (the server was not started or checked during this run).

## Controls

- Click **Enter the gallery**, then use the mouse to look.
- **W A S D** to walk; **Shift** to move faster.
- **Esc** releases the mouse and pauses; click the scene to resume.
- **Reset to entrance** returns to the starting point; **R** also resets while exploring.

## Verification and limits

- `node --check src/main.js` passed, and `npm run build` completed successfully with Vite 6.4.1.
- The generated JavaScript entry bundle is 523.69 kB (134.72 kB gzip); Vite reports its standard 500 kB chunk-size advisory.
- Visual inspection, browser interaction, frame-time measurement, and server checks were not performed because the execution conditions prohibit them. No frame-rate or visual-correctness claim is made.
- Movement uses a simple human-radius collision test against the major walls, ramp edges, exhibit plinths, and benches. There is no jump mechanic. A modern browser with WebGL 2 is required.

## Run record

- Model identifier exposed to this run: GPT-6. No more specific model identifier or reasoning-effort setting was exposed.
- First implementation action: 2026-10-07 04:00:03 UTC.
- One-hour deadline: 2026-10-07 05:00:03 UTC.
- Interruption history: none.
- Actual stop timestamp: 2026-10-07 04:07:06 UTC.
