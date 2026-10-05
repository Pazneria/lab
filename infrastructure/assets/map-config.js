/* Optional provider configuration. No tiles load until the reader enables street detail.
 * Keep attribution in both index.html and scripts/build-entity-pages.cjs in sync if changed.
 * Public OSM policy: https://operations.osmfoundation.org/policies/tiles/ */
window.ATLAS_MAP_CONFIG = Object.freeze({
  streetTileUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  streetMaxZoom: 19,
});
