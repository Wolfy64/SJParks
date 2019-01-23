const passport = require('passport');
const db = require('../../models');

/**
 * FUNCTIONS 
 */
function displayRegister(req, res) {
	res.render('register');
}

function displayLogin(req, res) {
	res.render('login');
}


// POST login route (optional, everyone has access)
function login(req, res, next) {
	const {
		user
	} = req.body;

	let errors = [];

	if (!user.email || !user.userName) {
		errors.push({
			candidate: [user.email, user.userName],
			msg: "Not a valid email nor a valid username"
		});
	}

	if (!user.password) {
		errors.push({
			candidate: user.password,
			msg: "Not a valid password"
		});
	}

	if (errors.values.length === 0) {

		return passport.authenticate('local', {
			session: false,
			successRedirect: '/dashboard',
			failureRedirect: '/login',
			failureFlash: true
		}, (err, passportUser, info) => {
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
		})(req, res, next);
	}

}

// Session Handling
function requireAdminLogin (req, res, next)
{
  if (req.session.admin) next();
  else res.redirect('/login');
}

function requireUserLogin (req, res, next) {
  if (req.session.username) next();
  else res.redirect('/login');
}

// Logout current user
function logout(req, res) {
	/*[DEP?]*/
	req.session.destroy(() => {
		console.log('User signed out.')
	});
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/login');
}

module.exports = {
    displayRegister,
    displayLogin,
    login,
    requireAdminLogin, 
    requireUserLogin,
    logout
};