import { BookCopy, FileCog, Users, ArrowLeft, Calendar, ShieldCheck, MapPin } from 'lucide-react';
import { formatDateText, formatStatusBadge, formatStatusText } from '../utils/formatters';

interface TimelineEntry {
  stamp: string;
  title: string;
  body: string;
  chip: string;
  action: string;
}

interface OfficerInfo {
  name: string;
  rank: string;
  badge: string;
}

interface CaseRecord {
  id: string;
  firNumber: string;
  badge: string;
  badgeMl?: string;
  status: string;
  statusLabel: string;
  titleEn: string;
  titleMl?: string;
  summary: string;
  description: string;
  filedDate: string;
  jurisdiction: string;
  timeline: TimelineEntry[];
  officer: OfficerInfo;
  materials: string[];
}

interface CaseDetailViewProps {
  record: CaseRecord;
  onBack: () => void;
}

export default function CaseDetailView({ record, onBack }: CaseDetailViewProps) {
  if (!record) return null;

  const badgeInfo = formatStatusBadge(record.status);

  return (
    <section className="flex-1 w-full max-w-max-width mx-auto px-lg py-xl flex flex-col animate-fade-in">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-muted mb-6">
        <button 
          onClick={onBack}
          className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft size={12} />
          <span>Back to Archive</span>
        </button>
        <span className="text-text-muted/40">/</span>
        <span className="text-primary">Case #{record.firNumber}</span>
      </div>

      {/* Main Header Card */}
      <div className="bg-glass border border-white/5 p-8 rounded-3xl backdrop-blur-md shadow-xl flex flex-col md:flex-row justify-between items-start gap-6 relative overflow-hidden mb-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
              {record.badge}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              badgeInfo.tone === 'closed' 
                ? 'bg-status-closed/10 text-status-closed border-status-closed/20' 
                : badgeInfo.tone === 'review'
                ? 'bg-status-review/10 text-status-review border-status-review/20'
                : 'bg-status-active/10 text-status-active border-status-active/20'
            }`}>
              {badgeInfo.label}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">
            {record.titleEn}
          </h2>
          {record.titleMl && (
            <p className="text-lg font-bold text-primary/80 font-ml">
              {record.titleMl}
            </p>
          )}

          <p className="text-sm text-text-muted leading-relaxed max-w-3xl mt-1">
            {record.description}
          </p>
        </div>

        {/* Case Metadata Badges */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-4 bg-white/[0.02] border border-white/5 p-5 rounded-2xl backdrop-blur-sm self-stretch justify-around">
          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-primary flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Registration Date</span>
              <strong className="text-sm text-on-surface">{record.filedDate}</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-primary flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Jurisdiction</span>
              <strong className="text-sm text-on-surface">{record.jurisdiction}</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck size={16} className="text-primary flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Assigned Unit</span>
              <strong className="text-sm text-on-surface">{record.officer.rank}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Procedural Timeline (Left Column) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <span className="material-symbols-outlined text-primary">analytics</span>
            <h3 className="text-xl font-bold text-on-surface">Procedural Timeline</h3>
          </div>

          <div className="relative pl-6 flex flex-col gap-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
            {record.timeline.map((entry) => (
              <article 
                key={entry.stamp} 
                className="bg-glass border border-white/5 p-5 rounded-2xl backdrop-blur-md hover:border-primary/20 transition-all flex flex-col gap-3 relative group"
              >
                {/* Timeline Dot Indicator */}
                <span className="absolute -left-[23px] top-6 w-3.5 h-3.5 rounded-full bg-[#111827] border-[3px] border-primary group-hover:scale-110 transition-transform shadow-[0_0_8px_rgba(59,130,246,0.5)]" />

                <div className="flex justify-between items-center gap-2">
                  <span className="font-mono text-xs font-bold text-primary tracking-wider">
                    {entry.stamp}
                  </span>
                  <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] font-bold text-text-muted uppercase tracking-wider">
                    {entry.chip}
                  </span>
                </div>

                <h4 className="text-base font-bold text-on-surface">
                  {entry.title}
                </h4>
                
                <p className="text-xs text-text-muted leading-relaxed">
                  {entry.body}
                </p>

                <div className="border-t border-white/5 pt-3 mt-1">
                  <button 
                    type="button" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                  >
                    <BookCopy size={14} />
                    <span>{entry.action}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Action Sidebar (Right Column) */}
        <aside className="flex flex-col gap-6 w-full">
          {/* Dossier Personnel Card */}
          <div className="bg-glass border border-white/5 p-6 rounded-2xl backdrop-blur-md shadow-md flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-primary/10 px-2 py-0.5 rounded text-[8px] font-bold text-primary uppercase tracking-wider">
              Dossier
            </div>
            <h4 className="text-sm font-bold text-on-surface uppercase tracking-wider">
              Assigned Personnel
            </h4>
            
            <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Users size={24} />
              </div>
              <div className="flex flex-col">
                <strong className="text-sm text-on-surface">{record.officer.name}</strong>
                <span className="text-xs text-text-muted">{record.officer.rank}</span>
                <small className="font-mono text-[10px] text-text-muted/60 mt-0.5">Badge: {record.officer.badge}</small>
              </div>
            </div>
            
            <button 
              type="button" 
              className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-xl uppercase tracking-wider shadow transition-all active:scale-[0.98] cursor-pointer"
            >
              Request Briefing
            </button>
          </div>

          {/* Case Materials Card */}
          <div className="bg-[#111827]/40 border border-white/5 p-6 rounded-2xl backdrop-blur-md flex flex-col gap-4 relative">
            <div className="absolute top-4 right-4 bg-white/5 px-2 py-0.5 rounded text-[8px] font-bold text-text-muted uppercase tracking-wider">
              Actions
            </div>
            <h4 className="text-sm font-bold text-on-surface uppercase tracking-wider">
              Case Materials
            </h4>

            <div className="flex flex-col gap-2">
              {record.materials.map((item) => (
                <button 
                  key={item} 
                  type="button" 
                  className="w-full inline-flex items-center gap-3 px-4 py-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-primary/20 text-left rounded-xl transition-all cursor-pointer group"
                >
                  <FileCog size={16} className="text-text-muted group-hover:text-primary transition-colors flex-shrink-0" />
                  <span className="text-xs text-on-surface font-semibold group-hover:text-primary transition-colors">{item}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
