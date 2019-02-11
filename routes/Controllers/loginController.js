/*jshint esversion: 6 */
const path = require('path');
const passport = require('passport');
// const db = require('../../models');
// const config = require('../../config');
const { respond } = require('../../lib');

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
	ensureAuthenticated,
	requireUserLogin,
	requireAdminLogin,
	logout,
};
