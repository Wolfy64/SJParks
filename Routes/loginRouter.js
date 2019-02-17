const controllers = require('./Controllers');
const router = require('express').Router();

router.post('/login', controllers.admin.login);

router.get('/logout', controllers.admin.logout);

// router.get('/', admin.loadReactRouter);

// router.get('/register', admin.displayRegisterPage);

// router.get('/login', admin.displayLoginPage);

/*,{
    session: false,
    successRedirect: '/admin/:user/updates',
    failureRedirect: '/login',
    failureFlash: true
},*/

// router.get('/dashboard', admin.requireLogin, admin.displayUserDashboard);

// router.get('/welcome', admin.displayWelcomePage);

module.exports = router;
