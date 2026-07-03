import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';

export interface AuthedRequest extends Request {
  admin?: { id: number; email: string };
}

export function requireAdmin(req: AuthedRequest, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next(new AppError('Authentication required.', 401));
  }
  const token = header.slice('Bearer '.length);
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET not configured');
    const payload = jwt.verify(token, secret) as { id: number; email: string };
    req.admin = payload;
    next();
  } catch {
    next(new AppError('Invalid or expired session. Please log in again.', 401));
  }
}
