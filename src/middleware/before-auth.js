import jwt from 'jsonwebtoken';
import settings from '../../settings.json';

export default (secret, provider) => (req, res, next) => {
  const { redirect_url } = req.query;
  req.token = jwt.sign({
    callbackUrl: redirect_url || settings.callbackUrl || false,
    provider: provider || req.params.provider,
  }, secret);
  next();
};
