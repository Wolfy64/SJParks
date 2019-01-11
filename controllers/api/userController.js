const db = require("../../models");
const crypto = require("./lib/cryptoHelper");

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

// @route GET api/users/:userId
// @desc Read a user by userId
// @access Public
function read(req, res) {}

// @route POST api/users/
// @desc Create An New user
// @access Public
function create(req, res) {
	console.log(`>[USER:37:26]> Creating  user with 'phone = ${req.body.phone}' ...`);
	const {
		password,
		cpassword,
		isAdmin,
		userName,
		firstName,
		lastName,
		phone,
		email,
		addPark
	} = req.body;


	const newUser = new db.User({
		isAdmin: isAdmin,
		userName: userName,
		firstName: firstName,
		lastName: lastName,
		phone: phone,
		email: email
	});
	newUser.salt = crypto.getSalt();
	newUser.password = crypto.getPasswordHash(password, newUser.salt);

	db.Park.findOne({
			code: addPark
		})
		.exec((err, park) => {
			if (err) res.json({
				success: false,
				error: err.message
			});
			if (park) {
				newUser.parks.push(park._id);
			} else {
				const newPark = new db.Park({
					code: addPark
				});
				newPark.users.push(newUser._id);
				newPark.save();
				newUser.parks.push(newPark._id);
			}
		});

	newUser.save()
		.then(newuser => {
			res.status(220).send({
				Success: true,
				NewUser: newuser._id
			});
			console.log(`>[USER:88:32]> ...User with '_id = ${newuser._id}' has been created `);
		})
		.catch(err => res.status(420).send({
			Success: false,
			Error: err.message
		}));

}

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
			newUser.salt = crypto.getSalt();
			newUser.password = crypto.getPasswordHash(newPassword, newUser.salt);

			db.Park.findOne({
					name: addPark
				})
				.exec((err, park) => {
					if (err || !park) {
						const newPark = new db.Park({
							name: addPark
						});
						newPark.users.push(newUser._id);
						newPark.save();
						newUser.parks.push(newPark._id);
					} else if (park) {
						newUser.parks.push(park._id);
					}
				});

			db.Message.findOne({
					message: addMessage
				})
				.exec((err, message) => {
					if (err || !message) {
						const newMessage = new db.Message({
							author: newUser._id,
							message: addMessage
						});
						newMessage.save();
						newUser.messages.push(newMessage._id);
					} else if (message) {
						newUser.messages.push(message._id);
					}
				});

			console.log(`>[USER:8:23]>`+
				newUser._id);

			newUser.save()
				.then(newuser => res.status(220).send({
					Success: true,
					NewUser: newuser
				}))
				.catch(err => res.status(420).send({
					Success: false,
					Error: `Error saving updated user. Error thrown: ${err.message}.`
				}));
		})
		.catch(err => res.status(457).json({
			succes: false,
			error: `Error updating user. Error thrown: ${err.message}`
		}));

	console.log(`>[USER:190:27]> User with '_id = ${req.params.id} has been updated'`);
}

// @route DELETE api/user/:id
// @desc Delete An user by id
// @access Public
function destroy(req, res) {
	console.log(`>[USER:197:27]> Destroying user with '_id = ${req.params.id}'...`);
	db.User.findByIdAndDelete(req.params.id)
		.then(user => {
			//
			user.parks.forEach(park => {
				db.Park.findById(park).then(doc => {
					doc.users.pop(user._id);
					doc.save();
				}).catch(err => res.status(463).json({
					success: false,
					error: err.message
				}))
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
	create: create,
	update: update,
	destroy: destroy
}
