import { Bell, FileBadge2, Search, Siren, UserCircle2 } from "lucide-react";

export default function TopBar({ query, setQuery, onOpenAuth }) {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__brand-ml">കേരള പോലീസ്</span>
        <span className="topbar__brand-divider" />
        <span className="topbar__brand-en">KERALA POLICE</span>
        <span className="topbar__title">THUNA PORTAL</span>
      </div>
      <div className="topbar__search">
        <Search size={18} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Archives..."
          aria-label="Search archives"
        />
      </div>
      <div className="topbar__actions">
        <button type="button" className="icon-button" aria-label="Notifications"><Bell size={22} /></button>
        <button type="button" className="icon-button" aria-label="Directives"><FileBadge2 size={22} /></button>
        <button type="button" className="icon-button" aria-label="Profile"><UserCircle2 size={22} /></button>
        <button type="button" className="emergency-button" onClick={onOpenAuth}>
          <Siren size={18} /> Emergency 112
        </button>
      </div>
    </header>
  );
}
