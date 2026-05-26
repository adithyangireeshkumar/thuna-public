import { Languages } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg-deep border-t border-white/5 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center py-8 px-6 max-w-max-width mx-auto gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-base font-bold text-on-surface flex items-center gap-2">
            <img src="/shield.svg" alt="Kerala Police Shield Badge Logo" className="w-6 h-6" />
            <span>THUNA | തുണ</span>
          </div>
          <p className="text-xs text-text-muted">© 2024 Kerala Police Department. Government of Kerala.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <a className="text-xs text-text-muted hover:text-primary transition-colors font-medium" href="#">Privacy Policy</a>
          <a className="text-xs text-text-muted hover:text-primary transition-colors font-medium" href="#">Terms of Service</a>
          <a className="text-xs text-text-muted hover:text-primary transition-colors font-medium" href="#">Cyber Safety</a>
          <a className="text-xs text-text-muted hover:text-primary transition-colors font-medium" href="#">Contact Us</a>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-xs text-primary font-bold">മലയാളം സപ്പോർട്ട് ലഭ്യമാണ്</span>
            <span className="text-[9px] text-text-muted uppercase tracking-widest font-bold">Bilingual Institutional Command</span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-primary">
            <Languages size={18} />
          </div>
        </div>
      </div>
    </footer>
  );
}
