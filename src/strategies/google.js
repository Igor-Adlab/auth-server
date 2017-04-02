import GoogleOauthStrategy from 'passport-google-oauth20';
import settings from '../../settings.json';
import saving from '../helpers/profile-saving';

const transform = profile => ({ ...profile._json, name: profile.displayName, username: `google|${profile.id}` })

export default new GoogleOauthStrategy(
  {
    clientID: settings.providers.google.client,
    clientSecret: settings.providers.google.secret,
    callbackURL: 'http://localhost:5050/a/callback',
  },
  (accessToken, refreshToken, params, profile, cb) =>
    saving(profile, { provider: 'google', transform })
    .then(user => cb(null, Object.assign(user, { access_token: accessToken })))
    .catch(error => cb(error, null)),
);
