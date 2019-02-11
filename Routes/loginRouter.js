const admin = require('./Controllers');
const router = require('express').Router();

// router.get('/', admin.loadReactRouter);

// router.get('/register', admin.displayRegisterPage);

// router.get('/login', admin.displayLoginPage);

router.post('/login', (req, res, next) => {    
    const isValid = true;
    
	if (isValid) {
        console.log('[loginController] req.body, ', req.body)
        const payload = passport.authenticate(
            'local', 
            (err, passportUser, info) => {
                console.log('[loginRouter],', err.message, passportUser, info);
				if (err) return next(err);

				if (passportUser) {
					const user = passportUser;
					user.token = passportUser.generateJWT();
					return respond(res, true, { user: user.toAuthJSON() });
				}

				if (info) return respond(res, false, info);
			}
        )(req, res, next);

        console.log('[loginController] payload,', payload)
        
        return payload;
	}
});

/*,{
    session: false,
    successRedirect: '/admin/:user/updates',
    failureRedirect: '/login',
    failureFlash: true
},*/

// router.get('/dashboard', admin.requireLogin, admin.displayUserDashboard);

// router.get('/welcome', admin.displayWelcomePage);

// router.get('/logout', admin.logout);

module.exports = router;
