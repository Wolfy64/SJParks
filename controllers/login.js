const admin = require('../models/Administrator');

// authorize the login information
exports.validate = function(request, response) {
    const usrname = request.body.uname;
    const password = request.body.psw; 

    admin.findOne({Username:usrname,Password:password,}, function(err, admin) {
        return err || !admin ? respond('Access NOT granted. Try Again.') : response.redirect('/admin');


    });
    // if( attempt == 0){
    //     document.getElementById("uname").disabled = true;
    //     document.getElementById("psw").disabled = true;
    //     document.getElementById("submit").disabled = true;
    //     return false;
    //     }
}