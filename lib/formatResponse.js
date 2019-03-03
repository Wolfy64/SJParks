/*jshint esversion: 8 */

/**
 * Creates a response object
 *
 * @param {object} res
 * @param {boolean} success
 * @param {Object} payload
 * 
 */
async function respond(res, success, payload = {}, defaultMessage = "") {
  if (typeof payload === {}) payload.error = new Error("Attempting to send empy response, no bueno");
  if (defaultMessage !== "") payload.message = defaultMessage; 
  payload.success = success;
  res.status(success ? 200 : 404).send(payload);
  /*
 * @param {String} message
 */
// function respond(res, success, payload = {}, message) {
  if (!success && !message) message = 'Something went wrong';
  res.status(success ? 200 : 500).json({ success, message, payload });
}

module.exports = respond;
