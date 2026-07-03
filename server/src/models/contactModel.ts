import { pool } from '../db/pool';

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface NewContactMessage {
  name: string;
  email: string;
  message: string;
}

export async function createMessage(data: NewContactMessage): Promise<ContactMessage> {
  const { rows } = await pool.query<ContactMessage>(
    `INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING *`,
    [data.name, data.email, data.message]
  );
  return rows[0]!;
}

export async function listMessages(): Promise<ContactMessage[]> {
  const { rows } = await pool.query<ContactMessage>(`SELECT * FROM contact_messages ORDER BY created_at DESC`);
  return rows;
}

export async function markMessageRead(id: number, isRead: boolean): Promise<ContactMessage | null> {
  const { rows } = await pool.query<ContactMessage>(
    `UPDATE contact_messages SET is_read = $1 WHERE id = $2 RETURNING *`,
    [isRead, id]
  );
  return rows[0] ?? null;
}

export async function deleteMessage(id: number): Promise<boolean> {
  const result = await pool.query(`DELETE FROM contact_messages WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
}
