import { ChevronUp, ChevronDown, ChevronsUpDown, MapPin, User } from 'lucide-react';
import { formatDateText, formatStatusBadge, formatStatusText } from '../utils/formatters';

interface OfficerInfo {
  name: string;
  rank: string;
  badge_number?: string;
}

interface CaseRecord {
  id: string;
  fir_number: string;
  title: string;
  crime_type?: string;
  status: string;
  date_of_occurrence?: string;
  date_of_registration: string;
  station_name: string;
  district: string;
  ipc_sections?: string;
  officers?: OfficerInfo;
}

interface SortState {
  column: string;
  direction: 'asc' | 'desc';
}

interface ResultsTableProps {
  cases: CaseRecord[];
  sortState: SortState;
  onSort: (column: string) => void;
  onRowClick: (id: string) => void;
}

function SortIcon({ column, sortState }: { column: string; sortState: SortState }) {
  if (sortState.column !== column) return <ChevronsUpDown size={12} className="opacity-30 ml-1.5" />;
  return sortState.direction === 'asc'
    ? <ChevronUp size={12} className="text-primary ml-1.5" />
    : <ChevronDown size={12} className="text-primary ml-1.5" />;
}

export default function ResultsTable({ cases = [], sortState, onSort, onRowClick }: ResultsTableProps) {
  const COLUMNS = [
    { key: 'fir_number',           label: 'FIR Number',    sortable: true  },
    { key: 'title',                label: 'Case Title',     sortable: false },
    { key: 'crime_type',           label: 'Crime Type',     sortable: true  },
    { key: 'status',               label: 'Status',         sortable: true  },
    { key: 'date_of_registration', label: 'Registered',    sortable: true  },
    { key: 'station_name',         label: 'Police Station', sortable: true  },
    { key: 'ipc_sections',         label: 'IPC / Act',      sortable: false },
    { key: 'officer_name',         label: 'I/O Name',       sortable: false },
  ];

  if (cases.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto bg-glass border border-white/5 rounded-2xl backdrop-blur-md" role="region" aria-label="Search results table">
      <table
        className="min-w-full divide-y divide-white/5"
        aria-label="Public crime cases search results"
        aria-rowcount={cases.length}
      >
        <thead>
          <tr className="bg-white/[0.02]">
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`px-6 py-4 text-left text-xs font-bold text-text-muted uppercase tracking-wider transition-colors select-none ${
                  sortState.column === col.key ? 'text-primary' : ''
                }`}
                onClick={() => col.sortable && onSort(col.key)}
                aria-sort={
                  sortState.column === col.key
                    ? sortState.direction === 'asc' ? 'ascending' : 'descending'
                    : col.sortable ? 'none' : undefined
                }
                style={{ cursor: col.sortable ? 'pointer' : 'default' }}
              >
                <div className="flex items-center">
                  {col.label}
                  {col.sortable && <SortIcon column={col.key} sortState={sortState} />}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-white/5">
          {cases.map((c, idx) => {
            const badgeInfo = formatStatusBadge(c.status);
            return (
              <tr
                key={c.id}
                aria-rowindex={idx + 1}
                tabIndex={0}
                className="hover:bg-white/[0.03] focus:bg-white/[0.05] focus:outline-none transition-colors cursor-pointer"
                onClick={() => onRowClick(c.id)}
                onKeyDown={(e) => e.key === 'Enter' && onRowClick(c.id)}
              >
                {/* FIR Number */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-sm font-bold text-primary tracking-wider" aria-label={`FIR number ${c.fir_number}`}>
                    {c.fir_number}
                  </span>
                </td>

                {/* Case Title */}
                <td className="px-6 py-4 max-w-xs truncate">
                  <span className="font-bold text-on-surface text-sm" title={c.title}>
                    {c.title}
                  </span>
                </td>

                {/* Crime Type */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-white/5 border border-white/5 px-2 py-0.5 rounded text-xs font-bold text-on-surface/80">
                    {c.crime_type ? formatStatusText(c.crime_type) : 'General Offense'}
                  </span>
                </td>

                {/* Status Badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      badgeInfo.tone === 'closed' 
                        ? 'bg-status-closed/10 text-status-closed border-status-closed/20' 
                        : badgeInfo.tone === 'review'
                        ? 'bg-status-review/10 text-status-review border-status-review/20'
                        : 'bg-status-active/10 text-status-active border-status-active/20'
                    }`}
                    aria-label={`Status: ${badgeInfo.label}`}
                  >
                    {badgeInfo.label}
                  </span>
                </td>

                {/* Registered Date */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted" aria-label={`Registered on ${formatDateText(c.date_of_registration)}`}>
                  <span className="font-medium">{formatDateText(c.date_of_registration)}</span>
                </td>

                {/* Station */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-text-muted/50 flex-shrink-0" />
                    {c.station_name}
                  </span>
                </td>

                {/* IPC Sections */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="bg-[#111827]/40 px-1.5 py-0.5 border border-white/5 rounded font-mono text-xs text-text-muted/80">
                    {c.ipc_sections || '—'}
                  </code>
                </td>

                {/* Officer Name */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                  {c.officers ? (
                    <span className="flex items-center gap-1.5 font-medium">
                      <User size={13} className="text-text-muted/50 flex-shrink-0" />
                      {c.officers.name}
                    </span>
                  ) : (
                    <span className="opacity-40">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
