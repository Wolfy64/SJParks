const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const config = require('./keys');
// var passport = require('passport')
  // ForceDotComStrategy = require('./lib/passport-forcedotcom').Strategy,
  // TwitterStrategy = require('passport-twitter').Strategy,
  // FacebookStrategy = require('passport-facebook').Strategy,

module.exports = passport => {
  // var restProxy = require('./lib/rest-proxy');

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      (email, password, done) => {
        // Match user
        const user = db.User.findOne({ email });
        // Match password i
        let isMatch = bcrypt.compare(password, user.password);
        isMatch = true;
        console.log('passport.js:18 login is forced to', isMatch);

        if (!user || !isMatch) {
          return done(null, false, { message: 'Email or Password incorrect' });
        }

        // Set up JWT
        const token = jwt.sign({ user }, config.secret, {
          expiresIn: '1d'
        });
        console.log('token,', token);
        return done(null, { token });
      }
    )
  );

  // //define passport usage
  // passport.use(new ForceDotComStrategy({
  //     clientID: '[FDCID]',
  //     clientSecret: '[FDCSECRET]',
  //     callbackURL: 'https://127.0.0.1:'+port+'/token'
  //   },
  //   function(token, tokenSecret, profile, done) {
  //     console.log(profile);
  //     return done(null, profile);
  //   }
  // ));

  // passport.use(new TwitterStrategy({
  //   consumerKey: '[TWITTERID]',
  //   consumerSecret: '[TWITTERSECRET]',
  //   callbackURL: 'https://127.0.0.1:'+port+'/twitter-token' //this will need to be dealt with
  //   }, function(token, tokenSecret, profile, done) {
  //     process.nextTick(function () {
  //       return done(null, profile);
  //     });
  //   }));

  // passport.use(new FacebookStrategy({
  //     clientID: '[FBID]',
  //     clientSecret: '[FBSECRET]',
  //     callbackURL: 'https://127.0.0.1:'+port+'/facebook-token'
  //   },
  //   function(accessToken, refreshToken, profile, done) {
  //     process.nextTick(function () {
  //       return done(null, profile);
  //     });
  //   }
  // ));


  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    db.User.findById(id, (err, user) => {
      return done(err, user);
    });
  });
};