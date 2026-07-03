import { pool } from '../db/pool';

export interface PortfolioProject {
  id: number;
  name: string;
  category: string;
  description: string;
  tech: string[];
  color: string;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface PortfolioInput {
  name: string;
  category: string;
  description: string;
  tech: string[];
  color?: string;
  imageUrl?: string | null;
  sortOrder?: number;
}

export async function listPortfolio(search?: string): Promise<PortfolioProject[]> {
  if (search) {
    const { rows } = await pool.query<PortfolioProject>(
      `SELECT * FROM portfolio_projects
       WHERE name ILIKE $1
          OR category ILIKE $1
          OR EXISTS (SELECT 1 FROM unnest(tech) t WHERE t ILIKE $1)
       ORDER BY sort_order ASC, id ASC`,
      [`%${search}%`]
    );
    return rows;
  }
  const { rows } = await pool.query<PortfolioProject>(
    `SELECT * FROM portfolio_projects ORDER BY sort_order ASC, id ASC`
  );
  return rows;
}

export async function getPortfolioProject(id: number): Promise<PortfolioProject | null> {
  const { rows } = await pool.query<PortfolioProject>(`SELECT * FROM portfolio_projects WHERE id = $1`, [id]);
  return rows[0] ?? null;
}

export async function createPortfolioProject(data: PortfolioInput): Promise<PortfolioProject> {
  const { rows } = await pool.query<PortfolioProject>(
    `INSERT INTO portfolio_projects (name, category, description, tech, color, image_url, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [data.name, data.category, data.description, data.tech, data.color ?? '#2F4BFF', data.imageUrl ?? null, data.sortOrder ?? 0]
  );
  return rows[0]!;
}

export async function updatePortfolioProject(id: number, data: PortfolioInput): Promise<PortfolioProject | null> {
  const { rows } = await pool.query<PortfolioProject>(
    `UPDATE portfolio_projects
     SET name = $1, category = $2, description = $3, tech = $4, color = $5, image_url = $6, sort_order = $7
     WHERE id = $8 RETURNING *`,
    [data.name, data.category, data.description, data.tech, data.color ?? '#2F4BFF', data.imageUrl ?? null, data.sortOrder ?? 0, id]
  );
  return rows[0] ?? null;
}

export async function deletePortfolioProject(id: number): Promise<boolean> {
  const result = await pool.query(`DELETE FROM portfolio_projects WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
}
