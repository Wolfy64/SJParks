/**
 * Creates a response object
 * 
 * @param {htmlResponse} res
 * @param {boolean} 
 */
exports.respond = (res, success, payload, type = 'json', endPoint = '/') => res.json(payload);
