/*jshint esversion: 8 */
/**
 * Creates a response object
 *
 * @param {object} res
 * @param {boolean} success
 * @param {Object} payload
 * @param {String} message
 */
function respond(res, success, payload = {}, message) {
  if (!success && !message) message = 'Something went wrong';
  res.status(success ? 200 : 500).json({ success, message, payload });
}

module.exports = respond;
