# Lab research room — local prototype

An isolated, walkable 16 × 14 metre research workshop with one functional public
benchmark station and a home exit. The room provides orientation, not a second
catalog: search, evidence, data, charts, and results remain in the existing 2D
catalog at <https://pazneria.github.io/lab/>. No future project stations exist.

The original Codex prototype is preserved at `429c724225d13edcedb597826b426cc726b9a25a`
in the separate `lab-space-checkout`, branch `codex/lab-space-prototype`. Its base
is public `main` at `9e8eb47b580d2a2c8c673de52d8f1f247304e957`.

This variation is in a second checkout on `codex/lab-space-opus-variation`.
Actual Claude Code `claude-opus-5-5` wrote the room renderer: a roof-lit benchmark
hall, a glazed apparatus bay, and a lower oak study alcove. Codex aligned
collisions, orientation, the flat plan and documentation, and performed the
short checks. See `OPUS-ITERATION.md` for provenance and exact variation files.
Nothing was pushed, published, or linked from the root page. No existing
catalog, data, charts, Arcade source, private data or other running apps changed.

## Local preview

From this checkout:

```powershell
python -m http.server 5198 --bind 127.0.0.1 --directory lab-space
```

Open <http://127.0.0.1:5198/>. The preserved before preview uses port 5197.
JavaScript modules need HTTP; opening `index.html`
directly from disk still supplies the native flat room and real tool links.
The prototype also works at a repository subpath such as `/lab/lab-space/`.

WASD walks; up/down arrows walk; left/right arrows turn. Drag the room to look.
Enter (or E) opens a nearby station. Escape leaves canvas focus. Tab reaches
ordinary links and buttons. The monitor is clickable; the six direction buttons
support holds and small taps. On phones the pad sits over the visible room.
The bench shortcut and always-visible native catalog/home links bypass walking.

Reduced motion starts in the flat view with gentle movement selected. 3D is
opt-in in that mode. Movement stays level, without bobbing, animation, inertia,
or fly-throughs. All camera jumps are immediate. A missing module, unavailable
WebGL2, or context loss leaves the flat plan and normal links usable. JS off
also preserves those links. There is no pointer lock, keyboard trap, or sound.

## Ownership — exact integration file list

Only these files are owned by this branch:

```text
lab-space/README.md
lab-space/DESIGN.md
lab-space/OPUS-ITERATION.md
lab-space/index.html
lab-space/assets/navigation.mjs
lab-space/assets/room-mark.svg
lab-space/assets/room-plan.svg
lab-space/assets/room.mjs
lab-space/assets/space.css
lab-space/assets/space.js
lab-space/assets/vendor/THREE-LICENSE.txt
lab-space/assets/vendor/three.core.min.js
lab-space/assets/vendor/three.module.min.js
lab-space/tests/verify-space.cjs
```

Screenshots and `validation.json` are task-owned review evidence in ignored
`evidence/lab-space/`, outside the integration patch. Historical reference photos
were inspected in task scratch storage and are not website assets.

## Dependency and security boundary

The only runtime dependency is vendored Three.js **0.180.0**, MIT, from the public
npm `three` package. Only its two renderer modules and license are included:
720,032 bytes of JavaScript. No package install or CDN is needed by the website.
Upstream: <https://github.com/mrdoob/three.js/tree/r180>.
The original package tarball SHA-512 is:

```text
a3eab2700319ae1f93b04d351aa594c5420a47500bd12f29abbcc3918390c3c1aa7d7f1bf15a022985281db8625f98feee1afc5ecb870d553afa09102502a0f7
```

No model downloads, analytics, remote textures, user input ingestion, fetches,
storage, paid APIs, untrusted HTML, service workers, permissions, or accounts.
Only exact catalog/home destinations can be opened by station logic, checked
for HTTPS and the public hostname. All other outbound links are fixed verified
design-source references. No arbitrary URLs, interpolation into HTML, or scripts
from query strings. Apparatus and foliage are original local geometry; the room
plan and window texture are original procedural graphics.

Pixel ratio is capped at 1.25; a 1024px shadow map is rendered once. The scene
renders on input/resize, stops at rest, and pauses when the tab is hidden. This
is a bounded design slice, not an optimized production engine.

## Short validation

```powershell
$env:LAB_PLAYWRIGHT_MODULE = '<existing Playwright module path>'
$env:LAB_AXE_SCRIPT = '<existing axe-core/axe.min.js path>'
node lab-space/tests/verify-space.cjs
```

Uses one separate headless Edge with software WebGL and sequential contexts.
Checks safe destinations; room and furniture collisions; `/lab/` subpath;
keyboard movement and drag look; monitor clicking; nearby bench and physical
exit; the new bay and study portal; modal focus; mobile taps and reflow; the pad beside the visible room;
reduced motion; flat switching; WebGL loss/unavailability; JS off; external
asset requests; automated desktop/mobile WCAG A/AA checks. The output is
`evidence/lab-space/validation.json`. No catalog/root test scripts are run.

Limits: simulated touch and software WebGL, not a real phone, GPU performance
soak, screen-reader user test, or comprehensive browser matrix. External
destinations were checked read-only: catalog and home both returned HTTP 200.
Only apps and contexts created by the smoke script are closed. There is no
desktop control or game interference. Claude Pro and usage credits OFF were
verified before the actual Opus request and again before the successful retry.
Trust was approved only for the exact isolated `lab-space` project folder; the
specific renderer Write was approved separately. No global permission, account,
model fallback or billing settings were changed. The website uses no account.

## Proposed integration

1. Review the room screenshots and local feel; agree on the material palette.
2. Coordinate with the results/graphs owner. Import only the 14 listed files,
   using the complete folder archive or a folder-only patch. A commit-based
   import needs the original prototype commit and then the variation commit;
   the variation alone assumes the original files exist. The catalog remains independently
   owned; its newest results and graphs are reached through the existing link.
3. If later authorized, publish the isolated `/lab-space/` route first. Treat
   merging to `main` as publication because this repo deploys Pages from `main`.
4. Add an optional room link in a separate owner-approved integration task.
   A root route switch, chart placement, new stations, or homepage edit needs a
   separately scoped decision. Keep the 2D catalog and exit available throughout.
