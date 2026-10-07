# The Waylight Rooms

A standalone, explorable 3D home for **Mara Venn**, an original mountain waylight keeper who maintains the lamps marking safe routes through high passes. Made specifically for this benchmark in an isolated workspace.

The bedroom, walk-in wardrobe, and small study form a complete walking loop. Saffron quilting, teal travel clothes, repaired lanterns, route maps, and carved birds connect the rooms. Mara mends her own coats, keeps a second cup ready, and has been carving a small bird between repairs.

## Launch the supplied build

In PowerShell:

```powershell
Set-Location 'C:\Users\jmore\Documents\Codex\2026-10-07\task-21\waylight-rooms'
npm.cmd run preview
```

**Suggested launch address: http://127.0.0.1:4327/**

This address is not a running preview. No server or browser was started during implementation. Port 4327 was checked for an existing listener during the build session; the launch command uses strict port selection and will report an error if it becomes occupied. Stop a later preview with Ctrl+C.

The compiled build is in `dist/`. Dependencies are already installed in this workspace. For a source-only copy, use Node.js 22.12+ (Node 24.14.0 was used here), run `npm.cmd ci`, then `npm.cmd run build` and `npm.cmd run preview`. The production build can also be served by an ordinary static file server. Opening `index.html` directly with a `file:` URL is not the supported launch method.

## Controls

- Click **Step inside** or the scene to capture the mouse.
- **Mouse:** look around. If pointer lock is unavailable, hold the left mouse button and drag.
- **W A S D** or **arrow keys:** walk and strafe.
- **Shift:** brisk walk.
- **R** or **Reset view:** return to the entrance and restore the original view.
- **Esc:** release the mouse and show the controls.
- **Quality:** toggle between high and balanced rendering resolution.

Suggested inspection route: approach the right bedside and window keepsakes, enter the wardrobe through the south arch, walk forward through its north arch to the study desk, and return through the study's west arch to the bedroom. The room names update unobtrusively while moving.

## Build and checks

```powershell
npm.cmd run check
npm.cmd run test:layout
npm.cmd run build
```

Performed: JavaScript syntax checks, the non-serving Vite production build, and a bounded CPU-only scene/layout audit. The audit creates geometry with a stubbed canvas context; it does not render images or initialize WebGL. It checks finite vertex data, scene bounds, the unblocked spawn, furniture and wall collision, connectivity of all inspection stops, direct passage through all three doorways, and prevention of tunnelling through a partition. `TEST-RESULTS.json` contains the final audit results.

The final scene has 2,711 modeled pieces merged into 45 static batches, about 272,733 triangles, and 23 collision boxes. These are static geometry counts, **not frame-rate measurements**. Rendering uses six unshadowed point lights, one cached 2,048-pixel directional shadow map, procedural environment lighting, and a capped pixel ratio. There is no post-processing chain, physics cloth simulation, or continuous asset streaming.

## Limitations and unperformed checks

- Per the execution conditions, no browser, headless browser, UI test, screenshot renderer, GPU test, performance benchmark, development server, or preview server was used. Visual correctness, real interaction, startup behavior in a browser, and frame times remain unverified until the separate inspection session.
- Requires a desktop browser with WebGL 2 and a keyboard. There are no touch movement controls.
- The mirror uses a silvered material rather than a live reflected scene. Window views are decorative distant-ridge panels. Doors, equipment, clothing, and lights are not interactive.
- Movement uses a fixed eye height, a circular horizontal collision footprint, and solid major furniture; small decorative items do not all have individual collision.
- Vite reports its usual size advisory for the roughly 524 kB Three.js chunk. The build succeeds; all scene assets and dependencies used by the build are local.

All scene geometry, textile patterns, maps, wood textures, and decoration were authored procedurally for this entry. No other entrant's files or project assets were inspected or reused. No other models, subagents, model-backed tools, paid services, external communication, or publication were used.

`RUN-RECORD.json` records the timing, available model metadata, interruptions, and process cleanup. No process from the build session is intentionally left running.
