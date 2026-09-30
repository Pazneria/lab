(() => {
  "use strict";

  const categories = {
    community: "Independent & general",
    games: "Games",
    medical: "Medical evidence",
    physical: "Robots & cars",
  };
  const statuses = {
    historical: "Historical",
    live: "Live",
    ongoing: "Ongoing",
    unverified: "Unverified",
  };
  const settings = {
    "real-trial": "Real trial / physical test",
    simulation: "Simulation",
    case: "Showcase / case study",
    game: "Virtual game / construction",
    dataset: "Dataset / retrospective tasks",
    sandbox: "Computer sandbox",
    observation: "Real-world observation",
    mixed: "Mixed",
    other: "Other",
    unverified: "Unverified setting",
  };
  const form = document.getElementById("filters");
  const results = document.getElementById("results");
  const empty = document.getElementById("empty-state");
  const collator = new Intl.Collator("en", { sensitivity: "base" });

  function text(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  function validDate(value) {
    if (value === null) return true;
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
      return false;
    const parsed = new Date(value + "T00:00:00Z");
    return (
      !Number.isNaN(parsed.getTime()) &&
      parsed.toISOString().slice(0, 10) === value
    );
  }

  function sourceURL(value) {
    try {
      const parsed = new URL(value);
      return (
        text(value) &&
        ["https:", "http:"].includes(parsed.protocol) &&
        !parsed.username &&
        !parsed.password
      );
    } catch {
      return false;
    }
  }

  // Validate the generated display projection before showing any records.
  // Reject an incomplete projection rather than silently dropping evidence.
  function validateCatalog(value) {
    if (!value || value.schemaVersion !== 1 || !Array.isArray(value.entries))
      return false;
    if (!["available", "unavailable"].includes(value.availability))
      return false;
    if (!validDate(value.verifiedAt)) return false;
    if (value.availability === "unavailable")
      return (
        value.entries.length === 0 &&
        value.basis === null &&
        value.verifiedAt === null
      );
    if (!text(value.basis)) return false;
    const ids = new Set();
    return value.entries.every((entry) => {
      if (
        !entry ||
        !text(entry.id) ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id) ||
        ids.has(entry.id)
      )
        return false;
      ids.add(entry.id);
      if (
        !text(entry.name) ||
        !text(entry.summary) ||
        !text(entry.evidenceType) ||
        !text(entry.sourceBasis) ||
        !text(entry.nextVerification)
      )
        return false;
      if (
        !Array.isArray(entry.categories) ||
        !entry.categories.length ||
        entry.categories.some(
          (category) => !Object.hasOwn(categories, category),
        )
      )
        return false;
      if (
        !Object.hasOwn(statuses, entry.status) ||
        !Object.hasOwn(settings, entry.setting) ||
        !validDate(entry.verifiedAt)
      )
        return false;
      if (
        entry.score !== null ||
        !Array.isArray(entry.limitations) ||
        !entry.limitations.length ||
        entry.limitations.some((limit) => !text(limit))
      )
        return false;
      if (!Array.isArray(entry.sources) || !entry.sources.length) return false;
      if (
        entry.metrics &&
        (!Array.isArray(entry.metrics) ||
          entry.metrics.some((metric) => metric.value !== null))
      )
        return false;
      return entry.sources.every(
        (source) =>
          source &&
          text(source.title) &&
          text(source.basis) &&
          sourceURL(source.url) &&
          validDate(source.publishedAt),
      );
    });
  }

  let catalog = window.LAB_CATALOG;
  const invalid = !validateCatalog(catalog);
  if (invalid)
    catalog = {
      availability: "unavailable",
      entries: [],
      basis: null,
      verifiedAt: null,
    };
  const entries = [...catalog.entries].sort((a, b) =>
    collator.compare(a.name, b.name),
  );

  function el(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  }

  function dated(value) {
    return value === null ? "Not recorded" : value;
  }

  function block(title, content) {
    const node = el("div");
    node.append(el("h4", "", title), el("p", "", content));
    return node;
  }

  function renderEntry(entry) {
    const article = el("article", "entry");
    article.id = "benchmark-" + entry.id;
    article.dataset.entryType = entry.entryType || "benchmark";
    article.setAttribute("aria-labelledby", "title-" + entry.id);
    const tags = el("div", "entry-top");
    for (const category of entry.categories)
      tags.append(el("span", "tag", categories[category]));
    tags.append(
      el("span", "tag status-" + entry.status, statuses[entry.status]),
      el("span", "tag", settings[entry.setting]),
    );
    const heading = el("h3", "", entry.name);
    const types = {
      benchmark: "Benchmark",
      leaderboard: "Leaderboard",
      watch: "Unverified watch",
      showcase: "Showcase",
      clinical_study: "Clinical study",
      field_evaluation: "Field evaluation",
      challenge: "Challenge",
    };
    if (entry.entryType)
      tags.append(el("span", "tag entry-type", types[entry.entryType]));
    heading.id = "title-" + entry.id;
    article.append(tags, heading, el("p", "entry-summary", entry.summary));
    article.append(
      el(
        "p",
        "entry-meta",
        "Evidence: " +
          entry.evidenceType +
          (entry.snapshotAt
            ? " · Research snapshot: " + entry.snapshotAt
            : " · Verified: " + dated(entry.verifiedAt)),
      ),
    );
    const details = el("details");
    const summary = el("summary", "", "Read evidence and sources");
    summary.setAttribute(
      "aria-label",
      "Read evidence and sources for " + entry.name,
    );
    details.append(summary);
    const grid = el("div", "entry-detail-grid");
    grid.append(
      block("Source basis", entry.sourceBasis),
      block("Evidence setting", entry.sourceSetting || settings[entry.setting]),
    );
    details.append(grid);
    if (entry.scope) grid.append(block("Scope & protocol", entry.scope));
    if (entry.maintainer)
      grid.append(
        block(
          "Maintainer / relationship",
          entry.maintainer + " · " + entry.relationship,
        ),
      );
    if (entry.verificationNote)
      details.append(
        block("Research verification basis", entry.verificationNote),
      );
    if (entry.mayInfer) {
      const inference = el("div", "entry-limitations");
      inference.append(el("h4", "", "What the evidence may support"));
      const claims = el("ul");
      for (const claim of entry.mayInfer) claims.append(el("li", "", claim));
      inference.append(claims);
      details.append(inference);
    }
    const limits = el("div", "entry-limitations");
    limits.append(el("h4", "", "Limitations & unsupported conclusions"));
    limits.append(
      el(
        "p",
        "",
        "These are caution statements or propositions that the evidence does not establish.",
      ),
    );
    const list = el("ul");
    for (const limitation of entry.limitations)
      list.append(el("li", "", limitation));
    limits.append(list);
    details.append(limits);
    if (entry.metrics && entry.metrics.length) {
      const definitions = el("div", "metric-definitions");
      definitions.append(
        el("h4", "", "Metric definitions · results not populated"),
      );
      for (const metric of entry.metrics) {
        const definition = el("div", "metric-definition");
        definition.append(
          el(
            "strong",
            "",
            metric.name + (metric.unit ? " (" + metric.unit + ")" : ""),
          ),
          el("p", "", metric.protocol),
        );
        definitions.append(definition);
      }
      details.append(definitions);
    }
    if (entry.resultNote)
      details.append(block("Result interpretation", entry.resultNote));
    const next = el("p", "next-step");
    next.append(
      el("strong", "", "Next verification step"),
      el("span", "", entry.nextVerification),
    );
    details.append(next);
    const sourceSection = el("div", "entry-sources");
    sourceSection.append(el("h4", "", "Exact sources"));
    const sources = el("ul");
    for (const source of entry.sources) {
      const item = el("li");
      const link = el("a", "", source.title + " ↗");
      // Preserve the exact source string; never construct URLs from names.
      link.setAttribute("href", source.url);
      item.append(link, el("span", "source-url", source.url));
      item.append(
        el(
          "p",
          "source-description",
          source.basis +
            (source.checkedAt
              ? " · Snapshot source check: " +
                source.checkedAt +
                " · " +
                (source.access === "failed"
                  ? "Prior retrieval failed"
                  : "Inherited research")
              : " · Source date: " + dated(source.publishedAt)),
        ),
      );
      if (source.provenance)
        item.append(el("p", "source-description", source.provenance));
      sources.append(item);
    }
    sourceSection.append(sources);
    details.append(
      sourceSection,
      el(
        "p",
        "entry-score-note",
        "Score not recorded. No model ranking or cross-benchmark comparison is implied.",
      ),
    );
    const permalink = el("a", "entry-permalink", "Link to this entry");
    permalink.href = "#benchmark-" + entry.id;
    details.append(permalink);
    article.append(details);
    return article;
  }

  function normalize(value) {
    return value.normalize("NFKC").toLocaleLowerCase("en").trim();
  }

  function searchable(entry) {
    return normalize(
      [
        entry.name,
        entry.summary,
        entry.evidenceType,
        entry.sourceBasis,
        entry.scope || "",
        entry.maintainer || "",
        entry.resultNote || "",
        ...(entry.tags || []),
        ...(entry.mayInfer || []),
        statuses[entry.status],
        settings[entry.setting],
        ...entry.categories.map((category) => categories[category]),
        ...entry.limitations,
        entry.nextVerification,
        ...entry.sources.flatMap((source) => [
          source.title,
          source.url,
          source.basis,
        ]),
      ].join(" "),
    );
  }

  const haystacks = new Map(
    entries.map((entry) => [entry.id, searchable(entry)]),
  );

  function currentFilters() {
    const data = new FormData(form);
    return {
      q: String(data.get("q") || "")
        .slice(0, 200)
        .trim(),
      category: data.get("category"),
      status: data.get("status"),
      setting: data.get("setting"),
    };
  }

  function matches(entry, filters, ignoreCategory = false) {
    const terms = normalize(filters.q).split(/\s+/).filter(Boolean);
    return (
      (ignoreCategory ||
        filters.category === "all" ||
        entry.categories.includes(filters.category)) &&
      (filters.status === "all" || entry.status === filters.status) &&
      (filters.setting === "all" || entry.setting === filters.setting) &&
      terms.every((term) => haystacks.get(entry.id).includes(term))
    );
  }

  function applyURL() {
    const params = new URLSearchParams(location.search);
    form.elements.q.value = (params.get("q") || "").slice(0, 200);
    const category = params.get("category");
    form.elements.category.value = Object.hasOwn(categories, category)
      ? category
      : "all";
    const status = params.get("status");
    form.elements.status.value = Object.hasOwn(statuses, status)
      ? status
      : "all";
    const setting = params.get("setting");
    form.elements.setting.value = Object.hasOwn(settings, setting)
      ? setting
      : "all";
  }

  function updateURL(filters) {
    const url = new URL(location.href);
    for (const key of ["q", "category", "status", "setting"]) {
      if (filters[key] && filters[key] !== "all")
        url.searchParams.set(key, filters[key]);
      else url.searchParams.delete(key);
    }
    // A local file preview may not permit history changes.
    try {
      history.replaceState(null, "", url);
    } catch {
      /* Controls still work. */
    }
  }

  function openLinkedEntry(scroll) {
    const article = document.getElementById(location.hash.slice(1));
    if (!article || !article.classList.contains("entry")) return;
    article.querySelector("details").open = true;
    if (scroll) article.scrollIntoView({ block: "start" });
  }

  function render(syncURL = true) {
    const filters = currentFilters();
    const matching = entries.filter((entry) => matches(entry, filters));
    const fragment = document.createDocumentFragment();
    const normal = matching.filter((entry) => entry.entryType !== "watch");
    const watches = matching.filter((entry) => entry.entryType === "watch");
    for (const entry of normal) fragment.append(renderEntry(entry));
    results.replaceChildren(fragment);
    document
      .getElementById("watch-results")
      .replaceChildren(...watches.map(renderEntry));
    document.querySelector(".watch-section").hidden = watches.length === 0;
    const count = document.getElementById("result-count");
    count.textContent =
      catalog.availability === "available"
        ? matching.length +
          " of " +
          entries.length +
          " records" +
          (watches.length ? " · " + watches.length + " watch item" : "")
        : "0 entries loaded";
    for (const counter of document.querySelectorAll("[data-count]")) {
      const category = counter.dataset.count;
      counter.textContent = String(
        entries.filter(
          (entry) =>
            matches(entry, filters, true) &&
            (category === "all" || entry.categories.includes(category)),
        ).length,
      );
    }
    empty.hidden = normal.length > 0;
    if (catalog.availability === "available") {
      document.getElementById("empty-label").textContent = "No matches";
      document.getElementById("empty-title").textContent =
        "No entries match these filters.";
      document.getElementById("empty-copy").textContent =
        "Try a broader search or reset the filters to browse the catalog.";
      document.getElementById("empty-footnote").textContent = watches.length
        ? "A matching watch item is listed separately below."
        : "No scores or rankings are included.";
    } else if (invalid) {
      document.getElementById("empty-label").textContent =
        "Catalog could not be loaded";
      document.getElementById("empty-copy").textContent =
        "The catalog did not pass the display checks. No records are shown until its source data can be verified.";
      document.getElementById("empty-title").textContent =
        "No benchmark records loaded.";
    } else {
      document.getElementById("empty-label").textContent =
        "Catalog unavailable";
      document.getElementById("empty-title").textContent =
        "No benchmark records loaded.";
      document.getElementById("empty-copy").textContent =
        "The catalog data is unavailable. No sample records or performance results are shown.";
    }
    if (syncURL) updateURL(filters);
    openLinkedEntry(false);
  }

  if (catalog.availability === "available") {
    const basis = document.getElementById("catalog-basis");
    const dateLabel = el(
      "span",
      "",
      catalog.snapshotAt ? "Research snapshot: " : "Verified: ",
    );
    if (catalog.snapshotAt) {
      const date = el("time", "snapshot-date", catalog.snapshotAt);
      date.dateTime = catalog.snapshotAt;
      dateLabel.append(date);
    } else dateLabel.append(document.createTextNode(dated(catalog.verifiedAt)));
    basis.replaceChildren(el("span", "", catalog.basis), el("br"), dateLabel);
    if (catalog.coverageNote)
      document.getElementById("coverage-note").textContent =
        catalog.coverageNote;
    if (catalog.aggregationReason)
      document.getElementById("aggregation-note").textContent =
        catalog.aggregationReason;
  }
  form.addEventListener("submit", (event) => event.preventDefault());
  form.addEventListener("input", () => render());
  form.addEventListener("reset", (event) => {
    event.preventDefault();
    form.elements.q.value = "";
    form.elements.category.value = "all";
    form.elements.status.value = "all";
    form.elements.setting.value = "all";
    render();
  });
  window.addEventListener("popstate", () => {
    applyURL();
    render(false);
  });
  window.addEventListener("hashchange", () => openLinkedEntry(true));
  applyURL();
  render(false);
  openLinkedEntry(true);
})();
