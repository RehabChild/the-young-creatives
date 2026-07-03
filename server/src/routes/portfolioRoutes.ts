import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { validateBody } from '../middleware/validate';
import { requireAdmin } from '../middleware/requireAdmin';
import { portfolioSchema } from '../validation/schemas';
import {
  getPortfolio,
  getPortfolioProject,
  postPortfolioProject,
  putPortfolioProject,
  removePortfolioProject,
} from '../controllers/portfolioController';

const router = Router();

// Public — powers the Portfolio page and its search bar (?search=)
router.get('/', asyncHandler(getPortfolio));
router.get('/:id', asyncHandler(getPortfolioProject));

// Admin
router.post('/', requireAdmin, validateBody(portfolioSchema), asyncHandler(postPortfolioProject));
router.put('/:id', requireAdmin, validateBody(portfolioSchema), asyncHandler(putPortfolioProject));
router.delete('/:id', requireAdmin, asyncHandler(removePortfolioProject));

export default router;
