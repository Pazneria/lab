# Lab research room

The published room at <https://pazneria.github.io/lab/lab-space/> is a bounded
16 x 14 metre workshop. Its benchmark bench opens the working gallery at
<https://pazneria.github.io/lab/>; its exit opens Jordan's home. Search, evidence,
data and detailed graphs remain accessible 2D tools. The entrance-facing comparison exhibit opens frozen walkable benchmark entries; the existing catalog bench stands in the east gallery. No external runtime resources are used.

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
access fallback, pointer cancellation, loss of focus or a hidden tab cancels it.
Sub-threshold pointer movement does not turn the camera. Routes use an eight-way
grid with expanded furniture footprints, continuous segment checks and path
smoothing. The same clearance protects manual walking. A selected floor point
must be reachable; occupied furniture is approached from nearby free floor.
Walls, ceilings and exterior scenery are rejected. The player never leaves the
existing room bounds. The camera stays level; no bobbing, inertia or auto-tour.

The 3D room is the normal supported experience. There is no Flat view switch or full-size floor-plan presentation. Reduced motion starts with compact exhibit links and an explicit gentle-3D entry button. JavaScript off, unavailable WebGL, missing modules and context loss retain honest direct exhibit access. No pointer lock or keyboard trap is added to the Lab.

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

The entrance-facing Worlds exhibit holds two JPEG stills and ray-picked controls. Choose **Walk to worlds**, then click either still to enter. Voting requires opening both entries in the current comparison; earlier opens of the same entries do not unlock a fresh comparison. A vote reveals both models and keeps the same previews and selected choice visible. **Next comparison** then chooses a random eligible prompt, two distinct requested-model groups and randomized A/B order; before voting, Next skips without saving a preference. The previous arrow browses within the selected prompt. **Compare worlds** provides equivalent native controls on desktop, mobile and the compact access fallback, plus the model leaderboard labeled **Your votes/grades on this browser**. It reports actual local vote counts and win rates separately from available complete rubric averages and sample counts. Model labels are hidden by default. Preferences retain their existing browser-local entry-ID keys; grades remain separate.

The original catalog monitor, room routes, furniture and destinations are preserved. Clicking an entrant disposes the Lab renderer and navigates this tab to the dedicated `walkable-3d/scene.html` host. No Lab canvas remains behind the scene. **Return to comparison** uses Back to restore the same room position and A/B pair, reopening the native comparison controls when the scene was opened there. A fixed same-origin return link also restores the comparison if Back is unavailable. Per-tab handoffs credit an entry only after the shared viewer reports ready; startup failure adds no credit. Old opens never unlock a newly selected comparison. If session storage is blocked, the scene remains manually openable and voting stays locked without readiness receipts.

A fresh Lab visit chooses its first comparison with the same eligible prompt/model picker used by Next, as soon as the index arrives. Explicit prompt/entry links select deterministically; history restores the existing pair, side order, model visibility, reveal and current-comparison opens. Next and Previous reset viewing eligibility. No scene starts during comparison loading.

The scene page retains the shared opaque-origin sandbox, frozen HTML integrity check, readiness bridge and personal grading sheet. Escape releases child pointer lock and focuses **Grade this scene**. Resume retains the same iframe and still needs the user's click to recapture the mouse. Direct scene links, reload and Forward remain unloaded until an explicit Open; only a one-use handoff from a Lab click starts immediately. Hiding or leaving the scene unloads its child. The Lab renderer is recreated on return when needed.

CPU checks (no browser/GPU/entrant):
`node --experimental-vm-modules --test tests/verify-walkable-lab-navigation.test.mjs tests/verify-walkable-hit-targets.test.mjs tests/verify-walkable-grading-ui.test.mjs tests/verify-walkable-public-judgments.test.mjs tests/verify-walkable-viewport.test.mjs`
They cover initial/Next selection, board/native clicks, repeated clicks, readiness/return receipts, restored side order, deep links, current-comparison voting gates, grading and public client regressions. Browser, actual scene, pointer-lock, accessibility and GPU checks remain paused for this change. The older browser room harness describes the earlier in-room viewer and is not validation for this navigation flow. Local preview still uses `node scripts/serve-walkable.cjs`; no preview server was started for these CPU checks.

## Entrance exhibit layout

The entrance starts on the central axis facing the Worlds display. Its shared placement record in `navigation.mjs` controls the display, collision footprint and approach point. The original catalog bench and its props are rotated together into the east gallery, facing the hall; their transformed footprint and approach point use the same record. The home exit and architectural volumes remain in place. The orientation inset reflects both exhibit locations. A layout version prevents an old room-position history record from restoring a visitor behind the relocated display.

The Lab keeps its existing render-on-demand behavior, low-power renderer preference and pixel cap. The display contains stills; a submitted scene starts only after an explicit open. Opening a scene leaves this room page; returning restores its viewpoint and comparison. Recorded failures are excluded from random playable pairs.

## Board and grading refinements (2026-10-07)

The visible Worlds board uses its real plane and narrow frame for ray picking,
with CSS pointer coordinates converted to normalized camera coordinates and the
face UVs converted to the drawn 1280 × 600 canvas. Board whitespace opens
Compare worlds; actual preview-image rectangles open the corresponding scene.
Disabled votes remain disabled. Gaps outside the physical board, its cabinet,
posts, and unrelated furniture never activate the exhibit. The signs above
retain their existing shortcut. Visible geometry in front blocks picking.
Click-versus-drag intent, approach routing, and native keyboard controls remain.

Leaderboard is visible on the board beside its heading and beside the native
A/B vote controls. It opens the comparison panel and focuses the public tally
(or the local tally when public voting is disabled), without recording a vote.
Reveal labels show only model names parsed from the requested configuration;
full effort, version certainty, serving-backend and timing provenance remains
in the build inspectors and benchmark documentation. No catalog data changed.

Grade this scene uses the shared `walkable-3d/assets/rubric.css` design with
system typography, restrained neutral surfaces, score rows, sliders and precise
half-point number inputs. Sliders start unscored; they do not create default
points. A live total requires all three scores. Private partial grades and
notes, explicit save/clear, dirty revisions, and 45/35/20 limits are preserved.
Public rubric submission remains a separate signed-in action; no private values
or notes are uploaded and rubric scores do not affect pairwise Elo.

CPU checks (no browser, renderer or scene):
`node --experimental-vm-modules --test tests/verify-walkable-hit-targets.test.mjs tests/verify-walkable-grading-ui.test.mjs tests/verify-walkable-public-judgments.test.mjs tests/verify-walkable-viewport.test.mjs`
The ray tests construct the exact production board geometry and cover face UVs,
frame edges, outside gaps, and occlusion. Rendering and real assistive-technology
review are intentionally not claimed by these checks.
