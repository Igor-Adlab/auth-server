export default (req, res) => {
  res.render('oauth/sign-up', { ...req.query, settings: req.settings, providers: req.providers });
};
