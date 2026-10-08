# The Verdigris Atelier — royal tailor's atelier (explorable 3D scene)

A standalone three.js (r169) first-person scene made of three connected rooms:

1. **Fitting Salon** (west): a raised two-step upholstered fitting dais with a gilt band and hem marker, a three-panel gilt mirror (an environment-mapped metal surface, not a live reflection), a chandelier, a chaise, armchairs, a tea table with a pincushion, a rack of finished garments, a folding screen, a trim cabinet with button trays and ribbon spools, and velvet curtains at daylight windows.
2. **Fabric Archive** (centre): five bays of walnut shelving. They hold rolled bolts shown end-on, flat-board woollens, folded velvet stacks, and long brocade rolls with tails draped over the shelf edge. There is a library ladder on a brass rail. The opposite wall has flat-file sample drawers (one pulled open), a hanging sample rail with 16 swatches of different drape and pattern scale, and a pigeonhole sample wall. A central table holds an unrolled brocade spilling to the floor, swatch books and pinned sample cards.
3. **Workshop** (east): **Commission No. 47, "The Verdigris Aurora"**, an unfinished coronation gown for the young Queen Isaude, on a dress form on a plinth. Its construction is meant to be visible:
   - a calico toile base with pencil marks and boning channels
   - velvet princess-seam panels with gilt topstitching; the left back panels are missing, so the toile shows
   - turned-back coral lining, brass eyelets and loose lacing
   - an ivory underskirt with chalked petal placement lines and a frayed raw hem ringed with pins
   - three tiers of petals in velvet, shot silk and brocade; the back-right tiers are missing or only basted and pinned
   - one slashed puff sleeve, with the other sleeve still on the sleeve board
   - a 13-feather gilt-wire "aurora" collar, partly glazed with organza
   - a constellation-embroidered train, half finished in gold with an embroidery hoop clamped at the boundary, half chalked with a raw edge

   Around it are a workbench (sleeve board, sad iron, shears, thimble, chalk, tape measure, wall spool rack, hanging paper patterns, cork board with the design sketch, collar feathers being wired, a cold cup of tea), a cutting table (kraft paper, pinned paper pattern pieces, brass weights, a square and chalk tracing), a treadle sewing machine, a second dress form with a toile, an ironing board and a presentation easel.

Lighting: cool daylight comes from a hemisphere light, a shadowed sun through the skylights and emissive windows. The commission and benches get warm spotlights and pendant lights.

## Launch

No server is needed. The build is a single classic script (`dist/atelier.js`) and every texture is generated in code at load time, so there are no external assets or network requests.

- **Simplest:** open `index.html` directly in a desktop browser (Chrome, Edge or Firefox). Double-click it, or use:
  `file:///C:/Users/jmore/Documents/Codex/2026-10-07/task-50/claude-entries/Claude22/index.html`
- **Optional static server** (suggested address only; it was not started during this build):
  `python -m http.server 8722` in this folder, then open `http://localhost:8722/`
- **Rebuild from source** (optional): `npm install`, then
  `node_modules/.bin/esbuild src/main.js --bundle --format=iife --minify --target=es2020 --outfile=dist/atelier.js`

## Controls

| Input | Action |
|---|---|
| Click | Enter and capture the mouse (Esc releases it). If pointer lock is unavailable, drag to look |
| Mouse | Look |
| W A S D / arrow keys | Walk (Shift = brisk walk); Q / E turn |
| C | Toggle crouch, for low detail such as the hem, train and lower shelves |
| 1 – 9 | Viewpoints: entrance, fitting dais, archive shelves, archive samples, outfit front, outfit side-back, outfit train, workbench, return view |
| R | Reset to the entrance |
| F | Frame-time overlay (average and worst ms, fps, draw calls, triangles) |
| G | Cycle render scale (1×, 0.75×, 1.5× of the device pixel ratio, capped at 1.5) |
| H | Hide or show the help strip |

Suggested route: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → R. You can also walk it freely: entrance → dais → east doorway → archive aisles → workshop doorway → around the gown → bench → back west through both doorways.

## Technical notes

- Static geometry is merged per material (about 85 meshes in total). Repeated archive cloth and spools use `InstancedMesh` (about 1,200 instances). There are about 185k triangles before shadow passes.
- Shadows are rendered once (`shadowMap.autoUpdate = false`) because nothing moves. That leaves one 4096×2048 sun map and one 1024 spotlight map with no per-frame cost.
- Collision uses a 0.3 m player circle against wall and furniture boxes and circles. The fitting dais is a walkable 10 cm + 10 cm step. The eye height is 1.62 m (1.12 m crouched).

## Verification status (what was and was not checked)

Performed, CPU only, with no browser, server or GPU:
- The esbuild bundle compiles without errors.
- A Node smoke test (canvas mocked, no WebGL) builds the entire world. It reports 88 merged meshes, about 1,224 instances, about 199k triangles and no NaN/Infinity vertex positions. World construction takes about 0.4 s on CPU.
- A 0.1 m grid walkability flood-fill from the entrance, using the same collision radius:
  - All nine viewpoints are collision-free and reachable.
  - The gown can be walked around; the only blocked samples are on the train itself.

Not performed, as the run rules require: opening the scene in any browser, visual inspection, interactive testing, or frame-rate / frame-time measurement. Visual correctness and performance are therefore unverified. Press **F** in the scene to read frame times.

## Known limitations

- Unverified visually (see above). Exposure and light balance were set by calculation, not by eye.
- The mirror is an environment-mapped metal surface, not a true reflection.
- All cloth is static sculpted geometry; there is no cloth simulation.
- Thin gilt seams and wires can shimmer slightly at a distance (MSAA only, no TAA).
- Transparent organza feathers are merged into one mesh, so their sort order may be imperfect from some angles.
- Collision uses 2D boxes and circles. Small tabletop items are not collidable. There is no jumping and no climbing except the fitting dais.
- Textures are generated procedurally on canvases at startup, so expect a short build pause (roughly 1 s) before the "Enter" button enables.

## Run record

- Model: Claude Opus 5.5 (`claude-opus-5-5`) running in Claude Code (desktop). The reasoning-effort setting was not shown to the model in this session.
- First implementation action: 2026-10-07 22:19:41 EDT (UTC-4)
- One-hour deadline: 2026-10-07 23:19:41 EDT
- Actual stop (last edit): 2026-10-07 22:49:44 EDT (UTC-4)
- Interruptions: none.
- Processes: only short-lived build and smoke-test commands were run, and each exited on its own. No server, watcher, browser or test process was started.
