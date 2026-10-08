# Ember's Roost — dragon caretaker's quarters (benchmark entry, Claude21)

An explorable three.js scene with three connected spaces: a modest caretaker's bedroom, a gear/care passage, and one large warm roost with a perch and a resting platform.

## Run record

| Item | Value |
|---|---|
| Model | Claude Opus 5.5 (`claude-opus-5-5`), in the Claude desktop app's Code tab |
| Effort | Harness reasoning-effort setting 40 (as supplied to the session) |
| First implementation action | 2026-10-07 22:21:57 -04:00 (environment check, then `npm init` / `npm install` at 22:22) |
| One-hour deadline | 2026-10-07 23:21:57 -04:00 |
| Actual stop timestamp | see final line of this file |
| Interruptions | None. The session was not paused or restarted. |
| Subagents / other models | None |

## Artifact

- **Build:** `dist/index.html` plus `dist/bundle.js` (three.js r170 and the scene code, bundled as one classic IIFE script). The page needs no network and no external assets. All textures are generated procedurally at load.
- **Source:** `src/tex.js` (procedural textures and normal maps), `src/world.js` (geometry, materials, collision), `src/main.js` (renderer, lights, controls, HUD).
- **CPU smoke test:** `tools/check.mjs`

## Launch

The simplest option is to open `dist/index.html` directly in a desktop browser (Chrome, Edge or Firefox; WebGL2 required). It runs from `file://` because the bundle is a classic script with no fetches.

If you prefer serving it, any static server works. **Suggested** launch address (not started or verified during this run): http://localhost:8721/

```bash
npx http-server dist -p 8721
```

To rebuild from source:

```bash
npm install
npm run build
```

## Controls

| Input | Action |
|---|---|
| Click | Capture the mouse (pointer lock). Click-dragging also works as a fallback. |
| Mouse | Look |
| W A S D / arrow keys | Walk (←/→ also turn) |
| Shift | Hurry |
| C | Crouch (eye height 1.0 m) to inspect low details |
| R or the "Reset to entrance" button | Return to the entrance |
| F | Frame-time overlay: fps, avg/p95/max ms over 0.5 s, draw calls, triangles |
| G | Cycle render scale (1×, 1.5×, up to 2×). The default is 1.5× on HiDPI and 1× otherwise. |
| H | Hide or show the help line |
| Esc | Release the mouse |

## Intended route

1. **Entrance (bedroom):** closed plank door with iron straps, coat pegs with coat and leather apron, boots, small cast-iron stove with a soot-darkened wall, kettle and firewood.
2. **Past the bed:** quilted bed with headboard, nightstand lamp, mug and book. There is also a chest, a washstand, a desk with a lit oil lamp, a ledger and a single shed scale, a window with a night view and curtains, a shelf of books and salve jars, a wardrobe and a pencil portrait of "Ember". Lighting here is soft: two small oil lamps and the stove glow.
3. **Gear passage** (the lane stays clear, about 1.1 m wide):
   - Left side: workbench with vise, a giant scale and a strap under repair, and the hand-written care rota pinned above it.
   - Then a peg rail with harness straps, rope coils and a leather collar.
   - Leaning tools: scraper, giant tongs, pitchfork and shovel. Barrels.
   - Right side: shelves of buckets, oil jars, brushes, cloths, a salve box and bandages, then stacked hay bales.
   - Two lanterns light the passage. A "QUIET PLEASE" sign hangs over the small door.
4. **The roost** (28 × 30 m floor, barrel vault about 16 m high):
   - Rough masonry walls, three dressed-stone transverse ribs on piers, and iron-strapped timber tie-beams with hanger rods.
   - A 12 m arched opening onto a landing ledge at dusk, with a railing.
   - A duckboard route starts at the small door. It passes the stone water trough and pump, the caretaker's table and stool, the giant brush/scraper/tongs rack, the oversized feed tub with ladle, and a hoist chain with a feed basket hung from the vault.
   - It then runs **between the perch piers and under the perch**: a 1.2 m log beam, iron-banded and gouged, on rough stone piers with timber saddles, iron straps and knee braces, plus a ladder, splinters and a gnawed bone. It ends at the railing in the opening.
   - The **resting platform** is a 10.8 m stone ring with a gouged timber rim and iron clamps. Inside are a straw bedding ring and a central coal hearth with heat-blackened stones. Behind it are a riveted iron heat shield and a soot-darkened wall and vault.
   - Large-scale use shows in claw scratches on the floor, walls, piers and above the small door, shed scales, a giant collar on the wall and a floor anchor ring with coiled chain. There is also a keeper's reading chair with a quilt and mug, and fresh bales by the door.
   - Low sunset light enters through the opening, casts a shadow of the arch across the floor and lights the wall around the tiny doorway, which is the "look back" view. Warm braziers and the hearth glow fill the rest.

## Technical notes (performance design)

- All static geometry is merged per material and zone. A Node smoke test of the build gives about 52 meshes and about 123k triangles in total.
- Straw strands (7,000) and shed scales are single `InstancedMesh` draws.
- There is one shadow-casting light: the sun spotlight, 2048² PCF soft. Its shadow map renders **once**, because `shadowMap.autoUpdate = false`. The 9 point lights cast no shadows. Light flicker is slow and low-amplitude, applied to intensity only, so shaders do not recompile.
- Zone-specific "indirect" fill comes from per-zone emissive tinting of the albedo, multiplied by baked vertex colours. Those vertex colours carry the soot, heat-darkening, floor-contact darkening and grime. This keeps the roost warm and the bedroom gentle without extra lights.
- At load, every shader program is compiled and every texture is uploaded (`renderer.compile` and `initTexture`). This should prevent hitches when you first turn toward the roost.
- Collision uses 2D AABB and circle push-out with sub-stepping (≤ 8 cm per step). An area guard reverts any step that would leave the walkable rooms, so you can't walk through walls or off the ledge. The floor is flat, so there is no falling.

## Checks performed vs. not performed

Performed (CPU-only, bounded):

- `esbuild` bundle builds without errors.
- `node tools/check.mjs` builds the entire scene graph in Node with a stubbed 2D canvas: geometry, materials, merges, colliders and instancing. Result: 52 meshes, about 123k triangles, 0 meshes with missing geometry or NaN positions, 9 point lights, 51 box and 12 circle colliders. It also confirms that sample points along the intended route, including the return lane, are not blocked by colliders.

Not performed (per this run's execution conditions):

- No browser, server, screenshot, GPU or frame-rate test was run. **Visual correctness, light balance and frame times have not been observed.**
- Shader compilation of the custom `onBeforeCompile` patch and the two `ShaderMaterial`s (light shafts, dust) was never run on a GPU.
- Canvas text uses system fonts ("Segoe Print" / "Ink Free" with cursive fallbacks), which have not been seen rendered.

## Known limitations / risks

- Light levels were tuned by calculation rather than by eye. The roost or bedroom may read darker or brighter than intended. G (render scale) is the only runtime quality control.
- Point lights do not cast shadows, so a little warm light can leak through walls near doorways. Light distances were limited to keep this small.
- Textures are procedural and tile every 1–3.5 m. Vertex-colour grime breaks up the repetition only partly.
- There is no dragon, by design (optional in the brief). Its presence is told through scratches, scales, bedding, the collar, the hearth and the care gear.
- Step-free flat floors: there are no stairs and no climbing, and the perch and platform are inspected from floor level.
- The landing ledge outside the opening is visible but not walkable (behind the railing).

## Process cleanup

No server, watcher, browser or test process was started. The only processes were short-lived `npm`, `esbuild` and `node tools/check.mjs` invocations, and each exited on completion.

**Actual stop timestamp:** 2026-10-07 22:48:59 -04:00 (stopped early, about 33 minutes before the deadline). No edits were made after this point.
