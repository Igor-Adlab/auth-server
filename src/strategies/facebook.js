import FacebookStrategy from 'passport-facebook';
import settings from '../../settings.json';
import saving from '../helpers/profile-saving';

const transform = profile => ({ ...profile._json, name: profile.displayName, username: `facebook|${profile.id}` });

export default new FacebookStrategy(
  {
    clientID: settings.providers.facebook.client,
    clientSecret: settings.providers.facebook.secret,
    callbackURL: 'http://localhost:5050/a/callback',
  },
  (accessToken, refreshToken, params, profile, cb) => {
    saving(profile, { provider: 'facebook', transform })
      .then(user => cb(null, user))
      .catch(error => cb(error, null));
  },
);
