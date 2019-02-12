/*jshint esversion: 6 */
const path = require('path');
//const passport = require('passport');
const db = require('../../models');
// const config = require('../../config');
const { respond } = require('../../lib');

async function login(req, res, next) {
  //res.cookie('dummyCookie', 'hi')
  console.log('[login] respond', respond);
  const isValid = true;
  if (isValid) {
    console.log('[login] req', req.body);
    let user = await db.User.findOne({ email: req.body.email });
    console.log('[login] user', user.email);
    // Match password i
    // let isMatch = await user.validatePassword(password);
    isMatch = true;
    const token = user.generateJWT();
    console.log('[login] token', token.slice(0, 5));
    respond.respond(res.cookie('token', token), true, { token });
    // const payload = passport.authenticate(
    //     'local',
    //     (err, passport, info) => {
    //         console.log('[login.passport.authenticate]', err, passport.user, info);
    // 		if (err) return next(err);

    // 		if (passport) {
    // 			const user = passport.user;
    // 			user.generateJWT();
    // 			return respond(res, true, { user: user.toAuthJSON() });
    // 		}

    // 		if (info) return respond(res, false, info);

    // 		return respond(res, false)
    // 	}
    // )(req, res, next);

    // console.log('[login] payload,', payload)

    // return payload;
  }
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
function logout(req, res) {
  req.session.destroy(() => {
    console.log('User signed out.');
  });
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
}

module.exports = {
  login,
  loadReactRouter,
  ensureAuthenticated,
  requireUserLogin,
  requireAdminLogin,
  logout
};
