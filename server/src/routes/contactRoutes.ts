import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { validateBody } from '../middleware/validate';
import { requireAdmin } from '../middleware/requireAdmin';
import { contactMessageSchema, messageReadSchema } from '../validation/schemas';
import {
  submitMessage,
  getMessages,
  patchMessageRead,
  removeMessage,
} from '../controllers/contactController';

const router = Router();

// Public — submitted from the Contact page
router.post('/', validateBody(contactMessageSchema), asyncHandler(submitMessage));

// Admin — surfaced in the admin dashboard
router.get('/', requireAdmin, asyncHandler(getMessages));
router.patch('/:id/read', requireAdmin, validateBody(messageReadSchema), asyncHandler(patchMessageRead));
router.delete('/:id', requireAdmin, asyncHandler(removeMessage));

export default router;
