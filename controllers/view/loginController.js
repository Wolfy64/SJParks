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
