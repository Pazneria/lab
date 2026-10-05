# Gallery status and date audit

This draft corrects the gallery's evidence placement and freshness language. It
starts from deployed commit `132cb8dce5a2b120a4390ce8e8066ba88fa6bcd9` and changes
no scores, source URLs, benchmark protocols, graph axes or cost/time meanings.
The broader coverage import awaits readable original research input. No new empty
cards, composite leaderboard or search expansion are included.

## Historical evidence and missing results

The previous filter ignored the six original catalog entries labeled historical:
Factorio Learning Environment, the NetHack showcase, MASAI, the Kenya consultation
trial, StationeryBench and the BARN finals. They now appear under Historical
evidence. Three fixed PSB 2026 MedAgentBench V2 paper experiments are also
historical result cohorts; this does not declare the maintained benchmark obsolete.
The original 2025 MedAgentBench comparison remains distinct from those experiments.

| View                     | Cards | Meaning                                                                          |
| ------------------------ | ----: | -------------------------------------------------------------------------------- |
| All versions             |    46 | Every preserved discovery or result card                                         |
| Latest collected results |    14 | Plotted cohorts selected as latest for their protocol; not necessarily newly run |
| Historical evidence      |    19 | Historical comparisons, fixed experiments, studies and showcases                 |
| Source guides            |    17 | Sources and interpretation available, no plotted rows admitted                   |
| Unresolved results       |     2 | VoxelBench and RoboChallenge standings not established by the archived evidence  |

Historical source guides appear in both the historical and guide views, so these
filter counts are not additive. All 27 existing graph cards remain available.
Design Arena and WebCraftBench remain source guides pending configuration review;
access to a page does not by itself establish an admissible numeric cohort.

## Source reviews and evaluation dates

The generic “Source checked · Oct 2026” badge is removed. Each card instead uses
the date and scope recorded in its archived input. A parent source audit can
update the source-review date without updating scores or evaluation dates. Original
catalog evidence that was inherited is explicitly labeled a research record.

The secondary Dates & evidence status disclosure distinguishes the source review,
result-packet collection, dated snapshot, publication/revision and evaluation
dates. Where available, model-release dates have their own field. Unknown run
dates remain unknown; publication dates, manifest timestamps and model releases
are never substituted. BullshitBench's original six dated selections remain
separate from its 228 expanded configurations whose evaluation dates are unknown.

`scripts/build-gallery-metadata.cjs` derives this presentation metadata from
the archived catalog, result, current-cohort, frontend and supplemental packets.
`data/gallery-metadata-2026-10-05.json` records every card's classification and
basis. Original inputs remain unchanged and hash checked. Existing version
distinctions remain intact: historical source warnings cannot automatically be
applied to a different SWE-Bench Pro or HLE version.

## Validation and reader check

The status/date browser test checks every inherited historical entry and fixed
paper cohort, exact filter membership, source guides without graphs, unresolved
results, date meanings and bounded query state. It exercises open disclosures
at six widths from 320 to 1440px, keyboard activation and four axe scans. Current
cohort, full-gallery, frontend and navigation regressions also pass. The navigation
fixture now captures scroll position after pointer-driven scrolling caused by
the taller cards; restoration behavior is unchanged. Source and builder checks
preserve the original 20 records, 18 result rows, seven graph views and all existing
numeric cohorts.

A reader can answer three practical questions from the page:

1. Does a source review on October 5 mean the model was evaluated that day?
   The page distinguishes review and evaluation dates, including unknown dates.
2. Can a maintained benchmark contain old experiments? The historical view and
   each card's classification basis explain that relationship.
3. Why does a benchmark lack a graph? Guide and unresolved-result labels explain
   whether rows have not been imported or standings remain unresolved, without
   implying that the project is inactive.

Automated axe scans report zero violations, with color contrast partly incomplete.
These are scoped checks, not an accessibility certification.

## Scoped security review

The owned inputs are public research JSON, source URLs, date/status metadata,
model labels, query state and saved gallery return positions. New prose renders
as text, and generated JavaScript escapes HTML-sensitive characters. The runtime
rejects invalid statuses and impossible dates rather than interpreting them as
markup or executable content. Browser probes cover HTML injection in metadata,
date rollover, malformed filter state, existing unsafe-link checks and bounded
same-origin return navigation. No external runtime resource, iframe, postMessage,
dependency, private data, secret, account, permission or evaluation run is added.
The review covers these changes and does not certify the whole repository.

## Pending research import

The current cleanup/coverage archive resolved to version 1 through the supported
Library route. Materialization failed because Windows Python has no `os.setxattr`;
the single permitted consumer-local retry failed identically. No local archive
was installed, hash verified or extracted. The helper was not modified and no
access or metadata bypass was attempted.

The supplied reports identify available cohorts for existing source guides and
broader canonical-index gaps, including audio, video, multilingual, long-context
and workplace-agent evaluations. Their numbers have not been imported from the
unreadable archive. Readable original data is required before expanding the
gallery; partial seed selections must be labeled as such and research backlog
items must not become empty default cards.

This candidate stays unmerged and unpublished for parent source review. The
independent infrastructure subtree, 3D Lab, external homepage and unrelated
projects are outside the change.
