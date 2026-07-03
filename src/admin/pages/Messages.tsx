import { useEffect, useState } from 'react';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import { api } from '../lib/api';
import { useApiErrorHandler } from '../lib/useApiErrorHandler';
import type { ContactMessage } from '../lib/types';

export default function Messages() {
  const handleApiError = useApiErrorHandler();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ messages: ContactMessage[] }>('/contact');
      setMessages(res.messages);
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

  const toggleRead = async (id: number, isRead: boolean) => {
    const previous = messages;
    setMessages((ms) => ms.map((m) => (m.id === id ? { ...m, is_read: isRead } : m)));
    try {
      await api.patch(`/contact/${id}/read`, { isRead });
    } catch (err) {
      setMessages(previous);
      setError(handleApiError(err));
    }
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this message? This cannot be undone.')) return;
    const previous = messages;
    setMessages((ms) => ms.filter((m) => m.id !== id));
    try {
      await api.delete(`/contact/${id}`);
    } catch (err) {
      setMessages(previous);
      setError(handleApiError(err));
    }
  };

  return (
    <div>
      <div className="font-mono-label flex items-center gap-2 text-xs uppercase text-blue-500">
        <span className="h-px w-6 bg-blue-500" />
        Messages
      </div>
      <h1 className="mt-2 font-display text-2xl font-semibold text-text">Contact messages</h1>

      {error && <p className="mt-6 text-sm text-red-500">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-text-soft">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="mt-8 text-sm text-text-soft">No messages yet.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl border p-6 ${
                m.is_read ? 'border-border bg-surface' : 'border-blue-500/40 bg-blue-50/50 dark:bg-blue-900/10'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-base font-semibold text-text">{m.name}</h3>
                  <p className="text-sm text-text-soft">{m.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleRead(m.id, !m.is_read)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-soft hover:border-blue-500 hover:text-blue-500"
                    aria-label={m.is_read ? 'Mark unread' : 'Mark read'}
                  >
                    {m.is_read ? <Mail size={14} /> : <MailOpen size={14} />}
                  </button>
                  <button
                    onClick={() => remove(m.id)}
                    aria-label="Delete message"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-soft hover:border-red-400 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text">{m.message}</p>
              <p className="mt-3 text-xs text-text-soft">{new Date(m.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
