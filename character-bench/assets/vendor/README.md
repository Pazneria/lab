# Loader provenance

GLTFLoader.js and BufferGeometryUtils.js are vendored from Three.js tag r180.
Upstream: https://github.com/mrdoob/three.js/tree/r180/examples/jsm
MIT license: THREE-LICENSE.txt.

Only import specifiers are adapted: both modules import the existing local
lab-space/assets/vendor/three.module.min.js, and GLTFLoader resolves the adjacent
BufferGeometryUtils.js. No CDN or runtime dependency install is used.
