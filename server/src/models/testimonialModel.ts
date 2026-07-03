import { pool } from '../db/pool';

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  quote: string;
  rating: number;
  is_published: boolean;
  created_at: string;
}

export interface TestimonialInput {
  name: string;
  company: string;
  quote: string;
  rating: number;
  isPublished?: boolean;
}

export async function listTestimonials(publishedOnly = true): Promise<Testimonial[]> {
  if (publishedOnly) {
    const { rows } = await pool.query<Testimonial>(
      `SELECT * FROM testimonials WHERE is_published = true ORDER BY created_at DESC`
    );
    return rows;
  }
  const { rows } = await pool.query<Testimonial>(`SELECT * FROM testimonials ORDER BY created_at DESC`);
  return rows;
}

export async function createTestimonial(data: TestimonialInput): Promise<Testimonial> {
  const { rows } = await pool.query<Testimonial>(
    `INSERT INTO testimonials (name, company, quote, rating, is_published) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [data.name, data.company, data.quote, data.rating, data.isPublished ?? true]
  );
  return rows[0]!;
}

export async function updateTestimonial(id: number, data: TestimonialInput): Promise<Testimonial | null> {
  const { rows } = await pool.query<Testimonial>(
    `UPDATE testimonials SET name = $1, company = $2, quote = $3, rating = $4, is_published = $5 WHERE id = $6 RETURNING *`,
    [data.name, data.company, data.quote, data.rating, data.isPublished ?? true, id]
  );
  return rows[0] ?? null;
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  const result = await pool.query(`DELETE FROM testimonials WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
}
