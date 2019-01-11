const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = passport => {
  passport.use(
    new LocalStrategy({
      usernameField: 'userName'
    }, (userName, password, done) => {

      // Match user
      User.findOne({
        userName: userName
      }).then(user => {
        if (!user) {
          return done(null, false, {
            message: 'That email is not registered'
          });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            console.log(`>[PASS:048:033]> Welcome User! --> @id:${user._id} `)
            return done(null, user);
          } else {
            return done(null, false, {
              message: 'Password incorrect'
            });
          }
        });
      });
    })
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
