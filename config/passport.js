// var passport = require('passport')
const LocalStrategy = require('passport-local').Strategy,
  // ForceDotComStrategy = require('./lib/passport-forcedotcom').Strategy,
  // TwitterStrategy = require('passport-twitter').Strategy,
  // FacebookStrategy = require('passport-facebook').Strategy,
  db = require('../models/');

module.exports = passport => {
  // var restProxy = require('./lib/rest-proxy');

  passport.use(
    new LocalStrategy({
      usernameField: 'user[userName]',
      passwordField: 'user[password]'
    }, (username, password, done) => {

      // Match user
      db.User.findOne({
        userName: username
      }).then(user => {
        if (!user || !user.validatePassword(password)) {
          return done(null, false, {
            message: `No records matched that combination. Please try again later`
          });
        }
        return done(null, user);
      }).catch(done);
    })
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