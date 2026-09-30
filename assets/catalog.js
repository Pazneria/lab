/* Generated from data/catalog.original.json by scripts/build-catalog.cjs.
 * Parent-supplied research snapshot; not successful Library materialization.
 * All metric values remain null. Do not hand-edit this projection. */
window.LAB_CATALOG = {
  "schemaVersion": 1,
  "availability": "available",
  "basis": "Original research catalog",
  "verifiedAt": null,
  "snapshotAt": "2026-09-30",
  "coverageNote": "Twenty discovery entries selected from four previously researched catalogs. Status reflects the 2026-09-30 research snapshot, not fresh source polling. Five games, four independent/general, five medical, and six physical-world entries; not exhaustive. One unresolved watch and one showcase are excluded from rankings. Numeric results are deliberately unpopulated.",
  "aggregationReason": "Preference, task progress, simulator scores, clinical outcomes, and real-world crash rates do not share a defensible common scale. No custom or aggregate ratings assigned.",
  "provenance": "Original JSON supplied directly by the parent task. Library materialization did not succeed.",
  "entries": [
    {
      "id": "runebench",
      "name": "RuneBench",
      "categories": [
        "games"
      ],
      "status": "live",
      "setting": "game",
      "sourceSetting": "Interactive game",
      "evidenceType": "Benchmark metric definitions",
      "summary": "Coding agents explore and train skills in a RuneScape environment using a TypeScript SDK/MCP and accelerated server.",
      "entryType": "benchmark",
      "tags": [
        "planning",
        "tool-use",
        "long-horizon",
        "runescape"
      ],
      "maintainer": "Max Bittker / Websim",
      "relationship": "community",
      "sourceBasis": "Prior research found September 2026 trial artifacts; the README model list lagged the results directory.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "Sixteen skill tasks at 15 or 30 minutes; gold tasks are separate. Evaluated unit is model plus SDK, tools, reasoning settings, and budget.",
      "score": null,
      "metrics": [
        {
          "name": "Best XP rate",
          "value": null,
          "unit": "XP/min",
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Best 15-second window within a skill run; retain skill and 15/30-minute track.",
          "as_of": null,
          "source_ids": [
            "runebench-s1",
            "runebench-s2"
          ]
        }
      ],
      "resultNote": "Metric definition captured; per-model results intentionally not ingested. Peak XP/min is not total XP.",
      "comparabilityGroup": "runebench-skill-version-budget",
      "mayInfer": [
        "Public trajectories, time series, costs, videos, and per-model JSON can support protocol-specific analysis."
      ],
      "limitations": [
        "A peak skill rate is not a stable overall game-competence score.",
        "Small samples, latency, starting conditions, and SDK changes prevent casual cross-run ranking."
      ],
      "nextVerification": "Extract one dated trial with exact SDK commit, skill, starting conditions, reasoning, latency, and budget before displaying a score.",
      "sources": [
        {
          "id": "runebench-s1",
          "title": "Benchmark",
          "url": "https://maxbittker.github.io/runebench/",
          "kind": "primary_project",
          "basis": "Task scope and metric",
          "supports": [
            "Task scope and metric"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: community-game-benchmarks.md"
        },
        {
          "id": "runebench-s2",
          "title": "Repository",
          "url": "https://github.com/MaxBittker/runebench",
          "kind": "primary_project",
          "basis": "Harness and method",
          "supports": [
            "Harness and method"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: community-game-benchmarks.md"
        },
        {
          "id": "runebench-s3",
          "title": "30-minute result artifacts",
          "url": "https://github.com/MaxBittker/runebench/tree/main/results/skills-30m",
          "kind": "primary_data",
          "basis": "Result artifact availability and September coverage",
          "supports": [
            "Result artifact availability and September coverage"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: community-game-benchmarks.md"
        }
      ]
    },
    {
      "id": "voxelbench",
      "name": "VoxelBench",
      "categories": [
        "games"
      ],
      "status": "unverified",
      "setting": "game",
      "sourceSetting": "Virtual construction",
      "evidenceType": "Human preference",
      "summary": "Voxel-construction preference benchmark with separate text and image tracks; retained as a watch item because exact current results were unresolved.",
      "entryType": "watch",
      "tags": [
        "voxel",
        "spatial",
        "creative",
        "human-preference",
        "watch"
      ],
      "maintainer": "VoxelBench creators",
      "relationship": "community",
      "sourceBasis": "Prior research found 2026 coverage, but direct leaderboard retrieval exposed only an AI-voting notice and indexed snapshots disagreed.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "unverified",
      "verificationNote": "Identity and methodology are supported by earlier research; this v1 watch label reflects unresolved current standings, not proof the project is inactive.",
      "scope": "Anonymous human pairwise judgments with Glicko-2 ratings; track, generation setup, effort, vote counts, and uncertainty matter.",
      "score": null,
      "metrics": null,
      "resultNote": "No current rank, score, leader, or confidence interval accepted into this catalog.",
      "comparabilityGroup": null,
      "mayInfer": [
        "There is a relevant public voxel-construction evaluation to investigate."
      ],
      "limitations": [
        "Indexed score snippets establish neither current standings nor a verified comparison.",
        "Creative preference ratings are not a direct test of physical-world ability."
      ],
      "nextVerification": "Reopen the official board when available and confirm methodology, text/image track, dated rows, generation rules, vote counts, and intervals.",
      "sources": [
        {
          "id": "voxelbench-s1",
          "title": "Leaderboard",
          "url": "https://voxelbench.ai/leaderboard",
          "kind": "primary_project",
          "basis": "Benchmark identity; current numerical rows unresolved",
          "supports": [
            "Benchmark identity; current numerical rows unresolved"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "failed",
          "provenance": "Recovered 2026-09-30 research catalog: community-game-benchmarks.md"
        },
        {
          "id": "voxelbench-s2",
          "title": "Creators’ explanation",
          "url": "https://www.reddit.com/r/singularity/comments/1nfauf4",
          "kind": "primary_project",
          "basis": "Creator-described evaluation approach",
          "supports": [
            "Creator-described evaluation approach"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: community-game-benchmarks.md"
        }
      ]
    },
    {
      "id": "balrog",
      "name": "BALROG",
      "categories": [
        "games"
      ],
      "status": "live",
      "setting": "game",
      "sourceSetting": "Interactive game",
      "evidenceType": "Benchmark metric definitions",
      "summary": "Six-environment game suite for exploration, spatial reasoning, and long-horizon planning, with separate language-only and vision-language boards.",
      "entryType": "leaderboard",
      "tags": [
        "planning",
        "spatial",
        "long-horizon",
        "multi-game"
      ],
      "maintainer": "BALROG research collaboration",
      "relationship": "academic",
      "sourceBasis": "Prior research directly observed September 2026 rows and a stated weekly update schedule.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "BabyAI, Crafter, TextWorld, Baba Is AI, MiniHack, and NetHack. Environment progress is aggregated, but environments and modalities must remain visible.",
      "score": null,
      "metrics": [
        {
          "name": "Environment progress",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Report individual environment and modality before any suite average.",
          "as_of": null,
          "source_ids": [
            "balrog-s1"
          ]
        }
      ],
      "resultNote": "No model scores copied. Open-code marks and reproduced-result checkmarks are distinct; observed September rows lacked the reproduction checkmark.",
      "comparabilityGroup": "balrog-environment-modality-version",
      "mayInfer": [
        "The suite measures progress within specified game environments and scaffolds."
      ],
      "limitations": [
        "Progress is not completion or win rate.",
        "An open-code submission is not necessarily independently reproduced; NetHack progress is not ascension."
      ],
      "nextVerification": "Capture row date, modality, scaffold, uncertainty, and reproduction badge separately.",
      "sources": [
        {
          "id": "balrog-s1",
          "title": "Primary board and methodology",
          "url": "https://balrogai.com/",
          "kind": "primary_project",
          "basis": "Environments, progress metric, update policy, and reproduction labels",
          "supports": [
            "Environments, progress metric, update policy, and reproduction labels"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: community-game-benchmarks.md"
        }
      ]
    },
    {
      "id": "factorio-learning-environment",
      "name": "Factorio Learning Environment",
      "categories": [
        "games"
      ],
      "status": "historical",
      "setting": "game",
      "sourceSetting": "Interactive game",
      "evidenceType": "Benchmark metric definitions",
      "summary": "Python-REPL agent environment for long-horizon factory construction and resource optimization.",
      "entryType": "benchmark",
      "tags": [
        "factory",
        "program-synthesis",
        "resource-planning"
      ],
      "maintainer": "Factorio Learning Environment contributors",
      "relationship": "community",
      "sourceBasis": "The board showed a 2026-09-28 page update, but visible open-play evaluations were dated March 6–7, 2025; v0.3 lab-play results concerned September 2025 models.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "Keep open-play production scores and milestones separate from v0.3 constrained lab-play throughput success.",
      "score": null,
      "metrics": [
        {
          "name": "Open-play Production Score",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Open-play environment and version; do not compare directly with lab-play pass@8.",
          "as_of": null,
          "source_ids": [
            "factorio-learning-environment-s1"
          ]
        },
        {
          "name": "Lab-play pass@8",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "v0.3 report: 64 steps, recipe/API guidance, and a 60-second unattended holdout.",
          "as_of": null,
          "source_ids": [
            "factorio-learning-environment-s2"
          ]
        }
      ],
      "resultNote": "Historical scored results are cataloged; maintained code or a recent page stamp does not refresh their evaluation dates.",
      "comparabilityGroup": null,
      "mayInfer": [
        "The environment offers reproducible factory-planning workloads and distinct open/lab-play protocols."
      ],
      "limitations": [
        "A recent page-update date establishes fresh frontier-model results.",
        "Pass@8, single-run success, production score, and throughput targets are interchangeable."
      ],
      "nextVerification": "Find genuinely dated new evaluation artifacts; preserve release, inventory, buffering/crafting rules, budget, and metric.",
      "sources": [
        {
          "id": "factorio-learning-environment-s1",
          "title": "Leaderboard",
          "url": "https://jackhopkins.github.io/factorio-learning-environment/leaderboard/",
          "kind": "primary_project",
          "basis": "Page/result date distinction and open-play metric",
          "supports": [
            "Page/result date distinction and open-play metric"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: community-game-benchmarks.md"
        },
        {
          "id": "factorio-learning-environment-s2",
          "title": "v0.3 protocol and report",
          "url": "https://jackhopkins.github.io/factorio-learning-environment/versions/0.3.0.html",
          "kind": "primary_project",
          "basis": "Lab-play protocol",
          "supports": [
            "Lab-play protocol"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: community-game-benchmarks.md"
        },
        {
          "id": "factorio-learning-environment-s3",
          "title": "Repository",
          "url": "https://github.com/JackHopkins/factorio-learning-environment",
          "kind": "primary_project",
          "basis": "Maintained environment code",
          "supports": [
            "Maintained environment code"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: community-game-benchmarks.md"
        }
      ]
    },
    {
      "id": "astra-nethack-ascension",
      "name": "Astra NetHack ascension",
      "categories": [
        "games"
      ],
      "status": "historical",
      "setting": "case",
      "sourceSetting": "Interactive game",
      "evidenceType": "Showcase case study",
      "summary": "An independently documented NetHack ascension with an evolving agent harness, archived attempts, journals, and server evidence.",
      "entryType": "showcase",
      "tags": [
        "nethack",
        "long-horizon",
        "demonstrated-achievement"
      ],
      "maintainer": "Kenny / kenforthewin",
      "relationship": "community",
      "sourceBasis": "Fixed author write-up published September 21, 2026.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "NetHack 3.6.7 on Hardfought; tools evolved, wiki/web/source access was unrestricted, and the operator supplied setup and resumptions.",
      "score": null,
      "metrics": null,
      "resultNote": "Showcase only. No win rate or ranked score inferred from the documented attempts.",
      "comparabilityGroup": null,
      "mayInfer": [
        "The evidence package supports a demonstrated end-to-end achievement in the documented setup."
      ],
      "limitations": [
        "One successful run among a few documented attempts gives a stable success probability.",
        "An evolving, unbounded harness can be ranked directly against fixed-budget BALROG results."
      ],
      "nextVerification": "If promoting to a benchmark, first define a fixed harness, budget, intervention policy, seeds, and repeated trials.",
      "sources": [
        {
          "id": "astra-nethack-ascension-s1",
          "title": "Write-up and server evidence",
          "url": "https://kenforthewin.github.io/blog/posts/llm-nethack-ascension/",
          "kind": "primary_project",
          "basis": "Achievement, setup, interventions, and archived evidence",
          "supports": [
            "Achievement, setup, interventions, and archived evidence"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: community-game-benchmarks.md"
        },
        {
          "id": "astra-nethack-ascension-s2",
          "title": "Harness and archives",
          "url": "https://github.com/kenforthewin/nethack_astra",
          "kind": "primary_data",
          "basis": "Reproducibility artifacts",
          "supports": [
            "Reproducibility artifacts"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: community-game-benchmarks.md"
        }
      ]
    },
    {
      "id": "bullshitbench-v2",
      "name": "BullshitBench v2",
      "categories": [
        "community"
      ],
      "status": "live",
      "setting": "dataset",
      "sourceSetting": "Static dataset",
      "evidenceType": "Benchmark metric definitions",
      "summary": "Tests whether models challenge invalid premises instead of accepting plausible-sounding nonsense.",
      "entryType": "benchmark",
      "tags": [
        "invalid-premises",
        "robustness",
        "community"
      ],
      "maintainer": "Peter Gostev",
      "relationship": "community",
      "sourceBasis": "Recovered research reports an official README update on September 29, 2026 and versioned v2 data.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "One hundred prompts across thirteen nonsense techniques and several domains; three model judges.",
      "score": null,
      "metrics": [
        {
          "name": "Clear-pushback rate",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Retain all-attempt versus refusal-excluded denominator and exact judge versions.",
          "as_of": null,
          "source_ids": [
            "bullshitbench-v2-s1",
            "bullshitbench-v2-s2"
          ]
        }
      ],
      "resultNote": "Metric definition only. Dashboard and canonical CSV may use different denominators.",
      "comparabilityGroup": "bullshitbench-v2-denominator-judges",
      "mayInfer": [
        "It measures responses to the supplied invalid-premise prompts under the specified judges."
      ],
      "limitations": [
        "It measures how often models wrongly reject valid questions.",
        "Refusal exclusions, errors, reasoning settings, or judge changes can be ignored when comparing rates."
      ],
      "nextVerification": "Pin v2 manifest, judge versions, effort, response set, and denominator before importing results.",
      "sources": [
        {
          "id": "bullshitbench-v2-s1",
          "title": "Methodology and versioned data",
          "url": "https://github.com/petergpt/bullshit-benchmark",
          "kind": "primary_project",
          "basis": "Prompt set, scoring, freshness, and artifacts",
          "supports": [
            "Prompt set, scoring, freshness, and artifacts"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: independent-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "bullshitbench-v2-s2",
          "title": "Dashboard",
          "url": "https://petergpt.github.io/bullshit-benchmark/",
          "kind": "primary_project",
          "basis": "Public result presentation",
          "supports": [
            "Public result presentation"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: independent-ai-benchmarks-2026-09-30.md"
        }
      ]
    },
    {
      "id": "terminal-bench-science-0-1",
      "name": "Terminal-Bench-Science 0.1",
      "categories": [
        "community"
      ],
      "status": "live",
      "setting": "sandbox",
      "sourceSetting": "Sandboxed computer",
      "evidenceType": "Benchmark metric definitions",
      "summary": "Executable scientific research workflows with task-specific tests of produced artifacts.",
      "entryType": "benchmark",
      "tags": [
        "science",
        "terminal",
        "agent-workflows"
      ],
      "maintainer": "Terminal-Bench-Science / Stanford-led collaboration",
      "relationship": "mixed",
      "sourceBasis": "Version 0.1 launched August 27, 2026; the recovered catalog found public results, code, and a 0.2 roadmap.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "Seventy workflows spanning scientific domains; evaluations use model-plus-agent systems, not interchangeable bare models.",
      "score": null,
      "metrics": [
        {
          "name": "Task resolution rate",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Three trials per task with release-specific artifact tests; record agent/scaffold.",
          "as_of": null,
          "source_ids": [
            "terminal-bench-science-0-1-s1",
            "terminal-bench-science-0-1-s2",
            "terminal-bench-science-0-1-s3"
          ]
        }
      ],
      "resultNote": "No scored system rows ingested. Industry funding/API credits are disclosed; academic ownership is not funding independence.",
      "comparabilityGroup": "terminal-bench-science-0-1-harness",
      "mayInfer": [
        "The tests assess whether particular systems complete the specified executable workflows."
      ],
      "limitations": [
        "Success establishes new scientific discoveries or real-world experimental validity.",
        "Results from different task releases and agent scaffolds are directly comparable."
      ],
      "nextVerification": "Capture task IDs, release commit, agent, tools, budget, seeds, and artifact tests for each imported observation.",
      "sources": [
        {
          "id": "terminal-bench-science-0-1-s1",
          "title": "Release and methodology",
          "url": "https://www.tbench.ai/news/terminal-bench-science-0-1",
          "kind": "primary_project",
          "basis": "Scope, protocol, release date, and collaboration",
          "supports": [
            "Scope, protocol, release date, and collaboration"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: independent-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "terminal-bench-science-0-1-s2",
          "title": "Leaderboard",
          "url": "https://www.terminal-bench-science.ai/",
          "kind": "primary_project",
          "basis": "Public system-level results",
          "supports": [
            "Public system-level results"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: independent-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "terminal-bench-science-0-1-s3",
          "title": "Repository",
          "url": "https://github.com/harbor-framework/terminal-bench-science",
          "kind": "primary_project",
          "basis": "Executable tasks and versions",
          "supports": [
            "Executable tasks and versions"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: independent-ai-benchmarks-2026-09-30.md"
        }
      ]
    },
    {
      "id": "matharena",
      "name": "MathArena",
      "categories": [
        "community"
      ],
      "status": "live",
      "setting": "dataset",
      "sourceSetting": "Static dataset",
      "evidenceType": "Benchmark metric definitions",
      "summary": "A collection of inspectable mathematical evaluation suites, including competitions, visual math, proofs, and research-math tracks.",
      "entryType": "leaderboard",
      "tags": [
        "mathematics",
        "proofs",
        "formal-verification"
      ],
      "maintainer": "MathArena / ETH-associated researchers",
      "relationship": "academic",
      "sourceBasis": "Recovered research found official September 23–24, 2026 result announcements and raw-response/data links.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "Individual suites use different answer and proof-verification requirements; preserve suite, month, grader, runs, reasoning, and formal tools.",
      "score": null,
      "metrics": [
        {
          "name": "Per-problem score",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Use the individual suite definition; site describes four runs per problem.",
          "as_of": null,
          "source_ids": [
            "matharena-s1",
            "matharena-s2"
          ]
        },
        {
          "name": "Evaluation cost",
          "value": null,
          "unit": null,
          "direction": "lower_is_better",
          "subject": null,
          "protocol": "Per-problem or suite cost with currency, provider, sampling, and tool budget recorded.",
          "as_of": null,
          "source_ids": [
            "matharena-s1"
          ]
        }
      ],
      "resultNote": "No scores copied. Overall expected performance includes IRT-estimated missing results and is intentionally excluded.",
      "comparabilityGroup": null,
      "mayInfer": [
        "Individual suites provide inspectable evidence for specific mathematical tasks."
      ],
      "limitations": [
        "Estimated missing scores are directly observed results.",
        "Final-answer correctness is equivalent to proof validity."
      ],
      "nextVerification": "Choose a concrete suite and extract exact problem set, grader, model settings, runs, raw outputs, and cost.",
      "sources": [
        {
          "id": "matharena-s1",
          "title": "Platform, methodology, and updates",
          "url": "https://matharena.ai/",
          "kind": "primary_project",
          "basis": "Suite scope, results activity, scoring, and artifacts",
          "supports": [
            "Suite scope, results activity, scoring, and artifacts"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: independent-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "matharena-s2",
          "title": "Author paper",
          "url": "https://arxiv.org/abs/2605.00674",
          "kind": "primary_paper",
          "basis": "Evaluation methodology",
          "supports": [
            "Evaluation methodology"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: independent-ai-benchmarks-2026-09-30.md"
        }
      ]
    },
    {
      "id": "eq-bench-creative-writing-v3",
      "name": "EQ-Bench Creative Writing v3",
      "categories": [
        "community"
      ],
      "status": "live",
      "setting": "dataset",
      "sourceSetting": "Static dataset",
      "evidenceType": "Benchmark metric definitions",
      "summary": "Creative-writing evaluation using challenging prompts, rubric grading, pairwise ratings, and separate repetition diagnostics.",
      "entryType": "benchmark",
      "tags": [
        "writing",
        "style",
        "model-judged"
      ],
      "maintainer": "Samuel Paech / EQ-Bench",
      "relationship": "community",
      "sourceBasis": "Recovered research found a live v3 site, a March 1, 2026 pairwise-judge change, and September website activity; individual row freshness was not established.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "Thirty-two English writing prompts, three runs; Creative Writing Longform is a separate benchmark.",
      "score": null,
      "metrics": [
        {
          "name": "Rubric score",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Creative Writing v3; preserve rubric judge and generation settings.",
          "as_of": null,
          "source_ids": [
            "eq-bench-creative-writing-v3-s1",
            "eq-bench-creative-writing-v3-s2"
          ]
        },
        {
          "name": "Pairwise rating",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Anchored Glicko/Elo-style ratings; preserve judge and comparison pool.",
          "as_of": null,
          "source_ids": [
            "eq-bench-creative-writing-v3-s1",
            "eq-bench-creative-writing-v3-s2"
          ]
        }
      ],
      "resultNote": "No numerical rankings copied; rubric and pairwise metrics must remain distinct.",
      "comparabilityGroup": "eqbench-creative-writing-v3-judge",
      "mayInfer": [
        "The benchmark measures judged quality on the specified English creative-writing prompts."
      ],
      "limitations": [
        "Model-judge preference is objective correctness or a universal roleplay capability score.",
        "Relative ratings remain fixed when judges or comparison pools change."
      ],
      "nextVerification": "Capture a dated row with generation settings, exact judges, sample outputs, rating uncertainty, and comparison-pool version.",
      "sources": [
        {
          "id": "eq-bench-creative-writing-v3-s1",
          "title": "Leaderboard",
          "url": "https://eqbench.com/creative_writing.html",
          "kind": "primary_project",
          "basis": "Public v3 results",
          "supports": [
            "Public v3 results"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: independent-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "eq-bench-creative-writing-v3-s2",
          "title": "Methodology",
          "url": "https://eqbench.com/about.html#creative-writing-v3",
          "kind": "primary_project",
          "basis": "Prompts, judges, ratings, and limitations",
          "supports": [
            "Prompts, judges, ratings, and limitations"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: independent-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "eq-bench-creative-writing-v3-s3",
          "title": "Official project activity",
          "url": "https://github.com/EQ-bench",
          "kind": "primary_project",
          "basis": "Maintenance activity",
          "supports": [
            "Maintenance activity"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: independent-ai-benchmarks-2026-09-30.md"
        }
      ]
    },
    {
      "id": "mast",
      "name": "MAST",
      "categories": [
        "medical"
      ],
      "status": "live",
      "setting": "mixed",
      "sourceSetting": "Mixed",
      "evidenceType": "Retrospective clinical evidence",
      "summary": "Medical evaluation suite spanning retrospective reasoning, safety, imaging, and simulated agentic tasks; technical board is explicitly a preview.",
      "entryType": "benchmark",
      "tags": [
        "clinical-reasoning",
        "safety",
        "imaging",
        "medical-agents",
        "preview"
      ],
      "maintainer": "ARISE AI Research Network",
      "relationship": "academic",
      "sourceBasis": "MAST v1.0 launched July 27, 2026; overview updated August 15; recovered research found preview results and submission infrastructure.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "Retain diagnosis, management, safety, radiology, images, and agentic components separately. Product endpoints and bare models are different evaluated units.",
      "score": null,
      "metrics": [
        {
          "name": "Component-specific score",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Component/release-specific deterministic or multi-LLM grading; retain uncertainty and endpoint settings.",
          "as_of": null,
          "source_ids": [
            "mast-s1",
            "mast-s2",
            "mast-s3"
          ]
        }
      ],
      "resultNote": "No composite or model scores copied. Agentic completion is excluded from the current General and Clinical composites; preview scores can change.",
      "comparabilityGroup": null,
      "mayInfer": [
        "Components probe defined medical capabilities under standardized prompts and scoring."
      ],
      "limitations": [
        "A composite percentage is a probability of safe care.",
        "MAST and its MedAgentBench/ReXrank constituents are independent confirmations that may be double-counted."
      ],
      "nextVerification": "Capture validated component rows, release, endpoint/harness, tools, missing values, uncertainty, and overlap before comparing systems.",
      "sources": [
        {
          "id": "mast-s1",
          "title": "Project",
          "url": "https://www.arise-ai.org/mast",
          "kind": "primary_project",
          "basis": "Ownership, preview status, and maintenance",
          "supports": [
            "Ownership, preview status, and maintenance"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: medical-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "mast-s2",
          "title": "Component definitions",
          "url": "https://www.arise-ai.org/mast/benchmarks",
          "kind": "primary_project",
          "basis": "Evidence classes and scope",
          "supports": [
            "Evidence classes and scope"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: medical-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "mast-s3",
          "title": "Methodology",
          "url": "https://www.arise-ai.org/mast/methodology",
          "kind": "primary_project",
          "basis": "Scoring, composite exclusions, uncertainty, and limitations",
          "supports": [
            "Scoring, composite exclusions, uncertainty, and limitations"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: medical-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "mast-s4",
          "title": "Technical preview",
          "url": "https://www.arise-ai.org/mast/technical",
          "kind": "primary_project",
          "basis": "Preview results status",
          "supports": [
            "Preview results status"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: medical-ai-benchmarks-2026-09-30.md"
        }
      ]
    },
    {
      "id": "medhelm",
      "name": "MedHELM",
      "categories": [
        "medical"
      ],
      "status": "live",
      "setting": "dataset",
      "sourceSetting": "Static dataset",
      "evidenceType": "Retrospective clinical evidence",
      "summary": "Clinical-workflow evaluation covering decision support, documentation, patient communication, research assistance, and administration.",
      "entryType": "benchmark",
      "tags": [
        "clinical-workflows",
        "retrospective",
        "model-judged"
      ],
      "maintainer": "MedHELM community / Stanford origins / Pacific AI stewardship",
      "relationship": "mixed",
      "sourceBasis": "Current project in recovered research advertised v5.0.0, updated May 14, 2026; older HELM releases used different benchmark counts.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "Retrospective task-specific evaluations; the taxonomy count is not a count of independent datasets. Clinician validation and LLM-jury scoring are not prospective care.",
      "score": null,
      "metrics": [
        {
          "name": "Task-specific performance",
          "value": null,
          "unit": null,
          "direction": "context_dependent",
          "subject": null,
          "protocol": "Retain dataset, release, metric, and deterministic versus jury grading.",
          "as_of": null,
          "source_ids": [
            "medhelm-s1",
            "medhelm-s2"
          ]
        },
        {
          "name": "Mean win rate",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Relative to the compared model set in that release, not clinical success probability.",
          "as_of": null,
          "source_ids": [
            "medhelm-s1"
          ]
        }
      ],
      "resultNote": "No model scores copied. Public/gated datasets and release-count differences prevent casual pooling.",
      "comparabilityGroup": "medhelm-release-task-jury",
      "mayInfer": [
        "The suite offers broader clinical-workflow coverage than medical multiple-choice tests."
      ],
      "limitations": [
        "Task/rubric agreement proves patient benefit or safety.",
        "Mean win rates against different comparison pools are directly comparable."
      ],
      "nextVerification": "Pin release, dataset availability, jury versions, model pool, reasoning budget, and component results.",
      "sources": [
        {
          "id": "medhelm-s1",
          "title": "Current project",
          "url": "https://medhelm.org/",
          "kind": "primary_project",
          "basis": "Release, stewardship, task coverage, and results",
          "supports": [
            "Release, stewardship, task coverage, and results"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: medical-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "medhelm-s2",
          "title": "Peer-reviewed paper",
          "url": "https://doi.org/10.1038/s41591-025-04151-2",
          "kind": "primary_paper",
          "basis": "Taxonomy and clinical-workflow methodology",
          "supports": [
            "Taxonomy and clinical-workflow methodology"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: medical-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "medhelm-s3",
          "title": "Original evaluation description",
          "url": "https://hai.stanford.edu/news/holistic-evaluation-of-large-language-models-for-medical-applications?sf217122853=1",
          "kind": "primary_project",
          "basis": "Scoring and clinician role",
          "supports": [
            "Scoring and clinician role"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: medical-ai-benchmarks-2026-09-30.md"
        }
      ]
    },
    {
      "id": "medagentbench",
      "name": "MedAgentBench family",
      "categories": [
        "medical"
      ],
      "status": "live",
      "setting": "simulation",
      "sourceSetting": "Simulation",
      "evidenceType": "Benchmark metric definitions",
      "summary": "Clinician-written tasks in a virtual FHIR EHR, with several non-equivalent benchmark, harness, and verifier versions.",
      "entryType": "benchmark",
      "tags": [
        "ehr",
        "tool-use",
        "interactive",
        "verifier-audit"
      ],
      "maintainer": "Stanford-led MedAgentBench researchers and v2 contributors",
      "relationship": "academic",
      "sourceBasis": "Original 2025 work is extended by a separate 2026 v2 project and MAST track; a July 2026 verifier audit proposes another revision.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "Original benchmark has 300 tasks and an eight-round limit; paper revision v2 is not automatically the separately named MedAgentBench v2 release.",
      "score": null,
      "metrics": [
        {
          "name": "Pass@1 task success",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Deterministic EHR/action checks; retain verifier commit, task split, interaction budget, and memory condition.",
          "as_of": null,
          "source_ids": [
            "medagentbench-s1",
            "medagentbench-s2",
            "medagentbench-s3"
          ]
        }
      ],
      "resultNote": "No headline scores copied. Prior-failure memory and an author-reported verifier critique require explicit audit labels.",
      "comparabilityGroup": "medagentbench-version-verifier-split",
      "mayInfer": [
        "It measures completion of specified virtual EHR tasks under a particular action surface and verifier."
      ],
      "limitations": [
        "Virtual EHR task success establishes live clinical readiness.",
        "Repeated-task memory performance is a clean zero-shot base-model comparison.",
        "The verifier-audit preprint is an independently reproduced blanket refutation of every implementation."
      ],
      "nextVerification": "Verify the exact verifier commit with a no-op baseline; separate original/new tasks and with/without-memory conditions.",
      "sources": [
        {
          "id": "medagentbench-s1",
          "title": "Original paper",
          "url": "https://arxiv.org/abs/2501.14654",
          "kind": "primary_paper",
          "basis": "Original virtual environment and task protocol",
          "supports": [
            "Original virtual environment and task protocol"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: medical-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "medagentbench-s2",
          "title": "Original code",
          "url": "https://github.com/stanfordmlgroup/MedAgentBench",
          "kind": "primary_project",
          "basis": "Task and verifier implementation",
          "supports": [
            "Task and verifier implementation"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: medical-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "medagentbench-s3",
          "title": "Separate v2 code",
          "url": "https://github.com/ericoericochen/medagentbenchv2",
          "kind": "primary_project",
          "basis": "v2 harness and memory distinctions",
          "supports": [
            "v2 harness and memory distinctions"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: medical-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "medagentbench-s4",
          "title": "Verifier audit preprint",
          "url": "https://arxiv.org/abs/2607.01470",
          "kind": "primary_paper",
          "basis": "Author-reported verifier warning",
          "supports": [
            "Author-reported verifier warning"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: medical-ai-benchmarks-2026-09-30.md"
        }
      ]
    },
    {
      "id": "masai-trial",
      "name": "MASAI mammography trial",
      "categories": [
        "medical"
      ],
      "status": "historical",
      "setting": "real-trial",
      "sourceSetting": "Real world",
      "evidenceType": "Prospective clinical trial",
      "summary": "Randomized Swedish screening trial evaluating radiologists using specialized mammography AI in a defined triage and reading workflow.",
      "entryType": "clinical_study",
      "tags": [
        "prospective",
        "randomized",
        "mammography",
        "human-ai-workflow"
      ],
      "maintainer": "Lund University-led MASAI investigators",
      "relationship": "academic",
      "sourceBasis": "Completed randomized trial with final interval-cancer report in January 2026; it is a fixed cohort, not a rolling leaderboard.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "NCT04838756; 105,934 women randomized in 2021–2022. AI-supported single/double reading was compared with standard double reading.",
      "score": null,
      "metrics": [
        {
          "name": "Interval-cancer rate",
          "value": null,
          "unit": "cases per 1,000",
          "direction": "lower_is_better",
          "subject": null,
          "protocol": "Use trial cohort, follow-up, exclusions, comparator, and prespecified noninferiority margin.",
          "as_of": null,
          "source_ids": [
            "masai-trial-s1"
          ]
        },
        {
          "name": "Sensitivity",
          "value": null,
          "unit": "%",
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Trial-specific screening workflow and adjudication.",
          "as_of": null,
          "source_ids": [
            "masai-trial-s1"
          ]
        },
        {
          "name": "Specificity",
          "value": null,
          "unit": "%",
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Trial-specific screening workflow and adjudication.",
          "as_of": null,
          "source_ids": [
            "masai-trial-s1"
          ]
        }
      ],
      "resultNote": "Numbers not ingested. The reported interval-cancer finding supports noninferiority, not statistically established superiority.",
      "comparabilityGroup": null,
      "mayInfer": [
        "The study provides prospective evidence for the particular human–AI screening intervention and population."
      ],
      "limitations": [
        "It validates autonomous radiology or unrelated general models.",
        "A nonsignificant relative reduction establishes superiority."
      ],
      "nextVerification": "Extract exact device build, protocol, outcome denominators, follow-up, intervals, and noninferiority analysis; keep clinical-study display separate.",
      "sources": [
        {
          "id": "masai-trial-s1",
          "title": "Primary publication record and abstract",
          "url": "https://lup.lub.lu.se/search/publication/7851a699-d9c4-4263-93dc-b29779d5b8d4",
          "kind": "primary_paper",
          "basis": "Trial design, endpoints, final analysis, and noninferiority interpretation",
          "supports": [
            "Trial design, endpoints, final analysis, and noninferiority interpretation"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: medical-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "masai-trial-s2",
          "title": "Investigator summary",
          "url": "https://www.lunduniversity.lu.se/article/ai-support-breast-cancer-screening-fewer-missed-cancer-cases",
          "kind": "primary_project",
          "basis": "Clinical workflow and investigator interpretation",
          "supports": [
            "Clinical workflow and investigator interpretation"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: medical-ai-benchmarks-2026-09-30.md"
        }
      ]
    },
    {
      "id": "kenya-ai-consult-trial",
      "name": "Kenya AI Consult trial",
      "categories": [
        "medical"
      ],
      "status": "historical",
      "setting": "real-trial",
      "sourceSetting": "Real world",
      "evidenceType": "Prospective clinical trial",
      "summary": "Pragmatic cluster-randomized evaluation of AI Consult integrated into an EMR, with clinical officers retaining treatment decisions.",
      "entryType": "clinical_study",
      "tags": [
        "prospective",
        "cluster-randomized",
        "treatment",
        "human-ai-workflow"
      ],
      "maintainer": "Agweyu et al. / Penda Health investigators",
      "relationship": "mixed",
      "sourceBasis": "Fixed April–July 2025 study published June 26, 2026.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "Sixteen facilities, 103 clinical officers, and 9,691 enrolled patients; AI Consult 2.0 used GPT-4o with study-specific settings.",
      "score": null,
      "metrics": [
        {
          "name": "Treatment failure within 14 days",
          "value": null,
          "unit": null,
          "direction": "lower_is_better",
          "subject": null,
          "protocol": "Expert-adjudicated primary endpoint in the randomized intervention versus control study.",
          "as_of": null,
          "source_ids": [
            "kenya-ai-consult-trial-s1"
          ]
        }
      ],
      "resultNote": "No numeric effect ingested. Reported primary treatment-failure improvement was not statistically significant; documentation improved. No serious adverse event was attributed to the intervention.",
      "comparabilityGroup": null,
      "mayInfer": [
        "It tests a specific clinician-plus-AI intervention in the studied care network over short follow-up."
      ],
      "limitations": [
        "The trial proves there was no possible harm.",
        "Documentation improvements imply improved primary clinical outcomes.",
        "It ranks general LLMs or validates autonomous treatment."
      ],
      "nextVerification": "Extract arm denominators, effect estimate, uncertainty, analysis set, and exact deployment configuration before showing quantitative outcomes.",
      "sources": [
        {
          "id": "kenya-ai-consult-trial-s1",
          "title": "Primary paper",
          "url": "https://www.nature.com/articles/s41591-026-04503-6",
          "kind": "primary_paper",
          "basis": "Design, system settings, primary outcome, documentation, and limitations",
          "supports": [
            "Design, system settings, primary outcome, documentation, and limitations"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: medical-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "kenya-ai-consult-trial-s2",
          "title": "Protocol and prompts",
          "url": "https://zenodo.org/records/15788148",
          "kind": "primary_data",
          "basis": "Reproducibility material",
          "supports": [
            "Reproducibility material"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: medical-ai-benchmarks-2026-09-30.md"
        }
      ]
    },
    {
      "id": "robochallenge-table30",
      "name": "RoboChallenge Table30 / V2",
      "categories": [
        "physical"
      ],
      "status": "live",
      "setting": "real-trial",
      "sourceSetting": "Real world",
      "evidenceType": "Controlled physical trial",
      "summary": "Centralized real-hardware tabletop manipulation evaluation with success and partial-progress tracks.",
      "entryType": "benchmark",
      "tags": [
        "robotics",
        "manipulation",
        "real-hardware",
        "remote-inference"
      ],
      "maintainer": "Dexmal / Hugging Face-origin RoboChallenge",
      "relationship": "mixed",
      "sourceBasis": "Recovered research directly observed Table30 V2 and a separate Specialist board on September 30, 2026; row dates were not shown.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "Original Table30: 30 tasks, ten real rollouts per task, human resets, multiple robot platforms, and maintenance-related failure handling.",
      "score": null,
      "metrics": [
        {
          "name": "Task success rate",
          "value": null,
          "unit": "%",
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Track-specific complete successes; preserve generalist versus Specialist, platform, and submission protocol.",
          "as_of": null,
          "source_ids": [
            "robochallenge-table30-s1",
            "robochallenge-table30-s2",
            "robochallenge-table30-s3"
          ]
        },
        {
          "name": "Partial-progress score",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Track-specific milestone credit; distinct from full success.",
          "as_of": null,
          "source_ids": [
            "robochallenge-table30-s1",
            "robochallenge-table30-s2",
            "robochallenge-table30-s3"
          ]
        }
      ],
      "resultNote": "No score rows copied. Original report flags model-identity and human-in-loop verification limits in user-side remote inference.",
      "comparabilityGroup": "robochallenge-track-platform-protocol",
      "mayInfer": [
        "Reported trials establish performance of a submitted control system on the specified physical tasks and setup."
      ],
      "limitations": [
        "Table30 V2 and Specialist scores form one comparable ranking.",
        "A submitted model label proves an audited immutable checkpoint or zero human assistance."
      ],
      "nextVerification": "Confirm current submission-verification rules, track, robot, checkpoint/harness, trial exclusions, and result date.",
      "sources": [
        {
          "id": "robochallenge-table30-s1",
          "title": "Technical report",
          "url": "https://arxiv.org/html/2510.17950v1",
          "kind": "primary_paper",
          "basis": "Original physical protocol and remote-inference limitations",
          "supports": [
            "Original physical protocol and remote-inference limitations"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: physical-world-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "robochallenge-table30-s2",
          "title": "Annual protocol report",
          "url": "https://robochallenge.ai/2025%20RoboChallenge%20Annual%20Report.pdf",
          "kind": "primary_paper",
          "basis": "Protocol details",
          "supports": [
            "Protocol details"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: physical-world-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "robochallenge-table30-s3",
          "title": "Live boards",
          "url": "https://robochallenge.ai/home",
          "kind": "primary_project",
          "basis": "Separate current tracks",
          "supports": [
            "Separate current tracks"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: physical-world-ai-benchmarks-2026-09-30.md"
        }
      ]
    },
    {
      "id": "stationerybench",
      "name": "Robocurve StationeryBench",
      "categories": [
        "physical"
      ],
      "status": "historical",
      "setting": "real-trial",
      "sourceSetting": "Real world",
      "evidenceType": "Controlled physical trial",
      "summary": "Published real-robot comparison of a general LLM-agent harness and a zero-shot VLA checkpoint on five bimanual desk tasks.",
      "entryType": "field_evaluation",
      "tags": [
        "robotics",
        "bimanual",
        "real-hardware",
        "llm-agent"
      ],
      "maintainer": "Robocurve",
      "relationship": "unknown",
      "sourceBasis": "Fixed September 10, 2026 report using Inspect Robots 0.58.0; not a broad ongoing leaderboard.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "Two I2RT YAM arms; twenty trials per model per task, fixed setups, human resets, non-blinded operator grading, and different control interfaces/budgets.",
      "score": null,
      "metrics": [
        {
          "name": "Complete task success",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Use all report trials and report-specific horizons; keep model-plus-interface budget visible.",
          "as_of": null,
          "source_ids": [
            "stationerybench-s1"
          ]
        },
        {
          "name": "Milestone progress",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Report milestone grading differs from released package binary verdicts.",
          "as_of": null,
          "source_ids": [
            "stationerybench-s1",
            "stationerybench-s2"
          ]
        }
      ],
      "resultNote": "No model scores copied. Report and released package differ in instructions, grading, and time horizon; poor zero-shot behavior is distribution-specific.",
      "comparabilityGroup": null,
      "mayInfer": [
        "The trials compare the documented full systems under a particular real-robot setup."
      ],
      "limitations": [
        "A small fixed-setup comparison establishes broad robot competence or model-wide inability.",
        "Package-default reruns use the same protocol as the published report.",
        "Undisclosed intervention rates equal zero."
      ],
      "nextVerification": "Verify evaluator organization type; then pin report/package version, checkpoint, horizon, speed cap, trial videos, and intervention accounting.",
      "sources": [
        {
          "id": "stationerybench-s1",
          "title": "Report and complete trials",
          "url": "https://openai.robocurve.org/stationerybench/",
          "kind": "primary_project",
          "basis": "Trial design, results, interfaces, and grading",
          "supports": [
            "Trial design, results, interfaces, and grading"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: physical-world-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "stationerybench-s2",
          "title": "Protocol/package differences",
          "url": "https://github.com/robocurve/stationerybench",
          "kind": "primary_project",
          "basis": "Released implementation and differences",
          "supports": [
            "Released implementation and differences"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: physical-world-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "stationerybench-s3",
          "title": "Evaluator identity",
          "url": "https://robocurve.org/",
          "kind": "primary_project",
          "basis": "Evaluator identity and independence statement",
          "supports": [
            "Evaluator identity and independence statement"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: physical-world-ai-benchmarks-2026-09-30.md"
        }
      ]
    },
    {
      "id": "barn-challenge-2026-finals",
      "name": "BARN Challenge 2026 physical finals",
      "categories": [
        "physical"
      ],
      "status": "historical",
      "setting": "real-trial",
      "sourceSetting": "Real world",
      "evidenceType": "Controlled physical trial",
      "summary": "Physical obstacle-course navigation competition; this record covers the real-hardware finals, not the separate simulation qualifier.",
      "entryType": "challenge",
      "tags": [
        "robotics",
        "navigation",
        "real-hardware",
        "competition"
      ],
      "maintainer": "BARN Challenge organizers",
      "relationship": "academic",
      "sourceBasis": "Official physical finals were held June 3–4, 2026 with published results and team-code links.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "Clearpath Jackal with 2-D LiDAR; three obstacle courses, five timed attempts per course within thirty minutes, best three counted.",
      "score": null,
      "metrics": [
        {
          "name": "Scored collision-free successes",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Best three of five attempts per course; not an unselected field reliability rate.",
          "as_of": null,
          "source_ids": [
            "barn-challenge-2026-finals-s1"
          ]
        },
        {
          "name": "Traversal time",
          "value": null,
          "unit": null,
          "direction": "lower_is_better",
          "subject": null,
          "protocol": "Tie-breaker under official finals rules, including 2026 dynamic-obstacle bonuses.",
          "as_of": null,
          "source_ids": [
            "barn-challenge-2026-finals-s1"
          ]
        }
      ],
      "resultNote": "No team scores copied. Simulation normalized scores are excluded from this physical-finals entry.",
      "comparabilityGroup": "barn-2026-physical-finals",
      "mayInfer": [
        "The finals test complete navigation stacks on standardized tight physical courses."
      ],
      "limitations": [
        "Nine selected scored attempts estimate unselected field reliability.",
        "Results establish semantic household navigation or general safety.",
        "Every competing system is an LLM or foundation model."
      ],
      "nextVerification": "Capture official selected attempts plus all attempts, exclusions, hardware/compute, and any disclosed safety stops.",
      "sources": [
        {
          "id": "barn-challenge-2026-finals-s1",
          "title": "Official 2026 rules, schedule, and boards",
          "url": "https://people.cs.gmu.edu/~xiao/Research/BARN_Challenge/BARN_Challenge26.html",
          "kind": "primary_project",
          "basis": "Hardware, selection protocol, metric, dates, and results",
          "supports": [
            "Hardware, selection protocol, metric, dates, and results"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: physical-world-ai-benchmarks-2026-09-30.md"
        }
      ]
    },
    {
      "id": "behavior-challenge-2026",
      "name": "BEHAVIOR Challenge 2026",
      "categories": [
        "physical"
      ],
      "status": "ongoing",
      "setting": "simulation",
      "sourceSetting": "Simulation",
      "evidenceType": "Benchmark metric definitions",
      "summary": "Long-horizon household manipulation challenge in OmniGibson simulation, using a defined subset of BEHAVIOR activities.",
      "entryType": "challenge",
      "tags": [
        "robotics",
        "household",
        "long-horizon",
        "simulation"
      ],
      "maintainer": "Stanford BEHAVIOR collaboration",
      "relationship": "academic",
      "sourceBasis": "Launched July 2, 2026; submissions due October 16 and winners scheduled November 4. Prior research found self-reported results but an empty verified-results file.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "One hundred tasks across seven scenes; official protocol v3.9.3, ten public instances per task, one rollout each, embodiment and observation restrictions.",
      "score": null,
      "metrics": [
        {
          "name": "Terminal goal-predicate satisfaction Q",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "Partial-credit BDDL goal satisfaction; not full-task completion rate.",
          "as_of": null,
          "source_ids": [
            "behavior-challenge-2026-s1",
            "behavior-challenge-2026-s2"
          ]
        },
        {
          "name": "Time/base/hand-motion efficiency",
          "value": null,
          "unit": null,
          "direction": "context_dependent",
          "subject": null,
          "protocol": "Separate efficiency measures under specified embodiment and timeout.",
          "as_of": null,
          "source_ids": [
            "behavior-challenge-2026-s2"
          ]
        }
      ],
      "resultNote": "No scores copied. Archived 2025 rows and self-reported 2026 rows must not be labeled verified final 2026 results.",
      "comparabilityGroup": "behavior-2026-track-embodiment-version",
      "mayInfer": [
        "The challenge evaluates simulated agents on specified long-horizon household tasks."
      ],
      "limitations": [
        "Simulation scores establish physical-home reliability.",
        "Q is full-task success probability.",
        "A visible board row is necessarily a verified final 2026 result."
      ],
      "nextVerification": "Verify dated result files and final hidden-evaluation status; preserve year, verification label, embodiment, commit, and timeout.",
      "sources": [
        {
          "id": "behavior-challenge-2026-s1",
          "title": "2026 scope and dates",
          "url": "https://behavior.stanford.edu/challenge/index.html",
          "kind": "primary_project",
          "basis": "Scope, schedule, and challenge version",
          "supports": [
            "Scope, schedule, and challenge version"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: physical-world-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "behavior-challenge-2026-s2",
          "title": "Rules and metrics",
          "url": "https://behavior.stanford.edu/challenge/evaluation.html",
          "kind": "primary_project",
          "basis": "Protocol, embodiment, and Q definition",
          "supports": [
            "Protocol, embodiment, and Q definition"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: physical-world-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "behavior-challenge-2026-s3",
          "title": "Leaderboard",
          "url": "https://huggingface.co/spaces/behavior-1k/2026-challenge-leaderboard",
          "kind": "primary_project",
          "basis": "Public board",
          "supports": [
            "Public board"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: physical-world-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "behavior-challenge-2026-s4",
          "title": "Public result files",
          "url": "https://huggingface.co/spaces/behavior-1k/2026-challenge-leaderboard/tree/main/data",
          "kind": "primary_data",
          "basis": "Self-reported versus verified status",
          "supports": [
            "Self-reported versus verified status"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: physical-world-ai-benchmarks-2026-09-30.md"
        }
      ]
    },
    {
      "id": "bench2drive",
      "name": "Bench2Drive",
      "categories": [
        "physical"
      ],
      "status": "live",
      "setting": "simulation",
      "sourceSetting": "Simulation",
      "evidenceType": "Benchmark metric definitions",
      "summary": "Sensor-to-control closed-loop autonomous-driving evaluation in CARLA, with feedback as the agent acts.",
      "entryType": "benchmark",
      "tags": [
        "driving",
        "closed-loop",
        "simulation",
        "sensor-to-control"
      ],
      "maintainer": "Thinklab / Shanghai Jiao Tong University-led Bench2Drive",
      "relationship": "academic",
      "sourceBasis": "Recovered research observed v0.0.4 repository results on September 30, 2026; individual row dates were not supplied.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "CARLA 0.9.15; v0.0.4 uses 220 routes and 44 scenario types. All routes count; missing routes score zero and persistent failures must remain failures.",
      "score": null,
      "metrics": [
        {
          "name": "Driving Score",
          "value": null,
          "unit": null,
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "v0.0.4 official route/infraction scoring across all routes.",
          "as_of": null,
          "source_ids": [
            "bench2drive-s1",
            "bench2drive-s2"
          ]
        },
        {
          "name": "Route success rate",
          "value": null,
          "unit": "%",
          "direction": "higher_is_better",
          "subject": null,
          "protocol": "All 220 routes; retain sensor stack, controller, and failure-accounting policy.",
          "as_of": null,
          "source_ids": [
            "bench2drive-s1",
            "bench2drive-s2"
          ]
        }
      ],
      "resultNote": "No model/system scores copied. Repository comparisons are reported results, not independently rerun safety audits.",
      "comparabilityGroup": "bench2drive-v0-0-4-sensor-track",
      "mayInfer": [
        "It tests interactive simulated driving for a specified complete sensor/control system."
      ],
      "limitations": [
        "Short-route simulator competence proves on-road crash safety.",
        "Different benchmark versions, sensors, or route-retry rules are directly comparable."
      ],
      "nextVerification": "Pin benchmark and CARLA versions, all-route logs, sensor/privileged-input status, controller, and row date.",
      "sources": [
        {
          "id": "bench2drive-s1",
          "title": "Official repository and results",
          "url": "https://github.com/Thinklab-SJTU/Bench2Drive",
          "kind": "primary_project",
          "basis": "Current version, scenarios, metrics, and failure handling",
          "supports": [
            "Current version, scenarios, metrics, and failure handling"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: physical-world-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "bench2drive-s2",
          "title": "v0.0.4 definition",
          "url": "https://github.com/Thinklab-SJTU/Bench2Drive/blob/0.0.4/docs/v004_update.md",
          "kind": "primary_project",
          "basis": "Version-specific definition",
          "supports": [
            "Version-specific definition"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: physical-world-ai-benchmarks-2026-09-30.md"
        }
      ]
    },
    {
      "id": "waymo-onroad-safety",
      "name": "Waymo on-road safety evidence",
      "categories": [
        "physical"
      ],
      "status": "ongoing",
      "setting": "observation",
      "sourceSetting": "Real world",
      "evidenceType": "Observational real-world evidence",
      "summary": "Independent IIHS observational analysis plus separately labeled provider exposure/safety data for rider-only commercial operations.",
      "entryType": "field_evaluation",
      "tags": [
        "driving",
        "real-world",
        "observational",
        "system-level"
      ],
      "maintainer": "IIHS analysis; Waymo provider data",
      "relationship": "mixed",
      "sourceBasis": "Fixed IIHS report published July 23, 2026 analyzes 2021–2024; provider hub in earlier research covered exposure through June 2026 and remains an ongoing data source.",
      "verifiedAt": null,
      "snapshotAt": "2026-09-30",
      "verificationStatus": "catalog_supported",
      "verificationNote": "Supported by recovered source-rich research checked on 2026-09-30; source pages were not reopened in this assembly pass.",
      "scope": "Complete vehicle/autonomy/operations system within defined operating domains; no in-car safety driver does not establish no remote assistance.",
      "score": null,
      "metrics": [
        {
          "name": "Police-reportable crash involvement per mile",
          "value": null,
          "unit": null,
          "direction": "lower_is_better",
          "subject": null,
          "protocol": "IIHS harmonized reporting and available Waymo mileage; retain geography and exposure period.",
          "as_of": null,
          "source_ids": [
            "waymo-onroad-safety-s1"
          ]
        },
        {
          "name": "Injury and serious-injury crash rates",
          "value": null,
          "unit": null,
          "direction": "lower_is_better",
          "subject": null,
          "protocol": "Provider-authored analysis against adjusted human benchmarks; retain severity, denominators, geography, and uncertainty.",
          "as_of": null,
          "source_ids": [
            "waymo-onroad-safety-s2"
          ]
        }
      ],
      "resultNote": "No effect sizes copied. Independent and provider-authored analyses have different exposure windows and methods and must remain separately labeled.",
      "comparabilityGroup": null,
      "mayInfer": [
        "The sources provide exposure-adjusted observational evidence for the studied operating domains and complete system."
      ],
      "limitations": [
        "The study isolates a foundation model or immutable software/hardware version.",
        "Results establish safety on every road or weather condition, or for other autonomous systems.",
        "Crash rates, disengagements, and remote-assistance burden are interchangeable."
      ],
      "nextVerification": "Create separate dated observations for IIHS and Waymo, with geography, exposure, severity, comparator, uncertainty, and remote-assistance limitations.",
      "sources": [
        {
          "id": "waymo-onroad-safety-s1",
          "title": "Original IIHS analysis summary",
          "url": "https://www.iihs.org/news/detail/waymos-driverless-cars-crash-less-often-than-people",
          "kind": "primary_project",
          "basis": "Independent study period, comparison methods, and limitations",
          "supports": [
            "Independent study period, comparison methods, and limitations"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: physical-world-ai-benchmarks-2026-09-30.md"
        },
        {
          "id": "waymo-onroad-safety-s2",
          "title": "Waymo data and methodology",
          "url": "https://waymo.com/safety/impact/",
          "kind": "primary_data",
          "basis": "Provider-authored exposure, crash records, benchmarks, and uncertainty",
          "supports": [
            "Provider-authored exposure, crash records, benchmarks, and uncertainty"
          ],
          "publishedAt": null,
          "checkedAt": "2026-09-30",
          "access": "inherited_catalog",
          "provenance": "Recovered 2026-09-30 research catalog: physical-world-ai-benchmarks-2026-09-30.md"
        }
      ]
    }
  ]
};
