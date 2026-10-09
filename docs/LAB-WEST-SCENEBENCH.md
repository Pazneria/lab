# West Compare Worlds station

The production derivative moves its single SceneBench display from the north
hall to the west alcove's south wall, left when entering from the south. The
screen is 3.2 × 1.8 m, centered at `(-9.3, 1.6, 3.245)` and facing north. Its
center is 0.85 m lower than before. A low storage console replaces the west
whiteboard and cart; the instrument, machine-vision bench, main aisle and central
Ivo camera ring remain accessible. The shared layout controls geometry, picking
and return orientation. Of the 34 generated colliders, 33 are unchanged and the
old cart becomes the wall console.

Preview selection, Next and viewed-both voting work on the physical screen at
any distance where it is visible and ray-picked. Scene selection disposes the
Lab renderer and opens the existing full-screen scene route in the same tab.
The return pose is standing at `(-9.3, 0.9)`, yaw π, aimed at screen center. Both
Back and the guarded canonical/index fallback preserve the comparison identity,
ordered A/B pair, prompt and ready receipts. Physical returns focus the Lab
canvas without automatically capturing the mouse; explicit native controls
retain their accessible dialog return. Next and votes keep the room active.

Original comparison, public leaderboard, model names/reveal, grade forms,
service access and saved private answers remain in their existing modules.
Tests mock public writes; no real preference is submitted. Frozen benchmark
entrants, catalog, provenance and the public Ivo asset are unchanged.

CPU verification uses real pinned Three r186 geometry and raycasts, continuous
navigation, inert controller/DOM fixtures and the actual comparison/receipt
modules. It creates no renderer, browser, server or entrant execution. Rebuild
with the exact developer dependencies described in PRODUCTION-LAB.md, then run:

```text
node scripts/build-production-lab.cjs
node --experimental-vm-modules --test tests/verify-production-*.test.mjs tests/verify-room-handoff-bootstrap.test.mjs tests/verify-walkable-hit-targets.test.mjs tests/verify-walkable-lab-navigation.test.mjs tests/verify-walkable-return-route.test.mjs tests/verify-lab-characterbench-integration.test.mjs
```

All 154 focused cases pass, including existing grading, public judgment and
viewport suites. Frozen integrity covers 1,000 recorded files; publication
checks cover 1,146 admitted source files; voting parity retains 89 records.
Exact bundle and preservation hashes are in
[the CPU receipt](LAB-WEST-SCENEBENCH-CPU-EVIDENCE.json).
Independent controller/geometry and route reviews found no material issues;
the reviewer passed 94 focused CPU cases and reproduced the bundle byte for byte
using an in-memory pinned build.

Browser/GPU QA remains on the parent's coordinated schedule. Verify western
lighting, readable buttons, portrait/landscape framing, native capture, resizing,
both return paths and disposal with one bounded owned browser at a time. No new
GPU/frame-performance measurement is claimed. The entrance view changed, so
homepage screenshot recapture and canonical view-version coordination must
precede publication. The pinned handoff bootstrap and ordinary default spawn
are preserved in this draft.
