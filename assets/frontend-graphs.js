(() => {
  "use strict";
  const metrics = {
    clip: "Visual similarity (CLIP)",
    block_match: "Content block match",
    text: "Text similarity",
    position: "Position similarity",
    color: "Color similarity",
  };
  const safeURL = (value) => {
    try {
      const u = new URL(value);
      return u.protocol === "https:" && !u.username && !u.password;
    } catch {
      return false;
    }
  };
  const finite = (n) => typeof n === "number" && Number.isFinite(n);
  const e = (tag, cls = "", text) => {
    const node = document.createElement(tag);
    node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const s = (tag, attrs, text) => {
    const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [key, value] of Object.entries(attrs))
      node.setAttribute(key, String(value));
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const fmt = (n) =>
    Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 });
  const sourceLink = (url) => {
    const link = e("a", "", "Original result source");
    if (safeURL(url)) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    return link;
  };
  function valid(cards) {
    if (!Array.isArray(cards) || cards.length !== 4) return false;
    const counts = {
      "webdev-arena-frontend": 12,
      "design2code-v3-484": 6,
      "design-arena-frontend": 0,
      "webcraftbench-v3": 0,
    };
    if (new Set(cards.map((c) => c.id)).size !== 4) return false;
    return cards.every((c) => {
      if (
        !Object.hasOwn(counts, c.id) ||
        c.category !== "frontend" ||
        c.rows?.length !== counts[c.id] ||
        !safeURL(c.source_url)
      )
        return false;
      if (
        [
          ...(c.methodology_urls || []),
          c.methodology_url,
          c.project_url,
          c.code_url,
          c.changelog_url,
        ]
          .filter(Boolean)
          .some((url) => !safeURL(url))
      )
        return false;
      return c.rows.every((r) => {
        if (
          typeof r.model_variant !== "string" ||
          !r.model_variant ||
          r.cost_usd !== null ||
          r.latency_seconds !== null
        )
          return false;
        if (c.id === "webdev-arena-frontend") {
          const ci = r.confidence_interval;
          return (
            finite(r.value) &&
            r.value >= 1600 &&
            r.value <= 1900 &&
            ci &&
            finite(ci.lower) &&
            finite(ci.upper) &&
            ci.lower >= 1600 &&
            ci.upper <= 1900 &&
            ci.lower <= r.value &&
            ci.upper >= r.value &&
            ci.level === null &&
            finite(ci.minus) &&
            ci.minus >= 0 &&
            finite(ci.plus) &&
            ci.plus >= 0 &&
            ci.lower === r.value - ci.minus &&
            ci.upper === r.value + ci.plus &&
            Array.isArray(r.rank_spread) &&
            r.rank_spread.length === 2 &&
            r.rank_spread.every((n) => Number.isInteger(n) && n >= 1) &&
            r.rank_spread[0] <= r.rank_spread[1] &&
            typeof r.preliminary === "boolean" &&
            r.evaluation_date === null &&
            Number.isInteger(r.votes) &&
            r.votes > 0
          );
        }
        return (
          Object.keys(metrics).every(
            (m) =>
              finite(r.metrics?.[m]) &&
              r.metrics[m] >= 0 &&
              r.metrics[m] <= 100,
          ) &&
          ["direct", "text_augmented", "self_revision"].includes(
            r.prompt_method,
          ) &&
          r.uncertainty === null &&
          typeof r.model_snapshot === "string" &&
          r.model_snapshot.length > 0
        );
      });
    });
  }
  function plotted(c, state = {}) {
    return c.id === "design2code-v3-484"
      ? c.rows.filter((r) =>
          state.comparison === "methods"
            ? r.model_variant === "GPT-4o"
            : r.prompt_method === "direct",
        )
      : c.rows;
  }
  function label(r, methods) {
    return methods
      ? {
          direct: "Direct",
          text_augmented: "Text augmented",
          self_revision: "Self revision",
        }[r.prompt_method]
      : r.model_variant;
  }
  function miniature(c) {
    const fig = e("div", "mini-graph");
    fig.dataset.graphId = c.id + "-score";
    const svg = s("svg", {
      viewBox: "0 0 320 200",
      "aria-hidden": "true",
      focusable: "false",
    });
    fig.append(svg);
    const arena = c.id === "webdev-arena-frontend",
      low = arena ? 1600 : 0,
      high = arena ? 1900 : 100;
    const rows = window.LAB_METRIC_ORDER.order(
        plotted(c),
        (r) => (arena ? r.value : r.metrics.clip),
        arena ? c.direction : "higher_is_better",
      ).slice(0, 6),
      left = 128,
      right = 27,
      top = 21,
      bottom = 165;
    const x = (value) =>
      left + ((320 - left - right) * (value - low)) / (high - low);
    [low, (low + high) / 2, high].forEach((tick) =>
      svg.append(
        s("line", {
          x1: x(tick),
          x2: x(tick),
          y1: top - 8,
          y2: bottom + 4,
          class: "mini-grid",
        }),
        s(
          "text",
          { x: x(tick), y: 183, "text-anchor": "middle" },
          String(tick),
        ),
      ),
    );
    rows.forEach((r, i) => {
      const y = top + (i * (bottom - top)) / rows.length + 9,
        value = arena ? r.value : r.metrics.clip;
      svg.append(
        s(
          "text",
          {
            x: left - 8,
            y: y + 3,
            "text-anchor": "end",
            class: "mini-bars-label",
          },
          r.model_variant,
        ),
      );
      if (arena)
        svg.append(
          s("line", {
            x1: x(r.confidence_interval.lower),
            x2: x(r.confidence_interval.upper),
            y1: y,
            y2: y,
            class: "mini-interval",
          }),
        );
      else
        svg.append(
          s("rect", {
            x: left,
            y: y - 4,
            width: x(value) - left,
            height: 8,
            rx: 3,
            fill: "#17645a",
          }),
        );
      if (arena)
        svg.append(s("circle", { cx: x(value), cy: y, r: 4, fill: "#17645a" }));
    });
    svg.append(
      s(
        "text",
        { x: (left + 320 - right) / 2, y: 199, "text-anchor": "middle" },
        arena ? "Preference rating · cropped axis" : "CLIP similarity · 0–100",
      ),
    );
    return fig;
  }
  function chart(c, state) {
    const arena = c.id === "webdev-arena-frontend",
      methods = c.id === "design2code-v3-484" && state.comparison === "methods",
      metric = Object.hasOwn(metrics, state.view) ? state.view : "clip";
    const value = (r) => (arena ? r.value : r.metrics[metric]),
      direction = arena ? c.direction : "higher_is_better";
    const rows = window.LAB_METRIC_ORDER.order(
        plotted(c, state),
        value,
        direction,
      ),
      low = arena ? 1600 : 0,
      high = arena ? 1900 : 100;
    const title = arena
      ? "Which generated apps did voters prefer?"
      : methods
        ? "GPT-4o prompting methods"
        : "Screenshot fidelity · Direct prompting";
    const unit = arena
      ? "Arena preference rating"
      : metrics[metric] + " (similarity score, 0–100)";
    const group = arena
      ? "webdev-arena-frontend-2026-10-01"
      : "design2code-v3-484-" + (methods ? "gpt4o-methods" : "direct");
    const node = e("article", "chart-card frontend-chart");
    node.dataset.direction = direction || "unknown";
    node.id = c.id + "-" + (arena ? "rating" : metric);
    node.append(
      e("h2", "", title),
      e(
        "p",
        "chart-scale-note",
        arena
          ? "Preference rating axis: 1600–1900 (cropped). Lines show source-reported interval bounds; their confidence level is not supplied. Snapshot October 1, 2026; individual evaluation dates unknown."
          : "Similarity score axis: 0–100. " +
              metrics[metric] +
              "; one dimension at a time. Paper revision February 9, 2025; evaluation dates unknown.",
      ),
    );
    node.append(
      e(
        "p",
        "chart-scale-note",
        window.LAB_METRIC_ORDER.description(direction),
      ),
    );
    const plot = e("div", "standard-plot"),
      inspector = e("div", "chart-inspector"),
      announcement = e("span", "sr-only");
    plot.setAttribute("role", "group");
    plot.setAttribute("aria-label", title);
    inspector.setAttribute("role", "region");
    inspector.setAttribute("aria-label", "Selected configuration");
    inspector.append(
      e("strong", "", "Explore a result"),
      e(
        "p",
        "",
        "Hover, focus or tap a row to inspect its source and settings.",
      ),
    );
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", "polite");
    const pct = (n) => ((n - low) / (high - low)) * 100;
    rows.forEach((r, i) => {
      const row = e("button", "standard-row frontend-row");
      row.type = "button";
      row.dataset.model = r.model_variant;
      row.dataset.value = String(value(r));
      row.dataset.metric = arena ? "arena_rating" : metric;
      row.dataset.comparisonGroup = group;
      row.dataset.sourceUrl = c.source_url;
      if (!arena) row.dataset.promptMethod = r.prompt_method;
      if (arena) {
        row.dataset.intervalLower = String(r.confidence_interval.lower);
        row.dataset.intervalUpper = String(r.confidence_interval.upper);
        row.dataset.votes = String(r.votes);
      }
      row.setAttribute("aria-pressed", "false");
      row.setAttribute(
        "aria-label",
        label(r, methods) +
          ". " +
          fmt(value(r)) +
          " " +
          unit +
          ". " +
          (arena
            ? "Source interval " +
              r.confidence_interval.lower +
              " to " +
              r.confidence_interval.upper +
              "; " +
              r.votes +
              " votes."
            : r.model_variant +
              "; " +
              r.prompt_method +
              "; historical 484-page cohort."),
      );
      const track = e("span", "bar-track" + (arena ? " dot-track" : ""));
      track.setAttribute("aria-hidden", "true");
      const fill = e("span", "bar-fill");
      if (arena) {
        const interval = e("span", "frontend-interval");
        interval.style.left = pct(r.confidence_interval.lower) + "%";
        interval.style.width =
          pct(r.confidence_interval.upper) -
          pct(r.confidence_interval.lower) +
          "%";
        track.append(interval);
        fill.style.left = pct(value(r)) + "%";
      } else fill.style.width = pct(value(r)) + "%";
      track.append(fill);
      row.append(
        e(
          "span",
          "row-model",
          label(r, methods) + (r.preliminary ? " · preliminary" : ""),
        ),
        track,
        e("span", "bar-value", fmt(value(r))),
      );
      const select = (announce) => {
        for (const other of plot.querySelectorAll("button"))
          other.setAttribute("aria-pressed", String(other === row));
        const message = fmt(value(r)) + " " + unit + ".";
        inspector.replaceChildren(
          e("strong", "", r.model_variant),
          e("p", "", message),
          e(
            "p",
            "chart-meta",
            arena
              ? "Source interval: " +
                  r.confidence_interval.lower +
                  "–" +
                  r.confidence_interval.upper +
                  "; level not supplied. " +
                  fmt(r.votes) +
                  " votes. Rank spread " +
                  r.rank_spread.join("–") +
                  ". Effort: " +
                  (r.effort || "not established from the model name") +
                  "." +
                  (r.preliminary ? " Source marks this row preliminary." : "")
              : "Snapshot: " +
                  r.model_snapshot +
                  ". Prompt method: " +
                  r.prompt_method +
                  ". 484 pages; uncertainty not reported.",
          ),
          e(
            "p",
            "chart-meta",
            "Evaluation date: unknown. Cost and time: not reported; no cost/time graph is inferred.",
          ),
          sourceLink(c.source_url),
        );
        const d = e("details");
        d.append(
          e("summary", "", "Exact source observation"),
          e("pre", "", JSON.stringify(r, null, 2)),
        );
        inspector.append(d);
        if (announce)
          announcement.textContent = r.model_variant + ". " + message;
      };
      row.addEventListener("focus", () => select(true));
      row.addEventListener("click", () => select(true));
      row.addEventListener("pointerenter", () => {
        if (!plot.contains(document.activeElement)) select(false);
      });
      plot.append(row);
    });
    const ticks = e("div", "standard-ticks");
    [0, 25, 50, 75, 100].forEach((p) =>
      ticks.append(e("span", "", fmt(low + ((high - low) * p) / 100))),
    );
    node.append(
      plot,
      ticks,
      e("p", "standard-axis", unit),
      inspector,
      announcement,
      e(
        "p",
        "chart-scale-note",
        arena
          ? "12 selected rows out of 138 source models. Preference and overlapping rank spreads do not establish functional success or a significant pairwise win."
          : methods
            ? "Three GPT-4o methods have different inputs and generation budgets. Compare them as prompting configurations; the five dimensions are never averaged."
            : "Four Direct configurations share this prompting method. The separate method view contains GPT-4o’s three prompting variants.",
      ),
    );
    const table = e("table", "result-data-table frontend-table"),
      head = e("thead"),
      header = e("tr"),
      body = e("tbody");
    table.append(
      e(
        "caption",
        "",
        (arena
          ? "October 1, 2026 preference snapshot"
          : "Design2Code Table 1 · historical 484-page cohort") +
          " · exact values for this view",
      ),
    );
    for (const text of [
      "Configuration",
      unit,
      arena ? "Interval bounds / level" : "Snapshot / prompt",
      arena ? "Votes / rank spread" : "Uncertainty",
      "Cost / time",
      "Source",
    ]) {
      const th = e("th", "", text);
      th.scope = "col";
      header.append(th);
    }
    head.append(header);
    table.append(head);
    for (const r of rows) {
      const tr = e("tr");
      for (const text of [
        r.model_variant + (r.preliminary ? " · preliminary" : ""),
        String(value(r)),
        arena
          ? r.confidence_interval.lower +
            "–" +
            r.confidence_interval.upper +
            "; level not supplied"
          : r.model_snapshot + " / " + r.prompt_method,
        arena ? r.votes + " / " + r.rank_spread.join("–") : "Not reported",
        "Not reported / Not reported",
      ])
        tr.append(e("td", "", text));
      const td = e("td");
      td.append(sourceLink(c.source_url));
      tr.append(td);
      body.append(tr);
    }
    table.append(body);
    const scroll = e("div", "chart-table");
    scroll.append(table);
    const d = e("details", "table-alternative");
    d.append(e("summary", "", "Table alternative · exact values"), scroll);
    node.append(d);
    return node;
  }
  window.LAB_FRONTEND = Object.freeze({ valid, metrics, miniature, chart });
})();
