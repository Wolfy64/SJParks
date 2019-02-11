const path = require('path');
const express = require('express');
/** Load Configurations  */
const router = express.Router();
const api = require('./Controllers');
const { config } = require('../config');
// var apiManifest = require('../config/apiManifest');

/** Users */
router.route('/users')
	.get(controllers.users.index)
	.post(controllers.users.create)
	.delete(controllers.users.destroy)
	.put(controllers.users.update)

router.route('/users/:userId')
	.get(controllers.users.read)

router.route('/users/:userId/uploadImage').post(api.users.uploadImage);

router.route('/users/:userId/parks').get(api.users.readAllParks);

router.route('/users/:userId/updates').get(api.users.readAllUpdates);

router.route('/users/:userId/parks/:parkId').get(api.users.findPark);

router.route('/users/:userId/updates/:updateId').get(api.users.findUpdate);

/** Parks */
router.route('/parks')
	.get(controllers.parks.index)
	.post(controllers.parks.create)
	.delete(controllers.parks.destroy)

router.route('/parks/:id').get(controllers.parks.read).put(controllers.parks.update);

/** Updates */
router.route('/updates')
	.get(controllers.updates.index)
	.post(controllers.updates.send);

router.route('/api/updates/:updateId').get(api.parks.read).put(api.parks.update).delete(api.parks.destroy);

/** MessageLogs */
router.route('/messageLogs')
	.get(controllers.messageLogs.index)
	.post(controllers.messageLogs.create);

router
	.route('/api/messageLogs/:messageLogId')
	.get(api.messageLogs.read)
	.put(api.messageLogs.update)
	.delete(api.messageLogs.destroy);

/** SubscriptionLogs */
router.route('/subscriptionLogs')
	.get(controllers.subscriptionLogs.index)
	.post(controllers.subscriptionLogs.create);

router
	.route('/api/subscriptionLogs/:subscriptionLogId')
	.get(api.subscriptionLogs.read)
	.put(api.subscriptionLogs.edit)
	.delete(api.subscriptionLogs.destroy);

module.exports = router;
