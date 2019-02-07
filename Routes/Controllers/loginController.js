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
	// const { errors, isValid, user  } = req.body;

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
			'local',
			{
				session: false,
				successRedirect: '/dashboard', // fix this
				failureRedirect: '/auth/login', // fix this
				failureFlash: true
			},
			(err, passportUser, info) => {
				if (err) return next(err);

				if (passportUser) {
					const user = passportUser;
					user.token = passportUser.generateJWT();

					return respond(res, true, { user: user.toAuthJSON() });
				}

				return respond(res, false, info);
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
	res.redirect('/login');	
}

function crossOrginMiddleware(req, res, next) {
	console.log('request', req.url, req.body, req.method);
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-token');
	if (req.method === 'OPTIONS') {
		res.end();
	} else {
		next();
	}
}

module.exports = {
	loadReactRouter,
	login,
	ensureAuthenticated,
	requireUserLogin,
	requireAdminLogin,
	crossOrginMiddleware,
	logout,
};
