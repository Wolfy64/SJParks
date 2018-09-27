var bcrypt = require('bcrypt');

const user = require('../models/User');

// authorize the login information

//register: storing name, email and password and redirecting to home page after signup
exports.newAdmin = function (request, response) {
    const saltRounds = 16;
    bcrypt.hash(request.body.psw + request.body.uname, saltRounds, function (err, hash) {
        user.create({
            username:request.body.usname,
            password:hash,
            admin:request.body.isAdmin,
            notes:request.body.eNts
        }).then(function(data) {
            if (data) {
                response.redirect('/login');
            }
        });
   });
}

exports.validate = function(request, response) {
    const username = request.body.uname;
    const password = request.body.psw; 

    user.findOne({Username:username,Password:password,}, function(err, user) {
        return err || !user.admin ? response.redirect('/login') : response.redirect('/user');


    });

}


