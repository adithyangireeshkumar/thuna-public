import { useMemo } from 'react';
import { ARCHIVE_FIR_RECORDS } from '../lib/archiveData';
import { TrendingUp, TrendingDown, Clock, Users, Shield } from 'lucide-react';

export function DashboardView() {
  // Dynamic calculations synchronized with ARCHIVE_FIR_RECORDS
  const {
    total,
    closed,
    review,
    active,
    closedPct,
    reviewPct,
    activePct,
    clearanceRate,
    monthPercentages,
    crimeTypeDistribution
  } = useMemo(() => {
    const total = ARCHIVE_FIR_RECORDS.length;
    const closed = ARCHIVE_FIR_RECORDS.filter(c => c.status === 'closed').length;
    const review = ARCHIVE_FIR_RECORDS.filter(c => c.status === 'review').length;
    const active = ARCHIVE_FIR_RECORDS.filter(c => c.status === 'active').length;

    const closedPct = total ? Math.round((closed / total) * 100) : 0;
    const reviewPct = total ? Math.round((review / total) * 100) : 0;
    const activePct = total ? (100 - closedPct - reviewPct) : 0;

    const clearanceRate = total ? ((closed / total) * 100).toFixed(1) : "0.0";

    // Monthly Distribution (Jan = index 0, Dec = index 11)
    const monthCounts = Array(12).fill(0);
    ARCHIVE_FIR_RECORDS.forEach(record => {
      const dateObj = new Date(record.date);
      const m = dateObj.getMonth();
      if (m >= 0 && m < 12) {
        monthCounts[m] += 1;
      }
    });
    const maxMonth = Math.max(...monthCounts) || 1;
    // Scale for visual elegance: map to 15% - 85% height
    const monthPercentages = monthCounts.map(count => 
      count ? Math.round((count / maxMonth) * 70) + 15 : 10
    );

    // Crime Type Distribution Pcts
    const typeCounts: Record<string, number> = {};
    ARCHIVE_FIR_RECORDS.forEach(r => {
      typeCounts[r.crimeType] = (typeCounts[r.crimeType] || 0) + 1;
    });
    const crimeTypeDistribution = Object.entries(typeCounts).map(([type, count]) => ({
      type,
      pct: total ? Math.round((count / total) * 100) : 0
    })).sort((a, b) => b.pct - a.pct);

    return {
      total,
      closed,
      review,
      active,
      closedPct,
      reviewPct,
      activePct,
      clearanceRate,
      monthPercentages,
      crimeTypeDistribution
    };
  }, []);

  return (
    <div className="max-w-max-width mx-auto px-lg py-xl w-full flex flex-col gap-8 animate-fade-in">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">State Security Ledger</h1>
        </div>
        <p className="text-sm text-text-muted max-w-2xl leading-relaxed">
          Real-time statistical aggregates and transparency indices for state-wide case registrations. 
          Audited continuously for factual precision and declassification safety.
        </p>
      </header>

      {/* Clearance Rate Horizontal Infographic */}
      <section className="bg-glass border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col gap-6">
        <h2 className="text-lg font-bold text-on-surface">Case Resolution Status Distribution</h2>
        
        <div className="flex flex-col gap-4">
          {/* Clearance Visual Segment Bar */}
          <div className="w-full h-7 flex rounded-xl overflow-hidden bg-white/5 border border-white/5 p-0.5">
            {closedPct > 0 && (
              <div 
                className="bg-status-active h-full transition-all duration-1000 ease-out flex items-center justify-center relative group cursor-crosshair rounded-l-lg" 
                style={{ width: `${closedPct}%` }}
              >
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-[#111827] border border-white/10 text-on-surface text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                  Resolved ({closedPct}%)
                </div>
              </div>
            )}
            {reviewPct > 0 && (
              <div 
                className="bg-status-review h-full transition-all duration-1000 ease-out delay-100 flex items-center justify-center relative group cursor-crosshair" 
                style={{ width: `${reviewPct}%` }}
              >
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-[#111827] border border-white/10 text-on-surface text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                  Under Audit ({reviewPct}%)
                </div>
              </div>
            )}
            {activePct > 0 && (
              <div 
                className="bg-status-critical h-full transition-all duration-1000 ease-out delay-200 flex items-center justify-center relative group cursor-crosshair rounded-r-lg" 
                style={{ width: `${activePct}%` }}
              >
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-[#111827] border border-white/10 text-on-surface text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                  Active ({activePct}%)
                </div>
              </div>
            )}
          </div>
          
          {/* Legend Details */}
          <div className="flex flex-wrap justify-between items-center text-xs font-bold font-mono text-text-muted mt-2 gap-4">
            <div className="flex flex-wrap gap-4">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-status-active"></span> Resolved ({closedPct}%)
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-status-review"></span> Under Review ({reviewPct}%)
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-status-critical"></span> Active Pursuit ({activePct}%)
              </span>
            </div>
            <span>Total Records: {total}</span>
          </div>
        </div>

        {/* Analytics Key Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="bg-[#111827]/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-status-active transition-all group">
            <span className="text-[10px] font-bold text-text-muted font-mono uppercase tracking-wider mb-4">State Clearance Rate</span>
            <div className="flex items-end justify-between gap-2">
              <span className="text-3xl font-extrabold text-on-surface leading-none">{clearanceRate}%</span>
              <span className="text-status-active flex items-center text-xs font-bold gap-0.5">
                <TrendingUp size={14} /> +1.8% YTD
              </span>
            </div>
          </div>
          
          <div className="bg-[#111827]/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-primary transition-all">
            <span className="text-[10px] font-bold text-text-muted font-mono uppercase tracking-wider mb-4">Average Incident Dispatch</span>
            <div className="flex items-end justify-between gap-2">
              <div className="flex items-end gap-1">
                <span className="text-3xl font-extrabold text-on-surface leading-none">06.5</span>
                <span className="text-xs text-text-muted font-bold pb-0.5">mins</span>
              </div>
              <span className="text-status-active flex items-center text-xs font-bold gap-0.5">
                <TrendingDown size={14} /> -0.8m
              </span>
            </div>
          </div>

          <div className="bg-[#111827]/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-status-review transition-all">
            <span className="text-[10px] font-bold text-text-muted font-mono uppercase tracking-wider mb-4">Active Field Deployments</span>
            <div className="flex items-end justify-between gap-2">
              <span className="text-3xl font-extrabold text-on-surface leading-none">1,429</span>
              <span className="text-xs text-text-muted font-bold flex items-center gap-1">
                <Users size={14} className="text-text-muted/60" /> Online Patrols
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Charts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Case Load Chart */}
        <div className="bg-glass border border-white/5 rounded-3xl p-6 flex flex-col gap-6">
          <h3 className="text-base font-bold text-on-surface">Monthly Archival Case Load</h3>
          <div className="h-48 flex items-end gap-2.5 mt-auto">
            {monthPercentages.map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div className="w-full bg-white/5 rounded-md relative overflow-hidden flex-grow flex items-end">
                  <div 
                    className="w-full bg-primary/60 group-hover:bg-primary transition-all duration-300 rounded-md" 
                    style={{ height: `${val}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-text-muted font-mono font-bold">
                  {['J','F','M','A','M','J','J','A','S','O','N','D'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Crime Type Distribution */}
        <div className="bg-glass border border-white/5 rounded-3xl p-6 flex flex-col gap-6">
          <h3 className="text-base font-bold text-on-surface">Public-Safe Offense Distribution</h3>
          <div className="flex-grow flex flex-col justify-center gap-4 overflow-y-auto max-h-[220px] pr-2">
            {crimeTypeDistribution.map((item, idx) => {
              const colors = ['bg-primary', 'bg-status-active', 'bg-status-review', 'bg-status-critical'];
              const color = colors[idx % colors.length];
              return (
                <div key={item.type} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-bold font-mono">
                    <span className="text-on-surface">{item.type}</span>
                    <span className="text-text-muted">{item.pct}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                    <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${item.pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
