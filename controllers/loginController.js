const db = require('../models');

//  Authorize the login information
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
