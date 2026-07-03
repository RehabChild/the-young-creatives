import { useEffect, useState, type FormEvent } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { api } from '../lib/api';
import { useApiErrorHandler } from '../lib/useApiErrorHandler';
import type { Service } from '../lib/types';
import Modal from '../components/Modal';

interface FormState {
  name: string;
  summary: string;
  detail: string;
  deliverables: string;
  sortOrder: string;
}

const emptyForm: FormState = { name: '', summary: '', detail: '', deliverables: '', sortOrder: '0' };

export default function Services() {
  const handleApiError = useApiErrorHandler();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ services: Service[] }>('/services');
      setServices(res.services);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, sortOrder: String(services.length) });
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({
      name: s.name,
      summary: s.summary,
      detail: s.detail,
      deliverables: s.deliverables.join(', '),
      sortOrder: String(s.sort_order),
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    const payload = {
      name: form.name.trim(),
      summary: form.summary.trim(),
      detail: form.detail.trim(),
      deliverables: form.deliverables
        .split(',')
        .map((d) => d.trim())
        .filter(Boolean),
      sortOrder: Number(form.sortOrder) || 0,
    };
    try {
      if (editing) {
        const res = await api.put<{ service: Service }>(`/services/${editing.id}`, payload);
        setServices((ss) => ss.map((s) => (s.id === editing.id ? res.service : s)));
      } else {
        const res = await api.post<{ service: Service }>('/services', payload);
        setServices((ss) => [...ss, res.service]);
      }
      setModalOpen(false);
    } catch (err) {
      setFormError(handleApiError(err));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this service? This cannot be undone.')) return;
    const previous = services;
    setServices((ss) => ss.filter((s) => s.id !== id));
    try {
      await api.delete(`/services/${id}`);
    } catch (err) {
      setServices(previous);
      setError(handleApiError(err));
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-mono-label flex items-center gap-2 text-xs uppercase text-blue-500">
            <span className="h-px w-6 bg-blue-500" />
            Services
          </div>
          <h1 className="mt-2 font-display text-2xl font-semibold text-text">Manage services</h1>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
        >
          <Plus size={15} /> Add service
        </button>
      </div>

      {error && <p className="mt-6 text-sm text-red-500">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-text-soft">Loading…</p>
      ) : (
        <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
          {services.map((s) => (
            <div key={s.id} className="flex items-start justify-between gap-4 p-6">
              <div>
                <h3 className="font-display text-base font-semibold text-text">{s.name}</h3>
                <p className="mt-1 text-sm text-text-soft">{s.summary}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {s.deliverables.map((d) => (
                    <span key={d} className="rounded-full bg-paper-soft px-2.5 py-1 text-xs text-text-soft dark:bg-ink-soft">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => openEdit(s)}
                  aria-label="Edit service"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-soft hover:border-blue-500 hover:text-blue-500"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => remove(s.id)}
                  aria-label="Delete service"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-soft hover:border-red-400 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} title={editing ? 'Edit service' : 'Add service'} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text">Summary</label>
            <input
              required
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text">Detail</label>
            <textarea
              required
              rows={3}
              value={form.detail}
              onChange={(e) => setForm((f) => ({ ...f, detail: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text">Deliverables (comma-separated)</label>
            <input
              value={form.deliverables}
              onChange={(e) => setForm((f) => ({ ...f, deliverables: e.target.value }))}
              placeholder="Custom design, CMS, SEO setup"
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text">Sort order</label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm((f) => ({ ...f, sortOrder: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text focus:border-blue-500 focus:outline-none"
            />
          </div>

          {formError && <p className="text-sm text-red-500">{formError}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-blue-500 py-3 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-60"
          >
            {saving ? 'Saving…' : editing ? 'Save changes' : 'Add service'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
