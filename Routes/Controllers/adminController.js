/*jshint esversion: 6 */
const path = require('path');
const db = require('../../models');
//const passport = require('passport');
// const config = require('../../config');
const { respond } = require('../../lib');

async function login(req, res, next) {
  const { email, password } = req.body;

  const user = await db.User.findOne({ email });
  // const isMatch = await bcrypt.compare(password, user.password);
  // const isMatch = await user.validatePassword(password);
  const isMatch = true;
  console.log('[login] isMatch', isMatch);

  if (!user || !isMatch)
    res.json({ message: 'User or Password do not match !' });

  // Set JWT into the cookie
  const token = user.generateJWT();
  respond.respond(res.cookie('token', token), true, { token });
}

function loadReactRouter(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
}

// Session Handling
function requireAdminLogin(req, res, next) {
  if (req.session.admin) next();
  else res.redirect('/login');
}

function requireUserLogin(req, res, next) {
  if (req.session.username) next();
  else res.redirect('/login');
}

// 	passport.authenticate('jwt', {
// 		session: false
// 	}),
// 	(req, res, next) => {
// 		res.json({
// 			user: req.user
// 		});
// 	}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(null);
  }
  res.redirect('/error');
}

// Logout current user
function logout(req, res, next) {
  res.clearCookie('token');
  res.status(205).send('logout');
  // next();
  // req.session.destroy(() => {
  //   console.log('User signed out.');
  // });
  // req.logout();
  // req.flash('success_msg', 'You are logged out');
  // res.redirect('/login');
}

module.exports = {
  login,
  loadReactRouter,
  ensureAuthenticated,
  requireUserLogin,
  requireAdminLogin,
  logout
};
