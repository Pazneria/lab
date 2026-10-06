# Review record — 2026-10-06

Status: **reviewable implementation; runtime/visual QA deferred; unpublished**.

- Isolated checkout: `C:\Users\jmore\Documents\Codex\2026-10-06\task-11\character-studio-review`
- Branch: `codex/character-inspection-studio`
- Base: `0fd498f03891b8f0d5f511dcf524a7a79eaec8fe` (`main` at clone time)
- Owned namespace: `character-studio/` only. Homepage, routing, comparison UI, active benchmark files, infrastructure and deployment config are untouched.
- No repository `AGENTS.md` or checked-in `.github` test workflow found. Existing Pages deployment is not used as a test runner. No push, PR, merge or deployment performed.
- User's local QA pause: no browser, CUA, native input, preview server, WebGL/scene execution or local test runner started. No benchmark runs, entrant contact or model generation performed.
- Incremental payload: approximately **1.03 MB across 19 files**, including documentation, deferred tests, required renderer modules and the MIT license. Browser runtime is approximately **1.00 MB** uncompressed; Three.js is lazy-loaded only after an asset passes preflight. No submitted GLB, benchmark scene, screenshot, archive, cache or dependency installation is added.
- Review method: direct source/API inspection and static source checks only. `node --check` parsed all 11 JavaScript files successfully without importing/executing modules. A static HTML/JavaScript binding scan found all 28 literal referenced IDs and no duplicate HTML IDs. Any tests listed below are pending, not passed.

## Source review coverage

Reviewed import ordering and local dependency resolution, resource caps before parsing/decode, no external asset URLs, worker cancellation and serial stale-load ownership, shared lighting/camera state, normalized display versus original dimensions, material restoration, texture/ImageBitmap disposal, pointer/keyboard scope, reduced-motion/visibility behavior and cleanup on removal/page exit. Staged `git diff --check` passed; vendored source CRLF is explicitly preserved in namespace-local attributes. The calibration fixture is nine boxes with 12 triangles each (108 displayed triangles), by source inspection, not by runtime observation.

## Required QA once authorized

| Area | Concrete checks | Current evidence |
| --- | --- | --- |
| Data policy | Run the prepared Node test file: malformed headers, external paths/data URIs, unsupported extensions, out-of-bounds indices/accessors, Infinity vertices, cycles/multiple parents, repeated-instance budget, image dimension rejection, camera/light/clip exclusion | Written; not run |
| Loading | Calibration fixture, core PBR textured GLB, constant materials, one/multiple meshes, optional skinned default pose, dense morph targets; corrupted PNG/JPEG must fail clearly | Not run |
| Resource lifecycle | Switch/remove models repeatedly; cancel during read/preflight/decode/parse; rapidly click different models; verify only latest selection installs; observe geometry/texture/bitmap memory stabilizing | Source reviewed only |
| Material fidelity | Color texture orientation/color space, normals, occlusion, alpha-mask/blend, metallic reflections, transmission, double-sided surfaces and extension values; Original → Clay → Wireframe → Original restores appearance | Not run |
| Camera | Very tall/wide/tiny/offset assets; +Z front; resize/orientation changes; close-up focus; pan bounds; reset and frame after zoom; comparable view retained across entrants | Not run |
| Motion / load | Idle has no sustained render loop, spin opt-in/capped, reduced motion stops/disables spin, hidden/offscreen pauses, blur stops spin | Source reviewed only |
| Accessibility / layout | Keyboard-only import/selection/removal, focus retention, viewport shortcuts, no shortcut interception in controls, polite status/error announcements, 320px phone / tablet / wide desktop, 200% zoom and touch gestures | Not rendered or audited |
| Failure recovery | Unsupported WebGL/module worker/ImageBitmap, context loss, worker timeout, CSP/network inspection, pagehide/back-forward cache restore, full collection/file limits | Source reviewed only |
| Integration | Parent review/cherry-pick into latest repository state, no comparison UI overlap, authorized hosted source and runtime QA before adding a homepage link or publishing | Pending parent coordination |

## Remaining limitations

This is a provisional compatibility subset, not every legal glTF. Unsupported inputs explain how to re-export. Preflight is not full Khronos validation. Node 22+ is needed only for the prepared data tests. Main-thread scene parsing and driver allocations cannot be forcibly interrupted; bounded/serialized work, cancellable decode, and stale-result disposal reduce exposure. Runtime correctness, responsiveness, actual color fidelity and visual polish have not been demonstrated under the QA pause. Parent should not present them as verified.

No persistent background process was needed: Git clone and the source-download command both returned completed exit status. No owned server, browser, worker process or benchmark process was launched on the laptop. An attempted read-only OS process inventory via CIM was denied by the environment; no claim of a machine-wide process audit is made. No unrelated processes were stopped.
