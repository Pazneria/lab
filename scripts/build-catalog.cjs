const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const originalPath = path.join(root, "data/catalog.original.json");
const raw = fs.readFileSync(originalPath);
const original = JSON.parse(raw);
const area = {
  community_games: "games",
  independent_general: "community",
  medical: "medical",
  physical_world: "physical",
};
const evidence = {
  benchmark_scores: "Benchmark metric definitions",
  human_preference: "Human preference",
  showcase_case_study: "Showcase case study",
  retrospective_clinical: "Retrospective clinical evidence",
  prospective_clinical: "Prospective clinical trial",
  controlled_physical_trial: "Controlled physical trial",
  observational_real_world: "Observational real-world evidence",
};
const sourceSettings = {
  interactive_game: "Interactive game",
  virtual_construction: "Virtual construction",
  static_dataset: "Static dataset",
  sandboxed_computer: "Sandboxed computer",
  mixed: "Mixed",
  simulation: "Simulation",
  real_world: "Real world",
};
const setting = (e) =>
  e.entry_type === "showcase"
    ? "case"
    : e.evidence_kind === "observational_real_world"
      ? "observation"
      : {
          real_world: "real-trial",
          simulation: "simulation",
          mixed: "mixed",
          interactive_game: "game",
          virtual_construction: "game",
          static_dataset: "dataset",
          sandboxed_computer: "sandbox",
        }[e.setting];
function validateOriginal() {
  assert.equal(original.schema_version, "1.0.0");
  assert.equal(original.catalog_id, "public-benchmark-tracker-v1");
  assert.equal(original.entries.length, 20);
  assert.equal(original.aggregation.enabled, false);
  assert.equal(original.prepared_at, "2026-09-30");
  const ids = new Set(),
    sourceIds = new Set();
  const byArea = {},
    byStatus = {},
    bySetting = {};
  let sourceCount = 0,
    metricCount = 0;
  for (const e of original.entries) {
    assert.ok(!ids.has(e.id));
    ids.add(e.id);
    assert.ok(
      area[e.area] &&
        evidence[e.evidence_kind] &&
        sourceSettings[e.setting] &&
        setting(e),
    );
    assert.ok(
      ["live", "historical", "ongoing", "unverified"].includes(
        e.lifecycle.status,
      ),
    );
    assert.equal(e.verification.as_of, original.prepared_at);
    assert.equal(e.lifecycle.as_of, original.prepared_at);
    for (const key of ["summary", "scope", "result_note", "next_check"])
      assert.ok(typeof e[key] === "string" && e[key].length);
    assert.ok(e.inference.may_infer.length && e.inference.may_not_infer.length);
    byArea[e.area] = (byArea[e.area] || 0) + 1;
    byStatus[e.lifecycle.status] = (byStatus[e.lifecycle.status] || 0) + 1;
    bySetting[e.setting] = (bySetting[e.setting] || 0) + 1;
    assert.ok(e.sources.length);
    const localSourceIds = new Set(e.sources.map((s) => s.id));
    for (const source of e.sources) {
      assert.ok(!sourceIds.has(source.id));
      sourceIds.add(source.id);
      const url = new URL(source.url);
      assert.equal(url.protocol, "https:");
      assert.ok(!url.username && !url.password);
      assert.ok(source.title && source.provenance && source.supports.length);
      assert.equal(source.checked_at, original.prepared_at);
      assert.ok(["inherited_catalog", "failed"].includes(source.access));
      sourceCount++;
    }
    for (const m of e.metrics || []) {
      assert.equal(m.value, null);
      assert.equal(m.subject, null);
      assert.equal(m.as_of, null);
      assert.ok(m.name && m.protocol && m.source_ids.length);
      assert.ok(m.source_ids.every((id) => localSourceIds.has(id)));
      metricCount++;
    }
  }
  assert.equal(sourceCount, 51);
  assert.equal(metricCount, 30);
  assert.equal(ids.size, 20);
  assert.deepEqual(byArea, {
    community_games: 5,
    independent_general: 4,
    medical: 5,
    physical_world: 6,
  });
  assert.equal(
    original.entries.filter((e) => e.entry_type === "watch").length,
    1,
  );
  assert.equal(
    original.entries.find((e) => e.entry_type === "watch").id,
    "voxelbench",
  );
  assert.equal(
    original.entries.filter((e) => e.entry_type === "showcase").length,
    1,
  );
  return { sourceCount, metricCount, byArea, byStatus, bySetting };
}
const counts = validateOriginal();
const catalog = {
  schemaVersion: 1,
  availability: "available",
  basis: "Original research catalog",
  verifiedAt: null,
  snapshotAt: original.prepared_at,
  coverageNote: original.coverage_note,
  aggregationReason: original.aggregation.reason,
  provenance:
    "Original JSON supplied directly by the parent task. Library materialization did not succeed.",
  entries: original.entries.map((e) => ({
    id: e.id,
    name: e.name,
    categories: [area[e.area]],
    status: e.lifecycle.status,
    setting: setting(e),
    sourceSetting: sourceSettings[e.setting],
    evidenceType: evidence[e.evidence_kind],
    summary: e.summary,
    entryType: e.entry_type,
    tags: e.tags,
    maintainer: e.maintainer.name,
    relationship: e.maintainer.relationship,
    sourceBasis: e.lifecycle.basis,
    verifiedAt: null,
    snapshotAt: e.verification.as_of,
    verificationStatus: e.verification.status,
    verificationNote: e.verification.note,
    scope: e.scope,
    score: null,
    metrics: e.metrics,
    resultNote: e.result_note,
    comparabilityGroup: e.comparability_group,
    mayInfer: e.inference.may_infer,
    limitations: e.inference.may_not_infer,
    nextVerification: e.next_check,
    sources: e.sources.map((s) => ({
      id: s.id,
      title: s.title,
      url: s.url,
      kind: s.kind,
      basis: s.supports.join("; "),
      supports: s.supports,
      publishedAt: null,
      checkedAt: s.checked_at,
      access: s.access,
      provenance: s.provenance,
    })),
  })),
};
const preserved = original.entries.flatMap((e) => e.sources.map((s) => s.url));
assert.deepEqual(
  catalog.entries.flatMap((e) => e.sources.map((s) => s.url)),
  preserved,
);
const generated =
  "/* Generated from data/catalog.original.json by scripts/build-catalog.cjs.\n * Parent-supplied research snapshot; not successful Library materialization.\n * All metric values remain null. Do not hand-edit this projection. */\nwindow.LAB_CATALOG = " +
  JSON.stringify(catalog, null, 2) +
  ";\n";
const destination = path.join(root, "assets/catalog.js");
if (process.argv.includes("--check"))
  assert.equal(
    fs.readFileSync(destination, "utf8"),
    generated,
    "Projection is stale",
  );
else fs.writeFileSync(destination, generated);
const report = {
  provenance: catalog.provenance,
  snapshotAt: catalog.snapshotAt,
  sha256: crypto.createHash("sha256").update(raw).digest("hex"),
  ...counts,
  records: 20,
  catalogEntries: 19,
  watchItems: 1,
  allMetricValuesNull: true,
  exactSourceURLsPreserved: true,
};
fs.mkdirSync(path.join(root, "evidence"), { recursive: true });
fs.writeFileSync(
  path.join(root, "evidence/catalog-validation.json"),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
