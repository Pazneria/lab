// Local Pages-shaped preview. CORS matches GitHub Pages for opaque-origin modules.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const root = path.resolve(__dirname, '..');
// Read the JSON-quoted YAML exclusion list used by the actual Pages build.
const excluded = fs.readFileSync(path.join(root, '_config.yml'), 'utf8').split(/\r?\n/).filter(line => /^  - "/.test(line)).map(line => {
  const pattern = JSON.parse(line.slice(4)).replace(/[.+?^${}()|[\]\\]/g, '\\$&').replaceAll('*', '[^/]*');
  return new RegExp('^' + pattern + '(?:/|$)');
});
const types = { '.html':'text/html; charset=utf-8', '.txt':'text/plain; charset=utf-8', '.md':'text/plain; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.zip':'application/zip' };
const server = http.createServer((req,res) => {
  try {
    let rel = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/lab\//, '/');
    if (rel.endsWith('/')) rel += 'index.html';
    if (excluded.some(pattern => pattern.test(rel.slice(1)))) throw Error();
    const file = path.resolve(root, '.' + rel);
    if (!file.startsWith(root + path.sep) || rel.split('/').some(s => s.startsWith('.')) || !fs.statSync(file).isFile()) throw Error();
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Access-Control-Allow-Origin':'*', 'Cache-Control':'no-cache', 'X-Content-Type-Options':'nosniff' });
    res.end(fs.readFileSync(file));
  } catch { res.writeHead(404); res.end('Not found'); }
});
if (require.main === module) server.listen(Number(process.env.PORT || 5191),'127.0.0.1',() => console.log(`Lab preview: http://127.0.0.1:${server.address().port}/lab/walkable-3d/`));
module.exports = server;
