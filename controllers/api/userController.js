const db = require("../../models");
const bcrypt = require('bcryptjs');
const passport = require('passport');

// @route GET api/user
// @desc Get all users
// @access Public
function index(req, res) {
	console.log(`>[USER:8:23]> Retriving user index ...`);
	db.User.find()
		.sort({
			username: 1,
			phone: 1,
			email: 1
		})
		.then(users => {
			res.status(200).json({
				success: true,
				users: users
			});
			console.log(`>[USER:20:30]> ...A user index with ${users.length} many user was found`);
		})
		.catch(err => res.status(404).json({
			success: false,
			error: err.errmsg
		}));
}

// @route GET api/user/:userId
// @desc Read a user by userId
// @access Public
function read(req, res) {}

// @route POST api/user/
// @desc Create An New user
// @access Public
function create(req, res) {
	console.log(`>[USER:37:26]> Creating  user with 'phone = ${req.body.phone}' ...`);
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

	if (!userName || !firstName || !lastName || !phone || !email || !password) {
		errors.push({
			msg: 'Please enter all fields'
		});
	}

	if (password.length < 8) {
		errors.push({
			msg: 'Password must be at least 8 characters'
		});
	}

	if (errors.length > 0) {
		res.render('register', {
			errors,
			name,
			email,
			password
		});
	} else {
		let user = null;
		db.User.findOne({
			userName: userName,
			phone: phone,
			email: email
		}).then(userFound => {
			if (userFound) user = userFound;
		});
		if (user != null) {
			errors.push({
				msg: `Derp! User already exists!`,
				user: user
			})
			res.render('register', {
				errors,
				user
			});
		} else {

			const newUser = new db.User({
				isAdmin: isAdmin,
				userName: userName,
				firstName: firstName,
				lastName: lastName,
				phone: phone,
				email: email
			});

			bcrypt.genSalt(16, (err, salt) => {
				if (err) throw err;
				newUser.salt = salt;
				bcrypt.hash(password, newUser.salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;

					db.Park.findOne({
							code: addPark
						})
						.then(park => {
							if (park) {
								newUser.parks.push(park._id);
							} else {
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
						.exec((err, message) => {
							if (message) {
								newUser.messages.push(message._id);
							} else if (err || !message) {
								const newMessage = new db.Message({
									author: newUser._id,
									message: addMessage
								});
								newMessage.save().then(message =>
									newUser.messages.push(message._id)).catch(err => console.log(err));
							}
						});

					newUser.save()
						.then(user => {
							req.flash(
								'success_msg',
								'You are now registered and can log in'
							);
							res.status(220).send({
								Success: true,
								NewUser: user._id
							});
							res.redirect('/api/users/login');
							console.log(`>[USER:88:32]> ...User with '_id = ${user._id}' has been created `);
						})
						.catch(err => {
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

// @route POST api/user/login
// @desc Login an existing user
// @access Public
function login(req, res, next) {

	passport.authenticate('local', {
		successRedirect: '/admin/:user/updates',
		failureRedirect: '/login',
		failureFlash: true
	})(req, res, next);
	if (process.env.NODE_ENV === "test") res.render('updates');

};

// @route GET api/user/logout
// @desc Logout session user
// @access Public

function logout(req, res) {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/login');
	if (process.env.NODE_ENV === "test") res.render('login');
};

// @route PUT api/user/update/:id
// @desc Update an existing user by id
// @access Public
function update(req, res) {
	console.log(`>[USER:106:27]> Updating user with '_id = ${req.params.id}'...`);
	const {
		newPassword,
		newIsAdmin,
		newUserName,
		newFirstName,
		newLastName,
		newPhone,
		newEmail,
		addPark,
		addMessage
	} = req.body;

	const updates = {};
	updates.isAdmin = newIsAdmin;
	updates.userName = newUserName;
	updates.firstName = newFirstName;
	updates.lastName = newLastName;
	updates.phone = newPhone;
	updates.email = newEmail;

	/* These are the options for 'findByIdAndUpdate'. Please see the link that follows for further details.{"link":"https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate"} */

	const options = {
		// setDefaultsOnInsert: true,
		// sort: -1,
		new: true,
		upsert: false,
		runValidators: true,
		select: null,
		rawResult: false,
		strict: false
	}

	db.User.findByIdAndUpdate(req.params.id, updates, options)
		.then(newUser => {

			bcrypt.genSalt(16, (err, salt) => {
				if (err) throw err;
				newUser.salt = salt;
				bcrypt.hash(newPassword, newUser.salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;

					db.Park.findOne({
							name: addPark
						})
						.exec((err, park) => {
							if (park) {
								newUser.parks.push(park._id);
							} else if (err || !park) {
								const newPark = new db.Park({
									name: addPark
								});
								newPark.users.push(newUser._id);
								newPark.save().then(park =>
									newUser.parks.push(park._id));
							}
						});

					db.Message.findOne({
							message: addMessage
						})
						.exec((err, message) => {
							if (message) {
								newUser.messages.push(message._id);
							} else if (err || !message) {
								const newMessage = new db.Message({
									author: newUser._id,
									message: addMessage
								});
								newMessage.save().then(message =>
									newUser.messages.push(message._id));
							}
						});

					newUser.save()
						.then(newuser => res.status(220).send({
							Success: true,
							NewUser: newuser
						}))
						.catch(err => res.status(420).send({
							Success: false,
							Error: `Error saving updated user. Error thrown: ${err.message}.`
						}));
				});
			});

		}) // end findby id and update
		.catch(err => res.status(457).json({
			succes: false,
			error: `Error updating user. Error thrown: ${err.message}`
		}));

	console.log(`>[USER:190:27]> User with '_id = ${req.params.id} has been updated'`);
}

// @route DELETE api/user/:id
// @desc Delete An user by id
// @access Public
const destroy = (req, res) => {
	console.log(`>[USER:197:27]> Destroying user with '_id = ${req.params.id}'...`);
	db.User.findByIdAndDelete({
			_id: req.params.id
		})
		.then(user => {
			//
			user.parks.forEach(park => {
				db.Park.findById(park).then(doc => {
					doc.users.pop(user._id);
					doc.save();
				}).catch(err => {
					res.status(463).json({
						success: false,
						error: err.message
					})
				})
			});

			user.messagess.forEach(mess => {
				db.Message.find({
					author: mess.author
				}).then(docs => {
					docs.forEach(doc => {
						doc.users.pop(user._id);
						doc.save();
					})
				}).catch(err => res.status(467).json({
					success: false,
					error: `Error removing "user: ${user._id}" from "updates". Error Thrown: ${err.message}`
				}))
			});

			user.remove().then(removeduser => res.status(200).json({
				success: true,
				deleted: removeduser
			}))
		})
		.catch(err => res.status(404).json({
			success: false,
			error: err.message
		}));
	console.log(`>[USER:238:27]> User with '_id = ${req.params.id} has been destroyed...'`);
}

module.exports = {
	index: index,
	read: read,
	register: create,
	login: login,
	logout: logout,
	update: update,
	destroy: destroy
}
