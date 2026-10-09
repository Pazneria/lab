# Production Lab derivative

This host upgrade replaces the Lab at `/lab/lab-space/` with a separate derivative
of Claude's Applied Sensing Lab (scene 11). The original entry, catalog, run
records, previews, grading service, and votes are unchanged.

The Lab has a single Ivo Renn exhibit inside the central camera ring. Selecting
the actual character silhouette opens `../character-bench/?prompt=02`, the
dedicated same-prompt, two-attempt comparison route owned in a separate change.
The lectern is a matching shortcut. No character ranking or winner is implied.
The private inspection Studio, its audience, responses, credentials and backend
are outside this change. The coordinated Lab and comparison route were released
in PR #59 at commit `55a102e8262e80677c461dfe4f64918aba4aa4e8`.

SceneBench occupies the lower **Compare Worlds** console in the west alcove,
left of the south entrance. Physical preview, Next and voting buttons use the
screen's UV coordinates directly. Its original comparison modules and explicit
native controls preserve random first selection, viewed-both gating, model
reveal, public leaderboard, votes and same-tab scene departure. A scene
departure disposes this Lab renderer before loading the submitted scene; exiting
returns in front of the west screen with the same ordered pair and viewed gates.
The catalog and home exit remain available in the minimal host menu.

Claude's overlay, crosshair, area label, HUD and statistics UI are removed.
The host provides Explore, Help and native destination controls.
Mouse look uses direct movement deltas, adjustable sensitivity and bounded pitch.
Keyboard input is canvas-scoped. Focus loss, capture release, dialogs and hidden
documents clear held input and velocity; inactive pages render no frames.
Movement uses only WASD or arrow keys; floor clicks do not start automatic routes.
Clicks still acquire mouse look and use physical stations. Help shortcuts open
the destination controls directly, preserving keyboard access and manual exits.
Back/Forward recreates disposed renderers, including gentle reduced motion and
pending-load races. A scoped, one-use session pose restores the Lab after a
same-origin CharacterBench return when the normal history entry is unavailable.
The 9 October follow-up aligns capture and movement with the fixed Library,
loads directly into the room, and opens both south door sets as visitors walk
out. Its contract, CPU evidence and held runtime checks are in
[LAB-LIBRARY-CONTROLS.md](LAB-LIBRARY-CONTROLS.md).
The coordinated homepage preview entry uses the pinned inline bootstrap and
matching ready boundary described in [LAB-ROOM-HANDOFF.md](LAB-ROOM-HANDOFF.md).

## Functional room map

Visitors spawn at `(x=0, z=7.3)` facing north (negative Z). The main hall is
14 by 15.5 world units, with west/east alcoves extending to X = -12/+12.
This is a schematic, not a scale drawing:

```text
                         NORTH (-Z)
       Catalog plaque
        (-3, -6.85)

  West perception        CharacterBench camera ring       East motion
  testing alcove               Ivo (0, -0.6)              testing alcove
  (negative X)                                           (positive X)
  Compare Worlds
  screen (-9.3, 3.245)
  return (-9.3, 0.9)
                                     Lectern (2.3, 2.1)

                          Entrance spawn (0, 7.3)
                          Inner sliding doors (0, 8.5)
                          Vestibule / outer doors (0, 11.5)
                         SOUTH (+Z)
```

| Physical station | Existing feature and interaction |
| --- | --- |
| Central camera ring | Ivo stands on the original drum. His real mesh silhouette, drum, adjacent lectern and direct Help shortcut open `../character-bench/?prompt=02`. The dedicated route compares two attempts of the same character prompt; the single Lab exhibit does not declare a winner. |
| West Compare Worlds console | Screen center `(-9.3, 1.6, 3.245)`, dimensions `3.2 × 1.8`, facing north. It is 0.85 m lower than the old board. Physical preview selection opens the scene full-screen in the same tab; return restores `(-9.3, 0.9)` facing the screen. Next and viewed-both votes operate in the room. Reveal, grading and leaderboard keep their existing modules. SceneBench controls remain an explicit accessible fallback. |
| North-west Catalog plaque | Opens the public catalog/evidence station dialog directly. This reuses the public catalog destination. |
| South Home doorway | Approaching opens the first sliding set; continuing through the vestibule opens the second. Crossing the landing exit plane navigates Home once in the same tab. The plaque, Help shortcut and menu retain a manual accessible exit. |
| West perception / east motion alcoves | Preserve the original machine-vision bench and motion-test apparatus as explorable room content. They do not claim additional website features. |
| Host menu and fallback links | Keep Catalog, AI infrastructure, SceneBench, CharacterBench and Home discoverable; fallback links provide direct access when 3D is unavailable. AI infrastructure remains a menu destination. |

Geometry and directions come from [`hall.js`](../lab-space/assets/claude11/hall.js),
[`instrument.js`](../lab-space/assets/claude11/instrument.js),
[`perception.js`](../lab-space/assets/claude11/perception.js) and
[`motion.js`](../lab-space/assets/claude11/motion.js). Station positions and safe
approaches share [`layout.mjs`](../lab-space/assets/claude11/layout.mjs).
Actual picking and feature wiring are in
[`room-source.mjs`](../lab-space/assets/claude11/room-source.mjs) and
[`production-space.js`](../lab-space/assets/production-space.js).

## Preservation and rights

Frozen `app.js` SHA-256:
`9a5cf5ced7004d20572ffef290145ab74fd268bf8675b57944d1d8d12da141e2`

Frozen `index.html.txt` SHA-256:
`5d88c6bae5937bf7705afc88f0efd07d92bf4310c72969d200edf7aa8299c54e`

The verified original source archive SHA-256 is
`2d210253fa4c169ec00b30ec0d5b46e179a22c37f6a3af48524b04937b07b484`.
Procedural source copies live under `lab-space/assets/claude11/`; only the tiny
original specimen and its support assembly were removed from `instrument.js`
to fit the character. The new renderer and controls are host-owned modules.
Three.js remains the original r186.1 with its MIT license retained.

Ivo is Jordan's completed procedural character from 6 October 2026. The original
generation source, handoff, check receipts and file hash were inspected. The
owner explicitly requested an owned character in the public Lab. The public
copy has exactly the original 6,629,216 bytes and SHA-256
`9db9b433a1759c36a3c41bfc0e1625d4ad4501c4c6fc75df375647ba24f488b1`.
It has one scene, one embedded buffer, no textures or external resources,
and a static A-pose. The requested configuration was gpt-6.1-sol / XHIGH;
the serving configuration was not independently exposed. Runtime batching and
exhibit scaling preserve the original GLB. The accompanying character provenance
records these facts without exposing private Library or Studio data.

## Performance work and limits

Static regional/material batching, original lighting, the 4096-square label atlas,
and 4096-square shadow are retained. Shadows update at startup, after the
character loads, and when the new door panels move. Rendering density is capped at DPR 1.25, matching
the original default. Static matrices and texture preparation are reused.

The GLB loads after the first active Lab draw, without requiring a click.
Its actual shader variants are compiled before it is added to the rendered scene.
The load is aborted or its pending resources disposed on departure. Opaque static
meshes batch by material and compatible vertex attributes; indices, normals,
facial vertex color, triangle winding and material identity are preserved.
CPU checks show 322 source meshes become 29 display meshes while all 250,542
triangles and 132,526 vertices remain unchanged. Transparent/skinned/morph
objects are kept separate rather than combined by this generic helper.

One host RAF coalesces input and resize changes. Exploration renders at display
cadence; idle decorative animation renders at most 20 times per second. Visible,
front-facing screens update with a total 30-update/second budget and 12 Hz
per-screen ceiling. Invisible screens do not request continuous rendering.
This reduces unnecessary updates without reducing the room's geometry or lights.

Navigation retains the exact 34 generated records for provenance. Host collision
replaces only the fixed door blocker with shared moving-panel geometry and adds
the vestibule/landing envelope. Historical CPU measurements before the
walking-exit change: first detour/grid setup 12.46 ms;
600 warm routes median 0.0053 ms, p95 0.3861 ms, maximum 2.0727 ms.
These measure navigation CPU work only. **No AAA-performance claim is made.**
Before this follow-up, bounded Chrome QA established a 1440x900 / DPR 1
baseline on the automatically selected RTX 5070 Ti Laptop GPU. Active RAF
intervals were 4.2 ms median, 16.7/16.8 ms p95/p99 with none over 25 ms across
four 10-second samples. These are headless browser scheduling measurements,
not presented FPS, GPU durations or an improvement versus the frozen entrant.
Cold loading costs and remaining platform limits are recorded separately in
[the combined runtime receipt](LAB-CHARACTERBENCH-RUNTIME-EVIDENCE.json).

Independent controller and renderer/navigation reviews found no remaining
material correctness or requirement failures. The west-station follow-up passes
154 focused CPU cases. Bounded headless Chrome QA now covers west placement,
capture/look, resize, controlled-scene inspection/return, viewed gates and the
prepared v2 entry cover. Its scoped status-toast contrast repair was reviewed
in final desktop and portrait stills. The exact current checks, measured RAF
sample, cold-start limits and cleanup are in
[LAB-WEST-SCENEBENCH-RUNTIME-EVIDENCE.json](LAB-WEST-SCENEBENCH-RUNTIME-EVIDENCE.json).
These checks do not measure door-motion GPU duration or physical touch input.
Earlier runtime QA exposed a
detached camera transform bug, fixed by keeping its matrix updates enabled while
the static room remains frozen. Three new tests use actual pinned Three r186
camera transforms and board intersections. Final recorded images show the room
and stage correctly; independent image review found no material visual failure.

## Reproduction and validation

Set `LAB_PRODUCTION_DEPENDENCIES` to a separate developer `node_modules`
directory containing exact `three@0.186.1` and `esbuild@0.28.2`, then run:

```text
node scripts/build-production-lab.cjs
node --experimental-vm-modules --test tests/verify-production-*.test.mjs
node --experimental-vm-modules --test tests/verify-walkable-lab-navigation.test.mjs tests/verify-walkable-hit-targets.test.mjs tests/verify-walkable-grading-ui.test.mjs tests/verify-walkable-public-judgments.test.mjs tests/verify-walkable-viewport.test.mjs
python tests/verify-walkable-integrity.py
python tests/verify-walkable-publication.py
node tests/verify-voting-catalog-parity.cjs
```

The character's CPU geometry check is
`lab-space/assets/claude11/verify-character.cpu.mjs`; bundle it for Node with the
same developer dependency path and pass the preserved GLB path. It constructs
no renderer, browser or server. Existing room browser tests describe the older
room and are not evidence for this derivative.

After clearance, visual QA must cover entrance, stage/camera clearance, character
silhouette, west-screen previews/buttons/letterboxing and occlusion, alcoves,
desktop/touch/fallback, mouse capture, resizing, reduced motion and both return
flows. Establish a baseline for the prepared host derivative, then compare any
subsequent optimization under identical renderer, resolution, camera positions,
warm-up and sample duration. Frozen benchmark entrants are not executed for this
QA. Record median/p95/p99 frame times, draw calls, triangles, actual renderer and
drawing-buffer size. Preserve the
user's driver/settings and Library preview process. Close only owned test
browser/server processes. Publication must verify the integrated commit,
successful Pages deployment and exact served assets.

The combined Lab/CharacterBench clearance checklist and exact public asset paths
are in [LAB-CHARACTERBENCH-QA.md](LAB-CHARACTERBENCH-QA.md).
