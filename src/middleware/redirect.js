import { resolve } from 'url';
import jwt from 'jsonwebtoken';
import url from '../helpers/url';
import settings from '../../settings.json';

export default (secret, fetcher = r => r.query.state) => (req, res) => {
  const state = fetcher(req);
  const { provider, callbackUrl } = jwt.verify(state, secret);
  const token = jwt.sign({ sub: req.user._id, provider }, secret);
  res.redirect(url(callbackUrl || resolve(settings.domain, '/a/result'), { token }));
};
