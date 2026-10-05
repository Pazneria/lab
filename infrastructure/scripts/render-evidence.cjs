"use strict";

// Only typed, escaped public fields become HTML. Source observations stay in the dataset.
module.exports = function evidenceRenderer({
  esc,
  human,
  section,
  fields,
  citation,
  link,
  raw,
}) {
  const number = (n) =>
    Number.isFinite(n)
      ? Number(n.toPrecision(2)).toLocaleString("en-US", {
          maximumFractionDigits: 6,
        })
      : "Not established";
  const power = (mw) =>
    Number.isFinite(mw) ? `~${number(mw)} MW` : "Not established";
  const flop = (n) =>
    Number.isFinite(n)
      ? `~${Number(n.toExponential(1).split("e")[0])} × 10^${Number(n.toExponential(1).split("e")[1])} FLOP`
      : "Not publicly established";
  const badge = (text) => `<span class="evidence-badge">${esc(text)}</span>`;
  const list = (items = []) =>
    items.length
      ? `<ul class="evidence-notes">${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`
      : "";
  const external = (url, label) => {
    if (!url) return "";
    const u = new URL(url);
    if (u.protocol !== "https:" || u.username || u.password)
      throw Error(`Unsafe evidence URL ${url}`);
    return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
  };
  const powerRecord = (r, label) =>
    `<article class="evidence-card">${badge(label)}<h3>${esc(r.label)}</h3><p class="evidence-value">${r.power_mw === null ? "Not quantified in MW" : esc(({ approximately: "~", up_to: "Up to ", well_over: "Well over ", company_target: "Target: " }[r.value_qualifier] || "") + number(r.power_mw) + " MW")}</p>${fields(
      [
        ["Measurement basis", esc(human(r.power_basis))],
        ["Source qualifier", esc(human(r.value_qualifier))],
        ["Announced", esc(r.announced_at)],
        ["Delivery target", esc(r.target_online || "Not established")],
        ["State", esc(human(r.status))],
      ],
    )}<p>${esc(r.notes)}</p>${citation(r.source_ids)}</article>`;
  const estimateDates = (c) =>
    `<p class="status-note">Evidence through ${esc(c.evidence_at || "date not stated")} · Source updated ${esc(c.source_updated_at || "date not stated")} · Snapshot ${esc(c.snapshot_at)}</p>`;
  function roles(items = []) {
    return items.length
      ? items
          .map(
            (r) =>
              `${link(r.player_id, r.name)} <span class="role-confidence">(${esc(r.confidence)} in Epoch)</span>`,
          )
          .join(", ")
      : "Not established";
  }
  function siteEstimateCard(id) {
    const s = raw.sites.find((s) => s.id === id),
      c = s?.capacity_estimate;
    if (!s) return "";
    return `<article class="evidence-card">${badge(c ? "Independent site estimate · Epoch AI" : "Public facility record")}<h3>${link(id, s.name)}</h3>${
      c
        ? `<div class="power-pair"><p><strong>${power(c.it_capacity_mw)}</strong><span>IT capacity</span></p><p><strong>${power(c.facility_capacity_mw)}</strong><span>Total facility capacity</span></p></div>${estimateDates(c)}${fields(
            [
              ["Hardware owner", roles(c.hardware_owners)],
              ["Estimated users", roles(c.users)],
            ],
          )}<p class="reading-note">${c.it_capacity_mw === 0 ? "Zero means no operating capacity in this model at the cutoff; it is not a meter reading. " : ""}Company allocation and metered draw are unknown.</p>`
        : `<p>${esc(s.summary)}</p>`
    }</article>`;
  }
  function training(t) {
    const estimate = t.evidence_status.startsWith("independent_estimate");
    const detail = [
      ...(t.scope ? [["Scope", esc(t.scope)]] : []),
      ["Total training compute", esc(flop(t.total_training_compute_flop))],
      ...(t.pretraining_compute_flop
        ? [
            [
              "Pre- and mid-training estimate",
              esc(flop(t.pretraining_compute_flop)),
            ],
          ]
        : []),
      ["Post-training compute", esc(flop(t.post_training_compute_flop))],
      ...(t.hardware ? [["Hardware basis", esc(t.hardware)]] : []),
      ...(t.accelerator_count
        ? [
            [
              "Accelerator count used",
              esc(t.accelerator_count.toLocaleString("en-US")),
            ],
          ]
        : []),
      ...(t.duration_days
        ? [["Assumed duration", `${esc(t.duration_days)} days`]]
        : []),
      ...(t.utilization
        ? [
            [
              "Utilization",
              esc(
                `${t.utilization.value * 100}% ${t.utilization.metric} · ${t.utilization.status}`,
              ),
            ],
          ]
        : []),
      ...(t.range_flop
        ? [
            [
              "Quoted interval",
              esc(
                `${flop(t.range_flop.low)} to ${flop(t.range_flop.high)}. ${t.range_flop.interpretation}`,
              ),
            ],
          ]
        : []),
      ...(t.source_confidence
        ? [["Epoch confidence", esc(t.source_confidence)]]
        : []),
      ["Epoch row updated", esc(t.epoch_row_last_modified)],
    ];
    return `<article class="evidence-card training-record" data-model="${esc(t.model)}">${badge(estimate ? "Independent estimate · Epoch AI" : "Training compute unknown")}<h3>${esc(t.model)}</h3><p class="evidence-value">${esc(t.display)}</p><p>${esc(t.reason)}</p><details class="evidence-detail"><summary>Scope, inputs and limitations</summary>${fields(detail)}${list(t.assumptions)}${list(t.limitations)}</details>${citation(t.source_ids)}</article>`;
  }
  function lab(p) {
    const o = p.operating_power,
      sample = o.covered_owned_ai_sites;
    let content = `<div class="unknown-panel"><h3>Lab-wide operating power: not established</h3><p>${esc(o.reason)}</p><p>${esc(o.metered_consumption_status)}. Power is a rate in W or MW; 1 MW = 1,000,000 W.</p></div>`;
    if (o.historical_company_report)
      content += powerRecord(
        o.historical_company_report,
        "Historical company report · not current operating power",
      );
    if (sample.it_capacity_mw !== null)
      content += `<details class="evidence-detail owner-sample"><summary>Incomplete hardware-owner sample: ${sample.site_count} sites</summary>${badge("Independent estimate · incomplete sample")}<p class="evidence-value">${power(sample.it_capacity_mw)} IT</p><p>${esc(sample.scope)}</p><p>This subtotal is neither a lab allocation nor a hard lower bound. Dates and uncertainty vary across the included site records.</p><p>${sample.site_ids.map((id) => link(id)).join(" · ")}</p>${citation(sample.source_ids)}</details>`;
    content += `<h3 class="subsection-title">Selected facility estimates</h3><div class="evidence-grid">${p.major_site_ids.map(siteEstimateCard).join("")}</div><p class="reading-note">Shared facilities appear once in the atlas. Customer access does not assign the facility's full capacity to a lab. Values below are dated estimates of capacity, not live electricity use.</p>`;
    let html = section(
      "power",
      "Power and compute access",
      content,
      `Evidence snapshot ${esc(p.as_of)}. No company-wide or global GW total is inferred.`,
    );
    html += section(
      "models",
      "Models and training compute",
      `<div class="evidence-grid">${p.flagship_models.map((m) => `<article class="evidence-card">${badge(human(m.access))}<h3>${esc(m.name)}</h3><p>${esc(m.selection_basis)}</p><p class="status-note">Released / announced ${esc(m.released_at)}</p>${citation(m.source_ids)}</article>`).join("")}</div><p class="reading-note">${esc(p.best_model_rule)}</p><h3 class="subsection-title">Training-compute evidence</h3><div class="evidence-grid">${p.training_compute.map(training).join("")}</div>${p.historical_training_reference.length ? `<details class="evidence-detail historical-models"><summary>Historical model references — separate from the current models above</summary><div class="evidence-grid">${p.historical_training_reference.map((h) => `<article class="evidence-card">${badge("Historical Epoch estimate")}<h3>${esc(h.model)}</h3><p class="evidence-value">${esc(flop(h.compute_flop))}</p><p>Released ${esc(h.released_at)} · Epoch confidence: ${esc(h.source_confidence)} · Row updated ${esc(h.row_modified_at)}</p><p>${esc(h.method_note)}</p>${h.low_flop && h.high_flop ? `<p>Quoted interval: ${esc(flop(h.low_flop))} to ${esc(flop(h.high_flop))}; no confidence level inferred.</p>` : ""}${citation(h.source_ids)}</article>`).join("")}</div></details>` : ""}`,
      "Training FLOPs count accumulated operations. FLOP/s measures a rate; watts measure power. Neither a cloud contract nor chip peak performance establishes a model's total training FLOPs.",
    );
    html += section(
      "lab-partners",
      "Compute partners and hardware",
      `<div class="evidence-grid">${p.partners.map((r) => `<article class="evidence-card"><h3>${esc(r.name)}</h3><p>${esc(r.role)}</p>${citation(r.source_ids)}</article>`).join("")}${p.hardware.map((h) => `<article class="evidence-card">${badge(human(h.status))}<h3>${esc(h.platform)}</h3><p>${esc(h.scope)}</p>${citation(h.source_ids)}</article>`).join("")}</div>`,
    );
    if (p.future_capacity.length)
      html += section(
        "future-capacity",
        "Future commitments and historical proposals",
        `<div class="evidence-grid future-records">${p.future_capacity.map((r) => powerRecord(r, r.status.startsWith("historical") ? "Historical proposal · current allocation unverified" : "Future commitment · operating delivery unverified")).join("")}</div>`,
        "These agreements and project ambitions can overlap. They are not added to site estimates or treated as energized capacity.",
      );
    html += `<aside class="reading-note" aria-label="Profile limitations">${list(p.cautions)}<p>${esc(p.source_verification_scope)}</p></aside>`;
    return html;
  }
  function timeline(rows, future) {
    if (!rows.length) return "";
    return `<details class="evidence-detail ${future ? "future-records" : ""}"><summary>${future ? "Future scenarios — not current operating capacity" : "Dated estimate history"} (${rows.length})</summary><div class="timeline-records">${rows.map((o) => `<article class="timeline-record">${badge(future ? "Projected scenario" : "Dated Epoch estimate")}<h4>${esc(o.date)}</h4><p><strong>${power(o.it_capacity_mw)} IT</strong> · ${power(o.facility_capacity_mw)} total facility</p><details><summary>Evidence and construction notes</summary><p class="source-observation">${esc(o.construction_note || "No additional note")}</p>${citation(o.source_ids)}</details></article>`).join("")}</div></details>`;
  }
  function capacity(c) {
    const dated = c.observations.filter((o) => o.state !== "future_scenario"),
      future = c.observations.filter((o) => o.state === "future_scenario");
    return `<div class="capacity-estimate">${badge("Independent capacity estimate · Epoch AI")}<div class="power-pair"><p><strong>${power(c.it_capacity_mw)}</strong><span>IT capacity · ~${number(c.it_capacity_w)} W</span></p><p><strong>${power(c.facility_capacity_mw)}</strong><span>Total facility capacity · ~${number(c.facility_capacity_w)} W</span></p></div>${estimateDates(c)}<p>${esc(c.estimate_method)}</p><p class="reading-note">Capacity is installed or inferred availability, not metered consumption. IT capacity and total facility capacity have different scopes; do not add them. No lab allocation or formal uncertainty interval is established.${c.it_capacity_mw === 0 ? " Zero means no operating capacity in the model at this cutoff, not a meter reading." : ""}</p>${fields(
      [
        ["AI hardware owner (Epoch)", roles(c.hardware_owners)],
        ["Estimated users (Epoch)", roles(c.users)],
        ["Review scope", esc(human(c.review_level))],
      ],
    )}${list(c.warnings)}<p>${external(c.source_url, "Epoch facility record")} · ${external(c.calculations_url, "Underlying calculations")}</p>${citation(c.source_ids)}${c.hardware_count_estimates.length ? `<h3 class="subsection-title">Latest recorded count by accelerator type</h3><div class="evidence-grid">${c.hardware_count_estimates.map((h) => `<article class="evidence-card">${badge("Epoch dataset · source qualification below")}<h4>${esc(h.chip_type)}</h4><p class="evidence-value">${esc(h.count.toLocaleString("en-US"))}</p><p>As of ${esc(h.date)}</p><p>Count source: ${esc(h.count_source)}. Chip identification: ${esc(h.chip_source)}.</p></article>`).join("")}</div><p class="reading-note">Each chip type uses its latest dated row at the snapshot cutoff. Counts are not summed across historical observations. These are hardware counts, not rack counts or model assignments.</p>` : ""}${timeline(dated, false)}${timeline(future, true)}</div>`;
  }
  function history(rows = []) {
    if (!rows.length) return "";
    return section(
      "history",
      "Earlier project record",
      rows
        .map(
          (h) =>
            `<article class="evidence-card">${badge("Historical proposal · superseded roles retained")}<h3>${esc(h.as_of)}</h3><p>${esc(h.summary)}</p><p>${esc(h.status_note)}</p>${list((h.capacity_observations || []).map((o) => `${o.label}: ${o.value.toLocaleString("en-US")} ${o.unit}; ${human(o.state)}; ${human(o.basis)}${o.period ? "; " + o.period : ""}`))}${citation(h.source_ids)}</article>`,
        )
        .join(""),
      "Earlier announcements remain visible for context. They do not establish current ownership, allocation or operating delivery.",
    );
  }
  return { lab, capacity, history, roles };
};
