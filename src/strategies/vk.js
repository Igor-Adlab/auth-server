import { Strategy as VkStrategy } from 'passport-vkontakte';
import settings from '../../settings.json';
import saving from '../helpers/profile-saving';

const transform = profile => ({ ...profile._json, name: profile.displayName, username: `vkontakte|${profile.username}` });

export default new VkStrategy(
  {
    clientID: settings.providers.vkontakte.client,
    clientSecret: settings.providers.vkontakte.secret,
    callbackURL: 'http://localhost:5050/a/callback',
  },
  (accessToken, refreshToken, params, profile, cb) => saving(profile, { provider: 'vkontakte', transform })
    .then(user => cb(null, user))
    .catch(error => cb(error, null)),
);
