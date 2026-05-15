import { Router } from 'express';
import { clientController } from './client.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.get('/', clientController.getAll);
router.post('/', authenticate, clientController.create);
router.put('/:clientId', authenticate, clientController.update);
router.delete('/:clientId', authenticate, clientController.delete);

export default router;