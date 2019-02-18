/*jshint esversion: 6 */
const db = require('../../models');
const { respond } = require('../../lib');


/**
 * @public
 * @function index
 * @param {request} req 
 * @param {response} res 
 * @method GET /api/subscriptionLog 
 * @desc Get all subscriptionLogs
 */
function index(req, res) {
  db.SubscriptionLog
    .find()
    .sort()
    .then((subscriptionLogs) => respond(res, true, subscriptionLogs))
		.catch((err) => respond(res, false, {msg: err.message}));
}

/**
 * @public
 * @function read
 * @param {request} req 
 * @param {response} res 
 * @method GET api/subscriptionLog/:subscriptionLogId 
 * @desc find a subscriptionLog with '_id = subscriptionLogId'
 */
function read(req, res) {
  db.SubscriptionLog
  .findById(req.params.subscriptionLogId)
  .then((subscriptionLog) => respond(res, true, subscriptionLog))
  .catch((err) => respond(res, false, {msg: err.message}));
}

/**
 * @public
 * @function create
 * @param {request} req 
 * @param {response} res 
 * @method POST /api/subscriptionLog 
 * @desc Create a new subscriptionLog 
 */
function create(req, res) {
  console.log(req.body);
  const data = req.body;
  // const errors = [];
  // const isValid = true;

  // Initialize a new subscriptionLog
  const newSubscriptionLog = new db.SubscriptionLog(data);

  // Save the new subscriptionLog to db
  newSubscriptionLog
    .save()
    .then(log => respond(res, true, log))
    .catch(err => respond(res,false, {msg: err.message}));
}

/**
 * @public
 * @function edit
 * @param {request} req 
 * @param {response} res 
 * @method PUT /api/subscriptionLog/:subscriptionLogId 
 * @desc Update a subscriptionLog givrn it's subscriptionLogId
 */
function edit(req, res) { }

/**
 * @public
 * @function destroy
 * @param {request} req 
 * @param {response} res 
 * @method DELETE api/subscriptionLog/:subscriptionLogId  
 * @desc Delete a subscriptionLog with '_id = subscriptionLogId' 
 */
function destroy(req, res) {

  // Find a subscriptionLog by subscriptionLogId
  db.SubscriptionLog
		.findByIdAndDelete({
			_id: req.params.subscriptionLogId
		})
    .then((subscriptionLog) => {
      console.log(subscriptionLog);

      // Remove this subscriptionLog from each associated park
      subscriptionLog.parks.forEach(parkId => {

       // Find the associated park, by parkId
        db.Park
          .findById(parkId)
          .populate('subscriptionLogs') 
          .then(foundPark => {
            console.log(foundPark._id);

            // Remove subscriptionLog from foundPark
            foundPark.subscriptionLogs = foundPark.subscriptionLogs.filter(log => log._id !== subscriptionLog._id);

            // Save foundPark to db.
            foundPark
              .save()
              .then(savedPark => console.log(`A park was saved to the db while destroying a subscriptionLog, here is it's parkId: ${savedPark._Id}`))
              .catch(err => console.log(` Had trouble saving ${foundPark._id}. Here is the error thrown: ${err}`));
          })
          .catch(err => console.log(`Had trouble finding a park while destroying subscriptionLog: ${subscriptionLog._id}. Here is the error thrown: ${err}`));
      });

      // Find  a user by subscriptionLog.user._id 
      db.User
        .findById(subscriptionLog.user)
        .then(foundUser => {
          console.log(foundUser);

          // From foundUser, filter out any parkIDs belonging to a park in this subscriptionLog 
          foundUser.parks.filter(parkId => !subscriptionLog.parks.includes(parkId));

          // Save foundUser to db
          foundUser
            .save()
            .then(savedUser => console.log(`A user was saved to the db while destroying a subscriptionLog, here is it's userId: ${savedUser._Id}`))
            .catch(err => console.log(`Had trouble saving ${foundUser._id}. Here is the error thrown: ${err}`));
          
         })
        .catch(err => console.log(`Had trouble finding a user while destroying subscriptionLog: ${subscriptionLog._id}. Here is the error thrown: ${err}`));
      
    // Remove the subscriptionLog from db
      subscriptionLog
				.remove()
        .then((removedSubscriptionLog) => {
          console.log(removedSubscriptionLog);
          respond(res, true, { msg: removedSubscriptionLog._id });
        })
        .catch((err) => {
          console.log(err);
          respond(res, false, { msg: err.message });
        });
		})
		.catch((err) => console.log(err));
}

// const express = require('express');
// const router = express.Router();

// // @route /api/subscriptionLogs
// router.route('/api/subscriptionLogs')
//   .get(api.subscriptionLogs.index)
//   .post(api.subscriptionLogs.create);

// // @route /api/subscriptionLogs/_id
// router.route('/api/subscriptionLogs/:subscriptionLogId')
//   .get(api.subscriptionLogs.read)
//   .put(api.subscriptionLogs.update)
//   .delete(api.subscriptionLogs.destroy);

module.exports =  /*router*/{
  create,
  read,
  index,
  edit,
  destroy
};