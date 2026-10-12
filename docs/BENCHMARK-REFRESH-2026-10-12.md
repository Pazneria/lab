# October 12 benchmark gallery refresh

The refresh adds 13 cards, yielding 86 direct cards and 58 default graph families. Six cards join existing Arena, Terminal, OSWorld and HealthBench families. Seven add graph families: WebRISE, original HLE, HealthAgentBench, MentalHealthBench, RoboChallenge, DrivingBench and Waymo. The older Waymo entry remains a source guide. Older direct URLs and version selectors remain available.

The additions include the complete 142-row Arena Frontend snapshot, with duplicate source labels retained; 14 WebRISE Text rows; separate Haiku HLE, terminal and science protocols; the OSWorld 2.1 82-task offline setup; eight OpenAI HealthBench rows; separate Anthropic-grader effort runs; HealthAgentBench paper and July cohorts; MentalHealthBench effort cohorts; the complete 54-row RoboChallenge aggregate table; four DrivingBench summaries and all 11 dependent attempts; and three corrected Waymo fleet outcomes.

Every added card links to its archived research packet. HealthBench also links to the preserved seven-row predecessor cohort and its original medical input. The exact source manifest records byte counts and SHA256 hashes for the three packets and rendered RoboChallenge table. The original October 1 and October 5 data and metadata remain unchanged.

Arena whiskers show published bounds with unspecified confidence coverage. Terminal and MentalHealthBench whiskers show one standard error. Existing identified confidence intervals retain their reported level. HealthAgentBench cost and time axes use paired paper measurements per attempt; July additions retain separate board labels. Driving attempts share chat state, and rounded total discrepancies remain as reported. Waymo's June 30 date is the observation-period end; a separate source snapshot date is unverified. Its three adverse-outcome rates are lower-is-better observations of an operating fleet.

The OSWorld selector links the preserved 2.0 developer-report card and the 2.1 October 82-task offline card without combining rows or protocols. The September 108-task setup remains distinct. SWE-Pro with an unspecified version, unrendered Robo single-task evidence, modified ProgramBench and lower-priority candidates remain outside the new graphs and accessible through source audit links. The existing BARN warning is unchanged.

These views preserve missing values, do not introduce a global ranking, and do not establish treatment efficacy or public-road safety. Source review, publication, observation-period, snapshot and evaluation dates describe separate events.

## Generation and validation

Cloud generation and independent source review passed at revision [`6b79810ef45589a3f2f59e77251daa293f9ab97b`](https://github.com/Pazneria/lab/commit/6b79810ef45589a3f2f59e77251daa293f9ab97b). [Actions run 38280533607](https://github.com/Pazneria/lab/actions/runs/38280533607) passed every static, source-preservation and boundary check and all eight browser scripts. Browser checks covered new rows and controls, 94 metric/cohort views, real back-forward cache restoration, recovery with cached older HTML and current assets, narrow screens, accessibility and the original catalog/results.

Checks for the final publication revision are linked through [PR #75](https://github.com/Pazneria/lab/pull/75/checks). The recorded successful run validates the revision named above; a later documentation or integration revision must pass its own checks before publication. Publication remains gated on the exact final revision and reconciliation with current main. The archived source revision is `ba9b01a8c521b261e4ff0c8b8189c24c1f45737f`.

```sh
node scripts/build-gallery-refresh-2026-10-12.cjs
node scripts/build-gallery.cjs --publish-check
node scripts/build-gallery-refresh-2026-10-12.cjs --check
node scripts/build-gallery.cjs --check --publish-check
node tests/verify-benchmark-refresh.cjs
node scripts/verify-benchmark-refresh-boundary.cjs
```

The bounded Actions workflow checks exact source hashes, projections, packet links, typed date/uncertainty fields, row membership, family relationships, cost/time units, excluded cohorts and the frozen source boundary. Browser regressions cover navigation, cached returns, ordering, new chart controls, narrow screens, original catalog/results and accessibility. The workflow uses read-only repository contents permission, pinned official actions and temporary pinned browser tools on a standard Ubuntu runner. Screenshots remain ephemeral; no artifact or hosted-cache storage is uploaded.

Animation studio, SceneBench, CharacterBench, infrastructure, the room, walkable scene entries and other separately owned projects remain outside this increment. Git history is preserved for rollback.
