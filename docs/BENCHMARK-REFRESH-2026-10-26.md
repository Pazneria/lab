# October 26 benchmark source checkpoint

Baseline: `566c650085ab39908a648c14e7945edc790906aa`, the October 19 published
gallery with 89 direct cards in 60 graph families. The existing checkout was clean.
The only open PR observed was #78, a separately owned room crosshair change;
no open benchmark PR was found. This branch changes no room, game, renderer or
navigation assets and has not published new charts.

The standalone source delta contains three separate cohorts and 31 rows:

| Cohort | Selection | New evidence |
| --- | --- | --- |
| [Arena Frontend](https://arena.ai/leaderboard/code/webdev/frontend) | First 20 configurations of 151, October 22 table | 807,096 page-wide votes; per-row votes, score bounds, exact effort labels and preliminary flags retained |
| [HealthBench Professional](https://deploymentsafety.openai.com/gpt-6-october/healthbench) | Table 5 Professional outcome, all five reported model columns | October ChatGPT deployments; adjusted scores 55.2/48.2 for Sol/Luna, with raw 62.2/57.8 kept as a separate metric |
| [MentalHealthBench](https://deploymentsafety.openai.com/gpt-6-october/mentalhealthbench) | Table 6 overall outcome, all six model columns | October Sol/Luna 48.81/51.73 with standard errors 0.97/0.96 across task means |

Medical October deployments are different from September Codex/Work releases.
The mental-health system card uses lowest deployment reasoning settings; it must
not be combined with the preserved September maximum-effort or paper-default
cohorts. The 1,215 synthetic tasks each average four responses, and standard
errors are not confidence intervals. HealthBench's exact table-level effort is
unknown. Evaluation dates, exact deployment dates and measured cost/time remain
unavailable. Neither benchmark establishes clinical safety or patient outcomes.

Frontend preference differs from screenshot fidelity and functional browser
completion. [DesignArena](https://www.designarena.ai/leaderboard?board=webapps&section=website)
still yielded no synchronized extractable category scores; missing is not zero.
Its [methodology](https://notes.designarena.ai/methodology/) keeps Bradley–Terry
preference categories and differing output settings distinct. [Design2Code](https://github.com/NoviScl/Design2Code)
retains its historical 484 cases and separate HARD 80. [WebRISE](https://github.com/IIGROUP/WebRISE)
already has gallery results; its 442 tasks, 5,495 transitions and 5,271 checks
measure distinct transition, requirement and visual outcomes. Those records
are preserved rather than duplicated. The Arena tool-readable primary page was
transcribed and checked against relayed research; a direct download encountered
an access challenge and was not bypassed. Only 20 selected rows are ingested.

[Waymo's June 2026 fleet evidence](https://waymo.com/safety/impact/) already
represents 271.3 million rider-only miles and the corrected outcome rates. No
new observation period or score was inferred. [Gemini Robotics 2](https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/)
describes whole-body and multi-robot capabilities and ASIMOV-Agentic safety;
no comparable trial-counted aggregate score was established. [Opus 5.5's report](https://www.anthropic.com/claude-opus-5-5)
retains vendor-specific max/xhigh effort and safeguard-fallback caveats; no
universal clean-model row was pooled into existing coding or HLE cohorts.
[Browser Use](https://github.com/browser-use/benchmark) V2.1 has 200 tasks and
revised contracts, unlike its historical 60-task results; it is also distinct
from BrowseComp. No historical score was relabeled as current.

The exact-byte manifest accompanies the source packet. Offline commands are:

```powershell
node scripts/build-gallery-refresh-2026-10-26.cjs --check
node tests/verify-benchmark-2026-10-26.cjs
```

The integrated projection contains 92 direct cards and 60 families and preserves
all 55 prior coverage cards and observations exactly. Earlier Frontend and medical
release/configuration choices remain explicit. The owner's direct approval covers
shared renderer/builder integration, testing and publication for this scoped change.

## Integration and validation

The two renderer validators accept the three exact new
`coverage.weekly_refresh.card_ids`, 58 coverage cards and 92 total cards. The main
builder consumes the dated standalone module and metadata. Source links, exact
tables, adjusted/raw metrics and standard errors use the existing schema.

The trusted-branch workflow includes this dated branch and the new offline
checks; its read-only permissions, pinned test tools and isolation remain intact.
Browser regressions exercise all 58 coverage charts, retained history/navigation,
the selected Frontend values, medical metric switching/reload, typed uncertainty,
and 320px accessibility. Negative checks reject wrong refresh dates, incomplete
cohort membership and negative uncertainty. No credential, permission, paid
evaluation, account-sharing or security-policy change is introduced.

Publication uses the existing reversible PR/main GitHub Pages workflow only after
exact-head checks pass. The final report and PR checks record actual outcomes.
Live verification checks the successful Pages head, exact served asset/source
hashes, dated source metadata, and graph/metric controls. No benchmark execution
or paid model API run is part of this update.
