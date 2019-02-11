const path = require('path');
const express = require('express');
/** Load Configurations  */
const router = express.Router();
const api = require('./Controllers');
const { config } = require('../config');
// var apiManifest = require('../config/apiManifest');

/** Users */
router.route('/users').get(api.users.index).post(api.users.create); 

router.route('/users/:userId').get(api.users.read).put(api.users.update).delete(api.users.destroy);

router.route('/users/:userId/imageUp').post(api.users.uploadImage);

router.route('/users/:userId/parks').get(api.users.readAllParks);

router.route('/users/:userId/updates').get(api.users.readAllUpdates);

router.route('/users/:userId/parks/:parkId').get(api.users.findPark);

router.route('/users/:userId/updates/:updateId').get(api.users.findUpdate);

/** Parks */
router.route('/parks').get(api.parks.index).post(api.parks.create);

router.route('/parks/:id').get(api.parks.read).put(api.parks.update).delete(api.parks.destroy);

/** Updates */
router.route('/api/updates').get(api.parks.index).post(api.parks.create);

router.route('/api/updates/:updateId').get(api.parks.read).put(api.parks.update).delete(api.parks.destroy);

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
	.put(api.subscriptionLogs.edit)
	.delete(api.subscriptionLogs.destroy);

module.exports = router;
