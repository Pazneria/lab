(() => {
  "use strict";
  const input = window.LAB_GALLERY,
    catalog = window.LAB_CATALOG,
    results = window.LAB_RESULTS;
  const unavailable = document.getElementById("gallery-unavailable");
  const detail = document.getElementById("benchmark-detail");
  const categories = {
    standard: "Standard",
    frontend: "Frontend",
    community: "Community",
    games: "Games",
    medical: "Medical",
    physical: "Robots & cars",
  };
  const safeURL = (url) => {
    try {
      const u = new URL(url);
      return u.protocol === "https:" && !u.username && !u.password;
    } catch {
      return false;
    }
  };
  const finite = (n) => typeof n === "number" && Number.isFinite(n) && n >= 0;
  const idOK = (id) =>
    typeof id === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id);
  function valid() {
    if (
      !input ||
      !catalog ||
      !results ||
      catalog.entries?.length !== 20 ||
      results.records?.length !== 18 ||
      results.graph_views?.charts?.length !== 7 ||
      input.standard?.cards?.length !== 22 ||
      !window.LAB_FRONTEND?.valid(input.frontend?.cards) ||
      !/^data\/[a-z0-9.-]+\.json$/.test(input.frontend?.source_input || "") ||
      !Array.isArray(input.supplement?.audit) ||
      input.expanded?.bullshitbench?.records?.length !== 228 ||
      input.expanded?.runebench?.records?.length !== 48 ||
      input.expanded?.medical?.medagentbench_original?.rows?.length !== 12
    )
      return false;
    const ids = new Set();
    for (const e of catalog.entries) {
      if (
        !idOK(e.id) ||
        ids.has(e.id) ||
        e.score !== null ||
        !Object.hasOwn(categories, e.categories?.[0]) ||
        !e.sources?.every((s) => safeURL(s.url))
      )
        return false;
      ids.add(e.id);
    }
    for (const c of input.standard.cards) {
      if (
        !idOK(c.id) ||
        ids.has(c.id) ||
        !["standard", "medical"].includes(c.category) ||
        c.unit !== "percent" ||
        c.scale?.[0] !== 0 ||
        c.scale?.[1] !== 100 ||
        !c.rows?.length ||
        new Set(c.rows.map((r) => r.model_variant)).size !== c.rows.length ||
        !input.standard.sources[c.source_id]
      )
        return false;
      for (const r of c.rows)
        if (
          typeof r.model_variant !== "string" ||
          !finite(r.value) ||
          r.value > 100 ||
          r.cost_usd !== null ||
          r.latency_seconds !== null ||
          (r.source_input &&
            (!/^data\/[a-z0-9.-]+\.json$/.test(r.source_input) ||
              r.source_input.includes(".."))) ||
          !safeURL(r.source_url)
        )
          return false;
      if (
        c.id === "hle-diamond" &&
        c.rows.some(
          (r) =>
            !finite(r.reasoning_percent) ||
            r.reasoning_percent > 100 ||
            !finite(r.knowledge_percent) ||
            r.knowledge_percent > 100 ||
            Math.abs(
              (r.reasoning_percent + r.knowledge_percent) / 2 - r.value,
            ) > 1e-10 ||
            (r.with_tools_percent !== null &&
              (!finite(r.with_tools_percent) || r.with_tools_percent > 100)),
        )
      )
        return false;
      ids.add(c.id);
    }
    for (const c of input.frontend.cards) {
      if (!idOK(c.id) || ids.has(c.id)) return false;
      ids.add(c.id);
    }
    return (
      ids.size === 46 &&
      input.standard.cards.reduce((n, c) => n + c.rows.length, 0) === 340 &&
      Object.values(input.standard.sources).every((s) => safeURL(s.url)) &&
      [...ids].every(
        (id) =>
          typeof input.notes[id]?.matters === "string" &&
          typeof input.notes[id]?.read === "string",
      ) &&
      results.records.every((r) => safeURL(r.source_url) && finite(r.value)) &&
      input.expanded.runebench.records.every(
        (r) =>
          finite(r.value) &&
          safeURL(r.source_url) &&
          idOK(r.skill) &&
          finite(r.reported_cost?.value) &&
          finite(r.reported_time?.value),
      ) &&
      input.expanded.bullshitbench.records.every(
        (r) => finite(r.value) && r.value <= 100,
      ) &&
      input.provenance.sourceFiles.every(
        (p) => /^data\/[a-z0-9./-]+\.(json|csv)$/.test(p) && !p.includes(".."),
      )
    );
  }
  let accepted = false;
  try {
    accepted = valid();
  } catch {
    /* A malformed local projection stays unavailable. */
  }
  if (!accepted) {
    if (unavailable)
      unavailable.firstChild.textContent =
        "The supplied data could not be validated. ";
    return;
  }
  const e = (tag, cls = "", value) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (value !== undefined) n.textContent = value;
    return n;
  };
  const s = (tag, attrs = {}, value) => {
    const n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, String(v));
    if (value !== undefined) n.textContent = value;
    return n;
  };
  const fmt = (n, d = 2) =>
    n === null
      ? "Not reported"
      : Number(n).toLocaleString("en-US", { maximumFractionDigits: d });
  function external(url, label) {
    const a = e("a", "", label);
    if (safeURL(url)) {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    return a;
  }
  function local(url, label) {
    const a = e("a", "", label);
    if (
      /^(?:data\/[a-z0-9./-]+\.(?:json|txt|md)|catalog\.html#[a-z0-9-]+|#[a-z0-9-]+)$/.test(
        url,
      ) &&
      !url.includes("..")
    )
      a.href = url;
    return a;
  }
  function disclosure(label, ...children) {
    const d = e("details");
    d.append(e("summary", "", label), ...children);
    return d;
  }
  function raw(label, obj) {
    return disclosure(label, e("pre", "", JSON.stringify(obj, null, 2)));
  }
  const standards = new Map(input.standard.cards.map((c) => [c.id, c]));
  const originals = new Map(catalog.entries.map((c) => [c.id, c]));
  const all = [
    ...input.frontend.cards.map((c) => ({
      id: c.id,
      name: c.name,
      category: c.category,
      frontend: c,
    })),
    ...input.standard.cards.map((c) => ({
      id: c.id,
      name: c.name,
      category: c.category,
      standard: c,
    })),
    ...catalog.entries.map((c) => ({
      id: c.id,
      name: c.name,
      category: c.categories[0],
      original: c,
    })),
  ];
  const byId = new Map(all.map((c) => [c.id, c]));
  const priority = [
    "hle-diamond",
    "webdev-arena-frontend",
    "bullshitbench-v2",
    "runebench",
    "gpqa-diamond",
    "medagentbench",
    "frontiermath-tier4-v2",
    "mmmu-pro",
    "terminal-bench-4",
    "swe-bench-pro-public-v2",
    "healthbench-professional",
  ];
  all.sort((a, b) => {
    const ai = priority.indexOf(a.id),
      bi = priority.indexOf(b.id);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
  });
  function graphFor(card) {
    if (card.frontend) return card.frontend.rows.length ? card.frontend : null;
    return (
      card.standard ||
      results.graph_views.charts.find(
        (c) => c.id === input.notes[card.id].main_graph,
      )
    );
  }
  function status(card) {
    if (card.frontend)
      return isHistorical(card)
        ? "Historical · Feb 2025"
        : graphFor(card)
          ? "Source snapshot · Oct 2026"
          : "Evidence guide";
    return card.standard
      ? isHistorical(card)
        ? "Historical" +
          (input.standard.sources[card.standard.source_id].published_date
            ? " · source " +
              input.standard.sources[card.standard.source_id].published_date
            : " · previous cohort")
        : "Source checked · Oct 2026"
      : card.id === "medagentbench"
        ? "Historical · Feb 2025"
        : graphFor(card)
          ? "Selected results · Sep 2026"
          : card.original.entryType === "showcase"
            ? "Showcase"
            : card.original.status === "unverified"
              ? "Watch item"
              : "Evidence guide";
  }
  function isHistorical(card) {
    return (
      card.standard?.history === true ||
      card.standard?.display_status === "historical_source_cohort" ||
      card.frontend?.status === "historical_source_cohort" ||
      card.id === "medagentbench"
    );
  }
  function orderedRows(c) {
    return c.display_defaults?.sort === "evaluation_date_desc"
      ? [...c.rows].sort((a, b) =>
          (b.evaluation_date || "").localeCompare(a.evaluation_date || ""),
        )
      : c.rows;
  }
  const dotCohort = (card) =>
    card.standard?.recommended_chart?.includes("dots");
  function historyState() {
    return history.state &&
      typeof history.state === "object" &&
      !Array.isArray(history.state)
      ? history.state
      : {};
  }
  function galleryPosition(raw) {
    if (!raw || typeof raw.url !== "string" || !finite(raw.scrollY))
      return null;
    try {
      const url = new URL(raw.url),
        base = new URL(".", location.href);
      if (
        url.origin !== base.origin ||
        url.username ||
        url.password ||
        ![
          base.pathname,
          base.pathname + "index.html",
          base.pathname + "benchmarks.html",
        ].includes(url.pathname)
      )
        return null;
      return {
        url: url.href,
        scrollY: Math.min(raw.scrollY, 1000000),
        focusId: byId.has(raw.focusId) ? raw.focusId : null,
      };
    } catch {
      return null;
    }
  }
  function ordinaryClick(event) {
    return (
      !event.defaultPrevented &&
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    );
  }
  const returnKey = "lab.benchmark-return.v1";
  function detailReturnPosition() {
    let position = galleryPosition(historyState().labGalleryReturn);
    if (position) return position;
    try {
      const pending = JSON.parse(sessionStorage.getItem(returnKey));
      sessionStorage.removeItem(returnKey);
      if (
        pending?.destination === location.href &&
        pending.createdAt <= Date.now() &&
        Date.now() - pending.createdAt < 60000
      ) {
        const candidate = galleryPosition(pending.position);
        if (candidate?.url === document.referrer) position = candidate;
      }
    } catch {
      /* Storage can be disabled; native navigation still works. */
    }
    // Same-window navigation can still use native Back when storage is disabled.
    // A fresh tab has no previous gallery entry and keeps the direct-link fallback.
    if (!position && history.length > 1)
      position = galleryPosition({ url: document.referrer, scrollY: 0 });
    if (position)
      history.replaceState(
        { ...historyState(), labGalleryReturn: position },
        "",
        location.href,
      );
    return position;
  }
  const palette = [
    "#4354d8",
    "#7b87e4",
    "#45806b",
    "#ab6950",
    "#8572b5",
    "#697686",
    "#aaa356",
    "#ae7999",
    "#6d8c9b",
  ];
  function pointColor(p) {
    return p.model_identifier?.includes("opus")
      ? "#8572b5"
      : p.model_identifier?.includes("sonnet")
        ? "#ab6950"
        : p.reasoning_effort === "medium"
          ? "#ab6950"
          : p.reasoning_effort === "high"
            ? "#8572b5"
            : "#45806b";
  }
  function pointShape(p, x, y, size = 4) {
    const attrs = { fill: pointColor(p) };
    return ["high", "max"].includes(p.reasoning_effort)
      ? s("path", {
          ...attrs,
          d: `M${x} ${y - size - 1}L${x + size + 1} ${y}L${x} ${y + size + 1}L${x - size - 1} ${y}Z`,
        })
      : p.reasoning_effort === "medium"
        ? s("rect", {
            ...attrs,
            x: x - size,
            y: y - size,
            width: size * 2,
            height: size * 2,
          })
        : s("circle", { ...attrs, cx: x, cy: y, r: size });
  }
  function miniature(card) {
    if (card.frontend?.rows.length)
      return window.LAB_FRONTEND.miniature(card.frontend);
    const graph = graphFor(card),
      fig = e("div", "mini-graph");
    if (!graph) {
      fig.classList.add("mini-evidence");
      fig.append(
        e(
          "span",
          "evidence-icon",
          card.category === "physical"
            ? "↗"
            : card.category === "medical"
              ? "+"
              : "⌘",
        ),
        e(
          "strong",
          "",
          card.original?.entryType === "showcase"
            ? "A documented achievement"
            : "Explore the evidence",
        ),
        e(
          "p",
          "",
          card.id === "webcraftbench-v3" || card.id === "design-arena-frontend"
            ? "Full configuration review pending."
            : card.original?.status === "unverified" || card.frontend
              ? "Current numerical results unresolved."
              : "Scores haven’t been added to this guide.",
        ),
      );
      return fig;
    }
    fig.dataset.graphId = card.standard ? card.id + "-score" : graph.id;
    const svg = s("svg", {
      viewBox: "0 0 320 200",
      "aria-hidden": "true",
      focusable: "false",
    });
    fig.append(svg);
    if (card.standard || graph.type === "bar") {
      const rows = card.standard
        ? orderedRows(card.standard)
            .slice(0, card.standard.rows.length > 12 ? 6 : 12)
            .map((r) => ({
              label: r.model_variant,
              value: r.value,
            }))
        : graph.points.map((p) => ({ label: p.label, value: p.x }));
      const left = 124,
        right = 35,
        top = 17,
        bottom = 171,
        step = (bottom - top) / rows.length;
      for (const tick of [0, 50, 100]) {
        const x = left + ((320 - left - right) * tick) / 100;
        svg.append(
          s("line", {
            x1: x,
            x2: x,
            y1: top - 4,
            y2: bottom + 2,
            class: "mini-grid",
          }),
          s("text", { x, y: 190, "text-anchor": "middle" }, tick + "%"),
        );
      }
      rows.forEach((r, i) => {
        const y = top + i * step + step * 0.45;
        svg.append(
          s(
            "text",
            {
              x: left - 7,
              y: y + 3,
              "text-anchor": "end",
              class: "mini-bars-label",
            },
            r.label,
          ),
        );
        if (dotCohort(card))
          svg.append(
            s("circle", {
              cx: left + ((320 - left - right) * r.value) / 100,
              cy: y,
              r: 4,
              fill: palette[i],
            }),
          );
        else
          svg.append(
            s("rect", {
              x: left,
              y: y - 4,
              width: ((320 - left - right) * r.value) / 100,
              height: 8,
              rx: 3,
              fill: palette[i % palette.length],
            }),
          );
        svg.append(
          s(
            "text",
            {
              x: left + ((320 - left - right) * r.value) / 100 + 5,
              y: y + 3,
              class: "mini-bars-label",
            },
            fmt(r.value),
          ),
        );
      });
    } else {
      const left = 43,
        right = 19,
        top = 24,
        bottom = 162;
      const xmax =
        Math.ceil(
          Math.max(...graph.points.map((p) => p.x)) *
            1.15 *
            (graph.x.unit === "USD" ? 10 : 0.05),
        ) / (graph.x.unit === "USD" ? 10 : 0.05);
      const ymax =
        graph.y.domain?.[1] ||
        Math.ceil(Math.max(...graph.points.map((p) => p.y)) / 200) * 200;
      const sx = (x) => left + ((320 - left - right) * x) / xmax,
        sy = (y) => bottom - ((bottom - top) * y) / ymax;
      for (let i = 0; i <= 2; i++) {
        const y = (ymax * i) / 2;
        svg.append(
          s("line", {
            x1: left,
            x2: 320 - right,
            y1: sy(y),
            y2: sy(y),
            class: "mini-grid",
          }),
          s(
            "text",
            { x: left - 7, y: sy(y) + 3, "text-anchor": "end" },
            fmt(y),
          ),
        );
        const x = (xmax * i) / 2;
        svg.append(
          s(
            "text",
            { x: sx(x), y: bottom + 17, "text-anchor": "middle" },
            fmt(x, 1),
          ),
        );
      }
      svg.append(
        s(
          "text",
          { x: left, y: 13 },
          graph.y.unit === "percent"
            ? "Clear pushback (%)"
            : "Peak normalized XP/min",
        ),
        s(
          "text",
          { x: (left + 320 - right) / 2, y: 192, "text-anchor": "middle" },
          graph.x.unit === "USD"
            ? "API-equivalent estimate (USD)"
            : "Mean request time (seconds)",
        ),
      );
      graph.points.forEach((p) =>
        svg.append(pointShape(p, sx(p.x), sy(p.y), 5)),
      );
    }
    return fig;
  }
  function cardNode(card) {
    const a = e("a", "benchmark-card category-" + card.category);
    a.href = "results.html?benchmark=" + card.id;
    a.id = "benchmark-" + card.id;
    a.dataset.benchmarkId = card.id;
    const top = e("div", "card-top");
    top.append(
      e("span", "category-badge", categories[card.category]),
      e(
        "span",
        "card-status" + (isHistorical(card) ? " historical-status" : ""),
        status(card),
      ),
    );
    a.append(
      top,
      e(
        "h3",
        "",
        card.id === "design2code-v3-484"
          ? "Design2Code"
          : card.id === "medagentbench"
            ? "MedAgentBench"
            : card.name,
      ),
      e(
        "p",
        "card-question",
        input.notes[card.id].question ||
          card.standard?.description ||
          card.frontend?.summary ||
          card.original?.summary,
      ),
      miniature(card),
    );
    const graph = graphFor(card);
    const cap = e("p", "mini-caption");
    if (graph)
      cap.append(
        e(
          "strong",
          "",
          card.frontend
            ? card.id === "webdev-arena-frontend"
              ? "Preference rating · 12 selected rows"
              : "Visual similarity · 4 Direct configurations"
            : card.standard
              ? card.id === "frontiermath-tier4-v2"
                ? "Reported accuracy · 0–100%"
                : (card.standard.metric.includes("accuracy")
                    ? "Accuracy"
                    : card.standard.metric.includes("resolve")
                      ? "Issues resolved"
                      : card.standard.metric.includes("rubric")
                        ? "Rubric score"
                        : "Task score") + " · 0–100%"
              : card.id === "medagentbench"
                ? "Task success · 0–100%"
                : card.id === "runebench"
                  ? "Woodcutting · 3 effort settings"
                  : "6 selected model / effort settings",
        ),
        document.createTextNode(
          card.id === "runebench"
            ? " · estimate, not cash spend"
            : card.standard?.rows.length > 12
              ? " · preview of " + card.standard.rows.length + " configurations"
              : isHistorical(card)
                ? " · historical source cohort"
                : dotCohort(card)
                  ? " · different lab setups"
                  : " · open to explore",
        ),
      );
    else
      cap.textContent = card.frontend
        ? "Source guide · no graph yet"
        : card.original.sourceSetting +
          " · " +
          card.original.sources.length +
          " original sources";
    const foot = e("div", "card-foot");
    foot.append(
      e(
        "span",
        "",
        graph ? "Explore graph & explanation" : "Read the evidence guide",
      ),
      e("span", "card-arrow", "↗"),
    );
    a.append(cap, foot);
    return a;
  }
  function gallery() {
    const form = document.getElementById("gallery-controls"),
      grid = document.getElementById("benchmark-grid");
    function fromURL() {
      const p = new URL(location.href).searchParams;
      return {
        category: Object.hasOwn(categories, p.get("category"))
          ? p.get("category")
          : "all",
        q: (p.get("q") || "").slice(0, 200),
        graphs: p.get("graphs") === "1",
        history: ["current", "historical"].includes(p.get("history"))
          ? p.get("history")
          : "all",
      };
    }
    function render(state) {
      form.elements.category.value = state.category;
      form.elements.q.value = state.q;
      form.elements.graphs.checked = state.graphs;
      form.elements.history.value = state.history;
      const q = state.q.toLocaleLowerCase();
      const cards = all.filter(
        (c) =>
          (state.category === "all" || c.category === state.category) &&
          (!state.graphs || graphFor(c)) &&
          (state.history === "all" ||
            (state.history === "historical") === isHistorical(c)) &&
          [
            c.name,
            input.notes[c.id].question,
            input.notes[c.id].matters,
            c.original?.tags?.join(" "),
            c.standard?.description,
          ]
            .join(" ")
            .toLocaleLowerCase()
            .includes(q),
      );
      grid.replaceChildren(...cards.map(cardNode));
      document.getElementById("gallery-count").textContent =
        cards.length +
        " benchmarks · " +
        cards.filter(graphFor).length +
        " with score graphs";
      document.getElementById("gallery-empty").hidden = cards.length > 0;
    }
    function update(push) {
      const state = {
        category: form.elements.category.value,
        q: form.elements.q.value.slice(0, 200),
        graphs: form.elements.graphs.checked,
        history: form.elements.history.value,
      };
      const url = new URL(location.href);
      url.search = "";
      if (state.category !== "all")
        url.searchParams.set("category", state.category);
      if (state.q) url.searchParams.set("q", state.q);
      if (state.graphs) url.searchParams.set("graphs", "1");
      if (state.history !== "all")
        url.searchParams.set("history", state.history);
      if (push) history.pushState({}, "", url);
      else history.replaceState(historyState(), "", url);
      render(state);
    }
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      update(false);
    });
    form.addEventListener("change", (event) => {
      // Search already updates on input. Replacing cards during its blur/change
      // event would remove a card between pointerdown and click.
      if (event.target.name !== "q") update(true);
    });
    form.elements.q.addEventListener("input", () => update(false));
    function restorePosition() {
      const position = galleryPosition(historyState().labGallery);
      if (!position || position.url !== location.href) return;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (position.focusId)
            document
              .getElementById("benchmark-" + position.focusId)
              ?.focus({ preventScroll: true });
          window.scrollTo({
            top: position.scrollY,
            left: 0,
            behavior: "instant",
          });
        }),
      );
    }
    grid.addEventListener("click", (event) => {
      if (!ordinaryClick(event) || !(event.target instanceof Element)) return;
      const link = event.target.closest("a.benchmark-card");
      if (!link || !grid.contains(link)) return;
      const position = {
        url: location.href,
        scrollY: window.scrollY,
        focusId: link.dataset.benchmarkId,
      };
      const destination = new URL(link.href);
      if (
        destination.origin !== location.origin ||
        destination.pathname !== new URL("results.html", location.href).pathname
      )
        return;
      history.replaceState(
        { ...historyState(), labGallery: position },
        "",
        location.href,
      );
      // Keep ordinary document navigation. Only public return metadata crosses
      // into the next document; it is consumed once and retained in that entry.
      try {
        sessionStorage.setItem(
          returnKey,
          JSON.stringify({
            position,
            destination: destination.href,
            createdAt: Date.now(),
          }),
        );
      } catch {
        /* The validated referrer provides the native-Back fallback. */
      }
    });
    window.addEventListener("popstate", () => {
      render(fromURL());
      restorePosition();
    });
    window.addEventListener("pageshow", restorePosition);
    unavailable.hidden = true;
    render(fromURL());
    restorePosition();
  }
  function sourceSection(card) {
    const wrap = e("div"),
      list = e("ul", "source-list");
    let sources = [];
    if (card.frontend) {
      const c = card.frontend;
      sources = [
        c.source_url,
        ...(c.methodology_urls || []),
        c.methodology_url,
        c.project_url,
        c.code_url,
        c.changelog_url,
      ]
        .filter(Boolean)
        .map((url, i) => ({
          url,
          title:
            i === 0
              ? "Primary benchmark source"
              : "Project and methodology source",
          info: "Source checked October 5, 2026; snapshot, paper and evaluation dates remain separately labeled.",
        }));
    } else if (card.standard)
      for (const id of [
        card.standard.source_id,
        card.standard.definition_source_id,
      ].filter(Boolean)) {
        const source = input.standard.sources[id];
        sources.push({
          url: source.url,
          title:
            (source.publisher || "Benchmark creator") +
            " · " +
            (id === card.standard.source_id
              ? "Result source"
              : "Benchmark definition"),
          info:
            (source.published_date
              ? "Published " + source.published_date + " · "
              : "") + "Accessed 2026-10-01",
        });
      }
    else {
      const rr = results.records.filter((r) => r.benchmark_id === card.id),
        sourceIDs = new Set(rr.flatMap((r) => r.source_ids));
      const protocol = results.protocols.find(
        (p) => p.id === rr[0]?.protocol_id,
      );
      for (const id of protocol?.source_ids || []) sourceIDs.add(id);
      sources = card.original.sources.map((s) => ({
        url: s.url,
        title: s.title,
        info: s.provenance + " · Checked " + s.checkedAt + " · " + s.access,
      }));
      for (const id of sourceIDs) {
        const src = results.sources.find((s) => s.id === id);
        if (src)
          sources.push({
            url: src.url,
            title: id + " · primary result evidence",
            info:
              (src.supports?.join("; ") || src.type) +
              " · Accessed " +
              src.access_date,
          });
      }
    }
    if (["runebench", "bullshitbench-v2", "medagentbench"].includes(card.id)) {
      const expanded =
        card.id === "medagentbench"
          ? input.expanded.medical.medagentbench_original
          : input.expanded[
              card.id === "runebench" ? "runebench" : "bullshitbench"
            ].metadata;
      sources.push({
        url: expanded.source_url,
        title: "Expanded official source evidence",
        info: "Source checked October 1, 2026; individual dates and conditions remain in the records.",
      });
    }
    for (const src of sources) {
      const li = e("li");
      li.append(
        external(src.url, src.title),
        e("small", "", src.url),
        e("small", "", src.info),
      );
      list.append(li);
    }
    wrap.append(list);
    if (card.id === "barn-challenge-2026-finals")
      wrap.append(
        e(
          "p",
          "source-warning",
          "The original BARN source failed certificate validation (unable to verify the issuer). The original URL is retained. Its browser warning has not been bypassed.",
        ),
      );
    const ds = disclosure("Sources (" + sources.length + ")", wrap);
    ds.id = "benchmark-sources";
    return ds;
  }
  function explanation(card) {
    const notes = input.notes[card.id],
      group = e("section", "explanations");
    group.setAttribute("aria-label", "Understanding " + card.name);
    const texts = [
      [
        "What it tests",
        card.id === "runebench"
          ? "An agent writes code and uses tools to train a character in an accelerated RuneScape world. The published slice follows one model at low, medium and high reasoning effort across 16 skills, with one selected trial per effort and skill."
          : notes.tests ||
            card.standard?.description ||
            card.frontend?.summary ||
            card.original?.summary,
      ],
      ["Why it matters", notes.matters],
      ["How to read it", notes.read],
    ];
    texts.forEach(([heading, text], i) => {
      const article = e("div");
      article.append(
        e("span", "explanation-number", "0" + (i + 1)),
        e("h2", "", heading),
        e("p", "", text),
      );
      group.append(article);
    });
    if (card.id === "runebench")
      group.append(
        e(
          "p",
          "",
          "The skill selector also includes all 16 skills from 48 published runs: one trial for each of three efforts per skill. Progress curves remain available for the two originally verified skills. Other skills show their reported peak and API-equivalent cost; tracker duration stays in the source details.",
        ),
      );
    if (card.id === "bullshitbench-v2")
      group.append(
        e(
          "p",
          "",
          "All configurations opens 228 published rows from the same V2 source snapshot. Their first-seen timestamps do not establish evaluation dates. Partial response costs stay in the records and are never substituted into the six-row verified cost graph.",
        ),
      );
    if (card.id === "medagentbench")
      group.append(
        e(
          "p",
          "",
          "The separate author-homepage view adds six historical models for 12 in total. It preserves that homepage's exact model labels; individual evaluation dates remain unknown. The original six paper observations and their chart remain available.",
        ),
      );
    return group;
  }
  function technicalSection(card) {
    const stack = e("section", "technical-stack");
    stack.setAttribute("aria-label", "Sources and supporting details");
    stack.append(sourceSection(card));
    const body = e("div");
    if (card.frontend) {
      const c = card.frontend,
        ul = e("ul");
      for (const text of c.limitations) ul.append(e("li", "", text));
      body.append(
        ul,
        raw("Source settings and complete observations", c),
        local(input.frontend.source_input, "Read the frontend research input"),
      );
    } else if (card.standard) {
      body.append(
        e("p", "", card.standard.date_label),
        e("p", "", card.standard.settings.effort),
        e("p", "", card.standard.settings.tools),
      );
      const ul = e("ul");
      for (const l of card.standard.limitations) ul.append(e("li", "", l));
      body.append(
        ul,
        raw("All supplied settings and limitations", card.standard),
        local(
          "data/gallery-current-2026-10-01.json",
          "Read the dated source-cohort dataset",
        ),
      );
      for (const file of input.provenance.sourceFiles)
        body.append(local(file, "Source input: " + file), e("br"));
    } else {
      body.append(e("p", "", card.original.scope));
      const ul = e("ul");
      for (const l of card.original.limitations) ul.append(e("li", "", l));
      body.append(ul, e("p", "", card.original.verificationNote));
      const rr = results.records.filter((r) => r.benchmark_id === card.id),
        p = results.protocols.find((p) => p.id === rr[0]?.protocol_id);
      if (p) body.append(raw("Exact result protocol and missing settings", p));
      body.append(
        raw("Original discovery record", card.original),
        local(
          "catalog.html#benchmark-" + card.id,
          "Open the full research index entry",
        ),
      );
    }
    stack.append(disclosure("Settings & limitations", body));
    const update = input.supplement.audit.find((item) => item.id === card.id);
    if (update) {
      const context = e("div");
      const notes = {
        "behavior-challenge-2026":
          "The October 1 Zero-Shot Butlers submission is self-reported and covers 50 tasks and 500 episodes. Verified result files remain empty. Another submission covers eight tasks and 80 episodes, so these rows cannot form a unified comparison. Submission timestamps do not establish evaluation dates.",
        "waymo-onroad-safety":
          "The provider hub still covers exposure through June 2026, released September 24. It remains separate from IIHS’s July 23 study of 2021–2024. One crash involving two Waymo vehicles has unknown suspected serious-injury status pending a police report. Unknown severity must not be counted as no serious injury; the release notes provide a sensitivity calculation.",
        stationerybench:
          "The report is still dated September 10, 2026. Its 200 trials span five tasks, with 100 trials per system. The two systems use different interfaces, so the reported complete trials describe those fixed setups rather than a current model leaderboard.",
        "robochallenge-table30":
          "No readable numerical standings or fresh evaluation dates were available from the primary homepage. This remains a source guide.",
      };
      context.append(
        e("p", "", notes[card.id] || update.finding),
        external(
          update.pinned_source_url || update.source_url,
          "Reviewed primary source",
        ),
      );
      if (update.release_notes)
        context.append(
          e(
            "p",
            "",
            "The injury-severity limitation is explained in the provider’s release notes.",
          ),
          external(update.release_notes, "Provider release notes · page 2"),
        );
      context.append(
        raw("Exact parent-supplied source update", update),
        local(
          "data/frontend-research-supplement-2026-10-05.original.json",
          "Read the original supplemental packet",
        ),
      );
      stack.append(
        disclosure("October 5 source check and qualifications", context),
      );
    }
    const expanded =
      input.expanded[
        card.id === "runebench"
          ? "runebench"
          : card.id === "bullshitbench-v2"
            ? "bullshitbench"
            : ""
      ];
    if (expanded) {
      const evidence = e("div");
      evidence.append(
        raw("Source metadata and protocol", expanded.metadata),
        local(
          "data/community-expanded-2026-10-01.json",
          "Read the complete expanded community evidence",
        ),
      );
      const d = disclosure(
        "Expanded source evidence (" + expanded.records.length + " records)",
        evidence,
      );
      d.id = "expanded-observations";
      evidence.append(
        ...expanded.records.map((r) =>
          raw(
            r.model_variant ||
              r.model_identifier + (r.skill ? " · " + r.skill : ""),
            r,
          ),
        ),
      );
      stack.append(d);
    }
    if (card.id === "medagentbench")
      stack.append(
        raw(
          "All 12 historical author-homepage results",
          input.expanded.medical.medagentbench_original,
        ),
        local(
          "data/current-medical.original.json",
          "Read the medical source input",
        ),
      );
    if (!card.standard && !card.frontend && window.LAB_CHARTS) {
      const rr = results.records.filter((r) => r.benchmark_id === card.id);
      if (rr.length) {
        const observations = e("div");
        observations.append(
          ...rr.map(window.LAB_CHARTS.observation),
          local(
            "data/results.original.json",
            "Original 18 rows and seven graph configurations",
          ),
          e(
            "p",
            "",
            "Results were reported by their authors. No evaluations were independently run here.",
          ),
        );
        const d = disclosure(
          "All result records (" + rr.length + ")",
          observations,
        );
        d.id = "full-observations";
        stack.append(d);
      }
    }
    return stack;
  }
  function simplifyChart(card, c) {
    const node = window.LAB_CHARTS.chartCard(c),
      meta = node.querySelector(":scope > .chart-meta"),
      notes = node.querySelector(":scope > .chart-caveats");
    const settings = disclosure("Graph settings & caveats", e("div"));
    settings.className = "chart-settings";
    if (meta) settings.lastChild.append(meta);
    if (notes) settings.lastChild.append(notes);
    node.append(settings);
    const oldHeading = node.querySelector("h3"),
      heading = e("h2");
    heading.id = oldHeading.id;
    oldHeading.replaceWith(heading);
    heading.textContent =
      c.type === "line"
        ? "Best rate found over time"
        : c.type === "bar"
          ? "Historical task success"
          : c.id.endsWith("-cost")
            ? "Score and cost"
            : "Score and request time";
    const observer = new MutationObserver(() => {
      const inspector = node.querySelector(".chart-inspector");
      if (!inspector || inspector.querySelector("details")) return;
      const m = [...inspector.querySelectorAll(".chart-meta")];
      if (m.length) {
        const d = disclosure("Point source & protocol", ...m);
        inspector.append(d);
      }
    });
    observer.observe(node.querySelector(".chart-inspector"), {
      childList: true,
    });
    return node;
  }
  function originalChart(card, state) {
    if (!window.LAB_CHARTS)
      return e(
        "p",
        "empty-state",
        "The original result data could not be validated. Read the original JSON for this slice.",
      );
    const charts = results.graph_views.charts.filter((c) =>
      card.id === "runebench"
        ? c.id.startsWith("runebench-" + state.skill)
        : card.id === "bullshitbench-v2"
          ? c.id.startsWith("bullshitbench")
          : c.id.startsWith("medagentbench"),
    );
    const graph =
      charts.find((c) =>
        state.view === "time"
          ? c.type === "line" || c.id.endsWith("-time")
          : state.view === "cost"
            ? c.id.endsWith("-cost")
            : c.type === "bar",
      ) || charts[0];
    return simplifyChart(card, graph);
  }
  function standardChart(card, state, supplied) {
    const c = supplied || card.standard,
      percent = c.unit === "percent",
      maximum = percent
        ? 100
        : Math.max(1, ...c.rows.map((r) => r.value)) * 1.05;
    const metric = c.metric || "accuracy",
      label = metric[0].toUpperCase() + metric.slice(1);
    const title =
      state.view === "tools"
        ? "Accuracy with web and code"
        : state.view === "reasoning"
          ? "Reasoning questions"
          : state.view === "knowledge"
            ? "Knowledge questions"
            : label;
    const node = e("article", "chart-card standard-chart");
    node.id = c.id + "-" + state.view;
    node.append(
      e("h2", "", title),
      e(
        "p",
        "chart-scale-note",
        percent
          ? "Score axis: 0–100%. " + c.date_label
          : "Score unit: " + c.unit + ". " + c.date_label,
      ),
    );
    const plot = e("div", "standard-plot"),
      inspector = e("div", "chart-inspector"),
      announcement = e("span", "sr-only");
    plot.setAttribute("role", "group");
    plot.setAttribute("aria-label", title);
    inspector.setAttribute("role", "region");
    inspector.setAttribute("aria-label", "Selected model result");
    function resetInspector() {
      inspector.replaceChildren(
        e("strong", "", "Explore a result"),
        e(
          "p",
          "",
          "Hover, focus or tap a configuration to see its score, settings and source.",
        ),
      );
    }
    resetInspector();
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", "polite");
    const value = (r) =>
      state.view === "tools"
        ? r.with_tools_percent
        : state.view === "reasoning"
          ? r.reasoning_percent
          : state.view === "knowledge"
            ? r.knowledge_percent
            : r.value;
    const viewGroup =
      c.id === "hle-diamond"
        ? `hle-diamond-creator-high-${state.view === "tools" ? "web-code" : "no-tools"}-${state.view === "reasoning" || state.view === "knowledge" ? state.view + "-" : ""}2026-10-01`
        : c.comparison_group;
    const measurement = (m) =>
      m?.value == null
        ? "Not reported"
        : fmt(m.value, 6) +
          " " +
          m.unit +
          "; " +
          m.basis +
          (m.complete === false
            ? "; partial coverage " +
              m.covered_response_count +
              "/" +
              m.total_attempts
            : "");
    let query = state.config || "",
      showAll = state.all === true,
      selected = null;
    const count = e("p", "cohort-count");
    count.setAttribute("role", "status");
    count.setAttribute("aria-live", "polite");
    if (c.rows.length > 12) {
      const controls = e("div", "cohort-controls"),
        searchLabel = e("label", "", "Find an exact configuration"),
        search = e("input"),
        allLabel = e("label", "", ""),
        checkbox = e("input");
      search.type = "search";
      search.maxLength = 200;
      search.value = query;
      search.setAttribute("aria-label", "Find an exact configuration");
      checkbox.type = "checkbox";
      checkbox.checked = showAll;
      checkbox.setAttribute("aria-label", "Show all matching configurations");
      searchLabel.append(search);
      allLabel.append(
        checkbox,
        document.createTextNode(" Show all matching configurations"),
      );
      controls.append(searchLabel, allLabel);
      node.append(controls);
      const update = () => {
        query = search.value.slice(0, 200);
        showAll = checkbox.checked;
        const u = new URL(location.href);
        if (query) u.searchParams.set("config", query);
        else u.searchParams.delete("config");
        if (showAll) u.searchParams.set("all", "1");
        else u.searchParams.delete("all");
        history.replaceState(historyState(), "", u);
        draw();
      };
      search.addEventListener("input", update);
      checkbox.addEventListener("change", update);
    }
    function draw() {
      const matching = orderedRows(c).filter((r) =>
        [
          r.model_variant,
          r.model_identifier,
          r.effort,
          r.agent,
          r.fallback,
          r.evaluation_date,
        ]
          .join(" ")
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()),
      );
      const visible = showAll
        ? matching
        : matching.slice(0, c.display_defaults?.row_limit || 12);
      if (selected && !visible.includes(selected)) {
        selected = null;
        resetInspector();
        announcement.textContent =
          "Selection cleared because the result is no longer visible. Choose a visible configuration.";
      }
      count.textContent =
        "Showing " +
        visible.length +
        " of " +
        matching.length +
        " matching configurations" +
        (c.display_defaults?.sort === "evaluation_date_desc"
          ? " · latest evaluation dates first"
          : " · source order") +
        ". Each row stays within this source cohort.";
      plot.replaceChildren();
      for (const r of visible) {
        const n = value(r),
          missing = n === null,
          row = e(missing ? "div" : "button", "standard-row");
        row.dataset.model = r.model_variant;
        row.dataset.value = missing ? "null" : String(n);
        row.dataset.comparisonGroup = viewGroup;
        row.dataset.sourceUrl = r.source_url;
        if (missing) row.dataset.missing = "true";
        else {
          row.type = "button";
          row.setAttribute("aria-pressed", String(selected === r));
          row.setAttribute(
            "aria-label",
            r.model_variant +
              ". " +
              fmt(n) +
              " " +
              c.unit +
              ". Effort: " +
              (r.effort || "not reported") +
              ". " +
              c.date_label,
          );
        }
        const track = e(
          "span",
          "bar-track" + (dotCohort(card) ? " dot-track" : ""),
        );
        track.setAttribute("aria-hidden", "true");
        if (!missing) {
          const fill = e("span", "bar-fill");
          if (dotCohort(card)) fill.style.left = (n / maximum) * 100 + "%";
          else fill.style.width = (n / maximum) * 100 + "%";
          track.append(fill);
        }
        row.append(
          e("span", "row-model", r.model_variant),
          track,
          e(
            "span",
            "bar-value",
            missing ? "Missing" : fmt(n) + (percent ? "%" : ""),
          ),
        );
        if (!missing) {
          const select = (announce) => {
            selected = r;
            for (const other of plot.querySelectorAll("button"))
              other.setAttribute("aria-pressed", String(other === row));
            const uncertainty =
              r.stderr_percentage_points != null
                ? "Standard error: " +
                  fmt(r.stderr_percentage_points, 6) +
                  " percentage points; not a confidence interval."
                : r.uncertainty_percentage_points != null
                  ? "Uncertainty: " +
                    fmt(r.uncertainty_percentage_points, 6) +
                    " percentage points · " +
                    r.uncertainty_kind
                  : "Uncertainty not reported; no significance claim.";
            const message =
              fmt(n, 6) +
              " " +
              c.unit +
              " · " +
              metric +
              ". Effort: " +
              (r.effort || "not reported") +
              ". " +
              (r.agent ? "Agent: " + r.agent + ". " : "") +
              (r.fallback ? "Fallback: " + r.fallback + ". " : "");
            inspector.replaceChildren(
              e("strong", "", r.model_variant),
              e("p", "", message),
              e(
                "p",
                "chart-meta",
                "Evaluation date: " +
                  (r.evaluation_date || "unknown") +
                  ". Model release: " +
                  (r.model_release_date || "not reported") +
                  ". " +
                  c.date_label,
              ),
              external(r.source_url, "Original result source"),
              disclosure(
                "Source & settings",
                e("p", "", "Comparison group: " + viewGroup),
                e("p", "", uncertainty),
                e("p", "", "Reported cost: " + measurement(r.reported_cost)),
                e("p", "", "Reported time: " + measurement(r.reported_time)),
                e(
                  "p",
                  "",
                  c.cost_time_status ||
                    "Missing cost/time values remain missing.",
                ),
                raw("Exact source row", r),
                ...(r.source_input
                  ? [local(r.source_input, "Read source input")]
                  : []),
              ),
            );
            if (announce)
              announcement.textContent = r.model_variant + ". " + message;
          };
          row.addEventListener("focus", () => select(true));
          row.addEventListener("click", () => select(true));
          row.addEventListener("pointerenter", () => {
            if (!plot.contains(document.activeElement)) select(false);
          });
        }
        plot.append(row);
      }
      if (!visible.length)
        plot.append(
          e(
            "p",
            "",
            "No matching configurations. Try a model name or effort setting.",
          ),
        );
    }
    draw();
    const ticks = e("div", "standard-ticks");
    for (const n of [0, 25, 50, 75, 100])
      ticks.append(
        e("span", "", fmt((maximum * n) / 100, 0) + (percent ? "%" : "")),
      );
    node.append(
      count,
      plot,
      ticks,
      e(
        "p",
        "standard-axis",
        state.view === "reasoning" || state.view === "knowledge"
          ? "Accuracy on 500 " + state.view + " questions (%)"
          : label + " (" + (percent ? "%" : c.unit) + ")",
      ),
      inspector,
      announcement,
    );
    if (state.view === "tools")
      node.append(
        e(
          "p",
          "missing-note",
          "Three tool-enabled scores are not reported: GPT-6.1 Sol, Claude Sonnet 5.5 and Grok 4.7. Missing values are excluded, not treated as zero.",
        ),
      );
    const table = e("table", "result-data-table standard-table"),
      head = e("thead"),
      tr = e("tr"),
      body = e("tbody");
    table.append(
      e("caption", "", c.date_label + " · exact values for every source row"),
    );
    for (const name of [
      "Model / system",
      label + " (" + c.unit + ")",
      "Effort",
      "Reported cost / time",
      "Source",
    ]) {
      const th = e("th", "", name);
      th.scope = "col";
      tr.append(th);
    }
    head.append(tr);
    table.append(head);
    for (const r of c.rows) {
      const row = e("tr");
      for (const cell of [
        r.model_variant,
        value(r) === null ? "Not reported" : String(value(r)),
        r.effort || "Not reported",
        measurement(r.reported_cost) + " / " + measurement(r.reported_time),
        external(r.source_url, "Source"),
      ]) {
        const td = e("td");
        if (cell instanceof Node) td.append(cell);
        else td.textContent = cell;
        row.append(td);
      }
      body.append(row);
    }
    table.append(body);
    const scroll = e("div", "table-scroll");
    scroll.append(table);
    const d = disclosure("Table alternative · exact values", scroll);
    d.className = "chart-table";
    node.append(d);
    return node;
  }
  const runeSkills = input.expanded.runebench.display_defaults.skills_available;
  function expandedCohort(card, state) {
    if (card.id === "bullshitbench-v2" && state.view === "all")
      return {
        id: "bullshitbench-expanded",
        unit: "percent",
        metric: "clear pushback, all 100 attempts",
        date_label:
          "V2 snapshot released September 29, 2026 · checked October 1; individual evaluation dates unknown",
        comparison_group: "bullshitbench-v2-20260929-all-attempts",
        rows: input.expanded.bullshitbench.records.map((r) => ({
          ...r,
          model_variant: r.model_identifier,
          source_url: results.records.find((r) => r.benchmark_id === card.id)
            .source_url,
          source_input: "data/community-expanded-2026-10-01.json",
        })),
        display_defaults: { row_limit: 12 },
        cost_time_status:
          "Costs cover only reported candidate responses; partial coverage is retained. No expanded cost/time graph is inferred.",
      };
    if (card.id === "medagentbench" && state.view === "all") {
      const m = input.expanded.medical.medagentbench_original;
      return {
        id: "medagentbench-expanded",
        unit: "percent",
        metric: "overall task success",
        date_label:
          "Historical original benchmark · author homepage checked October 1, 2026 · evaluation dates unknown",
        comparison_group: "medagentbench-original-author-homepage",
        rows: m.rows.map((r) => ({
          ...r,
          model_variant: r.model,
          effort: r.reasoning_effort,
          value: r.score,
          source_url: m.source_url,
          source_input: "data/current-medical.original.json",
        })),
      };
    }
    if (
      card.id === "runebench" &&
      (state.view === "score" ||
        !["woodcutting", "mining"].includes(state.skill))
    )
      return {
        id: "runebench-expanded-" + state.skill,
        unit: "normalized XP/min",
        metric: "peak normalized XP rate",
        date_label:
          "September 29, 2026 · 30-minute skill track · one selected trial per effort; no uncertainty intervals",
        comparison_group: "runebench-30m-20260929-v71-" + state.skill,
        rows: input.expanded.runebench.records
          .filter((r) => r.skill === state.skill)
          .map((r) => ({
            ...r,
            source_input: "data/community-expanded-2026-10-01.json",
          })),
      };
    return null;
  }
  let resizeScatter = null;
  window.addEventListener("resize", () => resizeScatter?.());
  function expandedCost(card, cohort) {
    const node = e("article", "chart-card"),
      rows = cohort.rows;
    const plotWidth = Math.max(230, Math.min(640, innerWidth - 64));
    node.id = cohort.id + "-cost";
    node.append(
      e("h2", "", "Peak rate versus estimated API-equivalent cost"),
      e("p", "chart-scale-note", cohort.date_label),
      e(
        "p",
        "",
        "Whole selected-run token-cost estimate in USD; this OAuth run does not establish cash spend. Score uses the nominal 30-minute window. Skills remain separate.",
      ),
    );
    const svg = s("svg", {
      viewBox: "0 0 " + plotWidth + " 370",
      role: "group",
      "aria-label":
        "RuneBench " +
        rows[0].skill +
        ": peak normalized XP rate versus estimated API-equivalent USD",
    });
    svg.classList.add("expanded-scatter");
    const xMax =
        Math.max(0.01, ...rows.map((r) => r.reported_cost.value)) * 1.15,
      yMax = Math.max(1, ...rows.map((r) => r.value)) * 1.15;
    const x = (n) => 52 + (n / xMax) * (plotWidth - 70),
      y = (n) => 300 - (n / yMax) * 265;
    for (let i = 0; i <= 4; i++) {
      const xp = (xMax * i) / 4,
        yp = (yMax * i) / 4;
      svg.append(
        s("line", {
          x1: 52,
          x2: plotWidth - 18,
          y1: y(yp),
          y2: y(yp),
          class: "mini-grid",
        }),
        s("text", { x: 44, y: y(yp) + 4, "text-anchor": "end" }, fmt(yp, 0)),
        s(
          "text",
          { x: x(xp), y: 324, "text-anchor": "middle" },
          "$" + fmt(xp, 2),
        ),
      );
    }
    svg.append(
      s(
        "text",
        { x: plotWidth / 2, y: 354, "text-anchor": "middle" },
        "API-equivalent cost (USD)",
      ),
      s("text", { x: 52, y: 18 }, "Peak normalized XP/min"),
    );
    const inspector = e("div", "chart-inspector");
    inspector.setAttribute("role", "region");
    inspector.setAttribute("aria-label", "Selected skill-run details");
    inspector.append(
      e("strong", "", "Explore a selected trial"),
      e("p", "", "Hover, focus or tap a marker for exact cost and peak."),
    );
    const legend = e("div", "expanded-legend");
    for (const r of rows) {
      const point = s("g", {
        tabindex: 0,
        role: "button",
        "aria-label":
          r.model_variant +
          ". " +
          r.value +
          " normalized XP/min. Estimated API-equivalent USD " +
          r.reported_cost.value,
      });
      const marker = pointShape(
        { reasoning_effort: r.effort },
        x(r.reported_cost.value),
        y(r.value),
        7,
      );
      marker.setAttribute("fill", pointColor({ reasoning_effort: r.effort }));
      point.append(marker);
      svg.append(point);
      const select = () =>
        inspector.replaceChildren(
          e("strong", "", r.model_variant),
          e(
            "p",
            "",
            String(r.value) +
              " normalized XP/min · estimated API-equivalent USD " +
              String(r.reported_cost.value),
          ),
          e("p", "", r.reported_cost.basis),
          e(
            "p",
            "",
            "Tracker duration: " +
              String(r.reported_time.value) +
              " " +
              r.reported_time.unit +
              ". " +
              r.reported_time.basis,
          ),
          external(r.source_url, "Original result source"),
          raw("Exact selected trial", r),
        );
      point.addEventListener("focus", select);
      point.addEventListener("pointerenter", select);
      point.addEventListener("click", select);
      const legendButton = e("button", "", r.model_variant);
      legendButton.type = "button";
      const key = s("svg", {
        viewBox: "0 0 22 22",
        width: 22,
        height: 22,
        "aria-hidden": true,
      });
      key.append(pointShape({ reasoning_effort: r.effort }, 11, 11, 6));
      legendButton.prepend(key);
      legendButton.addEventListener("focus", select);
      legendButton.addEventListener("click", select);
      legend.append(legendButton);
      point.addEventListener("keydown", (ev) => {
        if (["Enter", " "].includes(ev.key)) {
          ev.preventDefault();
          select();
        }
      });
    }
    node.append(svg, legend, inspector);
    const table = e("table", "result-data-table"),
      caption = e("caption", "", "Exact selected runs for " + rows[0].skill),
      head = e("thead"),
      tr = e("tr"),
      body = e("tbody");
    for (const name of [
      "Effort / system",
      "Peak normalized XP/min",
      "API-equivalent USD",
      "Tracker seconds",
      "Source",
    ]) {
      const th = e("th", "", name);
      th.scope = "col";
      tr.append(th);
    }
    head.append(tr);
    table.append(caption, head);
    for (const r of rows) {
      const row = e("tr");
      for (const cell of [
        r.model_variant,
        String(r.value),
        String(r.reported_cost.value),
        String(r.reported_time.value),
        external(r.source_url, "Source"),
      ]) {
        const td = e("td");
        if (cell instanceof Node) td.append(cell);
        else td.textContent = cell;
        row.append(td);
      }
      body.append(row);
    }
    table.append(body);
    const scroll = e("div", "table-scroll");
    scroll.append(table);
    const d = disclosure("Table alternative · exact values", scroll);
    d.className = "chart-table";
    node.append(d);
    resizeScatter = () => {
      if (node.isConnected) node.replaceWith(expandedCost(card, cohort));
    };
    return node;
  }
  function detailState() {
    const p = new URL(location.href).searchParams;
    const id = byId.has(p.get("benchmark"))
      ? p.get("benchmark")
      : "hle-diamond";
    const card = byId.get(id);
    const choices =
      card.id === "design2code-v3-484"
        ? Object.keys(window.LAB_FRONTEND.metrics)
        : card.id === "hle-diamond"
          ? ["score", "reasoning", "knowledge", "tools"]
          : card.id === "runebench"
            ? ["woodcutting", "mining"].includes(
                p.get("skill") || "woodcutting",
              )
              ? ["cost", "time", "score"]
              : ["cost", "score"]
            : card.id === "bullshitbench-v2"
              ? ["time", "cost", "all"]
              : card.id === "medagentbench"
                ? ["score", "all"]
                : ["score"];
    return {
      id,
      view: choices.includes(p.get("view"))
        ? p.get("view")
        : card.id === "runebench"
          ? "cost"
          : choices[0],
      skill: runeSkills.includes(p.get("skill"))
        ? p.get("skill")
        : "woodcutting",
      config: (p.get("config") || "").slice(0, 200),
      all: p.get("all") === "1",
      comparison: p.get("comparison") === "methods" ? "methods" : "direct",
    };
  }
  function detailView() {
    const back = document.querySelector(".back-link");
    const returnPosition = detailReturnPosition();
    if (back && returnPosition) {
      back.href = returnPosition.url;
      back.addEventListener("click", (event) => {
        if (!ordinaryClick(event)) return;
        event.preventDefault();
        history.back();
      });
    }
    detail.addEventListener("click", (event) => {
      if (!ordinaryClick(event) || !(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link || !detail.contains(link)) return;
      const url = new URL(link.href);
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search ||
        !url.hash
      )
        return;
      let id;
      try {
        id = decodeURIComponent(url.hash.slice(1));
      } catch {
        return;
      }
      if (!/^[a-z0-9-]+$/.test(id)) return;
      const target = document.getElementById(id);
      if (!target || !detail.contains(target)) return;
      event.preventDefault();
      // A section jump is part of this detail entry, like a graph variant.
      history.replaceState(historyState(), "", url);
      openHash();
      if (target.tagName === "DETAILS")
        target.querySelector("summary")?.focus({ preventScroll: true });
    });
    function render(state) {
      resizeScatter = null;
      window.LAB_CHARTS?.reset();
      const card = byId.get(state.id),
        notes = input.notes[card.id],
        graph = graphFor(card),
        viewCohort = expandedCohort(card, state);
      document.title = card.name + " · Jordan’s Lab";
      detail.className = "category-" + card.category;
      detail.replaceChildren();
      const header = e("header", "detail-header");
      const badges = e("div");
      badges.append(
        e("span", "category-badge", categories[card.category]),
        e(
          "span",
          "card-status" + (isHistorical(card) ? " historical-status" : ""),
          status(card),
        ),
      );
      header.append(
        badges,
        e(
          "h1",
          "",
          card.id === "design2code-v3-484"
            ? "Design2Code"
            : card.id === "medagentbench"
              ? "MedAgentBench"
              : card.name,
        ),
        e(
          "p",
          "detail-question",
          notes.question ||
            card.standard?.description ||
            card.frontend?.summary ||
            card.original?.summary,
        ),
        e(
          "p",
          "detail-dates",
          viewCohort?.date_label ||
            card.standard?.date_label ||
            notes.date ||
            "Discovery snapshot: September 30, 2026 · source pages not freshly polled",
        ),
      );
      detail.append(header);
      if (isHistorical(card))
        detail.append(
          e(
            "p",
            "historical-notice",
            (viewCohort?.date_label ||
              card.standard?.date_label ||
              notes.date) +
              ". This is a historical comparison, not current standings.",
          ),
        );
      if (graph) {
        const form = e("form", "view-controls");
        form.setAttribute("aria-label", "Choose graph view");
        const options =
          card.id === "design2code-v3-484"
            ? Object.entries(window.LAB_FRONTEND.metrics)
            : card.id === "hle-diamond"
              ? [
                  ["score", "No tools"],
                  ["reasoning", "Reasoning"],
                  ["knowledge", "Knowledge"],
                  ["tools", "Web + code"],
                ]
              : ["runebench", "bullshitbench-v2"].includes(card.id)
                ? [
                    [
                      "time",
                      card.id === "runebench"
                        ? "Progress over time"
                        : "Score vs time",
                    ],
                    ["cost", "Score vs cost"],
                    [
                      card.id === "runebench" ? "score" : "all",
                      card.id === "runebench"
                        ? "Peak scores"
                        : "All 228 configurations",
                    ],
                  ]
                : card.id === "medagentbench"
                  ? [
                      ["score", "Original paper slice"],
                      ["all", "All 12 historical models"],
                    ]
                  : [];
        if (
          card.id === "runebench" &&
          !["woodcutting", "mining"].includes(state.skill)
        )
          options.splice(0, 1);
        if (options.length) {
          const fs = e("fieldset", "view-options");
          fs.append(e("legend", "sr-only", "Graph view"));
          for (const [value, label] of options) {
            const l = e("label"),
              radio = e("input");
            radio.type = "radio";
            radio.name = "view";
            radio.value = value;
            radio.checked = state.view === value;
            l.append(radio, e("span", "", label));
            fs.append(l);
          }
          form.append(fs);
        }
        if (card.id === "runebench") {
          const label = e("label", "skill-picker", "Skill"),
            select = e("select");
          select.name = "skill";
          select.setAttribute("aria-label", "RuneBench skill");
          for (const skill of runeSkills) {
            const option = e(
              "option",
              "",
              skill[0].toUpperCase() + skill.slice(1),
            );
            option.value = skill;
            option.selected = skill === state.skill;
            select.append(option);
          }
          label.append(select);
          form.append(label);
        }
        if (card.id === "design2code-v3-484") {
          const label = e("label", "skill-picker", "Compare"),
            select = e("select");
          select.name = "comparison";
          select.setAttribute("aria-label", "Design2Code comparison");
          for (const [value, text] of [
            ["direct", "Four Direct configurations"],
            ["methods", "GPT-4o prompting methods"],
          ]) {
            const option = e("option", "", text);
            option.value = value;
            option.selected = state.comparison === value;
            select.append(option);
          }
          label.append(select);
          form.append(label);
        }
        form.addEventListener("submit", (ev) => ev.preventDefault());
        form.addEventListener("change", (event) => {
          const changedSkill = event.target.name === "skill";
          const next = {
            ...state,
            view: form.elements.view?.value || state.view,
            skill: form.elements.skill?.value || state.skill,
            comparison: form.elements.comparison?.value || state.comparison,
          };
          if (
            next.id === "runebench" &&
            next.view === "time" &&
            !["woodcutting", "mining"].includes(next.skill)
          )
            next.view = "cost";
          const url = new URL(location.href);
          url.search = "";
          url.searchParams.set("benchmark", next.id);
          url.searchParams.set("view", next.view);
          if (next.id === "runebench")
            url.searchParams.set("skill", next.skill);
          if (next.id === "design2code-v3-484")
            url.searchParams.set("comparison", next.comparison);
          url.hash = "";
          history.replaceState(historyState(), "", url);
          render(next);
          const selector =
            event.target.name === "comparison"
              ? "select[name=comparison]"
              : next.id === "runebench" && changedSkill
                ? "select[name=skill]"
                : `input[value="${next.view}"]`;
          detail.querySelector(selector)?.focus({ preventScroll: true });
        });
        if (options.length || card.id === "runebench") detail.append(form);
        const expanded = viewCohort;
        detail.append(
          card.frontend
            ? window.LAB_FRONTEND.chart(card.frontend, state)
            : card.standard
              ? standardChart(card, state)
              : expanded
                ? card.id === "runebench" && state.view === "cost"
                  ? expandedCost(card, expanded)
                  : standardChart(card, state, expanded)
                : originalChart(card, state),
        );
        const notice = e("p", "detail-notice");
        notice.append(
          e("strong", "", "Keep in mind. "),
          document.createTextNode(
            (notes.notice &&
              (card.id === "runebench" && state.view === "cost"
                ? notes.notice +
                  " API-equivalent estimate, not cash spend; whole-run cost versus a 30-minute score window."
                : notes.notice)) ||
              (card.standard.display_status === "historical_source_cohort"
                ? "Lab-reported comparison, with incomplete harness and trial details. No uncertainty intervals or cost/time results supplied."
                : "Cross-lab reported results; setups differ. No controlled ranking, uncertainty intervals or cost/time results supplied."),
          ),
        );
        detail.append(notice);
      } else {
        const panel = e("section", "evidence-panel");
        panel.append(
          e(
            "h2",
            "",
            card.original?.entryType === "showcase"
              ? "A showcase, not a scored comparison"
              : "The evidence comes first",
          ),
          e(
            "p",
            "",
            "This guide describes the test and keeps its original sources. Model scores haven’t been added here, so there is no numerical graph to show.",
          ),
          local("#benchmark-sources", "Read the original sources"),
        );
        detail.append(panel);
      }
      detail.append(explanation(card), technicalSection(card));
      detail.hidden = false;
      unavailable.hidden = true;
      openHash();
    }
    function openHash() {
      let id;
      try {
        id = decodeURIComponent(location.hash.slice(1));
      } catch {
        return;
      }
      if (!id || !/^[a-z0-9-]+$/.test(id)) return;
      const target = document.getElementById(id);
      if (target && detail.contains(target)) {
        for (let n = target; n && n !== detail; n = n.parentElement)
          if (n.tagName === "DETAILS") n.open = true;
        if (target.tagName === "DETAILS") target.open = true;
        requestAnimationFrame(() => target.scrollIntoView());
      }
    }
    window.addEventListener("popstate", () => render(detailState()));
    window.addEventListener("hashchange", openHash);
    render(detailState());
  }
  if (detail) detailView();
  else gallery();
})();
