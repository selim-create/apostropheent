export default function HomePage() {
  return (
    <main className="migration-shell">
      <img className="migration-logo" src="/assets/img/logo.svg" alt="Apostrophe Entertainment" />
      <p className="migration-kicker">Next.js Migration Workspace</p>
      <h1>Apostrophe Entertainment</h1>
      <p>
        The legacy ASP.NET source remains in this branch as the visual reference. The next step is to
        migrate the existing sections one by one without changing the approved design.
      </p>
      <div className="migration-status">
        <span>Legacy assets: ready</span>
        <span>Next.js: ready</span>
        <span>WordPress API: next</span>
      </div>
    </main>
  );
}
