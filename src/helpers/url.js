import { URL } from 'url';

export default (base, params = {}) => {
  const url = new URL(base);
  Object.keys(params).forEach(key => url.searchParams.set(key, params[key]));
  return url.toString();
};
