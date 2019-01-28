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
        // Match password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!user || !isMatch) {
          return done(null, false, { message: 'Email or Password incorrect' });
        }

        // Set up JWT
        const token = jwt.sign({ user }, config.secret, {
          expiresIn: '1d'
        });
        return done(null, { token });
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
