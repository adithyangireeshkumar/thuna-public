import { FileSearch } from "lucide-react";
import ArchiveCard from "../components/cards/ArchiveCard";

const CLASSIFICATIONS = ["Investigation Active", "Case Closed", "Critical Investigation"];

export default function DataPortalView({ records, districts, filters, setFilters, onOpenCase, onExport }) {
  return (
    <section className="data-view">
      <header className="page-header">
        <div>
          <h2>PUBLIC DATA PORTAL</h2>
          <p>Archival Case File Repository &amp; Open Data Access</p>
        </div>
        <button type="button" className="outline-action" onClick={onExport}>
          <FileSearch size={18} /> Export Dataset
        </button>
      </header>

      <div className="data-layout">
        <aside className="filter-panel">
          <div className="filter-panel__title">REFINE ARCHIVE</div>
          <label>
            <span>Jurisdiction / Station</span>
            <select value={filters.district} onChange={(e) => setFilters((c) => ({ ...c, district: e.target.value }))}>
              <option value="">All Districts</option>
              {districts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>
          <div className="range-row">
            <div>
              <span>TEMPORAL RANGE</span>
              <div className="year-pair">
                <input placeholder="YYYY" aria-label="Start year" />
                <b>-</b>
                <input placeholder="YYYY" aria-label="End year" />
              </div>
            </div>
          </div>
          <div className="checkbox-group">
            <span>CLASSIFICATION STATUS</span>
            {CLASSIFICATIONS.map((item) => (
              <label key={item} className="check-item">
                <input type="radio" name="classification" checked={filters.status === item} onChange={() => setFilters((c) => ({ ...c, status: item }))} />
                <span>{item}</span>
              </label>
            ))}
            <label className="check-item">
              <input type="radio" name="classification" checked={!filters.status} onChange={() => setFilters((c) => ({ ...c, status: "" }))} />
              <span>All Published</span>
            </label>
          </div>
          <button type="button" className="primary-wide">Apply Filters</button>
        </aside>

        <div className="archive-grid">
          {records.map((record) => (
            <ArchiveCard key={record.id} record={record} onOpen={() => onOpenCase(record.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}
