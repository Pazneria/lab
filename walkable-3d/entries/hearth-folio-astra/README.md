# Hearth & Folio

A walkable hillside library, built for desktop browsers. A tall timber reading hall opens into a glazed reading alcove; a broad, shallow staircase reaches an L-shaped upper gallery overlooking the lower collection.

## Launch

Requires **Node.js 18 or newer** and a modern desktop browser with **WebGL 2** enabled.

From this folder:

```powershell
node server.mjs
```

Then manually open **http://127.0.0.1:4316** in your browser. The server binds only to the local machine and does not open a browser automatically. Stop it with **Ctrl+C**.

`npm start` is equivalent. The required Three.js 0.180.0 files are included in `vendor/`; **no installation or network access is needed to launch**. Do not open `index.html` with `file://`, because browsers require HTTP for these modules.

The optional `launch.cmd` runs the same local server on Windows. If port 4316 is occupied later, use `$env:PORT=4317; node server.mjs` and open the corresponding address.

## Controls

| Input | Action |
| --- | --- |
| Step inside / click the room | Capture the mouse |
| Mouse | Look around |
| W A S D or arrow keys | Walk |
| Shift | Walk faster |
| Q / E | Turn using the keyboard |
| Escape | Release the mouse |
| R or Reset | Return to the entrance |
| H or Controls | Open/close the controls panel |
| F or Timing | Show/hide live frame timing |
| Detail: High / Balanced | Choose rendering resolution |

If the browser denies mouse capture, hold the left mouse button and drag to look. Movement has no head bob, jumping, or forced camera motion. Reset is always available.

## Suggested inspection route

1. Walk around the low double-sided bookcases and browse the collection under the gallery.
2. Cross to the right-hand window alcove. There is room to approach the bay windows between the chairs and side table.
3. Return toward the entrance and approach the broad stair from its lower end on the left.
4. Ascend, follow the west gallery past the globe, and turn right onto the overlook.
5. Look down across the bookshelves and reading table, then return by the same stair.

The hall is approximately 16 × 18 metres. The alcove adds 3.6 × 6 metres. The gallery stands 3.4 metres above the main floor. Twenty 170 mm risers share a continuous movement ramp. An approximately 460 mm wide collision body, furniture bounds, guardrails and floor support checks keep the route contained.

## Build and validation notes

All architecture, furniture, illustrations and surface textures were authored in this workspace. Book covers, page blocks, spine decorations, timberwork, ironwork and repeated furnishings use shared instanced geometry. The sunlight shadow map is cached after the first frame. There is no asset streaming, adaptive detail switching, external font, CDN or remote texture dependency.

Run the permitted static checks with:

```powershell
node scripts/check.mjs
```

The ten checks cover JavaScript syntax, bundled import resolution, offline assets, boundaries, stair and gallery support, collision blocking, and the complete requested route using navigation arithmetic. `static-check-results.json` contains the results.

**Interactive, visual, server-startup, GPU and performance checks were not run.** This run explicitly prohibited starting a preview server, launching or controlling a browser, UI automation, scene execution and performance benchmarks. Passing arithmetic checks does not establish browser behavior or measured frame performance.

The optional timing panel measures rolling browser frame intervals over five seconds, including display pacing and long stalls. It reports mean, median, 95th percentile, maximum, draw calls and triangles. These are measurements made only after you launch the build; no frame-rate claim is made in this delivery.

## Known limitations

- Desktop keyboard and mouse are required; touch exploration is not implemented.
- The hillside is a backdrop and cannot be walked into. The entry door is decorative.
- Small props use simplified furniture-level collision bounds. The stair surface is a smooth support ramp over visible treads.
- Lighting is static. Books, lamps and furnishings are not interactive.
- Visual quality, browser input behavior and performance await the later interactive test.

The benchmark's exact start, deadline, stop, model disclosure, infrastructure note and process audit are in `run-record.json` in the delivered workspace, alongside the build archive. Three.js retains its MIT license in `vendor/THREE-LICENSE.txt`.
