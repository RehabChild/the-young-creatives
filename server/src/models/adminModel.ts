import { pool } from '../db/pool';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: string;
}

export async function findAdminByEmail(email: string): Promise<AdminUser | null> {
  const { rows } = await pool.query<AdminUser>(`SELECT * FROM admin_users WHERE email = $1`, [email]);
  return rows[0] ?? null;
}
