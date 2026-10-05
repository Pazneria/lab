const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const dir = "data/coverage-research-2026-10-05/";
const read = (name) =>
  JSON.parse(fs.readFileSync(path.join(root, name), "utf8"));
const additions = read(dir + "primary-source-additions.json");
const inventory = read(dir + "coverage-expansion-inventory.json");
const audits = read(dir + "per-card-audit.json");
const rune = read(dir + "runebench-primary-summary.json");
const runeLabels = read(dir + "runebench-configuration-labels.json");
const clone = (x) => JSON.parse(JSON.stringify(x));
const safe = (url) => {
  const u = new URL(url);
  assert.equal(u.protocol, "https:");
  assert.equal(u.username, "");
  assert.equal(u.password, "");
};
const plain = {
  "aa-briefcase-v1-1": [
    "Can an agent produce useful professional work?",
    "Agents work through realistic office scenarios and produce deliverables. Evaluators compare the finished work rather than checking a short factual answer.",
    "This tests whether a model can turn an open-ended request into a useful artifact. The rating is Elo within this evaluator’s comparison pool, so it cannot be read as a percentage of jobs completed.",
  ],
  "gdpval-aa-v2-1": [
    "Can an agent create professional deliverables?",
    "Agents tackle expert workplace tasks and their outputs receive pairwise comparisons. This view uses the Artificial Analysis v2.1 implementation.",
    "The task extends beyond answering questions to making work products. Elo depends on this board’s anchor and comparison pool; it is different from the original GDPval human win and tie rates.",
  ],
  "automationbench-aa": [
    "Can an agent finish office tasks while respecting rules?",
    "Agents use software tools across business domains. A task receives partial credit for completed objectives, but any guardrail violation makes its score zero.",
    "Doing useful work includes respecting constraints. These scores measure guardrail-adjusted objective completion, which differs from completing every part of a task.",
  ],
  "gdp-pdf": [
    "Can an AI turn a long document into accurate work?",
    "Models process long PDFs and produce answers or deliverables judged against detailed criteria. The All-pass metric requires every criterion to pass.",
    "Document work requires finding and using the right information. All-pass is stricter than an average fraction of criteria passed, and document preprocessing can affect the result.",
  ],
  "aa-lcr-v1-1": [
    "Can an AI reason across a long document?",
    "Models solve questions using inputs between roughly 10,000 and 100,000 tokens. This is the Artificial Analysis Long Context Reasoning v1.1 cohort, with no tools.",
    "Finding a phrase is easier than combining evidence scattered across a document. The score is pass@1 under this revision; it does not establish performance at every context length.",
  ],
  "aa-omniscience": [
    "Does an AI know when it does not know?",
    "Models answer questions across many topics. The knowledge reliability index balances answering correctly against giving unreliable answers.",
    "A confidently wrong answer can be costly. The index is not accuracy, and the underlying accuracy, hallucination and attempt rates describe different behavior.",
  ],
  ifbench: [
    "Can an AI follow precise instructions?",
    "Models answer prompts with combinations of constraints, and deterministic checks assess whether those constraints were followed.",
    "Fluent writing can still miss an explicit requirement. A higher pass@1 score means more prompts met the tested constraints, rather than proving every kind of instruction following.",
  ],
  "global-mmlu-lite": [
    "Can an AI answer questions in different languages?",
    "Models answer a multilingual collection of knowledge and reasoning questions. This view shows the Artificial Analysis average across its tested languages.",
    "An English score does not describe every language. The average can conceal weaker languages, and these selected model configurations are older than those on several other boards.",
  ],
  "apex-agents-aa": [
    "Can an agent complete a demanding professional task?",
    "Agents work through multi-step professional assignments using the Artificial Analysis implementation. A task counts as successful only when every rubric requirement passes.",
    "A useful deliverable needs more than a promising partial answer. This 452-task cohort differs from the creator’s full 480-task cohort and from average rubric credit.",
  ],
  "aa-analyst-agent": [
    "Can a data-analysis agent deliver a reliable answer?",
    "Agents tackle analysis tasks across multiple domains. Each task is attempted five times, and pass^5 requires success on all five attempts.",
    "Consistency matters when an analysis is used repeatedly. This is an all-five reliability measure, rather than best-of-five success or an average of attempts.",
  ],
  "swe-atlas-refactoring": [
    "Can a coding agent improve code without changing its behavior?",
    "Agents refactor real codebases under task-specific requirements. The source labels retain each native agent and its effort setting.",
    "Refactoring asks an agent to preserve behavior while changing structure. These native-agent results must remain separate from common-harness evaluations.",
  ],
  "swe-atlas-test-writing": [
    "Can a coding agent write tests that catch real problems?",
    "Agents add tests to existing projects and are assessed against task requirements. Source asterisks and agent names remain attached to each configuration.",
    "A passing test suite can still miss important failures. Read task resolve rate together with the evaluator’s rubric, mutation checks and fallback footnotes.",
  ],
  "swe-atlas-codebase-qna": [
    "Can an agent explain a large codebase accurately?",
    "Agents inspect repositories and answer questions that require understanding code. All-rubric task success is distinct from partial rubric credit.",
    "Good code explanations connect behavior across files. These source labels include native agent scaffolds and footnotes, which are part of the evaluated system.",
  ],
  "hil-bench": [
    "Can an agent ask for help when a task is blocked?",
    "Agents work on software and SQL tasks that require interaction with a human. This view uses the source’s combined Pass@3 outcome.",
    "Knowing when to clarify can matter as much as writing an answer. Task success and ASK-F1 measure different things, so they should not share a score label.",
  ],
  "mcp-atlas": [
    "Can an agent choose and use the right tools?",
    "Agents work through tasks with a large collection of MCP tools. The source reports pass rate, alongside more detailed claim-coverage measures.",
    "Having many tools creates a selection and coordination problem. These are selected source rows; the exact board split needs confirmation before a complete cohort is claimed.",
  ],
  "audio-multichallenge": [
    "Can an AI follow a conversation spoken aloud?",
    "Systems handle multi-turn audio inputs and challenging instructions. The source includes systems with different output modalities.",
    "Speech adds timing and memory demands to instruction following. Audio-output and text-output tracks remain different conditions, and the combined selection is not a matched-modality experiment.",
  ],
  multinrc: [
    "Can an AI reason in a language’s own cultural context?",
    "Systems answer tasks grounded in native linguistic and cultural reasoning. This differs from translating an English test into several languages.",
    "Literal translation can miss knowledge shared by speakers of a language. The reported overall score should be read alongside language and task breakdowns.",
  ],
  "frontierswe-v2": [
    "Can an agent finish a substantial software project?",
    "Systems tackle long-horizon engineering tasks with a maximum 20-hour budget per task. The source reports mean task score across five trials.",
    "Long projects require sustained progress and verification. Mean@5 is neither best-of-five nor binary success, and v1 results use a different task set.",
  ],
  voicecodebench: [
    "Can a speech system capture exact workplace details?",
    "Systems transcribe spoken instructions containing structured values such as identifiers and numbers. Task success checks whether the required information is captured.",
    "A small transcription mistake can change an identifier or action. Task success differs from Word Error Rate, while streaming and batch systems use different timing conventions.",
  ],
  "big-bench-audio": [
    "Can a speech model reason about what it hears?",
    "Speech systems answer reasoning questions delivered as audio. This view uses the component’s unrounded source values.",
    "Recognizing words and solving a question are different abilities. These scores are speech reasoning accuracy, separate from the overall Speech-to-Speech Index.",
  ],
  "full-duplex-bench": [
    "Can a speech system take turns naturally?",
    "Systems are tested on pauses, interruptions, backchannels and turn taking in the evaluator’s selected conversational-dynamics tasks.",
    "A conversation needs timely listening as well as answers. This component score describes conversational dynamics, not the accuracy of the model’s reasoning.",
  ],
  "tau-voice-aa": [
    "Can a spoken agent use tools to complete a task?",
    "Speech systems carry out agentic tasks through conversation and tools. Native speech systems and transcribe–reason–speak pipelines have different architectures.",
    "Speech adds communication demands to tool use. Keep the pipeline identity attached to every result rather than treating all systems as the same kind of model.",
  ],
  "aa-wer-v2": [
    "How accurately does a system transcribe speech?",
    "The non-streaming AA-WER v2 suite measures word errors across a weighted collection of speech datasets. Lower Word Error Rate is better.",
    "Accurate transcripts are a foundation for many speech tools. Dataset weighting, normalization and chunking affect this result; streaming measurements belong to a separate view.",
  ],
  "video-mme-v2": [
    "Can an AI understand what happens in a video?",
    "Models answer related questions about videos with subtitles and audio in the paper’s 1-frame-per-second setting. The group non-linear score rewards success across related questions.",
    "A model can answer one frame correctly while missing the sequence. This April 2026 paper selection is not a current frontier leaderboard or ordinary per-question accuracy.",
  ],
  "osworld-v2-offline": [
    "Can an agent operate a computer to get work done?",
    "Agents interact with desktop applications in the offline OSWorld 2.0 setting. This developer report uses partial reward for progress through a task.",
    "Computer work combines seeing, deciding and acting. Partial reward differs from completing a task, and these cross-system reported configurations are not a matched-compute experiment.",
  ],
  browsecomp: [
    "Can an agent find a difficult answer on the web?",
    "Agents search for answers to questions designed to require persistent research. This view preserves the selected developer-reported cohort.",
    "Research needs useful searches and evidence checking. Tool scaffolds and search budgets affect accuracy, so these results cannot be compared with no-tools factuality scores.",
  ],
  "charxiv-reasoning": [
    "Can an AI reason from a scientific chart?",
    "Models answer reasoning questions about charts from research papers. This view uses the no-tools rows from the named developer report.",
    "Reading a chart requires connecting its visual encoding with the question. Python-assisted results are a different setting and remain outside this cohort.",
  ],
};
function metric(
  id,
  label,
  unit,
  field,
  domain,
  direction = "higher_is_better",
) {
  return { id, label, unit, field, domain, direction };
}
function variant(
  id,
  label,
  rows,
  metrics,
  source,
  settings,
  limitations,
  extra = {},
) {
  safe(source);
  assert.ok(rows.length);
  return {
    id,
    label,
    rows,
    metrics,
    source_url: source,
    settings: settings || {},
    limitations: limitations || [],
    evaluation_date: null,
    ...extra,
  };
}
function build() {
  assert.equal(inventory.entries.length, 79);
  assert.equal(audits.cards.length, 46);
  assert.equal(Object.keys(rune).length, 87);
  assert.equal(
    Object.values(rune).reduce((n, v) => n + Object.keys(v).length, 0),
    1392,
  );
  assert.equal(
    Object.values(additions.cohorts).reduce((n, c) => n + c.rows.length, 0),
    319,
  );
  const cards = [],
    first = new Set(inventory.first_wave_ids);
  for (const entry of inventory.entries.filter((c) => first.has(c.id))) {
    assert.ok(entry.seed_rows.length && plain[entry.id]);
    safe(entry.source_url);
    const [question, tests, readText] = plain[entry.id];
    const category = entry.domains.includes("audio")
      ? "audio"
      : entry.domains.includes("video")
        ? "video"
        : entry.domains.includes("multilingual")
          ? "multilingual"
          : entry.domains.includes("professional_work") ||
              entry.domains.includes("agents")
            ? "agents"
            : entry.domains.includes("long_context")
              ? "context"
              : "standard";
    const historical = entry.freshness === "historical_scored_cohort";
    const methods = [
      metric(
        "score",
        entry.metric,
        entry.unit,
        "value",
        entry.cohort?.scale ||
          (entry.unit === "percent"
            ? [0, 100]
            : [
                0,
                Math.ceil(
                  Math.max(...entry.seed_rows.map((r) => r.value)) / 100,
                ) * 100,
              ]),
        entry.direction,
      ),
    ];
    const rows = entry.seed_rows.map((r, i) => ({
      label: r.model_variant,
      result_id: entry.id + "-seed-" + i,
      source_url: entry.source_url,
      raw: clone(r),
      ...clone(r),
    }));
    const costKey =
      entry.id === "voicecodebench" ? "stt_cost_usd_per_task" : null;
    if (costKey)
      methods.push({
        ...metric(
          "cost",
          "Task success vs speech-to-text cost",
          "percent",
          "value",
          [0, 100],
        ),
        kind: "scatter",
        y_label: "Task success",
        x_field: costKey,
        x_label: "Reported speech-to-text cost per task",
        x_unit: "USD",
        x_basis:
          "Speech-to-text cost only; excludes downstream model and infrastructure; missing Cartesia cost is excluded.",
      });
    const sentences = readText.match(/[^.!?]+[.!?]+/g) || [readText];
    cards.push({
      id: entry.id,
      name: entry.name,
      category,
      question,
      tests,
      matters: sentences[0].trim(),
      read:
        "This is a selected source cohort, not the complete board. " +
        sentences.slice(1).join("").trim() +
        " Exact settings and source footnotes remain attached to each row.",
      notice:
        "Selected source rows, not complete model coverage. " +
        entry.caveats.join(". "),
      historical,
      source_input: dir + "coverage-expansion-inventory.json",
      source_checked_at: entry.checked_at,
      publication_at: entry.cohort?.published_date || null,
      publication_label: entry.cohort?.published_month || null,
      variants: [
        variant(
          "seed",
          "Selected published rows",
          rows,
          methods,
          entry.source_url,
          entry.cohort,
          entry.caveats,
          {
            coverage: entry.row_scope,
            complete: false,
            source_role: entry.source_role,
          },
        ),
      ],
    });
  }
  const reasons = {
    balrog:
      "Interactive games expose planning problems that a short question-and-answer test can miss. Progress depends on the environment as well as the agent.",
    "eq-bench-creative-writing-v3":
      "Creative writing involves voice, coherence and preference, which require different evaluation methods from factual accuracy.",
    "terminal-bench-4":
      "A useful terminal agent must inspect its environment, make changes and check that the requested job is complete.",
    "terminal-bench-science-native-agents":
      "Scientific work often requires using software and files over many steps, rather than answering an isolated knowledge question.",
    "webcraftbench-v3":
      "A website needs to work as well as look appealing. Separate measures make it easier to see which part of a build succeeded.",
    bench2drive:
      "Closed-loop driving reveals how a system responds after its own actions change the scene.",
    medhelm:
      "Medical-language performance spans many tasks. A broad collection can reveal differences that a single examination misses.",
    mast: "A fluent medical answer can still be harmful. This component focuses on that risk within its specified test set.",
    stationerybench:
      "Physical manipulation requires sensing and acting in the real world, where timing and embodiment affect outcomes.",
    "barn-challenge-2026-finals":
      "Navigating narrow spaces tests a complete robot in a physical environment, beyond simulator-only behavior.",
    "masai-trial":
      "A clinical workflow needs evidence about patient outcomes. Randomization supports a comparison within this screening study.",
    "kenya-ai-consult-trial":
      "A helpful-looking consultation does not guarantee a better treatment outcome. A clinical study can measure that difference directly.",
  };
  function existing(
    id,
    name,
    category,
    question,
    tests,
    readText,
    variants,
    historical = false,
  ) {
    cards.push({
      id,
      name,
      category,
      question,
      tests,
      matters: reasons[id],
      read: readText,
      notice: variants[0].limitations.join(" "),
      historical,
      source_input: dir + "primary-source-additions.json",
      source_checked_at: "2026-10-05",
      publication_at: null,
      variants,
    });
  }
  const c = additions.cohorts;
  const rows = (cohort, label = "model_variant") =>
    cohort.rows.map((r, i) => ({
      label: r[label],
      result_id: label + "-" + i,
      source_url: cohort.source_url,
      raw: clone(r),
      ...clone(r),
    }));
  const v = (id, label, cohort, metrics, extra = {}) =>
    variant(
      id,
      label,
      rows(cohort, extra.label_field || "model_variant"),
      metrics,
      cohort.source_url,
      cohort.settings,
      cohort.notes,
      {
        publication_at:
          cohort.publication_revision_date || cohort.publication_date || null,
        snapshot_at: cohort.source_snapshot_date || null,
        ...extra,
      },
    );
  const balrogMetrics = [
    "overall_progress",
    "babyai",
    "crafter",
    "textworld",
    "babaisai",
    "minihack",
    "nethack",
  ].map((key) =>
    metric(
      key,
      key === "overall_progress" ? "Overall progress" : key + " progress",
      "percent",
      "metrics_percent_progress." + key + ".value",
      [0, 100],
    ),
  );
  existing(
    "balrog",
    "BALROG",
    "games",
    "Can an agent make progress in different games?",
    "Agents explore game worlds that require planning and spatial reasoning. Language-only and vision-language runs use different environment sets.",
    "Progress is a benchmark-defined measure, not the probability of beating a game. The reported plus/minus values have an unconfirmed uncertainty definition; September entries are not maintainer-reproduced.",
    ["LLM", "VLM"].map((modality) =>
      v(
        modality,
        modality + " environment set",
        {
          ...c.balrog,
          rows: c.balrog.rows.filter((r) => r.modality === modality),
        },
        balrogMetrics.filter((m) => modality === "LLM" || m.id !== "textworld"),
      ),
    ),
  );
  existing(
    "eq-bench-creative-writing-v3",
    "EQ-Bench Creative Writing v3",
    "community",
    "Can an AI write stories people prefer?",
    "Models write responses to creative prompts. Judges assess writing with a rubric and pairwise comparisons under this v3 protocol.",
    "Elo and rubric scores describe different judgments. Neither is a task-success percentage; model markers and the judge-change date remain attached to the frozen source.",
    [
      v(
        "v3",
        "Pinned v3 cohort · 140 models",
        c["eq-bench-creative-writing-v3"],
        [
          metric("elo", "Creative-writing Elo", "Elo", "elo_score", [
            0,
            Math.ceil(
              Math.max(
                ...c["eq-bench-creative-writing-v3"].rows.map(
                  (r) => r.elo_score,
                ),
              ) / 100,
            ) * 100,
          ]),
          metric(
            "rubric",
            "Creative-writing rubric score",
            "rubric points",
            "creative_writing_score",
            [
              0,
              Math.ceil(
                Math.max(
                  ...c["eq-bench-creative-writing-v3"].rows.map(
                    (r) => r.creative_writing_score,
                  ),
                ) / 10,
              ) * 10,
            ],
          ),
        ],
      ),
    ],
  );
  const tb = c["terminal-bench-4-expanded"];
  const tbRows = rows(tb).map((r) => {
    const match = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(
      r.reported_duration,
    );
    assert.ok(match && match[0]);
    return {
      ...r,
      reported_duration_seconds:
        Number(match[1] || 0) * 3600 +
        Number(match[2] || 0) * 60 +
        Number(match[3] || 0),
    };
  });
  existing(
    "terminal-bench-4",
    "Terminal-Bench 4 · Vals mini-swe-agent",
    "standard",
    "Can a coding agent finish practical terminal tasks?",
    "Agents use bash to complete 66 tasks in a mini-swe-agent scaffold. The source reports mean pass@1 over three trials.",
    "This full source table contains 43 configurations, while effort and fallback settings remain incomplete for additional rows. Costs are per task, and reported duration includes the agent workflow rather than pure inference.",
    [
      variant(
        "expanded",
        "43 published configurations",
        tbRows,
        [
          metric(
            "score",
            "Mean pass@1 over three trials",
            "percent",
            "score_percent",
            [0, 100],
          ),
          {
            ...metric(
              "cost",
              "Score vs reported per-task cost",
              "percent",
              "score_percent",
              [0, 100],
            ),
            kind: "scatter",
            y_label: "Mean pass@1 over three trials",
            x_field: "reported_cost_per_task_usd",
            x_label: "Reported cost per task",
            x_unit: "USD",
            x_basis:
              "Vals candidate-agent cost per task; not whole-evaluation expense.",
          },
          {
            ...metric(
              "time",
              "Score vs reported task duration",
              "percent",
              "score_percent",
              [0, 100],
            ),
            kind: "scatter",
            y_label: "Mean pass@1 over three trials",
            x_field: "reported_duration_seconds",
            x_label: "Reported task duration",
            x_unit: "seconds",
            x_basis:
              "Converted exactly from source h/m/s strings; includes agent workflow, not inference-only time.",
          },
        ],
        tb.source_url,
        tb.settings,
        tb.notes.concat([
          "Opus 5.5: source score 65.15%, or 58.08% when fallback-served attempts count as failures. Sonnet 5.5: 64.14%, or 62.63% under that policy. Exact effort/fallback settings for additional configurations are not established.",
        ]),
        {
          complete: true,
          configuration_settings_complete: false,
          snapshot_at: tb.source_snapshot_date,
        },
      ),
    ],
  );
  existing(
    "terminal-bench-science-native-agents",
    "Terminal-Bench Science · native agents",
    "standard",
    "Can an agent perform practical science tasks?",
    "Native agents complete tasks across scientific domains. This overall cohort keeps each model’s agent scaffold and effort visible.",
    "These are systems rather than isolated models. Costs are whole-evaluation reported totals, model-release dates are not run dates, and the reported plus/minus definition is not established.",
    [
      v(
        "overall",
        "Overall · 17 native-agent systems",
        {
          ...c["terminal-bench-science-native-expanded"],
          rows: c["terminal-bench-science-native-expanded"].rows.map((r) => ({
            ...r,
            label: [r.model_variant, r.agent, r.effort]
              .filter(Boolean)
              .join(" · "),
          })),
        },
        [metric("score", "Overall task score", "percent", "value", [0, 100])],
        { label_field: "label" },
      ),
    ],
  );
  existing(
    "webcraftbench-v3",
    "WebCraftBench",
    "frontend",
    "Can an agent build a useful website from a request?",
    "Seventeen model-and-agent systems build applications from 369 requirements. Judges assess aesthetics, usability and alignment with the requested content and behavior.",
    "Scores are z scores relative to this fixed system pool, not percentages. Different agent scaffolds are preserved, and the paper does not test later models by substitution.",
    [
      v(
        "paper",
        "September 20 paper revision · 17 systems",
        c["webcraftbench-v3"],
        [
          "total",
          "aesthetics",
          "usability",
          "functional_alignment",
          "content_alignment",
          "visual_alignment",
          "requirement_alignment",
        ].map((key) =>
          metric(
            key,
            key.replaceAll("_", " ") + " z score",
            "z score",
            "metrics_zscore." + key,
            [-3, 3],
          ),
        ),
      ),
    ],
    true,
  );
  existing(
    "bench2drive",
    "Bench2Drive",
    "physical",
    "Can a driving system react to a changing road?",
    "Complete sensor-and-control systems drive through 220 routes in CARLA under the v0.0.4 protocol. All routes count, including failures.",
    "Driving Score and route success are different outcomes. These simulator results do not establish on-road safety, and the system evaluation dates remain unknown.",
    [
      v(
        "v004",
        "v0.0.4 · 220 routes",
        c.bench2drive,
        [
          metric(
            "driving",
            "Driving Score",
            "score points",
            "driving_score",
            [0, 100],
          ),
          metric(
            "success",
            "Route success rate",
            "percent",
            "success_rate_percent",
            [0, 100],
          ),
        ],
        { label_field: "system" },
      ),
    ],
  );
  existing(
    "medhelm",
    "MedHELM",
    "medical",
    "How does an AI perform across clinical-language tasks?",
    "The May 14 v5.0.0 release combines medical evaluation datasets and reports relative win rates across its model pool.",
    "A relative win rate is not clinical task success or a safety result. Ten of eleven release models were recovered; this latest collected release is a May cohort, not an October evaluation.",
    [
      v(
        "v5",
        "May 14 v5.0.0 · 10 of 11 models",
        c["medhelm-v5"],
        [
          metric(
            "win-rate",
            "Mean win rate in release pool",
            "fraction",
            "mean_win_rate",
            [0, 1],
          ),
        ],
        { complete: false, coverage: c["medhelm-v5"].coverage },
      ),
    ],
    true,
  );
  existing(
    "mast",
    "MAST · First Do NOHARM v2",
    "medical",
    "Can a medical assistant avoid harmful recommendations?",
    "This preview component measures First Do NOHARM v2 weighted F1. Its retrieved configurations include medical RAG systems and general models.",
    "This is a component-specific preview, not the General or Clinical composite or an agentic result. Sixteen of nineteen NOHARM-v2 models were recovered, and blank source cells remain missing.",
    [
      v(
        "noharm",
        "NOHARM v2 preview · 16 visible systems",
        c["mast-noharm-v2-preview"],
        [
          metric(
            "f1",
            "First Do NOHARM v2 weighted F1",
            "percent",
            "value",
            [0, 100],
          ),
        ],
        { complete: false, coverage: c["mast-noharm-v2-preview"].coverage },
      ),
    ],
  );
  existing(
    "stationerybench",
    "Robocurve StationeryBench",
    "physical",
    "Can a robot manipulate everyday stationery?",
    "Two complete robot systems attempt five tasks using the same physical arms. Human graders record completion and progress through four task milestones.",
    "Twenty trials per system and task support descriptive comparisons. The systems have different interfaces and control horizons; zero observed completions is not a true success probability of zero.",
    [
      v(
        "tasks",
        "September 10 fixed study · per-task results",
        {
          ...c.stationerybench,
          rows: c.stationerybench.rows.map((r) => ({
            ...r,
            label: r.system + " · " + r.task,
          })),
        },
        [
          metric(
            "progress",
            "Mean milestone progress",
            "points on 0–100 scale",
            "mean_progress_0_100",
            [0, 100],
          ),
          metric(
            "completion",
            "Observed task completion",
            "percent",
            "success_rate_percent",
            [0, 100],
          ),
        ],
        { label_field: "label" },
      ),
    ],
    true,
  );
  existing(
    "barn-challenge-2026-finals",
    "BARN Challenge 2026 · physical finals",
    "physical",
    "Can a robot navigate tight obstacle courses?",
    "Finalists run three physical obstacle courses. The best three of five timed attempts per course contribute to the reported result.",
    "The nine scored trials are selected attempts, not an unselected reliability sample. Physical finals and simulator results remain separate; the source certificate warning has not been bypassed.",
    [
      v(
        "finals",
        "June 3–4 physical finals",
        c["barn-challenge-2026-finals"],
        [
          metric(
            "successes",
            "Successful scored attempts",
            "attempts out of 9",
            "scored_successes",
            [0, 9],
          ),
        ],
        { label_field: "team" },
      ),
    ],
    true,
  );
  existing(
    "masai-trial",
    "MASAI mammography trial",
    "medical",
    "What happened when screening teams used AI support?",
    "A randomized screening trial compared AI-supported mammography with standard double reading. This view reports interval cancers and sensitivity from the fixed study.",
    "The primary result supports noninferiority, not statistically demonstrated superiority. Clinical outcomes describe the studied screening workflow, rather than a foundation-model benchmark.",
    [
      v(
        "trial",
        "Fixed randomized trial · final report",
        c["masai-trial"],
        [
          metric(
            "interval",
            "Interval cancers per 1,000",
            "cases per 1,000",
            "interval_cancer_per_1000",
            [0, 3],
            "lower_is_better",
          ),
          metric(
            "sensitivity",
            "Sensitivity",
            "percent",
            "sensitivity_percent",
            [0, 100],
          ),
        ],
        {
          label_field: "arm",
          primary_effect: c["masai-trial"].primary_effect,
          enrollment_period: c["masai-trial"].enrollment_period,
        },
      ),
    ],
    true,
  );
  existing(
    "kenya-ai-consult-trial",
    "Kenya AI Consult trial",
    "medical",
    "Did AI assistance improve treatment outcomes in this study?",
    "The fixed study compared LLM-assisted consultations with control care. Its primary endpoint was expert-adjudicated treatment failure within 14 days.",
    "The adjusted primary effect was not statistically significant. Reported crude rates and adjusted odds ratio are different quantities; the model results do not establish general clinical safety.",
    [
      v(
        "trial",
        "April–July 2025 enrollment · June 2026 report",
        c["kenya-ai-consult-trial"],
        [
          metric(
            "failure",
            "Reported treatment failure",
            "percent",
            "reported_percent",
            [0, 5],
            "lower_is_better",
          ),
        ],
        {
          label_field: "arm",
          primary_effect: c["kenya-ai-consult-trial"].primary_effect,
          enrollment_period: c["kenya-ai-consult-trial"].enrollment_period,
        },
      ),
    ],
    true,
  );
  const prior = read("data/gallery-current-2026-10-01.json").cards.find(
    (c) => c.id === "terminal-bench-4",
  );
  cards
    .find((c) => c.id === "terminal-bench-4")
    .variants.push(
      variant(
        "detailed",
        "Original six configurations with verified settings",
        prior.rows.map((r, i) => ({
          ...clone(r),
          label: r.model_variant,
          result_id: "tb4-detailed-" + i,
          raw: clone(r),
        })),
        [
          metric(
            "score",
            "Mean pass@1 over three trials",
            "percent",
            "value",
            [0, 100],
          ),
        ],
        prior.rows[0].source_url,
        prior.settings,
        prior.limitations,
        {
          complete: false,
          coverage:
            "Original six fully described configurations; preserved separately from the expanded table.",
        },
      ),
    );
  for (const card of cards)
    for (const variant of card.variants) {
      for (const row of variant.rows) {
        safe(row.source_url);
        assert.ok(typeof row.label === "string");
      }
      for (const m of variant.metrics) {
        assert.ok(m.domain[0] < m.domain[1]);
      }
    }
  const familyGroups = {
    "gpqa-diamond": ["gpqa-diamond", "gpqa-diamond-march-reported"],
    "mmmu-pro": ["mmmu-pro", "mmmu-pro-march-reported"],
    "frontiermath-tier4-v2": [
      "frontiermath-tier4-v2",
      "frontiermath-tier4-v2-task-2-0-0",
      "frontiermath-tier4-v2-september-reported",
    ],
    "swe-bench-pro-public-v2": [
      "swe-bench-pro-public-v2",
      "swe-bench-pro-public-v2-hard",
      "swe-bench-pro-public-v1",
    ],
    "terminal-bench-4": [
      "terminal-bench-4",
      "terminal-bench-4-native-agents",
      "terminal-bench-2",
      "terminal-bench-2-1-history",
    ],
    "terminal-bench-science": [
      "terminal-bench-science",
      "terminal-bench-science-native-agents",
      "terminal-bench-science-0-1",
    ],
    "medagentbench-v2-revised-original-tasks": [
      "medagentbench-v2-revised-original-tasks",
      "medagentbench-v2-memory-heldout",
      "medagentbench-v2-new-tasks",
      "medagentbench",
    ],
  };
  return {
    schema_version: 1,
    checked_at: "2026-10-05",
    cards,
    first_wave_ids: inventory.first_wave_ids,
    backlog: inventory.entries.filter((c) => !first.has(c.id)),
    audits: audits.cards,
    familyGroups,
    rune: {
      summaries: rune,
      labels: runeLabels,
      source_url:
        "https://github.com/MaxBittker/runebench/blob/5358a49f212e238cd093154bc3e93999d345ab97/results/skills-30m/_data.js",
      warning:
        "Single-configuration explorer. Harness/image versions and task prompts differ across 87 configurations; do not interpret them as a matched experiment. Existing verified same-slice effort charts remain separate.",
    },
    provenance: read(dir + "provenance.json"),
  };
}
module.exports = build;
if (require.main === module) {
  const output = build();
  const file = path.join(root, "data/coverage-projection-2026-10-05.json");
  if (process.argv.includes("--check"))
    assert.deepEqual(read("data/coverage-projection-2026-10-05.json"), output);
  else fs.writeFileSync(file, JSON.stringify(output, null, 2) + "\n");
  console.log(
    JSON.stringify({
      cards: output.cards.length,
      firstWave: output.first_wave_ids.length,
      backlog: output.backlog.length,
      additionRows: 319,
      runeConfigurations: 87,
      runeSummaries: 1392,
    }),
  );
}
