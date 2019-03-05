/*jshint esversion: 8 */

/**
 * Creates a response object
 *
 * @param {object} res
 * @param {boolean} success
 * @param {Object} payload
 * @param {String} message
 */
async function respond(res, success, payload = {}, message) {
  // if (typeof payload === {})payload.error = new Error('Attempting to send empty response, no bueno');
  if (!success && !message) message = 'Something went wrong';

  const response = { success };

  // Send the payload OR the message
  success ? (response.payload = payload) : (response.message = message);

  res.status(success ? 200 : 404).send(response);
}

module.exports = respond;
