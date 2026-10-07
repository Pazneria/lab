MORROW & MOSS — completed standalone 3D scene

Extract this archive into a new folder. Open PowerShell in that folder and run:

    node .\launch.mjs

Then open http://127.0.0.1:5187/ in a desktop browser with WebGL enabled.
This is a suggested launch address; no server is running from the build session.
The launcher uses Node's built-in modules and needs no package installation.
Node.js 24.14.0 was available in the build environment. Ctrl+C stops the launcher.

Click Explore. WASD / arrows walk, mouse looks, Shift moves briskly,
Esc pauses/releases the mouse, and R returns to camp. The pause screen also
has a Return to camp button. Use the ordinary steps to enter the wagon.

The scene, controls and server were not tested in a browser. CPU syntax,
geometry and collision-route checks and the production build passed.
GPU, visual and frame-time inspection were deliberately deferred by the run's
execution conditions. Furniture and mechanisms are static. Small decorative
objects have no individual collision. Keyboard/mouse desktop input is required.

Source, full README, CHECKS.txt and the exact timing record RUN.json remain
in the original morrow-moss-wagon workspace alongside this archive.
