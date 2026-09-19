export function GET() { return Response.json({ status: 'ok', fixture: 'next', environment: process.env.FIXTURE_ENV || 'missing' }); }
