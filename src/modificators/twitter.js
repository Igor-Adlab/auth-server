import { resolve } from 'url';
import url from '../helpers/url';
import settings from '../../settings.json';

export default ({ token }) => ({
  callbackURL: url(resolve(settings.domain, '/a/callback'), { state: token }),
});
