import { format, parse } from 'url';
import querystring from 'querystring';

export default (base, params = {}) => {
  const search = querystring.stringify(params);
  return format({ ...parse(base), search }).toString();
};
