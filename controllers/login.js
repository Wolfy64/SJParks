var bcrypt = require('bcrypt');

const user = require('../models/User');
const saltRounds = 16;

//register: storing name, email and password and redirecting to home page after signup
exports.newUser = function (request, response) {

    bcrypt.hash(request.body.psw + request.body.uname, saltRounds, function (err, hash) {
        user.findOne({
            Username: request.body.uname,
            Password: hash,
            admin: request.body.isAdmin
        }, function (err, user) {
            // I'm not sure exactly what happens if it finds NO users are found, as such I will assume a "NULL"might be returned
            if (err || user === null) {
                user.create({
                    username: request.body.usname,
                    password: hash,
                    admin: request.body.isAdmin,
                    notes: request.body.eNts
                }).then(() => {
                    console.log('PASS: created new user')
                    return response.redirect('/admin');
                });
            } else {
                console.log('USER FOUND')
                return response.redirect('/admin');
            }
        });
    });
}

// authorize the login information
exports.validate = function (request, response) {
    const username = request.body.uname;
    const password = request.body.psw;

    bcrypt.hash(request.body.psw + request.body.uname, saltRounds, function (err, hash) {

        user.findOne({
            Username: username,
            Password: password,
        }, function (err, user) {
            return err || !user.admin ? response.redirect('/login') : response.redirect('/user');


        });
    });

}