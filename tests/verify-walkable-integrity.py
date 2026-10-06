"""Check exact archived runtime/evidence bytes; never regenerate an entrant."""
import hashlib, json, pathlib, zipfile
root = pathlib.Path(__file__).resolve().parents[1] / 'walkable-3d'
def digest(data): return hashlib.sha256(data).hexdigest()
count = 0
for entry in json.loads((root / 'entries.json').read_text(encoding='utf-8'))['entries']:
    folder = root / 'entries' / entry['id']
    provenance = json.loads((folder / 'provenance.json').read_text(encoding='utf-8'))
    assert digest((folder / 'original.zip').read_bytes()) == entry['archiveSha256'] == provenance['archiveSha256']
    assert digest((folder / 'frozen/index.html.txt').read_bytes()) == entry['htmlSha256']
    for name, expected in provenance['files'].items():
        data = (folder / name).read_bytes()
        assert digest(data) == expected['sha256'], name
        assert len(data) == expected['bytes'], name
        count += 1
    source = provenance['source']
    with zipfile.ZipFile(folder / 'original.zip') as archive:
        for file in (folder / 'frozen').rglob('*'):
            if not file.is_file(): continue
            name = file.relative_to(folder / 'frozen').as_posix()
            if name == 'index.html.txt': name = 'index.html'
            member = source['memberRoot'] + source['runtimeRoot'] + name
            if source.get('runtimeMapping'): member = source['runtimeMapping'][file.relative_to(folder).as_posix()]
            assert file.read_bytes() == archive.read(member), member
        for file in (folder / 'evidence').glob('*.json'):
            if source.get('runtimeMapping'): continue  # Host evidence, not a producer ZIP member.
            prefix = 'evidence/' if entry['id'] == 'alder-halt' else 'artifacts/'
            assert file.read_bytes() == archive.read(source['memberRoot'] + prefix + file.name), file.name
    assert (folder / 'preview.jpg').stat().st_size < 180000
print(f'PASS: {count} recorded files; archive, runtime and producer evidence bytes unchanged; preview budgets met.')
