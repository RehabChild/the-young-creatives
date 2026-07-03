import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findAdminByEmail } from '../models/adminModel';
import { AppError } from '../middleware/errorHandler';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };

  const admin = await findAdminByEmail(email);
  if (!admin) throw new AppError('Invalid email or password.', 401);

  const matches = await bcrypt.compare(password, admin.password_hash);
  if (!matches) throw new AppError('Invalid email or password.', 401);

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new AppError('Server misconfiguration: missing JWT secret.', 500);

  const token = jwt.sign({ id: admin.id, email: admin.email }, secret, { expiresIn: '12h' });
  res.json({ token, admin: { id: admin.id, name: admin.name, email: admin.email } });
}
