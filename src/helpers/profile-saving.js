import User from '../documents/User';

export default (profile, { provider, transform }) => new Promise((resolve, reject) => {
  User.findOne({ connects: { $elemMatch: { provider, id: profile.id } } }).exec()
    .then((data) => {
      if (!data) {
        const user = transform(profile);
        User.create({
          username: user.username,
          name: user.name,
          connects: [{ provider, id: profile.id, profile: user }],
        })
          .then(user => resolve(user))
          .catch(err => reject(err));
      } else {
        resolve(data);
      }
    })
    .catch(err => reject(err));
});
