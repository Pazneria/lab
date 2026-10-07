"""Check exact archived runtime/evidence bytes; never regenerate an entrant."""
import hashlib, json, pathlib, zipfile
root = pathlib.Path(__file__).resolve().parents[1] / 'walkable-3d'
def digest(data): return hashlib.sha256(data).hexdigest()
count = 0
for entry in json.loads((root / 'entries.json').read_text(encoding='utf-8'))['entries']:
    folder = root / 'entries' / entry['id']
    provenance = json.loads((folder / 'provenance.json').read_text(encoding='utf-8'))
    assert entry['archiveSha256'] == provenance['archiveSha256']
    archive_path = folder / 'original.zip'
    if archive_path.exists():
        assert digest(archive_path.read_bytes()) == entry['archiveSha256']
    else:
        # Later frozen imports record external retention in archiveKind rather
        # than the earlier archiveLocation/archiveRetention fields.
        retention = entry.get('archiveKind', '').lower()
        assert entry.get('archiveLocation') == 'retained-outside-repository' or ('retained' in retention and 'outside git and pages' in retention)
        assert (provenance.get('archiveRetention') or provenance.get('archiveSource')) and provenance['source'].get('runtimeMapping')
    assert digest((folder / 'frozen/index.html.txt').read_bytes()) == entry['htmlSha256']
    for name, expected in provenance['files'].items():
        data = (folder / name).read_bytes()
        assert digest(data) == expected['sha256'], name
        assert len(data) == expected['bytes'], name
        count += 1
    source = provenance['source']
    if not archive_path.exists():
        if entry.get('preview') is None and (entry.get('availability') == 'failed' or entry.get('previewAvailable') is False):
            assert not (folder / 'preview.jpg').exists()
        else:
            assert (folder / 'preview.jpg').stat().st_size < 180000
        continue  # Raw originals remain in producer/local queue; per-file hashes above still cover every hosted byte.
    with zipfile.ZipFile(archive_path) as archive:
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
print(f'PASS: {count} recorded files; all hosted hashes and preview budgets match. Retained Git archives also match; external originals are checked separately at import.')
