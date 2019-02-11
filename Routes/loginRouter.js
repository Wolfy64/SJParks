const admin = require('./Controllers/loginController');
const router = require('express').Router();

router.get('/', admin.loadReactRouter);

// router.get('/register', admin.displayRegisterPage);

// router.get('/login', admin.displayLoginPage);

router.post('/login', admin.login);

// router.get('/dashboard', admin.requireLogin, admin.displayUserDashboard);

// router.get('/welcome', admin.displayWelcomePage);

// router.get('/logout', admin.logout);

module.exports = router;
