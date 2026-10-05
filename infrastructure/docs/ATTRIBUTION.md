# Data, map and software attribution

## Natural Earth

Bundled geography uses Natural Earth 1:50m countries and populated places, retrieved
2026-10-05 from the official natural-earth-vector repository:

- https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson
- https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_populated_places.geojson
- Terms: https://www.naturalearthdata.com/about/terms-of-use/ (public domain)

Original files are `data/natural-earth-countries.geojson` (SHA-256
`3e458fc036ad0a66411f2c1e6cac49c5d7bfb81cb1123bc513b22511a2b7fdeb`)
and `data/natural-earth-places.geojson` (SHA-256
`8e70756b39fae9bcdc1e332bfc510c024c5edd3a13203ffd20092ee37b61d978`).
`build-geography.cjs` preserves the geometry and projects only the label fields needed
by the UI into `assets/geography.js`. The earlier 1:110m SVG and generator remain as
first-edition source history, but are not used by the current geographic map.

## Leaflet

Leaflet 1.9.4 is bundled locally in `assets/vendor/leaflet/`, including its BSD 2-Clause
license and image assets. Source: https://leafletjs.com/ and the published leaflet
1.9.4 package. JS SHA-256:
`db49d009c841f5ca34a888c96511ae936fd9f5533e90d8b2c4d57596f4e5641a`;
CSS SHA-256: `a7837102824184820dfa198d1ebcd109ff6d0ff9a2672a074b9a1b4d147d04c6`.
No remote script, font, paid API key or analytics is used.

## OpenStreetMap

Some reviewed location reference points are derived from public OpenStreetMap data:
© OpenStreetMap contributors, ODbL. These retain their per-record sources and caveats.
See https://www.openstreetmap.org/copyright. This attribution applies to those data
records whether or not optional street detail is enabled. Other location references
are credited individually to operator directories, government points and publications.
No legal boundary or surveyed accuracy is claimed. Cluster positions use an actual
member point; overlapping records are never displaced to fabricated coordinates.

Street detail is opt-in and uses `https://tile.openstreetmap.org/{z}/{x}/{y}.png`.
Provider URL/max zoom are configured in `assets/map-config.js`; keep visible provider
attribution synchronized if changing the provider. The viewer follows the public
policy at https://operations.osmfoundation.org/policies/tiles/: visible tiles only,
normal browser caching, identifiable browser User-Agent and Referer, no bulk download,
prefetch, offline tile pack or retry loop. Enabling the layer sends normal browser
requests to OSM, including IP address, viewport tile coordinates and origin Referer.
The default bundled map sends no map-provider requests. The test intercepts all tile
requests. Report base-map errors at https://www.openstreetmap.org/fixthemap.

## Epoch AI estimates

Epoch AI, AI data centers, retrieved 2026-10-05. CC BY. Adapted and filtered; values
are estimates. Dataset: https://epoch.ai/data/ai-data-centers . Snapshot hashes, input
URLs and selection recipe are preserved in `data/profiles/`. Normalized observations
retain source dates, capacity bases, ownership/user confidence and calculation links.
Only the reviewed seven-lab-related selection is published, not the unfiltered CSVs.
Model training-compute estimates are separately attributed to Epoch with method and
scope limitations; they are not company disclosures unless explicitly labeled so.
