/*jshint esversion: 8 */
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
  res.json(payload);
};
/*
const users = await db.User
.find({})
.sort({
    userName: 1
})
.catch((err) => respond(res, false, err));

return respond(res, true, users);
*/
