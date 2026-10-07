# SELENE — The Moonwake Commission

A standalone, explorable 3D royal tailor’s atelier. All scene geometry, textile patterns, wood grain, paper drawings and interface artwork were created procedurally for this entry. There are no downloaded project assets or runtime asset services.

## Launch the delivered build

The production build is in `dist/`. Dependencies are already installed in this workspace. In PowerShell, run:

```powershell
npm.cmd --prefix "C:\Users\jmore\Documents\Codex\2026-10-07\task-42\selene-atelier" run preview
```

Then open **http://127.0.0.1:5187/** yourself.

**This is a suggested launch address, not a running preview.** No server or browser was started during implementation. Port 5187 had no listener when checked; strict-port mode will report a conflict instead of silently selecting another port. Stop your later preview with Ctrl+C.

For a fresh copy without `node_modules`, use `npm.cmd ci` from the project folder, then `npm.cmd run build` and `npm.cmd run preview`. A current desktop browser supporting WebGL 2 is required. Serve the build over localhost; opening `index.html` directly with `file://` is not supported.

## Controls

| Input | Action |
| --- | --- |
| Click **Enter the atelier** | Capture mouse and begin exploring |
| Mouse | Look around |
| W A S D or arrow keys | Walk |
| Shift | Walk faster |
| Q / E | Turn with keyboard |
| R | Reset position and view to the entrance |
| Esc | Release mouse and show settings |
| Drag on the scene | Look when mouse capture is unavailable |

Settings include render detail, look sensitivity, object notes, the floor plan and a reset button. The default balanced setting caps pixel ratio at 1.25 and uses one cached 2048² shadow map. High caps pixel ratio at 1.75. Light caps it at 1 and disables shadows. These are implementation settings, not measured performance results.

## Inspection route

1. Start at the entrance, facing the low brass-edged fitting circle. Step onto it, inspect the silvered triptych, settee and fitting table.
2. Pass through the left arch. Inspect the organized bolts, folded cloth, five hanging weights and rear dye cards.
3. Turn right through the opening at the rear of the archive into the workroom.
4. Circle the Moonwake mantle. The finished side has moon-flower brocade gores and gold trim. The open right side reveals spring-steel hoops, linen suspension tapes, coral facing, basting and a pinned toile. The back has laced stays; the radial collar is partly bare brass ribs.
5. Examine the cutting bench: paper pieces with grain lines and notches, ruler, shears, chalk, pins, silk, pressing tools and a half-finished crescent in an embroidery hoop.
6. Return through the right arch, with a view across the fitting room to the entrance.

The camera stays at standing eye height. Horizontal collision covers major walls and furnishings. The fitting platform can be stepped onto; the commission’s plinth is blocked. The three rooms have a continuous floor with no gravity or falling state.

## Checks performed

- JavaScript syntax checks on all scene modules.
- A non-serving Vite production build.
- CPU-only scene construction with a minimal canvas-call stub: finite vertices and normals, successful material batching, bounded geometry count.
- CPU-only collision checks: walls, workbench and commission block entry; eleven inspection points belong to the same walkable component as the entrance.

See `static-check-results.json` for the exact final structural counts and `run-record.json` for timing and process cleanup.

**Not performed:** browser launch, WebGL rendering, screenshots, visual verification, keyboard/mouse interaction testing, GPU testing or frame-time benchmarking. No frame-rate or visual-correctness claim is made.

## Known limitations

- The scene has not been visually or interactively verified. A separate browser inspection is still required.
- The looking glass is stylized, with static environment lighting; it does not reflect the room or viewer in real time.
- Cloth, tools and lighting are static. There is no tailoring interaction, cloth simulation or animated staff.
- Navigation is intended for desktop keyboard and mouse; no mobile touch movement interface is provided.
- Collision is intentionally simple: conservative horizontal boxes and an elliptical plinth, with a small height transition for the fitting platform.
- Exact deployment model ID and reasoning-effort setting were not exposed by the worker’s available runtime metadata. The runtime identifies Codex as based on GPT-6; the local task is titled “Build Astra scene 22.” The authoritative run configuration must supply the exact model/effort rather than inferring them from that title.

## Source and execution record

- `src/atelier.js`: architecture, archive and furnishings.
- `src/garment.js`: the unfinished royal commission.
- `src/materials.js`: deterministic procedural materials.
- `src/geometry.js`: geometry helpers and static batching.
- `src/navigation.js`: movement, mouse look and collision.
- `src/main.js`: lighting, rendering and interface integration.
- `scripts/validate.mjs`: bounded CPU-only structural checks; does not render.

The first implementation action was **2026-10-07T09:07:59.0810208+00:00**. The fixed one-hour deadline was **2026-10-07T10:07:59.0810208+00:00**. The actual stop timestamp is recorded in `run-record.json`.

There were no user pauses and no deadline extension. An initial npm fetch was blocked by the sandbox network restriction; the pinned dependencies were then installed through the approved registry command while implementation continued. No other model, subagent, paid service, external communication or publication was used. All work stayed in this new entry folder. Every command started for the entry completed; no server, watcher, browser or test process was left running.

Dependencies: Three.js 0.180.0 and Vite 7.1.9, installed from the npm registry. Lockfile included.
