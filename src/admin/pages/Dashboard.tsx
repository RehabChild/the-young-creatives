import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Mail, Wrench, FolderKanban, Star, ArrowRight } from 'lucide-react';
import { api } from '../lib/api';
import { useApiErrorHandler } from '../lib/useApiErrorHandler';
import type { Booking, ContactMessage, Service, PortfolioProject, Testimonial } from '../lib/types';

export default function Dashboard() {
  const handleApiError = useApiErrorHandler();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [counts, setCounts] = useState({
    newBookings: 0,
    unreadMessages: 0,
    services: 0,
    projects: 0,
    testimonials: 0,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [bookings, messages, services, projects, testimonials] = await Promise.all([
          api.get<{ bookings: Booking[] }>('/bookings'),
          api.get<{ messages: ContactMessage[] }>('/contact'),
          api.get<{ services: Service[] }>('/services'),
          api.get<{ projects: PortfolioProject[] }>('/portfolio'),
          api.get<{ testimonials: Testimonial[] }>('/testimonials/all'),
        ]);
        if (cancelled) return;
        setCounts({
          newBookings: bookings.bookings.filter((b) => b.status === 'new').length,
          unreadMessages: messages.messages.filter((m) => !m.is_read).length,
          services: services.services.length,
          projects: projects.projects.length,
          testimonials: testimonials.testimonials.length,
        });
      } catch (err) {
        if (!cancelled) setError(handleApiError(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = [
    { to: '/admin/bookings', icon: CalendarCheck, label: 'New booking requests', value: counts.newBookings, highlight: counts.newBookings > 0 },
    { to: '/admin/messages', icon: Mail, label: 'Unread messages', value: counts.unreadMessages, highlight: counts.unreadMessages > 0 },
    { to: '/admin/services', icon: Wrench, label: 'Services listed', value: counts.services },
    { to: '/admin/portfolio', icon: FolderKanban, label: 'Portfolio projects', value: counts.projects },
    { to: '/admin/testimonials', icon: Star, label: 'Testimonials', value: counts.testimonials },
  ];

  return (
    <div>
      <div className="font-mono-label flex items-center gap-2 text-xs uppercase text-blue-500">
        <span className="h-px w-6 bg-blue-500" />
        Overview
      </div>
      <h1 className="mt-2 font-display text-2xl font-semibold text-text">Welcome back</h1>
      <p className="mt-1 text-sm text-text-soft">Here's what's happening across the site.</p>

      {error && <p className="mt-6 text-sm text-red-500">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-text-soft">Loading…</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-blue-500"
            >
              <div className="flex items-center justify-between">
                <card.icon size={20} className="text-blue-500" />
                {card.highlight && <span className="h-2 w-2 rounded-full bg-blue-500" />}
              </div>
              <p className="mt-4 font-display text-3xl font-semibold text-text">{card.value}</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-text-soft">
                {card.label}
                <ArrowRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
