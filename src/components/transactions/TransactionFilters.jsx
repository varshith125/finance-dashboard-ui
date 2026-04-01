import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { CATEGORIES } from '../../data/mockData';
import { useState } from 'react';

export default function TransactionFilters() {
  const { filters, setFilter, resetFilters, sorting, setSorting } = useFinanceStore();
  const [categoryOpen, setCategoryOpen] = useState(false);

  const toggleCategory = (cat) => {
    const current = filters.categories;
    const next = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    setFilter('categories', next);
  };

  const removeCategory = (cat) => {
    setFilter('categories', filters.categories.filter((c) => c !== cat));
  };

  return (
    <div className="filters-bar">
      {/* Search */}
      <div className="filter-group" style={{ flex: '1 1 200px', minWidth: 180 }}>
        <label className="filter-label">Search</label>
        <div className="input-group">
          <Search size={14} className="input-icon" />
          <input
            className="input"
            type="text"
            placeholder="Description or category…"
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
            id="search-input"
          />
          {filters.search && (
            <button
              onClick={() => setFilter('search', '')}
              style={{ position: 'absolute', right: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Type toggle */}
      <div className="filter-group">
        <label className="filter-label">Type</label>
        <div className="type-toggle">
          {['all', 'income', 'expense'].map((t) => (
            <button
              key={t}
              className={`type-btn ${filters.type === t ? 'active' : ''}`}
              onClick={() => setFilter('type', t)}
              id={`type-${t}`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Date from */}
      <div className="filter-group">
        <label className="filter-label">From</label>
        <input
          className="input"
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilter('dateFrom', e.target.value)}
          style={{ width: 140 }}
        />
      </div>

      {/* Date to */}
      <div className="filter-group">
        <label className="filter-label">To</label>
        <input
          className="input"
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilter('dateTo', e.target.value)}
          style={{ width: 140 }}
        />
      </div>

      {/* Category multi-select */}
      <div className="filter-group" style={{ position: 'relative' }}>
        <label className="filter-label">Category</label>
        <button
          className="input btn-secondary"
          style={{ width: 150, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
          onClick={() => setCategoryOpen((o) => !o)}
          id="category-filter-btn"
        >
          <span style={{ fontSize: 12 }}>
            {filters.categories.length === 0 ? 'All categories' : `${filters.categories.length} selected`}
          </span>
          {categoryOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>

        {categoryOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              left: 0,
              zIndex: 20,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px',
              width: 180,
              boxShadow: 'var(--shadow)',
              maxHeight: 220,
              overflowY: 'auto',
            }}
          >
            {CATEGORIES.map((cat) => (
              <label
                key={cat}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 8px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  style={{ accentColor: 'var(--accent-blue)' }}
                />
                {cat}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sort */}
      <div className="filter-group">
        <label className="filter-label">Sort by</label>
        <div style={{ display: 'flex', gap: 5 }}>
          {['date', 'amount', 'category'].map((field) => (
            <button
              key={field}
              className={`btn btn-secondary btn-sm ${sorting.field === field ? 'active' : ''}`}
              onClick={() => setSorting(field)}
              style={sorting.field === field ? { borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' } : {}}
              id={`sort-${field}`}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
              {sorting.field === field && (
                <span style={{ marginLeft: 2 }}>
                  {sorting.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <div className="filter-group" style={{ justifyContent: 'flex-end', marginLeft: 'auto' }}>
        <label className="filter-label" style={{ opacity: 0 }}>_</label>
        <button className="btn btn-ghost btn-sm" onClick={resetFilters} id="reset-filters">
          <X size={13} /> Reset
        </button>
      </div>

      {/* Category pills (below everything) */}
      {filters.categories.length > 0 && (
        <div className="category-pills" style={{ width: '100%' }}>
          {filters.categories.map((cat) => (
            <span key={cat} className="category-pill">
              {cat}
              <button onClick={() => removeCategory(cat)}>×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
