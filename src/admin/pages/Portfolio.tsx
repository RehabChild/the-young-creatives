import { useEffect, useState, type FormEvent } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { api } from '../lib/api';
import { useApiErrorHandler } from '../lib/useApiErrorHandler';
import type { PortfolioProject } from '../lib/types';
import Modal from '../components/Modal';

interface FormState {
  name: string;
  category: string;
  description: string;
  tech: string;
  color: string;
  imageUrl: string;
  sortOrder: string;
}

const emptyForm: FormState = {
  name: '',
  category: '',
  description: '',
  tech: '',
  color: '#2F4BFF',
  imageUrl: '',
  sortOrder: '0',
};

export default function Portfolio() {
  const handleApiError = useApiErrorHandler();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PortfolioProject | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ projects: PortfolioProject[] }>('/portfolio');
      setProjects(res.projects);
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
    setForm({ ...emptyForm, sortOrder: String(projects.length) });
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (p: PortfolioProject) => {
    setEditing(p);
    setForm({
      name: p.name,
      category: p.category,
      description: p.description,
      tech: p.tech.join(', '),
      color: p.color,
      imageUrl: p.image_url ?? '',
      sortOrder: String(p.sort_order),
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
      category: form.category.trim(),
      description: form.description.trim(),
      tech: form.tech
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      color: form.color.trim() || '#2F4BFF',
      imageUrl: form.imageUrl.trim() || null,
      sortOrder: Number(form.sortOrder) || 0,
    };
    try {
      if (editing) {
        const res = await api.put<{ project: PortfolioProject }>(`/portfolio/${editing.id}`, payload);
        setProjects((ps) => ps.map((p) => (p.id === editing.id ? res.project : p)));
      } else {
        const res = await api.post<{ project: PortfolioProject }>('/portfolio', payload);
        setProjects((ps) => [...ps, res.project]);
      }
      setModalOpen(false);
    } catch (err) {
      setFormError(handleApiError(err));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    const previous = projects;
    setProjects((ps) => ps.filter((p) => p.id !== id));
    try {
      await api.delete(`/portfolio/${id}`);
    } catch (err) {
      setProjects(previous);
      setError(handleApiError(err));
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-mono-label flex items-center gap-2 text-xs uppercase text-blue-500">
            <span className="h-px w-6 bg-blue-500" />
            Portfolio
          </div>
          <h1 className="mt-2 font-display text-2xl font-semibold text-text">Manage projects</h1>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
        >
          <Plus size={15} /> Add project
        </button>
      </div>

      {error && <p className="mt-6 text-sm text-red-500">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-text-soft">Loading…</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
              <div
                className="flex h-28 items-center justify-center font-display text-lg font-semibold text-white/90"
                style={{ backgroundColor: p.color }}
              >
                {p.name}
              </div>
              <div className="p-5">
                <p className="font-mono-label text-xs uppercase text-blue-500">{p.category}</p>
                <h3 className="mt-1 font-display text-base font-semibold text-text">{p.name}</h3>
                <p className="mt-1.5 text-sm text-text-soft">{p.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {p.tech.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full bg-paper-soft px-2 py-0.5 text-xs text-text-soft dark:bg-ink-soft">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      aria-label="Edit project"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text-soft hover:border-blue-500 hover:text-blue-500"
                    >
                      <Pencil size={12} />
                    </button>
                    <button
                      onClick={() => remove(p.id)}
                      aria-label="Delete project"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text-soft hover:border-red-400 hover:text-red-500"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} title={editing ? 'Edit project' : 'Add project'} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
              <label className="text-sm font-medium text-text">Category</label>
              <input
                required
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="E-commerce"
                className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-text">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text">Technologies (comma-separated)</label>
            <input
              value={form.tech}
              onChange={(e) => setForm((f) => ({ ...f, tech: e.target.value }))}
              placeholder="React, Tailwind CSS, Node.js"
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-text">Accent color</label>
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                className="mt-1.5 h-11 w-full rounded-xl border border-border bg-surface px-2"
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
          </div>
          <div>
            <label className="text-sm font-medium text-text">Image URL (optional)</label>
            <input
              value={form.imageUrl}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
              placeholder="https://…"
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text focus:border-blue-500 focus:outline-none"
            />
          </div>

          {formError && <p className="text-sm text-red-500">{formError}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-blue-500 py-3 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-60"
          >
            {saving ? 'Saving…' : editing ? 'Save changes' : 'Add project'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
