/*jshint esversion: 8 */
/**
 * Creates a response object
 *
 * @param {htmlResponse} res
 * @param {boolean} success
 * @param {Object} payload
 */
exports.respond = (
  res,
  success,
  payload = {}
) => {
  payload.success = success;
  console.log('TCL: exports.respond -> payload', payload);
  res.json(payload);
};
