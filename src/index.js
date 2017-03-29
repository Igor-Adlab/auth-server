import bodyParser from 'body-parser';
import cookies from 'cookie-session';
import Mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import passport from 'passport';

import User from './documents/User';
import redirect from './middleware/redirect';
import auth from './helpers/auth';
import tokenize from './middleware/before-auth';
import callback from './middleware/callback';
import result from './middleware/result';
import strategies from './strategies';
import routes from './routes';

Mongoose.Promise = Promise;
Mongoose.connect(process.env.MONGO_URL);

const app = express();
const uploader = multer({ dest: 'tmp/' });

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((_id, done) => {
  User.findOne({ _id }).exec()
    .then(data => done(null, data))
    .catch(err => done(err, null));
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login' }));

app.use(bodyParser.urlencoded());
app.use(cors());
app.use(morgan());
app.use(express.static('public'));
app.use(cookies({
  name: 'session',
  keys: [process.env.APPLICATION_SECRET],
}));
app.use(session({
  secret: process.env.APPLICATION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.get('/', (req, res) => res.json({ ok: true, auth: req.user }));
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

passport.use(strategies.local);
Object.keys(strategies.oauth).forEach(provider => passport.use(strategies.oauth[provider]));

app.get('/auth/:provider?', tokenize(process.env.APPLICATION_SECRET), auth);

app.get('/a/callback', callback(process.env.APPLICATION_SECRET), redirect(process.env.APPLICATION_SECRET));
app.post('/a/local', tokenize(process.env.APPLICATION_SECRET, 'local'), passport.authenticate('local', { session: false }), redirect(process.env.APPLICATION_SECRET, r => r.token));
app.get('/a/result', result);

app.get('/u/profile', passport.authenticate('jwt', { session: false }), (req, res) => res.json(req.user));

app.listen(process.env.PORT);
