# Catalog integration is blocked

This branch contains a tested interface scaffold, not the completed catalog.
The site deliberately loads **zero entries**. VoxelBench is a named watch item
from the task brief, outside the catalog, with no invented source URL or claim.

## Source identity and transfer result

- Library item: `libfile_bc3ccc1d4f2481918e6776195be562f8`, version `0`.
- File: `benchmark-tracker-v1.zip`.
- Backing file: `file_000000004ce881f98a78532f5eaa9e52`.
- Task brief reports 20 entries, 51 source URLs, a JSON schema, README, and
  validator. Those counts and files have **not been independently checked**.
- The current Library skill's resolved-reference transfer was attempted in this
  Windows workspace. The first download failed under the restricted network.
- The one supported retry reached the download but failed before installing the
  file: `AttributeError: module 'os' has no attribute 'setxattr'` in the unmodified
  Library helper. No readable final ZIP exists at the requested destination.
- The helper was not modified, metadata was not bypassed, and no alternate
  download route was attempted.

Complete materialization in a supported environment using the current Library
skill and preserve Library identity. Do not publish this preview or link it from
the homepage as a completed benchmark destination before source integration.

## Next integration steps

1. Verify the final ZIP bytes exist and are readable, then inspect its README,
   schema, validator, and catalog. Record its checksum and actual counts.
2. Run the supplied validator. Keep all scores null. Preserve all source URLs
   verbatim, date qualifications, limitations, and uncertainty statements.
3. Build a reviewed display projection in `assets/catalog.js`. The contract below
   is an interface contract only; it does not claim to reproduce the unread
   source schema. Map source categories, status definitions, and evidence settings
   explicitly. Do not silently force ambiguous entries into a category.
4. Include every source entry. Check stable IDs, exact URLs, count parity, and
   next verification steps. Remove the provisional status-definition note only
   after matching the source definitions. Adapt the separate VoxelBench note to
   its actual source record; do not upgrade its verification status by inference.
5. Rerun browser tests with the actual catalog. Check all 51 reported URLs and
   record redirects, failures, paywalls, and unverifiable destinations without
   deleting their evidence. Review the source basis/date shown in the UI.
6. Coordinate the Lab change and homepage link with the homepage owner. This
   branch changes only `Pazneria/lab`; nothing is published, pushed, or merged.

## Display contract

The dependency-free renderer loads a classic local script, so file previews and
GitHub Pages subpaths work without fetching JSON or adding a backend. The checked
in file sets `availability: 'unavailable'` and contains no sample entries.

`window.LAB_CATALOG` has:

| Field           | Requirement                                        |
| --------------- | -------------------------------------------------- |
| `schemaVersion` | `1` (display contract version)                     |
| `availability`  | `available` or `unavailable`                       |
| `basis`         | Source-basis text when available; otherwise `null` |
| `verifiedAt`    | Actual verification date `YYYY-MM-DD` or `null`    |
| `entries`       | Array; empty when unavailable                      |

Each entry requires:

| Field              | Requirement                                                        |
| ------------------ | ------------------------------------------------------------------ |
| `id`               | Unique lowercase slug                                              |
| `name`, `summary`  | Source-grounded text                                               |
| `categories`       | Nonempty array of `community`, `games`, `medical`, `physical`      |
| `status`           | `historical`, `live`, `ongoing`, `unverified`                      |
| `setting`          | `real-trial`, `simulation`, `case`, `mixed`, `other`, `unverified` |
| `evidenceType`     | Source's specific study/test type, not an inferred ranking         |
| `sourceBasis`      | What the cited sources establish                                   |
| `verifiedAt`       | Actual verification date or `null`                                 |
| `score`            | Exactly `null`; the UI has no score comparison                     |
| `limitations`      | Nonempty array of source-grounded limits                           |
| `nextVerification` | Concrete next check                                                |
| `sources`          | Nonempty array of source records                                   |

Each source requires `title`, exact `url` (HTTP or HTTPS, no credentials), `basis`
(what this particular source supports), and `publishedAt` (`YYYY-MM-DD` or
`null`). Do not manufacture dates to satisfy the contract. If the source uses a
year, date range, or qualified date, extend the display contract and tests to
preserve that qualification. Unknown dates render as "Not recorded".

Invalid display data fails visibly and shows zero records. Text is inserted as
text nodes, not HTML. Source URLs are validated and assigned exactly as supplied.
Entries sort alphabetically; filter counts never express performance.

The browser tests inject clearly named synthetic TEST ONLY records **in memory**
to exercise the renderer, safe links, filtering, and evidence details. These are
not included in the runtime catalog and do not verify real source content.
