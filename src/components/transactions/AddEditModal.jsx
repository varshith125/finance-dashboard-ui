import { useState } from 'react';
import { X } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { CATEGORIES } from '../../data/mockData';

const EMPTY_FORM = {
  date: new Date().toISOString().slice(0, 10),
  amount: '',
  category: 'Food',
  type: 'expense',
  description: '',
};

export default function AddEditModal({ transaction, onClose }) {
  const { addTransaction, editTransaction } = useFinanceStore();
  const isEdit = Boolean(transaction);

  const [form, setForm] = useState(
    isEdit
      ? { ...transaction, amount: String(transaction.amount) }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState({});

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.date) errs.date = 'Date is required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      errs.amount = 'Enter a valid positive amount';
    if (!form.description.trim()) errs.description = 'Description is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const payload = { ...form, amount: Number(form.amount) };
    if (isEdit) {
      editTransaction(transaction.id, payload);
    } else {
      addTransaction(payload);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{isEdit ? 'Edit Transaction' : 'Add Transaction'}</div>
          <button className="btn btn-ghost" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row">
              {/* Date */}
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  className="form-input"
                  type="date"
                  value={form.date}
                  onChange={(e) => set('date', e.target.value)}
                  id="tx-date"
                />
                {errors.date && <div style={{ color: 'var(--accent-red)', fontSize: 11, marginTop: 4 }}>{errors.date}</div>}
              </div>

              {/* Amount */}
              <div className="form-group">
                <label className="form-label">Amount ($) *</label>
                <input
                  className="form-input"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) => set('amount', e.target.value)}
                  id="tx-amount"
                />
                {errors.amount && <div style={{ color: 'var(--accent-red)', fontSize: 11, marginTop: 4 }}>{errors.amount}</div>}
              </div>
            </div>

            <div className="form-row">
              {/* Category */}
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-input"
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  id="tx-category"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div className="form-group">
                <label className="form-label">Type</label>
                <div className="type-toggle" style={{ height: 36 }}>
                  <button
                    type="button"
                    className={`type-btn ${form.type === 'expense' ? 'active' : ''}`}
                    onClick={() => set('type', 'expense')}
                    id="type-expense"
                  >Expense</button>
                  <button
                    type="button"
                    className={`type-btn ${form.type === 'income' ? 'active' : ''}`}
                    onClick={() => set('type', 'income')}
                    id="type-income"
                  >Income</button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Description *</label>
              <input
                className="form-input"
                type="text"
                placeholder="What was this for?"
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                id="tx-description"
              />
              {errors.description && <div style={{ color: 'var(--accent-red)', fontSize: 11, marginTop: 4 }}>{errors.description}</div>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" id="tx-submit">
              {isEdit ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
