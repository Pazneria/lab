"use strict";
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
module.exports = function buildEntityPages({ raw, view, root, check }) {
  const esc = (value) =>
    String(value ?? "Not established")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  const human = (value) => value?.replaceAll("_", " ") || "Not established";
  const sourceById = new Map(view.sources.map((s) => [s.id, s]));
  const entities = [
    ...view.players.map((p) => ({
      ...p,
      kind: "company",
      folder: "companies",
      detail: p.roles.join(" · "),
    })),
    ...view.sites.map((s) => ({
      ...s,
      kind: "facility",
      folder: "facilities",
      detail: `${s.layer} · ${s.location.label}`,
    })),
    ...view.products.map((p) => ({
      ...p,
      kind: "product",
      folder: "products",
      detail: p.type,
    })),
  ];
  const byId = new Map(entities.map((e) => [e.id, e]));
  for (const e of entities)
    assert(/^[a-z0-9-]+$/.test(e.id), `Unsafe entity ID ${e.id}`);
  const url = (id, base = "../../") => {
    const e = byId.get(id);
    return e
      ? `${base}${e.folder}/${e.id}/`
      : `${base}sources.html#${encodeURIComponent(id)}`;
  };
  const link = (id, label, base = "../../") =>
    `<a class="entity-link" data-entity="${esc(id)}" href="${url(id, base)}">${esc(label || byId.get(id)?.name || id)}</a>`;
  const sourceLinks = (ids = []) =>
    `<ul class="source-list">${[...new Set(ids)]
      .map((id) => {
        const s = sourceById.get(id);
        assert(s, `Missing page source ${id}`);
        const sourceUrl = new URL(s.url);
        assert(
          sourceUrl.protocol === "https:" &&
            !sourceUrl.username &&
            !sourceUrl.password,
          `Unsafe source URL ${id}`,
        );
        return `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.publisher)}: ${esc(s.title)}</a><small>${esc(human(s.sourceType))} · Published ${esc(s.publishedAt || "date not stated")} · Checked ${esc(s.accessedAt)}${s.note ? " · " + esc(s.note) : ""}</small></li>`;
      })
      .join("")}</ul>`;
  const citation = (ids = [], label = "Evidence and dates") =>
    ids.length
      ? `<details class="source-disclosure"><summary>${esc(label)}</summary>${sourceLinks(ids)}</details>`
      : "";
  const facts = (items) =>
    `<div class="facts entity-facts">${items.map((f) => `<article class="fact"><strong>${esc(f.value)}</strong><span class="fact-label">${esc(f.label)}</span><p>${esc(f.meaning)}</p><p class="status-note">As of ${esc(f.asOf || "date not stated")}</p>${citation(f.sourceIds, "Source")}</article>`).join("")}</div>`;
  const fields = (rows) =>
    `<dl class="detail-fields entity-fields">${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join("")}</dl>`;
  const groupName = {
    company: "Companies",
    facility: "Facilities",
    product: "Products",
  };
  const kindName = {
    company: "Company",
    facility: "Facility",
    product: "Product",
  };
  const status = (s) =>
    ({
      operating: "Operating",
      construction: "Under construction",
      announced: "Announced / planned",
      unknown: "Status not established",
      restart_in_progress: "Restart in progress",
      operating_estimated: "Operating capacity estimated",
      not_yet_operating_in_estimate: "No operating capacity in estimate",
    })[s] || human(s);
  const card = (e, base = "../../", label) =>
    `<article class="entity-card" data-kind="${e.kind}" data-search="${esc(`${e.name} ${e.detail} ${e.summary || e.description || ""}`.toLowerCase())}"><p class="eyebrow">${kindName[e.kind]}${e.kind === "facility" ? " · " + esc(e.layer) : ""}</p><h3><a href="${url(e.id, base)}">${esc(e.name)}</a></h3><p>${esc(e.detail)}</p>${e.status ? `<p class="status-note">${esc(status(e.status))}${e.asOf ? " · " + esc(e.asOf) : ""}</p>` : ""}${label ? `<p class="relationship-label">${esc(label)}</p>` : ""}</article>`;
  const cards = (items, empty, base = "../../") =>
    items.length
      ? `<div class="entity-grid">${items.map((e) => card(e, base)).join("")}</div>`
      : `<p class="empty">${esc(empty)}</p>`;
  const section = (id, title, body, intro = "") =>
    `<section class="entity-section" id="${id}" aria-labelledby="${id}-title"><div class="section-heading"><h2 id="${id}-title">${title}</h2>${intro ? `<p>${intro}</p>` : ""}</div>${body}</section>`;
  const evidence = require("./render-evidence.cjs")({
    esc,
    human,
    section,
    fields,
    citation,
    link,
    raw,
  });
  const search = (base) =>
    `<form class="entity-search" action="${base}directory/" role="search"><label for="entity-search">Find a company, facility or product</label><div><input id="entity-search" type="search" name="q" placeholder="Anthropic, Abilene, Blackwell…" maxlength="150"><button type="submit">Search</button></div></form>`;
  const head = (title, base, map = false) =>
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f7f5ef"><meta name="description" content="${esc(title)}: public infrastructure evidence, dated capacity claims and connected companies, facilities and products."><title>${esc(title)} — AI infrastructure · Jordan's Lab</title><link rel="icon" href="${base}../assets/mark.svg" type="image/svg+xml"><link rel="stylesheet" href="${base}assets/atlas.css"><link rel="stylesheet" href="${base}assets/entities.css">${map ? `<link rel="stylesheet" href="${base}assets/vendor/leaflet/leaflet.css"><script src="${base}assets/vendor/leaflet/leaflet.js" defer></script><script src="${base}assets/geography.js" defer></script><script src="${base}assets/map-config.js" defer></script><script src="${base}assets/geographic-map.js" defer></script><script src="${base}assets/atlas-data.js" defer></script>` : ""}<script src="${base}assets/entity-pages.js" defer></script></head><body class="entity-page"><a class="skip-link" href="#main">Skip to content</a><header class="shell masthead"><a class="brand" href="${base}"><span class="brand-mark" aria-hidden="true">J<span>²</span></span><span>Infrastructure <b>atlas</b></span></a><nav aria-label="Atlas navigation"><a href="${base}#geography">Map</a><a href="${base}directory/">All entities</a><a href="${base}sources.html">Sources</a><a href="${base}../lab-space/">Back to Lab ↗</a></nav></header>`;
  const footer = (base) =>
    `<footer class="shell footer"><a href="${base}">Jordan's Lab / Infrastructure</a><span>Dated public evidence · No global capacity totals</span><a href="${base}data/atlas.json">Dataset</a></footer></body></html>\n`;
  const mapHtml = (e, base) =>
    `<div class="geographic-frame"><div class="geographic-tools"><div class="zoom-buttons" role="group" aria-label="Map controls"><button type="button" data-map-action="zoom-in" aria-label="Zoom in">+</button><button type="button" data-map-action="zoom-out" aria-label="Zoom out">−</button><button type="button" data-map-action="fit">Fit facilities</button></div><label class="street-toggle"><input type="checkbox" data-street-layer> Street detail <span>(OpenStreetMap)</span></label></div><div class="geographic-map" data-facility-map="${e.id}" data-atlas-base="${base}"></div><p class="geographic-note" data-map-note>Bundled geography. Street detail loads external map tiles when requested. Zooming does not improve location evidence.</p><p class="map-attribution">Geography: <a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noopener noreferrer">Natural Earth</a> · Some location data &amp; optional street map: © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a> · <a href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noopener noreferrer">Report a map issue</a></p></div>`;
  function relationships(id, owned = []) {
    const relevant = new Set([id, ...owned]);
    const rows = view.relationships.filter(
      (r) =>
        relevant.has(r.from) ||
        relevant.has(r.to) ||
        r.siteId === id ||
        r.productId === id,
    );
    if (!rows.length)
      return '<p class="empty">No further relationship is established in this evidence set.</p>';
    return `<div class="relationship-grid">${rows.map((r) => `<article class="relation" data-relationship="${esc(r.id)}"><p class="scope">${esc(r.scope)} · ${esc(r.state)}</p><h3>${link(r.from)} <span aria-hidden="true">→</span> ${link(r.to)}</h3><p>${esc(r.summary)}</p>${fields([["Relationship", esc(r.kind)], ["Reported", esc(r.asOf || "Date not stated")], ...(r.siteId ? [["Facility", link(r.siteId)]] : []), ...(r.productId ? [["Product", link(r.productId)]] : [])])}${citation(r.sourceIds)}</article>`).join("")}</div>`;
  }
  function company(e) {
    const ownedProducts = view.products.filter((p) => p.designerId === e.id);
    const ownedSites = view.sites.filter(
      (s) => s.ownerIds.includes(e.id) || s.operatorIds.includes(e.id),
    );
    const linkedSites = view.sites.filter(
      (s) =>
        s.playerIds.includes(e.id) ||
        view.relationships.some(
          (r) =>
            (r.from === e.id && (r.to === s.id || r.siteId === s.id)) ||
            (r.to === e.id && (r.from === s.id || r.siteId === s.id)),
        ),
    );
    const labs = (raw.lab_profiles || []).find((p) => p.player_id === e.id);
    let html = labs ? evidence.lab(labs) : "";
    html += section(
      "facilities",
      "Connected facilities",
      linkedSites.length
        ? `<div class="entity-grid">${linkedSites.map((s) => card(byId.get(s.id), "../../", [s.ownerIds.includes(e.id) ? "Owner" : null, s.operatorIds.includes(e.id) ? "Operator" : null, s.customerIds.includes(e.id) ? "Customer / offtaker (see dated scope)" : null, s.hardwareOwnerIds.includes(e.id) ? "Hardware owner in Epoch" : null, s.estimatedUserIds.includes(e.id) ? "Estimated user in Epoch; confidence on facility page" : null].filter(Boolean).join(" · ") || "Other documented relationship; see the facility evidence")).join("")}</div>`
        : '<p class="empty">No facility is assigned to this company in this collection. That is a coverage gap, not evidence that it has no facilities.</p>',
      "Roles and proposed arrangements remain qualified by their sources.",
    );
    html += section(
      "products",
      "Products and systems",
      cards(
        ownedProducts.map((p) => byId.get(p.id)),
        "No designed product is established for this company in the current collection.",
      ),
    );
    if (e.facts.length)
      html += section(
        "investment",
        "Capital spending and investment",
        facts(e.facts),
      );
    if (e.programs.length)
      html += section(
        "programs",
        "Multisite programs",
        e.programs
          .map(
            (g) =>
              `<article class="program-card"><h3>${esc(g.name)}</h3><p>${esc(g.note)}</p>${facts(g.facts)}</article>`,
          )
          .join(""),
      );
    html += section(
      "relationships",
      "Partners and supply chain",
      relationships(e.id, [
        ...ownedProducts.map((p) => p.id),
        ...ownedSites.map((s) => s.id),
      ]),
      "A company-level partnership does not establish an exact facility or an allocated share of a cloud fleet.",
    );
    return html;
  }
  function facility(e) {
    const site = raw.sites.find((s) => s.id === e.id);
    const roleLinks = (ids) =>
      ids.length
        ? ids.map((id) => link(id)).join(", ")
        : "Not established in this record";
    let html = section(
      "overview",
      "Facility overview",
      fields([
        ["Facility type", esc(e.layer)],
        ["Locality", esc(e.location.label)],
        [
          "Last reported status",
          `${esc(status(e.status))} · ${esc(e.asOf || "date not stated")}`,
        ],
        ["Status scope", esc(e.statusNote || "No further scope stated")],
        ["Owner", roleLinks(e.ownerIds)],
        ["Operator", roleLinks(e.operatorIds)],
        ["Customer / offtaker", roleLinks(e.customerIds)],
        ["Process / technology", esc(e.process || "Not established")],
        ["Output", esc(e.products || "Not established")],
        ["Assignment scope", esc(e.customerScope)],
        ...(e.target ? [["Future milestone", esc(e.target)]] : []),
      ]),
    );
    html += section(
      "capacity",
      "Capacity and investment",
      (e.capacityEstimate ? evidence.capacity(e.capacityEstimate) : "") +
        (e.facts.length
          ? facts(e.facts)
          : e.capacityEstimate
            ? ""
            : '<p class="empty">No quantified capacity or site investment is established in this evidence set.</p>') +
        (e.unknowns ? `<p class="reading-note">${esc(e.unknowns)}</p>` : ""),
      "Each observation keeps its date, operating or future state, and measurement basis. Values are not added together.",
    );
    html += section(
      "location",
      "Location and precision",
      (Number.isFinite(e.location.lat) && Number.isFinite(e.location.lon)
        ? mapHtml(e, "../../")
        : '<p class="unknown-panel">A public address is recorded below. Coordinates have not been verified, so this facility has no map point.</p>') +
        fields([
          ["Marker precision", esc(e.location.precision)],
          [
            "Coordinate",
            Number.isFinite(e.location.lat)
              ? `${esc(e.location.lat)}, ${esc(e.location.lon)}`
              : "Not verified",
          ],
          ["Public address", esc(site.location.address || "Not stated")],
          ["Evidence basis", esc(site.location.coordinate_source)],
          [
            "Location scope",
            esc(site.location.location_note || site.location.display_label),
          ],
          [
            "Location confidence",
            esc(site.location.confidence || "Not assigned"),
          ],
          ["Source date", esc(site.location.source_date || "Date not stated")],
          [
            "Location checked",
            esc(site.location.verified_on || "Coordinates not verified"),
          ],
          [
            "Accuracy / boundary",
            esc(
              site.location.accuracy_note ||
                "No surveyed accuracy or legal property boundary claimed",
            ),
          ],
        ]) +
        citation(
          site.location.public_location_source_ids || [],
          "Location evidence",
        ),
      "A point identifies a sourced location or approximate area; it is not a surveyed site boundary.",
    );
    html += section(
      "products",
      "Products at this facility",
      cards(
        e.productIds.map((id) => byId.get(id)),
        "No exact product assignment is established at this facility.",
      ),
    );
    html += section(
      "relationships",
      "Facility relationships",
      relationships(e.id),
    );
    html += evidence.history(site.history);
    return html;
  }
  function product(e) {
    const matched = view.sites.filter((s) => s.productIds.includes(e.id));
    return (
      section(
        "overview",
        "Product and manufacturing",
        fields([
          ["Designer", link(e.designerId)],
          ["Product type", esc(e.type)],
          ["Process", esc(e.process)],
          ["Memory", esc(e.memory)],
        ]),
        "A disclosed process does not establish a specific manufacturing lot or facility.",
      ) +
      section(
        "facilities",
        "Public facility assignments",
        cards(
          matched.map((s) => byId.get(s.id)),
          "No exact facility is assigned to this product in this evidence set.",
        ),
      ) +
      section(
        "relationships",
        "Supply and deployment links",
        relationships(e.id),
      )
    );
  }
  const outputs = {};
  const collectSources = (record) => {
    if (!record || typeof record !== "object") return [];
    return Object.entries(record).flatMap(([key, value]) =>
      key === "source_ids" || key === "public_location_source_ids"
        ? value
        : collectSources(value),
    );
  };
  for (const e of entities) {
    const pageSources = [
      ...new Set([
        ...e.sourceIds,
        ...collectSources(
          e.kind === "company"
            ? raw.lab_profiles.find((p) => p.player_id === e.id)
            : e.kind === "facility"
              ? raw.sites.find((s) => s.id === e.id)
              : null,
        ),
      ]),
    ];
    const body =
      e.kind === "company"
        ? company(e)
        : e.kind === "facility"
          ? facility(e)
          : product(e);
    outputs[`${e.folder}/${e.id}/index.html`] =
      head(`${e.name} · ${kindName[e.kind]}`, "../../", e.kind === "facility") +
      `<main id="main" class="shell entity-shell" tabindex="-1" data-entity-id="${e.id}" data-entity-kind="${e.kind}"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../../">Atlas</a><span aria-hidden="true">/</span><a href="../../directory/?type=${e.kind}">${groupName[e.kind]}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(e.name)}</span></nav><header class="entity-hero"><p class="eyebrow">${kindName[e.kind]} · ${esc(e.detail)}</p><h1>${esc(e.name)}</h1><p class="entity-lede">${esc(e.summary || e.description || `${e.name} is a ${e.type} designed by ${byId.get(e.designerId)?.name || "the recorded designer"}.`)}</p>${e.kind === "facility" ? `<p class="location-identity">${esc(e.location.label)} <span class="status ${e.status}">${esc(status(e.status))}</span></p>` : ""}<p class="status-note">Public evidence snapshot · ${esc(view.meta.asOf)}</p></header>${search("../../")}<nav class="on-this-page" aria-label="On this page">${[...body.matchAll(/<section class="entity-section" id="([^"]+)"[^>]*><div class="section-heading"><h2[^>]*>([^<]+)<\/h2>/g)].map((m) => `<a href="#${m[1]}">${m[2]}</a>`).join("")}<a href="#sources">Sources</a></nav>${body}${section("sources", "Sources for this profile", sourceLinks(pageSources))}<p class="reading-note">The atlas records public evidence and explicit unknowns. It does not rank company capacity or infer ownership, customer allocations or current completion from a target date.</p></main>${footer("../../")}`;
  }
  outputs["directory/index.html"] =
    head("Company, facility and product directory", "../") +
    `<main id="main" class="shell entity-shell" tabindex="-1"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../">Atlas</a><span aria-hidden="true">/</span><span aria-current="page">Directory</span></nav><header class="entity-hero"><p class="eyebrow">The infrastructure directory</p><h1>Companies. Facilities.<br>Products.</h1><p class="entity-lede">Every name has a page. Follow a company to its public facilities, then trace the chips, systems and relationships that connect them.</p></header><form id="directory-search" class="directory-search" role="search"><label for="directory-query">Search all entities<input id="directory-query" name="q" type="search" maxlength="150" placeholder="Company, facility, city or product"></label><label for="directory-type">Entity type<select id="directory-type" name="type"><option value="all">All entities</option><option value="company">Companies</option><option value="facility">Facilities</option><option value="product">Products</option></select></label><button type="reset">Reset</button></form><p id="directory-count" class="result-count" role="status">${entities.length} entities</p><p id="directory-empty" class="empty" hidden>No entities match. Try a broader search or reset the filters.</p>${[
      "company",
      "facility",
      "product",
    ]
      .map(
        (kind) =>
          `<section class="directory-group" data-group="${kind}"><h2>${groupName[kind]}</h2>${cards(
            entities
              .filter((e) => e.kind === kind)
              .sort((a, b) => a.name.localeCompare(b.name)),
            "",
            "../",
          )}</section>`,
      )
      .join(
        "",
      )}<noscript><p class="reading-note">JavaScript is off. Every entity remains available below; use your browser's Find command.</p></noscript></main>${footer("../")}`;
  for (const [file, content] of Object.entries(outputs)) {
    const normalizedContent = content.replace(/[ \t]+\r?$/gm, "");
    const target = path.join(root, file);
    if (check)
      assert.equal(
        fs.readFileSync(target, "utf8"),
        normalizedContent,
        `${file} is stale`,
      );
    else {
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, normalizedContent);
    }
  }
  return { entityPages: entities.length, directoryPages: 1 };
};
