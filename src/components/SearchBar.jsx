import { useState, useCallback, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

const HINTS = ['KKD/2025/0001', 'KLM/2025/0015', 'robbery', 'cybercrime', 'assault'];

/**
 * SearchBar — Accessible, keyboard-navigable search input.
 *
 * Props:
 *  onSearch(query: string)  — called on submit
 *  loading: bool            — shows spinner inside button
 *  initialValue: string     — pre-filled value
 */
export default function SearchBar({ onSearch, loading = false, initialValue = '' }) {
  const [value, setValue] = useState(() => initialValue);
  const inputRef = useRef(null);

  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault();
      if (!loading) onSearch(value);
    },
    [loading, onSearch, value]
  );

  const handleClear = () => {
    setValue('');
    onSearch('');
    inputRef.current?.focus();
  };

  const handleHint = (hint) => {
    setValue(hint);
    // Submit immediately
    onSearch(hint);
  };

  return (
    <div className="search-wrapper">
      {/* Search Form */}
      <form
        role="search"
        aria-label="Search public crime cases"
        onSubmit={handleSubmit}
      >
        <div className="search-bar">
          {/* Leading icon */}
          <span className="search-bar__icon" aria-hidden="true">
            {loading
              ? <div className="spinner" style={{ width: 20, height: 20 }} />
              : <Search size={20} />
            }
          </span>

          {/* Text input */}
          <input
            id="case-search-input"
            ref={inputRef}
            type="search"
            autoComplete="off"
            spellCheck="false"
            className="search-bar__input"
            placeholder="Search by FIR number (e.g. KKD/2025/0001) or keyword…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            aria-label="Search cases by FIR number or keyword"
            aria-busy={loading}
            disabled={loading}
          />

          {/* Clear button */}
          {value && (
            <button
              type="button"
              className="search-bar__clear"
              onClick={handleClear}
              aria-label="Clear search"
              tabIndex={0}
            >
              <X size={16} />
            </button>
          )}

          {/* Submit */}
          <button
            type="submit"
            id="case-search-submit"
            className="search-btn"
            disabled={loading}
            aria-label="Search"
          >
            {loading
              ? <><Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} /> <span>Searching…</span></>
              : <><Search size={16} /> <span>Search</span></>
            }
          </button>
        </div>
      </form>

      {/* Hint pills */}
      <div className="search-hints" role="group" aria-label="Search suggestions">
        <span className="search-hints__label">Try:</span>
        {HINTS.map((h) => (
          <button
            key={h}
            type="button"
            className="hint-pill"
            onClick={() => handleHint(h)}
            aria-label={`Search for ${h}`}
          >
            {h}
          </button>
        ))}
      </div>
    </div>
  );
}
