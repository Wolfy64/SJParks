/*jshint esversion: 8 */
// import Users from '../client/src/components/UsersPage/index';
const db = require('../models');
var apiRouter = require('express').Router();
const {
  users,
  parks,
  updates,
  subscriptionLogs,
  messageLogs,
} = require('./controllers');

users.param('userId', async (req, res, next, userId) => {
  const user = await db.User
    .findById(userId)
    .catch(err => {
      req.error = err;
      next();
    });
  if (user) req.user = user;
  return next();
});
apiRouter.use('/users' , users);
apiRouter.use('/parks' , parks);
apiRouter.use('/updates' , updates);
apiRouter.use('/subscriptionLogs' , subscriptionLogs);
apiRouter.use('/messageLogs' , messageLogs);

module.exports = apiRouter;
