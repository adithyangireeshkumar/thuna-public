import { AlertTriangle, Info, Megaphone } from 'lucide-react';

export function UrgentTicker() {
  return (
    <div className="bg-surface-container-high py-2.5 overflow-hidden whitespace-nowrap border-y border-white/5">
      <div className="inline-block animate-marquee px-6">
        <span className="text-status-critical font-bold mx-6 inline-flex items-center gap-1.5 align-middle">
          <AlertTriangle size={15} />
          <span>URGENT: New Cyber Security Protocol effective from Monday. Check guidelines in Bulletin.</span>
        </span>
        <span className="text-primary font-bold mx-6 inline-flex items-center gap-1.5 align-middle">
          <Info size={15} />
          <span>Public Archive: High Court judgments from June 2024 now accessible.</span>
        </span>
        <span className="text-secondary font-bold mx-6 inline-flex items-center gap-1.5 align-middle">
          <Megaphone size={15} />
          <span>Advisory: Monsoon safety guidelines released for coastal regions.</span>
        </span>
      </div>
    </div>
  );
}
