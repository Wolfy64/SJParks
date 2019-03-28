const { respond } = require('../lib');
const db = require('../models');

/**
 * @public
 * @function index
 * @param {request} req
 * @param {response} res
 * @method GET /api/parks
 * @desc This will return the index of parks
 */
const signUp = async (req, res) => {
  if (req.phone && req.addParks) {
    const phone = req.phone;
    const parksToSubscribe = req.addParks;
    console.log('hit this route');
    respond(res, true, phone);
  } else respond('Must send vaild data', false);
};

module.exports = {
  signUp
};
