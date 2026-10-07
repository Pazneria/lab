# Larkspur House — The way home

A standalone, explorable 3D suite for **Mira Vale**, an original fantasy marsh-route courier and cartographer. Mira maps safe crossings, carries letters, mends her own kit, grows a little windowsill herb, and keeps a model of her family's ferry beside a small painted portrait.

The bedroom, walk-in wardrobe, and map study form a connected loop. The rooms use original procedural Canvas textures and authored geometry: embroidered quilt and shaped pillows, gathered curtains, hanging coats and folded storage, pegged furniture, worn leather, curled maps, paper bundles, pottery, and worked brass. No external art assets or other entrants' files were used.

## Launch

The production build is already in `dist/`, and the pinned dependencies are installed in this entry's directory. In PowerShell:

```powershell
Set-Location 'C:\Users\jmore\Documents\Codex\2026-10-07\task-20\larkspur-rooms'
npm.cmd run preview
```

**Suggested launch address: http://127.0.0.1:4327/**

This is a suggested address, **not a running preview**. Port 4327 was found unused by a local listening-port query during preparation; the preview command uses `--strictPort` and will report an error if it becomes occupied. No server was started for this run.

To rebuild, use `npm.cmd run build`. If moving the source to another machine, install the lockfile dependencies with `npm.cmd ci --no-audit --no-fund` first. The scene requires a desktop browser with WebGL 2 and mouse pointer lock. Open the launch address directly when inspecting it.

## Controls

Click **Step inside** to capture the mouse.

| Input | Action |
| --- | --- |
| Mouse | Look around |
| W A S D or arrow keys | Walk |
| Shift | Brisk walk |
| Esc | Release mouse and open pause/settings |
| R | Reset to the entrance while exploring |
| Return to entrance button | Reset from the pause panel |

Pause settings provide Balanced, High, and Light image quality; mouse sensitivity; and an optional live frame-time display. The display reports browser frame intervals, including display scheduling, and is not a prior performance measurement.

The eye height is 1.62 m and the collision radius is 0.205 m. Floors are continuous and the eye height stays fixed, so there is no falling. Wall and major furniture collision use circular player clearance, substeps, and sliding. There is no jumping, avatar, inventory, quest system, or equipment interaction.

## Inspection route

From the entrance, approach the quilted bed and both bedside cabinets. Continue along the clear right side of the bedroom, through the east doorway into the wardrobe. Hanging garments and shoes occupy the deep east cabinet; folded linen, baskets, and rolled blankets occupy its second bay. Pass through the wardrobe's north doorway to the study. Approach the map desk around either side of the chair. The study's west doorway leads back into the bedroom for the return view and route to the entrance.

## Validation and limits

Checks performed were CPU-only: JavaScript syntax checks, production compilation, finite geometry/normal/UV checks, collision clearance at 20 inspection points, entrance connectivity, walking simulation around the complete loop including the left bedside approach, and boundary containment. The exact final geometry counts and results are in `static-check-results.json`.

The CPU scene check deliberately replaces Canvas drawing with no-op stubs. It does **not** test real browser texture creation. No browser, headless browser, UI automation, screenshot renderer, GPU test, server, or performance benchmark was launched. Visual appearance, interactive input, driver compatibility, and browser frame rates remain for the separate inspection session. No measured FPS or visual correctness is claimed.

Static geometry is grouped by material; the scene uses a single cached directional shadow map, unshadowed warm practical lights, and a bounded render resolution. Cloth is static geometry. The wardrobe mirror is cloudy silver with no real reflection. Window vistas are painted procedural backdrops. Small decorative props have no individual collision; walls and major furniture do.

## Run record

First implementation: **2026-10-07T09:02:25.9378600+00:00**. One-hour deadline: **2026-10-07T10:02:25.9378600+00:00**. The actual stop time and process cleanup confirmation are recorded in `run-record.json`.

The system exposed the model family as **GPT-6**; the run's own title is **Build Sol scene 15**. The exact deployment identifier and reasoning effort setting were not exposed by the environment or its own thread metadata, so they are recorded as unavailable rather than guessed. No other models, subagents, or model-backed external tools were used.

No user or execution interruption occurred. The initial dependency fetch failed under restricted network/cache permissions; a scoped registry retry with a workspace-local cache succeeded. That setup time is included in the original one-hour window. The deadline was never reset or extended.

Dependencies: Three.js 0.180.0 and Vite 6.3.6, installed from the npm registry. Node.js v24.14.0 and npm 11.9.0 were used. Installation and check commands completed before handoff. A read-only OS process query found zero remaining Node processes for this entry's path. No server, browser, or watcher was started, and no unrelated process was terminated. See the final cleanup record.
