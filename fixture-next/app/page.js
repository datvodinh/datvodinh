export default function Page() {
  return <main><h1>Next.js SSR fixture</h1><p>environment: {process.env.FIXTURE_ENV || 'missing'}</p><a href="/api/health">API health</a></main>;
}
