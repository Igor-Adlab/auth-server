import { Router } from 'express';
import { settings, providers } from '../../../settings.json';

const router = Router();
router.use((req, res, next) => {
  req.settings = settings;
  req.providers = Object.keys(providers);
  next();
});
router.get('/authorize', require('./authorize').default);
router.get('/sign-up', require('./sign-up').default);
router.post('/sign-up', require('./sign-up-post').default);
router.post('/token', require('./token').default(process.env.APPLICATION_SECRET));

export default router;
