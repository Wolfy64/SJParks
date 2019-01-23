const express = require('express');
const router = express.Router();
const admin = require('./Controllers/loginController');

/**
 * ROUTES
 */

 
 /*
app.get('/', 
  function(req, res) {
    res.send('Hello World.');
  });

app.get('/login', passport.authenticate('forcedotcom'));

app.get('/token', passport.authenticate('forcedotcom', { failureRedirect: '/error' }),
  function(req, res){
    res.send('Logged In.');
  });

app.get('/twitter-login', passport.authenticate('twitter'));

app.get('/twitter-token', passport.authenticate('twitter', { failureRedirect: '/error' }),
  function(req, res){
    res.send('Logged In.');
  });

app.get('/facebook-login', passport.authenticate('facebook'));

app.get('/facebook-token', passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res){
    res.send('Logged In.');
  });
*/

/*
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { 
      return next(null); 
    }
  res.redirect('/error')
 }
 
app.all('/:label/:mode/*',
  ensureAuthenticated,
  function(req, res) {
    console.log(req.session);
    if(req.session["passport"]["user"] && req.params.label == "fdc") {
      var restOptions = {
        useHTTPS : true,
        host : req.session["passport"]["user"].instance_url,
        headers: {
            'Authorization': 'OAuth '+req.session["passport"]["user"].access_token,
            'Accept':'application/jsonrequest',
            'Cache-Control':'no-cache,no-store,must-revalidate'
          }
      }

      var restProxy = require('./lib/rest-proxy');
      restProxy.proxy(req,res);
    }
  });

app.use((req, res, next) => {
    console.log('request', req.url, req.body, req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token");
    if (req.method === 'OPTIONS') {
        res.end();
    } else {
        next();
    }
});
*/

// Register Page
router.get('/register', admin.displayRegister);

// Login Page
router.get('/login', admin.displayLogin);

// Login
router.post('/login', /* auth.optional,*/ admin.login);

// // Profile

// router.get('/',
//   passport.authenticate(['basic', 'digest'], { session: false }),
//   function(req, res) {
//     res.json({ username: req.user.username, email: req.user.emails[0].value });
//   });

// router.get('/profile', passport.authenticate('jwt', {
//     session: false
// }), (req, res, next) => {
//     res.json({
//         user: req.user
//     });
// });

// Logout
router.get('/logout', admin.logout);

module.exports = router;

/*
  const validateLoginInput = require("../../validation/login");


@route POST api/user/login 
@desc Login an existing user 
@access Public

function login(req, res, next) {

  passport.authenticate('local', {
    successRedirect: '/user/:userId/dasboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
}


@route GET api/user/logout 
@desc Logout session user 
@access Public

function logout(req, res) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
  if (process.env.NODE_ENV === "test")
    res.render('login');
}

 */