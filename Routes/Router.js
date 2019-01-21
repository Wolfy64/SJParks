const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../models/');
const config = require('./config');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new db.User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    db.User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to register user'
            });
        } else {
            res.json({
                success: true,
                msg: 'User registered'
            });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    db.User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: 'User not found'
            });
        }

        db.User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({
                    data: user
                }, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({
                    success: false,
                    msg: 'Wrong password'
                });
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    res.json({
        user: req.user
    });
});

module.exports = router;

/**
 * EXAMPLE OF AUTHENTICATION from: https://gist.github.com/joshbirk/1732068
 * 
 * var fs = require("fs")
var ssl_options = {
  key: fs.readFileSync('privatekey.pem'),
  cert: fs.readFileSync('certificate.pem')
};
     
var port = process.env.PORT || 3000;
var express = require('express');
var ejs = require('ejs');


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(null); }
  res.redirect('/error')
}

//configure, route and start express
var app = express.createServer(ssl_options);
app.configure(function() {
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'thissecretrocks' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

app.set('view engine', 'ejs');
app.set('view options', {
  layout: false
});


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


app.get('/error', function(req, res){
  res.send('An error has occured.');
  });

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

      restProxy.proxy(req,res);
    }
  });

app.get('/*',function(req, res) {
  res.render(req.url.substring(1,req.url.length)); //really?
})

app.listen(port, function() {
  console.log("Listening on " + port);
});


 */