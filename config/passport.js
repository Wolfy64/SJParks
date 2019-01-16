const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const config = require('./keys');

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        // Match user
        const user = await User.findOne({ email });

        if (!user)
          return done(null, false, {
            message: 'That email is not registered'
          });

        // Match password
        bcrypt.compare(password, user.password, async (err, isMatch) => {
          if (err) throw err;

          isMatch
            ? done(null, user)
            : done(null, false, { message: 'Password incorrect' });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
