(() => {
  "use strict";
  const input = window.LAB_GALLERY,
    catalog = window.LAB_CATALOG,
    results = window.LAB_RESULTS;
  const unavailable = document.getElementById("gallery-unavailable");
  const detail = document.getElementById("benchmark-detail");
  const categories = {
    standard: "Standard",
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
      input.standard?.cards?.length !== 6
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
        c.category !== "standard" ||
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
    return (
      ids.size === 26 &&
      input.standard.cards.reduce((n, c) => n + c.rows.length, 0) === 30 &&
      Object.values(input.standard.sources).every((s) => safeURL(s.url)) &&
      [...ids].every(
        (id) =>
          typeof input.notes[id]?.matters === "string" &&
          typeof input.notes[id]?.read === "string",
      ) &&
      results.records.every((r) => safeURL(r.source_url) && finite(r.value))
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
    ...input.standard.cards.map((c) => ({
      id: c.id,
      name: c.name,
      category: "standard",
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
    "bullshitbench-v2",
    "runebench",
    "gpqa-diamond",
    "medagentbench",
    "frontiermath-tier4-v2",
    "mmmu-pro",
    "terminal-bench-2",
    "swe-bench-pro-public-v1",
  ];
  all.sort((a, b) => {
    const ai = priority.indexOf(a.id),
      bi = priority.indexOf(b.id);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
  });
  function graphFor(card) {
    return (
      card.standard ||
      results.graph_views.charts.find(
        (c) => c.id === input.notes[card.id].main_graph,
      )
    );
  }
  function status(card) {
    return card.standard
      ? card.standard.display_status === "historical_source_cohort"
        ? "Historical · Mar 2026"
        : card.id === "frontiermath-tier4-v2"
          ? "Cross-lab reports"
          : "Creator results · Oct 2026"
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
          card.original.entryType === "showcase"
            ? "A documented achievement"
            : "Explore the evidence",
        ),
        e(
          "p",
          "",
          card.original.status === "unverified"
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
        ? card.standard.rows.map((r) => ({
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
        if (card.id === "frontiermath-tier4-v2")
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
      e("span", "card-status", status(card)),
    );
    a.append(
      top,
      e("h3", "", card.id === "medagentbench" ? "MedAgentBench" : card.name),
      e(
        "p",
        "card-question",
        input.notes[card.id].question ||
          card.standard?.description ||
          card.original.summary,
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
          card.standard
            ? card.id === "frontiermath-tier4-v2"
              ? "Reported accuracy · 0–100%"
              : "Accuracy · 0–100%"
            : card.id === "medagentbench"
              ? "Task success · 0–100%"
              : card.id === "runebench"
                ? "Woodcutting · 3 effort settings"
                : "6 model / effort settings",
        ),
        document.createTextNode(
          card.id === "runebench"
            ? " · estimate, not cash spend"
            : card.standard?.display_status === "historical_source_cohort"
              ? " · historical source cohort"
              : card.id === "frontiermath-tier4-v2"
                ? " · different lab setups"
                : " · open to explore",
        ),
      );
    else
      cap.textContent =
        card.original.sourceSetting +
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
      };
    }
    function render(state) {
      form.elements.category.value = state.category;
      form.elements.q.value = state.q;
      form.elements.graphs.checked = state.graphs;
      const q = state.q.toLocaleLowerCase();
      const cards = all.filter(
        (c) =>
          (state.category === "all" || c.category === state.category) &&
          (!state.graphs || graphFor(c)) &&
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
      };
      const url = new URL(location.href);
      url.search = "";
      if (state.category !== "all")
        url.searchParams.set("category", state.category);
      if (state.q) url.searchParams.set("q", state.q);
      if (state.graphs) url.searchParams.set("graphs", "1");
      if (push) history.pushState({}, "", url);
      else history.replaceState({}, "", url);
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
    window.addEventListener("popstate", () => render(fromURL()));
    unavailable.hidden = true;
    render(fromURL());
  }
  function sourceSection(card) {
    const wrap = e("div"),
      list = e("ul", "source-list");
    let sources = [];
    if (card.standard)
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
        notes.tests || card.standard?.description || card.original.summary,
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
    return group;
  }
  function technicalSection(card) {
    const stack = e("section", "technical-stack");
    stack.setAttribute("aria-label", "Sources and supporting details");
    stack.append(sourceSection(card));
    const body = e("div");
    if (card.standard) {
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
          "data/standard-benchmarks.original.json",
          "Read the original standard benchmark dataset",
        ),
      );
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
    if (!card.standard && window.LAB_CHARTS) {
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
  function standardChart(card, state) {
    const c = card.standard,
      node = e("article", "chart-card standard-chart"),
      heading = e(
        "h2",
        "",
        state.view === "tools"
          ? "Accuracy with web and code"
          : state.view === "reasoning"
            ? "Reasoning questions"
            : state.view === "knowledge"
              ? "Knowledge questions"
              : card.id === "frontiermath-tier4-v2"
                ? "Reported research-math scores"
                : "Accuracy on the test",
      );
    node.id = card.id + "-" + state.view;
    node.append(
      heading,
      e(
        "p",
        "chart-scale-note",
        "Score axis: 0–100%. " +
          (state.view === "tools"
            ? "Separate web + code setting."
            : c.id === "hle-diamond"
              ? "High effort · no tools."
              : c.display_status === "historical_source_cohort"
                ? "Historical lab-reported cohort."
                : "Cross-lab reports; setups differ."),
      ),
    );
    const plot = e("div", "standard-plot");
    plot.setAttribute("role", "group");
    plot.setAttribute("aria-label", heading.textContent);
    const inspector = e("div", "chart-inspector");
    inspector.setAttribute("role", "region");
    inspector.setAttribute("aria-label", "Selected model result");
    inspector.append(
      e("strong", "", "Explore a model"),
      e(
        "p",
        "",
        "Hover, focus or tap a model to see its exact score and source.",
      ),
    );
    const announcement = e("span", "sr-only");
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
    c.rows.forEach((r, index) => {
      const n = value(r),
        missing = n === null,
        row = e(missing ? "div" : "button", "standard-row");
      row.dataset.model = r.model_variant;
      row.dataset.value = n === null ? "null" : String(n);
      row.dataset.comparisonGroup = viewGroup;
      row.dataset.sourceUrl = r.source_url;
      if (missing) row.dataset.missing = "true";
      else {
        row.type = "button";
        row.setAttribute("aria-pressed", "false");
        row.setAttribute(
          "aria-label",
          r.model_variant +
            ". " +
            fmt(n) +
            " percent. Effort: " +
            r.effort +
            ". " +
            c.date_label,
        );
      }
      const track = e(
        "span",
        "bar-track" + (card.id === "frontiermath-tier4-v2" ? " dot-track" : ""),
      );
      track.setAttribute("aria-hidden", "true");
      if (!missing) {
        const fill = e("span", "bar-fill");
        if (card.id === "frontiermath-tier4-v2") fill.style.left = n + "%";
        else fill.style.width = n + "%";
        track.append(fill);
      } else track.append(e("span", "sr-only", "Not reported"));
      row.append(
        e("span", "row-model", r.model_variant),
        track,
        e("span", "bar-value", missing ? "Missing" : fmt(n) + "%"),
      );
      if (!missing) {
        const select = (announce) => {
          for (const other of plot.querySelectorAll("button"))
            other.setAttribute("aria-pressed", String(other === row));
          const message =
            fmt(n) +
            "% accuracy · " +
            (state.view === "tools"
              ? "web + code"
              : c.id === "hle-diamond"
                ? "no tools"
                : c.settings.tools) +
            " · " +
            r.effort +
            " effort";
          inspector.replaceChildren(
            e("strong", "", r.model_variant),
            e("p", "", message),
            e(
              "p",
              "chart-meta",
              c.date_label +
                " · Individual evaluation date " +
                (c.id === "hle-diamond" ? "unknown" : "not supplied"),
            ),
            external(r.source_url, "Original result source"),
            disclosure(
              "Source & settings",
              e("p", "chart-meta", "Comparison group: " + viewGroup),
              e(
                "p",
                "chart-meta",
                "Cost and time: not reported. No uncertainty intervals supplied.",
              ),
              raw("Exact source row", r),
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
    });
    const ticks = e("div", "standard-ticks");
    for (const n of [0, 25, 50, 75, 100]) ticks.append(e("span", "", n + "%"));
    node.append(
      plot,
      ticks,
      e(
        "p",
        "standard-axis",
        state.view === "reasoning" || state.view === "knowledge"
          ? "Accuracy on 500 " + state.view + " questions (%)"
          : "Accuracy (%)",
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
    const table = e("table", "result-data-table standard-table");
    table.append(
      e(
        "caption",
        "",
        c.date_label +
          " · " +
          (state.view === "tools"
            ? "web + code"
            : c.id === "hle-diamond"
              ? "no tools"
              : "source cohort"),
      ),
    );
    const head = e("thead"),
      tr = e("tr");
    for (const name of [
      "Model",
      "Accuracy (%)",
      "Effort",
      "Cost / time",
      "Source",
    ]) {
      const th = e("th", "", name);
      th.scope = "col";
      tr.append(th);
    }
    head.append(tr);
    table.append(head);
    const body = e("tbody");
    for (const r of c.rows) {
      const row = e("tr");
      for (const cell of [
        r.model_variant,
        value(r) === null ? "Not reported" : String(value(r)),
        r.effort,
        "Not reported / not reported",
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
  function detailState() {
    const p = new URL(location.href).searchParams;
    const id = byId.has(p.get("benchmark"))
      ? p.get("benchmark")
      : "hle-diamond";
    const card = byId.get(id);
    const choices =
      card.id === "hle-diamond"
        ? ["score", "reasoning", "knowledge", "tools"]
        : ["runebench", "bullshitbench-v2"].includes(card.id)
          ? ["time", "cost"]
          : ["score"];
    return {
      id,
      view: choices.includes(p.get("view"))
        ? p.get("view")
        : card.id === "runebench"
          ? "cost"
          : choices[0],
      skill: p.get("skill") === "mining" ? "mining" : "woodcutting",
    };
  }
  function detailView() {
    function render(state) {
      window.LAB_CHARTS?.reset();
      const card = byId.get(state.id),
        notes = input.notes[card.id],
        graph = graphFor(card);
      document.title = card.name + " · Jordan’s Lab";
      detail.className = "category-" + card.category;
      detail.replaceChildren();
      const header = e("header", "detail-header");
      const badges = e("div");
      badges.append(
        e("span", "category-badge", categories[card.category]),
        e("span", "card-status", status(card)),
      );
      header.append(
        badges,
        e("h1", "", card.id === "medagentbench" ? "MedAgentBench" : card.name),
        e(
          "p",
          "detail-question",
          notes.question || card.standard?.description || card.original.summary,
        ),
        e(
          "p",
          "detail-dates",
          card.standard?.date_label ||
            notes.date ||
            "Discovery snapshot: September 30, 2026 · source pages not freshly polled",
        ),
      );
      detail.append(header);
      if (graph) {
        const form = e("form", "view-controls");
        form.setAttribute("aria-label", "Choose graph view");
        const options =
          card.id === "hle-diamond"
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
                ]
              : [];
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
          for (const skill of ["woodcutting", "mining"]) {
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
        form.addEventListener("submit", (ev) => ev.preventDefault());
        form.addEventListener("change", (event) => {
          const changedSkill = event.target.name === "skill";
          const next = {
            ...state,
            view: form.elements.view?.value || state.view,
            skill: form.elements.skill?.value || state.skill,
          };
          const url = new URL(location.href);
          url.search = "";
          url.searchParams.set("benchmark", next.id);
          url.searchParams.set("view", next.view);
          if (next.id === "runebench")
            url.searchParams.set("skill", next.skill);
          url.hash = "";
          history.pushState({}, "", url);
          render(next);
          const selector =
            next.id === "runebench" && changedSkill
              ? "select"
              : `input[value="${next.view}"]`;
          detail.querySelector(selector)?.focus({ preventScroll: true });
        });
        if (options.length || card.id === "runebench") detail.append(form);
        detail.append(
          card.standard
            ? standardChart(card, state)
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
                ? "Historical March 2026 lab-reported comparison, with incomplete harness and trial details. No uncertainty intervals or cost/time results supplied."
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
            card.original.entryType === "showcase"
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
