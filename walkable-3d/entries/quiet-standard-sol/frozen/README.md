# The Quiet Standard

A standalone first-person 3D room above an inn. A retired traveller's battered shield has become a tea table; its boss, old arm loops, rivets and repairs remain visible beneath the teapot. A worn leather chair, wool-covered bed, hearth, household washstand and companion portraits share the main room. The connected study holds a real writing surface, maps, repair tools, winter provisions, boots and travel belongings. A roofed, railed balcony completes the visit and gives a different view back across the sitting area toward the bed.

## Launch the finished build

The production build is already in `dist/`. No install or build is necessary to view it.

From PowerShell, run exactly:

```powershell
python -m http.server 47831 --bind 127.0.0.1 --directory "C:\Users\jmore\Documents\Codex\2026-10-07\task-26\quiet-standard\dist"
```

Then open **http://127.0.0.1:47831/** in a desktop browser. This is a **suggested launch address, not a running preview**. No server or browser was started during implementation. Port 47831 had no listening process when checked. Stop the server afterward with `Ctrl+C` in its terminal.

For a portable copy, extract `quiet-standard-build.zip`, open a terminal in the extracted folder containing `index.html`, and run:

```powershell
python -m http.server 47831 --bind 127.0.0.1
```

Serve the files through localhost rather than opening `index.html` with `file://`. All runtime code, textures and art are local; the scene makes no external asset requests. Textures and small artworks are generated at startup using Canvas2D.

## Controls

| Input | Action |
| --- | --- |
| Click **Enter the upper room** | Start exploring and capture the mouse |
| Mouse | Look around |
| WASD or arrow keys | Walk |
| Hold Shift | Brisk walk |
| Hold C | Crouch to inspect lower objects |
| R | Reset position and view to the entrance |
| Esc | Release mouse and pause |
| **Reset to the entrance** in the pause panel | Reset without mouse capture |
| F | Toggle live frame-interval statistics |

If pointer lock is unavailable, hold the left mouse button and drag to look. The fallback has not been tested interactively.

Suggested inspection route: walk toward the hearth and chair, approach the shield table, pass along the open side of the sitting area to the study doorway at the back right, inspect the desk and shelves, return to the main room and step through the open balcony doorway. Visit the bench and herb pots, turn toward the bed and sitting area, then return to the entrance. There is no automatic tour.

## Construction and checks

The scene uses Three.js 0.180.0. All geometry, material textures, maps, portraits and layout were authored for this entry. No existing project or comparison-entry assets were read or reused. No other models, subagents or model-backed asset tools were used.

Static geometry is merged by material and shadow settings. The completed CPU construction check counted **49 static mesh batches, 87,978 triangles, 27 collision bounds and one directional shadow map**. The shadow map updates once because the scene is static. Pixel ratio is capped at 1.5. Interior point lights do not create additional shadow maps. These are implementation facts, **not evidence of measured runtime performance**.

Checks actually performed:

- Node syntax checks for all four scene modules.
- CPU-only Three.js geometry construction, using a no-op Canvas2D context: positions and normals are finite, and geometry merges successfully.
- Navigation analysis on a 10 cm grid with the actual 22 cm player radius: all eleven sampled inspection positions connect to the entrance.
- Substepped movement checks against the main wall, closed entrance, study furnishings and balcony edge.
- CPU ray intersection check confirming an unobstructed sunlight path through the covered connection onto a sampled living-room floor position.
- Non-serving esbuild production bundle.

Detailed evidence is in `static-check-results.json`. The CPU check does not rasterize textures, create a GPU context, start a server or open a browser.

**Not performed:** browser execution, visual inspection, interactive input testing, screenshots, GPU tests or performance benchmarks. Lighting balance, material appearance and input behaviour require the later permitted browser session. No FPS result is claimed. The optional in-scene frame display reports recent animation-frame intervals during future exploration; it includes display pacing and is not a GPU timer.

## Known limitations

- Requires a desktop browser with WebGL and hardware acceleration. There are no touch controls.
- Objects, embers and doors are static. Exploration, crouching and reset are the interactions.
- The balcony is bounded and has a simple sky-colour backdrop; no surrounding tavern or town was built.
- Collision uses conservative horizontal bounds for major furnishings and a fixed floor height. It does not simulate climbing, jumping, stairs or object physics. Small decorative objects are not all collidable.
- The initial Canvas2D texture generation and first shader compilation are unmeasured.
- The exact serving model identifier and reasoning-effort setting were not exposed to this executor. The available identity is GPT-6 / Codex. Those fields are explicitly marked unavailable rather than inferred.

## Rebuild and recheck

Node.js 24.14.0 and npm 11.9.0 were available for implementation. Pinned dependency versions and the lockfile are included.

```powershell
cd "C:\Users\jmore\Documents\Codex\2026-10-07\task-26\quiet-standard"
npm.cmd ci --no-audit --no-fund
npm.cmd run check
npm.cmd run build
```

These commands do not start a server or watcher. Three.js is MIT licensed; its license is included in the production build.

## Execution record

First implementation: **2026-10-07T09:04:38.1739582+00:00**.

One-hour deadline: **2026-10-07T10:04:38.1739582+00:00**.

The actual final stop timestamp, metadata availability and process-cleanup result are recorded in `execution-record.json`. The clock was never reset or extended. There were no user or session interruptions. Initial restricted dependency-download and bundler-resolver attempts failed; permitted retries succeeded, and their elapsed time remained inside the original hour.


