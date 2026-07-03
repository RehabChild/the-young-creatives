import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { validateBody } from '../middleware/validate';
import { requireAdmin } from '../middleware/requireAdmin';
import { bookingSchema, bookingStatusSchema } from '../validation/schemas';
import {
  submitBooking,
  getBookings,
  getBooking,
  patchBookingStatus,
  removeBooking,
} from '../controllers/bookingController';

const router = Router();

// Public — submitted from the Booking page
router.post('/', validateBody(bookingSchema), asyncHandler(submitBooking));

// Admin — surfaced in the admin dashboard
router.get('/', requireAdmin, asyncHandler(getBookings));
router.get('/:id', requireAdmin, asyncHandler(getBooking));
router.patch('/:id/status', requireAdmin, validateBody(bookingStatusSchema), asyncHandler(patchBookingStatus));
router.delete('/:id', requireAdmin, asyncHandler(removeBooking));

export default router;
