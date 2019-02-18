/*jshint esversion: 8 */
// import UserImage from '../../client/src/components/ProfilePage/UserImage';
// import Login from '../../client/src/components/LoginPage/index';
const cloudinary = require('cloudinary');
const passport = require('passport');
const db = require('../../models');
const { respond } = require('../../lib');
const { validateUserInput, validateLoginInput } = require('../../config');

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
				if (!user.parks.length)
					return respond(res, false, { msg: 'You never subscribed to notifications from Parks and Rec' });
				// Get all the user's parks
				db.Park.find({ _id: { $in: user.parks } }, function(err, parks) {
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
			db.Park.findOne({ parkID: text[text.length - 1] }, function(err, park) {
				if (err) return respond(res, false, { msg: 'Derp! Please text back again later.', error: err });
				if (!park)
					return respond(res, false, {
						msg: `${text[text.length - 1]} is not a valid park code. ${defaultResponseMessage}`
					});
				// Find user
				db.User.findOne({ phone: phone }, function(err, user) {
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
function read(req, res) {
	return new Promise(async function(resolve, reject) {
		await db.User.findById(req.params.userId, () => {
			if (err || !user) {
				console.log(err);
				reject(err);
			} else {
				resolve(user);
			}
		});
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
		await db.User
			.find()
			.sort({
				userName: 1
			})
			.then(users => resolve(users))
			.catch(err => {
				console.log(err);
				reject(err);
			});
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
	const { errors, isValid /*data*/ } = validateUserInput(req.body);
	return new Promise(async (resolve, reject) => {
		if (!isValid) {
			console.log({ success: false, error: errors });
			reject(errors);
		} else {
			await db.User.findOne();
		}
	});
}
/**
function create(req, res)
{

	
	
	}
	* /

/**  
 * Update an existing user by userId 
 * 
 * @method PUT /api/user/:userId 
 * @function update
 * @param {request} req 
 * @param {response} res 
 * @public
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

				db.Park
					.findOne({
						name: data.addPark
					})
					.exec((err, park) => {
						if (park) {
							const newPark = new db.Park({
								name: data.addPark
							});
							newPark.users.push(foundUser._id);
							newPark.save().then(park => foundUser.parks.push(park._id));
						}
					});

				db.Update
					.findOne({
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
							newUpdate.save().then(update => foundUser.updates.push(update._id));
						}
					});

				foundUser
					.save()
					.then(foundUser =>
						respond(res, true, { msg: `user: ${foundUser._id} was updated with data: ${data}` })
					)
					.catch(err => respond(res, false, { msg: err.update }));
			}
		});
	}
}

/**
 * Delete an existing user by id
 *
 * @method DELETE api/user/:id
 * @function destroy
 * @param {request} req
 * @param {response} res
 * @public
 *
 */

function destroy(req, res) {
	db.User
		.findByIdAndDelete({
			_id: req.params.id
		})
		.then(user => {
			user.parks.forEach(park => {
				db.Park
					.findById(park)
					.then(doc => {
						doc.users.pop(user._id);
						doc.save();
					})
					.catch(err => console.log(err));
			});

			user.Updates.forEach(update => {
				db.Update
					.find({
						author: update.author
					})
					.then(docs => {
						docs.forEach(doc => {
							doc.users.pop(user._id);
							doc.save();
						});
					})
					.catch(err => console.log(err));
			});

			user
				.remove()
				.then(removedUser => res(res, true, removedUser))
				.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
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
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET
	});
	const values = Object.values(req.files);
	const promises = values.map(image => cloudinary.uploader.upload(image.path));

	Promise.all(promises)
		.then(results => respond(res, true, results))
		.catch(err => respond(res, false, err));

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
 * @method GET /api/users/:userId/updates/:updateId
 * @param {request} req
 * @param {response} res
 * @public
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

/*
			(err, passportUser, info) => {
				console.log('[loginRouter],', err.message, passportUser, info);
				if (err) return next(err);

				if (passportUser) {
					const user = passportUser;
					user.token = passportUser.generateJWT();
					return respond(res, true, { user: user.toAuthJSON() });
				}

				if (info) return respond(res, false, info);
			}
		)(req, res, next);

		console.log('[loginController] payload,', payload);

		return payload;
	}
}*/

/*
async function login (req, res, next) {    
	//res.cookie('dummyCookie', 'hi')
	console.log('[login] respond', respond)
	const isValid = true;
	if (isValid) {
		console.log('[login] req', req.body);		
		let user = await db.User.findOne({email: req.body.email});
		console.log('[login] user', user.email);
		// Match password i
		// let isMatch = await user.validatePassword(password);
		isMatch = true;
		const token = user.generateJWT();
		console.log('[login] token', token.slice(0, 5));
		respond.respond(res.cookie('token', token), true, { token });
        // const payload = passport.authenticate(
        //     'local', 
        //     (err, passport, info) => {
        //         console.log('[login.passport.authenticate]', err, passport.user, info);
		// 		if (err) return next(err);

		// 		if (passport) {
		// 			const user = passport.user;
		// 			user.generateJWT();
		// 			return respond(res, true, { user: user.toAuthJSON() });
		// 		}

		// 		if (info) return respond(res, false, info);

		// 		return respond(res, false)
		// 	}
        // )(req, res, next);

        // console.log('[login] payload,', payload)
        
        // return payload;
	}
}
*/

/**
 * Login a new user
 *
 * @param {request} req
 * @param {response} res
 * @param {middleware} next
 * @public
 */
	async function login( req,	res, next) {
				const { errors, isValid, data } = validateLoginInput(req.body);
	if (!isValid) {
		console.log(errors);
		respond(res, false, errors);
	} else {
	console.log('[login] body.email', req.body.email);
	let user = await db.User.findOne({ email: req.body.email });
	console.log('[login] user', user.email);
	// const isMatch = await bcrypt.compare(password, user.password);
	const isMatch = await user.validatePassword(password);
	// const isMatch = true;
	console.log('[login] isMatch', isMatch);

	if (!user || !isMatch) res.json({ message: 'User or Password do not match !' });

	// Set JWT into the cookie
	const token = await user.generateJWT();
	respond(res.cookie('token', token), true, { token });
	}
}

// Logout current user
function logout(req, res) {
	req.session.destroy(() => console.log('User signed out.'));
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/api/login');
}

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next(null);
	}
	res.redirect('/error');
}

const router = require('express').Router();

// @route /api/user
router
	.route('/api/users')
	.get(index)
	.post(create);

router.route('/admin/image-upload').post(uploadImage);

// @route /api/user/_id
router
	.route('/api/users/:userId')
	.get(read)
	.put(update)
	.delete(destroy);

// @route /api/users/_id/park
router.route('/api/users/:userId/parks').get(readAllParks);

// @route /api/users/_id/updates
router.route('/api/users/:userId/updates').get(readAllUpdates);

// @route /api/users/_id/park/_id
router.route('/api/users/:userId/parks/:parkId').get(findPark);

// @route /api/user/_id/updates/_id
router.route('/api/users/:userId/updates/:updateId').get(findUpdate);

module.exports = router
	;
