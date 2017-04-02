import { resolve, format } from 'url';
import jwt from 'jsonwebtoken';
import settings from '../../settings.json';

export default (secret, provider) => (req, res, next) => {
  const { redirect_host, protocol } = req.query;
  let { redirect_uri = false } = req.query;
  if (!redirect_uri) {
    redirect_uri = format({ host: redirect_host, protocol });
  }
  req.token = jwt.sign({
    callbackUrl: redirect_uri || settings.callbackUrl || false,
    provider: provider || req.params.provider || req.query.provider,
  }, secret);
  next();
};
