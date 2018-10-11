// var bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User');

//  authorize the login information
exports.validate = function (request, response) {
    if (!request.body.uname || !request.body.psw) response.redirect('/login');
    else {
        User.findOne({username: request.body.uname}, function(err, user) {
            if (err) response.redirect('/login');
            if (user && user.validate_password(request.body.psw) && user.admin){
                request.session.admin = true;
                response.redirect('/admin');
            } else response.redirect('/login');
        });
    }
}

exports.logout = function (req, res) {
    req.session.destroy(() => {console.log('User signed out.')});
    res.redirect('/login');
}

exports.requireLogin = function (req, res, next) {
    console.log('requireLogin',req.session);
    if (req.session.admin) next();
    else res.redirect('/login');
  }
