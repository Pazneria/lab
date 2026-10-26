# Observatory on the Plateau

A first-person, browser-rendered 3D desert observatory. The source and generated production bundle are in this directory.

## Launch

From this directory in PowerShell:

```powershell
npm install
npm run dev
```

Suggested launch address: http://127.0.0.1:5197/ . This address was not started or verified during the build. The dependencies are already installed in this workspace; `npm install` is only needed if they are missing. A browser with WebGL is required.

## Controls

Click **Enter the observatory** to capture the mouse. Move with WASD or the arrow keys, look with the mouse, hold Shift to move faster, press R to return to the entrance, and press Esc to release the cursor. Click to resume.

## Verification and limitations

`node --check src/main.js` and `npm run build` passed. A CPU-only grid check found connected positions from entrance to chamber to terrace, rejected positions past the terrace edge and inside the instrument, and sampled a clear circle around the instrument. These checks do not establish visual correctness, browser compatibility, interactive collision feel, or frame rate. The build was not opened in a browser and no server, rendering, screenshot, GPU, or performance test was run, per the execution conditions. The browser pointer-lock interaction and visual quality require later inspection. Vite reported a bundle-size advisory for the Three.js-containing bundle.

## Run record

- Model: the runtime identifies the assistant as GPT-6; an exact model identifier and reasoning-effort setting were not exposed to this agent.
- First implementation action: 2026-10-26 16:07:22 -04:00 (20:07:22 UTC).
- One-hour deadline: 2026-10-26 17:07:22 -04:00 (21:07:22 UTC).
- Interruptions: the first package install was stopped after it stalled on restricted DNS; a bounded retry confirmed the DNS failure. A subsequent authorized registry install succeeded. No other interruption occurred.
- Cleanup: all commands started for this entry have finished or were stopped; no server, watcher, browser, or test process was started for the entry.
- Actual editing stop: 2026-10-26 16:11:17 -04:00 (2026-10-26 20:11:17 UTC).
