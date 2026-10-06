# Pinned local renderer dependencies

Three.js **0.180.0 / r180**, MIT. Required runtime modules only, with the [license](./three/LICENSE).

| File | Origin / adaptation |
| --- | --- |
| `three/build/three.core.js` | Existing `lab-space/assets/vendor/three.core.min.js` at repository base `0fd498f03891b8f0d5f511dcf524a7a79eaec8fe`, copied byte-for-byte. Minified r180 production module. |
| `three/build/three.module.js` | Existing `lab-space/assets/vendor/three.module.min.js` at that base. Its one `./three.core.min.js` import is changed to `./three.core.js`. |
| `three/addons/controls/OrbitControls.js` | Official https://raw.githubusercontent.com/mrdoob/three.js/r180/examples/jsm/controls/OrbitControls.js. Bare `from 'three'` rewritten to `from '../../build/three.module.js'`. |
| `three/addons/loaders/GLTFLoader.js` | Official https://raw.githubusercontent.com/mrdoob/three.js/r180/examples/jsm/loaders/GLTFLoader.js. Same import rewrite. |
| `three/addons/utils/BufferGeometryUtils.js` | Existing pinned r180 copy from `walkable-3d/entries/saffron-observatory-astra/frozen/vendor/three/examples/jsm/utils/BufferGeometryUtils.js` at the base. Same import rewrite. |
| `three/LICENSE` | Existing `lab-space/assets/vendor/THREE-LICENSE.txt`, copied byte-for-byte. |

The source locations outside this namespace were read only. No benchmark scene, submitted asset, image, ZIP, screenshot, node_modules directory or evidence file is copied. A small self-contained dependency copy avoids coupling the studio to edits in another product's runtime. The minified core/module pair replaces the initially considered 2 MB unminified pair; no unused pair is retained.

No CDN or import map is needed. The loader's scoped image adapter is implemented in `viewer.js`, not by altering upstream loading code. It overrides the pinned parser's `loadImageSource`, checks `loadTextureImage` null results, and tracks parser dependencies/geometries for cleanup. Re-review that adapter when upgrading Three.js. It must be verified on representative textured GLBs before publication.

SHA-256 of the final vendored bytes (including the documented import adaptations):

| File | SHA-256 |
| --- | --- |
| `three/build/three.core.js` | `4183cee05f0aa093682fdf551363a16bb20bd92b68e14f7576905f45c461ba82` |
| `three/build/three.module.js` | `d8dc2d4e3a727f293241453b01fc924c400d2eb053ed302aae994b747d6ea144` |
| `three/addons/controls/OrbitControls.js` | `0d23e963bc0f40d637a263aca53019aedf30801f20d1f161790d80a5fdf11a17` |
| `three/addons/loaders/GLTFLoader.js` | `f91a77ed62b826f141d1a7d7dd0a8b4d7b4a13b46ba25c34743c1cbc07de10c1` |
| `three/addons/utils/BufferGeometryUtils.js` | `35b488b28ccc3b222179d3f8377d907bc28f9ea0a97bd76e58d7ca966c53e3d8` |
