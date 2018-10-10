// var bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User');

//  authorize the login information
exports.validate = function (request, response) {

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


