const path = require('path');
const passport = require('passport');
const db = require('../../models');
const config = require('../../config');

function loadReactRouter(req, res) {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
}

function displayWelcomePage(req, res){
	res.render('welcome');
}

function displayRegisterPage(req, res) {
	res.render('register');
}

function displayLoginPage(req, res) {
	res.render('login');
}

function displayDasboardPage (req, res){
	res.render('dashboard');
}


function login(req, res, next) {
	const { user } = req.body;

	let errors = [];

	if (!user.email || !user.userName) {
		errors.push({
			candidate: [ user.email, user.userName ],
			msg: 'Not a valid email nor a valid username'
		});
	}

	if (!user.password) {
		errors.push({
			candidate: user.password,
			msg: 'Not a valid password'
		});
	}

	if (errors.values.length === 0) {
		return passport.authenticate(
			'local',
			{
				session: false,
				successRedirect: '/dashboard',
				failureRedirect: '/login',
				failureFlash: true
			},
			(err, passportUser, info) => {
				if (err) {
					return next(err);
				}

				if (passportUser) {
					const user = passportUser;
					user.token = passportUser.generateJWT();

					return res.json({
						user: user.toAuthJSON()
					});
				}

				return res.status(400).json({
					info
				});
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
	if (process.env.NODE_ENV === 'test') res.render('login');
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
	displayWelcomePage,
	displayRegisterPage,
	displayLoginPage,
	login,
	ensureAuthenticated,
	requireUserLogin,
	requireAdminLogin,
	displayDasboardPage,
	crossOrginMiddleware,
	logout,
};
