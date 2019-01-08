const controller = require('./controllers');
const api = require('./controllers/api');
const express = require('express');

function newRouter() {

  const router = express.Router();

  router.get('/', api.controllerIndex);

  router.post('/login', controller.login.validate);

  router.post('/login/out', controller.login.logout);

  // router.post('/message/recieve', controller.message.webhook);

  // router.post('/message/send', controller.admin.sendMessages);

  // User Routes
  router.route('/user')
    .get(api.users.index)
    .post(api.users.create);

  router.route('/user/:userId')
    .get(api.users.read)
    .put(api.users.update)
    .delete(api.users.destroy);

  router.route('/user/:userId/park')
    .get(api.users.readAllParks);

  router.route('/user/:userId/message')
    .get(api.users.readAllMessages);

  router.route('/user/:userId/park/:parkId')
    .get(api.users.findPark);

  router.route('/user/:userId/message/:messageId')
    .get(api.users.findMessage);

  // Park Routes
  router.route('/park')
    .get(api.parks.index)
    .post(api.parks.create);

  router.route('/park/:id')
    .get(api.parks.read)
    .put(api.parks.update)
    .delete(api.parks.destroy);

  // Message Routes
  router.route('/message')
    .get(api.messages.index)
    .post(api.messages.create);

  router.route('/message/:id')
    .get(api.messages.read)
    .put(api.messages.update)
    .delete(api.messages.destroy);

  // MessageLog Routes
  router.route('/messageLog')
    .get(api.messageLogs.index)
    .post(api.messageLogs.create);

  router.route('/messageLog/:id')
    .get(api.messageLogs.read)
    .put(api.messageLogs.update)
    .delete(api.messageLogs.destroy);

  // SubscriptionLog Routes
  router.route('/subscriptionLog')
    .get(api.subscriptionLogs.index)
    .post(api.subscriptionLogs.create);

  router.route('/subscriptionLog/:id')
    .get(api.subscriptionLogs.read)
    .put(api.subscriptionLogs.update)
    .delete(api.subscriptionLogs.destroy);

  return router;
}

module.exports = {
  newRouter: newRouter
}
