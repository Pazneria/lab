// CPU-only return-route regression. No browser, renderer, entrant or public write.
import test from 'node:test';
import assert from 'node:assert/strict';
import {screenFixture} from './verify-walkable-lab-fixture.mjs';

const copy = value => JSON.parse(JSON.stringify(value));
const open = (fixture, slot) => fixture.byId('screen-cards').children[slot].children[0].listeners.click();

for (const route of ['', 'index.html']) {
  test(`Lab ${route || 'directory'} return receipts unlock only the same viewed comparison`, async () => {
    const f = await screenFixture({href: 'https://example.test/lab/lab-space/' + route + '?prompt=01'});
    const original = copy(f.history.state.labComparison);
    assert.ok(f.choices.every(button => button.disabled));
    open(f, 0);
    const first = await f.sceneVisit({ready: true});
    assert.ok(first.visit, 'The host must recognize its own Lab return route');
    await f.ready();
    assert.deepEqual(copy(f.history.state.labComparison.opened), ['a']);
    assert.ok(f.choices.every(button => button.disabled));
    open(f, 1);
    await f.ready();
    assert.equal(f.history.state.labComparison.comparisonId, original.comparisonId);
    assert.deepEqual(copy(f.history.state.labPairOrder), original.pair);
    assert.deepEqual(copy(f.history.state.labComparison.opened), ['a', 'b']);
    assert.ok(f.choices.every(button => !button.disabled));
    assert.equal(JSON.parse(f.storage.get('lab.walkable3d.judgments.v1')).preferences['a::b'], undefined);
  });
}

test('index.html fallback return preserves exact comparison and first ready receipt', async () => {
  const f = await screenFixture({href: 'https://example.test/lab/lab-space/index.html?prompt=01'});
  const original = copy(f.history.state.labComparison);
  open(f, 0);
  const {nav, visit} = await f.sceneVisit({ready: true});
  assert.ok(visit);
  const restored = await screenFixture({href: nav.returnUrl(visit), session: f.session, storage: f.storage});
  assert.equal(restored.history.state.labComparison.comparisonId, original.comparisonId);
  assert.deepEqual(copy(restored.history.state.labPairOrder), original.pair);
  assert.deepEqual(copy(restored.history.state.labComparison.opened), ['a']);
  assert.ok(restored.choices.every(button => button.disabled));
  assert.equal(new URL(restored.location.href).pathname, '/lab/lab-space/index.html');
});

test('return-route aliases still reject unrelated paths and other origins', async () => {
  for (const href of [
    'https://example.test/lab/lab-space/elsewhere.html',
    'https://example.test/lab/elsewhere/index.html',
    'https://other.test/lab/lab-space/index.html'
  ]) {
    const f = await screenFixture({href});
    open(f, 0);
    assert.equal((await f.sceneVisit({ready: true})).visit, null);
    await f.returnVisit();
    assert.deepEqual(copy(f.history.state.labComparison.opened), []);
    assert.ok(f.choices.every(button => button.disabled));
  }
});
