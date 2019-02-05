// const db = require('../../models');

// @route GET api/subscriptionLog/
// @desc Get all subscriptionLog's
// @access Public
function index(req, res) {}

// @route GET api/subscriptionLog/:subscriptionLogId
// @desc find a subscriptionLog with '_id = subscriptionLogId'
// @access Public
function read(req, res) {}

// @route POST api/subscriptionLog/
// @desc Create a new subscriptionLog
// @access Public
function create(req, res) {}

// @route UPDATE api/subscriptionLog/:subscriptionLogId
// @desc Update a subscriptionLog with '_id = subscriptionLogId'
// @access Public
function update(req, res) {}

// @route DELETE api/subscriptionLog/:subscriptionLogId
// @desc Delete a subscriptionLog with '_id = subscriptionLogId'
// @access Public
function destroy(req, res) {}

module.exports = {
  index,
  read,
  create,
  update,
  destroy
};