/** Users */
// router
//   .route('/users')
//   .get(controllers.users.index)
//   .post(controllers.users.create)
//   .delete(controllers.users.destroy)
//   .put(controllers.users.update);

// router.route('/users/:userId').get(controllers.users.read);

// router.route('/users/:userId/uploadImage').post(controllers.users.uploadImage);

// router.route('/users/:userId/parks').get(controllers.users.readAllParks);

// router.route('/users/:userId/updates').get(controllers.users.readAllUpdates);

// router.route('/users/:userId/parks/:parkId').get(controllers.users.findPark);

// router
//   .route('/users/:userId/updates/:updateId')
//   .get(controllers.users.findUpdate);

/** Parks */
// router
//   .route('/parks')
//   .get(controllers.parks.index)
//   .post(controllers.parks.create)
//   .delete(controllers.parks.destroy);

// router
//   .route('/parks/:id')
//   .get(controllers.parks.read)
//   .put(controllers.parks.update);

/** Updates */
// router
//   .route('/updates')
//   .get(controllers.updates.index)
//   .post(controllers.updates.send);

// router
//   .route('/api/updates/:updateId')
//   .get(controllers.parks.read)
//   .put(controllers.parks.update)
//   .delete(controllers.parks.destroy);

/** MessageLogs */
// router
//   .route('/messageLogs')
//   .get(controllers.messageLogs.index)
//   .post(controllers.messageLogs.create);

// router
//   .route('/api/messageLogs/:messageLogId')
//   .get(controllers.messageLogs.read)
//   .put(controllers.messageLogs.update)
//   .delete(controllers.messageLogs.destroy);

/** SubscriptionLogs */
// router
//   .route('/subscriptionLogs')
//   .get(controllers.subscriptionLogs.index)
//   .post(controllers.subscriptionLogs.create);

// router
//   .route('/api/subscriptionLogs/:subscriptionLogId')
//   .get(controllers.subscriptionLogs.read)
//   .put(controllers.subscriptionLogs.edit)
//   .delete(controllers.subscriptionLogs.destroy);

// router.get('/auth', controllers.admin.ensureAuthenticated);

// #####

// const db = require('../models');

// users.param('userId', async (req, res, next, userId) => {
//   const user = await db.User.findById(userId).catch(err => {
//     req.error = err;
//     return next();
//   });
//   if (user) req.user = user;
//   return next();
// });
// parks.param('parkId', async (req, res, next, parkId) => {
//   const park = await db.Park.findById(parkId).catch(err => {
//     req.err = err;
//     return next();
//   });
//   if (park) req.park = park;
//   return next();
// });
// apiRouter.use('/users', users);
// apiRouter.use('/parks', parks);
// apiRouter.use('/updates', updates);
// apiRouter.use('/subscriptionLogs', subscriptionLogs);
// apiRouter.use('/messageLogs', messageLogs);
