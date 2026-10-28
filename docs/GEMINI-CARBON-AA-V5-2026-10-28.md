# Carbon and AA v5 source checkpoint

Baseline: `b1923705d49f9f9718a1ffb93e6cdc7bcf7a80fd`, including SceneBench
Terra and the October 26 gallery publication. The existing checkout was clean;
no open benchmark PR was found. The separately owned room crosshair PR remains
outside this change. No scene, room, game or navigation behavior is changed.

Six new cards produce 98 direct cards, 89 plotted cards and 65 default families.
Earlier source packets, 58 coverage cards and all their original variants remain.
Four existing benchmark cards gain separately selectable Carbon observations.

| Source | Collected evidence | Important boundary |
| --- | --- | --- |
| [Google announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/) and [evaluation PDF](https://storage.googleapis.com/deepmind-media/gemini/gemini_4_carbon_model_evaluation.pdf) | 17 Carbon measurements | Restricted rollout; no verified public API identifier or broad release date. Highest thinking with benchmark exceptions. Self-computed and reproduced external results attributed separately. |
| [AA public comparison](https://artificialanalysis.ai/models) | 28 default configurations with v5 scores and exact effort/fallback labels | Selected public payload, not all evaluated models. Exact floating source values retained; display rounded to two decimals. |
| [AA v5 announcement](https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5) and [methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking) | October 27 version change; Argon High score 50; benchmark weights/protocols | Adds FrontierCode 2.0 and Terminal-Bench-Science; changes HLE, Omniscience and CritPt datasets. Old index numbers are incomparable. |
| [AA Carbon launch](https://artificialanalysis.ai/articles/gemini-4-carbon-new-number-1) | Separate Coding Agent Index 59 using Antigravity CLI, rounded TB4 64% and FrontierCode v1.1 51% | Different from the v5 Intelligence Index and its current benchmark payload. Standard-price weighted index cost is a defined token-derived statistic, not a generic measured task cost. |
| [Vals model](https://www.vals.ai/models/google_gemini-4-carbon), [TB4](https://www.vals.ai/benchmarks/terminal-bench-4), [VibeCode](https://www.vals.ai/benchmarks/vibe-code) | 10 high-reasoning scores with standard errors; explicitly paired costs/durations for TB4 and VibeCode | Different agents and uncertainty definitions. SEM is not a 95% CI. Model rank denominators are not task counts. |
| [Arena Frontend](https://arena.ai/leaderboard/code/webdev/frontend) | First 20 of 153 configurations, table dated October 27; 829,216 votes | Carbon 1,793 ±17 is preliminary, with 1,861 votes. Overall and HTML are separate cohorts. The table date precedes the October 28 announcement; evaluation dates remain unknown. |

AA v5 is a nine-evaluation composite across four equally weighted capability
groups. Omniscience accuracy and non-hallucination rate contribute separately.
The default comparison shows 12 of 29 collected configurations; the complete
collected view and the older v4.3.2 Argon observation are separate choices.
A smaller v5 value does not imply a model capability regression.

Google OSWorld reports maximum-of-three performance on 82 offline tasks.
Agents' Last Exam uses the October 17 task version and excludes the October 26
update. ExploitGym mentions both six- and ten-hour limits without assigning
the table score to one, so timeout attribution remains unresolved. SEC-bench
Pro uses 183 May 2026 JavaScript tasks and averages pass@1 across three attempts.
These are source observations; no cybersecurity evaluation was executed here.

Frontend preference, screenshot fidelity and functional browser completion
remain different concepts. VibeCode supplies a functional Carbon observation;
Design2Code and WebRISE historical rows remain intact. No Carbon medical,
robotics or driving score was verified. Missing values stay null.

Source publication, release, table snapshot, review and evaluation dates remain
distinct. AA model release dates never become run dates. Google and AA launch
availability statements take precedence over contradictory model-page FAQ text.
The exact-byte manifest protects the curated packet. Full public page/PDF
response hashes are recorded, without claiming those responses are archived in
the repository. No private source, model credential or paid evaluation is used.

Publication follows the existing scoped PR, exact-head validation, main merge
and GitHub Pages workflow. Read-only CI permissions remain unchanged. Final
checks record actual offline/browser results and compare exact live asset bytes
with the deployed commit; they do not establish independently reproduced scores.

## Validation checkpoint

The standalone builders, archived-source checks and new Carbon/v5 assertions
passed locally. All eight existing browser suites passed with fresh headless
Edge profiles. Coverage checks opened all 64 charts; ranking checks exercised
188 coverage metric/cohort views. AA v5/full/history selection, reload, Carbon
preliminary labels, standard-error meaning and 320px layouts passed. The coverage
suite's 24 axe scans reported no violations; automated contrast checks can remain
incomplete. These checks do not replace manual assistive-technology testing.

The first static-link attempt lacked network DNS access; its network-enabled
rerun passed all public links. The first browser run found a nested source-record
normalization issue and then a missing visible preliminary label. Both were
fixed and the complete coverage suite passed afterward. No source score changed.
Hosted exact-head CI and deployment outcomes are recorded on the publication PR
and in the final task report, rather than claimed prospectively here.
