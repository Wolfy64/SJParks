// import UserImage from '../../client/src/components/ProfilePage/UserImage';
const db = require('../../models');
const cloudinary = require('cloudinary');
const { validateUserInput } = require('../../config/validator');
const { respond } = require('../../lib');

/**
 * @public
 * @function incoming
 * @param { request} req 
 * @param { response } res
 * @desc Create a function to handle Twilio SMS / MMS webhook requests 
 */
function incoming(req, res) {
	const defaultResponseMessage =
		"Sorry, we didn't understand that. Available commands are: ROSE - Municipal Rose Garden, BH - Bramhall Park, DM - Del Monte Park or STOP";

	// Get the user's phone number
	const phone = req.body.From;
	// Split the user's text message into array of individual words
	const text = (req.body.Body || 'empty').toLowerCase().split(' ').filter((x) => x);
	// We only handle messages of at most two words
	// Messages with two words must begin with either the word 'start' or 'stop'
	if (text[2] || (text[1] && ![ 'start', 'stop' ].includes(text[0]))) return respond(defaultResponseMessage);

	// Handle user unsubscription requests
	if (text[0] === 'stop') {
		// Find the user document
		db.User.findOne({ phone: phone }, (err, user) => {
			if (err) return respond(res, false, { msg: 'Derp! Please text back again later.' });
			// We don't know this user
			if (!user) return respond(res, false, { msg: 'new phony whudis ?' });
			// Handle targeted unsubscription requests
			if (text[1]) {
				// Find the park
				db.Park.findOne({ code: text[1] }, (err, park) => {
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
				if (!user.parks.length) return respond(res, false, { msg: 'You never subscribed to notifications from Parks and Rec'});
				// Get all the user's parks
				db.Park.find({ _id: { $in: user.parks } }, function(err, parks) {
					if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
					// This should not happen!
					if (!parks) return respond(res, false, { msg: 'Your parks have been destroyed by irrational disaster!' });
					// Remove the user from each park document as above
					parks.forEach((park) => {
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
					respond(res, false, { msg: 'So sad to see you go! You have unsubscribed to notifications from Parks and Rec.' });
				});
			}
		});
	} else {
		// Handle (re)subscription requests
		// 'start' is a Twilio requirement, acts more like a restart
		// Resubscribe to all prior unsubscriptions or send list of park codes
		if (text[0] === 'start' && !text[1]) {
			// Find the user
			db.User.findOne({ phone: phone }, (err, user) => {
				if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
				// We don't know this user
				if (!user) return respond(res, false, { msg: 'new phony whudis ?' });
				// Get all the user's parks
				db.Park.find({ _id: { $in: user.parks } }, (err, parks) => {
					if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
					// This shouldn't happen!
					if (!parks) return respond(res, false, { msg: 'Hmmm? You have no parks to resubscribe to.' });
					// Resubscribe to all parks in user's list
					parks.forEach((park) => {
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
						}`${text[text.length - 1]} is not a valid park code. ${defaultResponseMessage}`
					});
						respond(res, false, { msg: 'Thanks for resubscribing to notifications from San Jose Parks!'});
				});
			});
		} else {
			// 'start [parkcode]' equivalent to '[parkcode]' i.e. resubscribe process is same as subscription process
			// Find the park
			db.Park.findOne({ parkID: text[text.length - 1] }, function (err, park) {
				if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
				if (!park)
					return respond(
						res, false, { msg: `${text[text.length - 1]} is not a valid park code. ${defaultResponseMessage}`}
					);
				// Find user
				db.User.findOne({ phone: phone }, function(err, user) {
					if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
					// New user
					if (!user)
						user = new db.User({
							phone: phone,
							firstName: 'Need2Update',
							lastName: 'Need2Update',
							email: 'Need2Update@adam.henry' + Math.random().toString(36).slice(2),
							userName: 'Need2Update' + Math.random().toString(36).slice(2),
							password: 'Need2Update' + Math.random().toString(36).slice(2)
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
function read(req, res) {
	db.User
		.findById(req.params.userId)
		.then((user) => respond(res, true, user))
		.catch((err) => respond(res, false, err));
}

/**
 * @public
 * @function index
 * @param {request} req 
 * @param {response} res 
 * @method GET /api/user 
 * @desc Get all users 
 */
function index(req, res) {
	db.User
		.find()
		.sort({
			userName: 1
		})
		.then((users) => respond(res, true, users))
		.catch((err) => respond(res, false, { msg: err.message }));
}

/**
 * @public
 * @function create
 * @param {request} req 
 * @param {response} res 
 * @method POST api/user/ 
 * @desc Create An New user 
 */
function create(req, res) {
	const { errors, isValid, data } = validateUserInput(req.body);

	if (!isValid) {
		console.log({ success: false, error: errors });
		respond(res, false, errors);
	} else {
		console.log(data);
		const newUser = new db.User(data);

		newUser.setPassword(data.password);
		console.log(newUser);
		newUser
			.save()
			.then((user) => {
				console.log(`New user created. NewUser: ${user._id}`);
				respond(res, true, user);
			})
			.catch((err) => {
				errors.push(new Error({ msg: 'Could not save user', error: err }));
				respond(res, false, errors);
			});
	}
}
/**
function create(req, res)
{
	const {
		isAdmin,
		userName,
		firstName,
		lastName,
		phone,
		email,
		password,
		addPark,
		addMessage
	} = req.body;

	let errors = [];

	if (!userName || !firstName || !lastName || !phone || !email || !password)
	{
		errors.push({
			msg: 'Please enter all fields'
		});
	}

	if (password.length < 8)
	{
		errors.push({
			msg: 'Password must be at least 8 characters'
		});
	}

	if (errors.length > 0)
	{
		res.render('register', {
			errors,
			email,
			password
		});
	} else
	{
		let user = null;
		db.User.findOne({
			userName: userName,
			phone: phone,
			email: email
		}).then(userFound =>
		{
			if (userFound) user = userFound;
		});
		if (user != null)
		{
			errors.push({
				msg: `Derp! User already exists!`,
				user: user
			})
			res.render('register', {
				errors,
				user
			});
		} else
		{

			const newUser = new db.User({
				isAdmin: isAdmin,
				userName: userName,
				firstName: firstName,
				lastName: lastName,
				phone: phone,
				email: email
			});

			bcrypt.genSalt(16, (err, salt) =>
			{
				if (err) throw err;
				newUser.salt = salt;
				bcrypt.hash(password, newUser.salt, (err, hash) =>
				{
					if (err) throw err;
					newUser.password = hash;

					db.Park.findOne({
						code: addPark
					})
						.then(park =>
						{
							if (park)
							{
								newUser.parks.push(park._id);
							} else
							{
								const newPark = new db.Park({
									code: addPark
								});
								newPark.users.push(newUser._id);
								newPark
									.save()
									.then(park => newUser.parks.push(park._id))
									.catch(err => console.log(err));
							}
						})
						.catch(err => console.log(err))

					db.Message.findOne({
						message: addMessage
					})
						.exec((err, message) =>
						{
							if (message)
							{
								newUser.messages.push(message._id);
							} else if (err || !message)
							{
								const newMessage = new db.Message({
									author: newUser._id,
									message: addMessage
								});
								newMessage.save().then(message =>
									newUser.messages.push(message._id)).catch(err => console.log(err));
							}
						});

					newUser.save()
						.then(user =>
						{
							req.flash(
								'success_msg',
								'You are now registered and can log in'
							);
							res.status(220).send({
								Success: true,
								NewUser: user._id
							});
							res.redirect('/api/users/login');
						})
						.catch(err =>
						{
							res.status(420).send({
								Success: false,
								Error: err.message
							});
							res.redirect('/api/user');
						});
				}); // end Bcrypt.getPassword()
			}); // end Bycrypt.getSaltsalter()
		}
	}
	}
	* /

/**
 * @public
 * @function update
 * @param {request} req 
 * @param {response} res 
 * @method PUT /api/user/:userId  
 * @desc Update an existing user by userId  
 */
function update(req, res) {
	const { /*errors,*/ isValid, data } = validateUserInput(req.body);

	if (!isValid) {
		respond(res, false, { msg: `Could not update user: ${res.params.userId}` });
	} else {

		/** 
		 * These are the options for 'findByIdAndUpdate'. Please see the link that follows for *further details.
		 * 
		 * @see https://mongoosejs.com/docs/*api.html#model_Model.findByIdAndUpdate"} 
		 * 
		 * */
	
		const options = {
			setDefaultsOnInsert: true,
			sort: 1,
			new: false,
			upsert: false,
			runValidators: true,
			select: null,
			rawResult: false,
			strict: false
		};
		
		db.User.findByIdAndUpdate(req.params.id, data, options, (err, foundUser) => {
			if (err || !foundUser) respond(res, false, { msg: !foundUser ? 'Error finding user' : err.message });
			if (foundUser) {
				foundUser.setPassword(data.password);

				db.Park.findOne({
					name: data.addPark
				})
					.exec((err, park) => {
						if (park) {
							const newPark = new db.Park({
								name: data.addPark
							});
							newPark.users.push(foundUser._id);
							newPark.save().then(park =>
								foundUser.parks.push(park._id));
						}
					});

				db.Update.findOne({
					update: data.addUpdate
				})
					.exec((err, update) => {
						if (update) {
							foundUser.updates.push(update._id);
						} else if (err || !update) {
							const newUpdate = new db.Update({
								author: foundUser._id,
								update: data.addUpdate
							});
							newUpdate.save().then(update =>
								foundUser.updates.push(update._id));
						}
					});
				
				foundUser
					.save()
					.then((foundUser) =>
						respond(res, true, { msg: `user: ${foundUser._id} was updated with data: ${data}` }))
					.catch((err) => respond(res, false, { msg: err.update }));
			}
		});
	}
}

/**
 * @public
 * @function destroy
 * @param {request} req 
 * @param {response} res 
 * @method DELETE api/user/:id  
 * @desc Delete an existing user by id  
 */

function destroy(req, res) {
	db.User
		.findByIdAndDelete({
			_id: req.params.id
		})
		.then((user) => {
			user.parks.forEach((park) => {
				db.Park
					.findById(park)
					.then((doc) => {
						doc.users.pop(user._id);
						doc.save();
					})
					.catch((err) => console.log(err));
			});

			user.Updates.forEach((update) => {
				db.Update
					.find({
						author: update.author
					})
					.then((docs) => {
						docs.forEach((doc) => {
							doc.users.pop(user._id);
							doc.save();
						});
					})
					.catch((err) => console.log(err));
			});

			user.remove().then((removedUser) => res(res, true, removedUser)).catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
}

/**
 * @public
 * @function uploadImage
 * @param {request} req 
 * @param {response} res 
 * @method POST /api/user/:userId/image   
 * @desc Upload a userImage for an existing user by id 
 */
function uploadImage(req, res) {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET
	});
	const values = Object.values(req.files);
	const promises = values.map((image) => cloudinary.uploader.upload(image.path));

	Promise.all(promises).then((results) => respond(res, true, results)).catch((err) => respond(res, false, err));

	res.status(200);
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
		.then((user) => {
			respond(res, true, user.parks);
		})
		.catch((err) => respond(res, false, err));
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
		.then((user) => {
			respond(res, true, user.updates);
		})
		.catch((err) => respond(res, false, err));
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
		.then((user) => {
			const park = user.parks.find((park) => park._id === req.params.parkId);
			respond(res, true, { userId: user._id, parkId: park._id });
		})
		.catch((err) => respond(res, false, err));
}

/**
 * @public
 * @function findUpdate
 * @param {request} req 
 * @param {response} res 
 * @method GET /api/users/:userId/updates/:updateId  
 * @desc Find a update, by update._id, that user._id has either sent or recieved 
 */
function findUpdate(req, res) {
	db.User
		.findById(req.params.userId)
		.then((user) => {
			const update = user.updates.find((update) => update._id === req.params.updateId);
			respond(res, true, { userId: user._id, updateId: update._id });
		})
		.catch((err) => respond(res, false, err));
}

// const express = require('express');
// const router = express.Router();

// // @route /api/user
// router.route('/api/users')
// 	.get(index)
// 	.post(create);

// router.route('/admin/image-upload')
// 	.post(uploadImage);

// // @route /api/user/_id
// router.route('/api/users/:userId')
// 	.get(read)
// 	.put(update)
// 	.delete(destroy);

//  // @route /api/users/_id/park
// router.route('/api/users/:userId/parks')
//   .get(readAllParks);

// // @route /api/users/_id/updates
// router.route('/api/users/:userId/updates')
//   .get(readAllUpdates);

// // @route /api/users/_id/park/_id
// router.route('/api/users/:userId/parks/:parkId')
//   .get(findPark);

// // @route /api/user/_id/updates/_id
// router.route('/api/users/:userId/updates/:updateId')
//   .get(findUpdate);

module.exports = /*router */{
	incoming,
	index,
	read,
	create,
	update,
	destroy,
	uploadImage,
	readAllParks,
	readAllUpdates,
	findPark,
	findUpdate
};
