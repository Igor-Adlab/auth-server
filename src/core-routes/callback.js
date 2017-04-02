import { resolve } from 'url';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import format from '../helpers/url';
import settings from '../../settings.json';

export default secret => (req, res, next) => {
  const { state } = req.query;
  const url = resolve(settings.domain, '/a/result');
  const { provider, callbackUrl } = jwt.verify(state, secret);
  passport.authenticate(provider, {
    session: false,
    failureRedirect: format(callbackUrl || url, { state, success: false }),
  })(req, res, next);
};
