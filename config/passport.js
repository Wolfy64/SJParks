const LocalStrategy = require('passport-local').Strategy;
const db = require('../models/');

module.exports = passport => {
  passport.use(
    new LocalStrategy({
      usernameField: 'user[userName]',
      passwordField: 'user[password]'
    }, (userName, password, done) => {

      // Match user
    db.User.findOne({
        userName: userName
      }).then(user => {
        if (!user || !user.validatePassword(password)) {
          return done(null, false, {message: `No records matched that combination. Please try again later` });
        }
        return done(null, user);
      }).catch(done);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    db.User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
