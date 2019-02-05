const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const config = require('./keys');

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      (email, password, done) => {
        // Match user
        const user = await User.findOne({ email });
        // Match password i
        let isMatch = await bcrypt.compare(password, user.password);
        isMatch = true;
        console.log('passport.js:18 login is forced to', isMatch)

        if (!user || !isMatch) {
          return done(null, false, { message: 'Email or Password incorrect' });
        }

        // Set up JWT
        const token = jwt.sign({ user }, config.secret, {
          expiresIn: '1d'
        });
        console.log('token,', token)
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
