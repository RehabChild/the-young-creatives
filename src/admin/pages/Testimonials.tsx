import { useEffect, useState, type FormEvent } from 'react';
import { Plus, Pencil, Trash2, Star, Eye, EyeOff } from 'lucide-react';
import { api } from '../lib/api';
import { useApiErrorHandler } from '../lib/useApiErrorHandler';
import type { Testimonial } from '../lib/types';
import Modal from '../components/Modal';

interface FormState {
  name: string;
  company: string;
  quote: string;
  rating: string;
  isPublished: boolean;
}

const emptyForm: FormState = { name: '', company: '', quote: '', rating: '5', isPublished: true };

export default function Testimonials() {
  const handleApiError = useApiErrorHandler();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ testimonials: Testimonial[] }>('/testimonials/all');
      setTestimonials(res.testimonials);
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
    setForm(emptyForm);
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ name: t.name, company: t.company, quote: t.quote, rating: String(t.rating), isPublished: t.is_published });
    setFormError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    const payload = {
      name: form.name.trim(),
      company: form.company.trim(),
      quote: form.quote.trim(),
      rating: Number(form.rating) || 5,
      isPublished: form.isPublished,
    };
    try {
      if (editing) {
        const res = await api.put<{ testimonial: Testimonial }>(`/testimonials/${editing.id}`, payload);
        setTestimonials((ts) => ts.map((t) => (t.id === editing.id ? res.testimonial : t)));
      } else {
        const res = await api.post<{ testimonial: Testimonial }>('/testimonials', payload);
        setTestimonials((ts) => [res.testimonial, ...ts]);
      }
      setModalOpen(false);
    } catch (err) {
      setFormError(handleApiError(err));
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (t: Testimonial) => {
    const previous = testimonials;
    setTestimonials((ts) => ts.map((x) => (x.id === t.id ? { ...x, is_published: !x.is_published } : x)));
    try {
      await api.put(`/testimonials/${t.id}`, {
        name: t.name,
        company: t.company,
        quote: t.quote,
        rating: t.rating,
        isPublished: !t.is_published,
      });
    } catch (err) {
      setTestimonials(previous);
      setError(handleApiError(err));
    }
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this testimonial? This cannot be undone.')) return;
    const previous = testimonials;
    setTestimonials((ts) => ts.filter((t) => t.id !== id));
    try {
      await api.delete(`/testimonials/${id}`);
    } catch (err) {
      setTestimonials(previous);
      setError(handleApiError(err));
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-mono-label flex items-center gap-2 text-xs uppercase text-blue-500">
            <span className="h-px w-6 bg-blue-500" />
            Testimonials
          </div>
          <h1 className="mt-2 font-display text-2xl font-semibold text-text">Manage testimonials</h1>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
        >
          <Plus size={15} /> Add testimonial
        </button>
      </div>

      {error && <p className="mt-6 text-sm text-red-500">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-text-soft">Loading…</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.id} className={`rounded-2xl border p-6 ${t.is_published ? 'border-border bg-surface' : 'border-dashed border-border bg-surface opacity-70'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-1 text-blue-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => togglePublished(t)}
                    aria-label={t.is_published ? 'Unpublish' : 'Publish'}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text-soft hover:border-blue-500 hover:text-blue-500"
                  >
                    {t.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
                  </button>
                  <button
                    onClick={() => openEdit(t)}
                    aria-label="Edit testimonial"
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text-soft hover:border-blue-500 hover:text-blue-500"
                  >
                    <Pencil size={12} />
                  </button>
                  <button
                    onClick={() => remove(t.id)}
                    aria-label="Delete testimonial"
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text-soft hover:border-red-400 hover:text-red-500"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-sm font-semibold text-text">
                {t.name} <span className="font-normal text-text-soft">&middot; {t.company}</span>
              </p>
              {!t.is_published && <p className="mt-2 text-xs text-text-soft">Not shown on the public site</p>}
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} title={editing ? 'Edit testimonial' : 'Add testimonial'} onClose={() => setModalOpen(false)}>
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
              <label className="text-sm font-medium text-text">Company</label>
              <input
                required
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-text">Quote</label>
            <textarea
              required
              rows={3}
              value={form.quote}
              onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-text">Rating</label>
              <select
                value={form.rating}
                onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text focus:border-blue-500 focus:outline-none"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} star{r !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end pb-2.5">
              <label className="flex items-center gap-2 text-sm text-text">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
                  className="h-4 w-4 rounded border-border accent-blue-500"
                />
                Published on site
              </label>
            </div>
          </div>

          {formError && <p className="text-sm text-red-500">{formError}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-blue-500 py-3 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-60"
          >
            {saving ? 'Saving…' : editing ? 'Save changes' : 'Add testimonial'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
