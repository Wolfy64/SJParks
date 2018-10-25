const db = require("../models");
const messageSender = require('../lib/messageSender');
const sendResponse = require('../lib/responseSender').sendResponse;
const defaultResponseMessage = 'Sorry, we didn\'t understand that. '
  + 'Available commands are: ROSE - Municipal Rose Garden, BH - Bramhall Park, DM - Del Monte Park or STOP';

// Create a function to handle Twilio SMS / MMS webhook requests
exports.webhook = function(request, response) {
  // Get the user's phone number
  const phone = request.body.From;
  // Split the user's text message into array of individual words
  const text = (request.body.Body || 'empty').toLowerCase().split(' ').filter(x=>x);
  // We only handle messages of at most two words
  // Messages with two words must begin with either the word 'start' or 'stop'
  if (text[2] || (text[1] && !['start','stop'].includes(text[0]))) return respond(defaultResponseMessage);

  // Handle user unsubscription requests
  if (text[0] === 'stop') {
    // Find the user document 
    db.User.findOne({phone: phone}, function(err, user) {
      if (err) return respond('Derp! Please text back again later.');
      // We don't know this user
      if (!user) return respond('new phony whudis ?');
      // Handle targeted unsubscription requests
      if (text[1]) {
        // Find the park
        db.Park.findOne({parkID: text[1]}, function(err, park) {
          if (err) return respond('Derp! Please text back again later.');
          if (!park) return respond(`${text[1]} is not a valid park code. ${defaultResponseMessage}`);
          // Has user subscribed in the past?
          if (user.parks.indexOf(park._id) < 0) return respond(`You never subscribed to notifications for ${park.name}.`);
          // Find user in park document
          const index = park.users.indexOf(user._id);
          // Has user unsubscribed in the past?
          if (index < 0) return respond(`You have already unsubscribed from notifications for ${park.name}. But it was nice hearing from you!`);
          // Remove the user from the park document
          park.users.splice(index, 1);
          park.save(function(err, updated) {
            if (err) return respond('Derp! Please text back again later.');
            // Log a new unsubscription event
            db.SubscriptionLog({user: user._id, park: updated._id, subscribing: false}).save(function(err, newSubscriptionResult){});
            respond(`So sad to see you go! You have unsubscribed to notifications for ${updated.name}.`);
          });
        });
      }
      // Unsubscribe from all parks 
      else {
        // Has the user subscribed before?
        if (!user.parks.length) return respond('You never subscribed to notifications from Parks and Rec');
        // Get all the user's parks
        db.Park.find({_id:{$in:user.parks}}, function(err, parks) {
          if (err) return respond('Derp! Please text back again later.');
          // This should not happen!
          if (!parks) return respond('Your parks have been destroyed by irrational disaster!');
          // Remove the user from each park document as above
          parks.forEach(park => {
            const index = park.users.indexOf(user._id);
            if (index >= 0) {
              park.users.splice(index, 1);
              park.save(function(err, updated) {
                if (!err) db.SubscriptionLog({user: user._id, park: updated._id, subscribing: false}).save(function(err, newSubscriptionResult){});
              });
            }
          });
          respond('So sad to see you go! You have unsubscribed to notifications from Parks and Rec.');
        });
      }
    });
  } 
  // Handle (re)subscription requests
  else {
    // 'start' is a Twilio requirement, acts more like a restart
    // Resubscribe to all prior unsubscriptions or send list of park codes
    if (text[0]==='start' && !text[1]) {
      // Find the user
      db.User.findOne({phone: phone}, function(err, user) {
        if (err) return respond('Derp! Please text back again later.');
        // We don't know this user
        if (!user) return respond('new phony whudis ?');
        // Get all the user's parks
        db.Park.find({_id:{$in:user.parks}}, function(err, parks) {
          if (err) return respond('Derp! Please text back again later.');
          // This shouldn't happen!
          if (!parks) return respond('Hmmm? You have no parks to resubscribe to.');
          // Resubscribe to all parks in user's list
          parks.forEach(park => {
            if (park.users.indexOf(user._id) < 0) {
              park.users.push(user._id);
              park.save(function(err, updated) {
                if (!err) db.SubscriptionLog({user: user._id, park: updated._id, subscribing: true}).save(function(err, newSubscriptionResult){});
              });
            }
          });
          respond('Thanks for resubscribing to notifications from San Jose Parks!');
        });
      });
    } 
    // 'start [parkcode]' equivalent to '[parkcode]' i.e. resubscribe process is same as subscription process
    else {
      // Find the park
      db.Park.findOne({parkID: text[text.length-1]}, function(err, park) {
        if (err) return respond('Derp! Please text back again later.');
        if (!park) return respond(`${text[text.length-1]} is not a valid park code. ${defaultResponseMessage}`);
        // Find user
        db.User.findOne({phone: phone}, function(err, user) {
          if (err) return respond('Derp! Please text back again later.');
          // New user
          if (!user) user = new db.User({phone: phone, first_name: 'Need2Update', last_name: 'Need2Update', email: 'Need2Update@adam.henry'+Math.random().toString(36).slice(2), username: 'Need2Update'+Math.random().toString(36).slice(2), password: 'Need2Update'+Math.random().toString(36).slice(2)});
          // Already subscribed
          if (park.users.indexOf(user._id) >= 0) return respond(`You are already subscribed to ${park.name}.`);
          // Resubscribing?
          else if (user.parks.indexOf(park._id) >= 0) {
            // Add user to park's user list, save and respond 
            park.users.push(user._id);
            park.save(function(err,result) {
              if (err) return respond('Derp! Please text back again later.');//sendResponse(response, `err: ${err.message}`, false, '/');
              db.SubscriptionLog({user: user._id, park: result._id, subscribing: true}).save(function(err, newSubscriptionResult){});
              respond(`Thanks for resubscribing to ${park.name}`);
            });
          }
          // New park subscription
          else {
            // Add park to user's park list and save
            user.parks.push(park._id);
            user.save(function(err, updatedUser){
              if (err) return respond('Derp! Please text back again later.');
              // Add user to park's user list, save and respond
              park.users.push(updatedUser._id);
              park.save(function(err,result) {
                if (err) return respond('Derp! Please text back again later.');
                db.SubscriptionLog({user: updatedUser._id, park: result._id, subscribing: true}).save(function(err, newSubscriptionResult){});
                respond(`Thanks for subscribing to ${park.name}`);
              });
            });
          }
        });
      });
    }
  }

  // Set Content-Type response header and render XML (TwiML) response in a
  // Jade template - sends a text message back to user
  function respond(message) {
    // response.type('text/xml');
    // response.render('twiml', {message: message});
    sendResponse(response, message, true, '/');
  }
};