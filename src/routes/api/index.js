import { Router } from 'express';

const router = Router();

router.use('/v1', require('./v1').default);

export default router;
