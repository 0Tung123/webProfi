import { Router } from 'express';
import { projectController } from './project.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

// Public routes
router.get('/', projectController.getAll);
router.get('/:projectId', projectController.getById);

// Admin routes (protected)
router.post('/', authenticate, projectController.create);
router.put('/:projectId', authenticate, projectController.update);
router.delete('/:projectId', authenticate, projectController.delete);

export default router;