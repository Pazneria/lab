# The Loft Above the Gilded Tankard

An explorable first-person 3D scene (three.js r169, WebGL): a retired adventurer's home above a tavern.
It has a living/sleeping room, a connected study-and-storage alcove, and a short covered balcony over the street.

## Launch

The build is a single classic script, so it runs straight from disk:

- **Open `dist/index.html`** in a desktop browser (Chrome, Edge or Firefox). Double-clicking the file works; it uses no ES modules, fetches nothing and loads no external assets.
- Or serve the folder statically. Suggested launch address (not started or verified here): `npx http-server dist -p 5717`, then open http://localhost:5717/

To rebuild from source: `npm install`, then `npm run build`. This writes `dist/bundle.js` with esbuild.

## Controls

| Input | Action |
|---|---|
| Mouse | Look. Click the view to capture the mouse and Esc to release it. Dragging also works. |
| W A S D / Arrow keys | Walk |
| Shift | Walk faster |
| Q / E | Turn without the mouse |
| R | Reset to the entrance |
| H | Toggle the help overlay |
| F | Toggle the frame-time panel (fps, avg/p99/max ms, draw calls, triangles) |
| C | Toggle object captions |
| P | Cycle render scale (default min(DPR,1.5) → 1.0 → min(DPR,2)) |
| [ / ] | Lower or raise exposure |

## Suggested route

Entrance (SE corner, by the closed door) → hearth, shield tea table and antler sock-rack → through the low opening into the study alcove (west) → past the spear-rod curtains onto the covered balcony (north) → turn back for the view through the doorway toward the bed and sitting area → back to the door.

## What's in it

- **Repurposed adventuring gear.** A dented round shield on three new legs is the tea table, with a teapot, cups, biscuits and tea-ring stains. Frost-stag antlers over the hearth dry wool socks and mittens. A boar spear is the balcony curtain rod. A wyrm horn by the door holds the cloak, satchel and hat. An old quiver holds walking sticks and a fishing rod. A knitting basket by the armchair explains the socks. A broken sword is the fire poker. The camp kettle holds the firewood. The expedition lantern lights the desk. Two dented helms on the balcony rail grow herbs. A surveyor's spyglass on a tripod now watches birds. The expedition trunk holds blankets.
- **Story details.** Three companion portraits sit in tarnished frames above the settle. An unopened letter with a red wax seal leans against books on the desk. A route map with a red X is pinned above the desk. Pack, bedroll, sword and bow hang on pegs, and the bookcase holds a horned skull, jars, a rope coil and rolled maps.
- **Materials.** All textures are procedural canvas maps. Softened wool (patchwork quilt, tartan throws, rug, knitted socks) uses a sheen material. Worn leather has creases and lighter, glossier wear. Dark timber has grain and plank seams. Tarnished metal has a roughness/metalness map with dark tarnish, verdigris and scratches. The plaster has fresh and grey patches, hairline cracks and spots where it has fallen off to the lath.
- **Lighting.** A low late-afternoon sun with a static shadow map comes through the balcony doorway, the bed window and the alcove window, with soft light shafts and drifting dust. Warm point lights come from the hearth fire, a candle chandelier, a door sconce, a bedside candle, the desk lantern and a small alcove fill. Contact-darkening decals ground the walls and furniture.

## Performance design

- All static geometry is merged into one mesh per material: about 40 draw calls and about 72k triangles in total.
- The sun shadow map is rendered once (`shadowMap.autoUpdate = false`), since nothing that casts shadows moves. Point lights cast no shadows.
- Animation (fire, dust, flicker) is done in shaders or by changing a few uniforms and light intensities. The CPU does no per-frame geometry work.
- Shaders are precompiled with `renderer.compile` before you enter, to avoid hitches the first time you look at something.

## Checks performed (CPU only)

- The esbuild bundle builds without errors.
- In Node, with a stubbed 2D canvas and no rendering, the full scene builds: 40 merged meshes, about 72.3k triangles, no NaN positions, and every merged mesh has position, normal, uv and color attributes.
- A flood fill of the player's collision circle (radius 0.27 m) from the entrance reaches these points: the hearth and shield table (from the open north side), the alcove desk by the letter and lantern, the bookcase, the balcony doorway, rail, west end and east end, the room centre, and beside the bed and wardrobe.

## Not performed

These checks were not performed, by rule: rendering in a browser, visual inspection, interactive testing, GPU work and frame-rate measurement. Lighting levels, exposure and material appearance have not been seen. The `[` / `]` keys exist so exposure can be adjusted if needed.

## Known limitations

- All visuals are unverified (see above). Possible issues: overall brightness balance, how strong the light shafts look, and small placement or intersection errors among the many hand-placed props.
- Movement is on one floor level (no stairs or jumping). Collision uses 2D boxes for walls and furniture. Small props such as boots and the rope coil are not collidable.
- The entrance door is closed and part of the wall; the inn stairs are not modelled.
- The far town, street and hills are simple low-detail backdrop shapes.
- Pointer lock needs a click on the view. If the browser refuses it, drag with the mouse to look.

## Run record

- Model: Claude Opus 5.5 (`claude-opus-5-5`). The effort setting is not shown inside the session.
- First implementation action: 2026-10-07 16:43:33 EDT (UTC−04:00)
- Deadline (60 min): 2026-10-07 17:43:33 EDT
- Editing stopped: 2026-10-07 17:14 EDT, before the deadline
- Interruptions: none. No subagents or other models were used.
- Processes: no server, watcher, browser or test process was started. The esbuild and node check runs exited on their own.
