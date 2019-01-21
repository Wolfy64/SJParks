const express = require('express');
const passport = require('passport');
const router = express.Router();

function displayRegister(req, res) {
    res.render('register');
}

function displayLogin(req, res) {
    res.render('login');
}
// const db = require('../../models');

// //  Authorize the login information
// exports.validate = function (request, response)
// {
//   console.log('validating...');
//   if (!request.body.username || !request.body.psw)
//   {
//     console.log('no username or password');
//     response.redirect('/login');
//   }
//   else
//   {
//     console.log(`username:${request.body.username}  password:${request.body.psw}`);
//     db.User.findOne({ username: request.body.username }, function (err, user)
//     {
//       if (err) response.redirect('/login');
//       if (user && user.validate_password(request.body.psw))
//       {
//         request.session.admin = user.admin;
//         request.session.username = user.username;
//         request.session.userid = user._id;
//         response.redirect(user.admin ? '/admin' : '/dashboard');
//       } else response.redirect('/login');
//     });
//   }
// }

// //  Authorize the login information
// exports.validate = function(req, res) {
//   const { username, psw } = req.body;
//   if (!username || !psw) res.redirect('/login');
//   else {
//     db.User.findOne({ username }, function(err, user) {
//       if (err) res.redirect('/login');
//       if (user && user.validate_password(psw)) {
//         req.session.admin = user.admin;
//         req.session.username = user.username;
//         res.redirect(user.admin ? '/admin' : '/dashboard');
//       } else {
//         res.json({ message: 'User ID or Password  invalid' });
//       }
//     });
//   }
// };

// POST login route (optional, everyone has access)
function login1 (req, res, next){
    const {
        user
    } = req.body;

    if (!user.email || !user.phone) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', {
        session: false
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

function login2(req, res, next) {
    return passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
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

// router.get('/',
//   passport.authenticate(['basic', 'digest'], { session: false }),
//   function(req, res) {
//     res.json({ username: req.user.username, email: req.user.emails[0].value });
//   });

// Register Page
router.get('/register', displayRegister);

// Login Page
router.get('/login', displayLogin);

// Login
router.post('/login', /* auth.optional,*/ true? login1 : login2);
/*
// Session Handling
exports.requireAdminLogin = function (req, res, next)
{
  if (req.session.admin) next();
  else res.redirect('/login');
}

exports.requireUserLogin = function(req, res, next) {
  if (req.session.username) next();
  else res.redirect('/login');
// };
*/

// Logout
router.get('/logout', logout);

module.exports = router;





/* // [WIP] configuring user Authentication


*/