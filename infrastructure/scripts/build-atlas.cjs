"use strict";
const fs = require("node:fs"),
  path = require("node:path"),
  assert = require("node:assert/strict"),
  crypto = require("node:crypto");
const root = path.resolve(__dirname, "..");
const read = (name) =>
  JSON.parse(fs.readFileSync(path.join(root, "data", name), "utf8"));
const raw = {};
for (let i = 1; i <= 7; i++)
  for (const [key, value] of Object.entries(read(`research-part-${i}.json`)))
    raw[key] = Array.isArray(value)
      ? [...(raw[key] || []), ...value]
      : value && typeof value === "object"
        ? { ...(raw[key] || {}), ...value }
        : value;
const delta = read("research-final-delta.json");
for (const u of delta.field_updates) {
  const row = raw[u.collection].find((r) => r.id === u.id);
  assert(row, `Missing delta target ${u.id}`);
  Object.assign(row, u.fields);
}
for (const [key, rows] of Object.entries(delta.added_records))
  for (const row of rows) {
    assert(
      !raw[key].some((r) => r.id === row.id),
      `Duplicate addition ${row.id}`,
    );
    raw[key].push(row);
  }
raw.metadata.counts = delta.metadata_counts;
// The original schema version and review state stay intact; the correction packet is archived separately.
const sources = new Map(raw.sources.map((s) => [s.id, s]));
const players = new Map(raw.players.map((p) => [p.id, p]));
const sites = new Map(raw.sites.map((s) => [s.id, s]));
const products = new Map(raw.products.map((p) => [p.id, p]));
const entities = new Map(
  [...raw.players, ...raw.sites, ...raw.products, ...raw.programs].map((x) => [
    x.id,
    x,
  ]),
);
const checks = [];
assert.equal(raw.schema_version, "0.1.0");
for (const key of [
  "players",
  "sites",
  "products",
  "relationships",
  "sources",
]) {
  assert.equal(raw[key].length, raw.metadata.counts[key], `${key} count`);
  assert.equal(
    new Set(raw[key].map((x) => x.id)).size,
    raw[key].length,
    `${key} duplicate`,
  );
}
assert.equal(raw.players.filter((p) => p.featured).length, 18);
assert.equal(raw.investments.length, 9);
assert.equal(raw.changes.length, 7);
function refs(value) {
  if (!value || typeof value !== "object") return;
  for (const [key, v] of Object.entries(value)) {
    if (key === "source_ids" || key === "public_location_source_ids")
      for (const id of v) assert(sources.has(id), `Unknown source ${id}`);
    else if (
      ["owner_ids", "operator_ids", "customer_ids", "entity_ids"].includes(
        key,
      ) &&
      v
    )
      for (const id of v) assert(players.has(id), `Unknown player ${id}`);
    else if (key === "site_ids" && v)
      for (const id of v) assert(sites.has(id), `Unknown site ${id}`);
    else if (key === "product_ids" && v)
      for (const id of v) assert(products.has(id), `Unknown product ${id}`);
    else if (["from_id", "to_id"].includes(key))
      assert(entities.has(v), `Unknown entity ${v}`);
    else if (key === "site_id" && v) assert(sites.has(v));
    else if (key === "product_id" && v) assert(products.has(v));
    else refs(v);
  }
}
refs(raw);
checks.push(
  "Expected counts, unique IDs, all entity/source references and final corrections pass.",
);
for (const source of raw.sources) {
  const u = new URL(source.url);
  assert.equal(u.protocol, "https:");
  assert(!u.username && !u.password);
  assert.equal(source.source_type, "primary");
  assert.equal(source.retrieved_at, "2026-10-05");
}
for (const site of raw.sites) {
  assert(site.source_ids.length);
  assert.equal(site.location.precision, "approximate_city_or_region_center");
  assert(
    Math.abs(site.location.latitude) <= 90 &&
      Math.abs(site.location.longitude) <= 180,
  );
  for (const field of [
    "energized_power_mw",
    "it_load_mw",
    "facility_power_mw",
    "annual_wafer_capacity",
  ])
    assert.equal(site[field], null);
  for (const c of site.capacity_observations) assert.equal(c.additive, false);
}
assert.equal(sites.get("sk-m15x").last_reported_status, "unknown");
assert.equal(sites.get("rainier-indiana").capacity_observations.length, 0);
assert.deepEqual(sites.get("stargate-abilene").product_ids, ["gb200"]);
assert.equal(
  sites.get("tsmc-ap6").capacity_observations[0].basis,
  "advanced_packaging_throughput",
);
checks.push(
  "Null capacities, approximate locations, unassigned Rainier total, M15X uncertainty and packaging basis remain intact.",
);
const clean = (s) => (typeof s === "string" ? s.replaceAll("&amp;", "&") : s);
const human = (s) => s?.replaceAll("_", " ") || "Not established";
const name = (id) => clean(entities.get(id)?.name || id);
const formatNumber = (v) => Number(v).toLocaleString("en-US");
const qualifier = {
  greater_than: "> ",
  approximately: "≈ ",
  up_to: "Up to ",
  nearly: "Nearly ",
  exact_as_reported: "",
  reported: "",
  planned_buildout: "",
  future_buildout: "",
};
const basisLabels = {
  total_facility_power: "Total facility power",
  compute_capacity_definition_unspecified:
    "Compute capacity — power definition unspecified",
  capacity_definition_unspecified: "Capacity — power definition unspecified",
  power_supply_capacity: "Supporting power supply",
  plant_generation_capacity: "Plant generation capacity",
  contracted_power: "Contracted power",
  incremental_generation_capacity: "Incremental generation capacity",
  restored_generation_capacity: "Restored generation capacity",
  accelerator_count: "Accelerator count",
  advanced_packaging_throughput: "Advanced packaging throughput",
};
function capacity(c) {
  const unit =
    c.unit === "300mm_wafer_equivalent_per_year"
      ? "300 mm wafer-equivalents / year"
      : c.unit;
  return {
    value:
      c.value === null
        ? "Not quantified"
        : `${qualifier[c.qualifier] ?? human(c.qualifier) + " "}${formatNumber(c.value)} ${unit}`,
    label: `${human(c.state)} · ${c.label || basisLabels[c.basis]}`,
    meaning: `${basisLabels[c.basis] || human(c.basis)}${c.period ? " · " + c.period : ""}. ${c.scope === "multi_site_program" ? "Multisite program; not allocated to one site." : "Do not add to other capacities."}`,
    asOf: sources.get(c.source_ids[0])?.published_at || null,
    sourceIds: c.source_ids,
  };
}
function investment(i) {
  return {
    value: `${qualifier[i.qualifier] || ""}${i.currency} ${i.value} ${i.unit}`,
    label: human(i.kind),
    meaning: `${human(i.scope)} · ${i.period.label || [i.period.start, i.period.end].filter(Boolean).join("–")}. ${i.note || ""} Not additive.`,
    asOf: i.reported_at,
    sourceIds: i.source_ids,
  };
}
const typeMap = {
  logic_fab: "fab",
  memory_fab: "memory",
  advanced_packaging: "packaging",
  assembly_test: "assembly",
  research_fab: "research",
  data_center: "data-center",
  power_generation: "power",
};
const countryMap = {
  US: "United States",
  TW: "Taiwan",
  KR: "South Korea",
  SG: "Singapore",
  IN: "India",
  NO: "Norway",
  JP: "Japan",
};
const stageMap = {
  chip_designer: "designer",
  systems_platform: "designer",
  system_supplier: "designer",
  foundry: "foundry",
  equipment_supplier: "foundry",
  memory_manufacturer: "memory",
  advanced_packaging: "memory",
  cloud_provider: "deployment",
  ai_lab: "deployment",
  compute_operator: "deployment",
  compute_customer: "deployment",
  power_generator: "power",
  data_center_developer: "power",
  infrastructure_partner: "power",
};
const scopeMap = {
  site: "Site-specific evidence",
  site_product: "Exact site + product",
  product: "Product-level evidence",
  program: "Multisite program",
  company: "Company-level evidence",
};
const view = {
  meta: {
    edition: "First edition / representative coverage",
    asOf: raw.metadata.as_of,
    coverage: raw.coverage.description,
  },
  coverage: raw.coverage,
  sources: raw.sources.map((s) => ({
    id: s.id,
    title: clean(s.title),
    publisher: s.publisher,
    url: s.url,
    publishedAt: s.published_at,
    accessedAt: s.retrieved_at,
    note: s.note,
  })),
  players: raw.players.map((p) => ({
    id: p.id,
    name: p.name,
    featured: p.featured,
    roles: p.roles.map(human),
    stages: [...new Set(p.roles.map((r) => stageMap[r]))],
    summary: p.description,
    sourceIds: p.source_ids,
    siteIds: p.site_ids,
    facts: raw.investments
      .filter((i) => !i.site_id && i.entity_ids.includes(p.id))
      .map(investment),
    programs: raw.programs
      .filter((x) => x.entity_ids.includes(p.id))
      .map((x) => ({
        name: x.name,
        note: x.note,
        facts: x.capacity_observations.map(capacity),
      })),
  })),
  products: raw.products.map((p) => ({
    id: p.id,
    name: p.name,
    designerId: p.designer_id,
    process: p.process_nodes.join(", ") || "Not established in this record",
    memory: p.memory?.join(", ") || "Not established in this record",
    type: human(p.type),
    sourceIds: p.source_ids,
  })),
  sites: raw.sites.map((s) => ({
    id: s.id,
    name: clean(s.name),
    type: typeMap[s.layer],
    layer: human(s.layer),
    country: countryMap[s.country],
    location: {
      label: `${s.locality}, ${countryMap[s.country]}`,
      lat: s.location.latitude,
      lon: s.location.longitude,
      precision: "Approximate locality, not facility coordinates",
    },
    status: s.last_reported_status,
    asOf: s.status_reported_at,
    statusNote: clean(s.status_note),
    description: s.summary,
    playerIds: [
      ...new Set([
        ...(s.owner_ids || []),
        ...(s.operator_ids || []),
        ...(s.customer_ids || []),
        ...raw.players
          .filter((p) => p.site_ids.includes(s.id))
          .map((p) => p.id),
      ]),
    ],
    ownerIds: s.owner_ids || [],
    operatorIds: s.operator_ids || [],
    customerIds: s.customer_ids || [],
    productIds: s.product_ids,
    roles: [
      `Owner: ${s.owner_ids?.map(name).join(", ") || "not established"}`,
      `Operator: ${s.operator_ids?.map(name).join(", ") || "not established"}`,
    ].join(". "),
    process: s.process_nodes.join(", ") || null,
    products: [...s.outputs, ...s.product_ids.map(name)].join("; "),
    customers: s.customer_ids?.map(name).join(", ") || null,
    customerScope: s.customer_ids
      ? "Named in this site record. Product assignments are limited to the products listed above."
      : "No exact-site customer assignment is established by this evidence set.",
    target: s.target
      ? `${s.target.event} · ${s.target.period} · Company target; not confirmation of completion.`
      : null,
    unknowns:
      s.layer === "data_center"
        ? "Energized power, IT load and facility power are not established in this record."
        : null,
    facts: [
      ...s.capacity_observations.map(capacity),
      ...raw.investments.filter((i) => i.site_id === s.id).map(investment),
    ],
    sourceIds: s.source_ids,
  })),
  relationships: raw.relationships.map((r) => ({
    id: r.id,
    from: r.from_id,
    to: r.to_id,
    kind: human(r.type),
    scope: scopeMap[r.evidence_scope] || human(r.evidence_scope),
    scopeKey: r.evidence_scope,
    state: human(r.state),
    siteId: r.site_id,
    productId: r.product_id,
    summary: r.description,
    sourceIds: r.source_ids,
    asOf: r.reported_at,
  })),
  changes: raw.changes.map((c) => ({
    id: c.id,
    date: c.date,
    title: {
      manufacturing_milestone: "Manufacturing milestone",
      status_change: "A facility comes online",
      capacity_plan: "An expanded capacity plan",
      product_link: "A disclosed product link",
      capital_spending: "Reported capital spending",
      power_contract: "A power-purchase agreement",
      announcement: "A new project announcement",
    }[c.type],
    summary: c.summary,
    sourceIds: c.source_ids,
  })),
};
// Static fallback carries every site's facts, every relationship, product and all sources.
const esc = (x) =>
  String(clean(x) ?? "Not established")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
const sourceLinks = (ids) =>
  `<ul class="source-list">${ids
    .map((id) => {
      const s = sources.get(id);
      return `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.publisher)}: ${esc(s.title)}</a><small>Published ${esc(s.published_at || "date not stated")} · Checked ${esc(s.retrieved_at)}${s.note ? " · " + esc(s.note) : ""}</small></li>`;
    })
    .join("")}</ul>`;
const factHtml = (f) =>
  `<div class="fact"><strong>${esc(f.value)}</strong><span class="fact-label">${esc(f.label)}</span><p>${esc(f.meaning)} · As of ${esc(f.asOf || "date not stated")}</p>${sourceLinks(f.sourceIds)}</div>`;
const fields = (rows) =>
  `<dl class="detail-fields">${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`;
const staticHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Atlas records & sources — Jordan's Lab</title><link rel="stylesheet" href="assets/atlas.css"></head><body class="source-page"><a class="skip-link" href="#main">Skip to records</a><header class="shell masthead"><a href="./">← Infrastructure atlas</a><a href="data/atlas.json">Public dataset JSON</a></header><main id="main" class="shell"><h1>Records & sources</h1><p>Snapshot ${esc(view.meta.asOf)}. Last reported status, not a real-time audit. Approximate locality markers only. No capacity or spending totals.</p><nav aria-label="Source index"><a href="#sites">Sites</a> · <a href="#players">Players</a> · <a href="#products">Products</a> · <a href="#relationships">Relationships</a> · <a href="#timeline">Timeline</a> · <a href="#coverage">Coverage</a> · <a href="#sources">All sources</a></nav><h2 id="sites">25 representative sites</h2>${view.sites
  .map(
    (s) =>
      `<article class="static-record" id="${esc(s.id)}"><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p>${fields(
        [
          ["Location", s.location.label + " — " + s.location.precision],
          ["Layer", s.layer],
          [
            "Last reported status",
            human(s.status) + " · " + (s.asOf || "date not stated"),
          ],
          [
            "Status detail",
            s.statusNote || "No further status detail in this record",
          ],
          ["Owner / operator", s.roles],
          ["Process / technology", s.process],
          ["Products / output", s.products],
          ["Customers", s.customers],
          ["Assignment scope", s.customerScope],
          ["Target milestone", s.target],
          [
            "Unknowns",
            s.unknowns ||
              "Unreported capacities remain null; no zero is inferred.",
          ],
        ],
      )}${s.facts.map(factHtml).join("")}${sourceLinks(s.sourceIds)}</article>`,
  )
  .join(
    "",
  )}<h2 id="players">25 companies and partners</h2>${view.players.map((p) => `<article class="static-record" id="${esc(p.id)}"><h3>${esc(p.name)}</h3><p>${esc(p.summary)}</p><p>${esc(p.roles.join(" · "))}</p><p>Related sites: ${p.siteIds.map((id) => `<a href="#${esc(id)}">${esc(name(id))}</a>`).join(", ") || "None established in this collection"}</p>${p.facts.map(factHtml).join("")}${p.programs.map((g) => `<h4>${esc(g.name)}</h4><p>${esc(g.note)}</p>${g.facts.map(factHtml).join("")}`).join("")}${sourceLinks(p.sourceIds)}</article>`).join("")}<h2 id="products">14 products</h2>${view.products
  .map(
    (p) =>
      `<article class="static-record" id="${esc(p.id)}"><h3>${esc(p.name)}</h3>${fields(
        [
          ["Designer", name(p.designerId)],
          ["Type", p.type],
          ["Process", p.process],
          ["Memory", p.memory],
        ],
      )}${sourceLinks(p.sourceIds)}</article>`,
  )
  .join(
    "",
  )}<h2 id="relationships">28 evidence-scoped relationships</h2>${view.relationships
  .map(
    (r) =>
      `<article class="static-record" id="${esc(r.id)}"><h3>${esc(name(r.from))} → ${esc(name(r.to))}</h3><p>${esc(r.summary)}</p>${fields(
        [
          ["Evidence scope", r.scope],
          ["Relationship", r.kind],
          ["State", r.state],
          ["Date reported", r.asOf],
          ["Named site", r.siteId ? name(r.siteId) : null],
          ["Product", r.productId ? name(r.productId) : null],
        ],
      )}${sourceLinks(r.sourceIds)}</article>`,
  )
  .join(
    "",
  )}<h2 id="timeline">Dated developments</h2>${view.changes.map((c) => `<article class="static-record"><h3>${esc(c.date)} · ${esc(c.title)}</h3><p>${esc(c.summary)}</p>${sourceLinks(c.sourceIds)}</article>`).join("")}<h2 id="coverage">Coverage & limitations</h2><p>${esc(raw.coverage.description)}</p>${fields(
  [
    ["Geographic gaps", raw.coverage.geographic_gaps.join(", ")],
    ["Company gaps", raw.coverage.company_gaps.join(", ")],
    ["Layer gaps", raw.coverage.layer_gaps.join(", ")],
    ["Unknowns", raw.coverage.unknowns.join("; ")],
  ],
)}<ul>${raw.coverage.rules.map((x) => `<li>${esc(x)}</li>`).join("")}</ul><h2 id="sources">49 public primary sources</h2>${sourceLinks(raw.sources.map((s) => s.id))}</main><footer class="shell footer">Jordan's Lab · Public research snapshot ${esc(view.meta.asOf)}</footer></body></html>\n`;
const outputs = {
  "data/atlas.json": JSON.stringify(raw, null, 2) + "\n",
  "assets/atlas-data.js":
    "// Generated by infrastructure/scripts/build-atlas.cjs. Do not edit.\nwindow.INFRASTRUCTURE_ATLAS = " +
    JSON.stringify(view, null, 2).replaceAll("<", "\\u003c") +
    ";\n",
  "sources.html": staticHtml,
};
for (const [file, content] of Object.entries(outputs)) {
  const target = path.join(root, file);
  if (process.argv.includes("--check"))
    assert.equal(fs.readFileSync(target, "utf8"), content, `${file} is stale`);
  else fs.writeFileSync(target, content);
}
checks.push(
  "All generated views match the archived seven-part packet plus final review delta.",
);
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((k) => [k, canonical(value[k])]),
    );
  return value;
}
const report = {
  snapshot: raw.metadata.as_of,
  counts: raw.metadata.counts,
  checks,
  canonicalSha256: crypto
    .createHash("sha256")
    .update(JSON.stringify(canonical(raw)))
    .digest("hex"),
  canonicalMethod:
    "UTF-8 compact JSON; recursively sort object keys; preserve array order.",
  publication:
    "Held for parent source/semantics review and shared-navigation coordination.",
};
if (!process.argv.includes("--check"))
  fs.writeFileSync(
    path.join(root, "docs/data-validation.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
console.log(JSON.stringify(report, null, 2));
