import settings from '../../../../settings.json';

export default function fetch(req, res) {
  const data = {};
  data.providers = Object.keys(settings.providers);
  data.domain = settings.domain;
  data.client = settings.client;

  res.json({ ok: true, data });
}
