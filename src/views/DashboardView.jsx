import { AlertTriangle, Archive, ChevronRight, MapPinned, Search } from "lucide-react";
import MetricCard from "../components/cards/MetricCard";
import { OPS_HUB_CARDS } from "../lib/demoData";

export default function DashboardView({ metrics, stats, onOpenData, onOpenMap, onOpenArchives, query, setQuery }) {
  return (
    <section className="dashboard-view">
      <div className="hero-panel frame">
        <span className="panel-tag">Operational Status: Green</span>
        <div className="hero-panel__grid">
          <div className="hero-panel__copy">
            <h2>CENTRAL<br />COMMAND<br /><span>INTERFACE</span></h2>
            <p>Direct access to state-wide law enforcement metrics, archival records, and rapid response deployment protocols. Authorized personnel only.</p>
            <div className="hero-query">
              <Search size={22} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter Case ID, Personnel Ref, or Archive Topic" />
              <button type="button" onClick={onOpenData}>Execute</button>
            </div>
          </div>
          <div className="hero-panel__stats">
            <MetricCard title={metrics[0].label} value={metrics[0].value} accent="navy" />
            <MetricCard title={metrics[1].label} value={metrics[1].value} accent="gold" />
            <div className="metric-card metric-card--wide">
              <p>{metrics[2].label}</p>
              <div className="metric-card__wide">
                <strong>{metrics[2].value}</strong>
                <span>units currently engaged across {stats.active + 10} districts.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="operations-section">
        <header className="section-header"><h3>OPERATIONS HUB</h3></header>
        <div className="ops-grid">
          {OPS_HUB_CARDS.map((card, index) => (
            <article key={card.title} className={`ops-card ops-card--${card.tone}`}>
              <div className="ops-card__corner">
                {index === 0 ? <AlertTriangle size={18} /> : index === 1 ? <MapPinned size={18} /> : <Archive size={18} />}
              </div>
              <h4>{card.title}</h4>
              <p>{card.body}</p>
              <button type="button" className="link-action" onClick={index === 0 ? onOpenData : index === 1 ? onOpenMap : onOpenArchives}>
                {card.action} <ChevronRight size={18} />
              </button>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
