/*jshint esversion: 8 */
const sendSingleTwilioMessage = require('./sendSingleTwilioUpdate');

/**
 * Send a message to all current subscribers
 * 
 * @param { array } subscribers 
 * @param { String } message 
 * @param { String } url
 * @public
 */
module.exports.sendMessageToSubscribers = (subscribers, message, url) => {
	// Find all subscribed users
	return new Promise((resolve, reject) => {
		if (subscribers.length === 0) {
			reject({ message: 'Could not find any subscribers!' });
		} else {
			// Send messages to all subscribers via Twilio
			[...new Set(subscribers.map((item) => item.phone))]
				.map((number) => sendSingleTwilioMessage(number, message, url))
				.reduce((all, currentPromise) => Promise.all([all, currentPromise]), Promise.resolve())
				.then(() => resolve());
		}
	});
};
