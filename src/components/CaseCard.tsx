import { MapPin, Calendar, User, FileText, ChevronRight } from 'lucide-react';
import { formatDateText, formatStatusBadge, formatStatusText } from '../utils/formatters';

interface OfficerInfo {
  name: string;
  rank: string;
  badge_number?: string;
}

interface CaseRecord {
  id: string;
  fir_number: string;
  title: string;
  crime_type?: string;
  status: string;
  date_of_occurrence?: string;
  date_of_registration: string;
  station_name: string;
  district: string;
  ipc_sections?: string;
  officers?: OfficerInfo;
}

interface CaseCardProps {
  c: CaseRecord;
  onClick?: () => void;
}

export default function CaseCard({ c, onClick }: CaseCardProps) {
  const badgeInfo = formatStatusBadge(c.status);

  return (
    <article 
      onClick={onClick}
      className={`group flex flex-col justify-between p-6 bg-glass border border-white/5 rounded-2xl backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary focus-within:outline-none ${
        onClick ? 'cursor-pointer hover:scale-[1.01]' : ''
      }`}
      tabIndex={0} 
      aria-label={`Case number ${c.fir_number}: ${c.title}`}
    >
      <div className="flex flex-col gap-4">
        {/* Header: FIR & Status Badge */}
        <div className="flex justify-between items-center gap-2">
          <span className="font-mono text-sm font-bold text-primary tracking-wider">
            {c.fir_number}
          </span>
          <span 
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
              badgeInfo.tone === 'closed' 
                ? 'bg-status-closed/10 text-status-closed border-status-closed/20' 
                : badgeInfo.tone === 'review'
                ? 'bg-status-review/10 text-status-review border-status-review/20'
                : 'bg-status-active/10 text-status-active border-status-active/20'
            }`}
          >
            {badgeInfo.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {c.title || 'Sanitized Crime Record'}
        </h3>

        <hr className="border-white/5 my-1" />

        {/* Metadata Details */}
        <div className="flex flex-col gap-2.5 text-xs text-text-muted">
          {/* Crime Tag & Sections */}
          <div className="flex items-start gap-2.5">
            <FileText size={14} className="flex-shrink-0 text-text-muted/60 mt-0.5" />
            <div className="flex flex-wrap items-center gap-1.5 leading-tight">
              <span className="font-bold text-on-surface/80">
                {c.crime_type ? formatStatusText(c.crime_type) : 'General Offense'}
              </span>
              {c.ipc_sections && (
                <>
                  <span className="text-text-muted/40">•</span>
                  <code className="bg-[#111827]/40 px-1.5 py-0.5 rounded border border-white/5 font-mono text-[10px] text-text-muted/80">
                    {c.ipc_sections}
                  </code>
                </>
              )}
            </div>
          </div>

          {/* Location details */}
          <div className="flex items-start gap-2.5">
            <MapPin size={14} className="flex-shrink-0 text-text-muted/60 mt-0.5" />
            <span className="leading-tight">
              {c.station_name}, {c.district}
            </span>
          </div>

          {/* Registration Date */}
          <div className="flex items-start gap-2.5">
            <Calendar size={14} className="flex-shrink-0 text-text-muted/60 mt-0.5" />
            <span className="leading-tight">
              Registered: {formatDateText(c.date_of_registration)}
            </span>
          </div>

          {/* Investigating Officer */}
          {c.officers && (
            <div className="flex items-start gap-2.5 border-t border-white/5 pt-2.5 mt-1">
              <User size={14} className="flex-shrink-0 text-text-muted/60 mt-0.5" />
              <span className="leading-tight">
                {c.officers.name} <span className="text-text-muted/60">({c.officers.rank})</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex justify-between items-center gap-2 border-t border-white/5 pt-4 mt-4 text-[10px] text-text-muted font-medium uppercase tracking-wider">
        <span>
          Occurred: {formatDateText(c.date_of_occurrence)}
        </span>
        <ChevronRight size={14} className="text-text-muted/60 group-hover:text-primary transition-colors group-hover:translate-x-0.5 duration-200" />
      </div>
    </article>
  );
}
