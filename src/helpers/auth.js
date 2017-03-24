import passport from 'passport';
import settings from '../../settings.json';
import * as modificators from '../modificators';

export default (req, res, next) => {
  const { provider } = req.params;
  const { args = {} } = settings.providers[provider] || {};
  const mod = modificators[provider] ? modificators[provider] : () => ({});
  passport.authenticate(provider, Object.assign({
    ...args,
    state: req.token,
  }, mod({ token: req.token })))(req, res, next);
};
