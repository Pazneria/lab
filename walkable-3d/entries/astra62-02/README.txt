AMENIWA
Rain Court Night Market

Launch

From PowerShell, run the following command. Python 3 and a current WebGL 2 browser with hardware acceleration are required.

python -m http.server 48262 --bind 127.0.0.1 --directory "C:\Users\jmore\Documents\Codex\2026-10-26\task\batch-20261117-gpt62\entrants\astra\scene-02"

Suggested launch address
http://127.0.0.1:48262/

Click Enter market. Stop the local server with Ctrl+C in its terminal. The shipped build needs no installation, build step or internet connection. Its five runtime files are index.html, main.js, renderer.js, courtyard.mesh and market-atlas.png. Serve them from the same folder.

Controls

W A S D          Walk forward, left, backward and right
Mouse            Look around after clicking Enter market
Click and drag   Look around with the mouse released
Arrow keys       Up and down walk, left and right turn
Shift            Walk briskly
R or Reset       Return to the courtyard entrance
H or Controls    Show or hide the controls
Esc              Release the mouse
Touch            Drag the scene to look and use the lower-left thumbstick to walk

Explore

The charcoal grill and fruit stand flank the entrance. The blue fish stall and ceramics stall stand farther inside. All four counters have a covered customer side. The tea-room sign on the north wall marks the covered passage. There is room to turn at the tea counter and walk back through the passage.

Build and inspection record

The local texture atlas contains the materials, painted signs, labels and paper lantern artwork. The packed mesh includes static geometry, lighting, collision footprints and the ground wetness field. Reflections use a reduced-resolution, rough planar capture. The surrounding buildings are facades. Ground outside the courtyard, entrance and tea passage is outside the walking area.

The offline geometry compiler is build.cjs. The original material-painting source is in materials.js and artwork.js. The optional art compiler build-art.cjs uses @napi-rs/canvas 0.1.100. Neither compiler runs when the market is launched.

Run node verify.cjs for the dependency-free static artifact and floor-plan checks. The build session also used @shaderfrog/glsl-parser 6.1.0 for offline GLSL grammar checks. The supplied run.json records timing, checks and file hashes.

This entry was prepared without opening a browser or starting a server. Visual inspection, interactive movement checks, GPU shader compilation and frame-time measurement are pending.