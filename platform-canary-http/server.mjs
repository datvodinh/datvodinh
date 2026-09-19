import { createServer } from 'node:http';
const version = 'v1';
createServer((request, response) => {
  if (request.url === '/health') {
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ status: 'ok', app: 'thinkmay-dev-canary', version }));
    return;
  }
  response.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
  response.end(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Thinkmay dev canary</title><style>body{background:#102925;color:#e7f4ee;font:18px system-ui;margin:0;padding:40px}main{max-width:700px;margin:auto}h1{color:#57d1b3}code{font-size:16px}</style><main><h1>Thinkmay dev canary · ${version}</h1><p>This response comes from the deployed Node application.</p><p>Dockerfile build · private HTTPS · existing VM</p><code>Health: /health</code></main></html>`);
}).listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log(`Thinkmay canary ${version} listening`));
