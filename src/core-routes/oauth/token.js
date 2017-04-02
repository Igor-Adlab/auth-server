import jwt from 'jsonwebtoken';
import { settings } from '../../../settings.json';

export default secret => (req, res) => {
  const { uid, provider, access_token } = jwt.verify(req.body.code, settings.secret);
  res.json({
    access_token: jwt.sign({ uid, provider, access_token }, secret),
  });
};
