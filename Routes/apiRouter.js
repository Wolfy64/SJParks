/** Load Configurations */
const express = require('express');
const router = express.Router();
const api = require('./Controllers');

// @route /api/user
router.route('/users').get(api.users.index).post(api.users.register); 

// @route /api/user/_id
router.route('/users/:userId').get(api.users.read).put(api.users.update).delete(api.users.destroy);

// @route /admin/image_upload
router.route('/users/image-upload').post(api.users.uploadImage);

// @route /api/user/:userId/dashboard
router.get('/user/:userID/dash', api.admins.displayDasboard);

// @route /api/users/_id/park
router.route('/users/:userId/park').get(api.users.readAllParks);

// @route /api/users/_id/message
router.route('/users/:userId/message').get(api.users.readAllMessages);

// @route /api/users/_id/park/_id
router.route('/users/:userId/park/:parkId').get(api.users.findPark);

// @route /api/user/_id/message/_id
router.route('/users/:userId/message/:messageId').get(api.users.findMessage);

// @route /api/parks
router.route('/parks').get(api.parks.index).post(api.parks.create);

// @route /api/parks/_id/
router.route('/parks/:id').get(api.parks.read).put(api.parks.update).delete(api.parks.destroy);

// @route /api/messages
router.route('/api/messages').get(api.parks.index).post(api.parks.create);

// @route /api/messages/_id
router.route('/api/messages/:messagId').get(api.parks.read).put(api.parks.update).delete(api.parks.destroy);

// @route /api/messageLogs
router.route('/api/messageLogs').get(api.messageLogs.index).post(api.messageLogs.create);

// @route /api/messageLog/_id
router
	.route('/api/messageLogs/:messageLogId')
	.get(api.messageLogs.read)
	.put(api.messageLogs.update)
	.delete(api.messageLogs.destroy);

// @route /api/subscriptionLogs
router.route('/api/subscriptionLogs').get(api.subscriptionLogs.index).post(api.subscriptionLogs.create);

// @route /api/subscriptionLogs/_id
router
	.route('/api/subscriptionLogs/:subscriptionLogId')
	.get(api.subscriptionLogs.read)
	.put(api.subscriptionLogs.update)
	.delete(api.subscriptionLogs.destroy);

module.exports = router;
