const db = require('../../models');

// @route GET api/message/
// @desc Get all message's
// @access Public
function index(req, res) {}

// @route GET api/message/:messageId
// @desc Find a message with '_id = messageId'
// @access Public
function read(req, res) {}

// @route POST api/message/
// @desc Create a new message
// @access Public
function create(req, res) {}

// @route UPDATE api/message/:messageId
// @desc Update a message with '_id = messageId'
// @access Public
function update(req, res) {}

// @route DELETE api/message/:messageId
// @desc Delete a message with '_id = messageId'
// @access Public
function destroy(req, res) {}

module.exports = {
  index: index,
  read: read,
  create: create,
  update: update,
  destroy: destroy
}
