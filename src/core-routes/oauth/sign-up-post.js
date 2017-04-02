import User from '../../documents/User';

export default (req, res) => {
  const data = req.body;
  const { client_id, redirect_uri, response_type } = req.query;
  User.register(new User({ ...data }), data.password, (error) => {
    if (error) {
      req.flash('danger', error);
      res.render('oauth/sign-up', { ...req.query, settings: req.settings, providers: req.providers, error });
    } else {
      req.flash('success', 'Account successfully created! Sign in now!');
      res.redirect(
        `/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`,
      );
    }
  });
};
