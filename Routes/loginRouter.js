const admin = require('./Controllers/loginController');
const router = require('express').Router();

router.get('/', admin.loadReactRouter);

// router.get('/register', admin.displayRegisterPage);

// router.get('/login', admin.displayLoginPage);

router.post('/login', admin.login);


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

// router.get('/dashboard', admin.requireLogin, admin.displayUserDashboard);

// router.get('/welcome', admin.displayWelcomePage);

// router.get('/logout', admin.logout);

module.exports = router;
