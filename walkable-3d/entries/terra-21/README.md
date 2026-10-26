# The Caretaker's Rest

A self-contained Three.js walking scene: a modest bedroom, a stocked service passage and a large warm roost. The roost's resting platform is accessible for inspection from the surrounding floor.

## Launch

From this directory, run:

```powershell
npm run dev -- --host 127.0.0.1 --port 43217 --strictPort
```

Then open the suggested address http://127.0.0.1:43217/ in a desktop browser. The server is not running now. Dependencies are installed in this workspace; if they need to be restored, run `npm install` first.

Click **Enter the quarters** to capture the mouse. Move with WASD or the arrow keys, look with the mouse, hold Shift to move faster, and press R to return to the entrance. Escape releases the mouse; click the entry button to resume.

## Checks and limits

- `npm run build` passed. `node --check main.js` passed.
- `node route-check.mjs` ran scene construction with CPU-only renderer and DOM stubs, and checked the collision grid from the spawn through the bedside, passage, roost entrance, platform front, platform side and far side. It found each reachable and the spawn clear.
- No browser, server, GPU, visual inspection, interactive test, or performance measurement was used for this entry. The collision grid check is not a substitute for testing the real scene in a browser.
- Collision uses horizontal axis-aligned boundaries rather than exact furniture and prop geometry. There are no animated creatures, dynamic shadows or simulated fire.

## Run record

- Assigned model and reasoning effort: the execution environment did not expose the exact model identifier or effort setting; they cannot be verified from this run. The system identified the agent as Codex based on GPT-6.
- First implementation action: 2026-10-26 20:12:08 UTC.
- Deadline: 2026-10-26 21:12:08 UTC.
- Actual stop timestamp: 2026-10-26 20:15:09 UTC.
- Interruption history: no work interruption. The initial dependency installation stalled and was stopped; a bounded sandboxed attempt failed DNS resolution, and the approved registry installation then succeeded.
- Cleanup: all started install and build/check commands completed or were stopped; no server, browser, watcher or test process was started. A final process check showed no node or npm processes.
