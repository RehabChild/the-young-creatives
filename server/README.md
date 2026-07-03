# The Young Creatives — Backend API

Express + TypeScript + PostgreSQL API powering the booking form, contact form, and admin dashboard.

## Folder structure

```
server/
├── src/
│   ├── routes/         Express routers (one per resource)
│   ├── controllers/    Request handlers — call models, shape responses
│   ├── models/         Database access (raw SQL via `pg`)
│   ├── middleware/      Auth, validation, error handling
│   ├── validation/      Zod schemas for request bodies
│   ├── db/              Connection pool, schema.sql, seed script
│   ├── app.ts            Express app setup (middleware, routes)
│   └── index.ts          Server entry point
├── .env.example
└── package.json
```

## 1. Prerequisites

- Node.js 18+
- A PostgreSQL database (local install, or a free hosted one — Supabase, Railway, Neon all work)

## 2. Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env`:
- `DATABASE_URL` — your PostgreSQL connection string
- `JWT_SECRET` — any long random string (used to sign admin login sessions)
- `CLIENT_ORIGIN` — the URL your frontend runs on (`http://localhost:5173` in dev)
- `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — the first admin login the seed script will create

## 3. Create the database tables and sample data

```bash
npm run db:schema   # creates all tables
npm run db:seed     # inserts sample services, portfolio projects, testimonials, and one admin user
```

The seed script prints the admin email/password it created — **log in and treat that as temporary**; there's no "change password" endpoint yet, so for now you'd update it directly in the database or via a future admin-settings feature.

## 4. Run it

```bash
npm run dev     # starts on http://localhost:4000 with auto-reload
```

Check it's alive: `curl http://localhost:4000/api/health` → `{"status":"ok"}`

For production: `npm run build` then `npm start`.

## API reference

All routes are prefixed with `/api`.

### Public

| Method | Route | Purpose |
|---|---|---|
| POST | `/bookings` | Submit the Booking form |
| POST | `/contact` | Submit the Contact form |
| GET | `/services` | List services (Services page) |
| GET | `/portfolio?search=` | List/search portfolio projects |
| GET | `/portfolio/:id` | Single project detail |
| GET | `/testimonials` | List published testimonials |
| POST | `/auth/login` | Admin login → returns a JWT |

### Admin (require `Authorization: Bearer <token>`)

| Method | Route | Purpose |
|---|---|---|
| GET | `/bookings` | List all booking requests (`?status=` to filter) |
| PATCH | `/bookings/:id/status` | Update a booking's status |
| DELETE | `/bookings/:id` | Delete a booking |
| GET | `/contact` | List contact messages |
| PATCH | `/contact/:id/read` | Mark a message read/unread |
| DELETE | `/contact/:id` | Delete a message |
| POST/PUT/DELETE | `/services`, `/services/:id` | Manage services |
| POST/PUT/DELETE | `/portfolio`, `/portfolio/:id` | Manage portfolio projects |
| GET | `/testimonials/all` | List all testimonials, including unpublished |
| POST/PUT/DELETE | `/testimonials`, `/testimonials/:id` | Manage testimonials |

To call an admin route, first `POST /api/auth/login` with `{ "email": ..., "password": ... }`, then send the returned `token` as `Authorization: Bearer <token>` on subsequent requests.

## Connecting the frontend

In the `client` project, submit the Booking and Contact forms to:
```
POST http://localhost:4000/api/bookings
POST http://localhost:4000/api/contact
```
and fetch dynamic content from `/api/services`, `/api/portfolio`, `/api/testimonials` instead of the static arrays in `src/data/`.

## Notes on what's simplified here

- **Email notifications** aren't wired up yet (the brief listed this as "if desired later"). The cleanest place to add it is inside `bookingController.submitBooking` and `contactController.submitMessage`, using a transactional email provider (Resend, Postmark, SES).
- **No admin UI yet** — this is the API the admin dashboard will call. Building that dashboard (a small authenticated React app or a section of the existing frontend) is the natural next step.
- **Rate limiting** is applied to the two public POST endpoints (20 requests / 15 min per IP) to deter spam.
