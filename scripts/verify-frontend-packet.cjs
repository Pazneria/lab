const fs = require("node:fs"),
  path = require("node:path"),
  assert = require("node:assert/strict"),
  crypto = require("node:crypto");
const root = path.resolve(__dirname, "..");
const read = (name) =>
  JSON.parse(fs.readFileSync(path.join(root, name), "utf8"));
const sha = (name) =>
  crypto
    .createHash("sha256")
    .update(fs.readFileSync(path.join(root, name)))
    .digest("hex");
function verify(check = false) {
  const directory = "data/frontend-research-parts-2026-10-05/";
  const hashes = [
    "09b106653a9c7c155d8ebeb6b32bc70303046dc433f2d968e3e6e3648676df14",
    "1c80c0c762bd18e65b7d7b047442f590db3673d80572b6061505a898d9af3020",
    "eba0d7a570ed2598a634d36f8bfa6d815b49987450f99a0a721f635545f7d0c1",
  ];
  const pieces = [1, 2, 3].map((n, i) => {
    const name = directory + "part-" + n + ".original.json";
    assert.equal(
      sha(name),
      hashes[i],
      "Parent packet piece bytes changed: " + name,
    );
    return read(name);
  });
  const filename = "data/frontend-research-2026-10-05.original.json",
    packet = read(filename);
  assert.deepEqual(
    packet,
    {
      ...pieces[0],
      cards: [...pieces[0].cards, ...pieces[1].cards],
      ...pieces[2],
    },
    "Assembled original differs from received pieces",
  );
  assert.equal(
    packet.schema_version,
    "benchmark-research-packet-2026-10-05-v1",
  );
  assert.equal(
    packet.repository_baseline,
    "7d385b8df5796090bbee70cadd5d0fdf894f23c0",
  );
  assert.equal(packet.checked_at, "2026-10-05");
  assert.equal(packet.independently_executed, false);
  assert.deepEqual(
    packet.cards.map((c) => c.id),
    ["webdev-arena-frontend", "design-arena-frontend", "design2code-v3-484"],
  );
  assert.equal(packet.cards[0].rows.length, 12);
  assert.equal(packet.cards[1].rows.length, 0);
  assert.equal(packet.cards[2].rows.length, 6);
  assert.equal(packet.optional_source_only_candidates.length, 1);
  assert.equal(packet.audit.length, 14);
  assert.equal(new Set(packet.audit.map((a) => a.id)).size, 14);
  assert.ok(
    packet.cards[0].rows.every(
      (r) =>
        r.confidence_interval.level === null &&
        r.evaluation_date === null &&
        r.cost_usd === null &&
        r.latency_seconds === null,
    ),
  );
  assert.equal(packet.cards[0].snapshot_date, "2026-10-01");
  assert.equal(packet.cards[2].paper_revision_date, "2025-02-09");
  assert.equal(packet.cards[2].evaluation_date, null);
  assert.equal(
    packet.cards[2].rows.filter((r) => r.prompt_method === "direct").length,
    4,
  );
  assert.equal(
    packet.cards[2].rows.filter((r) => r.model_variant === "GPT-4o").length,
    3,
  );
  assert.ok(
    packet.cards[2].rows.every(
      (r) =>
        r.cost_usd === null &&
        r.latency_seconds === null &&
        r.uncertainty === null,
    ),
  );
  const working = read("data/frontend-research-2026-10-05.working.json");
  assert.deepEqual(packet.cards[0], working.cards[0]);
  assert.deepEqual(packet.cards[1], working.cards[1]);
  const oldDesign = working.cards[2];
  assert.deepEqual(
    packet.cards[2],
    {
      ...oldDesign,
      rows: oldDesign.rows.map((r) => {
        const { snapshot, ...rest } = r;
        return { ...rest, model_snapshot: snapshot };
      }),
    },
    "Unexpected Design2Code difference beyond canonical snapshot key",
  );
  const { category, rows, ...oldOptional } =
    working.optional_source_only_candidates[0];
  assert.equal(category, "frontend");
  assert.deepEqual(rows, []);
  assert.deepEqual(packet.optional_source_only_candidates[0], oldOptional);
  const report = {
    received_parts: 3,
    assembled_exactly_from_parts: true,
    cards: 3,
    arena_rows: 12,
    design2code_configs: 6,
    fidelity_values: 30,
    optional_source_only_candidates: 1,
    audits: 14,
    draft_numeric_values_changed: 0,
    arena_card_changed: false,
    design_arena_card_changed: false,
    design2code_difference:
      "Canonical source field model_snapshot replaces provisional snapshot; values unchanged",
    optional_difference:
      "Provisional projection-only category/rows excluded from original; renderer still adds them to projection",
    new_source_metadata:
      "Original schema/recommendation and all 14 audit entries retained; provisional provenance removed from selected source input",
    original_packet_sha256: sha(filename),
    piece_sha256: Object.fromEntries(
      hashes.map((hash, i) => ["part-" + (i + 1) + ".original.json", hash]),
    ),
    publication_authorized_by_reconciliation: false,
  };
  const destination = "evidence/frontend-packet-reconciliation.json";
  if (check)
    assert.deepEqual(
      read(destination),
      report,
      "Stale source reconciliation evidence",
    );
  else
    fs.writeFileSync(
      path.join(root, destination),
      JSON.stringify(report, null, 2) + "\n",
    );
  return report;
}
module.exports = verify;
if (require.main === module)
  console.log(JSON.stringify(verify(process.argv.includes("--check"))));
