# Combined Lab / CharacterBench release checks

Prepared from Lab PR #57 (`1e04963fc6969bc77f3df2f28b30d4896a557ca2`) and
CharacterBench PR #58 (`0b559b1085e0126b90159c8d703792c144c8d5f3`).
Also includes the parent-approved SceneBench return-route fix
`055b1f090e8d47f7a196615063fc2aa0bc2f94c1`, which accepts both the Lab directory
and explicit `index.html` return paths while retaining origin/path validation.
The isolated branch is `integration-lab-characterbench`; its checkout is the
task-10 `combined-lab` directory. Bounded background Chrome QA was completed on
2026-10-08 after explicit graphics clearance. All owned browser/server sessions
are closed. GitHub merge and deployment remain held by parent coordination.
The resolved SceneBench fix also arrived through main commit
`cde02f5f0222cac2c092a4b12ea0b26b33ffdad7`, merged into this branch before QA.

## CPU evidence

The existing focused suites pass together: 60 Lab/SceneBench cases (including
four approved return-route regressions), three actual Three r186 camera cases,
and 26 CharacterBench cases. Seven cross-route cases bring the total to
**96 passed**.
Independent integration and importer/viewer reviews found no material issues;
the small diagnostics reconciliation was separately reviewed. These checks cover
input/focus/return lifecycle, geometry/collision
contracts, SceneBench comparison/voting, canonical prompt identity, frozen hashes,
same-prompt pairs, guarded reveal, cancellable imports and partial disposal.
All six character copies pass the current static compatibility profile unchanged.
The recorded frozen SceneBench file count is 1,000; admitted publication count
is 1,146. Voting parity remains 89 records with catalog SHA-256
`6dba31abbabc2ba3f63b2db19df878aca5cc61936b01d0179e0198278ee1cbe3`.
All six files rendered in the bounded desktop browser. Responsive stacking was
checked at 390x844; physical phone, Intel-selected user Chrome, live service
submission and complete inspection of every possible pair remain unverified.
See [combined CPU receipt](LAB-CHARACTERBENCH-CPU-EVIDENCE.json).
Measured results and limitations are in
[the runtime receipt](LAB-CHARACTERBENCH-RUNTIME-EVIDENCE.json).

The exact focused combined command, from the checkout root, is:

```text
node --experimental-vm-modules --test tests/verify-production-camera.test.mjs tests/verify-production-controller.test.mjs tests/verify-production-navigation.test.mjs tests/verify-walkable-lab-navigation.test.mjs tests/verify-walkable-return-route.test.mjs tests/verify-walkable-hit-targets.test.mjs tests/verify-walkable-grading-ui.test.mjs tests/verify-walkable-public-judgments.test.mjs tests/verify-walkable-viewport.test.mjs tests/verify-lab-characterbench-integration.test.mjs character-bench/tests/app.test.mjs character-bench/tests/catalog.test.mjs character-bench/tests/contracts.test.mjs character-bench/tests/lifecycle.test.mjs
python tests/verify-walkable-integrity.py
python tests/verify-walkable-publication.py
node tests/verify-voting-catalog-parity.cjs
```

Set `LAB_PRODUCTION_DEPENDENCIES` to a developer `node_modules` with exact
`three@0.186.1` before the camera suite; the production build additionally needs
`esbuild@0.28.2`. The new camera cases create real Three cameras and raycasters
without a renderer. They protect against freezing the detached moving camera
when the static room matrices are frozen.

## Completed bounded runtime checks

Chrome 154.0.8037.98 selected the RTX 5070 Ti Laptop GPU automatically. At an
actual 1440x900 drawing buffer, DPR 1, four 10-second active look samples gave
4.2 ms median and 16.7/16.8 ms p95/p99 RAF intervals, with no interval over
25 ms and no active long task. These are headless browser scheduling intervals,
not direct GPU durations or presented-display FPS. They establish a derivative
baseline; no frozen entrant was executed for a before/after comparison.

Runtime QA caught and fixed a host camera bug: setting
`matrixWorldAutoUpdate=false` on the moving r186 camera left its world/inverse
matrices at the origin despite changing its position. Static room matrices stay
frozen, while the camera now updates through a small tested shared helper.
Final entrance/stage images show the preserved room, cameras and actual Ivo.

Movement, sprint, crouch, reset, Explore capture, Help pause, actual mesh picking,
same-tab CharacterBench launch, deferred comparison loading, all six GLB imports,
keyboard inspection, camera-link control, surface modes, light/grid/reset and
mobile stacking passed. SceneBench used controlled local scene fixtures with
the real navigation receipt module: A-only return kept choices locked; B return
unlocked the same pair; the public leaderboard opened using mocked read data.
No scene entrant code ran and no vote/grade request was submitted.

Cold initialization still produced 1,166 ms and 557 ms long tasks, plus 53 ms;
first character/surface shader submission can also exceed one display interval.
These costs are disclosed separately from steady exploration. Physical mobile,
user-browser GPU selection, pinch gestures, reduced-motion hardware behavior,
context loss, all pair combinations and live service writes remain outside this
bounded runtime certification. Preference/reveal guards pass CPU tests;
automatic approval review rejected browser preference-click QA because it could
not verify interception, so that check was omitted.

Owned ports 51841, 61753 and 56888 and harness processes were verified absent at
23:40:28 UTC. The Library preview, drivers, settings, private Studio and all
entrant workspaces were untouched. The exclusive graphics slot is released.

## Routes and assets

From repository root, the routes are `lab-space/` and
`character-bench/?prompt=02`. Under GitHub Pages they are
`/lab/lab-space/` and `/lab/character-bench/?prompt=02`.
CharacterBench returns to `../lab-space/` in the same tab.
Its canonical string IDs are `01` Mara and `02` Ivo.

| Public path from repository root | Character / completed attempt | Bytes |
| --- | --- | ---: |
| `lab-space/characters/ivo-renn-sol.glb` | Central Lab exhibit / Sol | 6,629,216 |
| `character-bench/entries/entry-01-01.glb` | Mara / Sol | 22,737,356 |
| `character-bench/entries/entry-01-02.glb` | Mara / Astra | 720,916 |
| `character-bench/entries/entry-01-04.glb` | Mara / Claude receipt-reported | 33,483,700 |
| `character-bench/entries/entry-02-01.glb` | Ivo / Sol | 6,629,216 |
| `character-bench/entries/entry-02-02.glb` | Ivo / Astra | 6,029,332 |
| `character-bench/entries/entry-02-04.glb` | Ivo / Claude receipt-reported | 31,063,096 |

The Lab exhibit and `entry-02-01.glb` have identical bytes and SHA-256
`9db9b433a1759c36a3c41bfc0e1625d4ad4501c4c6fc75df375647ba24f488b1`.
All copied character fingerprints and retained run disclosures are in
[`admission.json`](../character-bench/data/admission.json); actual CPU importer
results are in [`cpu-import-evidence.json`](../character-bench/data/cpu-import-evidence.json).
The two malformed Luna records have no viewer path and remain excluded.
Requested models/reasoning and independently exposed evidence stay separate.
No later Farid rubric, global ranking, public CharacterBench tally or new private
Studio access is introduced. CharacterBench preferences remain session-only.

## Single graphics session, after explicit clearance

Use one owned background browser and one owned static server at a time. Keep the
Library preview at port 5418 and all producer workspaces/processes untouched.
Do not change GPU selection, browser settings or drivers. Do not execute a frozen
benchmark entrant to establish a baseline. Save scoped traces/screenshots and
metrics under ignored `evidence/integration/`, then close only owned processes.

1. Serve the combined checkout without modifying content. Open
   `lab-space/?labqa=1` in the owned browser at desktop 1440x900, DPR 1.
   Record the exact commit, browser version, WebGL renderer/vendor where exposed,
   Three revision and actual drawing-buffer size. The Lab uses bundled r186;
   CharacterBench uses the retained r180 dependency. Add `&labqa=1` to its Ivo
   URL for read-only `window.__characterBench.diagnostics`: drawing-buffer size,
   both-pane draw totals, ready state and CPU submission duration. These fields
   never unlock a preference or mutate admission. Report masked renderer
   information honestly when the browser does not expose the hardware string.
2. Check the entrance, central stage/camera clearance, actual Ivo silhouette,
   north-wall SceneBench content/letterboxing/occlusion, catalog plaque, exit and
   both preserved alcoves. Confirm material/color/light fidelity, crisp labels,
   no author HUD and no blank canvas or console/import error.
3. Warm the Lab once and wait for `characterState=ready`. At entrance, near the
   stage and near SceneBench, sample 10 seconds of a repeatable look/walk path
   per position. Report median/p95/p99 frame intervals, missed display intervals,
   long tasks, draw calls, triangles, drawing-buffer size and first-character
   readiness. Separately check idle rendering, modal/focus/hidden pauses and
   resumed input. Browser frame pacing is not a direct GPU-duration measurement.
   The target is display-refresh pacing while exploring; no FPS improvement or
   AAA claim is justified without measurements. Preserve this baseline before
   changing a measured bottleneck; repeat identical conditions after any fix.
4. Exercise precise floor walking/collision, drag/click intent, Explore/Esc mouse
   capture, E/Enter physical targeting, crouch/sprint/reset, Help/menu pauses,
   resize and reduced-motion opt-in. Keyboard focus must remain usable outside
   the canvas. Check bfcache return while both ready and still loading.
5. Select Ivo and the lectern independently. Confirm same-tab departure disposes
   the Lab before CharacterBench appears, canonical Ivo prompt `02` is selected,
   and no comparison renderer/assets load until Load comparison is requested.
   Load both panes, verify linked rotation/zoom by default, unlink/relink, front/
   back/close-up, reset, shared light, PBR/clay/wireframe, grid and expansion.
6. Cover all three possible pair combinations for each of `01` and `02` by
   cycling the native Next pair control, identifying loaded opaque asset paths
   from network evidence. The six frozen files remain unchanged. Record load/
   verification/preflight/parse/render readiness and peak draw complexity,
   especially the two dense Claude files. Any failed import keeps preference
   locked; do not repair, decimate or substitute an entrant.
7. Confirm A/B labels stay blind until both current imports complete and an
   explicit preference. After choosing, check original timing/infrastructure,
   unknown backend/reasoning and producer-versus-host limitations. Changing pair
   or prompt, departing, or reloading the full page clears the preference/reveal
   and starts a blind inspection. Hide/show unloads imports and locks readiness
   while preserving a completed same-pair preference/reveal. Reload comparison
   reimports those assets within the same inspection and preserves that choice;
   an unvoted inspection unlocks only after both current imports complete again.
   There is no persistent public CharacterBench vote or aggregate result.
8. Return via the native Back to Lab link and browser Back. Verify the preserved
   room pose and clean reinitialization without duplicate contexts/frame loops.
   Use SceneBench controls without executing an entrant: initial random pair,
   preview bounds, native controls, public leaderboard and reveal state.
   CPU tests cover scene entry/return and viewed-both voting; actual entrant
   launch remains outside this bounded integration session.
9. Resize the same owned browser to 390x844 and a wide desktop viewport; check
   mobile stacking, both panes, pinch/drag/scroll, native controls, readable
   disclosures, focus, canvas/scissor bounds and density caps. Desktop emulation
   does not certify physical mobile hardware/GPU behavior; record that limit.
   Check WebGL/module failure fallback using only the owned test browser.

## Release gate

Fix reproducible host defects, rerun their focused CPU checks and affected runtime
steps, then request the parent's release decision with the exact combined head and
measured evidence. Do not silently turn CPU compatibility into runtime admission.
Once publication is authorized, verify the merged commit, Pages deployment and
served hashes for both route modules, manifest and seven GLB paths. The draft
source PRs should be closed or reconciled after the single combined release so
they cannot duplicate changes. Live claims require exact served evidence.
