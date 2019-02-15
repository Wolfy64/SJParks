const path = require('path');
const express = require('express');
/** Load Configurations  */
const router = express.Router();
const controllers = require('./Controllers');
const { config } = require('../config');
// var apiManifest = require('../config/apiManifest');

/** Users */
router.route('/users').get(controllers.users.index).post(controllers.users.create); 

router.route('/users/:userId').get(controllers.users.read).put(controllers.users.update).delete(controllers.users.destroy);

router.route('/users/:userId/uploadImage').post(controllers.users.uploadImage);

router.route('/users/:userId/parks').get(controllers.users.readAllParks);

router.route('/users/:userId/updates').get(controllers.users.readAllUpdates);

router.route('/users/:userId/parks/:parkId').get(controllers.users.findPark);

router.route('/users/:userId/updates/:updateId').get(controllers.users.findUpdate);

/** Parks */
router.route('/parks')
	.get(controllers.parks.index)
	.post(controllers.parks.create)
	.delete(controllers.parks.destroy)

router.route('/parks/:id').get(controllers.parks.read).put(controllers.parks.update);

/** Updates */
router.route('/api/updates').get(controllers.parks.index).post(controllers.parks.create);

router.route('/api/updates/:updateId').get(controllers.parks.read).put(controllers.parks.update).delete(controllers.parks.destroy);

/** MessageLogs */
router.route('/api/messageLogs').get(controllers.messageLogs.index).post(controllers.messageLogs.create);

router
	.route('/api/messageLogs/:messageLogId')
	.get(controllers.messageLogs.read)
	.put(controllers.messageLogs.update)
	.delete(controllers.messageLogs.destroy);

	/** SubscriptionLogs */
router.route('/api/subscriptionLogs').get(controllers.subscriptionLogs.index).post(controllers.subscriptionLogs.create);

router
	.route('/api/subscriptionLogs/:subscriptionLogId')
	.get(controllers.subscriptionLogs.read)
	.put(controllers.subscriptionLogs.edit)
	.delete(controllers.subscriptionLogs.destroy);

router.get('/auth', controllers.admin.ensureAuthenticated)

module.exports = router;
