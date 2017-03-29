import { resolve, format } from 'url';
import jwt from 'jsonwebtoken';
import settings from '../../settings.json';

export default (secret, provider) => (req, res, next) => {
  const { redirect_host, protocol } = req.query;
  let { redirect_url = false } = req.query;
  if (!redirect_url) {
    redirect_url = format({ host: redirect_host, protocol });
  }
  req.token = jwt.sign({
    callbackUrl: redirect_url || settings.callbackUrl || false,
    provider: provider || req.params.provider || req.query.provider,
  }, secret);
  next();
};
