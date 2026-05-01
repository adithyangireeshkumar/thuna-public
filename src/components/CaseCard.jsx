import { MapPin, Calendar, User, FileText, ChevronRight } from 'lucide-react';
import { formatStatus } from './formatStatus';

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

/**
 * CaseCard — mobile/card view of a single public case.
 * Displays only the publicly approved columns.
 */
export default function CaseCard({ c }) {
  return (
    <article className="case-card" tabIndex={0} aria-label={`Case: ${c.fir_number}`}>
      <div className="case-card__header">
        <div>
          <span className="fir-number">{c.fir_number}</span>
        </div>
        <span className={`status-badge ${c.status}`}>{formatStatus(c.status)}</span>
      </div>

      <p className="case-card__title">{c.title}</p>

      <div className="case-card__divider" />

      <div className="case-card__meta">
        <div className="case-card__row">
          <span className="case-card__icon"><FileText size={13} /></span>
          <span>
            <span className="crime-tag">{c.crime_type?.replace(/_/g, ' ')}</span>
            &nbsp;·&nbsp;
            <code style={{ fontSize: '0.75rem', opacity: 0.7 }}>{c.ipc_sections}</code>
          </span>
        </div>

        <div className="case-card__row">
          <span className="case-card__icon"><MapPin size={13} /></span>
          <span>{c.station_name}, {c.district}</span>
        </div>

        <div className="case-card__row">
          <span className="case-card__icon"><Calendar size={13} /></span>
          <span>Registered: {fmtDate(c.date_of_registration)}</span>
        </div>

        {c.officers && (
          <div className="case-card__row">
            <span className="case-card__icon"><User size={13} /></span>
            <span>{c.officers.name} · <em style={{ opacity: 0.7 }}>{c.officers.rank}</em></span>
          </div>
        )}
      </div>

      <div className="case-card__divider" />

      <div className="case-card__footer">
        <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-3)' }}>
          Occurred: {fmtDate(c.date_of_occurrence)}
        </span>
        <ChevronRight size={16} style={{ color: 'var(--clr-text-3)' }} />
      </div>
    </article>
  );
}
