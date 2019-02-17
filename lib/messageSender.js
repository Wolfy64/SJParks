const twilio = require('twilio');
const config = require('../config');

// create an authenticated Twilio REST API client
//const client = twilio(config.keys.accountSid, config.keys.authToken);

/**
 * @private
 * @function sendSingleTwilioMessage
 * @param { String } number 
 * @param { String } message 
 * @param { String } url
 * @desc Send a Twilio message to one user 
 */
function sendSingleTwilioMessage(number, message, url) {
	// Create options object to send the message
	const options = {
		to: number,
		from: config.keys.twilioNumber,
		body: message
	};

	// Include media URL if one was given for MMS
	if (url) options.mediaUrl = url;

	return new Promise((resolve, reject) => {
		// Send the message!
    client.messages
      .create(options)
      .then((message) => resolve(message))
      .catch((error) => reject(error));
	});
}

/**
 * @public
 * @function sendMessageToSubscribers
 * @param { array } subscribers 
 * @param { String } message 
 * @param { String } url
 * @desc Send a message to all current subscribers 
 */
function sendMessageToSubscribers(subscribers, message, url) {
	// Find all subscribed users
	return new Promise((resolve, reject) => {
		if (subscribers.length === 0) {
			reject({ message: 'Could not find any subscribers!' });
		} else {
			// Send messages to all subscribers via Twilio
			[ ...new Set(subscribers.map((item) => item.phone)) ]
				.map((number) => sendSingleTwilioMessage(number, message, url))
				.reduce((all, currentPromise) => Promise.all([ all, currentPromise ]), Promise.resolve())
				.then(() => resolve());
		}
	});
}

module.exports = {
	/* sendSingleTwilioMessage,*/
	sendMessageToSubscribers
};
