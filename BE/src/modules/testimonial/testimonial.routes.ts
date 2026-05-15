import { Router } from 'express';
import { testimonialController } from './testimonial.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.get('/', testimonialController.getAll);
router.post('/', authenticate, testimonialController.create);
router.put('/:testimonialId', authenticate, testimonialController.update);
router.delete('/:testimonialId', authenticate, testimonialController.delete);

export default router;