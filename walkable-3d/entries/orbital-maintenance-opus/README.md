# Bay 3 · Maintenance — orbital station service bay (benchmark entry)

An explorable first-person Three.js scene: a ribbed maintenance bay with a CMG-4 control-moment-gyro gimbal assembly
under slow-roll test, an open task-lit service alcove, ordinary stairs to an elevated inspection walkway with a spur
that overlooks the machine, and a sealed viewport onto a planet and station truss.

## Launch

```
cd opus-orbital-maintenance-entry
npm install        # only needed if node_modules is missing (three@0.170.0, the sole dependency)
npm start          # = node server.mjs 8743
```

Open **http://127.0.0.1:8743/** in a desktop browser (Chrome/Edge recommended), click **ENTER BAY**.
Optional: `http://127.0.0.1:8743/?scale=1.5` forces the render scale (1, 1.25, 1.5); otherwise it is calibrated once at load.

## Controls

| Input | Action |
| --- | --- |
| Mouse (click to capture) | Look |
| W A S D / Arrow keys | Walk (2.5 m/s) |
| Shift | Walk faster (4.6 m/s) |
| C or Ctrl (hold) | Crouch to inspect low parts |
| R / RESET button | Reset to start position |
| F | Toggle frame-time stats (fps, avg, p99, max ms, draw calls) |
| H | Toggle hint bar |
| P | Cycle render scale 1.0 → 1.25 → 1.5 |
| Esc | Release mouse |

Suggested route: circle the machine → amber-lit service alcove (right wall) → stairs along the far-left wall →
walkway along the back wall → inspection spur over the machine → back down.

## What is in the scene

- **Structure**: hull with chamfered upper corners, 8 I-beam rib frames with web/flange/gussets and bolts, panelled
  painted-metal walls (seams, rivets, chips, grime runs), side-wall stiffeners, ceiling light fixtures, cable trays
  with cable runs on walls and ceiling, coolant/N2 pipes with clamps, valves and handwheels dropping into a grated
  floor trench that feeds the machine plinth, overhead crane rail with trolley, hoist, chain and hook, a sealed
  pressure door, hull access panels (two hinged open showing cable risers), lockers, PDU cabinet.
- **CMG-4 machine**: hazard-banded plinth with bolt ring, base frame, safety-yellow gimbal yoke, trunnion bearings with
  machined caps, finned torque motor and a second motor with its cover off (copper windings exposed), tilted rotor
  housing with an open service gap and a protective-glass viewing slot, spinning machined flywheel inside, top spin
  bearing cap and finned sensor package with status LEDs, rubber coolant hoses with crimped ferrules, a service-loop
  cable bundle from the ceiling tray.
- **Work around it**: red tool cart with drawers, sockets, torque wrench and the removed motor cover; removed drum
  panel on an A-frame stand with a removal tag; lockout post with padlocks and a pulsing red slow-roll beacon;
  tripod cyan inspection lamp aimed into the drum; spare-bearing crate; floor tie-downs and lane markings.
- **Service alcove**: hazard-striped opening with shutter housing, workbench with vise, spare spin bearing under a glass
  shield with a dial indicator, shadow board with tool outlines (two wrenches missing — they're on the cart),
  parts shelving with bins, N2 cylinders with regulators, hose reel, stool, amber task light.
- **Walkway & stairs**: 20 risers × 0.18 m, 19 treads × 0.33 m, 1.2 m clear width, yellow nosings, stringers,
  handrails both sides, mesh infill under the open side; grated walkway at 3.6 m with toe boards, top/mid rails,
  columns, knee braces and under-deck lights; railed spur ending ~1 m from the machine footprint.
- **Lighting**: neutral hemisphere + ceiling fills + one shadow-casting key spot; three restrained coloured task lights
  (amber alcove, cyan inspection lamp, pulsing red lockout beacon); emissive fixtures; PMREM room environment for
  metal/glass reflections; ACES tone mapping.

## Performance design

- All static geometry is merged per material: ~25–45 draw calls and ~60–80k triangles in any view.
- Shadow map is rendered only during the first frames (static scene; the spinning rotor does not cast).
- All textures are procedurally generated on canvases at load (no network fetches after start); shaders are
  pre-compiled before the overlay is dismissed, so turning toward new areas does not hitch.
- Collision is analytic (AABBs, cylinders, walkable height surfaces incl. a stair ramp), a few hundred tests per frame.
- Render scale is probed at load and once more ~2 s later while the start overlay is still up (warm GPU); it never
  changes during exploration unless you press **P**. `?scale=1|1.25|1.5` forces it.

## Tests run (in the app's built-in browser pane)

- Scripted collision walk through the route via the exposed `__bay.stepPlayer`: climbed the stairs to y = 3.60,
  walked the walkway, stopped at the spur end rail (z = −3.34) and spur side rail, descended back to y = 0,
  stopped at the machine ring (r = 2.48), under the walkway, at the alcove bench, and at the stair side guard.
- Visual checks from start, machine close-up, alcove, walkway, spur top-down view and viewport.
- Final regression (fresh load, no console errors): 1.9 laps tangentially around the machine at r ≈ 2.75 m with 0
  stuck frames; alcove bench reached; stairs up to y = 3.60; walkway to x = 7.67 (end rail); spur end at z = −3.35;
  stairs back down to y = 0. Load-to-ready ≈ 1.3 s (textures generated + shaders compiled before ENTER is enabled).
- Warm GPU throughput on this machine's browser pane at 1280×720, scale 1.0 (120-frame batches while sweeping the
  camera): start view 10 ms*, circling machine 4.8 ms, alcove pass 4.1 ms, walkway sweep across bay 4.8 ms,
  spur looking down 5.0 ms, viewport 3.3 ms; 24–45 draw calls, 54–82k triangles. (*first batch, GPU still
  clocking up.) The pane was hidden/throttled, so these are indicative only — press **F** on the judging machine.

## Known limitations
- In a hidden or background tab, the render-scale probe can under-measure and choose 1.0; press **P** or use `?scale=1.5`.

- Collision uses simplified volumes: small props (hoses on the floor, cable bundles, tripod legs) are only partly
  solid; railings are slightly taller invisible walls than the visible rails.
- The stair is walked as a smooth ramp (eye height is smoothed), not per-step.
- No jump; the player cannot climb onto props or the machine plinth (by design).
- Planet/space is a stylised procedural backdrop, not a physically lit planet.
- Built for desktop mouse + keyboard; no touch/gamepad controls.
