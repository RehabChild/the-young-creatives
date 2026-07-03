import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import bookingRoutes from './routes/bookingRoutes';
import contactRoutes from './routes/contactRoutes';
import serviceRoutes from './routes/serviceRoutes';
import portfolioRoutes from './routes/portfolioRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

export function createApp() {
  const app = express();

  const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

  app.use(helmet());
  app.use(cors({ origin: allowedOrigin }));
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('dev'));

  // Rate limit form-submission endpoints to deter spam/abuse (admin GET/PATCH/DELETE calls are unaffected).
  const submissionLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests. Please try again later.' },
  });
  const limitPostOnly: express.RequestHandler = (req, res, next) =>
    req.method === 'POST' ? submissionLimiter(req, res, next) : next();
  app.use('/api/bookings', limitPostOnly);
  app.use('/api/contact', limitPostOnly);

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

  app.use('/api/auth', authRoutes);
  app.use('/api/bookings', bookingRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/portfolio', portfolioRoutes);
  app.use('/api/testimonials', testimonialRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
