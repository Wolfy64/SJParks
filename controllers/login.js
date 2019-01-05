const db = require("../models");

//  Authorize the login information
exports.validate = function (request, response) {
    console.log('>> TEST validating...');
    if (!request.body.username || !request.body.psw) {
        console.log('no username or password');
        response.redirect('/login');
    }
    else {
        console.log(`username:${request.body.username}  password:${request.body.psw}`);
        db.User.findOne({username: request.body.username}, function(err, user) {
            if (err) response.redirect('/login');
            if (user && user.validate_password(request.body.psw)){
                request.session.admin = user.admin;
                request.session.username = user.username;
                response.redirect(user.admin ? '/admin' : '/dashboard');
            } else response.redirect('/login');
        });
    }
}

// Logout current user
exports.logout = function (req, res) {
    req.session.destroy(() => {console.log('User signed out.')});
    res.redirect('/login');
}

// Session Handling
exports.requireAdminLogin = function (req, res, next) {
    if (req.session.admin) next();
    else res.redirect('/login');
}

exports.requireUserLogin = function (req, res, next) {
    if (req.session.username) next();
    else res.redirect('/login');
}
