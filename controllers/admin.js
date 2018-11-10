const db = require("../models");
const crypto = require('../lib/cryptoHelper');
const respond = require('../lib/responseSender').sendResponse;
const messageSender = require('../lib/messageSender');



//------------------------------------------------------------------------
//**************************** CREATE NEW USER ***************************
//------------------------------------------------------------------------

exports.newUser = function (req, res) {

    db.User.findOne({username: req.body.userName}, function (err, user) {
        // console.log('------------------------------------------------');
        // console.log('------------------------------------------------');
        // console.log(user)
        // console.log('------------------------------------------------');
        // console.log('------------------------------------------------');

        //ERROR 537 will be for blah blah blah
        if (err) res.redirect('/537');
        if (!user) {
            if (req.body.psw === req.body.cpsw) {
                var saltShaker = crypto.getSalt();
                db.User.create({
                    first_name: req.body.firstName || 'Henry',
                    last_name: req.body.lastName || 'Zorrilla',
                    username: req.body.userName || 'thmthmnky',
                    admin: req.body.isAdmin === 'on',
                    phone: req.body.userPhone || '+1234567890',
                    email: req.body.userEmail || 'parks@test.wtf',
                    salt: saltShaker,
                    password: crypto.getPasswordHash(req.body.psw, saltShaker)
                }).then( (x) => {
                    //x.setPassword();
                    console.log('PASS: Create new user; hash and save new user password.\n*&*&*&*&*&*&*&*&*&*\n'+x);
                    respond(res, 'New user created:\n' + x, true);
                }).catch((err) => {
                    console.log('err ' + err.message);
                    req.flash('errors', err.message);
                    respond(res, err.message, false);
                });// END 'User.create().then()'
            } else respond(res, `Passwords did not match!` , false);
        } else respond(res, `Username ${user.username} is unavailable!` , false);
    });// END 'findOne'
}


//------------------------------------------------------------------------
//**************************** CREATE NEW PARK ***************************
//------------------------------------------------------------------------

exports.createPark = function(req, res) {
    // console.log('------------------------------------------------');
    // console.log('------------------------------------------------');
    // console.log('------------------------------------------------');
    // console.log(req.session);
    // console.log('------------------------------------------------');
    // console.log('------------------------------------------------');
    // console.log('------------------------------------------------');
    
    // Check if name exists
    db.Park.findOne({ name: req.body.parkname}, function(err, park) {
        if (err) {
            res.send('Derp! Please try again later.');
            return;
        }
        if (park) {
            res.send(`Derp! ${park.name} already exists.`);
        }
    }
    );

    //Check if code exists
    db.Park.findOne({ parkID: req.body.parkcode}, function(err, park) {
        if (err) {
            res.send('Derp! Please try again later.');
            return;
        }
        if (park) {
            res.send(`Derp! Code already used by ${park.name} with code ${park.parkID}.`);
            return
        }
    }
    );
    const newPark = new db.Park({ parkID: req.body.parkcode, name: req.body.parkname, users: []});

    //Create new park
    newPark.save(function(err, newpark) {
      if (err || !newpark) res.send(`We couldn\'t add the park - please try again. <br> err:${err} <br> newpark:${newpark}`);
      else res.send(`<p>Park successfully added.</p>  <a href="/admin">Go Back</a>`);
    });

};


//------------------------------------------------------------------------
//***************************** SEND MESSAGES ****************************
//------------------------------------------------------------------------

exports.sendMessages = function(req, res) {
    // Get message info from form submission
    const message = req.body.message;
    const parkids = req.body.parkID;
    const withParkNames = !req.body.withParkNames;
    // Validate input
    if (!message) return respond(res, 'Reason: Empty message.', false);
    if (typeof(parkids) === 'string') return respond(res, 'Reason: No park selected', false);
    // Remove hack
    parkids.shift();
    // Find the park(s)
    db.Park.find({parkID : {$in: parkids}}, function(err, parks) {
        if (err) respond(res, `Error: ${err.message}`, false);
        // This should not happen!
        if (!parks) respond(res, 'Some error occurred and it\'s Andres Milton Cubas\' fault.', false);
        // Get all user ids from parks' user lists
        const subscribers = parks.reduce((acc, cur) => acc.concat(cur.users), []);
        // Get all users
        db.User.find({_id:{$in:subscribers}}, function(err, users) {
            if (err) return respond(res, `Error: ${err.message}`, false);
            // This should not happen!
            if (!users) return respond(res, `Andres Milton Cubas has deleted the users, I think.`, false);
            let customMessage = '';
            users.forEach((user) => {
                if (withParkNames) {
                    const parkNames = parks.filter(park => user.parks.indexOf(park._id) >= 0 && park.users.indexOf(user._id) >= 0)
                        .reduce((acc, cur) => acc += `${cur.name}, `, '');
                    customMessage = `${parkNames}\n\n${message}`;
                }
                else customMessage = message;
                console.log(customMessage);
                // uncomment line below to send message to subscribers
                messageSender.sendSingleTwilioMessage(user.phone, customMessage, '');
            })
            // Log the message event
            db.MessageLog({user:req.session.userid, parks:parks.map(park => park._id), message: message}).save(function(err){});
            // Send response back to admin
            respond(res, `Message: ${message}<br>Sent to parks: ${parkids}<br>Sent by: ${req.session.username}`, true);
        });
    });
};


//------------------------------------------------------------------------
//******************************** TOOL BOX ******************************
//------------------------------------------------------------------------
exports.peek = function(req, res){
    db.SubscriptionLog.find({}, (err, query) => {
        if (err) respond(res, 'err '+err.message, false);
        respond(res, query, true);
    });
}
