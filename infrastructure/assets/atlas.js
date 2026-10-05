/* Public evidence drives the map and directory; every entity has its own page. */
(() => {
  "use strict";
  const data = window.INFRASTRUCTURE_ATLAS;
  if (!data || !Array.isArray(data.sites) || !Array.isArray(data.players))
    return;
  const $ = (s) => document.querySelector(s);
  const node = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  };
  const names = new Map(
    [...data.players, ...data.sites, ...data.products].map((e) => [
      e.id,
      e.name,
    ]),
  );
  const byId = new Map(data.sites.map((s) => [s.id, s]));
  const players = new Map(data.players.map((p) => [p.id, p]));
  const sourceById = new Map(data.sources.map((s) => [s.id, s]));
  const types = {
    fab: "Logic fab",
    research: "Manufacturing R&D",
    memory: "Memory fab",
    packaging: "Advanced packaging",
    assembly: "Assembly / test",
    "data-center": "Compute site",
    power: "Power",
  };
  const statuses = {
    operating: "Operating",
    construction: "Under construction",
    announced: "Announced / planned",
    unknown: "Status not established",
    restart_in_progress: "Restart in progress",
    operating_estimated: "Operating capacity estimated",
    not_yet_operating_in_estimate: "No operating capacity in estimate",
  };
  const form = $("#filters");
  let state,
    visible = [],
    map,
    expanded = false;
  const keys = ["q", "type", "status", "player", "country", "role"];
  const href = (kind, id) => `${kind}/${encodeURIComponent(id)}/`;
  function read() {
    const p = new URLSearchParams(location.search);
    state = {
      q: (p.get("q") || "").slice(0, 150),
      type: types[p.get("type")] ? p.get("type") : "all",
      status: statuses[p.get("status")] ? p.get("status") : "all",
      player: players.has(p.get("player")) ? p.get("player") : "all",
      country: data.sites.some((s) => s.country === p.get("country"))
        ? p.get("country")
        : "all",
      role: [
        "owner",
        "operator",
        "customer",
        "partner",
        "hardwareOwner",
        "estimatedUser",
      ].includes(p.get("role"))
        ? p.get("role")
        : "all",
      site: byId.has(p.get("site")) ? p.get("site") : null,
    };
    for (const key of keys) form.elements[key].value = state[key];
  }
  function save() {
    const p = new URLSearchParams();
    for (const key of [...keys, "site"])
      if (state[key] && state[key] !== "all") p.set(key, state[key]);
    try {
      history.replaceState(
        null,
        "",
        location.pathname + (p.size ? "?" + p : "") + location.hash,
      );
    } catch {}
  }
  const related = (s, id) =>
    s.playerIds.includes(id) ||
    data.relationships.some(
      (r) =>
        (r.from === s.id && r.to === id) || (r.to === s.id && r.from === id),
    );
  function matchesRole(site) {
    if (state.role === "all") return true;
    if (state.role === "partner")
      return data.relationships.some(
        (r) =>
          (r.siteId === site.id || r.from === site.id || r.to === site.id) &&
          (state.player === "all" ||
            r.from === state.player ||
            r.to === state.player),
      );
    const ids = site[state.role + "Ids"];
    return state.player === "all" ? ids.length > 0 : ids.includes(state.player);
  }
  function choose(id, focusMap = false) {
    state.site = id;
    renderPreview();
    map?.setSites(visible, id);
    save();
    if (focusMap) {
      map?.focusSite(byId.get(id));
      $("#geographic-map").scrollIntoView({
        block: "center",
        behavior: "auto",
      });
      $("#geographic-map").focus({ preventScroll: true });
    } else if (innerWidth < 761) {
      $("#site-detail").scrollIntoView({ block: "start", behavior: "auto" });
      $("#site-detail").focus({ preventScroll: true });
    }
  }
  function renderPreview() {
    const target = $("#site-detail");
    target.replaceChildren();
    const site = byId.get(state.site);
    const heading = node("h3", "", site?.name || "No matching facility");
    heading.id = "site-title";
    if (!site) {
      target.append(
        heading,
        node("p", "", "Reset a filter to explore a facility and its sources."),
      );
      return;
    }
    const open = node("a", "entity-page-link", "Open facility page →");
    open.href = href("facilities", site.id);
    const locate = node("button", "map-locate", "Zoom to location");
    locate.type = "button";
    locate.addEventListener("click", () => choose(site.id, true));
    target.append(
      node("p", "eyebrow", `Facility · ${types[site.type]}`),
      heading,
      node("p", "location", site.location.label),
      node("span", `status ${site.status}`, statuses[site.status]),
      node(
        "p",
        "status-note",
        `Status as of ${site.asOf || "date not stated"}`,
      ),
      node("p", "", site.description),
      node("p", "status-note", site.location.precision),
      node("p", "status-note", site.location.note),
      open,
    );
    if (
      Number.isFinite(site.location.lat) &&
      Number.isFinite(site.location.lon)
    )
      target.append(locate);
  }
  function renderList() {
    const target = $("#site-list");
    target.replaceChildren();
    $("#site-count").textContent =
      `${visible.length} of ${data.sites.length} facilities · ${visible.filter((s) => Number.isFinite(s.location.lat)).length} with reviewed map locations`;
    if (!visible.length) {
      target.append(
        node(
          "p",
          "empty",
          "No facilities match. Try a broader search or reset the filters.",
        ),
      );
      return;
    }
    const shown = expanded ? visible : visible.slice(0, 12);
    for (const site of shown) {
      const card = node("article", "entity-card");
      card.dataset.site = site.id;
      const h = node("h3"),
        a = node("a", "", site.name);
      a.href = href("facilities", site.id);
      h.append(a);
      const locate = node("button", "map-locate", "Locate on map");
      locate.type = "button";
      locate.setAttribute("aria-label", `Locate ${site.name} on map`);
      locate.addEventListener("click", () => choose(site.id, true));
      card.append(
        node("p", "eyebrow", `Facility · ${types[site.type]}`),
        h,
        node("p", "", site.location.label),
        node(
          "p",
          "status-note",
          `${statuses[site.status]} · ${site.asOf || "date not stated"}`,
        ),
      );
      if (
        Number.isFinite(site.location.lat) &&
        Number.isFinite(site.location.lon)
      )
        card.append(locate);
      else
        card.append(
          node("p", "status-note", "Address only · coordinates not verified"),
        );
      target.append(card);
    }
    if (shown.length < visible.length) {
      const more = node(
        "button",
        "show-facilities",
        `Show all ${visible.length} matching facilities`,
      );
      more.type = "button";
      more.addEventListener("click", () => {
        const nextId = visible[shown.length].id;
        expanded = true;
        renderList();
        target.querySelector(`[data-site="${nextId}"] a`).focus();
      });
      target.append(more);
    }
  }
  function render() {
    visible = data.sites.filter(
      (s) =>
        (state.type === "all" || s.type === state.type) &&
        (state.status === "all" || s.status === state.status) &&
        (state.player === "all" || related(s, state.player)) &&
        (state.country === "all" || s.country === state.country) &&
        matchesRole(s) &&
        [
          s.name,
          s.location.label,
          s.description,
          s.process,
          s.products,
          s.customers,
          ...s.playerIds.map((id) => names.get(id)),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(state.q.trim().toLowerCase()),
    );
    if (!visible.some((s) => s.id === state.site)) state.site = visible[0]?.id;
    renderList();
    renderPreview();
    map?.setSites(visible, state.site);
  }
  for (const p of [...data.players].sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    const o = node("option", "", p.name);
    o.value = p.id;
    form.elements.player.append(o);
  }
  for (const c of [...new Set(data.sites.map((s) => s.country))].sort()) {
    const o = node("option", "", c);
    o.value = c;
    form.elements.country.append(o);
  }
  const stages = [
    {
      id: "designer",
      name: "Chip design",
      description: "Architectures and accelerators",
    },
    {
      id: "foundry",
      name: "Fabs & equipment",
      description: "Manufacturing the silicon",
    },
    {
      id: "memory",
      name: "Memory & packaging",
      description: "Bandwidth and integration",
    },
    {
      id: "deployment",
      name: "Compute & cloud",
      description: "Labs, customers and operators",
    },
    {
      id: "power",
      name: "Power & sites",
      description: "Energy and physical infrastructure",
    },
  ];
  stages.forEach((stage, i) => {
    const col = node("div", "stage");
    col.append(
      node("span", "stage-index", String(i + 1).padStart(2, "0")),
      node("h3", "", stage.name),
      node("p", "", stage.description),
    );
    for (const p of data.players.filter(
      (p) => p.featured && p.stages.includes(stage.id),
    )) {
      const a = node("a", "", p.name);
      a.href = href("companies", p.id);
      a.dataset.profile = p.id;
      col.append(a);
    }
    $("#chain-stages").append(col);
  });
  for (const c of [...data.changes].sort((a, b) =>
    b.date.localeCompare(a.date),
  )) {
    const card = node("article", "change");
    const time = node("time", "", c.date);
    time.dateTime = c.date;
    card.append(time, node("h3", "", c.title), node("p", "", c.summary));
    const details = node("details", "source-disclosure");
    details.append(node("summary", "", "Sources and dates"));
    for (const id of c.sourceIds) {
      const s = sourceById.get(id);
      if (!s) continue;
      let url;
      try {
        url = new URL(s.url);
        if (url.protocol !== "https:" || url.username || url.password) continue;
      } catch {
        continue;
      }
      const p = node("p");
      const a = node("a", "", s.title);
      a.href = url.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      p.append(
        a,
        node(
          "small",
          "",
          `Published ${s.publishedAt || "date not stated"} · Checked ${s.accessedAt}`,
        ),
      );
      details.append(p);
    }
    card.append(details);
    $("#change-list").append(card);
  }
  $("#load-error").hidden = true;
  $("#atlas").hidden = false;
  $("#edition").textContent =
    `${data.sites.length} facilities · ${data.players.length} companies · ${data.products.length} products · Evidence snapshot ${data.meta.asOf}`;
  $("#footer-date").textContent = `Public source snapshot · ${data.meta.asOf}`;
  read();
  if (window.AtlasMap)
    map = window.AtlasMap.create($("#geographic-map"), {
      onSelect: (id) => choose(id),
      base: "./",
    });
  else
    $("#geographic-map").append(
      node(
        "p",
        "map-unavailable",
        "The map could not load. Use the complete facility directory below.",
      ),
    );
  render();
  map?.fit();
  if (new URLSearchParams(location.search).has("site"))
    map?.focusSite(byId.get(state.site));
  form.addEventListener("submit", (e) => e.preventDefault());
  form.addEventListener("input", () => {
    expanded = false;
    for (const key of keys) state[key] = form.elements[key].value;
    render();
    save();
  });
  form.addEventListener("reset", () =>
    queueMicrotask(() => {
      expanded = false;
      for (const key of keys) state[key] = key === "q" ? "" : "all";
      render();
      map?.fit();
      save();
    }),
  );
  window.addEventListener("popstate", () => {
    read();
    render();
  });
})();
