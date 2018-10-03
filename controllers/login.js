// var bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User');

//  authorize the login information
exports.validate = function (request, response) {

    const usrnm = request.body.uname;
    
    User.findOne({
        Username: usrnm
    }, function (err, user) {
        if(user.validPassword(request.body.psw) && user.username === usrnm || user.valid  ){
        return err || !user.admin ? response.redirect('/') : response.redirect('/admin');}
    });

exports.requireLogin = function (req, res, next) {
    console.log('#####################################################');
    console.log(req.query);
    console.log('#####################################################');
    if (!req.user) {
      res.redirect('/login');
    } else {
      next();
    }
  };