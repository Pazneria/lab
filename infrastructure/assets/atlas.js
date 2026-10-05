/* All displayed claims come from the public, versioned atlas dataset. */
(() => {
  "use strict";
  const data = window.INFRASTRUCTURE_ATLAS;
  if (!data || !Array.isArray(data.sites) || !Array.isArray(data.players))
    return;
  const $ = (s) => document.querySelector(s);
  const node = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const sourceById = new Map(data.sources.map((s) => [s.id, s]));
  const playerById = new Map(data.players.map((p) => [p.id, p]));
  const siteById = new Map(data.sites.map((s) => [s.id, s]));
  const names = new Map(
    [...data.players, ...data.sites, ...data.products].map((x) => [
      x.id,
      x.name,
    ]),
  );
  const productById = new Map(data.products.map((p) => [p.id, p]));
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
    restart_in_progress: "Restart in progress",
    unknown: "Status not established",
  };
  const stages = [
    {
      id: "designer",
      name: "Chip design",
      description: "Architectures & accelerators",
    },
    {
      id: "foundry",
      name: "Fabs & equipment",
      description: "Turning designs into wafers",
    },
    {
      id: "memory",
      name: "Memory & packaging",
      description: "Bandwidth & integration",
    },
    {
      id: "deployment",
      name: "Compute & cloud",
      description: "Buying & operating systems",
    },
    {
      id: "power",
      name: "Power & sites",
      description: "Energy & physical infrastructure",
    },
  ];
  const regions = {
    world: [-180, 180, -60, 85],
    americas: [-135, -50, 5, 65],
    europe: [-20, 45, 30, 70],
    asia: [95, 150, 0, 55],
  };
  const filters = $("#filters");
  const chainFilters = $("#chain-controls");
  let state;
  let visible = [];
  const safeUrl = (value) => {
    try {
      const u = new URL(value);
      return u.protocol === "https:" && !u.username && !u.password
        ? u.href
        : null;
    } catch {
      return null;
    }
  };
  const date = (value) => value || "Date not stated";
  function sources(ids = [], label = "Sources & dates") {
    const details = node("details", "source-disclosure");
    details.append(node("summary", "", label));
    const list = node("ol", "source-list");
    for (const id of [...new Set(ids)]) {
      const s = sourceById.get(id);
      if (!s) continue;
      const li = node("li");
      const url = safeUrl(s.url);
      const a = node(url ? "a" : "span", "", s.title);
      if (url) {
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      li.append(
        a,
        node(
          "small",
          "",
          `Published: ${date(s.publishedAt)} · Checked: ${date(s.accessedAt)}`,
        ),
      );
      if (s.note) li.append(node("small", "", s.note));
      list.append(li);
    }
    if (!list.children.length)
      list.append(node("li", "", "No source in this record."));
    details.append(list);
    return details;
  }
  function facts(items = []) {
    const wrap = node("div", "facts");
    for (const f of items) {
      const card = node("div", "fact");
      card.append(
        node("strong", "", f.value ?? "Not disclosed"),
        node("span", "fact-label", f.label),
        node("p", "", f.meaning),
        node("p", "", `As of ${date(f.asOf)}`),
      );
      if (f.sourceIds?.length) card.append(sources(f.sourceIds, "Fact source"));
      wrap.append(card);
    }
    return wrap;
  }
  function readState() {
    const p = new URLSearchParams(location.search);
    state = {
      q: (p.get("q") || "").slice(0, 150),
      type: types[p.get("type")] ? p.get("type") : "all",
      status: statuses[p.get("status")] ? p.get("status") : "all",
      player: playerById.has(p.get("player")) ? p.get("player") : "all",
      region: regions[p.get("region")] ? p.get("region") : "world",
      site: p.get("site"),
      profile: playerById.has(p.get("profile"))
        ? p.get("profile")
        : data.players[0]?.id,
      country: data.sites.some((s) => s.country === p.get("country"))
        ? p.get("country")
        : "all",
      role: ["owner", "operator", "customer", "partner"].includes(p.get("role"))
        ? p.get("role")
        : "all",
      evidence: [
        "site",
        "site_product",
        "product",
        "program",
        "company",
      ].includes(p.get("evidence"))
        ? p.get("evidence")
        : "all",
      product: productById.has(p.get("product")) ? p.get("product") : "all",
    };
    for (const key of ["q", "type", "status", "player", "country", "role"])
      filters.elements[key].value = state[key];
    for (const key of ["profile", "evidence", "product"])
      chainFilters.elements[key].value = state[key];
  }
  function save() {
    const p = new URLSearchParams();
    for (const key of [
      "q",
      "type",
      "status",
      "player",
      "region",
      "site",
      "profile",
      "country",
      "role",
      "evidence",
      "product",
    ]) {
      const v = state[key];
      if (v && v !== "all" && !(key === "region" && v === "world"))
        p.set(key, v);
    }
    try {
      history.replaceState(
        null,
        "",
        location.pathname + (p.size ? "?" + p : "") + location.hash,
      );
    } catch {
      /* file: / restrictive embedding */
    }
  }
  function relatedTo(site, id) {
    return (
      site.playerIds.includes(id) ||
      data.relationships.some(
        (r) =>
          (r.from === site.id && r.to === id) ||
          (r.to === site.id && r.from === id),
      )
    );
  }
  function roleMatches(site) {
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
  function searchText(site) {
    return [
      site.name,
      site.location.label,
      site.description,
      site.process,
      site.products,
      site.customers,
      ...site.playerIds.map((id) => names.get(id)),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }
  function chooseSite(id) {
    state.site = id;
    save();
    renderList();
    renderMap();
    renderSite();
    $("#site-detail").focus({ preventScroll: true });
    if (innerWidth < 761)
      $("#site-detail").scrollIntoView({ behavior: "auto", block: "start" });
  }
  function renderList() {
    const list = $("#site-list");
    list.replaceChildren();
    if (!visible.length) {
      const empty = node(
        "p",
        "empty",
        "No sites match. Try a broader search or reset the filters.",
      );
      list.append(empty);
      return;
    }
    for (const site of visible) {
      const b = node("button", "site-button");
      b.type = "button";
      b.setAttribute("aria-pressed", String(site.id === state.site));
      b.setAttribute("aria-controls", "site-detail");
      const info = node("span");
      info.append(
        node("strong", "", site.name),
        node("small", "", `${site.location.label} · ${statuses[site.status]}`),
      );
      b.append(
        node(
          "span",
          "number",
          String(data.sites.indexOf(site) + 1).padStart(2, "0"),
        ),
        info,
        node("span", "", "↗"),
      );
      b.addEventListener("click", () => chooseSite(site.id));
      list.append(b);
    }
  }
  function renderMap() {
    const viewport = $("#map-viewport"),
      points = $("#map-points");
    points.replaceChildren();
    const [west, east, south, north] = regions[state.region];
    const width = viewport.clientWidth,
      height = viewport.clientHeight;
    const img = $("#basemap");
    Object.assign(img.style, {
      width: `${(360 / (east - west)) * 100}%`,
      height: `${(145 / (north - south)) * 100}%`,
      left: `${((-180 - west) / (east - west)) * 100}%`,
      top: `${((north - 85) / (north - south)) * 100}%`,
    });
    document
      .querySelectorAll("[data-region]")
      .forEach((b) =>
        b.setAttribute(
          "aria-pressed",
          String(b.dataset.region === state.region),
        ),
      );
    const inView = visible.filter(
      (s) =>
        Number.isFinite(s.location.lon) &&
        Number.isFinite(s.location.lat) &&
        s.location.lon >= west &&
        s.location.lon <= east &&
        s.location.lat >= south &&
        s.location.lat <= north,
    );
    $("#site-count").textContent =
      `${visible.length} of ${data.sites.length} sites · ${inView.length} in map view`;
    $("#map-empty").hidden = inView.length > 0;
    $("#map-empty").textContent = visible.length
      ? "No matching sites in this region. Try World."
      : "No sites match these filters.";
    const groups = [];
    for (const site of inView) {
      const x = ((site.location.lon - west) / (east - west)) * width,
        y = ((north - site.location.lat) / (north - south)) * height;
      const group = groups.find((g) => Math.hypot(g.x - x, g.y - y) < 38);
      if (group) {
        group.sites.push(site);
      } else groups.push({ x, y, sites: [site] });
    }
    for (const group of groups) {
      const site = group.sites[0],
        multiple = group.sites.length > 1;
      const markerStatus = group.sites.every((s) => s.status === site.status)
        ? site.status
        : "mixed";
      const b = node(
        "button",
        `map-point ${markerStatus}${multiple ? " cluster-point" : ""}`,
        multiple ? String(group.sites.length) : "",
      );
      b.type = "button";
      Object.assign(b.style, {
        left: `${(group.x / width) * 100}%`,
        top: `${(group.y / height) * 100}%`,
      });
      const label = multiple
        ? `${group.sites.length} nearby sites: ${group.sites.map((s) => s.name).join(", ")}`
        : `${site.name}, ${site.location.label}, ${statuses[site.status]}`;
      b.setAttribute("aria-label", label);
      b.title = label;
      b.setAttribute(
        "aria-pressed",
        String(group.sites.some((s) => s.id === state.site)),
      );
      b.setAttribute("aria-controls", multiple ? "map-cluster" : "site-detail");
      b.addEventListener("click", () => {
        if (!multiple) {
          $("#map-cluster").hidden = true;
          chooseSite(site.id);
          return;
        }
        const panel = $("#map-cluster");
        panel.replaceChildren(
          node(
            "p",
            "eyebrow",
            `${group.sites.length} nearby sites / choose one`,
          ),
        );
        panel.hidden = false;
        for (const item of group.sites) {
          const pick = node(
            "button",
            "",
            `${item.name} · ${item.location.label}`,
          );
          pick.type = "button";
          pick.addEventListener("click", () => chooseSite(item.id));
          panel.append(pick);
        }
        const close = node("button", "cluster-close", "Close group");
        close.type = "button";
        close.addEventListener("click", () => {
          panel.hidden = true;
          b.focus();
        });
        panel.append(close);
        panel.focus({ preventScroll: true });
      });
      points.append(b);
    }
  }
  function field(dl, label, text) {
    const row = node("div");
    row.append(
      node("dt", "", label),
      node("dd", "", text || "Not publicly established in this record"),
    );
    dl.append(row);
  }
  function renderSite() {
    const target = $("#site-detail");
    target.replaceChildren();
    const site = siteById.get(state.site);
    if (!site) {
      const h = node("h3", "", "No matching site");
      h.id = "site-title";
      target.append(
        h,
        node(
          "p",
          "detail-description",
          "Reset a filter to explore a place and its sources.",
        ),
      );
      return;
    }
    target.append(
      node(
        "p",
        "eyebrow",
        `${String(data.sites.indexOf(site) + 1).padStart(2, "0")} / ${types[site.type]}`,
      ),
    );
    const h = node("h3", "", site.name);
    h.id = "site-title";
    target.append(
      h,
      node(
        "p",
        "location",
        `${site.location.label} · ${site.location.precision || "Approximate city position"}`,
      ),
      node("span", `status ${site.status}`, statuses[site.status]),
    );
    if (site.statusNote)
      target.append(node("p", "status-note", site.statusNote));
    target.append(
      node("p", "status-note", `Status as of ${date(site.asOf)}.`),
      node("p", "detail-description", site.description),
    );
    const dl = node("dl", "detail-fields");
    field(
      dl,
      "Companies & roles",
      site.roles || site.playerIds.map((id) => names.get(id)).join(", "),
    );
    if (
      ["fab", "research", "memory", "packaging", "assembly"].includes(site.type)
    ) {
      field(dl, "Process / technology", site.process);
      field(dl, "Products / output", site.products);
      field(dl, "Public customers / assignment", site.customers);
      field(
        dl,
        "Assignment scope",
        site.customerScope || "Exact fab allocation is not established.",
      );
    } else {
      field(dl, "Systems / output", site.products);
      field(dl, "Disclosed customer / offtaker", site.customers);
    }
    if (site.target) field(dl, "Target milestone", site.target);
    if (site.unknowns) field(dl, "What is not established", site.unknowns);
    target.append(dl, facts(site.facts), sources(site.sourceIds));
  }
  function selectProfile(id, focus = false) {
    state.profile = id;
    save();
    renderPlayer();
    chainFilters.elements.profile.value = id;
    document
      .querySelectorAll("[data-profile]")
      .forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.profile === id)),
      );
    if (focus) {
      $("#player-detail").focus({ preventScroll: true });
      if (innerWidth < 761)
        $("#player-detail").scrollIntoView({
          behavior: "auto",
          block: "start",
        });
    }
  }
  function entityLink(id) {
    const b = node("button", "entity-link", names.get(id));
    b.type = "button";
    b.dataset.entity = id;
    b.addEventListener("click", () => {
      if (playerById.has(id)) {
        selectProfile(id, true);
        return;
      }
      if (productById.has(id)) {
        state.product = id;
        chainFilters.elements.product.value = id;
        save();
        renderPlayer();
        return;
      }
      if (siteById.has(id)) {
        for (const key of [
          "q",
          "type",
          "status",
          "country",
          "role",
          "player",
        ]) {
          state[key] = key === "q" ? "" : "all";
          filters.elements[key].value = state[key];
        }
        state.site = id;
        state.region = "world";
        render();
        save();
        $("#site-detail").scrollIntoView({ behavior: "auto", block: "start" });
        $("#site-detail").focus({ preventScroll: true });
      }
    });
    return b;
  }
  function renderChain() {
    const target = $("#chain-stages");
    target.replaceChildren();
    stages.forEach((stage, index) => {
      const column = node("div", "stage");
      column.append(
        node(
          "span",
          "stage-index",
          `${String(index + 1).padStart(2, "0")} ${index < 4 ? "→" : ""}`,
        ),
        node("h3", "", stage.name),
        node("p", "", stage.description),
      );
      const players = data.players.filter(
        (p) => p.featured && p.stages.includes(stage.id),
      );
      for (const player of players) {
        const b = node("button", "", player.name);
        b.type = "button";
        b.dataset.profile = player.id;
        b.setAttribute("aria-pressed", String(player.id === state.profile));
        b.setAttribute("aria-controls", "player-detail");
        b.addEventListener("click", () => selectProfile(player.id, true));
        column.append(b);
      }
      if (!players.length)
        column.append(node("p", "", "No profile in this edition."));
      target.append(column);
    });
    renderPlayer();
  }
  function renderPlayer() {
    const target = $("#player-detail");
    target.replaceChildren();
    const player = playerById.get(state.profile);
    if (!player) return;
    const profile = node("div", "player-profile");
    profile.append(
      node("span", "eyebrow", "Player profile"),
      node("h3", "", player.name),
      node("p", "", player.summary),
      node("p", "status-note", player.roles.join(" · ")),
      facts(player.facts),
      sources(player.sourceIds, "Profile sources"),
    );
    const linked = data.sites.filter((s) => relatedTo(s, player.id));
    if (linked.length) {
      const b = node(
        "button",
        "profile-map",
        `Explore ${linked.length} linked site${linked.length === 1 ? "" : "s"} ↑`,
      );
      b.type = "button";
      b.addEventListener("click", () => {
        for (const key of ["q", "type", "status", "country", "role"]) {
          state[key] = key === "q" ? "" : "all";
          filters.elements[key].value = state[key];
        }
        filters.elements.player.value = player.id;
        state.player = player.id;
        state.region = "world";
        render();
        save();
        $("#geography").scrollIntoView({ behavior: "auto" });
        filters.elements.player.focus({ preventScroll: true });
      });
      profile.append(b);
    }
    for (const program of player.programs) {
      const block = node("details", "source-disclosure");
      block.append(
        node("summary", "", program.name + " · program scope"),
        node("p", "", program.note),
        facts(program.facts),
      );
      profile.append(block);
    }
    const ownedProducts = data.products.filter(
      (p) => p.designerId === player.id,
    );
    if (ownedProducts.length) {
      const block = node("details", "source-disclosure");
      block.append(
        node("summary", "", `Products & processes (${ownedProducts.length})`),
      );
      for (const p of ownedProducts) {
        const section = node("div", "product-card");
        section.append(
          node("h4", "", p.name),
          node("p", "", p.type),
          node("p", "", `Process: ${p.process}`),
          node("p", "", `Memory: ${p.memory}`),
          sources(p.sourceIds, "Product sources"),
        );
        block.append(section);
      }
      profile.append(block);
    }
    const relationships = node("div", "relations");
    const ownSites = data.sites
      .filter(
        (s) =>
          s.ownerIds.includes(player.id) || s.operatorIds.includes(player.id),
      )
      .map((s) => s.id);
    const relevant = new Set([
      player.id,
      ...ownSites,
      ...ownedProducts.map((p) => p.id),
    ]);
    const rows = data.relationships.filter(
      (r) =>
        (relevant.has(r.from) || relevant.has(r.to)) &&
        (state.evidence === "all" || r.scopeKey === state.evidence) &&
        (state.product === "all" ||
          r.productId === state.product ||
          r.from === state.product ||
          r.to === state.product),
    );
    const count = node(
      "p",
      "relationship-count",
      `${rows.length} documented link${rows.length === 1 ? "" : "s"} for this profile and its products / operated sites`,
    );
    count.setAttribute("role", "status");
    relationships.append(count);
    for (const r of rows) {
      const card = node("article", "relation");
      card.dataset.relationship = r.id;
      const heading = node("h4");
      heading.append(
        entityLink(r.from),
        document.createTextNode(" → "),
        entityLink(r.to),
      );
      card.append(
        node("span", "scope", `${r.scope} · ${r.state}`),
        heading,
        node("p", "", r.summary),
      );
      if (r.productId)
        card.append(
          node("p", "relation-product", `Product: ${names.get(r.productId)}`),
        );
      if (r.siteId)
        card.append(
          node("p", "relation-product", `Site: ${names.get(r.siteId)}`),
        );
      card.append(
        node("p", "status-note", `${r.kind} · Reported ${date(r.asOf)}`),
        sources(r.sourceIds, "Relationship sources"),
      );
      relationships.append(card);
    }
    if (!rows.length)
      relationships.append(
        node(
          "p",
          "empty",
          "No relationship matches these evidence and product filters for this player. Broaden the filters or choose another player.",
        ),
      );
    target.append(profile, relationships);
  }
  function renderChanges() {
    const target = $("#change-list");
    target.replaceChildren();
    for (const c of [...data.changes].sort((a, b) =>
      b.date.localeCompare(a.date),
    )) {
      const card = node("article", "change");
      const time = node("time", "", c.date);
      time.dateTime = c.date;
      card.append(
        time,
        node("h3", "", c.title),
        node("p", "", c.summary),
        sources(c.sourceIds),
      );
      target.append(card);
    }
    if (!data.changes.length)
      target.append(
        node("p", "empty", "No dated changes are included in this edition."),
      );
  }
  function render() {
    visible = data.sites.filter(
      (s) =>
        (state.type === "all" || s.type === state.type) &&
        (state.status === "all" || s.status === state.status) &&
        (state.player === "all" || relatedTo(s, state.player)) &&
        (state.country === "all" || s.country === state.country) &&
        roleMatches(s) &&
        searchText(s).includes(state.q.toLowerCase().trim()),
    );
    if (!visible.some((s) => s.id === state.site)) state.site = visible[0]?.id;
    $("#map-cluster").hidden = true;
    renderList();
    renderMap();
    renderSite();
  }
  for (const p of [...data.players].sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    const option = node("option", "", p.name);
    option.value = p.id;
    filters.elements.player.append(option);
  }
  for (const country of [...new Set(data.sites.map((s) => s.country))].sort()) {
    const o = node("option", "", country);
    o.value = country;
    filters.elements.country.append(o);
  }
  for (const p of data.players) {
    const o = node("option", "", p.name + (p.featured ? "" : " · partner"));
    o.value = p.id;
    chainFilters.elements.profile.append(o);
  }
  for (const p of data.products) {
    const o = node("option", "", p.name);
    o.value = p.id;
    chainFilters.elements.product.append(o);
  }
  chainFilters.addEventListener("submit", (e) => e.preventDefault());
  chainFilters.addEventListener("input", () => {
    state.evidence = chainFilters.elements.evidence.value;
    state.product = chainFilters.elements.product.value;
    selectProfile(chainFilters.elements.profile.value);
  });
  filters.addEventListener("submit", (e) => e.preventDefault());
  filters.addEventListener("input", () => {
    for (const key of ["q", "type", "status", "player", "country", "role"])
      state[key] = filters.elements[key].value;
    render();
    save();
  });
  filters.addEventListener("reset", () => {
    queueMicrotask(() => {
      state.q = "";
      state.type = "all";
      state.status = "all";
      state.player = "all";
      state.country = "all";
      state.role = "all";
      state.region = "world";
      render();
      save();
    });
  });
  document.querySelectorAll("[data-region]").forEach((b) =>
    b.addEventListener("click", () => {
      state.region = b.dataset.region;
      $("#map-cluster").hidden = true;
      renderMap();
      save();
    }),
  );
  $("#basemap").addEventListener("error", () => {
    $("#map-fallback").hidden = false;
  });
  if ($("#basemap").complete && !$("#basemap").naturalWidth)
    $("#map-fallback").hidden = false;
  $("#edition").textContent =
    `${data.meta.edition} · ${data.sites.length} sites · ${data.players.length} players · Sources checked ${data.meta.asOf}`;
  $("#footer-date").textContent = `Public source snapshot · ${data.meta.asOf}`;
  $("#load-error").hidden = true;
  $("#atlas").hidden = false;
  readState();
  render();
  renderChain();
  renderChanges();
  new ResizeObserver(() => renderMap()).observe($("#map-viewport"));
  window.addEventListener("popstate", () => {
    readState();
    render();
    selectProfile(state.profile);
  });
})();
