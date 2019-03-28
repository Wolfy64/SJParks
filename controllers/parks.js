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
const getAllParks = async (req, res) => {
  const parks = await db.Park.find({ active: 1 }, { _id: 1, code: 1, name: 1 })
    .sort({ code: 1, name: 1 })
    .catch(err => respond(res, false, err));
  respond(res, true, parks);
};

module.exports = {
  getAllParks
};
