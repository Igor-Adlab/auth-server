import TwitterStrategy from 'passport-twitter';
import settings from '../../settings.json';
import saving from '../helpers/profile-saving';

const transform = profile => ({ ...profile._json, name: profile.displayName, username: `twitter|${profile.username}` });

export default new TwitterStrategy(
  {
    consumerKey: settings.providers.twitter.client,
    consumerSecret: settings.providers.twitter.secret,
    callbackURL: 'http://localhost:5050/a/callback',
  },
  (accessToken, refreshToken, params, profile, cb) =>
    saving(profile, { provider: 'twitter', transform })
      .then(user => cb(null, Object.assign(user, { access_token: accessToken })))
      .catch(error => cb(error, null)),
);
