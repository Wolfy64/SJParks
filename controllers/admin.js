const db = require("../models");
const crypto = require('../lib/cryptoHelper');
// const messageSender = require('../lib/messageSender');

//------------------------------------------------------------------------
//**************************** CREATE NEW USER ***************************
//------------------------------------------------------------------------

exports.newUser = function (req, res) {
    const newUser = {
        first_name: req.body.firstName || 'Henry',
        last_name: req.body.lastName || 'Zorrilla',
        username: req.body.userName || 'thmthmnky',
        admin: req.body.isAdmin === 'on',
        phone: req.body.userPhone || '+1234567890',
        email: req.body.userEmail || 'parks@test.wtf'
    };

    db.User.findOne({
        username: req.body.userName
    }, function (err, user) {
        if (err) res.redirect('/537');
        if (!user) {
            if (req.body.psw === req.body.cpsw) {
                newUser.salt = crypto.getSalt();
                newUser.password = crypto.getPasswordHash(req.body.psw, newUser.salt)
                db.User.create(newUser).then((x) => {
                    respond(res, 'New user created:\n' + x, true);
                }).catch((err) => {
                    req.flash('errors', err.message);
                    respond(res, err.message, false);
                }); // END 'User.create().then()'
            } else respond(res, `Passwords did not match!`, false);
        } else respond(res, `Username ${user.username} is unavailable!`, false);
    }); // END 'findOne'
}


//------------------------------------------------------------------------
//**************************** CREATE NEW PARK ***************************
//------------------------------------------------------------------------

exports.createPark = function (req, res) {

    db.Park.findOne({
        name: req.body.parkname
    }, function (err, park) {
        if (err) {
            res.send('Derp! Please try again later.');
            return;
        }
        if (park) {
            res.send(`Derp! ${park.name} already exists.`);
        }
    });

    //Check if code exists
    db.Park.findOne({
        parkID: req.body.parkcode
    }, function (err, park) {
        if (err) {
            res.send('Derp! Please try again later.');
            return;
        }
        if (park) {
            res.send(`Derp! Code already used by ${park.name} with code ${park.parkID}.`);
            return
        }
    });
    const newPark = new db.Park({
        parkID: req.body.parkcode,
        name: req.body.parkname,
        users: []
    });

    //Create new park
    newPark.save(function (err, newpark) {
        if (err || !newpark) res.send('We couldn\'t add the park - please try again.');
        else res.send(` <p>Park successfully added.</p>  <a href="/admin">Go Back</a>`, {
            user: req.user
        });
    });

};


//------------------------------------------------------------------------
//***************************** SEND MESSAGES ****************************
//------------------------------------------------------------------------


exports.sendMessages = function (req, res) {
    // Get message info from form submission
    const message = req.body.message;
    const parkID = req.body.parkID;

    // console.log(req.session);

    if (!message) {
        respond(res, 'Reason: Empty message.', false);
    } else if (typeof (parkID) === 'string') {
        respond(res, 'Reason: No park selected', false);
    } else {
        // TODO prettify res with message displayed
        respond(res, `Message: ${message}\nSent to parks: ${parkID}\nSent by: ${req.session.username}`, true);

        // Send messages to all users subscribed to parks in Parks
        // Subscription.find({
        //   park: {$in: parkID},
        // }).then((users) => {
        //   messageSender.sendMessageToSubscribers(users, message, '');
        // }).then(() => {
        //   req.flash('successes', 'Messages on their way!');
        //   res.redirect('/admin');
        // }).catch((err) => {
        //   console.log('err ' + err.message);
        //   req.flash('errors', err.message);
        //   res.redirect('/admin');
        // });
    }

};


//------------------------------------------------------------------------
//******************************** TOOL BOX ******************************
//------------------------------------------------------------------------
function respond(res, resMessage, success) {
    res.send(`
        <html>
          <head>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>Admin Dashboard - SJParks</title>
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
              <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
              <style>
                  body{
                      font-family: Ubuntu, sans-serif;
                      margin: 30px 20px;
                  }
              </style>
          </head>
          <body>
              <p>${success ? 'Success: Message sent!' : 'Error: Couldn\'t verify the req'}.</p>
              <p>${resMessage}</p>
              <a class="btn" href="/admin">< Back</a>
          </body>
        </html>`)
}

exports.peek = function (req, res) {
    db.User.find({}, (err, query) => {
        if (err) respond(res, 'err ' + err.message, false);
        respond(res, query, true);
    });
}
