const db = require('../../models');

// @route GET api/messageLog/
// @desc Get all messageLog's
// @access Public
function index(req, res) {}

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

const express = require('express');
const router = express.Router();

// @route /api/messageLogs
router.route('/api/messageLogs')
  .get(index)
  .post(create);

// @route /api/messageLog/_id
router.route('/api/messageLogs/:messageLogId')
  .get(read)
  .put(update)
  .delete(destroy);

module.exports = router;