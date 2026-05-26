import { UrgentTicker } from '../components/ui/UrgentTicker';
import { useTranslation } from 'react-i18next';
import { ARCHIVE_FIR_RECORDS } from '../lib/archiveData';
import { Search, Shield, ArrowRight, ShieldCheck, MapPin, Calendar, FileText } from 'lucide-react';

interface LandingViewProps {
  setView: (view: 'landing' | 'archive' | 'dashboard' | 'auth' | 'case') => void;
  onCaseSelect?: (id: string) => void;
}

export function LandingView({ setView, onCaseSelect }: LandingViewProps) {
  const { t } = useTranslation();

  // Dynamic calculations synced with ARCHIVE_FIR_RECORDS
  const totalCases = ARCHIVE_FIR_RECORDS.length;
  const closedCases = ARCHIVE_FIR_RECORDS.filter(c => c.status === 'closed').length;
  const resolvedPct = totalCases ? ((closedCases / totalCases) * 100).toFixed(1) : "0.0";
  const quickAccessCases = ARCHIVE_FIR_RECORDS.slice(0, 2);

  const handleQuickCaseClick = (id: string) => {
    if (onCaseSelect) {
      onCaseSelect(id);
      setView('case');
    } else {
      setView('archive');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <header className="relative pt-32 pb-xl px-lg overflow-hidden hero-gradient">
        <div className="max-w-max-width mx-auto relative z-10 flex flex-col items-center text-center">
          <h1 className="font-display text-display mb-md text-primary drop-shadow-lg">{t('hero.title')}</h1>
          <p className="text-h3 font-h3 text-on-surface-variant max-w-2xl mb-xl">
            {t('hero.subtitle')}
          </p>

          {/* Centered Prominent Glass Search Bar */}
          <div className="w-full max-w-3xl bg-glass-elevated border border-border-glass-bright rounded-xl p-sm flex items-center shadow-xl mb-xl group">
            <span className="px-4 text-text-muted group-focus-within:text-primary transition-colors">
              <Search size={22} />
            </span>
            <input 
              className="bg-transparent border-none outline-none focus:ring-0 text-body font-body w-full text-text-primary placeholder:text-text-muted" 
              placeholder={t('hero.searchPlaceholder')} 
              type="text" 
              onKeyDown={(e) => {
                if (e.key === 'Enter') setView('archive');
              }}
            />
            <button 
              className="bg-primary hover:bg-primary/95 text-white font-bold px-xl py-md rounded-lg transition-all active:scale-95 cursor-pointer flex-shrink-0"
              onClick={() => setView('archive')}
            >
              {t('hero.searchButton')}
            </button>
          </div>

          {/* Stat Pills */}
          <div className="flex flex-wrap justify-center gap-md mb-xl">
            <div className="bg-glass border border-glass px-lg py-sm rounded-full flex items-center gap-sm">
              <span className="w-2 h-2 rounded-full bg-status-active animate-pulse"></span>
              <span className="font-mono text-small text-text-muted">LIVE: 1,429 Officers Online</span>
            </div>
            <div className="bg-glass border border-glass px-lg py-sm rounded-full flex items-center gap-sm">
              <ShieldCheck size={14} className="text-secondary" />
              <span className="font-mono text-small text-text-muted">{resolvedPct}% Resolved Cases</span>
            </div>
            <div className="bg-glass border border-glass px-lg py-sm rounded-full flex items-center gap-sm">
              <span className="material-symbols-outlined text-tertiary text-small" style={{ fontVariationSettings: "'FILL' 1" }}>update</span>
              <span className="font-mono text-small text-text-muted">Update: Just now</span>
            </div>
          </div>
        </div>

        {/* Background Element */}
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent-primary-glow rounded-full blur-[120px] opacity-40"></div>
      </header>

      <UrgentTicker />

      <main className="max-w-max-width mx-auto px-lg py-xxl flex flex-col gap-xxxl w-full">
        {/* Latest Bulletins & Archive Preview (Bento Layout) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-lg">
          {/* Latest Bulletins */}
          <div className="md:col-span-8 flex flex-col gap-lg">
            <div className="flex justify-between items-end">
              <h2 className="font-h2 text-h2 text-primary">Latest Bulletins | പ്രധാന അറിയിപ്പുകൾ</h2>
              <button 
                onClick={() => setView('archive')}
                className="text-small font-bold text-secondary hover:underline flex items-center gap-xs cursor-pointer"
              >
                View all <ArrowRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              {/* Bulletin Card 1 */}
              <div className="bg-glass border border-white/5 rounded-2xl p-6 hover:border-primary/20 transition-all group flex flex-col h-full cursor-pointer">
                <div className="flex justify-between mb-4">
                  <span className="bg-status-active/10 text-status-active border border-status-active/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Security</span>
                  <span className="text-text-muted text-xs font-mono">12 OCT 24</span>
                </div>
                <h3 className="text-base font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">Cyber-Fraud Prevention Framework v2.0</h3>
                <p className="text-xs text-text-muted flex-grow leading-relaxed">New measures introduced to combat digital payment phishing across state banking networks.</p>
                <div className="mt-6 flex items-center justify-between">
                  <button className="bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg text-xs font-bold text-text-muted hover:border-primary transition-colors cursor-pointer">Download PDF</button>
                  <ArrowRight size={16} className="text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
              
              {/* Bulletin Card 2 */}
              <div className="bg-glass border border-white/5 rounded-2xl p-6 hover:border-primary/20 transition-all group flex flex-col h-full cursor-pointer">
                <div className="flex justify-between mb-4">
                  <span className="bg-status-review/10 text-status-review border border-status-review/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Advisory</span>
                  <span className="text-text-muted text-xs font-mono">10 OCT 24</span>
                </div>
                <h3 className="text-base font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">Urban Traffic Management Restructuring</h3>
                <p className="text-xs text-text-muted flex-grow leading-relaxed">Revised traffic flow patterns for Kochi Metro Phase II construction areas announced.</p>
                <div className="mt-6 flex items-center justify-between">
                  <button className="bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg text-xs font-bold text-text-muted hover:border-primary transition-colors cursor-pointer">Read More</button>
                  <ArrowRight size={16} className="text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* Public Archive Quick Access */}
          <div className="md:col-span-4 bg-glass-elevated border border-border-glass-bright rounded-2xl p-6 flex flex-col gap-6">
            <h2 className="font-h2 text-h2 text-primary">Public Archive | പൊതു രേഖകൾ</h2>
            <div className="space-y-4">
              {quickAccessCases.map(record => (
                <div 
                  key={record.id}
                  className="bg-white/[0.02] p-4 rounded-xl border border-white/5 hover:border-primary transition-all cursor-pointer group"
                  onClick={() => handleQuickCaseClick(record.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs text-text-muted tracking-wider">#{record.firNumber}</span>
                    <span className="text-text-muted group-hover:text-primary transition-colors">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-on-surface leading-tight mb-1">{record.crimeType}</h4>
                  <p className="text-[10px] text-text-muted/80 font-medium">
                    {record.status === 'closed' ? 'Resolved' : record.status === 'review' ? 'Under Review' : 'Active'} • {record.dateDisplay}
                  </p>
                </div>
              ))}
            </div>
            <button 
              className="mt-auto w-full py-3 border border-primary text-primary font-bold text-xs rounded-xl hover:bg-primary/5 transition-all cursor-pointer"
              onClick={() => setView('archive')}
            >
              Access Full Repository
            </button>
          </div>
        </section>

        {/* Operations Hub Section */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-2">
            <h2 className="font-display text-h1 text-primary">Operations Hub | ഓപ്പറേഷൻസ് ഹബ്</h2>
            <p className="text-sm text-text-muted leading-relaxed">Direct channels for institutional services and administrative reporting.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-glass border border-white/5 p-6 rounded-2xl text-center flex flex-col items-center gap-4 group hover:bg-white/[0.01] hover:border-primary/20 transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-base font-bold text-on-surface">Passport Verification</h3>
              <p className="text-xs text-text-muted leading-relaxed">Track your police clearance status in real-time with your file ID.</p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-glass border border-white/5 p-6 rounded-2xl text-center flex flex-col items-center gap-4 group hover:bg-white/[0.01] hover:border-primary/20 transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-status-critical/10 flex items-center justify-center text-status-critical group-hover:bg-status-critical group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-[24px]">emergency_share</span>
              </div>
              <h3 className="text-base font-bold text-on-surface">Emergency SOS</h3>
              <p className="text-xs text-text-muted leading-relaxed">Immediate response trigger for distress situations. Geolocation enabled.</p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-glass border border-white/5 p-6 rounded-2xl text-center flex flex-col items-center gap-4 group hover:bg-white/[0.01] hover:border-primary/20 transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-[24px]">g_translate</span>
              </div>
              <h3 className="text-base font-bold text-on-surface">Bilingual Support</h3>
              <p className="text-xs text-text-muted leading-relaxed">All services available in Malayalam (മലയാളം) and English for accessibility.</p>
            </div>
            
            {/* Card 4 */}
            <div className="bg-glass border border-white/5 p-6 rounded-2xl text-center flex flex-col items-center gap-4 group hover:bg-white/[0.01] hover:border-primary/20 transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-status-review/10 flex items-center justify-center text-status-review group-hover:bg-status-review group-hover:text-on-surface transition-all">
                <span className="material-symbols-outlined text-[24px]">history_edu</span>
              </div>
              <h3 className="text-base font-bold text-on-surface">Digital FIR</h3>
              <p className="text-xs text-text-muted leading-relaxed">File non-cognizable reports and download digitally signed copies.</p>
            </div>
          </div>
        </section>

        {/* Transparency Links */}
        <section className="bg-glass border border-white/5 rounded-3xl p-8 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-4">
              <h2 className="font-h2 text-h2 text-primary">Our Commitment to Transparency | സുതാര്യതയോടുള്ള പ്രതിബദ്ധത</h2>
              <p className="text-xs text-text-muted leading-relaxed">
                THUNA is built on the core values of "Civic Glass"—a philosophy where institutional authority meets radical transparency. We provide real-time dashboards on crime statistics, department budgets, and officer performance.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <button 
                  className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline cursor-pointer text-left"
                  onClick={() => setView('dashboard')}
                >
                  <span className="material-symbols-outlined text-base">analytics</span>
                  Crime Dashboard
                </button>
                <button className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline cursor-pointer text-left">
                  <span className="material-symbols-outlined text-base">account_balance</span>
                  Budget Disclosures
                </button>
                <button className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline cursor-pointer text-left">
                  <span className="material-symbols-outlined text-base">policy</span>
                  State Gazettes
                </button>
                <button className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline cursor-pointer text-left">
                  <span className="material-symbols-outlined text-base">psychiatry</span>
                  Ethics Committee
                </button>
              </div>
            </div>
            <div className="relative hidden md:block">
              {/* Optional Placeholder or visual element for transparency */}
              <div className="w-full h-56 bg-[#111827]/40 border border-white/5 rounded-2xl flex items-center justify-center">
                 <Shield size={64} className="text-primary opacity-20" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
