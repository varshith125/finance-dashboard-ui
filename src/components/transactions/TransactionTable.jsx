import { useState } from 'react';
import { Pencil, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { applyFilters } from '../../utils/calculations';
import { formatCurrency, formatDate } from '../../utils/formatters';
import TransactionFilters from './TransactionFilters';
import AddEditModal from './AddEditModal';
import { CATEGORY_COLORS } from '../../data/mockData';

const PAGE_SIZE = 10;

function CategoryDot({ category }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 8, height: 8,
        borderRadius: '50%',
        background: CATEGORY_COLORS[category] || '#8b92b3',
        marginRight: 7,
        flexShrink: 0,
      }}
    />
  );
}

export default function TransactionTable() {
  const { transactions, filters, sorting, role, deleteTransaction, setSorting } = useFinanceStore();
  const [modal, setModal] = useState(null); // null | 'add' | { ...transaction }
  const [page, setPage] = useState(1);

  const filtered = applyFilters(transactions, filters, sorting);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const isAdmin = role === 'admin';

  const openAdd = () => setModal('add');
  const openEdit = (tx) => setModal(tx);
  const closeModal = () => setModal(null);

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleSort = (field) => {
    setSorting(field);
    setPage(1);
  };

  const SortHeader = ({ field, label }) => {
    const isActive = sorting.field === field;
    return (
      <th onClick={() => handleSort(field)} id={`sort-header-${field}`}>
        {label}
        <span className={`sort-icon ${isActive ? 'active' : ''}`} style={{ marginLeft: 4 }}>
          {!isActive ? '↕' : sorting.direction === 'asc' ? '↑' : '↓'}
        </span>
      </th>
    );
  };

  return (
    <div>
      <TransactionFilters />

      <div className="table-card animate-fade-in">
        {/* Table header bar */}
        <div className="table-header-bar">
          <div>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Transactions</span>
            <span
              style={{
                marginLeft: 10,
                background: 'var(--bg-secondary)',
                borderRadius: 99,
                padding: '2px 10px',
                fontSize: 11,
                color: 'var(--text-muted)',
              }}
            >
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {isAdmin && (
            <button className="btn btn-primary btn-sm" onClick={openAdd} id="add-transaction-btn">
              <Plus size={14} /> Add Transaction
            </button>
          )}
        </div>

        {/* Table */}
        {paginated.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <div className="empty-state-title">No transactions found</div>
            <div className="empty-state-desc">Try adjusting your filters</div>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <SortHeader field="date"     label="Date" />
                  <th>Description</th>
                  <SortHeader field="category" label="Category" />
                  <th>Type</th>
                  <SortHeader field="amount"   label="Amount" />
                  {isAdmin && <th style={{ width: 80, textAlign: 'center' }}>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {paginated.map((tx) => (
                  <tr key={tx.id}>
                    <td>{formatDate(tx.date)}</td>
                    <td className="primary">{tx.description}</td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <CategoryDot category={tx.category} />
                        {tx.category}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${tx.type}`}>
                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      </span>
                    </td>
                    <td className={tx.type === 'income' ? 'amount-income' : 'amount-expense'}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </td>
                    {isAdmin && (
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => openEdit(tx)}
                            title="Edit"
                            id={`edit-${tx.id}`}
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(tx.id)}
                            title="Delete"
                            id={`delete-${tx.id}`}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filtered.length > PAGE_SIZE && (
          <div className="pagination">
            <div className="pagination-info">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </div>
            <div className="pagination-btns">
              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                id="prev-page"
              >
                <ChevronLeft size={13} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce((acc, p, i, arr) => {
                  if (i > 0 && p - arr[i - 1] > 1) acc.push('…');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === '…' ? (
                    <span key={`ellipsis-${i}`} style={{ padding: '0 4px', color: 'var(--text-muted)', fontSize: 12 }}>…</span>
                  ) : (
                    <button
                      key={p}
                      className={`page-btn ${page === p ? 'active' : ''}`}
                      onClick={() => setPage(p)}
                      id={`page-${p}`}
                    >
                      {p}
                    </button>
                  )
                )}
              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                id="next-page"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <AddEditModal
          transaction={modal === 'add' ? null : modal}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
