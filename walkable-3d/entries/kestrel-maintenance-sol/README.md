# Kestrel — Orbital Maintenance Bay

A compact, fully three-dimensional station service bay. The main floor surrounds an attitude-control drive assembly. An open repair alcove contains a workbench, tools, spare components, coolant bottles and a hose reel. Sixteen ordinary stairs lead to a guarded L-shaped inspection deck with an overhead view of the machine. The rear pressure window looks onto an external station spine, solar array and distant moon.

## Launch the delivered build

Node.js is required. The prebuilt `dist` folder is included; no install or network access is needed to run it.

```powershell
cd C:\Users\jmore\Documents\Codex\2026-10-06\task-15
node serve.mjs
```

Open **http://127.0.0.1:43157** yourself in a desktop browser. The launch script does not open or foreground a browser. Stop the server with **Ctrl+C**. If the port is occupied during later testing, use `$env:PORT=43158; node serve.mjs` and open that address.

Alternatively, any ordinary static HTTP server can serve `dist`. Opening `index.html` directly with `file://` is unsupported because the application uses JavaScript modules.

## Controls

| Control | Action |
|---|---|
| Enter maintenance bay | Capture the mouse and begin walking |
| Mouse | Look around |
| W A S D / arrow keys | Move relative to the viewing direction |
| Shift | Walk faster |
| R / Reset button | Return to the main-floor starting position |
| Esc | Release mouse / pause exploration |
| F | Toggle rolling frame-time measurements |
| Display | Select Balanced, High detail or Low power rendering |

If mouse capture is unavailable, hold the left mouse button over the scene to look. Movement continues with WASD. Stairs require no jump, elevator or scripted transition. The player stays on supported surfaces and slides against major obstacles. There are no additional game mechanics.

Suggested route: main floor → circle the drive → left service alcove → right stair bottom → upper deck → return down the same stairs.

## Construction and performance design

All visuals are newly authored procedural geometry and canvas textures in this workspace. There are no downloaded artwork assets, external fonts, runtime network dependencies or other entrant assets. Three.js 0.180.0 is bundled locally. Static geometry is grouped by material; thousands of individual fasteners and panel details do not each create a draw call. Directional shadows are generated once and refreshed only when display quality changes. Neutral fill and overhead lighting keep the room readable, with amber at the repair bench and pale cyan at the machine service guard.

The optional timing HUD reports actual rolling presentation intervals from the browser running the scene: median, p95, mean and calculated frames per second over the latest five seconds. It is provided for later inspection; **no performance result is claimed from the implementation run**.

## Verification and limitations

- JavaScript syntax checks and the production bundle build are run locally.
- Pure numerical navigation checks cover a full inspection route using major collision fixtures, sixteen tread heights, the return to the lower floor, and machine/rail/hull exclusion. They do not construct or render the scene.
- **Interactive, visual, GPU and performance checks were not run.** The benchmark's current execution constraint prohibits preview servers, browser control and scene execution during implementation. Final browser behavior and visual quality therefore remain unverified.
- Intended for a desktop keyboard and mouse. Touch movement is not implemented.
- Machinery is static. Thin cables, small tools and other minor surface details are not individually collidable; walls, the central machine, major work furniture and guard rails are.
- No elevator, automatic tour, jumping or external multiplayer/service dependencies.

See `RUN_RECORD.md` for actual timing and process cleanup, and `TEST_RESULTS.md` for the exact checks.

## Rebuild from source

```powershell
npm.cmd install --no-audit --no-fund
npm.cmd run check
npm.cmd test
npm.cmd run build
```

`src/world.js`, `src/machine.js` and `src/service.js` author the bay. `src/geometry.js` contains the static geometry batching and procedural material work. `src/navigation.js` contains movement and collision. `src/main.js` connects rendering, controls and the timing display.
