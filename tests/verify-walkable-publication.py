"""Check the admitted public footprint locally, in Pages output, and on the live site."""
import argparse, fnmatch, hashlib, json, pathlib, tarfile, urllib.request, urllib.error
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, unquote

root = pathlib.Path(__file__).resolve().parents[1]
args = argparse.ArgumentParser()
args.add_argument('--artifact')
args.add_argument('--base', help='Site root, including /lab/')
args = args.parse_args()
allow = json.loads((root / 'tests/walkable-publication-allowlist.json').read_text())
patterns = [json.loads(s[4:]) for s in (root / '_config.yml').read_text().splitlines() if s.startswith('  - "')]
def excluded(name):
    parts = name.split('/')
    return any(fnmatch.fnmatchcase('/'.join(parts[:i]), pattern) for i in range(1, len(parts)+1) for pattern in patterns)
actual = {p.relative_to(root).as_posix() for p in (root / 'walkable-3d').rglob('*') if p.is_file() and not excluded(p.relative_to(root).as_posix())}
def published_bytes(name):
    data = (root/name).read_bytes()
    # Git normalizes host-authored text. Entrant trees are explicitly -text.
    return data if name.startswith('walkable-3d/entries/') else data.replace(b'\r\n',b'\n')
assert actual == set(allow['sourceFiles']), {'unexpected': sorted(actual-set(allow['sourceFiles'])), 'missing': sorted(set(allow['sourceFiles'])-actual)}
blocked = [p.relative_to(root).as_posix() for p in (root / 'walkable-3d').rglob('*') if p.is_file() and excluded(p.relative_to(root).as_posix())]
blocked += ['scripts/serve-walkable.cjs','tests/verify-walkable.cjs','tests/verify-walkable-room.cjs','tests/verify-walkable-integrity.py','tests/verify-walkable-publication.py','tests/walkable-publication-allowlist.json','docs/WALKABLE-INTEGRATION.md','docs/WALKABLE-INTEGRATION.html']
blocked += ['tests/verify-walkable-prompts.cjs','tests/verify-walkable-skip.cjs']
for entry_id in ['after-rain-luna','raincourt-astra','lantern-court-sol']:
    blocked += [f'walkable-3d/entries/{entry_id}/original.zip', f'walkable-3d/entries/{entry_id}/evidence/host-preview.png']
assert all(excluded(p) for p in blocked if not p.endswith('/WALKABLE-INTEGRATION.html'))
assert not excluded('scripts/build-catalog.cjs') and not excluded('tests/verify-static.py')
class Links(HTMLParser):
    links = []
    def handle_starttag(self, tag, attrs):
        self.links += [value for key, value in attrs if key in ('href','src') and value]
parser = Links(); parser.feed((root/'walkable-3d/index.html').read_text(encoding='utf-8'))
links = parser.links + ['entries.json','prompt-01.txt']
entries = json.loads((root/'walkable-3d/entries.json').read_text(encoding='utf-8'))['entries']
for entry in entries:
    prefix = 'entries/' + entry['id'] + '/'
    links += [prefix + p for p in ['preview.jpg','provenance.json','frozen/index.html.txt'] + [d['path'] for d in entry['documents']]]
    provenance = json.loads((root/'walkable-3d'/prefix/'provenance.json').read_text())
    assert set(provenance['publication']['publishedFiles']) | set(provenance['publication']['retainedOutsidePages']) == set(provenance['files'])
    assert all(excluded('walkable-3d/'+prefix+p) for p in provenance['publication']['retainedOutsidePages'])
for link in links:
    url = urlsplit(urljoin('https://example.test/walkable-3d/', link))
    if url.netloc != 'example.test': continue
    name = unquote(url.path).lstrip('/')
    if name.endswith('/'): name += 'index.html'
    assert not excluded(name), 'Link targets excluded file: '+name
    assert (root/name).is_file(), 'Missing link: '+name
print(f'PASS: {len(actual)} admitted source files; public links resolve; original archives/evidence and scoped helpers excluded.')
if args.artifact:
    with tarfile.open(args.artifact) as archive:
        members = {m.name.removeprefix('./'): m for m in archive if m.isfile()}
        published = {p for p in members if p.startswith('walkable-3d/')}
        assert published == actual | set(allow['generatedFiles']), {'unexpected': sorted(published-actual-set(allow['generatedFiles'])), 'missing': sorted((actual|set(allow['generatedFiles']))-published)}
        assert not any(excluded(p) or p in blocked for p in members), [p for p in members if excluded(p) or p in blocked]
        for name in actual:
            assert archive.extractfile(members[name]).read() == published_bytes(name), name
        result = {'siteBytes':sum(m.size for m in members.values()),'siteFiles':len(members),'walkableBytes':sum(members[p].size for p in published),'walkableFiles':len(published)}
        print('PASS: exact Pages allowlist and source bytes. '+json.dumps(result))
if args.base:
    for name in sorted(actual):
        with urllib.request.urlopen(urljoin(args.base, name), timeout=30) as response:
            assert response.read() == published_bytes(name), name
    for name in blocked:
        try:
            urllib.request.urlopen(urljoin(args.base, name), timeout=30)
        except urllib.error.HTTPError as error:
            assert error.code == 404, (name,error.code)
        else: raise AssertionError('Excluded file still live: '+name)
    print(f'PASS: {len(actual)} live files match local bytes; {len(blocked)} excluded paths return 404.')
