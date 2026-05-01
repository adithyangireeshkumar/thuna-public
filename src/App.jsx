import { useEffect, useMemo, useState } from "react";
import TopBar from "./components/layout/TopBar";
import Sidebar from "./components/layout/Sidebar";
import StatusBanner from "./components/layout/StatusBanner";
import MapSelectionCard from "./components/map/MapSelectionCard";
import DashboardView from "./views/DashboardView";
import DataPortalView from "./views/DataPortalView";
import CaseDetailView from "./views/CaseDetailView";
import CrimeMapView from "./views/CrimeMapView";
import NewsView from "./views/NewsView";
import TransparencyView from "./views/TransparencyView";
import PersonnelView from "./views/PersonnelView";
import SettingsView from "./views/SettingsView";
import AuthView from "./views/AuthView";
import {
  DASHBOARD_METRICS,
  DEMO_CASES,
  buildCsv,
  deriveDashboardStats,
  filterCases,
  mapIncidentsFromCases
} from "./lib/demoData";
import { fetchPortalCases, isSupabaseConfigured } from "./lib/supabase";

function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [records, setRecords] = useState(DEMO_CASES);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ district: "", status: "" });
  const [selectedCaseId, setSelectedCaseId] = useState(DEMO_CASES[0].id);
  const [authOpen, setAuthOpen] = useState(false);
  const [authGranted, setAuthGranted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function loadCases() {
      if (!isSupabaseConfigured) return;
      setLoading(true);
      setError("");
      try {
        const remoteCases = await fetchPortalCases();
        if (!cancelled && remoteCases.length > 0) {
          setRecords(remoteCases);
          setSelectedCaseId(remoteCases[0].id);
        }
      } catch {
        if (!cancelled) setError("Supabase sync unavailable. Showing local archive records.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadCases();
    return () => { cancelled = true; };
  }, []);

  const filteredRecords = useMemo(() => filterCases(records, query, filters), [records, query, filters]);
  const selectedCase =
    filteredRecords.find((r) => r.id === selectedCaseId) ||
    records.find((r) => r.id === selectedCaseId) ||
    filteredRecords[0] || records[0];
  const stats = useMemo(() => deriveDashboardStats(records), [records]);
  const incidents = useMemo(() => mapIncidentsFromCases(filteredRecords.length ? filteredRecords : records), [filteredRecords, records]);
  const activeIncident = incidents[0];
  const districts = useMemo(() => [...new Set(records.map((r) => r.district))], [records]);

  function openCase(caseId) {
    setSelectedCaseId(caseId);
    setActiveView("case");
  }

  function exportDataset() {
    const csv = buildCsv(filteredRecords.length ? filteredRecords : records);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "thuna-public-archive.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function renderCurrentView() {
    if (authOpen) {
      return <AuthView authGranted={authGranted} onGrant={() => setAuthGranted(true)} onBack={() => setAuthOpen(false)} />;
    }
    switch (activeView) {
      case "dashboard":
        return <DashboardView metrics={DASHBOARD_METRICS} stats={stats} onOpenData={() => setActiveView("data")} onOpenMap={() => setActiveView("map")} onOpenArchives={() => setActiveView("archives")} query={query} setQuery={setQuery} />;
      case "data":
      case "archives":
        return <DataPortalView records={filteredRecords} districts={districts} filters={filters} setFilters={setFilters} onOpenCase={openCase} onExport={exportDataset} />;
      case "case":
        return <CaseDetailView record={selectedCase} />;
      case "map":
        return <CrimeMapView incidents={incidents} onViewCase={openCase} />;
      case "news":
        return <NewsView onOpenArchives={() => setActiveView("archives")} />;
      case "transparency":
        return <TransparencyView records={records} stats={stats} />;
      case "personnel":
        return <PersonnelView records={records} />;
      case "settings":
        return <SettingsView authGranted={authGranted} source={isSupabaseConfigured ? "Supabase" : "Demo Archive"} />;
      default:
        return null;
    }
  }

  return (
    <div className="app-shell">
      <TopBar query={query} setQuery={setQuery} onOpenAuth={() => setAuthOpen(true)} />
      <div className="shell-body">
        {!authOpen && <Sidebar activeView={activeView} onChange={setActiveView} onOpenAuth={() => setAuthOpen(true)} />}
        <main className={`main-view ${authOpen ? "main-view--auth" : ""}`} id="main-content">
          {loading && <StatusBanner tone="info" text="Synchronizing public archive feed..." />}
          {error && <StatusBanner tone="warn" text={error} />}
          {!loading && !error && isSupabaseConfigured && <StatusBanner tone="success" text="Live records loaded from Supabase public tables." />}
          {renderCurrentView()}
        </main>
        {!authOpen && activeView === "map" && activeIncident && (
          <MapSelectionCard incident={activeIncident} onViewCase={() => openCase(activeIncident.id)} />
        )}
      </div>
    </div>
  );
}

export default App;
