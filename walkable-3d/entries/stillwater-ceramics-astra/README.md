# Stillwater — a ceramics workshop

A standalone, walkable Three.js environment: a cool timber-roofed pottery studio, a sheltered glaze preparation area, and a sunlit brick kiln courtyard. Two studio portals form a complete return loop. One world unit represents one metre; the eye height is 1.64 m.

## Launch the completed build

The dependencies and production build are already present in this workspace. Node.js 22.12 or newer is recommended (the build was checked with Node.js 24.14.0). In PowerShell:

```powershell
Set-Location 'C:\Users\jmore\Documents\Codex\2026-10-07\task-13\stillwater-ceramics'
npm.cmd run preview
```

Then manually open **http://127.0.0.1:5187/** in a current desktop browser supporting WebGL 2. This is a **suggested launch address, not a running preview**. Port 5187 was not occupied when checked during implementation; `strictPort` prevents silently switching to another port. The launch command does not automatically open a browser.

If the folder has been copied without `node_modules`, run `npm.cmd ci --no-audit --no-fund` first. The generated `dist` folder can also be served by an ordinary static HTTP server. Opening `index.html` directly through `file://` is unsupported.

For later source work:

```powershell
npm.cmd run dev
```

## Controls

| Input | Action |
| --- | --- |
| Enter the workshop | Capture the mouse and begin |
| Mouse | Look around |
| WASD or arrow keys | Walk |
| Shift | Brisk walk |
| Esc / Pause | Release mouse; show controls and settings |
| R | Reset position and orientation to the entrance |
| H | Hide/show the interface |
| Hold left mouse + move | Fallback look control if pointer lock is unavailable |

The pause menu includes sensitivity and render-scale choices. High caps device pixel ratio at 1.5; Balanced at 1.15; Light at 0.85. Geometry and materials remain the same. Movement has no head bob, gravity surprises, or jumping. Focus loss clears held keys and pauses movement.

## Suggested inspection route

Enter facing the workbench. Walk around either end, approach the shelves on the left, and continue through the rear portal on the right. Inspect the glaze sample tiles, lidded containers and recessed sink. Walk out beneath the canopy into the courtyard, approach the kiln door, and return through the second studio opening for the reverse view of the workbench and shelves.

## Scene construction

- 91 pottery pieces, built from nine hollow profile families. Seeded variations include rim wobble, off-axis throwing, surface rings, fluting, spouts, handles, separate interiors and irregular unglazed feet.
- Procedurally drawn material maps for clay, glaze, wood grain, plaster, stone, brick and dusty worktops. No external images, fonts or pre-existing project assets.
- A wheel and foot pedal, workbench vise, bats, trimming tools, wire cutter, rolled clay, canvas towel, pegboard, clay bags, sample tiles, glaze notebook, sink fittings and kiln furniture.
- Individual bonded bricks, a barrel vault, closed loading door, hinges, rivets, locking bar, firebox, buckstays, chimney and damper.
- Static geometry merged by material. A single sun shadow map is generated once, with contact shading at work surfaces. Rendering stops while paused except when a resize or reset requires a new frame.
- Fixed floor height, conservative major-solid collisions, small movement substeps and sliding along obstructions.

## Checks actually performed

Only CPU-only static checks and a non-serving production build were permitted and performed:

```powershell
npm.cmd run check
npm.cmd test
npm.cmd run build
```

The static test checks all nine vessel profiles for finite coordinates and inward/outward normals, validates the full sampled inspection route, checks blocked movement and wall sliding, constructs scene geometry with a no-op canvas stub, and checks scene scale and batching. It does not create a graphics context or render images. Results are recorded in `checks/static-checks.json`.

**No browser was launched, no server was started, and no screenshot, visual inspection, interactive test, GPU test or performance benchmark was performed.** Visual correctness and smooth performance require the later separate inspection session. No measured frame rate is claimed. The bundler may report its advisory about a JavaScript chunk exceeding 500 kB; the scene and Three.js are intentionally bundled together.

## Known limitations

- Desktop keyboard/mouse controls; no touch, mobile joystick, VR or gamepad controls.
- Collision uses conservative rectangles, including around the kiln and work surfaces. Small props are decorative.
- The scene is static: no crafting, firing, smoke, dust, moving doors, sound or simulation.
- No visual verification under the execution rules, so unnoticed visual or browser-specific issues may remain.
- Materials use procedural approximation and environment reflections rather than ray tracing. The initial load generates textures and meshes locally.

See `run-record.json` for timing, model/effort provenance, execution interruptions and process cleanup. The source and build are local only; nothing was published.

## Dependencies

Three.js 0.180.0 (MIT) and Vite 7.1.7 (MIT), with exact transitive resolution in `package-lock.json`. All scene geometry, textures, layout and interface were authored for this entry.
