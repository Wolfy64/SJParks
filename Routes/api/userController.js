const db = require('../../models');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const cloudinary = require('cloudinary');
const config = require('../../config')

// @route GET api/user
// @desc Get all users
// @access Public
function index(req, res)
{
	db.User.find()
		.sort({
			username: 1,
			phone: 1
		})
		.then(users =>
		{
			res.status(200).json({
				success: true,
				users: users
			});
		})
		.catch(err => console.log(err));
}

// @route GET api/user/:userId
// @desc Read a user by userId
// @access Public
function read(req, res) { }

// @route POST api/user/
// @desc Create An New user
// @access Public
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

// @route POST api/user/login
// @desc Login an existing user
// @access Public
function login(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (info) res.send(info);
    if (user) res.send(user);
  })(req, res, next);

  //===== Previous Code =====
  // passport.authenticate('local', {
  //   successRedirect: '/admin/:user/updates',
  //   failureRedirect: '/login',
  //   failureFlash: true
  // })(req, res, next);
  // if (process.env.NODE_ENV === 'test') res.render('updates');
}

// @route GET api/user/logout
// @desc Logout session user
// @access Public

function logout(req, res)
{
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/login');
	if (process.env.NODE_ENV === "test") res.render('login');
};

// @route PUT api/user/update/:id
// @desc Update an existing user by id
// @access Public
function update(req, res)
{
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
		.then(newUser =>
		{
			bcrypt.genSalt(16, (err, salt) =>
			{
				if (err) throw err;
				newUser.salt = salt;
				bcrypt.hash(newPassword, newUser.salt, (err, hash) =>
				{
					if (err) throw err;
					newUser.password = hash;

					db.Park.findOne({
						name: addPark
					})
						.exec((err, park) =>
						{
							if (park)
							{
								newUser.parks.push(park._id);
							} else if (err || !park)
							{
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
									newUser.messages.push(message._id));
							}
						});

					newUser.save()
						.then(newuser => res.status(220).send({
							Success: true,
							NewUser: newuser
						}))
						.catch(err => console.log(err));
				});
			});

		}) // end findby id and update
		.catch(err => console.log(err));
}

// @route DELETE api/user/:id
// @desc Delete An user by id
// @access Public
const destroy = (req, res) =>
{
	db.User.findByIdAndDelete({
		_id: req.params.id
	})
		.then(user =>
		{
			//
			user.parks.forEach(park =>
			{
				db.Park.findById(park).then(doc =>
				{
					doc.users.pop(user._id);
					doc.save();
				}).catch(err => console.log(err))
			});

			user.messagess.forEach(mess =>
			{
				db.Message.find({
					author: mess.author
				}).then(docs =>
				{
					docs.forEach(doc =>
					{
						doc.users.pop(user._id);
						doc.save();
					})
				}).catch(err => console.log(err))
			});

			user.remove().then(removeduser => res.status(200).json({
				success: true,
				deleted: removeduser
			}))
		})
		.catch(err => console.log(err));
}

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

const imageUpload = (req, res) =>
{
	const values = Object.values(req.files)
	const promises = values.map(image => cloudinary.uploader.upload(image.path))

	Promise
		.all(promises)
		.then(results => res.json(results))
		.catch(err => console.log(err));

	res.status(200);
}

/* // [WIP] configuring user Authentication

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) =>
{
	const { body: { user } } = req;

	if (!user.email)
	{
		return res.status(422).json({
			errors: {
				email: 'is required',
			},
		});
	}

	if (!user.password)
	{
		return res.status(422).json({
			errors: {
				password: 'is required',
			},
		});
	}

	const finalUser = new Users(user);

	finalUser.setPassword(user.password);

	return finalUser.save()
		.then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) =>
{
	const { body: { user } } = req;

	if (!user.email)
	{
		return res.status(422).json({
			errors: {
				email: 'is required',
			},
		});
	}

	if (!user.password)
	{
		return res.status(422).json({
			errors: {
				password: 'is required',
			},
		});
	}

	return passport.authenticate('local', { session: false }, (err, passportUser, info) =>
	{
		if (err)
		{
			return next(err);
		}

		if (passportUser)
		{
			const user = passportUser;
			user.token = passportUser.generateJWT();

			return res.json({ user: user.toAuthJSON() });
		}

		return status(400).info;
	})(req, res, next);
});
*/
const express = require('express');
const router = express.Router();

// @route /api/user
router.route('/api/users')
	.get(index)
	.post(create);

router.route('/admin/image-upload')
	.post(imageUpload);

// @route /api/user/_id
router.route('/api/users/:userId')
	.get(read)
	.put(update)
	.delete(destroy);

//  // @route /api/users/_id/park
// router.route('/api/users/:userId/park')
//   .get(readAllParks);

// // @route /api/users/_id/message
// router.route('/api/users/:userId/message')
//   .get(readAllMessages);

// // @route /api/users/_id/park/_id
// router.route('/api/users/:userId/park/:parkId')
//   .get(findPark);

// // @route /api/user/_id/message/_id
// router.route('/api/users/:userId/message/:messageId')
//   .get(findMessage);

module.exports = router;
