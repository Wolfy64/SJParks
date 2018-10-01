const User = require('../models/User');
const Subscription = require('../models/Subscription');
const messageSender = require('../lib/messageSender')


// Create a function to handle Twilio SMS / MMS webhook requests
exports.webhook = function(request, response) {
  // Get the user's phone number
  const phone = request.body.From;

  // Try to find a user with the given phone number
  User.findOne({phone: phone,}, function(err, sub) {
    if (err) return respond('Derp! Please text back again later.');

    if (!sub) {
      // If there's no user associated with this phone number,
      // create one
      const newUser = new User({ phone: phone,});

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
      Subscription.findOne({phone: phone, park: msg,}, function(err, sub) {
        if (err) return respond('Derp! Please text back again later.');

        if(!sub) {
          const newSubscription = new Subscription({ phone: phone, park: msg,});
          newSubscription.save(function(err, newSub) {
            if (err || !newSub) return respond('We couldn\'t subscribe you - please try again.');
            respond('Thanks for subscribing to SJParks Notifications');
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


// TODO
// Handle form submission
exports.sendMessages = function(request, response) {
  // Get message info from form submission
  const message = request.body.message;
  const imageUrl = request.body.imageUrl;

  // Send messages to all users
User.find({
    subscribed: true,
  }).then((users) => {
    messageSender.sendMessageTUsers(users, message, imageUrl);
  }).then(() => {
    request.flash('successes', 'Messages on their way!');
    response.redirect('/');
  }).catch((err) => {
    console.log('err ' + err.message);
    request.flash('errors', err.message);
    response.redirect('/');
  });
};
