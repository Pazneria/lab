# Lab research room

The published room at <https://pazneria.github.io/lab/lab-space/> is a bounded
16 x 14 metre workshop. Its benchmark bench opens the working gallery at
<https://pazneria.github.io/lab/>; its exit opens Jordan's home. Search, evidence,
data and detailed graphs remain accessible 2D tools. The north-wall comparison screen opens frozen walkable benchmark entries. No external runtime resources are used.

## Movement and access

Click or tap visible floor to walk to it. Select furniture or an instrument to
approach accessible floor beside it. Select the benchmark bench or home door to
walk to its approach point and open its controls on arrival. Following the public
Arcade's approach-before-action interaction, navigation is implemented locally
for this room's furniture; no Arcade code, dependencies or private files were
copied. Fixed catalog/home anchors always allow direct access.

The room occupies the full content width. Help is optional and holds instructions,
gentle movement, an optional six-button direction pad, and keyboard-accessible
walk-to-bench/home/entrance buttons. WASD walks; up/down arrows walk; left/right
arrows turn. Drag to look. Enter/E opens a nearby station. Escape stops walking
and releases canvas focus. Tab reaches native controls. Direction buttons support
holds and small taps.

A new click replaces the route. Manual walking, an actual drag, Stop, Help,
mode changes, pointer cancellation, loss of focus or a hidden tab cancels it.
Sub-threshold pointer movement does not turn the camera. Routes use an eight-way
grid with expanded furniture footprints, continuous segment checks and path
smoothing. The same clearance protects manual walking. A selected floor point
must be reachable; occupied furniture is approached from nearby free floor.
Walls, ceilings and exterior scenery are rejected. The player never leaves the
existing room bounds. The camera stays level; no bobbing, inertia or auto-tour.

Reduced motion starts flat with gentle walking selected. 3D is deliberate opt-in.
Flat mode, JavaScript off, unavailable WebGL, missing modules and context loss
retain the plan and native catalog/home links. No pointer lock or keyboard trap.

## Provenance and ownership

The first prototype was Codex's, preserved at
429c724225d13edcedb597826b426cc726b9a25a in lab-space-checkout. Actual Claude Code
claude-opus-5-5, normal Claude Pro with usage credits OFF, authored the varied
architecture in room.mjs. See OPUS-ITERATION.md and DESIGN.md for that recorded
aesthetic pass and primary historic references. This functional navigation and
interface change is Codex's. It preserves the room's layout and materials.

This change owns exactly these seven files:

- lab-space/README.md
- lab-space/index.html
- lab-space/assets/navigation.mjs
- lab-space/assets/room.mjs
- lab-space/assets/space.js
- lab-space/assets/space.css
- lab-space/tests/verify-space.cjs

Catalog, results, gallery, data, charts, homepage, other checkouts and dependency
files are outside the change. The complete room remains under lab-space/.

## Local preview and short checks

Serve the checkout on loopback, then open /lab-space/:

~~~powershell
python -m http.server 5199 --bind 127.0.0.1
$env:LAB_PLAYWRIGHT_MODULE = '<existing Playwright module path>'
$env:LAB_AXE_SCRIPT = '<existing axe-core/axe.min.js path>'
node lab-space/tests/verify-space.cjs
~~~

LAB_AXE_SCRIPT is required and must be readable before a browser launches. Both
desktop and mobile WCAG A/AA audits must complete with no violations for a pass.
Reports and screenshots are in ignored evidence/lab-space/. The test verifies
six collision-aware routes and every movement step, unreachable targets, actual
floor/monitor clicks, route replacement/cancellation, drag versus tap, keyboard
focus, station/home arrival, optional mobile controls, touch and reflow, reduced
motion, flat view, context loss, unavailable WebGL and JavaScript off.

For a deployed pass, set LAB_ROOM_URL to the published room URL and run the same
command. Confirm the Pages workflow head and served asset hashes separately.
The harness uses one separate headless Edge with sequential contexts, software
WebGL and simulated touch. It does not test a real phone, a screen-reader user
session, sustained GPU performance or the catalog regression suite. It touches
no existing desktop browser, game or other app.

## Security and rendering

Only exact HTTPS public catalog/home destinations can be opened by station
logic. Reference links are fixed verified primary sources. No arbitrary URLs,
untrusted HTML, private data, credentials or query-supplied scripts. No new
dependencies: local Three.js 0.180.0 and MIT license remain unchanged.

Pixel ratio is capped at 1.25; one static 1024px shadow map is retained. Frames
run only during movement/input/resize and stop at rest or when the tab is hidden.
No global permissions, folder trust, accounts or billing settings are changed.
Publish through a scoped PR after fetching and preserving remote owner work;
main deploys GitHub Pages. Existing gallery and home destinations stay intact.


## Walkable comparison screen

The north cabinet holds a real 3D screen with JPEG previews and ray-picked controls. Choose **Walk to 3D benchmark**, then click either still to enter, or use the left/right screen arrows to choose a pair. With three finished entries there are three pairs; arrows stop at the first/last pair. **Compare worlds** provides equivalent native controls on desktop, mobile and the flat fallback. Model labels are hidden by default. Personal preferences share the standalone benchmark's browser-local record; grades remain separate in its inspector/notebook.

The original catalog monitor, room routes, furniture and destinations are preserved. Opening an entrant suspends Lab input and rendering before its opaque-origin sandbox is created. **Exit scene → Lab** destroys the child context and restores the same room position and pair. Escape explicitly releases the child pointer lock through the host bridge and focuses Exit. Back, navigation and hiding the tab unload the entrant; Forward/reload never launch one. Position and pair are retained in the page's history state. The room's resident renderer is idle while an entrant runs; it is not recreated after each visit.

The common host viewer lives in `walkable-3d/assets/viewer.js`. The screen adds `assets/walkable-screen.js` and `.css`; no entrant code is evaluated in the parent. All scene bytes and disclosures are governed by the walkable benchmark's provenance. Additional lifecycle tests: `node tests/verify-walkable-room.cjs`. The local CORS preview server is `node scripts/serve-walkable.cjs`; open `/lab/lab-space/`.
