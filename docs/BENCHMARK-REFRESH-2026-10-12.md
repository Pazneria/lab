# October 12 benchmark gallery refresh

Status: source integration draft; no local tests, generation, browser, previews or pointer activity. Publication requires the exact final revision to pass cloud validation and parent receipt before merge.

The archived source commit is `ba9b01a8c521b261e4ff0c8b8189c24c1f45737f`. Its manifest provides exact bytes and SHA256 hashes for all three research packets and the rendered RoboChallenge table. The original October 1 and October 5 data and metadata remain unchanged. The failed Library transfer was not retried or represented as successful.

The bounded projection adds 13 cards, yielding 86 direct cards and 57 default graph families. Related Arena, Terminal, OSWorld, HealthBench and Waymo setups remain selectable alongside older direct URLs. It includes the complete 142-row Arena snapshot (duplicate source labels retained), 14 WebRISE Text rows, separate Haiku HLE/terminal/science protocols, 82-task OSWorld offline results, eight OpenAI HealthBench rows, separate Anthropic-grader effort runs, HealthAgentBench paper and July cohorts, MentalHealthBench effort cohorts, the complete 54-row RoboChallenge table, four DrivingBench summaries with 11 dependent attempts, and three corrected Waymo outcome comparisons.

Arena bounds have unspecified confidence coverage. Terminal and MentalHealthBench error bars show one standard error; original identified confidence intervals retain their reported level. Source prices are not task costs. HealthAgentBench cost/time axes admit only paired paper attempt measurements, while the July rows retain their separate board setup. Driving attempts share chat state and preserve rounded total discrepancies. Waymo rates are lower-is-better observations of an operating fleet. These views do not create global rankings or establish treatment efficacy or road safety. SWE-Pro with an unspecified version, unrendered Robo single-task evidence, modified ProgramBench and lower-priority candidates remain outside the new graphs and available through source audit links. The existing BARN warning is unchanged.

## Cloud handoff

The parent exclusively owns these generated files: `assets/gallery-data.js`, `data/gallery-refresh-projection-2026-10-12.json`, `data/gallery-metadata-2026-10-12.json`, and `evidence/gallery-data-validation.json`. Generate in that order of dependency:

```sh
node scripts/build-gallery-refresh-2026-10-12.cjs
node scripts/build-gallery.cjs --publish-check
node scripts/build-gallery-refresh-2026-10-12.cjs --check
node scripts/build-gallery.cjs --check --publish-check
node tests/verify-benchmark-refresh.cjs
node scripts/verify-benchmark-refresh-boundary.cjs
```

The draft branch Actions workflow uses the existing public repository settings, read-only contents permission, pinned official actions and a standard Ubuntu runner. Browser tools are temporary and pinned; no credentials, secrets, deployments, artifact uploads or hosted caches are introduced. The workflow checks the exact SHA, frozen source boundary, all existing projections, benchmark row/metric contracts, navigation and cached-return recovery, ranking, original catalog/results, accessibility and new benchmark UI views. Screenshots remain ephemeral. A source-only push cannot pass generated-file checks until the parent commits its output. Retrieve the generated revision and review exact-HEAD checks before requesting final parent receipt. No local fallback is permitted.

Animation studio, SceneBench, CharacterBench, infrastructure, the room, walkable scene entries and other separately owned projects remain outside this increment. Git history is retained for rollback.
