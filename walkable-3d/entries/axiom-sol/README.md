# Axiom — Applied Intelligence Lab

A standalone explorable 3D laboratory built for the supplied benchmark brief. The hall contains an eight-channel spectral instrument, a perception bench with a camera and physical reference objects, and a motion bay with an articulated arm, linear carriage, and control console. All geometry, procedural material textures, labels, and test graphics were authored in this isolated entry. No external assets, other entries, models, or subagents were used.

## Launch the finished build

Node.js and the dependencies are already installed in this entry workspace. In PowerShell:

```powershell
Set-Location -LiteralPath 'C:\Users\jmore\Documents\Codex\2026-10-06\task-24\axiom-lab'
npm.cmd run preview
```

Then open **http://127.0.0.1:5187/** yourself. This is a **suggested launch address**, not a running preview. Port 5187 had no listener when checked at 2026-10-07 04:14:23 UTC. The launch command uses `--strictPort`, so it reports a conflict rather than switching ports. Stop the server with Ctrl+C when finished.

The production artifact is `dist/`. Source is in `src/`. To modify and rebuild, use `npm.cmd run build`. `npm.cmd run dev` is also available on the same port, but no server was started during this entry.

If the folder is moved to a machine without its installed dependencies, run `npm.cmd ci --no-audit --no-fund` before launching.

## Controls

- Click **Enter the laboratory** to capture the mouse.
- Mouse: look. **WASD** or arrow keys: move. **Shift**: faster walking.
- **R**: reset position and view to the entrance.
- **Esc**: release the cursor and show the controls. Click Resume to continue.
- **Q**: cycle economy / balanced / high pixel resolution. Geometry stays the same.
- **F**: toggle live frame-interval diagnostics during the later inspection. They show requestAnimationFrame intervals, draw calls, and triangles; they are not GPU timings.

Eye height is 1.68 m. Movement has acceleration, short collision substeps, and sliding around obstacles. The floors, room boundaries, major furniture, central instrument, and test platform block movement. There is no gravity, jumping, or way to fall through the floor.

## Inspection route

Entrance → circle the central array → west perception bay → east motion bay → turn back across the hall → entrance. There is a complete unobstructed circular route at a 3 m radius around the array, plus closer approaches. The central information pedestal sits beyond that orbit. The two bays are open portals, without doors or steps.

## Checks and limitations

Performed: syntax checks on all scene modules, CPU-only collision and sampled-route checks, a CPU-only geometry construction check using no-op canvas drawing methods, and a production Vite build. These checks passed. Final check details are in `CHECKS.md`.

Not performed: browser launch, rendering, screenshots, visual verification, pointer-lock interaction testing, GPU tests, or performance benchmarks. No frame-rate or visual-correctness claims are made. Those checks were prohibited for this run and remain for the later judging session.

The scene needs a desktop browser with WebGL 2 and pointer-lock support. Exhibits and screens are static scenic objects. Glass uses simple alpha blending, not optical transmission. Collision uses conservative circles and boxes around major objects; small tools, wires, and rails are not individually collidable. There are no functional AI applications, simulations, backends, or touch controls.

Static geometry is merged by material. Only one light casts a 2048px shadow map, updated once, and glass is kept small. Default rendering caps device pixel ratio at 1.5; Q provides lower and higher settings. These are implementation choices, not measured performance results. Vite reported its standard advisory for a JS bundle slightly above 500 kB uncompressed; the finished bundle is approximately 143 kB gzip.

## Run record

First implementation: **2026-10-07T03:56:43.6548776Z**. One-hour deadline: **2026-10-07T04:56:43.6548776Z**. The actual stop timestamp and cleanup result are recorded in `RUN_RECORD.json`.

The supplied runtime identity is **GPT-6**. The exact deployment model identifier and reasoning-effort setting were not exposed to this runner; they are recorded as unavailable rather than guessed. The parent benchmark runner should retain its assigned model/effort metadata.

No interruptions or deadline extensions occurred. The initial sandboxed package download failed with EACCES; an authorized registry-only retry succeeded while the same clock continued. All package installation, checks, and builds ran as finite commands. No browser, server, watcher, or GPU/test process was started.
