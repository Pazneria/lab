# Vesper & Vale: The Comet Mantle

A standalone first-person 3D walk-through of a compact royal tailor's atelier. The fitting room, fabric archive, and workshop share one connected floor plan. The centerpiece is an unfinished Astral Regent commission: a panelled brocade and velvet gown over a contrasting silk underskirt, with open sleeve ports, a visible lining, raw threads, a compass-star badge, and a long mantle train.

## Launch

From PowerShell in this folder, run:

```powershell
python -m http.server 4187 --bind 127.0.0.1
```

Then open the **suggested launch address** `http://127.0.0.1:4187/` in a browser. Stop the server with `Ctrl+C` when finished. This entry did not start a server; the address is only a launch suggestion.

The page fetches its pinned Three.js 0.180.0 browser module from jsDelivr, so an internet connection is needed when loading the scene. No package installation, account, API key, or external asset is used.

## Controls

- Click **Enter the atelier** to begin and capture the mouse.
- **W/A/S/D** or the arrow keys to walk; hold **Shift** to walk briskly.
- Move the mouse to look around. **Esc** releases the mouse and pauses; click the scene or Resume to continue.
- Press **R** to return to the entrance and reset the view.

The room labels in the upper-right corner follow the fitting room, archive, and workshop regions. Major furniture and the room dividers have conservative axis-aligned walking collisions.

## Checks and limitations

- `node --check main.js` passed. The HTML/CSS/module references were checked statically.
- No browser, server, screenshot renderer, interactive test, GPU test, or performance benchmark was run, as required for this entry. Visual appearance, mouse-look behavior, and frame times remain for the separate review session.
- The scene is static by design: cloth is modeled geometry, the mirror is a static silver panel, and there are no animated staff or tailoring interactions.
- The controls target desktop keyboard and mouse; touch movement is not implemented. Furniture collision boxes favor reliable walking and may leave a little extra space around some props.
