/*jshint esversion: 6 */
const db = require('../../models');
const { respond } = require('../../lib/responseSender');
const defaultResponseMessage = 'Sorry, we didn\'t understand that. Available commands are: ROSE - Municipal Rose Garden, BH - Bramhall Park, DM - Del Monte Park or STOP';

/**
 * @public
 * @function incoming
 * @param { request} req 
 * @param { response } res
 * @desc Create a function to handle Twilio SMS / MMS webhook requests 
 */
function incoming(req, res) {
  // Get the user's phone number
  const phone = req.body.From;
  // Split the user's text message into array of individual words
  const text = (req.body.Body || 'empty').toLowerCase().split(' ').filter(x=>x);
  // We only handle messages of at most two words
  // Messages with two words must begin with either the word 'start' or 'stop'
  if (text[2] || (text[1] && !['start','stop'].includes(text[0]))) return respond(defaultResponseMessage);

  // Handle user unsubscription requests
  if (text[0] === 'stop') {
    // Find the user document
    db.User.findOne({phone: phone}, (err, user) => {
      if (err) return respond(res, false, {msg:'Derp! Please text back again later.'});
      // We don't know this user
        if (!user) return respond(res, false, { msg: 'new phony whudis ?' });
      // Handle targeted unsubscription requests
      if (text[1]) {
        // Find the park
        db.Park.findOne({code: text[1]}, (err, park) => {
            if (err) return respond(res, false, { msg: 'Derp! Please text back again later.' });
            if (!park) return respond(res, false, { msg: `${text[1]} is not a valid park code. ${defaultResponseMessage}` });
          // Has user subscribed in the past?
            if (user.parks.indexOf(park._id) < 0) return respond(res, false, { msg: `You never subscribed to notifications for ${park.name}.` });
          // Find user in park document
          const index = park.users.indexOf(user._id);
          // Has user unsubscribed in the past?
            if (index < 0) return respond(res, false, { msg: `You have already unsubscribed from notifications for ${park.name}. But it was nice hearing from you!` });
          // Remove the user from the park document
          park.users.splice(index, 1);
          park.save(function(err, updated) {
              if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
            // Log a new unsubscription event
            new db.SubscriptionLog({user: user._id, park: updated._id, subscribing: false}).save(function(err, newSubscriptionResult){});
            respond(res, true, {msg:`So sad to see you go! You have unsubscribed to notifications for ${updated.name}.`});
          });
        });
      }
      // Unsubscribe from all parks
      else {
        // Has the user subscribed before?
        if (!user.parks.length) return respond('You never subscribed to notifications from Parks and Rec');
        // Get all the user's parks
        db.Park.find({_id:{$in:user.parks}}, function(err, parks) {
            if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
          // This should not happen!
          if (!parks) return respond('Your parks have been destroyed by irrational disaster!', false);
          // Remove the user from each park document as above
          parks.forEach(park => {
            const index = park.users.indexOf(user._id);
            if (index >= 0) {
              park.users.splice(index, 1);
              park.save(function(err, updated) {
                if (!err) new db.SubscriptionLog({user: user._id, park: updated._id, subscribing: false}).save(function(err, newSubscriptionResult){});
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
      db.User.findOne({phone: phone}, (err, user) => {
        if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
        // We don't know this user
        if (!user) return respond('new phony whudis ?', false);
        // Get all the user's parks
        db.Park.find({_id:{$in:user.parks}}, (err, parks) => {
            if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
          // This shouldn't happen!
          if (!parks) return respond('Hmmm? You have no parks to resubscribe to.', false);
          // Resubscribe to all parks in user's list
          parks.forEach(park => {
            if (park.users.indexOf(user._id) < 0) {
              park.users.push(user._id);
              park.save(function(err, updated) {
                if (!err) new db.SubscriptionLog({user: user._id, park: updated._id, subscribing: true}).save((err, newSubscriptionResult) => {});
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
        if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
        if (!park) return respond(`${text[text.length-1]} is not a valid park code. ${defaultResponseMessage}`, false);
        // Find user
        db.User.findOne({phone: phone}, function(err, user) {
            if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
          // New user
          if (!user) user = new db.User({
            phone: phone,
            firstName: 'Need2Update',
            lastName: 'Need2Update',
            email: 'Need2Update@adam.henry' + Math.random().toString(36).slice(2),
            userName: 'Need2Update' + Math.random().toString(36).slice(2),
            password: 'Need2Update' + Math.random().toString(36).slice(2)
          });
          // Already subscribed
          if (park.users.indexOf(user._id) >= 0) return respond(`You are already subscribed to ${park.name}.`, false);
          // Resubscribing?
          else if (user.parks.indexOf(park._id) >= 0) {
            // Add user to park's user list, save and respond
            park.users.push(user._id);
            park.save((err,result) => {
                if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
              new db.SubscriptionLog({user: user._id, park: result._id, subscribing: true}).save((err, newSubscriptionResult)=>{});
              respond(`Thanks for resubscribing to ${park.name}`);
            });
          }
          // New park subscription
          else {
            // Add park to user's park list and save
            user.parks.push(park._id);
            user.save(function(err, updatedUser){
                if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
              // Add user to park's user list, save and respond
              park.users.push(updatedUser._id);
              park.save(function(err,result) {
                if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
                new db.SubscriptionLog({user: updatedUser._id, park: result._id, subscribing: true}).save(function(err, newSubscriptionResult){});
                respond(`Thanks for subscribing to ${park.name}`);
              });
            });
          }
        });
      });
    }
  }
}

/**
 * @public
 * @function index
 * @param {request} req 
 * @param {response} res 
 * @method GET /api/updates 
 * @desc Get all updates's  
 */
function index(req, res) {
	db.Update
		.find()
		.sort({
			username: 1,
			phone: 1
		})
		.then((users) => respond(res, true, users))
		.catch((err) => respond(res, false, err));
}

/**
 * @public
 * @function read
 * @param {request} req 
 * @param {response} res 
 * @method GET api/update/:updateId 
 * @desc  Read an update with '_id:updateId'
 */
function read(req, res) {
	db.Update.findById(req.params.updateId)
		.then((user) => respond(res, true, user))
		.catch((err) => respond(res, false, err));
}

/**
 * @public
 * @function create
 * @param {request} req 
 * @param {response} res 
 * @method POST /api/update/ 
 * @desc Create a new update
 */
function create(req, res) {}

function send(req, res) {
    const messageSender = require('../lib/messageSender');  
    
    // Get message info from form submission   
    const message = req.body.message;
    const parkID = req.body.parkID;   
    console.log(req.session);   
    if (!message) {
        respond(res, false, { msg:'Reason: Empty message.'});   
    } else if (typeof (parkID) === 'string') {
        respond(res, false, {msg:'Reason: No park selected'});
    }
    else {
        // TODO prettify res with message displayed     
        respond(res, true, { msg:`Message: ${message}\nSent to parks: ${parkID}\nSent by: ${req.session.username}`});
        
        // Send messages to all users subscribed
    // to parks in Parks     
        db.User
            .find({ parks: { $in: parkID } })
            .populate("subscription")
            .then((users) =>messageSender.sendMessageToSubscribers(users, message, '')).catch((err) => {
                console.log('err ' + err.message);
                respond(res, true, err);
            });
    }

}

// @route UPDATE api/message/:messageId @desc Update a message with '_id =
// messageId' @access Public
function edit(req, res) {}

// @route DELETE api/message/:messageId @desc Delete a message with '_id =
// messageId' @access Public
function destroy(req, res) { }

module.exports = {
    incoming,
    index,
    read,
    create,
    edit,
    send,
    destroy
};