# CharacterBench comparison route

A host-owned, buildless comparison UI for Jordan's Lab. This change is confined
to `character-bench/`; it does not change the Lab lobby, benchmark entrants,
SceneBench catalog, grading service, sharing, hosting or credentials.

## Route and integration

From `lab-space/`, navigate in the same tab to `../character-bench/`.
The production lobby's link `../character-bench/?prompt=02` is compatible.
The optional `prompt` query is an exact canonical ID from the admission manifest;
it is never an asset URL or model selector. The return link is `../lab-space/`.
The lobby owner must dispose its renderer before navigation. This route creates
no renderer until the visitor selects **Load comparison**.

The prepared catalog uses canonical IDs `01` for Mara and `02` for Ivo.
IDs are strings; leading zeroes are significant.
An unknown ID shows an honest empty state. Different prompt versions need
different IDs and exact hashes, even when their titles are similar.

The draft includes six unchanged completed Sol/Astra/Claude asset copies and eight
source records, including two excluded malformed Luna attempts. Each character
has three CPU-compatible entries, giving three possible same-prompt pairs.
Runtime review remains pending. Exact Sol/Astra shared contract/brief text matches between the
parent-supplied original Sol launch messages recovered by supported cloud thread
reads and the directly-read completed Astra launch messages. Only requested-model
metadata differs in their full initial constraints. Original prompt draft-file bytes
were not independently verified. See [admission evidence](data/ADMISSION.md) and
[original launch records](data/prompt-sources.json). Only verified, frozen,
self-contained records form pairs. No screenshots or previews are fabricated.

The parent maps the completed frozen Claude01/02 attempts to the original Mara/Ivo
prompts; exact Claude launch text was not independently present in their frozen
receipts. [Claude evidence](data/claude-source-evidence.json) preserves that boundary,
unknown reasoning effort, receipt/session model identifiers, source timing and
filesystem discrepancies. CPU compatibility does not certify browser/mobile/GPU
runtime admission or performance. The two dense files exceed the old Studio's
one-million-triangle ceiling, which was a host capacity restriction; the benchmark
has no arbitrary polygon cap. They fit the current byte/accessor/vertex budgets
unchanged. No budget increase, decimation or repair was needed.

## Experience

Two distinct attempts of one exact prompt appear as A/B in randomized order.
Rotate and zoom are linked by default. Unlocking keeps independent cameras;
linking again adopts the last inspected view. Native front/back/close-up controls,
keyboard orbit/zoom, pointer drag, wheel/pinch zoom, expansion, reset, original
PBR materials, neutral clay, cached wireframe, floor grid and a shared movable
white key light support inspection. Small screens stack the panes and retain
all native controls. No animation, autorotation, pointer lock or rig is required.

Both characters use one scissored renderer with the same camera projection,
exposure, procedural reflection environment and neutral studio lights. Each is
centered and scaled in a display wrapper to a unit bounding sphere. Original
files, relative mesh transforms, skin bindings and PBR material references
are retained; source dimensions are not treated as measured physical size.
The floor grid is a framing aid rather than a meter ruler. Clay/wireframe
diagnostics are double-sided; returning to original restores exact references.
Submitted cameras and lights are not used; no animation mixer is created.

Preferences require both current imports to complete. A preference reveals model
identities and the source timing/infrastructure disclosures, with original handoff
and timing text, requested/verified reasoning, producer versus host checks and
source-file fingerprints. Run conditions differed, and that fact is stated before
preference without identifying models. Pair changes
and page departure clear it. No localStorage, IndexedDB, public vote API,
leaderboard, aggregate score, rubric weights, winner claim or private Studio
access is added. **Public CharacterBench voting persistence is absent.** Adding it
requires a separate parent decision about catalog eligibility, server validation,
storage, abuse controls and public result semantics. SceneBench voting endpoints
are not reused for character IDs.

Blindness is an interface convention. Static asset names and the admission
manifest are inspectable by a visitor; this is not a secret identity protocol.

## Admission manifest

`version: 1` requires these fields:

| Record | Required fields |
| --- | --- |
| Prompt | `id`, `title`, exact UTF-8 `text`, `sha256` of that exact text |
| Entry | unique `id`, `promptId`, identical `promptSha256`, `admission`, `asset`, `provenance` |
| Admission | `status`: verified/pending/withheld/invalid; verified requires `frozen: true`, `selfContained: true` |
| Asset (verified only) | `path: ./entries/<opaque-lowercase-id>.glb`, full lowercase SHA-256, exact `byteLength` |
| Provenance (verified only) | nonempty `modelLabel`; preserve `requestedModel`, `verifiedModel`, `timingDisclosure` and `limitations` verbatim when recorded |

Do not promote a requested backend or reasoning setting to an independently
verified value. Absent verified model evidence appears as **Not independently
exposed**. Preserve clock interruptions, file-write stalls and producer versus
independent measurements in the supplied disclosures. There is no inferred
score or default time. The parent must confirm suitability for the intended
publication audience before adding private assets or provenance to this repo.

## Import and lifecycle contract

Only checksum-verified, same-origin, self-contained glTF 2 GLBs are imported.
A GLB may use its BIN chunk and/or multiple embedded base64 buffers with
`application/octet-stream` or `application/gltf-buffer` MIME types. Embedded
PNG/JPEG images may be data URIs or bufferViews. External files are rejected.
Dense triangle lists/strips/fans, core PBR, the supported r180 material extensions, multiple
meshes and optional static skins/morphs are supported. Sparse accessors,
instancing and decoder-dependent compression are outside
this compatibility profile. Unsupported imports surface an error; they are
not silently repaired or counted as benchmark failures.

The old inspection Studio's single-BIN profile was a viewer restriction,
not an entrant-format requirement. Multi-buffer support here follows the
[Khronos glTF 2.0 specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html)
and the pinned [Three.js r180 loader](https://github.com/mrdoob/three.js/blob/r180/examples/jsm/loaders/GLTFLoader.js).
The native loader already handles embedded data-URI buffers by their buffer
indices; no source rewrite or single-buffer consolidation is needed.

Operational guardrails are 64 MiB per file, 4,096 nodes / hierarchy depth 64,
1,200 displayed primitives, two million displayed vertex references,
96 MiB decoded accessor allocations, 32 embedded images, 4,096-pixel image edges
and 32 megapixels across decoded images/texture bindings. These are viewer
budgets, not benchmark scoring weights or proof of GPU memory usage. A failed
compatibility check is distinct from an admission/quality decision.

Fetch is streamed and bounded to the frozen size, SHA-256 is checked first,
then a dedicated 30-second cancellable worker validates the container,
dependencies, hierarchy, ranges and allocation claims. The pinned loader is
asynchronous; parsing itself cannot be interrupted mid-operation. A cancelled
parse is prevented from attaching and all tracked resources are released after
its branches settle. Missing texture decoding is an explicit error.
There is no import of entrant JavaScript, HTML or external runtime resource.

One low-power renderer uses antialiasing, a 1.25 DPR cap and a 1.8-million-pixel
drawing-buffer cap. Frames run on input/resize only, stop while hidden, and do
not animate at rest. Hiding the tab unloads both imports and locks preferences
until reload. Pair navigation cancels fetch/worker jobs and disposes old geometry,
materials, textures, skeleton textures and ImageBitmaps; material references
are restored before release. Page departure disconnects observers, releases
the renderer/context, and clears the session preference. Module/WebGL failures
retain prompt, method and source-contract access. HTTPS or localhost is required
for cryptographic verification.

These are defensive importer checks, not a full Khronos conformance validator or
a security/performance certification. PBR color, translucent ordering, actual
skins, camera framing, readability, mobile gestures and GPU memory need runtime
QA after the parent's graphics hold is lifted.

## CPU verification

No dependency installation or build is required. From the repository root:

```text
node --experimental-vm-modules --test character-bench/tests/*.test.mjs
node --check character-bench/assets/app.mjs
node --check character-bench/assets/viewer.mjs
node --check character-bench/assets/preflight.mjs
node --check character-bench/assets/preflight-worker.mjs
```

The 26 data/wiring/catalog tests cover same-prompt pairing, admission failures,
linked/unlinked controls, current-import voting/reveal, pair/departure reset,
loader cancellation/disposal, worker success/error/timeout, partial allocations,
hierarchy/accessor bounds, image decode budgets, all six copied asset hashes,
canonical text hashes and original run disclosures. DOM, workers and rendering
are mocked in wiring tests. Native CPU-only loading of all six completed Sol/Astra/Claude
GLBs was separately checked using the pinned importer without a renderer. The two
saved Luna containers failed before importer parse and remain untouched in the
parent's preservation archive. [CPU results](data/cpu-import-evidence.json) establish
compatibility and unchanged bytes, not visual quality or equivalent execution.

**Browser/GPU/performance sessions, screenshots, merge and publication remain
held for parent integrated review.** No preview server was started. No active
entrant folders were inspected and no entrant was contacted.
