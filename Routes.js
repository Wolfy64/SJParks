const express = require('express');
const router = express.Router();
const {api} = require('./controllers');
const config = require('./config');
const {
  ensureAuthenticated
} = config.auth;

console.log(`>[ROUTES:010:030]> Configuring Routes...`);


// @route /register
router.get('/register', (req, res) => res.render('register')); // api.users.register

// @route /login
router.post('/login', api.users.login);

// @route /welcome
router.get('/welcome', (req, res) => res.render('welcome'));

// @route /logout
router.post('/logout', api.users.logout)

// @route /dashboard
router.get('/admin/:userID/updates', ensureAuthenticated, (req, res) => res.render('adminDashboard', {
  user: req.user
}));

// @route /api/*
/*Need to be White Listed: "/api/parks", */
// router.all('/api/*', ensureAuthenticated);

// @route /api
router.get('/api', api.index.index);

// @route /api/user
router.route('/api/users')
  .get(api.users.index)
  .post(api.users.register);

  router.route('/admin/image-upload')
  .post(api.users.imageUpload);

  // @route /api/user/_id
router.route('/api/users/:userId')
  .get(api.users.read)
  .put(api.users.update)
  .delete(api.users.destroy);

//  // @route /api/users/_id/park
// router.route('/api/users/:userId/park')
//   .get(api.users.readAllParks);

// // @route /api/users/_id/message
// router.route('/api/users/:userId/message')
//   .get(api.users.readAllMessages);

// // @route /api/users/_id/park/_id
// router.route('/api/users/:userId/park/:parkId')
//   .get(api.users.findPark);

// // @route /api/user/_id/message/_id
// router.route('/api/users/:userId/message/:messageId')
//   .get(api.users.findMessage);

// @route /api/park
router.route('/api/parks')
  .get(api.parks.index)
  .post(api.parks.create);

  // @route /api/parks/_id/
router.route('/api/parks/:id')
  // .get(api.parks.read)
  // .put(api.parks.update)
  // .delete(api.parks.destroy);

// @route /api/messages
router.route('/api/messages')
  // .get(api.messages.index)
  // .post(api.messages.create);

// @route /api/messages/_id
router.route('/api/messages/:messagId')
  // .get(api.messages.read)
  // .put(api.messages.update)
  // .delete(api.messages.destroy);

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

router.get('*', (req, res) => res.sendFile(path.join(__dirname,'../client/build/index.html')))

console.log(`>[ROUTES:094:035]> ...Routes Configured`);

module.exports = router;
