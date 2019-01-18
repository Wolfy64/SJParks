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
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../models');

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

// // Login
// router.post('/login', (req, res, next) =>
// {
//   passport.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/users/login',
//     failureFlash: true
//   })(req, res, next);
// });

// // Logout
// router.get('/logout', (req, res) =>
// {
//   req.logout();
//   req.flash('success_msg', 'You are logged out');
//   res.redirect('/users/login');
// });




module.exports = router;


// const messageSender = require('../lib/messageSender');

module.exports.sendMessages = function (req, res)
{
  // Get message info from form submission
  const message = req.body.message;
  const parkID = req.body.parkID;

  // console.log(req.session);

  if (!message)
  {
    respond(res, 'Reason: Empty message.', false);
  } else if (typeof (parkID) === 'string')
  {
    respond(res, 'Reason: No park selected', false);
  } else
  {
    // TODO prettify res with message displayed
    respond(res, `Message: ${message}\nSent to parks: ${parkID}\nSent by: ${req.session.username}`, true);

    // Send messages to all users subscribed to parks in Parks
    // Subscription.find({
    //   park: {$in: parkID},
    // }).then((users) => {
    //   messageSender.sendMessageToSubscribers(users, message, '');
    // }).then(() => {
    //   req.flash('successes', 'Messages on their way!');
    //   res.redirect('/admin');
    // }).catch((err) => {
    //   console.log('err ' + err.message);
    //   req.flash('errors', err.message);
    //   res.redirect('/admin');
    // });
  }

};


//------------------------------------------------------------------------
//******************************** TOOL BOX ******************************
//------------------------------------------------------------------------
function respond(res, resMessage, success)
{
  res.send(`
        <html>
          <head>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>Admin Dashboard - SJParks</title>
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
              <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
              <style>
                  body{
                      font-family: Ubuntu, sans-serif;
                      margin: 30px 20px;
                  }
              </style>
          </head>
          <body>
              <p>${success ? 'Success: Message sent!' : 'Error: Couldn\'t verify the req'}.</p>
              <p>${resMessage}</p>
              <a class="btn" href="/admin">< Back</a>
          </body>
        </html>`)
}
//------------------------------------------------------------------------
//**************************** CREATE NEW USER ***************************
//------------------------------------------------------------------------

// exports.newUser = function (req, res) {
//     const newUser = {
//         first_name: req.body.firstName || 'Henry',
//         last_name: req.body.lastName || 'Zorrilla',
//         username: req.body.userName || 'thmthmnky',
//         admin: req.body.isAdmin === 'on',
//         phone: req.body.userPhone || '+1234567890',
//         email: req.body.userEmail || 'parks@test.wtf'
//     };

//     db.User.findOne({
//         username: req.body.userName
//     }, function (err, user) {
//         if (err) res.redirect('/537');
//         if (!user) {
//             if (req.body.psw === req.body.cpsw) {
//                 newUser.salt = crypto.getSalt();
//                 newUser.password = crypto.getPasswordHash(req.body.psw, newUser.salt)
//                 db.User.create(newUser).then((x) => {
//                     respond(res, 'New user created:\n' + x, true);
//                 }).catch((err) => {
//                     req.flash('errors', err.message);
//                     respond(res, err.message, false);
//                 }); // END 'User.create().then()'
//             } else respond(res, `Passwords did not match!`, false);
//         } else respond(res, `Username ${user.username} is unavailable!`, false);
//     }); // END 'findOne'
// }


//------------------------------------------------------------------------
//**************************** CREATE NEW PARK ***************************
//------------------------------------------------------------------------

// exports.createPark = function (req, res) {

//     db.Park.findOne({
//         name: req.body.parkname
//     }, function (err, park) {
//         if (err) {
//             res.send('Derp! Please try again later.');
//             return;
//         }
//         if (park) {
//             res.send(`Derp! ${park.name} already exists.`);
//         }
//     });

//     //Check if code exists
//     db.Park.findOne({
//         parkID: req.body.parkcode
//     }, function (err, park) {
//         if (err) {
//             res.send('Derp! Please try again later.');
//             return;
//         }
//         if (park) {
//             res.send(`Derp! Code already used by ${park.name} with code ${park.parkID}.`);
//             return
//         }
//     });
//     const newPark = new db.Park({
//         parkID: req.body.parkcode,
//         name: req.body.parkname,
//         users: []
//     });

//     //Create new park
//     newPark.save(function (err, newpark) {
//         if (err || !newpark) res.send('We couldn\'t add the park - please try again.');
//         else res.send(` <p>Park successfully added.</p>  <a href="/admin">Go Back</a>`, {
//             user: req.user
//         });
//     });

// };
