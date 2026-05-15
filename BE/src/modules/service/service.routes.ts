import { Router } from 'express';
import { serviceController } from './service.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.get('/', serviceController.getAll);
router.post('/', authenticate, serviceController.create);
router.put('/:serviceId', authenticate, serviceController.update);
router.delete('/:serviceId', authenticate, serviceController.delete);

export default router;