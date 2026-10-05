"use strict";
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const clone = (x) => JSON.parse(JSON.stringify(x));
const decode = (x) => {
  if (typeof x === "string")
    return x.replaceAll("&amp;", "&").replaceAll("&lt;", "<");
  if (Array.isArray(x)) return x.map(decode);
  if (x && typeof x === "object")
    return Object.fromEntries(
      Object.entries(x).map(([k, v]) => [k, decode(v)]),
    );
  return x;
};
module.exports = function extendAtlas(raw, root) {
  const read = (name) =>
    JSON.parse(fs.readFileSync(path.join(root, "data", name), "utf8"));
  const originalSiteIds = new Set(raw.sites.map((s) => s.id));
  const records = [];
  for (let i = 1; i <= 11; i++) {
    const p = read(`profiles/research-part-${String(i).padStart(2, "0")}.json`);
    assert.equal(p.chunk_index, i);
    assert.equal(p.chunk_count, 11);
    records.push(...p.records);
  }
  const ofKind = (kind) =>
    records.filter((r) => r.kind === kind).map((r) => decode(clone(r.value)));
  const profiles = ofKind("profile"),
    addedSources = ofKind("source"),
    essential = ofKind("capacity_site");
  assert.equal(profiles.length, 7);
  assert.equal(addedSources.length, 48);
  assert.equal(essential.length, 20);
  const reviewCorrections = read("profiles/review-corrections.json");
  assert.equal(reviewCorrections.sources.length, 2);
  addedSources.push(...reviewCorrections.sources);
  for (const update of reviewCorrections.model_source_additions) {
    const model = profiles
      .find((p) => p.player_id === update.player_id)
      ?.flagship_models.find((m) => m.name === update.model);
    assert(model, `Missing corrected model ${update.model}`);
    model.source_ids = [
      ...new Set([...model.source_ids, ...update.source_ids]),
    ];
  }
  const locations = [];
  for (let i = 1; i <= 5; i++) {
    const p = read(
      `locations/research-part-${String(i).padStart(2, "0")}.json`,
    );
    assert.equal(p.part, i);
    assert.equal(p.parts, 5);
    locations.push(...decode(p.sites));
    addedSources.push(...decode(p.sources));
    if (p.metadata_patch) Object.assign(raw.metadata, p.metadata_patch);
  }
  assert.equal(locations.length, 25);
  assert.equal(new Set(locations.map((s) => s.site_id)).size, 25);
  const sourceById = new Map(raw.sources.map((s) => [s.id, s]));
  raw.source_versions = [];
  for (const s of addedSources) {
    const old = sourceById.get(s.id);
    if (old && JSON.stringify(old) !== JSON.stringify(s))
      raw.source_versions.push({
        id: s.id,
        previous: clone(old),
        replacement: clone(s),
        reason:
          "Profile or location research update; original packet retained.",
      });
    sourceById.set(s.id, s);
  }
  raw.sources = [...sourceById.values()];
  for (const s of raw.sources) {
    const u = new URL(s.url);
    assert.equal(u.protocol, "https:");
    assert(!u.username && !u.password);
    assert(s.retrieved_at);
    assert(s.source_type);
  }
  for (const update of locations) {
    const site = raw.sites.find((s) => s.id === update.site_id);
    assert(site, update.site_id);
    assert.equal(update.location.footprint, null);
    assert.equal(update.location.accuracy_m, null);
    assert(
      update.location.public_location_source_ids.every((id) =>
        sourceById.has(id),
      ),
    );
    site.location_history = [clone(site.location)];
    site.location = update.location;
  }
  const epoch = read("profiles/epoch-sites-2026-10-05.json");
  assert.equal(epoch.site_count, 75);
  assert.equal(epoch.sites.length, 75);
  assert.equal(epoch.as_of, "2026-10-05");
  const recipe = ofKind("fetch_recipe")[0];
  assert.deepEqual(epoch.source_snapshots, recipe.inputs);
  for (const site of essential) {
    const imported = epoch.sites.find((s) => s.id === site.id);
    assert(imported, site.id);
    for (const [key, value] of Object.entries(site))
      assert.deepEqual(imported[key], value, `${site.id}.${key}`);
  }
  // These two names refer to the same Nscale Narvik project, not separate capacities.
  const siteAliases = { "epoch-microsoft-narvik-norway": "stargate-norway" };
  const canonicalSite = (id) => siteAliases[id] || id;
  raw.site_aliases = [
    {
      alias: "epoch-microsoft-narvik-norway",
      canonical_id: "stargate-norway",
      reason:
        "Nscale's April 2026 Narvik update supersedes the historical Stargate proposal for the same campus.",
      source_ids: ["nscale-narvik-2026"],
    },
  ];
  const nameIds = new Map(raw.players.map((p) => [p.name, p.id]));
  for (const [name, id] of Object.entries({
    Google: "google",
    "Google DeepMind": "google",
    Amazon: "amazon",
    AWS: "amazon",
    SpaceXAI: "xai",
    Microsoft: "microsoft",
    "Oracle Cloud Infrastructure": "oracle",
  }))
    nameIds.set(name, id);
  const ensurePlayer = (person) => {
    let id = person.player_id || nameIds.get(person.name);
    if (!id) {
      id = person.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      raw.players.push({
        id,
        name: person.name,
        roles: ["documented_infrastructure_participant"],
        description:
          "Named in the public Epoch AI infrastructure dataset. Hardware ownership, facility ownership and customer access remain separate roles.",
        source_ids: ["epoch-dc", "epoch-dc-csv"],
        featured: false,
        site_ids: [],
      });
      nameIds.set(person.name, id);
    }
    assert(raw.players.some((p) => p.id === id));
    return { ...person, player_id: id };
  };
  for (const original of epoch.sites) {
    const estimate = decode(clone(original));
    estimate.source_dataset_id = estimate.id;
    estimate.id = canonicalSite(estimate.id);
    estimate.hardware_owners = estimate.hardware_owners.map(ensurePlayer);
    estimate.users = estimate.users.map(ensurePlayer);
    const operatorId =
      estimate.operator_name && nameIds.get(estimate.operator_name);
    let site = raw.sites.find((s) => s.id === estimate.id);
    if (!site) {
      site = {
        id: estimate.id,
        name: estimate.name,
        layer: "data_center",
        country: estimate.country,
        region: null,
        locality: estimate.location_label || estimate.country,
        location: {
          latitude: null,
          longitude: null,
          precision: "not_verified",
          display_label:
            "Published address or locality only; coordinates not verified",
          coordinate_source:
            "Epoch's public address field; no geocode inferred",
          public_location_source_ids: ["epoch-dc-csv"],
          address: estimate.location_label || null,
          source_date: "2026-10-02",
          verified_on: "2026-10-05",
          confidence: "not_established",
          accuracy_m: null,
          accuracy_note: "No coordinate or footprint inferred from the address",
          recommended_zoom: null,
          footprint: null,
          location_note:
            "The public dataset does not supply coordinates. This record is available in the directory but is not plotted.",
        },
        owner_ids: null,
        operator_ids: operatorId ? [operatorId] : null,
        customer_ids: null,
        product_ids: [],
        outputs: ["AI computing"],
        process_nodes: [],
        last_reported_status: estimate.status,
        status_reported_at: estimate.evidence_at,
        status_note:
          "Status is an independent reconstruction of available site capacity, not a live operating audit or meter reading.",
        verified_on: "2026-10-05",
        summary:
          "AI infrastructure site included in Epoch AI's public research. Exact customer allocations and metered consumption are not established.",
        source_ids: [...estimate.source_ids],
        target: null,
        capacity_observations: [],
        energized_power_mw: null,
        it_load_mw: null,
        facility_power_mw: null,
        annual_wafer_capacity: null,
      };
      raw.sites.push(site);
    }
    site.capacity_estimate = estimate;
    for (const p of [...estimate.hardware_owners, ...estimate.users]) {
      const player = raw.players.find((x) => x.id === p.player_id);
      if (!player.site_ids.includes(site.id)) player.site_ids.push(site.id);
    }
  }
  raw.lab_profiles = profiles;
  for (const p of profiles) {
    const player = raw.players.find((x) => x.id === p.player_id);
    assert(player, p.player_id);
    player.description = p.summary;
    if (!player.roles.includes("ai_lab")) player.roles.push("ai_lab");
    p.site_ids = p.site_ids.map(canonicalSite);
    p.major_site_ids = p.major_site_ids.map(canonicalSite);
    p.operating_power.covered_owned_ai_sites.site_ids =
      p.operating_power.covered_owned_ai_sites.site_ids.map(canonicalSite);
    for (const id of p.site_ids) {
      assert(
        raw.sites.some((s) => s.id === id),
        `${p.player_id} missing site ${id}`,
      );
      if (!player.site_ids.includes(id)) player.site_ids.push(id);
    }
    assert.equal(p.operating_power.lab_wide_power_w, null);
    assert.equal(p.operating_power.lab_wide_power_mw, null);
    assert.equal(p.operating_power.aggregation_allowed, false);
    assert.equal(
      p.operating_power.covered_owned_ai_sites.aggregation_allowed_as_lab_total,
      false,
    );
    for (const t of p.training_compute)
      assert(t.evidence_status && t.reason && t.source_ids.length);
  }
  const norway = raw.sites.find((s) => s.id === "stargate-norway");
  norway.history = [
    {
      as_of: norway.status_reported_at,
      summary: norway.summary,
      status_note: norway.status_note,
      target: clone(norway.target),
      capacity_observations: clone(norway.capacity_observations),
      source_ids: clone(norway.source_ids),
    },
  ];
  norway.name = "Nscale Narvik / historical Stargate Norway";
  norway.summary =
    "Nscale solely manages the Narvik project following the Aker joint-venture roll-up. The April 2026 update names an expanded Microsoft agreement; current OpenAI allocation remains unverified.";
  norway.status_note =
    "Announced campus and expanded Microsoft agreement; operational delivery is not established by the April 2026 update.";
  norway.status_reported_at = "2026-04-14";
  norway.operator_ids = null;
  norway.owner_ids = null;
  norway.customer_ids = ["microsoft"];
  norway.target = {
    event: "Additional 30,000+ NVIDIA Rubin GPUs",
    period: "2027",
    certainty: "company_target",
  };
  norway.source_ids.push("nscale-narvik-2026");
  norway.capacity_observations = [
    {
      value: 230,
      unit: "MW",
      basis: "capacity_definition_unspecified",
      state: "planned",
      label: "Narvik campus capacity; no exclusive customer allocation",
      period: null,
      qualifier: "approximately",
      scope_id: "stargate-norway",
      source_ids: ["nscale-narvik-2026"],
      additive: false,
    },
  ];
  for (const r of raw.relationships.filter(
    (r) => r.site_id === "stargate-norway",
  )) {
    r.state = "historical_proposal";
    r.description +=
      " Historical July 2025 proposal; the April 2026 Nscale update supersedes the joint-venture/customer story. Current OpenAI allocation is unverified.";
  }
  raw.relationships.push(
    {
      id: "e-nscale-narvik-current",
      from_id: "nscale",
      to_id: "stargate-norway",
      type: "manages_project",
      evidence_scope: "site",
      site_id: "stargate-norway",
      product_id: null,
      state: "company_reported_project_management",
      reported_at: "2026-04-14",
      source_ids: ["nscale-narvik-2026"],
      description:
        "Nscale solely manages the Narvik campus following the Aker joint-venture roll-up. This does not establish operational delivery.",
      quantity: null,
      allocation_share: null,
    },
    {
      id: "e-microsoft-narvik-current",
      from_id: "stargate-norway",
      to_id: "microsoft",
      type: "contracted_compute_access",
      evidence_scope: "site",
      site_id: "stargate-norway",
      product_id: null,
      state: "announced_or_contracted",
      reported_at: "2026-04-14",
      source_ids: ["nscale-narvik-2026"],
      description:
        "Expanded Microsoft agreement includes 30,000+ Rubin GPUs for 2027. The 230 MW campus figure is not a disclosed exclusive Microsoft allocation.",
      quantity: null,
      allocation_share: null,
    },
  );
  raw.metadata.location_data_attribution =
    "Location references derived from OpenStreetMap: © OpenStreetMap contributors, ODbL (https://www.openstreetmap.org/copyright). Other references retain their per-record sources.";
  raw.schema_version = "0.2.0";
  Object.assign(raw.metadata, {
    publication_state: "reviewed_for_publication",
    evidence_policy: ofKind("metadata")[0].evidence_policy,
    capacity_source_attribution: epoch.attribution,
    counts: {
      players: raw.players.length,
      featured_players: raw.players.filter((p) => p.featured).length,
      sites: raw.sites.length,
      products: raw.products.length,
      relationships: raw.relationships.length,
      sources: raw.sources.length,
      lab_profiles: profiles.length,
      mapped_sites: locations.length,
      estimated_sites: 75,
    },
  });
  raw.research_provenance = {
    profile_packet_count: 11,
    location_packet_count: 5,
    final_review_corrections: reviewCorrections,
    capacity_snapshot_hashes: epoch.source_snapshots,
    raw_csv_publication:
      "Only filtered normalized records are published; unfiltered CSV audit snapshots stay outside the site.",
    field_normalization:
      "Literal HTML entities decoded in merged text; archived packets retain supplied text.",
  };
  raw.coverage.description =
    "Public company and technical sources across the AI supply chain, extended by attributed independent capacity estimates. Representative coverage; no global capacity or spending totals.";
  raw.coverage.company_gaps = raw.coverage.company_gaps.filter(
    (x) => x !== "CoreWeave",
  );
  raw.coverage.geographic_gaps = raw.coverage.geographic_gaps.map((x) =>
    x === "Middle East" ? "Middle East beyond the selected UAE project" : x,
  );
  raw.coverage.rules = raw.coverage.rules.map((x) =>
    x.startsWith("All map coordinates") ? raw.metadata.map_policy : x,
  );
  raw.coverage.rules.push(
    "Epoch figures are dated independent estimates of installed/available site capacity, not measured demand. A zero means no operating capacity is counted in that model.",
    "Hardware owner, facility owner, operator and compute customer are distinct. Site power cannot be wholly allocated to every user.",
    "Model-training FLOPs, hardware FLOP/s, electrical power and energy are different quantities.",
  );
  const validateRefs = (x) => {
    if (!x || typeof x !== "object") return;
    for (const [k, v] of Object.entries(x)) {
      if (k === "source_ids" || k === "public_location_source_ids")
        for (const id of v)
          assert(sourceById.has(id), `Missing new source ${id}`);
      else validateRefs(v);
    }
  };
  validateRefs(raw);
  assert.equal(
    raw.sites.filter((s) => Number.isFinite(s.location.latitude)).length,
    25,
  );
  assert.equal(
    raw.sites.filter((s) => s.location.precision.startsWith("approximate_"))
      .length,
    3,
  );
  assert(raw.sites.every((s) => s.location.footprint === null));
  assert.equal(
    raw.lab_profiles.find((p) => p.player_id === "microsoft")
      .training_compute[0].total_training_compute_flop,
    null,
  );
  assert.equal(
    raw.lab_profiles.find((p) => p.player_id === "openai").training_compute[0]
      .total_training_compute_flop,
    1e27,
  );
  assert.equal(raw.sites.filter((s) => s.id === "stargate-norway").length, 1);
  return {
    profiles: 7,
    profile_sources: 48,
    review_sources: 2,
    location_patches: 25,
    location_sources: 40,
    estimated_sites: 75,
    canonical_sites: raw.sites.length,
    original_sites_preserved: [...originalSiteIds].every((id) =>
      raw.sites.some((s) => s.id === id),
    ),
  };
};
