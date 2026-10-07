# Ember Rest

A standalone, explorable 3D dragon caretaker's quarters. A low timber bedroom leads through a stocked service passage into one vaulted stone roost. Walk around the raised straw deck, inspect the perch and water trough, and look back toward the keeper's little doorway. All geometry, textures and scene details were authored in this isolated workspace; there are no external asset or font requests.

## Launch

The production build is already in `dist/`. From PowerShell:

```powershell
Set-Location 'C:\Users\jmore\Documents\Codex\2026-10-07\task-38\ember-rest'
npm.cmd run preview
```

**Suggested launch address:** http://127.0.0.1:5187/ . No server is running. Port 5187 was checked as free during implementation; the script uses `--strictPort` and will report a conflict rather than silently use a different port. Open the address yourself after starting the server.

An alternative requiring only Python, also from this directory:

```powershell
python -m http.server 5187 --bind 127.0.0.1 --directory dist
```

The portable `EmberRest-dist.zip` contains the same `dist/` build and a launch note. Extract it, enter the extracted directory, and run the Python command above. Opening `index.html` directly through `file://` is not supported.

For source development, use `npm.cmd run dev` instead. If dependencies are missing after copying the source, run `npm.cmd ci` first. Three.js 0.180.0 and Vite 7.1.7 are pinned in the lockfile. The build was made using Node.js 24.14.0.

## Controls

| Input | Action |
|---|---|
| Click **Step inside** | Begin; request mouse lock |
| Mouse | Look around |
| WASD or arrow keys | Walk |
| Shift | Brisk walk |
| E | Inspect a nearby detail under the aim point; close the note |
| Escape | Pause and release the mouse |
| R | Reset to the entrance |
| P | Toggle high/standard pixel density |
| F3 | Show or hide frame-interval diagnostics |

If mouse lock is unavailable, hold the left mouse button to look. Walking remains available. The reset button duplicates R. Eye height is 1.64 m; normal walking speed is 2.05 m/s. The camera has no head bob. The full inspection route stays on level floor; climbing, jumping and flying are not implemented.

The F3 display reports recent animation-frame intervals, p95, draw calls and triangles when the scene is actually running. Those readings are not GPU timings. No frame-time or performance measurements were taken during this entry.

## What to inspect

- The bedroom: bed joinery, mended quilt, fringed rug, open care ledger, old portrait, boots, mug, wardrobe and washstand.
- The passage: an apron, rake, broom, scraper, salves, clean wing linen and a repaired oversized leather harness. Stored gear stays along the sides of the clear lane.
- The roost: two massive masonry ribs, braced roof trusses, a low resting deck with six stone shoes and iron knees, a leather-wrapped perch, riveted water trough, wall sling fitting, warm heat-brick hearth, giant winter gate, scratches and soot.
- The human night-watch chair and pear basket near the little return doorway.

## Verification and limitations

Performed: JavaScript syntax checks for every source module, a Vite production build, and a bounded CPU-only geometry/collision check. The CPU check builds Three.js geometry with no-op canvas drawing and no renderer. It checks finite vertices, valid material batching, collision math, and reachability of 14 inspection waypoints on a 10 cm floor grid. See `cpu-check-results.json` for final counts. This establishes a connected floor route to the bed, service tools, deck, trough, perch, rear floor route and entrance.

Not performed: browser launch, screenshot rendering, visual review, interactive testing, GPU testing or a performance benchmark. The scene's appearance, mouse-lock behavior and actual frame times require the later separate browser session. A current desktop browser with WebGL2 is required. There is no dragon, animal AI or fire simulation. The entrance and flight gate remain closed to bound exploration.

Rendering uses static geometry grouped by material, one stationary shadow map, capped pixel density and stable lights. Procedural textures avoid network asset loading. These are design choices, not measured performance claims.

## Run record

First implementation: **2026-10-07 09:07:34.8909405 UTC**. Deadline: **2026-10-07 10:07:34.8909405 UTC**, exactly 60 minutes later. The actual stop timestamp, interruption history and process cleanup are in `run-record.json` beside this README.

The assigned model is identified to this session as **GPT-6**. Its exact model identifier and reasoning-effort setting were not exposed in the session or its local metadata. They are explicitly marked unavailable in the record unless the requested clarification supplies them. No other model, agent, model-backed tool or external creative service was used.

No browser, server or watcher was started. The initial restricted npm download failed, then the authorized registry retry succeeded while implementation continued. This did not pause or reset the one-hour clock. All started install, build and check processes completed and were cleaned up by normal exit.
