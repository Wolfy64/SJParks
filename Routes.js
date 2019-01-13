
const express = require('express');
const router = express.Router();
const {api} = require('./controllers');
const config = require("./config");
const {
  ensureAuthenticated
} = config.auth;

console.log(`>[ROUTES:010:030]> Configuring Routes...`);

// @route /register
router.get('/register', (req, res) => res.render('register')); // api.

// @route /login
router.post('/login', api.users.login);

// @route /welcome
router.get('/welcome', (req, res) => res.render('welcome'));

// @route /logout
router.post('/logout', api.users.logout)

// @route /dashboard
router.get('/admin/updates', ensureAuthenticated, (req, res) => res.render('dashboard', {
  user: req.user
}));

// @route /api/*
/**/
// router.all('/api/*', ensureAuthenticated);

// @route /api
router.get('/api', api.index.index);

// @route /api/user
router.route('/api/user')
  .get(api.users.index)
  .post(api.users.register);

  // @route /api/user/_id
router.route('/api/user/:userId')
  .get(api.users.read)
  .put(api.users.update)
  .delete(api.users.destroy);

//  // @route /api/user/_id/park
// router.route('/api/user/:userId/park')
//   .get(api.users.readAllParks);

// // @route /api/user/_id/message
// router.route('/api/user/:userId/message')
//   .get(api.users.readAllMessages);

// // @route /api/user/_id/park/_id
// router.route('/api/user/:userId/park/:parkId')
//   .get(api.users.findPark);

// // @route /api/user/_id/message/_id
// router.route('/api/user/:userId/message/:messageId')
//   .get(api.users.findMessage);

// @route /api/park
router.route('/api/park')
  .get(api.parks.index)
  .post(api.parks.create);

  // @route /api/park/_id/
router.route('/api/park/:id')
  // .get(api.parks.read)
  // .put(api.parks.update)
  // .delete(api.parks.destroy);

// @route /api/message
router.route('/api/message')
  // .get(api.messages.index)
  // .post(api.messages.create);

// @route /api/message/_id
router.route('/api/message/:id')
  // .get(api.messages.read)
  // .put(api.messages.update)
  // .delete(api.messages.destroy);

// // @route /api/messageLog
// router.route('/api/messageLog')
//   .get(api.messageLogs.index)
//   .post(api.messageLogs.create);

// // @route /api/messageLog/_id
// router.route('/api/messageLog/:id')
//   .get(api.messageLogs.read)
//   .put(api.messageLogs.update)
//   .delete(api.messageLogs.destroy);

// // @route /api/subscriptionLog
// router.route('/api/subscriptionLog')
//   .get(api.subscriptionLogs.index)
//   .post(api.subscriptionLogs.create);

// // @route /api/subscriptionLog/_id
// router.route('/api/subscriptionLog/:id')
//   .get(api.subscriptionLogs.read)
//   .put(api.subscriptionLogs.update)
//   .delete(api.subscriptionLogs.destroy);

console.log(`>[ROUTES:094:035]> ...Routes Configured`);

module.exports = router;
