import { pool } from '../db/pool';

export interface Booking {
  id: number;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  service_needed: string;
  project_description: string;
  budget_range: string;
  preferred_date: string;
  status: 'new' | 'contacted' | 'in_progress' | 'closed';
  created_at: string;
}

export interface NewBooking {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  projectDescription: string;
  budgetRange: string;
  preferredDate: string;
}

export async function createBooking(data: NewBooking): Promise<Booking> {
  const { rows } = await pool.query<Booking>(
    `INSERT INTO bookings
      (company_name, contact_person, email, phone, service_needed, project_description, budget_range, preferred_date)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      data.companyName,
      data.contactPerson,
      data.email,
      data.phone,
      data.serviceNeeded,
      data.projectDescription,
      data.budgetRange,
      data.preferredDate,
    ]
  );
  return rows[0]!;
}

export async function listBookings(status?: string): Promise<Booking[]> {
  if (status) {
    const { rows } = await pool.query<Booking>(
      `SELECT * FROM bookings WHERE status = $1 ORDER BY created_at DESC`,
      [status]
    );
    return rows;
  }
  const { rows } = await pool.query<Booking>(`SELECT * FROM bookings ORDER BY created_at DESC`);
  return rows;
}

export async function getBookingById(id: number): Promise<Booking | null> {
  const { rows } = await pool.query<Booking>(`SELECT * FROM bookings WHERE id = $1`, [id]);
  return rows[0] ?? null;
}

export async function updateBookingStatus(id: number, status: Booking['status']): Promise<Booking | null> {
  const { rows } = await pool.query<Booking>(
    `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return rows[0] ?? null;
}

export async function deleteBooking(id: number): Promise<boolean> {
  const result = await pool.query(`DELETE FROM bookings WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
}
