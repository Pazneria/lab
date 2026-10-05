# Atlas entity and map revision: integration boundary

Base: `fd8bace01e99e99e5bae0afe65c6d7efc95873bc` (verified main, including benchmark PR #17). The revision began at `82183ca78b00daf8d9c0651497b8ccfac2dd76e2` and fast-forwarded to current main without atlas conflicts.
Branch: `codex/atlas-entity-pages`.

## Source review and publication authorization

Independent review passed PR #19 at `4b9a73954db869781c86cbde2939957888936297`,
including all profiles, capacity/location records, three CSV hashes, 430 timeline
observations and 99 chip-count records. Publication was authorized after three
small corrections: derive historical training badges from the evidence class,
add Epoch's Opus ECI page, and add Microsoft's August 12 preview announcement.
Those source pages were verified and retained in `data/profiles/review-corrections.json`.
The updated builder and browser checks verify these corrections.

Every changed or added file in this revision is under `infrastructure/`. No benchmark
data/UI, shared navigation, room behavior or hosting configuration is changed.
The existing navigation link already reaches `/lab/infrastructure/`; all new entity
routes are ordinary static directories under that route. GitHub Pages can serve them
without a new service, paid key, credential or deployment pipeline.

## Parent review checklist

1. Review the seven lab profiles, estimated versus unknown power, current model
   identity/access and model-training scope against the supplied public research.
2. Review 25 location patches, three approximate areas and address-only records.
   No footprint, surveyed accuracy, inferred coordinate or model allocation is added.
3. Confirm Narvik is one canonical project. Its July 2025 proposal is historical;
   April 2026 Nscale management/Microsoft contract evidence is separate from delivery.
4. Inspect company, facility, product, map and mobile screenshots. Full source records
   and confidence qualifiers remain available on native entity pages.
5. Fetch latest main and resolve only atlas-local conflicts. Preserve benchmark PR #17
   and the benchmark owner's subsequent work. Do not alter shared navigation here.
6. Run the build consistency and atlas browser checks. The explicit source review and publication authorization are recorded above;
   merge only after these checks pass at the final branch head.
7. After an authorized merge, verify the exact Pages commit and served entity routes,
   assets and normalized dataset. Use the updated publication test for all native entity routes and runtime assets;
   save the Pages build identity and exact live-byte receipt separately.

## Evidence and limits

The normalized Epoch import was reproduced from all three hash-matching downloads;
20 essential records match the parent's supplied values. All 11 profile packets and
five location packets are retained. Raw unfiltered snapshots stay in ignored evidence.
Broader imported rows are attributed dataset ingestion, not an independent audit of
every underlying permit or claim. Original packet fields and superseded records are
retained; visible labels decode literal HTML entities.

Current local verification results are in `data-validation.json` and
`ui-validation.json`. Screenshots and the full browser report are under ignored
`evidence/infrastructure/`. Earlier `aggregate-validation.json` documents the first
edition, not a fresh full-repository regression run for this revision.

Browser coverage is headless Microsoft Edge, not physical touch devices, Safari or
Firefox. Automated accessibility checks supplement manual keyboard/visual inspection;
they are not a screen-reader user test. Optional external street detail depends on
OSM availability and policy; tests simulate tile failure and never request real tiles.
The bundled map and directory work without that service. At street zoom with street
detail off, bundled geography has no building-level detail; marker evidence does not
become more precise by zooming.

No automatic source refresh, geocoding or status advancement occurs when a target
date passes. The snapshot remains dated 2026-10-05, with unknowns shown explicitly.
