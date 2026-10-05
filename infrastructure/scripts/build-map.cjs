const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const land = JSON.parse(
  fs.readFileSync(path.join(root, "data/natural-earth-land.geojson"), "utf8"),
);
const point = ([lon, lat]) =>
  `${(((lon + 180) / 360) * 1000).toFixed(2)},${(((85 - lat) / 145) * 500).toFixed(2)}`;
const paths = land.features
  .flatMap((f) =>
    f.geometry.type === "Polygon"
      ? [f.geometry.coordinates]
      : f.geometry.coordinates,
  )
  .map((polygon) =>
    polygon.map((ring) => "M" + ring.map(point).join("L") + "Z").join(""),
  )
  .map((d) => `<path d="${d}"/>`)
  .join("");
fs.writeFileSync(
  path.join(root, "assets/world.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" preserveAspectRatio="none"><title>World land outlines</title><desc>Natural Earth 1:110m public domain land. Equirectangular projection, 85 degrees north to 60 degrees south.</desc><g fill="#3d5750" stroke="#587266" stroke-width=".5">${paths}</g></svg>\n`,
);
console.log("Built bundled Natural Earth basemap.");
