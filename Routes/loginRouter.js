const admin = require('./Controllers/loginController');
const passport = require('passport');
const router = require('express').Router();

// router.get('*', admin.loadReactRouter);

// router.get('/welcome', admin.displayWelcomePage);

// Register Page
router.get('/register', admin.displayRegisterPage);

// Login Page
router.get('/login', admin.displayLoginPage);

// // Login
// router.post('/login', admin.login);

// router.get('/login', passport.authenticate('forcedotcom'));
// router.get('/token', passport.authenticate('forcedotcom', { failureRedirect: '/error' }), function(req, res) {
// 	res.send('Logged In.');
// });

// router.get('/twitter-login', passport.authenticate('twitter'));
// router.get('/twitter-token', passport.authenticate('twitter', { failureRedirect: '/error' }), function(req, res) {
// 	res.send('Logged In.');
// });

// router.get('/facebook-login', passport.authenticate('facebook'));
// router.get('/facebook-token', passport.authenticate('facebook', { failureRedirect: '/error' }), function(req, res) {
// 	res.send('Logged In.');
// });

// router.get(
// 	'/profile',
// 	passport.authenticate('jwt', {
// 		session: false
// 	}),
// 	(req, res, next) => {
// 		res.json({
// 			user: req.user
// 		});
// 	}
// );

// // Logout
// router.get('/logout', admin.logout);

module.exports = router;



  //------------------------------------------------------------------------
  //**************************** DASHBOARD PAGE ****************************
  //------------------------------------------------------------------------

  // Render the general public Dashboard/console
  //app.get('/dashboard', login.requireUserLogin, pages.dashboardPage);

  //------------------------------------------------------------------------
  //****************************** ADMIN PAGE ******************************
  //------------------------------------------------------------------------

  // Render the Administrator Dashboard/console
  //app.get('/admin', login.requireAdminLogin, pages.adminPage); //