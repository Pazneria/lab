# Basemap attribution

The bundled basemap is made with Natural Earth, 1:110m land outlines.

- Source: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson
- Terms: https://www.naturalearthdata.com/about/terms-of-use/
- Retrieved: 2026-10-05
- Original file SHA-256: `9e0729ee253ca7d7a5c4ae9395fb1902264c5377c52e224d13dd85010e2835d9`
- Original geometry: `../data/natural-earth-land.geojson`
- Reproducible SVG generator: `../scripts/build-map.cjs`

Natural Earth's vector and raster data are public domain. The visible map links
to the terms page. The projection is equirectangular, from 85° north to 60° south;
regional views crop that same geometry. The map displays land outlines without
political boundaries. No external map tiles, network geocoder, fonts, trackers,
API keys or paid mapping service are loaded.

Site markers use the supplied rounded city or regional positions. Nearby sites
are grouped into clickable clusters anchored to a member's locality; the map
does not offset separate facilities to invented coordinates. Cluster positions
are representative, and exact facilities remain accessible in the directory.
