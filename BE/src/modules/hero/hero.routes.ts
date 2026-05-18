import { Router } from 'express';
import { heroController } from './hero.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.get('/', heroController.get);
router.put('/', authenticate, heroController.update);

export default router;
