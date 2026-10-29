# October 29 CharacterBench batch

The archive adds **63 completed attempts**: Astra repeats of the three existing
characters and fifteen new briefs (`04-v1` through `18-v1`), each assigned to
Astra, Sol, Terra and Luna. All 63 original GLBs are published unchanged. Their
combined size is 428,989,560 bytes. The 12 historical records, their IDs, exact
prompt text, asset hashes, and voting history are preserved.

The requested models were `gpt-6-astra`, `gpt-6.1-sol`, `gpt-6.1-terra` and
`gpt-6-luna`, with XHIGH requested. A 6.1 Luna variant was not offered. Later
Fast requests are recorded separately from initial settings; serving backend,
effective reasoning and actual service tier were not independently exposed.
Producer start/deadline/stop receipts and interruptions are retained. Every
attempt had its own one-hour cap; the recorded clocks were not restarted.

The publication has 18 prompts and 75 records, including two historical invalid
files without downloads. All 73 available GLBs have download and inspection
links. The initial publication kept all 63 new attempts outside voting while
the service catalog awaited an update. The subsequent authorized catalog update
admits 62 new attempts alongside the ten historical eligible entries. Elena/Astra
remains excluded pending prompt mapping. The archive and individual inspection
viewer do not create voter credentials or submit judgments.

## Import limitation resolved

The initial CPU fixture deliberately refused to decode images. That affected
15 new exports and did not establish a model failure. The existing browser
viewer already supported embedded PNG/JPEG.

The new CPU fixture decodes actual pixels, verifies dimensions and bounded
allocations, uses the pinned Three.js r180 loader, checks finite bounds and
texture binding, closes decoded images and checks unchanged hashes. All 63
exports pass, including all 54 embedded images. No GLB was repaired, rotated,
re-exported or otherwise edited. CPU compatibility is not a visual score.

## Evidence boundaries and known issues

- **Elena/Astra (`05-v1-astra`)** received four rubric-heading hyphens instead
  of canonical em dashes. Exact delivered and frozen hashes/text are retained
  in [source evidence](source-evidence.json). Its admission remains pending and
  `comparisonEligible:false`; there is no silent prompt-equivalence claim.
- **Dalia/Luna (`12-v1-luna`)** contains Z-up geometry with identity roots.
  The Y-up studio preserves the orientation, so it appears sideways. This is
  a submitted-model presentation defect, not the image fixture limitation.
- **Rafi/Luna (`11-v1-luna`)** mislabeled local times as UTC and damaged filenames
  in its handoff. Separate [audit corrections](audit-corrections-20261029.json)
  derive UTC from the offset-aware receipt, retaining the original text. The
  computed elapsed time is 661.948923 seconds, rather than the handoff's 662.523.
- **Dalia/Terra (`12-v1-terra`)** claims front/back render review, but matching
  images were not present in the collected output. This remains a producer claim.
- **Esme/Astra (`15-v1-astra`)** side/above images predate the final export.
  Other stills and process cleanup have the disclosed evidence limitations;
  cleanup is not labeled verified.

Original producer claims, sanitized source metadata, exact prompt hashes and
per-file CPU checks are in [the manifest](admission.json) and
[batch source evidence](source-evidence.json). Verbatim local receipts remain in
the coordinator's private preservation archive. Local paths are omitted from
the archive's rendered historical receipt text; historical JSON is unchanged.

No rubric scores, all-angle quality grades, hardware GPU/performance admission,
rigging or deformation results were invented. A bounded software-rendered UI
smoke test, if reported in the publication receipt, is separate from whole-batch
visual admission. Review flags remain pending for those broader questions.
