/* Bundled geography by default. Street tiles load only after an explicit request. */
(() => {
  "use strict";
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  };
  const statusNames = {
    operating: "Operating",
    construction: "Under construction",
    announced: "Announced",
    unknown: "Status unknown",
    restart_in_progress: "Restart in progress",
    operating_estimated: "Operating capacity estimated",
    not_yet_operating_in_estimate: "No operating capacity in estimate",
  };
  window.AtlasMap = {
    create(container, options = {}) {
      if (!window.L || !window.ATLAS_GEOGRAPHY) {
        container.replaceChildren(
          el(
            "p",
            "map-unavailable",
            "The geographic map could not load. All facilities remain available in the directory.",
          ),
        );
        return { setSites() {}, focusSite() {}, fit() {}, region() {} };
      }
      const L = window.L;
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const map = L.map(container, {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        minZoom: 0,
        maxZoom: 19,
        worldCopyJump: false,
        maxBounds: [
          [-85, -180],
          [85, 180],
        ],
        maxBoundsViscosity: 1,
        zoomAnimation: !reduced,
        fadeAnimation: !reduced,
        markerZoomAnimation: !reduced,
      }).setView([25, 15], 2);
      container.setAttribute("role", "region");
      container.setAttribute(
        "aria-label",
        "Geographic facility map. Arrow keys pan; plus and minus zoom. Use the facility list for an alternative.",
      );
      const land = L.geoJSON(window.ATLAS_GEOGRAPHY.countries, {
        style: {
          fillColor: "#e7e8d8",
          fillOpacity: 1,
          color: "#a3b3a2",
          weight: 0.65,
        },
        interactive: false,
      }).addTo(map);
      const labels = L.layerGroup().addTo(map);
      const pins = L.layerGroup().addTo(map);
      let sites = [],
        selected = null,
        street = null,
        streetErrors = 0;
      const parent = container.closest(".geographic-frame");
      const note = parent?.querySelector("[data-map-note]");
      const counter = parent?.querySelector("[data-map-count]");
      function label(lat, lon, text, cls) {
        const n = el("span", cls, text);
        L.marker([lat, lon], {
          interactive: false,
          keyboard: false,
          icon: L.divIcon({
            className: "geographic-label",
            html: n,
            iconSize: [120, 20],
            iconAnchor: [60, 10],
          }),
        }).addTo(labels);
      }
      function drawLabels() {
        labels.clearLayers();
        if (street) return;
        const z = map.getZoom(),
          bounds = map.getBounds();
        if (z < 5)
          for (const c of window.ATLAS_GEOGRAPHY.countries.features) {
            const p = c.properties;
            if (
              p.rank <= z &&
              p.label.every(Number.isFinite) &&
              bounds.contains(p.label)
            )
              label(...p.label, p.name, "country-label");
          }
        if (z >= 4)
          for (const p of window.ATLAS_GEOGRAPHY.places) {
            if (p.minZoom <= z && bounds.contains([p.lat, p.lon]))
              label(p.lat, p.lon, p.name, "place-label");
          }
      }
      function openGroup(group, marker) {
        if (group.length === 1) {
          options.onSelect?.(group[0].id);
          return;
        }
        const content = el("div", "geographic-cluster");
        content.append(
          el("p", "eyebrow", `${group.length} facilities in this area`),
        );
        for (const site of group) {
          const a = el("a", "cluster-facility-link", site.name);
          a.href =
            (options.base || "./") +
            `facilities/${encodeURIComponent(site.id)}/`;
          const row = el("div");
          row.append(
            a,
            el("small", "", `${site.layer} · ${site.location.label}`),
          );
          const pick = el("button", "text-button", "Locate on map");
          pick.type = "button";
          pick.addEventListener("click", () => {
            map.closePopup();
            options.onSelect?.(site.id);
          });
          row.append(pick);
          content.append(row);
        }
        // A standalone popup survives marker redraws caused by its own auto-pan.
        L.popup({ maxWidth: 340, className: "atlas-map-popup" })
          .setLatLng(marker.getLatLng())
          .setContent(content)
          .openOn(map);
        requestAnimationFrame(() =>
          content.querySelector("a")?.focus({ preventScroll: true }),
        );
      }
      function drawPins() {
        pins.clearLayers();
        const bounds = map.getBounds(),
          groups = [];
        for (const site of sites) {
          const latlng = [site.location.lat, site.location.lon];
          if (!latlng.every(Number.isFinite) || !bounds.contains(latlng))
            continue;
          const point = map.latLngToContainerPoint(latlng);
          const g = groups.find((g) => g.point.distanceTo(point) < 35);
          if (g) g.sites.push(site);
          else groups.push({ point, sites: [site] });
        }
        if (counter)
          counter.textContent = `${sites.filter((s) => Number.isFinite(s.location.lat) && Number.isFinite(s.location.lon)).length} mapped locations · ${groups.reduce((n, g) => n + g.sites.length, 0)} in view`;
        for (const group of groups) {
          const site = group.sites[0],
            multiple = group.sites.length > 1;
          const status = group.sites.every((s) => s.status === site.status)
            ? site.status
            : "unknown";
          const icon = el(
            "span",
            `geographic-pin ${status}${multiple ? " cluster-point" : ""}${site.location.approximate !== false ? " approximate" : ""}${group.sites.some((s) => s.id === selected) ? " selected" : ""}`,
            multiple ? String(group.sites.length) : "",
          );
          const labelText = multiple
            ? `${group.sites.length} nearby facilities: ${group.sites.map((s) => s.name).join(", ")}`
            : `${site.name}, ${site.layer}, ${site.location.label}. ${site.location.precision}. ${statusNames[site.status] || "Status unknown"}`;
          const marker = L.marker([site.location.lat, site.location.lon], {
            title: labelText,
            keyboard: true,
            autoPanOnFocus: false,
            icon: L.divIcon({
              className: "atlas-map-marker",
              html: icon,
              iconSize: [32, 32],
              iconAnchor: [16, 16],
            }),
          }).addTo(pins);
          marker.getElement().setAttribute("aria-label", labelText);
          marker
            .getElement()
            .setAttribute(
              "aria-pressed",
              String(group.sites.some((s) => s.id === selected)),
            );
          marker.on("click", () => openGroup(group.sites, marker));
          marker.getElement().addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            event.stopPropagation();
            openGroup(group.sites, marker);
            if (group.sites.length === 1)
              container.focus({ preventScroll: true });
          });
        }
        container.dataset.zoom = String(map.getZoom());
        container.dataset.center = `${map.getCenter().lat.toFixed(5)},${map.getCenter().lng.toFixed(5)}`;
      }
      function fit() {
        const points = sites
          .filter(
            (s) =>
              Number.isFinite(s.location.lat) &&
              Number.isFinite(s.location.lon),
          )
          .map((s) => [s.location.lat, s.location.lon]);
        if (points.length)
          map.fitBounds(points, {
            padding: [38, 38],
            maxZoom: points.length === 1 ? 10 : 7,
            animate: false,
          });
        else map.setView([25, 15], 2);
      }
      parent?.querySelectorAll("[data-map-action]").forEach((b) =>
        b.addEventListener("click", () => {
          if (b.dataset.mapAction === "zoom-in") map.zoomIn();
          if (b.dataset.mapAction === "zoom-out") map.zoomOut();
          if (b.dataset.mapAction === "fit") fit();
        }),
      );
      const streetToggle = parent?.querySelector("[data-street-layer]");
      if (streetToggle) {
        streetToggle.disabled = location.protocol === "file:";
        streetToggle.addEventListener("change", () => {
          if (streetToggle.checked) {
            streetErrors = 0;
            street = L.tileLayer(window.ATLAS_MAP_CONFIG.streetTileUrl, {
              maxZoom: window.ATLAS_MAP_CONFIG.streetMaxZoom,
              minZoom: 0,
              noWrap: true,
              updateWhenIdle: true,
              updateWhenZooming: false,
              keepBuffer: 0,
              referrerPolicy: "strict-origin-when-cross-origin",
            });
            street.on("tileerror", () => {
              if (++streetErrors > 2 && note)
                note.textContent =
                  "Street tiles are unavailable. Bundled geography and facility links remain usable; turn off street detail to return to the local map.";
            });
            street.addTo(map);
            if (note)
              note.textContent =
                "Street detail: OpenStreetMap. Only the visible map is requested; zooming does not improve a marker's evidence precision.";
          } else {
            if (street) map.removeLayer(street);
            street = null;
            if (note)
              note.textContent =
                "Bundled geography. Enable street detail for roads and buildings; approximate markers remain approximate at every zoom.";
          }
          drawLabels();
        });
      }
      map.on("moveend zoomend resize", () => {
        drawLabels();
        drawPins();
      });
      new ResizeObserver(() => map.invalidateSize({ pan: false })).observe(
        container,
      );
      L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
      drawLabels();
      const api = {
        setSites(rows, id) {
          sites = rows;
          selected = id;
          drawPins();
        },
        focusSite(site) {
          if (!site || !Number.isFinite(site.location.lat)) return;
          selected = site.id;
          map.setView(
            [site.location.lat, site.location.lon],
            site.location.recommendedZoom ||
              (site.location.approximate === false ? 15 : 9),
            { animate: false },
          );
          drawPins();
        },
        fit,
        region(bounds) {
          map.fitBounds(bounds, { animate: false, padding: [15, 15] });
        },
      };
      return api;
    },
  };
})();
