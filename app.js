/*jshint esversion: 8 */
const cors = require('cors');
const morgan = require('morgan');
const flash = require('connect-flash');
const uuid = require('uuid/v4');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const formData = require('express-form-data');
const addRequestId = require('express-request-id')();
const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const FileStore = require('session-file-store')(session);

/** Load Configurations */
morgan.token('id', req => req.sessionID.split('-')[0]);
const config = require('./configurations');
const db = require('./models');
let app = express();

/** Load Routers */
const publicRouter = require('./routes/publicRoutes');
const apiRouter = require('./routes/apiRoutes');

/**
 * Configure Passport Strategies
 *
 * @description "The local strategy require a `verify` function
 * which receives the credentials (`username` and `password`)
 * submitted by the user.  The function must verify that the
 * password is correct and then invoke `cb` with a user object, which
 * will be set at `req.user` in route handlers after authentication."
 *
 */

passport.use(
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]'
    },
    async (username, password, done) => {
      const errorMsg = { message: 'Invalid credentials' };
      const user = await db.User.findOne({ email: username }).catch(done);
      if (!user) return done(null, false, errorMsg);
      const isMatch = await user.validatePassword(password);
      const token = await user.generateJWT();
      console.log('[passport] Local strategy configured');
      return done(null, isMatch ? { token } : false, isMatch ? null : errorMsg);
    }
  )
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.keys.secret;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await User.findById(jwt_payload.id).catch(err =>
      console.log(err)
    );
    if (user) return done(null, user);
    return done(null, false);
  })
);

/**
 * Configure `Passport` authenticated session persistence.
 *
 * @description
 * In order to restore authentication state across HTTP requests,
 * `Passport` needs to `serialize` users into and `deserialize` users
 * out of the `session`.
 *
 **/
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (userId, done) => {
  const user = await db.User.findById(userId).catch(err => done(err));
  console.log(
    `[passport] A user with userId:${user._id} has been deserialized`
  );
  return done(null, user);
});

/**
 * Configure all application middleware's
 *
 * @description
 * Use `application-level` middleware for common functionality,
 * including: `logging`, `parsing`, and `session` handling.
 *
 * */

const sessOpts = {
  genid: req => {
    return uuid(); // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: config.keys.secret,
  resave: false,
  saveUninitialized: true,
  rolling: true,
  name: 'sid',
  cookie: {
    httpOnly: true,
    maxAge: 20 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    secure: false
  }
};

if (config.keys.prod) {
  app.set('trust proxy', 1);
  sessOpts.cookie.secure = true;
}
app.use(
  morgan(
    '[:date[iso]] :method :url :status :response-time ms - :res[content-length]'
  )
);
app.use(morgan('combined'));
app.use(cors());
app.use(flash());
app.set('view engine', 'pug');
// app.use(express.static(path.join(__dirname, config.keys.path)));
app.use(addRequestId);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(formData.parse());
app.use(session(sessOpts));
app.use(cookieParser());

/** Passport initialization */
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-token'
  );
  if (req.method === 'OPTIONS') {
    res.end();
  } else {
    next();
  }
});

// Routers
app.use('/api', apiRouter);
app.use('/', publicRouter);

/** Error Handlers */
app.use((err, req, res, next) => {
  res.status(500).json({
    errors: {
      message: err
    }
  });
});

module.exports = app;

// /**
//  * Login a new user
//  *
//  * @param {request} req
//  * @param {response} res
//  * @param {middleware} next
//  * @public
//  */

// app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }));
// app.post('/login_pass_jwt', passport.authenticate('jwt', {	session: false}));

// /**
//  * Logout current user
//  *
//  * @param {request} req
//  * @param {response} res
//  * @param {middleware} next
//  * @public
//  */

/*
// Logout current user
function logout(req, res, next) {
  res.clearCookie('token');
  respond(res, true);
}
*/

/*
router.get('/logout', function logout(req, res, next) {
  console.log('[logout] runs')
  res.clearCookie('token');
  res.sendStatus(205);
  next();
  req.session.destroy(() => {
    console.log('User signed out.');
  });
  req.logout();
  req.flash('You are logged out');
});
*/

/*
function logout(req, res) {
	req.session.destroy(() => console.log('User signed out.'));
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/api/login');
}
*/

/*
function requireAdminLogin(req, res, next) {
  if (req.session.admin) next();
  else res.redirect('/login');
}

function requireUserLogin(req, res, next) {
  if (req.session.username) next();
  else res.redirect('/login');
}
*/
