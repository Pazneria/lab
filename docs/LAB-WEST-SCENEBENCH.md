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

On 9 October, two serial, bounded headless Chrome sessions rendered this host
derivative on the automatically selected RTX 5070 Ti Laptop GPU. The west board
fits standing/crouched and landscape views; portrait framing was checked from
the clear floor at 390 x 844, with readable native Help. Actual pointer capture,
mouse look, Escape, resize, scene departure/disposal, both ready receipts,
canonical browser Back and the index/directory return contracts were exercised.
The host's full-screen viewer used controlled integrity-checked scene fixtures:
no benchmark entrant was executed. A vote was intercepted locally; no public
preference was submitted. Both viewing gates, blind labels, reveal and physical
Next behaved as intended. The in-room renderer stayed active for vote and Next.

Static image review found a pale status toast. Its scoped production colors are
now bright text on a dark background, and a second rendered check plus image
review confirmed the repair. No material findings remain in the reviewed stills.
Detailed source states, artifacts, limitations and cleanup are in
[the runtime receipt](LAB-WEST-SCENEBENCH-RUNTIME-EVIDENCE.json).

A five-second captured sample at the west board, 900 x 600 / DPR 1, recorded
1,195 RAF intervals: median 4.2 ms, p95 4.3 ms, p99 4.8 ms, none over 25 ms.
The sampled view submitted 48 draw calls and 11,246 triangles. These are
headless scheduling measurements, not displayed FPS, GPU durations or measured
improvement against the frozen scene. Cold startup recorded 1,264 ms and 579 ms
long tasks; this change does not claim to remove them. Physical touch behavior
and real submitted-scene rendering were not exercised.

The matching, unedited 1707 x 923 entrance JPEG and portable homepage patch are
prepared in the owner's `homepage-west-patch` bundle. The Lab now consumes its
exact prepared canonical bootstrap and `default-entry-v2`; Arcade and Library
retain v1. The ordinary spawn and one-shot transport remain unchanged. The
homepage owner must apply the matching producer, canonical source, image and
manifest before coordinated publication. PR64 remains a draft; this QA neither
merges nor deploys it. All owned browsers and servers are closed.
