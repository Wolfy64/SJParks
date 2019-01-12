const db = require('../models');

//  Authorize the login information
<<<<<<< HEAD:controllers/loginController.js
exports.validate = function (request, response) {
    console.log('validating...');
    if (!request.body.username || !request.body.psw) {
        console.log('no username or password');
        response.redirect('/login');
    }
    else {
        console.log(`usernaem:${request.body.username}  password:${request.body.psw}`);
        db.User.findOne({username: request.body.username}, function(err, user) {
            if (err) response.redirect('/login');
            if (user && user.validate_password(request.body.psw)){
                request.session.admin = user.admin;
                request.session.username = user.username;
                response.redirect(user.admin ? '/admin' : '/dashboard');
            } else response.redirect('/login');
        });
    }
}
=======
exports.validate = function(req, res) {
  const { username, psw } = req.body;
  if (!username || !psw) res.redirect('/login');
  else {
    db.User.findOne({ username }, function(err, user) {
      if (err) res.redirect('/login');
      if (user && user.validate_password(psw)) {
        req.session.admin = user.admin;
        req.session.username = user.username;
        res.redirect(user.admin ? '/admin' : '/dashboard');
      } else {
        res.json({ message: 'User ID or Password  invalid' });
      }
    });
  }
};
>>>>>>> eaef81a2e80adcbf94a698067c4206b063585bb7:controllers/login.js

// Logout current user
exports.logout = function(req, res) {
  req.session.destroy(() => {
    console.log('User signed out.');
  });
  res.redirect('/login');
};

// Session Handling
exports.requireAdminLogin = function(req, res, next) {
  if (req.session.admin) next();
  else res.redirect('/login');
};

exports.requireUserLogin = function(req, res, next) {
  if (req.session.username) next();
  else res.redirect('/login');
};
