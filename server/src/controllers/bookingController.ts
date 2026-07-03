import type { Request, Response } from 'express';
import * as BookingModel from '../models/bookingModel';
import { AppError } from '../middleware/errorHandler';

export async function submitBooking(req: Request, res: Response) {
  const booking = await BookingModel.createBooking(req.body);
  res.status(201).json({ booking });
  // Optional next step: send an email notification here (see README "Email notifications").
}

export async function getBookings(req: Request, res: Response) {
  const status = typeof req.query.status === 'string' ? req.query.status : undefined;
  const bookings = await BookingModel.listBookings(status);
  res.json({ bookings });
}

export async function getBooking(req: Request, res: Response) {
  const id = Number(req.params.id);
  const booking = await BookingModel.getBookingById(id);
  if (!booking) throw new AppError('Booking not found.', 404);
  res.json({ booking });
}

export async function patchBookingStatus(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { status } = req.body as { status: string };
  const allowed = ['new', 'contacted', 'in_progress', 'closed'];
  if (!allowed.includes(status)) throw new AppError(`Status must be one of: ${allowed.join(', ')}`, 422);

  const booking = await BookingModel.updateBookingStatus(id, status as never);
  if (!booking) throw new AppError('Booking not found.', 404);
  res.json({ booking });
}

export async function removeBooking(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deleted = await BookingModel.deleteBooking(id);
  if (!deleted) throw new AppError('Booking not found.', 404);
  res.status(204).send();
}
