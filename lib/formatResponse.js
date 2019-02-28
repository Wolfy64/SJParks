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
}

module.exports = respond;
