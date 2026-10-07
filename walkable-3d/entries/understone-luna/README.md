# Understone: Limestone Cavern

A compact, procedural Three.js first-person environment built for slow exploration. Walk from the entrance recess around a shallow underground pool, pass below the broad natural arch, and climb the gradual dry ramp to the survey landing.

## Launch

From this folder, run:

```powershell
npm install
npm run dev -- --port 4177
```

Then open the suggested launch address `http://127.0.0.1:4177/` in a browser. This address has not been served or verified in this run.

## Controls

- Click **Enter the Cavern** (or click the scene) to capture the mouse.
- **W A S D** to walk; mouse to look.
- **Esc** to release the mouse.
- **R** or **Reset** to return to the entrance.

## Notes

Geometry, wall relief, surface flecks and water are generated locally. Water uses a single lightweight animated shader over a shallow stone bed. The cave's walkable boundaries are authored for the intended route. WebGL rendering depends on a modern browser and available GPU.

## Run record

- Model: GPT-6 (the execution environment did not expose a more specific model identifier or reasoning-effort setting).
- First implementation action: 2026-10-07 03:59:16 UTC.
- Deadline: 2026-10-07 04:59:16 UTC.
- Actual stop timestamp: 2026-10-07 04:12:32 UTC.
- Interruptions: none.
- Checks performed: `node --check src/main.js` passed; `npm run build` passed. Vite reports the minified Three.js bundle above its 500 kB advisory threshold (527.65 kB; 137.67 kB gzip).
- Browser, server, visual review, interactive testing, GPU testing, screenshots, and frame-time measurements were not run, per execution conditions.
- No server, watcher, browser, or test process was started. All npm install and build commands exited before handoff.
