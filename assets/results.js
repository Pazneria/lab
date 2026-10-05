(() => {
  "use strict";
  const names = {
    runebench: "RuneBench",
    "bullshitbench-v2": "BullshitBench V2",
    medagentbench: "MedAgentBench",
  };
  const controls = document.getElementById("result-controls");
  const content = document.getElementById("results-content");
  const fallback = document.getElementById("results-unavailable");
  const data = window.LAB_RESULTS;
  const finite = (n) => typeof n === "number" && Number.isFinite(n) && n >= 0;
  const text = (s) => typeof s === "string" && s.trim().length > 0;
  const date = (s) =>
    s === null ||
    (typeof s === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(s) &&
      new Date(s + "T00:00:00Z").toISOString().slice(0, 10) === s);
  function safeURL(s) {
    try {
      const u = new URL(s);
      return u.protocol === "https:" && !u.username && !u.password;
    } catch {
      return false;
    }
  }
  function valid() {
    if (
      !data ||
      !Array.isArray(data.records) ||
      data.records.length !== 18 ||
      data.aggregation?.enabled !== false ||
      data.provenance?.independently_executed_evaluations !== false
    )
      return false;
    const ids = new Set(),
      protocols = new Set(data.protocols?.map((p) => p.id)),
      sources = new Set(data.sources?.map((s) => s.id));
    if (
      protocols.size !== 3 ||
      data.protocols.length !== 3 ||
      sources.size !== 27 ||
      data.sources.length !== 27 ||
      !data.sources.every(
        (s) =>
          text(s.id) &&
          safeURL(s.url) &&
          (!s.alternate_url || safeURL(s.alternate_url)),
      )
    )
      return false;
    for (const r of data.records) {
      if (
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.result_id) ||
        ids.has(r.result_id) ||
        !Object.hasOwn(names, r.benchmark_id) ||
        !protocols.has(r.protocol_id) ||
        !finite(r.value) ||
        !text(r.display_label) ||
        !text(r.model_identifier) ||
        !text(r.metric_name) ||
        !safeURL(r.source_url) ||
        !date(r.evaluation_date) ||
        !date(r.access_date) ||
        r.independently_rerun !== false ||
        r.model_snapshot_id !== null
      )
        return false;
      if (
        !r.source_ids?.every((id) => sources.has(id)) ||
        !r.cost ||
        !r.time ||
        (r.cost.value !== null && !finite(r.cost.value))
      )
        return false;
      if (r.unit === "percent" && r.value > 100) return false;
      if (
        r.benchmark_id === "medagentbench" &&
        (r.cost.value !== null ||
          r.time.mean_request_seconds !== null ||
          r.time.wall_clock_seconds !== null ||
          r.evaluation_date !== null)
      )
        return false;
      if (
        r.benchmark_id === "bullshitbench-v2" &&
        (r.denominator !== 100 || !finite(r.time.mean_request_seconds))
      )
        return false;
      ids.add(r.result_id);
    }
    const expected = [
      "bullshitbench-score-cost",
      "bullshitbench-score-time",
      "runebench-woodcutting-score-cost",
      "runebench-woodcutting-score-time",
      "runebench-mining-score-cost",
      "runebench-mining-score-time",
      "medagentbench-historical-score",
    ];
    const charts = data.graph_views?.charts;
    if (
      !Array.isArray(charts) ||
      charts.length !== 7 ||
      new Set(charts.map((c) => c.id)).size !== 7
    )
      return false;
    for (const c of charts) {
      if (
        !expected.includes(c.id) ||
        !["scatter", "line", "bar"].includes(c.type) ||
        !text(c.title) ||
        !text(c.x?.label) ||
        !text(c.y?.label) ||
        !text(c.x.unit) ||
        !text(c.y.unit)
      )
        return false;
      for (const axis of [c.x, c.y])
        if (
          axis.domain &&
          (!Array.isArray(axis.domain) ||
            axis.domain.length !== 2 ||
            !axis.domain.every(finite) ||
            axis.domain[1] <= axis.domain[0])
        )
          return false;
      if (c.type === "line") {
        if (
          c.x.domain?.[0] !== 0 ||
          c.x.domain?.[1] !== 30 ||
          c.series?.length !== 3
        )
          return false;
        const groups = new Set();
        for (const s of c.series) {
          const r = data.records.find((r) => r.result_id === s.result_id);
          if (
            !r ||
            r.benchmark_id !== "runebench" ||
            !c.id.includes(r.skill) ||
            s.points?.length !== 120
          )
            return false;
          groups.add(r.comparability_group);
          let x = -1,
            y = -1;
          for (const p of s.points) {
            if (
              !finite(p.elapsed_minutes) ||
              p.elapsed_minutes >= 30 ||
              p.elapsed_minutes <= x ||
              !finite(p.peak_normalized_xp_per_min) ||
              p.peak_normalized_xp_per_min < y
            )
              return false;
            x = p.elapsed_minutes;
            y = p.peak_normalized_xp_per_min;
          }
          if (y !== r.value) return false;
        }
        if (groups.size !== 1) return false;
      } else {
        if (!Array.isArray(c.points) || !c.points.length) return false;
        for (const p of c.points) {
          const r = data.records.find((r) => r.result_id === p.result_id);
          if (
            !r ||
            !finite(p.x) ||
            p.source_url !== r.source_url ||
            !safeURL(p.source_url) ||
            p.label !== r.display_label
          )
            return false;
          if (c.type === "bar") {
            if (r.benchmark_id !== "medagentbench" || p.x !== r.value)
              return false;
          } else {
            if (
              !finite(p.y) ||
              p.y !== r.value ||
              c.protocol_id !== r.protocol_id
            )
              return false;
            if (
              c.id.endsWith("-cost") &&
              (p.x !== r.cost.value ||
                (r.benchmark_id === "bullshitbench-v2" &&
                  !r.graph_eligibility.score_cost))
            )
              return false;
            if (
              c.id === "bullshitbench-score-time" &&
              p.x !== r.time.mean_request_seconds
            )
              return false;
            if (r.skill && !c.id.includes(r.skill)) return false;
          }
        }
      }
      if (!c.caveats?.every(text)) return false;
      if (
        c.excluded &&
        (!Array.isArray(c.excluded) ||
          c.excluded.some((e) => !ids.has(e.result_id) || !text(e.reason)))
      )
        return false;
    }
    return true;
  }
  try {
    if (!valid()) throw new Error("Invalid result data");
  } catch {
    fallback?.replaceChildren(
      document.createTextNode(
        "The result data could not be validated. Charts are unavailable. ",
      ),
    );
    const link = document.createElement("a");
    link.href = "data/results.original.json";
    link.textContent = "Read the supplied original data";
    fallback?.append(link);
    if (controls) controls.hidden = true;
    return;
  }
  const records = new Map(data.records.map((r) => [r.result_id, r]));
  const protocols = new Map(data.protocols.map((p) => [p.id, p]));
  const sources = new Map(data.sources.map((s) => [s.id, s]));
  let observers = [];
  function el(tag, className, value) {
    const n = document.createElement(tag);
    if (className) n.className = className;
    if (value !== undefined) n.textContent = value;
    return n;
  }
  function svg(tag, attrs = {}, value) {
    const n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, String(v));
    if (value !== undefined) n.textContent = value;
    return n;
  }
  function link(url, label, className = "") {
    const n = el("a", className, label);
    if (
      safeURL(url) ||
      url.startsWith("data/") ||
      url.startsWith("index.html") ||
      url.startsWith("#")
    )
      n.setAttribute("href", url);
    return n;
  }
  function format(n, digits = 2) {
    return n === null
      ? "Not reported"
      : Number(n).toLocaleString("en-US", {
          maximumFractionDigits: digits,
          minimumFractionDigits: 0,
        });
  }
  const score = (r) =>
    `${format(r.value, 2)}${r.unit === "percent" ? "%" : " normalized XP/min"}`;
  function fields(items) {
    const dl = el("dl");
    for (const [label, value] of items) {
      const block = el("div");
      block.append(el("dt", "", label), el("dd", "", value));
      dl.append(block);
    }
    return dl;
  }
  function rawDetails(label, object) {
    const d = el("details");
    d.append(
      el("summary", "", label),
      el("pre", "protocol-content-raw", JSON.stringify(object, null, 2)),
    );
    return d;
  }
  function makeTable(headers, rows, caption, mobile = false) {
    const table = el(
      "table",
      "result-data-table" + (mobile ? " observation-table-mobile" : ""),
    );
    table.setAttribute("role", "table");
    table.append(el("caption", "", caption));
    const head = el("thead");
    head.setAttribute("role", "rowgroup");
    const tr = el("tr");
    tr.setAttribute("role", "row");
    for (const h of headers) {
      const th = el("th", "", h);
      th.scope = "col";
      th.setAttribute("role", "columnheader");
      tr.append(th);
    }
    head.append(tr);
    table.append(head);
    const body = el("tbody");
    body.setAttribute("role", "rowgroup");
    for (const row of rows) {
      const tr = el("tr");
      tr.setAttribute("role", "row");
      row.forEach((value, i) => {
        const cell = el(i === 0 ? "th" : "td");
        cell.setAttribute("role", i === 0 ? "rowheader" : "cell");
        if (i === 0) cell.scope = "row";
        else cell.dataset.label = headers[i];
        if (value instanceof Node) cell.append(value);
        else cell.textContent = String(value);
        tr.append(cell);
      });
      body.append(tr);
    }
    table.append(body);
    return table;
  }
  function color(r) {
    if (r.benchmark_id === "runebench")
      return { low: "#264d50", medium: "#9a3b25", high: "#554a85" }[
        r.reasoning_effort
      ];
    return r.model_identifier.includes("opus")
      ? "#554a85"
      : r.model_identifier.includes("sonnet")
        ? "#9a3b25"
        : "#264d50";
  }
  function pointSymbol(r, x, y, className = "plot-symbol") {
    const attrs = { fill: color(r), class: className };
    if (r.reasoning_effort === "max" || r.reasoning_effort === "high")
      return svg("path", {
        ...attrs,
        d: `M ${x} ${y - 7} L ${x + 7} ${y} L ${x} ${y + 7} L ${x - 7} ${y} Z`,
      });
    if (r.reasoning_effort === "medium")
      return svg("rect", {
        ...attrs,
        x: x - 6,
        y: y - 6,
        width: 12,
        height: 12,
      });
    return svg("circle", { ...attrs, cx: x, cy: y, r: 6 });
  }
  function niceMax(max) {
    if (max <= 0) return 1;
    const power = 10 ** Math.floor(Math.log10(max));
    const value = max / power;
    const step = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find(
      (n) => value <= n,
    );
    return step * power;
  }
  function selectionText(r, c, p, index) {
    if (c.type === "line")
      return `At ${format(p.elapsed_minutes, 5)} minutes (${Math.round(p.elapsed_minutes * 60000)} ms), best rate found: ${format(p.peak_normalized_xp_per_min)} normalized XP/min. Sample ${index + 1} of 120.`;
    if (c.type === "bar")
      return `Overall task success: ${score(r)}. Query ${format(r.secondary_outcomes[0].value)}%; action ${format(r.secondary_outcomes[1].value)}%.`;
    return `${score(r)} · ${format(p.x, c.x.unit === "USD" ? 6 : 5)} ${c.x.unit}. ${c.id.endsWith("-cost") ? r.cost.basis : "Mean instrumented request time per prompt; not pure inference."}`;
  }
  function chartCard(c) {
    const directions = new Set(
      (c.points || c.series).map((p) => records.get(p.result_id).direction),
    );
    const direction = directions.size === 1 ? [...directions][0] : undefined;
    const rankedPoints =
      c.type === "line"
        ? null
        : window.LAB_METRIC_ORDER.order(
            c.points,
            (p) => (c.type === "bar" ? p.x : p.y),
            direction,
            { eligible: (p) => window.LAB_METRIC_ORDER.measured(p.x) },
          );
    if (c.type === "bar") c = { ...c, points: rankedPoints };
    const card = el(
      "article",
      "chart-card" + (c.type === "bar" ? " bar-chart" : ""),
    );
    card.id = c.id;
    const heading = el("h3", "", c.title);
    heading.id = c.id + "-title";
    card.append(heading);
    const first = records.get((c.points || c.series)[0].result_id);
    const proto = protocols.get(first.protocol_id);
    card.append(
      el(
        "p",
        "chart-meta",
        `${first.benchmark_id === "medagentbench" ? "Paper v2: 2025-02-12; evaluation date unknown" : "Evaluation: " + (first.benchmark_id === "runebench" ? "2026-09-29" : "2026-09-25–29")} · Source access: 2026-09-30 · Protocol: ${proto.id}`,
      ),
    );
    card.append(
      el(
        "p",
        "chart-axis-label",
        `${c.y.label}${c.y.unit === "category" ? "" : ` (${c.y.unit === "percent" ? "%" : c.y.unit})`}`,
      ),
    );
    let zoom = false,
      selected = null,
      width = 600,
      activeSeries = 0;
    const scaleNote = el("p", "chart-scale-note");
    const plot = el("div", "chart-plot");
    const canvas = svg("svg", { role: "group", "aria-labelledby": heading.id });
    const description = svg(
      "desc",
      {},
      "Source-reported observations. Use point or series labels, the keyboard sample control, or the complete table alternative to read exact values.",
    );
    canvas.append(description);
    plot.append(canvas);
    card.append(
      scaleNote,
      plot,
      el(
        "p",
        "chart-axis-label x-label",
        `${c.x.label} (${c.x.unit === "percent" ? "%" : c.x.unit})`,
      ),
    );
    if (c.id.startsWith("bullshitbench")) {
      const button = el("button", "zoom-button", "Zoom score axis to 50–75%");
      button.type = "button";
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => {
        zoom = !zoom;
        button.setAttribute("aria-pressed", String(zoom));
        button.textContent = zoom
          ? "Show full score axis, 0–100%"
          : "Zoom score axis to 50–75%";
        draw();
      });
      card.append(button);
    }
    const legend = el("div", "chart-legend");
    legend.setAttribute("role", "group");
    legend.setAttribute("aria-label", "Select observation or series");
    const inspector = el("div", "chart-inspector");
    inspector.id = c.id + "-inspection";
    inspector.setAttribute("role", "region");
    inspector.setAttribute("aria-label", c.title + ": selected point details");
    const announcement = el("span", "sr-only");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", "polite");
    inspector.append(
      el("strong", "", "Explore a point"),
      el(
        "p",
        "",
        "Hover, focus, or tap a point or its label. Details remain here until you choose another point or press Escape.",
      ),
    );
    let slider;
    function inspect(resultId, point, index = null, announce = false) {
      const r = records.get(resultId);
      selected = { resultId, point, index };
      const message = selectionText(r, c, point, index);
      inspector.replaceChildren(
        el("strong", "", r.display_label),
        el("p", "", message),
        el(
          "p",
          "chart-meta",
          `Model: ${r.model_identifier} · ${r.model_identifier_kind}. ${r.reasoning_effort ? "Effort: " + r.reasoning_effort + ". " : ""}Immutable snapshot: unknown.`,
        ),
        el(
          "p",
          "chart-meta",
          `Evaluation: ${r.evaluation_date || "unknown"}${r.paper_version_date ? " · Paper version: " + r.paper_version_date : ""} · Protocol: ${r.protocol_id}`,
        ),
        link(r.source_url, "Exact result source ↗"),
        document.createTextNode(" · "),
        link("#observation-" + r.result_id, "Full observation details"),
      );
      if (announce) announcement.textContent = r.display_label + ". " + message;
      if (slider && index !== null) {
        slider.value = String(index);
        slider.setAttribute("aria-valuetext", r.display_label + ". " + message);
      }
      for (const button of legend.children)
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.resultId === resultId),
        );
      drawSelection();
    }
    for (const [i, p] of (c.series || c.points).entries()) {
      const r = records.get(p.result_id);
      const b = el("button");
      b.type = "button";
      b.dataset.resultId = r.result_id;
      b.setAttribute("aria-pressed", "false");
      const swatch =
        c.type === "scatter"
          ? svg("svg", {
              class: "legend-marker",
              viewBox: "0 0 22 18",
              "aria-hidden": "true",
              focusable: "false",
            })
          : el("span", "legend-swatch " + (r.reasoning_effort || ""));
      if (c.type === "scatter")
        swatch.append(pointSymbol(r, 11, 9, "legend-symbol"));
      else {
        swatch.setAttribute("aria-hidden", "true");
        swatch.style.setProperty("--series-color", color(r) || "#264d50");
      }
      b.append(swatch, el("span", "", r.display_label));
      const select = (announce) => {
        activeSeries = i;
        const point = c.type === "line" ? p.points.at(-1) : p;
        inspect(r.result_id, point, c.type === "line" ? 119 : null, announce);
      };
      b.addEventListener("click", () => select(true));
      b.addEventListener("focus", () => select(true));
      b.addEventListener("pointerenter", () => {
        // A layout/scroll change can move a label under a stationary pointer.
        // Keep keyboard sample exploration in control until another explicit selection.
        if (document.activeElement?.matches('input[type="range"]')) return;
        select(false);
      });
      legend.append(b);
    }
    card.append(legend);
    if (c.type === "line") {
      const control = el("div", "sample-control");
      const label = el("label", "", "Read every sample in the selected series");
      slider = el("input");
      slider.type = "range";
      slider.min = "0";
      slider.max = "119";
      slider.step = "1";
      slider.value = "119";
      slider.id = c.id + "-sample";
      label.htmlFor = slider.id;
      slider.addEventListener("input", () => {
        const series = c.series[activeSeries],
          i = Number(slider.value);
        inspect(series.result_id, series.points[i], i, true);
      });
      slider.addEventListener("focus", () => {
        const series = c.series[activeSeries],
          i = Number(slider.value);
        inspect(series.result_id, series.points[i], i, true);
      });
      control.append(
        label,
        slider,
        el(
          "p",
          "",
          "Arrow keys step through all 120 published samples per effort. No curve is extended past its last sample.",
        ),
      );
      card.append(control);
    }
    card.append(inspector, announcement);
    const caveats = el("ul", "chart-caveats");
    for (const note of c.caveats) caveats.append(el("li", "", note));
    caveats.append(
      el(
        "li",
        "",
        "No reported uncertainty intervals; no significance or causal effort claim.",
      ),
    );
    card.append(caveats);
    if (c.excluded?.length) {
      const exclusions = el("div", "chart-exclusions");
      exclusions.append(el("strong", "", "Excluded from this cost plot"));
      for (const e of c.excluded)
        exclusions.append(
          el(
            "p",
            "",
            `${records.get(e.result_id).display_label}: ${e.reason}.`,
          ),
        );
      card.append(exclusions);
    }
    const table = el("details", "chart-table");
    table.append(el("summary", "", "Table alternative — exact plotted values"));
    if (c.type === "line")
      table.append(
        makeTable(
          [
            "Model / effort",
            "Elapsed tracker time (minutes)",
            "Best found (normalized XP/min)",
          ],
          c.series.flatMap((s) =>
            s.points.map((p) => [
              s.label,
              String(p.elapsed_minutes),
              String(p.peak_normalized_xp_per_min),
            ]),
          ),
          "All 360 points in this skill view, in supplied series and sample order. No downsampling.",
        ),
      );
    else
      table.append(
        makeTable(
          c.type === "bar"
            ? ["Exact model label", "Overall task success (%)"]
            : [
                "Model / effort",
                `${c.x.label} (${c.x.unit})`,
                `${c.y.label} (${c.y.unit})`,
              ],
          rankedPoints.map((p) =>
            c.type === "bar"
              ? [p.label, String(p.x)]
              : [p.label, String(p.x), String(p.y)],
          ),
          "Exact source values. " +
            window.LAB_METRIC_ORDER.description(direction) +
            (c.type === "scatter"
              ? " Table order follows the outcome score; scatter positions retain both measurements."
              : "") +
            " Source links and protocol details are attached to each observation below.",
        ),
      );
    card.append(table);
    let geometry;
    function drawSelection() {
      canvas.querySelectorAll(".selection-overlay").forEach((n) => n.remove());
      if (!selected || !geometry) return;
      const { sx, sy } = geometry;
      if (c.type === "bar") return;
      const x =
          c.type === "line" ? selected.point.elapsed_minutes : selected.point.x,
        y =
          c.type === "line"
            ? selected.point.peak_normalized_xp_per_min
            : selected.point.y;
      if (c.type === "line")
        canvas.append(
          svg("line", {
            x1: sx(x),
            x2: sx(x),
            y1: geometry.top,
            y2: geometry.bottom,
            class: "plot-marker-line selection-overlay",
          }),
        );
      canvas.append(
        svg("circle", {
          cx: sx(x),
          cy: sy(y),
          r: 11,
          class: "plot-selected selection-overlay",
        }),
      );
    }
    function draw() {
      const oldFocus = document.activeElement?.dataset?.pointKey;
      canvas.replaceChildren(description);
      const height = c.type === "bar" ? 430 : 320;
      canvas.setAttribute("viewBox", `0 0 ${width} ${height}`);
      const left = c.type === "bar" ? Math.min(184, width * 0.48) : 55,
        right = c.type === "bar" ? 52 : 17,
        top = 20,
        bottom = height - 35;
      const xmax =
        c.x.domain?.[1] ??
        niceMax(Math.max(...c.points.map((p) => p.x)) * 1.05);
      const ymax =
        c.type === "bar"
          ? 1
          : zoom
            ? 75
            : (c.y.domain?.[1] ??
              niceMax(
                Math.max(
                  ...(c.type === "line"
                    ? c.series.flatMap((s) =>
                        s.points.map((p) => p.peak_normalized_xp_per_min),
                      )
                    : c.points.map((p) => p.y)),
                ) * 1.05,
              ));
      const ymin = zoom ? 50 : (c.y.domain?.[0] ?? 0);
      const sx = (x) => left + (x / xmax) * (width - left - right),
        sy = (y) => bottom - ((y - ymin) / (ymax - ymin)) * (bottom - top);
      geometry = { sx, sy, top, bottom };
      scaleNote.textContent =
        c.type === "bar"
          ? "Score axis: 0–100%. Historical paper comparison."
          : `Score axis: ${format(ymin)}–${format(ymax)}${c.y.unit === "percent" ? "%" : " normalized XP/min"}${zoom ? " · Zoomed view; full-scale view is available." : ""}`;
      for (let i = 0; i <= 4; i++) {
        const x = (xmax * i) / 4;
        canvas.append(
          svg("line", {
            x1: sx(x),
            x2: sx(x),
            y1: top,
            y2: bottom,
            class: "plot-grid",
          }),
          svg(
            "text",
            {
              x: sx(x),
              y: height - 12,
              "text-anchor": "middle",
              class: "plot-tick",
            },
            format(x, xmax < 5 ? 2 : 1),
          ),
        );
      }
      if (c.type !== "bar")
        for (let i = 0; i <= 4; i++) {
          const y = ymin + ((ymax - ymin) * i) / 4;
          canvas.append(
            svg("line", {
              x1: left,
              x2: width - right,
              y1: sy(y),
              y2: sy(y),
              class: "plot-grid",
            }),
            svg(
              "text",
              {
                x: left - 8,
                y: sy(y) + 4,
                "text-anchor": "end",
                class: "plot-tick",
              },
              format(y, 2),
            ),
          );
        }
      canvas.append(
        svg("line", {
          x1: left,
          x2: width - right,
          y1: bottom,
          y2: bottom,
          class: "plot-axis",
        }),
      );
      function point(p, index) {
        const r = records.get(p.result_id),
          x = sx(p.x),
          y = c.type === "bar" ? top + index * 62 + 25 : sy(p.y);
        const group = svg("g", {
          class: "plot-point",
          role: "button",
          tabindex: "0",
          "aria-label": r.display_label + ". " + selectionText(r, c, p, null),
          "aria-describedby": inspector.id,
          "data-point-key": r.result_id,
          "data-result-id": r.result_id,
          "data-x": p.x,
          "data-y": p.y ?? "",
          "data-protocol": r.protocol_id,
        });
        if (c.type === "bar") {
          const label = svg("text", {
            x: left - 10,
            y: y - 5,
            "text-anchor": "end",
            class: "plot-tick",
          });
          const chunks =
            r.display_label.length > 20
              ? [
                  r.display_label.slice(0, r.display_label.lastIndexOf(" ")),
                  r.display_label.slice(r.display_label.lastIndexOf(" ") + 1),
                ]
              : [r.display_label];
          chunks.forEach((chunk, i) =>
            label.append(svg("tspan", { x: left - 10, dy: i ? 16 : 0 }, chunk)),
          );
          group.append(
            label,
            svg("rect", {
              x: left,
              y: y - 16,
              width: ((width - left - right) * p.x) / 100,
              height: 27,
              fill: "#264d50",
              class: "plot-symbol",
            }),
            svg(
              "text",
              { x: sx(p.x) + 6, y: y + 3, class: "plot-tick" },
              format(p.x, 2) + "%",
            ),
            svg("rect", {
              x: 0,
              y: y - 25,
              width,
              height: 50,
              class: "plot-hit",
            }),
          );
        } else {
          group.append(
            svg("circle", { cx: x, cy: y, r: 14, class: "plot-hit" }),
            pointSymbol(r, x, y),
          );
        }
        const select = (announce) => inspect(r.result_id, p, null, announce);
        group.addEventListener("pointerenter", () => select(false));
        group.addEventListener("focus", () => select(true));
        group.addEventListener("click", () => select(true));
        group.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            select(true);
          }
        });
        canvas.append(group);
      }
      if (c.type === "line")
        for (const series of c.series) {
          const r = records.get(series.result_id),
            dash = { low: "", medium: "8 5", high: "2 4" }[r.reasoning_effort];
          const d = series.points
            .map(
              (p, i) =>
                `${i ? "L" : "M"} ${sx(p.elapsed_minutes)} ${sy(p.peak_normalized_xp_per_min)}`,
            )
            .join(" ");
          canvas.append(
            svg("path", {
              d,
              stroke: color(r),
              "stroke-dasharray": dash,
              class: "plot-series",
              "data-result-id": r.result_id,
              "data-sample-count": series.points.length,
              "aria-hidden": "true",
            }),
          );
          const last = series.points.at(-1);
          canvas.append(
            svg("circle", {
              cx: sx(last.elapsed_minutes),
              cy: sy(last.peak_normalized_xp_per_min),
              r: 4,
              fill: color(r),
            }),
          );
        }
      else c.points.forEach(point);
      drawSelection();
      if (oldFocus)
        [...canvas.querySelectorAll("[data-point-key]")]
          .find((n) => n.dataset.pointKey === oldFocus)
          ?.focus();
    }
    if (c.type === "line") {
      const readPointer = (event) => {
        const box = canvas.getBoundingClientRect(),
          x = ((event.clientX - box.left) / box.width) * width,
          y = ((event.clientY - box.top) / box.height) * 320;
        let best = null,
          distance = Infinity;
        c.series.forEach((s, si) =>
          s.points.forEach((p, i) => {
            const d =
              (geometry.sx(p.elapsed_minutes) - x) ** 2 +
              (geometry.sy(p.peak_normalized_xp_per_min) - y) ** 2;
            if (d < distance) {
              distance = d;
              best = { s, si, p, i };
            }
          }),
        );
        if (
          best &&
          (selected?.resultId !== best.s.result_id ||
            selected?.index !== best.i)
        ) {
          activeSeries = best.si;
          inspect(best.s.result_id, best.p, best.i, false);
        }
      };
      canvas.addEventListener("pointermove", (event) => {
        if (document.activeElement?.matches('input[type="range"]')) return;
        readPointer(event);
      });
      canvas.addEventListener("pointerdown", (event) => {
        if (document.activeElement?.matches('input[type="range"]'))
          document.activeElement.blur();
        readPointer(event);
      });
    }
    card.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        selected = null;
        inspector.replaceChildren(
          el("strong", "", "Explore a point"),
          el("p", "", "Choose a point or series label to read its values."),
        );
        legend
          .querySelectorAll("button")
          .forEach((b) => b.setAttribute("aria-pressed", "false"));
        drawSelection();
      }
    });
    const observer = new ResizeObserver((entries) => {
      const w = Math.round(entries[0].contentRect.width);
      if (w > 0 && w !== width) {
        width = w;
        draw();
      }
    });
    observer.observe(plot);
    observers.push(observer);
    draw();
    return card;
  }
  function observation(r) {
    const d = el("details", "observation-detail");
    d.id = "observation-" + r.result_id;
    d.append(
      el(
        "summary",
        "",
        `${r.display_label}${r.skill ? " · " + r.skill : ""} — ${score(r)} · full observation`,
      ),
    );
    const clock = data.clock_basis.find((e) => e.result_id === r.result_id);
    d.append(
      fields([
        [
          "Exact model identifier / kind",
          `${r.model_identifier} · ${r.model_identifier_kind}`,
        ],
        ["Evaluated system", r.system_identifier],
        ["Immutable model snapshot", "Not established"],
        [
          "Score & sample",
          `${r.metric_name}: ${score(r)} · n=${r.sample_size}${r.sample_unit ? " " + r.sample_unit : ""}`,
        ],
        [
          "Protocol / compatible slice",
          `${r.protocol_id} · ${r.comparability_group}`,
        ],
        [
          "Evaluation date",
          r.evaluation_date || "Unknown; paper version is not evaluation date",
        ],
        ["Source access date", r.access_date],
        ["Source locator", r.source_locator],
        ["Uncertainty", "Not reported; no significance claim"],
        [
          "Cost scope",
          r.cost.value === null
            ? "Not reported for historical paper runs"
            : `${format(r.cost.value, 6)} USD · ${r.cost.basis} · ${r.cost.scope}`,
        ],
      ]),
    );
    if (r.reasoning_effort)
      d.append(
        el(
          "p",
          "",
          `Reasoning effort: ${r.reasoning_effort}. Labels are not harmonized across vendors.`,
        ),
      );
    if (clock)
      d.append(
        fields([
          [
            "Container start (supplemental pinned-source check)",
            clock.container_start,
          ],
          ["Agent start (original evaluation_start)", r.evaluation_start],
          ["Container finish (original evaluation_end)", r.evaluation_end],
          [
            "Container elapsed",
            `${format(r.time.container_elapsed_seconds, 3)} seconds, including setup before agent start. Not agent completion or inference-only time.`,
          ],
          [
            "Tracker scoring window",
            "30 minutes; samples stop at " +
              format(r.time.last_in_window_sample_seconds / 60, 5) +
              " minutes",
          ],
          [
            "Cost limitation",
            "Whole selected run estimate; not OAuth cash expenditure. Excludes " +
              r.cost.excluded.join(", ") +
              ".",
          ],
        ]),
      );
    if (r.benchmark_id === "bullshitbench-v2") {
      d.append(
        el(
          "p",
          "",
          `All-attempt score: ${r.numerator}/${r.denominator}; refusals ${r.refusal_count}; errors ${r.error_count}. Refusal-excluded secondary outcome: ${format(r.secondary_outcomes[0].value, 5)}% with denominator ${r.secondary_outcomes[0].denominator}. The graphs always use all 100 attempts.`,
        ),
        el(
          "p",
          "",
          `Cost coverage: ${r.cost.covered_response_count}/100 responses; ${r.cost.complete ? "complete candidate-response telemetry" : "partial cost, excluded from cost plot"}. Whole evaluation cost: not reported. Judges, infrastructure and potentially separate retries excluded.`,
        ),
        el(
          "p",
          "",
          `Mean request time: ${format(r.time.mean_request_seconds, 5)} seconds. ${r.time.definition}`,
        ),
        el(
          "p",
          "",
          `Collection span: ${format(r.time.collection_span_seconds, 3)} seconds. ${r.time.collection_span_scope}.`,
        ),
        el(
          "p",
          "",
          `Judges: ${r.judges.join(", ")}. Coverage: ${Object.entries(
            r.judge_coverage_counts,
          )
            .map(([k, v]) => `${v} prompts with ${k}`)
            .join("; ")}.`,
        ),
      );
    }
    if (r.benchmark_id === "medagentbench")
      d.append(
        el(
          "p",
          "",
          `Historical original benchmark paper v2, 2025-02-12; not the separately named 2026 v2 benchmark. Query SR ${r.secondary_outcomes[0].value_as_reported}, action SR ${r.secondary_outcomes[1].value_as_reported}, n=150 each. Temperature: ${r.temperature === null ? "unspecified o3-mini exception" : r.temperature}. Cost and time: not reported. POSTs simulated; no clinical safety claim.`,
        ),
      );
    d.append(
      link(r.source_url, "Exact result source ↗"),
      rawDetails("All supplied fields for this observation", r),
    );
    return d;
  }
  function stateFromURL() {
    const p = new URL(location.href).searchParams;
    return {
      benchmark: Object.hasOwn(names, p.get("benchmark"))
        ? p.get("benchmark")
        : "runebench",
      skill: ["woodcutting", "mining"].includes(p.get("skill"))
        ? p.get("skill")
        : "woodcutting",
    };
  }
  function render(state) {
    observers.forEach((o) => o.disconnect());
    observers = [];
    controls.querySelector(`[value="${state.benchmark}"]`).checked = true;
    document.getElementById("result-skill").value = state.skill;
    document.getElementById("skill-control").hidden =
      state.benchmark !== "runebench";
    const selectedRecords = data.records.filter(
      (r) =>
        r.benchmark_id === state.benchmark &&
        (state.benchmark !== "runebench" || r.skill === state.skill),
    );
    const directions = new Set(selectedRecords.map((r) => r.direction));
    const rr = window.LAB_METRIC_ORDER.order(
        selectedRecords,
        (r) => r.value,
        directions.size === 1 ? [...directions][0] : undefined,
      ),
      p = protocols.get(rr[0].protocol_id);
    document.getElementById("slice-kicker").textContent =
      state.benchmark === "medagentbench"
        ? "Historical / original paper baseline"
        : "Selected primary-result slice";
    document.getElementById("slice-title").textContent =
      names[state.benchmark] +
      (state.benchmark === "runebench" ? " / " + state.skill : "");
    document.getElementById("slice-dates").textContent =
      state.benchmark === "medagentbench"
        ? "Paper v2: 2025-02-12 · Evaluation date unknown · Source access: 2026-09-30"
        : `Evaluation: ${state.benchmark === "runebench" ? "2026-09-29" : "2026-09-25–29"} · Source access: 2026-09-30`;
    const catalog = document.getElementById("slice-catalog");
    catalog.href = "catalog.html#benchmark-" + state.benchmark;
    const notices =
      state.benchmark === "runebench"
        ? [
            "Exploratory effort comparison: one selected trial per effort and skill. Exact executed SDK/image and CLI version remain unknown.",
            "Cost is an estimated API-equivalent amount for an OAuth run, not actual cash spend. Curves show best normalized XP/min discovered in tracker time, not total XP or inference speed.",
          ]
        : state.benchmark === "bullshitbench-v2"
          ? [
              "All scores use all 100 attempts, including refusals. Named judges and fixed V2 questions are shared; effort settings, collection dates and judge coverage remain attached.",
              "Cost is candidate-response telemetry, excluding judging and infrastructure. Opus refusal costs are missing, so both Opus cost points are excluded; all six time points have complete latency coverage.",
            ]
          : [
              "Historical author-reported model + baseline orchestrator comparison, from the original paper v2; not current medical standings.",
              "300 simulated EHR tasks, pass@1, at most eight rounds. POST actions are simulated. Cost/time and immutable model snapshots are unreported; no clinical safety validation.",
            ];
    const notice = document.getElementById("slice-notice");
    notice.replaceChildren(
      ...notices.map((s) => el("p", "", s)),
      el(
        "p",
        "",
        "No uncertainty intervals or repeated-run variance reported. Differences are descriptive, not statistically established or causal.",
      ),
    );
    const charts = data.graph_views.charts.filter((c) =>
      state.benchmark === "runebench"
        ? c.id.startsWith("runebench-" + state.skill)
        : state.benchmark === "bullshitbench-v2"
          ? c.id.startsWith("bullshitbench")
          : c.id.startsWith("medagentbench"),
    );
    document.getElementById("charts").replaceChildren(...charts.map(chartCard));
    const headers =
      state.benchmark === "medagentbench"
        ? [
            "Model / author baseline",
            "Overall success (%)",
            "Query / action (%)",
            "Cost / time",
          ]
        : ["Model / effort", "Score", "Cost (USD)", "Time basis"];
    const rows = rr.map((r) => [
      link("#observation-" + r.result_id, r.display_label),
      score(r),
      state.benchmark === "medagentbench"
        ? `${r.secondary_outcomes[0].value_as_reported} / ${r.secondary_outcomes[1].value_as_reported}`
        : `${format(r.cost.value, 6)}${r.cost.complete === false ? " · partial " + r.cost.covered_response_count + "/100, excluded from cost plot" : r.benchmark_id === "runebench" ? " · API-equivalent estimate" : " · 100/100 candidate responses"}`,
      state.benchmark === "medagentbench"
        ? "Not reported; remains null"
        : r.benchmark_id === "runebench"
          ? "30-minute tracker budget; " +
            format(r.time.last_in_window_sample_seconds / 60, 5) +
            " min last sample"
          : `${format(r.time.mean_request_seconds, 5)} seconds per request`,
    ]);
    document
      .getElementById("observation-table")
      .replaceChildren(
        makeTable(
          headers,
          rows,
          `${rr.length} source-reported observations within ${p.id}.`,
          true,
        ),
      );
    document
      .getElementById("observation-details")
      .replaceChildren(...rr.map(observation));
    document.getElementById("observation-count").textContent =
      rr.length + " observations in this view";
    const protocol = document.getElementById("protocol-content");
    protocol.replaceChildren(
      el("p", "", `Protocol: ${p.id}`),
      el("p", "", p.comparability_status || p.benchmark_version),
      el(
        "p",
        "",
        "Source basis: parent-supplied researcher JSON and README. These are primary reported results, not independently executed evaluations. Exact aliases do not establish immutable model weights.",
      ),
    );
    const limits = el("ul", "protocol-limits");
    for (const s of p.limitations) limits.append(el("li", "", s));
    protocol.append(limits);
    const sourceList = el("ul", "protocol-sources");
    for (const id of p.source_ids) {
      const s = sources.get(id),
        li = el("li");
      li.append(
        link(s.url, id + " — " + (s.supports?.join("; ") || s.type)),
        el("small", "", s.url + " · Access: " + s.access_date),
      );
      sourceList.append(li);
    }
    protocol.append(
      sourceList,
      rawDetails("Complete supplied protocol, including missing settings", p),
      link(
        "data/results.original.json",
        "Download original results and all seven graph configurations",
      ),
      document.createTextNode(" · "),
      link(
        "data/results-researcher-readme.txt",
        "Original researcher interpretation",
      ),
    );
    document.getElementById("result-state").textContent =
      names[state.benchmark] +
      (state.benchmark === "runebench" ? ", " + state.skill : "") +
      ". " +
      rr.length +
      " observations and " +
      charts.length +
      " charts.";
    const hash = decodeHash();
    const target = hash && document.getElementById(hash);
    if (target && content.contains(target)) {
      if (target.tagName === "DETAILS") target.open = true;
      requestAnimationFrame(() => target.scrollIntoView());
    }
  }
  function decodeHash() {
    try {
      return decodeURIComponent(location.hash.slice(1));
    } catch {
      return "";
    }
  }
  // Share the validated, accessible chart renderer with the gallery detail view.
  // The original research projection and the seven chart configurations stay intact.
  window.LAB_CHARTS = Object.freeze({
    chartCard,
    observation,
    rawDetails,
    reset() {
      observers.forEach((o) => o.disconnect());
      observers = [];
    },
  });
  if (!controls) return;
  controls.addEventListener("change", () => {
    const state = {
      benchmark: controls.elements.benchmark.value,
      skill: controls.elements.skill.value,
    };
    const url = new URL(location.href);
    url.search = "";
    url.searchParams.set("benchmark", state.benchmark);
    if (state.benchmark === "runebench")
      url.searchParams.set("skill", state.skill);
    url.hash = "";
    history.pushState({}, "", url);
    render(state);
  });
  window.addEventListener("popstate", () => render(stateFromURL()));
  window.addEventListener("hashchange", () => {
    const id = decodeHash(),
      target = id && document.getElementById(id);
    if (target && content.contains(target) && target.tagName === "DETAILS")
      target.open = true;
  });
  content.hidden = false;
  fallback.hidden = true;
  render(stateFromURL());
})();
