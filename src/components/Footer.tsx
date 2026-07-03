import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500 text-sm font-bold text-white">
                YC
              </span>
              The Young Creatives
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-soft">
              A small studio building websites for businesses, schools, restaurants, and creatives who want
              something that looks and works the way they imagined it.
            </p>
          </div>

          <div>
            <p className="font-mono-label text-xs uppercase text-text-soft">Sitemap</p>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ['/about', 'About Us'],
                ['/services', 'Services'],
                ['/portfolio', 'Portfolio'],
                ['/booking', 'Booking'],
                ['/testimonials', 'Testimonials'],
                ['/contact', 'Contact'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-text-soft transition-colors hover:text-blue-500">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono-label text-xs uppercase text-text-soft">Get in touch</p>
            <ul className="mt-4 space-y-3 text-sm text-text-soft">
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-blue-500" /> hello@theyoungcreatives.studio
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-blue-500" /> +233 20 123 4567
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={15} className="text-blue-500" /> Chat on WhatsApp
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-text-soft md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} The Young Creatives. All rights reserved.</p>
          <p className="font-mono-label">Accra, Ghana &mdash; built with React &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
