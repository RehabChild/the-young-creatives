import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { validateBody } from '../middleware/validate';
import { loginSchema } from '../validation/schemas';
import { login } from '../controllers/authController';

const router = Router();

router.post('/login', validateBody(loginSchema), asyncHandler(login));

export default router;
