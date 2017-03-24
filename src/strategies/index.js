import facebook from './facebook';
import twitter from './twitter';
import google from './google';
import vk from './vk';
import jwt from './jwt';
import local from './local';

export default {
  local, oauth: { facebook, twitter, google, vk, jwt },
};
