export default function MapSelectionCard({ incident, onViewCase }) {
  return (
    <aside className="map-selection frame">
      <div className="floating-label">Active Selection</div>
      <h4>{incident.sector} NODE</h4>
      <div className="map-selection__stats">
        <div>
          <span>Status</span>
          <strong>{incident.priority === "critical" ? "CRITICAL" : "ACTIVE"}</strong>
        </div>
        <div>
          <span>Units Active</span>
          <strong>{String(incident.units).padStart(2, "0")}</strong>
        </div>
      </div>
      <div className="map-selection__actions">
        <button type="button" className="primary-wide" onClick={onViewCase}>View Details</button>
        <button type="button" className="outline-action">Dispatch</button>
      </div>
    </aside>
  );
}
