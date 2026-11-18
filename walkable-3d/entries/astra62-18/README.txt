SOUNDINGS
Captain L. Serrat’s private quarters aboard the survey vessel Nacre

Enter beside the fitted berth, pass the oak privacy screen and chart table, and continue to the observing couch and pressure window. The model cutter, Cala Serena prints and field journal belong to the same home port.

LAUNCH

Extract the complete archive into one folder. From that folder run

    python -m http.server 48118 --bind 127.0.0.1

Suggested local address

    http://127.0.0.1:48118/

The server can be stopped with Ctrl+C in its terminal. The scene uses WebGL 2 and local HTTP-served assets. A current desktop browser with graphics acceleration is required. All runtime assets and fonts are included.

CONTROLS

    Enter quarters / click the scene    Capture the mouse
    Mouse movement                      Look around
    Left-button drag                    Look with mouse capture unavailable
    W / S                               Walk forward / backward
    A / D                               Step left / right
    Arrow keys                          Turn and look up / down
    Shift + movement                    Walk faster
    R / Reset                           Return to the entrance
    H / Controls                        Show or close control help
    Esc                                 Release mouse capture

On a touch screen, drag the view and use the on-screen directional buttons.

BUILD

The scene uses a custom WebGL 2 renderer, original indexed meshes, woven and brushed surface textures, and baked stationary light and ambient occlusion. The window looks onto a direction-stable star field and a shaded ringed planet. Inspection movement stays at a standing eye height of 1.62 m. Furnishings, the closed entry hatch and the work displays are static.

The portable archive contains the ready-to-run scene. Its original authoring sources are also present in the benchmark workspace. The generator scripts are unnecessary for launching the finished build.

CHECKS

All 13 JavaScript modules passed Node syntax checks. Khronos glslang 11.7.0 validated and linked the interior, sky and glass shader pairs offline. Checks covered packed vertex and index bounds, surface normals, PNG data integrity, local file references and font assets.

A CPU collision-math check followed 18 inspection and return waypoints across 644 steps, with clearance from all 16 furniture and bulkhead footprints. Separate geometry queries checked the entrance-to-window sightline and the deck, ceiling and side hull. Visual inspection, browser interaction and frame-time measurement are reserved for the separate judging session.

TYPE

Barlow, Baskervville and IBM Plex Mono are bundled from Fontsource. Their licenses accompany the font files in type/.
