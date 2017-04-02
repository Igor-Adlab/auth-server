import { resolve } from 'url';
import { generate } from 'randomstring';
import jwt from 'jsonwebtoken';
import url from '../helpers/url';
import settings from '../../settings.json';

export default (secret, fetcher = r => r.query.state) => (req, res) => {
  const state = fetcher(req);
  const { provider, callbackUrl } = jwt.verify(state, secret);
  const code = jwt.sign({ uid: req.user._id, rid: generate(32), provider, access_token: req.user.access_token || false }, settings.settings.secret);
  res.redirect(url(callbackUrl || resolve(settings.domain, '/a/result'), { code }));
};
