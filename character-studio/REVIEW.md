# Review record — 2026-10-06

Status: **review branch only; bundled demo ready for cloud QA; no live deployment**.

- Isolated checkout: `C:\Users\jmore\Documents\Codex\2026-10-06\task-11\character-studio-review`
- Branch: `codex/character-inspection-studio`
- Base: `0fd498f03891b8f0d5f511dcf524a7a79eaec8fe` (`main` at clone time)
- Preserved baseline: `df8afd834710ffbb8e3fd577056bb247c5540417`. The demo is a separate follow-up commit; this baseline remains available for comparison.
- Owned namespace: `character-studio/` only. Homepage, routing, comparison UI, active benchmark files, infrastructure and deployment config are untouched.
- No repository `AGENTS.md` or checked-in `.github` test workflow found. Existing Pages deployment is not used as a test runner. The baseline was pushed only to the approved review branch after verifying legacy Pages uses `main` at `/`. No PR, merge or live deployment performed.
- User's local QA pause: no browser, CUA, native input, preview server, WebGL/scene execution or local test runner started. No benchmark runs, entrant contact or model generation performed.
- Incremental payload: approximately **1.50 MB across 22 files**, including the 463,988-byte CC0 demo, documentation, tests, required renderer modules and license/credits. The baseline without the sample was approximately 1.03 MB. Three.js remains lazy-loaded after preflight, which now runs automatically for the demo on startup. No submitted CharacterBench asset, benchmark scene, screenshot, archive, cache or dependency installation is added.
- Local review method: direct source/API inspection and parse-only checks, without importing/executing modules. Baseline checks covered all 11 JavaScript files and 28 literal HTML bindings. The demo changes add one JavaScript module and one control. No local test runner or browser has been used. The parent reports all 13 baseline data tests passed in cloud QA; the new sample case and browser behavior await cloud verification.

## Bundled-demo follow-up

The user explicitly requested a freely licensed humanoid already loaded at startup. `assets/demo/RobotExpressive.glb` is the exact approved Three.js sample: 463,988 bytes, SHA-256 `047f5e5fb3bb6d378bd1df16ca6137f2a596c99b3a1b5690b4020c05aaf6f319`. File size/hash and asset-specific CC0 credits were inspected before inclusion. The binary is unchanged and marked `-text` in Git attributes.

`bundled-demo.js` fetches only that pinned same-origin file, with redirects and credentials disabled, a strict streamed-size limit, a SHA-256 check and abort/timeout handling. The existing serialized selection, worker preflight, static loader, materials and disposal code handle it thereafter. `glb-policy.js`, `preflight-worker.js` and `viewer.js` are unchanged. The CSP adds only same-origin connections; arbitrary GLB dependencies remain blocked. Demo labels/credits are visible in the collection, selected-asset badge and metadata. Calibration remains separately available. No animation mixer or automatic scoring is added.

Cloud QA should run the added sample case, confirm startup rendering/pose, inspect demo labels/credits and presentation at mobile/desktop widths, cancel/retry the demo fetch, replace it with a local asset while loading, remove/re-add it, and confirm page-cache restoration and bad/missing demo responses. Run these only in the authorized cloud environment. The exact incremental asset cost is 463,988 bytes plus small loader/UI/credit changes.

## Source review coverage

Reviewed import ordering and local dependency resolution, resource caps before parsing/decode, no external asset URLs, worker cancellation and serial stale-load ownership, shared lighting/camera state, normalized display versus original dimensions, material restoration, texture/ImageBitmap disposal, pointer/keyboard scope, reduced-motion/visibility behavior and cleanup on removal/page exit. Staged `git diff --check` passed; vendored source CRLF is explicitly preserved in namespace-local attributes. The calibration fixture is nine boxes with 12 triangles each (108 displayed triangles), by source inspection, not by runtime observation.

## Required QA once authorized

| Area | Concrete checks | Current evidence |
| --- | --- | --- |
| Data policy | Run the prepared Node test file: malformed headers, external paths/data URIs, unsupported extensions, out-of-bounds indices/accessors, Infinity vertices, cycles/multiple parents, repeated-instance budget, image dimension rejection, camera/light/clip exclusion, and pinned bundled-demo compatibility | Parent reports 13 baseline cloud cases passed; new sample case pending |
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
