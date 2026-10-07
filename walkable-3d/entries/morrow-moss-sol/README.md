# Morrow & Moss

A standalone, explorable 3D traveling merchant's wagon. Mara Morrow carries garden tea, pottery and practical repair supplies, with a compact home tucked behind her workshop. All geometry and bitmap textures were authored specifically for this entry. Three.js and Vite are the only registry dependencies; there are no external assets or runtime network services.

## Launch the completed build

In PowerShell, launch the completed build with Node (no dependency installation is needed for this command):

```powershell
cd "C:\Users\jmore\Documents\Codex\2026-10-07\task-35\morrow-moss-wagon"
node .\launch.mjs
```

Suggested launch address: **http://127.0.0.1:5187/**. This is **not a running preview**. No server or browser was started during implementation. The launch command binds only to localhost and uses a strict port; if that port becomes occupied, it fails rather than selecting another port silently.

The production build is in `dist/`. `morrow-moss-build.zip` contains that build, the standalone launcher and concise launch instructions. Node.js 24.14.0 was used for this build. Dependencies are already installed in the source workspace. To rebuild, use `npm.cmd run build`; to repeat the CPU-only checks, use `npm.cmd run check`. For a fresh source copy without `node_modules`, first use `npm.cmd ci --no-audit --no-fund`. `npm.cmd run preview` is also available as a Vite-based launch option.

## Controls

- Click **Explore the wagon** to begin and capture the mouse.
- **Mouse**: look around.
- **WASD** or **arrow keys**: walk; diagonal movement is normalized.
- **Shift**: brisk walk.
- **Esc**: release the mouse and pause movement; click Resume to continue.
- **R**: reset position and view to the camp.
- **Return to camp** on the pause screen also resets the scene.

No jumping, crouching or teleport is needed to enter. The five ordinary steps rise 0.192 m per step, with 0.32 m treads and handrails. The wagon floor is 0.96 m above ground; eye height is 1.62 m above the current floor.

## Inspection route and details

Start in the camp, walk around the painted wagon and enter by the rear steps. The living area contains a bunk over fitted drawers, a shoe tray, overhead lockers, tied rolled canvas, nested stools under a supported writing shelf, a personal postcard and map, a narrow wardrobe, and a compact stove with its kettle and utensils. The open aisle continues to divided workshop shelves, labeled bins, jars, folded linens, a workbench, vice and small repair tools.

Return down the steps, then walk around the right side. The opened lower shutter forms the outside counter, with folding legs, diagonal braces, hinge plates and suspension rods anchored to the jambs. The upper shutter has props; a striped canvas awning has crossbars, brackets, braced posts and short guy lines. Tea bottles, pottery and repair kits occupy the counter. The immediate camp contains a fire ring and kettle tripod, one stool, a traveling trunk and satchel, firewood, a barrel and bucket. Background scenery is limited to a few shrubs and tufts.

## Checks and limits

Performed: JavaScript syntax checks, CPU construction of all scene geometry with finite vertex/normal/UV assertions and a bounded geometry budget, CPU collision tests for the complete camp → stairs → home → workshop → camp → shop route, and a non-serving Vite production build. Details and final counts are recorded in `CHECKS.txt`.

Not performed, as required by the execution conditions: browser launch, visual inspection, screenshots, UI or interactive testing, GPU tests, frame-time measurement, or performance benchmarking. Visual correctness and actual frame rates are therefore unverified.

The scene is designed for a desktop browser with WebGL and keyboard/mouse input. Furnishings and mechanisms remain static; goods have no trading interface. Collision uses a player circle and conservative bounds for major objects, with explicit floor and step surfaces. Small wares, rope and decorative fittings have no individual collision. Exploration is bounded to the small camp. A lost WebGL context requires reloading the page.

Repeated static geometry is combined by material, texture maps are generated locally, device pixel ratio is capped at 1.65, and the fixed sun shadow map is reused while walking. These are implementation choices, not measured performance results.

## Execution record

See `RUN.json` for the first implementation timestamp, exact 60-minute deadline, actual stop timestamp, interruption history and cleanup. The assistant is identified to this session as GPT-6 / Codex. The exact model variant and reasoning-effort setting were not exposed by the session metadata; the record states that limitation rather than guessing.
