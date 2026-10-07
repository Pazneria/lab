# Emberkeeper

A standalone, explorable 3D caretaker's home beside Orren's roost. The scene includes a furnished bedroom, a service passage with care equipment, and one large timber-braced roost. A level walking loop reaches the platform, trough, perch supports and the small return doorway.

## Launch the built scene

The production build is already in `dist/`, and dependencies are installed locally.

```powershell
Set-Location 'C:\Users\jmore\Documents\Codex\2026-10-07\task-39\ember-keeper'
npm.cmd run preview
```

**Suggested launch address:** http://127.0.0.1:43139/

This is **not a running preview**. No server or browser was started during implementation. A read-only TCP listener check found port 43139 unused. The launch command uses `--strictPort`, so it fails clearly if that port becomes occupied instead of switching ports.

Open the suggested address manually after launching. Press **Enter the quarters** to capture the mouse. Use Ctrl+C in the terminal to stop the server.

To rebuild after source changes:

```powershell
npm.cmd run build
```

If moving the source to another machine, install its pinned dependencies with `npm.cmd ci --no-audit --no-fund` first. The bundled build uses no external images, fonts, services, CDN scripts or runtime asset downloads. It needs an HTTP server rather than opening `index.html` as a file.

## Controls

| Control | Action |
| --- | --- |
| WASD / arrow keys | Walk |
| Mouse | Look after mouse capture |
| Hold left mouse button and drag | Look if mouse capture is unavailable |
| Shift | Brisk walk |
| E | Read or put down a nearby care note |
| R | Reset position and view to the entrance |
| Esc | Pause and release the mouse |
| F3 | Toggle optional frame-interval diagnostics |

The pause menu also offers reset and three quality settings. Balanced is the default: device pixel ratio capped at 1.5 with static shadows. Performance caps it at 1 and disables shadows; High caps it at 2.

F3 reports recent **animation-frame intervals**, not GPU timings. No measurements have been collected by the implementation agent. The optional meter is provided for a later authorized inspection session. No animation-frame results are claimed here.

## Inspection route

Start by the small entrance door. The bed is to the left, and the working ledger and dented kettle are to the right. Pass through the little door beneath the ROOST sign. Brushes and long tools line the left passage wall; salves, cloths and stored harnesses occupy the right.

In the roost, approach the front of the straw platform. The right floor lane passes its oak supports and the water trough, continuing behind the tall perch. The left lane returns past the guarded masonry stove. From the platform, turn toward the warm service table and human-sized doorway to return to the quarters.

## Verification performed

- JavaScript syntax checks passed for all five source modules.
- A CPU-only construction check instantiated the scene with canvas drawing stubbed out. It checked finite geometry, batching and shadow-caster setup without creating a renderer.
- The resulting scene has **105,492 triangles in 41 static mesh batches**, plus 155 static dust points, and **60 horizontal colliders**. These are construction counts, not measured rendering performance.
- A 0.16 m grid connectivity check reached all 12 route anchors, including the bed, desk, tools, roost threshold, platform front, both side lanes, trough, space behind the perch and return route.
- Collision checks blocked movement through the bedroom wall, stored tools and platform, including large movement displacements.
- `npm.cmd run build` passed, producing the self-contained production bundle. Vite emitted its advisory that the engine/application chunk exceeds 500 kB; the JavaScript bundle is about 543 kB, or 143 kB gzipped.

Detailed results are in [check-results.json](check-results.json). Reproduce the permitted checks with `npm.cmd run check` and `npm.cmd run check:scene`.

**Not performed:** browser launch, screenshots, visual rendering verification, interactive input testing, GPU tests or performance benchmarks. Visual quality, browser compatibility in practice and frame times must be judged in the later separate session.

## Limits and implementation choices

- Desktop keyboard/mouse and a WebGL2-capable browser are required. There are no touch controls.
- The route is level, with a fixed 1.68 m eye height. No jumping, crouching, climbing or vertical physics is provided. The platform, service step and furnishings block movement.
- Collision uses a circular player against conservative horizontal rectangles. Minor decorative fittings do not all have individual collision shapes.
- The large doors stay closed. The scene has no dragon model, animal AI, creature animation, fire simulation or audio.
- Materials, the small ink drawing and all geometry are locally procedural. Lighting is steady; two cached shadow maps and batched static geometry limit ongoing scene work.

## Execution record

See [execution-record.json](execution-record.json) for the first implementation timestamp, exactly 60-minute deadline, actual stop timestamp, process cleanup and interruption history. The clock was never paused or extended.

The only model identity exposed to this agent is **GPT-6 / Codex**. The exact deployment model identifier and reasoning-effort setting were not exposed, so the record explicitly marks them unavailable rather than inventing values. No other models, model-backed asset tools, subagents or delegated workers were used.

The initial registry install required a retry after the restricted network blocked it. An optional Vite config triggered an ancestor-directory permission error; removing that optional config restored a passing build. Both were handled within the original wall-clock window.

Source and build are confined to this new entry workspace. No comparison entries or existing project assets were read or reused.
