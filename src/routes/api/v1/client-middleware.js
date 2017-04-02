import settings from '../../../../settings.json';

export default function clientMiddleware(req, res, next) {
  if (!settings.authorized_clients.find(el => el.client === req.query.client)) {
    res.status(404).json({ ok: false, error: 'Client not found' });
    return;
  }

  next();
}
