import { createServer } from 'node:http';
import { message } from '@thinkmay-fixture/message';

createServer((request, response) => {
  response.writeHead(200, { 'content-type': 'application/json' });
  response.end(JSON.stringify({ status: 'ok', fixture: 'node-monorepo', message, path: request.url }));
}).listen(Number(process.env.PORT || 3000), '0.0.0.0');
