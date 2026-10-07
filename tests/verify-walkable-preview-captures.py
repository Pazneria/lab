"""CPU-only validation of actual JPEG sizes and captured-preview provenance."""
import hashlib,json,pathlib,struct
root=pathlib.Path(__file__).resolve().parents[1]/'walkable-3d'
def dimensions(data):
    assert data[:2]==b'\xff\xd8'
    i=2
    while i<len(data):
        assert data[i]==255
        while data[i]==255:i+=1
        marker=data[i];i+=1
        if marker in (0xD8,0xD9) or 0xD0<=marker<=0xD7:continue
        size=struct.unpack('>H',data[i:i+2])[0]
        if marker in (0xC0,0xC1,0xC2):
            height,width=struct.unpack('>HH',data[i+3:i+7]);return width,height
        i+=size
    raise AssertionError('Missing JPEG frame')
catalog=json.loads((root/'entries.json').read_text(encoding='utf-8'))
captured=0;total=0;pending=0;previews=0
for entry in catalog['entries']:
    folder=root/'entries'/entry['id']
    if entry.get('availability')=='failed':
        assert entry.get('preview') is None and not (folder/'preview.jpg').exists()
        continue
    if entry.get('previewAvailable') is False:
        assert entry.get('preview') is None and not (folder/'preview.jpg').exists()
        assert entry.get('availability')=='unverified' and entry.get('runtimeVerification')
        pending+=1
        continue
    assert (folder/'preview.jpg').is_file(),entry['id']
    previews+=1
    record_path=folder/'preview-capture.json'
    if not record_path.exists():continue
    record=json.loads(record_path.read_text(encoding='utf-8'));data=(folder/'preview.jpg').read_bytes()
    assert dimensions(data)==(960,600) and len(data)<180000
    if 'entry' in record:
        assert record['entry']==entry['id'] and record['frozenHtmlSha256']==entry['htmlSha256']
        assert record['output']['sha256']==hashlib.sha256(data).hexdigest() and record['output']['bytes']==len(data)
        assert record['sourceUnchanged'] and record['hostReadinessObserved'] and record['viewerUnloadedAfterCapture'] and record['captureContextClosed']
        assert record['completionStatusPreserved']==entry.get('completionStatus')
        assert record.get('availabilityAfterCapture',record.get('availabilityPreserved'))==entry.get('availability')
        if record['runtimeErrorsObserved']:
            assert entry['id']=='vesper-vale-luna' and record['runtimeFatalErrorsObserved'] is False
            errors=record['documentedNonfatalGeometryErrors'];assert len(errors)==4
            assert all('computeBoundingSphere' in error and 'NaN' in error for error in errors)
    else:
        # Preserve the later baseline wrapper schema; inspect its actual capture row.
        row=record['capture'];assert row['id']==entry['id'] and row['status']=='captured'
        assert row['frozenHtmlSha256']==entry['htmlSha256']
        assert row['sha256']==hashlib.sha256(data).hexdigest() and row['bytes']==len(data)
        assert row['readyObserved'] and row['viewerUnloaded'] and row['contextClosed']
        assert not row['pageErrors'] and not row['consoleErrors'] and not row['nonReadRequests']
        assert record['performanceBenchmark'] is False and record['interactiveRouteQa'] is False
    assert hashlib.sha256((folder/'frozen/index.html.txt').read_bytes()).hexdigest()==entry['htmlSha256']
    if 'entry' in record:assert any(d['path']=='preview-capture.json' for d in entry['documents'])
    captured+=1;total+=len(data)
assert captured==59 and previews==76 and pending==2
print(f'PASS: {captured} capture records and genuine JPEG dimensions/hashes; {total:,} bytes total; {pending} explicitly disclosed pending previews. Failed entries retain their failure state.')
