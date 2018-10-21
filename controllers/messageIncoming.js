const db = require("../models");
const messageSender = require('../lib/messageSender')


//------------------------------------------------------------------------
//******************************** TOOL BOX ******************************
//------------------------------------------------------------------------
function sendResponse(res, resMessage, success) {
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
      </html>`
  )
}


exports.subscribe = function(request, response) {
  const phone = request.body.phone;
  const parkId = request.park.parkID;
  if(!phone || !parkID) sendResponse(response, 'No phone or parkcode submitted.', false);
  else db.User.findOne({phone: phone}, function(err, sub) {
    if (err) sendResponse(response, `err: ${err.message}`, false);
    else if (!sub) {
      const newUser = new db.User({phone: phone});
      console.log(`new user: ${newUser}`);
    } else console.log(`existing user: ${sub}`);

  })

}

// Create a function to handle Twilio SMS / MMS webhook requests
exports.webhook = function(request, response) {
  // Get the user's phone number
  const phone = request.body.From;

  // Try to find a user with the given phone number
  db.User.findOne({phone: phone,}, function(err, sub) {
    if (err) return respond('Derp! Please text back again later.');

    if (!sub) {
      // If there's no user associated with this phone number,
      // create one
      const newUser = new db.User({ phone: phone,});

      newUser.save(function(err, newSub) {
        if (err || !newSub) return respond('We couldn\'t sign you up - please try again.');
        processMessage(newUser);
      });
    } else {
      // For an existing user, process any input message they sent and
      // send back an appropriate message
      processMessage(sub);
    }
  });

  // Process any message the user sent to us
  function processMessage(user) {
    // get the text message command sent by the user
    let msg = request.body.Body || '';
    msg = msg.toLowerCase().trim();

    // Conditional logic to do different things based on the command from
    // the user
    if (msg === 'bh' || msg === 'rose' || msg === 'dm') {
      //Check if already subscribed
      db.SubscriptionLog.findOne({phone: phone, park: msg,}, function(err, sub) {
        if (err) return respond('Derp! Please text back again later.');

        if(!sub) {
          const newSubscription = new db.SubscriptionLog({ phone: phone, park: msg,});
          newSubscription.save(function(err, newSub) {
            if (err || !newSub) return respond('We couldn\'t subscribe you to ' + msg + ' - please try again.');
            respond('Thanks for subscribing to '+msg+' - We\'ll keep you...');
          })
        } else respond('You\'re already subscribed to ' + msg + ' - but we love the enthusiasm!');
      });
    } else if (msg === 'stop' || msg === 'start') {} else {
      // If we don't recognize the command, text back with the list of
      // available commands
      const responseMessage = 'Sorry, we didn\'t understand that. '
        + 'available commands are: ROSE - Municipal Rose Garden, BH - Bramhall Park, DM - Del Monte Park or STOP';

      respond(responseMessage);
    }
  }

  // Set Content-Type response header and render XML (TwiML) response in a
  // Jade template - sends a text message back to user
  function respond(message) {
    response.type('text/xml');
    response.render('twiml', {
        message: message,
    });
  }
};



