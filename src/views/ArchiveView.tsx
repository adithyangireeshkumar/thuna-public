import { useState, useMemo, useEffect } from 'react';
import { ARCHIVE_FIR_RECORDS, ARCHIVE_FILTERS } from '../lib/archiveData';
import ResultsTable from '../components/ResultsTable';
import CaseCard from '../components/CaseCard';
import { LayoutGrid, Table, Archive, ShieldCheck, Search, FilterX, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatStatusBadge } from '../utils/formatters';

interface ArchiveViewProps {
  onCaseSelect: (id: string) => void;
}

const ITEMS_PER_PAGE = 10;

// Shimmer card placeholder
function ShimmerCard() {
  return (
    <div className="bg-glass border border-white/5 p-6 rounded-2xl backdrop-blur-md animate-pulse flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="h-4 w-24 bg-white/10 rounded"></div>
        <div className="h-5 w-16 bg-white/10 rounded-full"></div>
      </div>
      <div className="h-6 w-3/4 bg-white/10 rounded"></div>
      <hr className="border-white/5 my-1" />
      <div className="flex flex-col gap-3">
        <div className="h-3 w-1/2 bg-white/10 rounded"></div>
        <div className="h-3 w-2/3 bg-white/10 rounded"></div>
        <div className="h-3 w-1/3 bg-white/10 rounded"></div>
      </div>
      <div className="border-t border-white/5 pt-4 mt-2 flex justify-between">
        <div className="h-3 w-1/3 bg-white/10 rounded"></div>
        <div className="h-3 w-4 bg-white/10 rounded"></div>
      </div>
    </div>
  );
}

// Shimmer table row placeholder
function ShimmerRow() {
  return (
    <tr className="animate-pulse border-b border-white/5">
      <td className="px-6 py-4"><div className="h-4 w-20 bg-white/10 rounded"></div></td>
      <td className="px-6 py-4"><div className="h-4 w-40 bg-white/10 rounded"></div></td>
      <td className="px-6 py-4"><div className="h-4 w-24 bg-white/10 rounded"></div></td>
      <td className="px-6 py-4"><div className="h-5 w-16 bg-white/10 rounded-full"></div></td>
      <td className="px-6 py-4"><div className="h-4 w-24 bg-white/10 rounded"></div></td>
      <td className="px-6 py-4"><div className="h-4 w-28 bg-white/10 rounded"></div></td>
      <td className="px-6 py-4"><div className="h-4 w-16 bg-white/10 rounded"></div></td>
      <td className="px-6 py-4"><div className="h-4 w-24 bg-white/10 rounded"></div></td>
    </tr>
  );
}

export function ArchiveView({ onCaseSelect }: ArchiveViewProps) {
  const [activeTab, setActiveTab] = useState<'fir' | 'closed' | 'timeline'>('fir');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'table'>('grid');
  
  // Loading simulation state
  const [isLoading, setIsLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  
  const [filters, setFilters] = useState({
    query: '',
    year: '',
    crimeType: '',
    status: '',
  });

  const [sortState, setSortState] = useState<{ column: string; direction: 'asc' | 'desc' }>({
    column: 'date_of_registration',
    direction: 'desc',
  });

  // Trigger brief shimmer loading on filter or page changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 550);
    return () => clearTimeout(timer);
  }, [filters, currentPage, activeTab, layoutMode]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, activeTab]);

  const handleSort = (column: string) => {
    setSortState((prev) => ({
      column,
      direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      query: '',
      year: '',
      crimeType: '',
      status: '',
    });
  };

  // Filter and sort declassified records
  const filteredRecords = useMemo(() => {
    const records = ARCHIVE_FIR_RECORDS.filter((record) => {
      const q = filters.query.toLowerCase();
      const matchesQuery =
        !q ||
        [
          record.firNumber,
          record.station,
          record.crimeType,
          record.district,
          record.summary,
          record.officer,
        ]
          .join(' ')
          .toLowerCase()
          .includes(q);

      const matchesYear = !filters.year || record.date.startsWith(filters.year);
      const matchesCrimeType = !filters.crimeType || record.crimeType === filters.crimeType;
      const matchesStatus = !filters.status || record.statusLabel === filters.status;

      return matchesQuery && matchesYear && matchesCrimeType && matchesStatus;
    });

    // Handle Sorting
    return [...records].sort((a, b) => {
      let valA: string | number = '';
      let valB: string | number = '';

      if (sortState.column === 'fir_number') {
        valA = a.firNumber;
        valB = b.firNumber;
      } else if (sortState.column === 'crime_type') {
        valA = a.crimeType;
        valB = b.crimeType;
      } else if (sortState.column === 'status') {
        valA = a.status;
        valB = b.status;
      } else {
        // default date sort
        valA = new Date(a.date).getTime();
        valB = new Date(b.date).getTime();
      }

      if (valA < valB) return sortState.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortState.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filters, sortState]);

  // Compute pagination bounds
  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / ITEMS_PER_PAGE));
  
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRecords.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRecords, currentPage]);

  // Transformed cases for standard component contracts
  const standardCases = useMemo(() => {
    return paginatedRecords.map((r) => ({
      id: r.id,
      fir_number: r.firNumber,
      title: `${r.crimeType} Investigation`,
      crime_type: r.crimeType,
      status: r.status,
      date_of_registration: r.date,
      date_of_occurrence: r.date,
      station_name: r.station,
      district: r.district,
      ipc_sections: 'IPC Sec. 379, 411', // simulated standard sections
      officers: {
        name: r.officer,
        rank: 'Investigation Officer',
      },
    }));
  }, [paginatedRecords]);

  const closedCases = useMemo(() => {
    return filteredRecords.filter((r) => r.status === 'closed');
  }, [filteredRecords]);

  const paginatedClosedCases = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return closedCases.slice(start, start + ITEMS_PER_PAGE);
  }, [closedCases, currentPage]);

  const closedTotalPages = Math.max(1, Math.ceil(closedCases.length / ITEMS_PER_PAGE));

  // Flatten all timelines into one sorted chronological feed
  const allEvents = useMemo(() => {
    const events: {
      date: string;
      event: string;
      firNumber: string;
      crimeType: string;
      station: string;
    }[] = [];

    filteredRecords.forEach((record) => {
      record.timeline.forEach((entry) => {
        events.push({
          date: entry.date,
          event: entry.event,
          firNumber: record.firNumber,
          crimeType: record.crimeType,
          station: record.station,
        });
      });
    });

    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filteredRecords]);

  const selectClass =
    "bg-[#111827]/40 border border-white/5 text-on-surface text-xs font-semibold font-sans rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors cursor-pointer appearance-none min-w-[140px]";

  return (
    <div className="max-w-max-width mx-auto px-lg py-xl w-full flex flex-col gap-8 animate-fade-in">
      {/* Page Header */}
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Archive size={22} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Public Crime Archives</h1>
        </div>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Publicly accessible First Information Reports (FIR) and declassified investigation logs.
          All records are filtered under strict transparency guidelines — juvenile records, witness details, and sensitive forensics are permanently redacted.
        </p>

        {/* Dynamic Privacy Banner */}
        <div className="flex items-start gap-3 bg-primary/10 border border-primary/20 rounded-2xl p-4 max-w-4xl">
          <ShieldCheck size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Privacy & Redaction Shield Protected</span>
            <p className="text-xs text-text-muted leading-relaxed">
              Information matches the declassified case directory. Sensitive personal identifiers, juvenile records, and state security details are redacted.
            </p>
          </div>
        </div>
      </header>

      {/* Advanced Filters */}
      <div className="bg-glass border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-lg">filter_list</span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">Refine Audit Directory</h3>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Query Search */}
          <div className="flex-1 min-w-[280px]">
            <div className="relative flex items-center bg-[#111827]/40 border border-white/5 rounded-xl overflow-hidden focus-within:border-primary transition-all">
              <span className="px-4 text-text-muted/60">
                <Search size={16} />
              </span>
              <input
                className="bg-transparent border-none outline-none text-xs font-medium text-on-surface placeholder:text-text-muted/40 w-full py-3 pr-4"
                placeholder="Filter by FIR number, type, station, officer..."
                value={filters.query}
                onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
              />
            </div>
          </div>

          {/* Select dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Year */}
            <select
              className={selectClass}
              value={filters.year}
              onChange={(e) => setFilters((f) => ({ ...f, year: e.target.value }))}
            >
              <option value="">All Years</option>
              {ARCHIVE_FILTERS.years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            {/* Crime Type */}
            <select
              className={selectClass}
              value={filters.crimeType}
              onChange={(e) => setFilters((f) => ({ ...f, crimeType: e.target.value }))}
            >
              {ARCHIVE_FILTERS.crimeTypes.map((ct) => (
                <option key={ct} value={ct === "All Types" ? "" : ct}>{ct}</option>
              ))}
            </select>

            {/* Status */}
            <select
              className={selectClass}
              value={filters.status}
              onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
            >
              {ARCHIVE_FILTERS.statuses.map((s) => (
                <option key={s} value={s === "All Status" ? "" : s}>{s}</option>
              ))}
            </select>

            {/* Reset Filters button */}
            {(filters.query || filters.year || filters.crimeType || filters.status) && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold text-text-muted hover:text-primary transition-all cursor-pointer"
              >
                <FilterX size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs & Layout Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 gap-4">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('fir')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'fir'
                ? 'bg-primary text-white shadow-md'
                : 'text-text-muted hover:bg-white/5 hover:text-on-surface'
            }`}
          >
            <span>FIR Records</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
              activeTab === 'fir' ? 'bg-white/20 text-white' : 'bg-white/5 text-text-muted'
            }`}>
              {filteredRecords.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('closed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'closed'
                ? 'bg-primary text-white shadow-md'
                : 'text-text-muted hover:bg-white/5 hover:text-on-surface'
            }`}
          >
            <span>Closed Cases</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
              activeTab === 'closed' ? 'bg-white/20 text-white' : 'bg-white/5 text-text-muted'
            }`}>
              {closedCases.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-primary text-white shadow-md'
                : 'text-text-muted hover:bg-white/5 hover:text-on-surface'
            }`}
          >
            <span>Chronological Feed</span>
          </button>
        </div>

        {/* Layout Selector (only visible in FIR tab) */}
        {activeTab === 'fir' && (
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 p-1 rounded-xl self-end sm:self-auto">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                layoutMode === 'grid' ? 'bg-primary text-white' : 'text-text-muted hover:text-on-surface'
              }`}
              title="Grid Layout"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setLayoutMode('table')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                layoutMode === 'table' ? 'bg-primary text-white' : 'text-text-muted hover:text-on-surface'
              }`}
              title="Table Layout"
            >
              <Table size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {/* FIR TAB */}
        {activeTab === 'fir' && (
          <>
            {isLoading ? (
              /* Shimmering Skeletal loading previews */
              layoutMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ShimmerCard key={i} />
                  ))}
                </div>
              ) : (
                <div className="w-full overflow-x-auto bg-glass border border-white/5 rounded-2xl backdrop-blur-md">
                  <table className="min-w-full divide-y divide-white/5">
                    <thead>
                      <tr className="bg-white/[0.02]">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <th key={i} className="px-6 py-4"><div className="h-3 w-16 bg-white/10 rounded"></div></th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <ShimmerRow key={i} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : filteredRecords.length === 0 ? (
              <div className="text-center py-20 bg-glass border border-white/5 rounded-2xl">
                <span className="material-symbols-outlined text-text-muted text-5xl mb-4 block">search_off</span>
                <p className="text-base font-bold text-text-muted">No records matching query</p>
                <p className="text-xs text-text-muted/60 mt-1">Try resetting the filters or using custom search phrases.</p>
              </div>
            ) : layoutMode === 'grid' ? (
              /* Grid Layout Rendering CaseCards */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {standardCases.map((c) => (
                  <CaseCard 
                    key={c.id} 
                    c={c} 
                    onClick={() => onCaseSelect(c.id)} 
                  />
                ))}
              </div>
            ) : (
              /* Table Layout Rendering ResultsTable */
              <ResultsTable
                cases={standardCases}
                sortState={sortState}
                onSort={handleSort}
                onRowClick={onCaseSelect}
              />
            )}

            {/* Pagination Footer */}
            {!isLoading && filteredRecords.length > ITEMS_PER_PAGE && (
              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-text-muted hover:text-primary transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider font-mono">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-text-muted hover:text-primary transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}

        {/* CLOSED TAB */}
        {activeTab === 'closed' && (
          isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ShimmerCard key={i} />
              ))}
            </div>
          ) : closedCases.length === 0 ? (
            <div className="text-center py-20 bg-glass border border-white/5 rounded-2xl">
              <span className="material-symbols-outlined text-text-muted text-5xl mb-4 block">folder_off</span>
              <p className="text-base font-bold text-text-muted">No closed cases matched query</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedClosedCases.map((r) => {
                  const badgeInfo = formatStatusBadge(r.status);
                  return (
                    <div 
                      key={r.id} 
                      onClick={() => onCaseSelect(r.id)}
                      className="bg-glass border border-white/5 rounded-2xl p-6 hover:border-primary/20 hover:scale-[1.01] transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="font-mono text-xs font-bold text-primary tracking-wider">{r.firNumber}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-status-closed/10 text-status-closed border border-status-closed/20">
                            {badgeInfo.label}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">{r.crimeType} Investigation</h4>
                        <p className="text-xs text-text-muted leading-relaxed mb-6">{r.summary}</p>
                      </div>

                      <div className="flex flex-col gap-2 text-xs font-medium text-text-muted border-t border-white/5 pt-4">
                        <div className="flex justify-between">
                          <span>Sanitized Complete</span>
                          <span className="text-status-active font-bold">{r.completionDate || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Station Head Officer</span>
                          <span className="text-on-surface font-semibold">{r.officer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Precinct</span>
                          <span className="text-on-surface font-semibold">{r.station}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Closed Cases Pagination */}
              {closedCases.length > ITEMS_PER_PAGE && (
                <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-text-muted hover:text-primary transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </button>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider font-mono">
                    Page {currentPage} of {closedTotalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(closedTotalPages, p + 1))}
                    disabled={currentPage === closedTotalPages}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-text-muted hover:text-primary transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )
        )}

        {/* TIMELINE TAB */}
        {activeTab === 'timeline' && (
          isLoading ? (
            <div className="relative pl-6 border-l-2 border-white/5 ml-4 flex flex-col gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-glass border border-white/5 rounded-2xl p-5 animate-pulse flex flex-col gap-3">
                  <div className="h-4 w-32 bg-white/10 rounded"></div>
                  <div className="h-4 w-3/4 bg-white/10 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative pl-6 border-l-2 border-white/5 ml-4 flex flex-col gap-6">
              {allEvents.map((entry, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline node */}
                  <div className={`absolute -left-[33px] top-4 w-4 h-4 rounded-full border-[3.5px] transition-all bg-[#111827] ${
                    idx === 0 
                      ? 'border-primary shadow-[0_0_8px_rgba(59,130,246,0.5)] scale-115' 
                      : 'border-white/20 group-hover:border-primary'
                  }`} />

                  <div className="bg-glass border border-white/5 rounded-2xl p-5 hover:border-primary/10 hover:bg-white/[0.01] transition-all flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary tracking-wider">{entry.date}</span>
                      <span className="text-[10px] font-mono text-text-muted bg-white/5 border border-white/5 px-2 py-0.5 rounded font-bold">{entry.firNumber}</span>
                      <span className="text-xs text-text-muted font-bold uppercase tracking-wider">{entry.crimeType}</span>
                    </div>
                    <p className="text-xs text-on-surface leading-relaxed font-semibold">{entry.event}</p>
                    <span className="text-[10px] text-text-muted/60 font-medium tracking-wide uppercase mt-1">{entry.station}</span>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Aggregate Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="bg-glass border border-white/5 rounded-2xl p-5 text-center">
          <span className="text-4xl font-extrabold text-primary block leading-none mb-1">
            {ARCHIVE_FIR_RECORDS.length}
          </span>
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Indexed Ledgers</span>
        </div>
        <div className="bg-glass border border-white/5 rounded-2xl p-5 text-center">
          <span className="text-4xl font-extrabold text-status-closed block leading-none mb-1">
            {ARCHIVE_FIR_RECORDS.filter((r) => r.status === 'closed').length}
          </span>
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Sanitized Demarcated</span>
        </div>
        <div className="bg-glass border border-white/5 rounded-2xl p-5 text-center">
          <span className="text-4xl font-extrabold text-status-review block leading-none mb-1">
            {ARCHIVE_FIR_RECORDS.filter((r) => r.status === 'review').length}
          </span>
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Under Audit Review</span>
        </div>
        <div className="bg-glass border border-white/5 rounded-2xl p-5 text-center">
          <span className="text-4xl font-extrabold text-status-active block leading-none mb-1">
            {ARCHIVE_FIR_RECORDS.filter((r) => r.status === 'active').length}
          </span>
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Active Investigations</span>
        </div>
      </div>
    </div>
  );
}
