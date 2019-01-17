const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../../models');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// // Register
// const register = (req, res) => {/*router.post('/register',*/
//   const {
//     name,
//     email,
//     password,
//     password2
//   } = req.body;
//   let errors = [];

//   if (!name || !email || !password || !password2) {
//     errors.push({
//       msg: 'Please enter all fields'
//     });
//   }

//   if (password != password2) {
//     errors.push({
//       msg: 'Passwords do not match'
//     });
//   }

//   if (password.length < 6) {
//     errors.push({
//       msg: 'Password must be at least 6 characters'
//     });
//   }

//   if (errors.length > 0) {
//     res.render('register', {
//       errors,
//       name,
//       email,
//       password,
//       password2
//     });
//   } else {
//     db.User.findOne({
//       email: email
//     }).then(user => {
//       if (user) {
//         errors.push({
//           msg: 'Email already exists'
//         });
//         res.render('register', {
//           errors,
//           name,
//           email,
//           password,
//           password2
//         });
//       } else {
//         const newUser = new db.User({
//           name,
//           email,
//           password
//         });

//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser
//               .save()
//               .then(user => {
//                 req.flash(
//                   'success_msg',
//                   'You are now registered and can log in'
//                 );
//                 res.redirect('/users/login');
//               })
//               .catch(err => console.log(err));
//           });
//         });
//       }
//     });
//   }
// }



module.exports = router;

// const db = require('../../models');

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

// // Logout current user
// exports.logout = function(req, res) {
//   req.session.destroy(() => {
//     console.log('User signed out.');
//   });
//   res.redirect('/login');
// };


// exports.requireUserLogin = function(req, res, next) {
//   if (req.session.username) next();
//   else res.redirect('/login');
// };

// const db = require("../models");

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

// // Logout current user
// exports.logout = function (req, res)
// {
//   req.session.destroy(() => { console.log('User signed out.') });
//   res.redirect('/login');
// }

// // Session Handling
// exports.requireAdminLogin = function (req, res, next)
// {
//   if (req.session.admin) next();
//   else res.redirect('/login');
// }

// exports.requireUserLogin = function (req, res, next)
// {
//   if (req.session.username) next();
//   else res.redirect('/login');
// }

/*
LOGIN PAGE FLOW....
1) User goes to /login.
2) User submits login data with form POST.
3) Server validates data and establishes login session.
4) Server does res.redirect('/home') (or whatever URL you want here) to tell the browser to go to the 5) new URL.
6) Browser processes the redirect and sends request for that new page.
7) Server sees request for the new page and uses res.render() to render the data for that page.
8) Browser displays rendered page on the new URL.
*/
