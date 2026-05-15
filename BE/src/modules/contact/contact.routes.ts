import { Router } from 'express';
import { contactController } from './contact.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

// Public: Submit contact form
router.post('/', contactController.submit);

// Admin: Get all submissions (should add auth protection)
router.get('/', authenticate, contactController.getAll);

// Admin: Update/Delete
router.put('/:contactId', authenticate, contactController.update);
router.delete('/:contactId', authenticate, contactController.delete);

export default router;