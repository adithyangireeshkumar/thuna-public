import { useState, useCallback, useRef, FormEvent, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

const HINTS = ['KLP-2023-F092', 'Financial Fraud', 'Cyber', 'dispute', 'Fort Police'] as const;

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
  initialValue?: string;
}

export default function SearchBar({ onSearch, loading = false, initialValue = '' }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync initialValue changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = useCallback(
    (e?: FormEvent) => {
      e?.preventDefault();
      if (!loading) {
        onSearch(value);
      }
    },
    [loading, onSearch, value]
  );

  const handleClear = () => {
    setValue('');
    onSearch('');
    inputRef.current?.focus();
  };

  const handleHint = (hint: string) => {
    setValue(hint);
    onSearch(hint);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Search Form */}
      <form
        role="search"
        aria-label="Search public crime cases"
        onSubmit={handleSubmit}
        className="w-full"
      >
        <div className="relative flex items-center bg-glass border border-white/5 rounded-2xl backdrop-blur-md px-4 py-2 gap-3 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
          {/* Leading icon */}
          <span className="text-text-muted/60" aria-hidden="true">
            {loading ? (
              <Loader2 size={20} className="animate-spin text-primary" />
            ) : (
              <Search size={20} />
            )}
          </span>

          {/* Text input */}
          <input
            id="case-search-input"
            ref={inputRef}
            type="search"
            className="flex-1 bg-transparent border-none text-on-surface placeholder:text-text-muted/40 font-medium text-sm focus:outline-none focus:ring-0 w-full"
            placeholder="Search cases by FIR number, type, station, or keywords..."
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
              className="text-text-muted hover:text-on-surface p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
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
            className="px-5 py-2 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
            disabled={loading}
            aria-label="Search"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Searching…</span>
              </>
            ) : (
              <>
                <Search size={14} />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Hint pills */}
      <div className="flex flex-wrap items-center gap-2.5 px-1" role="group" aria-label="Search suggestions">
        <span className="text-xs font-bold uppercase tracking-wider text-text-muted/70">Try searching:</span>
        {HINTS.map((h) => (
          <button
            key={h}
            type="button"
            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/20 text-xs font-bold text-text-muted hover:text-primary rounded-full transition-all active:scale-95 cursor-pointer"
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
