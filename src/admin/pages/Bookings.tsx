import { useEffect, useState } from 'react';
import { Trash2, Mail, Phone } from 'lucide-react';
import { api } from '../lib/api';
import { useApiErrorHandler } from '../lib/useApiErrorHandler';
import type { Booking } from '../lib/types';
import Badge from '../components/Badge';

const statuses: Booking['status'][] = ['new', 'contacted', 'in_progress', 'closed'];

export default function Bookings() {
  const handleApiError = useApiErrorHandler();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ bookings: Booking[] }>('/bookings');
      setBookings(res.bookings);
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

  const updateStatus = async (id: number, status: Booking['status']) => {
    const previous = bookings;
    setBookings((bs) => bs.map((b) => (b.id === id ? { ...b, status } : b)));
    try {
      await api.patch(`/bookings/${id}/status`, { status });
    } catch (err) {
      setBookings(previous);
      setError(handleApiError(err));
    }
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this booking request? This cannot be undone.')) return;
    const previous = bookings;
    setBookings((bs) => bs.filter((b) => b.id !== id));
    try {
      await api.delete(`/bookings/${id}`);
    } catch (err) {
      setBookings(previous);
      setError(handleApiError(err));
    }
  };

  const visible = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-mono-label flex items-center gap-2 text-xs uppercase text-blue-500">
            <span className="h-px w-6 bg-blue-500" />
            Bookings
          </div>
          <h1 className="mt-2 font-display text-2xl font-semibold text-text">Project requests</h1>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-text focus:border-blue-500 focus:outline-none"
        >
          <option value="all">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="mt-6 text-sm text-red-500">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-text-soft">Loading…</p>
      ) : visible.length === 0 ? (
        <p className="mt-8 text-sm text-text-soft">No booking requests here yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {visible.map((b) => (
            <div key={b.id} className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-semibold text-text">{b.company_name}</h3>
                  <p className="text-sm text-text-soft">
                    {b.contact_person} &middot; {b.service_needed}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge label={b.status} />
                  <button
                    onClick={() => remove(b.id)}
                    aria-label="Delete booking"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-soft hover:border-red-400 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-text">{b.project_description}</p>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-text-soft">
                <span className="flex items-center gap-1.5">
                  <Mail size={13} /> {b.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone size={13} /> {b.phone}
                </span>
                <span>{b.budget_range}</span>
                <span>Preferred: {new Date(b.preferred_date).toLocaleDateString()}</span>
                <span className="text-text-soft/70">Submitted {new Date(b.created_at).toLocaleDateString()}</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(b.id, s)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                      b.status === s
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-border text-text-soft hover:border-blue-500 hover:text-blue-500'
                    }`}
                  >
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
