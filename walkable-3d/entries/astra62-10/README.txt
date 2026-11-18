ALDERWICK HILL LIBRARY
SceneBench 2026-11-17 · Scene 10

LAUNCH

In the extracted build folder, run

    python -m http.server 48910 --bind 127.0.0.1

Suggested launch address
    http://127.0.0.1:48910/

Open the address in a WebGL 2 capable browser and select Enter library. Python 3 is sufficient to serve the build. The Three.js 0.180.0 runtime, scene package and surface maps are included. Stop the local server with Ctrl+C after your visit.

CONTROLS

W A S D        Walk forward, left, backward and right
Mouse          Look around
Arrow keys     Up/down to walk, left/right to turn
Shift          Hold while moving to walk faster
Esc            Release the mouse
R              Return to the entrance
?              Show controls
H              Hide or show the interface

If mouse capture is unavailable, hold the primary mouse button and drag the view. On a touchscreen, use the movement pad and drag the scene to look around.

THE ROOM

The entrance faces the tall northern windows. The lower west stacks form a browsing aisle beside a double-sided bookcase. Follow the west wall to the stone arch into the projecting reading alcove. The staircase rises toward the windows. Turn right at its top landing to follow the map gallery and look back over the table and shelving.

The library has 2,726 individually modeled books. Matching sets use numbered spines. Illustrated folios, marbled bindings, the local survey map, botanical plates, oil study, patterned textiles and material maps were made for this scene. The exterior valley is scenery. Walking is confined to the library.

BUILD AND CHECKS

The browser loads compressed static geometry with shared vertices and batches by space and material. The sun and its shadow map stay fixed during exploration. The source geometry builder is included for browsers without gzip stream decoding.

To repeat the CPU-only structural checks with Node.js, run

    node tools/check-scene.mjs
    node tools/check-package.mjs

To rebuild the geometry after editing the scene source, run

    node tools/bake-scene.mjs

Syntax checks passed for 21 JavaScript modules. Both structural checks passed. They cover module and asset references, packed mesh attributes and indices, 22 segments of the requested route, 11 additional window and east-stack approach segments, collision boundaries, gallery guards, headroom, all 21 treads and three sight lines. A geometric ray check found a direct sunlight path through a tall northern window to the floor.

The requested run conditions reserved browser launch, visual inspection, interactive testing and frame-time measurements for a separate session. Those checks remain pending. The interface requires JavaScript and WebGL 2.

Three.js licensing is included in vendor/THREE-LICENSE.txt.
