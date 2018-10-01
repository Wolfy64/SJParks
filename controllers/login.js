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
            },  { runValidators: true, context: 'query' }, function (err, user) {
            //  I'm not sure exactly what happens if it finds NO users are found, as such I will assume a "NULL"might be returned
            if (err || !user) {
                user.create({
                    username: request.body.usname,
                    password: hash,
                    admin: request.body.isAdmin,
                    notes: request.body.eNts
                }).then(() => {
                    console.log('PASS: created new user')
                //  TODO not sure what to do in here
                });
                return response.redirect('/admin');
            }
        });
    });
}

//  authorize the login information
exports.validate = function (request, response) {

    bcrypt.hash(request.body.psw + request.body.uname, saltRounds, function (err, hash) {

        bcrypt.compare(request.body.psw + request.body.uname, hash, function(err, res) {
            // res == true
        });

        user.findOneAndUpdate({ Username: request.body.uname, Password: hash},
            { runValidators: true, context: 'query' }, 
            function (err, user) {
            return err || !user.admin ? response.redirect('/login') : response.redirect('/user');
        });
    });

}