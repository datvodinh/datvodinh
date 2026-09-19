import os
from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def index():
    return {'fixture': 'fastapi', 'environment': os.getenv('FIXTURE_ENV', 'missing')}

@app.get('/health')
def health():
    return {'status': 'ok', 'fixture': 'fastapi'}
