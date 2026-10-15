# Gemini 4 Argon tracker update

Source review and cloud generation passed for revision [`a4e0560ebec15b8e15440851e66847e891b68b39`](https://github.com/Pazneria/lab/commit/a4e0560ebec15b8e15440851e66847e891b68b39). [Hosted validation run 38788521443](https://github.com/Pazneria/lab/actions/runs/38788521443) passed all source/static checks and all eight browser regression scripts. Final publication-revision checks are linked through [PR #79](https://github.com/Pazneria/lab/pull/79/checks); later documentation revisions require their own successful checks before publication.

The update adds separate Google and Artificial Analysis report cards for Gemini 4 Argon (`gemini-4-argon`) and separate selected Argon cohorts on seven existing benchmark cards. The gallery has 88 direct cards across 60 benchmark and model-report families. Older source packets, dates, rows, settings, direct links and chart defaults remain preserved. The new report cards make Argon searchable without combining unrelated benchmark scores.

Google's model card supplies 19 measurements across 18 benchmark views. Self-computed evaluations and external board results reproduced by Google carry distinct evidence labels; this update does not claim to have independently verified those external boards. AA supplies 10 measurements across five benchmark views, using high reasoning with Long Decode Continuation. Neither view represents a complete refreshed leaderboard or a matched-compute experiment.

AutomationBench's private-set 51.3% in the Google report stays separate from AutomationBench-AA's 78%. Google's Terminal-Bench 4.0 result is 57.4%; AA reports a rounded 57%. Google uses six times the verifier timeout for Terminal-Bench Science, and its OSWorld 2.0 partial score is the maximum of three single-attempt runs. These are separate selectable cohorts, not extra rows in an earlier harness ranking. GraphWalks context subsets retain their item counts. Briefcase Elo and rubric diagnostics, and Omniscience hallucination/accuracy/index measurements, retain their units and directions.

AA directly reports 53 points on Intelligence Index v4.3.2. Its $1.99 cost per Intelligence Index task is an introductory-price observation with a stated cache basis, not a generic task cost or current-price guarantee. Approximate output use is 62k tokens per index task; unavailable throughput, evaluation dates, generic cost/time and uncertainty stay unknown. API token prices are not task costs. Lower hallucination is better; no global ranking is introduced.

The initial announcement was September 30; broad developer availability began October 13. The September AA article's restricted-access description is superseded by the later rollout announcement, while its dated measured observations remain attributed to that article. Source review on October 15 is not an evaluation date.

Primary sources: [API documentation](https://ai.google.dev/gemini-api/docs/models/gemini-4-argon), [Google model card](https://deepmind.google/models/model-cards/gemini-4-argon/), [evaluation methodology](https://deepmind.google/models/evals-methodology/gemini-4-argon), [developer rollout](https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-4-argon/), and [AA analysis](https://artificialanalysis.ai/articles/gemini-4-argon-google-top-three-labs). The dated source packet and exact-byte manifest are in `data/gemini-4-argon-2026-10-15/`.

## Cloud validation

Run generation and checks in the authorized cloud environment:

```sh
node scripts/build-gallery-gemini-argon-2026-10-15.cjs
node scripts/build-gallery.cjs --publish-check
node scripts/build-gallery-gemini-argon-2026-10-15.cjs --check
node scripts/build-gallery.cjs --check --publish-check
node tests/verify-benchmark-refresh.cjs
node tests/verify-gemini-argon.cjs
node scripts/verify-benchmark-refresh-boundary.cjs
```

The existing bounded hosted workflow checks source hashes, exact selected values, provider separation, methodology exceptions, null missing metrics, preserved older cohorts, date semantics, archive links and the generated asset. Browser checks cover the new selectors, score directions, mobile layouts, source links, all metric/cohort views, navigation, BFCache, original catalog/results and accessibility. Existing read-only permissions, pinned temporary test tools, standard public runner and no-upload policy remain unchanged. No evaluations or paid API calls are run.

Studio, game optimization, SceneBench, CharacterBench, infrastructure, the room and frozen scene entries remain outside this change. The source-boundary baseline is current main `98070799927edd6bda1a29a6518027443d3ad841`, preserving the separate studio release.
