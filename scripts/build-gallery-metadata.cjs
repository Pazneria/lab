// Presentation metadata is derived from archived evidence. It never updates scores.
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const read = (name) =>
  JSON.parse(fs.readFileSync(path.join(root, name), "utf8"));
const date = (value) =>
  typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
function range(rows, field) {
  const dates = rows
    .map((r) => date(r[field]))
    .filter(Boolean)
    .sort();
  return {
    earliest: dates[0] || null,
    latest: dates.at(-1) || null,
    known: dates.length,
    unknown: rows.length - dates.length,
  };
}
function build() {
  const catalog = read("data/catalog.original.json");
  const standard = read("data/gallery-current-2026-10-01.json");
  const resultInput = read("data/results.original.json");
  const community = read("data/community-expanded-2026-10-01.json");
  const medical = read("data/current-medical.original.json");
  const frontend = read("data/frontend-research-2026-10-05.original.json");
  const supplement = read(
    "data/frontend-research-supplement-2026-10-05.original.json",
  );
  const notes = read("data/gallery-notes.json");
  const cards = {};
  const aliases = {
    "gpqa-diamond-frontiermath": ["gpqa-diamond", "frontiermath-tier4-v2"],
    "swe-bench-pro-v2": [
      "swe-bench-pro-public-v2",
      "swe-bench-pro-public-v2-hard",
    ],
    "design2code-code": ["design2code-v3-484"],
  };
  const audits = [...frontend.audit, ...supplement.audit];
  function auditFor(id) {
    return audits
      .filter((a) => a.id === id || aliases[a.id]?.includes(id))
      .at(-1);
  }
  function review(id, initialDate, mode) {
    const audit = auditFor(id);
    return {
      date: audit ? frontend.checked_at : initialDate,
      mode: audit ? "parent_source_audit" : mode,
      scope: audit
        ? audit.finding || audit.status
        : mode === "inherited_catalog"
          ? "Inherited research check; source pages were not reopened in catalog assembly."
          : "Parent-supplied primary-source research; not a new poll by this UI change.",
      audit_status: audit?.status || null,
    };
  }
  for (const c of standard.cards) {
    const fixedPaper = c.source_id === "medagent_v2";
    const historical =
      c.history ||
      c.display_status === "historical_source_cohort" ||
      fixedPaper;
    cards[c.id] = {
      evidence: "plotted",
      cohort: historical ? "historical" : "latest_collected",
      cohort_basis: fixedPaper
        ? "Fixed PSB 2026 author-paper experiments; no live standings or individual evaluation dates established."
        : historical
          ? "The archived source packet identifies this as a historical or superseded comparison cohort."
          : "Latest cohort collected for this protocol in the archived source packet; this does not establish fresh runs or complete frontier coverage.",
      discovery_lifecycle: null,
      source_review: review(
        c.id,
        standard.researched_at,
        "parent_primary_research",
      ),
      result_packet_checked_at: standard.researched_at,
      snapshot_at: null,
      publication_at: date(standard.sources[c.source_id]?.published_date),
      publication_label: fixedPaper
        ? "PSB 2026 paper; exact publication date not captured"
        : null,
      evaluations: [
        {
          slice: "Collected source cohort",
          ...range(c.rows, "evaluation_date"),
        },
      ],
      model_releases: range(c.rows, "model_release_date"),
    };
  }
  for (const c of catalog.entries) {
    const plotted = Boolean(notes[c.id]?.main_graph);
    const audit = auditFor(c.id);
    const unresolved =
      c.lifecycle.status === "unverified" ||
      audit?.status === "scores_unresolved";
    const historical =
      c.lifecycle.status === "historical" || c.id === "medagentbench";
    const selected = resultInput.results.records.filter(
      (r) => r.benchmark_id === c.id,
    );
    const slices = selected.length
      ? [
          {
            slice: "Original selected results",
            ...range(selected, "evaluation_date"),
          },
        ]
      : [];
    let packetDate = selected.length ? resultInput.results.prepared_date : null;
    if (
      community[
        c.id === "runebench"
          ? "runebench"
          : c.id === "bullshitbench-v2"
            ? "bullshitbench"
            : ""
      ]
    ) {
      const expanded =
        community[c.id === "runebench" ? "runebench" : "bullshitbench"];
      packetDate = expanded.metadata.checked_at;
      slices.push({
        slice: "Expanded configurations",
        ...range(expanded.records, "evaluation_date"),
      });
    }
    if (c.id === "medagentbench") {
      packetDate = medical.medagentbench_original.checked_at;
      slices.push({
        slice: "Historical author-homepage results",
        ...range(medical.medagentbench_original.rows, "evaluation_date"),
      });
    }
    cards[c.id] = {
      evidence: unresolved ? "unresolved" : plotted ? "plotted" : "source_only",
      cohort: historical
        ? "historical"
        : plotted
          ? "latest_collected"
          : "not_assessed",
      cohort_basis:
        c.id === "medagentbench"
          ? "Displayed original-paper and author-homepage results are historical. The maintained V2 benchmark has separate cards."
          : historical
            ? c.lifecycle.basis
            : plotted
              ? "Selected and expanded results are tied to the archived protocol; source checks do not redetermine evaluation dates."
              : "No scored cohort has been imported into this guide; project activity is not a measured result.",
      discovery_lifecycle: c.lifecycle,
      source_review: review(
        c.id,
        packetDate || c.verification.as_of,
        packetDate ? "parent_primary_research" : "inherited_catalog",
      ),
      result_packet_checked_at: packetDate,
      snapshot_at: catalog.prepared_at,
      publication_at: c.id === "medagentbench" ? "2025-02-12" : null,
      publication_label: notes[c.id]?.date || null,
      evaluations: slices,
      model_releases: null,
      unavailable_reason: unresolved
        ? audit?.finding || c.verification.note
        : null,
    };
  }
  for (const c of [
    ...frontend.cards,
    ...frontend.optional_source_only_candidates,
  ]) {
    const rows = c.rows || [];
    const historical = c.status === "historical_source_cohort";
    cards[c.id] = {
      evidence: rows.length ? "plotted" : "source_only",
      cohort: historical
        ? "historical"
        : rows.length
          ? "latest_collected"
          : "not_assessed",
      cohort_basis: historical
        ? "Fixed author-paper Table 1 cohort; historical model labels and prompting setups remain intact."
        : rows.length
          ? "Selected preference rows from a dated leaderboard snapshot; individual run dates remain unknown."
          : "No scored cohort admitted; source access and protocol review are different questions.",
      discovery_lifecycle: null,
      source_review: review(
        c.id,
        frontend.checked_at,
        "parent_primary_research",
      ),
      result_packet_checked_at: rows.length ? frontend.checked_at : null,
      snapshot_at: date(c.snapshot_date),
      publication_at: date(c.paper_revision_date || c.revision_date),
      publication_label: null,
      evaluations: rows.length
        ? [
            {
              slice: "Collected configurations",
              ...range(rows, "evaluation_date"),
            },
          ]
        : [],
      model_releases: null,
    };
  }
  const legacyValues = Object.values(cards);
  assert.equal(legacyValues.length, 46);
  assert.equal(legacyValues.filter((c) => c.evidence === "plotted").length, 27);
  const coverage = require("./build-coverage.cjs")();
  for (const c of coverage.cards) {
    const rows = c.variants.flatMap((v) => v.rows);
    const prior = cards[c.id];
    cards[c.id] = {
      evidence: "plotted",
      cohort: c.historical ? "historical" : "latest_collected",
      cohort_basis: c.historical
        ? "Fixed dated source cohort; source checks do not make these runs new."
        : "Latest collected source cohort for this protocol; selection and incomplete model coverage are disclosed.",
      discovery_lifecycle: prior?.discovery_lifecycle || null,
      source_review: {
        date: "2026-10-05",
        mode: "parent_primary_research",
        scope:
          "Parent-supplied primary-source research, decoded from 15 direct JSON parts. Pinned RuneBench and EQ source files independently parsed; no evaluation was executed.",
      },
      result_packet_checked_at: "2026-10-05",
      snapshot_at: date(c.variants[0].snapshot_at),
      publication_at: date(c.publication_at || c.variants[0].publication_at),
      publication_label: c.publication_label || null,
      evaluations: c.variants.map((v) => ({
        slice: v.label,
        ...range(v.rows, "evaluation_date"),
      })),
      model_releases: range(rows, "model_release_date"),
    };
  }
  const values = Object.values(cards);
  const counts = {
    all: values.length,
    plotted: values.filter((c) => c.evidence === "plotted").length,
    current: values.filter(
      (c) => c.evidence === "plotted" && c.cohort === "latest_collected",
    ).length,
    historical: values.filter((c) => c.cohort === "historical").length,
    source_only: values.filter((c) => c.evidence === "source_only").length,
    unavailable: values.filter((c) => c.evidence === "unresolved").length,
  };
  assert.equal(counts.all, 73);
  assert.equal(counts.plotted, 64);
  assert.equal(counts.unavailable, 2);
  return {
    schema_version: 1,
    prepared_at: "2026-10-05",
    basis:
      "Derived from archived source packets, not a fresh source poll or new evaluation.",
    filter_note:
      "Historical source guides also appear in Source guides. Latest collected means the selected protocol cohort, not a claim of new runs or a current global ranking.",
    counts,
    cards,
  };
}
module.exports = build;
if (require.main === module) {
  const output = build();
  const filename = path.join(root, "data/gallery-metadata-2026-10-05.json");
  if (process.argv.includes("--check"))
    assert.deepEqual(read("data/gallery-metadata-2026-10-05.json"), output);
  else fs.writeFileSync(filename, JSON.stringify(output, null, 2) + "\n");
  console.log(JSON.stringify(output.counts));
}
