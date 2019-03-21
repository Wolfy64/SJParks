/*jshint esversion: 8 */
// const cors = require('cors'); // ⁉️Why do we need cors?
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const express = require('express');
// const formData = require('express-form-data'); // ⁉️Why do we need it ? we already send an object with react.
// const addRequestId = require('express-request-id')(); // ⁉️ What do we use that and not the user ID ?
// const passport = require('passport');
// ⁉️We already use JWT into a cooki Do we need it ?
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const LocalStrategy = require('passport-local').Strategy;
// const JwtStrategy = require('passport-jwt').Strategy;

/** Load Configurations */
const config = require('./configurations');
const db = require('./models');
let app = express();

/** Load Routers */
const publicRouter = require('./routes/publicRoutes');
const apiRouter = require('./routes/apiRoutes');

// ⁉️We already use JWT into a cooki Do we need it ?
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
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: 'user[email]',
//       passwordField: 'user[password]'
//     },
//     async (username, password, done) => {
//       const errorMsg = { message: 'Invalid credentials' };
//       const user = await db.User.findOne({ email: username }).catch(done);
//       if (!user) return done(null, false, errorMsg);
//       const isMatch = await user.validatePassword(password);
//       const token = await user.generateJWT();
//       console.log('[passport] Local strategy configured');
//       return done(null, isMatch ? { token } : false, isMatch ? null : errorMsg);
//     }
//   )
// );

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = config.keys.secret;

// passport.use(
//   new JwtStrategy(opts, async (jwt_payload, done) => {
//     const user = await User.findById(jwt_payload.id).catch(err =>
//       console.log(err)
//     );
//     if (user) return done(null, user);
//     return done(null, false);
//   })
// );

/**
 * Configure `Passport` authenticated session persistence.
 *
 * @description
 * In order to restore authentication state across HTTP requests,
 * `Passport` needs to `serialize` users into and `deserialize` users
 * out of the `session`.
 *
 **/
// passport.serializeUser((user, done) => done(null, user._id));
// passport.deserializeUser(async (userId, done) => {
//   const user = await db.User.findById(userId).catch(err => done(err));
//   console.log(
//     `[passport] A user with userId:${user._id} has been deserialized`
//   );
//   return done(null, user);
// });

app.use(morgan('dev'));
// app.use(cors());
app.use(express.static(`${__dirname}/${config.keys.path}`));
// app.use(addRequestId); // ⁉️ What do we use that and not the user ID ?
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(formData.parse()); // ⁉️Why do we need it ? we already send an object with react.
app.use(cookieParser());

// ⁉️We already use JWT into a cooki Do we need it ?
/** Passport initialization */
// app.use(passport.initialize());
// app.use(passport.session());

// ⁉️ Express already send a default header. Why do we need to change it ?
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, x-token'
//   );
//   if (req.method === 'OPTIONS') {
//     res.end();
//   } else {
//     next();
//   }
// });

// Routers
app.use('/api', apiRouter);
app.use('/', publicRouter);

/** Error Handlers */
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: `Something went wrong: ${err}`
  });
});

module.exports = app;

// ⁉️We already use JWT into a cooki Do we need it ?
// ###### SESSION MIDDLEWARE ######
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
// const uuid = require('uuid/v4');

/**
 * Configure all application middleware's
 *
 * @description
 * Use `application-level` middleware for common functionality,
 * including: `logging`, `parsing`, and `session` handling.
 *
 * */

// const sessOpts = {
//   genid: req => {
//     return uuid(); // use UUIDs for session IDs
//   },
//   store: new FileStore(),
//   secret: config.keys.secret,
//   resave: false,
//   saveUninitialized: true,
//   rolling: true,
//   name: 'sid',
//   cookie: {
//     httpOnly: true,
//     maxAge: 20 * 60 * 1000,
//     activeDuration: 5 * 60 * 1000,
//     secure: false
//   }
// };

// if (config.keys.prod) {
//   app.set('trust proxy', 1);
//   sessOpts.cookie.secure = true;
// }

// app.use(session(sessOpts));

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
