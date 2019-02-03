/** Load Configurations/  */
const express = require('express');
const router = express.Router();
const api = require('./Controllers');
// var apiManifest = require('../config/apiManifest');

/** Users */
router.route('/users').get(api.users.index).post(api.users.create); 

router.route('/users/:userId').get(api.users.read).put(api.users.update).delete(api.users.destroy);

router.route('/users/:userId/imageUp').post(api.users.uploadImage);

// router.get('/user/:userID/dash', api.admins.displayDasboard);

router.route('/users/:userId/parks').get(api.users.readAllParks);

router.route('/users/:userId/messages').get(api.users.readAllMessages);

router.route('/users/:userId/parks/:parkId').get(api.users.findPark);

router.route('/users/:userId/messages/:messageId').get(api.users.findMessage);

/** Parks */
router.route('/parks').get(api.parks.index).post(api.parks.create);

router.route('/parks/:id').get(api.parks.read).put(api.parks.update).delete(api.parks.destroy);

/** Messages */
router.route('/api/messages').get(api.parks.index).post(api.parks.create);

router.route('/api/messages/:messagId').get(api.parks.read).put(api.parks.update).delete(api.parks.destroy);

/** MessageLogs */
router.route('/api/messageLogs').get(api.messageLogs.index).post(api.messageLogs.create);

router
	.route('/api/messageLogs/:messageLogId')
	.get(api.messageLogs.read)
	.put(api.messageLogs.update)
	.delete(api.messageLogs.destroy);

	/** SubscriptionLogs */
router.route('/api/subscriptionLogs').get(api.subscriptionLogs.index).post(api.subscriptionLogs.create);

router
	.route('/api/subscriptionLogs/:subscriptionLogId')
	.get(api.subscriptionLogs.read)
	.put(api.subscriptionLogs.update)
	.delete(api.subscriptionLogs.destroy);

module.exports = router;
