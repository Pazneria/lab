// Per-tab handoff between the Lab and its scene page. Never stores a vote or grade.
const key = 'lab.walkable3d.scene-visit.v1';
export function createSceneNavigation(base, {storage = () => sessionStorage} = {}) {
  const sceneUrl = new URL('scene.html', base), labUrl = new URL('../lab-space/', base);
  function read(token) {
    try {
      const visit = JSON.parse(storage().getItem(key));
      const back = new URL(visit?.returnUrl);
      if (!token || visit?.token !== token || back.origin !== labUrl.origin || ![labUrl.pathname, labUrl.pathname + 'index.html'].includes(back.pathname) ||
          !Array.isArray(visit.pair) || !visit.pair.includes(visit.entryId)) return null;
      return visit;
    } catch { return null; }
  }
  function launch(entry, snapshot) {
    const token = crypto.randomUUID(), url = new URL(sceneUrl);
    const visit = {...snapshot, token, entryId: entry.id, returnUrl: location.href, labState: history.state, ready: false, started: false};
    try { storage().setItem(key, JSON.stringify(visit)); } catch { /* Return still works; voting stays locked without a receipt. */ }
    history.replaceState({...history.state, labSceneVisit: token}, '');
    url.searchParams.set('entry', entry.id); url.searchParams.set('visit', token);
    location.assign(url.href);
  }
  function current() {
    const params = new URLSearchParams(location.search), visit = read(params.get('visit'));
    return visit?.entryId === params.get('entry') ? visit : null;
  }
  function start(visit) {
    if (!visit || visit.started) return false;
    visit.started = true;
    try { storage().setItem(key, JSON.stringify(visit)); return true; } catch { return false; }
  }
  function ready(visit) {
    if (!visit || current()?.token !== visit.token) return;
    visit.ready = true;
    try { storage().setItem(key, JSON.stringify(visit)); } catch { /* No readiness credit without a receipt. */ }
  }
  function restore() {
    const visit = read(new URLSearchParams(location.search).get('return') || history.state?.labSceneVisit);
    if (visit && !history.state?.labComparison && visit.labState) history.replaceState({...visit.labState, ...history.state}, '');
    return visit;
  }
  function receipt() {
    const visit = restore();
    if (visit) { try { storage().removeItem(key); } catch {} }
    return visit;
  }
  function returnUrl(visit) {
    const url = new URL(visit?.returnUrl || labUrl);
    if (visit) url.searchParams.set('return', visit.token);
    return url.href;
  }
  return {launch, current, start, ready, restore, receipt, returnUrl};
}
