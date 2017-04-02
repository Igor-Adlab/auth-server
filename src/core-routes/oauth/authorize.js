import { providers, settings } from '../../../settings.json';

export default (req, res) => {
  console.log(Object.keys(providers))
  res.render('oauth/authorize', { ...req.query, settings, providers: Object.keys(providers) });
};
