# The Young Creatives — Frontend Scaffold

A full React + TypeScript + Tailwind CSS frontend for The Young Creatives web design studio.

## What's included

- **Pages**: Home, About, Services, Portfolio (with search + detail modal), Booking (validated form), Testimonials, Contact (validated form)
- **Light/dark mode** with system-preference detection and localStorage persistence
- **Responsive** layout, mobile nav
- **Scroll-reveal animations** via Framer Motion, smooth scrolling, `prefers-reduced-motion` respected
- **Form validation** on Booking and Contact forms (client-side, ready to wire to an API)
- Design tokens (colors, type, spacing) centralized in `src/index.css` using Tailwind v4's `@theme`
- Sample content in `src/data/` (services, portfolio projects, team, testimonials) — swap for real content or fetch from your API

## Design system

- **Palette**: ink/charcoal, white/paper, and a signature blue (`#2F4BFF`), per the brief
- **Type**: Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (labels/eyebrows)
- **Signature motif**: blueprint-style corner crop marks and mono-font annotations, referencing the studio's own design-tool workflow (Figma inspect mode)

## Admin dashboard

A full admin dashboard now lives at `/admin` (source in `src/admin/`):

- `/admin/login` — sign in with the credentials from `server/README.md` (created by `npm run db:seed`)
- `/admin` — overview with counts (new bookings, unread messages, content totals)
- `/admin/bookings` — view project requests, filter by status, update status, delete
- `/admin/messages` — read contact messages, mark read/unread, delete
- `/admin/services`, `/admin/portfolio`, `/admin/testimonials` — full add/edit/delete for site content; testimonials can be published/unpublished without deleting them

Copy `.env.example` to `.env` and set `VITE_API_URL` to point at your running backend (defaults to `http://localhost:4000/api`). The dashboard is a normal route inside this app — no separate build step — but it does require the backend in `server/` to be running.

## Getting started

```bash
npm install
npm run dev      # start local dev server
npm run build    # production build
```

## Next steps

The backend (`server/`) and admin dashboard (`/admin`) are both built and tested. What's left:

1. Point `Booking.tsx`'s `handleSubmit` and `Contact.tsx`'s `handleSubmit` at the live API (`POST /api/bookings`, `POST /api/contact`) instead of only updating local state.
2. Replace the static arrays in `src/data/` with API calls (`GET /api/services`, `GET /api/portfolio`, `GET /api/testimonials`) so content edited in the admin dashboard actually shows up on the public site.
3. Deploy: host the backend (with a managed Postgres instance) and the frontend separately, and set `VITE_API_URL` / `CLIENT_ORIGIN` to the real URLs.
