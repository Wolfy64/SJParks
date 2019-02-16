/**
 * Creates a response object
 *
 * @param {htmlResponse} res
 * @param {boolean}
 */
exports.respond = (
  res,
  success,
  payload = {},
  type = 'json',
  endPoint = '/'
) => {
  payload.success = success;
  console.log('TCL: exports.respond -> payload', payload);
  res.json(payload);
};
