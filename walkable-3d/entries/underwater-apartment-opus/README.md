# Habitat Quarters, 108 m

An explorable three.js scene: a researcher's apartment on a reef floor. It has a living/sleeping room, a connected research work nook, and an observation room with a heavy, deeply recessed viewport looking onto a small dark reef.

## Launch

The build is a single classic script (`dist/bundle.js`, no ES modules, no network fetches, no external assets), so it runs straight from disk:

- **Easiest:** open `index.html` in a desktop browser with WebGL2 (Chrome, Edge or Firefox).
- **Optional static server** (suggested launch address only; it was not started during this build):
  ```bash
  npx --yes serve -l 5719 .
  ```
  then browse to `http://localhost:5719/` (suggested port 5719).

To rebuild after editing `src/`: `npm install` and then `npm run build`.

## Controls

| Input | Action |
|---|---|
| Click the intro card or the canvas | Capture the mouse (pointer lock). Dragging with the button held also works as a fallback |
| Mouse | Look |
| W A S D / arrow keys | Walk (about 1.7 m/s) |
| Shift | Walk faster |
| C | Toggle crouch (eye height 1.08 m) for low shelves and the bench top |
| R | Reset to the entrance |
| [ / ] | Exposure darker / brighter |
| P | Cycle the render-resolution cap (1.0 / 1.5 / 2.0 × device pixels; default 1.5) |
| F | Frame-time readout (avg / worst ms, fps, draw calls) |
| H | Show help again. Esc releases the pointer |

## Route as built

1. **Entrance** (start position): a closed oval airlock hatch with a wheel, dogs and a rubber seal, plus a pressure status panel, coat hooks with a robe and dive mask, a boot rack with yellow boots and fins, and a rubber doormat.
2. **Living / sleeping room** (7.2 × 6.4 m, 2.55 m ceiling with chamfered corners and ring frames). It has:
   - A double bed with duvet, pillows, knit blanket, a padded headboard, a plush whale and an open book.
   - A wall shelf with photos, a clock and a sconce, and a bedside table.
   - A galley with sink, hob, kettle, fruit bowl and mugs, plus a locker.
   - A dining table for two.
   - A sofa with cushions and throws, a rug, a coffee table and a leather armchair.
   - A floor lamp, a bookshelf, a guitar, and a porthole with café curtains.
   - A dehumidifier, colour-coded pipes with bulkhead collars, and a drip tray.
3. **Watertight hatch** into the **work nook**. Both doorways are thick, rounded bulkhead openings with coaming frames, rubber seals and open hatch leaves.
   - The steel-edged workbench holds a microscope, a laptop showing CTD traces, a field notebook, five labelled specimen jars, petri dishes, a CTD instrument and an articulated task lamp.
   - Above and around it: a labelled drawer cabinet, a pegboard of tools and a species chart.
   - The opposite wall has a specimen rack, a valve manifold with pressure gauge, and a hanging wetsuit.
4. **Observation room** (3.35 m ceiling). The viewport has:
   - A splayed reveal about 0.5 m deep, then a stainless clamp ring and a black rubber gasket.
   - A 240 mm acrylic block with a green edge tint and condensation on its lower edge.
   - An outer lip, a heavy bolted interior flange with 56 bolts and washers, and I-beam columns, a header and knee braces with bolted gussets.
   - A hazard-striped plinth, a placard and gauge, a weep drain with a stain, and an exterior floodlight and guard bars visible through the glass.
   - Furnishings: a swivel chair with a blanket, a side table with mug and binoculars, a console, an ID chart, a heater, an emergency breathing-set locker and a flood alarm.
5. **Reef**: fog-bounded seabed with ridge and arch silhouettes, branching and brain corals, sponges, sea fans, swaying kelp, a looping fish school, a distant gliding ray, bioluminescent specks, drifting marine snow and faint light shafts against a gradient backdrop.
6. **Return**: both hatches sit on one axis (x = 1.2), so the observation room looks straight back through the nook to the warm living room and the poster and sconce on the entrance wall.

## Performance design (not measured; see Checks)

- All static geometry is merged by material after build: about 93 merged batches plus instanced bolts. Box-projected world UVs keep texture scale correct after merging.
- No dynamic shadows. Soft contact-shadow decals sit under the furniture instead.
- 9 lights in total: hemisphere, 7 point (2 living, floor lamp, nook task, observation warm, viewport cool spill, reef fill) and 1 exterior spot. The other fixtures use emissive materials rather than extra lights.
- Transparency is limited to the viewport block, the condensation film, specimen jars and porthole discs. Sea fans use alpha-test, not blending.
- Kelp sway and marine snow are animated in vertex shaders. Fish are one InstancedMesh.
- Shaders are precompiled (`renderer.compile`) before the intro card can be dismissed, so first views of new materials should not hitch. Pixel ratio is capped at 1.5 by default (key P changes it).
- Movement: per-axis circle-vs-AABB collision against walls and furniture, sub-stepping, and a walkable-region guard so you cannot leave the rooms. The floor is flat and has no gravity, so you cannot fall.

## Build record

- Model: Claude Opus 5.5 (`claude-opus-5-5`), effort setting as configured for this session. No subagents or other models were used.
- First implementation action: 2026-10-07 22:22:17 EDT (-0400)
- Deadline (exactly 60 min later): 2026-10-07 23:22:17 EDT (-0400)
- Actual stop timestamp (last edit): 2026-10-07 22:49:22 EDT (-0400). No interruptions.
- Libraries: three@0.170.0 and esbuild@0.24.0 (npm registry). All textures are procedurally generated canvases at startup.

## Checks performed vs. not performed

**Performed (CPU-only, no browser, no server):**
- `esbuild` bundle and `node --check dist/bundle.js` syntax check pass.
- An offline Node smoke test (in the session scratchpad, not shipped) with a stubbed DOM and a stubbed WebGL renderer:
  - The whole scene builds and merges with no runtime exceptions, and the animation callbacks run.
  - A scripted walk along the inspection route reaches the living room, both hatches, the workbench (about 0.3 m from the bench edge) and the window. Collision stops the player at z = −7.05, about 0.35 m from the flange face and 0.85 m from the acrylic.
  - The walk returns through both doors and is stopped by the entrance wall.

**Not performed (per run rules):** no browser, headless browser, GPU rendering, screenshots or frame-time measurement. Visual appearance, lighting balance, z-fighting and real frame rates are unverified.

## Known limitations

- Lighting intensities were tuned blind. If the scene reads too dark or too bright, use `[` / `]`.
- No real shadows or baked GI. Contact decals approximate grounding.
- Collision is 2D (XZ). The 10 cm hatch coamings are stepped over visually, with no height change.
- Through the side portholes you see only the fogged backdrop; the modelled reef is only beyond the main viewport.
- Some small props intersect slightly (for example, ring-frame ends behind the upper cabinets).
- Startup generates textures synchronously, so expect roughly 1–2 s of blank page before the intro card shows.
- `globalThis.__habitatDbg` is a small debug hook left in for the offline smoke test.
