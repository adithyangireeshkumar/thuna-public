import { useState, useMemo } from "react";
import PageShell from "./components/layout/PageShell";
import { LandingView } from "./views/LandingView";
import { DashboardView } from "./views/DashboardView";
import { ArchiveView } from "./views/ArchiveView";
import AuthView from "./views/AuthView";
import CaseDetailView from "./views/CaseDetailView";
import { DEMO_CASES } from "./lib/demoData";
import { ARCHIVE_FIR_RECORDS } from "./lib/archiveData";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";

type ViewState = 'landing' | 'archive' | 'dashboard' | 'auth' | 'case';

export default function App() {
  const [currentView, setView] = useState<ViewState>("landing");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // Unified case hydration selector to bridge static archive data and supabase/demo data
  const selectedCase = useMemo(() => {
    if (!selectedCaseId) return null;

    // Search in demo cases first
    const demoMatch = DEMO_CASES.find((c) => c.id === selectedCaseId);
    if (demoMatch) return demoMatch;

    // Fallback: search in archive FIR records and map on-the-fly
    const archiveMatch = ARCHIVE_FIR_RECORDS.find((c) => c.id === selectedCaseId);
    if (archiveMatch) {
      return {
        id: archiveMatch.id,
        firNumber: archiveMatch.firNumber,
        badge: archiveMatch.crimeType,
        badgeMl: "പൊതു രേഖ",
        status: archiveMatch.status,
        statusLabel: archiveMatch.statusLabel,
        titleEn: `${archiveMatch.crimeType} Investigation`,
        titleMl: `${archiveMatch.crimeType} അന്വേഷണം`,
        summary: archiveMatch.summary,
        description: `${archiveMatch.summary} Sanitized public-safe transcript synchronized under regional police auditing protocols. Confidential witness statements and operational notes are withheld.`,
        filedDate: archiveMatch.dateDisplay,
        jurisdiction: `${archiveMatch.station}, ${archiveMatch.district}`,
        timeline: archiveMatch.timeline.map((t) => ({
          stamp: `${t.date.toUpperCase()} - 1000 HRS`,
          title: t.event,
          body: "Official procedural log verified by the duty Station Desk Officer.",
          chip: "Audit Logged",
          action: "Inspect Log Entry"
        })),
        officer: {
          name: archiveMatch.officer,
          rank: "Lead Officer",
          badge: "KLP-OFFICER-AUDIT"
        },
        materials: ["Sanitized Case Summary", "FIR Registry Ledger Extract"]
      };
    }

    return null;
  }, [selectedCaseId]);

  // Handle case click navigation
  const handleCaseSelect = (id: string) => {
    setSelectedCaseId(id);
    setView('case');
  };

  const handleAuthGrant = () => {
    // Audit granted - redirect back to landing or dashboard
    setView('dashboard');
  };

  const renderView = () => {
    switch (currentView) {
      case "landing":
        return <LandingView setView={setView} onCaseSelect={handleCaseSelect} />;
      case "archive":
        return <ArchiveView onCaseSelect={handleCaseSelect} />;
      case "dashboard":
        return <DashboardView />;
      case "auth":
        return (
          <AuthView 
            onGrant={handleAuthGrant} 
            onBack={() => setView('landing')} 
          />
        );
      case "case":
        // Issue 6 Fallback Isolation Fix: Avoid broken selected state bugs
        if (!selectedCase) {
          return <ArchiveView onCaseSelect={handleCaseSelect} />;
        }
        return (
          <CaseDetailView 
            record={selectedCase} 
            onBack={() => {
              setSelectedCaseId(null);
              setView('archive');
            }} 
          />
        );
      default:
        return <LandingView setView={setView} onCaseSelect={handleCaseSelect} />;
    }
  };

  return (
    <ErrorBoundary>
      <PageShell currentView={currentView} setView={setView}>
        {renderView()}
      </PageShell>
    </ErrorBoundary>
  );
}
