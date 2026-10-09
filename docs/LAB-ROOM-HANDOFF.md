# Homepage entry handoff

The Lab consumes the approved homepage preview handoff through the exact inline
`assets/js/room-handoff.js` bootstrap from homepage commit
`715d292a94ddda4f92eaf3c67b3f18edb073ed47`, Git blob
`846960bd15c10cfb1bcf835173022bc42bcdbd19`. It runs immediately after charset and
viewport metadata, before external styles or runtime scripts. The transport,
image allowlist, 15-second lifetime, one-shot consumption and recovery controls
are owned by that canonical bootstrap; the Lab introduces no second transport.

The public cover uses `/assets/images/rooms/lab-entry.jpg` on the homepage origin.
The capture is not duplicated in this repository. The west Compare Worlds
relocation changes the entrance view: before publishing that change, the
homepage owner must recapture this image and update the canonical view version
with the destination contract. This draft leaves the shared transport intact;
the old image does not establish visual continuity with the relocated board.
The source contract and capture manifest are
[room-handoff.md](https://github.com/Pazneria/pazneria.github.io/blob/715d292a94ddda4f92eaf3c67b3f18edb073ed47/docs/room-handoff.md)
and [entry-views.json](https://github.com/Pazneria/pazneria.github.io/blob/715d292a94ddda4f92eaf3c67b3f18edb073ed47/assets/images/rooms/entry-views.json).

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
Combined browser/GPU QA and ordered publication remain with the parent and
homepage owner; this destination bridge alone does not certify pixel continuity.
