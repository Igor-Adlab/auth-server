import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User from '../documents/User'

export default new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('access_token'),
    secretOrKey: process.env.APPLICATION_SECRET,
  }, ({ uid, access_token, provider }, done) => {
    console.log("FETCHING: ", provider)
    User.findOne({ _id: uid })
      .then(user => user
        ? done(null, Object.assign(user, { access_token, provider }))
        : done(new Error('User not found'), null))
      .catch(err => done(err, null));
  },
);

