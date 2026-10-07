# The Quiet After

A standalone, walkable Three.js scene: the retired adventurer's rooms above the Copper Kettle. The living and sleeping room connects to a working study alcove, then a short covered balcony that returns to the main room.

The old compass shield is now a tea table. Its boss supports a kettle trivet; its dented rim, rivets, faded crest and old arm straps remain. A repaired quilt, softened reading chair, companions' portraits, sealed letter, field journals, map drawers, mending basket and balcony herbs describe the life that came afterward.

## Launch

Dependencies are already installed in the delivered workspace. In PowerShell:

```powershell
Set-Location 'C:\Users\jmore\Documents\Codex\2026-10-07\task-27\quiet-after'
npm.cmd run preview
```

Then open **http://127.0.0.1:5187/** yourself. This is a **suggested launch address, not a running preview**. Port 5187 was selected for this entry; the command uses strict port selection and will report a conflict rather than silently choose another port.

The production build is in `dist/`. It is self-contained, including the Three.js code, and has no remote fonts, images, APIs or runtime network dependencies. Any static server can serve that directory. Do not open `index.html` directly with `file://`.

If dependencies have been removed, restore and build with:

```powershell
npm.cmd ci --no-audit --no-fund
npm.cmd run build
npm.cmd run preview
```

For source editing, `npm.cmd run dev` uses the same suggested port. Neither development nor preview was started during this run.

## Controls

- **Come upstairs / Return to the room:** enter and capture the mouse.
- **W A S D** or **arrow keys:** move.
- **Mouse:** look. Click-drag also works when pointer capture is unavailable.
- **Shift:** brisk walk.
- **Esc:** pause and release the mouse.
- **R:** return to the entrance, restoring position and viewing direction.
- **Pause menu:** sensitivity, render quality and reset controls.

Desktop keyboard and mouse are required. There is no jumping, crouching or climbing. Movement stays at human eye height above the flat floors. Major walls and furnishings have collision, and the balcony edges are blocked. Furnishings are for inspection rather than manipulation.

## Inspection route

From the entrance, walk toward the leather chair and shield tea table. Pass the table on its eastern side, then enter the timber-framed opening into the study. The map desk is to the right, drawers to the left, and shelves behind you. Continue to the study's north doorway, walk left along the covered balcony, then enter the larger room again. Turn toward the bed, sitting furniture and hearth before returning to the entrance.

## Construction

- Original procedural geometry and Canvas 2D material textures; no downloaded scene assets.
- Distinct timber grain, plaster repairs, wool weave, leather wear and metal patina.
- Late-afternoon directional sunlight, a warm hearth and practical interior lamps.
- 55 merged static material batches, one shadow-casting light, static shadow updates and capped pixel ratio. These are implementation facts, **not performance measurements**.
- Deterministic collision geometry with movement substeps, continuous thresholds and a bounded balcony.
- Three.js 0.180.0 and Vite 7.1.9, pinned in `package-lock.json`.

## Verification and limits

`npm.cmd run check` performs JavaScript syntax checks, numeric collision-route checks and a CPU-only scene assembly check with a no-op canvas context. The assembly check validates finite geometry, bounds, batch count and light count; it does not draw any images or verify texture appearance.

`npm.cmd run build` produces the release in `dist/`. The build passes with Vite's advisory about a JavaScript chunk larger than 500 kB.

**No browser, headless browser, renderer, UI test, GPU test, performance benchmark, development server or HTTP server was launched.** Visual quality, shader execution on an actual GPU, interactive behaviour and frame times have not been verified. Those checks are reserved for the later inspection session. No measured frame-rate claim is made.

Other limitations: desktop/WebGL 2 only; static fire and plants; no sound; a painted sky beyond the bounded balcony rather than a modeled town; small tabletop objects have no individual collision. Render quality can be reduced in the pause menu.

See `BUILD-REPORT.md` and `run-record.json` for execution evidence, timing, dependency interruption history and cleanup. The runtime did not expose the exact model identifier or reasoning-effort setting; the record states that limitation rather than guessing.
