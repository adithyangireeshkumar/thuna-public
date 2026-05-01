import { ChevronUp, ChevronDown, ChevronsUpDown, MapPin, User } from 'lucide-react';
import { formatStatus } from './formatStatus';

/** Format date strings to locale */
function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

/**
 * SortIcon — visual indicator for column sort direction
 */
function SortIcon({ column, sortState }) {
  if (sortState.column !== column) return <ChevronsUpDown size={13} opacity={0.35} />;
  return sortState.direction === 'asc'
    ? <ChevronUp size={13} />
    : <ChevronDown size={13} />;
}

/**
 * ResultsTable — Accessible data table displaying public case results.
 *
 * Renders only the publicly approved columns:
 *   fir_number, title, crime_type, status,
 *   date_of_registration, station_name, ipc_sections, officers.name
 *
 * Props:
 *  cases:     array   — result rows
 *  sortState: object  — { column, direction }
 *  onSort:    fn(col) — toggle sort
 */
export default function ResultsTable({ cases = [], sortState, onSort }) {
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
    <div className="table-wrapper" role="region" aria-label="Search results table">
      <table
        className="data-table"
        aria-label="Public crime cases search results"
        aria-rowcount={cases.length}
      >
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={sortState?.column === col.key ? 'sort-active' : ''}
                onClick={() => col.sortable && onSort(col.key)}
                aria-sort={
                  sortState?.column === col.key
                    ? sortState.direction === 'asc' ? 'ascending' : 'descending'
                    : col.sortable ? 'none' : undefined
                }
                style={{ cursor: col.sortable ? 'pointer' : 'default' }}
              >
                <span className="th-inner">
                  {col.label}
                  {col.sortable && <SortIcon column={col.key} sortState={sortState} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {cases.map((c, idx) => (
            <tr
              key={c.id}
              aria-rowindex={idx + 1}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && console.log('Navigate to case', c.id)}
            >
              {/* FIR Number — monospaced, accented */}
              <td>
                <span className="fir-number" aria-label={`FIR number ${c.fir_number}`}>
                  {c.fir_number}
                </span>
              </td>

              {/* Title */}
              <td>
                <span className="case-title" title={c.title}>
                  {c.title}
                </span>
              </td>

              {/* Crime Type */}
              <td>
                <span className="crime-tag">
                  {c.crime_type?.replace(/_/g, ' ')}
                </span>
              </td>

              {/* Status badge */}
              <td>
                <span
                  className={`status-badge ${c.status}`}
                  aria-label={`Status: ${formatStatus(c.status)}`}
                >
                  {formatStatus(c.status)}
                </span>
              </td>

              {/* Registration date */}
              <td aria-label={`Registered on ${fmtDate(c.date_of_registration)}`}>
                <span style={{ whiteSpace: 'nowrap' }}>{fmtDate(c.date_of_registration)}</span>
              </td>

              {/* Station */}
              <td>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={13} style={{ opacity: 0.5, flexShrink: 0 }} />
                  {c.station_name}
                </span>
              </td>

              {/* IPC Sections */}
              <td>
                <code style={{ fontSize: '0.78rem', opacity: 0.8 }}>{c.ipc_sections || '—'}</code>
              </td>

              {/* Officer – only name/rank (no contact, no private ID) */}
              <td>
                {c.officers
                  ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <User size={13} style={{ opacity: 0.5, flexShrink: 0 }} />
                      {c.officers.name}
                    </span>
                  )
                  : <span style={{ opacity: 0.4 }}>—</span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
