import { pool } from '../db/pool';

export interface Service {
  id: number;
  sort_order: number;
  name: string;
  summary: string;
  detail: string;
  deliverables: string[];
  created_at: string;
}

export interface ServiceInput {
  sortOrder?: number;
  name: string;
  summary: string;
  detail: string;
  deliverables: string[];
}

export async function listServices(): Promise<Service[]> {
  const { rows } = await pool.query<Service>(`SELECT * FROM services ORDER BY sort_order ASC, id ASC`);
  return rows;
}

export async function createService(data: ServiceInput): Promise<Service> {
  const { rows } = await pool.query<Service>(
    `INSERT INTO services (sort_order, name, summary, detail, deliverables) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [data.sortOrder ?? 0, data.name, data.summary, data.detail, data.deliverables]
  );
  return rows[0]!;
}

export async function updateService(id: number, data: ServiceInput): Promise<Service | null> {
  const { rows } = await pool.query<Service>(
    `UPDATE services SET sort_order = $1, name = $2, summary = $3, detail = $4, deliverables = $5 WHERE id = $6 RETURNING *`,
    [data.sortOrder ?? 0, data.name, data.summary, data.detail, data.deliverables, id]
  );
  return rows[0] ?? null;
}

export async function deleteService(id: number): Promise<boolean> {
  const result = await pool.query(`DELETE FROM services WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
}
