const db = require('../../models');

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

const express = require('express');
const router = express.Router();

// @route /api/subscriptionLogs
router.route('/api/subscriptionLogs')
  .get(index)
  .post(create);

// @route /api/subscriptionLogs/_id
router.route('/api/subscriptionLogs/:subscriptionLogId')
  .get(read)
  .put(update)
  .delete(destroy);

module.exports = router;