import { ChevronRight } from "lucide-react";

export default function ArchiveCard({ record, onOpen }) {
  return (
    <article className={`archive-card archive-card--${record.status}`}>
      <div className="archive-card__badge">{record.badge}</div>
      <div className={`archive-card__status archive-card__status--${record.status}`}>
        <span>{record.statusLabel}</span>
        <strong>REF: {record.ref}</strong>
      </div>
      <div className="archive-card__body">
        <h4>{record.titleMl}</h4>
        <p className="archive-card__english">{record.titleEn}</p>
        <div className="archive-card__meta">
          <div><span>Date Filed</span><strong>{record.filedDate}</strong></div>
          <div><span>Jurisdiction</span><strong>{record.jurisdiction}</strong></div>
        </div>
        <p className="archive-card__summary">{record.summary}</p>
      </div>
      <div className="archive-card__footer">
        <span>{record.incidents} Exhibits Attached</span>
        <button type="button" className="link-action" onClick={onOpen}>
          View Full Dossier <ChevronRight size={18} />
        </button>
      </div>
    </article>
  );
}
