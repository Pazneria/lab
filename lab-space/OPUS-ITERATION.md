# Opus architectural variation - local review

The original prototype was made by Codex. No Claude or Opus contributed to it.
It remains unchanged in `lab-space-checkout` at commit
`429c724225d13edcedb597826b426cc726b9a25a`, branch `codex/lab-space-prototype`.
This second checkout uses `codex/lab-space-opus-variation`; nothing is published.

## Actual model and bounded approval

Claude Code 2.1.286 used the existing first-party Claude Pro account. The exact
assistant model `claude-opus-5-5` is recorded on the successful Write response
at 2026-10-01T01:05:14.646Z. The interactive usage menu reported usage credits
OFF before the design prompt and again before that retry. Its dollar usage
counter is not evidence of enabled paid credits. No billing or account setting
was changed and no model fallback was enabled.

Only this folder trust was accepted, after explicit approval:
`C:/Users/jmore/Documents/Codex/2026-09-30/task-17/lab-space-opus-checkout/lab-space`.
File tools were restricted to this folder. No shell, MCP, remote asset retrieval
or delegation was offered to Opus. The initial print-mode renderer Write was
denied because its edit prompt was unanswered. Work paused and the proposed
code was preserved. The user then approved that exact file Write. The same
Opus session successfully retried it interactively, without expanding global
permissions. The completed renderer is Opus's code; Codex did not replace its
aesthetic design. Long interrupted generations produced no source edits.

## Architectural changes

- A tall, roof-lit hall makes the benchmark bench the central destination.
- An oak-beamed west bay has a projecting glazed window, soapstone worktop and
  composed apparatus, with real depth to the exterior garden geometry.
- A low oak study has a rug, books, writing desk, recording-instrument study and
  static task lamp. It is entered through the open side of the hall.
- Limestone piers, ceiling steps and the lower entrance gallery frame varied
  views. A brass-edged floor strip leads to the bench. All walking is level.
- The benchmark monitor and home exit keep their real destinations. Decorative
  objects have no project URLs, fake metrics or promised tools. Charts remain 2D.

The verified institutional references and interpretation are in `DESIGN.md`.
They do not imply affiliation or replicate a historical building.

## Exact variation ownership

Changes relative to the preserved prototype are limited to:

```text
lab-space/assets/room.mjs                 Opus renderer
lab-space/assets/navigation.mjs           Codex collision alignment
lab-space/assets/space.js                 Codex area orientation
lab-space/assets/room-plan.svg            Codex matching flat plan
lab-space/index.html                      Codex map and plan description
lab-space/tests/verify-space.cjs           Codex bounded route checks
lab-space/README.md                       Codex handoff and scope
lab-space/DESIGN.md                       Codex design translation notes
lab-space/OPUS-ITERATION.md                Codex provenance record
```

The complete folder-only integration list is the 14 files in `README.md`.
The vendor dependency, CSS, safe URL validator and destination URLs are unchanged.
No files outside `lab-space/` belong in an integration patch. The existing root
catalog/results/graphs owner retains all of their files and work.

## Validation and limits

Codex performed the checks; Opus did not run browsers or claim test results.
The final run passed 17 named smoke checks, with zero automated WCAG A/AA
violations on desktop and mobile, zero page errors and zero external requests.
Use `evidence/lab-space/validation.json` for the completed smoke report and
the task's `opus-review/` for actual captured views. The route checks use real
keyboard input to reach the apparatus bay and study, alongside monitor/exit,
mobile touch, flat, reduced-motion, WebGL failure and JS-off checks.

These are short sequential headless Edge checks with software WebGL and
simulated touch. They do not establish real-phone performance, assistive
technology usability, a full browser matrix or a GPU soak. No catalog tests,
desktop game control, closing of user apps or public deployment is involved.

## Proposed integration

Review the before/after local previews first. Coordinate with the catalog owner
and import only the isolated folder if this direction is accepted. Use the
complete 14-file archive, or import both local commits in order; this variation
commit alone assumes the original prototype files already exist. Keep the
working catalog destination and flat/native links. Publication, a root-route
switch or an optional root link are separate integration decisions; merging
to public `main` would deploy Pages and has not been done.
