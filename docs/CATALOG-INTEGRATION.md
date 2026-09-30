# Catalog provenance and mapping

**Content integrated:** all 20 parent-supplied original records and all 51 exact
source URLs. VoxelBench remains a separate unverified watch; Astra remains a
showcase, not a scored benchmark. Thirty metric definitions have null values,
subjects, and result dates. Aggregation is disabled.

## Provenance

The parent supplied the full original catalog JSON directly in the delegation
message, authorizing its use as local task input. The JSON values are saved in
`data/catalog.original.json`. JSON property order and whitespace are not part of
the source contract; strings, arrays, numbers, booleans, and nulls are retained.

- Schema version: `1.0.0`; catalog: `public-benchmark-tracker-v1`.
- Research snapshot: `2026-09-30`.
- Local original SHA-256:
  `261e704c6076c5c85b698fefd9a4135d61049e56377d01d42c14aae28800ce85`.
- Source: **parent-supplied original catalog**, not successful Library materialization.
- Sources inherit earlier research and its access labels. The interface does not
  claim fresh source-page, methodology, row, or outcome verification.
- Later HTTP response checks are separate evidence about link reachability only.
  They do not change lifecycle or verification labels.

The earlier Library ZIP transfer failed during Windows metadata application
(`os.setxattr` unavailable), before installation at the exact destination.
A read-only check confirmed no final ZIP there. No transfer or helper was retried
or modified after the parent supplied JSON, and no metadata workaround was used
to recover that ZIP. The ZIP's separate schema/README/validator remain unread;
we validate the supplied JSON with the local source-preserving builder.

## Category and evidence mapping

| Original area         | Display category      |                       Records |
| --------------------- | --------------------- | ----------------------------: |
| `community_games`     | Games                 | 5, including VoxelBench watch |
| `independent_general` | Independent & general |                             4 |
| `medical`             | Medical evidence      |                             5 |
| `physical_world`      | Robots & cars         |                             6 |

The category key `community` selects the original independent/general area.
Maintainer names and relationships remain visible; category membership is not a
claim of funding independence.

| Original context                                               | Display evidence setting      |
| -------------------------------------------------------------- | ----------------------------- |
| `real_world`, prospective clinical / controlled physical trial | Real trial / physical test    |
| `real_world`, observational evidence                           | Real-world observation        |
| `simulation`                                                   | Simulation                    |
| `interactive_game` or `virtual_construction`                   | Virtual game / construction   |
| `static_dataset`                                               | Dataset / retrospective tasks |
| `sandboxed_computer`                                           | Computer sandbox              |
| `mixed`                                                        | Mixed                         |
| `showcase` entry type                                          | Showcase / case study         |

Astra's original setting **Interactive game** is preserved in its detail view
while the filter flags its showcase evidence. Medical prospective studies retain
the Clinical study type and their exact original outcome qualifications.
Retrospective datasets, simulated EHR tasks, and real patient trials remain
distinguishable. Waymo observations are separated from controlled trials.

Lifecycle labels are copied exactly: 11 live, 6 historical, 2 ongoing,
1 unverified, all as of the research date. A working URL does not upgrade
VoxelBench's unresolved standings or any other source's verification status.

## Projection and checks

`scripts/build-catalog.cjs` validates 20 unique records, 51 unique source IDs,
all four area counts, 30 null-valued metric definitions, in-record metric source
references, and the watch/showcase identities. It writes `assets/catalog.js`
deterministically; `--check` detects stale projection bytes. Browser checks
compare every record's scope, summaries, inference limits, status basis,
verification note, result interpretation, next step, protocols, and exact URLs
against the saved original JSON.

No publication date is invented from a research-check date. The UI displays
**Research snapshot** and **Snapshot source check**, including inherited research
and prior retrieval-failure labels. It retains the original provenance text per
source. Unpopulated scores never become zero, ratings, or rankings.

The client rejects unsafe URLs, non-null values, duplicate IDs, impossible dates,
and missing evidence limits. It uses text nodes for research content. The
fallback and synthetic regression fixtures are injected only in memory and are
not runtime catalog entries.

Coordinate homepage linking only after the Lab change is deliberately integrated.
No merge, push, or publish has occurred.
