(() => {
  "use strict";
  const form = document.querySelector("#directory-search");
  if (form) {
    const query = form.elements.q,
      type = form.elements.type;
    const params = new URLSearchParams(location.search);
    query.value = (params.get("q") || "").slice(0, 150);
    type.value = ["company", "facility", "product"].includes(params.get("type"))
      ? params.get("type")
      : "all";
    function render() {
      let count = 0;
      for (const group of document.querySelectorAll(".directory-group")) {
        let groupCount = 0;
        for (const card of group.querySelectorAll(".entity-card")) {
          const match =
            (type.value === "all" || card.dataset.kind === type.value) &&
            card.dataset.search.includes(query.value.trim().toLowerCase());
          card.hidden = !match;
          if (match) {
            count++;
            groupCount++;
          }
        }
        group.hidden = groupCount === 0;
      }
      document.querySelector("#directory-count").textContent =
        `${count} ${count === 1 ? "entity" : "entities"} found`;
      document.querySelector("#directory-empty").hidden = count > 0;
      const p = new URLSearchParams();
      if (query.value) p.set("q", query.value);
      if (type.value !== "all") p.set("type", type.value);
      try {
        history.replaceState(
          null,
          "",
          location.pathname + (p.size ? "?" + p : ""),
        );
      } catch {}
    }
    form.addEventListener("input", render);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      render();
    });
    form.addEventListener("reset", () => queueMicrotask(render));
    window.addEventListener("popstate", () => location.reload());
    render();
  }
  for (const element of document.querySelectorAll("[data-facility-map]")) {
    const site = window.INFRASTRUCTURE_ATLAS?.sites.find(
      (s) => s.id === element.dataset.facilityMap,
    );
    if (!site || !window.AtlasMap) {
      element.textContent =
        "The map could not load. The location evidence and coordinates remain available below.";
      continue;
    }
    const map = window.AtlasMap.create(element, {
      base: element.dataset.atlasBase,
      onSelect: () => document.querySelector("#location-title").focus?.(),
    });
    map.setSites([site], site.id);
    map.focusSite(site);
  }
})();
