/*jshint esversion: 6 */
const path = require('path');
const passport = require('passport');
// const db = require('../../models');
// const config = require('../../config');
const { respond } = require('../../lib');

function loadReactRouter(req, res) {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
}

function login(req, res, next) {
	// const { errors, isValid, user  } = validateLoginRequest(req.body);

	// let errors = [];

	// if (!user.email || !user.userName) {
	// 	errors.push({
	// 		candidate: [ user.email, user.userName ],
	// 		msg: 'Invalid userName or password'
	// 	});
	// }

	// if (!user.password) {
	// 	errors.push({
	// 		candidate: user.password,
	// 		msg: 'Not a valid password'
	// 	});
	// }
	const isValid = true;
	if (isValid) {
		return passport.authenticate(
			'local',/*,{
				successRedirect: '/admin/:user/updates',
				failureRedirect: '/login',
				failureFlash: true
			},*/ (err, passportUser, info) => {
				if (err) return next(err);

				if (passportUser) {
					const user = passportUser;
					user.token = passportUser.generateJWT();
					return respond(res, true, { user: user.toAuthJSON() });
				}

				if (info) return respond(res, false, info);
			}
		)(req, res, next);
	}
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
// 
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
	loadReactRouter,
	login,
	ensureAuthenticated,
	requireUserLogin,
	requireAdminLogin,
	logout,
};
