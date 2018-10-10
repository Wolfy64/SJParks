// var bcrypt = require('bcrypt');
<<<<<<< HEAD
const crypto = require('crypto');
const User = require('../models/User');
=======
var crypto = require('crypto')

const User = require('../models/User');
const pages = require('./pages');

//register: storing name, email and password and redirecting to home page after signup
exports.newUser = function (request, response) {

    // bcrypt.hash(request.body.psw + request.body.uname, saltRounds, function (err, hash) {
    //     user.findOne({
    //         Username: request.body.uname,
    //         Password: hash,
    //         admin: request.body.isAdmin
    //         },  { runValidators: true, context: 'query' }, function (err, user) {
    //         //  I'm not sure exactly what happens if it finds NO users are found, as such I will assume a "NULL"might be returned
    //         if (err || !user) {
    //             user.create({
    //                 username: request.body.usname,
    //                 password: hash,
    //                 admin: request.body.isAdmin,
    //                 notes: request.body.eNts
    //             }).then(() => {
    //                 console.log('PASS: created new user')
    //             //  TODO not sure what to do in here
    //             });
    //             return response.redirect('/admin');
    //         }
    //     });
    // });
}
>>>>>>> Lgin Sessin

//  authorize the login information
exports.validate = function (request, response) {

<<<<<<< HEAD
    const usrnm = request.body.uname;
    
    User.findOne({
        Username: usrnm
    }, function (err, user) {
        if(user.validPassword(request.body.psw) && user.username === usrnm || user.valid  ){
        return err || !user.admin ? response.redirect('/') : response.redirect('/admin');}
    });
}

exports.requireLogin = function (req, res, next) {
    console.log('#####################################################');
    console.log(req.query);
    console.log('#####################################################');
    if (!req.user) res.redirect('/login');
    else next();
}
=======
    // bcrypt.hash(request.body.psw + request.body.uname, saltRounds, function (err, hash) {

    //     bcrypt.compare(request.body.psw + request.body.uname, hash, function(err, res) {
    //         // res == true
    //     });

    //     user.findOneAndUpdate({ Username: request.body.uname, Password: hash},
    //         { runValidators: true, context: 'query' }, 
    //         function (err, user) {
    //         return err || !user.admin ? response.redirect('/login') : response.redirect('/user');
    //     });
    // });

    // Encryption needs to happen BEFoRE the request is sent.
    // Then decrypt here and compare
    if (!request.body.uname || !request.body.psw) response.redirect('/login');
    else {
        User.findOne({username: request.body.uname}, function(err, user) {
            if (err) response.redirect('/login');
            if (user && user.validate_password(request.body.psw) && user.admin){
                // response.cookie('user', true, { path: '/admin', secure: true })
                console.log('--------------------------------');
                console.log('++++++++++++++++++++++++++++++++');
                console.log('--------------------------------');
                console.log(request.session);
                console.log('--------------------------------');
                console.log('++++++++++++++++++++++++++++++++');
                console.log('--------------------------------');
                //response.redirect('/admin');
                console.log('--------------------------------');
                console.log('+++++++RESPoNSE+++++++++++++++++');
                console.log('--------------------------------');
                console.log(Object.keys(response.req.session));
                console.log('--------------------------------');
                console.log('++++++++++++++++++++++++++++++++');
                console.log('--------------------------------');
                pages.showForm(request, response);

            } else response.redirect('/login');
        });
    }
}

exports.logout = function (req, res) {
    req.session.destroy(() => {console.log('User signed out.')});
    res.redirect('/login');
}


>>>>>>> Lgin Sessin
