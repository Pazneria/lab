# Lab controls, loading and walking exit

Prepared on 9 October 2026 from released main
`55a102e8262e80677c461dfe4f64918aba4aa4e8`. This follow-up changes only the
host Lab derivative and its documentation/tests. Merge and browser/GPU QA remain
held by parent coordination while the Library has the exclusive graphics slot.

## Library comparison

The fixed Library implementation was read without editing it or its processes.
Its initial source HEAD was `4ac1e24e9e380332646acaa9a4ebca81735ceb37`.
The final read-only comparison used the newer loading-screen commit
`14290c082415b9c911328cd37d36dcab0c59736d`, with unchanged controls. Inspected
`src/look.js` SHA-256 was
`3e0c4d3585c8ec8988e67c96dfab16af4f415a2f751de44da074565ed822ad0b`,
and `src/main.js` SHA-256 was
`273efb1e5cfeadbc4d42fae9cc5d59df8a926dc10faa10c7fa28d91b7e3137f2`.
The hashes identify the inspected working files as well as the commit.

| Behavior | Current Lab contract aligned with Library |
| --- | --- |
| Entry | Load automatically; keyboard movement after readiness; deliberate click or Explore/Enter acquires mouse capture. |
| Mouse look | Direct counts at 0.0026 radians per count, sensitivity 40–220% in 5% steps, default 100%; pitch clamps at ±(pi/2 − 0.02). Camera pose/picking updates immediately. |
| Capture fallback | Request raw input; retry plain capture only on `NotSupportedError`. Denial/missing/legacy errors enable stable client-coordinate left-button drag. First capture gesture consumes its click. |
| Capture lifecycle | Gain preserves walking keys; loss/pause clears keys and velocity. Request IDs reject late results. Focus/show/close do not recapture; explicit Return to room does. |
| Keyboard | WASD/arrows walk/strafe, Shift sprint, C crouch, E physical station. Enter captures when uncaptured and interacts after capture; Escape opens paused controls. |
| Movement | Walk 2.5, sprint 4.6 world units/second; crouch multiplier 0.55, normalized diagonals, velocity blend `1-exp(-12*dt)`, bounded 50ms steps. |
| Eye | Standing 1.62, crouch 1.0; blend `1-exp(-10*dt)` and settle. Gentle movement remains 1.3 world units/second. |

Lab floor collision, native station actions and
SceneBench integration remain Lab-specific. Library book shortcuts and stair
physics were not imported. Movement uses only WASD or arrow keys, with no automatic
click-to-walk routes. Floor clicks acquire mouse look without moving; station
clicks and Help shortcuts open their controls directly.

## Readiness and access

The full-viewport loader uses a neutral dark background, small destination name,
subtle indeterminate indicator, and actual stages: Loading Lab, Preparing room,
Placing character. Its palette, type and 180ms fade match the newly committed
Library loader. It fades only after a successful rendered frame with the
central character ready. Zero-area/inactive draws cannot dismiss it. There is no
mandatory entry dialog. Canvas focus follows readiness only if the visitor has
not already focused another control; loading never captures the mouse.

Reduced motion removes the loader animation/fade and enables gentle movement.
Import, character or render failure exposes direct destination links and Try
again. Generation checks and disposal prevent stale readiness from hiding a new
loader after navigation/retry. Help stays on demand, with native dialog escape,
focusable controls and a deliberate Resume action.

## Two physical door sets

The first set is at z=8.5; the second is at z=11.5 in the original vestibule.
Four glass/frame leaves use eight instanced material/geometry batches, existing
materials, shared primitives and no new textures. The original rear wall is split
around the second opening, with a short bounded floor/landing. A small sill
closes the original threshold floor gap. Closed panels block movement; opening
panels, collision and raycast bounds use the same progress/centres. Fixed pockets
exclude the leaf sweeps so a player cannot be caught at a jamb.

Grounded approach opens each set with a 0.7-second transition. Departure closes
it over 0.9 seconds after a 0.65-second hold. Occupancy keeps it open; gentle mode
slows the transitions. The machine samples before movement to install gates and
after movement at dt=0 to detect continuous crossings without advancing twice.

A valid trip must cross the first open plane, the second open plane, then the
landing trigger at z=11.88 within x=±0.95. Swept crossing coordinates prevent
straight/diagonal sprint steps from missing a narrow trigger. The reachable end
stop is included through z=12.035. Backtracking, large position jumps, invalid
samples and explicit cancellation cannot invent a trip. Ordinary pauses retain
verified vestibule entry but require a fresh outer-plane crossing; input and
velocity are cleared. Manual Home links/plaque/shortcut remain available.

The second-door approach issues one optional public Home HTML preload: exact
allowlisted `https://pazneria.github.io/`, same-origin mode, omitted credentials,
no referrer, rejected redirects, six-second abort and 256KiB read budget. No DOM,
secondary scene or hidden WebGL is created. Failures never block walking. Focus
loss, backtracking and departure abort in-flight work. The loader shows Home
for 180ms (zero delay for reduced motion); disposal occurs before same-tab
navigation. Back restores the Lab entrance outside the departure plane.

## Verification and remaining runtime gate

All **134** affected CPU cases pass, covering controller/capture/loading,
navigation, actual pinned Three r186.1 cameras/door meshes/rays/disposal,
exit transitions, SceneBench and CharacterBench contracts. Two independent
reviews found no remaining material findings after fixing both sprint-trigger
edge cases. Frozen guards verify 1,000 recorded files, 1,146 admitted publication
files and unchanged 89-record voting catalog hash
`6dba31abbabc2ba3f63b2db19df878aca5cc61936b01d0179e0198278ee1cbe3`.
The original scene tree, six admitted characters, public Ivo copy and both
benchmark routes remain unchanged.

Build with exact `three@0.186.1` / `esbuild@0.28.2` using
`LAB_PRODUCTION_DEPENDENCIES`, then run `scripts/build-production-lab.cjs`.
Run the focused command in `LAB-CHARACTERBENCH-QA.md`, replacing its three
production test paths with `tests/verify-production-*.test.mjs`, followed by the
same integrity, publication and catalog parity guards.

This follow-up has started **zero** browsers, servers or GPU sessions. Native
pointer-lock promise/event ordering, visual loader/door fidelity, touch hardware,
Home response reuse and measured door-motion/frame pacing await clearance.
Moving doors currently refresh the retained 4096px shadow; that cost must be
measured under identical renderer/resolution/paths before release. Historical
PR #59 RTX scheduling evidence does not certify these new transitions. No new
FPS or visual-regression claim is made. Library files/processes, driver/settings,
homepage, private Studio, grading service and entrant trees were untouched.
