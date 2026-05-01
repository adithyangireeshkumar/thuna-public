import {
  Archive, Database, FileArchive, Map, Newspaper, Settings, ShieldCheck, Users
} from "lucide-react";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: ShieldCheck },
  { key: "map", label: "Crime Map", icon: Map },
  { key: "data", label: "Data Portal", icon: Database },
  { key: "archives", label: "Archives", icon: Archive },
  { key: "personnel", label: "Personnel", icon: Users },
  { key: "news", label: "News", icon: Newspaper },
  { key: "transparency", label: "Transparency", icon: FileArchive },
  { key: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ activeView, onChange, onOpenAuth }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__hero">
        <h1>THUNA PORTAL</h1>
        <p>ARCHIVAL COMMAND CENTER</p>
        <button type="button" className="sidebar__cta" onClick={onOpenAuth}>
          Initiate Filing
        </button>
      </div>
      <nav className="sidebar__nav" aria-label="Portal navigation">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeView === item.key ||
            (item.key === "data" && activeView === "case") ||
            (item.key === "archives" && activeView === "case");
          return (
            <button
              key={item.key}
              type="button"
              className={`sidebar__nav-item ${isActive ? "is-active" : ""}`}
              onClick={() => onChange(item.key)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
