(() => {
  "use strict";
  const number = (x) => typeof x === "number" && Number.isFinite(x);
  const value = (row, field) =>
    field.split(".").reduce((v, key) => v?.[key], row);
  const safe = (url) => {
    try {
      const u = new URL(url);
      return u.protocol === "https:" && !u.username && !u.password;
    } catch {
      return false;
    }
  };
  const e = (tag, cls = "", text) => {
    const n = document.createElement(tag);
    n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  };
  const svg = (tag, attrs = {}, text) => {
    const n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [key, v] of Object.entries(attrs))
      n.setAttribute(key, String(v));
    if (text !== undefined) n.textContent = text;
    return n;
  };
  const fmt = (n) =>
    n == null
      ? "Not reported"
      : Number(n).toLocaleString("en-US", { maximumFractionDigits: 6 });
  const shown = (n, unit) =>
    fmt(n) + (n == null ? "" : unit === "percent" ? "%" : " " + unit);
  function confidence(row, metric) {
    const n = value(row, metric.field);
    let bounds, level;
    if (metric.ci_field) {
      bounds = value(row, metric.ci_field);
      level = metric.ci_level;
    } else if (metric.field === "value") {
      bounds = [n + row.ci_lower_delta, n + row.ci_upper_delta];
      level = row.ci_level;
    }
    return number(n) &&
      number(level) &&
      level > 0 &&
      level < 1 &&
      Array.isArray(bounds) &&
      bounds.length === 2 &&
      bounds.every(number) &&
      bounds[0] <= n &&
      n <= bounds[1]
      ? { lower: bounds[0], upper: bounds[1], level }
      : null;
  }
  const intervalText = (ci, unit) =>
    ci
      ? fmt(ci.level * 100) +
        "% CI: " +
        shown(ci.lower, unit) +
        " to " +
        shown(ci.upper, unit)
      : "Not reported for this measurement";
  const colors = ["#725cc7", "#2e7669", "#b65d3e", "#516aa5", "#99623d"];
  function link(url, label = "Original result source") {
    const a = e("a", "", label);
    if (safe(url)) {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    return a;
  }
  function disclosure(label, child) {
    const d = e("details");
    d.append(e("summary", "", label), child);
    return d;
  }
  function valid(data) {
    if (
      data?.schema_version !== 1 ||
      data.cards?.length !== 39 ||
      data.first_wave_ids?.length !== 27 ||
      data.backlog?.length !== 52 ||
      data.audits?.length !== 46 ||
      Object.keys(data.rune?.summaries || {}).length !== 87
    )
      return false;
    return (
      data.cards.every(
        (c) =>
          /^[a-z0-9-]+$/.test(c.id) &&
          typeof c.question === "string" &&
          c.variants?.length &&
          c.variants.every(
            (v) =>
              safe(v.source_url) &&
              v.rows?.length &&
              v.rows.every(
                (r) => typeof r.label === "string" && safe(r.source_url),
              ) &&
              v.metrics?.length &&
              v.metrics.every(
                (m) =>
                  /^[a-z0-9_-]+$/.test(m.id) &&
                  typeof m.field === "string" &&
                  m.domain?.length === 2 &&
                  m.domain.every(number) &&
                  m.domain[0] < m.domain[1] &&
                  v.rows.every((r) => {
                    const y = value(r, m.field);
                    return (
                      y == null ||
                      (number(y) && y >= m.domain[0] && y <= m.domain[1])
                    );
                  }) &&
                  (!m.x_field ||
                    v.rows.every((r) => {
                      const x = value(r, m.x_field);
                      return x == null || (number(x) && x >= 0);
                    })),
              ),
          ),
      ) &&
      Object.values(data.rune.summaries).every(
        (skills) =>
          Object.keys(skills).length === 16 &&
          Object.values(skills).every(
            (r) => number(r.peakXpRate) && r.peakXpRate >= 0,
          ),
      )
    );
  }
  function selection(card, state) {
    const variant =
      card.variants.find((v) => v.id === state.cohort) || card.variants[0];
    const metric =
      variant.metrics.find((m) => m.id === state.view) || variant.metrics[0];
    return { variant, metric };
  }
  function miniature(card) {
    const { variant, metric } = selection(card, {}),
      node = e("div", "mini-graph");
    node.dataset.graphId = card.id + "-" + metric.id;
    const chart = svg("svg", {
      viewBox: "0 0 320 200",
      "aria-hidden": "true",
      focusable: "false",
    });
    const rows = variant.rows
      .filter((r) => number(value(r, metric.field)))
      .slice(0, 6);
    const sx = (x) =>
      116 +
      ((x - metric.domain[0]) / (metric.domain[1] - metric.domain[0])) * 165;
    for (let i = 0; i <= 2; i++) {
      const x =
        metric.domain[0] + ((metric.domain[1] - metric.domain[0]) * i) / 2;
      chart.append(
        svg("line", {
          x1: sx(x),
          x2: sx(x),
          y1: 20,
          y2: 170,
          class: "mini-grid",
        }),
        svg(
          "text",
          { x: sx(x), y: 190, "text-anchor": "middle" },
          fmt(x) + (metric.unit === "percent" ? "%" : ""),
        ),
      );
    }
    rows.forEach((r, i) => {
      const y = 28 + (i * 140) / Math.max(rows.length, 1),
        n = value(r, metric.field);
      chart.append(
        svg(
          "text",
          { x: 108, y: y + 3, "text-anchor": "end", class: "mini-bars-label" },
          r.label.length > 24 ? r.label.slice(0, 23) + "…" : r.label,
        ),
        svg("rect", {
          x: Math.min(sx(0), sx(n)),
          y: y - 5,
          width: Math.max(2, Math.abs(sx(n) - sx(0))),
          height: 10,
          rx: 3,
          fill: colors[i % colors.length],
        }),
        svg(
          "text",
          { x: sx(n) + 5, y: y + 3, class: "mini-bars-label" },
          fmt(n),
        ),
      );
    });
    node.append(chart);
    return node;
  }
  function chart(card, state = {}, onState) {
    const { variant, metric } = selection(card, state),
      node = e("section", "chart-card coverage-chart");
    node.dataset.coverageId = card.id;
    node.dataset.cohort = variant.id;
    node.dataset.metric = metric.id;
    const h = e("h2", "", metric.label);
    node.append(
      h,
      e(
        "p",
        "chart-subtitle",
        variant.label +
          " · " +
          (metric.direction === "lower_is_better"
            ? "Lower is better"
            : "Higher is better"),
      ),
    );
    const form = e("form", "coverage-controls");
    form.setAttribute("aria-label", "Explore source cohort");
    function select(name, label, choices, selected) {
      const wrap = e("label", "skill-picker", label),
        input = e("select");
      input.name = name;
      for (const [id, title] of choices) {
        const opt = e("option", "", title);
        opt.value = id;
        opt.selected = id === selected;
        input.append(opt);
      }
      wrap.append(input);
      form.append(wrap);
    }
    if (card.variants.length > 1)
      select(
        "cohort",
        "Source cohort",
        card.variants.map((v) => [v.id, v.label]),
        variant.id,
      );
    if (variant.metrics.length > 1)
      select(
        "view",
        "Measurement",
        variant.metrics.map((m) => [m.id, m.label]),
        metric.id,
      );
    const search = e("label", "", "Find a configuration"),
      text = e("input");
    text.type = "search";
    text.name = "config";
    text.maxLength = 200;
    text.value = (state.config || "").slice(0, 200);
    search.append(text);
    form.append(search);
    const all = e("label", "show-all"),
      checkbox = e("input");
    checkbox.type = "checkbox";
    checkbox.name = "all";
    checkbox.checked = Boolean(state.all);
    all.append(checkbox, document.createTextNode("Show all available rows"));
    form.append(all);
    node.append(form);
    form.addEventListener("submit", (ev) => ev.preventDefault());
    function changed(field) {
      const next = {
        ...state,
        cohort: form.elements.cohort?.value || variant.id,
        view: form.elements.view?.value || metric.id,
        config: text.value.slice(0, 200),
        all: checkbox.checked,
      };
      if (field === "cohort")
        next.view = card.variants.find(
          (v) => v.id === next.cohort,
        ).metrics[0].id;
      if (onState) onState(next, field);
      else node.replaceWith(chart(card, next));
    }
    form.addEventListener("change", (ev) => {
      if (ev.target.name !== "config") changed(ev.target.name);
    });
    text.addEventListener("input", () => changed("config"));
    const matching = variant.rows.filter((r) =>
      r.label.toLocaleLowerCase().includes(text.value.toLocaleLowerCase()),
    );
    const eligible = matching.filter(
      (r) =>
        number(value(r, metric.field)) &&
        (!metric.x_field || number(value(r, metric.x_field))),
    );
    const points = checkbox.checked ? eligible : eligible.slice(0, 12);
    node.append(
      e(
        "p",
        "coverage-count",
        points.length +
          " plotted of " +
          eligible.length +
          " eligible matching rows · " +
          variant.rows.length +
          " source rows",
      ),
    );
    if (variant.complete === false)
      node.append(
        e(
          "p",
          "detail-notice",
          "Selected or partially recovered cohort. " +
            (typeof variant.coverage === "string"
              ? variant.coverage
              : JSON.stringify(variant.coverage)),
        ),
      );
    if (metric.x_basis) node.append(e("p", "detail-notice", metric.x_basis));
    const omitted = matching.length - eligible.length;
    if (omitted)
      node.append(
        e(
          "p",
          "source-warning",
          omitted +
            " matching row(s) excluded from this plot because the selected measurement is missing. Missing values are not zero.",
        ),
      );
    const panel = e("div", "point-inspector");
    panel.setAttribute("aria-live", "polite");
    panel.append(
      e(
        "p",
        "",
        "Hover, focus or select a mark to read its exact values and source.",
      ),
    );
    function inspect(r) {
      panel.replaceChildren(
        e("h3", "", r.label),
        e(
          "p",
          "",
          metric.label + ": " + shown(value(r, metric.field), metric.unit),
        ),
      );
      const ci = confidence(r, metric);
      if (ci) panel.append(e("p", "metric-ci", intervalText(ci, metric.unit)));
      if (metric.x_field)
        panel.append(
          e(
            "p",
            "",
            metric.x_label +
              ": " +
              shown(value(r, metric.x_field), metric.x_unit),
          ),
        );
      if (r.agent || r.harness || r.effort || r.modality)
        panel.append(
          e(
            "p",
            "",
            [
              r.agent && "Agent: " + r.agent,
              r.harness && "Harness: " + r.harness,
              r.effort && "Effort: " + r.effort,
              r.modality && "Modality: " + r.modality,
            ]
              .filter(Boolean)
              .join(" · "),
          ),
        );
      panel.append(
        e(
          "p",
          "",
          (r.evaluation_date_label || "Evaluation date") +
            ": " +
            (r.evaluation_date || variant.evaluation_date || "not reported") +
            (r.model_release_date
              ? " · Model release: " + r.model_release_date
              : ""),
        ),
        link(r.source_url),
      );
      panel.append(
        disclosure(
          "Exact source observation",
          e("pre", "", JSON.stringify(r.raw || r, null, 2)),
        ),
      );
    }
    if (points.length) {
      const narrow = matchMedia("(max-width: 600px)").matches,
        width = narrow ? 360 : 820;
      const left = metric.x_field ? 60 : narrow ? 153 : 320,
        right = metric.x_field ? 30 : 72,
        top = 25;
      const height = metric.x_field
          ? 330
          : 75 + points.length * (narrow ? 58 : 42),
        bottom = height - 55;
      const drawing = svg("svg", {
        viewBox: `0 0 ${width} ${height}`,
        role: "group",
        "aria-label": metric.label + " (" + metric.unit + "); " + variant.label,
        class: "coverage-plot",
      });
      const xdomain = metric.x_field
        ? [
            0,
            Math.max(...points.map((r) => value(r, metric.x_field))) * 1.12 ||
              1,
          ]
        : metric.domain;
      const sx = (x) =>
        left +
        ((width - left - right) * (x - xdomain[0])) / (xdomain[1] - xdomain[0]);
      const sy = (y) =>
        bottom -
        ((bottom - top) * (y - metric.domain[0])) /
          (metric.domain[1] - metric.domain[0]);
      for (let i = 0; i <= 4; i++) {
        const x = xdomain[0] + ((xdomain[1] - xdomain[0]) * i) / 4;
        drawing.append(
          svg("line", {
            x1: sx(x),
            x2: sx(x),
            y1: top,
            y2: bottom,
            class: "chart-grid",
          }),
          svg(
            "text",
            {
              x: sx(x),
              y: bottom + 20,
              "text-anchor": "middle",
              class: "chart-tick",
            },
            Number(x).toLocaleString("en-US", { maximumFractionDigits: 2 }),
          ),
        );
      }
      drawing.append(
        svg(
          "text",
          {
            x: (left + width - right) / 2,
            y: height - 8,
            "text-anchor": "middle",
            class: "chart-axis",
          },
          metric.x_field ? metric.x_unit : metric.unit,
        ),
      );
      if (metric.x_field) {
        for (let i = 0; i <= 4; i++) {
          const y =
            metric.domain[0] + ((metric.domain[1] - metric.domain[0]) * i) / 4;
          drawing.append(
            svg("line", {
              x1: left,
              x2: width - right,
              y1: sy(y),
              y2: sy(y),
              class: "chart-grid",
            }),
            svg(
              "text",
              {
                x: left - 8,
                y: sy(y) + 4,
                "text-anchor": "end",
                class: "chart-tick",
              },
              fmt(y),
            ),
          );
        }
        node.append(
          e(
            "p",
            "axis-description",
            "X: " +
              metric.x_label +
              " (" +
              metric.x_unit +
              ") · Y: " +
              (metric.y_label || metric.label) +
              " (" +
              metric.unit +
              ")",
          ),
        );
      }
      const targets = [];
      points.forEach((r, i) => {
        const n = value(r, metric.field),
          y = metric.x_field ? sy(n) : top + 18 + i * (narrow ? 58 : 42),
          x = sx(metric.x_field ? value(r, metric.x_field) : n),
          ci = confidence(r, metric);
        const mark = svg("g", {
          tabindex: 0,
          role: "button",
          "aria-label":
            r.label +
            ": " +
            shown(n, metric.unit) +
            (metric.x_field
              ? ", " + shown(value(r, metric.x_field), metric.x_unit)
              : "") +
            (ci ? ", " + intervalText(ci, metric.unit) : ""),
          class: "coverage-mark",
          "data-result-id": r.result_id || String(i),
        });
        if (metric.x_field)
          mark.append(
            svg("circle", { cx: x, cy: y, r: 22, fill: "transparent" }),
          );
        if (metric.x_field)
          mark.append(
            svg(
              i % 2 ? "rect" : "circle",
              i % 2
                ? {
                    x: x - 6,
                    y: y - 6,
                    width: 12,
                    height: 12,
                    fill: colors[i % colors.length],
                  }
                : { cx: x, cy: y, r: 7, fill: colors[i % colors.length] },
            ),
          );
        else {
          const labelNode = svg("text", {
            x: left - 12,
            y: y + 4,
            "text-anchor": "end",
            class: "coverage-label",
          });
          const limit = narrow ? 24 : 45,
            lines = [];
          for (const word of r.label.split(" ")) {
            if (!lines.length || lines.at(-1).length + word.length + 1 > limit)
              lines.push(word);
            else lines[lines.length - 1] += " " + word;
          }
          lines.slice(0, 3).forEach((line, j) =>
            labelNode.append(
              svg(
                "tspan",
                {
                  x: left - 12,
                  dy: j === 0 ? -(Math.min(lines.length, 3) - 1) * 6 : 12,
                },
                j === 2 && lines.length > 3 ? line + "…" : line,
              ),
            ),
          );
          drawing.append(labelNode);
          mark.append(
            svg("rect", {
              x: Math.min(sx(0), x),
              y: y - 9,
              width: Math.max(2, Math.abs(x - sx(0))),
              height: 18,
              rx: 3,
              fill: colors[i % colors.length],
            }),
            svg(
              "text",
              { x: x + 7, y: y + (ci ? 22 : 4), class: "chart-tick" },
              fmt(n),
            ),
          );
        }
        // Only explicitly identified source confidence intervals are drawn. Undefined +/- columns remain in source details.
        if (!metric.x_field && ci)
          mark.append(
            svg("line", {
              x1: sx(ci.lower),
              x2: sx(ci.upper),
              y1: y,
              y2: y,
              stroke: "#1e293b",
              "stroke-width": 2,
              class: "confidence-interval",
              "data-ci-lower": ci.lower,
              "data-ci-upper": ci.upper,
              "data-ci-level": ci.level,
            }),
            ...[ci.lower, ci.upper].map((bound) =>
              svg("line", {
                x1: sx(bound),
                x2: sx(bound),
                y1: y - 5,
                y2: y + 5,
                stroke: "#1e293b",
                "stroke-width": 2,
              }),
            ),
          );
        for (const event of ["mouseenter", "focus", "click"])
          mark.addEventListener(event, () => inspect(r));
        mark.addEventListener("keydown", (ev) => {
          if (["Enter", " "].includes(ev.key)) {
            ev.preventDefault();
            inspect(r);
          }
          if (
            ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(ev.key)
          ) {
            ev.preventDefault();
            targets[
              (i +
                (ev.key === "ArrowDown" || ev.key === "ArrowRight"
                  ? 1
                  : targets.length - 1)) %
                targets.length
            ]?.focus();
          }
        });
        targets.push(mark);
        drawing.append(mark);
      });
      node.append(drawing);
    } else
      node.append(e("p", "empty-state", "No reported values match this view."));
    node.append(panel);
    const knownCI = variant.rows.some((r) => confidence(r, metric));
    const confidenceLevels = [
      ...new Set(
        variant.rows.map((r) => confidence(r, metric)?.level).filter(number),
      ),
    ].map((level) => fmt(level * 100) + "%");
    node.append(
      e(
        "p",
        "chart-subtitle",
        knownCI
          ? "Whiskers show the reported " +
              confidenceLevels.join(" and ") +
              " confidence intervals for " +
              metric.label +
              "; exact bounds are in the table and mark details. Rows without reported intervals remain unlabeled. Differences do not by themselves establish significance."
          : "No defined uncertainty intervals were supplied for this view. Reported ± values with an unknown definition remain in the source details; no significance claim is made.",
      ),
    );
    if (variant.primary_effect)
      node.append(
        disclosure(
          "Study effect and uncertainty as reported",
          e("pre", "", JSON.stringify(variant.primary_effect, null, 2)),
        ),
      );
    const table = e("table"),
      head = e("thead"),
      hr = e("tr"),
      body = e("tbody");
    table.append(e("caption", "", variant.label + " · exact source values"));
    for (const title of [
      "Configuration",
      metric.label + " (" + metric.unit + ")",
      ...(knownCI
        ? ["Reported confidence interval (" + metric.unit + ")"]
        : []),
      ...(metric.x_field ? [metric.x_label + " (" + metric.x_unit + ")"] : []),
      "Source",
    ]) {
      const th = e("th", "", title);
      th.scope = "col";
      hr.append(th);
    }
    head.append(hr);
    table.append(head);
    for (const r of matching) {
      const tr = e("tr");
      for (const cell of [
        r.label,
        shown(value(r, metric.field), metric.unit),
        ...(knownCI ? [intervalText(confidence(r, metric), metric.unit)] : []),
        ...(metric.x_field
          ? [shown(value(r, metric.x_field), metric.x_unit)]
          : []),
        link(r.source_url, "Source"),
      ]) {
        const td = e("td");
        if (cell instanceof Node) td.append(cell);
        else td.textContent = cell;
        tr.append(td);
      }
      body.append(tr);
    }
    table.append(body);
    const scroll = e("div", "table-scroll");
    scroll.append(table);
    const tableDetails = disclosure(
      "Table alternative · all matching exact values",
      scroll,
    );
    tableDetails.className = "chart-table";
    node.append(tableDetails);
    return node;
  }
  function runeCard(data, config, skill) {
    const key = Object.hasOwn(data.summaries, config) ? config : "gpt61sol",
      skills = data.summaries[key],
      label = data.labels[key]?.displayName || key;
    const row = skills[skill] || skills.woodcutting;
    return {
      id: "runebench-configuration",
      variants: [
        {
          id: "single",
          label: label + " · " + skill + " · one selected published trial",
          source_url: data.source_url,
          rows: [
            {
              ...row,
              label: label,
              source_url: data.source_url,
              result_id: key + "-" + skill,
              evaluation_date: row.containerStartedAt?.slice(0, 10) || null,
              evaluation_date_label: "Container start date",
              raw: row,
            },
          ],
          metrics: [
            {
              id: "published",
              label: "Peak normalized XP rate",
              unit: "normalized XP/min",
              field: "peakXpRate",
              domain: [0, Math.max(100, Math.ceil(row.peakXpRate / 100) * 100)],
              direction: "higher_is_better",
            },
          ],
          complete: true,
        },
      ],
    };
  }
  window.LAB_COVERAGE = { valid, selection, miniature, chart, runeCard };
})();
