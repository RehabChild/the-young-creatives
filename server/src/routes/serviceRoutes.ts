import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { validateBody } from '../middleware/validate';
import { requireAdmin } from '../middleware/requireAdmin';
import { serviceSchema } from '../validation/schemas';
import { getServices, postService, putService, removeService } from '../controllers/serviceController';

const router = Router();

// Public — powers the Services page
router.get('/', asyncHandler(getServices));

// Admin
router.post('/', requireAdmin, validateBody(serviceSchema), asyncHandler(postService));
router.put('/:id', requireAdmin, validateBody(serviceSchema), asyncHandler(putService));
router.delete('/:id', requireAdmin, asyncHandler(removeService));

export default router;
