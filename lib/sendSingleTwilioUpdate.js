/*jshint esversion: 8 */
const keys = require('../configurations/keys');
const client = require('twilio')(keys.accountSid, keys.authToken);

/**
 * Send a Twilio message to one user
 *
 * @param { String } number
 * @param { String } update
 * @param { String } url
 * @private
 */
module.exports.sendSingleTwilioUpdate = (number, update, url) => {
  // Create options object to send the message
  const options = {
    to: number,
    from: keys.twilioNumber,
    body: update
  };

  // Include media URL if one was given for MMS
  if (url) options.mediaUrl = url;

  return new Promise((resolve, reject) => {
    // Send the message!
    client.updates
      .create(options)
      .then(update => resolve(update))
      .catch(error => reject(error));
  });
};
