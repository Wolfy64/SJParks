const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const db = require('../models');
const config = require('../configurations');
const { env, port, url } = config.keys;

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
