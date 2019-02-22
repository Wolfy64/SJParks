/*jshint esversion: 8 */
/**
 * Creates a response object
 *
 * @param {object} res
 * @param {boolean} success
 * @param {Object} payload
 */
function respond (res, success, payload = {}){
  payload.success = success;
  res.status(success? 200 : 437).send(payload);
}

module.exports = respond;
