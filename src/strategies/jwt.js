import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../documents/User';

export default new JwtStrategy({
  //jwtFromRequest: ExtractJwt.fromAuthHeader('access_token'),
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('access_token'),
  secretOrKey: process.env.APPLICATION_SECRET,
}, ({ sub }, done) => User.findOne({ _id: sub })
  .then((user) => {
    user
      ? done(null, user)
      : done(new Error('User not found'), null);
  })
  .catch(err => done(err, null)),
);
