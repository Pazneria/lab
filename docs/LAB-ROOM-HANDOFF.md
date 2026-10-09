# Homepage entry handoff

This draft consumes the exact prepared canonical `assets/js/room-handoff.js`
from homepage baseline `30eb1ebc5d42a47759c20ca1fec4ce7b56aa07de` plus the
coordinated Lab v2 patch. Its prepared Git blob is
`3a5aff4177e65fc68ddf74be4d0d09c71778f68a`, 6,569 LF bytes, SHA-256
`711b2e813bbf790c53bed4b66aaa163380b2a9f7c59ebc2caf806723d381f4b6`.
No homepage commit containing this prepared source is claimed. The inline
provenance comment and CPU assertions pin that baseline-plus-patch honestly;
the owner should pin the actual resulting homepage commit after coordinated
publication. The bootstrap runs immediately after charset and viewport metadata,
before external styles or runtime scripts.

The per-room frozen camera map is Arcade `default-entry-v1`, Lab
`default-entry-v2`, Library `default-entry-v1`. Producer and consumer use this
same map; obsolete v1 Lab tokens are rejected safely. Numeric version 1, storage
key `pazneria.room-handoff.v1`, exact same-origin image allowlist, 15-second
lifetime, one-shot consumption and recovery remain in the canonical bootstrap.
There is no second transport and no Arcade or Library consumer change.

The public cover uses `/assets/images/rooms/lab-entry.jpg` on the homepage origin.
The capture is not duplicated in this repository. The owner's prepared
`homepage-west-patch` bundle supplies seven homepage text changes plus the exact
replacement JPEG: 1707 x 923, 170,994 bytes, SHA-256
`a2328ea468562b7827f2e9daaffec1edd7ac3b6990f3cac4c667e1ec5e0b263c`.
It is an unedited 9 October default-entry frame rendered at Lab source commit
`e821df05d19e82cb46ad5eabd7c8401cf040919b`, not a claimed published screenshot.
The draft metadata records the source commit, local capture URL, intended public
URL, camera pose and `prepared-draft` status. V2 identifies the west-board
composition change; the default camera angle is unchanged.

The homepage owner must apply `homepage.patch` and copy its separate
`prepared/assets/images/rooms/lab-entry.jpg`, checking baseline compatibility.
That patch updates the producer, canonical consumer, per-room camera manifest,
documentation and tests together. Its 22 isolated homepage tests and 64 Lab
bootstrap/controller tests pass. Existing Arcade/Library metadata is preserved.
Source snapshots, exact changed-file hashes and application instructions are in
the bundle's `HANDOFF.md`, `snapshot.json` and `prepared.json`. Publish the
coordinated homepage and Lab changes only through the owning threads; this
draft does not change the homepage or publish its capture.

Only a valid incoming Lab cover bypasses restored history/character-return pose
for this visit. It uses `spawn()`: x=0, z=7.3, eye=1.62, yaw=0, pitch=-0.04,
standing, zero velocity. The existing YXZ camera retains vertical FOV 70,
near=.04, far=80 and the actual canvas client aspect. The SceneBench board starts
at prompt 01 for this visit; saved grades/preferences remain intact and Next
retains its random picker. Ordinary entry, restored comparisons and direct links
keep their existing behavior.

The cover suppresses the normal Lab loading indicator. Native Lab surfaces stay
inert and FPS input stays gated while the cover is active, including its short
fade. `ready()` is called only after a successful room draw with Ivo ready and
the default comparison initialized and its preview requests settled. Focus moves
to the canvas after removal,
without acquiring pointer lock. Renderer/character failure calls `fail()` and
exposes the existing retry and direct destinations. The bootstrap supplies
Home/Cancel, an eight-second Retry fallback, reduced-motion handling and Back
cleanup; the Lab also releases its observer and inert surfaces on pagehide.

This changes no room geometry, rendering quality, character assets, grading,
votes, private Studio access or FPS-only controls. Responsive portrait cropping
and navigation/image decode timing follow the shared contract's limitations.
Bounded headless QA confirmed that a seeded valid v2 token displays the exact
prepared JPEG, then consumes the token and removes the cover after the live
default room, character and comparison are ready. It restores the ordinary
spawn, prompt 01, active surfaces and canvas focus. This is destination QA with
a local cover, not cross-document production decode/cache verification. The
homepage owner must verify the served JPEG hash, ordinary-cache entry and Back
after coordinated publication. See
[the west runtime receipt](LAB-WEST-SCENEBENCH-RUNTIME-EVIDENCE.json).
