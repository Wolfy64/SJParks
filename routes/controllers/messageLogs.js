/*jshint esversion: 8 */
// const db = require('../../models');
// const { respond } = require('../../lib');

// @route GET api/messageLogs/
// @desc Get all messageLog's
// @access Public
function index(req, res) {
  respond(res, true, '[messageLogs]');
  // db.messageLog
  //   .find({})
  //   .sort()
  //   .then((messageLogs) => respond(res, true, messageLogs))
  // 	.catch((err) => respond(res, false, {msg: err.message}));
}

// @route GET api/messageLog/:messageLogId
// @desc find a messageLog with '_id = messageLogId'
// @access Public
function read(req, res) {}

// @route POST api/messageLog/
// @desc Create a new messageLog
// @access Public
function create(req, res) {}

// @route UPDATE api/messageLog/:messageLogId
// @desc Update a messageLog with '_id = messageLogId'
// @access Public
function update(req, res) {}

// @route DELETE api/messageLog/:messageLogId
// @desc Delete a messageLog with '_id = messageLogId'
// @access Public
function destroy(req, res) {}

module.exports = {
  index,
  read,
  create,
  update,
  destroy
};
