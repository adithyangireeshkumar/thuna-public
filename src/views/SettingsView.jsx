export default function SettingsView({ authGranted, source }) {
  return (
    <section className="generic-view">
      <header className="page-header">
        <div>
          <h2>SYSTEM SETTINGS</h2>
          <p>Portal behavior, data source visibility, and access posture for this frontend build.</p>
        </div>
      </header>
      <div className="settings-grid">
        <article className="frame settings-card"><h3>Data Source</h3><p>{source}</p></article>
        <article className="frame settings-card"><h3>Secure Node</h3><p>{authGranted ? "Authorized" : "Standby - restricted"}</p></article>
        <article className="frame settings-card"><h3>Publication Mode</h3><p>Public archival output with redaction safeguards enabled.</p></article>
      </div>
    </section>
  );
}
