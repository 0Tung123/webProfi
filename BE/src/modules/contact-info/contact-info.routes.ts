import { Router } from 'express';
import { contactInfoController } from './contact-info.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

// Public routes
router.get('/', contactInfoController.getAll);
router.get('/type/:type', contactInfoController.getByType);
router.get('/:contactInfoId', contactInfoController.getById);

// Admin routes (protected)
router.post('/', authenticate, contactInfoController.create);
router.put('/:contactInfoId', authenticate, contactInfoController.update);
router.delete('/:contactInfoId', authenticate, contactInfoController.delete);

export default router;