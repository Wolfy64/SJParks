const express = require('express');
const router = express.Router();
const users = require('./Routes');
const config = require("./config");

console.log(`>[ROUTES:010:030]> Configuring Routes...`);

// @route /api/users/register()
router.get('/api/users/register', (req, res) => res.render('register')); // api.users.register

// @route /api/login
router.post('/api/login', users.login);

// @route /welcome
// router.get('/welcome', view.dashboard.sendMessages);


// @route /api/users/logout
router.post('/api/logout', ensureAuthenticated, api.users.logout)

// @route /api/user/:userId/dashboard
router.get('/api/user/:userID/', ensureAuthenticated, (req, res) => res.render('adminDashboard', {
  user: req.user
}));

// @route /api/*
/*Need to be White Listed: "/api/parks", */
// router.all('/api/*', ensureAuthenticated);

// @route /api
router.get('/api', index);

// @route /api/messages
router.route('/api/messages')
// .get(index)
// .post(create);

// @route /api/messages/_id
router.route('/api/messages/:messagId')
// .get(read)
// .put(update)
// .delete(destroy);

// // @route /api/messageLogs
// router.route('/api/messageLogs')
//   .get(api.messageLogs.index)
//   .post(api.messageLogs.create);

// // @route /api/messageLog/_id
// router.route('/api/messageLogs/:messageLogId')
//   .get(api.messageLogs.read)
//   .put(api.messageLogs.update)
//   .delete(api.messageLogs.destroy);

// // @route /api/subscriptionLogs
// router.route('/api/subscriptionLogs')
//   .get(api.subscriptionLogs.index)
//   .post(api.subscriptionLogs.create);

// // @route /api/subscriptionLogs/_id
// router.route('/api/subscriptionLogs/:subscriptionLogId')
//   .get(api.subscriptionLogs.read)
//   .put(api.subscriptionLogs.update)
//   .delete(api.subscriptionLogs.destroy);

console.log(`>[ROUTES:094:035]> ...Routes Configured`);

module.exports = router;
