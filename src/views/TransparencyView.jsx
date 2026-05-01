import { TRANSPARENCY_PANELS } from "../lib/demoData";

export default function TransparencyView({ records, stats }) {
  return (
    <section className="generic-view">
      <header className="page-header">
        <div>
          <h2>TRANSPARENCY PORTAL</h2>
          <p>Read-only public assurances, disclosure rules, and archival publication standards.</p>
        </div>
      </header>
      <div className="transparency-grid">
        {TRANSPARENCY_PANELS.map((panel) => (
          <article key={panel.title} className="frame transparency-card">
            <h3>{panel.title}</h3><p>{panel.body}</p>
          </article>
        ))}
      </div>
      <div className="transparency-metrics">
        <div className="frame transparency-metrics__card"><span>Published Records</span><strong>{records.length}</strong></div>
        <div className="frame transparency-metrics__card"><span>Active Dossiers</span><strong>{stats.active}</strong></div>
        <div className="frame transparency-metrics__card"><span>Closed Archives</span><strong>{stats.closed}</strong></div>
      </div>
    </section>
  );
}
