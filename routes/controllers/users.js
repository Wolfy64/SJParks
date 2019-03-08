/*jshint esversion: 8 */
// import UserImage from '../../client/src/components/ProfilePage/UserImage';
// import Login from '../../client/src/components/LoginPage/index';
const cloudinary = require('cloudinary');
const express = require('express');
const router = express.Router();
const config = require('../../configurations');
const db = require('../../models');
const respond = require('../../lib').respond;
const validateUserInput = require('../../configurations/validator').validateUserInput;

/**
 * @public
 * @function incoming
 * @param { request} req 
 * @param { response } res
 * @desc Create a function to handle Twilio SMS / MMS webhook requests 
 */
async function incoming(req, res) {
	const defaultResponseMessage =
		"Sorry, we didn't understand that. Available commands are: ROSE - Municipal Rose Garden, BH - Bramhall Park, DM - Del Monte Park or STOP";

	// Get the user's phone number
	const phone = req.body.From;
	// Split the user's text message into array of individual words
	const text = (req.body.Body || 'empty')
		.toLowerCase()
		.split(' ')
		.filter(x => x);
	// We only handle messages of at most two words
	// Messages with two words must begin with either the word 'start' or 'stop'
	if (text[2] || (text[1] && !['start', 'stop'].includes(text[0]))) return respond(defaultResponseMessage);

	// Handle user unsubscription requests
	if (text[0] === 'stop') {
		// Find the user document
		await db.User.findOne({ phone: phone }, async (err, user) => {
			if (err) return respond(res, false, { msg: 'Derp! Please text back again later.' });
			// We don't know this user
			if (!user) return respond(res, false, { msg: 'new phony whudis ?' });
			// Handle targeted unsubscription requests
			if (text[1]) {
				// Find the park
				await db.Park.findOne({ code: text[1] }, (err, park) => {
					if (err) return respond(res, false, { msg: 'Derp! Please text back again later.' });
					if (!park)
						return respond(res, false, {
							msg: `${text[1]} is not a valid park code. ${defaultResponseMessage}`
						});
					// Has user subscribed in the past?
					if (user.parks.indexOf(park._id) < 0)
						return respond(res, false, { msg: `You never subscribed to notifications for ${park.name}.` });
					// Find user in park document
					const index = park.users.indexOf(user._id);
					// Has user unsubscribed in the past?
					if (index < 0)
						return respond(res, false, {
							msg: `You have already unsubscribed from notifications for ${park.name}. But it was nice hearing from you!`
						});
					// Remove the user from the park document
					park.users.splice(index, 1);
					park.save(function(err, updated) {
						if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
						// Log a new unsubscription event`${text[text.length - 1]} is not a valid park code. ${defaultResponseMessage}`
						new db.SubscriptionLog({ user: user._id, park: updated._id, subscribing: false }).save(function(
							err,
							newSubscriptionResult
						) {});
						respond(res, true, {
							msg: `So sad to see you go! You have unsubscribed to notifications for ${updated.name}.`
						});
					});
				});
			} else {
				// Unsubscribe from all parks
				// Has the user subscribed before?
				if (!user.parks.length)
					return respond(res, false, { msg: 'You never subscribed to notifications from Parks and Rec' });
				// Get all the user's parks
				await db.Park.find({ _id: { $in: user.parks } }, function(err, parks) {
					if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
					// This should not happen!
					if (!parks)
						return respond(res, false, { msg: 'Your parks have been destroyed by irrational disaster!' });
					// Remove the user from each park document as above
					parks.forEach(park => {
						const index = park.users.indexOf(user._id);
						if (index >= 0) {
							park.users.splice(index, 1);
							park.save(function(err, updated) {
								if (!err)
									new db.SubscriptionLog({
										user: user._id,
										park: updated._id,
										subscribing: false
									}).save(function(err, newSubscriptionResult) {});
							});
						}
					});
					respond(res, false, {
						msg: 'So sad to see you go! You have unsubscribed to notifications from Parks and Rec.'
					});
				});
			}
		});
	} else {
		// Handle (re)subscription requests
		// 'start' is a Twilio requirement, acts more like a restart
		// Resubscribe to all prior unsubscriptions or send list of park codes
		if (text[0] === 'start' && !text[1]) {
			// Find the user
			await db.User.findOne({ phone: phone }, async (err, user) => {
				if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
				// We don't know this user
				if (!user) return respond(res, false, { msg: 'new phony whudis ?' });
				// Get all the user's parks
				await db.Park.find({ _id: { $in: user.parks } }, (err, parks) => {
					if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
					// This shouldn't happen!
					if (!parks) return respond(res, false, { msg: 'Hmmm? You have no parks to resubscribe to.' });
					// Resubscribe to all parks in user's list
					parks.forEach(park => {
						if (park.users.indexOf(user._id) < 0) {
							park.users.push(user._id);
							park.save(function(err, updated) {
								if (!err)
									new db.SubscriptionLog({
										user: user._id,
										park: updated._id,
										subscribing: true
									}).save((err, newSubscriptionResult) => {});
							});
						}
					});
					respond(res, false, { msg: 'Thanks for resubscribing to notifications from San Jose Parks!' });
				});
			});
		} else {
			// 'start [parkcode]' equivalent to '[parkcode]' i.e. resubscribe process is same as subscription process
			// Find the park
			await db.Park.findOne({ parkID: text[text.length - 1] }, async function(err, park) {
				if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
				if (!park)
					return respond(res, false, {
						msg: `${text[text.length - 1]} is not a valid park code. ${defaultResponseMessage}`
					});
				// Find user
				await db.User.findOne({ phone: phone }, function(err, user) {
					if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
					// New user
					if (!user)
						user = new db.User({
							phone: phone,
							firstName: 'Need2Update',
							lastName: 'Need2Update',
							email:
								'Need2Update@adam.henry' +
								Math.random()
									.toString(36)
									.slice(2),
							userName:
								'Need2Update' +
								Math.random()
									.toString(36)
									.slice(2),
							password:
								'Need2Update' +
								Math.random()
									.toString(36)
									.slice(2)
						});
					// Already subscribed
					if (park.users.indexOf(user._id) >= 0)
						return respond(`You are already subscribed to ${park.name}.`, false);
					else if (user.parks.indexOf(park._id) >= 0) {
						// Resubscribing?
						// Add user to park's user list, save and respond
						park.users.push(user._id);
						park.save((err, result) => {
							if (err)
								return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
							new db.SubscriptionLog({
								user: user._id,
								park: result._id,
								subscribing: true
							}).save((err, newSubscriptionResult) => {});
							respond(`Thanks for resubscribing to ${park.name}`);
						});
					} else {
						// New park subscription
						// Add park to user's park list and save
						user.parks.push(park._id);
						user.save(function(err, updatedUser) {
							if (err)
								return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
							// Add user to park's user list, save and respond
							park.users.push(updatedUser._id);
							park.save(function(err, result) {
								if (err)
									return respond(res, false, {
										msg: 'Derp! Please text back again later.',
										error: err
									});
								new db.SubscriptionLog({
									user: updatedUser._id,
									park: result._id,
									subscribing: true
								}).save(function(err, newSubscriptionResult) {});
								respond(`Thanks for subscribing to ${park.name}`);
							});
						});
					}
				});
			});
		}
	}
}

/**
 * @public
 * @function read
 * @param {request} req 
 * @param {response} res 
 * @method GET /api/user/:userId 
 * @desc Read a user by userId 
 */

async function read(req, res) {
	return new Promise(async function(resolve, reject) {
		console.log(req.user);
		if (req.user) {
			resolve(respond(res, true, req.user));
		} else {
			reject(respond(res, false, req.error));
		}
	});
}

/**
 * @public
 * @function index
 * @param {request} req 
 * @param {response} res 
 * @method GET /api/users 
 * @desc Get all users 
 */

async function index(req, res) {
	return new Promise(async (resolve, reject) => {
		const users = await db.User
			.find()
			.sort({
				userName: 1
			})
			.catch(err => {
				console.log(err);
				return reject(respond(res, false, err));
			});

		return resolve(respond(res, true, users));
	});
}

/**
 * @public
 * @function create
 * @param {request} req 
 * @param {response} res 
 * @method POST api/user/ 
 * @desc Create An New user 
 */
async function create(req, res) {
	return new Promise(async (resolve, reject) => {
		const { errors, isValid, data } = await validateUserInput(req).catch(err => console.log(err));

		if (!isValid) reject(respond(res, false, errors));
		else {
			delete data.queries;
			var newUser = new db.User(data);
			await newUser.save().catch(err => console.log(err));
			resolve(respond(res, true, newUser));
		}
	});
}

/**  
 * Update an existing user by userId 
 * 
 * @public
 * @param {request} req 
 * @param {response} res 
 * @method PUT /api/user/:userId
 */
async function update(req, res) {
	const { errors, isValid, data } = await validateUserInput(req).catch(err => console.log(err));

	if (!isValid) {
		console.log(errors);
		respond(res, false, errors);
	} else {
		/** 
		 * These are the options for 'findByIdAndUpdate'. Please see the link that follows for *further details.
		 * 
		 * @see https://mongoosejs.com/docs/*api.html#model_Model.findByIdAndUpdate"} 
		 * 
		 * */

		const options = {
			setDefaultsOnInsert: true,
			new: true,
			upsert: true,
			runValidators: true
		};

		const foundUser = await db.User.findByIdAndUpdate(data.id, data, options).catch(err => console.log(err));
		if (foundUser) respond(res, true, foundUser);
	}
}

/**  
 * Delete an existing user by id 
 * 
 * @method DELETE api/user/:userId 
 * @function destroy
 * @param {request} req 
 * @param {response} res 
 * @public
 * 
 */

async function destroy(req, res) {
	if (req.user) {
		const removedUser = await db.User.findByIdAndRemove(req.user._id).catch(err => {
			console.log(err);
			respond(res, false, err);
		});

		respond(res, true, removedUser);
	}
}

/**
 * Upload a userImage for an existing user by id 
 * 
 * @method POST /api/user/:userId/image   
 * @function uploadImage
 * @param {request} req 
 * @param {response} res 
 * @public
 * 
 */
function uploadImage(req, res) {
	cloudinary.config(
		config.keys
			.cl /*{
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET
	}*/
	);
	const values = Object.values(req.files);
	const promises = values.map(image => cloudinary.uploader.upload(image.path));

	Promise.all(promises)
		.then(results => respond(res, true, results))
		.catch(err => respond(res, false, err));
}

/**
 * @public
 * @function readAllParks
 * @param {request} req 
 * @param {response} res 
 * @method GET /api/users/:userId/parks  
 * @desc Retrive all parks to which user,_id is subscribed 
 */

function readAllParks(req, res) {
	db.User
		.findById(req.params.userId)
		.populate('parks')
		.then(user => {
			respond(res, true, user.parks);
		})
		.catch(err => respond(res, false, err));
}

/**
 * @public
 * @function readAllUpdates
 * @param {request} req 
 * @param {response} res 
 * @method GET /api/users/_id/messages  
 * @desc Retrive all messagess user,_id has ever sent or recieved 
 */

function readAllUpdates(req, res) {
	db.User
		.findById(req.params.id)
		.populate('updates')
		.then(user => {
			respond(res, true, user.updates);
		})
		.catch(err => respond(res, false, err));
}

/**
 * @public
 * @function findPark
 * @param {request} req 
 * @param {response} res 
 * @method GET /api/users/:userId/parks/:parkId  
 * @desc Find a park, by parkId, to which userId is subscribed 
 */

function findPark(req, res) {
	db.User
		.findById(req.params.userId)
		.then(user => {
			const park = user.parks.find(park => park._id === req.params.parkId);
			respond(res, true, { userId: user._id, parkId: park._id });
		})
		.catch(err => respond(res, false, err));
}

/**
 * Find a update, by updateId, that userId has either sent or recieved
 * 
 * @public
 * @param {request} req 
 * @param {response} res 
 * @method GET /api/users/:userId/updates/:updateId  
 */
function findUpdate(req, res) {
	db.User
		.findById(req.params.userId)
		.then(user => {
			const update = user.updates.find(update => update._id === req.params.updateId);
			respond(res, true, { userId: user._id, updateId: update._id });
		})
		.catch(err => respond(res, false, err));
}

router
	.route('/')
	.get(index)
	.post(create);

router
	.route('/:userId')
	.get(read)
	.put(update)
	.delete(destroy);
	
router.route('/incoming').post(incoming);
	
router.route('/:userId/uploadImage').post(uploadImage);

router.route('/:userId/parks').get(readAllParks);

router.route('/:userId/updates').get(readAllUpdates);

router.route('/:userId/parks/:parkId').get(findPark);

router.route('/:userId/updates/:updateId').get(findUpdate);

module.exports = router /*{
	incoming,
	index,
	login,
	logout,
	read,
	readAllParks,
	readAllUpdates,
	findPark,
	findUpdate
}*/;
