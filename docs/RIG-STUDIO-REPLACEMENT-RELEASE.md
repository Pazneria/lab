# Owner-approved rig studio replacement

The owner explicitly approved replacing the old studio at the existing public route after being informed of the unresolved cold-start validation failure. The approved scope is the replacement, its route integration and deployment; it does not authorize new art revisions or animation approvals.

Promotion branch: `publish-rebuilt-rig-studio`. Main was read before promotion and remained `cc4e8ada47cdd6ae34ca6697596bdb0bf63bde8d`, the candidate's baseline. No intervening Lab/benchmark work was overwritten. The new core runtime is the independently reviewed `c9bc6ca` plus default-route labeling and return-path integration. The experimental candidate history remains on `rebuild-minimal-rig-studio`.

## Routes and preservation

- `/lab/animation-studio/`: new minimal rig studio; same-relative-directory styles, modules, workers and lazy GLBs.
- `/lab/animation-studio/legacy.html`: exact previous published studio, SHA256 `ce8b83d64a1eb2fe6227f6cbc62bd38e0b55027291193afea1a98fc2504c759c`. The new page labels it as the legacy interface and prior Human01 study access. It is not loaded by the new core.
- `/lab/animation-studio/rebuild.html`: retained alias to the same new entry, preserving earlier candidate links.

All original GLB bytes, authoring/study data, source/history, owner edits and approval records are preserved. The old generated page is moved, not discarded. Existing build scripts now target that legacy derivative so they cannot accidentally replace the new entry with the old bundle. The new entry's local module/worker policy is activated as part of this explicitly approved promotion; the legacy CSP remains byte-identical. No browser security overrides are used.

The Lab's existing skeleton E/click station and accessible links already point at the default route and remain unchanged. The shared return helper additionally recognizes the explicit same-origin legacy/alias paths when consuming a validated departure receipt. Position, camera and layout validation remain enforced. Ordinary Back from a Lab entry uses browser history; a legacy return can consume the same valid departure receipt.

## Validation and limitations

Focused CPU checks verify all 34 inventory hashes/policies, legacy authoring payloads, graphics cancellation/watchdogs/recovery and default/legacy return contracts. The bounded hosted promotion review verifies direct default URL, actual 3D Lab native E and mouse entry from explicit QA station-position/camera fixtures, Back/browser Back and departure-position restoration, legacy return via native reentry, and phone layout/controls. No owner local UI or local GPU is used.

This is **not a claim that the full cold-start aggregate passed**. The earlier aggregate at `3f2847d` remains failed on 898.1 ms heartbeat drift against the unchanged 250 ms limit. The exact cause remains unresolved. One authorized subsequent diagnostic found a no-application-graphics renderer GPU-channel wait of 420 ms aligned with a 442 ms document gap, while worker/Node clocks remained responsive. The candidate diagnostic did not reproduce the earlier failure. See [review history, clocks and traces](MINIMAL-RIG-STUDIO-CANDIDATE.md). Owner-browser success is unverified.

The replacement provides rotation-only local posing and correctly labeled delivered diagnostics. Legacy Human01 study/authoring features remain at the preserved route; no finished animation, gait certification, proposal acceptance or new art integration is claimed. Unsaved per-tab inspection state is not promoted into new canonical source.

## Rollback

Pre-replacement main: `cc4e8ada47cdd6ae34ca6697596bdb0bf63bde8d`. Immediate old-interface access remains `legacy.html`. A route-only rollback can restore `animation-studio/index.html` from that pre-replacement commit (or the exact legacy copy) and retain all new code/evidence for review. A full rollback must preserve later unrelated changes; use an explicit scoped revert of the promotion, never reset shared main or discard owner history.

## Exact release identity

[PR #77](https://github.com/Pazneria/lab/pull/77) merged at 2026-10-12 23:28:11 UTC as `dc695b517ffc6b3003980db8ef2fc898390b627f`. The exact promotion head `1b91a88f0f68c2cc64257aca011882eda44ada0a` passed 58 CPU checks and 6 scoped browser checks in [run 38321849199](https://github.com/Pazneria/lab/actions/runs/38321849199); [raw results](studio-promotion-1b91a88.json) are retained.

The green integration run explicitly used `fixturePreparation:true` and `teleports:true` to prepare station position and aim, then native E/click to launch the real default route and strict saved-departure comparisons on Back. It does **not** establish native walking or pointer-lock aiming. An earlier bounded run exercised native walking/E/return successfully before its total budget expired, but it was not a passing aggregate and is not substituted for the green fixture run. No new runtime change occurred during the harness corrections.

Initial harness failures included an over-specific Lab query matcher and a pre-key position sample affected by normal residual movement; the final matcher accepts the existing restored prompt query and compares the exact departure receipt without weakening the 1e-6 pose tolerance. The preserved historical 898.1 ms cold aggregate remains failed and unresolved.

The release documentation update changes no tested runtime files. Successful Pages deployment and live response verification are recorded in the completed task's release receipt and PR history after deployment.
