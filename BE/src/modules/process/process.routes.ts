import { Router } from 'express';
import { processController } from './process.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

// Public routes
router.get('/', processController.getAll);
router.get('/:category', processController.getByCategory);

// Admin routes
router.post('/', authenticate, processController.create);
router.put('/:processId', authenticate, processController.update);
router.delete('/:processId', authenticate, processController.delete);

export default router;