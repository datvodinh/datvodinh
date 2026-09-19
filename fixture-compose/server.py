import json
import os
import sys
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

if sys.argv[1:] == ['migrate']:
    if Path('/app/migration-mode.txt').read_text().strip() == 'fail':
        raise SystemExit(23)
    with Path('/data/migrations').open('a') as stream:
        stream.write(Path('/app/version.txt').read_text().strip() + '\n')
    raise SystemExit(0)

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/write':
            Path('/data/value').write_text('preserved-user-data')
        dependency = urllib.request.urlopen('http://sidecar:8081', timeout=2).read().decode().strip()
        runtime_secret = Path('/run/secrets/RUNTIME_TOKEN').read_text()
        body = json.dumps({
            'version': Path('/app/version.txt').read_text().strip(),
            'data': Path('/data/value').read_text() if Path('/data/value').exists() else 'empty',
            'dependency': dependency,
            'runtime_secret_loaded': len(runtime_secret) > 20,
        }).encode()
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *_):
        pass

ThreadingHTTPServer(('0.0.0.0', int(os.environ['PORT'])), Handler).serve_forever()
