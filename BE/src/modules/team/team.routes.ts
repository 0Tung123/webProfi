import { Router } from 'express';
import { teamController } from './team.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

// Public routes
router.get('/', teamController.getAll);
router.get('/:teamMemberId', teamController.getById);

// Admin routes (protected)
router.post('/', authenticate, teamController.create);
router.put('/:teamMemberId', authenticate, teamController.update);
router.delete('/:teamMemberId', authenticate, teamController.delete);

export default router;