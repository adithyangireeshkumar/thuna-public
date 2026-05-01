import { BookCopy, FileCog, Users } from "lucide-react";

export default function CaseDetailView({ record }) {
  if (!record) return null;
  return (
    <section className="case-view">
      <div className="breadcrumbs">Archives &nbsp;›&nbsp; Active Cases &nbsp;›&nbsp; Case #{record.firNumber}</div>
      <div className="case-header frame">
        <div className="case-header__badge">{record.badge}</div>
        <div className="case-header__content">
          <div>
            <h2>{record.titleEn === "Operation Nightfall" ? record.titleEn : "Operation Nightfall"}</h2>
            <p>{record.description}</p>
          </div>
          <div className="status-stamp">STATUS<br />{record.statusLabel.toUpperCase()}</div>
        </div>
        <div className="case-meta">
          <div><span>Filed Date</span><strong>{record.filedDate}</strong></div>
          <div><span>Jurisdiction</span><strong>{record.jurisdiction}</strong></div>
          <div><span>Lead Officer</span><strong>{record.officer.name}</strong></div>
        </div>
      </div>
      <div className="case-layout">
        <div>
          <header className="section-header"><h3>Procedural Timeline</h3></header>
          <div className="timeline">
            {record.timeline.map((entry) => (
              <article key={entry.stamp} className="timeline-card">
                <span className="timeline-card__dot" />
                <div className="timeline-card__inner">
                  <div className="timeline-card__header"><span>{entry.stamp}</span><b>{entry.chip}</b></div>
                  <h4>{entry.title}</h4>
                  <p>{entry.body}</p>
                  <button type="button" className="outline-action outline-action--small">
                    <BookCopy size={16} /> {entry.action}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside className="case-sidebar">
          <div className="frame personnel-card">
            <div className="floating-label">Dossier</div>
            <h4>Assigned Personnel</h4>
            <div className="personnel-card__profile">
              <div className="personnel-card__avatar"><Users size={28} /></div>
              <div>
                <strong>{record.officer.name}</strong>
                <span>{record.officer.rank}</span>
                <small>Badge: {record.officer.badge}</small>
              </div>
            </div>
            <button type="button" className="primary-wide">Request Briefing</button>
          </div>
          <div className="materials-card frame frame--dark">
            <div className="floating-label">Archive Actions</div>
            <h4>Case Materials</h4>
            {record.materials.map((item) => (
              <button key={item} type="button" className="materials-card__item">
                <FileCog size={18} /> <span>{item}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
