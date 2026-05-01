import { AlertTriangle, ChevronRight } from "lucide-react";
import { BULLETINS, URGENT_NOTICES, QUICK_REFERENCES } from "../lib/demoData";

export default function NewsView({ onOpenArchives }) {
  const featured = BULLETINS[0];
  const secondary = BULLETINS[1];
  return (
    <section className="news-view">
      <div className="bulletin-banner frame"><h2>OFFICIAL BULLETIN</h2><p>Verified Public Notices and Archival News Dispatches.</p></div>
      <div className="news-layout">
        <div className="news-feed">
          <article className="bulletin-card frame">
            <div className="bulletin-card__label">Critical Update</div>
            <div className="bulletin-card__meta">
              <span className="badge badge--gold">{featured.type}</span>
              <span>Timestamp: {featured.timestamp}</span>
            </div>
            <h3>{featured.titleMl}</h3>
            <h4>{featured.titleEn}</h4>
            <div className="bulletin-card__image" />
            <p>{featured.summary}</p>
            <button type="button" className="outline-action" onClick={onOpenArchives}>Access Full Dossier</button>
          </article>
          <article className="bulletin-card frame bulletin-card--secondary">
            <div className="bulletin-card__meta">
              <span className="badge">Press Release</span>
              <span>Timestamp: {secondary.timestamp}</span>
            </div>
            <h3>{secondary.titleMl}</h3>
            <h4>{secondary.titleEn}</h4>
            <p>{secondary.summary}</p>
            <button type="button" className="link-action" onClick={onOpenArchives}>
              Read Statement <ChevronRight size={18} />
            </button>
          </article>
        </div>
        <aside className="news-rail">
          <div className="alert-stack frame frame--danger">
            <h4>Urgent Notices</h4>
            {URGENT_NOTICES.map((notice) => (
              <div key={notice} className="notice-item"><AlertTriangle size={18} /><p>{notice}</p></div>
            ))}
          </div>
          <div className="quick-reference frame">
            <h4>Quick Reference</h4>
            {QUICK_REFERENCES.map((item) => (
              <button key={item} type="button" className="quick-reference__item">
                <span>{item}</span><ChevronRight size={18} />
              </button>
            ))}
          </div>
          <div className="resolved-metric frame frame--dark">
            <span>Cases Resolved (YTD)</span>
            <strong>42,891</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}
