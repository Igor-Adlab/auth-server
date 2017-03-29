import settings from '../../../../settings.json';

export default function clientMiddleware(req, res, next) {
  if (!settings.authorized_clients.includes(req.query.client)) {
    res.status(404).json({ ok: false, error: 'Client not found' });
    return;
  }

  next();
}
