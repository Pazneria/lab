# Production Lab derivative

This host upgrade replaces the Lab at `/lab/lab-space/` with a separate derivative
of Claude's Applied Sensing Lab (scene 11). The original entry, catalog, run
records, previews, grading service, and votes are unchanged.

The Lab has a single Ivo Renn exhibit inside the central camera ring. Selecting
the actual character silhouette opens `../character-bench/?prompt=02`, the
dedicated same-prompt, two-attempt comparison route owned in a separate change.
The lectern is a matching shortcut. No character ranking or winner is implied.
The private inspection Studio, its audience, responses, credentials and backend
are outside this change. **Do not merge this Lab until the comparison route is
available in the coordinated integration.**

SceneBench occupies the existing north-wall screen. Its original comparison
modules and native controls preserve random first selection, viewed-both gating,
model reveal, public leaderboard, votes and same-tab scene departure. A scene
departure disposes this Lab renderer before loading the submitted scene.
The catalog and home exit remain available in the minimal host menu.

Claude's overlay, crosshair, area label, HUD and statistics UI are removed.
The host provides Explore, Help, navigation and optional direction buttons.
Mouse look uses direct movement deltas, adjustable sensitivity and bounded pitch.
Keyboard input is canvas-scoped. Focus loss, capture release, dialogs and hidden
documents clear held input and routes; inactive pages render no frames.
Back/Forward recreates disposed renderers, including reduced-motion opt-in and
pending-load races. A scoped, one-use session pose restores the Lab after a
same-origin CharacterBench return when the normal history entry is unavailable.

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
and 4096-square static shadow are retained. Shadows update once at startup and
once after the character loads. Rendering density is capped at DPR 1.25, matching
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

Navigation uses the exact 34 generated scene colliders and a spatial index.
Bounded CPU measurements on the user's machine: first detour/grid setup 12.46 ms;
600 warm routes median 0.0053 ms, p95 0.3861 ms, maximum 2.0727 ms.
These measure navigation CPU work only. **No FPS, GPU, visual-regression or
AAA-performance claim is made.** Browser/GPU sessions remain on hold while
separate authorized character attempts are active; parent clearance is required.

Independent controller and renderer/navigation reviews found no remaining
material correctness or requirement failures. All 56 CPU regression cases pass.

## Reproduction and validation

Set `LAB_PRODUCTION_DEPENDENCIES` to a separate developer `node_modules`
directory containing exact `three@0.186.1` and `esbuild@0.28.2`, then run:

```text
node scripts/build-production-lab.cjs
node --experimental-vm-modules --test tests/verify-production-controller.test.mjs tests/verify-production-navigation.test.mjs
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
silhouette, north-wall previews/buttons/letterboxing and occlusion, alcoves,
desktop/touch/fallback, mouse capture, resizing, reduced motion and both return
flows. Compare original and derivative under identical renderer, resolution,
camera positions, warm-up and sample duration; record median/p95/p99 frame times,
draw calls, triangles, actual renderer and drawing-buffer size. Preserve the
user's driver/settings and Library preview process. Close only owned test
browser/server processes. Publication must verify the integrated commit,
successful Pages deployment and exact served assets.
