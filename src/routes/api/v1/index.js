import { Router } from 'express';

import clientMiddleware from './client-middleware';

const router = Router();

router.get('/fetch', clientMiddleware, require('./fetch').default);

export default router;
