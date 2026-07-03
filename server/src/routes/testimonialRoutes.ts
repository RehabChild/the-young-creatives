import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { validateBody } from '../middleware/validate';
import { requireAdmin } from '../middleware/requireAdmin';
import { testimonialSchema } from '../validation/schemas';
import {
  getTestimonials,
  getAllTestimonialsAdmin,
  postTestimonial,
  putTestimonial,
  removeTestimonial,
} from '../controllers/testimonialController';

const router = Router();

// Public — powers the Testimonials page (published only)
router.get('/', asyncHandler(getTestimonials));

// Admin
router.get('/all', requireAdmin, asyncHandler(getAllTestimonialsAdmin));
router.post('/', requireAdmin, validateBody(testimonialSchema), asyncHandler(postTestimonial));
router.put('/:id', requireAdmin, validateBody(testimonialSchema), asyncHandler(putTestimonial));
router.delete('/:id', requireAdmin, asyncHandler(removeTestimonial));

export default router;
