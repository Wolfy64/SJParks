const db = require("../../models/");
const crypto = require("../../lib/cryptoHelper");

module.exports = userRoute => {

	// @route GET api/user
	// @desc Get all users
	// @access Public
	userRoute
		.get('/', (req, res) => {
			db.User.find()
				.sort({
					username: 1,
					phone: 1,
					email: 1
				})
				.then(users => res.status(200).json({
					success: true,
					users: users
				}))
				.catch(err => res.status(404).json({
					success: false,
					error: err.errmsg
				}));
		})

		// @route POST api/users/
		// @desc Create An New user
		// @access Public
		.post('/', (req, res) => {
			const {
				password,
				cpassword,
				isadmin,
				userName,
				firstName,
				lastName,
				phone,
				email,
				addPark
			} = req.body;

			if (password === cpassword) {
				const newUser = new db.User({
					isAdmin: isadmin,
					userName: userName,
					firstName: firstName,
					lastName: lastName,
					phone: phone,
					email: email
				});
				newUser.salt = crypto.getSalt();
				newUser.password = crypto.getPasswordHash(password, newUser.salt);

				db.Park.findOne({
						name: addPark
					})
					.exec((err, park) => {
						if (err) return res.json({
							success: false,
							error: err.message
						});
						if (park) {
							newUser.parks.push(park._id);
						} else {
							const newPark = new db.Park({
								name: addPark
							});
							newPark.users.push(newUser._id);
							newPark.save();
							newUser.parks.push(newPark._id);
						}
					});

				newUser.save()
					.then(newuser => res.status(220).send({
						Success: true,
						NewUser: newuser._id
					}))
					.catch(err => res.status(420).send({
						Success: false,
						Error: err.message
					}));
			} else {
				return res.status(428).send({
					Success: false,
					Error: `Passwords were not the same`
				})
			}
		})

		// @route PUT api/user/update/:id
		// @desc Update an existing user by id
		// @access Public
		.put('/update/:id', (req, res) => {
			const {
				newPassword,
				newCPassword,
				newIsAdmin,
				newUserName,
				newFirstName,
				newLastName,
				newPhone,
				newEmail,
				addPark,
				addMessage
			} = req.body;

			if (newPassword === newCPassword) {
				const updates = {};
				updates.isAdmin = newIsAdmin;
				updates.userName = newUserName;
				updates.firstName = newFirstName;
				updates.lastName = newLastName;
				updates.phone = newPhone;
				updates.email = newEmail;

				const options = {
					// These are the options for 'findByIdAndUpdate'. Please see the link that follows for further details.
					// {"link":"https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate"}
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

						console.log(newUser._id);

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
			} else {
				return res.status(424).json({
					success: false,
					error: "The passwords did not match!"
				})
			}
		})

		// @route DELETE api/user/delete/:id
		// @desc Delete An user by id
		// @access Public
		.delete('/delete/:id', (req, res) => {
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

					user.updates.forEach(update => {
						db.Update.findOne({
							author: update.author
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
		});
}
