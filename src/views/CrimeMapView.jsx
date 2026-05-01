import { Flame, Layers3, Search } from "lucide-react";

export default function CrimeMapView({ incidents, onViewCase }) {
  return (
    <section className="map-view">
      <div className="incident-log frame">
        <div className="incident-log__header">
          <span>Live Feed</span>
          <h3>Incident Log</h3>
        </div>
        <div className="incident-log__items">
          {incidents.map((incident) => (
            <article key={incident.id} className={`incident-card incident-card--${incident.priority}`}>
              <div className="incident-card__priority">{incident.priority.replace(/^\w/, (c) => c.toUpperCase())} Priority</div>
              <div className="incident-card__headline">
                <h4>{incident.code}: {incident.title}</h4>
                <time>{incident.time}</time>
              </div>
              <p>{incident.summary}</p>
              <div className="incident-card__chips">
                <span>{incident.location}</span>
                <span>{incident.unit}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="map-panel frame frame--navy">
        <div className="map-toolbar">
          <button type="button"><Search size={20} /></button>
          <button type="button"><Layers3 size={20} /></button>
          <button type="button"><Flame size={20} /></button>
        </div>
        {incidents.map((incident) => (
          <button key={incident.id} type="button" className={`map-node map-node--${incident.priority}`}
            style={{ left: `${incident.x}%`, top: `${incident.y}%` }}
            onClick={() => onViewCase(incident.id)} />
        ))}
        <div className="legend-card frame">
          <h4>Map Legend</h4>
          <div className="legend-card__item"><span className="dot dot--critical" /> Critical Incident</div>
          <div className="legend-card__item"><span className="dot dot--high" /> High Priority</div>
          <div className="legend-card__item"><span className="dot dot--stable" /> Station Point</div>
        </div>
      </div>
    </section>
  );
}
