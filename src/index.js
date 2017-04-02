import jwt from 'jsonwebtoken';
import path from 'path';
import bodyParser from 'body-parser';
import cookies from 'cookie-session';
import Mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import passport from 'passport';
import flash from 'flash';

import User from './documents/User';
import redirect from './core-routes/redirect';
import auth from './helpers/auth';
import tokenize from './core-routes/before-auth';
import callback from './core-routes/callback';
import result from './core-routes/result';
import oauth from './core-routes/oauth';
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

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));
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
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/oauth', oauth);
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
app.post('/a/local',
  tokenize(process.env.APPLICATION_SECRET, 'local'),
  (req, res, next) => passport.authenticate('local', { session: false,
    failureRedirect : `/oauth/authorize?client_id=${req.query.client_id}&redirect_uri=${req.query.redirect_uri}&response_type=${req.query.response_type}`,
    failureFlash : true,
  })(req, res, next),
  redirect(process.env.APPLICATION_SECRET, r => r.token),
);
app.get('/a/result', result);

app.get('/u/profile', passport.authenticate('jwt', { session: false }), (req, res) => res.json(req.user));

app.listen(process.env.PORT);
