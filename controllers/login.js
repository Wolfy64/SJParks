const db = require("../models");

//  Authorize the login information
exports.validate = function (request, response) {
    console.log('validating...');
    if (!request.body.username || !request.body.psw) {
        console.log('no username or password');
        response.redirect('/login');
    }
    else {
        console.log(`usernaem:${request.body.username}  password:${request.body.psw}`);
        db.User.findOne({username: request.body.username}, function(err, user) {
            if (err) response.redirect('/login');
            console.log('-----------------------');
            console.log('---------user----------');
            console.log(user);
            console.log('-----------------------');
            console.log('-----------------------');
            if (user && user.validate_password(request.body.psw) && user.admin){
                request.session.admin = true;
                response.redirect('/admin');
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
exports.requireLogin = function (req, res, next) {
    console.log('requireLogin',req.session);
    if (req.session.admin) next();
    else res.redirect('/login');
  }
